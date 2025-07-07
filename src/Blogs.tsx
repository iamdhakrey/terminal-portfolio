import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams, Link } from 'react-router-dom';
import { getBlogByFilename } from './utils/blogUtils';
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

                setContent(blogData.content);
                setTitle(blogData.metadata.title);
                setDate(blogData.metadata.date);

                // Extract headings for table of contents
                const extractedHeadings = extractHeadings(blogData.content);
                setHeadings(extractedHeadings);
            } catch (error) {
                console.error('Error fetching blog:', error);
                setTitle('Error Loading Blog');
                setContent('There was an error loading this blog post.');
            }
        }

        fetchBlog();
    }, [filename]);

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="mb-6">
                <Link
                    to="/blogs"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    ← Back to Blogs
                </Link>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
                <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">{date}</p>

                {/* Table of Contents */}
                {headings.length > 0 && (
                    <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Table of Contents</h2>
                        <ul className="space-y-1">
                            {headings.map((heading, index) => (
                                <li key={index} style={{ marginLeft: `${(heading.level - 1) * 16}px` }}>
                                    <a
                                        href={`#${heading.id}`}
                                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                                    >
                                        {heading.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-pink-600 prose-pre:bg-gray-900 prose-pre:text-gray-100">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight, rehypeRaw]}
                        components={{
                            code: ({ className, children, ...props }: any) => {
                                const match = /language-(\w+)/.exec(className || '');
                                const isInline = !match;
                                return isInline ? (
                                    <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono text-pink-600" {...props}>
                                        {children}
                                    </code>
                                ) : (
                                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 border border-gray-700">
                                        <code className={`${className} text-sm leading-relaxed`} {...props}>
                                            {children}
                                        </code>
                                    </pre>
                                );
                            },
                            pre: ({ children }: any) => {
                                return <div className="my-4">{children}</div>;
                            },
                            h1: ({ children, ...props }: any) => {
                                const text = children?.toString() || '';
                                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                return <h1 id={id} {...props}>{children}</h1>;
                            },
                            h2: ({ children, ...props }: any) => {
                                const text = children?.toString() || '';
                                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                return <h2 id={id} {...props}>{children}</h2>;
                            },
                            h3: ({ children, ...props }: any) => {
                                const text = children?.toString() || '';
                                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                return <h3 id={id} {...props}>{children}</h3>;
                            },
                            h4: ({ children, ...props }: any) => {
                                const text = children?.toString() || '';
                                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                return <h4 id={id} {...props}>{children}</h4>;
                            },
                            h5: ({ children, ...props }: any) => {
                                const text = children?.toString() || '';
                                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                return <h5 id={id} {...props}>{children}</h5>;
                            },
                            h6: ({ children, ...props }: any) => {
                                const text = children?.toString() || '';
                                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                return <h6 id={id} {...props}>{children}</h6>;
                            },
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
export default Blogs;