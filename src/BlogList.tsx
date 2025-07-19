import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBlogs, getFeaturedBlogPosts, areBlogsEnabled, BlogFile } from './utils/blogUtils';

interface BlogListProps { }

const BlogList: React.FC<BlogListProps> = () => {
  const [blogs, setBlogs] = useState<BlogFile[]>([]);
  const [featuredBlogs, setFeaturedBlogs] = useState<BlogFile[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Check if blogs are enabled in configuration
        if (!areBlogsEnabled()) {
          console.log('Blogs are disabled in configuration');
          return;
        }

        const [fetchedBlogs, fetchedFeatured] = await Promise.all([
          getAllBlogs(),
          getFeaturedBlogPosts()
        ]);
        
        setBlogs(fetchedBlogs);
        setFeaturedBlogs(fetchedFeatured);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  // using tailwind css
  return (
    <div className="min-h-screen font-mono pb-16"
         style={{ 
           backgroundColor: 'var(--theme-background)', 
           color: 'var(--theme-text)' 
         }}>
      {!areBlogsEnabled() ? (
        <div className="max-w-6xl mx-auto py-4 sm:py-8 px-2 sm:px-4">
          <div className="border rounded-lg p-6 sm:p-8 text-center"
               style={{ 
                 backgroundColor: 'var(--theme-background)', 
                 borderColor: 'var(--theme-border)' 
               }}>
            <div className="mb-2" style={{ color: 'var(--theme-warning)' }}>⚠ Blog feature is disabled</div>
            <p className="text-sm sm:text-base" style={{ color: 'var(--theme-muted)' }}>
              Blogs are currently disabled in the configuration. 
              To enable them, set <code style={{ color: 'var(--theme-primary)' }}>blogs.enabled: true</code> in <code style={{ color: 'var(--theme-info)' }}>profile.config.ts</code>
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto py-4 sm:py-8 px-2 sm:px-4">
        {/* Terminal-style header */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gray-900 border border-gray-700 rounded-t-lg p-3 sm:p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-xs sm:text-sm ml-4">~/dev/blogs</span>
            </div>
          </div>
          <div className="bg-black border-x border-b border-gray-700 rounded-b-lg p-4 sm:p-6">
            <div className="mb-4">
              <span className="text-blue-400 hidden sm:inline">user@localhost</span>
              <span className="text-white hidden sm:inline">:</span>
              <span className="text-blue-600 hidden sm:inline">~/blogs</span>
              <span className="text-white">$ </span>
              <span className="text-green-400">ls -la --color=always</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold mb-4 text-green-400">
              <span className="text-gray-500"># </span>Available Blog Posts
            </h1>
            <p className="text-gray-400 mb-4 text-sm sm:text-base">
              <span className="text-yellow-400">total {blogs.length}</span> posts found
            </p>
          </div>
        </div>

        {/* Featured Blogs Section */}
        {featuredBlogs.length > 0 && (
          <div className="mb-8">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-4 text-yellow-400">
                <span className="text-gray-500">⭐ </span>Featured Posts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredBlogs.map((blog) => (
                  <Link
                    key={blog.filename}
                    to={`/blog/${blog.filename.replace('.md', '')}`}
                    className="bg-gray-800 border border-gray-600 rounded-lg p-4 hover:border-yellow-500 hover:bg-gray-700 transition-all duration-300"
                  >
                    <h3 className="text-white font-semibold mb-2 line-clamp-2">{blog.title}</h3>
                    <p className="text-gray-400 text-sm mb-2 line-clamp-3">{blog.description || 'Click to read more...'}</p>
                    <div className="text-xs text-yellow-400">{blog.date}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {blogs.length === 0 ? (
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 sm:p-8 text-center">
            <div className="text-yellow-400 mb-2">⚠ No blog posts found</div>
            <p className="text-gray-400 text-sm sm:text-base">$ find ./blogs -name "*.md" -type f</p>
            <p className="text-red-400 text-sm sm:text-base">find: './blogs': No such file or directory</p>
          </div>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog, index) => (
              <div key={blog.filename} className="bg-gray-900 border border-gray-700 rounded-lg hover:border-green-500 transition-all duration-300 group">
                <Link
                  to={`/blog/${blog.filename.replace('.md', '')}`}
                  className="block p-4 sm:p-6 hover:bg-gray-800 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                    {/* File permissions and info */}
                    <div className="text-xs text-gray-500 font-mono mt-1 min-w-fit flex sm:flex-col space-x-4 sm:space-x-0">
                      <div>-rw-r--r--</div>
                      <div className="text-blue-400">{String(index + 1).padStart(3, '0')}</div>
                    </div>

                    {/* File content */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-green-400">📄</span>
                          <h2 className="text-lg sm:text-xl font-semibold text-white group-hover:text-green-400 transition-colors">
                            {blog.title}
                          </h2>
                        </div>
                        <span className="text-gray-500 text-sm">.md</span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm">
                        <span className="text-blue-400">
                          📅 {blog.date}
                        </span>
                        {blog.author && (
                          <span className="text-yellow-400">
                            👤 {blog.author}
                          </span>
                        )}
                        <span className="text-gray-500">
                          size: {Math.floor(Math.random() * 50 + 10)}K
                        </span>
                      </div>

                      {blog.description && (
                        <p className="text-gray-400 mt-2 text-sm">
                          <span className="text-gray-600"># </span>
                          {blog.description}
                        </p>
                      )}

                      {/* Command preview */}
                      <div className="mt-3 text-xs text-gray-600">
                        <span className="text-blue-400">$ </span>
                        <span>cat {blog.filename}</span>
                        <span className="text-green-400 ml-2">→ click to read</span>
                      </div>
                    </div>

                    {/* Terminal arrow */}
                    <div className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity self-end sm:self-start">
                      →
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Terminal footer */}
        <div className="mt-6 sm:mt-8 bg-gray-900 border border-gray-700 rounded-lg p-3 sm:p-4">
          <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-400">
            <span className="text-blue-400 hidden sm:inline">user@localhost</span>
            <span className="hidden sm:inline">:</span>
            <span className="text-blue-600 hidden sm:inline">~/blogs</span>
            <span>$ </span>
            <span className="text-green-400 animate-pulse">_</span>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;