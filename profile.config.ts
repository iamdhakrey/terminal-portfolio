export interface ProfileConfig {
  // Basic Profile Information
  profile: {
    name: string;
    username: string;
    title: string;
    description: string;
    bio: string;
    image: string;
    website: string;
    location: string;
    email?: string;
    currentFocus: string[];
    funFact: string;
  };

  // Social Links
  socialLinks: {
    github: string;
    linkedin?: string;
    twitter?: string;
    telegram?: string;
    discord?: string;
    instagram?: string;
    youtube?: string;
    website?: string;
    [key: string]: string | undefined;
  };

  // Skills and Technologies
  skills: string[];

  // Stats to display
  stats: {
    projects: string;
    profileViews: string;
    streak: string;
    botUsers?: string;
    [key: string]: string | undefined;
  };

  // Achievements
  achievements: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;

  // Terminal Configuration
  terminal: {
    hostname: string;
    username: string;
    theme: 'dark' | 'light' | 'matrix' | 'cyberpunk';
    welcomeMessage: string[];
    customCommands: {
      [command: string]: {
        description: string;
        output: string[] | (() => string[]);
        action?: 'navigate' | 'external' | 'function';
        target?: string;
      };
    };
    enabledCommands: string[];
    prompt: string;
  };

  // System Information for neofetch
  systemInfo: {
    os: string;
    host: string;
    kernel: string;
    uptime: string;
    packages: string;
    shell: string;
    resolution: string;
    de: string;
    wm: string;
    terminal: string;
    cpu: string;
    gpu: string;
    memory: string;
    ascii?: string[];
  };

  // Project Configuration
  projects: {
    featuredRepos: string[];
    excludeRepos: string[];
    categories: {
      [category: string]: string[];
    };
  };

  // Blog Configuration
  blogs: {
    enabled: boolean;
    featuredPosts: string[];
    categories: string[];
    availableBlogs: string[];
  };

  // SEO Configuration
  seo: {
    siteName: string;
    keywords: string[];
    author: string;
    twitterHandle?: string;
    ogImage?: string;
  };

  // Theme Configuration
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    terminalBackground: string;
    terminalText: string;
    font: string;
  };

  // Navigation Configuration
  navigation: {
    brandName: string;
    brandUrl: string;
    links: Array<{
      name: string;
      path: string;
      external?: boolean;
      color?: string;
    }>;
    systemInfo: {
      os: string;
      shell: string;
      showDateTime: boolean;
    };
  };

  // Footer Configuration
  footer: {
    statusMessage: string;
    madeWithLove: {
      enabled: boolean;
      text: string;
      location: string;
    };
    systemStatus: {
      enabled: boolean;
      message: string;
    };
  };
}

