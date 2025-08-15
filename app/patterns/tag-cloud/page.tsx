'use client';

import { useState } from 'react';

export default function TagCloudPattern() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  const tags = [
    { name: 'JavaScript', count: 156, weight: 'high' },
    { name: 'React', count: 142, weight: 'high' },
    { name: 'TypeScript', count: 89, weight: 'medium' },
    { name: 'CSS', count: 127, weight: 'high' },
    { name: 'HTML', count: 134, weight: 'high' },
    { name: 'Node.js', count: 73, weight: 'medium' },
    { name: 'Vue', count: 45, weight: 'low' },
    { name: 'Angular', count: 38, weight: 'low' },
    { name: 'Python', count: 92, weight: 'medium' },
    { name: 'Web Development', count: 167, weight: 'high' },
    { name: 'Frontend', count: 98, weight: 'medium' },
    { name: 'Backend', count: 67, weight: 'medium' },
    { name: 'API', count: 52, weight: 'low' },
    { name: 'Database', count: 43, weight: 'low' },
    { name: 'Performance', count: 36, weight: 'low' },
    { name: 'Accessibility', count: 29, weight: 'low' },
    { name: 'Testing', count: 48, weight: 'low' },
    { name: 'DevOps', count: 33, weight: 'low' },
    { name: 'Mobile', count: 41, weight: 'low' },
    { name: 'Design', count: 76, weight: 'medium' },
    { name: 'UX/UI', count: 64, weight: 'medium' },
    { name: 'GraphQL', count: 27, weight: 'low' },
    { name: 'REST', count: 39, weight: 'low' },
    { name: 'Docker', count: 31, weight: 'low' }
  ];

  const getTagSize = (weight: string) => {
    switch (weight) {
      case 'high':
        return 'text-2xl';
      case 'medium':
        return 'text-lg';
      case 'low':
        return 'text-sm';
      default:
        return 'text-base';
    }
  };

  const getTagColor = (isSelected: boolean) => {
    if (isSelected) {
      return 'text-blue-600 dark:text-blue-400';
    }
    return 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400';
  };

  const shuffledTags = [...tags].sort(() => Math.random() - 0.5);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ☁️ Tag Cloud Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Display tags in a visual cloud format where size represents popularity or frequency of use.
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
              Click on any tag to select it. Tag size reflects popularity - larger tags are more popular.
            </p>
            
            {/* Tag Cloud */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 min-h-[300px]">
              <div className="flex flex-wrap justify-center items-center gap-3 leading-relaxed">
                {shuffledTags.map((tag) => (
                  <button
                    key={tag.name}
                    onClick={() => setSelectedTag(selectedTag === tag.name ? null : tag.name)}
                    className={`font-medium transition-all duration-200 hover:scale-110 ${getTagSize(tag.weight)} ${getTagColor(selectedTag === tag.name)}`}
                    title={`${tag.name} - ${tag.count} items`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Tag Info */}
            {selectedTag && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                      Selected: {selectedTag}
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-200">
                      {tags.find(t => t.name === selectedTag)?.count} related items
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-medium">Large</span>
                <span>= High popularity</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-medium">Medium</span>
                <span>= Medium popularity</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Small</span>
                <span>= Low popularity</span>
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
{`import { useState } from 'react';

export default function TagCloudPattern() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = [
    { name: 'JavaScript', count: 156, weight: 'high' },
    { name: 'React', count: 142, weight: 'high' },
    { name: 'TypeScript', count: 89, weight: 'medium' },
    { name: 'CSS', count: 127, weight: 'high' },
    { name: 'HTML', count: 134, weight: 'high' },
    { name: 'Node.js', count: 73, weight: 'medium' },
    { name: 'Vue', count: 45, weight: 'low' },
    { name: 'Angular', count: 38, weight: 'low' },
    { name: 'Python', count: 92, weight: 'medium' },
    { name: 'Web Development', count: 167, weight: 'high' }
    // ... more tags
  ];

  const getTagSize = (weight: string) => {
    switch (weight) {
      case 'high':
        return 'text-2xl';
      case 'medium':
        return 'text-lg';
      case 'low':
        return 'text-sm';
      default:
        return 'text-base';
    }
  };

  const getTagColor = (isSelected: boolean) => {
    if (isSelected) {
      return 'text-blue-600';
    }
    return 'text-gray-600 hover:text-blue-600';
  };

  // Shuffle tags for visual variety
  const shuffledTags = [...tags].sort(() => Math.random() - 0.5);

  return (
    <div className="tag-cloud-container">
      {/* Tag Cloud */}
      <div className="tag-cloud">
        <div className="tag-cloud-inner">
          {shuffledTags.map((tag) => (
            <button
              key={tag.name}
              onClick={() => setSelectedTag(selectedTag === tag.name ? null : tag.name)}
              className={\`tag-item \${getTagSize(tag.weight)} \${getTagColor(selectedTag === tag.name)}\`}
              title={\`\${tag.name} - \${tag.count} items\`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Tag Info */}
      {selectedTag && (
        <div className="selected-tag-info">
          <div className="selected-tag-content">
            <div>
              <h3 className="selected-tag-title">
                Selected: {selectedTag}
              </h3>
              <p className="selected-tag-count">
                {tags.find(t => t.name === selectedTag)?.count} related items
              </p>
            </div>
            <button
              onClick={() => setSelectedTag(null)}
              className="selected-tag-close"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="tag-legend">
        <div className="legend-item">
          <span className="legend-example large">Large</span>
          <span>= High popularity</span>
        </div>
        <div className="legend-item">
          <span className="legend-example medium">Medium</span>
          <span>= Medium popularity</span>
        </div>
        <div className="legend-item">
          <span className="legend-example small">Small</span>
          <span>= Low popularity</span>
        </div>
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Tag Cloud Container */
.tag-cloud-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

/* Tag Cloud */
.tag-cloud {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 2rem;
  min-height: 18.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tag-cloud-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  line-height: 1.6;
}

/* Tag Items */
.tag-item {
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.tag-item:hover {
  transform: scale(1.1);
  background: rgba(59, 130, 246, 0.1);
}

.tag-item:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

/* Tag Sizes */
.tag-item.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.tag-item.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.tag-item.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

/* Tag Colors */
.tag-item.text-gray-600 {
  color: #4b5563;
}

.tag-item.text-gray-600:hover {
  color: #3b82f6;
}

.tag-item.text-blue-600 {
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

/* Selected Tag Info */
.selected-tag-info {
  margin-top: 1rem;
  padding: 1rem;
  background: #eff6ff;
  border: 1px solid #dbeafe;
  border-radius: 0.5rem;
}

.selected-tag-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.selected-tag-title {
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 0.25rem;
}

.selected-tag-count {
  font-size: 0.875rem;
  color: #1d4ed8;
}

.selected-tag-close {
  color: #3b82f6;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.25rem;
  transition: color 0.2s ease;
}

.selected-tag-close:hover {
  color: #1d4ed8;
}

/* Legend */
.tag-legend {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-example {
  font-weight: 500;
}

.legend-example.large {
  font-size: 1.5rem;
}

.legend-example.medium {
  font-size: 1.125rem;
}

.legend-example.small {
  font-size: 0.875rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .tag-cloud-container {
    padding: 1rem;
  }
  
  .tag-cloud {
    padding: 1rem;
    min-height: 12rem;
  }
  
  .tag-cloud-inner {
    gap: 0.5rem;
  }
  
  .tag-item.text-2xl {
    font-size: 1.25rem;
  }
  
  .tag-item.text-lg {
    font-size: 1rem;
  }
  
  .tag-legend {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
  
  .selected-tag-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .selected-tag-close {
    align-self: flex-end;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .tag-cloud {
    background: #1f2937;
    border-color: #374151;
  }
  
  .tag-item.text-gray-600 {
    color: #9ca3af;
  }
  
  .tag-item.text-gray-600:hover {
    color: #60a5fa;
  }
  
  .tag-item.text-blue-600 {
    color: #60a5fa;
    background: rgba(96, 165, 250, 0.1);
  }
  
  .tag-item:hover {
    background: rgba(96, 165, 250, 0.1);
  }
  
  .selected-tag-info {
    background: #1e3a8a;
    border-color: #1e40af;
  }
  
  .selected-tag-title {
    color: #93c5fd;
  }
  
  .selected-tag-count {
    color: #bfdbfe;
  }
  
  .selected-tag-close {
    color: #60a5fa;
  }
  
  .selected-tag-close:hover {
    color: #93c5fd;
  }
  
  .tag-legend {
    color: #9ca3af;
  }
}

/* Animation */
.tag-item {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.selected-tag-info {
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Focus Management */
.tag-item:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Accessibility */
.tag-item[aria-pressed="true"] {
  background: #3b82f6;
  color: white;
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .tag-item {
    border: 1px solid currentColor;
  }
  
  .tag-cloud {
    border-width: 2px;
  }
  
  .selected-tag-info {
    border-width: 2px;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .tag-item {
    transition: none;
    animation: none;
  }
  
  .tag-item:hover {
    transform: none;
  }
  
  .selected-tag-info {
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Weight</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tag size reflects popularity or frequency</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Interactive Selection</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Click tags to view related content</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Random Layout</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Shuffled positioning for visual variety</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Hover Effects</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Engaging animations and scale effects</p>
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
            <div className="text-2xl mb-2">🔍</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Content Discovery</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Help users discover popular topics and content</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Data Visualization</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Visualize keyword frequency and trends</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🏷️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Tag Systems</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Display and navigate content tags</p>
          </div>
        </div>
      </div>
    </div>
  );
}