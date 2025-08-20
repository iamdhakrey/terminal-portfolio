import React, { useState, useEffect } from 'react';
import { BlogHeader } from './BlogHeader';
import { TableOfContents } from './TableOfContents';
import { BlogContent } from './BlogContent';
import { BlogNavigation } from './BlogNavigation';

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

interface BlogPost {
    slug: string;
    title: string;
    content: string;
    date: string;
    tags: string[];
    readTime: number;
    wordCount: number;
    image?: string;
}

interface ModernBlogViewProps {
    blog: BlogPost;
    allBlogs: Array<{
        slug: string;
        title: string;
        date: string;
        image: string;
        next: string;
        prev: string;
    }>;
    onBlogChange: (slug: string) => void;
    onBack: () => void;
}

export const ModernBlogView: React.FC<ModernBlogViewProps> = ({
    blog,
    allBlogs,
    onBlogChange,
    onBack
}) => {
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeHeading, setActiveHeading] = useState<string>('');
    const [tocVisible, setTocVisible] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    // Extract headings from content
    useEffect(() => {
        const extractHeadings = (content: string): TOCItem[] => {
            const headings: TOCItem[] = [];
            const lines = content.split('\n');
            let inCodeBlock = false;

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();

                // Track code block boundaries
                if (line.startsWith('```')) {
                    inCodeBlock = !inCodeBlock;
                    continue;
                }

                // Skip headings inside code blocks
                if (inCodeBlock) {
                    continue;
                }

                // Extract markdown headings (must start with # at beginning of line)
                const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
                if (headingMatch) {
                    const level = headingMatch[1].length;
                    const text = headingMatch[2].trim();

                    // Skip if it looks like code comments or contains code-like patterns
                    if (text.includes('/*') || text.includes('*/') || text.includes('📝')) {
                        continue;
                    }

                    const id = text.toLowerCase()
                        .replace(/[^a-z0-9\s-]/g, '')
                        .replace(/\s+/g, '-')
                        .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes

                    if (id && text) { // Only add if we have valid id and text
                        headings.push({ id, text, level });
                    }
                }
            }

            return headings;
        };

        setHeadings(extractHeadings(blog.content));
    }, [blog.content]);

    // Track active heading on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveHeading(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-20% 0% -35% 0%',
                threshold: 0
            }
        );

        // Observe all headings
        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    // Check if blog is bookmarked
    useEffect(() => {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarked-blogs') || '[]');
        setIsBookmarked(bookmarks.includes(blog.slug));
    }, [blog.slug]);

    const handleBookmark = () => {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarked-blogs') || '[]');
        let updatedBookmarks;

        if (isBookmarked) {
            updatedBookmarks = bookmarks.filter((slug: string) => slug !== blog.slug);
        } else {
            updatedBookmarks = [...bookmarks, blog.slug];
        }

        localStorage.setItem('bookmarked-blogs', JSON.stringify(updatedBookmarks));
        setIsBookmarked(!isBookmarked);
    };

    const handleHeadingClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="min-h-screen font-mono" style={{
            backgroundColor: 'var(--theme-background)',
            color: 'var(--theme-text)'
        }}>
            {/* Mobile TOC toggle button */}
            <button
                onClick={() => setTocVisible(true)}
                className="lg:hidden fixed top-4 left-4 z-30 p-3 rounded-lg shadow-lg border"
                style={{
                    backgroundColor: 'var(--theme-welcomeBoxBg)',
                    borderColor: 'var(--theme-border)',
                    color: 'var(--theme-text)'
                }}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="lg:flex lg:gap-8">
                    {/* Main content */}
                    <div className="lg:flex-1 lg:max-w-4xl">
                        <BlogHeader
                            title={blog.title}
                            date={blog.date}
                            estimatedReadTime={blog.readTime}
                            wordCount={blog.wordCount}
                            tags={blog.tags}
                            isBookmarked={isBookmarked}
                            onToggleBookmark={handleBookmark}
                            onShowTOC={() => setTocVisible(true)}
                            onBack={onBack}
                            image={blog.image}
                        />

                        <div className="rounded-lg shadow-sm border p-8 mb-8" style={{
                            backgroundColor: 'var(--theme-welcomeBoxBg)',
                            borderColor: 'var(--theme-border)'
                        }}>
                            <BlogContent
                                content={blog.content}
                                onHeadingClick={handleHeadingClick}
                            />
                        </div>

                        <BlogNavigation
                            currentBlog={blog.slug}
                            allBlogs={allBlogs}
                            onBlogChange={onBlogChange}
                        />
                    </div>

                    {/* Table of Contents - Desktop Sidebar */}
                    <div className="lg:w-80 lg:flex-shrink-0">
                        <TableOfContents
                            headings={headings}
                            activeHeading={activeHeading}
                            isVisible={tocVisible}
                            onClose={() => setTocVisible(false)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
