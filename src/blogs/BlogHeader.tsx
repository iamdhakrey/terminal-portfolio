import React from 'react';

interface BlogHeaderProps {
    title: string;
    date: string;
    estimatedReadTime: number;
    wordCount: number;
    tags: string[];
    isBookmarked: boolean;
    onToggleBookmark: () => void;
    onShowTOC: () => void;
    onBack?: () => void;
    image?: string;
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({
    title,
    date,
    estimatedReadTime,
    wordCount,
    tags,
    isBookmarked,
    onToggleBookmark,
    onShowTOC,
    onBack,
    image
}) => {
    return (
        <div className="shadow-sm border-b" style={{
            backgroundColor: 'var(--theme-welcomeBoxBg)',
            borderColor: 'var(--theme-border)'
        }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-8">
                    {/* Breadcrumb */}
                    <nav className="mb-6">
                        <div className="flex items-center space-x-2 text-sm">
                            <button
                                onClick={onBack}
                                className="hover:opacity-75 transition-colors"
                                style={{ color: 'var(--theme-primary)' }}
                            >
                                ← Back to blogs
                            </button>
                        </div>
                    </nav>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{
                        color: 'var(--theme-text)'
                    }}>
                        {title}
                    </h1>

                    {/* Featured Image */}
                    {image && (
                        <div className="mb-8">
                            <img
                                src={image}
                                alt={title}
                                className="w-full object-cover rounded-lg shadow-lg"
                                style={{ maxWidth: '100%' }}
                            />
                        </div>
                    )}                    {/* Meta information */}
                    <div className="flex flex-wrap items-center gap-6 mb-6">
                        <div className="flex items-center text-sm" style={{ color: 'var(--theme-muted)' }}>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {date}
                        </div>

                        <div className="flex items-center text-sm" style={{ color: 'var(--theme-muted)' }}>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {estimatedReadTime} min read
                        </div>

                        <div className="flex items-center text-sm" style={{ color: 'var(--theme-muted)' }}>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {wordCount} words
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {/* Mobile TOC button */}
                            <button
                                onClick={onShowTOC}
                                className="lg:hidden inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                </svg>
                                Contents
                            </button>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Bookmark button */}
                        <button
                            onClick={onToggleBookmark}
                            className={`inline-flex items-center px-3 py-2 border shadow-sm text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isBookmarked
                                ? 'border-indigo-300 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 dark:border-indigo-600 dark:text-indigo-300 dark:bg-indigo-900 dark:hover:bg-indigo-800'
                                : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700'
                                }`}
                        >
                            <svg
                                className="w-4 h-4 mr-2"
                                fill={isBookmarked ? 'currentColor' : 'none'}
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
