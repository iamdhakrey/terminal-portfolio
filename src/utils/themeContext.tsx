import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeConfig, getTheme, getAvailableThemes } from './themes';

interface ThemeContextType {
  currentTheme: string;
  themeConfig: ThemeConfig;
  setTheme: (themeName: string) => void;
  availableThemes: string[];
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'dark' 
}) => {
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    // Load theme from localStorage or use default
    if (typeof window !== 'undefined') {
      return localStorage.getItem('terminal-theme') || defaultTheme;
    }
    return defaultTheme;
  });

  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(() => getTheme(currentTheme));
  const availableThemes = getAvailableThemes();

  const setTheme = (themeName: string) => {
    if (availableThemes.includes(themeName)) {
      setCurrentTheme(themeName);
      setThemeConfig(getTheme(themeName));
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('terminal-theme', themeName);
      }

      // Apply CSS custom properties
      applyThemeToDOM(getTheme(themeName));
    }
  };

  const toggleTheme = () => {
    const currentIndex = availableThemes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    setTheme(availableThemes[nextIndex]);
  };

  // Apply theme to DOM via CSS custom properties
  const applyThemeToDOM = (theme: ThemeConfig) => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      // Apply color variables
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--theme-${key}`, value);
      });

      // Apply style variables
      Object.entries(theme.styles).forEach(([key, value]) => {
        if (typeof value === 'string') {
          root.style.setProperty(`--theme-${key}`, value);
        } else if (typeof value === 'boolean') {
          root.style.setProperty(`--theme-${key}`, value ? '1' : '0');
        }
      });

      // Add theme class to body
      document.body.className = document.body.className.replace(/theme-\w+/g, '');
      document.body.classList.add(`theme-${theme.name}`);
    }
  };

  // Apply theme on mount and when currentTheme changes
  useEffect(() => {
    applyThemeToDOM(themeConfig);
  }, [themeConfig]);

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      themeConfig,
      setTheme,
      availableThemes,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
