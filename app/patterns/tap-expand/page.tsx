"use client";

import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function TapExpandPattern() {
    const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const items = [
    {
      id: 1,
      title: "Design Principles",
      summary: "Core principles that guide our design decisions",
      content:
        "Our design principles include accessibility, consistency, and user-centered design. We believe that good design should be inclusive and work for everyone, regardless of their abilities or circumstances.",
      icon: "🎨",
    },
    {
      id: 2,
      title: "User Research Methods",
      summary: "Techniques for understanding user needs and behaviors",
      content:
        "We use various research methods including user interviews, surveys, usability testing, and analytics. Each method provides different insights that help us make informed design decisions.",
      icon: "🔍",
    },
    {
      id: 3,
      title: "Design System Components",
      summary: "Reusable UI components and design tokens",
      content:
        "Our design system includes buttons, forms, navigation, typography, and color palettes. All components are documented with usage guidelines and accessibility requirements.",
      icon: "🧩",
    },
    {
      id: 4,
      title: "Prototyping Tools",
      summary: "Tools and techniques for creating interactive prototypes",
      content:
        "We use tools like Figma, Sketch, and InVision for creating prototypes. These help us test ideas quickly and gather feedback before development begins.",
      icon: "⚡",
    },
  ];

  const toggleExpanded = (itemId: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const isExpanded = (itemId: number) => expandedItems.has(itemId);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          👆 Tap to Expand Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Expand content sections with a tap or click, revealing additional
          information while maintaining a clean interface.
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
              Tap any item to expand and see more details. Tap again to
              collapse.
            </p>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ${
                    isExpanded(item.id) ? "shadow-lg" : "hover:shadow-md"
                  }`}
                >
                  {/* Header */}
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div className="text-left">
                        <h3 className="font-medium text-gray-800 dark:text-gray-200">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.summary}
                        </p>
                      </div>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                        isExpanded(item.id) ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded(item.id)
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-4 pb-4">
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {item.content}
                        </p>
                        <div className="mt-3 flex items-center space-x-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Tap to collapse
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                How to Use
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• Tap any item to expand and see more details</div>
                <div>• Tap again to collapse the content</div>
                <div>• Smooth animations provide visual feedback</div>
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
                <DynamicCodeExample componentName="tap-expand" />
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
                Smooth Animations
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fluid expand/collapse transitions
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
                Clear indication of expandable state
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Multiple Items
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Independent expand/collapse states
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
                Keyboard Navigation
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Full keyboard accessibility support
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
                Efficient state tracking for multiple items
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
            <div className="text-2xl mb-2">📚</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              FAQ Sections
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Expandable questions and answers
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📋</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Product Lists
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Show product details on demand
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📖</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Documentation
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Collapsible sections and chapters
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
