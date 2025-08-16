"use client";
import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
export default function SidebarPattern() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: "📊", badge: null },
    { id: "users", name: "Users", icon: "👥", badge: "12" },
    { id: "analytics", name: "Analytics", icon: "📈", badge: null },
    { id: "orders", name: "Orders", icon: "📦", badge: "3" },
    { id: "products", name: "Products", icon: "🛍️", badge: null },
    { id: "settings", name: "Settings", icon: "⚙️", badge: null },
  ];
  const subMenuItems = [
    { id: "profile", name: "Profile", parent: "settings" },
    { id: "security", name: "Security", parent: "settings" },
    { id: "billing", name: "Billing", parent: "settings" },
  ];
  const [expandedItems, setExpandedItems] = useState<string[]>(["settings"]);
  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };
  const hasSubMenu = (itemId: string) => {
    return subMenuItems.some((sub) => sub.parent === itemId);
  };
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📋 Sidebar Navigation Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Create collapsible sidebar navigation with hierarchical menu items,
          perfect for admin dashboards and complex applications.
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
              A full-featured sidebar with collapsible sections, badges, and
              nested menu items. Try collapsing the sidebar!
            </p>
            {/* Sidebar Demo Container */}
            <div
              className="relative flex bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              style={{ height: "400px" }}
            >
              {/* Mobile Menu Button */}
              <div className="absolute top-4 left-4 z-20 lg:hidden">
                <button
                  onClick={() => setIsMobileOpen(!isMobileOpen)}
                  className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
              {/* Mobile Backdrop */}
              {isMobileOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
                  onClick={() => setIsMobileOpen(false)}
                />
              )}
              {/* Sidebar */}
              <aside
                className={`bg-gray-900 text-white transition-all duration-300 flex flex-col z-20 ${
                  isCollapsed ? "w-16" : "w-64"
                } lg:relative fixed left-0 top-0 h-full lg:h-auto ${
                  isMobileOpen
                    ? "translate-x-0"
                    : "-translate-x-full lg:translate-x-0"
                }`}
              >
                {/* Sidebar Header */}
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    {!isCollapsed && (
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                          <span className="font-bold text-sm">A</span>
                        </div>
                        <span className="font-semibold text-lg">Admin</span>
                      </div>
                    )}
                    <button
                      onClick={() => setIsCollapsed(!isCollapsed)}
                      className="p-2 rounded-lg hover:bg-gray-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <svg
                        className={`w-5 h-5 transition-transform ${isCollapsed ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Navigation Menu */}
                <nav className="flex-1 p-4 space-y-2">
                  {menuItems.map((item) => (
                    <div key={item.id}>
                      <button
                        onClick={() => {
                          setActiveMenuItem(item.id);
                          if (hasSubMenu(item.id)) {
                            toggleExpanded(item.id);
                          }
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 min-h-[44px] ${
                          activeMenuItem === item.id
                            ? "bg-blue-600 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                      >
                        <span className="text-lg flex-shrink-0">
                          {item.icon}
                        </span>
                        {!isCollapsed && (
                          <>
                            <span className="flex-1 text-left font-medium">
                              {item.name}
                            </span>
                            <div className="flex items-center space-x-2">
                              {item.badge && (
                                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                  {item.badge}
                                </span>
                              )}
                              {hasSubMenu(item.id) && (
                                <svg
                                  className={`w-4 h-4 transition-transform ${
                                    expandedItems.includes(item.id)
                                      ? "rotate-90"
                                      : ""
                                  }`}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              )}
                            </div>
                          </>
                        )}
                      </button>
                      {/* Sub Menu */}
                      {hasSubMenu(item.id) &&
                        expandedItems.includes(item.id) &&
                        !isCollapsed && (
                          <div className="ml-8 mt-2 space-y-1">
                            {subMenuItems
                              .filter((subItem) => subItem.parent === item.id)
                              .map((subItem) => (
                                <button
                                  key={subItem.id}
                                  onClick={() => setActiveMenuItem(subItem.id)}
                                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                    activeMenuItem === subItem.id
                                      ? "bg-blue-500 text-white"
                                      : "text-gray-400 hover:bg-gray-700 hover:text-white"
                                  }`}
                                >
                                  {subItem.name}
                                </button>
                              ))}
                          </div>
                        )}
                    </div>
                  ))}
                </nav>
                {/* Sidebar Footer */}
                <div className="p-4 border-t border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium">JD</span>
                    </div>
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          John Doe
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          john@example.com
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </aside>
              {/* Main Content Area */}
              <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-700">
                <div className="h-full">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    {menuItems.find((item) => item.id === activeMenuItem)
                      ?.name ||
                      subMenuItems.find((item) => item.id === activeMenuItem)
                        ?.name ||
                      "Content"}
                  </h2>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 h-full border border-gray-200 dark:border-gray-600">
                    <p className="text-gray-600 dark:text-gray-400">
                      This is the main content area. The active menu item is:{" "}
                      <strong>{activeMenuItem}</strong>
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-3/4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-1/2"></div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                Interactive Features
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• Click the arrow icon to collapse/expand sidebar</div>
                <div>• Click menu items to navigate and see active states</div>
                <div>• Expandable sub-menus with smooth animations</div>
                <div>• Badge notifications on menu items</div>
                <div>• User profile information in footer</div>
              </div>
            </div>
          </div>
        </div>
        {/* Code Example */}
<DynamicCodeExample componentName="sidebar" />
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
                Collapsible Design
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Expand and collapse to save space
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Nested Navigation
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Hierarchical menu structure with sub-items
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Badge Notifications
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Visual indicators for counts and alerts
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                User Profile Footer
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                User information and quick access
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Active State Indicators
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Clear visual feedback for current page
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Smooth Animations
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fluid transitions and hover effects
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
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Admin Dashboards
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Management interfaces and control panels
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">💼</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Business Applications
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              CRM, ERP, and enterprise software
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛠️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Developer Tools
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              IDEs, code editors, and dev platforms
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
