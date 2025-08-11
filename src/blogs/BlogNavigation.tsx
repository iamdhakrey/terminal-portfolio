import React from 'react';
import { SeriesProgress } from './SeriesProgress';
import { getSeriesInfo } from '../utils/seriesUtils';

interface BlogNavigationProps {
    currentBlog: string;
    allBlogs: Array<{
        slug: string;
        title: string;
        date: string;
    }>;
    onBlogChange: (slug: string) => void;
}

export const BlogNavigation: React.FC<BlogNavigationProps> = ({
    currentBlog,
    allBlogs,
    onBlogChange
}) => {
    console.log(allBlogs)
    const currentIndex = allBlogs.findIndex(blog => blog.slug === currentBlog);
    const prevBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
    const nextBlog = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

    // Get series information
    const seriesInfo = getSeriesInfo(currentBlog, allBlogs);

    return (
        <div className="border-t pt-8 mt-12" style={{ borderColor: 'var(--theme-border)' }}>
            {/* Series Progress (if part of a series) */}
            {seriesInfo.isInSeries && (
                <SeriesProgress
                    seriesName={seriesInfo.seriesName}
                    currentIndex={seriesInfo.seriesIndex}
                    totalInSeries={seriesInfo.totalInSeries}
                    progress={seriesInfo.seriesProgress}
                    previousInSeries={seriesInfo.previousInSeries}
                    nextInSeries={seriesInfo.nextInSeries}
                    onBlogChange={onBlogChange}
                />
            )}
            {/* Previous/Next Navigation */}
            <div className="flex justify-between items-center mb-8">
                {prevBlog ? (
                    <button
                        onClick={() => onBlogChange(prevBlog.slug)}
                        className="group flex items-center space-x-3 p-4 border rounded-lg hover:shadow-md transition-all duration-200 max-w-xs"
                        style={{
                            backgroundColor: 'var(--theme-welcomeBoxBg)',
                            borderColor: 'var(--theme-border)'
                        }}
                    >
                        <div className="flex-shrink-0">
                            <svg className="w-5 h-5 group-hover:opacity-75" style={{ color: 'var(--theme-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>
                        <div className="text-left min-w-0">
                            <p className="text-xs mb-1" style={{ color: 'var(--theme-muted)' }}>Previous</p>
                            <p className="text-sm font-medium truncate group-hover:opacity-75" style={{ color: 'var(--theme-text)' }}>
                                {prevBlog.title}
                            </p>
                        </div>
                    </button>
                ) : (
                    <div></div>
                )}

                {nextBlog ? (
                    <button
                        onClick={() => onBlogChange(nextBlog.slug)}
                        className="group flex items-center space-x-3 p-4 border rounded-lg hover:shadow-md transition-all duration-200 max-w-xs"
                        style={{
                            backgroundColor: 'var(--theme-welcomeBoxBg)',
                            borderColor: 'var(--theme-border)'
                        }}
                    >
                        <div className="text-right min-w-0">
                            <p className="text-xs mb-1" style={{ color: 'var(--theme-muted)' }}>Next</p>
                            <p className="text-sm font-medium truncate group-hover:opacity-75" style={{ color: 'var(--theme-text)' }}>
                                {nextBlog.title}
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <svg className="w-5 h-5 group-hover:opacity-75" style={{ color: 'var(--theme-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </button>
                ) : (
                    <div></div>
                )}
            </div>

            {/* All Blogs List */}
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--theme-welcomeBoxBg)', border: '1px solid var(--theme-border)' }}>
                <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: 'var(--theme-text)' }}>
                    <svg className="w-5 h-5 mr-2" style={{ color: 'var(--theme-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    More Articles
                </h3>
                <div className="grid gap-3 max-h-96 overflow-y-auto">
                    {allBlogs.map((blog) => (
                        <button
                            key={blog.slug}
                            onClick={() => onBlogChange(blog.slug)}
                            className={`text-left p-3 rounded-lg transition-colors ${blog.slug === currentBlog
                                ? 'ring-2 ring-opacity-50'
                                : 'hover:opacity-75'
                                }`}
                            style={{
                                backgroundColor: blog.slug === currentBlog ? 'var(--theme-selectedBg)' : 'var(--theme-navItemBg)',
                                color: 'var(--theme-text)',
                                border: '1px solid var(--theme-border)',
                                ...(blog.slug === currentBlog && { ringColor: 'var(--theme-accent)' })
                            }}
                        >
                            <div className="flex items-start justify-between">
                                <div className="min-w-0 flex-1">
                                    <p className="font-medium truncate">{blog.title}</p>
                                    <p className="text-xs mt-1" style={{ color: 'var(--theme-muted)' }}>
                                        {blog.date && blog.date !== 'Unknown Date' && !isNaN(new Date(blog.date).getTime())
                                            ? new Date(blog.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })
                                            : blog.date || 'Date not available'
                                        }
                                    </p>
                                </div>
                                {blog.slug === currentBlog && (
                                    <div className="flex-shrink-0 ml-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--theme-accent)' }}></div>
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Back to Blog List */}
            <div className="mt-6 text-center">
                <button
                    onClick={() => onBlogChange('')}
                    className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium hover:opacity-75 transition-opacity"
                    style={{ color: 'var(--theme-accent)' }}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to All Articles</span>
                </button>
            </div>
        </div>
    );
};
