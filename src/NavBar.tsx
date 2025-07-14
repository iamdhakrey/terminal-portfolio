import { Link } from "react-router-dom";
import { useDate } from "./UpdateTime";
import { getNavigation } from "./utils/configManager";

function Navbar() {
    const date = useDate();
    const navigation = getNavigation();

    return (
        <nav className="bg-gray-900 border-b border-gray-700 font-mono">
            <div className="max-w-screen-xl mx-auto px-2 sm:px-4 py-2 sm:py-3">
                {/* Terminal-style navigation */}
                <div className="flex items-center justify-between">
                    {/* Left side - Terminal prompt */}
                    <div className="flex items-center space-x-1 text-xs sm:text-sm">
                        <Link to={navigation.brandUrl} className="text-green-400 hover:text-green-300 font-bold text-sm sm:text-base">
                            {navigation.brandName}
                        </Link>
                        {/* <span className="text-blue-400 hidden sm:inline">{profile.username}@{navigation.brandName}</span> */}
                        {/* <span className="text-white hidden sm:inline">:</span>
                        <span className="text-blue-600 hidden sm:inline">~/</span>
                        <span className="text-white hidden sm:inline">$ </span> */}
                        {/* <Link to={navigation.brandUrl} className="text-green-400 hover:text-green-300 font-bold text-sm sm:text-base">
                            {navigation.brandName}
                        </Link> */}
                    </div>

                    {/* Center - System info */}
                    {navigation.systemInfo.showDateTime && (
                        <div className="hidden lg:flex items-center space-x-4 text-xs text-gray-400">
                            {/* <span>{navigation.systemInfo.os}</span> */}
                            {/* <span>•</span> */}
                            <span>{navigation.systemInfo.shell}</span>
                            <span>•</span>
                            <span className="text-green-400">{date.date} {date.time}</span>
                        </div>
                    )}

                    {/* Right side - Navigation commands */}
                    <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
                        {navigation.links.map((link, index) => (
                            <span key={link.name}>
                                {index > 0 && <span className="text-gray-600 hidden sm:inline mr-2 sm:mr-4">|</span>}
                                {link.external ? (
                                    <a
                                        href={link.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${link.color || 'text-gray-400'} hover:opacity-75 font-source tracking-wide transition-colors`}
                                    >
                                        <span className="hidden sm:inline">{link.name === 'tg' ? '@' : link.name === 'gh' ? 'git://' : './'}</span>{link.name}
                                    </a>
                                ) : (
                                    <Link
                                        to={link.path}
                                        className={`${link.color || 'text-gray-400'} hover:opacity-75 font-source tracking-wide transition-colors`}
                                    >
                                        <span className="hidden sm:inline">./</span>{link.name}
                                    </Link>
                                )}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Mobile date/time */}
                {navigation.systemInfo.showDateTime && (
                    <div className="lg:hidden mt-2 text-xs text-gray-400 text-center">
                        {date.date} {date.time}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
