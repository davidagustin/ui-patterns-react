'use client';

import { useState, useEffect } from 'react';

export default function KeyboardShortcutsPattern() {
  const [activeShortcuts, setActiveShortcuts] = useState<string[]>([]);
  const [showHelp, setShowHelp] = useState(false);
  const [lastAction, setLastAction] = useState('');
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  const shortcuts = [
    { key: 'Ctrl + S', action: 'Save document', description: 'Quickly save your current work' },
    { key: 'Ctrl + Z', action: 'Undo', description: 'Reverse the last action' },
    { key: 'Ctrl + Y', action: 'Redo', description: 'Restore the last undone action' },
    { key: 'Ctrl + F', action: 'Find', description: 'Search for text in the document' },
    { key: 'Ctrl + B', action: 'Bold', description: 'Make selected text bold' },
    { key: 'Ctrl + I', action: 'Italic', description: 'Make selected text italic' },
    { key: 'Ctrl + U', action: 'Underline', description: 'Underline selected text' },
    { key: 'Ctrl + A', action: 'Select All', description: 'Select all content' },
    { key: 'Ctrl + C', action: 'Copy', description: 'Copy selected content to clipboard' },
    { key: 'Ctrl + V', action: 'Paste', description: 'Paste content from clipboard' },
    { key: 'Ctrl + X', action: 'Cut', description: 'Cut selected content' },
    { key: 'F1', action: 'Help', description: 'Show keyboard shortcuts help' }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const pressedKeys: string[] = [];
      
      if (e.ctrlKey) pressedKeys.push('Ctrl');
      if (e.shiftKey) pressedKeys.push('Shift');
      if (e.altKey) pressedKeys.push('Alt');
      if (e.metaKey) pressedKeys.push('Cmd');
      
      if (e.key !== 'Control' && e.key !== 'Shift' && e.key !== 'Alt' && e.key !== 'Meta') {
        pressedKeys.push(e.key.toUpperCase());
      }

      const shortcutKey = pressedKeys.join(' + ');
      setActiveShortcuts(pressedKeys);

      // Handle specific shortcuts
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        setLastAction('Document saved!');
        setTimeout(() => setLastAction(''), 2000);
      } else if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        setLastAction('Action undone!');
        setTimeout(() => setLastAction(''), 2000);
      } else if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        setLastAction('Action redone!');
        setTimeout(() => setLastAction(''), 2000);
      } else if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        setLastAction('Find dialog opened!');
        setTimeout(() => setLastAction(''), 2000);
      } else if (e.key === 'F1') {
        e.preventDefault();
        setShowHelp(!showHelp);
      }
    };

    const handleKeyUp = () => {
      setActiveShortcuts([]);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [showHelp]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ⌨️ Keyboard Shortcuts Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Enhance user productivity with keyboard shortcuts that provide quick access to common actions and improve workflow efficiency.
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
              Try pressing keyboard shortcuts to see them in action. Press F1 to toggle the help panel.
            </p>
            
            <div className="space-y-4">
              {/* Active Keys Display */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Currently Pressed Keys</h3>
                <div className="flex flex-wrap gap-2">
                  {activeShortcuts.length > 0 ? (
                    activeShortcuts.map((key, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm font-mono"
                      >
                        {key}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400 text-sm">No keys pressed</span>
                  )}
                </div>
              </div>

              {/* Last Action Display */}
              {lastAction && (
                <div className="bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 rounded-lg">
                  <p className="text-green-800 dark:text-green-200 text-sm font-medium">
                    ✅ {lastAction}
                  </p>
                </div>
              )}

              {/* Demo Actions */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Try These Shortcuts:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Save Document</span>
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs font-mono">
                      Ctrl + S
                    </kbd>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Undo</span>
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs font-mono">
                      Ctrl + Z
                    </kbd>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Find</span>
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs font-mono">
                      Ctrl + F
                    </kbd>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Help</span>
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs font-mono">
                      F1
                    </kbd>
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

function KeyboardShortcutsExample() {
  const [activeShortcuts, setActiveShortcuts] = useState([]);
  const [lastAction, setLastAction] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      const pressedKeys = [];
      
      if (e.ctrlKey) pressedKeys.push('Ctrl');
      if (e.shiftKey) pressedKeys.push('Shift');
      if (e.key !== 'Control' && e.key !== 'Shift') {
        pressedKeys.push(e.key.toUpperCase());
      }

      setActiveShortcuts(pressedKeys);

      // Handle specific shortcuts
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        setLastAction('Document saved!');
        setTimeout(() => setLastAction(''), 2000);
      } else if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        setLastAction('Action undone!');
        setTimeout(() => setLastAction(''), 2000);
      }
    };

    const handleKeyUp = () => {
      setActiveShortcuts([]);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div>
      <div>
        <h3>Currently Pressed Keys</h3>
        <div>
          {activeShortcuts.map((key, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 rounded">
              {key}
            </span>
          ))}
        </div>
      </div>
      
      {lastAction && (
        <div className="bg-green-100 p-2 rounded">
          {lastAction}
        </div>
      )}
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Keyboard Shortcuts CSS */

/* Keyboard Shortcuts Container */
.keyboard-shortcuts {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Active Keys Display */
.active-keys {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.active-keys h3 {
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.keys-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* Key Badge */
.key-badge {
  padding: 0.25rem 0.75rem;
  background-color: #dbeafe;
  color: #1e40af;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: monospace;
  font-weight: 500;
  transition: all 0.2s ease;
}

.key-badge:hover {
  background-color: #bfdbfe;
  transform: translateY(-1px);
}

/* Action Feedback */
.action-feedback {
  background-color: #d1fae5;
  border: 1px solid #a7f3d0;
  color: #065f46;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Shortcuts Grid */
.shortcuts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

/* Shortcut Item */
.shortcut-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.shortcut-item:hover {
  border-color: #3b82f6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.shortcut-label {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Keyboard Key (kbd) */
kbd {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-family: monospace;
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  position: relative;
}

kbd::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%);
  border-radius: inherit;
  pointer-events: none;
}

/* Help Panel */
.help-panel {
  background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
  border: 1px solid #f59e0b;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-top: 2rem;
  position: relative;
  overflow: hidden;
}

.help-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><g fill="%23fbbf24" fill-opacity="0.1"><circle cx="30" cy="30" r="2"/></g></svg>');
  pointer-events: none;
}

.help-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.help-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #92400e;
}

.help-close {
  background: none;
  border: none;
  color: #d97706;
  font-size: 1.125rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.help-close:hover {
  background-color: rgba(217, 119, 6, 0.1);
  color: #92400e;
}

.help-shortcuts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  position: relative;
  z-index: 1;
}

.help-shortcut {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.help-shortcut-info {
  flex: 1;
}

.help-shortcut-action {
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

.help-shortcut-desc {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Interactive States */
.shortcut-item.active {
  background-color: #eff6ff;
  border-color: #3b82f6;
}

.key-badge.pressed {
  background-color: #1e40af;
  color: white;
  transform: scale(0.95);
}

/* Responsive Design */
@media (max-width: 768px) {
  .keyboard-shortcuts {
    padding: 1rem;
  }
  
  .shortcuts-grid {
    grid-template-columns: 1fr;
  }
  
  .help-shortcuts {
    grid-template-columns: 1fr;
  }
  
  .shortcut-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .active-keys {
    background-color: #1f2937;
    border-color: #374151;
  }
  
  .active-keys h3 {
    color: #f9fafb;
  }
  
  .key-badge {
    background-color: #1e3a8a;
    color: #60a5fa;
  }
  
  .action-feedback {
    background-color: #064e3b;
    border-color: #065f46;
    color: #34d399;
  }
  
  .shortcut-item {
    background-color: #1f2937;
    border-color: #374151;
  }
  
  .shortcut-label {
    color: #9ca3af;
  }
  
  kbd {
    background-color: #374151;
    color: #f9fafb;
    border-color: #4b5563;
  }
  
  .help-panel {
    background: linear-gradient(135deg, #451a03 0%, #7c2d12 100%);
    border-color: #92400e;
  }
  
  .help-title {
    color: #fbbf24;
  }
  
  .help-close {
    color: #fbbf24;
  }
  
  .help-close:hover {
    background-color: rgba(251, 191, 36, 0.1);
    color: #f59e0b;
  }
  
  .help-shortcut {
    background-color: #1f2937;
    border-color: #374151;
  }
  
  .help-shortcut-action {
    color: #f9fafb;
  }
  
  .help-shortcut-desc {
    color: #9ca3af;
  }
  
  .shortcut-item.active {
    background-color: #1e3a8a;
    border-color: #3b82f6;
  }
}

/* Accessibility */
.key-badge:focus,
.shortcut-item:focus,
.help-close:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Animation for help panel */
.help-panel {
  animation: fadeInScale 0.3s ease;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Pulse animation for active shortcuts */
.key-badge.active {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Enhanced keyboard key styling */
kbd.enhanced {
  background: linear-gradient(145deg, #f8fafc, #e2e8f0);
  border: 2px solid #cbd5e1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
}

kbd.enhanced:active {
  background: linear-gradient(145deg, #e2e8f0, #cbd5e1);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  transform: translateY(1px);
}`}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Help Panel */}
      {showHelp && (
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
              ⌨️ Keyboard Shortcuts Help
            </h3>
            <button
              onClick={() => setShowHelp(false)}
              className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">{shortcut.action}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{shortcut.description}</div>
                </div>
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs font-mono">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Features */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold mb-4 text-green-800 dark:text-green-200">
          ✨ Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Feedback</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Real-time display of pressed keys and actions</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Help System</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Accessible help panel with all available shortcuts</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Cross-Platform</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Support for both Windows (Ctrl) and Mac (Cmd) keys</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Conflict Prevention</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Prevent default browser behavior for custom shortcuts</p>
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
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Text Editors</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Save, undo, format, and navigation shortcuts</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🖥️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Web Applications</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Quick actions and navigation for power users</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🎮</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Gaming Interfaces</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Action keys and command shortcuts</p>
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
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Follow Conventions</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Use standard shortcuts like Ctrl+S for save</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">2.</span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Provide Help</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Always include a help system or tooltips</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">3.</span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Avoid Conflicts</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Don't override essential browser shortcuts</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">4.</span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Indicators</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Show shortcuts in menus and buttons</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
