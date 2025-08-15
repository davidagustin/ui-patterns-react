'use client';

import { useState, useRef, useEffect } from 'react';

export default function MenusPattern() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [contextMenuPosition, setContextMenuPosition] = useState<{x: number, y: number} | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setContextMenuPosition(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setActiveMenu(null);
  };

  const menuItems = {
    file: [
      { id: 'new', label: 'New', icon: '📄', shortcut: 'Ctrl+N' },
      { id: 'open', label: 'Open', icon: '📂', shortcut: 'Ctrl+O' },
      { id: 'save', label: 'Save', icon: '💾', shortcut: 'Ctrl+S' },
      { type: 'divider' },
      { id: 'export', label: 'Export', icon: '📤', submenu: [
        { id: 'pdf', label: 'Export as PDF', icon: '📄' },
        { id: 'image', label: 'Export as Image', icon: '🖼️' },
        { id: 'csv', label: 'Export as CSV', icon: '📊' },
      ]},
    ],
    edit: [
      { id: 'undo', label: 'Undo', icon: '↩️', shortcut: 'Ctrl+Z' },
      { id: 'redo', label: 'Redo', icon: '↪️', shortcut: 'Ctrl+Y' },
      { type: 'divider' },
      { id: 'cut', label: 'Cut', icon: '✂️', shortcut: 'Ctrl+X' },
      { id: 'copy', label: 'Copy', icon: '📋', shortcut: 'Ctrl+C' },
      { id: 'paste', label: 'Paste', icon: '📄', shortcut: 'Ctrl+V' },
    ],
    context: [
      { id: 'copy', label: 'Copy', icon: '📋' },
      { id: 'paste', label: 'Paste', icon: '📄' },
      { type: 'divider' },
      { id: 'delete', label: 'Delete', icon: '🗑️' },
      { id: 'rename', label: 'Rename', icon: '✏️' },
      { type: 'divider' },
      { id: 'properties', label: 'Properties', icon: '⚙️' },
    ]
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📋 Menus Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Organize actions and commands in dropdown menus, context menus, and nested menu structures for efficient navigation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            
            <div className="space-y-6" ref={menuRef}>
              {/* Menu Bar */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="flex bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <div className="relative">
                    <button
                      onClick={() => setActiveMenu(activeMenu === 'file' ? null : 'file')}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        activeMenu === 'file'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      File
                    </button>
                    {activeMenu === 'file' && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                        {menuItems.file.map((item, index) => (
                          item.type === 'divider' ? (
                            <div key={index} className="border-t border-gray-200 dark:border-gray-700 my-1" />
                          ) : (
                            <button
                              key={item.id}
                              className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                            >
                              <div className="flex items-center space-x-2">
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                              </div>
                              {item.shortcut && (
                                <span className="text-xs text-gray-500 dark:text-gray-400">{item.shortcut}</span>
                              )}
                              {item.submenu && (
                                <span className="text-gray-400">▶</span>
                              )}
                            </button>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="relative">
                    <button
                      onClick={() => setActiveMenu(activeMenu === 'edit' ? null : 'edit')}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        activeMenu === 'edit'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      Edit
                    </button>
                    {activeMenu === 'edit' && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                        {menuItems.edit.map((item, index) => (
                          item.type === 'divider' ? (
                            <div key={index} className="border-t border-gray-200 dark:border-gray-700 my-1" />
                          ) : (
                            <button
                              key={item.id}
                              className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                            >
                              <div className="flex items-center space-x-2">
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                              </div>
                              {item.shortcut && (
                                <span className="text-xs text-gray-500 dark:text-gray-400">{item.shortcut}</span>
                              )}
                            </button>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Content area with context menu */}
                <div
                  className="p-6 bg-white dark:bg-gray-800 h-32 flex items-center justify-center text-gray-600 dark:text-gray-400 cursor-pointer"
                  onContextMenu={handleContextMenu}
                >
                  Right-click here for context menu
                </div>
              </div>

              {/* Context Menu */}
              {contextMenuPosition && (
                <div
                  className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 w-40"
                  style={{ left: contextMenuPosition.x, top: contextMenuPosition.y }}
                >
                  {menuItems.context.map((item, index) => (
                    item.type === 'divider' ? (
                      <div key={index} className="border-t border-gray-200 dark:border-gray-700 my-1" />
                    ) : (
                      <button
                        key={item.id}
                        className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                        onClick={() => setContextMenuPosition(null)}
                      >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    )
                  ))}
                </div>
              )}
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
{`import { useState, useRef, useEffect } from 'react';

export default function Menus() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const menuRef = useRef(null);

  const menuItems = {
    file: [
      { id: 'new', label: 'New', icon: '📄', shortcut: 'Ctrl+N' },
      { id: 'open', label: 'Open', icon: '📂', shortcut: 'Ctrl+O' },
      { type: 'divider' },
      { id: 'save', label: 'Save', icon: '💾', shortcut: 'Ctrl+S' },
    ],
    edit: [
      { id: 'undo', label: 'Undo', icon: '↩️', shortcut: 'Ctrl+Z' },
      { id: 'redo', label: 'Redo', icon: '↪️', shortcut: 'Ctrl+Y' },
      { type: 'divider' },
      { id: 'copy', label: 'Copy', icon: '📋', shortcut: 'Ctrl+C' },
    ]
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
        setContextMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY });
  };

  return (
    <div className="menu-container" ref={menuRef}>
      {/* Menu Bar */}
      <div className="menu-bar">
        <div className="menu-group">
          <button
            onClick={() => setActiveMenu(activeMenu === 'file' ? null : 'file')}
            className={\`menu-trigger \${activeMenu === 'file' ? 'active' : ''}\`}
          >
            File
          </button>
          {activeMenu === 'file' && (
            <div className="dropdown-menu">
              {menuItems.file.map((item, index) => (
                item.type === 'divider' ? (
                  <div key={index} className="menu-divider" />
                ) : (
                  <button key={item.id} className="menu-item">
                    <div className="menu-item-content">
                      <span className="menu-icon">{item.icon}</span>
                      <span className="menu-label">{item.label}</span>
                    </div>
                    {item.shortcut && (
                      <span className="menu-shortcut">{item.shortcut}</span>
                    )}
                  </button>
                )
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content with Context Menu */}
      <div
        className="content-area"
        onContextMenu={handleContextMenu}
      >
        Right-click for context menu
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="context-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button className="context-item">Copy</button>
          <button className="context-item">Paste</button>
          <div className="menu-divider" />
          <button className="context-item">Delete</button>
        </div>
      )}
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Menu Container */
.menu-container {
  position: relative;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

/* Menu Bar */
.menu-bar {
  display: flex;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.menu-group {
  position: relative;
}

.menu-trigger {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.menu-trigger:hover {
  background-color: #f3f4f6;
}

.menu-trigger.active {
  background-color: #eff6ff;
  color: #1d4ed8;
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.25rem;
  width: 12rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 50;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #374151;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.menu-item:hover {
  background-color: #f3f4f6;
}

.menu-item-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.menu-icon {
  font-size: 1rem;
}

.menu-label {
  font-weight: 500;
}

.menu-shortcut {
  font-size: 0.75rem;
  color: #6b7280;
  font-family: monospace;
}

/* Menu Divider */
.menu-divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 0.25rem 0;
}

/* Content Area */
.content-area {
  padding: 2rem;
  background: white;
  min-height: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  cursor: pointer;
}

/* Context Menu */
.context-menu {
  position: fixed;
  width: 10rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 60;
  overflow: hidden;
}

.context-item {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #374151;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.context-item:hover {
  background-color: #f3f4f6;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .menu-container {
    background: #1f2937;
    border-color: #374151;
  }
  
  .menu-bar {
    background-color: #111827;
    border-bottom-color: #374151;
  }
  
  .menu-trigger {
    color: #f9fafb;
  }
  
  .menu-trigger:hover {
    background-color: #374151;
  }
  
  .menu-trigger.active {
    background-color: #1e3a8a;
    color: #93c5fd;
  }
  
  .dropdown-menu,
  .context-menu {
    background: #1f2937;
    border-color: #374151;
  }
  
  .menu-item,
  .context-item {
    color: #f9fafb;
  }
  
  .menu-item:hover,
  .context-item:hover {
    background-color: #374151;
  }
  
  .menu-divider {
    background-color: #374151;
  }
  
  .content-area {
    background: #1f2937;
    color: #9ca3af;
  }
}

/* Focus States */
.menu-trigger:focus,
.menu-item:focus,
.context-item:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

/* Animation */
.dropdown-menu,
.context-menu {
  animation: menuSlide 0.2s ease-out;
}

@keyframes menuSlide {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Multiple Menu Types</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Dropdown menus, context menus, and menu bars</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Keyboard Shortcuts</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Display keyboard shortcuts alongside menu items</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Separators</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Organize menu items with dividers</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Click Outside to Close</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Intuitive menu dismissal behavior</p>
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
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Desktop Apps</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Traditional menu bars and context menus</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🌐</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Web Applications</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Action menus and navigation dropdowns</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚙️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Admin Interfaces</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Complex action menus for power users</p>
          </div>
        </div>
      </div>
    </div>
  );
}