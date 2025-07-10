#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Configuration
const RELEASE_TYPES = {
    patch: 'patch',
    minor: 'minor',
    major: 'major',
    prepatch: 'prepatch',
    preminor: 'preminor',
    premajor: 'premajor',
    prerelease: 'prerelease'
};

class ReleaseManager {
    constructor() {
        this.packageJsonPath = join(projectRoot, 'package.json');
        this.changelogPath = join(projectRoot, 'CHANGELOG.md');
    }

    // Get current version from package.json
    getCurrentVersion() {
        const packageJson = JSON.parse(readFileSync(this.packageJsonPath, 'utf8'));
        return packageJson.version;
    }

    // Calculate next version based on release type
    getNextVersion(currentVersion, releaseType) {
        const versionParts = currentVersion.split('.').map(Number);
        let [major, minor, patch] = versionParts;

        switch (releaseType) {
            case 'major':
                return `${major + 1}.0.0`;
            case 'minor':
                return `${major}.${minor + 1}.0`;
            case 'patch':
                return `${major}.${minor}.${patch + 1}`;
            case 'premajor':
                return `${major + 1}.0.0-alpha.1`;
            case 'preminor':
                return `${major}.${minor + 1}.0-alpha.1`;
            case 'prepatch':
                return `${major}.${minor}.${patch + 1}-alpha.1`;
            case 'prerelease':
                // Handle existing prerelease versions
                if (currentVersion.includes('-alpha.')) {
                    const [base, prerelease] = currentVersion.split('-alpha.');
                    return `${base}-alpha.${parseInt(prerelease) + 1}`;
                }
                return `${major}.${minor}.${patch + 1}-alpha.1`;
            default:
                throw new Error(`Unknown release type: ${releaseType}`);
        }
    }

