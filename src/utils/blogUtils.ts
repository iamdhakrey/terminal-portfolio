// Blog utilities for discovering and reading blog files
import { Buffer } from 'buffer';
import grayMatter from 'gray-matter';

// Ensure Buffer is available globally for gray-matter
(globalThis as any).Buffer = Buffer;

export interface BlogFile {
    filename: string;
    title: string;
    date: string;
    description?: string;
    author?: string;
}

// In a real application, you would have an API endpoint that returns the list of blog files
// For this demo, we'll maintain a manual list that can be easily extended
export const BLOG_FILES = [
    'linux_commands.md',
    'react-typescript-guide.md',
    // Add more blog files here as you create them
    // Example: 'web-development-tips.md', 'javascript-fundamentals.md', etc.
];

/**
 * Fetches all available blog files and their metadata
 */
export async function getAllBlogs(): Promise<BlogFile[]> {
    const blogPromises = BLOG_FILES.map(async (filename) => {
        try {
            const response = await fetch(`/blogs/${filename}`);
            if (!response.ok) {
                console.warn(`Failed to fetch ${filename}: ${response.status}`);
                return null;
            }

            const content = await response.text();
            const { data } = grayMatter(content);

            return {
                filename,
                title: data.title || filename.replace('.md', '').replace(/_/g, ' '),
                date: data.date || new Date().toISOString().split('T')[0],
                description: data.description,
                author: data.author,
            };
        } catch (error) {
            console.error(`Error fetching blog ${filename}:`, error);
            return null;
        }
    });

    const blogs = (await Promise.all(blogPromises)).filter(blog => blog !== null) as BlogFile[];

    // Sort by date in descending order (latest first)
    return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Fetches a single blog post by filename
 */
export async function getBlogByFilename(filename: string): Promise<{ content: string; metadata: any } | null> {
    try {
        const response = await fetch(`/blogs/${filename}.md`);
        if (!response.ok) {
            throw new Error(`Blog not found: ${filename}`);
        }

        const fileContent = await response.text();
        const { content, data } = grayMatter(fileContent);

        return {
            content,
            metadata: {
                title: data.title || filename.replace(/_/g, ' '),
                date: data.date || 'Unknown Date',
                description: data.description,
                author: data.author,
            }
        };
    } catch (error) {
        console.error(`Error fetching blog ${filename}:`, error);
        return null;
    }
}
