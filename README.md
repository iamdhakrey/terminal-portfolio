# Github Profile Portfolio

[![Production Ready](https://img.shields.io/badge/Production-Ready-green.svg)](https://github.com/yourusername/github-profile) [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, terminal-style portfolio website that's fully configurable through a single configuration file. Perfect for developers who want to showcase their skills and projects in a unique way.

## ✨ Features

- **🖥️ Interactive Terminal Interface** - Navigate through your portfolio using terminal commands
- **📱 Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- **⚙️ Easy Configuration** - Everything configurable through `profile.config.ts`
- **🔄 GitHub Integration** - Displays your GitHub stats and projects from static data
- **🎨 Customizable Themes** - Dark, light, matrix, and cyberpunk themes
- **📝 Blog Support** - Built-in blog functionality with markdown support
- **🔍 SEO Optimized** - Perfect for social media sharing
- **🚀 Fast & Modern** - Built with React, TypeScript, and Vite
- **💾 Smart Caching** - GitHub data served from static files for optimal performance

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/github-profile.git
   cd github-profile
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure your profile**

   Edit `profile.config.ts` with your information:

   ```typescript
   export const profileConfig: ProfileConfig = {
     profile: {
       name: "Your Name",
       username: "yourusername",
       title: "Full Stack Developer",
       description: "Passionate developer creating awesome solutions",
       bio: "Your bio here...",
       image: "/your-profile-image.jpg",
       website: "https://yourwebsite.dev",
       location: "Your Location",
       email: "your.email@example.com",
       currentFocus: [
         "Building scalable web applications",
         "Contributing to open source",
         // ... your current focus areas
       ],
       funFact: "Your fun fact here! 🎉"
     },
     // ... more configuration
   };
   ```

4. **Update GitHub data**

   First, install and authenticate with GitHub CLI:

   ```bash
   # Install GitHub CLI (if not already installed)
   # Visit https://cli.github.com/ for installation instructions
   
   # Authenticate with GitHub
   gh auth login
   
   # Fetch your GitHub data
   npm run update-github
   ```

   This will automatically populate `/public/github-projects.json` with your repositories and stats.

5. **Start development server**

   ```bash
   npm run dev
   ```

6. **Build for production**

   ```bash
   npm run build
   ```

## 📋 Configuration Guide

### Profile Configuration

All configuration is done through the `profile.config.ts` file. Here's a complete overview:

#### Basic Profile Information

```typescript
profile: {
  name: "Your Name",                    // Your full name
  username: "yourusername",             // GitHub username
  title: "Full Stack Developer",        // Your professional title
  description: "Short description",     // Meta description for SEO
  bio: "Longer bio text...",           // Displayed in about section
  image: "/profile.jpg",               // Path to your profile image
  website: "https://yourwebsite.dev",  // Your website URL
  location: "Your Location",           // Your location
  email: "email@example.com",          // Your email
  currentFocus: ["Item 1", "Item 2"],  // What you're currently working on
  funFact: "Your fun fact! 🎉"        // A fun fact about you
}
```

#### Social Links

```typescript
socialLinks: {
  github: "https://github.com/username",
  linkedin: "https://linkedin.com/in/username",
  twitter: "https://twitter.com/username",
  telegram: "https://t.me/username",
  website: "https://yourwebsite.dev",
  // Add any social platform
}
```

#### Skills & Technologies

```typescript
skills: [
  "JavaScript", "TypeScript", "React", "Node.js",
  "Python", "Docker", "AWS", "Linux"
]
```

#### Terminal Configuration

```typescript
terminal: {
  hostname: "localhost",
  username: "user",
  theme: "dark",
  welcomeMessage: [
    "Welcome to my interactive terminal!",
    "Type 'help' to see available commands."
  ],
  customCommands: {
    "custom-cmd": {
      description: "Custom command description",
      output: ["Command output line 1", "Line 2"]
    }
  }
}
```

#### Navigation & Footer

```typescript
navigation: {
  brandName: "yoursite.dev",
  brandUrl: "/",
  links: [
    { name: "projects", path: "/projects", color: "text-orange-400" },
    // ... more navigation links
  ]
},

footer: {
  statusMessage: "Connected",
  madeWithLove: {
    enabled: true,
    text: "Made with ❤️ and ⚡",
    location: "Your Location"
  }
}
```

## 🎨 Customization

### Themes

Choose from built-in themes or create your own:

```typescript
terminal: {
  theme: "dark" | "light" | "matrix" | "cyberpunk"
}
```

### Custom Colors

```typescript
theme: {
  primaryColor: "#22c55e",
  secondaryColor: "#3b82f6",
  accentColor: "#eab308",
  backgroundColor: "#000000",
  // ... more color options
}
```

## 📊 GitHub Integration

This portfolio displays GitHub data from a static JSON file for optimal performance. To update your GitHub data:

### GitHub CLI Prerequisites

1. Install GitHub CLI: <https://cli.github.com/>
2. Authenticate with GitHub CLI:

   ```bash
   gh auth login
   ```

### Updating GitHub Data

#### Method 1: Using npm script (Recommended)

```bash
npm run update-github
```

#### Method 2: Using the script directly

```bash
bash scripts/fetch-github-data.sh
```

#### Method 3: Manual update

Manually update `/public/github-projects.json` with your latest repositories.

### GitHub Data Structure

The script generates a comprehensive JSON structure:

```json
{
  "lastUpdated": "2025-07-10T00:00:00Z",
  "user": {
    "login": "username",
    "name": "Your Name",
    "bio": "Your bio",
    "public_repos": 25,
    "followers": 100,
    "following": 50
  },
  "repositories": [...],
  "stats": {
    "totalRepos": 25,
    "totalStars": 150,
    "totalForks": 30,
    "languages": ["JavaScript", "TypeScript", "Python"]
  },
  "featured": [...],
  "byLanguage": {...}
}
```

### Automation

For automatic updates, you can set up a GitHub Action to run the update script and commit the changes periodically.

## 📝 Blog Setup

Add markdown files to `/public/blogs/` to create blog posts:

1. Create `.md` files in `/public/blogs/`
2. Configure featured posts in `profile.config.ts`
3. Posts are automatically available at `/blog/filename`

## � Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### GitHub Pages

1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages

### Docker

```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🛠️ Development

### Project Structure

```text
src/
├── components/          # React components
├── utils/              # Utility functions
├── assets/             # Static assets
└── styles/             # CSS styles

public/
├── github-projects.json # GitHub data
├── blogs/              # Blog posts
└── fonts/              # Custom fonts
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Technologies Used

- **React 18** with TypeScript
- **Vite** for build tooling and dev server
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Gray Matter** for markdown processing

## 🔧 Performance

- ⚡ Fast initial load with Vite
- 📱 Mobile-optimized responsive design
- 🎯 Optimized bundle size
- 💾 Static GitHub data for instant loading
- 🔍 SEO optimized with meta tags

## 📈 SEO Features

- Meta tags for social media sharing
- Structured data for search engines
- Optimized images and assets
- Fast loading times
- Mobile-friendly design

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you have any questions or need help:

1. Check the documentation above
2. Search existing [Issues](https://github.com/yourusername/github-profile/issues)
3. Create a new issue if needed

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by terminal interfaces
- Thanks to the open source community

---

⭐ **Star this repository if you found it helpful!**

🐛 **Found a bug?** [Open an issue](https://github.com/yourusername/github-profile/issues)

💡 **Have a feature request?** [Start a discussion](https://github.com/yourusername/github-profile/discussions)
