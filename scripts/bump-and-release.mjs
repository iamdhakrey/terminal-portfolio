#!/usr/bin/env node

import { execSync } from "child_process";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

// ─────────────────────────────────────────────
// ANSI color & style helpers (zero-dependency)
// ─────────────────────────────────────────────
const C = {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    dim: "\x1b[2m",
    // foregrounds
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    gray: "\x1b[90m",
    // bright foregrounds
    bRed: "\x1b[91m",
    bGreen: "\x1b[92m",
    bYellow: "\x1b[93m",
    bBlue: "\x1b[94m",
    bMagenta: "\x1b[95m",
    bCyan: "\x1b[96m",
    bWhite: "\x1b[97m",
    // backgrounds
    bgBlack: "\x1b[40m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
};

const paint = (color, text) => `${color}${text}${C.reset}`;
const bold = (text) => `${C.bold}${text}${C.reset}`;
const dim = (text) => `${C.dim}${text}${C.reset}`;

// ─────────────────────────────────────────────
// Spinner (no deps)
// ─────────────────────────────────────────────
class Spinner {
    constructor(text) {
        this.frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
        this.index = 0;
        this.text = text;
        this.timer = null;
        this.stream = process.stdout;
    }

    start() {
        this.stream.write("\x1B[?25l"); // hide cursor
        this.timer = setInterval(() => {
            const frame = paint(
                C.cyan,
                this.frames[this.index++ % this.frames.length],
            );
            this.stream.write(`\r${frame} ${this.text}`);
        }, 80);
        return this;
    }

    succeed(msg) {
        this._stop(paint(C.bGreen, "✔"), msg || this.text);
    }
    fail(msg) {
        this._stop(paint(C.bRed, "✖"), msg || this.text);
    }
    warn(msg) {
        this._stop(paint(C.bYellow, "⚠"), msg || this.text);
    }
    info(msg) {
        this._stop(paint(C.bBlue, "ℹ"), msg || this.text);
    }

    _stop(icon, msg) {
        clearInterval(this.timer);
        this.stream.write(`\r${icon} ${msg}\n`);
        this.stream.write("\x1B[?25h"); // show cursor
    }
}

// ─────────────────────────────────────────────
// Structured Logger
// ─────────────────────────────────────────────
class Logger {
    constructor() {
        this.logs = []; // in-memory log records
        this.logPath = join(projectRoot, "logs", "release.log");
    }

    _record(level, icon, color, message) {
        const ts = new Date().toISOString();
        const entry = { ts, level, message };
        this.logs.push(entry);

        // pretty console
        const prefix = paint(color, `${icon} [${level.toUpperCase()}]`);
        console.log(`${dim(ts.slice(11, 19))} ${prefix} ${message}`);

        // flush to file
        this._appendToFile(entry);
        return entry;
    }

    _appendToFile(entry) {
        try {
            const dir = dirname(this.logPath);
            if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
            const line = JSON.stringify(entry) + "\n";
            writeFileSync(this.logPath, line, { flag: "a" });
        } catch {
            /* non-fatal */
        }
    }

    info(msg) {
        return this._record("info", "ℹ", C.bBlue, msg);
    }
    ok(msg) {
        return this._record("ok", "✔", C.bGreen, msg);
    }
    warn(msg) {
        return this._record("warn", "⚠", C.bYellow, msg);
    }
    error(msg) {
        return this._record("error", "✖", C.bRed, msg);
    }
    step(msg) {
        return this._record("step", "→", C.bMagenta, msg);
    }
    debug(msg) {
        return this._record("debug", "·", C.gray, msg);
    }

    /**
     * Returns a summary table of log entries for post-run review.
     */
    summary() {
        const counts = {};
        for (const { level } of this.logs)
            counts[level] = (counts[level] || 0) + 1;
        const lines = [
            "",
            paint(C.bold + C.bWhite, " LOG SUMMARY "),
            ...Object.entries(counts).map(
                ([l, n]) =>
                    `  ${paint(C.gray, l.padEnd(8))} ${paint(C.bCyan, String(n).padStart(3))} entries`,
            ),
            `  ${paint(C.gray, "total   ")} ${paint(C.bWhite, String(this.logs.length).padStart(3))} entries`,
            dim(`  Written → ${this.logPath}`),
        ];
        console.log(lines.join("\n"));
    }

