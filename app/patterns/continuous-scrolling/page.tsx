'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
}

export default function ContinuousScrollingPattern() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  // Generate mock data with unique IDs
  const generatePosts = (pageNum: number): Post[] => {
    const postsPerPage = 10;
    const timestamp = Date.now();
    
    return Array.from({ length: postsPerPage }, (_, index) => {
      // Create truly unique ID by combining page, index, and timestamp
      const postId = pageNum * 1000 + index + 1;
      return {
        id: postId,
        title: `Post ${postId}: ${getRandomTitle()}`,
        content: getRandomContent(),
        author: getRandomAuthor(),
        date: getRandomDate(),
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 100)
      };
    });
  };

  const getRandomTitle = () => {
    const titles = [
      'The Future of Web Development',
      'React Best Practices',
      'CSS Grid Layout Guide',
      'JavaScript Performance Tips',
      'UI/UX Design Principles',
      'Mobile-First Design',
      'Accessibility in Modern Web Apps',
      'State Management Patterns',
      'Testing Strategies for React',
      'Deployment Best Practices'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getRandomContent = () => {
    const contents = [
      'This is an interesting article about modern web development practices and how they can improve your workflow.',
      'Learn about the latest trends in frontend development and how to implement them in your projects.',
      'Discover the best practices for building scalable and maintainable web applications.',
      'Explore advanced techniques for optimizing performance and user experience.',
      'Understand the importance of accessibility and how to make your applications inclusive for all users.'
    ];
    return contents[Math.floor(Math.random() * contents.length)];
  };

  const getRandomAuthor = () => {
    const authors = [
      'Sarah Johnson',
      'Mike Chen',
      'Emily Rodriguez',
      'David Kim',
      'Lisa Thompson',
      'Alex Morgan',
      'Rachel Green',
      'Tom Wilson'
    ];
    return authors[Math.floor(Math.random() * authors.length)];
  };

  const getRandomDate = () => {
    const dates = [
      '2 hours ago',
      '1 day ago',
      '3 days ago',
      '1 week ago',
      '2 weeks ago',
      '1 month ago'
    ];
    return dates[Math.floor(Math.random() * dates.length)];
  };

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPosts = generatePosts(page);
    
    if (page >= 5) { // Limit to 5 pages for demo
      setHasMore(false);
    }
    
    setPosts(prev => [...prev, ...newPosts]);
    setPage(prev => prev + 1);
    setLoading(false);
  }, [loading, hasMore, page]);

  // Intersection Observer for infinite scroll
  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePosts();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMorePosts]);

  useEffect(() => {
    loadMorePosts();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📜 Continuous Scrolling Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Load content continuously as users scroll, providing a seamless browsing experience without pagination.
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
              Scroll down to see new posts load automatically. This pattern is perfect for social media feeds, news sites, and content-heavy applications.
            </p>
            
            <div className="max-h-96 overflow-y-auto space-y-4 scroll-smooth">
              {posts.map((post, index) => (
                <div
                  key={post.id}
                  ref={index === posts.length - 1 ? lastElementRef : null}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                      {post.title}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {post.date}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      By {post.author}
                    </span>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        ❤️ {formatNumber(post.likes)}
                      </span>
                      <span className="flex items-center">
                        💬 {formatNumber(post.comments)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {loading && (
                <div ref={loadingRef} className="flex justify-center py-4">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Loading more posts...</span>
                  </div>
                </div>
              )}
              
              {!hasMore && (
                <div className="text-center py-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    You've reached the end! 🎉
                  </span>
                </div>
              )}
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
{`import { useState, useEffect, useRef, useCallback } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
}

export default function ContinuousScrollingPattern() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  // Generate mock data with unique IDs
  const generatePosts = (pageNum: number): Post[] => {
    const postsPerPage = 10;
    
    return Array.from({ length: postsPerPage }, (_, index) => {
      // Create truly unique ID by combining page and index
      const postId = pageNum * 1000 + index + 1;
      return {
        id: postId,
        title: \`Post \${postId}: \${getRandomTitle()}\`,
        content: getRandomContent(),
        author: getRandomAuthor(),
        date: getRandomDate(),
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 100)
      };
    });
  };

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPosts = generatePosts(page);
    
    if (page >= 5) { // Limit to 5 pages for demo
      setHasMore(false);
    }
    
    setPosts(prev => [...prev, ...newPosts]);
    setPage(prev => prev + 1);
    setLoading(false);
  }, [loading, hasMore, page]);

  // Intersection Observer for infinite scroll
  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePosts();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMorePosts]);

  useEffect(() => {
    loadMorePosts();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="continuous-scroll-container">
      <div className="posts-container">
        {posts.map((post, index) => (
          <div
            key={post.id}
            ref={index === posts.length - 1 ? lastElementRef : null}
            className="post-card"
          >
            <div className="post-header">
              <h3 className="post-title">{post.title}</h3>
              <span className="post-date">{post.date}</span>
            </div>
            
            <p className="post-content">{post.content}</p>
            
            <div className="post-footer">
              <span className="post-author">By {post.author}</span>
              <div className="post-stats">
                <span className="post-likes">❤️ {formatNumber(post.likes)}</span>
                <span className="post-comments">💬 {formatNumber(post.comments)}</span>
              </div>
            </div>
          </div>
        ))}
        
        {loading && (
          <div ref={loadingRef} className="loading-indicator">
            <div className="loading-spinner"></div>
            <span className="loading-text">Loading more posts...</span>
          </div>
        )}
        
        {!hasMore && (
          <div className="end-message">
            <span>You've reached the end! 🎉</span>
          </div>
        )}
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Continuous Scrolling Container */
.continuous-scroll-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

/* Posts Container */
.posts-container {
  max-height: 600px;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding-right: 0.5rem;
}

.posts-container::-webkit-scrollbar {
  width: 6px;
}

.posts-container::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.posts-container::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.posts-container::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Post Card */
.post-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
}

.post-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.post-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  line-height: 1.25;
  flex: 1;
  margin-right: 0.5rem;
}

.post-date {
  font-size: 0.75rem;
  color: #6b7280;
  white-space: nowrap;
}

.post-content {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-author {
  font-size: 0.75rem;
  color: #6b7280;
}

.post-stats {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.post-likes,
.post-comments {
  font-size: 0.75rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* Loading Indicator */
.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
}

.loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 0.875rem;
  color: #6b7280;
}

/* End Message */
.end-message {
  text-align: center;
  padding: 1rem;
}

.end-message span {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Responsive Design */
@media (max-width: 768px) {
  .continuous-scroll-container {
    padding: 0.5rem;
  }
  
  .posts-container {
    max-height: 500px;
  }
  
  .post-card {
    padding: 0.75rem;
  }
  
  .post-header {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .post-title {
    margin-right: 0;
  }
  
  .post-stats {
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .post-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .post-stats {
    align-self: flex-end;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .post-card {
    background: #1f2937;
    border-color: #374151;
  }
  
  .post-title {
    color: #f9fafb;
  }
  
  .post-content,
  .post-date,
  .post-author,
  .post-likes,
  .post-comments {
    color: #9ca3af;
  }
  
  .loading-text,
  .end-message span {
    color: #9ca3af;
  }
  
  .posts-container::-webkit-scrollbar-track {
    background: #374151;
  }
  
  .posts-container::-webkit-scrollbar-thumb {
    background: #4b5563;
  }
  
  .posts-container::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
}

/* Accessibility */
.post-card:focus-within {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.loading-spinner:focus {
  outline: none;
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .post-card {
    border-width: 2px;
  }
  
  .loading-spinner {
    border-width: 3px;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .post-card {
    transition: none;
  }
  
  .post-card:hover {
    transform: none;
  }
  
  .loading-spinner {
    animation: none;
  }
  
  .posts-container {
    scroll-behavior: auto;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Infinite Scroll</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Automatically loads more content as user scrolls</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Intersection Observer</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Efficient detection of scroll position</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Loading States</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Visual feedback during content loading</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Performance Optimized</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Efficient memory management and rendering</p>
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
            <div className="text-2xl mb-2">📱</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Social Media Feeds</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Facebook, Twitter, Instagram style feeds</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📰</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">News Websites</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Article lists and content streams</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">E-commerce</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Product catalogs and search results</p>
          </div>
        </div>
      </div>
    </div>
  );
}
