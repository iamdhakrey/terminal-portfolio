// Blog utilities for discovering and reading blog files
import { Buffer } from 'buffer';
import grayMatter from 'gray-matter';
import { getBlogsConfig } from './configManager';

// Ensure Buffer is available globally for gray-matter
(globalThis as any).Buffer = Buffer;

export interface BlogFile {
    filename: string;
    title: string;
    date: string;
    description?: string;
    author?: string;
}

/**
 * Gets the list of available blog files from configuration
 */
export function getBlogFiles(): string[] {
    const blogsConfig = getBlogsConfig();
    return blogsConfig.enabled ? blogsConfig.availableBlogs : [];
}

/**
 * Checks if blogs are enabled in configuration
 */
export function areBlogsEnabled(): boolean {
    const blogsConfig = getBlogsConfig();
    return blogsConfig.enabled;
}

/**
 * Gets the list of featured blog posts from configuration
 */
export function getFeaturedBlogs(): string[] {
    const blogsConfig = getBlogsConfig();
    return blogsConfig.enabled ? blogsConfig.featuredPosts : [];
}

/**
 * Gets the list of blog categories from configuration
 */
export function getBlogCategories(): string[] {
    const blogsConfig = getBlogsConfig();
    return blogsConfig.enabled ? blogsConfig.categories : [];
}

/**
 * Fetches all available blog files and their metadata
 */
