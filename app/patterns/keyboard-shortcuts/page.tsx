"use client";
import { useState, useEffect } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
export default function KeyboardShortcutsPattern() {
  const [activeShortcuts, setActiveShortcuts] = useState<string[]>([]);
  const [showHelp, setShowHelp] = useState(false);
  const [lastAction, setLastAction] = useState("");
  const shortcuts = [
    {
      key: "Ctrl + S",
      action: "Save document",
      description: "Quickly save your current work",
    },
    { key: "Ctrl + Z", action: "Undo", description: "Reverse the last action" },
    {
      key: "Ctrl + Y",
      action: "Redo",
      description: "Restore the last undone action",
    },
    {
      key: "Ctrl + F",
      action: "Find",
      description: "Search for text in the document",
    },
    { key: "Ctrl + B", action: "Bold", description: "Make selected text bold" },
    {
      key: "Ctrl + I",
      action: "Italic",
      description: "Make selected text italic",
    },
    {
      key: "Ctrl + U",
      action: "Underline",
      description: "Underline selected text",
    },
    {
      key: "Ctrl + A",
      action: "Select All",
      description: "Select all content",
    },
    {
      key: "Ctrl + C",
      action: "Copy",
      description: "Copy selected content to clipboard",
    },
    {
      key: "Ctrl + V",
      action: "Paste",
      description: "Paste content from clipboard",
    },
    { key: "Ctrl + X", action: "Cut", description: "Cut selected content" },
    { key: "F1", action: "Help", description: "Show keyboard shortcuts help" },
  ];
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const pressedKeys: string[] = [];
      if (e.ctrlKey) pressedKeys.push("Ctrl");
      if (e.shiftKey) pressedKeys.push("Shift");
      if (e.altKey) pressedKeys.push("Alt");
      if (e.metaKey) pressedKeys.push("Cmd");
      if (
        e.key !== "Control" &&
        e.key !== "Shift" &&
        e.key !== "Alt" &&
        e.key !== "Meta"
      ) {
        pressedKeys.push(e.key.toUpperCase());
      }
      const shortcutKey = pressedKeys.join(" + ");
      setActiveShortcuts(pressedKeys);
      // Handle specific shortcuts
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        setLastAction("Document saved!");
        setTimeout(() => setLastAction(""), 2000);
      } else if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        setLastAction("Action undone!");
        setTimeout(() => setLastAction(""), 2000);
      } else if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        setLastAction("Action redone!");
        setTimeout(() => setLastAction(""), 2000);
      } else if (e.ctrlKey && e.key === "f") {
        e.preventDefault();
        setLastAction("Find dialog opened!");
        setTimeout(() => setLastAction(""), 2000);
      } else if (e.key === "F1") {
        e.preventDefault();
        setShowHelp(!showHelp);
      }
    };
    const handleKeyUp = () => {
      setActiveShortcuts([]);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [showHelp]);
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ⌨️ Keyboard Shortcuts Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Enhance user productivity with keyboard shortcuts that provide quick
          access to common actions and improve workflow efficiency.
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
              Try pressing keyboard shortcuts to see them in action. Press F1 to
              toggle the help panel.
            </p>
            <div className="space-y-4">
              {/* Active Keys Display */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Currently Pressed Keys
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeShortcuts.length > 0 ? (
                    activeShortcuts.map((key, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm font-mono"
                      >
                        {key}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      No keys pressed
                    </span>
                  )}
                </div>
              </div>
              {/* Last Action Display */}
              {lastAction && (
                <div className="bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 rounded-lg">
                  <p className="text-green-800 dark:text-green-200 text-sm font-medium">
                    ✅ {lastAction}
                  </p>
                </div>
              )}
              {/* Demo Actions */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">
                  Try These Shortcuts:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Save Document
                    </span>
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs font-mono">
                      Ctrl + S
                    </kbd>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Undo
                    </span>
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs font-mono">
                      Ctrl + Z
                    </kbd>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Find
                    </span>
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs font-mono">
                      Ctrl + F
                    </kbd>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Help
                    </span>
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs font-mono">
                      F1
                    </kbd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Code Example */}
<DynamicCodeExample componentName="keyboard-shortcuts" />
          </div>
        </div>
      </div>
      {/* Keyboard Shortcuts Help Panel */}
      {showHelp && (
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
              ⌨️ Keyboard Shortcuts Help
            </h3>
            <button
              onClick={() => setShowHelp(false)}
              className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border"
              >
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">
                    {shortcut.action}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {shortcut.description}
                  </div>
                </div>
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs font-mono">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>
      )}
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
                Visual Feedback
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Real-time display of pressed keys and actions
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Help System
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Accessible help panel with all available shortcuts
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Cross-Platform
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Support for both Windows (Ctrl) and Mac (Cmd) keys
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Conflict Prevention
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Prevent default browser behavior for custom shortcuts
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
            <div className="text-2xl mb-2">📝</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Text Editors
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Save, undo, format, and navigation shortcuts
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🖥️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Web Applications
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Quick actions and navigation for power users
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🎮</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Gaming Interfaces
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Action keys and command shortcuts
            </p>
          </div>
        </div>
      </div>
      {/* Best Practices */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold mb-4 text-yellow-800 dark:text-yellow-200">
          💡 Best Practices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">
                1.
              </span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Follow Conventions
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use standard shortcuts like Ctrl+S for save
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">
                2.
              </span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Provide Help
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Always include a help system or tooltips
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">
                3.
              </span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Avoid Conflicts
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't override essential browser shortcuts
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">
                4.
              </span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Visual Indicators
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Show shortcuts in menus and buttons
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
