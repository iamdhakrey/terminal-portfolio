import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    getBlogByFilename,
    areBlogsEnabled,
    getAllBlogs
} from './utils/blogUtils';
import { ModernBlogView, BlogPost } from './blogs';
import BlogList from './BlogList';

function ModernBlogs() {
    const { filename } = useParams<{ filename: string }>();
    const navigate = useNavigate();
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [allBlogs, setAllBlogs] = useState<Array<{ slug: string; title: string; date: string }>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load all available blogs for navigation
    useEffect(() => {
        const loadAllBlogs = async () => {
            try {
                if (!areBlogsEnabled()) {
                    setError('Blogs are currently disabled');
                    setLoading(false);
                    return;
                }

                const blogFiles = await getAllBlogs();
                if (!blogFiles || blogFiles.length === 0) {
                    setError('No blogs available');
                    setLoading(false);
                    return;
                }
                setLoading(true);
                setError(null);

                // Load blog metadata for all available blogs
                const blogPromises = blogFiles.map(async (file) => {
                    try {
                        return {
                            slug: file.filename.replace('.md', ''),
                            title: file.title,
                            date: file.date || 'Unknown Date'
                        };
                    } catch (err) {
                        console.error(`Error loading blog ${file.filename}:`, err);
                        return null;
                    }
                });

                const blogs = (await Promise.all(blogPromises))
                    .filter((blog): blog is NonNullable<typeof blog> => blog !== null)
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                setAllBlogs(blogs);
                setLoading(false); // Fix: Set loading to false after successful load
            } catch (err) {
                console.error('Error loading blog list:', err);
                setError('Failed to load blog list');
                setLoading(false); // Fix: Set loading to false on error too
            }
        };

        loadAllBlogs();
    }, []);

    // Load specific blog if filename is provided
    useEffect(() => {
        const loadBlog = async () => {
            if (!filename) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const blogData = await getBlogByFilename(filename);

                if (!blogData || !blogData.content) {
                    setError('Blog not found');
                    setLoading(false);
                    return;
                }

                // Calculate reading stats
                const words = blogData.content.trim().split(/\s+/).length;
                const readTime = Math.ceil(words / 200); // 200 words per minute

                // Parse tags from content or metadata
                const tags = blogData.metadata.tags || [];

                const blogPost: BlogPost = {
                    slug: filename,
                    title: blogData.metadata.title || filename,
                    content: blogData.content,
                    date: blogData.metadata.date || 'Unknown Date',
                    tags,
                    readTime,
                    wordCount: words,
                    image: blogData.metadata.image
                };

                setBlog(blogPost);
            } catch (err) {
                console.error('Error loading blog:', err);
                setError('Failed to load blog');
            } finally {
                setLoading(false);
            }
        };

        loadBlog();
    }, [filename]);

    const handleBlogChange = (slug: string) => {
        if (slug) {
            navigate(`/blogs/${slug}`);
        } else {
            navigate('/blogs');
        }
    };

    const handleBack = () => {
        navigate('/blogs');
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{
                backgroundColor: 'var(--theme-background)'
            }}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{
                        borderColor: 'var(--theme-primary)'
                    }}></div>
                    <p style={{ color: 'var(--theme-muted)' }}>Loading...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{
                backgroundColor: 'var(--theme-background)'
            }}>
                <div className="text-center">
                    <div className="text-6xl mb-4">😞</div>
                    <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--theme-text)' }}>Oops!</h1>
                    <p className="mb-4" style={{ color: 'var(--theme-muted)' }}>{error}</p>
                    <button
                        onClick={() => navigate('/blogs')}
                        className="px-4 py-2 rounded-lg transition-colors"
                        style={{
                            backgroundColor: 'var(--theme-primary)',
                            color: 'var(--theme-background)'
                        }}
                    >
                        Back to Blogs
                    </button>
                </div>
            </div>
        );
    }

    // Show blog list if no specific blog selected
    if (!filename || !blog) {
        return (
            <>
                <Helmet>
                    <title>Blog | Hrithik Dhakrey</title>
                    <meta name="description" content="Read my latest blog posts about Rust, Linux, development setups, and programming tips." />
                    <meta name="keywords" content="programming, rust, linux, development, tutorials, blog" />
                </Helmet>
                <BlogList />
            </>
        );
    }

    // Show modern blog view
    return (
        <>
            <Helmet>
                <title>{blog.title} | Hrithik Dhakrey</title>
                <meta name="description" content={`Read about ${blog.title}. ${blog.content.substring(0, 150)}...`} />
                <meta name="keywords" content={blog.tags.join(', ')} />
                <meta name="author" content="Hrithik Dhakrey" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://iamdhakrey.dev/blogs/${filename}`} />
                <meta property="og:title" content={blog.title} />
                <meta property="og:description" content={`Read about ${blog.title}. ${blog.content.substring(0, 150)}...`} />
                <meta property="og:image" content="https://iamdhakrey.dev/iamdhakrey.png" />
                <meta property="og:site_name" content="Hrithik Dhakrey - Developer Blog" />
                <meta property="article:author" content="Hrithik Dhakrey" />
                <meta property="article:published_time" content={blog.date} />
                {blog.tags.map((tag, index) => (
                    <meta key={index} property="article:tag" content={tag} />
                ))}

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={`https://iamdhakrey.dev/blogs/${filename}`} />
                <meta name="twitter:title" content={blog.title} />
                <meta name="twitter:description" content={`Read about ${blog.title}. ${blog.content.substring(0, 150)}...`} />
                <meta name="twitter:image" content="https://iamdhakrey.dev/iamdhakrey.png" />
                <meta name="twitter:site" content="@iamdhakrey" />
                <meta name="twitter:creator" content="@iamdhakrey" />

                <link rel="canonical" href={`https://iamdhakrey.dev/blogs/${filename}`} />
            </Helmet>

            <ModernBlogView
                blog={blog}
                allBlogs={allBlogs}
                onBlogChange={handleBlogChange}
                onBack={handleBack}
            />
        </>
    );
}

export default ModernBlogs;
