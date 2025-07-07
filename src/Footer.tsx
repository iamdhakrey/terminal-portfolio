// Footer.js

const Footer = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-700 p-3 font-mono fixed bottom-0 left-0 right-0 z-10">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between text-xs">
                {/* Left side - Terminal info */}
                <div className="flex items-center space-x-4 text-gray-400">
                    <span>Session: active</span>
                    <span>•</span>
                    <span>TTY: /dev/pts/0</span>
                    <span>•</span>
                    <span className="text-green-400">Connected</span>
                </div>

                {/* Center - Made with love */}
                <div className="flex items-center space-x-1 text-gray-400">
                    <span>Made with</span>
                    <span className="text-red-400 animate-pulse">❤️</span>
                    <span>and</span>
                    <span className="text-blue-400">⚡</span>
                    <span>on Arch Linux</span>
                </div>

                {/* Right side - Status */}
                <div className="flex items-center space-x-2 text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>System OK</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
