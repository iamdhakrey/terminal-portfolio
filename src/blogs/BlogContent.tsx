import React from 'react';
import { CodeBlock } from './CodeBlock';

interface BlogContentProps {
    content: string;
    onHeadingClick?: (id: string) => void;
}

export const BlogContent: React.FC<BlogContentProps> = ({ content, onHeadingClick }) => {
    // Parse markdown content into sections
    const parseContent = (markdown: string) => {
        const sections: Array<{
            type: 'text' | 'code' | 'heading' | 'image' | 'list';
            content: string;
            language?: string;
            level?: number;
            id?: string;
        }> = [];

        const lines = markdown.split('\n');
        let currentSection = '';
        let inCodeBlock = false;
        let codeLanguage = '';

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Code block detection
            if (line.startsWith('```')) {
                if (inCodeBlock) {
                    // End of code block
                    sections.push({
                        type: 'code',
                        content: currentSection.trim(),
                        language: codeLanguage
                    });
                    currentSection = '';
                    inCodeBlock = false;
                    codeLanguage = '';
                } else {
                    // Start of code block
                    if (currentSection.trim()) {
                        sections.push({
                            type: 'text',
                            content: currentSection.trim()
                        });
                        currentSection = '';
                    }
                    inCodeBlock = true;
                    codeLanguage = line.slice(3).trim();
                }
                continue;
            }

            if (inCodeBlock) {
                currentSection += line + '\n';
                continue;
            }

            // Heading detection
            if (line.startsWith('#')) {
                if (currentSection.trim()) {
                    sections.push({
                        type: 'text',
                        content: currentSection.trim()
                    });
                    currentSection = '';
                }

                const level = line.match(/^#+/)?.[0].length || 1;
                const text = line.replace(/^#+\s*/, '');
                const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

                sections.push({
                    type: 'heading',
                    content: text,
                    level,
                    id
                });
                continue;
            }

            // Regular content
            currentSection += line + '\n';
        }

        // Add remaining content
        if (currentSection.trim()) {
            sections.push({
                type: 'text',
                content: currentSection.trim()
            });
        }

        return sections;
    };

    const renderSection = (section: any, index: number) => {
        switch (section.type) {
            case 'heading':
                const HeadingTag = `h${Math.min(section.level + 1, 6)}` as keyof JSX.IntrinsicElements;
                const headingClasses = {
                    1: 'text-3xl font-bold mt-8 mb-4',
                    2: 'text-2xl font-semibold mt-6 mb-3',
                    3: 'text-xl font-semibold mt-5 mb-3',
                    4: 'text-lg font-medium mt-4 mb-2',
                    5: 'text-base font-medium mt-4 mb-2',
                    6: 'text-sm font-medium mt-3 mb-2'
                };

                return (
                    <HeadingTag
                        key={index}
                        id={section.id}
                        className={headingClasses[Math.min(section.level, 6) as keyof typeof headingClasses]}
                        style={{ color: `var(--theme-h${section.level})` }}
                        onClick={() => onHeadingClick?.(section.id)}
                    >
                        {section.content}
                    </HeadingTag>
                );

            case 'code':
                return (
                    <CodeBlock
                        key={index}
                        code={section.content}
                        language={section.language || 'text'}
                    />
                );

            case 'text':
            default:
                return (
                    <div
                        key={index}
                        className="mb-4 leading-relaxed"
                        style={{
                            color: 'var(--theme-text)',
                            lineHeight: '1.7'
                        }}
                        dangerouslySetInnerHTML={{
                            __html: formatText(section.content)
                        }}
                    />
                );
        }
    };

    const formatText = (text: string) => {
        return text
            // Bold text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Italic text
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Inline code with theme colors
            .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 text-sm rounded" style="background-color: var(--theme-welcomeBoxBg); color: var(--theme-accent);">$1</code>')
            // Images - PROCESS BEFORE LINKS to avoid conflict
            .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
                // Use the src as-is since images in markdown already have correct paths
                let imageSrc = src;

                // Only add prefix if it's a relative path (doesn't start with / or http)
                if (!src.startsWith('http') && !src.startsWith('/')) {
                    // For relative paths, assume they're in /images/blogs/
                    imageSrc = `/images/blogs/${src}`;
                }
                return `<img src="${imageSrc}" alt="${alt}" class="max-w-full h-auto rounded-lg shadow-md my-4" loading="lazy" />`;
            })
            // Links with theme colors - PROCESS AFTER IMAGES
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="hover:underline" style="color: var(--theme-primary);" target="_blank" rel="noopener noreferrer">$1</a>')
            // Line breaks
            .replace(/\n\n/g, '</p><p class="mb-4" style="color: var(--theme-text);">')
            // Wrap in paragraph
            .replace(/^/, '<p class="mb-4" style="color: var(--theme-text);">')
            .replace(/$/, '</p>')
            // Lists
            .replace(/^\s*[-*+]\s+(.+)$/gm, '<li class="ml-4 mb-1">$1</li>');
    };

    const sections = parseContent(content);

    return (
        <article className="max-w-none leading-relaxed" style={{
            color: 'var(--theme-text)',
            lineHeight: '1.7'
        }}>
            <div className="space-y-4" style={{ color: 'var(--theme-text)' }}>
                {sections.map(renderSection)}
            </div>
        </article>
    );
};
