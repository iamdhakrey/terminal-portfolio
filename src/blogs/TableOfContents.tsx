import React from 'react';

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    headings: TOCItem[];
    activeHeading: string;
    isVisible: boolean;
    onClose: () => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
    headings,
    activeHeading,
    isVisible,
    onClose
}) => {
    if (!headings.length) return null;

    return (
        <>
            {/* Mobile overlay */}
            {isVisible && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={onClose}
                />
            )}

            {/* Desktop sidebar */}
            <div className="hidden lg:block sticky top-8">
                <div className="rounded-lg border p-6" style={{
                    backgroundColor: 'var(--theme-welcomeBoxBg)',
                    borderColor: 'var(--theme-border)'
                }}>
                    <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--theme-text)' }}>
                        Table of Contents
                    </h3>
                    <nav className="space-y-2 max-h-96 overflow-y-auto">
                        {headings.map((heading, index) => (
                            <a
                                key={index}
                                href={`#${heading.id}`}
                                className={`block py-1 px-2 text-sm rounded transition-colors ${activeHeading === heading.id ? 'font-medium' : 'hover:opacity-75'
                                    }`}
                                style={{
                                    paddingLeft: `${Math.min(heading.level * 12, 48)}px`,
                                    color: activeHeading === heading.id ? 'var(--theme-primary)' : 'var(--theme-muted)',
                                    backgroundColor: activeHeading === heading.id ? 'var(--theme-background)' : 'transparent'
                                }}
                            >
                                {heading.text}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>            {/* Mobile sidebar */}
            <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-80 shadow-xl transform transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : '-translate-x-full'
                }`} style={{ backgroundColor: 'var(--theme-welcomeBoxBg)' }}>
                <div className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid var(--theme-border)' }}>
                    <h3 className="text-lg font-semibold" style={{ color: 'var(--theme-text)' }}>
                        Table of Contents
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:opacity-75 transition-opacity"
                        style={{ color: 'var(--theme-muted)' }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <nav className="p-4 space-y-2 max-h-full overflow-y-auto">
                    {headings.map((heading, index) => (
                        <a
                            key={index}
                            href={`#${heading.id}`}
                            onClick={onClose}
                            className={`block py-2 px-3 text-sm rounded transition-colors ${activeHeading === heading.id
                                ? 'font-medium'
                                : 'hover:opacity-75'
                                }`}
                            style={{
                                paddingLeft: `${12 + Math.min(heading.level * 12, 48)}px`,
                                color: activeHeading === heading.id ? 'var(--theme-primary)' : 'var(--theme-muted)',
                                backgroundColor: activeHeading === heading.id ? 'var(--theme-background)' : 'transparent'
                            }}
                        >
                            {heading.text}
                        </a>
                    ))}
                </nav>
            </div>
        </>
    );
};
