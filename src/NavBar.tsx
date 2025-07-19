import { Link } from "react-router-dom";
import { useDate } from "./UpdateTime";
import { getNavigation } from "./utils/configManager";
import { useTheme } from "./utils/themeContext";
import { getThemeDisplayNames } from "./utils/themes";

function Navbar() {
    const date = useDate();
    const navigation = getNavigation();
    const { currentTheme, toggleTheme } = useTheme();
    const themeDisplayNames = getThemeDisplayNames();

    return (
        <nav className="border-b font-mono" 
             style={{ 
                 backgroundColor: 'var(--theme-background)', 
                 borderColor: 'var(--theme-border)' 
             }}>
            <div className="max-w-screen-xl mx-auto px-2 sm:px-4 py-2 sm:py-3">
                {/* Terminal-style navigation */}
                <div className="flex items-center justify-between">
                    {/* Left side - Terminal prompt */}
                    <div className="flex items-center space-x-1 text-xs sm:text-sm">
                        <Link to={navigation.brandUrl} 
                              className="font-bold text-sm sm:text-base hover:opacity-75 transition-opacity"
                              style={{ color: 'var(--theme-primary)' }}>
                            {navigation.brandName}
                        </Link>
                    </div>

                    {/* Center - System info */}
                    {navigation.systemInfo.showDateTime && (
                        <div className="hidden lg:flex items-center space-x-4 text-xs"
                             style={{ color: 'var(--theme-muted)' }}>
                            <span>{navigation.systemInfo.shell}</span>
                            <span>•</span>
                            <span style={{ color: 'var(--theme-primary)' }}>
                                {date.date} {date.time}
                            </span>
                        </div>
                    )}

                    {/* Right side - Navigation commands & Theme selector */}
                    <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
                        {/* Theme toggle button */}
                        <button
                            onClick={toggleTheme}
                            className="px-2 py-1 rounded text-xs font-mono hover:opacity-75 transition-opacity"
                            style={{ 
                                backgroundColor: 'var(--theme-accent)', 
                                color: 'var(--theme-background)' 
                            }}
                            title={`Current: ${themeDisplayNames[currentTheme]} (click to toggle)`}
                        >
                            🎨 {currentTheme}
                        </button>

                        {navigation.links.map((link, index) => (
                            <span key={link.name}>
                                {index > 0 && <span className="hidden sm:inline mr-2 sm:mr-4" 
                                                   style={{ color: 'var(--theme-border)' }}>|</span>}
                                {link.external ? (
                                    <a
                                        href={link.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:opacity-75 font-source tracking-wide transition-opacity"
                                        style={{ color: link.color || 'var(--theme-muted)' }}
                                    >
                                        <span className="hidden sm:inline">{link.name === 'tg' ? '@' : link.name === 'gh' ? 'git://' : './'}</span>{link.name}
                                    </a>
                                ) : (
                                    <Link
                                        to={link.path}
                                        className="hover:opacity-75 font-source tracking-wide transition-opacity"
                                        style={{ color: link.color || 'var(--theme-muted)' }}
                                    >
                                        <span className="hidden sm:inline">{link.name === 'home' ? '~/' : './'}</span>{link.name}
                                    </Link>
                                )}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Mobile date/time */}
                {navigation.systemInfo.showDateTime && (
                    <div className="lg:hidden mt-2 text-xs text-center"
                         style={{ color: 'var(--theme-muted)' }}>
                        {date.date} {date.time}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
