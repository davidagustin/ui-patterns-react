"use client";

import { useState, useRef, useEffect } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function ShortcutDropdownPattern() {
  const [activeTab, setActiveTab] = useState<"jsx" | "css">("jsx");
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const shortcuts = [
    {
      id: "new-project",
      label: "New Project",
      icon: "📁",
      shortcut: "Ctrl+N",
      action: () => console.log("New project"),
    },
    {
      id: "new-file",
      label: "New File",
      icon: "📄",
      shortcut: "Ctrl+Alt+N",
      action: () => console.log("New file"),
    },
    {
      id: "open-file",
      label: "Open File",
      icon: "📂",
      shortcut: "Ctrl+O",
      action: () => console.log("Open file"),
    },
    {
      id: "save",
      label: "Save",
      icon: "💾",
      shortcut: "Ctrl+S",
      action: () => console.log("Save"),
    },
    {
      id: "search",
      label: "Global Search",
      icon: "🔍",
      shortcut: "Ctrl+Shift+F",
      action: () => console.log("Search"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙️",
      shortcut: "Ctrl+,",
      action: () => console.log("Settings"),
    },
  ];

  const quickActions = [
    {
      id: "copy-link",
      label: "Copy Link",
      icon: "🔗",
      action: () => console.log("Copy link"),
    },
    {
      id: "export",
      label: "Export Data",
      icon: "📊",
      action: () => console.log("Export"),
    },
    {
      id: "share",
      label: "Share",
      icon: "📤",
      action: () => console.log("Share"),
    },
    {
      id: "duplicate",
      label: "Duplicate",
      icon: "📋",
      action: () => console.log("Duplicate"),
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShortcutAction = (shortcut: any) => {
    shortcut.action();
    setIsOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ⚡ Shortcut Dropdown Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Provide quick access to frequently used actions and shortcuts through
          a convenient dropdown interface.
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
              Click the shortcut button to see available actions and keyboard
              shortcuts. Try clicking on different shortcuts.
            </p>

            <div className="space-y-4">
              {/* Main Shortcut Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span>⚡</span>
                  <span>Quick Actions</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    {/* Keyboard Shortcuts Section */}
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Keyboard Shortcuts
                      </h3>
                      <div className="space-y-1">
                        {shortcuts.map((shortcut) => (
                          <button
                            key={shortcut.id}
                            onClick={() => handleShortcutAction(shortcut)}
                            className="flex items-center justify-between w-full px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          >
                            <div className="flex items-center space-x-2">
                              <span>{shortcut.icon}</span>
                              <span>{shortcut.label}</span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              {shortcut.shortcut}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions Section */}
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Quick Actions
                      </h3>
                      <div className="space-y-1">
                        {quickActions.map((action) => (
                          <button
                            key={action.id}
                            onClick={() => handleShortcutAction(action)}
                            className="flex items-center space-x-2 w-full px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          >
                            <span>{action.icon}</span>
                            <span>{action.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Toolbar with Multiple Shortcut Dropdowns */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Toolbar with Shortcut Dropdowns
                </h3>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    📁 File
                  </button>
                  <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    ✏️ Edit
                  </button>
                  <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    👁️ View
                  </button>
                  <div className="flex-1"></div>
                  <button className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                    ⚡ Shortcuts
                  </button>
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

            <div className="code-block">
              {
                <DynamicCodeExample componentName="shortcut-dropdown" />
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
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Quick Access
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Instant access to frequently used actions
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Keyboard Shortcuts
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Display keyboard shortcuts for power users
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Organized Sections
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Group related actions in logical sections
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Click Outside to Close
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Intuitive interaction behavior
              </p>
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
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Code Editors
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Quick access to commands and shortcuts
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🏢</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Admin Panels
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Streamlined administrative actions
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Power User Tools
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Advanced shortcuts for experienced users
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
