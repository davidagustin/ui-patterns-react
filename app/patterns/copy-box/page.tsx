'use client';

import { useState } from 'react';

export default function CopyBoxPattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => new Set(prev).add(id));
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const codeSnippets = [
    {
      id: 'react-component',
      title: 'React Component',
      language: 'jsx',
      code: `import React from 'react';

export default function Button({ children, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {children}
    </button>
  );
}`
    },
    {
      id: 'css-animation',
      title: 'CSS Animation',
      language: 'css',
      code: `@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}`
    },
    {
      id: 'api-key',
      title: 'API Configuration',
      language: 'javascript',
      code: `const config = {
  apiKey: 'sk-1234567890abcdef',
  baseURL: 'https://api.example.com/v1',
  timeout: 10000
};`
    }
  ];

  const commands = [
    {
      id: 'npm-install',
      title: 'Install Dependencies',
      command: 'npm install react react-dom @types/react'
    },
    {
      id: 'git-clone',
      title: 'Clone Repository',
      command: 'git clone https://github.com/username/repository.git'
    },
    {
      id: 'docker-run',
      title: 'Run Docker Container',
      command: 'docker run -p 3000:3000 -d my-app:latest'
    }
  ];

  const snippets = [
    {
      id: 'email',
      title: 'Email Address',
      content: 'support@example.com'
    },
    {
      id: 'phone',
      title: 'Phone Number',
      content: '+1 (555) 123-4567'
    },
    {
      id: 'address',
      title: 'Office Address',
      content: '123 Main St, Suite 100, City, ST 12345'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📋 Copy Box Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Enable users to quickly copy content to their clipboard with visual feedback and multiple content types.
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
              Click any copy button to copy content to your clipboard. Notice the visual feedback when copying.
            </p>
            
            {/* Code Snippets */}
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium mb-3 text-gray-800 dark:text-gray-200">Code Snippets</h3>
                <div className="space-y-4">
                  {codeSnippets.map((snippet) => (
                    <div key={snippet.id} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{snippet.title}</span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-400">
                          {snippet.language}
                        </span>
                      </div>
                      <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                        <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
                          <code>{snippet.code}</code>
                        </pre>
                        <button
                          onClick={() => copyToClipboard(snippet.code, snippet.id)}
                          className={`absolute top-3 right-3 px-3 py-1 rounded text-sm font-medium transition-all ${
                            copiedItems.has(snippet.id)
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {copiedItems.has(snippet.id) ? (
                            <span className="flex items-center space-x-1">
                              <span>✓</span>
                              <span>Copied!</span>
                            </span>
                          ) : (
                            <span className="flex items-center space-x-1">
                              <span>📋</span>
                              <span>Copy</span>
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminal Commands */}
              <div>
                <h3 className="text-md font-medium mb-3 text-gray-800 dark:text-gray-200">Terminal Commands</h3>
                <div className="space-y-3">
                  {commands.map((cmd) => (
                    <div key={cmd.id} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">{cmd.title}</div>
                        <code className="text-sm font-mono text-gray-600 dark:text-gray-400">{cmd.command}</code>
                      </div>
                      <button
                        onClick={() => copyToClipboard(cmd.command, cmd.id)}
                        className={`ml-3 px-3 py-1 rounded text-sm font-medium transition-all ${
                          copiedItems.has(cmd.id)
                            ? 'bg-green-500 text-white'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        {copiedItems.has(cmd.id) ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Text Snippets */}
              <div>
                <h3 className="text-md font-medium mb-3 text-gray-800 dark:text-gray-200">Contact Information</h3>
                <div className="space-y-3">
                  {snippets.map((snippet) => (
                    <div key={snippet.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div>
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{snippet.title}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{snippet.content}</div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(snippet.content, snippet.id)}
                        className={`px-3 py-1 rounded text-sm transition-all ${
                          copiedItems.has(snippet.id)
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        {copiedItems.has(snippet.id) ? '✓' : '📋'}
                      </button>
                    </div>
                  ))}
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

export default function CopyBox() {
  const [copiedItems, setCopiedItems] = useState(new Set());

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => new Set(prev).add(id));
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const codeSnippet = {
    id: 'example',
    code: \`import React from 'react';

export default function Button({ children }) {
  return (
    <button className="btn">
      {children}
    </button>
  );
}\`
  };

  return (
    <div className="copy-container">
      {/* Code Block with Copy Button */}
      <div className="code-block-container">
        <div className="code-header">
          <span>React Component</span>
          <button
            onClick={() => copyToClipboard(codeSnippet.code, codeSnippet.id)}
            className={\`copy-button \${copiedItems.has(codeSnippet.id) ? 'copied' : ''}\`}
          >
            {copiedItems.has(codeSnippet.id) ? (
              <span>✓ Copied!</span>
            ) : (
              <span>📋 Copy</span>
            )}
          </button>
        </div>
        <pre className="code-content">
          <code>{codeSnippet.code}</code>
        </pre>
      </div>

      {/* Simple Text Copy */}
      <div className="text-copy-container">
        <span>Email: support@example.com</span>
        <button
          onClick={() => copyToClipboard('support@example.com', 'email')}
          className="copy-btn"
        >
          {copiedItems.has('email') ? '✓' : '📋'}
        </button>
      </div>

      {/* Command Copy */}
      <div className="command-container">
        <div className="command-info">
          <div className="command-title">Install Package</div>
          <code className="command-text">npm install react</code>
        </div>
        <button
          onClick={() => copyToClipboard('npm install react', 'command')}
          className="command-copy-btn"
        >
          {copiedItems.has('command') ? '✓ Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Copy Container */
.copy-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Code Block Container */
.code-block-container {
  position: relative;
  background-color: #1a1a1a;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1rem;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: #2a2a2a;
  border-bottom: 1px solid #3a3a3a;
  font-size: 0.875rem;
  color: #e5e5e5;
}

.code-content {
  padding: 1rem;
  color: #e5e5e5;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  overflow-x: auto;
  margin: 0;
}

/* Copy Button */
.copy-button {
  background-color: #4a5568;
  color: #e2e8f0;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.copy-button:hover {
  background-color: #2d3748;
}

.copy-button.copied {
  background-color: #38a169;
  color: white;
}

.copy-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

/* Text Copy Container */
.text-copy-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.copy-btn {
  background-color: #e2e8f0;
  color: #4a5568;
  border: none;
  padding: 0.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.copy-btn:hover {
  background-color: #cbd5e0;
}

/* Command Container */
.command-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #2d3748;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.command-info {
  flex: 1;
}

.command-title {
  color: #e2e8f0;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.command-text {
  color: #a0aec0;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 0.875rem;
  background-color: #1a202c;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.command-copy-btn {
  background-color: #3182ce;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 1rem;
}

.command-copy-btn:hover {
  background-color: #2c5282;
}

/* Success State */
.copied {
  animation: copySuccess 0.3s ease;
}

@keyframes copySuccess {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Tooltip */
.copy-tooltip {
  position: relative;
}

.copy-tooltip::after {
  content: 'Copied to clipboard!';
  position: absolute;
  top: -2.5rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1a202c;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
}

.copy-tooltip.show::after {
  opacity: 1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .copy-container {
    padding: 0.5rem;
  }
  
  .code-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }
  
  .command-container {
    flex-direction: column;
    gap: 0.75rem;
    align-items: stretch;
  }
  
  .command-copy-btn {
    margin-left: 0;
  }
  
  .text-copy-container {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .text-copy-container {
    background-color: #2d3748;
    border-color: #4a5568;
    color: #e2e8f0;
  }
  
  .copy-btn {
    background-color: #4a5568;
    color: #e2e8f0;
  }
  
  .copy-btn:hover {
    background-color: #2d3748;
  }
}

/* Accessibility */
.copy-button:focus-visible,
.copy-btn:focus-visible,
.command-copy-btn:focus-visible {
  outline: 2px solid #3182ce;
  outline-offset: 2px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .copy-button,
  .copy-btn,
  .command-copy-btn {
    transition: none;
  }
  
  .copied {
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">One-Click Copy</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Instant clipboard copying with single button click</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Feedback</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear success indication when content is copied</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Multiple Content Types</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Support for code, commands, and plain text</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Error Handling</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Graceful fallback for unsupported browsers</p>
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
            <div className="text-2xl mb-2">💻</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Code Documentation</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Copy code snippets and examples</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Terminal Commands</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Quick command copying for tutorials</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📞</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Contact Information</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Easy sharing of emails and addresses</p>
          </div>
        </div>
      </div>
    </div>
  );
}