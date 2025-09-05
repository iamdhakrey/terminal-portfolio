export const themes: Record<string, string> = {
    dark: "dark",
    light: "light",
    cyberpunk: "cyberpunk",
    bluloco: "bluloco"
};

export const getTheme = (themeName: string) => {
    return themes[themeName] || themes.dark;
};

export const getAvailableThemes = () => {
    return Object.keys(themes);
};

export const getThemeDisplayNames = (): Record<string, string> => {
    return Object.fromEntries(
        Object.entries(themes).map(([key, theme]) => [key, theme.charAt(0).toUpperCase() + theme.slice(1)])
    );
};