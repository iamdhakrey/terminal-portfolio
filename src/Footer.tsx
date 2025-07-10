import { getFooter } from "./utils/configManager";

const Footer = () => {
    const footer = getFooter();

    return (
        <footer className="bg-gray-900 border-t border-gray-700 p-2 sm:p-3 font-mono fixed bottom-0 left-0 right-0 z-10">
            <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs">
                {/* Mobile layout - stacked */}
                <div className="flex flex-col sm:hidden items-center space-y-1 w-full">
                    <div className="flex items-center space-x-2 text-gray-400">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400">{footer.statusMessage}</span>
                        <span>•</span>
                        {footer.madeWithLove.enabled && (
                            <span>{footer.madeWithLove.text} on {footer.madeWithLove.location}</span>
                        )}
                    </div>
                </div>

                {/* Desktop layout - horizontal */}
                <div className="hidden sm:flex items-center space-x-4 text-gray-400">
                    <span>Session: active</span>
                    <span>•</span>
                    <span>TTY: /dev/pts/0</span>
                    <span>•</span>
                    <span className="text-green-400">{footer.statusMessage}</span>
                </div>

                {/* Center - Made with love (desktop only) */}
                {footer.madeWithLove.enabled && (
                    <div className="hidden sm:flex items-center space-x-1 text-gray-400">
                        <span>{footer.madeWithLove.text}</span>
                        <span>on {footer.madeWithLove.location}</span>
                    </div>
                )}

                {/* Right side - Status (desktop only) */}
                {footer.systemStatus.enabled && (
                    <div className="hidden sm:flex items-center space-x-2 text-gray-400">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>{footer.systemStatus.message}</span>
                    </div>
                )}
            </div>
        </footer>
    );
};

export default Footer;
