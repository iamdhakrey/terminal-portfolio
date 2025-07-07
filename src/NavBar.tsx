import { Link } from "react-router-dom";
import { useDate } from "./UpdateTime";

// fontawesome.library.add(faGithub);

function Navbar() {
    const date = useDate();

    return (
        <nav className="bg-gray-900 border-b border-gray-700 font-mono">
            <div className="max-w-screen-xl mx-auto px-2 sm:px-4 py-2 sm:py-3">
                {/* Terminal-style navigation */}
                <div className="flex items-center justify-between">
                    {/* Left side - Terminal prompt */}
                    <div className="flex items-center space-x-1 text-xs sm:text-sm">
                        <span className="text-blue-400 hidden sm:inline">user@localhost</span>
                        <span className="text-white hidden sm:inline">:</span>
                        <span className="text-blue-600 hidden sm:inline">~/</span>
                        <span className="text-white hidden sm:inline">$ </span>
                        <Link to="/" className="text-green-400 hover:text-green-300 font-bold text-sm sm:text-base">
                            <span className="text-green-400">i</span>amdhakrey
                            <span className="text-green-400">.</span>dev
                        </Link>
                    </div>

                    {/* Center - System info */}
                    <div className="hidden lg:flex items-center space-x-4 text-xs text-gray-400">
                        <span>Linux 6.1.0</span>
                        <span>•</span>
                        <span>zsh</span>
                        <span>•</span>
                        <span className="text-green-400">{date.date} {date.time}</span>
                    </div>

                    {/* Right side - Navigation commands */}
                    <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
                        <Link
                            to="/blogs"
                            className="text-green-400 hover:text-green-300 font-source tracking-wide transition-colors"
                        >
                            <span className="hidden sm:inline">./</span>blogs
                        </Link>
                        <span className="text-gray-600 hidden sm:inline">|</span>
                        <a
                            href="https://t.me/iamdhakrey"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 font-source tracking-wide transition-colors"
                        >
                            <span className="hidden sm:inline">@</span>tg
                        </a>
                        <span className="text-gray-600 hidden sm:inline">|</span>
                        <a
                            href="https://github.com/iamdhakrey/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-400 hover:text-yellow-300 font-source tracking-wide transition-colors"
                        >
                            <span className="hidden sm:inline">git://</span>gh
                        </a>
                    </div>
                </div>

                {/* Mobile date/time */}
                <div className="lg:hidden mt-2 text-xs text-gray-400 text-center">
                    {date.date} {date.time}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
