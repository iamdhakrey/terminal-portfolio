// Theme configuration for the terminal portfolio
export interface ThemeConfig {
  name: string;
  displayName: string;
  colors: {
    background: string;
    text: string;
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
      background: "#F0F4FF",
      text: "#1a202c",
      primary: "#2d3748",
      secondary: "#4a5568",
      accent: "#3182ce",
      success: "#38a169",
      warning: "#d69e2e",
      error: "#e53e3e",
      info: "#3182ce",
      muted: "#718096",
      border: "#cbd5e0",
      promptUser: "#2d3748",
      promptHost: "#4a5568",
      promptPath: "#3182ce",
      promptSymbol: "#1a202c",
      commandText: "#38a169",
      outputText: "#2d3748",
      welcomeBoxBg: "#edf2f7",
      welcomeBoxBorder: "#cbd5e0",
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
