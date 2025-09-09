#!/usr/bin/env python3

import json
import subprocess
import sys
import os
from datetime import datetime, timezone
from typing import Dict, List, Any, Optional

class GitHubDataFetcher:
    def __init__(self):
        pass

    def run_command(self, command: List[str]) -> str:
        """Run a command and return its output."""
        try:
            result = subprocess.run(command, capture_output=True, text=True, check=True)
            return result.stdout.strip()
        except subprocess.CalledProcessError as e:
            print(f"❌ Error running command: {' '.join(command)}")
            print(f"   Error: {e.stderr}")
            sys.exit(1)

    def check_gh_cli(self) -> bool:
        """Check if GitHub CLI is installed and authenticated."""
        # Check if gh CLI is installed
        try:
            subprocess.run(['gh', '--version'], capture_output=True, check=True)
        except (subprocess.CalledProcessError, FileNotFoundError):
            print("❌ GitHub CLI (gh) is not installed. Please install it first.")
            return False

        # Check if user is authenticated
        try:
            subprocess.run(['gh', 'auth', 'status'], capture_output=True, check=True)
            print("✅ GitHub CLI is authenticated")
            return True
        except subprocess.CalledProcessError:
            print("❌ Not authenticated with GitHub CLI. Please run 'gh auth login' first.")
            return False

    def fetch_user_data(self) -> Dict[str, Any]:
        """Fetch user information from GitHub API."""
        print("📊 Fetching user information...")
        user_json = self.run_command(['gh', 'api', 'user'])
        return json.loads(user_json)

    def fetch_repositories(self) -> List[Dict[str, Any]]:
        """Fetch all repositories."""
        print("📁 Fetching repositories...")
        repo_json = self.run_command([
            'gh', 'repo', 'list',
            '--limit', '100',
            '--json', 'name,description,url,homepageUrl,primaryLanguage,languages,stargazerCount,forkCount,createdAt,updatedAt,pushedAt,repositoryTopics,licenseInfo,isPrivate,isFork,isArchived'
        ])
        return json.loads(repo_json)

    def enhance_repositories(self, repos: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Enhance repositories with language data."""
        print("🔍 Processing repositories with language details...")
        
        enhanced_repos = []
        for repo in repos:
            if repo.get('isFork', False):
                continue
            enhanced_repo = repo.copy()
            
            # Get language data from the languages field
            repo_languages = {}
            primary_languages = []
            
            if repo.get('languages'):
                # Convert the languages array to a dictionary with sizes
                for lang_info in repo['languages']:
                    if isinstance(lang_info, dict) and 'node' in lang_info and 'size' in lang_info:
                        lang_name = lang_info['node']['name']
                        lang_size = lang_info['size']
                        repo_languages[lang_name] = lang_size
                
                # Sort languages by size and get top 2
                if repo_languages:
                    sorted_languages = sorted(repo_languages.items(), key=lambda x: x[1], reverse=True)
                    # Take top 2 languages by size
                    primary_languages = [lang[0] for lang in sorted_languages[:2]]
            
            # Fallback to primary language if no languages data or empty
            if not primary_languages and repo.get('primaryLanguage') and repo['primaryLanguage'].get('name'):
                primary_languages = [repo['primaryLanguage']['name']]
            
            enhanced_repo['primaryLanguages'] = primary_languages
            enhanced_repo['languageStats'] = repo_languages
            enhanced_repos.append(enhanced_repo)
        
        return enhanced_repos

    def calculate_stats(self, repos: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Calculate repository statistics."""
        total_repos = len([r for r in repos if not r.get('isFork', False) and not r.get('isPrivate', False)])
        
        total_stars = sum(
            r.get('stargazerCount', 0) 
            for r in repos 
            if not r.get('isFork', False) and not r.get('isPrivate', False)
        )
        
        total_forks = sum(
            r.get('forkCount', 0) 
            for r in repos 
            if not r.get('isFork', False) and not r.get('isPrivate', False)
        )
        
        # Get unique languages from primaryLanguage field
        languages = list(set(
            r['primaryLanguage']['name'] 
            for r in repos 
            if (not r.get('isFork', False) and 
                not r.get('isArchived', False) and 
                r.get('primaryLanguage') and 
                r['primaryLanguage'].get('name'))
        ))
        
        # Get all languages including primary languages
        all_languages = set()
        for repo in repos:
            if (not repo.get('isFork', False) and 
                not repo.get('isArchived', False) and 
                repo.get('primaryLanguages')):
                all_languages.update(repo['primaryLanguages'])
        
        all_languages = sorted(list(all_languages))
        
        return {
            'totalRepos': total_repos,
            'totalStars': total_stars,
            'totalForks': total_forks,
            'languages': languages,
            'allLanguages': all_languages
        }

    def get_featured_repos(self, repos: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Get featured repositories."""
        featured = []
        
        for repo in repos:
            if (not repo.get('isFork', False) and 
                not repo.get('isArchived', False) and 
                repo.get('description')):
                
                featured_repo = {
                    'name': repo.get('name'),
                    'description': repo.get('description'),
                    'html_url': repo.get('url'),
                    'homepage': repo.get('homepageUrl'),
                    'language': repo.get('primaryLanguage', {}).get('name'),
                    'primaryLanguages': repo.get('primaryLanguages', []),
                    'stargazers_count': repo.get('stargazerCount', 0),
                    'forks_count': repo.get('forkCount', 0),
                    'created_at': repo.get('createdAt'),
                    'updated_at': repo.get('updatedAt'),
                    'pushed_at': repo.get('pushedAt'),
                    'topics': repo.get('repositoryTopics', []),
                    'license': repo.get('licenseInfo')
                }
                featured.append(featured_repo)
        
        # Sort by stars and take top 12
        featured.sort(key=lambda x: x.get('stargazers_count', 0), reverse=True)
        return featured[:12]

    def group_by_language(self, repos: List[Dict[str, Any]]) -> Dict[str, List[Dict[str, Any]]]:
        """Group repositories by primary language."""
        by_language = {}
        
        for repo in repos:
            if (not repo.get('isFork', False) and 
                not repo.get('isArchived', False) and 
                repo.get('description') and
                repo.get('primaryLanguage') and 
                repo['primaryLanguage'].get('name')):
                
                lang = repo['primaryLanguage']['name']
                if lang not in by_language:
                    by_language[lang] = []
                by_language[lang].append(repo)
        
        return by_language

    def create_output_directory(self):
        """Create the public directory if it doesn't exist."""
        os.makedirs('public', exist_ok=True)

    def save_data(self, data: Dict[str, Any]):
        """Save the data to JSON file."""
        self.create_output_directory()
        
        with open('src/data/github-projects.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

    def display_stats(self, stats: Dict[str, Any]):
        """Display repository statistics."""
        print("\n📈 Repository Stats:")
        print(f"   • Total Public Repos: {stats['totalRepos']}")
        print(f"   • Total Stars: {stats['totalStars']}")
        print(f"   • Total Forks: {stats['totalForks']}")
        print(f"\n🚀 You can now use this data in your Astro application!")

    def run(self):
        """Main execution method."""
        print("GitHub Repository Data Fetcher")
        print("=" * 50)
        
        if not self.check_gh_cli():
            sys.exit(1)
        
        # Fetch data
        user_data = self.fetch_user_data()
        repos_data = self.fetch_repositories()
        enhanced_repos = self.enhance_repositories(repos_data)
        
        # Calculate statistics and organize data
        stats = self.calculate_stats(enhanced_repos)
        featured = self.get_featured_repos(enhanced_repos)
        
        # Remove featured repos from the main repositories list to avoid duplication
        featured_repo_names = {repo['name'] for repo in featured}
        non_featured_repos = [repo for repo in enhanced_repos if repo.get('name') not in featured_repo_names]
        
        by_language = self.group_by_language(non_featured_repos)
        
        # Create final data structure
        final_data = {
            'lastUpdated': datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z'),
            'user': user_data,
            'repositories': non_featured_repos,
            'stats': stats,
            'featured': featured,
            'byLanguage': by_language
        }
        
        # Save data
        self.save_data(final_data)
        
        print("✅ GitHub data fetched successfully!")
        print("📄 Generated: src/data/github-projects.json")
        
        # Display stats
        self.display_stats(stats)

def main():
    """Main entry point."""
    fetcher = GitHubDataFetcher()
    try:
        fetcher.run()
    except KeyboardInterrupt:
        print("\n❌ Operation cancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"❌ An error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()