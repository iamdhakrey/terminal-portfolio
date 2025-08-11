import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams, Link } from 'react-router-dom';
import { 
    getBlogByFilename, 
    processBlogLinks, 
    getRelatedBlogs, 
    getBlogNavigation,
    BlogFile 
} from './utils/blogUtils';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css'; // Import a highlight.js theme


function Blogs() {
    const { filename } = useParams<{ filename: string }>();
    console.log('Blogs component rendered with filename:', filename);
    const [content, setContent] = useState<string>('');
    const [title, setTitle] = useState<string>('Loading...');
    const [date, setDate] = useState<string>('Unknown Date');
    const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);
    const [relatedPosts, setRelatedPosts] = useState<BlogFile[]>([]);
    const [navigation, setNavigation] = useState<{ previous: BlogFile | null; next: BlogFile | null }>({
        previous: null,
        next: null
    });

    // Extract headings from markdown content for table of contents
    const extractHeadings = (markdownContent: string) => {
        const headingRegex = /^(#{1,6})\s+(.+)$/gm;
        const extractedHeadings: Array<{ id: string; text: string; level: number }> = [];
        let match;

        while ((match = headingRegex.exec(markdownContent)) !== null) {
            const level = match[1].length;
            const text = match[2].trim();
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            extractedHeadings.push({ id, text, level });
        }

        return extractedHeadings;
    };

    useEffect(() => {
        async function fetchBlog() {
            if (!filename) {
                console.error('No filename provided');
                setTitle('Blog Not Found');
                return;
            }

            try {
                const blogData = await getBlogByFilename(filename);
                if (!blogData) {
                    setTitle('Blog Not Found');
                    setContent('The requested blog post could not be found.');
                    return;
                }

                // Process blog content for inter-blog links and images
                const processedContent = await processBlogLinks(blogData.content, filename);
                setContent(processedContent);
                setTitle(blogData.metadata.title);
                setDate(blogData.metadata.date);

                // Extract headings for table of contents
                const extractedHeadings = extractHeadings(processedContent);
                setHeadings(extractedHeadings);

                // Get related posts
                const related = await getRelatedBlogs(filename, 3);
                setRelatedPosts(related);

                // Get navigation (previous/next posts)
                const nav = await getBlogNavigation(filename);
                setNavigation(nav);
            } catch (error) {
                console.error('Error fetching blog:', error);
                setTitle('Error Loading Blog');
                setContent('There was an error loading this blog post.');
            }
        }

        fetchBlog();
    }, [filename]);

    return (
        <div className="min-h-screen font-mono pb-16"
             style={{ 
                 backgroundColor: 'var(--theme-background)', 
                 color: 'var(--theme-text)' 
             }}>
            <div className="max-w-6xl mx-auto py-4 sm:py-8 px-2 sm:px-4">
                {/* Terminal navigation */}
                <div className="mb-4 sm:mb-6">
                    <div className="border rounded-lg p-3 sm:p-4"
                         style={{ 
                             backgroundColor: 'var(--theme-background)', 
                             borderColor: 'var(--theme-border)' 
                         }}>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                            <div className="flex items-center space-x-1 text-xs sm:text-sm">
                                <span className="hidden sm:inline" style={{ color: 'var(--theme-info)' }}>user@localhost</span>
                                <span className="hidden sm:inline" style={{ color: 'var(--theme-text)' }}>:</span>
                                <span className="hidden sm:inline" style={{ color: 'var(--theme-info)' }}>~/blogs</span>
                                <span style={{ color: 'var(--theme-text)' }}>$ </span>
                                <Link
                                    to="/blogs"
                                    className="hover:opacity-75 underline"
                                    style={{ color: 'var(--theme-primary)' }}
                                >
                                    cd ..
                                </Link>
                            </div>
                            <span className="text-xs sm:text-sm" style={{ color: 'var(--theme-muted)' }}># Back to blog list</span>
                        </div>
                    </div>
                </div>

                {/* Terminal window */}
                <div className="border rounded-t-lg"
                     style={{ 
                         backgroundColor: 'var(--theme-background)', 
                         borderColor: 'var(--theme-border)' 
                     }}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border-b space-y-2 sm:space-y-0"
                         style={{ borderColor: 'var(--theme-border)' }}>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-xs sm:text-sm ml-4 break-all" style={{ color: 'var(--theme-muted)' }}>~/blogs/{filename}.md</span>
                        </div>
                        <div className="text-xs" style={{ color: 'var(--theme-muted)' }}>
                            vim {filename}.md
                        </div>
                    </div>
                </div>

                <div className="border-x border-b rounded-b-lg p-8"
                     style={{ 
                         backgroundColor: 'var(--theme-background)', 
                         borderColor: 'var(--theme-border)' 
                     }}>
                    {/* File header */}
                    <div className="mb-6 border-b pb-4" style={{ borderColor: 'var(--theme-border)' }}>
                        <div className="text-sm mb-2" style={{ color: 'var(--theme-muted)' }}>
                            <span style={{ color: 'var(--theme-info)' }}>$ </span>
                            <span>cat {filename}.md</span>
                        </div>
                        <h1 className="text-xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--theme-primary)' }}>
                            <span style={{ color: 'var(--theme-muted)' }}># </span>{title}
                        </h1>
                        <div className="flex items-center space-x-4 text-xs sm:text-sm">
                            <span style={{ color: 'var(--theme-info)' }}>📅 {date}</span>
                            <span style={{ color: 'var(--theme-warning)' }}>📝 Markdown</span>
                            <span style={{ color: 'var(--theme-muted)' }}>UTF-8</span>
                        </div>
                    </div>

                    {/* Table of Contents */}
                    {headings.length > 0 && (
                        <div className="mb-8 p-4 border rounded-lg"
                             style={{ 
                                 backgroundColor: 'var(--theme-welcomeBoxBg)', 
                                 borderColor: 'var(--theme-border)' 
                             }}>
                            <h2 className="text-base sm:text-lg font-semibold mb-3" style={{ color: 'var(--theme-primary)' }}>
                                <span style={{ color: 'var(--theme-muted)' }}>## </span>Table of Contents
                            </h2>
                            <ul className="space-y-1">
                                {headings.map((heading, index) => (
                                    <li key={index} style={{ marginLeft: `${(heading.level - 1) * 16}px` }}>
                                        <a
                                            href={`#${heading.id}`}
                                            className="hover:underline text-sm"
                                            style={{ color: 'var(--theme-secondary)' }}
                                        >
                                            <span style={{ color: 'var(--theme-muted)' }}>
                                                {'#'.repeat(heading.level)}
                                            </span>
                                            <span className="ml-1">{heading.text}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Markdown content with terminal styling */}
                    <div className="prose prose-sm sm:prose-lg max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight, rehypeRaw]}
                            components={{
                                code: ({ className, children, ...props }: any) => {
                                    const match = /language-(\w+)/.exec(className || '');
                                    const isInline = !match;
                                    return isInline ? (
                                        <code className="px-1 py-0.5 rounded text-xs sm:text-sm font-mono border" 
                                              style={{ 
                                                  backgroundColor: 'var(--theme-welcomeBoxBg)',
                                                  color: 'var(--theme-accent)',
                                                  borderColor: 'var(--theme-border)'
                                              }}
                                              {...props}>
                                            {children}
                                        </code>
                                    ) : (
                                        <div className="my-4 sm:my-6">
                                            <div className="border rounded-t-lg p-2 flex items-center justify-between"
                                                 style={{ 
                                                     backgroundColor: 'var(--theme-welcomeBoxBg)',
                                                     borderColor: 'var(--theme-border)'
                                                 }}>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                </div>
                                                <span className="text-xs" style={{ color: 'var(--theme-muted)' }}>
                                                    {match ? match[1] : 'code'}
                                                </span>
                                            </div>
                                            <pre className="p-3 sm:p-4 rounded-b-lg overflow-x-auto border-x border-b m-0"
                                                 style={{ 
                                                     backgroundColor: 'var(--theme-background)',
                                                     color: 'var(--theme-outputText)',
                                                     borderColor: 'var(--theme-border)'
                                                 }}>
                                                <code className={`${className} text-xs sm:text-sm leading-relaxed`} {...props}>
                                                    {children}
                                                </code>
                                            </pre>
                                        </div>
                                    );
                                },
                                pre: ({ children }: any) => {
                                    return <div className="my-4">{children}</div>;
                                },
                                h1: ({ children, ...props }: any) => {
                                    const text = children?.toString() || '';
                                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                    return (
                                        <h1 id={id} className="text-lg sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4 border-b pb-2" 
                                            style={{ 
                                                color: 'var(--theme-primary)',
                                                borderColor: 'var(--theme-border)'
                                            }} 
                                            {...props}>
                                            <span style={{ color: 'var(--theme-muted)' }}># </span>{children}
                                        </h1>
                                    );
                                },
                                h2: ({ children, ...props }: any) => {
                                    const text = children?.toString() || '';
                                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                    return (
                                        <h2 id={id} className="text-base sm:text-xl font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3" 
                                            style={{ color: 'var(--theme-primary)' }} 
                                            {...props}>
                                            <span style={{ color: 'var(--theme-muted)' }}>## </span>{children}
                                        </h2>
                                    );
                                },
                                h3: ({ children, ...props }: any) => {
                                    const text = children?.toString() || '';
                                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                    return (
                                        <h3 id={id} className="text-sm sm:text-lg font-semibold mt-3 sm:mt-4 mb-2" 
                                            style={{ color: 'var(--theme-primary)' }} 
                                            {...props}>
                                            <span style={{ color: 'var(--theme-muted)' }}>### </span>{children}
                                        </h3>
                                    );
                                },
                                h4: ({ children, ...props }: any) => {
                                    const text = children?.toString() || '';
                                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                    return (
                                        <h4 id={id} className="text-sm sm:text-base font-semibold mt-3 mb-2" 
                                            style={{ color: 'var(--theme-primary)' }} 
                                            {...props}>
                                            <span style={{ color: 'var(--theme-muted)' }}>#### </span>{children}
                                        </h4>
                                    );
                                },
                                h5: ({ children, ...props }: any) => {
                                    const text = children?.toString() || '';
                                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                    return (
                                        <h5 id={id} className="text-xs sm:text-sm font-semibold mt-3 mb-2" 
                                            style={{ color: 'var(--theme-primary)' }} 
                                            {...props}>
                                            <span style={{ color: 'var(--theme-muted)' }}>##### </span>{children}
                                        </h5>
                                    );
                                },
                                h6: ({ children, ...props }: any) => {
                                    const text = children?.toString() || '';
                                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                    return (
                                        <h6 id={id} className="text-xs font-semibold mt-3 mb-2" 
                                            style={{ color: 'var(--theme-primary)' }} 
                                            {...props}>
                                            <span style={{ color: 'var(--theme-muted)' }}>###### </span>{children}
                                        </h6>
                                    );
                                },
                                p: ({ children, ...props }: any) => {
                                    return (
                                        <p className="mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed" 
                                           style={{ color: 'var(--theme-text)' }} 
                                           {...props}>
                                            {children}
                                        </p>
                                    );
                                },
                                ul: ({ children, ...props }: any) => {
                                    return (
                                        <ul className="list-disc list-inside mb-3 sm:mb-4 space-y-1 ml-2 sm:ml-4 text-xs sm:text-sm" 
                                            style={{ color: 'var(--theme-text)' }} 
                                            {...props}>
                                            {children}
                                        </ul>
                                    );
                                },
                                ol: ({ children, ...props }: any) => {
                                    return (
                                        <ol className="list-decimal list-inside mb-3 sm:mb-4 space-y-1 ml-2 sm:ml-4 text-xs sm:text-sm" 
                                            style={{ color: 'var(--theme-text)' }} 
                                            {...props}>
                                            {children}
                                        </ol>
                                    );
                                },
                                li: ({ children, ...props }: any) => {
                                    return (
                                        <li className="text-xs sm:text-sm" 
                                            style={{ color: 'var(--theme-text)' }} 
                                            {...props}>
                                            {children}
                                        </li>
                                    );
                                },
                                blockquote: ({ children, ...props }: any) => {
                                    return (
                                        <blockquote className="border-l-4 pl-4 italic my-4 py-2" 
                                                    style={{ 
                                                        borderColor: 'var(--theme-secondary)',
                                                        backgroundColor: 'var(--theme-welcomeBoxBg)',
                                                        color: 'var(--theme-muted)'
                                                    }} 
                                                    {...props}>
                                            {children}
                                        </blockquote>
                                    );
                                },
                                img: ({ src, alt, ...props }: any) => {
                                    return (
                                        <div className="my-6 p-4 border rounded-lg"
                                             style={{ 
                                                 backgroundColor: 'var(--theme-welcomeBoxBg)',
                                                 borderColor: 'var(--theme-border)'
                                             }}>
                                            <div className="mb-2 text-sm" style={{ color: 'var(--theme-muted)' }}>
                                                <span style={{ color: 'var(--theme-secondary)' }}>$ </span>
                                                <span>display {alt || 'image'}</span>
                                            </div>
                                            <img
                                                src={src}
                                                alt={alt}
                                                className="max-w-full h-auto rounded border"
                                                style={{ borderColor: 'var(--theme-border)' }}
                                                {...props}
                                            />
                                            {alt && (
                                                <div className="mt-2 text-xs text-center" style={{ color: 'var(--theme-muted)' }}>
                                                    {alt}
                                                </div>
                                            )}
                                        </div>
                                    );
                                },
                                a: ({ href, children, ...props }: any) => {
                                    // Check if it's an internal blog link
                                    const isInternalBlogLink = href && href.startsWith('/blogs/');
                                    
                                    if (isInternalBlogLink) {
                                        // Use React Router Link for internal blog links
                                        return (
                                            <Link
                                                to={href}
                                                className="underline hover:opacity-75"
                                                style={{ color: 'var(--theme-secondary)' }}
                                                {...props}
                                            >
                                                {children}
                                            </Link>
                                        );
                                    }
                                    
                                    // External links open in new tab
                                    return (
                                        <a
                                            href={href}
                                            className="underline hover:opacity-75"
                                            style={{ color: 'var(--theme-secondary)' }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            {...props}
                                        >
                                            {children}
                                        </a>
                                    );
                                },
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>

                    {/* Blog Navigation */}
                    {(navigation.previous || navigation.next) && (
                        <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--theme-border)' }}>
                            <div className="border rounded-lg p-4"
                                 style={{ 
                                     backgroundColor: 'var(--theme-welcomeBoxBg)',
                                     borderColor: 'var(--theme-border)'
                                 }}>
                                <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center" 
                                    style={{ color: 'var(--theme-primary)' }}>
                                    <span className="mr-2" style={{ color: 'var(--theme-secondary)' }}>$</span>
                                    Navigation
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {navigation.previous && (
                                        <Link
                                            to={`/blogs/${navigation.previous.filename.replace('.md', '')}`}
                                            className="flex items-center space-x-2 p-3 border rounded hover:opacity-75 transition-colors group"
                                            style={{ 
                                                backgroundColor: 'var(--theme-background)',
                                                borderColor: 'var(--theme-border)'
                                            }}
                                        >
                                            <span style={{ color: 'var(--theme-muted)' }}>←</span>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs" style={{ color: 'var(--theme-muted)' }}>Previous</div>
                                                <div className="text-xs sm:text-sm truncate" 
                                                     style={{ color: 'var(--theme-secondary)' }}>
                                                    {navigation.previous.title}
                                                </div>
                                            </div>
                                        </Link>
                                    )}
                                    {navigation.next && (
                                        <Link
                                            to={`/blogs/${navigation.next.filename.replace('.md', '')}`}
                                            className="flex items-center space-x-2 p-3 border rounded hover:opacity-75 transition-colors group text-right"
                                            style={{ 
                                                backgroundColor: 'var(--theme-background)',
                                                borderColor: 'var(--theme-border)'
                                            }}
                                        >
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs" style={{ color: 'var(--theme-muted)' }}>Next</div>
                                                <div className="text-xs sm:text-sm truncate" 
                                                     style={{ color: 'var(--theme-secondary)' }}>
                                                    {navigation.next.title}
                                                </div>
                                            </div>
                                            <span style={{ color: 'var(--theme-muted)' }}>→</span>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--theme-border)' }}>
                            <div className="border rounded-lg p-4"
                                 style={{ 
                                     backgroundColor: 'var(--theme-welcomeBoxBg)',
                                     borderColor: 'var(--theme-border)'
                                 }}>
                                <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center" 
                                    style={{ color: 'var(--theme-primary)' }}>
                                    <span className="mr-2" style={{ color: 'var(--theme-secondary)' }}>$</span>
                                    Related Posts
                                </h3>
                                <div className="space-y-3">
                                    {relatedPosts.map((post, index) => (
                                        <Link
                                            key={index}
                                            to={`/blogs/${post.filename.replace('.md', '')}`}
                                            className="block p-3 border rounded hover:opacity-75 transition-colors group"
                                            style={{ 
                                                backgroundColor: 'var(--theme-background)',
                                                borderColor: 'var(--theme-border)'
                                            }}
                                        >
                                            <div className="flex items-start space-x-3">
                                                <span className="text-sm mt-1" style={{ color: 'var(--theme-muted)' }}>→</span>
                                                <div className="flex-1">
                                                    <div className="font-medium text-xs sm:text-sm" 
                                                         style={{ color: 'var(--theme-secondary)' }}>
                                                        {post.title}
                                                    </div>
                                                    {post.description && (
                                                        <div className="text-xs sm:text-sm mt-1 line-clamp-2" 
                                                             style={{ color: 'var(--theme-muted)' }}>
                                                            {post.description}
                                                        </div>
                                                    )}
                                                    <div className="text-xs mt-2" style={{ color: 'var(--theme-muted)' }}>
                                                        {post.date}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Terminal footer */}
                    <div className="mt-8 pt-4 border-t" style={{ borderColor: 'var(--theme-border)' }}>
                        <div className="flex items-center space-x-4 text-sm" style={{ color: 'var(--theme-muted)' }}>
                            <span style={{ color: 'var(--theme-secondary)' }}>user@localhost</span>
                            <span>:</span>
                            <span style={{ color: 'var(--theme-info)' }}>~/blogs/{filename}.md</span>
                            <span>$ </span>
                            <span style={{ color: 'var(--theme-primary)' }}>cat --end-of-file</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Blogs;