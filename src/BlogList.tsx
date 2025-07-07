import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBlogs, BlogFile } from './utils/blogUtils';

interface BlogListProps { }

const BlogList: React.FC<BlogListProps> = () => {
  const [blogs, setBlogs] = useState<BlogFile[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await getAllBlogs();
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  // using tailwind css
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono pb-16">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Terminal-style header */}
        <div className="mb-8">
          <div className="bg-gray-900 border border-gray-700 rounded-t-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-sm ml-4">~/dev/blogs</span>
            </div>
          </div>
          <div className="bg-black border-x border-b border-gray-700 rounded-b-lg p-6">
            <div className="mb-4">
              <span className="text-blue-400">user@localhost</span>
              <span className="text-white">:</span>
              <span className="text-blue-600">~/blogs</span>
              <span className="text-white">$ </span>
              <span className="text-green-400">ls -la --color=always</span>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-green-400">
              <span className="text-gray-500"># </span>Available Blog Posts
            </h1>
            <p className="text-gray-400 mb-4">
              <span className="text-yellow-400">total {blogs.length}</span> posts found
            </p>
          </div>
        </div>

        {blogs.length === 0 ? (
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 text-center">
            <div className="text-yellow-400 mb-2">⚠ No blog posts found</div>
            <p className="text-gray-400">$ find ./blogs -name "*.md" -type f</p>
            <p className="text-red-400">find: './blogs': No such file or directory</p>
          </div>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog, index) => (
              <div key={blog.filename} className="bg-gray-900 border border-gray-700 rounded-lg hover:border-green-500 transition-all duration-300 group">
                <Link
                  to={`/blog/${blog.filename.replace('.md', '')}`}
                  className="block p-6 hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    {/* File permissions and info */}
                    <div className="text-xs text-gray-500 font-mono mt-1 min-w-fit">
                      <div>-rw-r--r--</div>
                      <div className="text-blue-400">{String(index + 1).padStart(3, '0')}</div>
                    </div>

                    {/* File content */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-green-400">📄</span>
                        <h2 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors">
                          {blog.title}
                        </h2>
                        <span className="text-gray-500 text-sm">.md</span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm">
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
                    <div className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Terminal footer */}
        <div className="mt-8 bg-gray-900 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span className="text-blue-400">user@localhost</span>
            <span>:</span>
            <span className="text-blue-600">~/blogs</span>
            <span>$ </span>
            <span className="text-green-400 animate-pulse">_</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;