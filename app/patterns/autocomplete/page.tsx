"use client";

import { useState, useRef, useEffect } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function AutocompletePattern() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allOptions = [
    "React",
    "React Native",
    "React Router",
    "React Query",
    "React Hook Form",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Express.js",
    "Next.js",
    "Vue.js",
    "Angular",
    "Svelte",
    "Solid.js",
    "Alpine.js",
    "Tailwind CSS",
    "Bootstrap",
    "Material-UI",
    "Ant Design",
    "Chakra UI",
    "Redux",
    "Zustand",
    "Jotai",
    "Recoil",
    "XState",
    "GraphQL",
    "REST API",
    "Apollo Client",
    "SWR",
    "TanStack Query",
    "Webpack",
    "Vite",
    "Parcel",
    "Rollup",
    "esbuild",
    "Jest",
    "Vitest",
    "Cypress",
    "Playwright",
    "Testing Library",
    "Docker",
    "Kubernetes",
    "AWS",
    "Vercel",
    "Netlify",
  ];

  const filteredOptions = allOptions.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    if (query.length > 0) {
      setSuggestions(filteredOptions.slice(0, 8));
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query, filteredOptions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSelect(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelect = (option: string) => {
    setQuery(option);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleInputFocus = () => {
    if (query.length > 0) {
      setIsOpen(true);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🔍 Autocomplete Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Intelligent text input with real-time suggestions, keyboard
          navigation, and smart filtering capabilities.
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
              Start typing to see suggestions. Use arrow keys to navigate, Enter
              to select, and Escape to close.
            </p>

            {/* Autocomplete Input */}
            <div className="relative">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={handleInputFocus}
                  placeholder="Search for a technology..."
                  className="w-full px-4 py-3 pl-10 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />

                {/* Search Icon */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                {/* Clear Button */}
                {query && (
                  <button
                    onClick={() => {
                      setQuery("");
                      setIsOpen(false);
                      inputRef.current?.focus();
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Suggestions Dropdown */}
              {isOpen && suggestions.length > 0 && (
                <div
                  ref={dropdownRef}
                  className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                >
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSelect(suggestion)}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        index === selectedIndex
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                          : "text-gray-900 dark:text-gray-100"
                      } ${index === 0 ? "rounded-t-lg" : ""} ${index === suggestions.length - 1 ? "rounded-b-lg" : ""}`}
                    >
                      <div className="flex items-center space-x-3">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        <span className="font-medium">{suggestion}</span>
                        {index === selectedIndex && (
                          <svg
                            className="w-4 h-4 ml-auto text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* No Results */}
              {isOpen && query && suggestions.length === 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <svg
                      className="w-8 h-8 mx-auto mb-2 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                      />
                    </svg>
                    <p>No results found for "{query}"</p>
                    <p className="text-sm mt-1">Try a different search term</p>
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                Keyboard Shortcuts
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>
                  •{" "}
                  <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">
                    ↑↓
                  </kbd>{" "}
                  Navigate suggestions
                </div>
                <div>
                  •{" "}
                  <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">
                    Enter
                  </kbd>{" "}
                  Select highlighted item
                </div>
                <div>
                  •{" "}
                  <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">
                    Esc
                  </kbd>{" "}
                  Close dropdown
                </div>
                <div>
                  •{" "}
                  <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">
                    Tab
                  </kbd>{" "}
                  Complete current suggestion
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
            </h2>{/* Tab Content */}
            <div className="code-block">
              <DynamicCodeExample componentName="autocomplete" />
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
              • <strong>Real-time Filtering:</strong> Instant suggestions as you
              type
            </li>
            <li>
              • <strong>Keyboard Navigation:</strong> Arrow keys, Enter, and
              Escape support
            </li>
            <li>
              • <strong>Smart Matching:</strong> Case-insensitive partial
              matching
            </li>
            <li>
              • <strong>Visual Feedback:</strong> Highlighted selected items
            </li>
            <li>
              • <strong>Click Outside:</strong> Closes dropdown when clicking
              elsewhere
            </li>
            <li>
              • <strong>Clear Functionality:</strong> Easy way to reset the
              input
            </li>
            <li>
              • <strong>Accessibility:</strong> Proper ARIA labels and keyboard
              support
            </li>
            <li>
              • <strong>Performance Optimized:</strong> Efficient filtering and
              rendering
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
              • <strong>Search Interfaces:</strong> Product search and filtering
            </li>
            <li>
              • <strong>Form Inputs:</strong> Country, city, or category
              selection
            </li>
            <li>
              • <strong>Command Palettes:</strong> Quick action and navigation
            </li>
            <li>
              • <strong>Tag Inputs:</strong> Adding tags and labels
            </li>
            <li>
              • <strong>Address Forms:</strong> Street and city autocomplete
            </li>
            <li>
              • <strong>Code Editors:</strong> IntelliSense and code completion
            </li>
            <li>
              • <strong>Email Clients:</strong> Recipient and contact selection
            </li>
            <li>
              • <strong>File Managers:</strong> File and folder search
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
