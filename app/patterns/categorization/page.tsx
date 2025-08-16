'use client';

import { useState } from 'react';
import { DynamicCodeExample } from '../../../components/shared/CodeGenerator';

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
    // Electronics (12 items)
    { id: 1, name: 'Wireless Headphones', category: 'electronics', price: '$199.99', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop' },
    { id: 2, name: 'Bluetooth Speaker', category: 'electronics', price: '$89.99', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop' },
    { id: 3, name: 'Smart Watch', category: 'electronics', price: '$299.99', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop' },
    { id: 4, name: 'Laptop', category: 'electronics', price: '$899.99', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop' },
    { id: 5, name: 'Smartphone', category: 'electronics', price: '$699.99', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop' },
    { id: 6, name: 'Tablet', category: 'electronics', price: '$399.99', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop' },
    { id: 7, name: 'Gaming Console', category: 'electronics', price: '$499.99', image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=300&h=200&fit=crop' },
    { id: 8, name: 'Camera', category: 'electronics', price: '$599.99', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=200&fit=crop' },
    { id: 9, name: 'Microphone', category: 'electronics', price: '$149.99', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=200&fit=crop' },
    { id: 10, name: 'Keyboard', category: 'electronics', price: '$129.99', image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop' },
    { id: 11, name: 'Mouse', category: 'electronics', price: '$79.99', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop' },
    { id: 12, name: 'Monitor', category: 'electronics', price: '$249.99', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=200&fit=crop' },
    
    // Clothing (8 items)
    { id: 13, name: 'Cotton T-Shirt', category: 'clothing', price: '$29.99', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop' },
    { id: 14, name: 'Denim Jeans', category: 'clothing', price: '$69.99', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=200&fit=crop' },
    { id: 15, name: 'Sneakers', category: 'clothing', price: '$89.99', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop' },
    { id: 16, name: 'Hoodie', category: 'clothing', price: '$49.99', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=200&fit=crop' },
    { id: 17, name: 'Dress', category: 'clothing', price: '$79.99', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=200&fit=crop' },
    { id: 18, name: 'Jacket', category: 'clothing', price: '$119.99', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=200&fit=crop' },
    { id: 19, name: 'Socks', category: 'clothing', price: '$9.99', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop' },
    { id: 20, name: 'Hat', category: 'clothing', price: '$19.99', image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=300&h=200&fit=crop' },
    
    // Books (15 items)
    { id: 21, name: 'JavaScript Guide', category: 'books', price: '$39.99', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=200&fit=crop' },
    { id: 22, name: 'React Cookbook', category: 'books', price: '$45.99', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=200&fit=crop' },
    { id: 23, name: 'Python Basics', category: 'books', price: '$34.99', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=200&fit=crop' },
    { id: 24, name: 'Design Patterns', category: 'books', price: '$49.99', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop' },
    { id: 25, name: 'Clean Code', category: 'books', price: '$42.99', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop' },
    { id: 26, name: 'Data Science', category: 'books', price: '$54.99', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop' },
    { id: 27, name: 'Machine Learning', category: 'books', price: '$59.99', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop' },
    { id: 28, name: 'Web Development', category: 'books', price: '$44.99', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop' },
    { id: 29, name: 'Mobile Apps', category: 'books', price: '$47.99', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop' },
    { id: 30, name: 'Database Design', category: 'books', price: '$41.99', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=300&h=200&fit=crop' },
    { id: 31, name: 'API Development', category: 'books', price: '$43.99', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop' },
    { id: 32, name: 'Testing Strategies', category: 'books', price: '$38.99', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop' },
    { id: 33, name: 'DevOps Guide', category: 'books', price: '$46.99', image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=300&h=200&fit=crop' },
    { id: 34, name: 'Security Best Practices', category: 'books', price: '$51.99', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop' },
    { id: 35, name: 'Performance Optimization', category: 'books', price: '$40.99', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop' },
    
    // Home & Garden (7 items)
    { id: 36, name: 'Garden Tools Set', category: 'home', price: '$79.99', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300&h=200&fit=crop' },
    { id: 37, name: 'Coffee Maker', category: 'home', price: '$129.99', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop' },
    { id: 38, name: 'Plant Pot', category: 'home', price: '$24.99', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop' },
    { id: 39, name: 'Desk Lamp', category: 'home', price: '$59.99', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=200&fit=crop' },
    { id: 40, name: 'Throw Pillow', category: 'home', price: '$19.99', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=300&h=200&fit=crop' },
    { id: 41, name: 'Wall Clock', category: 'home', price: '$34.99', image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=300&h=200&fit=crop' },
    { id: 42, name: 'Candle Holder', category: 'home', price: '$14.99', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop' }
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
          🏷️ Categorization Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Organize and filter content by categories with visual indicators and dynamic filtering capabilities.
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
              <DynamicCodeExample 
                componentName="categorization" 
                activeTab={activeTab} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <h2 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">
            ✨ Key Features
          </h2>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>• <strong>Dynamic Filtering:</strong> Real-time filtering based on selected category</li>
            <li>• <strong>Visual Indicators:</strong> Color-coded categories for easy identification</li>
            <li>• <strong>Item Counts:</strong> Shows number of items in each category</li>
            <li>• <strong>Responsive Grid:</strong> Adapts to different screen sizes</li>
            <li>• <strong>Smooth Transitions:</strong> Animated category switching</li>
            <li>• <strong>Accessible Design:</strong> Proper ARIA labels and keyboard navigation</li>
            <li>• <strong>Empty States:</strong> Clear messaging when no items match</li>
            <li>• <strong>Performance Optimized:</strong> Efficient filtering and rendering</li>
            <li>• <strong>Dynamic Code Generation:</strong> Code example extracted from actual source files</li>
          </ul>
        </div>
      </div>

      {/* Common Use Cases */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <h2 className="text-xl font-semibold mb-4 text-purple-800 dark:text-purple-200">
            🎯 Common Use Cases
          </h2>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>• <strong>E-commerce Stores:</strong> Filter products by category</li>
            <li>• <strong>Blog Platforms:</strong> Organize articles by topic</li>
            <li>• <strong>Portfolio Websites:</strong> Showcase work by project type</li>
            <li>• <strong>Recipe Apps:</strong> Filter recipes by cuisine or meal type</li>
            <li>• <strong>Job Boards:</strong> Filter job listings by industry</li>
            <li>• <strong>Music Libraries:</strong> Organize songs by genre</li>
            <li>• <strong>Document Management:</strong> Categorize files by type</li>
            <li>• <strong>Social Media:</strong> Filter posts by content type</li>
          </ul>
        </div>
      </div>
    </div>
  );
}