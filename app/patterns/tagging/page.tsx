'use client';

import { useState } from 'react';

export default function TaggingPattern() {
  const [tags, setTags] = useState<string[]>(['React', 'JavaScript', 'Web Development']);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  const predefinedTags = [
    'React', 'Vue', 'Angular', 'JavaScript', 'TypeScript', 'CSS', 'HTML',
    'Node.js', 'Python', 'Web Development', 'Mobile', 'Design', 'UX/UI',
    'Backend', 'Frontend', 'API', 'Database', 'Performance', 'Accessibility'
  ];

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
    }
    setInputValue('');
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      addTag(inputValue);
    }
  };

  const availableTags = predefinedTags.filter(tag => !tags.includes(tag));

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🏷️ Tagging Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Allow users to add labels and categories to content for better organization and discovery.
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
              Add, remove, and manage tags. Type custom tags or select from predefined options.
            </p>
            
            {/* Tag Input */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 min-h-[40px] p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={tags.length === 0 ? "Add tags..." : ""}
                  className="flex-1 min-w-[120px] outline-none bg-transparent text-sm"
                />
              </div>
              
              {/* Suggested Tags */}
              {availableTags.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Suggested tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.slice(0, 8).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => addTag(tag)}
                        className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Tag Statistics */}
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{tags.length} tags selected</span>
                {tags.length > 0 && (
                  <button
                    onClick={() => setTags([])}
                    className="text-red-600 dark:text-red-400 hover:underline"
                  >
                    Clear all
                  </button>
                )}
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

export default function TaggingPattern() {
  const [tags, setTags] = useState<string[]>(['React', 'JavaScript']);
  const [inputValue, setInputValue] = useState('');

  const predefinedTags = [
    'React', 'Vue', 'Angular', 'JavaScript', 'TypeScript', 'CSS',
    'HTML', 'Node.js', 'Python', 'Web Development', 'Mobile'
  ];

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
    }
    setInputValue('');
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      addTag(inputValue);
    }
  };

  const availableTags = predefinedTags.filter(tag => !tags.includes(tag));

  return (
    <div className="tagging-container">
      {/* Tag Input */}
      <div className="tag-input-container">
        <div className="tag-input">
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="tag-remove"
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={tags.length === 0 ? "Add tags..." : ""}
            className="tag-input-field"
          />
        </div>
        
        {/* Suggested Tags */}
        {availableTags.length > 0 && (
          <div className="suggested-tags">
            <p className="suggested-label">Suggested tags:</p>
            <div className="suggested-list">
              {availableTags.slice(0, 8).map((tag) => (
                <button
                  key={tag}
                  onClick={() => addTag(tag)}
                  className="suggested-tag"
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Tag Statistics */}
        <div className="tag-stats">
          <span className="tag-count">{tags.length} tags selected</span>
          {tags.length > 0 && (
            <button
              onClick={() => setTags([])}
              className="clear-tags"
            >
              Clear all
            </button>
          )}
        </div>
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Tagging Container */
.tagging-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

/* Tag Input Container */
.tag-input-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Tag Input */
.tag-input {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-height: 2.5rem;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: white;
  transition: border-color 0.2s ease;
}

.tag-input:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Individual Tags */
.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  background: #eff6ff;
  color: #1e40af;
  border-radius: 9999px;
  transition: all 0.2s ease;
}

.tag:hover {
  background: #dbeafe;
}

/* Tag Remove Button */
.tag-remove {
  margin-left: 0.25rem;
  color: #3b82f6;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  transition: color 0.2s ease;
}

.tag-remove:hover {
  color: #1e40af;
}

/* Tag Input Field */
.tag-input-field {
  flex: 1;
  min-width: 7.5rem;
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.875rem;
}

.tag-input-field::placeholder {
  color: #9ca3af;
}

/* Suggested Tags */
.suggested-tags {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.suggested-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.suggested-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.suggested-tag {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 9999px;
  background: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
}

.suggested-tag:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.suggested-tag:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Tag Statistics */
.tag-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.tag-count {
  font-weight: 500;
}

.clear-tags {
  color: #dc2626;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s ease;
}

.clear-tags:hover {
  color: #b91c1c;
}

/* Responsive Design */
@media (max-width: 640px) {
  .tagging-container {
    padding: 1rem;
  }
  
  .tag-input {
    padding: 0.5rem;
  }
  
  .tag-input-field {
    min-width: 5rem;
  }
  
  .tag-stats {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .tag-input {
    background: #1f2937;
    border-color: #374151;
  }
  
  .tag-input:focus-within {
    border-color: #60a5fa;
  }
  
  .tag {
    background: #1e3a8a;
    color: #93c5fd;
  }
  
  .tag:hover {
    background: #1e40af;
  }
  
  .tag-remove {
    color: #60a5fa;
  }
  
  .tag-remove:hover {
    color: #93c5fd;
  }
  
  .tag-input-field {
    color: #f9fafb;
  }
  
  .tag-input-field::placeholder {
    color: #6b7280;
  }
  
  .suggested-label {
    color: #9ca3af;
  }
  
  .suggested-tag {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
  
  .suggested-tag:hover {
    background: #4b5563;
  }
  
  .tag-stats {
    color: #9ca3af;
  }
  
  .clear-tags {
    color: #f87171;
  }
  
  .clear-tags:hover {
    color: #fca5a5;
  }
}

/* Animation */
.tag {
  animation: tagAppear 0.2s ease;
}

@keyframes tagAppear {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Focus Management */
.tag-input-field:focus {
  outline: none;
}

.suggested-tag:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Accessibility */
.tag-remove {
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tag-remove:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 1px;
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .tag {
    border: 2px solid #1e40af;
  }
  
  .suggested-tag {
    border-width: 2px;
  }
  
  .tag-input {
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Dynamic Tag Input</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Add custom tags by typing and pressing Enter</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Suggested Tags</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Predefined tags for quick selection</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Easy Removal</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Click × to remove individual tags</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Duplicate Prevention</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Prevents adding duplicate tags</p>
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
            <div className="text-2xl mb-2">📝</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Content Management</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tag blog posts, articles, and documents</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Data Organization</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Categorize datasets and records</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🎨</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Creative Projects</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tag designs, photos, and creative assets</p>
          </div>
        </div>
      </div>
    </div>
  );
}