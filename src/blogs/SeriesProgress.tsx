import React from 'react';

interface SeriesProgressProps {
    seriesName: string;
    currentIndex: number;
    totalInSeries: number;
    progress: number;
    previousInSeries?: {
        slug: string;
        title: string;
    };
    nextInSeries?: {
        slug: string;
        title: string;
    };
    onBlogChange: (slug: string) => void;
}

export const SeriesProgress: React.FC<SeriesProgressProps> = ({
    seriesName,
    currentIndex,
    totalInSeries,
    progress,
    previousInSeries,
    nextInSeries,
    onBlogChange
}) => {
    return (
        <div className="mb-8 p-6 rounded-lg border" style={{
            backgroundColor: 'var(--theme-welcomeBoxBg)',
            borderColor: 'var(--theme-border)'
        }}>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold flex items-center" style={{ color: 'var(--theme-text)' }}>
                        <svg className="w-5 h-5 mr-2" style={{ color: 'var(--theme-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        {seriesName}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs" style={{ color: 'var(--theme-muted)' }}>Progress:</span>
                        <span className="text-sm font-medium" style={{ color: 'var(--theme-text)' }}>
                            {currentIndex}/{totalInSeries}
                        </span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: 'var(--theme-accent)' }}>
                        {progress}%
                    </div>
                    <div className="text-xs" style={{ color: 'var(--theme-muted)' }}>
                        Complete
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
                <div className="h-2 rounded-full" style={{ backgroundColor: 'var(--theme-border)' }}>
                    <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                            width: `${progress}%`,
                            backgroundColor: 'var(--theme-accent)'
                        }}
                    />
                </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
                {previousInSeries ? (
                    <button
                        onClick={() => onBlogChange(previousInSeries.slug)}
                        className="group flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 hover:shadow-md max-w-xs"
                        style={{
                            backgroundColor: 'var(--theme-navItemBg)',
                            borderColor: 'var(--theme-border)'
                        }}
                    >
                        <div className="flex-shrink-0">
                            <svg className="w-4 h-4 group-hover:opacity-75" style={{ color: 'var(--theme-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>
                        <div className="text-left min-w-0">
                            <p className="text-xs mb-1" style={{ color: 'var(--theme-muted)' }}>Previous in Series</p>
                            <p className="text-sm font-medium truncate group-hover:opacity-75" style={{ color: 'var(--theme-text)' }}>
                                {previousInSeries.title}
                            </p>
                        </div>
                    </button>
                ) : (
                    <div></div>
                )}

                {nextInSeries ? (
                    <button
                        onClick={() => onBlogChange(nextInSeries.slug)}
                        className="group flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 hover:shadow-md max-w-xs"
                        style={{
                            backgroundColor: 'var(--theme-navItemBg)',
                            borderColor: 'var(--theme-border)'
                        }}
                    >
                        <div className="text-right min-w-0">
                            <p className="text-xs mb-1" style={{ color: 'var(--theme-muted)' }}>Next in Series</p>
                            <p className="text-sm font-medium truncate group-hover:opacity-75" style={{ color: 'var(--theme-text)' }}>
                                {nextInSeries.title}
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <svg className="w-4 h-4 group-hover:opacity-75" style={{ color: 'var(--theme-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </button>
                ) : (
                    <div className="text-center">
                        <div className="p-3 rounded-lg border" style={{
                            backgroundColor: 'var(--theme-selectedBg)',
                            borderColor: 'var(--theme-accent)'
                        }}>
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" style={{ color: 'var(--theme-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm font-medium" style={{ color: 'var(--theme-text)' }}>
                                    Series Complete! 🎉
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
