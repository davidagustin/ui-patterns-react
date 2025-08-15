'use client';

import { useState } from 'react';

export default function JumpingHierarchyPattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [selectedLevel, setSelectedLevel] = useState(3);

  const hierarchyLevels = [
    { level: 1, label: 'Root', path: 'Home', icon: '🏠', color: 'bg-blue-100 text-blue-800' },
    { level: 2, label: 'Category', path: 'Home > Products', icon: '📦', color: 'bg-green-100 text-green-800' },
    { level: 3, label: 'Subcategory', path: 'Home > Products > Electronics', icon: '💻', color: 'bg-purple-100 text-purple-800' },
    { level: 4, label: 'Product Type', path: 'Home > Products > Electronics > Laptops', icon: '💻', color: 'bg-orange-100 text-orange-800' },
    { level: 5, label: 'Product', path: 'Home > Products > Electronics > Laptops > MacBook Pro', icon: '🍎', color: 'bg-red-100 text-red-800' },
  ];

  const organizationLevels = [
    { level: 1, label: 'Company', path: 'Acme Corp', icon: '🏢', color: 'bg-blue-100 text-blue-800' },
    { level: 2, label: 'Department', path: 'Acme Corp > Engineering', icon: '⚙️', color: 'bg-green-100 text-green-800' },
    { level: 3, label: 'Team', path: 'Acme Corp > Engineering > Frontend', icon: '👥', color: 'bg-purple-100 text-purple-800' },
    { level: 4, label: 'Project', path: 'Acme Corp > Engineering > Frontend > UI Components', icon: '🎨', color: 'bg-orange-100 text-orange-800' },
    { level: 5, label: 'Task', path: 'Acme Corp > Engineering > Frontend > UI Components > Button Design', icon: '✅', color: 'bg-red-100 text-red-800' },
  ];

  const handleJumpToLevel = (level: number) => {
    setSelectedLevel(level);
    console.log(`Jumping to level ${level}: ${hierarchyLevels[level - 1].label}`);
  };

  const renderJumpingControls = (levels: any[], title: string) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">{title}</h3>
      
      {/* Hierarchy Visualization */}
      <div className="space-y-3 mb-6">
        {levels.map((level, index) => (
          <div key={level.level} className="flex items-center space-x-3">
            <button
              onClick={() => handleJumpToLevel(level.level)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                selectedLevel === level.level
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 ring-2 ring-blue-500'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              <span className="text-lg">{level.icon}</span>
              <span className="font-medium">{level.label}</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${level.color} dark:bg-opacity-20`}>
                Level {level.level}
              </span>
            </button>
            <div className="flex-1 text-sm text-gray-500 dark:text-gray-400">
              {level.path}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Jump Buttons */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400 self-center mr-2">Quick Jump:</span>
        {levels.map((level) => (
          <button
            key={`quick-${level.level}`}
            onClick={() => handleJumpToLevel(level.level)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedLevel === level.level
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {level.label}
          </button>
        ))}
      </div>

      {/* Current Level Info */}
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{levels[selectedLevel - 1].icon}</span>
          <div>
            <div className="font-medium text-gray-800 dark:text-gray-200">
              Current: {levels[selectedLevel - 1].label}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {levels[selectedLevel - 1].path}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🎯 Jumping in Hierarchy Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Allow users to jump directly to different levels in a hierarchical structure, bypassing intermediate navigation steps for faster access.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Click on any level to jump directly to that part of the hierarchy. Notice how you can skip intermediate levels for faster navigation.
            </p>
            
            <div className="space-y-6">
              {renderJumpingControls(hierarchyLevels, "Product Hierarchy")}
              {renderJumpingControls(organizationLevels, "Organization Structure")}
            </div>

            {/* Alternative Jump Pattern - Dropdown */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Dropdown Jump Navigation</h4>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">Jump to:</span>
                <select
                  value={selectedLevel}
                  onChange={(e) => handleJumpToLevel(Number(e.target.value))}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  {hierarchyLevels.map((level) => (
                    <option key={level.level} value={level.level}>
                      {level.icon} {level.label} - {level.path.split(' > ').pop()}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleJumpToLevel(selectedLevel)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go
                </button>
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

export default function JumpingHierarchy() {
  const [selectedLevel, setSelectedLevel] = useState(3);

  const hierarchyLevels = [
    { level: 1, label: 'Root', path: 'Home', icon: '🏠' },
    { level: 2, label: 'Category', path: 'Home > Products', icon: '📦' },
    { level: 3, label: 'Subcategory', path: 'Home > Products > Electronics', icon: '💻' },
    { level: 4, label: 'Product Type', path: 'Home > Products > Electronics > Laptops', icon: '💻' },
    { level: 5, label: 'Product', path: 'Home > Products > Electronics > Laptops > MacBook Pro', icon: '🍎' },
  ];

  const handleJumpToLevel = (level: number) => {
    setSelectedLevel(level);
    // Handle navigation logic here
    console.log(\`Jumping to level \${level}\`);
  };

  return (
    <div className="hierarchy-container">
      {/* Level Navigation */}
      <div className="hierarchy-levels">
        {hierarchyLevels.map((level) => (
          <button
            key={level.level}
            onClick={() => handleJumpToLevel(level.level)}
            className={\`hierarchy-level \${selectedLevel === level.level ? 'level-active' : ''}\`}
          >
            <span className="level-icon">{level.icon}</span>
            <span className="level-label">{level.label}</span>
            <span className="level-badge">Level {level.level}</span>
          </button>
        ))}
      </div>

      {/* Quick Jump Bar */}
      <div className="quick-jump-bar">
        <span className="jump-label">Quick Jump:</span>
        {hierarchyLevels.map((level) => (
          <button
            key={\`quick-\${level.level}\`}
            onClick={() => handleJumpToLevel(level.level)}
            className={\`quick-jump-btn \${selectedLevel === level.level ? 'jump-active' : ''}\`}
          >
            {level.label}
          </button>
        ))}
      </div>

      {/* Dropdown Jump */}
      <div className="dropdown-jump">
        <label className="jump-label">Jump to:</label>
        <select
          value={selectedLevel}
          onChange={(e) => handleJumpToLevel(Number(e.target.value))}
          className="jump-select"
        >
          {hierarchyLevels.map((level) => (
            <option key={level.level} value={level.level}>
              {level.icon} {level.label}
            </option>
          ))}
        </select>
        <button 
          onClick={() => handleJumpToLevel(selectedLevel)}
          className="jump-go-btn"
        >
          Go
        </button>
      </div>

      {/* Current Level Display */}
      <div className="current-level">
        <div className="level-info">
          <span className="current-icon">
            {hierarchyLevels[selectedLevel - 1].icon}
          </span>
          <div className="current-details">
            <div className="current-label">
              Current: {hierarchyLevels[selectedLevel - 1].label}
            </div>
            <div className="current-path">
              {hierarchyLevels[selectedLevel - 1].path}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="hierarchy-content">
        <h2>Content for {hierarchyLevels[selectedLevel - 1].label}</h2>
        <p>This is the content area for level {selectedLevel}.</p>
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Hierarchy Container */
.hierarchy-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Hierarchy Levels */
.hierarchy-levels {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.hierarchy-level {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 2px solid transparent;
  border-radius: 8px;
  background: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.hierarchy-level:hover {
  background-color: #f3f4f6;
  border-color: #d1d5db;
}

.level-active {
  background-color: #eff6ff;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.level-icon {
  font-size: 1.25rem;
  line-height: 1;
}

.level-label {
  font-weight: 500;
  color: #374151;
  flex: 1;
}

.level-badge {
  padding: 0.25rem 0.5rem;
  background-color: #f3f4f6;
  color: #6b7280;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.level-active .level-badge {
  background-color: #dbeafe;
  color: #1d4ed8;
}

/* Quick Jump Bar */
.quick-jump-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
  flex-wrap: wrap;
}

.jump-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
  margin-right: 0.5rem;
}

.quick-jump-btn {
  padding: 0.375rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 9999px;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-jump-btn:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}

.jump-active {
  background-color: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.jump-active:hover {
  background-color: #2563eb;
}

/* Dropdown Jump */
.dropdown-jump {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
}

.jump-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  min-width: 200px;
}

.jump-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.jump-go-btn {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.jump-go-btn:hover {
  background-color: #2563eb;
}

/* Current Level Display */
.current-level {
  padding: 1rem;
  background-color: #f3f4f6;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.level-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.current-icon {
  font-size: 2rem;
  line-height: 1;
}

.current-label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
}

.current-path {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Hierarchy Content */
.hierarchy-content {
  padding: 2rem;
  background-color: #fafafa;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

/* Responsive Design */
@media (max-width: 640px) {
  .hierarchy-container {
    padding: 1rem;
  }
  
  .quick-jump-bar,
  .dropdown-jump {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .jump-select {
    width: 100%;
  }
  
  .hierarchy-level {
    padding: 0.5rem 0.75rem;
  }
  
  .level-icon {
    font-size: 1rem;
  }
  
  .level-label {
    font-size: 0.875rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .hierarchy-container {
    background: #1f2937;
    color: #f9fafb;
  }
  
  .hierarchy-level:hover {
    background-color: #374151;
    border-color: #4b5563;
  }
  
  .level-active {
    background-color: #1e3a8a;
    border-color: #3b82f6;
  }
  
  .level-label {
    color: #f9fafb;
  }
  
  .level-badge {
    background-color: #374151;
    color: #9ca3af;
  }
  
  .level-active .level-badge {
    background-color: #1e40af;
    color: #93c5fd;
  }
  
  .quick-jump-bar,
  .dropdown-jump {
    background-color: #374151;
  }
  
  .quick-jump-btn {
    background: #4b5563;
    border-color: #6b7280;
    color: #f9fafb;
  }
  
  .quick-jump-btn:hover {
    background-color: #6b7280;
  }
  
  .jump-select {
    background: #4b5563;
    border-color: #6b7280;
    color: #f9fafb;
  }
  
  .current-level {
    background-color: #374151;
  }
  
  .current-label {
    color: #f9fafb;
  }
  
  .hierarchy-content {
    background-color: #374151;
    border-color: #4b5563;
  }
}

/* Accessibility */
.hierarchy-level:focus,
.quick-jump-btn:focus,
.jump-select:focus,
.jump-go-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

/* Animation */
.hierarchy-content {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .hierarchy-level {
    border-width: 2px;
  }
  
  .level-active {
    border-width: 3px;
  }
  
  .quick-jump-btn,
  .jump-select {
    border-width: 2px;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Direct Level Access</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Jump to any hierarchy level without traversing intermediate steps</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Multiple Interface Options</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Buttons, quick jump bar, and dropdown selection</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Path Display</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear indication of current position and full path</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Level Identification</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Color-coded badges and icons for easy recognition</p>
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
            <div className="text-2xl mb-2">📁</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">File Systems</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Navigate deep folder structures quickly</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🏢</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Organizational Charts</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Jump between different organizational levels</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Product Categories</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Skip between category levels in e-commerce</p>
          </div>
        </div>
      </div>
    </div>
  );
}