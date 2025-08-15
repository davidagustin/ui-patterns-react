'use client';

import { useState } from 'react';

export default function InputPromptPattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [messageValue, setMessageValue] = useState('');
  const [showEmailHelp, setShowEmailHelp] = useState(false);
  const [showPasswordHelp, setShowPasswordHelp] = useState(false);

  const searchSuggestions = [
    'JavaScript tutorials',
    'React components',
    'TypeScript guide',
    'CSS animations',
    'Web accessibility',
  ];

  const emailHints = [
    'Use your work email for business accounts',
    'Gmail, Outlook, and Yahoo are supported',
    'We\'ll never share your email address',
  ];

  const passwordHints = [
    'Use at least 8 characters',
    'Include uppercase, lowercase, and numbers',
    'Avoid common words or personal info',
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          💬 Input Prompt Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Guide users with helpful prompts, hints, and suggestions to improve form completion and reduce errors.
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
              Try interacting with these inputs to see different types of prompts and suggestions in action.
            </p>
            
            <div className="space-y-6">
              {/* Placeholder Prompts */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Placeholder Prompts</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Enter your full name (e.g., John Doe)"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number (e.g., +1 555 123 4567)"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              {/* Contextual Help */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Contextual Help</h3>
                <div className="space-y-3">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                      <button
                        onMouseEnter={() => setShowEmailHelp(true)}
                        onMouseLeave={() => setShowEmailHelp(false)}
                        className="ml-1 text-blue-500 hover:text-blue-700"
                      >
                        ℹ️
                      </button>
                    </label>
                    <input
                      type="email"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      placeholder="your.email@example.com"
                    />
                    {showEmailHelp && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 z-10">
                        <div className="space-y-1">
                          {emailHints.map((hint, index) => (
                            <div key={index} className="flex items-start space-x-1">
                              <span className="text-blue-400">•</span>
                              <span>{hint}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Password
                      <button
                        onMouseEnter={() => setShowPasswordHelp(true)}
                        onMouseLeave={() => setShowPasswordHelp(false)}
                        className="ml-1 text-blue-500 hover:text-blue-700"
                      >
                        ℹ️
                      </button>
                    </label>
                    <input
                      type="password"
                      value={passwordValue}
                      onChange={(e) => setPasswordValue(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      placeholder="Create a secure password"
                    />
                    {showPasswordHelp && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 z-10">
                        <div className="space-y-1">
                          {passwordHints.map((hint, index) => (
                            <div key={index} className="flex items-start space-x-1">
                              <span className="text-green-400">✓</span>
                              <span>{hint}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Search Suggestions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Search Suggestions</h3>
                <div className="relative">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search for tutorials, guides, or documentation..."
                    className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  <div className="absolute right-3 top-3 text-gray-400">
                    🔍
                  </div>
                  {searchValue.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                      <div className="p-2">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 px-2">Suggestions:</div>
                        {searchSuggestions
                          .filter(suggestion => suggestion.toLowerCase().includes(searchValue.toLowerCase()))
                          .map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => setSearchValue(suggestion)}
                              className="w-full text-left px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              {suggestion}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Character Counter with Prompt */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Character Counter Prompt</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    value={messageValue}
                    onChange={(e) => setMessageValue(e.target.value)}
                    maxLength={200}
                    placeholder="Tell us about your project (minimum 50 characters for detailed feedback)"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    rows={4}
                  />
                  <div className="flex justify-between items-center mt-1 text-xs">
                    <span className={`${
                      messageValue.length < 50 ? 'text-orange-500' : 'text-green-500'
                    }`}>
                      {messageValue.length < 50 
                        ? `${50 - messageValue.length} more characters needed for detailed feedback` 
                        : 'Great! You\'ll receive detailed feedback'}
                    </span>
                    <span className={`${
                      messageValue.length > 180 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {messageValue.length}/200
                    </span>
                  </div>
                </div>
              </div>

              {/* Progressive Prompts */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Progressive Prompts</h3>
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Step 1: Enter your company name"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      💼 This will be displayed on your profile
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Step 2: Enter your industry"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      🏢 Helps us recommend relevant features
                    </div>
                  </div>
                </div>
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

            <div className="code-block">
              {activeTab === 'jsx' ? (
                <pre className="text-sm leading-relaxed">
{`import { useState } from 'react';

export default function InputPrompt() {
  const [value, setValue] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const helpContent = [
    'Use your work email for business accounts',
    'Gmail, Outlook, and Yahoo are supported',
    'We\\'ll never share your email address',
  ];

  const searchSuggestions = [
    'JavaScript tutorials',
    'React components',
    'TypeScript guide',
  ];

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    
    // Filter suggestions based on input
    const filtered = searchSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(filtered);
  };

  return (
    <div className="input-prompt-container">
      {/* Placeholder Prompts */}
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter your full name (e.g., John Doe)"
          className="input-field"
        />
      </div>

      {/* Contextual Help */}
      <div className="input-group">
        <label className="input-label">
          Email Address
          <button
            onMouseEnter={() => setShowHelp(true)}
            onMouseLeave={() => setShowHelp(false)}
            className="help-trigger"
          >
            ℹ️
          </button>
        </label>
        <input
          type="email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input-field"
          placeholder="your.email@example.com"
        />
        {showHelp && (
          <div className="help-tooltip">
            {helpContent.map((hint, index) => (
              <div key={index} className="help-item">
                <span className="help-bullet">•</span>
                <span>{hint}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Suggestions */}
      <div className="input-group">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder="Search for tutorials, guides..."
          className="input-field"
        />
        {suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            <div className="suggestions-label">Suggestions:</div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setValue(suggestion)}
                className="suggestion-item"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Character Counter */}
      <div className="input-group">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={200}
          placeholder="Tell us about your project (minimum 50 characters)"
          className="textarea-field"
        />
        <div className="character-counter">
          <span className={\`counter-message \${value.length < 50 ? 'warning' : 'success'}\`}>
            {value.length < 50 
              ? \`\${50 - value.length} more characters needed\`
              : 'Great! You\\'ll receive detailed feedback'}
          </span>
          <span className={\`character-count \${value.length > 180 ? 'danger' : ''}\`}>
            {value.length}/200
          </span>
        </div>
      </div>

      {/* Progressive Prompts */}
      <div className="input-group">
        <input
          type="text"
          placeholder="Step 1: Enter your company name"
          className="input-field"
        />
        <div className="input-hint">
          💼 This will be displayed on your profile
        </div>
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Input Prompt Container */
.input-prompt-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Input Group */
.input-group {
  margin-bottom: 1.5rem;
  position: relative;
}

/* Input Field */
.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
}

.input-field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-field::placeholder {
  color: #9ca3af;
  font-style: italic;
}

/* Textarea Field */
.textarea-field {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: all 0.2s ease;
}

.textarea-field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Input Label */
.input-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

/* Help Trigger */
.help-trigger {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.2s ease;
}

.help-trigger:hover {
  transform: scale(1.1);
}

/* Help Tooltip */
.help-tooltip {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  width: 16rem;
  background: #1f2937;
  color: white;
  font-size: 0.75rem;
  border-radius: 8px;
  padding: 0.75rem;
  z-index: 10;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.help-item {
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
  margin-bottom: 0.25rem;
}

.help-item:last-child {
  margin-bottom: 0;
}

.help-bullet {
  color: #60a5fa;
  flex-shrink: 0;
}

/* Suggestions Dropdown */
.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.25rem;
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
}

.suggestions-label {
  font-size: 0.75rem;
  color: #6b7280;
  padding: 0.5rem 0.75rem;
  background: #f9fafb;
  border-bottom: 1px solid #e1e5e9;
}

.suggestion-item {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  color: #374151;
  transition: background-color 0.2s ease;
}

.suggestion-item:hover {
  background-color: #f3f4f6;
}

/* Character Counter */
.character-counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.75rem;
}

.counter-message {
  font-weight: 500;
}

.counter-message.warning {
  color: #f59e0b;
}

.counter-message.success {
  color: #10b981;
}

.character-count {
  color: #6b7280;
}

.character-count.danger {
  color: #ef4444;
  font-weight: 600;
}

/* Input Hint */
.input-hint {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* Responsive Design */
@media (max-width: 640px) {
  .input-prompt-container {
    padding: 1rem;
  }
  
  .help-tooltip {
    width: 100%;
    position: fixed;
    top: auto;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
  }
  
  .suggestions-dropdown {
    position: fixed;
    top: auto;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
  }
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .input-prompt-container {
    background: #1f2937;
    color: #f9fafb;
  }
  
  .input-field,
  .textarea-field {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
  
  .input-field:focus,
  .textarea-field:focus {
    border-color: #60a5fa;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
  }
  
  .input-label {
    color: #f9fafb;
  }
  
  .suggestions-dropdown {
    background: #374151;
    border-color: #4b5563;
  }
  
  .suggestions-label {
    background: #4b5563;
    border-bottom-color: #6b7280;
    color: #d1d5db;
  }
  
  .suggestion-item {
    color: #f9fafb;
  }
  
  .suggestion-item:hover {
    background-color: #4b5563;
  }
  
  .input-hint {
    color: #9ca3af;
  }
}

/* Accessibility */
.input-field:focus-visible,
.textarea-field:focus-visible,
.help-trigger:focus-visible,
.suggestion-item:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Animation */
.help-tooltip,
.suggestions-dropdown {
  animation: fadeInUp 0.2s ease-out;
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

/* Loading State */
.input-field.loading {
  background-image: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Contextual Help</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tooltips and hints that appear when needed</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Smart Suggestions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Dynamic suggestions based on user input</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Progress Indicators</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Character counters and completion feedback</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Example Prompts</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear placeholder text with examples</p>
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
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Registration Forms</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Guide users through account creation</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🔍</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Search Interfaces</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Provide search suggestions and hints</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📄</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Content Creation</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Help users create better content</p>
          </div>
        </div>
      </div>
    </div>
  );
}