"use client";

import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function ArticleListPattern() {
  const [activeTab, setActiveTab] = useState<"jsx" | "css">("jsx");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">(
    "newest",
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const articles = [
    {
      id: 1,
      title: "Building Scalable React Applications with Modern Architecture",
      summary:
        "Learn how to structure large React applications using modern patterns like component composition, custom hooks, and state management solutions.",
      author: "Sarah Chen",
      date: "2024-01-14",
      readTime: "8 min read",
      category: "React",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
      fallback:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNkI3MjgwIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkFydGljbGUgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=",
      tags: ["React", "Architecture", "JavaScript"],
      likes: 245,
      comments: 18,
    },
    {
      id: 2,
      title: "The Future of Web Development: Trends to Watch in 2024",
      summary:
        "Explore the emerging technologies and frameworks that are shaping the future of web development, from AI-powered tools to edge computing.",
      author: "Michael Rodriguez",
      date: "2024-01-11",
      readTime: "12 min read",
      category: "Trends",
      image:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjM0I4MkY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPlRoZSBGdXR1cmUgb2YgV2ViPC90ZXh0Pgo8L3N2Zz4K",
      fallback:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNkI3MjgwIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkFydGljbGUgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=",
      tags: ["Web Development", "AI", "Trends"],
      likes: 189,
      comments: 24,
    },
    {
      id: 3,
      title: "Mastering CSS Grid: Advanced Layout Techniques",
      summary:
        "Deep dive into CSS Grid with practical examples and advanced techniques for creating complex, responsive layouts with clean code.",
      author: "Emily Johnson",
      date: "2024-01-10",
      readTime: "15 min read",
      category: "CSS",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
      fallback:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNkI3MjgwIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkFydGljbGUgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=",
      tags: ["CSS", "Grid", "Layout"],
      likes: 312,
      comments: 31,
    },
    {
      id: 4,
      title: "TypeScript Best Practices for Enterprise Applications",
      summary:
        "Comprehensive guide to using TypeScript effectively in large-scale applications, covering type safety, performance, and maintainability.",
      author: "David Kim",
      date: "2024-01-08",
      readTime: "10 min read",
      category: "TypeScript",
      image:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop",
      fallback:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNkI3MjgwIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkFydGljbGUgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=",
      tags: ["TypeScript", "Enterprise", "Best Practices"],
      likes: 156,
      comments: 12,
    },
    {
      id: 5,
      title: "Building Accessible Web Components with ARIA",
      summary:
        "Learn how to create web components that work for everyone by implementing proper ARIA attributes and accessibility best practices.",
      author: "Lisa Wang",
      date: "2024-01-05",
      readTime: "11 min read",
      category: "Accessibility",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop",
      fallback:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNkI3MjgwIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkFydGljbGUgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=",
      tags: ["Accessibility", "ARIA", "Web Components"],
      likes: 203,
      comments: 16,
    },
    {
      id: 6,
      title: "Performance Optimization Strategies for Modern Web Apps",
      summary:
        "Practical techniques for optimizing web application performance, including code splitting, lazy loading, and efficient state management.",
      author: "Alex Thompson",
      date: "2024-01-03",
      readTime: "13 min read",
      category: "Performance",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
      fallback:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNkI3MjgwIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkFydGljbGUgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=",
      tags: ["Performance", "Optimization", "Web Apps"],
      likes: 278,
      comments: 22,
    },
  ];

  const categories = [
    "all",
    "React",
    "CSS",
    "TypeScript",
    "Trends",
    "Accessibility",
    "Performance",
  ];

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    fallbackUrl: string,
  ) => {
    event.currentTarget.src = fallbackUrl;
  };

  const getSortedArticles = () => {
    const filtered =
      selectedCategory === "all"
        ? articles
        : articles.filter((article) => article.category === selectedCategory);

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "popular":
          return b.likes - a.likes;
        default:
          return 0;
      }
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📰 Article List Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Display articles and blog posts in an organized, scannable list with
          filtering, sorting, and rich metadata.
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
              Browse through articles with different sorting options and
              category filters. Each article shows key metadata and engagement
              metrics.
            </p>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sort by:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "newest" | "oldest" | "popular")
                  }
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category:
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Article List */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {getSortedArticles().map((article) => (
                <article
                  key={article.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="flex">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                      <img
                        src={article.image}
                        alt={article.title}
                        onError={(e) => handleImageError(e, article.fallback)}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
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

            {/* Tab Content */}
            <div className="code-block">
              {
                <DynamicCodeExample componentName="article-list" />
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
                Rich Metadata
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Author, date, read time, and engagement metrics
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Sorting & Filtering
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sort by date or popularity, filter by category
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Visual Hierarchy
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Clear title, summary, and metadata organization
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Responsive Layout
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Adapts from desktop to mobile seamlessly
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
            <div className="text-2xl mb-2">📝</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Blog Platforms
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              List blog posts with rich metadata and filtering
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📚</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Documentation
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Organize technical articles and guides
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📰</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              News Sites
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Display news articles with timestamps and categories
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
