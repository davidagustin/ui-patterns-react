"use client";

import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function BreadcrumbsPattern() {
  const [activeTab, setActiveTab] = useState<"jsx" | "css">("jsx");
  const [currentPath, setCurrentPath] = useState(
    "electronics/computers/laptops",
  );

  const breadcrumbData = {
    electronics: {
      label: "Electronics",
      icon: "📱",
      description: "Electronic devices and gadgets",
    },
    computers: {
      label: "Computers",
      icon: "💻",
      description: "Desktop and laptop computers",
    },
    laptops: {
      label: "Laptops",
      icon: "🖥️",
      description: "Portable computing devices",
    },
  };

  const pathSegments = currentPath.split("/");

  const handleBreadcrumbClick = (index: number) => {
    const newPath = pathSegments.slice(0, index + 1).join("/");
    setCurrentPath(newPath);
  };

  const getBreadcrumbIcon = (segment: string) => {
    return breadcrumbData[segment as keyof typeof breadcrumbData]?.icon || "📁";
  };

  const getBreadcrumbLabel = (segment: string) => {
    return (
      breadcrumbData[segment as keyof typeof breadcrumbData]?.label || segment
    );
  };

  const getBreadcrumbDescription = (segment: string) => {
    return (
      breadcrumbData[segment as keyof typeof breadcrumbData]?.description || ""
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🍞 Breadcrumbs Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Navigational hierarchy that shows users their current location and
          provides easy navigation to parent levels.
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
              Click on any breadcrumb to navigate to that level. The current
              location is highlighted.
            </p>

            {/* Breadcrumbs */}
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <button
                    onClick={() => setCurrentPath("")}
                    className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    <span className="text-lg">🏠</span>
                    <span>Home</span>
                  </button>
                </li>

                {pathSegments.map((segment, index) => {
                  const isLast = index === pathSegments.length - 1;
                  const isClickable = !isLast;

                  return (
                    <li key={index} className="flex items-center">
                      <svg
                        className="w-4 h-4 text-gray-400 mx-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>

                      {isClickable ? (
                        <button
                          onClick={() => handleBreadcrumbClick(index)}
                          className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        >
                          <span className="text-lg">
                            {getBreadcrumbIcon(segment)}
                          </span>
                          <span>{getBreadcrumbLabel(segment)}</span>
                        </button>
                      ) : (
                        <span className="flex items-center space-x-1 text-gray-900 dark:text-gray-100 font-medium">
                          <span className="text-lg">
                            {getBreadcrumbIcon(segment)}
                          </span>
                          <span>{getBreadcrumbLabel(segment)}</span>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>

            {/* Current Location Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">
                  {getBreadcrumbIcon(pathSegments[pathSegments.length - 1])}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {getBreadcrumbLabel(pathSegments[pathSegments.length - 1])}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {getBreadcrumbDescription(
                  pathSegments[pathSegments.length - 1],
                )}
              </p>
              <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                Current path:{" "}
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {currentPath || "home"}
                </code>
              </div>
            </div>

            {/* Path Controls */}
            <div className="mt-4 space-y-2">
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Quick Navigation:
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCurrentPath("electronics")}
                  className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                >
                  Electronics
                </button>
                <button
                  onClick={() => setCurrentPath("electronics/computers")}
                  className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                >
                  Computers
                </button>
                <button
                  onClick={() =>
                    setCurrentPath("electronics/computers/laptops")
                  }
                  className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                >
                  Laptops
                </button>
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
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
              <button
                onClick={() => setActiveTab("jsx")}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === "jsx"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
                JSX
              </button>
              <button
                onClick={() => setActiveTab("css")}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === "css"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
                CSS
              </button>
            </div>

            {/* Tab Content */}
            <div className="code-block">
              <DynamicCodeExample componentName="breadcrumbs" />
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
              • <strong>Hierarchical Navigation:</strong> Shows the complete
              path from root to current location
            </li>
            <li>
              • <strong>Clickable Links:</strong> Each breadcrumb is clickable
              for easy navigation
            </li>
            <li>
              • <strong>Visual Separators:</strong> Clear chevron separators
              between levels
            </li>
            <li>
              • <strong>Current Location:</strong> Highlights the current
              page/location
            </li>
            <li>
              • <strong>Icons Support:</strong> Optional icons for better visual
              identification
            </li>
            <li>
              • <strong>Accessibility:</strong> Proper ARIA labels and semantic
              HTML
            </li>
            <li>
              • <strong>Responsive Design:</strong> Adapts to different screen
              sizes
            </li>
            <li>
              • <strong>Interactive State:</strong> Hover and focus states for
              better UX
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
              • <strong>E-commerce Sites:</strong> Category and product
              navigation
            </li>
            <li>
              • <strong>File Managers:</strong> Directory structure navigation
            </li>
            <li>
              • <strong>Documentation:</strong> Section and subsection
              navigation
            </li>
            <li>
              • <strong>Blog Platforms:</strong> Category and tag hierarchy
            </li>
            <li>
              • <strong>Admin Dashboards:</strong> Section and subsection
              navigation
            </li>
            <li>
              • <strong>Content Management:</strong> Page and content hierarchy
            </li>
            <li>
              • <strong>Knowledge Bases:</strong> Topic and subtopic navigation
            </li>
            <li>
              • <strong>Portfolio Sites:</strong> Project and category
              organization
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
