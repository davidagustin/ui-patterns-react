'use client';

import { useState, useEffect } from 'react';

interface FavoriteItem {
  id: string;
  title: string;
  description: string;
  category: 'article' | 'product' | 'video' | 'tool';
  url: string;
  addedAt: Date;
  isFavorite: boolean;
}

export default function FavoritesPattern() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [filterCategory, setFilterCategory] = useState<'all' | 'article' | 'product' | 'video' | 'tool'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  // Sample data
  const sampleItems: FavoriteItem[] = [
    {
      id: '1',
      title: 'React Best Practices 2024',
      description: 'Comprehensive guide to modern React development patterns and best practices.',
      category: 'article',
      url: 'https://example.com/react-best-practices',
      addedAt: new Date('2024-01-15'),
      isFavorite: true
    },
    {
      id: '2',
      title: 'Design System Components',
      description: 'Reusable UI components for building consistent design systems.',
      category: 'tool',
      url: 'https://example.com/design-system',
      addedAt: new Date('2024-01-10'),
      isFavorite: true
    },
    {
      id: '3',
      title: 'Advanced CSS Grid Tutorial',
      description: 'Learn advanced CSS Grid techniques for complex layouts.',
      category: 'video',
      url: 'https://example.com/css-grid-tutorial',
      addedAt: new Date('2024-01-08'),
      isFavorite: true
    },
    {
      id: '4',
      title: 'Premium Code Editor',
      description: 'Professional code editor with advanced features and plugins.',
      category: 'product',
      url: 'https://example.com/code-editor',
      addedAt: new Date('2024-01-05'),
      isFavorite: true
    },
    {
      id: '5',
      title: 'TypeScript Deep Dive',
      description: 'Advanced TypeScript concepts and real-world applications.',
      category: 'article',
      url: 'https://example.com/typescript-deep-dive',
      addedAt: new Date('2024-01-03'),
      isFavorite: true
    },
    {
      id: '6',
      title: 'API Testing Tool',
      description: 'Comprehensive tool for testing and documenting APIs.',
      category: 'tool',
      url: 'https://example.com/api-testing',
      addedAt: new Date('2024-01-01'),
      isFavorite: true
    }
  ];

  useEffect(() => {
    setFavorites(sampleItems);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, isFavorite: !item.isFavorite }
          : item
      )
    );
  };

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'article':
        return '📄';
      case 'product':
        return '🛒';
      case 'video':
        return '🎥';
      case 'tool':
        return '🔧';
      default:
        return '⭐';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'article':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'product':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'video':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'tool':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const filteredAndSortedFavorites = favorites
    .filter(item => item.isFavorite)
    .filter(item => filterCategory === 'all' || item.category === filterCategory)
    .filter(item => 
      searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return b.addedAt.getTime() - a.addedAt.getTime();
      } else {
        return a.title.localeCompare(b.title);
      }
    });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ⭐ Favorites Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Allow users to save and organize their favorite items with easy management and quick access.
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
              Manage your favorite items with filtering, sorting, and search capabilities.
            </p>
            
            {/* Controls */}
            <div className="space-y-4 mb-6">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search favorites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
              </div>

              {/* Filters and Sort */}
              <div className="flex flex-wrap gap-3">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="article">📄 Articles</option>
                  <option value="product">🛒 Products</option>
                  <option value="video">🎥 Videos</option>
                  <option value="tool">🔧 Tools</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="date">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
            </div>

            {/* Favorites List */}
            <div className="space-y-3">
              {filteredAndSortedFavorites.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <div className="text-4xl mb-2">⭐</div>
                  <p>No favorites found</p>
                  <p className="text-sm">Try adjusting your search or filters</p>
                </div>
              ) : (
                filteredAndSortedFavorites.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <span className="text-2xl">{getCategoryIcon(item.category)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
                              {item.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                              {item.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Added {formatDate(item.addedAt)}
                            </span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => window.open(item.url, '_blank')}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                              >
                                Visit →
                              </button>
                              <button
                                onClick={() => removeFavorite(item.id)}
                                className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        className={`ml-2 p-1 rounded-full transition-colors ${
                          item.isFavorite
                            ? 'text-yellow-500 hover:text-yellow-600'
                            : 'text-gray-400 hover:text-yellow-500'
                        }`}
                      >
                        {item.isFavorite ? '★' : '☆'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Stats */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>{filteredAndSortedFavorites.length} favorites</span>
                <span>Total: {favorites.filter(f => f.isFavorite).length}</span>
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
{`import { useState, useEffect } from 'react';

interface FavoriteItem {
  id: string;
  title: string;
  description: string;
  category: 'article' | 'product' | 'video' | 'tool';
  url: string;
  addedAt: Date;
  isFavorite: boolean;
}

export default function FavoritesPattern() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [filterCategory, setFilterCategory] = useState<'all' | 'article' | 'product' | 'video' | 'tool'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, isFavorite: !item.isFavorite }
          : item
      )
    );
  };

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'article': return '📄';
      case 'product': return '🛒';
      case 'video': return '🎥';
      case 'tool': return '🔧';
      default: return '⭐';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'article': return 'category-article';
      case 'product': return 'category-product';
      case 'video': return 'category-video';
      case 'tool': return 'category-tool';
      default: return 'category-default';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const filteredAndSortedFavorites = favorites
    .filter(item => item.isFavorite)
    .filter(item => filterCategory === 'all' || item.category === filterCategory)
    .filter(item => 
      searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return b.addedAt.getTime() - a.addedAt.getTime();
      } else {
        return a.title.localeCompare(b.title);
      }
    });

  return (
    <div className="favorites-container">
      {/* Controls */}
      <div className="favorites-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search favorites..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-controls">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as any)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="article">📄 Articles</option>
            <option value="product">🛒 Products</option>
            <option value="video">🎥 Videos</option>
            <option value="tool">🔧 Tools</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="sort-select"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>

      {/* Favorites List */}
      <div className="favorites-list">
        {filteredAndSortedFavorites.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">⭐</div>
            <p>No favorites found</p>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredAndSortedFavorites.map((item) => (
            <div key={item.id} className="favorite-item">
              <div className="favorite-content">
                <div className="favorite-header">
                  <span className="category-icon">{getCategoryIcon(item.category)}</span>
                  <div className="favorite-info">
                    <div className="favorite-title-row">
                      <h3 className="favorite-title">{item.title}</h3>
                      <span className={\`category-badge \${getCategoryColor(item.category)}\`}>
                        {item.category}
                      </span>
                    </div>
                    <p className="favorite-description">{item.description}</p>
                    <div className="favorite-meta">
                      <span className="favorite-date">Added {formatDate(item.addedAt)}</span>
                      <div className="favorite-actions">
                        <button className="action-button visit">Visit →</button>
                        <button 
                          className="action-button remove"
                          onClick={() => removeFavorite(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className={\`favorite-toggle \${item.isFavorite ? 'favorited' : ''}\`}
                >
                  {item.isFavorite ? '★' : '☆'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      <div className="favorites-stats">
        <span>{filteredAndSortedFavorites.length} favorites</span>
        <span>Total: {favorites.filter(f => f.isFavorite).length}</span>
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Favorites Container */
.favorites-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

/* Controls */
.favorites-controls {
  margin-bottom: 1.5rem;
}

.search-container {
  position: relative;
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: white;
  color: #111827;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-size: 0.875rem;
}

.filter-controls {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filter-select,
.sort-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  color: #111827;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-select:focus,
.sort-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Favorites List */
.favorites-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.favorite-item {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  transition: all 0.2s ease;
}

.favorite-item:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.favorite-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.favorite-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
}

.category-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.favorite-info {
  flex: 1;
  min-width: 0;
}

.favorite-title-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.favorite-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  line-height: 1.25;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.category-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 500;
  text-transform: capitalize;
  white-space: nowrap;
}

.favorite-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.favorite-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.favorite-date {
  font-size: 0.75rem;
  color: #6b7280;
}

.favorite-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-button {
  font-size: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 0;
}

.action-button.visit {
  color: #3b82f6;
}

.action-button.visit:hover {
  color: #1d4ed8;
}

.action-button.remove {
  color: #ef4444;
}

.action-button.remove:hover {
  color: #dc2626;
}

.favorite-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.25rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  color: #d1d5db;
  margin-left: 0.5rem;
}

.favorite-toggle:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #fbbf24;
}

.favorite-toggle.favorited {
  color: #fbbf24;
}

.favorite-toggle.favorited:hover {
  color: #f59e0b;
}

/* Category Colors */
.category-article {
  background: #dbeafe;
  color: #1e40af;
}

.category-product {
  background: #dcfce7;
  color: #166534;
}

.category-video {
  background: #e9d5ff;
  color: #7c3aed;
}

.category-tool {
  background: #fed7aa;
  color: #c2410c;
}

.category-default {
  background: #f3f4f6;
  color: #374151;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-state p {
  margin: 0.25rem 0;
  font-size: 0.875rem;
}

.empty-state p:last-child {
  font-size: 0.75rem;
  opacity: 0.8;
}

/* Stats */
.favorites-stats {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-top: 1px solid #e5e7eb;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
}

/* Responsive Design */
@media (max-width: 768px) {
  .favorites-container {
    padding: 0.5rem;
  }
  
  .filter-controls {
    flex-direction: column;
  }
  
  .filter-select,
  .sort-select {
    width: 100%;
  }
  
  .favorite-content {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .favorite-header {
    width: 100%;
  }
  
  .favorite-toggle {
    align-self: flex-end;
    margin-left: 0;
  }
  
  .favorite-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .favorite-actions {
    align-self: flex-end;
  }
}

@media (max-width: 480px) {
  .favorite-title-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .favorite-title {
    white-space: normal;
  }
  
  .favorites-stats {
    flex-direction: column;
    gap: 0.25rem;
    text-align: center;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .search-input,
  .filter-select,
  .sort-select {
    background: #1f2937;
    border-color: #4b5563;
    color: #f9fafb;
  }
  
  .search-input:focus,
  .filter-select:focus,
  .sort-select:focus {
    border-color: #60a5fa;
  }
  
  .favorite-item {
    background: #1f2937;
    border-color: #374151;
  }
  
  .favorite-title {
    color: #f9fafb;
  }
  
  .favorite-description,
  .favorite-date {
    color: #9ca3af;
  }
  
  .action-button.visit {
    color: #60a5fa;
  }
  
  .action-button.visit:hover {
    color: #93c5fd;
  }
  
  .action-button.remove {
    color: #f87171;
  }
  
  .action-button.remove:hover {
    color: #ef4444;
  }
  
  .favorite-toggle {
    color: #6b7280;
  }
  
  .favorite-toggle:hover {
    background: rgba(96, 165, 250, 0.1);
  }
  
  .favorites-stats {
    border-color: #374151;
    color: #9ca3af;
  }
  
  .empty-state {
    color: #9ca3af;
  }
}

/* Accessibility */
.search-input:focus-visible,
.filter-select:focus-visible,
.sort-select:focus-visible,
.favorite-toggle:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.action-button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .favorite-item {
    border-width: 2px;
  }
  
  .search-input,
  .filter-select,
  .sort-select {
    border-width: 2px;
  }
  
  .favorites-stats {
    border-top-width: 2px;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .favorite-item {
    transition: none;
  }
  
  .favorite-item:hover {
    transform: none;
  }
  
  .favorite-toggle {
    transition: none;
  }
  
  .action-button {
    transition: none;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Easy Management</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Add, remove, and organize favorites</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Smart Filtering</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Filter by category and search by content</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Flexible Sorting</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sort by date added or alphabetically</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Feedback</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear indicators and hover states</p>
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
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Content Platforms</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Save articles, videos, and resources</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">E-commerce</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Wishlists and favorite products</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🔧</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Tool Collections</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Bookmark useful tools and utilities</p>
          </div>
        </div>
      </div>
    </div>
  );
}
