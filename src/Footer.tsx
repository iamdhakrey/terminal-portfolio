import { getFooter } from "./utils/configManager";

const Footer = () => {
    const footer = getFooter();

    return (
        <footer className="border-t p-2 sm:p-3 font-mono fixed bottom-0 left-0 right-0 z-10"
                style={{ 
                    backgroundColor: 'var(--theme-background)', 
                    borderColor: 'var(--theme-border)' 
                }}>
            <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs">
                {/* Mobile layout - stacked */}
                <div className="flex flex-col sm:hidden items-center space-y-1 w-full">
                    <div className="flex items-center space-x-2" style={{ color: 'var(--theme-muted)' }}>
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--theme-primary)' }}></div>
                        <span style={{ color: 'var(--theme-primary)' }}>{footer.statusMessage}</span>
                        <span>•</span>
                        {footer.madeWithLove.enabled && (
                            <span>{footer.madeWithLove.text} on {footer.madeWithLove.location}</span>
                        )}
                    </div>
                </div>

                {/* Desktop layout - horizontal */}
                <div className="hidden sm:flex items-center space-x-4" style={{ color: 'var(--theme-muted)' }}>
                    <span>Session: active</span>
                    <span>•</span>
                    <span>TTY: /dev/pts/0</span>
                    <span>•</span>
                    <span style={{ color: 'var(--theme-primary)' }}>{footer.statusMessage}</span>
                </div>

                {/* Center - Made with love (desktop only) */}
                {footer.madeWithLove.enabled && (
                    <div className="hidden sm:flex items-center space-x-1" style={{ color: 'var(--theme-muted)' }}>
                        <span>{footer.madeWithLove.text}</span>
                        <span>on {footer.madeWithLove.location}</span>
                    </div>
                )}

                {/* Right side - Status (desktop only) */}
                {footer.systemStatus.enabled && (
                    <div className="hidden sm:flex items-center space-x-2" style={{ color: 'var(--theme-muted)' }}>
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--theme-primary)' }}></div>
                        <span>{footer.systemStatus.message}</span>
                    </div>
                )}
            </div>
        </footer>
    );
};

export default Footer;
