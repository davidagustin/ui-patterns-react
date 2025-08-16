"use client";
import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
export default function TablesPattern() {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const sampleData = [
    {
      id: 1,
      name: "John Smith",
      email: "john@email.com",
      role: "Developer",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@email.com",
      role: "Designer",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@email.com",
      role: "Manager",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@email.com",
      role: "Developer",
      status: "Active",
    },
  ];
  const handleRowSelect = (id: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };
  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
  };
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📊 Tables
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Organize and display data in structured rows and columns with
          interactive features.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedRows.size} of {sampleData.length} selected
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setViewMode(viewMode === "table" ? "cards" : "table")
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all text-sm min-h-[44px] flex items-center shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  >
                    {viewMode === "table" ? "📱 Cards" : "📊 Table"}
                  </button>
                  <button className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 border-2 border-blue-600 dark:border-blue-400 rounded-lg min-h-[44px] flex items-center hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                    Export Data
                  </button>
                </div>
              </div>
              {viewMode === "table" ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={selectedRows.size === sampleData.length}
                            onChange={() =>
                              setSelectedRows(
                                new Set(sampleData.map((row) => row.id)),
                              )
                            }
                            className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 cursor-pointer transition-all hover:border-blue-400 dark:hover:border-blue-500"
                          />
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          Role
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {sampleData.map((row) => (
                        <tr
                          key={row.id}
                          className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                            selectedRows.has(row.id)
                              ? "bg-blue-50 dark:bg-blue-900/20"
                              : ""
                          }`}
                        >
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedRows.has(row.id)}
                              onChange={() => handleRowSelect(row.id)}
                              className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 cursor-pointer transition-all hover:border-blue-400 dark:hover:border-blue-500"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-gray-100">
                                {row.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {row.email}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            {row.role}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(row.status)}`}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm min-h-[44px] px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm divide-y divide-gray-200 dark:divide-gray-700">
                  {/* Select All for Cards */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 flex items-center justify-between">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedRows.size === sampleData.length}
                        onChange={() =>
                          setSelectedRows(
                            new Set(sampleData.map((row) => row.id)),
                          )
                        }
                        className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 cursor-pointer transition-all hover:border-blue-400 dark:hover:border-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Select All ({sampleData.length})
                      </span>
                    </label>
                  </div>
                  {/* Card Layout */}
                  {sampleData.map((row) => (
                    <div
                      key={row.id}
                      className={`p-4 space-y-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        selectedRows.has(row.id)
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={selectedRows.has(row.id)}
                            onChange={() => handleRowSelect(row.id)}
                            className="w-5 h-5 mt-1 rounded border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 cursor-pointer transition-all hover:border-blue-400 dark:hover:border-blue-500"
                          />
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                              {row.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {row.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(row.status)}`}
                          >
                            {row.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-600">
                        <div>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Role
                          </span>
                          <div className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                            {row.role}
                          </div>
                        </div>
                        <button className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm min-h-[44px] border-2 border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
              <DynamicCodeExample componentName="tables" />
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
                Row Selection
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select individual or all rows with checkboxes
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
                Color-coded status badges for quick identification
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Hover Effects
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Visual feedback when hovering over rows
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Bulk Actions
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Perform actions on multiple selected rows
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
            <div className="text-2xl mb-2">👥</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              User Management
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Display user lists with actions and details
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Data Reports
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Show structured data with filtering and sorting
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Product Catalogs
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              List products with details and management actions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
