"use client";

import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function MorphingControlsPattern() {
  const [activeTab, setActiveTab] = useState<"jsx" | "css">("jsx");
  const [searchMode, setSearchMode] = useState<"basic" | "advanced">("basic");
  const [buttonMode, setButtonMode] = useState<
    "default" | "loading" | "success"
  >("default");
  const [inputMode, setInputMode] = useState<"text" | "email" | "password">(
    "text",
  );
  const [toggleState, setToggleState] = useState(false);

  const handleSearchModeChange = () => {
    setSearchMode(searchMode === "basic" ? "advanced" : "basic");
  };

  const handleButtonClick = () => {
    setButtonMode("loading");
    setTimeout(() => {
      setButtonMode("success");
      setTimeout(() => {
        setButtonMode("default");
      }, 2000);
    }, 2000);
  };

  const handleInputModeChange = () => {
    const modes: ("text" | "email" | "password")[] = [
      "text",
      "email",
      "password",
    ];
    const currentIndex = modes.indexOf(inputMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setInputMode(modes[nextIndex]);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🔄 Morphing Controls
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Controls that transform and adapt their appearance and behavior based
          on context, state, or user interaction.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>

            <div className="space-y-6">
              {/* Morphing Search Bar */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">
                  Search Bar
                </h3>
                <div className="flex items-center space-x-2">
                  <div
                    className={`relative transition-all duration-300 ${searchMode === "advanced" ? "flex-1" : "w-64"}`}
                  >
                    <input
                      type="text"
                      placeholder={
                        searchMode === "basic"
                          ? "Search..."
                          : "Enter keywords, filters, or advanced queries..."
                      }
                      className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${searchMode === "advanced" ? "pr-20" : "pr-10"}`}
                    />
                    <button
                      onClick={handleSearchModeChange}
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded transition-all duration-300 ${
                        searchMode === "basic"
                          ? "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                          : "text-blue-600 bg-blue-100 dark:bg-blue-900/20"
                      }`}
                      title={
                        searchMode === "basic"
                          ? "Switch to Advanced"
                          : "Switch to Basic"
                      }
                    >
                      {searchMode === "basic" ? "⚙️" : "🔍"}
                    </button>
                    {searchMode === "advanced" && (
                      <button className="absolute right-10 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        🔎
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click the gear icon to switch between basic and advanced
                  search modes
                </p>
              </div>

              {/* Morphing Button */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">
                  Action Button
                </h3>
                <button
                  onClick={handleButtonClick}
                  disabled={buttonMode === "loading"}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform ${
                    buttonMode === "default"
                      ? "bg-blue-600 hover:bg-blue-700 text-white hover:scale-105"
                      : buttonMode === "loading"
                        ? "bg-yellow-500 text-white cursor-not-allowed"
                        : "bg-green-500 text-white scale-110"
                  }`}
                >
                  {buttonMode === "default" && "Click Me"}
                  {buttonMode === "loading" && (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  )}
                  {buttonMode === "success" && "✓ Success!"}
                </button>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Watch the button transform through different states
                </p>
              </div>

              {/* Morphing Input */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">
                  Adaptive Input
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <input
                      type={inputMode}
                      placeholder={
                        inputMode === "text"
                          ? "Enter your name..."
                          : inputMode === "email"
                            ? "Enter your email..."
                            : "Enter your password..."
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                    />
                    <button
                      onClick={handleInputModeChange}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                      title={`Switch to ${inputMode === "text" ? "email" : inputMode === "email" ? "password" : "text"} input`}
                    >
                      {inputMode === "text"
                        ? "📧"
                        : inputMode === "email"
                          ? "🔒"
                          : "📝"}
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click the icon to cycle through different input types
                </p>
              </div>

              {/* Morphing Toggle */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">
                  Smart Toggle
                </h3>
                <button
                  onClick={() => setToggleState(!toggleState)}
                  className={`relative inline-flex items-center h-6 rounded-full transition-all duration-300 ${
                    toggleState
                      ? "w-12 bg-blue-600"
                      : "w-6 bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block w-4 h-4 bg-white rounded-full transition-all duration-300 transform ${
                      toggleState ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                  {toggleState && (
                    <span className="absolute left-1 text-xs text-white font-medium animate-pulse">
                      ON
                    </span>
                  )}
                </button>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Toggle expands and shows status when activated
                </p>
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
                  componentName="morphing-controls"
                  activeTab={activeTab}
                />
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
                Contextual Adaptation
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Controls change based on current state or mode
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Smooth Transitions
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Animated transformations between states
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Progressive Disclosure
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Show more options as needed
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
                Clear indication of current state
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
            <div className="text-2xl mb-2">🔍</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Search Interfaces
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Expandable search bars with advanced options
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Action Buttons
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Buttons that show progress and completion states
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🎛️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Form Controls
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Inputs that adapt to different data types
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
