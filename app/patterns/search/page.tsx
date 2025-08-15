'use client';

import { useState, useEffect, useRef } from 'react';

export default function SearchPattern() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const searchRef = useRef<HTMLDivElement>(null);

  // Sample data
  const data = [
    { id: 1, title: 'React Development Guide', category: 'documentation', tags: ['react', 'javascript', 'frontend'], content: 'Complete guide to React development with hooks and modern patterns.' },
    { id: 2, title: 'TypeScript Best Practices', category: 'documentation', tags: ['typescript', 'javascript', 'development'], content: 'Learn TypeScript best practices for scalable applications.' },
    { id: 3, title: 'UI Component Library', category: 'project', tags: ['ui', 'components', 'design'], content: 'A comprehensive UI component library built with React and Tailwind CSS.' },
    { id: 4, title: 'API Integration Tutorial', category: 'tutorial', tags: ['api', 'backend', 'integration'], content: 'Step-by-step guide to integrating APIs in your applications.' },
    { id: 5, title: 'Database Design Patterns', category: 'documentation', tags: ['database', 'design', 'patterns'], content: 'Common database design patterns for scalable applications.' },
    { id: 6, title: 'Authentication System', category: 'project', tags: ['auth', 'security', 'user-management'], content: 'Complete authentication system with JWT and OAuth support.' },
    { id: 7, title: 'Performance Optimization', category: 'tutorial', tags: ['performance', 'optimization', 'web'], content: 'Techniques for optimizing web application performance.' },
    { id: 8, title: 'Testing Strategies', category: 'documentation', tags: ['testing', 'quality', 'automation'], content: 'Comprehensive testing strategies for modern applications.' }
  ];

  const filters = [
    { key: 'all', label: 'All', icon: '🔍' },
    { key: 'documentation', label: 'Documentation', icon: '📚' },
    { key: 'tutorial', label: 'Tutorials', icon: '🎓' },
    { key: 'project', label: 'Projects', icon: '💻' }
  ];

  // Search suggestions
  const searchSuggestions = [
    'react development',
    'typescript guide',
    'ui components',
    'api integration',
    'database design',
    'authentication',
    'performance',
    'testing'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Show suggestions
    const filteredSuggestions = searchSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredSuggestions.slice(0, 5));
    setShowSuggestions(true);

    // Simulate search delay
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      performSearch();
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, selectedFilter]);

  const performSearch = () => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filteredResults = data.filter(item => {
      const matchesQuery = 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));

      const matchesFilter = selectedFilter === 'all' || item.category === selectedFilter;

      return matchesQuery && matchesFilter;
    });

    setResults(filteredResults);

    // Add to search history
    if (query.trim() && !searchHistory.includes(query.trim())) {
      setSearchHistory(prev => [query.trim(), ...prev.slice(0, 4)]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleHistoryClick = (historyItem: string) => {
    setQuery(historyItem);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowSuggestions(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'documentation': return '📚';
      case 'tutorial': return '🎓';
      case 'project': return '💻';
      default: return '📄';
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🔍 Advanced Search Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Comprehensive search functionality with real-time suggestions, filters, and search history.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative" ref={searchRef}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search documentation, tutorials, and projects..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                  </div>
                  {query && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && (suggestions.length > 0 || searchHistory.length > 0) && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                    {/* Search History */}
                    {searchHistory.length > 0 && (
                      <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Recent Searches</div>
                        {searchHistory.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => handleHistoryClick(item)}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center"
                          >
                            <span className="mr-2">🕒</span>
                            {item}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Suggestions */}
                    {suggestions.length > 0 && (
                      <div className="p-2">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Suggestions</div>
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center"
                          >
                            <span className="mr-2">💡</span>
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedFilter(filter.key)}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                      selectedFilter === filter.key
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-300'
                    }`}
                  >
                    <span className="mr-1">{filter.icon}</span>
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Searching...</span>
                </div>
              )}

              {/* Results */}
              {!isLoading && results.length > 0 && (
                <div className="space-y-3">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Found {results.length} result{results.length !== 1 ? 's' : ''}
                  </div>
                  {results.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{getCategoryIcon(item.category)}</div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                            {highlightText(item.title, query)}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {highlightText(item.content, query)}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {item.tags.map((tag: string, index: number) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* No Results */}
              {!isLoading && query && results.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your search terms or filters
                  </p>
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
{`import { useState, useEffect, useRef } from 'react';

export default function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const data = [
    { id: 1, title: 'React Guide', category: 'documentation', content: 'Complete React guide' },
    { id: 2, title: 'TypeScript Tutorial', category: 'tutorial', content: 'TypeScript basics' }
  ];

  const searchSuggestions = [
    'react development',
    'typescript guide',
    'javascript tutorial'
  ];

  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Show suggestions
    const filteredSuggestions = searchSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredSuggestions.slice(0, 5));
    setShowSuggestions(true);

    // Perform search
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      const filteredResults = data.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative" ref={searchRef}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            ✕
          </button>
        )}

        {/* Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 hover:bg-gray-100"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      )}

      {/* Results */}
      {!isLoading && results.length > 0 && (
        <div className="space-y-3">
          {results.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg border">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!isLoading && query && results.length === 0 && (
        <div className="text-center py-8">
          <p>No results found</p>
        </div>
      )}
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Search Container */
.search-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

/* Search Bar */
.search-bar {
  position: relative;
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: white;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-clear {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: color 0.2s ease;
}

.search-clear:hover {
  color: #374151;
}

/* Search Suggestions */
.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  margin-top: 0.25rem;
  max-height: 200px;
  overflow-y: auto;
}

.suggestion-item {
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.suggestion-item:hover {
  background-color: #f3f4f6;
}

.suggestion-item:first-child {
  border-radius: 0.5rem 0.5rem 0 0;
}

.suggestion-item:last-child {
  border-radius: 0 0 0.5rem 0.5rem;
}

/* Search Filters */
.search-filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.filter-button {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-button:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.filter-button.active {
  background-color: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

/* Search Results */
.search-results {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.result-item {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  transition: border-color 0.2s ease;
}

.result-item:hover {
  border-color: #d1d5db;
}

.result-title {
  font-weight: 500;
  color: #111827;
  margin-bottom: 0.25rem;
}

.result-content {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
}

/* Loading State */
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.spinner {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* No Results */
.no-results {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}

/* Search History */
.search-history {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e5e7eb;
}

.history-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  cursor: pointer;
  transition: color 0.2s ease;
}

.history-item:hover {
  color: #3b82f6;
}

.history-remove {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: color 0.2s ease;
}

.history-remove:hover {
  color: #ef4444;
}

/* Responsive Design */
@media (max-width: 640px) {
  .search-container {
    padding: 0.5rem;
  }
  
  .search-filters {
    gap: 0.25rem;
  }
  
  .filter-button {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .search-input {
    background-color: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
  
  .search-input:focus {
    border-color: #60a5fa;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
  }
  
  .search-suggestions {
    background-color: #374151;
    border-color: #4b5563;
  }
  
  .suggestion-item:hover {
    background-color: #4b5563;
  }
  
  .filter-button {
    background-color: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
  
  .filter-button:hover {
    background-color: #4b5563;
  }
  
  .result-item {
    background-color: #374151;
    border-color: #4b5563;
  }
  
  .result-title {
    color: #f9fafb;
  }
  
  .result-content {
    color: #9ca3af;
  }
}

/* Accessibility */
.search-input:focus-visible,
.suggestion-item:focus-visible,
.filter-button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .search-input,
  .suggestion-item,
  .filter-button,
  .result-item {
    transition: none;
  }
  
  .spinner {
    animation: none;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Real-time Search</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Instant results as you type with debouncing</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Smart Suggestions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Contextual search suggestions and history</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Category Filters</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Filter results by content categories</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Highlighted Results</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Search terms highlighted in results</p>
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
            <div className="text-2xl mb-2">📚</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Documentation Sites</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Search through technical documentation</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">E-commerce</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Product search with filters and suggestions</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📧</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Email Clients</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Search through emails and contacts</p>
          </div>
        </div>
      </div>
    </div>
  );
}
