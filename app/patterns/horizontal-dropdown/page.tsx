"use client";
import { useState, useRef, useEffect } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
export default function HorizontalDropdownPattern() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const menuItems = [
    {
      id: "products",
      label: "Products",
      items: [
        {
          id: "web-app",
          label: "Web Application",
          description: "Build modern web apps",
          icon: "🌐",
        },
        {
          id: "mobile-app",
          label: "Mobile App",
          description: "iOS and Android apps",
          icon: "📱",
        },
        {
          id: "desktop-app",
          label: "Desktop App",
          description: "Cross-platform desktop",
          icon: "💻",
        },
        {
          id: "api",
          label: "API Services",
          description: "RESTful and GraphQL APIs",
          icon: "🔌",
        },
      ],
    },
    {
      id: "solutions",
      label: "Solutions",
      items: [
        {
          id: "ecommerce",
          label: "E-commerce",
          description: "Online store solutions",
          icon: "🛒",
        },
        {
          id: "cms",
          label: "Content Management",
          description: "Manage your content",
          icon: "📝",
        },
        {
          id: "analytics",
          label: "Analytics",
          description: "Data insights and reports",
          icon: "📊",
        },
        {
          id: "automation",
          label: "Automation",
          description: "Workflow automation",
          icon: "⚡",
        },
      ],
    },
    {
      id: "resources",
      label: "Resources",
      items: [
        {
          id: "docs",
          label: "Documentation",
          description: "Comprehensive guides",
          icon: "📚",
        },
        {
          id: "tutorials",
          label: "Tutorials",
          description: "Step-by-step tutorials",
          icon: "🎓",
        },
        {
          id: "blog",
          label: "Blog",
          description: "Latest news and updates",
          icon: "📰",
        },
        {
          id: "community",
          label: "Community",
          description: "Join our community",
          icon: "👥",
        },
      ],
    },
  ];
  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ↔️ Horizontal Dropdown Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Organize navigation items in a horizontal layout with dropdown menus,
          perfect for main navigation bars and mega menus.
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
              Hover over or click the navigation items to see horizontal
              dropdown menus. Each menu shows organized content with icons and
              descriptions.
            </p>
            <div
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-visible horizontal-dropdown-container"
              ref={dropdownRef}
            >
              {/* Main Navigation Bar */}
              <div className="horizontal-dropdown-nav">
                {/* Logo */}
                <div className="flex items-center px-4 lg:px-6 py-4">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    🚀 TechCorp
                  </span>
                </div>
                {/* Navigation Items */}
                <div className="flex flex-col lg:flex-row lg:flex-1 relative">
                  {menuItems.map((item) => (
                    <div key={item.id} className="relative">
                      <button
                        onClick={() => toggleDropdown(item.id)}
                        onMouseEnter={() => setActiveDropdown(item.id)}
                        className={`flex items-center justify-between lg:justify-start space-x-1 px-4 lg:px-6 py-4 text-sm font-medium transition-all duration-200 w-full lg:w-auto ${
                          activeDropdown === item.id
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === item.id ? "rotate-180" : ""
                          }`}
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
                      {/* Dropdown Menu */}
                      {activeDropdown === item.id && (
                        <div className="absolute top-full left-0 mt-1 w-80 max-w-[calc(100vw-2rem)] lg:max-w-none lg:w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
                          <div className="p-4">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                              {item.label}
                            </h3>
                            <div className="grid grid-cols-1 gap-2">
                              {item.items.map((subItem) => (
                                <button
                                  key={subItem.id}
                                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left group"
                                >
                                  <span className="text-xl flex-shrink-0">
                                    {subItem.icon}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 dark:text-gray-100 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                      {subItem.label}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                      {subItem.description}
                                    </div>
                                  </div>
                                  <svg
                                    className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-900">
                            <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                              View all {item.label.toLowerCase()} →
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* Mega Menu Example */}
              <div className="p-4 md:p-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Mega Menu Style
                </h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 md:p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {menuItems.map((section) => (
                      <div key={`mega-${section.id}`}>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm">
                          {section.label}
                        </h4>
                        <ul className="space-y-2">
                          {section.items.map((item) => (
                            <li key={`mega-${item.id}`}>
                              <button className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-full text-left">
                                <span className="text-base">{item.icon}</span>
                                <span className="truncate">{item.label}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
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
            <div className="code-block">
              <DynamicCodeExample componentName="horizontal-dropdown" />
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
                Horizontal Layout
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Efficient use of horizontal space in navigation bars
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Rich Content
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Icons, descriptions, and organized menu items
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Hover & Click Support
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Both hover and click interactions supported
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Mega Menu Option
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Support for large, multi-column menus
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
            <div className="text-2xl mb-2">🌐</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Website Headers
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Main navigation for websites and web apps
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              E-commerce
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Product category navigation and mega menus
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🏢</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Corporate Sites
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Service and solution category navigation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