    // Update package.json version
    updatePackageVersion(newVersion) {
        const packageJson = JSON.parse(readFileSync(this.packageJsonPath, 'utf8'));
        packageJson.version = newVersion;
        writeFileSync(this.packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
        console.log(`📦 Updated package.json version to ${newVersion}`);
    }

    // Get git commits since last tag
    getCommitsSinceLastTag() {
        try {
            const lastTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
            const commits = execSync(`git log ${lastTag}..HEAD --oneline`, { encoding: 'utf8' }).trim();
            return commits.split('\n').filter(line => line.trim());
        } catch (error) {
            // If no tags exist, get all commits
            const commits = execSync('git log --oneline', { encoding: 'utf8' }).trim();
            return commits.split('\n').filter(line => line.trim());
        }
    }

    // Generate changelog entry
    generateChangelogEntry(version, commits) {
        const date = new Date().toISOString().split('T')[0];
        const features = [];
        const fixes = [];
        const changes = [];
        const breaking = [];

        commits.forEach(commit => {
            const message = commit.substring(8); // Remove commit hash
            if (message.startsWith('feat:') || message.startsWith('feat(')) {
                features.push(message);
            } else if (message.startsWith('fix:') || message.startsWith('fix(')) {
                fixes.push(message);
            } else if (message.startsWith('BREAKING:') || message.includes('BREAKING CHANGE')) {
                breaking.push(message);
            } else {
                changes.push(message);
            }
        });

        let entry = `## [${version}] - ${date}\n\n`;

        if (breaking.length > 0) {
            entry += '### 💥 BREAKING CHANGES\n';
            breaking.forEach(item => entry += `- ${item}\n`);
            entry += '\n';
        }

        if (features.length > 0) {
            entry += '### ✨ Features\n';
            features.forEach(item => entry += `- ${item}\n`);
            entry += '\n';
        }

        if (fixes.length > 0) {
            entry += '### 🐛 Bug Fixes\n';
            fixes.forEach(item => entry += `- ${item}\n`);
            entry += '\n';
        }

        if (changes.length > 0) {
            entry += '### 📝 Other Changes\n';
            changes.forEach(item => entry += `- ${item}\n`);
            entry += '\n';
        }

        return entry;
    }

    // Update CHANGELOG.md
    updateChangelog(version, commits) {
        const newEntry = this.generateChangelogEntry(version, commits);

        let changelog;
        try {
            changelog = readFileSync(this.changelogPath, 'utf8');
        } catch (error) {
            // Create new changelog if it doesn't exist
            changelog = '# Changelog\n\nAll notable changes to this project will be documented in this file.\n\n';
        }

        // Insert new entry after the header
        const lines = changelog.split('\n');
        const headerEndIndex = lines.findIndex(line => line.startsWith('## '));

        if (headerEndIndex === -1) {
            // No existing entries, add after header
            const headerLines = lines.slice(0, 3);
            const newChangelog = [...headerLines, '', ...newEntry.split('\n'), ...lines.slice(3)].join('\n');
            writeFileSync(this.changelogPath, newChangelog);
        } else {
            // Insert before existing entries
            const beforeEntries = lines.slice(0, headerEndIndex);
            const afterEntries = lines.slice(headerEndIndex);
            const newChangelog = [...beforeEntries, ...newEntry.split('\n'), ...afterEntries].join('\n');
            writeFileSync(this.changelogPath, newChangelog);
        }

        console.log(`📝 Updated CHANGELOG.md with version ${version}`);
    }

    // Create git tag
    createGitTag(version) {
        execSync(`git add .`);
        execSync(`git commit -m "chore: release v${version}"`);
        execSync(`git tag -a v${version} -m "Release v${version}"`);
        console.log(`🏷️  Created git tag v${version}`);
    }

    // Push to remote
    pushToRemote() {
        execSync('git push origin main');
        execSync('git push origin --tags');
        console.log('🚀 Pushed to remote repository');
    }

    // Generate release notes for GitHub
    generateReleaseNotes(version, commits) {
        const changelog = this.generateChangelogEntry(version, commits);
        const releaseNotes = changelog.replace(`## [${version}] - ${new Date().toISOString().split('T')[0]}`, '').trim();

        return {
            tag_name: `v${version}`,
            name: `Release v${version}`,
            body: releaseNotes,
            draft: false,
            prerelease: version.includes('-alpha') || version.includes('-beta') || version.includes('-rc')
        };
    }

    // Create GitHub release (requires GitHub CLI)
    createGitHubRelease(version, commits) {
        try {
            const releaseNotes = this.generateReleaseNotes(version, commits);

            // Write release notes to temporary file
            const releaseNotesFile = join(projectRoot, '.release-notes.md');
            writeFileSync(releaseNotesFile, releaseNotes.body);

            // Create release using GitHub CLI
            const prereleaseFlag = releaseNotes.prerelease ? '--prerelease' : '';
            execSync(`gh release create v${version} --title "Release v${version}" --notes-file .release-notes.md ${prereleaseFlag}`);

            // Clean up
            execSync('rm .release-notes.md');

            console.log(`🎉 Created GitHub release v${version}`);
        } catch (error) {
            console.warn('⚠️  GitHub CLI not available or not authenticated. Release not created on GitHub.');
            console.log('Manual release creation required at: https://github.com/your-username/spendlite-tauri/releases/new');
        }
    }

    // Main release process
    async release(releaseType, options = {}) {
        const { dryRun = false, skipGitHub = false } = options;

        console.log(`🚀 Starting ${releaseType} release...`);

        // Get current version and calculate next version
        const currentVersion = this.getCurrentVersion();
        const nextVersion = this.getNextVersion(currentVersion, releaseType);

        console.log(`📈 Version: ${currentVersion} → ${nextVersion}`);

        if (dryRun) {
            console.log('🧪 DRY RUN - No changes will be made');
            return;
        }

        // Get commits for changelog
        const commits = this.getCommitsSinceLastTag();
        console.log(`📋 Found ${commits.length} commits since last release`);

        // Update files
        this.updatePackageVersion(nextVersion);
        this.updateChangelog(nextVersion, commits);

        // Git operations
        this.createGitTag(nextVersion);

        if (!skipGitHub) {
            this.pushToRemote();
            this.createGitHubRelease(nextVersion, commits);
        }

        console.log(`✅ Release v${nextVersion} completed successfully!`);
    }
}

// CLI Interface
function showUsage() {
    console.log(`
Usage: npm run release [type] [options]

Release Types:
  patch     - 1.0.0 → 1.0.1 (bug fixes)
  minor     - 1.0.0 → 1.1.0 (new features)
  major     - 1.0.0 → 2.0.0 (breaking changes)
  prepatch  - 1.0.0 → 1.0.1-alpha.1
  preminor  - 1.0.0 → 1.1.0-alpha.1
  premajor  - 1.0.0 → 2.0.0-alpha.1
  prerelease - 1.0.1-alpha.1 → 1.0.1-alpha.2

Options:
  --dry-run        Show what would be done without making changes
  --skip-github    Skip GitHub release creation
  --help           Show this help message

Examples:
  npm run release patch
  npm run release minor --dry-run
  npm run release prerelease --skip-github
`);
}

async function main() {
    const args = process.argv.slice(2);

    if (args.includes('--help') || args.length === 0) {
        showUsage();
        process.exit(0);
    }

    const releaseType = args[0];
    const options = {
        dryRun: args.includes('--dry-run'),
        skipGitHub: args.includes('--skip-github')
    };

    if (!Object.values(RELEASE_TYPES).includes(releaseType)) {
        console.error(`❌ Invalid release type: ${releaseType}`);
        showUsage();
        process.exit(1);
    }

    const releaseManager = new ReleaseManager();

    try {
        await releaseManager.release(releaseType, options);
    } catch (error) {
        console.error(`❌ Release failed: ${error.message}`);
        process.exit(1);
    }
}

main();