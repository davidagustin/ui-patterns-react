'use client';

import { useState, useRef, useEffect } from 'react';

export default function DropdownMenuPattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [isBasicOpen, setIsBasicOpen] = useState(false);
  const [isMultiLevelOpen, setIsMultiLevelOpen] = useState(false);
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [contextPosition, setContextPosition] = useState({ x: 0, y: 0 });
  
  const basicRef = useRef<HTMLDivElement>(null);
  const multiLevelRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (basicRef.current && !basicRef.current.contains(event.target as Node)) {
        setIsBasicOpen(false);
      }
      if (multiLevelRef.current && !multiLevelRef.current.contains(event.target as Node)) {
        setIsMultiLevelOpen(false);
      }
      if (contextRef.current && !contextRef.current.contains(event.target as Node)) {
        setIsContextOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextPosition({ x: event.clientX, y: event.clientY });
    setIsContextOpen(true);
  };

  const menuItems = [
    { id: 1, label: 'Profile', icon: '👤', shortcut: '⌘P' },
    { id: 2, label: 'Settings', icon: '⚙️', shortcut: '⌘,' },
    { id: 3, label: 'Help', icon: '❓', shortcut: '⌘?' },
    { id: 4, label: 'Sign out', icon: '↗️', shortcut: '⌘Q', danger: true },
  ];

  const multiLevelItems = [
    { 
      id: 1, 
      label: 'File', 
      icon: '📁',
      subItems: [
        { id: 11, label: 'New', icon: '📄', shortcut: '⌘N' },
        { id: 12, label: 'Open', icon: '📂', shortcut: '⌘O' },
        { id: 13, label: 'Save', icon: '💾', shortcut: '⌘S' },
      ]
    },
    { 
      id: 2, 
      label: 'Edit', 
      icon: '✏️',
      subItems: [
        { id: 21, label: 'Cut', icon: '✂️', shortcut: '⌘X' },
        { id: 22, label: 'Copy', icon: '📋', shortcut: '⌘C' },
        { id: 23, label: 'Paste', icon: '📄', shortcut: '⌘V' },
      ]
    },
    { id: 3, label: 'View', icon: '👁️' },
    { id: 4, label: 'Help', icon: '❓' },
  ];

  const [hoveredMultiItem, setHoveredMultiItem] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📋 Dropdown Menu Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Create versatile dropdown menus with multi-level support, keyboard navigation, and context menus for rich interactive experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Examples
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Multiple dropdown styles: basic menu, multi-level navigation, and context menu (right-click the gray area).
            </p>
            
            <div className="space-y-6">
              {/* Basic Dropdown */}
              <div className="space-y-2">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Basic Dropdown Menu</h3>
                <div ref={basicRef} className="relative inline-block">
                  <button
                    onClick={() => setIsBasicOpen(!isBasicOpen)}
                    className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-gray-700 dark:text-gray-300">Account</span>
                    <svg 
                      className={`w-4 h-4 text-gray-500 transition-transform ${isBasicOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isBasicOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                      <div className="py-2">
                        {menuItems.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => {
                              console.log(`Clicked: ${item.label}`);
                              setIsBasicOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                              item.danger 
                                ? 'text-red-600 dark:text-red-400' 
                                : 'text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <span>{item.icon}</span>
                              <span>{item.label}</span>
                            </div>
                            <span className="text-xs text-gray-400 dark:text-gray-500">{item.shortcut}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Multi-level Dropdown */}
              <div className="space-y-2">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Multi-level Dropdown Menu</h3>
                <div ref={multiLevelRef} className="relative inline-block">
                  <button
                    onClick={() => setIsMultiLevelOpen(!isMultiLevelOpen)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <span>Menu</span>
                    <svg 
                      className={`w-4 h-4 transition-transform ${isMultiLevelOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isMultiLevelOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                      <div className="py-2">
                        {multiLevelItems.map((item) => (
                          <div
                            key={item.id}
                            className="relative"
                            onMouseEnter={() => setHoveredMultiItem(item.id)}
                            onMouseLeave={() => setHoveredMultiItem(null)}
                          >
                            <button
                              className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                              </div>
                              {item.subItems && (
                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              )}
                            </button>

                            {/* Submenu */}
                            {item.subItems && hoveredMultiItem === item.id && (
                              <div className="absolute left-full top-0 ml-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="py-2">
                                  {item.subItems.map((subItem) => (
                                    <button
                                      key={subItem.id}
                                      onClick={() => {
                                        console.log(`Clicked: ${subItem.label}`);
                                        setIsMultiLevelOpen(false);
                                        setHoveredMultiItem(null);
                                      }}
                                      className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    >
                                      <div className="flex items-center space-x-3">
                                        <span>{subItem.icon}</span>
                                        <span>{subItem.label}</span>
                                      </div>
                                      <span className="text-xs text-gray-400 dark:text-gray-500">{subItem.shortcut}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Context Menu Area */}
              <div className="space-y-2">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Context Menu (Right-click)</h3>
                <div
                  ref={contextRef}
                  className="relative bg-gray-100 dark:bg-gray-700 rounded-lg p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer"
                  onContextMenu={handleContextMenu}
                >
                  <div className="text-center text-gray-600 dark:text-gray-400">
                    Right-click anywhere in this area to open context menu
                  </div>

                  {/* Context Menu */}
                  {isContextOpen && (
                    <div 
                      className="fixed bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                      style={{ 
                        left: `${contextPosition.x}px`, 
                        top: `${contextPosition.y}px`,
                        minWidth: '160px'
                      }}
                    >
                      <div className="py-2">
                        <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          <span>📋</span>
                          <span>Copy</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          <span>📄</span>
                          <span>Paste</span>
                        </button>
                        <hr className="my-2 border-gray-200 dark:border-gray-700" />
                        <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          <span>🔄</span>
                          <span>Refresh</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          <span>🗑️</span>
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Interactive Features</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• Basic dropdown with icons and keyboard shortcuts</div>
                <div>• Multi-level menu with hover-triggered submenus</div>
                <div>• Context menu activated by right-click</div>
                <div>• Click outside to close all menus</div>
                <div>• Smooth animations and hover effects</div>
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
{`import { useState, useRef, useEffect } from 'react';

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [contextPosition, setContextPosition] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const dropdownRef = useRef(null);
  const contextRef = useRef(null);

  const menuItems = [
    { id: 1, label: 'Profile', icon: '👤', shortcut: '⌘P' },
    { id: 2, label: 'Settings', icon: '⚙️', shortcut: '⌘,' },
    { id: 3, label: 'Help', icon: '❓', shortcut: '⌘?' },
    { id: 4, label: 'Sign out', icon: '↗️', shortcut: '⌘Q', danger: true },
  ];

  const multiLevelItems = [
    { 
      id: 1, 
      label: 'File', 
      icon: '📁',
      subItems: [
        { id: 11, label: 'New', icon: '📄', shortcut: '⌘N' },
        { id: 12, label: 'Open', icon: '📂', shortcut: '⌘O' },
        { id: 13, label: 'Save', icon: '💾', shortcut: '⌘S' },
      ]
    },
    { 
      id: 2, 
      label: 'Edit', 
      icon: '✏️',
      subItems: [
        { id: 21, label: 'Cut', icon: '✂️', shortcut: '⌘X' },
        { id: 22, label: 'Copy', icon: '📋', shortcut: '⌘C' },
        { id: 23, label: 'Paste', icon: '📄', shortcut: '⌘V' },
      ]
    },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (contextRef.current && !contextRef.current.contains(event.target)) {
        setIsContextOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextPosition({ x: event.clientX, y: event.clientY });
    setIsContextOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Basic Dropdown */}
      <div ref={dropdownRef} className="relative inline-block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span className="text-gray-700">Account</span>
          <svg className={\`w-4 h-4 text-gray-500 transition-transform \${isOpen ? 'rotate-180' : ''}\`} 
               fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="py-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    console.log(\`Clicked: \${item.label}\`);
                    setIsOpen(false);
                  }}
                  className={\`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 transition-colors \${
                    item.danger ? 'text-red-600' : 'text-gray-700'
                  }\`}
                >
                  <div className="flex items-center space-x-3">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <span className="text-xs text-gray-400">{item.shortcut}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Multi-level Dropdown */}
      <div className="relative inline-block">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Multi-level Menu
        </button>

        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-2">
            {multiLevelItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.subItems && (
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>

                {/* Submenu */}
                {item.subItems && hoveredItem === item.id && (
                  <div className="absolute left-full top-0 ml-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                    <div className="py-2">
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.id}
                          className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <span>{subItem.icon}</span>
                            <span>{subItem.label}</span>
                          </div>
                          <span className="text-xs text-gray-400">{subItem.shortcut}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Context Menu */}
      <div
        ref={contextRef}
        className="bg-gray-100 rounded-lg p-8 border-2 border-dashed border-gray-300 cursor-pointer"
        onContextMenu={handleContextMenu}
      >
        <div className="text-center text-gray-600">
          Right-click for context menu
        </div>

        {isContextOpen && (
          <div 
            className="fixed bg-white rounded-lg shadow-lg border border-gray-200 z-50"
            style={{ 
              left: \`\${contextPosition.x}px\`, 
              top: \`\${contextPosition.y}px\`,
              minWidth: '160px'
            }}
          >
            <div className="py-2">
              <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                <span>📋</span>
                <span>Copy</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                <span>📄</span>
                <span>Paste</span>
              </button>
              <hr className="my-2 border-gray-200" />
              <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors">
                <span>🗑️</span>
                <span>Delete</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Dropdown Container */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Button */
.dropdown-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-button:hover {
  background-color: #f9fafb;
}

.dropdown-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.dropdown-arrow {
  width: 1rem;
  height: 1rem;
  color: #6b7280;
  transition: transform 0.2s ease;
}

.dropdown-arrow.open {
  transform: rotate(180deg);
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  min-width: 12rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  z-index: 50;
  animation: fadeInUp 0.2s ease-out;
}

.dropdown-menu-content {
  padding: 0.5rem 0;
}

/* Menu Item */
.menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #374151;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: left;
}

.menu-item:hover {
  background-color: #f3f4f6;
}

.menu-item.danger {
  color: #dc2626;
}

.menu-item-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.menu-item-icon {
  font-size: 1rem;
}

.menu-item-shortcut {
  font-size: 0.75rem;
  color: #9ca3af;
}

/* Multi-level Menu */
.menu-item-with-submenu {
  position: relative;
}

.submenu {
  position: absolute;
  left: 100%;
  top: 0;
  margin-left: 0.5rem;
  min-width: 12rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  z-index: 51;
  animation: fadeInRight 0.2s ease-out;
}

.submenu-arrow {
  width: 1rem;
  height: 1rem;
  color: #9ca3af;
}

/* Context Menu */
.context-menu {
  position: fixed;
  min-width: 10rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  z-index: 100;
  animation: fadeInScale 0.15s ease-out;
}

.context-menu-area {
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  padding: 2rem;
  border: 2px dashed #d1d5db;
  cursor: pointer;
  text-align: center;
  color: #6b7280;
}

/* Menu Divider */
.menu-divider {
  margin: 0.5rem 0;
  border-top: 1px solid #e5e7eb;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive Design */
@media (max-width: 640px) {
  .dropdown-menu {
    left: auto;
    right: 0;
    min-width: 10rem;
  }
  
  .submenu {
    left: auto;
    right: 100%;
    margin-left: 0;
    margin-right: 0.5rem;
  }
  
  .context-menu {
    min-width: 8rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .dropdown-button {
    background-color: #1f2937;
    border-color: #374151;
    color: #d1d5db;
  }
  
  .dropdown-button:hover {
    background-color: #374151;
  }
  
  .dropdown-menu,
  .submenu,
  .context-menu {
    background-color: #1f2937;
    border-color: #374151;
  }
  
  .menu-item {
    color: #d1d5db;
  }
  
  .menu-item:hover {
    background-color: #374151;
  }
  
  .menu-item.danger {
    color: #f87171;
  }
  
  .menu-item-shortcut {
    color: #6b7280;
  }
  
  .context-menu-area {
    background-color: #374151;
    border-color: #4b5563;
    color: #9ca3af;
  }
  
  .menu-divider {
    border-color: #374151;
  }
}

/* Focus and Accessibility */
.dropdown-button:focus-visible,
.menu-item:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.dropdown-menu[role="menu"] {
  role: menu;
}

.menu-item[role="menuitem"] {
  role: menuitem;
}

.menu-item[aria-expanded="true"] .submenu-arrow {
  transform: rotate(90deg);
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .dropdown-button,
  .dropdown-menu,
  .submenu,
  .context-menu {
    border-width: 2px;
  }
  
  .menu-item:hover {
    outline: 1px solid #000;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .dropdown-arrow,
  .submenu-arrow {
    transition: none;
  }
  
  .dropdown-menu,
  .submenu,
  .context-menu {
    animation: none;
  }
}

/* Print Styles */
@media print {
  .dropdown-menu,
  .submenu,
  .context-menu {
    display: none;
  }
}

/* Loading State */
.menu-item.loading {
  opacity: 0.6;
  pointer-events: none;
}

.menu-item.loading .menu-item-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Menu Badge */
.menu-item-badge {
  background-color: #ef4444;
  color: white;
  font-size: 0.75rem;
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  margin-left: 0.5rem;
}

/* Keyboard Navigation Hints */
.menu-item-hint {
  position: absolute;
  left: -9999px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.menu-item:focus .menu-item-hint {
  position: static;
  left: auto;
  opacity: 1;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Multi-level Support</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Nested submenus with hover activation</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Context Menus</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Right-click activated contextual actions</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Keyboard Shortcuts</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Display keyboard shortcuts in menu items</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Icons & Visual Cues</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Icons, separators, and danger states</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Auto-Close</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Click outside to close functionality</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Smooth Animations</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Fade-in effects and smooth transitions</p>
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
            <div className="text-2xl mb-2">📋</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Application Menus</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">File, Edit, View menus in desktop apps</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">👤</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">User Profile Menus</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Account settings and user actions</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🖱️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Context Actions</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Right-click menus for contextual operations</p>
          </div>
        </div>
      </div>
    </div>
  );
}