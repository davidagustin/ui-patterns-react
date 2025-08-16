"use client";

import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function AdaptableViewPattern() {
  const [activeTab, setActiveTab] = useState<"jsx" | "css">("jsx");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "card">("grid");

  const content = [
    {
      id: 1,
      title: "Smart Home Security System",
      description:
        "Complete IoT security solution with AI-powered monitoring, mobile alerts, and 24/7 cloud recording for your peace of mind.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      category: "Technology",
      price: "$299.99",
      rating: 4.8,
      tags: ["Smart Home", "Security", "IoT"],
    },
    {
      id: 2,
      title: "Ergonomic Office Chair",
      description:
        "Premium ergonomic design with lumbar support, adjustable height, and breathable mesh fabric for all-day comfort.",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
      category: "Furniture",
      price: "$449.99",
      rating: 4.6,
      tags: ["Office", "Ergonomic", "Comfort"],
    },
    {
      id: 3,
      title: "Wireless Noise-Canceling Headphones",
      description:
        "Studio-quality sound with active noise cancellation, 30-hour battery life, and premium build quality.",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
      category: "Audio",
      price: "$199.99",
      rating: 4.9,
      tags: ["Audio", "Wireless", "Premium"],
    },
    {
      id: 4,
      title: "Organic Coffee Subscription",
      description:
        "Freshly roasted organic coffee beans delivered monthly from sustainable farms around the world.",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop",
      category: "Food & Beverage",
      price: "$24.99/month",
      rating: 4.7,
      tags: ["Coffee", "Organic", "Subscription"],
    },
    {
      id: 5,
      title: "Fitness Tracking Smartwatch",
      description:
        "Advanced health monitoring with GPS, heart rate tracking, sleep analysis, and 7-day battery life.",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop",
      category: "Fitness",
      price: "$349.99",
      rating: 4.5,
      tags: ["Fitness", "Health", "Smartwatch"],
    },
    {
      id: 6,
      title: "Portable Solar Power Bank",
      description:
        "High-capacity solar charger with multiple USB ports, weatherproof design, and emergency LED flashlight.",
      image:
        "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=300&h=200&fit=crop",
      category: "Electronics",
      price: "$89.99",
      rating: 4.4,
      tags: ["Solar", "Portable", "Eco-friendly"],
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📱 Adaptable View Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Allow users to switch between different content layouts (grid, list,
          card) to match their viewing preferences and context.
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
              Switch between different view modes to see how the same content
              adapts to different layouts and user preferences.
            </p>

            {/* View Mode Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === "grid"
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === "list"
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode("card")}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === "card"
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  Card
                </button>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {content.length} items
              </span>
            </div>

            {/* Content Display */}
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
                  : viewMode === "list"
                    ? "space-y-3"
                    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              }`}
            >
              {content.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md ${
                    viewMode === "list"
                      ? "flex items-center space-x-4 p-4"
                      : "p-4"
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`${
                      viewMode === "list"
                        ? "w-20 h-20 flex-shrink-0"
                        : viewMode === "card"
                          ? "w-full h-48 mb-4"
                          : "w-full h-32 mb-3"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 ${viewMode === "list" ? "min-w-0" : ""}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3
                        className={`font-semibold text-gray-900 dark:text-gray-100 ${
                          viewMode === "list" ? "text-base" : "text-lg"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <span className="text-green-600 font-semibold">
                        {item.price}
                      </span>
                    </div>

                    <p
                      className={`text-gray-600 dark:text-gray-400 mb-3 ${
                        viewMode === "list" ? "text-sm line-clamp-2" : "text-sm"
                      }`}
                    >
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex">{renderStars(item.rating)}</div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          ({item.rating})
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
                componentName="adaptable-view"
                activeTab={activeTab}
              />
            </div>
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
              • <strong>Multiple View Modes:</strong> Grid, list, and card
              layouts
            </li>
            <li>
              • <strong>Responsive Design:</strong> Adapts to different screen
              sizes
            </li>
            <li>
              • <strong>Smooth Transitions:</strong> Animated layout changes
            </li>
            <li>
              • <strong>Consistent Content:</strong> Same data displayed in
              different formats
            </li>
            <li>
              • <strong>User Preference:</strong> Remember user's preferred view
              mode
            </li>
            <li>
              • <strong>Accessible Controls:</strong> Clear view mode selection
              buttons
            </li>
            <li>
              • <strong>Performance Optimized:</strong> Efficient re-rendering
            </li>
            <li>
              • <strong>Flexible Content:</strong> Supports various content
              types
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
              • <strong>E-commerce Product Lists:</strong> Grid for browsing,
              list for comparison
            </li>
            <li>
              • <strong>File Managers:</strong> Different views for different
              file types
            </li>
            <li>
              • <strong>Social Media Feeds:</strong> Grid for photos, list for
              text posts
            </li>
            <li>
              • <strong>Dashboard Widgets:</strong> Compact vs detailed views
            </li>
            <li>
              • <strong>Search Results:</strong> Multiple layout options for
              results
            </li>
            <li>
              • <strong>Portfolio Galleries:</strong> Grid for overview, card
              for details
            </li>
            <li>
              • <strong>News Aggregators:</strong> Headlines vs full article
              views
            </li>
            <li>
              • <strong>Music Libraries:</strong> Album grid vs playlist list
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
