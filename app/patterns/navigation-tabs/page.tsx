"use client";

import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
import Link from "next/link";

export default function NavigationTabsPattern() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const navigationTabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "📊",
      href: "/dashboard",
      badge: null,
    },
    {
      id: "projects",
      label: "Projects",
      icon: "📁",
      href: "/projects",
      badge: 5,
    },
    { id: "team", label: "Team", icon: "👥", href: "/team", badge: null },
    {
      id: "analytics",
      label: "Analytics",
      icon: "📈",
      href: "/analytics",
      badge: "New",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙️",
      href: "/settings",
      badge: null,
    },
    { id: "help", label: "Help", icon: "❓", href: "/help", badge: null },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    // In a real application, this would handle navigation
    console.log(`Navigating to: ${tabId}`);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🧭 Navigation Tabs Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Primary navigation tabs provide the main structure of your
          application, allowing users to switch between top-level sections.
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
              Click on different navigation tabs to see how they work as primary
              navigation. Notice the active states and badges.
            </p>

            {/* Navigation Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <nav className="flex bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 overflow-x-auto scrollbar-hide">
                {navigationTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 font-medium text-sm relative transition-all duration-200 border-b-2 min-h-[44px] whitespace-nowrap ${
                      activeTab === tab.id
                        ? "text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 border-blue-600 dark:border-blue-400"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 border-transparent"
                    }`}
                  >
                    <span className="text-base">{tab.icon}</span>
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          typeof tab.badge === "number"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              {/* Tab Content Area */}
              <div className="p-6">
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">
                    {navigationTabs.find((tab) => tab.id === activeTab)?.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {navigationTabs.find((tab) => tab.id === activeTab)?.label}{" "}
                    Section
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    This would be the main content area for the{" "}
                    {navigationTabs
                      .find((tab) => tab.id === activeTab)
                      ?.label.toLowerCase()}{" "}
                    section of your application.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Example */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Mobile Navigation
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 max-w-sm">
                <div className="grid grid-cols-3 gap-2">
                  {navigationTabs.slice(0, 6).map((tab) => (
                    <button
                      key={`mobile-${tab.id}`}
                      onClick={() => handleTabClick(tab.id)}
                      className={`flex flex-col items-center p-3 rounded-lg text-xs transition-colors min-h-[60px] relative ${
                        activeTab === tab.id
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <span className="text-lg mb-1">{tab.icon}</span>
                      <span className="font-medium">{tab.label}</span>
                      {tab.badge && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                          {typeof tab.badge === "number" ? tab.badge : "!"}
                        </span>
                      )}
                    </button>
                  ))}
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
                <DynamicCodeExample componentName="navigation-tabs" />
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
                Primary Navigation
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Main application sections and top-level navigation
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Badge Support
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Show notifications, counts, or status indicators
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Responsive Design
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Adapts to mobile with grid layout
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Active State
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Clear indication of current section
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
              Admin Dashboards
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Main navigation for admin panels and dashboards
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📱</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Mobile Apps
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Primary navigation for mobile applications
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🌐</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Web Applications
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Main sections for web apps and portals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
