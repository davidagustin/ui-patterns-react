'use client';

import { useState, useEffect } from 'react';

export default function AutosavePattern() {
  const [content, setContent] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  // Simulate autosave functionality
  useEffect(() => {
    if (content && content.length > 0) {
      setIsSaving(true);
      setSaveStatus('saving');
      
      const timer = setTimeout(() => {
        // Simulate API call
        setLastSaved(new Date());
        setIsSaving(false);
        setSaveStatus('saved');
        
        // Reset status after 3 seconds
        setTimeout(() => setSaveStatus('idle'), 3000);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [content]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const getStatusText = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return 'All changes saved';
      case 'error':
        return 'Save failed';
      default:
        return lastSaved ? `Last saved ${lastSaved.toLocaleTimeString()}` : 'Start typing to auto-save';
    }
  };

  const getStatusColor = () => {
    switch (saveStatus) {
      case 'saving':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'saved':
        return 'text-green-600 dark:text-green-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          💾 Autosave Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Automatically save user progress to prevent data loss and provide peace of mind during content creation.
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
              Start typing in the text area below. The content will automatically save after you stop typing for 1 second.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Document Editor</h3>
                <div className={`text-sm font-medium ${getStatusColor()}`}>
                  {isSaving && <span className="animate-pulse">⏳</span>}
                  {saveStatus === 'saved' && <span>✅</span>}
                  {getStatusText()}
                </div>
              </div>
              
              <textarea
                value={content}
                onChange={handleContentChange}
                placeholder="Start typing your content here... The autosave feature will automatically save your work as you type."
                rows={8}
                className="input-field resize-none"
              />
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{content.length} characters</span>
                <span>Auto-saves every 1 second after you stop typing</span>
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
{`import { useState, useEffect } from 'react';

export default function AutosavePattern() {
  const [content, setContent] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Simulate autosave functionality
  useEffect(() => {
    if (content && content.length > 0) {
      setIsSaving(true);
      setSaveStatus('saving');
      
      const timer = setTimeout(() => {
        // Simulate API call
        setLastSaved(new Date());
        setIsSaving(false);
        setSaveStatus('saved');
        
        // Reset status after 3 seconds
        setTimeout(() => setSaveStatus('idle'), 3000);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [content]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const getStatusText = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return 'All changes saved';
      case 'error':
        return 'Save failed';
      default:
        return lastSaved ? \`Last saved \${lastSaved.toLocaleTimeString()}\` : 'Start typing to auto-save';
    }
  };

  const getStatusColor = () => {
    switch (saveStatus) {
      case 'saving':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'saved':
        return 'text-green-600 dark:text-green-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-800 dark:text-gray-200">Document Editor</h3>
        <div className={\`text-sm font-medium \${getStatusColor()}\`}>
          {isSaving && <span className="animate-pulse">⏳</span>}
          {saveStatus === 'saved' && <span>✅</span>}
          {getStatusText()}
        </div>
      </div>
      
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Start typing your content here..."
        rows={8}
        className="input-field resize-none"
      />
      
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>{content.length} characters</span>
        <span>Auto-saves every 1 second after you stop typing</span>
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Autosave Container */
.autosave-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

/* Editor Header */
.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.editor-title {
  font-weight: 500;
  color: #374151;
  font-size: 1.125rem;
}

/* Status Indicator */
.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.status-saving {
  color: #d97706;
  background-color: #fef3c7;
}

.status-saved {
  color: #059669;
  background-color: #d1fae5;
}

.status-error {
  color: #dc2626;
  background-color: #fee2e2;
}

.status-idle {
  color: #6b7280;
  background-color: #f3f4f6;
}

/* Status Icon */
.status-icon {
  font-size: 1rem;
}

.status-icon.saving {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Textarea */
.autosave-textarea {
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: inherit;
  line-height: 1.5;
  resize: vertical;
  transition: all 0.2s ease;
}

.autosave-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.autosave-textarea::placeholder {
  color: #9ca3af;
}

/* Editor Footer */
.editor-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #6b7280;
}

.character-count {
  font-weight: 500;
}

.save-info {
  font-style: italic;
}

/* Loading Animation */
.saving-animation {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid #f3f4f6;
  border-top: 2px solid #d97706;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Success Animation */
.success-animation {
  animation: bounce 0.6s ease-in-out;
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

/* Responsive Design */
@media (max-width: 640px) {
  .autosave-container {
    padding: 1rem;
  }
  
  .editor-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .editor-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .editor-header {
    border-bottom-color: #374151;
  }
  
  .editor-title {
    color: #f9fafb;
  }
  
  .autosave-textarea {
    background-color: #1f2937;
    border-color: #374151;
    color: #f9fafb;
  }
  
  .autosave-textarea:focus {
    border-color: #60a5fa;
  }
  
  .autosave-textarea::placeholder {
    color: #6b7280;
  }
  
  .editor-footer {
    border-top-color: #374151;
    color: #9ca3af;
  }
  
  .status-saving {
    background-color: #451a03;
    color: #fbbf24;
  }
  
  .status-saved {
    background-color: #064e3b;
    color: #34d399;
  }
  
  .status-error {
    background-color: #450a0a;
    color: #f87171;
  }
  
  .status-idle {
    background-color: #374151;
    color: #9ca3af;
  }
}

/* Focus States */
.autosave-textarea:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Accessibility */
.status-indicator[aria-live="polite"] {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Debounced Saving</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Saves after user stops typing to avoid excessive API calls</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Feedback</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear indicators showing save status and last saved time</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Error Handling</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Graceful handling of save failures with user notification</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Data Recovery</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Automatic recovery of unsaved changes on page reload</p>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold mb-4 text-yellow-800 dark:text-yellow-200">
          💡 Best Practices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">1.</span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Use Debouncing</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Wait for user to stop typing before saving</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">2.</span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Show Save Status</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Provide clear visual feedback about save state</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">3.</span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Handle Errors Gracefully</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Retry failed saves and notify users appropriately</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">4.</span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Optimize Performance</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Use efficient save intervals and batch updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
