'use client';

import { useState, useRef, useEffect } from 'react';
import { DynamicCodeExample } from '../../../components/shared/CodeGenerator';

export default function DropdownMenuPattern() {
  
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [isBasicOpen, setIsBasicOpen] = useState(false);
  const [isMultiLevelOpen, setIsMultiLevelOpen] = useState(false);
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [contextPosition, setContextPosition] = useState({ x: 0, y: 0 });
  const [isKeyboardMenuOpen, setIsKeyboardMenuOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
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
  const [expandedMultiItem, setExpandedMultiItem] = useState<number | null>(null);

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
                    className="flex items-center space-x-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors min-h-[44px] text-base"
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
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                      <div className="py-2">
                        {menuItems.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => {
                              console.log(`Clicked: ${item.label}`);
                              setIsBasicOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-4 py-3 text-base hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors min-h-[44px] ${
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
                    className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-h-[44px] text-base"
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
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                      <div className="py-2">
                        {multiLevelItems.map((item) => (
                          <div key={item.id} className="relative">
                            <button
                              onClick={() => {
                                if (item.subItems) {
                                  setExpandedMultiItem(expandedMultiItem === item.id ? null : item.id);
                                } else {
                                  console.log(`Clicked: ${item.label}`);
                                  setIsMultiLevelOpen(false);
                                  setExpandedMultiItem(null);
                                }
                              }}
                              onMouseEnter={() => setHoveredMultiItem(item.id)}
                              onMouseLeave={() => setHoveredMultiItem(null)}
                              className="w-full flex items-center justify-between px-4 py-3 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors min-h-[44px]"
                            >
                              <div className="flex items-center space-x-3">
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                              </div>
                              {item.subItems && (
                                <svg 
                                  className={`w-4 h-4 text-gray-400 transition-transform ${expandedMultiItem === item.id ? 'rotate-90' : ''}`} 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              )}
                            </button>

                            {/* Submenu - Mobile: Accordion style, Desktop: Hover flyout */}
                            {item.subItems && (expandedMultiItem === item.id || hoveredMultiItem === item.id) && (
                              <div className="md:absolute md:left-full md:top-0 md:ml-2 w-full md:w-56 bg-gray-50 md:bg-white dark:bg-gray-700 md:dark:bg-gray-800 md:rounded-lg md:shadow-lg md:border md:border-gray-200 md:dark:border-gray-700">
                                <div className="py-2">
                                  {item.subItems.map((subItem) => (
                                    <button
                                      key={subItem.id}
                                      onClick={() => {
                                        console.log(`Clicked: ${subItem.label}`);
                                        setIsMultiLevelOpen(false);
                                        setExpandedMultiItem(null);
                                        setHoveredMultiItem(null);
                                      }}
                                      className="w-full flex items-center justify-between px-4 py-3 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors min-h-[44px]"
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

              {/* Keyboard Navigation Dropdown */}
              <div className="space-y-2">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Keyboard Navigation Menu</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Use Tab to focus, Enter to open, Arrow keys to navigate, Esc to close</p>
                <div className="relative inline-block">
                  <button
                    onClick={() => {
                      setIsKeyboardMenuOpen(!isKeyboardMenuOpen);
                      setFocusedIndex(-1);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsKeyboardMenuOpen(!isKeyboardMenuOpen);
                        setFocusedIndex(0);
                      } else if (e.key === 'ArrowDown' && isKeyboardMenuOpen) {
                        e.preventDefault();
                        setFocusedIndex(prev => prev < menuItems.length - 1 ? prev + 1 : 0);
                      } else if (e.key === 'ArrowUp' && isKeyboardMenuOpen) {
                        e.preventDefault();
                        setFocusedIndex(prev => prev > 0 ? prev - 1 : menuItems.length - 1);
                      } else if (e.key === 'Escape') {
                        setIsKeyboardMenuOpen(false);
                        setFocusedIndex(-1);
                      }
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    <span className="text-gray-700 dark:text-gray-300">Keyboard Menu</span>
                    <svg 
                      className={`w-4 h-4 text-gray-500 transition-transform ${isKeyboardMenuOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isKeyboardMenuOpen && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                      <div className="py-1">
                        {menuItems.map((item, index) => (
                          <button
                            key={item.id}
                            onClick={() => {
                              console.log(`Clicked: ${item.label}`);
                              setIsKeyboardMenuOpen(false);
                              setFocusedIndex(-1);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                console.log(`Selected: ${item.label}`);
                                setIsKeyboardMenuOpen(false);
                                setFocusedIndex(-1);
                              }
                            }}
                            className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                              focusedIndex === index
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                : item.danger
                                ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
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
            </div>

            <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Interactive Features</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• Basic dropdown with icons and keyboard shortcuts</div>
                <div>• Multi-level menu with hover-triggered submenus</div>
                <div>• Context menu activated by right-click</div>
                <div>• Full keyboard navigation with arrow keys</div>
                <div>• Click outside to close all menus</div>
                <div>• Focus management and accessibility support</div>
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

            {/* Tab Content */}
            <div className="code-block">
              {
                <DynamicCodeExample 
                componentName="dropdown-menu" 
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