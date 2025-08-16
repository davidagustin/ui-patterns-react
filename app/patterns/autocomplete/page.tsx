'use client';

import { useState, useEffect, useRef } from 'react';
import { DynamicCodeExample } from '../../../components/shared/CodeGenerator';

export default function AutocompletePattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
    'Japan', 'Australia', 'Brazil', 'India', 'China', 'Mexico',
    'Italy', 'Spain', 'Netherlands', 'Switzerland', 'Sweden',
    'Norway', 'Denmark', 'Finland', 'Poland', 'Russia', 'South Korea'
  ];

  useEffect(() => {
    if (query.trim()) {
      const filtered = countries.filter(country =>
        country.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setIsOpen(filtered.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          setQuery(suggestions[selectedIndex]);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  const handleInputBlur = () => {
    // Delay closing to allow for clicks on suggestions
    setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🔍 Autocomplete Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Provide real-time suggestions as users type, helping them find options quickly and reducing input errors.
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
              Start typing a country name to see autocomplete suggestions. Use arrow keys to navigate and Enter to select.
            </p>
            
            <div className="relative">
              <label htmlFor="country-input" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Select Country
              </label>
              <input
                ref={inputRef}
                id="country-input"
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder="Type to search countries..."
                className="input-field w-full"
                autoComplete="off"
              />
              
              {isOpen && suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        index === selectedIndex 
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' 
                          : 'text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Keyboard Shortcuts</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">↑↓</kbd> Navigate suggestions</div>
                <div>• <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Enter</kbd> Select highlighted suggestion</div>
                <div>• <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Escape</kbd> Close suggestions</div>
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
                componentName="autocomplete" 
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Real-time Filtering</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Instant suggestions as user types</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Keyboard Navigation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Arrow keys, Enter, and Escape support</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Feedback</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Highlighted selection and hover states</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Accessibility</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Screen reader support and ARIA labels</p>
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
            <div className="text-2xl mb-2">🌍</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Country Selection</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Quick country lookup in forms and settings</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🔍</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Search Suggestions</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Product search with instant results</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">👤</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">User Selection</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tagging users in comments or mentions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
