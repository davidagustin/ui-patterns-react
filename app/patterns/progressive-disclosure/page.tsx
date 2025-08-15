'use client';

import { useState } from 'react';

interface DisclosureItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  level: 'basic' | 'intermediate' | 'advanced';
}

export default function ProgressiveDisclosurePattern() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [filterLevel, setFilterLevel] = useState<'all' | 'basic' | 'intermediate' | 'advanced'>('all');
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  const disclosureItems: DisclosureItem[] = [
    {
      id: 'getting-started',
      title: 'Getting Started with React',
      summary: 'Learn the basics of React development',
      content: 'React is a JavaScript library for building user interfaces. Start by creating a new project using Create React App or Next.js. Learn about components, JSX, and state management.',
      level: 'basic'
    },
    {
      id: 'components',
      title: 'Component Architecture',
      summary: 'Understanding component patterns and best practices',
      content: 'Components are the building blocks of React applications. Learn about functional components, class components, props, state, and lifecycle methods. Understand component composition and reusability.',
      level: 'intermediate'
    },
    {
      id: 'hooks',
      title: 'React Hooks Deep Dive',
      summary: 'Master modern React with hooks',
      content: 'Hooks allow you to use state and other React features in functional components. Learn about useState, useEffect, useContext, useReducer, and custom hooks. Understand the rules of hooks and best practices.',
      level: 'intermediate'
    },
    {
      id: 'performance',
      title: 'Performance Optimization',
      summary: 'Techniques for optimizing React applications',
      content: 'Learn about React.memo, useMemo, useCallback, and other optimization techniques. Understand virtual DOM, reconciliation, and when to optimize. Profile your application and identify bottlenecks.',
      level: 'advanced'
    },
    {
      id: 'testing',
      title: 'Testing React Applications',
      summary: 'Comprehensive testing strategies',
      content: 'Write unit tests with Jest and React Testing Library. Learn about integration tests, end-to-end tests, and testing best practices. Understand mocking, test utilities, and testing patterns.',
      level: 'advanced'
    },
    {
      id: 'deployment',
      title: 'Deployment and CI/CD',
      summary: 'Deploy your React application',
      content: 'Learn about build optimization, environment variables, and deployment strategies. Set up continuous integration and deployment pipelines. Understand hosting options and performance monitoring.',
      level: 'intermediate'
    }
  ];

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'basic':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'basic':
        return '🌱';
      case 'intermediate':
        return '🚀';
      case 'advanced':
        return '⚡';
      default:
        return '📚';
    }
  };

  const filteredItems = disclosureItems.filter(item => 
    filterLevel === 'all' || item.level === filterLevel
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📖 Progressive Disclosure Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Reveal information gradually to avoid overwhelming users, showing basic content first and allowing them to explore deeper details.
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
              Click on items to expand and see more details. Use the filter to show content by difficulty level.
            </p>
            
            {/* Filter Controls */}
            <div className="flex flex-wrap gap-2 mb-4">
              {(['all', 'basic', 'intermediate', 'advanced'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setFilterLevel(level)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filterLevel === level
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {level === 'all' ? 'All Levels' : 
                   level === 'basic' ? '🌱 Basic' :
                   level === 'intermediate' ? '🚀 Intermediate' : '⚡ Advanced'}
                </button>
              ))}
            </div>

            {/* Disclosure Items */}
            <div className="space-y-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{getLevelIcon(item.level)}</span>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                            {item.title}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {item.summary}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(item.level)}`}>
                          {item.level}
                        </span>
                        <span className={`transform transition-transform ${expandedItems.has(item.id) ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </div>
                    </div>
                  </button>
                  
                  {expandedItems.has(item.id) && (
                    <div className="px-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                        {item.content}
                      </p>
                      <div className="mt-3 flex items-center space-x-2">
                        <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                          Learn More →
                        </button>
                        <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                          Add to Favorites
                        </button>
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

interface DisclosureItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  level: 'basic' | 'intermediate' | 'advanced';
}

export default function ProgressiveDisclosurePattern() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [filterLevel, setFilterLevel] = useState<'all' | 'basic' | 'intermediate' | 'advanced'>('all');

  const disclosureItems: DisclosureItem[] = [
    {
      id: 'getting-started',
      title: 'Getting Started with React',
      summary: 'Learn the basics of React development',
      content: 'React is a JavaScript library for building user interfaces...',
      level: 'basic'
    },
    {
      id: 'components',
      title: 'Component Architecture',
      summary: 'Understanding component patterns and best practices',
      content: 'Components are the building blocks of React applications...',
      level: 'intermediate'
    }
    // ... more items
  ];

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'basic':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'basic': return '🌱';
      case 'intermediate': return '🚀';
      case 'advanced': return '⚡';
      default: return '📚';
    }
  };

  const filteredItems = disclosureItems.filter(item => 
    filterLevel === 'all' || item.level === filterLevel
  );

  return (
    <div className="progressive-disclosure-container">
      {/* Filter Controls */}
      <div className="filter-controls">
        {(['all', 'basic', 'intermediate', 'advanced'] as const).map((level) => (
          <button
            key={level}
            onClick={() => setFilterLevel(level)}
            className={\`filter-button \${filterLevel === level ? 'active' : ''}\`}
          >
            {level === 'all' ? 'All Levels' : 
             level === 'basic' ? '🌱 Basic' :
             level === 'intermediate' ? '🚀 Intermediate' : '⚡ Advanced'}
          </button>
        ))}
      </div>

      {/* Disclosure Items */}
      <div className="disclosure-items">
        {filteredItems.map((item) => (
          <div key={item.id} className="disclosure-item">
            <button
              onClick={() => toggleItem(item.id)}
              className="disclosure-header"
            >
              <div className="disclosure-header-content">
                <span className="level-icon">{getLevelIcon(item.level)}</span>
                <div className="disclosure-info">
                  <h3 className="disclosure-title">{item.title}</h3>
                  <p className="disclosure-summary">{item.summary}</p>
                </div>
              </div>
              <div className="disclosure-meta">
                <span className={\`level-badge \${getLevelColor(item.level)}\`}>
                  {item.level}
                </span>
                <span className={\`expand-icon \${expandedItems.has(item.id) ? 'expanded' : ''}\`}>
                  ▼
                </span>
              </div>
            </button>
            
            {expandedItems.has(item.id) && (
              <div className="disclosure-content">
                <p className="disclosure-text">{item.content}</p>
                <div className="disclosure-actions">
                  <button className="action-button primary">Learn More →</button>
                  <button className="action-button secondary">Add to Favorites</button>
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
{`/* Progressive Disclosure Container */
.progressive-disclosure-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

/* Filter Controls */
.filter-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.filter-button {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #e5e7eb;
  color: #374151;
}

.filter-button:hover {
  background: #d1d5db;
}

.filter-button.active {
  background: #3b82f6;
  color: white;
}

/* Disclosure Items */
.disclosure-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.disclosure-item {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.2s ease;
}

.disclosure-item:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Disclosure Header */
.disclosure-header {
  width: 100%;
  padding: 1rem;
  text-align: left;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.disclosure-header:hover {
  background: #f9fafb;
}

.disclosure-header:focus {
  outline: 2px solid #3b82f6;
  outline-offset: -2px;
}

.disclosure-header-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.level-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.disclosure-info {
  flex: 1;
  min-width: 0;
}

.disclosure-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
  margin: 0;
  line-height: 1.25;
}

.disclosure-summary {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0.25rem 0 0 0;
  line-height: 1.33;
}

.disclosure-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.level-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 500;
  text-transform: capitalize;
}

.expand-icon {
  font-size: 0.75rem;
  color: #6b7280;
  transition: transform 0.2s ease;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

/* Disclosure Content */
.disclosure-content {
  padding: 0 1rem 1rem;
  border-top: 1px solid #e5e7eb;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 500px;
  }
}

.disclosure-text {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
  margin: 0.75rem 0;
}

.disclosure-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.action-button {
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button.primary {
  background: transparent;
  color: #3b82f6;
}

.action-button.primary:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.action-button.secondary {
  background: transparent;
  color: #6b7280;
}

.action-button.secondary:hover {
  color: #374151;
}

/* Level Colors */
.level-badge.bg-green-100 {
  background: #dcfce7;
  color: #166534;
}

.level-badge.bg-yellow-100 {
  background: #fef3c7;
  color: #92400e;
}

.level-badge.bg-red-100 {
  background: #fee2e2;
  color: #991b1b;
}

.level-badge.bg-gray-100 {
  background: #f3f4f6;
  color: #374151;
}

/* Responsive Design */
@media (max-width: 768px) {
  .progressive-disclosure-container {
    padding: 0.5rem;
  }
  
  .disclosure-header {
    padding: 0.75rem;
  }
  
  .disclosure-header-content {
    gap: 0.5rem;
  }
  
  .disclosure-meta {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .disclosure-content {
    padding: 0 0.75rem 0.75rem;
  }
  
  .disclosure-actions {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .filter-controls {
    justify-content: center;
  }
  
  .disclosure-header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .level-icon {
    align-self: flex-start;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .disclosure-item {
    background: #1f2937;
    border-color: #374151;
  }
  
  .disclosure-header:hover {
    background: #374151;
  }
  
  .disclosure-title {
    color: #f9fafb;
  }
  
  .disclosure-summary,
  .disclosure-text {
    color: #9ca3af;
  }
  
  .expand-icon {
    color: #9ca3af;
  }
  
  .disclosure-content {
    border-color: #374151;
  }
  
  .filter-button {
    background: #374151;
    color: #d1d5db;
  }
  
  .filter-button:hover {
    background: #4b5563;
  }
  
  .filter-button.active {
    background: #3b82f6;
    color: white;
  }
  
  .action-button.secondary {
    color: #9ca3af;
  }
  
  .action-button.secondary:hover {
    color: #d1d5db;
  }
}

/* Accessibility */
.disclosure-header:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: -2px;
}

.action-button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .disclosure-item {
    border-width: 2px;
  }
  
  .disclosure-content {
    border-top-width: 2px;
  }
  
  .filter-button {
    border: 1px solid currentColor;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .expand-icon {
    transition: none;
  }
  
  .disclosure-content {
    animation: none;
  }
  
  .disclosure-item {
    transition: none;
  }
  
  .filter-button {
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Gradual Information Reveal</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Show basic info first, details on demand</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Level-based Filtering</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Filter content by difficulty or complexity</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Smooth Animations</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Animated expand/collapse transitions</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Accessible Design</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Keyboard navigation and screen reader support</p>
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
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Documentation</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">API docs, tutorials, and help sections</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚙️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Settings Panels</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Advanced options and configuration</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🎓</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Learning Platforms</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Course content and educational materials</p>
          </div>
        </div>
      </div>
    </div>
  );
}
