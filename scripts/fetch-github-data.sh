#!/bin/bash

# GitHub Repository Data Fetcher using GitHub CLI
# This script fetches repository information and generates a static JSON file

# Check if gh CLI is installed and authenticated
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed. Please install it first."
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub CLI. Please run 'gh auth login' first."
    exit 1
fi

echo "✅ GitHub CLI is authenticated"

# Fetch user information
echo "📊 Fetching user information..."
USER_DATA=$(gh api user)

# Fetch all repositories
echo "📁 Fetching repositories..."
REPOS_DATA=$(gh repo list --limit 100 --json name,description,url,homepageUrl,primaryLanguage,stargazerCount,forkCount,createdAt,updatedAt,pushedAt,repositoryTopics,licenseInfo,isPrivate,isFork,isArchived)

# Create enhanced repositories with language data
echo "🔍 Enhancing repositories with language details..."
ENHANCED_REPOS_DATA=$(echo "$REPOS_DATA" | jq '
map(. + {
  primaryLanguages: [
    .primaryLanguage.name,
    (.primaryLanguage.name | if . == "TypeScript" then "JavaScript"
     elif . == "JavaScript" then "HTML"
     elif . == "Python" then "Shell"
     elif . == "Rust" then "TOML"
     elif . == "Go" then "Docker"
     elif . == "Java" then "Kotlin"
     elif . == "C++" then "C"
     elif . == "Vue" then "JavaScript"
     elif . == "React" then "TypeScript"
     elif . == "CSS" then "HTML"
     elif . == "SCSS" then "CSS"
     elif . == "Shell" then "Makefile"
     else null
     end)
  ] | map(select(. != null)) | unique
})')

# Create output directory
mkdir -p public

# Generate the projects data file
cat > public/github-projects.json << EOF
{
  "lastUpdated": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "user": $USER_DATA,
  "repositories": $ENHANCED_REPOS_DATA,
  "stats": {
    "totalRepos": $(echo "$ENHANCED_REPOS_DATA" | jq 'length'),
    "totalStars": $(echo "$ENHANCED_REPOS_DATA" | jq 'map(select(.isFork == false and .isPrivate == false) | .stargazerCount) | add // 0'),
    "totalForks": $(echo "$ENHANCED_REPOS_DATA" | jq 'map(select(.isFork == false and .isPrivate == false) | .forkCount) | add // 0'),
    "languages": $(echo "$ENHANCED_REPOS_DATA" | jq 'map(select(.isFork == false and .isArchived == false and .primaryLanguage != null) | .primaryLanguage.name) | unique'),
    "allLanguages": $(echo "$ENHANCED_REPOS_DATA" | jq '[.[] | select(.isFork == false and .isArchived == false) | .primaryLanguages[]?] | unique | sort')
  },
  "featured": $(echo "$ENHANCED_REPOS_DATA" | jq '[.[] | select(.isFork == false and .isArchived == false and .description != null and .description != "") | {
    name,
    description,
    html_url: .url,
    homepage: .homepageUrl,
    language: .primaryLanguage.name,
    primaryLanguages: .primaryLanguages,
    stargazers_count: .stargazerCount,
    forks_count: .forkCount,
    created_at: .createdAt,
    updated_at: .updatedAt,
    pushed_at: .pushedAt,
    topics: .repositoryTopics,
    license: .licenseInfo
  }] | sort_by(.stargazers_count) | reverse | .[0:12]'),
  "byLanguage": $(echo "$ENHANCED_REPOS_DATA" | jq 'group_by(.primaryLanguage.name) | map({key: .[0].primaryLanguage.name, value: map(select(.isFork == false and .isArchived == false and .description != null))}) | map(select(.key != null)) | from_entries')
}
EOF

echo "✅ GitHub data fetched successfully!"
echo "📄 Generated: public/github-projects.json"

# Show some stats
TOTAL_REPOS=$(echo "$ENHANCED_REPOS_DATA" | jq 'map(select(.isFork == false and .isPrivate == false)) | length')
TOTAL_STARS=$(echo "$ENHANCED_REPOS_DATA" | jq 'map(select(.isFork == false) | .stargazerCount) | add // 0')
TOTAL_FORKS=$(echo "$ENHANCED_REPOS_DATA" | jq 'map(select(.isFork == false and .isPrivate == false) | .forkCount) | add // 0')

echo ""
echo "📈 Repository Stats:"
echo "   • Total Public Repos: $TOTAL_REPOS"
echo "   • Total Stars: $TOTAL_STARS"
echo "   • Total Forks: $TOTAL_FORKS"
echo ""
echo "🚀 You can now use this data in your React application!"
