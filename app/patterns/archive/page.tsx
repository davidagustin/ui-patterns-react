"use client";
import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
export default function ArchivePattern() {
  const [archivedItems, setArchivedItems] = useState<number[]>([]);
  const [showArchived, setShowArchived] = useState(false);
  const items = [
    {
      id: 1,
      title: "Project Alpha",
      status: "Active",
      date: "2024-01-15",
      category: "Development",
    },
    {
      id: 2,
      title: "Marketing Campaign Q1",
      status: "Completed",
      date: "2024-01-10",
      category: "Marketing",
    },
    {
      id: 3,
      title: "User Research Study",
      status: "Active",
      date: "2024-01-20",
      category: "Research",
    },
    {
      id: 4,
      title: "Budget Planning 2023",
      status: "Archived",
      date: "2023-12-31",
      category: "Finance",
    },
    {
      id: 5,
      title: "Product Launch Strategy",
      status: "Completed",
      date: "2024-01-05",
      category: "Strategy",
    },
    {
      id: 6,
      title: "Team Building Event",
      status: "Active",
      date: "2024-01-25",
      category: "HR",
    },
    {
      id: 7,
      title: "Q4 Sales Report",
      status: "Archived",
      date: "2023-12-15",
      category: "Sales",
    },
    {
      id: 8,
      title: "Website Redesign",
      status: "Active",
      date: "2024-01-18",
      category: "Design",
    },
  ];
  const toggleArchive = (id: number) => {
    setArchivedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };
  const isArchived = (id: number) => archivedItems.includes(id);
  const filteredItems = items.filter((item) =>
    showArchived ? isArchived(item.id) : !isArchived(item.id),
  );
  const activeItems = items.filter((item) => !isArchived(item.id));
  const archivedCount = archivedItems.length;
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📦 Archive Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Organize and manage items by archiving them. Keep active items visible
          while storing completed or old items in an archive.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            {/* Archive Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowArchived(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    !showArchived
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  Active ({activeItems.length})
                </button>
                <button
                  onClick={() => setShowArchived(true)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    showArchived
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  Archived ({archivedCount})
                </button>
              </div>
              {!showArchived && archivedCount > 0 && (
                <button
                  onClick={() => setShowArchived(true)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                >
                  View Archive →
                </button>
              )}
            </div>
            {/* Items List */}
            <div className="space-y-3">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                      isArchived(item.id)
                        ? "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-75"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          item.status === "Active"
                            ? "bg-green-500"
                            : item.status === "Completed"
                              ? "bg-blue-500"
                              : "bg-gray-400"
                        }`}
                      ></div>
                      <div>
                        <h3
                          className={`font-semibold ${
                            isArchived(item.id)
                              ? "text-gray-500 dark:text-gray-400"
                              : "text-gray-900 dark:text-gray-100"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            {item.category}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-600 dark:text-gray-400">
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleArchive(item.id)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        isArchived(item.id)
                          ? "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      aria-label={
                        isArchived(item.id) ? "Unarchive item" : "Archive item"
                      }
                    >
                      {isArchived(item.id) ? (
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
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
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
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <div className="text-4xl mb-2">📦</div>
                  <p className="text-lg font-medium mb-1">
                    {showArchived ? "No archived items" : "No active items"}
                  </p>
                  <p className="text-sm">
                    {showArchived
                      ? "Items you archive will appear here"
                      : "All items have been archived"}
                  </p>
                </div>
              )}
            </div>
            {/* Archive Actions */}
            {!showArchived && activeItems.length > 0 && (
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  Bulk Actions
                </h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 transition-colors">
                    Archive Selected
                  </button>
                  <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    Select All
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Code Example */}
<DynamicCodeExample componentName="archive" />
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
                Toggle Views
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Switch between active and archived items
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Visual States
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Clear visual distinction for archived items
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Bulk Operations
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Archive multiple items at once
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Status Indicators
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Color-coded status for easy identification
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
            <div className="text-2xl mb-2">📧</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Email Management
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Archive old emails while keeping inbox clean
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📁</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              File Organization
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Archive completed projects and documents
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📋</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Task Management
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Archive completed tasks and keep active ones visible
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
