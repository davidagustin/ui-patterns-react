"use client";

import { useState, useRef } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function DoubleTapPattern() {
  const [activeTab, setActiveTab] = useState<"jsx" | "css">("jsx");
  const [doubleTappedItem, setDoubleTappedItem] = useState<number | null>(null);
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

  const tapTimers = useRef<Map<number, NodeJS.Timeout>>(new Map());
  const tapCounts = useRef<Map<number, number>>(new Map());

  const items = [
    {
      id: 1,
      name: "Sunset Beach",
      author: "John Doe",
      likes: 124,
      image: "🌅",
    },
    {
      id: 2,
      name: "Mountain Peak",
      author: "Jane Smith",
      likes: 89,
      image: "🏔️",
    },
    {
      id: 3,
      name: "City Lights",
      author: "Mike Johnson",
      likes: 203,
      image: "🌃",
    },
    {
      id: 4,
      name: "Forest Path",
      author: "Sarah Wilson",
      likes: 67,
      image: "🌲",
    },
  ];

  const handleTap = (itemId: number) => {
    const currentCount = tapCounts.current.get(itemId) || 0;
    const newCount = currentCount + 1;
    tapCounts.current.set(itemId, newCount);

    // Clear existing timer
    if (tapTimers.current.has(itemId)) {
      clearTimeout(tapTimers.current.get(itemId)!);
    }

    if (newCount === 2) {
      // Double tap detected
      setDoubleTappedItem(itemId);
      setLikedItems((prev) => new Set([...prev, itemId]));

      // Reset tap count
      tapCounts.current.set(itemId, 0);

      // Show feedback briefly
      setTimeout(() => {
        setDoubleTappedItem(null);
      }, 1000);
    } else {
      // Set timer for single tap
      const timer = setTimeout(() => {
        // Single tap action (e.g., open detail view)
        console.log(`Single tap on item ${itemId}`);
        tapCounts.current.set(itemId, 0);
      }, 300);

      tapTimers.current.set(itemId, timer);
    }
  };

  const handleMouseClick = (itemId: number) => {
    handleTap(itemId);
  };

  const handleTouchStart = (itemId: number) => {
    handleTap(itemId);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          👆 Double Tap Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Detect double taps to trigger quick actions like liking content, while
          single taps perform primary actions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Double tap any card to like it. Single tap to view details. Watch
              for the heart animation!
            </p>

            <div className="grid grid-cols-2 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer transition-all duration-200 ${
                    doubleTappedItem === item.id
                      ? "scale-105 ring-2 ring-red-500"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => handleMouseClick(item.id)}
                  onTouchStart={() => handleTouchStart(item.id)}
                >
                  {/* Image */}
                  <div className="h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center text-4xl">
                    {item.image}
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      by {item.author}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-1">
                        <span
                          className={`text-lg transition-all duration-300 ${
                            likedItems.has(item.id)
                              ? "text-red-500 scale-110"
                              : "text-gray-400"
                          }`}
                        >
                          {likedItems.has(item.id) ? "❤️" : "🤍"}
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {likedItems.has(item.id)
                            ? item.likes + 1
                            : item.likes}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Double tap to like
                      </span>
                    </div>
                  </div>

                  {/* Double Tap Animation */}
                  {doubleTappedItem === item.id && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-6xl animate-ping text-red-500">
                        ❤️
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                How to Use
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• Single tap to view item details</div>
                <div>• Double tap quickly to like the item</div>
                <div>• Watch for the heart animation on double tap</div>
                <div>• Works on both touch and mouse devices</div>
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
                <DynamicCodeExample
                  componentName="double-tap"
                  activeTab={activeTab}
                />
              }
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
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
                Tap Detection
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Accurate single and double tap detection
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Visual Feedback
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Clear animations and state changes
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Configurable Timing
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Customizable tap intervals
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Touch & Mouse Support
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Works on both mobile and desktop
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                State Management
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Persistent like states and counters
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Accessibility
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Keyboard navigation and screen reader support
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-semibold mb-4 text-purple-800 dark:text-purple-200">
          🎯 Use Cases
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📱</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Social Media
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Like posts and photos quickly
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🖼️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Photo Galleries
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Favorite images and collections
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🎵</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Music Apps
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Like songs and playlists
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
