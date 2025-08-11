// Modern Blog Components
export { BlogHeader } from './BlogHeader';
export { TableOfContents } from './TableOfContents';
export { BlogContent } from './BlogContent';
export { BlogNavigation } from './BlogNavigation';
export { CodeBlock } from './CodeBlock';
export { ModernBlogView } from './ModernBlogView';

// Types
export interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export interface BlogPost {
    slug: string;
    title: string;
    content: string;
    date: string;
    tags: string[];
    readTime: number;
    wordCount: number;
    image?: string;
}
