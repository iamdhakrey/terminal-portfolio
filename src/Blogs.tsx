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
        <div className="min-h-screen bg-black text-green-400 font-mono pb-16">
            <div className="max-w-6xl mx-auto py-8 px-4">
                {/* Terminal navigation */}
                <div className="mb-6">
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-blue-400">user@localhost</span>
                            <span className="text-white">:</span>
                            <span className="text-blue-600">~/blogs</span>
                            <span className="text-white">$ </span>
                            <Link
                                to="/blogs"
                                className="text-green-400 hover:text-green-300 underline"
                            >
                                cd ..
                            </Link>
                            <span className="text-gray-500 ml-4"># Back to blog list</span>
                        </div>
                    </div>
                </div>

                {/* Terminal window */}
                <div className="bg-gray-900 border border-gray-700 rounded-t-lg">
                    <div className="flex items-center justify-between p-4 border-b border-gray-700">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-gray-400 text-sm ml-4">~/blogs/{filename}.md</span>
                        </div>
                        <div className="text-gray-500 text-xs">
                            vim {filename}.md
                        </div>
                    </div>
                </div>

                <div className="bg-black border-x border-b border-gray-700 rounded-b-lg p-8">
                    {/* File header */}
                    <div className="mb-6 border-b border-gray-800 pb-4">
                        <div className="text-gray-500 text-sm mb-2">
                            <span className="text-blue-400">$ </span>
                            <span>cat {filename}.md</span>
                        </div>
                        <h1 className="text-3xl font-bold mb-4 text-green-400">
                            <span className="text-gray-600"># </span>{title}
                        </h1>
                        <div className="flex items-center space-x-4 text-sm">
                            <span className="text-blue-400">📅 {date}</span>
                            <span className="text-yellow-400">📝 Markdown</span>
                            <span className="text-gray-500">UTF-8</span>
                        </div>
                    </div>

                    {/* Table of Contents */}
                    {headings.length > 0 && (
                        <div className="mb-8 p-4 bg-gray-900 border border-gray-700 rounded-lg">
                            <h2 className="text-lg font-semibold mb-3 text-green-400">
                                <span className="text-gray-600">## </span>Table of Contents
                            </h2>
                            <ul className="space-y-1">
                                {headings.map((heading, index) => (
                                    <li key={index} style={{ marginLeft: `${(heading.level - 1) * 16}px` }}>
                                        <a
                                            href={`#${heading.id}`}
                                            className="text-blue-400 hover:text-blue-300 text-sm hover:underline"
                                        >
                                            <span className="text-gray-600">
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
                    <div className="prose prose-lg max-w-none prose-invert prose-headings:text-green-400 prose-p:text-gray-300 prose-strong:text-white prose-code:text-pink-400 prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-a:text-blue-400">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight, rehypeRaw]}
                            components={{
                                code: ({ className, children, ...props }: any) => {
                                    const match = /language-(\w+)/.exec(className || '');
                                    const isInline = !match;
                                    return isInline ? (
                                        <code className="bg-gray-800 text-pink-400 px-1 py-0.5 rounded text-sm font-mono border border-gray-700" {...props}>
                                            {children}
                                        </code>
                                    ) : (
                                        <div className="my-6">
                                            <div className="bg-gray-800 border border-gray-600 rounded-t-lg p-2 flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                </div>
                                                <span className="text-gray-400 text-xs">{match ? match[1] : 'code'}</span>
                                            </div>
                                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto border-x border-b border-gray-600 m-0">
                                                <code className={`${className} text-sm leading-relaxed`} {...props}>
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
                                        <h1 id={id} className="text-2xl font-bold text-green-400 mt-8 mb-4 border-b border-gray-700 pb-2" {...props}>
                                            <span className="text-gray-600"># </span>{children}
                                        </h1>
                                    );
                                },
                                h2: ({ children, ...props }: any) => {
                                    const text = children?.toString() || '';
                                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                    return (
                                        <h2 id={id} className="text-xl font-semibold text-green-400 mt-6 mb-3" {...props}>
                                            <span className="text-gray-600">## </span>{children}
                                        </h2>
                                    );
                                },
                                h3: ({ children, ...props }: any) => {
                                    const text = children?.toString() || '';
                                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                    return (
                                        <h3 id={id} className="text-lg font-semibold text-green-400 mt-4 mb-2" {...props}>
                                            <span className="text-gray-600">### </span>{children}
                                        </h3>
                                    );
                                },
                                h4: ({ children, ...props }: any) => {
                                    const text = children?.toString() || '';
                                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                    return (
                                        <h4 id={id} className="text-base font-semibold text-green-400 mt-3 mb-2" {...props}>
                                            <span className="text-gray-600">#### </span>{children}
                                        </h4>
                                    );
                                },
                                h5: ({ children, ...props }: any) => {
                                    const text = children?.toString() || '';
                                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                    return (
                                        <h5 id={id} className="text-sm font-semibold text-green-400 mt-3 mb-2" {...props}>
                                            <span className="text-gray-600">##### </span>{children}
                                        </h5>
                                    );
                                },
                                h6: ({ children, ...props }: any) => {
                                    const text = children?.toString() || '';
                                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                    return (
                                        <h6 id={id} className="text-xs font-semibold text-green-400 mt-3 mb-2" {...props}>
                                            <span className="text-gray-600">###### </span>{children}
                                        </h6>
                                    );
                                },
                                p: ({ children, ...props }: any) => {
                                    return (
                                        <p className="text-gray-300 mb-4 leading-relaxed" {...props}>
                                            {children}
                                        </p>
                                    );
                                },
                                ul: ({ children, ...props }: any) => {
                                    return (
                                        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1 ml-4" {...props}>
                                            {children}
                                        </ul>
                                    );
                                },
                                ol: ({ children, ...props }: any) => {
                                    return (
                                        <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-1 ml-4" {...props}>
                                            {children}
                                        </ol>
                                    );
                                },
                                li: ({ children, ...props }: any) => {
                                    return (
                                        <li className="text-gray-300" {...props}>
                                            {children}
                                        </li>
                                    );
                                },
                                blockquote: ({ children, ...props }: any) => {
                                    return (
                                        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4 bg-gray-900 py-2" {...props}>
                                            {children}
                                        </blockquote>
                                    );
                                },
                                img: ({ src, alt, ...props }: any) => {
                                    return (
                                        <div className="my-6 p-4 bg-gray-900 border border-gray-700 rounded-lg">
                                            <div className="mb-2 text-sm text-gray-500">
                                                <span className="text-blue-400">$ </span>
                                                <span>display {alt || 'image'}</span>
                                            </div>
                                            <img
                                                src={src}
                                                alt={alt}
                                                className="max-w-full h-auto rounded border border-gray-600"
                                                {...props}
                                            />
                                            {alt && (
                                                <div className="mt-2 text-xs text-gray-400 text-center">
                                                    {alt}
                                                </div>
                                            )}
                                        </div>
                                    );
                                },
                                a: ({ href, children, ...props }: any) => {
                                    return (
                                        <a
                                            href={href}
                                            className="text-blue-400 hover:text-blue-300 underline"
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

                    {/* Terminal footer */}
                    <div className="mt-8 pt-4 border-t border-gray-800">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="text-blue-400">user@localhost</span>
                            <span>:</span>
                            <span className="text-blue-600">~/blogs/{filename}.md</span>
                            <span>$ </span>
                            <span className="text-green-400">cat --end-of-file</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Blogs;