    /**
     * Dump full log to console (useful with --verbose).
     */
    dump() {
        console.log(
            paint(C.gray, "\n── Full Log ────────────────────────────"),
        );
        for (const { ts, level, message } of this.logs) {
            console.log(
                `${dim(ts)} ${paint(C.gray, level.padEnd(6))} ${message}`,
            );
        }
        console.log(
            paint(C.gray, "────────────────────────────────────────\n"),
        );
    }
}

// ─────────────────────────────────────────────
// Release types
// ─────────────────────────────────────────────
const RELEASE_TYPES = {
    patch: "patch",
    minor: "minor",
    major: "major",
    prepatch: "prepatch",
    preminor: "preminor",
    premajor: "premajor",
    prerelease: "prerelease",
};

// ─────────────────────────────────────────────
// Changelog renderer
// ─────────────────────────────────────────────

/** Parses a flat list of "hash message" git log lines into categorised groups. */
function parseCommits(rawLines) {
    const groups = {
        breaking: [],
        feat: [],
        fix: [],
        perf: [],
        refactor: [],
        docs: [],
        chore: [],
        other: [],
    };

    for (const line of rawLines) {
        if (!line.trim()) continue;
        const hash = line.slice(0, 7);
        const msg = line.slice(40).trim();

        // skip merge commits — they're noise in release notes
        if (/^Merge (pull request|branch)/i.test(msg)) continue;

        if (/BREAKING[- ]?CHANGE/i.test(msg))
            groups.breaking.push({ hash, msg });
        else if (/^feat[:(]/.test(msg)) groups.feat.push({ hash, msg });
        else if (/^fix[:(]/.test(msg)) groups.fix.push({ hash, msg });
        else if (/^perf[:(]/.test(msg)) groups.perf.push({ hash, msg });
        else if (/^refactor[:(]/.test(msg)) groups.refactor.push({ hash, msg });
        else if (/^docs?[:(]/.test(msg)) groups.docs.push({ hash, msg });
        else if (/^chore[:(]|^build[:(]|^ci[:(]/.test(msg))
            groups.chore.push({ hash, msg });
        else groups.other.push({ hash, msg });
    }

    return groups;
}

/** Renders a Markdown changelog block for one release. */
function renderChangelog(version, commits, repoUrl = "") {
    const date = new Date().toISOString().split("T")[0];
    const groups = parseCommits(commits);

    const sections = [
        { key: "breaking", emoji: "💥", title: "Breaking Changes" },
        { key: "feat", emoji: "✨", title: "New Features" },
        { key: "fix", emoji: "🐛", title: "Bug Fixes" },
        { key: "perf", emoji: "⚡", title: "Performance" },
        { key: "refactor", emoji: "♻️", title: "Refactors" },
        { key: "docs", emoji: "📖", title: "Documentation" },
        { key: "chore", emoji: "🔧", title: "Maintenance" },
        { key: "other", emoji: "📦", title: "Other Changes" },
    ];

    const totalCommits = Object.values(groups).reduce(
        (s, a) => s + a.length,
        0,
    );
    const hasBreaking = groups.breaking.length > 0;
    const versionAnchor = version.replace(/\./g, "");

    // ── Header ──────────────────────────────────────────────────────────────
    let md = "";
    md += `## [${version}](${repoUrl}/releases/tag/v${version}) — ${date}\n\n`;

    // summary badge-style line
    const badgeParts = [
        `🗓 ${date}`,
        `📦 ${totalCommits} commit${totalCommits !== 1 ? "s" : ""}`,
    ];
    if (hasBreaking) badgeParts.push("⚠️ Breaking");
    md += `> ${badgeParts.join(" &nbsp;·&nbsp; ")}\n\n`;

    if (hasBreaking) {
        md += `> [!CAUTION]\n> This release contains **breaking changes**. Review the Breaking Changes section before upgrading.\n\n`;
    }

    // ── Sections ────────────────────────────────────────────────────────────
    for (const { key, emoji, title } of sections) {
        const items = groups[key];
        if (!items.length) continue;

        md += `### ${emoji} ${title}\n\n`;
        for (const { hash, msg } of items) {
            // strip conventional-commit prefix for cleaner display
            // const cleanMsg = msg.replace(
            //     /^(feat|fix|perf|refactor|docs?|chore|build|ci)[:(][^)]*\)?:?\s*/i,
            //     "",
            // );
            const cleanMsg = msg.replace(
                /^(feat|fix|perf|refactor|docs?|chore|build|ci)(?:\([^)]*\))?!?:\s*/i,
                "",
            );
            md += `- ${cleanMsg}\n`;
        }
        md += "\n";
    }

    // ── Footer ───────────────────────────────────────────────────────────────
    md += `---\n`;
    md += `\n*Full diff: [v${version}](${repoUrl}/compare/HEAD...v${version})*\n\n`;

    return md;
}

/** Renders a lightweight GitHub Release body (no hashes, friendly prose). */
function renderReleaseNotes(version, commits, repoUrl = "") {
    const date = new Date().toISOString().split("T")[0];
    const groups = parseCommits(commits);

    const sections = [
        { key: "breaking", emoji: "💥", title: "Breaking Changes" },
        { key: "feat", emoji: "✨", title: "What's New" },
        { key: "fix", emoji: "🐛", title: "Bug Fixes" },
        { key: "perf", emoji: "⚡", title: "Performance" },
        { key: "refactor", emoji: "♻️", title: "Internals" },
        { key: "docs", emoji: "📖", title: "Documentation" },
        { key: "chore", emoji: "🔧", title: "Maintenance" },
        { key: "other", emoji: "📦", title: "Other" },
    ];

    let md = "";

    md += `## 🚀 Release v${version}\n\n`;
    md += `Released on **${date}**.\n\n`;

    for (const { key, emoji, title } of sections) {
        const items = groups[key];
        if (!items.length) continue;

        md += `### ${emoji} ${title}\n`;
        for (const { msg } of items) {
            const cleanMsg = msg.replace(
                /^(feat|fix|perf|refactor|docs?|chore|build|ci)[:(][^)]*\)?:?\s*/i,
                "",
            );
            md += `- ${cleanMsg}\n`;
        }
        md += "\n";
    }

    if (repoUrl) {
        md += `---\n\n`;
        md += `📋 [Full Changelog](${repoUrl}/blob/main/CHANGELOG.md)\n`;
    }

    return md;
}

// ─────────────────────────────────────────────
// ReleaseManager
// ─────────────────────────────────────────────
class ReleaseManager {
    constructor(options = {}) {
        this.log = new Logger();
        this.packageJsonPath = join(projectRoot, "package.json");
        this.changelogPath = join(projectRoot, "CHANGELOG.md");
        this.verbose = options.verbose || false;
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    _exec(cmd, label) {
        const spin = new Spinner(label || cmd).start();
        try {
            const out = execSync(cmd, {
                encoding: "utf8",
                stdio: ["pipe", "pipe", "pipe"],
            }).trim();
            spin.succeed(label || cmd);
            if (this.verbose && out) this.log.debug(out);
            return out;
        } catch (err) {
            spin.fail(`${label || cmd} — ${err.message.split("\n")[0]}`);
            throw err;
        }
    }

    _pkg() {
        return JSON.parse(readFileSync(this.packageJsonPath, "utf8"));
    }

    _repoUrl() {
        try {
            const remote = execSync("git remote get-url origin", {
                encoding: "utf8",
                stdio: "pipe",
            }).trim();
            return remote
                .replace(/\.git$/, "")
                .replace(/^git@([^:]+):/, "https://$1/");
        } catch {
            return "";
        }
    }

    // ── Version ──────────────────────────────────────────────────────────────

    getCurrentVersion() {
        return this._pkg().version;
    }

    getNextVersion(current, type) {
        const [rawBase, pre] = current.split("-");
        let [major, minor, patch] = rawBase.split(".").map(Number);

        switch (type) {
            case "major":
                return `${major + 1}.0.0`;
            case "minor":
                return `${major}.${minor + 1}.0`;
            case "patch":
                return `${major}.${minor}.${patch + 1}`;
            case "premajor":
                return `${major + 1}.0.0-alpha.1`;
            case "preminor":
                return `${major}.${minor + 1}.0-alpha.1`;
            case "prepatch":
                return `${major}.${minor}.${patch + 1}-alpha.1`;
            case "prerelease": {
                if (pre) {
                    const [tag, n] = pre.split(".");
                    return `${rawBase}-${tag}.${parseInt(n || "0") + 1}`;
                }
                return `${major}.${minor}.${patch + 1}-alpha.1`;
            }
            default:
                throw new Error(`Unknown release type: ${type}`);
        }
    }

    // ── File operations ──────────────────────────────────────────────────────

    updatePackageVersion(newVersion) {
        const spin = new Spinner(
            `Updating package.json → ${newVersion}`,
        ).start();
        const pkg = this._pkg();
        pkg.version = newVersion;
        writeFileSync(
            this.packageJsonPath,
            JSON.stringify(pkg, null, 2) + "\n",
        );
        spin.succeed(`package.json → v${newVersion}`);
        this.log.ok(`package.json updated to ${newVersion}`);
    }

    getCommitsSinceLastTag() {
        try {
            const lastTag = execSync("git describe --tags --abbrev=0", {
                encoding: "utf8",
                stdio: "pipe",
            }).trim();
            this.log.info(`Last tag: ${lastTag}`);
            const raw = execSync(`git log ${lastTag}..HEAD --format="%H %s"`, {
                encoding: "utf8",
                stdio: "pipe",
            }).trim();
            return raw ? raw.split("\n") : [];
        } catch {
            this.log.warn("No previous tags found — using full commit history");
            const raw = execSync('git log --format="%H %s"', {
                encoding: "utf8",
                stdio: "pipe",
            }).trim();
            return raw ? raw.split("\n") : [];
        }
    }

    updateChangelog(version, commits) {
        const spin = new Spinner("Generating CHANGELOG.md entry").start();
        const repoUrl = this._repoUrl();
        const newEntry = renderChangelog(version, commits, repoUrl);

        let existing = "";
        try {
            existing = readFileSync(this.changelogPath, "utf8");
        } catch {
            existing =
                "# Changelog\n\nAll notable changes to this project will be documented in this file.\nThis project adheres to [Semantic Versioning](https://semver.org/).\n\n";
        }

        // Insert after header, before first existing ## entry
        const lines = existing.split("\n");
        const firstEntryIdx = lines.findIndex((l) => l.startsWith("## "));

        let updated;
        if (firstEntryIdx === -1) {
            updated = existing.trimEnd() + "\n\n" + newEntry;
        } else {
            const before = lines.slice(0, firstEntryIdx).join("\n");
            const after = lines.slice(firstEntryIdx).join("\n");
            updated = before + "\n" + newEntry + after;
        }

        writeFileSync(this.changelogPath, updated);
        spin.succeed("CHANGELOG.md updated");
        this.log.ok(`Changelog entry written for v${version}`);
    }

    // ── Git ──────────────────────────────────────────────────────────────────

    validateGitState() {
        const spin = new Spinner("Checking git working tree").start();
        try {
            const status = execSync("git status --porcelain", {
                encoding: "utf8",
                stdio: "pipe",
            }).trim();
            const dirty = status
                .split("\n")
                .filter((l) => l && !l.startsWith("?? ")) // ignore untracked
                .filter(
                    (l) =>
                        !l.includes("package.json") &&
                        !l.includes("CHANGELOG.md"),
                );

            if (dirty.length > 0) {
                spin.warn(
                    "Working tree has uncommitted changes (non-blocking)",
                );
                this.log.warn(`Dirty files:\n${dirty.join("\n")}`);
            } else {
                spin.succeed("Working tree clean");
            }
        } catch (err) {
            spin.fail("git status failed");
            throw err;
        }
    }

    createGitTag(version) {
        this._exec("git add .", "Staging release files");
        this._exec(
            `git commit -m "chore(release): v${version} 🚀"`,
            `Committing release v${version}`,
        );
        this._exec(
            `git tag -a v${version} -m "Release v${version}"`,
            `Tagging v${version}`,
        );
        this.log.ok(`Created annotated tag v${version}`);
    }

    pushToRemote(branch = "main") {
        this._exec(`git push origin ${branch}`, `Pushing ${branch} to remote`);
        this._exec("git push origin --tags", "Pushing tags to remote");
        this.log.ok("Remote updated");
    }

    // ── GitHub Release ───────────────────────────────────────────────────────

    createGitHubRelease(version, commits) {
        const spin = new Spinner("Creating GitHub Release").start();
        const repoUrl = this._repoUrl();
        const body = renderReleaseNotes(version, commits, repoUrl);
        const notesFile = join(projectRoot, ".release-notes-tmp.md");
        const isPre = /-(alpha|beta|rc)/.test(version);

        try {
            writeFileSync(notesFile, body);
            const preFlag = isPre ? "--prerelease" : "--latest";
            execSync(
                `gh release create v${version} --title "v${version}" --notes-file "${notesFile}" ${preFlag}`,
                { encoding: "utf8", stdio: "pipe" },
            );
            try {
                execSync(`rm "${notesFile}"`);
            } catch {
                /* ignore */
            }
            spin.succeed(`GitHub Release v${version} created`);
            this.log.ok(`GitHub release: ${repoUrl}/releases/tag/v${version}`);
        } catch (err) {
            try {
                execSync(`rm "${notesFile}"`);
            } catch {
                /* ignore */
            }
            spin.warn("GitHub CLI unavailable — skipping GitHub release");
            this.log.warn(`Manual release required: ${repoUrl}/releases/new`);
        }
    }

    // ── Banner ───────────────────────────────────────────────────────────────

    _printBanner(current, next, type) {
        const width = 54;
        const border = paint(C.bCyan, "═".repeat(width));
        const pad = (s, w) => s + " ".repeat(Math.max(0, w - s.length));
        const row = (content) =>
            `${paint(C.bCyan, "║")} ${pad(content, width - 3)} ${paint(C.bCyan, "║")}`;

        // strip ANSI for length calculation
        const vl = (s) => s.replace(/\x1b\[[0-9;]*m/g, "").length;
        const padAnsi = (s, w) => s + " ".repeat(Math.max(0, w - vl(s)));

        console.log(`\n${paint(C.bCyan, "╔" + "═".repeat(width) + "╗")}`);
        console.log(row(bold("  🚀  Release Manager")));
        console.log(`${paint(C.bCyan, "╠" + "═".repeat(width) + "╣")}`);
        console.log(
            `${paint(C.bCyan, "║")} ${padAnsi(
                `  ${dim("type")}    ${bold(paint(C.bMagenta, type))}`,
                width - 1,
            )}${paint(C.bCyan, "║")}`,
        );
        console.log(
            `${paint(C.bCyan, "║")} ${padAnsi(
                `  ${dim("from")}    ${paint(C.yellow, current)}`,
                width - 1,
            )}${paint(C.bCyan, "║")}`,
        );
        console.log(
            `${paint(C.bCyan, "║")} ${padAnsi(
                `  ${dim("to  ")}    ${paint(C.bGreen, next)}`,
                width - 1,
            )}${paint(C.bCyan, "║")}`,
        );
        console.log(`${paint(C.bCyan, "╚" + "═".repeat(width) + "╝")}\n`);
    }

    _printSuccess(version, elapsed) {
        const secs = (elapsed / 1000).toFixed(1);
        console.log(
            `\n${paint(C.bGreen, "╔══════════════════════════════════════════════════╗")}`,
        );
        console.log(
            `${paint(C.bGreen, "║")}  ${bold("✅  Release completed successfully!")}               ${paint(C.bGreen, "║")}`,
        );
        console.log(
            `${paint(C.bGreen, "║")}  ${dim(`Version  `)}${paint(C.bWhite, `v${version}`).padEnd(10)}  ${dim(`Time  `)}${paint(C.bWhite, `${secs}s`)}           ${paint(C.bGreen, "║")}`,
        );
        console.log(
            `${paint(C.bGreen, "╚══════════════════════════════════════════════════╝")}\n`,
        );
    }

    // ── Main entrypoint ──────────────────────────────────────────────────────

    async release(releaseType, options = {}) {
        const {
            dryRun = false,
            skipGitHub = false,
            skipPush = false,
        } = options;
        const startTime = Date.now();

        const currentVersion = this.getCurrentVersion();
        const nextVersion = this.getNextVersion(currentVersion, releaseType);

        this._printBanner(currentVersion, nextVersion, releaseType);

        if (dryRun) {
            this.log.warn("DRY RUN — no changes will be written");
            const commits = this.getCommitsSinceLastTag();
            this.log.info(`Commits to include: ${commits.length}`);
            console.log(
                "\n" + dim("── Preview: Changelog entry ─────────────────────"),
            );
            const repoUrl = this._repoUrl();
            console.log(renderChangelog(nextVersion, commits, repoUrl));
            console.log(
                dim("─────────────────────────────────────────────────\n"),
            );
            return;
        }

        // Pre-flight checks
        this.validateGitState();

        // Gather commits
        const spin = new Spinner(
            "Collecting commits since last release",
        ).start();
        const commits = this.getCommitsSinceLastTag();
        spin.succeed(`${commits.length} commit(s) collected`);
        this.log.info(`Commits: ${commits.length}`);

        // File updates
        this.updatePackageVersion(nextVersion);
        this.updateChangelog(nextVersion, commits);

        // Git
        this.createGitTag(nextVersion);

        if (!skipPush) {
            this.pushToRemote();
        } else {
            this.log.warn("Push skipped (--skip-push)");
        }

        // GitHub
        if (!skipGitHub && !skipPush) {
            this.createGitHubRelease(nextVersion, commits);
        } else {
            this.log.warn("GitHub release skipped");
        }

        // Done
        this._printSuccess(nextVersion, Date.now() - startTime);
        this.log.summary();
    }
}

// ─────────────────────────────────────────────
// CLI
// ─────────────────────────────────────────────

function showUsage() {
    console.log(`
${bold("Usage:")}
  ${paint(C.bCyan, "npm run release")} ${paint(C.bMagenta, "<type>")} ${dim("[options]")}

${bold("Release Types:")}
  ${paint(C.bGreen, "patch")}       1.0.0 → 1.0.1   ${dim("(bug fixes)")}
  ${paint(C.bGreen, "minor")}       1.0.0 → 1.1.0   ${dim("(new features)")}
  ${paint(C.bGreen, "major")}       1.0.0 → 2.0.0   ${dim("(breaking changes)")}
  ${paint(C.yellow, "prepatch")}    1.0.0 → 1.0.1-alpha.1
  ${paint(C.yellow, "preminor")}    1.0.0 → 1.1.0-alpha.1
  ${paint(C.yellow, "premajor")}    1.0.0 → 2.0.0-alpha.1
  ${paint(C.yellow, "prerelease")}  1.0.1-alpha.1 → 1.0.1-alpha.2

${bold("Options:")}
  ${paint(C.bCyan, "--dry-run")}      Preview without writing anything
  ${paint(C.bCyan, "--skip-push")}    Skip git push
  ${paint(C.bCyan, "--skip-github")}  Skip GitHub Release creation
  ${paint(C.bCyan, "--verbose")}      Show extra debug output
  ${paint(C.bCyan, "--help")}         Show this message

${bold("Examples:")}
  npm run release patch
  npm run release minor --dry-run
  npm run release prerelease --skip-github --verbose
`);
}

async function main() {
    const args = process.argv.slice(2);
    const releaseType = args.find((a) => !a.startsWith("-"));
    const options = {
        dryRun: args.includes("--dry-run"),
        skipGitHub: args.includes("--skip-github"),
        skipPush: args.includes("--skip-push"),
        verbose: args.includes("--verbose"),
    };

    if (args.includes("--help") || !releaseType) {
        showUsage();
        process.exit(0);
    }

    if (!Object.values(RELEASE_TYPES).includes(releaseType)) {
        console.error(
            paint(C.bRed, `\n✖ Invalid release type: "${releaseType}"\n`),
        );
        showUsage();
        process.exit(1);
    }

    const manager = new ReleaseManager(options);

    try {
        await manager.release(releaseType, options);
    } catch (err) {
        manager.log.error(`Release failed: ${err.message}`);
        if (options.verbose) console.error(err.stack);
        manager.log.summary();
        process.exit(1);
    }
}

main();