export async function getAllBlogs(): Promise<BlogFile[]> {
    const blogFiles = getBlogFiles();
    
    if (blogFiles.length === 0) {
        return [];
    }

    const blogPromises = blogFiles.map(async (filename) => {
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
 * Fetches featured blog posts based on configuration
 */
export async function getFeaturedBlogPosts(): Promise<BlogFile[]> {
    const featuredSlugs = getFeaturedBlogs();
    const allBlogs = await getAllBlogs();
    
    // Filter blogs to only include featured ones, maintaining the order specified in config
    const featuredBlogs: BlogFile[] = [];
    
    for (const slug of featuredSlugs) {
        const blog = allBlogs.find(b => 
            b.filename === `${slug}.md` || 
            b.filename === slug ||
            b.filename.replace('.md', '') === slug
        );
        if (blog) {
            featuredBlogs.push(blog);
        }
    }
    
    return featuredBlogs;
}

/**
 * Filters blogs by category
 */
export async function getBlogsByCategory(category: string): Promise<BlogFile[]> {
    const allBlogs = await getAllBlogs();
    
    // For now, we'll filter based on the blog metadata categories
    // In a more advanced setup, you could store category mappings in the config
    const filteredBlogs = allBlogs.filter(blog => {
        // This is a simple implementation - you might want to enhance this
        // based on how you structure your blog metadata
        return blog.title.toLowerCase().includes(category.toLowerCase()) ||
               (blog.description && blog.description.toLowerCase().includes(category.toLowerCase()));
    });
    
    return filteredBlogs;
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

/**
 * Generates a link to another blog post
 * @param filename - The filename of the blog post (without .md extension)
 * @param linkText - Optional custom link text, defaults to the blog title
 * @returns Formatted link for use in markdown or JSX
 */
export function createBlogLink(filename: string, linkText?: string): string {
    const cleanFilename = filename.replace('.md', '');
    const blogPath = `/blogs/${cleanFilename}`;
    const displayText = linkText || cleanFilename.replace(/_/g, ' ').replace(/-/g, ' ');
    
    return `[${displayText}](${blogPath})`;
}

/**
 * Gets related blog posts based on categories or keywords
 * @param currentBlog - The current blog filename
 * @param maxResults - Maximum number of related posts to return (default: 3)
 * @returns Array of related blog posts
 */
export async function getRelatedBlogs(currentBlog: string, maxResults: number = 3): Promise<BlogFile[]> {
    const allBlogs = await getAllBlogs();
    const currentBlogData = await getBlogByFilename(currentBlog.replace('.md', ''));
    
    if (!currentBlogData) {
        return [];
    }
    
    // Filter out the current blog
    const otherBlogs = allBlogs.filter(blog => 
        blog.filename !== currentBlog && 
        blog.filename !== `${currentBlog}.md`
    );
    
    // Simple relatedness scoring based on title and description similarities
    const scoredBlogs = otherBlogs.map(blog => {
        let score = 0;
        const currentTitle = currentBlogData.metadata.title.toLowerCase();
        const currentDesc = (currentBlogData.metadata.description || '').toLowerCase();
        const blogTitle = blog.title.toLowerCase();
        const blogDesc = (blog.description || '').toLowerCase();
        
        // Score based on common words in titles
        const currentTitleWords = currentTitle.split(/\s+/);
        const blogTitleWords = blogTitle.split(/\s+/);
        const titleMatches = currentTitleWords.filter((word: string) => 
            word.length > 3 && blogTitleWords.includes(word)
        ).length;
        score += titleMatches * 3;
        
        // Score based on common words in descriptions
        if (currentDesc && blogDesc) {
            const currentDescWords = currentDesc.split(/\s+/);
            const blogDescWords = blogDesc.split(/\s+/);
            const descMatches = currentDescWords.filter((word: string) => 
                word.length > 4 && blogDescWords.includes(word)
            ).length;
            score += descMatches * 2;
        }
        
        return { blog, score };
    });
    
    // Sort by score and return top results
    return scoredBlogs
        .sort((a, b) => b.score - a.score)
        .slice(0, maxResults)
        .map(item => item.blog);
}

/**
 * Gets all available blog links for easy reference
 * @returns Object mapping blog filenames to their display names and paths
 */
export async function getAllBlogLinks(): Promise<Record<string, { title: string; path: string; filename: string }>> {
    const allBlogs = await getAllBlogs();
    const links: Record<string, { title: string; path: string; filename: string }> = {};
    
    allBlogs.forEach(blog => {
        const key = blog.filename.replace('.md', '');
        links[key] = {
            title: blog.title,
            path: `/blogs/${key}`,
            filename: blog.filename
        };
    });
    
    return links;
}

/**
 * Processes blog content to convert blog references to links and handle images
 * @param content - Raw blog content
 * @param currentBlogFilename - Current blog filename for image path resolution
 * @returns Content with blog references converted to proper links and images processed
 */
export async function processBlogLinks(content: string, currentBlogFilename?: string): Promise<string> {
    const blogLinks = await getAllBlogLinks();
    let processedContent = content;
    
    // Replace blog references in format: {{blog:filename}}
    const blogRefPattern = /\{\{blog:([^}]+)\}\}/g;
    processedContent = processedContent.replace(blogRefPattern, (match, filename) => {
        const blogLink = blogLinks[filename];
        if (blogLink) {
            return `[${blogLink.title}](${blogLink.path})`;
        }
        return match; // Keep original if blog not found
    });
    
    // Replace blog references with custom text: {{blog:filename|Custom Text}}
    const blogRefWithTextPattern = /\{\{blog:([^|]+)\|([^}]+)\}\}/g;
    processedContent = processedContent.replace(blogRefWithTextPattern, (match, filename, customText) => {
        const blogLink = blogLinks[filename];
        if (blogLink) {
            return `[${customText}](${blogLink.path})`;
        }
        return match; // Keep original if blog not found
    });
    
    // Process images - convert relative image paths to absolute paths
    if (currentBlogFilename) {
        const blogName = currentBlogFilename.replace('.md', '');
        
        // Handle markdown images with relative paths
        const imagePattern = /!\[([^\]]*)\]\((?!http|https|\/)(.*?)\)/g;
        processedContent = processedContent.replace(imagePattern, (_, alt, src) => {
            // Convert relative image path to absolute path in blog directory
            const imagePath = `/images/${blogName}/${src}`;
            return `![${alt}](${imagePath})`;
        });
        
        // Handle HTML img tags with relative paths
        const htmlImagePattern = /<img([^>]*?)src="(?!http|https|\/)(.*?)"([^>]*?)>/g;
        processedContent = processedContent.replace(htmlImagePattern, (_, beforeSrc, src, afterSrc) => {
            const imagePath = `/images/${blogName}/${src}`;
            return `<img${beforeSrc}src="${imagePath}"${afterSrc}>`;
        });
    }
    
    return processedContent;
}

/**
 * Gets navigation for blog posts (previous/next)
 * @param currentBlog - Current blog filename
 * @returns Object with previous and next blog posts
 */
export async function getBlogNavigation(currentBlog: string): Promise<{
    previous: BlogFile | null;
    next: BlogFile | null;
}> {
    const allBlogs = await getAllBlogs();
    const currentIndex = allBlogs.findIndex(blog => 
        blog.filename === currentBlog || 
        blog.filename === `${currentBlog}.md`
    );
    
    if (currentIndex === -1) {
        return { previous: null, next: null };
    }
    
    return {
        previous: currentIndex > 0 ? allBlogs[currentIndex - 1] : null,
        next: currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null
    };
}

/**
 * Helper function to generate a "See Also" section for blog posts
 * @param currentBlog - Current blog filename
 * @param customLinks - Optional array of specific blog filenames to link to
 * @returns Formatted markdown for "See Also" section
 */
export async function generateSeeAlsoSection(
    currentBlog: string, 
    customLinks?: string[]
): Promise<string> {
    let relatedBlogs: BlogFile[];
    
    if (customLinks && customLinks.length > 0) {
        const allBlogs = await getAllBlogs();
        relatedBlogs = allBlogs.filter(blog => 
            customLinks.some(link => 
                blog.filename === link || 
                blog.filename === `${link}.md` ||
                blog.filename.replace('.md', '') === link
            )
        );
    } else {
        relatedBlogs = await getRelatedBlogs(currentBlog, 3);
    }
    
    if (relatedBlogs.length === 0) {
        return '';
    }
    
    let seeAlsoSection = '\n\n## See Also\n\n';
    relatedBlogs.forEach(blog => {
        const filename = blog.filename.replace('.md', '');
        seeAlsoSection += `- [${blog.title}](/blogs/${filename})\n`;
    });
    
    return seeAlsoSection;
}
