import { Link } from "react-router-dom";
import { useDate } from "./UpdateTime";

// fontawesome.library.add(faGithub);

function Navbar() {
    const date = useDate();

    return (
        <nav className="bg-gray-900 border-b border-gray-700 font-mono">
            <div className="max-w-screen-xl mx-auto px-4 py-3">
                {/* Terminal-style navigation */}
                <div className="flex items-center justify-between">
                    {/* Left side - Terminal prompt */}
                    <div className="flex items-center space-x-1 text-sm">
                        <span className="text-blue-400">user@localhost</span>
                        <span className="text-white">:</span>
                        <span className="text-blue-600">~/</span>
                        <span className="text-white">$ </span>
                        <Link to="/" className="text-green-400 hover:text-green-300 font-bold">
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
                    <div className="flex items-center space-x-4 text-sm">
                        <Link
                            to="/blogs"
                            className="text-green-400 hover:text-green-300 font-source tracking-wide transition-colors"
                        >
                            ./blogs
                        </Link>
                        <span className="text-gray-600">|</span>
                        <a
                            href="https://t.me/iamdhakrey"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 font-source tracking-wide transition-colors"
                        >
                            @telegram
                        </a>
                        <span className="text-gray-600">|</span>
                        <a
                            href="https://github.com/iamdhakrey/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-400 hover:text-yellow-300 font-source tracking-wide transition-colors"
                        >
                            git://github
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
