"use client";

import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function ModuleTabsPattern() {
    const [activeMainTab, setActiveMainTab] = useState("overview");
  const [activeSubTab, setActiveSubTab] = useState("metrics");

  const mainTabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "details", label: "Details", icon: "📋" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const subTabs = {
    overview: [
      { id: "metrics", label: "Key Metrics" },
      { id: "charts", label: "Charts" },
      { id: "reports", label: "Reports" },
    ],
    details: [
      { id: "general", label: "General Info" },
      { id: "specifications", label: "Specifications" },
      { id: "documentation", label: "Documentation" },
    ],
    settings: [
      { id: "basic", label: "Basic Settings" },
      { id: "advanced", label: "Advanced" },
      { id: "permissions", label: "Permissions" },
    ],
  };

  const handleMainTabChange = (tabId: string) => {
    setActiveMainTab(tabId);
    // Reset to first sub-tab when changing main tab
    const firstSubTab = subTabs[tabId as keyof typeof subTabs][0];
    setActiveSubTab(firstSubTab.id);
  };

  const getContentForTab = (): { title: string; content: React.ReactNode } => {
    const content: Record<
      string,
      Record<string, { title: string; content: React.ReactNode }>
    > = {
      overview: {
        metrics: {
          title: "Key Performance Metrics",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  98.5%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Uptime
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  1,234
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Active Users
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  $12.5K
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Revenue
                </div>
              </div>
            </div>
          ),
        },
        charts: {
          title: "Data Visualization",
          content: (
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="font-medium mb-4">User Growth Chart</h4>
                <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-end justify-center text-white font-medium">
                  Chart Placeholder
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="font-medium mb-4">Revenue Trends</h4>
                <div className="h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-end justify-center text-white font-medium">
                  Chart Placeholder
                </div>
              </div>
            </div>
          ),
        },
        reports: {
          title: "Generated Reports",
          content: (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">
                    Monthly Performance Report
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Generated on March 1, 2024
                  </div>
                </div>
                <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  Download
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">
                    User Analytics Summary
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Generated on February 28, 2024
                  </div>
                </div>
                <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  Download
                </button>
              </div>
            </div>
          ),
        },
      },
      details: {
        general: {
          title: "General Information",
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Project Name
                  </label>
                  <div className="text-gray-900 dark:text-gray-100">
                    UI Patterns React
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Version
                  </label>
                  <div className="text-gray-900 dark:text-gray-100">1.0.0</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Created Date
                  </label>
                  <div className="text-gray-900 dark:text-gray-100">
                    January 15, 2024
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Modified
                  </label>
                  <div className="text-gray-900 dark:text-gray-100">
                    March 8, 2024
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        specifications: {
          title: "Technical Specifications",
          content: (
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Dependencies</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• React 19.1.0</li>
                  <li>• Next.js 15.4.6</li>
                  <li>• TypeScript 5.x</li>
                  <li>• Tailwind CSS 3.x</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Browser Support</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Chrome 90+</li>
                  <li>• Firefox 88+</li>
                  <li>• Safari 14+</li>
                  <li>• Edge 90+</li>
                </ul>
              </div>
            </div>
          ),
        },
        documentation: {
          title: "Documentation",
          content: (
            <div className="space-y-4">
              <div className="prose dark:prose-invert max-w-none">
                <h4>Getting Started</h4>
                <p>
                  This module provides comprehensive UI patterns for modern
                  React applications. Each pattern includes interactive examples
                  and clean, reusable code.
                </p>
                <h4>Usage</h4>
                <p>
                  Import the components you need and customize them according to
                  your design requirements. All patterns support dark mode and
                  are fully responsive.
                </p>
                <h4>Contributing</h4>
                <p>
                  We welcome contributions! Please read our contributing
                  guidelines before submitting pull requests.
                </p>
              </div>
            </div>
          ),
        },
      },
      settings: {
        basic: {
          title: "Basic Configuration",
          content: (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">
                    Dark Mode
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Toggle dark theme
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                  Enabled
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">
                    Notifications
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Email notifications
                  </div>
                </div>
                <button className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded text-sm">
                  Disabled
                </button>
              </div>
            </div>
          ),
        },
        advanced: {
          title: "Advanced Settings",
          content: (
            <div className="space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="text-yellow-600 dark:text-yellow-400 mr-3">
                    ⚠️
                  </div>
                  <div>
                    <div className="font-medium text-yellow-800 dark:text-yellow-200">
                      Advanced Configuration
                    </div>
                    <div className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      These settings require technical knowledge. Changes may
                      affect system performance.
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    API Timeout (ms)
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                    defaultValue="5000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cache Duration (hours)
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                    defaultValue="24"
                  />
                </div>
              </div>
            </div>
          ),
        },
        permissions: {
          title: "User Permissions",
          content: (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-200">
                      Read Access
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      View content and data
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600"
                  />
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-200">
                      Write Access
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Create and edit content
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600"
                  />
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-200">
                      Admin Access
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Full system administration
                    </div>
                  </div>
                  <input type="checkbox" className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </div>
          ),
        },
      },
    };

    const mainContent = content[activeMainTab as keyof typeof content];
    return (
      mainContent?.[activeSubTab as keyof typeof mainContent] || {
        title: "Content",
        content: <div>Select a tab to view content</div>,
      }
    );
  };

  const currentContent = getContentForTab();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📑 Module Tabs Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Module tabs provide secondary navigation within a specific section,
          organizing related content into logical sub-sections.
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
              Click on main tabs and sub-tabs to see the hierarchical
              navigation. Notice how sub-tabs change based on the main tab
              selection.
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Main Navigation Tabs */}
              <div className="flex bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                {mainTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleMainTabChange(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 font-medium text-sm transition-all duration-200 border-b-2 ${
                      activeMainTab === tab.id
                        ? "text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 border-blue-600 dark:border-blue-400"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 border-transparent"
                    }`}
                  >
                    <span className="text-base">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Sub-tabs (Module Tabs) */}
              <div className="flex bg-gray-25 dark:bg-gray-850 border-b border-gray-100 dark:border-gray-750 overflow-x-auto">
                {subTabs[activeMainTab as keyof typeof subTabs].map(
                  (subTab) => (
                    <button
                      key={subTab.id}
                      onClick={() => setActiveSubTab(subTab.id)}
                      className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                        activeSubTab === subTab.id
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-b-2 border-blue-600 dark:border-blue-400"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      {subTab.label}
                    </button>
                  ),
                )}
              </div>

              {/* Content Area */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  {currentContent.title}
                </h3>
                <div className="text-gray-600 dark:text-gray-400">
                  {currentContent.content}
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

            {/* Tab Content */}
            <div className="code-block">
              {
                <DynamicCodeExample componentName="module-tabs" />
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
                Hierarchical Navigation
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Two-level tab system for organized content
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Auto Sub-tab Reset
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Resets to first sub-tab when main tab changes
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Responsive Layout
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Adapts to mobile with stacked layout
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Content Organization
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Clear separation of related content sections
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
            <div className="text-2xl mb-2">🏢</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Admin Panels
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Organize admin features into logical sections
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Dashboards
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Group related metrics and data views
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚙️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Settings Pages
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Categorize different configuration options
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
