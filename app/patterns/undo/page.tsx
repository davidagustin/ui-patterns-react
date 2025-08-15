'use client';

import { useState, useRef } from 'react';

interface Command {
  id: string;
  description: string;
  execute: () => void;
  undo: () => void;
}

export default function UndoPattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [items, setItems] = useState([
    { id: 1, text: 'Design System Components', completed: false },
    { id: 2, text: 'User Research Plan', completed: true },
    { id: 3, text: 'Prototype Testing', completed: false },
    { id: 4, text: 'Content Strategy', completed: false },
  ]);
  const [history, setHistory] = useState<Command[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  
  const nextId = useRef(5);

  const addToHistory = (command: Command) => {
    setHistory(prev => [...prev, command]);
    setCanUndo(true);
  };

  const undo = () => {
    if (history.length === 0) return;
    
    const lastCommand = history[history.length - 1];
    lastCommand.undo();
    
    setHistory(prev => prev.slice(0, -1));
    setCanUndo(history.length > 1);
  };

  const addItem = () => {
    const newItem = {
      id: nextId.current,
      text: `New Task ${nextId.current}`,
      completed: false
    };
    
    const command: Command = {
      id: `add-${nextId.current}`,
      description: `Added "${newItem.text}"`,
      execute: () => {
        setItems(prev => [...prev, newItem]);
        nextId.current++;
      },
      undo: () => {
        setItems(prev => prev.filter(item => item.id !== newItem.id));
        nextId.current--;
      }
    };
    
    command.execute();
    addToHistory(command);
  };

  const toggleItem = (itemId: number) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    
    const command: Command = {
      id: `toggle-${itemId}`,
      description: `${item.completed ? 'Uncompleted' : 'Completed'} "${item.text}"`,
      execute: () => {
        setItems(prev => prev.map(i => 
          i.id === itemId ? { ...i, completed: !i.completed } : i
        ));
      },
      undo: () => {
        setItems(prev => prev.map(i => 
          i.id === itemId ? { ...i, completed: !i.completed } : i
        ));
      }
    };
    
    command.execute();
    addToHistory(command);
  };

  const deleteItem = (itemId: number) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    
    const command: Command = {
      id: `delete-${itemId}`,
      description: `Deleted "${item.text}"`,
      execute: () => {
        setItems(prev => prev.filter(i => i.id !== itemId));
      },
      undo: () => {
        setItems(prev => [...prev, item]);
      }
    };
    
    command.execute();
    addToHistory(command);
  };

  const editItem = (itemId: number, newText: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    
    const oldText = item.text;
    
    const command: Command = {
      id: `edit-${itemId}`,
      description: `Edited "${oldText}" to "${newText}"`,
      execute: () => {
        setItems(prev => prev.map(i => 
          i.id === itemId ? { ...i, text: newText } : i
        ));
      },
      undo: () => {
        setItems(prev => prev.map(i => 
          i.id === itemId ? { ...i, text: oldText } : i
        ));
      }
    };
    
    command.execute();
    addToHistory(command);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ↩️ Undo Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Implement undo functionality using the command pattern, allowing users to reverse their actions.
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
              Try adding, editing, toggling, or deleting items, then use the undo button to reverse your actions.
            </p>
            
            {/* Undo Button */}
            <div className="mb-4">
              <button
                onClick={undo}
                disabled={!canUndo}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                  canUndo
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>↩️</span>
                <span>Undo</span>
                {canUndo && history.length > 0 && (
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">
                    {history[history.length - 1].description}
                  </span>
                )}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="mb-4 flex space-x-2">
              <button
                onClick={addItem}
                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                ➕ Add Item
              </button>
            </div>

            {/* Items List */}
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center space-x-3 ${
                    item.completed ? 'opacity-75' : ''
                  }`}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      item.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-green-500'
                    }`}
                  >
                    {item.completed && '✓'}
                  </button>
                  
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => editItem(item.id, e.target.value)}
                    className={`flex-1 bg-transparent border-none outline-none ${
                      item.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-gray-200'
                    }`}
                  />
                  
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">How to Use</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• Add new items with the "Add Item" button</div>
                <div>• Click the checkbox to toggle completion</div>
                <div>• Edit text by clicking on the item text</div>
                <div>• Delete items with the trash icon</div>
                <div>• Use the Undo button to reverse any action</div>
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
{`import { useState, useRef } from 'react';

interface Command {
  id: string;
  description: string;
  execute: () => void;
  undo: () => void;
}

interface Item {
  id: number;
  text: string;
  completed: boolean;
}

export default function UndoExample() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, text: 'Design System Components', completed: false },
    { id: 2, text: 'User Research Plan', completed: true },
  ]);
  const [history, setHistory] = useState<Command[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  
  const nextId = useRef(3);

  const addToHistory = (command: Command) => {
    setHistory(prev => [...prev, command]);
    setCanUndo(true);
  };

  const undo = () => {
    if (history.length === 0) return;
    
    const lastCommand = history[history.length - 1];
    lastCommand.undo();
    
    setHistory(prev => prev.slice(0, -1));
    setCanUndo(history.length > 1);
  };

  const addItem = () => {
    const newItem = {
      id: nextId.current,
      text: \`New Task \${nextId.current}\`,
      completed: false
    };
    
    const command: Command = {
      id: \`add-\${nextId.current}\`,
      description: \`Added "\${newItem.text}"\`,
      execute: () => {
        setItems(prev => [...prev, newItem]);
        nextId.current++;
      },
      undo: () => {
        setItems(prev => prev.filter(item => item.id !== newItem.id));
        nextId.current--;
      }
    };
    
    command.execute();
    addToHistory(command);
  };

  const toggleItem = (itemId: number) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    
    const command: Command = {
      id: \`toggle-\${itemId}\`,
      description: \`\${item.completed ? 'Uncompleted' : 'Completed'} "\${item.text}"\`,
      execute: () => {
        setItems(prev => prev.map(i => 
          i.id === itemId ? { ...i, completed: !i.completed } : i
        ));
      },
      undo: () => {
        setItems(prev => prev.map(i => 
          i.id === itemId ? { ...i, completed: !i.completed } : i
        ));
      }
    };
    
    command.execute();
    addToHistory(command);
  };

  return (
    <div className="space-y-4">
      {/* Undo Button */}
      <button
        onClick={undo}
        disabled={!canUndo}
        className={\`px-4 py-2 rounded-lg font-medium \${
          canUndo
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }\`}
      >
        ↩️ Undo
      </button>

      {/* Add Button */}
      <button
        onClick={addItem}
        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        ➕ Add Item
      </button>

      {/* Items List */}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={\`p-3 bg-white rounded-lg border flex items-center space-x-3 \${
              item.completed ? 'opacity-75' : ''
            }\`}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className={\`w-5 h-5 rounded border-2 flex items-center justify-center \${
                item.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-green-500'
              }\`}
            >
              {item.completed && '✓'}
            </button>
            
            <span className={\`flex-1 \${
              item.completed ? 'line-through text-gray-500' : ''
            }\`}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Undo Button */
.undo-button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.undo-button.enabled {
  background-color: #2563eb;
  color: white;
  box-shadow: 0 4px 6px rgba(37, 99, 235, 0.1);
}

.undo-button.enabled:hover {
  background-color: #1d4ed8;
  box-shadow: 0 6px 12px rgba(37, 99, 235, 0.2);
}

.undo-button.disabled {
  background-color: #d1d5db;
  color: #6b7280;
  cursor: not-allowed;
}

/* Action Buttons */
.action-button {
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;
  border: none;
  cursor: pointer;
}

.add-button {
  background-color: #059669;
  color: white;
}

.add-button:hover {
  background-color: #047857;
}

/* Item Container */
.item-container {
  padding: 0.75rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: opacity 0.2s ease;
}

.item-container.completed {
  opacity: 0.75;
}

/* Checkbox */
.checkbox {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.25rem;
  border: 2px solid #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: none;
}

.checkbox:hover {
  border-color: #059669;
}

.checkbox.checked {
  background-color: #059669;
  border-color: #059669;
  color: white;
}

/* Item Text */
.item-text {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 0.875rem;
  color: #374151;
}

.item-text.completed {
  text-decoration: line-through;
  color: #6b7280;
}

/* Delete Button */
.delete-button {
  color: #ef4444;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
  font-size: 1rem;
}

.delete-button:hover {
  color: #dc2626;
}

/* History Display */
.history-item {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  margin-left: 0.5rem;
}

/* Responsive Design */
@media (max-width: 640px) {
  .undo-button {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
  
  .item-container {
    padding: 0.5rem;
  }
  
  .item-text {
    font-size: 0.8rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .item-container {
    background-color: #1f2937;
    border-color: #374151;
  }
  
  .item-text {
    color: #f9fafb;
  }
  
  .item-text.completed {
    color: #9ca3af;
  }
  
  .checkbox {
    border-color: #6b7280;
  }
  
  .checkbox:hover {
    border-color: #10b981;
  }
  
  .checkbox.checked {
    background-color: #10b981;
    border-color: #10b981;
  }
}

/* Animation Keyframes */
@keyframes undoFlash {
  0% {
    background-color: #2563eb;
  }
  50% {
    background-color: #1d4ed8;
  }
  100% {
    background-color: #2563eb;
  }
}

.undo-button.undoing {
  animation: undoFlash 0.3s ease-in-out;
}

/* Accessibility */
.undo-button:focus-visible,
.action-button:focus-visible,
.checkbox:focus-visible,
.delete-button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .undo-button,
  .action-button,
  .item-container,
  .checkbox,
  .delete-button {
    transition: none;
  }
  
  .undo-button.undoing {
    animation: none;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .item-container {
    border-width: 2px;
  }
  
  .checkbox {
    border-width: 2px;
  }
  
  .undo-button:focus-visible,
  .action-button:focus-visible,
  .checkbox:focus-visible,
  .delete-button:focus-visible {
    outline-width: 3px;
  }
}`}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold mb-4 text-green-800 dark:text-green-200">
          ✨ Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Command Pattern</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Each action is encapsulated as a command</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Action History</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Track all user actions for undo functionality</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Feedback</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear indication of what can be undone</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Multiple Actions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Support for add, edit, toggle, and delete</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">State Management</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Efficient state tracking and updates</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Keyboard Support</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Full keyboard accessibility</p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-semibold mb-4 text-purple-800 dark:text-purple-200">
          🎯 Use Cases
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📝</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Text Editors</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Undo typing and formatting changes</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🎨</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Design Tools</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Undo drawing and editing actions</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Data Management</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Undo data entry and modifications</p>
          </div>
        </div>
      </div>
    </div>
  );
}
