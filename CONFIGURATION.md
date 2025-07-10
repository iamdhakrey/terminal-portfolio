# 🚀 Profile Configuration Guide

This guide will help you customize your GitHub profile website using the `profile.config.ts` file.

## 📋 Complete Configuration Example

Here's a complete example of what your `profile.config.ts` should look like:

```typescript
export const profileConfig: ProfileConfig = {
  // ===== BASIC PROFILE INFORMATION =====
  profile: {
    name: "John Doe",
    username: "johndoe",
    title: "Full Stack Developer & Open Source Enthusiast",
    description: "Passionate developer creating innovative web solutions with modern technologies",
    bio: "I'm a passionate full-stack developer with 5+ years of experience building scalable web applications. I love contributing to open source projects and sharing knowledge with the developer community.",
    image: "/john-doe-profile.jpg",  // Put your image in the public folder
    website: "https://johndoe.dev",
    location: "San Francisco, CA",
    email: "john@johndoe.dev"
  },

  // ===== SOCIAL LINKS =====
  socialLinks: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
    telegram: "https://t.me/johndoe",
    discord: "johndoe#1234",
    instagram: "https://instagram.com/johndoe",
    youtube: "https://youtube.com/c/johndoe",
    website: "https://johndoe.dev"
  },

  // ===== SKILLS & TECHNOLOGIES =====
  skills: [
    // Programming Languages
    "JavaScript", "TypeScript", "Python", "Go", "Rust",
    // Frontend
    "React", "Vue.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3",
    // Backend
    "Node.js", "Express", "FastAPI", "Django", "PostgreSQL", "MongoDB",
    // DevOps & Tools
    "Docker", "Kubernetes", "AWS", "CI/CD", "Git", "Linux"
  ],

  // ===== STATS TO DISPLAY =====
  stats: {
    projects: "50+",
    profileViews: "5.2k+",
    streak: "120 days",
    botUsers: "10k+",
    experience: "5+ years"
  },

  // ===== ACHIEVEMENTS =====
  achievements: [
    {
      title: "🚀 Senior Full-Stack Developer",
      description: "Leading development of enterprise applications",
      icon: "🚀"
    },
    {
      title: "🌟 Open Source Contributor",
      description: "Contributing to popular projects with 1M+ downloads",
      icon: "🌟"
    },
    {
      title: "⚙️ DevOps Engineer",
      description: "Infrastructure automation and cloud architecture",
      icon: "⚙️"
    },
    {
      title: "👨‍🏫 Tech Mentor",
      description: "Mentoring 20+ junior developers",
      icon: "👨‍🏫"
    }
  ],

  // ===== TERMINAL CONFIGURATION =====
  terminal: {
    hostname: "johndoe-dev",
    username: "visitor",
    theme: "dark", // Options: dark, light, matrix, cyberpunk
    welcomeMessage: [
      "🎉 Welcome to John Doe's interactive portfolio!",
      "",
      "I'm a full-stack developer passionate about creating amazing web experiences.",
      "Type 'help' to see what you can do here, or just start exploring!",
      "",
      "💡 Try commands like: about, projects, neofetch, hire-me"
    ],
    customCommands: {
      "hire-me": {
        description: "Get my contact information and availability",
        output: [
          "📧 Contact Information:",
          "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
          "",
          "📬 Email: john@johndoe.dev",
          "💼 LinkedIn: linkedin.com/in/johndoe",
          "🐙 GitHub: github.com/johndoe",
          "📱 Telegram: @johndoe",
          "",
          "💼 Currently available for:",
          "• Full-time Senior Developer roles",
          "• Freelance web development projects",
          "• Technical consulting",
          "• Open source collaboration",
          "",
          "💰 Rate: $100-150/hour (freelance)",
          "🌍 Remote work preferred, SF Bay Area local",
          "",
          "Let's build something amazing together! 🚀"
        ]
      },
      "coffee": {
        description: "Buy me a coffee ☕",
        output: [
          "☕ Thanks for considering supporting my work!",
          "",
          "Your support helps me:",
          "• Continue developing open source projects",
          "• Create educational content and tutorials",
          "• Maintain free tools and libraries",
          "",
          "💝 Ways to support:",
          "• GitHub Sponsors: github.com/sponsors/johndoe",
          "• Ko-fi: ko-fi.com/johndoe",
          "• PayPal: paypal.me/johndoe",
          "",
          "Every coffee makes a difference! ☕💻✨"
        ]
      },
      "stack": {
        description: "Show my current tech stack",
        output: [
          "🛠️ Current Tech Stack:",
          "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
          "",
          "Frontend:",
          "├── React 18 + TypeScript",
          "├── Next.js 14 (App Router)",
          "├── Tailwind CSS + Headless UI",
          "└── React Query + Zustand",
          "",
          "Backend:",
          "├── Node.js + Express/Fastify",
          "├── Python + FastAPI",
          "├── PostgreSQL + Prisma ORM",
          "└── Redis for caching",
          "",
          "DevOps & Tools:",
          "├── Docker + Kubernetes",
          "├── AWS (EC2, RDS, S3, CloudFront)",
          "├── GitHub Actions CI/CD",
          "└── Monitoring: Datadog, Sentry"
        ]
      },
      "joke": {
        description: "Tell a random programming joke",
        output: () => {
          const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
            "Why do Java developers wear glasses? Because they can't C#! 👓",
            "There are only 10 types of people: those who understand binary and those who don't.",
            "A SQL query goes into a bar, walks up to two tables and asks: 'Can I join you?' 🍺",
            "Why don't programmers like nature? It has too many bugs! 🦗",
            "What's a programmer's favorite hangout place? Foo Bar! 🍻",
            "Why did the programmer quit his job? He didn't get arrays! 📊"
          ];
          return [jokes[Math.floor(Math.random() * jokes.length)]];
        }
      },
      "quote": {
        description: "Get an inspiring programming quote",
        output: () => {
          const quotes = [
            "\"Code is like humor. When you have to explain it, it's bad.\" - Cory House",
            "\"First, solve the problem. Then, write the code.\" - John Johnson",
            "\"Experience is the name everyone gives to their mistakes.\" - Oscar Wilde",
            "\"In order to be irreplaceable, one must always be different.\" - Coco Chanel",
            "\"Java is to JavaScript what car is to Carpet.\" - Chris Heilmann",
            "\"Talk is cheap. Show me the code.\" - Linus Torvalds"
          ];
          return [quotes[Math.floor(Math.random() * quotes.length)]];
        }
      },
      "portfolio": {
        description: "Open my external portfolio",
        output: ["🚀 Opening my portfolio website..."],
        action: "external",
        target: "https://johndoe.dev"
      },
      "linkedin": {
        description: "Open my LinkedIn profile",
        output: ["💼 Opening LinkedIn profile..."],
        action: "external",
        target: "https://linkedin.com/in/johndoe"
      }
    },
    enabledCommands: [
      // Information commands
      "help", "about", "whoami", "neofetch", "profile",
      // Navigation commands
      "cd", "ls", "pwd", "tree",
      // Utility commands
      "clear", "history", "date", "uptime", "uname",
      // Fun commands
      "parrot", "sl", "fortune", "cowsay",
      // Custom commands
      "hire-me", "coffee", "stack", "joke", "quote", "portfolio", "linkedin",
      // Development commands
      "ps", "top", "grep", "cat", "man"
    ],
    prompt: "visitor@johndoe-dev:~$"
  },

  // ===== SYSTEM INFO FOR NEOFETCH =====
  systemInfo: {
    os: "Arch Linux x86_64",
    host: "johndoe.dev",
    kernel: "6.6.0-zen",
    uptime: "∞ hours (always coding)",
    packages: "2048 (npm + pip + cargo)",
    shell: "zsh 5.9 + oh-my-zsh",
    resolution: "3840x2160",
    de: "GNOME 45",
    wm: "Mutter",
    terminal: "Alacritty",
    cpu: "AMD Ryzen 9 7950X (32) @ 4.5GHz",
    gpu: "NVIDIA RTX 4080",
    memory: "32GB DDR5-5600"
  },

  // ===== PROJECT CONFIGURATION =====
  projects: {
    featuredRepos: [
      "awesome-react-app",
      "python-cli-tool",
      "kubernetes-deployment-tool"
    ],
    excludeRepos: [
      "private-repo",
      "test-repo",
      "old-deprecated-project"
    ],
    categories: {
      "🌐 Web Development": [
        "react-dashboard",
        "e-commerce-platform",
        "portfolio-website"
      ],
      "🛠️ CLI Tools": [
        "git-workflow-helper",
        "docker-manager",
        "project-scaffolder"
      ],
      "📚 Libraries": [
        "react-component-library",
        "python-utility-package",
        "npm-package"
      ],
      "🤖 Automation": [
        "ci-cd-templates",
        "deployment-scripts",
        "monitoring-tools"
      ]
    }
  },

  // ===== BLOG CONFIGURATION =====
  blogs: {
    enabled: true,
    featuredPosts: [
      "building-scalable-react-apps",
      "docker-best-practices",
      "typescript-advanced-patterns"
    ],
    categories: [
      "React",
      "TypeScript",
      "Node.js",
      "Docker",
      "AWS",
      "DevOps",
      "Tutorials",
      "Best Practices"
    ]
  },

  // ===== SEO CONFIGURATION =====
  seo: {
    siteName: "John Doe - Full Stack Developer",
    keywords: [
      "john doe",
      "full stack developer",
      "react developer",
      "typescript",
      "node.js",
      "python",
      "devops engineer",
      "software engineer",
      "web developer",
      "open source"
    ],
    author: "John Doe",
    twitterHandle: "@johndoe",
    ogImage: "/og-image-john-doe.jpg"
  },

  // ===== THEME CONFIGURATION =====
  theme: {
    primaryColor: "#3b82f6",     // Blue
    secondaryColor: "#8b5cf6",   // Purple  
    accentColor: "#10b981",      // Green
    backgroundColor: "#0f172a",   // Dark slate
    textColor: "#f1f5f9",        // Light slate
    terminalBackground: "#1e293b", // Slate 800
    terminalText: "#22c55e",     // Green 500
    font: "JetBrains Mono, Cascadia Code, Fira Code, monospace"
  }
};
```

