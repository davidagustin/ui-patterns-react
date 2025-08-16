"use client";

import { useState, useRef, useEffect } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function LongPressPattern() {
  const [activeTab, setActiveTab] = useState<"jsx" | "css">("jsx");
  const [longPressedItem, setLongPressedItem] = useState<number | null>(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPressing = useRef(false);

  const items = [
    { id: 1, name: "Document 1", type: "PDF", size: "2.3 MB" },
    { id: 2, name: "Image 1", type: "JPG", size: "1.8 MB" },
    { id: 3, name: "Video 1", type: "MP4", size: "15.2 MB" },
    { id: 4, name: "Audio 1", type: "MP3", size: "3.7 MB" },
  ];

  const handleMouseDown = (itemId: number, e: React.MouseEvent) => {
    isLongPressing.current = true;
    longPressTimer.current = setTimeout(() => {
      if (isLongPressing.current) {
        setLongPressedItem(itemId);
        setContextMenuPosition({ x: e.clientX, y: e.clientY });
        setShowContextMenu(true);
      }
    }, 500);
  };

  const handleMouseUp = () => {
    isLongPressing.current = false;
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleMouseLeave = () => {
    isLongPressing.current = false;
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleTouchStart = (itemId: number, e: React.TouchEvent) => {
    isLongPressing.current = true;
    longPressTimer.current = setTimeout(() => {
      if (isLongPressing.current) {
        setLongPressedItem(itemId);
        setContextMenuPosition({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        });
        setShowContextMenu(true);
      }
    }, 500);
  };

  const handleTouchEnd = () => {
    isLongPressing.current = false;
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleContextMenuAction = (action: string, itemId: number) => {
    setShowContextMenu(false);
    alert(`${action} item ${itemId}`);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setShowContextMenu(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          👆 Long Press Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Trigger actions by pressing and holding on elements, providing
          contextual menus and secondary interactions.
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
              Long press (hold for 500ms) on any item to reveal a context menu
              with actions.
            </p>

            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`relative p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-200 ${
                    longPressedItem === item.id
                      ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                  onMouseDown={(e) => handleMouseDown(item.id, e)}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  onTouchStart={(e) => handleTouchStart(item.id, e)}
                  onTouchEnd={handleTouchEnd}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <span className="text-lg">
                          {item.type === "PDF" && "📄"}
                          {item.type === "JPG" && "🖼️"}
                          {item.type === "MP4" && "🎥"}
                          {item.type === "MP3" && "🎵"}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-gray-200">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.type} • {item.size}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Long press for options
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Context Menu */}
            {showContextMenu && (
              <div
                className="fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 min-w-[160px]"
                style={{
                  left: contextMenuPosition.x,
                  top: contextMenuPosition.y,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <button
                  onClick={() =>
                    handleContextMenuAction("Copy", longPressedItem!)
                  }
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                >
                  <span>📋</span>
                  <span>Copy</span>
                </button>
                <button
                  onClick={() =>
                    handleContextMenuAction("Share", longPressedItem!)
                  }
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                >
                  <span>📤</span>
                  <span>Share</span>
                </button>
                <button
                  onClick={() =>
                    handleContextMenuAction("Rename", longPressedItem!)
                  }
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                >
                  <span>✏️</span>
                  <span>Rename</span>
                </button>
                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                <button
                  onClick={() =>
                    handleContextMenuAction("Delete", longPressedItem!)
                  }
                  className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2"
                >
                  <span>🗑️</span>
                  <span>Delete</span>
                </button>
              </div>
            )}

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                How to Use
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• Press and hold any item for 500ms</div>
                <div>• A context menu will appear with actions</div>
                <div>• Click outside to dismiss the menu</div>
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
              <DynamicCodeExample
                componentName="long-press"
                activeTab={activeTab}
              />
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
                Touch & Mouse Support
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Works on both mobile and desktop devices
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Configurable Duration
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Customizable long press timing
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Context Menus
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Dynamic context menus with actions
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
                Clear indication of long press state
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Click Outside Dismiss
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Auto-dismiss context menus
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
              Mobile Apps
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Context menus and secondary actions
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📁</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              File Managers
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              File operations and context menus
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🎮</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Games
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Secondary actions and power-ups
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
