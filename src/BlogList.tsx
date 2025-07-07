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
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">Blog Posts</h1>
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">Loading blog posts...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog) => (
              <article key={blog.filename} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
                <Link
                  to={`/blog/${blog.filename.replace('.md', '')}`}
                  className="block group"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{blog.date}</p>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;