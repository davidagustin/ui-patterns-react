'use client';

import { useState } from 'react';
import { DynamicCodeExample } from '../../../components/shared/CodeGenerator';
import Tooltip from '../../../components/Tooltip';

export default function TaggingPattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [tags, setTags] = useState<string[]>(['React', 'JavaScript', 'Web Development']);
  const [inputValue, setInputValue] = useState('');

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
                    <Tooltip content={`Remove tag: ${tag}`}>
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
                        aria-label={`Remove tag ${tag}`}
                      >
                        ×
                      </button>
                    </Tooltip>
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

            {/* Tab Content */}
            <div className="code-block">
              {
                <DynamicCodeExample 
                componentName="tagging" 
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