## 🎯 Quick Customization Checklist

Copy this checklist and update each item with your information:

### ✅ Profile Information

- [ ] Update `name` with your full name
- [ ] Set `username` to your GitHub username
- [ ] Write your `title` (e.g., "Frontend Developer")
- [ ] Create a compelling `description` for SEO
- [ ] Write a personal `bio` (2-3 sentences)
- [ ] Add your profile `image` to public folder
- [ ] Set your `website` URL
- [ ] Add your `location`
- [ ] Include your `email`

### ✅ Social Links

- [ ] GitHub profile URL
- [ ] LinkedIn profile URL
- [ ] Twitter handle (optional)
- [ ] Telegram username (optional)
- [ ] Other social platforms

### ✅ Skills

- [ ] List your programming languages
- [ ] Add frameworks you use
- [ ] Include tools and technologies
- [ ] Keep it concise (10-20 items max)

### ✅ Terminal Commands

- [ ] Customize welcome message
- [ ] Add your custom commands
- [ ] Update contact information in "hire-me"
- [ ] Set your availability status
- [ ] Add your rates (if freelancing)

### ✅ System Info

- [ ] Update OS information
- [ ] Set your hostname/domain
- [ ] Customize hardware specs (can be fun/creative)
- [ ] Update software versions

## 🎨 Theme Examples

