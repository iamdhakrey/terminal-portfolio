// Theme configuration for the terminal portfolio
export interface ThemeConfig {
  name: string;
  displayName: string;
  colors: {
    background: string;
    text: string;
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    h6: string;
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    muted: string;
    border: string;
    promptUser: string;
    promptHost: string;
    promptPath: string;
    promptSymbol: string;
    commandText: string;
    outputText: string;
    welcomeBoxBg: string;
    welcomeBoxBorder: string;
  };
  styles: {
    fontFamily: string;
    terminalGlow?: boolean;
    cursorBlink?: boolean;
    borderStyle?: string;
    backgroundPattern?: string;
  };
}

export const themes: Record<string, ThemeConfig> = {
  dark: {
    name: "dark",
    displayName: "Dark Terminal",
    colors: {
      background: "#000000",
      text: "#ffffff",
      h1: "#22c55e",
      h2: "#3b82f6",
      h3: "#eab308",
      h4: "#10b981",
      h5: "#f59e0b",
      h6: "#ef4444",
      primary: "#22c55e",
      secondary: "#3b82f6",
      accent: "#eab308",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#06b6d4",
      muted: "#6b7280",
      border: "#374151",
      promptUser: "#3b82f6",
      promptHost: "#3b82f6",
      promptPath: "#1d4ed8",
      promptSymbol: "#ffffff",
      commandText: "#22c55e",
      outputText: "#d1d5db",
      welcomeBoxBg: "#111827",
      welcomeBoxBorder: "#22c55e",
    },
    styles: {
      fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Liberation Mono', Menlo, monospace",
      terminalGlow: false,
      cursorBlink: true,
      borderStyle: "solid",
    },
  },

  light: {
    name: "light",
    displayName: "Light Terminal",
    colors: {
      background: "#ffffff",
      text: "#1a1a1a",
      h1: "#2563eb",
      h2: "#4f46e5",
      h3: "#7c3aed",
      h4: "#059669",
      h5: "#d97706",
      h6: "#dc2626",
      primary: "#2563eb",
      secondary: "#4f46e5",
      accent: "#7c3aed",
      success: "#059669",
      warning: "#d97706",
      error: "#dc2626",
      info: "#0891b2",
      muted: "#6b7280",
      border: "#d1d5db",
      promptUser: "#2563eb",
      promptHost: "#4f46e5",
      promptPath: "#7c3aed",
      promptSymbol: "#1a1a1a",
      commandText: "#059669",
      outputText: "#374151",
      welcomeBoxBg: "#f8fafc",
      welcomeBoxBorder: "#e5e7eb",
    },
    styles: {
      fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Liberation Mono', Menlo, monospace",
      terminalGlow: false,
      cursorBlink: true,
      borderStyle: "solid",
    },
  },

  matrix: {
    name: "matrix",
    displayName: "Matrix",
    colors: {
      background: "#0d1117",
      text: "#00ff41",
      h1: "#00ff41",
      h2: "#00cc33",
      h3: "#39ff14",
      h4: "#00ff41",
      h5: "#00ff41",
      h6: "#00cc33",
      primary: "#00ff41",
      secondary: "#00cc33",
      accent: "#39ff14",
      success: "#00ff41",
      warning: "#ffff00",
      error: "#ff0040",
      info: "#00ffff",
      muted: "#006600",
      border: "#00ff41",
      promptUser: "#00ff41",
      promptHost: "#00cc33",
      promptPath: "#39ff14",
      promptSymbol: "#00ff41",
      commandText: "#00ff41",
      outputText: "#00cc33",
      welcomeBoxBg: "#0a0f0a",
      welcomeBoxBorder: "#00ff41",
    },
    styles: {
      fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Liberation Mono', Menlo, monospace",
      terminalGlow: true,
      cursorBlink: true,
      borderStyle: "solid",
      backgroundPattern: "matrix-rain",
    },
  },

  cyberpunk: {
    name: "cyberpunk",
    displayName: "Cyberpunk",
    colors: {
      background: "#0f0f23",
      text: "#ff00ff",
      h1: "#ff00ff",
      h2: "#00ffff",
      h3: "#ffff00",
      h4: "#00ff00",
      h5: "#ff8800",
      h6: "#ff00ff",
      primary: "#ff00ff",
      secondary: "#00ffff",
      accent: "#ffff00",
      success: "#00ff00",
      warning: "#ff8800",
      error: "#ff0088",
      info: "#00ffff",
      muted: "#8800ff",
      border: "#ff00ff",
      promptUser: "#ff00ff",
      promptHost: "#00ffff",
      promptPath: "#ffff00",
      promptSymbol: "#ff00ff",
      commandText: "#ff00ff",
      outputText: "#00ffff",
      welcomeBoxBg: "#1a0a2e",
      welcomeBoxBorder: "#ff00ff",
    },
    styles: {
      fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Liberation Mono', Menlo, monospace",
      terminalGlow: true,
      cursorBlink: true,
      borderStyle: "solid",
    },
  },

  retro: {
    name: "retro",
    displayName: "Retro Amber",
    colors: {
      background: "#2e1065",
      text: "#ffb000",
      h1: "#ffb000",
      h2: "#ffd700",
      h3: "#ff8c00",
      h4: "#90ee90",
      h5: "#ffeb3b",
      h6: "#ff6b6b",
      primary: "#ffb000",
      secondary: "#ffd700",
      accent: "#ff8c00",
      success: "#90ee90",
      warning: "#ffeb3b",
      error: "#ff6b6b",
      info: "#87ceeb",
      muted: "#daa520",
      border: "#ffb000",
      promptUser: "#ffb000",
      promptHost: "#ffd700",
      promptPath: "#ff8c00",
      promptSymbol: "#ffb000",
      commandText: "#ffb000",
      outputText: "#ffd700",
      welcomeBoxBg: "#1e0a3c",
      welcomeBoxBorder: "#ffb000",
    },
    styles: {
      fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Liberation Mono', Menlo, monospace",
      terminalGlow: true,
      cursorBlink: true,
      borderStyle: "solid",
    },
  },

  ocean: {
    name: "ocean",
    displayName: "Ocean Blue",
    colors: {
      background: "#0c1821",
      text: "#7dd3fc",
      h1: "#0ea5e9",
      h2: "#38bdf8",
      h3: "#06b6d4",
      h4: "#10b981",
      h5: "#f59e0b",
      h6: "#ef4444",
      primary: "#0ea5e9",
      secondary: "#38bdf8",
      accent: "#06b6d4",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#7dd3fc",
      muted: "#475569",
      border: "#0ea5e9",
      promptUser: "#0ea5e9",
      promptHost: "#38bdf8",
      promptPath: "#06b6d4",
      promptSymbol: "#7dd3fc",
      commandText: "#0ea5e9",
      outputText: "#7dd3fc",
      welcomeBoxBg: "#082f49",
      welcomeBoxBorder: "#0ea5e9",
    },
    styles: {
      fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Liberation Mono', Menlo, monospace",
      terminalGlow: false,
      cursorBlink: true,
      borderStyle: "solid",
    },
  },

  bluloco: {
    name: "bluloco",
    displayName: "Bluloco",
    colors: {
      background: "#282c34", // dark background
      text: "#abb2bf", // light text
      h1: "#61afef", // blue
      h2: "#e06c75", // red
      h3: "#c678dd", // purple
      h4: "#98c379", // green
      h5: "#d19a66", // orange
      h6: "#56b6c2", // cyan
      primary: "#61afef", // blue
      secondary: "#e06c75", // red
      accent: "#c678dd", // purple
      success: "#98c379", // green
      warning: "#d19a66", // orange
      error: "#e06c75", // red
      info: "#56b6c2", // cyan
      muted: "#5c6370", // gray
      border: "#3e4451", // border color
      promptUser: "#61afef", // blue
      promptHost: "#e06c75", // red
      promptPath: "#c678dd", // purple  
      promptSymbol: "#abb2bf", // light text
      commandText: "#98c379", // green
      outputText: "#abb2bf", // light text
      welcomeBoxBg: "#21252b", // slightly lighter dark background
      welcomeBoxBorder: "#61afef", // blue border
    },
    styles: {
      fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Liberation Mono', Menlo, monospace",
      terminalGlow: false,
      cursorBlink: true,
      borderStyle: "solid",
    },
  },
};

export const getTheme = (themeName: string): ThemeConfig => {
  return themes[themeName] || themes.dark;
};

export const getAvailableThemes = (): string[] => {
  return Object.keys(themes);
};

export const getThemeDisplayNames = (): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(themes).map(([key, theme]) => [key, theme.displayName])
  );
};