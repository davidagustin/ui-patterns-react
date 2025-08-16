"use client";

import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function BottomNavigationPattern() {
  const [activeNavItem, setActiveNavItem] = useState("home");
  const [activeBadgeItem, setActiveBadgeItem] = useState("home");
  const [activeFloatingItem, setActiveFloatingItem] = useState("home");
  const [activeGestureItem, setActiveGestureItem] = useState("home");

  const basicNavItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "search", label: "Search", icon: "🔍" },
    { id: "favorites", label: "Favorites", icon: "❤️" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  const badgeNavItems = [
    { id: "home", label: "Home", icon: "🏠", badge: null },
    { id: "messages", label: "Messages", icon: "💬", badge: "3" },
    { id: "notifications", label: "Alerts", icon: "🔔", badge: "12" },
    { id: "profile", label: "Profile", icon: "👤", badge: null },
  ];

  const floatingNavItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "search", label: "Search", icon: "🔍" },
    { id: "add", label: "Add", icon: "➕", isFloating: true },
    { id: "chat", label: "Chat", icon: "💬" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📱 Bottom Navigation Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Create mobile-friendly bottom navigation bars with icons, badges, and
          floating action buttons for intuitive app navigation.
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
              Three different bottom navigation styles: basic tabs, with
              notification badges, and with floating action button.
            </p>

            <div className="space-y-8">
              {/* Basic Bottom Navigation */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">
                  1. Basic Bottom Navigation
                </h3>
                <div className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Mock Content Area */}
                  <div className="h-40 p-6 flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {
                          basicNavItems.find(
                            (item) => item.id === activeNavItem,
                          )?.icon
                        }
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {
                          basicNavItems.find(
                            (item) => item.id === activeNavItem,
                          )?.label
                        }{" "}
                        Screen
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        This is the{" "}
                        {basicNavItems
                          .find((item) => item.id === activeNavItem)
                          ?.label.toLowerCase()}{" "}
                        content area.
                      </p>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <nav className="flex">
                      {basicNavItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveNavItem(item.id)}
                          className={`flex-1 flex flex-col items-center py-3 px-2 transition-all duration-200 ${
                            activeNavItem === item.id
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                          }`}
                        >
                          <span className="text-xl mb-1">{item.icon}</span>
                          <span className="text-xs font-medium">
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation with Badges */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">
                  2. With Notification Badges
                </h3>
                <div className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Mock Content Area */}
                  <div className="h-40 p-6 flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {
                          badgeNavItems.find(
                            (item) => item.id === activeBadgeItem,
                          )?.icon
                        }
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {
                          badgeNavItems.find(
                            (item) => item.id === activeBadgeItem,
                          )?.label
                        }{" "}
                        Screen
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {activeBadgeItem === "messages" &&
                          "You have 3 unread messages"}
                        {activeBadgeItem === "notifications" &&
                          "You have 12 new notifications"}
                        {activeBadgeItem === "home" &&
                          "Welcome to your dashboard"}
                        {activeBadgeItem === "profile" &&
                          "Manage your account settings"}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Navigation with Badges */}
                  <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <nav className="flex">
                      {badgeNavItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveBadgeItem(item.id)}
                          className={`relative flex-1 flex flex-col items-center py-3 px-2 transition-all duration-200 ${
                            activeBadgeItem === item.id
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                          }`}
                        >
                          <div className="relative">
                            <span className="text-xl mb-1 block">
                              {item.icon}
                            </span>
                            {item.badge && (
                              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-medium">
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation with Floating Action Button */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">
                  3. With Floating Action Button
                </h3>
                <div className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Mock Content Area */}
                  <div className="h-40 p-6 flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {
                          floatingNavItems.find(
                            (item) => item.id === activeFloatingItem,
                          )?.icon
                        }
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {
                          floatingNavItems.find(
                            (item) => item.id === activeFloatingItem,
                          )?.label
                        }{" "}
                        Screen
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {activeFloatingItem === "add" &&
                          "Create new content here"}
                        {activeFloatingItem === "home" && "Your main dashboard"}
                        {activeFloatingItem === "search" &&
                          "Search through content"}
                        {activeFloatingItem === "chat" && "Your conversations"}
                        {activeFloatingItem === "profile" &&
                          "Your profile and settings"}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Navigation with FAB */}
                  <div className="relative bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <nav className="flex relative">
                      {floatingNavItems.map((item, index) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveFloatingItem(item.id)}
                          className={`relative flex-1 flex flex-col items-center py-3 px-2 transition-all duration-200 ${
                            item.isFloating
                              ? "relative -top-4"
                              : activeFloatingItem === item.id
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                          }`}
                        >
                          {item.isFloating ? (
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
                              <span className="text-white text-xl">
                                {item.icon}
                              </span>
                            </div>
                          ) : (
                            <>
                              <span className="text-xl mb-1">{item.icon}</span>
                              <span className="text-xs font-medium">
                                {item.label}
                              </span>
                            </>
                          )}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>

              {/* Gesture-Enhanced Bottom Navigation */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">
                  4. With Gesture Support
                </h3>
                <div className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Mock Content Area with Swipe Indicator */}
                  <div className="h-40 p-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700">
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {
                          basicNavItems.find(
                            (item) => item.id === activeGestureItem,
                          )?.icon
                        }
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {
                          basicNavItems.find(
                            (item) => item.id === activeGestureItem,
                          )?.label
                        }{" "}
                        Screen
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Swipe left/right or tap tabs to navigate
                      </p>
                    </div>

                    {/* Swipe Indicator */}
                    <div className="flex items-center mt-4 space-x-2">
                      <span className="text-xs text-gray-500">← Swipe</span>
                      <div className="flex space-x-1">
                        {basicNavItems.map((item, index) => (
                          <div
                            key={item.id}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              activeGestureItem === item.id
                                ? "bg-blue-600"
                                : "bg-gray-300 dark:bg-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">Swipe →</span>
                    </div>
                  </div>

                  {/* Bottom Navigation with Enhanced Interactions */}
                  <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <nav className="flex relative">
                      {/* Active Indicator */}
                      <div
                        className="absolute top-0 h-1 bg-blue-600 transition-all duration-300 ease-out"
                        style={{
                          width: `${100 / basicNavItems.length}%`,
                          transform: `translateX(${basicNavItems.findIndex((item) => item.id === activeGestureItem) * 100}%)`,
                        }}
                      />

                      {basicNavItems.map((item, index) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveGestureItem(item.id)}
                          onMouseEnter={() => {
                            // Add haptic feedback simulation
                            if (navigator.vibrate) navigator.vibrate(10);
                          }}
                          className={`flex-1 flex flex-col items-center py-3 px-2 transition-all duration-200 transform hover:scale-105 ${
                            activeGestureItem === item.id
                              ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                              : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                          }`}
                        >
                          <span
                            className={`text-xl mb-1 transition-transform duration-200 ${
                              activeGestureItem === item.id ? "scale-110" : ""
                            }`}
                          >
                            {item.icon}
                          </span>
                          <span className="text-xs font-medium">
                            {item.label}
                          </span>

                          {/* Ripple Effect Container */}
                          <div className="absolute inset-0 overflow-hidden rounded-lg">
                            <div className="absolute inset-0 bg-blue-600 opacity-0 scale-0 rounded-full transition-all duration-300 hover:opacity-10 hover:scale-150" />
                          </div>
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                Interactive Features
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• Active state indicators with color changes</div>
                <div>• Notification badges with count display</div>
                <div>• Floating action button with shadow effects</div>
                <div>• Gesture support with haptic feedback</div>
                <div>• Smooth hover and transition animations</div>
                <div>• Ripple effects and scale transformations</div>
                <div>• Responsive design for different screen sizes</div>
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
              <DynamicCodeExample
                componentName="bottom-navigation"
                activeTab={activeTab}
              />
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
                Icon-Based Navigation
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Clear visual indicators with labels
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Notification Badges
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Count indicators for alerts and messages
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Floating Action Button
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Prominent call-to-action in navigation
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
                Clear visual feedback for current tab
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Mobile-Optimized
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Touch-friendly with appropriate sizing
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
                Hover effects and state transitions
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
              Progressive Web Apps
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Native app-like navigation experience
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">💬</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Social Media Apps
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Quick access to main features and feeds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
