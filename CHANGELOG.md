# Changelog

All notable changes to this project will be documented in this file.

## [2.4.3](https://github.com/iamdhakrey/terminal-portfolio/releases/tag/v2.4.3) — 2026-04-09

> 🗓 2026-04-09 &nbsp;·&nbsp; 📦 2 commits

### 🔧 Maintenance

- bump vite from 7.3.1 to 7.3.2

### 📦 Other Changes

- Remove duplicate Footer component in BlogPost layout (Issue #21)

---

*Full diff: [v2.4.3](https://github.com/iamdhakrey/terminal-portfolio/compare/HEAD...v2.4.3)*

## [2.4.2](https://github.com/iamdhakrey/terminal-portfolio/releases/tag/v2.4.2) — 2026-04-06

> 🗓 2026-04-06 &nbsp;·&nbsp; 📦 7 commits

### ✨ New Features

- Add permissions section to Node.js CI workflow

### 🔧 Maintenance

- add pull request template and code of conduct files
- add pull request template, code of conduct, and update release script
- bump markdown-it from 14.1.0 to 14.1.1
- bump picomatch
- bump defu from 6.1.4 to 6.1.6
- bump h3 from 1.15.5 to 1.15.11

---

*Full diff: [v2.4.2](https://github.com/iamdhakrey/terminal-portfolio/compare/HEAD...v2.4.2)*

## [2.4.1](https://github.com/iamdhakrey/Github-Profile/releases/tag/v2.4.1) — 2026-04-04

> 🗓 2026-04-04 &nbsp;·&nbsp; 📦 6 commits

### 📦 Other Changes

- 0b7e7447f39769576bcc0807378a4609 Merge branch 'main' of github.com:iamdhakrey/Github-Profile [`7d79ff6`](https://github.com/iamdhakrey/Github-Profile/commit/7d79ff6)
- a9f4e6bbd4dabeba7d79d96f7f911789 chore: update release versioning logic in bump-and-release script [`9a13457`](https://github.com/iamdhakrey/Github-Profile/commit/9a13457)
- 09dbf3a112057f55f6220d196852d894 Merge pull request #15 from iamdhakrey/dependabot/npm_and_yarn/rollup-4.60.0 [`e014ca7`](https://github.com/iamdhakrey/Github-Profile/commit/e014ca7)
- bfd5092fc41a50fad1777f189871ff01 Merge pull request #16 from iamdhakrey/dependabot/npm_and_yarn/tar-7.5.13 [`9646769`](https://github.com/iamdhakrey/Github-Profile/commit/9646769)
- 1384685ef98451a153ebee67287b5dbb chore(deps): bump tar from 7.5.7 to 7.5.13 [`3163d1f`](https://github.com/iamdhakrey/Github-Profile/commit/3163d1f)
- 0b3c304eb0ae01844076968f25b8f8c2 chore(deps): bump rollup from 4.45.0 to 4.60.0 [`eab4c06`](https://github.com/iamdhakrey/Github-Profile/commit/eab4c06)

---

*Full diff: [v2.4.1](https://github.com/iamdhakrey/Github-Profile/compare/HEAD...v2.4.1)*

## [2.4.0] - 2026-04-03

### ✨ Features
- feat: add RelatedPosts component and integrate it into BlogPost layout with TOC support
- feat: implement related posts component and update blog schema to support cross-linking and metadata
- feat: enhance blog Pre and Next blogs
- feat: add interactive table of contents

### 📝 Other Changes
- chore: revert project version to 2.3.0
- chore: release v2.4.0
- chore: revert project version to 2.3.0
- chore: release v2.5.0
- chore: release v2.4.0


## [2.4.0] - 2026-04-03

### ✨ Features
- feat: add RelatedPosts component and integrate it into BlogPost layout with TOC support
- feat: implement related posts component and update blog schema to support cross-linking and metadata
- feat: enhance blog Pre and Next blogs
- feat: add interactive table of contents

### 📝 Other Changes
- chore: revert project version to 2.3.0
- chore: release v2.5.0
- chore: release v2.4.0


## [2.5.0] - 2026-04-03

### ✨ Features
- feat: add RelatedPosts component and integrate it into BlogPost layout with TOC support
- feat: implement related posts component and update blog schema to support cross-linking and metadata
- feat: enhance blog Pre and Next blogs
- feat: add interactive table of contents

### 📝 Other Changes
- chore: release v2.4.0


## [2.4.0] - 2026-04-03


## [2.3.0] - 2026-03-30

### 🐛 Bug Fixes
- fix: correct syntax error in root CSS variable declaration
- fix: correct font MIME types to woff2 and fix syntax error in global CSS root selector

### 📝 Other Changes
- chore: upgrade astro and associated dependencies to latest versions
- refactor: migrate hardcoded Tailwind colors to CSS variables for theme support across components and pages
- refactor: migrate UI components to CSS variables and implement theme persistence in local storage
- refactor: migrate hardcoded styles to CSS variables and implement theme persistence in localStorage


## [2.2.2] - 2026-01-29

### 📝 Other Changes
- chore(deps): update mdast-util-to-hast and minizlib versions, remove mkdirp
- chore: update project dependencies
- chore: update dependencies to latest versions
- Merge pull request #14 from iamdhakrey/dependabot/npm_and_yarn/astro-5.16.4
- chore(deps): bump astro from 5.13.5 to 5.16.4
- Merge pull request #13 from iamdhakrey/dependabot/npm_and_yarn/multi-07f73e8078
- chore(deps): bump vite


## [2.2.1] - 2025-12-02

### ✨ Features
- feat: add blog index number of blogs list page


## [2.2.0] - 2025-12-02

### 📝 Other Changes
- chore: release v2.1.0


## [2.0.0] - 2025-09-15

### ✨ Features
- feat: add SVG images for blog content and update references
- feat: add GitHub data types for repositories and user statistics
- feat: create AllRepo component to display all GitHub projects and repositories with details
- feat: add FeatureRepo component to display featured GitHub projects with details
- feat: add ProjectsUpdateDate component to display last updated information
- feat: create projects page to display GitHub project statistics and details
- feat: implement fetchGitHubData function to retrieve GitHub project data
- feat: add getLanguageColor function to return color codes for programming languages
- feat: enhance GitHub data fetching by excluding forked repositories and updating output path
- feat: implement GitHub data fetching and processing script
- feat: add RSS feed generation for blog posts
- feat: add dynamic blog post routing with getStaticPaths function
- feat: add CommandOutput and BlogPost components for command output display and blog layout
- feat: update package.json for Astro integration and remove unused dependencies
- feat: add CommandOutputType interface for command output handling
- feat: add BlogContent component for rendering blog posts with markdown support
- feat: add BlogHeader component for blog post display
- feat: add Footer component for layout and status display
- feat: add FormattedDate component for date formatting
- feat: implement Header component with terminal-style navigation and theme toggle
- feat: add HeaderLink component for navigation with active state styling
- feat: add blog collection configuration for Markdown and MDX files
- feat: add BaseHead component for global metadata and font preloading
- feat: add blog index page with dynamic post rendering
- feat: create interactive terminal interface with command support
- feat: add global constants for site configuration
- feat: implement markdown rendering utility with syntax highlighting
- feat: add favicon SVG for improved branding
- feat: add blog linking guide and related images
- feat: add initial Astro configuration file

### 🐛 Bug Fixes
- fix: update project name and homepage in package.json
- fix: update package-lock.json to include markdown-it and its dependencies
- fix: update README for project name and improve clarity
- fix: remove console.log statement from AllRepo component
- fix: comment out profile link in profile configuration
- fix: update image paths in blog linking guide for correct resolution
- fix: update muted theme color for better visibility

### 📝 Other Changes
- chore: release v2.0.0
- chore: release v2.0.0
- chore: update githubdata
- Merge pull request #12 from iamdhakrey/astro
- docs: update README to reflect active development status and encourage contributions
- Add GitHub projects data for user iamdhakrey including repositories, stats, and featured projects
- Implement code changes to enhance functionality and improve performance
- style: update font-family variables for consistency across themes
- style: format profile.config.ts for consistency and readability
- style: format tsconfig.json for improved readability
- chore: update .gitignore to include additional files and directories
- refactor: remove unused utility files and components


## [2.0.0] - 2025-09-15

### ✨ Features
- feat: add SVG images for blog content and update references
- feat: add GitHub data types for repositories and user statistics
- feat: create AllRepo component to display all GitHub projects and repositories with details
- feat: add FeatureRepo component to display featured GitHub projects with details
- feat: add ProjectsUpdateDate component to display last updated information
- feat: create projects page to display GitHub project statistics and details
- feat: implement fetchGitHubData function to retrieve GitHub project data
- feat: add getLanguageColor function to return color codes for programming languages
- feat: enhance GitHub data fetching by excluding forked repositories and updating output path
- feat: implement GitHub data fetching and processing script
- feat: add RSS feed generation for blog posts
- feat: add dynamic blog post routing with getStaticPaths function
- feat: add CommandOutput and BlogPost components for command output display and blog layout
- feat: update package.json for Astro integration and remove unused dependencies
- feat: add CommandOutputType interface for command output handling
- feat: add BlogContent component for rendering blog posts with markdown support
- feat: add BlogHeader component for blog post display
- feat: add Footer component for layout and status display
- feat: add FormattedDate component for date formatting
- feat: implement Header component with terminal-style navigation and theme toggle
- feat: add HeaderLink component for navigation with active state styling
- feat: add blog collection configuration for Markdown and MDX files
- feat: add BaseHead component for global metadata and font preloading
- feat: add blog index page with dynamic post rendering
- feat: create interactive terminal interface with command support
- feat: add global constants for site configuration
- feat: implement markdown rendering utility with syntax highlighting
- feat: add favicon SVG for improved branding
- feat: add blog linking guide and related images
- feat: add initial Astro configuration file

### 🐛 Bug Fixes
- fix: update project name and homepage in package.json
- fix: update package-lock.json to include markdown-it and its dependencies
- fix: update README for project name and improve clarity
- fix: remove console.log statement from AllRepo component
- fix: comment out profile link in profile configuration
- fix: update image paths in blog linking guide for correct resolution
- fix: update muted theme color for better visibility

### 📝 Other Changes
- chore: release v2.0.0
- chore: update githubdata
- Merge pull request #12 from iamdhakrey/astro
- docs: update README to reflect active development status and encourage contributions
- Add GitHub projects data for user iamdhakrey including repositories, stats, and featured projects
- Implement code changes to enhance functionality and improve performance
- style: update font-family variables for consistency across themes
- style: format profile.config.ts for consistency and readability
- style: format tsconfig.json for improved readability
- chore: update .gitignore to include additional files and directories
- refactor: remove unused utility files and components


## [2.0.0] - 2025-09-15

### ✨ Features
- feat: add SVG images for blog content and update references
- feat: add GitHub data types for repositories and user statistics
- feat: create AllRepo component to display all GitHub projects and repositories with details
- feat: add FeatureRepo component to display featured GitHub projects with details
- feat: add ProjectsUpdateDate component to display last updated information
- feat: create projects page to display GitHub project statistics and details
- feat: implement fetchGitHubData function to retrieve GitHub project data
- feat: add getLanguageColor function to return color codes for programming languages
- feat: enhance GitHub data fetching by excluding forked repositories and updating output path
- feat: implement GitHub data fetching and processing script
- feat: add RSS feed generation for blog posts
- feat: add dynamic blog post routing with getStaticPaths function
- feat: add CommandOutput and BlogPost components for command output display and blog layout
- feat: update package.json for Astro integration and remove unused dependencies
- feat: add CommandOutputType interface for command output handling
- feat: add BlogContent component for rendering blog posts with markdown support
- feat: add BlogHeader component for blog post display
- feat: add Footer component for layout and status display
- feat: add FormattedDate component for date formatting
- feat: implement Header component with terminal-style navigation and theme toggle
- feat: add HeaderLink component for navigation with active state styling
- feat: add blog collection configuration for Markdown and MDX files
- feat: add BaseHead component for global metadata and font preloading
- feat: add blog index page with dynamic post rendering
- feat: create interactive terminal interface with command support
- feat: add global constants for site configuration
- feat: implement markdown rendering utility with syntax highlighting
- feat: add favicon SVG for improved branding
- feat: add blog linking guide and related images
- feat: add initial Astro configuration file

### 🐛 Bug Fixes
- fix: update project name and homepage in package.json
- fix: update package-lock.json to include markdown-it and its dependencies
- fix: update README for project name and improve clarity
- fix: remove console.log statement from AllRepo component
- fix: comment out profile link in profile configuration
- fix: update image paths in blog linking guide for correct resolution
- fix: update muted theme color for better visibility

### 📝 Other Changes
- chore: update githubdata
- Merge pull request #12 from iamdhakrey/astro
- docs: update README to reflect active development status and encourage contributions
- Add GitHub projects data for user iamdhakrey including repositories, stats, and featured projects
- Implement code changes to enhance functionality and improve performance
- style: update font-family variables for consistency across themes
- style: format profile.config.ts for consistency and readability
- style: format tsconfig.json for improved readability
- chore: update .gitignore to include additional files and directories
- refactor: remove unused utility files and components


## [1.6.1] - 2025-09-03

### 🐛 Bug Fixes
- fix: update terminal header styling for improved appearance


## [1.6.0] - 2025-08-21

### ✨ Features
- feat: update BlogNavigation to use prev and next properties for navigation
- feat: extend blog data structure with image, next, and prev properties
- feat: add navigation properties to blog linking guide and react typescript guide
- feat: extend BlogFile interface with categories, next, and prev properties
- feat: update heading colors in Table of Contents based on level
- feat: update heading styles to use theme-specific colors
- feat: add heading color configurations to theme settings

### 🐛 Bug Fixes
- fix: handle case where current blog is not found in BlogNavigation

### 📝 Other Changes
- Merge pull request #10 from iamdhakrey/blog-navigation-prev-next
- Update src/blogs/BlogNavigation.tsx
- Update README.md
- Merge pull request #8 from iamdhakrey/blog-navigation-prev-next


## [1.5.1] - 2025-08-13

### ✨ Features
- feat: enhance blog listing with likes and featured posts functionality
- feat: add blog likes functionality and enhance blog metadata

### 📝 Other Changes
- Implement code changes to enhance functionality and improve performance
- Implement code changes to enhance functionality and improve performance
- chore: update Node.js version in CI workflow to 24.x


## [1.5.0] - 2025-08-11

### ✨ Features
- feat: update routing to use ModernBlogs component and add HelmetProvider for SEO
- feat: Add modern blog components including BlogHeader, BlogContent, BlogNavigation, CodeBlock, and TableOfContents
- feat: add Linux Mastery Series utility functions
- feat: implement Blogs component with markdown rendering and navigation

### 📝 Other Changes
- chore: add react-helmet-async dependency to package.json


## [1.4.0] - 2025-07-19

### ✨ Features
- feat: implement theme support across Blogs, Footer, Profile, and Projects components
- feat: enhance Navbar component with theme support and toggle functionality
- feat: update BlogList component for theme integration
- feat: update StatusBar styling for theme integration
- feat: enhance terminal theme management and commands
- feat: implement theme context and provider for theme management
- feat: integrate theme provider and configure terminal theme
- feat: add theme configuration for terminal portfolio
- feat: update welcome message handling to use interactive guide instead of ASCII message
- feat: update welcome message display condition and enhance greeting emoji

### 📝 Other Changes
- Merge pull request #7 from iamdhakrey/multi-theme-support


## [1.3.2] - 2025-07-15

### ✨ Features
- feat: add image inclusion guidelines to blog linking guide
- feat: add sample images for blog linking and React TypeScript guides
- feat: update processBlogLinks to handle image paths
- feat: enhance processBlogLinks to handle image paths

### 🐛 Bug Fixes
- fix: correct author formatting in React TypeScript guide


## [1.3.1] - 2025-07-14

### 🐛 Bug Fixes
- fix: update system info display in Navbar component


## [1.3.0] - 2025-07-14

### ✨ Features
- feat: add NotFound route for handling undefined paths
- feat: add interactive 404 Not Found page with terminal interface

### 🐛 Bug Fixes
- fix: comment out OS version in profile configuration
- fix: update system status message to include OS version


## [1.2.2] - 2025-07-14

### 🐛 Bug Fixes
- fix: remove console log from addToOutput function
- fix: log output item and display last command in terminal
- fix: update welcome message to display dynamic hostname
- fix: improve output formatting for neofetch items in Terminal component
- fix: adjust terminal header alignment for improved readability
- fix: update terminal header and links to use dynamic hostname
- fix: improve output formatting in Terminal component

### 📝 Other Changes
- Merge branch 'main' of github.com:iamdhakrey/Github-Profile
- Merge pull request #6 from iamdhakrey/dependabot/npm_and_yarn/brace-expansion-1.1.12
- chore(deps): bump brace-expansion from 1.1.11 to 1.1.12


## [1.2.1] - 2025-07-14

### 📝 Other Changes
- Merge pull request #5 from iamdhakrey/dependabot/npm_and_yarn/multi-a22fa6ddde
- Update node.js.yml
- chore(deps): bump esbuild, @vitejs/plugin-react-swc and vite
- Merge pull request #4 from iamdhakrey/dependabot/npm_and_yarn/micromatch-4.0.8
- chore(deps): bump micromatch from 4.0.5 to 4.0.8
- Merge pull request #3 from iamdhakrey/dependabot/npm_and_yarn/vite-5.4.19
- chore(deps-dev): bump vite from 5.0.9 to 5.4.19
- Merge pull request #2 from iamdhakrey/dependabot/npm_and_yarn/rollup-4.45.0
- chore(deps): bump rollup from 4.9.0 to 4.45.0


## [1.2.0] - 2025-07-14

### 📝 Other Changes
- Merge branch 'main' of github.com:iamdhakrey/Github-Profile
- chore: release v1.2.0
- ✨ chore: update package version to 1.1.1 and remove deprecated fontawesome package
- ✨ feat: enhance welcome message with interactive terminal branding and guidance
- ✨ feat: integrate StatusBar component and adjust layout for fixed footer
- ✨ feat: add StatusBar component for displaying system info and visitor stats
- ✨ feat: enhance Terminal with command aliases, keyboard shortcuts, and analytics tracking
- ✨ feat: add analytics utility for visitor tracking
- ✨ feat: implement SafeCalculator utility for safe mathematical operations
- ✨ feat: add keyboard shortcuts utility and help documentation
- Update README.md
- Update README.md
- Merge pull request #1 from iamdhakrey/dependabot/npm_and_yarn/braces-3.0.3
- chore(deps): bump braces from 3.0.2 to 3.0.3
- Update issue templates
- Create codeql.yml
- 🎨 style: add demo GIF to README and improve visibility


## [1.2.0] - 2025-07-14

### 📝 Other Changes
- ✨ chore: update package version to 1.1.1 and remove deprecated fontawesome package
- ✨ feat: enhance welcome message with interactive terminal branding and guidance
- ✨ feat: integrate StatusBar component and adjust layout for fixed footer
- ✨ feat: add StatusBar component for displaying system info and visitor stats
- ✨ feat: enhance Terminal with command aliases, keyboard shortcuts, and analytics tracking
- ✨ feat: add analytics utility for visitor tracking
- ✨ feat: implement SafeCalculator utility for safe mathematical operations
- ✨ feat: add keyboard shortcuts utility and help documentation
- 🎨 style: add demo GIF to README and improve visibility


## [1.1.1] - 2025-07-11

### 📝 Other Changes
- Merge branch 'main' of github.com:iamdhakrey/Github-Profile
- 🎨 style: improve typography and spacing in Blogs component - Adjusted heading sizes and spacing for better readability - Updated font sizes for various elements to enhance visual hierarchy
- Update README.md
- Merge branch 'main' of github.com:iamdhakrey/Github-Profile
- Implement new feature X to enhance user experience and improve performance
- 🗑️ chore: remove unused blog files and update profile configuration - Deleted linux_commands.md and sudoko.md - Updated availableBlogs in profile configuration to reflect changes - Added tags to blog-linking-guide.md and react-typescript-guide.md
- Update node.js.yml
- Create node.js.yml
- Delete .github/workflows directory
- Create webpack.yml


## [1.1.0] - 2025-07-10

### ✨ Features
- feat: enhance blog navigation and linking features
- feat: integrate blog configuration for dynamic blog file management
- feat: add redirects configuration for index.html
- feat: add availableBlogs property and update featuredPosts and categories in profile configuration
- feat: enhance blog setup and linking features in README.md
- feat: add blog linking guide for enhanced content navigation

### 📝 Other Changes
- chore: remove deprecated firebase configuration and add vercel configuration


## [1.0.0] - 2025-07-10

### ✨ Features
- feat: overhaul README.md for improved clarity and structure
- feat: add profile configuration guide with detailed examples and customization checklist
- feat: enhance Footer component with dynamic status messages and made with love display
- feat: enhance Navbar component with dynamic navigation and system info display
- feat: enhance Profile component with improved data loading and configuration handling
- feat: enhance Terminal component with dynamic configuration and custom commands
- feat: add ProfileConfig interface and default configuration for user profiles
- feat: implement ConfigManager singleton for profile configuration management
- feat: add MIT License file to the repository
- feat: add .env.example for environment variable configuration and update .gitignore to exclude .env file
- feat: update README.md with GitHub projects integration details
- feat: add route for Projects component in App
- feat: add navigation link to Projects in Navbar
- feat: enhance Profile component with GitHub data integration
- feat: add Projects component to display GitHub repositories
- feat: add GitHub data fetching script
- feat: add update scripts for GitHub data fetching
- feat: add 'projects' command and update terminal navigation
- feat: enhance SEO and PWA support in index.html
- feat: add iamdhakrey profile image
- feat: update profile data with enhanced description and skills
- feat: update skills section in profile component
- feat: add profile route to application
- feat: add profile link to navigation bar
- feat: implement profile component with SEO and sharing functionality
- feat: enhance terminal commands with profile feature
- feat: add SEO utility for social media sharing and structured data generation
- feat: add profile data JSON file with personal and professional information
- feat: add .firebaserc configuration file for Firebase project
- feat: integrate Firebase SDK and update terminal profile display
- feat: enhance BlogList component with terminal-style layout and improved responsiveness
- feat: enhance Blogs component with terminal-style layout and improved responsiveness
- feat: enhance Footer component with improved layout and mobile responsiveness
- feat: enhance Navbar component with terminal-style layout and improved responsiveness
- feat: add 'cat' and 'grep' commands to terminal with enhanced output messages
- feat: enhance BlogList component with terminal-style layout and improved content display
- feat: enhance Blogs component with terminal-style layout and improved content display
- feat: redesign Footer component for improved layout and information display
- feat: refactor Navbar component for improved layout and navigation links - Updated the Navbar structure to enhance terminal-style navigation. - Added links to Telegram and GitHub with improved styling. - Included dynamic date and time display in the mobile view.
- feat: enhance terminal functionality with command history and autocomplete
- feat: add Tailwind CSS typography plugin to configuration
- feat: add 'react-typescript-guide.md' for React and TypeScript setup documentation
- feat: add 'sudoko.md' for Sudoku Solver project documentation
- feat: add 'sudoko.md' to the list of blog files
- feat: restructure App component to include routing for blogs
- feat: add BlogList component for displaying blog posts
- feat: implement Blogs component for displaying blog posts
- feat: add blog utilities for fetching and managing blog files

### 🐛 Bug Fixes
- fix: correct homepage URL in package.json
- fix: remove unnecessary echo statement for fetching repository data
- fix: update GitHubRepo description type and improve data loading error handling
- fix: update hosting public directory to 'dist' in firebase.json
- fix: switch from BrowserRouter to HashRouter for improved routing compatibility
- fix: update author name in blog files
- fix: update Navbar component to use Link for navigation

### 📝 Other Changes
- chore: update npm scripts for configuration setup
- Implement feature X to enhance user experience and fix bug Y in module Z
- chore: remove unused Firebase hosting workflows and related files
- Remove languages field from GitHub repository fetch in fetch-github-data.sh
- chore: update caniuse-lite to version 1.0.30001727 and add license information
- chore: update dependencies and add new packages
- add dancing parrot
- add fontawesome free
- Merge branch 'main' of github.com:iamdhakrey/iamdhakrey-react-dev
- update
- Delete CNAME
- Create CNAME
- Delete CNAME
- Create CNAME
- fix
- update



