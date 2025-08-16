"use client";

import { useState, useMemo } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

interface SearchItem {
  id: number;
  title: string;
  category: string;
  tags: string[];
  date: string;
  author: string;
  status: "published" | "draft" | "archived";
  priority: "high" | "medium" | "low";
}

export default function SearchFiltersPattern() {
    const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<
    "all" | "today" | "week" | "month" | "year"
  >("all");
  const [sortBy, setSortBy] = useState<
    "relevance" | "date" | "title" | "author"
  >("relevance");
  const [showFilters, setShowFilters] = useState(false);

  // Sample data
  const sampleData: SearchItem[] = [
    {
      id: 1,
      title: "React Best Practices Guide",
      category: "Development",
      tags: ["react", "javascript", "frontend"],
      date: "2024-01-15",
      author: "John Doe",
      status: "published",
      priority: "high",
    },
    {
      id: 2,
      title: "UI Design Principles",
      category: "Design",
      tags: ["ui", "design", "ux"],
      date: "2024-01-10",
      author: "Jane Smith",
      status: "published",
      priority: "medium",
    },
    {
      id: 3,
      title: "API Integration Tutorial",
      category: "Development",
      tags: ["api", "backend", "integration"],
      date: "2024-01-08",
      author: "Mike Johnson",
      status: "draft",
      priority: "high",
    },
    {
      id: 4,
      title: "Mobile App Design",
      category: "Design",
      tags: ["mobile", "design", "app"],
      date: "2024-01-05",
      author: "Sarah Wilson",
      status: "published",
      priority: "low",
    },
    {
      id: 5,
      title: "Database Optimization",
      category: "Development",
      tags: ["database", "sql", "performance"],
      date: "2024-01-03",
      author: "Alex Brown",
      status: "archived",
      priority: "medium",
    },
    {
      id: 6,
      title: "User Research Methods",
      category: "Research",
      tags: ["research", "user", "methods"],
      date: "2024-01-01",
      author: "Lisa Chen",
      status: "published",
      priority: "high",
    },
  ];

  // Get unique values for filters
  const categories = useMemo(
    () => [...new Set(sampleData.map((item) => item.category))],
    [],
  );
  const tags = useMemo(
    () => [...new Set(sampleData.flatMap((item) => item.tags))],
    [],
  );
  const statuses = useMemo(
    () => [...new Set(sampleData.map((item) => item.status))],
    [],
  );
  const priorities = useMemo(
    () => [...new Set(sampleData.map((item) => item.priority))],
    [],
  );

  // Filter and sort data
  const filteredData = useMemo(() => {
    const filtered = sampleData.filter((item) => {
      // Search query filter
      const matchesQuery =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category);

      // Tags filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => item.tags.includes(tag));

      // Status filter
      const matchesStatus =
        selectedStatus.length === 0 || selectedStatus.includes(item.status);

      // Priority filter
      const matchesPriority =
        selectedPriority.length === 0 ||
        selectedPriority.includes(item.priority);

      // Date range filter
      const itemDate = new Date(item.date);
      const now = new Date();
      let matchesDate = true;

      switch (dateRange) {
        case "today":
          matchesDate = itemDate.toDateString() === now.toDateString();
          break;
        case "week":
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = itemDate >= weekAgo;
          break;
        case "month":
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = itemDate >= monthAgo;
          break;
        case "year":
          const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          matchesDate = itemDate >= yearAgo;
          break;
        default:
          matchesDate = true;
      }

      return (
        matchesQuery &&
        matchesCategory &&
        matchesTags &&
        matchesStatus &&
        matchesPriority &&
        matchesDate
      );
    });

    // Sort data
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return a.author.localeCompare(b.author);
        default:
          return 0; // relevance - keep original order
      }
    });

    return filtered;
  }, [
    searchQuery,
    selectedCategories,
    selectedTags,
    selectedStatus,
    selectedPriority,
    dateRange,
    sortBy,
  ]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleStatusToggle = (status: string) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  const handlePriorityToggle = (priority: string) => {
    setSelectedPriority((prev) =>
      prev.includes(priority)
        ? prev.filter((p) => p !== priority)
        : [...prev, priority],
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedStatus([]);
    setSelectedPriority([]);
    setDateRange("all");
    setSortBy("relevance");
  };

  const getActiveFiltersCount = () => {
    return (
      (searchQuery ? 1 : 0) +
      selectedCategories.length +
      selectedTags.length +
      selectedStatus.length +
      selectedPriority.length +
      (dateRange !== "all" ? 1 : 0) +
      (sortBy !== "relevance" ? 1 : 0)
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🔍 Search Filters Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Advanced search functionality with multiple filter options, real-time
          filtering, and clear visual feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles, authors, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                <span>Filters</span>
                {getActiveFiltersCount() > 0 && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </button>

              {getActiveFiltersCount() > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                {/* Categories */}
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                    Categories
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedCategories.includes(category)
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedTags.includes(tag)
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                    Status
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {statuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusToggle(status)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedStatus.includes(status)
                            ? "bg-purple-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                    Priority
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {priorities.map((priority) => (
                      <button
                        key={priority}
                        onClick={() => handlePriorityToggle(priority)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedPriority.includes(priority)
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                    Date Range
                  </h4>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="all">All time</option>
                    <option value="today">Today</option>
                    <option value="week">This week</option>
                    <option value="month">This month</option>
                    <option value="year">This year</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                    Sort By
                  </h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="date">Date</option>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                  </select>
                </div>
              </div>
            )}

            {/* Results */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Results ({filteredData.length})
                </h4>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {filteredData.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <h5 className="font-medium text-gray-900 dark:text-gray-100">
                      {item.title}
                    </h5>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <span>{item.author}</span>
                      <span>{item.category}</span>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          item.status === "published"
                            ? "bg-green-100 text-green-800"
                            : item.status === "draft"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
                <DynamicCodeExample componentName="search-filters" />
              }
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
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
                Real-time Search
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Instant filtering as you type
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Multiple Filter Types
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Categories, tags, status, priority
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Date Range Filtering
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Filter by time periods
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Sorting Options
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sort by relevance, date, title, author
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Collapsible Filters
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Show/hide filter panel
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Clear All Filters
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Reset all filters at once
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-semibold mb-4 text-purple-800 dark:text-purple-200">
          🎯 Use Cases
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📚</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Content Management
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Filter articles, posts, and documents
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              E-commerce
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Filter products by category, price, brand
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Data Analytics
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Filter reports and analytics data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
