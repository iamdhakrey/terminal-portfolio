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


export const getLanguageColor = (language: string): string => {
    const colors: Record<string, string> = {
        'JavaScript': '#f7df1e',
        'TypeScript': '#3178c6',
        'Python': '#3776ab',
        'Java': '#ed8b00',
        'C++': '#00599c',
        'C': '#a8b9cc',
        'C#': '#239120',
        'PHP': '#777bb4',
        'Ruby': '#cc342d',
        'Go': '#00add8',
        'Rust': '#dea584',
        'Swift': '#fa7343',
        'Kotlin': '#7f52ff',
        'Dart': '#0175c2',
        'HTML': '#e34f26',
        'CSS': '#1572b6',
        'SCSS': '#cf649a',
        'Vue': '#4fc08d',
        'React': '#61dafb',
        'Shell': '#89e051',
        'Dockerfile': '#384d54',
    };
    return colors[language] || '#6b7280';
};