// Default configuration - Users can override any of these values
export const profileConfig: ProfileConfig = {
  profile: {
    name: "Hrithik Dhakrey",
    username: "iamdhakrey",
    title: "Full Stack Developer & Open Source Enthusiast",
    description: "Passionate developer creating awesome solutions with Rust, TypeScript, and Go",
    bio: "I'm a passionate developer who loves creating innovative solutions and learning new technologies. Always excited to work on interesting projects and collaborate with fellow developers!",
    image: "/H.svg",
    website: "https://iamdhakrey.dev",
    location: "Delhi, India",
    email: "your.email@example.com",
    currentFocus: [
      "Building modern web applications with Rust and TypeScript",
      "Developing desktop applications with Tauri",
      "Creating robust APIs with Go and Echo framework",
      "Contributing to open source projects"
    ],
    funFact: "I maintain multiple projects in Rust, Go, and TypeScript! 🚀"
  },

  socialLinks: {
    github: "https://github.com/iamdhakrey",
    website: "https://iamdhakrey.dev",
    telegram: "https://t.me/iamdhakrey"
  },

  skills: [
    "Rust",
    "TypeScript",
    "JavaScript", 
    "Go",
    "Python",
    "React",
    "Tauri",
    "Node.js",
    "Docker",
    "Linux"
  ],

  stats: {
    projects: "18+",
    profileViews: "1.2k+",
    streak: "45 days",
    totalStars: "5+"
  },

  achievements: [
    {
      title: "Rust Developer",
      description: "Building high-performance applications with Rust",
      icon: "🦀"
    },
    {
      title: "Open Source Contributor",
      description: "Maintaining several public repositories",
      icon: "🌟"
    },
    {
      title: "Full-Stack Developer",
      description: "End-to-end application development",
      icon: "🚀"
    },
    {
      title: "Desktop App Developer",
      description: "Building cross-platform apps with Tauri",
      icon: "💻"
    }
  ],

  terminal: {
    hostname: "iamdhakrey.dev",
    username: "iamdhakrey",
    theme: "dark",
    welcomeMessage: [
      "Welcome to my interactive terminal!",
      "Type 'help' to see available commands.",
      "Feel free to explore around! 🚀"
    ],
    customCommands: {
      "hire-me": {
        description: "Get my contact information",
        output: [
          "📧 Contact Information:",
          "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
          "",
          "Email: your.email@example.com",
          "LinkedIn: linkedin.com/in/yourusername",
          "GitHub: github.com/yourusername",
          "",
          "💼 Available for:",
          "• Full-time opportunities",
          "• Freelance projects",
          "• Open source collaboration",
          "• Technical consulting",
          "",
          "Let's build something amazing together! 🚀"
        ]
      },
      "coffee": {
        description: "Buy me a coffee",
        output: [
          "☕ Thanks for considering!",
          "",
          "If you like my work, you can support me:",
          "• GitHub Sponsors: github.com/sponsors/yourusername",
          "• Ko-fi: ko-fi.com/yourusername",
          "• PayPal: paypal.me/yourusername",
          "",
          "Every coffee helps me code better! ☕💻"
        ]
      },
      "joke": {
        description: "Tell a programming joke",
        output: () => {
          const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
            "Why do Java developers wear glasses? Because they can't C#! 👓",
            "There are only 10 types of people in the world: those who understand binary and those who don't.",
            "A SQL query goes into a bar, walks up to two tables and asks: 'Can I join you?' 🍺"
          ];
          return [jokes[Math.floor(Math.random() * jokes.length)]];
        }
      }
    },
    enabledCommands: [
      "help", "about", "whoami", "profile", "projects", "neofetch", "clear", 
      "ls", "cd", "pwd", "fortune", "cowsay", "tree", "ps", "top", "grep", 
      "cat", "man", "history", "date", "uptime", "uname", "parrot", "sl",
      "hire-me", "coffee", "joke"
    ],
    prompt: "hrithik@iamdhakrey.dev:~$"
  },

  systemInfo: {
    os: "Arch Linux x86_64",
    host: "yourwebsite.dev",
    kernel: "6.1.0-kali7-amd64",
    uptime: "2 hours, 34 mins",
    packages: "1337 (pacman)",
    shell: "zsh 5.9",
    resolution: "1920x1080",
    de: "Awesome",
    wm: "Awesome",
    terminal: "alacritty",
    cpu: "Intel i7-10750H (12) @ 2.6GHz",
    gpu: "NVIDIA GeForce GTX 1650",
    memory: "3840MiB / 15951MiB"
  },

  projects: {
    featuredRepos: [], // Will be filled from GitHub API
    excludeRepos: ["private-repo", "test-repo"],
    categories: {
      "Web Development": ["react-app", "vue-project"],
      "CLI Tools": ["cli-tool", "automation-script"],
      "Libraries": ["npm-package", "python-lib"]
    }
  },

  blogs: {
    enabled: true,
    featuredPosts: ["blog-linking-guide", "react-typescript-guide", "linux_commands"],
    categories: ["React", "TypeScript", "Linux", "DevOps", "Tutorial", "Programming", "Documentation"],
    availableBlogs: [
      "blog-linking-guide.md",
      "react-typescript-guide.md", 
    ]
  },

  seo: {
    siteName: "YourName - Developer Portfolio",
    keywords: ["developer", "portfolio", "react", "typescript", "javascript"],
    author: "Your Name",
    twitterHandle: "@yourusername",
    ogImage: "/og-image.jpg"
  },

  theme: {
    primaryColor: "#0070f3",
    secondaryColor: "#ff6b6b",
    accentColor: "#4ecdc4",
    backgroundColor: "#000000",
    textColor: "#ffffff",
    terminalBackground: "#1a1a1a",
    terminalText: "#00ff00",
    font: "CascadiaCode, 'Courier New', monospace"
  },

  navigation: {
    brandName: "iamdhakrey.dev",
    brandUrl: "/",
    links: [
      { name: "blogs", path: "/blogs", color: "text-green-400" },
      { name: "projects", path: "/projects", color: "text-orange-400" },
      { name: "profile", path: "/profile", color: "text-purple-400" },
      { name: "tg", path: "https://t.me/iamdhakrey", external: true, color: "text-blue-400" },
      { name: "gh", path: "https://github.com/iamdhakrey/", external: true, color: "text-yellow-400" }
    ],
    systemInfo: {
      os: "Linux 6.1.0",
      shell: "zsh",
      showDateTime: true
    }
  },

  footer: {
    statusMessage: "Connected",
    madeWithLove: {
      enabled: true,
      text: "Made with ❤️ and ⚡",
      location: "Arch Linux"
    },
    systemStatus: {
      enabled: true,
      message: "System OK"
    }
  }
};

export default profileConfig;
