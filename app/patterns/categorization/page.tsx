'use client';

import { useState } from 'react';

export default function CategorizationPattern() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  const categories = [
    { id: 'all', name: 'All Items', count: 42, color: 'gray' },
    { id: 'electronics', name: 'Electronics', count: 12, color: 'blue' },
    { id: 'clothing', name: 'Clothing', count: 8, color: 'green' },
    { id: 'books', name: 'Books', count: 15, color: 'purple' },
    { id: 'home', name: 'Home & Garden', count: 7, color: 'orange' }
  ];

  const items = [
    { id: 1, name: 'Wireless Headphones', category: 'electronics', price: '$199.99', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Cotton T-Shirt', category: 'clothing', price: '$29.99', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'JavaScript Guide', category: 'books', price: '$39.99', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Bluetooth Speaker', category: 'electronics', price: '$89.99', image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Garden Tools Set', category: 'home', price: '$79.99', image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Denim Jeans', category: 'clothing', price: '$69.99', image: 'https://via.placeholder.com/150' },
    { id: 7, name: 'React Cookbook', category: 'books', price: '$45.99', image: 'https://via.placeholder.com/150' },
    { id: 8, name: 'Smart Watch', category: 'electronics', price: '$299.99', image: 'https://via.placeholder.com/150' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const getCategoryColor = (color: string) => {
    const colors = {
      gray: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
      green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200',
      orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📁 Categorization Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Organize content into distinct categories with visual indicators and filtering capabilities.
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
              Click on categories to filter items. Each category shows item count and uses color coding for easy identification.
            </p>
            
            {/* Category Navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? getCategoryColor(category.color) + ' ring-2 ring-offset-2 ring-blue-500'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 px-2 py-1 text-xs rounded-full bg-white/20">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {filteredItems.map((item) => {
                const category = categories.find(cat => cat.id === item.category);
                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-24 object-cover rounded-md mb-3"
                    />
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 line-clamp-2">
                        {item.name}
                      </h3>
                      {category && (
                        <span className={`px-2 py-1 text-xs rounded-full flex-shrink-0 ml-2 ${getCategoryColor(category.color)}`}>
                          {category.name}
                        </span>
                      )}
                    </div>
                    <p className="text-lg font-semibold text-green-600">{item.price}</p>
                  </div>
                );
              })}
            </div>
            
            {filteredItems.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No items found in this category
              </div>
            )}
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

export default function CategorizationPattern() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Items', count: 42, color: 'gray' },
    { id: 'electronics', name: 'Electronics', count: 12, color: 'blue' },
    { id: 'clothing', name: 'Clothing', count: 8, color: 'green' },
    { id: 'books', name: 'Books', count: 15, color: 'purple' },
    { id: 'home', name: 'Home & Garden', count: 7, color: 'orange' }
  ];

  const items = [
    { id: 1, name: 'Wireless Headphones', category: 'electronics', price: '$199.99' },
    { id: 2, name: 'Cotton T-Shirt', category: 'clothing', price: '$29.99' },
    { id: 3, name: 'JavaScript Guide', category: 'books', price: '$39.99' },
    { id: 4, name: 'Bluetooth Speaker', category: 'electronics', price: '$89.99' }
    // ... more items
  ];

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const getCategoryColor = (color: string) => {
    const colors = {
      gray: 'bg-gray-100 text-gray-800',
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      purple: 'bg-purple-100 text-purple-800',
      orange: 'bg-orange-100 text-orange-800'
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="categorization-container">
      {/* Category Navigation */}
      <div className="category-nav">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={\`category-button \${
              selectedCategory === category.id ? 'active' : ''
            } \${getCategoryColor(category.color)}\`}
          >
            {category.name}
            <span className="category-count">{category.count}</span>
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="items-grid">
        {filteredItems.map((item) => {
          const category = categories.find(cat => cat.id === item.category);
          return (
            <div key={item.id} className="item-card">
              <img
                src={item.image}
                alt={item.name}
                className="item-image"
              />
              <div className="item-content">
                <div className="item-header">
                  <h3 className="item-title">{item.name}</h3>
                  {category && (
                    <span className={\`item-category \${getCategoryColor(category.color)}\`}>
                      {category.name}
                    </span>
                  )}
                </div>
                <p className="item-price">{item.price}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="empty-state">
          No items found in this category
        </div>
      )}
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Categorization Container */
.categorization-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

/* Category Navigation */
.category-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.category-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-button:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.category-button.active {
  ring: 2px;
  ring-color: #3b82f6;
  ring-offset: 2px;
}

.category-count {
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.2);
}

/* Category Colors */
.category-button.bg-gray-100 {
  background: #f3f4f6;
  color: #1f2937;
}

.category-button.bg-blue-100 {
  background: #dbeafe;
  color: #1e40af;
}

.category-button.bg-green-100 {
  background: #dcfce7;
  color: #166534;
}

.category-button.bg-purple-100 {
  background: #e9d5ff;
  color: #7c2d12;
}

.category-button.bg-orange-100 {
  background: #fed7aa;
  color: #9a3412;
}

/* Items Grid */
.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  max-height: 24rem;
  overflow-y: auto;
}

/* Item Card */
.item-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  transition: all 0.2s ease;
}

.item-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.item-image {
  width: 100%;
  height: 6rem;
  object-fit: cover;
  border-radius: 0.375rem;
  margin-bottom: 0.75rem;
}

.item-content {
  display: flex;
  flex-direction: column;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.item-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-category {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 9999px;
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: 0.5rem;
}

.item-price {
  font-size: 1rem;
  font-weight: 600;
  color: #059669;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-style: italic;
}

/* Responsive Design */
@media (max-width: 768px) {
  .categorization-container {
    padding: 1rem;
  }
  
  .category-nav {
    flex-direction: column;
  }
  
  .category-button {
    justify-content: space-between;
  }
  
  .items-grid {
    grid-template-columns: 1fr;
  }
  
  .item-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .item-category {
    margin-left: 0;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .category-button {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
  
  .category-button:hover {
    background: #4b5563;
  }
  
  .item-card {
    background: #1f2937;
    border-color: #374151;
  }
  
  .item-title {
    color: #f9fafb;
  }
  
  .empty-state {
    color: #9ca3af;
  }
}

/* Animation */
.item-card {
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
.category-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.category-button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Accessibility */
.category-button[aria-pressed="true"] {
  background: #3b82f6;
  color: white;
}

/* Loading State */
.items-grid.loading {
  opacity: 0.6;
  pointer-events: none;
}

.item-card.loading {
  position: relative;
  overflow: hidden;
}

.item-card.loading::before {
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Categories</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Color-coded categories for easy identification</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Item Counts</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Display number of items in each category</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Instant Filtering</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Real-time content filtering by category</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Responsive Layout</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Adapts to different screen sizes</p>
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
            <div className="text-2xl mb-2">🛍️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">E-commerce</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Product categories and department filtering</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📁</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Content Management</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Document and file organization</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Data Analysis</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Dataset categorization and filtering</p>
          </div>
        </div>
      </div>
    </div>
  );
}