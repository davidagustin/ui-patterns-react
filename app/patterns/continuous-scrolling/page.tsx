"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

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
      // Create truly unique ID by combining page, index, and timestamp
      const postId = pageNum * 1000 + index + 1;
      return {
        id: postId,
        title: `Post ${postId}: ${getRandomTitle()}`,
        content: getRandomContent(),
        author: getRandomAuthor(),
        date: getRandomDate(),
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 100),
      };
    });
  };

  const getRandomTitle = () => {
    const titles = [
      "The Future of Web Development",
      "React Best Practices",
      "CSS Grid Layout Guide",
      "JavaScript Performance Tips",
      "UI/UX Design Principles",
      "Mobile-First Design",
      "Accessibility in Modern Web Apps",
      "State Management Patterns",
      "Testing Strategies for React",
      "Deployment Best Practices",
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getRandomContent = () => {
    const contents = [
      "This is an interesting article about modern web development practices and how they can improve your workflow.",
      "Learn about the latest trends in frontend development and how to implement them in your projects.",
      "Discover the best practices for building scalable and maintainable web applications.",
      "Explore advanced techniques for optimizing performance and user experience.",
      "Understand the importance of accessibility and how to make your applications inclusive for all users.",
    ];
    return contents[Math.floor(Math.random() * contents.length)];
  };

  const getRandomAuthor = () => {
    const authors = [
      "Sarah Johnson",
      "Mike Chen",
      "Emily Rodriguez",
      "David Kim",
      "Lisa Thompson",
      "Alex Morgan",
      "Rachel Green",
      "Tom Wilson",
    ];
    return authors[Math.floor(Math.random() * authors.length)];
  };

  const getRandomDate = () => {
    const dates = [
      "2 hours ago",
      "1 day ago",
      "3 days ago",
      "1 week ago",
      "2 weeks ago",
      "1 month ago",
    ];
    return dates[Math.floor(Math.random() * dates.length)];
  };

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newPosts = generatePosts(page);

    if (page >= 5) {
      // Limit to 5 pages for demo
      setHasMore(false);
    }

    setPosts((prev) => [...prev, ...newPosts]);
    setPage((prev) => prev + 1);
    setLoading(false);
  }, [loading, hasMore, page]);

  // Intersection Observer for infinite scroll
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMorePosts],
  );

  useEffect(() => {
    loadMorePosts();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
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
          Load content continuously as users scroll, providing a seamless
          browsing experience without pagination.
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
              Scroll down to see new posts load automatically. This pattern is
              perfect for social media feeds, news sites, and content-heavy
              applications.
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
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Loading more posts...
                    </span>
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

            {/* Tab Content */}
            <div className="code-block">
              {
                <DynamicCodeExample componentName="continuous-scrolling" />
              }
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
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Infinite Scroll
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatically loads more content as user scrolls
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Intersection Observer
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Efficient detection of scroll position
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Loading States
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Visual feedback during content loading
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Performance Optimized
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Efficient memory management and rendering
              </p>
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
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Social Media Feeds
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Facebook, Twitter, Instagram style feeds
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📰</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              News Websites
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Article lists and content streams
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              E-commerce
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Product catalogs and search results
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
