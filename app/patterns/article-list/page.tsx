'use client';

import { useState } from 'react';

export default function ArticleListPattern() {
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  const articles = [
    {
      id: 1,
      title: 'Building Scalable React Applications with Modern Architecture',
      summary: 'Learn how to structure large React applications using modern patterns like component composition, custom hooks, and state management solutions.',
      author: 'Sarah Chen',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'React',
      image: 'https://via.placeholder.com/400x200',
      tags: ['React', 'Architecture', 'JavaScript'],
      likes: 245,
      comments: 18
    },
    {
      id: 2,
      title: 'The Future of Web Development: Trends to Watch in 2024',
      summary: 'Explore the emerging technologies and frameworks that are shaping the future of web development, from AI-powered tools to edge computing.',
      author: 'Michael Rodriguez',
      date: '2024-01-12',
      readTime: '12 min read',
      category: 'Trends',
      image: 'https://via.placeholder.com/400x200',
      tags: ['Web Development', 'AI', 'Trends'],
      likes: 189,
      comments: 24
    },
    {
      id: 3,
      title: 'Mastering CSS Grid: Advanced Layout Techniques',
      summary: 'Deep dive into CSS Grid with practical examples and advanced techniques for creating complex, responsive layouts with clean code.',
      author: 'Emily Johnson',
      date: '2024-01-10',
      readTime: '15 min read',
      category: 'CSS',
      image: 'https://via.placeholder.com/400x200',
      tags: ['CSS', 'Grid', 'Layout'],
      likes: 312,
      comments: 31
    },
    {
      id: 4,
      title: 'TypeScript Best Practices for Enterprise Applications',
      summary: 'Comprehensive guide to using TypeScript effectively in large-scale applications, covering type safety, performance, and maintainability.',
      author: 'David Kim',
      date: '2024-01-08',
      readTime: '10 min read',
      category: 'TypeScript',
      image: 'https://via.placeholder.com/400x200',
      tags: ['TypeScript', 'Enterprise', 'Best Practices'],
      likes: 156,
      comments: 12
    },
    {
      id: 5,
      title: 'Building Accessible Web Components with ARIA',
      summary: 'Learn how to create web components that work for everyone by implementing proper ARIA attributes and accessibility best practices.',
      author: 'Lisa Wang',
      date: '2024-01-05',
      readTime: '11 min read',
      category: 'Accessibility',
      image: 'https://via.placeholder.com/400x200',
      tags: ['Accessibility', 'ARIA', 'Web Components'],
      likes: 203,
      comments: 16
    },
    {
      id: 6,
      title: 'Performance Optimization Strategies for Modern Web Apps',
      summary: 'Practical techniques for optimizing web application performance, including code splitting, lazy loading, and efficient state management.',
      author: 'Alex Thompson',
      date: '2024-01-03',
      readTime: '13 min read',
      category: 'Performance',
      image: 'https://via.placeholder.com/400x200',
      tags: ['Performance', 'Optimization', 'Web Apps'],
      likes: 278,
      comments: 22
    }
  ];

  const categories = ['all', 'React', 'CSS', 'TypeScript', 'Trends', 'Accessibility', 'Performance'];

  const getSortedArticles = () => {
    let filtered = selectedCategory === 'all' 
      ? articles 
      : articles.filter(article => article.category === selectedCategory);
    
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'popular':
          return b.likes - a.likes;
        default:
          return 0;
      }
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📰 Article List Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Display articles and blog posts in an organized, scannable list with filtering, sorting, and rich metadata.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Browse through articles with different sorting options and category filters. Each article shows key metadata and engagement metrics.
            </p>
            
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Article List */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {getSortedArticles().map((article) => (
                <article key={article.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-24 h-24 object-cover flex-shrink-0"
                    />
                    <div className="p-4 flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm line-clamp-2 pr-2">
                          {article.title}
                        </h3>
                        <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full flex-shrink-0">
                          {article.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {article.summary}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium">{article.author}</span>
                          <span>{formatDate(article.date)}</span>
                          <span>{article.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center space-x-1">
                            <span>❤️</span>
                            <span>{article.likes}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span>💬</span>
                            <span>{article.comments}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              💻 Code Example
            </h2>
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
              <button
                onClick={() => setActiveTab('jsx')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'jsx'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                JSX
              </button>
              <button
                onClick={() => setActiveTab('css')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'css'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                CSS
              </button>
            </div>

            {/* Tab Content */}
            <div className="code-block">
              {activeTab === 'jsx' ? (
                <pre className="text-sm leading-relaxed">
{`import { useState } from 'react';

export default function ArticleListPattern() {
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const articles = [
    {
      id: 1,
      title: 'Building Scalable React Applications with Modern Architecture',
      summary: 'Learn how to structure large React applications using modern patterns.',
      author: 'Sarah Chen',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'React',
      image: 'https://via.placeholder.com/400x200',
      tags: ['React', 'Architecture', 'JavaScript'],
      likes: 245,
      comments: 18
    },
    {
      id: 2,
      title: 'The Future of Web Development: Trends to Watch in 2024',
      summary: 'Explore the emerging technologies and frameworks.',
      author: 'Michael Rodriguez',
      date: '2024-01-12',
      readTime: '12 min read',
      category: 'Trends',
      image: 'https://via.placeholder.com/400x200',
      tags: ['Web Development', 'AI', 'Trends'],
      likes: 189,
      comments: 24
    }
    // ... more articles
  ];

  const categories = ['all', 'React', 'CSS', 'TypeScript', 'Trends'];

  const getSortedArticles = () => {
    let filtered = selectedCategory === 'all' 
      ? articles 
      : articles.filter(article => article.category === selectedCategory);
    
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'popular':
          return b.likes - a.likes;
        default:
          return 0;
      }
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="article-list-container">
      {/* Controls */}
      <div className="article-controls">
        <div className="control-group">
          <label className="control-label">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="control-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
        <div className="control-group">
          <label className="control-label">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="control-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Article List */}
      <div className="articles-container">
        {getSortedArticles().map((article) => (
          <article key={article.id} className="article-item">
            <div className="article-content">
              <img
                src={article.image}
                alt={article.title}
                className="article-image"
              />
              <div className="article-body">
                <div className="article-header">
                  <h3 className="article-title">{article.title}</h3>
                  <span className="article-category">{article.category}</span>
                </div>
                <p className="article-summary">{article.summary}</p>
                <div className="article-footer">
                  <div className="article-meta">
                    <span className="article-author">{article.author}</span>
                    <span className="article-date">{formatDate(article.date)}</span>
                    <span className="article-read-time">{article.readTime}</span>
                  </div>
                  <div className="article-engagement">
                    <span className="engagement-item">
                      <span className="engagement-icon">❤️</span>
                      <span className="engagement-count">{article.likes}</span>
                    </span>
                    <span className="engagement-item">
                      <span className="engagement-icon">💬</span>
                      <span className="engagement-count">{article.comments}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Article List Container */
.article-list-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

/* Article Controls */
.article-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.control-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.control-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.control-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Articles Container */
.articles-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 32rem;
  overflow-y: auto;
}

/* Article Item */
.article-item {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.2s ease;
}

.article-item:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.article-content {
  display: flex;
}

/* Article Image */
.article-image {
  width: 6rem;
  height: 6rem;
  object-fit: cover;
  flex-shrink: 0;
}

/* Article Body */
.article-body {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Article Header */
.article-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.article-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-right: 0.5rem;
}

.article-category {
  font-size: 0.75rem;
  color: #3b82f6;
  background: #eff6ff;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  white-space: nowrap;
  flex-shrink: 0;
}

/* Article Summary */
.article-summary {
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.33;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Article Footer */
.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: #6b7280;
}

.article-author {
  font-weight: 500;
}

.article-date,
.article-read-time {
  font-weight: normal;
}

/* Article Engagement */
.article-engagement {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.engagement-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #6b7280;
}

.engagement-icon {
  font-size: 0.875rem;
}

.engagement-count {
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 640px) {
  .article-list-container {
    padding: 1rem;
  }
  
  .article-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .control-group {
    justify-content: space-between;
  }
  
  .article-content {
    flex-direction: column;
  }
  
  .article-image {
    width: 100%;
    height: 8rem;
  }
  
  .article-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .article-title {
    padding-right: 0;
  }
  
  .article-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .article-meta {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .article-engagement {
    gap: 1rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .control-label {
    color: #d1d5db;
  }
  
  .control-select {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
  
  .article-item {
    background: #1f2937;
    border-color: #374151;
  }
  
  .article-title {
    color: #f9fafb;
  }
  
  .article-summary,
  .article-meta,
  .engagement-item {
    color: #9ca3af;
  }
  
  .article-category {
    background: #1e3a8a;
    color: #93c5fd;
  }
}

/* Animation */
.article-item {
  animation: fadeInUp 0.3s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Focus Management */
.control-select:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Accessibility */
.article-item:focus-within {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Loading State */
.article-item.loading {
  position: relative;
  overflow: hidden;
}

.article-item.loading::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { left: -100%; }
  100% { left: 100%; }
}

/* Print Styles */
@media print {
  .article-controls {
    display: none;
  }
  
  .articles-container {
    max-height: none;
    overflow: visible;
  }
  
  .article-item {
    break-inside: avoid;
    border: 1px solid #000;
    margin-bottom: 1rem;
  }
  
  .article-item:hover {
    transform: none;
    box-shadow: none;
  }
}`}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold mb-4 text-green-800 dark:text-green-200">
          ✨ Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Rich Metadata</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Author, date, read time, and engagement metrics</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Sorting & Filtering</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sort by date or popularity, filter by category</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Hierarchy</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear title, summary, and metadata organization</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Responsive Layout</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Adapts from desktop to mobile seamlessly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-semibold mb-4 text-purple-800 dark:text-purple-200">
          🎯 Common Use Cases
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📝</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Blog Platforms</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">List blog posts with rich metadata and filtering</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📚</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Documentation</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Organize technical articles and guides</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📰</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">News Sites</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Display news articles with timestamps and categories</p>
          </div>
        </div>
      </div>
    </div>
  );
}