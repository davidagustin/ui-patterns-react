"use client";

import { useState, useRef } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function DragReorderPattern() {
  const [activeTab, setActiveTab] = useState<"jsx" | "css">("jsx");
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Design System",
      description: "Create consistent UI components",
      priority: "High",
    },
    {
      id: 2,
      title: "User Research",
      description: "Conduct user interviews and surveys",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Prototype Testing",
      description: "Test wireframes with users",
      priority: "High",
    },
    {
      id: 4,
      title: "Content Strategy",
      description: "Define messaging and tone",
      priority: "Low",
    },
    {
      id: 5,
      title: "Accessibility Audit",
      description: "Review WCAG compliance",
      priority: "Medium",
    },
  ]);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [dragOverItem, setDragOverItem] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, itemId: number) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", itemId.toString());
  };

  const handleDragOver = (e: React.DragEvent, itemId: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedItem !== itemId) {
      setDragOverItem(itemId);
    }
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, targetItemId: number) => {
    e.preventDefault();

    if (draggedItem && draggedItem !== targetItemId) {
      const draggedIndex = items.findIndex((item) => item.id === draggedItem);
      const targetIndex = items.findIndex((item) => item.id === targetItemId);

      const newItems = [...items];
      const [draggedItemData] = newItems.splice(draggedIndex, 1);
      newItems.splice(targetIndex, 0, draggedItemData);

      setItems(newItems);
    }

    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🔄 Drag to Reorder Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Allow users to reorder items by dragging them to new positions,
          providing intuitive list management.
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
              Drag any item to reorder the list. Watch for visual feedback
              during dragging.
            </p>

            <div className="space-y-2">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onDragOver={(e) => handleDragOver(e, item.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, item.id)}
                  onDragEnd={handleDragEnd}
                  className={`relative p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 cursor-move transition-all duration-200 ${
                    draggedItem === item.id
                      ? "opacity-50 scale-95 shadow-lg"
                      : dragOverItem === item.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "hover:shadow-md hover:scale-[1.02]"
                  }`}
                >
                  {/* Drag Handle */}
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8h16M4 16h16"
                      />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="ml-8">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            #{index + 1}
                          </span>
                          <h3 className="font-medium text-gray-800 dark:text-gray-200">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}
                      >
                        {item.priority}
                      </span>
                    </div>
                  </div>

                  {/* Drop Indicator */}
                  {dragOverItem === item.id && draggedItem !== item.id && (
                    <div className="absolute inset-0 border-2 border-blue-500 border-dashed rounded-lg bg-blue-50 dark:bg-blue-900/20 pointer-events-none" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                How to Use
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• Click and drag any item to reorder</div>
                <div>• Drop the item in the desired position</div>
                <div>• Visual feedback shows drag state and drop zones</div>
                <div>• Works on both desktop and mobile devices</div>
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
                <DynamicCodeExample componentName="drag-reorder" />
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
                Drag & Drop
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Intuitive drag and drop reordering
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
                Clear drag states and drop zones
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Drag Handles
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Visual indicators for draggable elements
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
                Fluid transitions and visual feedback
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Touch Support
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Works on mobile devices with touch gestures
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
            <div className="text-2xl mb-2">📋</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Task Lists
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Reorder tasks by priority
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🎵</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Playlists
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Reorder songs and tracks
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📁</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              File Managers
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Organize files and folders
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