### Professional Blue Theme

```typescript
theme: {
  primaryColor: "#2563eb",
  secondaryColor: "#7c3aed", 
  accentColor: "#059669",
  backgroundColor: "#0f172a",
  textColor: "#f1f5f9",
  terminalBackground: "#1e293b",
  terminalText: "#22c55e",
  font: "JetBrains Mono, monospace"
}
```

### Cyberpunk Theme

```typescript
theme: {
  primaryColor: "#ff006e",
  secondaryColor: "#8338ec",
  accentColor: "#ffbe0b",
  backgroundColor: "#000000",
  textColor: "#ffffff",
  terminalBackground: "#1a0033",
  terminalText: "#00ff41",
  font: "Courier New, monospace"
}
```

### Minimalist Light Theme

```typescript
theme: {
  primaryColor: "#374151",
  secondaryColor: "#6b7280",
  accentColor: "#059669",
  backgroundColor: "#ffffff",
  textColor: "#111827",
  terminalBackground: "#f9fafb",
  terminalText: "#374151",
  font: "SF Mono, Monaco, monospace"
}
```

## 💡 Pro Tips

1. **Profile Image**: Use a square image (500x500px) in JPG or PNG format
2. **Bio Length**: Keep it under 200 characters for best display
3. **Skills**: Order them by proficiency/importance
4. **Custom Commands**: Add commands that showcase your personality
5. **Stats**: Update these periodically to keep them current
6. **Terminal Theme**: Choose colors that reflect your personal brand
7. **Social Links**: Only include platforms you're actively using

## 🚀 After Configuration

Once you've updated your config:

1. **Test locally**: Run `npm run dev` to preview changes
2. **Update GitHub data**: Run `npm run update-github`
3. **Build**: Run `npm run build` to prepare for deployment
4. **Deploy**: Push to your repository or deploy to your platform

Your portfolio is now fully customized and ready to impress! 🎉
