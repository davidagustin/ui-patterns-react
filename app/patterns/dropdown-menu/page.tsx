"use client";
import { useState, useRef, useEffect } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
export default function DropdownMenuPattern() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuItems = [
    {
      id: "profile",
      label: "Profile",
      icon: "👤",
      description: "View your profile settings",
      action: () => console.log("Profile clicked"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙️",
      description: "Manage your preferences",
      action: () => console.log("Settings clicked"),
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: "🔔",
      description: "Configure notification preferences",
      action: () => console.log("Notifications clicked"),
    },
    {
      id: "help",
      label: "Help & Support",
      icon: "❓",
      description: "Get help and contact support",
      action: () => console.log("Help clicked"),
    },
    {
      id: "logout",
      label: "Logout",
      icon: "🚪",
      description: "Sign out of your account",
      action: () => console.log("Logout clicked"),
      danger: true,
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
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleItemClick = (item: (typeof menuItems)[0]) => {
    item.action();
    setSelectedOption(item.label);
    setIsOpen(false);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📋 Dropdown Menu Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Interactive dropdown menus with icons, descriptions, and keyboard
          navigation for enhanced user experience.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Click the dropdown button to open the menu. Use keyboard
              navigation and click outside to close.
            </p>
            {/* Dropdown Container */}
            <div
              className="relative"
              ref={dropdownRef}
              onKeyDown={handleKeyDown}
            >
              {/* Trigger Button */}
              <button
                onClick={handleToggle}
                className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                <span className="text-lg">👤</span>
                <span className="font-medium">
                  {selectedOption || "User Menu"}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                  {/* Menu Header */}
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                          JD
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          John Doe
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          john@example.com
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Menu Items */}
                  <div className="py-2">
                    {menuItems.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                          item.danger
                            ? "hover:bg-red-50 dark:hover:bg-red-900/20"
                            : ""
                        } ${index === 0 ? "rounded-t-lg" : ""} ${index === menuItems.length - 1 ? "rounded-b-lg" : ""}`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{item.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm font-medium ${
                                item.danger
                                  ? "text-red-600 dark:text-red-400"
                                  : "text-gray-900 dark:text-gray-100"
                              }`}
                            >
                              {item.label}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {item.description}
                            </p>
                          </div>
                          {item.danger && (
                            <span className="text-red-500 text-xs">⚠️</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  {/* Menu Footer */}
                  <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Version 2.1.0 • Last updated 2 hours ago
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Status Display */}
            {selectedOption && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-green-800 dark:text-green-200">
                    Selected: <strong>{selectedOption}</strong>
                  </span>
                </div>
              </div>
            )}
            {/* Instructions */}
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                How to Use
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>
                  • <strong>Click:</strong> Open/close the dropdown menu
                </div>
                <div>
                  • <strong>Keyboard:</strong> Use Escape to close
                </div>
                <div>
                  • <strong>Click Outside:</strong> Close the menu
                </div>
                <div>
                  • <strong>Hover:</strong> Highlight menu items
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Code Example */}
<DynamicCodeExample componentName="dropdown-menu" />
          </div>
        </div>
      </div>
      {/* Key Features */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <h2 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">
            ✨ Key Features
          </h2>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>
              • <strong>Click Outside to Close:</strong> Automatically closes
              when clicking outside
            </li>
            <li>
              • <strong>Keyboard Navigation:</strong> Escape key to close menu
            </li>
            <li>
              • <strong>Visual Icons:</strong> Icons for better visual
              identification
            </li>
            <li>
              • <strong>Descriptions:</strong> Additional context for menu items
            </li>
            <li>
              • <strong>Danger States:</strong> Special styling for destructive
              actions
            </li>
            <li>
              • <strong>Smooth Animations:</strong> CSS transitions for
              opening/closing
            </li>
            <li>
              • <strong>Accessibility:</strong> Proper ARIA attributes and focus
              management
            </li>
            <li>
              • <strong>Responsive Design:</strong> Works on all screen sizes
            </li>
            <li>
              • <strong>Dynamic Code Generation:</strong> Code example extracted
              from actual source files
            </li>
          </ul>
        </div>
      </div>
      {/* Common Use Cases */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <h2 className="text-xl font-semibold mb-4 text-purple-800 dark:text-purple-200">
            🎯 Common Use Cases
          </h2>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>
              • <strong>User Menus:</strong> Profile, settings, and account
              actions
            </li>
            <li>
              • <strong>Action Menus:</strong> Context-specific actions and
              operations
            </li>
            <li>
              • <strong>Navigation:</strong> Secondary navigation and sub-menus
            </li>
            <li>
              • <strong>Toolbars:</strong> Application toolbar actions
            </li>
            <li>
              • <strong>File Operations:</strong> File and document actions
            </li>
            <li>
              • <strong>Data Actions:</strong> Row-level actions in data tables
            </li>
            <li>
              • <strong>Content Management:</strong> Edit, delete, and share
              options
            </li>
            <li>
              • <strong>Application Settings:</strong> Configuration and
              preferences
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
