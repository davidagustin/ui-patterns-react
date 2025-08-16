'use client';

import { useState } from 'react';

export default function AdaptableViewPattern() {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'card'>('grid');
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  const content = [
    {
      id: 1,
      title: 'Smart Home Security System',
      description: 'Complete IoT security solution with AI-powered monitoring, mobile alerts, and 24/7 cloud recording for your peace of mind.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      category: 'Technology',
      price: '$299.99',
      rating: 4.8,
      tags: ['Smart Home', 'Security', 'IoT']
    },
    {
      id: 2,
      title: 'Ergonomic Office Chair',
      description: 'Premium ergonomic design with lumbar support, adjustable height, and breathable mesh fabric for all-day comfort.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
      category: 'Furniture',
      price: '$449.99',
      rating: 4.6,
      tags: ['Office', 'Ergonomic', 'Comfort']
    },
    {
      id: 3,
      title: 'Wireless Noise-Canceling Headphones',
      description: 'Studio-quality sound with active noise cancellation, 30-hour battery life, and premium build quality.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
      category: 'Audio',
      price: '$199.99',
      rating: 4.9,
      tags: ['Audio', 'Wireless', 'Premium']
    },
    {
      id: 4,
      title: 'Organic Coffee Subscription',
      description: 'Freshly roasted organic coffee beans delivered monthly from sustainable farms around the world.',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop',
      category: 'Food & Beverage',
      price: '$24.99/month',
      rating: 4.7,
      tags: ['Coffee', 'Organic', 'Subscription']
    },
    {
      id: 5,
      title: 'Fitness Tracking Smartwatch',
      description: 'Advanced health monitoring with GPS, heart rate tracking, sleep analysis, and 7-day battery life.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop',
      category: 'Fitness',
      price: '$349.99',
      rating: 4.5,
      tags: ['Fitness', 'Health', 'Smartwatch']
    },
    {
      id: 6,
      title: 'Portable Solar Power Bank',
      description: 'High-capacity solar charger with multiple USB ports, weatherproof design, and emergency LED flashlight.',
      image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=300&h=200&fit=crop',
      category: 'Electronics',
      price: '$89.99',
      rating: 4.4,
      tags: ['Solar', 'Portable', 'Eco-friendly']
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📱 Adaptable View Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Allow users to switch between different content layouts (grid, list, card) to match their viewing preferences and context.
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
              Switch between different view modes to see how the same content adapts to different layouts and user preferences.
            </p>
            
            {/* View Mode Selector */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <span className="mr-2">⚏</span>Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <span className="mr-2">☰</span>List
                </button>
                <button
                  onClick={() => setViewMode('card')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'card'
                      ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <span className="mr-2">▭</span>Card
                </button>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {content.length} items
              </span>
            </div>

            {/* Content Display */}
            <div className={`transition-all duration-300 ${
              viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' :
              viewMode === 'list' ? 'space-y-2' :
              'grid grid-cols-1 gap-6'
            }`}>
              {content.map((item) => (
                <div
                  key={item.id}
                  className={`transition-all duration-200 ${
                    viewMode === 'grid' ? 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md' :
                    viewMode === 'list' ? 'flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700' :
                    'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg'
                  }`}
                >
                  {viewMode === 'grid' && (
                    <div className="p-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-32 object-cover rounded-md mb-3"
                      />
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-green-600">{item.price}</span>
                        <div className="flex items-center">
                          {renderStars(item.rating)}
                          <span className="ml-1 text-xs text-gray-500">({item.rating})</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {viewMode === 'list' && (
                    <>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          {item.category}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 flex-shrink-0">
                        <div className="flex items-center">
                          {renderStars(item.rating)}
                        </div>
                        <span className="font-semibold text-sm text-green-600">{item.price}</span>
                      </div>
                    </>
                  )}

                  {viewMode === 'card' && (
                    <div className="flex">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-24 object-cover flex-shrink-0"
                      />
                      <div className="p-4 flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                            {item.title}
                          </h3>
                          <span className="font-semibold text-green-600 ml-3">{item.price}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                            {item.category}
                          </span>
                          <div className="flex items-center">
                            {renderStars(item.rating)}
                            <span className="ml-1 text-xs text-gray-500">({item.rating})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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

export default function AdaptableViewPattern() {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'card'>('grid');

  const content = [
    {
      id: 1,
      title: 'Smart Home Security System',
      description: 'Complete IoT security solution with AI-powered monitoring.',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwMCIgeT0iNzAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNjAiIHJ4PSI4IiBmaWxsPSIjNkI3MjgwIi8+Cjwvc3ZnPgo=',
      category: 'Technology',
      price: '$299.99',
      rating: 4.8,
      tags: ['Smart Home', 'Security', 'IoT']
    },
    {
      id: 2,
      title: 'Ergonomic Office Chair',
      description: 'Premium ergonomic design with lumbar support.',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwMCIgeT0iNzAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNjAiIHJ4PSI4IiBmaWxsPSIjNkI3MjgwIi8+Cjwvc3ZnPgo=',
      category: 'Furniture',
      price: '$449.99',
      rating: 4.6,
      tags: ['Office', 'Ergonomic', 'Comfort']
    }
    // ... more items
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={\`text-sm \${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}\`}>
        ★
      </span>
    ));
  };

  return (
    <div className="adaptable-view-container">
      {/* View Mode Selector */}
      <div className="view-controls">
        <div className="view-mode-selector">
          <button
            onClick={() => setViewMode('grid')}
            className={\`view-button \${viewMode === 'grid' ? 'active' : ''}\`}
          >
            <span className="icon">⚏</span>Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={\`view-button \${viewMode === 'list' ? 'active' : ''}\`}
          >
            <span className="icon">☰</span>List
          </button>
          <button
            onClick={() => setViewMode('card')}
            className={\`view-button \${viewMode === 'card' ? 'active' : ''}\`}
          >
            <span className="icon">▭</span>Card
          </button>
        </div>
        <span className="item-count">{content.length} items</span>
      </div>

      {/* Content Display */}
      <div className={\`content-container \${viewMode}\`}>
        {content.map((item) => (
          <div key={item.id} className="content-item">
            {viewMode === 'grid' && (
              <div className="grid-content">
                <img src={item.image} alt={item.title} className="item-image" />
                <h3 className="item-title">{item.title}</h3>
                <p className="item-description">{item.description}</p>
                <div className="item-footer">
                  <span className="item-price">{item.price}</span>
                  <div className="item-rating">
                    {renderStars(item.rating)}
                    <span className="rating-value">({item.rating})</span>
                  </div>
                </div>
              </div>
            )}

            {viewMode === 'list' && (
              <div className="list-content">
                <img src={item.image} alt={item.title} className="list-image" />
                <div className="list-info">
                  <h3 className="list-title">{item.title}</h3>
                  <p className="list-category">{item.category}</p>
                </div>
                <div className="list-meta">
                  <div className="list-rating">{renderStars(item.rating)}</div>
                  <span className="list-price">{item.price}</span>
                </div>
              </div>
            )}

            {viewMode === 'card' && (
              <div className="card-content">
                <img src={item.image} alt={item.title} className="card-image" />
                <div className="card-body">
                  <div className="card-header">
                    <h3 className="card-title">{item.title}</h3>
                    <span className="card-price">{item.price}</span>
                  </div>
                  <p className="card-description">{item.description}</p>
                  <div className="card-footer">
                    <span className="card-category">{item.category}</span>
                    <div className="card-rating">
                      {renderStars(item.rating)}
                      <span className="rating-value">({item.rating})</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Adaptable View Container */
.adaptable-view-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* View Controls */
.view-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.view-mode-selector {
  display: flex;
  background: #f3f4f6;
  border-radius: 0.5rem;
  padding: 0.25rem;
  gap: 0.25rem;
}

.view-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-button:hover {
  color: #374151;
}

.view-button.active {
  background: white;
  color: #3b82f6;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.icon {
  font-size: 1rem;
}

.item-count {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Content Container */
.content-container {
  transition: all 0.3s ease;
}

.content-container.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.content-container.list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.content-container.card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Content Items */
.content-item {
  transition: all 0.2s ease;
}

/* Grid View */
.grid-content {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  transition: all 0.2s ease;
}

.grid-content:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.grid-content .item-image {
  width: 100%;
  height: 8rem;
  object-fit: cover;
  border-radius: 0.375rem;
  margin-bottom: 0.75rem;
}

.grid-content .item-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.grid-content .item-description {
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
  line-height: 1.33;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.grid-content .item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.grid-content .item-price {
  font-weight: 600;
  color: #059669;
  font-size: 0.875rem;
}

.grid-content .item-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.grid-content .rating-value {
  font-size: 0.75rem;
  color: #6b7280;
}

/* List View */
.list-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.list-content:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.list-content .list-image {
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 0.375rem;
  flex-shrink: 0;
}

.list-content .list-info {
  flex: 1;
  min-width: 0;
}

.list-content .list-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.125rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list-content .list-category {
  font-size: 0.75rem;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list-content .list-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.list-content .list-rating {
  display: flex;
  align-items: center;
}

.list-content .list-price {
  font-weight: 600;
  color: #059669;
  font-size: 0.875rem;
}

/* Card View */
.card-content {
  display: flex;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.2s ease;
}

.card-content:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.card-content .card-image {
  width: 6rem;
  height: 6rem;
  object-fit: cover;
  flex-shrink: 0;
}

.card-content .card-body {
  padding: 1rem;
  flex: 1;
}

.card-content .card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.card-content .card-title {
  font-weight: 600;
  color: #111827;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-content .card-price {
  font-weight: 600;
  color: #059669;
  margin-left: 0.75rem;
}

.card-content .card-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
  line-height: 1.43;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-content .card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-content .card-category {
  font-size: 0.75rem;
  color: #3b82f6;
  background: #eff6ff;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
}

.card-content .card-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.card-content .rating-value {
  font-size: 0.75rem;
  color: #6b7280;
}

/* Responsive Design */
@media (max-width: 768px) {
  .adaptable-view-container {
    padding: 1rem;
  }
  
  .view-controls {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .view-mode-selector {
    align-self: center;
  }
  
  .content-container.grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .card-content {
    flex-direction: column;
  }
  
  .card-content .card-image {
    width: 100%;
    height: 8rem;
  }
}

@media (max-width: 480px) {
  .view-mode-selector {
    width: 100%;
  }
  
  .view-button {
    flex: 1;
    justify-content: center;
  }
  
  .content-container.grid {
    grid-template-columns: 1fr;
  }
  
  .list-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .list-content .list-meta {
    align-self: stretch;
    justify-content: space-between;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .view-mode-selector {
    background: #374151;
  }
  
  .view-button {
    color: #9ca3af;
  }
  
  .view-button:hover {
    color: #d1d5db;
  }
  
  .view-button.active {
    background: #4b5563;
    color: #60a5fa;
  }
  
  .grid-content,
  .list-content,
  .card-content {
    background: #1f2937;
    border-color: #374151;
  }
  
  .list-content:hover {
    background: #374151;
  }
  
  .grid-content .item-title,
  .list-content .list-title,
  .card-content .card-title {
    color: #f9fafb;
  }
  
  .grid-content .item-description,
  .list-content .list-category,
  .card-content .card-description {
    color: #9ca3af;
  }
  
  .card-content .card-category {
    background: #1e3a8a;
    color: #93c5fd;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Multiple View Modes</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Grid, list, and card layouts for different user preferences</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Smooth Transitions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Animated transitions between different view modes</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Responsive Design</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Adapts to different screen sizes automatically</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Content Preservation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Same content displayed in optimized formats</p>
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
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">E-commerce</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Product catalogs with different browsing modes</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Data Dashboards</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Switch between chart types and table views</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📰</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Content Feeds</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">News articles and blog posts in different layouts</p>
          </div>
        </div>
      </div>
    </div>
  );
}