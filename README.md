# iamdhakrey.dev

A terminal-style portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- 🖥️ Linux terminal interface
- 📁 Interactive file system navigation  
- 📝 Blog system with markdown support
- 👤 Dynamic profile page
- 🚀 **Static GitHub projects integration** (no API rate limits!)
- 📱 Fully responsive design

## GitHub Projects Integration

This portfolio uses the GitHub CLI (`gh`) to fetch repository data statically, avoiding API rate limits and ensuring fast load times.

### How it works:

1. **Data Collection**: The `scripts/fetch-github-data.sh` script uses `gh` CLI to fetch all your repositories
2. **Static Generation**: Repository data is processed and saved as `public/github-projects.json`
3. **Client Loading**: The React app loads this static file (no live API calls)
4. **Easy Updates**: Run the update script whenever you want to refresh your project data

### Usage:

```bash
# Update GitHub data (requires gh CLI authentication)
npm run update-github

# Or run the script directly
./scripts/fetch-github-data.sh
```

### Authentication:

Make sure you're authenticated with GitHub CLI:
```bash
gh auth login
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Update GitHub projects data
npm run update-github

# Build for production
npm run build
```

## Commands Available in Terminal

- `help` - Show available commands
- `projects` - Navigate to projects page
- `cd projects` - Change to projects directory
- `profile` - View profile information
- `blogs` - Browse blog posts
- `ls` - List directory contents
- `tree` - Show directory structure
- And many more Linux-style commands!

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **GitHub CLI** for static data fetching
- **Vite** for build tooling