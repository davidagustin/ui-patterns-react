'use client';

import { useState, useMemo } from 'react';
import { DynamicCodeExample } from '../../../components/shared/CodeGenerator';

interface Tag {
  id: string;
  name: string;
  count: number;
  category: 'technology' | 'design' | 'business' | 'lifestyle';
}

export default function TagCloudPattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'technology' | 'design' | 'business' | 'lifestyle'>('all');
  const [sortBy, setSortBy] = useState<'frequency' | 'alphabetical'>('frequency');

  const tags: Tag[] = [
    // Technology
    { id: '1', name: 'React', count: 1250, category: 'technology' },
    { id: '2', name: 'JavaScript', count: 980, category: 'technology' },
    { id: '3', name: 'TypeScript', count: 750, category: 'technology' },
    { id: '4', name: 'Node.js', count: 620, category: 'technology' },
    { id: '5', name: 'Python', count: 580, category: 'technology' },
    { id: '6', name: 'CSS', count: 520, category: 'technology' },
    { id: '7', name: 'HTML', count: 480, category: 'technology' },
    { id: '8', name: 'Vue.js', count: 420, category: 'technology' },
    { id: '9', name: 'Angular', count: 380, category: 'technology' },
    { id: '10', name: 'Docker', count: 320, category: 'technology' },
    
    // Design
    { id: '11', name: 'UI/UX', count: 890, category: 'design' },
    { id: '12', name: 'Figma', count: 720, category: 'design' },
    { id: '13', name: 'Sketch', count: 450, category: 'design' },
    { id: '14', name: 'Adobe XD', count: 380, category: 'design' },
    { id: '15', name: 'Prototyping', count: 340, category: 'design' },
    { id: '16', name: 'Wireframing', count: 290, category: 'design' },
    { id: '17', name: 'Typography', count: 260, category: 'design' },
    { id: '18', name: 'Color Theory', count: 220, category: 'design' },
    { id: '19', name: 'Icon Design', count: 180, category: 'design' },
    { id: '20', name: 'Illustration', count: 150, category: 'design' },
    
    // Business
    { id: '21', name: 'Startup', count: 680, category: 'business' },
    { id: '22', name: 'Marketing', count: 540, category: 'business' },
    { id: '23', name: 'Product Management', count: 420, category: 'business' },
    { id: '24', name: 'Analytics', count: 380, category: 'business' },
    { id: '25', name: 'Growth Hacking', count: 320, category: 'business' },
    { id: '26', name: 'Customer Success', count: 280, category: 'business' },
    { id: '27', name: 'Sales', count: 240, category: 'business' },
    { id: '28', name: 'Strategy', count: 200, category: 'business' },
    { id: '29', name: 'Leadership', count: 180, category: 'business' },
    { id: '30', name: 'Finance', count: 160, category: 'business' },
    
    // Lifestyle
    { id: '31', name: 'Productivity', count: 450, category: 'lifestyle' },
    { id: '32', name: 'Remote Work', count: 380, category: 'lifestyle' },
    { id: '33', name: 'Work-Life Balance', count: 320, category: 'lifestyle' },
    { id: '34', name: 'Mindfulness', count: 280, category: 'lifestyle' },
    { id: '35', name: 'Fitness', count: 240, category: 'lifestyle' },
    { id: '36', name: 'Travel', count: 200, category: 'lifestyle' },
    { id: '37', name: 'Cooking', count: 180, category: 'lifestyle' },
    { id: '38', name: 'Reading', count: 160, category: 'lifestyle' },
    { id: '39', name: 'Photography', count: 140, category: 'lifestyle' },
    { id: '40', name: 'Music', count: 120, category: 'lifestyle' }
  ];

  const filteredAndSortedTags = useMemo(() => {
    let filtered = selectedCategory === 'all' 
      ? tags 
      : tags.filter(tag => tag.category === selectedCategory);
    
    if (sortBy === 'alphabetical') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filtered = [...filtered].sort((a, b) => b.count - a.count);
    }
    
    return filtered;
  }, [selectedCategory, sortBy]);

  const getTagSize = (count: number) => {
    const maxCount = Math.max(...tags.map(t => t.count));
    const minCount = Math.min(...tags.map(t => t.count));
    const range = maxCount - minCount;
    const normalized = (count - minCount) / range;
    
    // Size range from 0.8 to 2.5
    return 0.8 + (normalized * 1.7);
  };

  const getTagColor = (category: string) => {
    switch (category) {
      case 'technology':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/40';
      case 'design':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/40';
      case 'business':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/40';
      case 'lifestyle':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/40';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-900/40';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technology':
        return '💻';
      case 'design':
        return '🎨';
      case 'business':
        return '💼';
      case 'lifestyle':
        return '🌟';
      default:
        return '🏷️';
    }
  };

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ☁️ Tag Cloud Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Visualize tag frequency with varying sizes and colors, making it easy to identify popular topics at a glance.
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
              Filter by category and sort by frequency or alphabetically. Tag sizes represent their popularity.
            </p>
            
            {/* Controls */}
            <div className="flex flex-wrap gap-3 mb-6">
              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="technology">💻 Technology</option>
                  <option value="design">🎨 Design</option>
                  <option value="business">💼 Business</option>
                  <option value="lifestyle">🌟 Lifestyle</option>
                </select>
              </div>
              
              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="frequency">By Frequency</option>
                  <option value="alphabetical">Alphabetically</option>
                </select>
              </div>
            </div>

            {/* Tag Cloud */}
            <div className="min-h-64 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2 justify-center items-center">
                {filteredAndSortedTags.map((tag) => (
                  <button
                    key={tag.id}
                    className={`px-3 py-1 rounded-full font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${getTagColor(tag.category)}`}
                    style={{
                      fontSize: `${getTagSize(tag.count)}rem`,
                      opacity: 0.7 + (getTagSize(tag.count) - 0.8) * 0.3
                    }}
                    title={`${tag.name}: ${formatCount(tag.count)} posts`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
              
              {filteredAndSortedTags.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No tags found for the selected category.
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              {(['technology', 'design', 'business', 'lifestyle'] as const).map((category) => (
                <div key={category} className="flex items-center space-x-1">
                  <span className={`w-3 h-3 rounded-full ${getTagColor(category).split(' ')[0]}`}></span>
                  <span className="text-gray-600 dark:text-gray-400 capitalize">{category}</span>
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

            {/* Tab Content */}
            <div className="code-block">
              {
                <DynamicCodeExample 
                componentName="tag-cloud" 
                activeTab={activeTab} 
              />
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
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Dynamic Sizing</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tag size reflects frequency or importance</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Category Filtering</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Filter tags by different categories</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Interactive Elements</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hover effects and click interactions</p>
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
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Analytics Dashboards</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Visualize popular topics and trends</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🏷️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Content Discovery</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Help users find related content</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🔍</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Search Interfaces</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Show popular search terms</p>
          </div>
        </div>
      </div>
    </div>
  );
}