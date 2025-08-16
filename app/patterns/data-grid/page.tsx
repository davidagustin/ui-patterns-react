"use client";

import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function DataGridPattern() {
    const [data, setData] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      department: "IT",
      salary: 75000,
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Developer",
      department: "Engineering",
      salary: 65000,
      status: "Active",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Designer",
      department: "Design",
      salary: 60000,
      status: "Inactive",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "Manager",
      department: "Sales",
      salary: 80000,
      status: "Active",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "Analyst",
      department: "Marketing",
      salary: 55000,
      status: "Active",
    },
  ]);

  const [editingCell, setEditingCell] = useState<{
    rowId: number;
    field: string;
  } | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortField, setSortField] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const [viewMode, setViewMode] = useState<"table" | "cards">("table");


  const columns = [
    { key: "name", label: "Name", editable: true, type: "text" },
    { key: "email", label: "Email", editable: true, type: "email" },
    {
      key: "role",
      label: "Role",
      editable: true,
      type: "select",
      options: ["Admin", "Developer", "Designer", "Manager", "Analyst"],
    },
    {
      key: "department",
      label: "Department",
      editable: true,
      type: "select",
      options: ["IT", "Engineering", "Design", "Sales", "Marketing"],
    },
    { key: "salary", label: "Salary", editable: true, type: "number" },
    {
      key: "status",
      label: "Status",
      editable: true,
      type: "select",
      options: ["Active", "Inactive"],
    },
  ];

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleEdit = (rowId: number, field: string) => {
    setEditingCell({ rowId, field });
  };

  const handleSave = (rowId: number, field: string, value: string) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row,
      ),
    );
    setEditingCell(null);
  };

  const handleCancel = () => {
    setEditingCell(null);
  };

  const handleSelectRow = (rowId: number) => {
    setSelectedRows((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId],
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((row) => row.id));
    }
  };

  const handleDeleteSelected = () => {
    setData((prevData) =>
      prevData.filter((row) => !selectedRows.includes(row.id)),
    );
    setSelectedRows([]);
  };

  const handleExport = () => {
    const csvContent = [
      columns.map((col) => col.label).join(","),
      ...filteredData.map((row) =>
        columns.map((col) => row[col.key as keyof typeof row]).join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data-grid-export.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];

    if (sortDirection === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const renderCell = (row: any, column: any) => {
    const isEditing =
      editingCell?.rowId === row.id && editingCell?.field === column.key;
    const value = row[column.key];

    if (isEditing) {
      if (column.type === "select") {
        return (
          <select
            defaultValue={value}
            onBlur={(e) => handleSave(row.id, column.key, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave(
                  row.id,
                  column.key,
                  (e.target as HTMLSelectElement).value,
                );
              } else if (e.key === "Escape") {
                handleCancel();
              }
            }}
            autoFocus
            className="w-full px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {column.options.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      }

      return (
        <input
          type={column.type}
          defaultValue={value}
          onBlur={(e) => handleSave(row.id, column.key, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSave(
                row.id,
                column.key,
                (e.target as HTMLInputElement).value,
              );
            } else if (e.key === "Escape") {
              handleCancel();
            }
          }}
          autoFocus
          className="w-full px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      );
    }

    if (column.key === "salary") {
      return `$${value.toLocaleString()}`;
    }

    if (column.key === "status") {
      return (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            value === "Active"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
          }`}
        >
          {value}
        </span>
      );
    }

    return (
      <div
        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded"
        onClick={() => column.editable && handleEdit(row.id, column.key)}
      >
        {value}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📋 Advanced Data Grid Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Interactive data grid with inline editing, sorting, filtering, and
          bulk operations for managing complex datasets.
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
              {/* Controls */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      placeholder="Search all fields..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full md:w-auto px-4 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                      style={{ fontSize: "16px" }}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {filteredData.length} of {data.length} records
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          setViewMode(viewMode === "table" ? "cards" : "table")
                        }
                        className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-h-[44px] flex items-center justify-center"
                      >
                        {viewMode === "table" ? "📱 Cards" : "📋 Table"}
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      {selectedRows.length > 0 && (
                        <button
                          onClick={handleDeleteSelected}
                          className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors min-h-[44px] flex-1 sm:flex-none"
                        >
                          Delete ({selectedRows.length})
                        </button>
                      )}
                      <button
                        onClick={handleExport}
                        className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors min-h-[44px] flex-1 sm:flex-none"
                      >
                        Export CSV
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Grid */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {viewMode === "table" ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-4 py-3 text-left">
                            <input
                              type="checkbox"
                              checked={
                                selectedRows.length === filteredData.length &&
                                filteredData.length > 0
                              }
                              onChange={handleSelectAll}
                              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                            />
                          </th>
                          {columns.map((column) => (
                            <th
                              key={column.key}
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 min-h-[44px]"
                              onClick={() => handleSort(column.key)}
                            >
                              <div className="flex items-center justify-between">
                                <span>{column.label}</span>
                                <svg
                                  className="w-4 h-4 text-gray-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {sortedData.map((row) => (
                          <tr
                            key={row.id}
                            className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                              selectedRows.includes(row.id)
                                ? "bg-blue-50 dark:bg-blue-900/20"
                                : ""
                            }`}
                          >
                            <td className="px-4 py-3">
                              <input
                                type="checkbox"
                                checked={selectedRows.includes(row.id)}
                                onChange={() => handleSelectRow(row.id)}
                                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                              />
                            </td>
                            {columns.map((column) => (
                              <td
                                key={column.key}
                                className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100"
                              >
                                {renderCell(row, column)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {/* Select All Header for Cards */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 flex items-center justify-between">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={
                            selectedRows.length === filteredData.length &&
                            filteredData.length > 0
                          }
                          onChange={handleSelectAll}
                          className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Select All ({filteredData.length})
                        </span>
                      </label>
                      <button
                        onClick={() => handleSort(sortField)}
                        className="text-sm text-blue-600 dark:text-blue-400 font-medium"
                      >
                        Sort by{" "}
                        {columns.find((c) => c.key === sortField)?.label}{" "}
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </button>
                    </div>

                    {/* Card Layout */}
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {sortedData.map((row) => (
                        <div
                          key={row.id}
                          className={`p-4 space-y-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                            selectedRows.includes(row.id)
                              ? "bg-blue-50 dark:bg-blue-900/20"
                              : ""
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={selectedRows.includes(row.id)}
                                onChange={() => handleSelectRow(row.id)}
                                className="w-5 h-5 mt-1 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                              />
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                  {renderCell(
                                    row,
                                    columns.find((c) => c.key === "name"),
                                  )}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {renderCell(
                                    row,
                                    columns.find((c) => c.key === "email"),
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              {renderCell(
                                row,
                                columns.find((c) => c.key === "status"),
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100 dark:border-gray-600">
                            <div>
                              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Role
                              </span>
                              <div className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                {renderCell(
                                  row,
                                  columns.find((c) => c.key === "role"),
                                )}
                              </div>
                            </div>
                            <div>
                              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Department
                              </span>
                              <div className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                {renderCell(
                                  row,
                                  columns.find((c) => c.key === "department"),
                                )}
                              </div>
                            </div>
                            <div>
                              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Salary
                              </span>
                              <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-100">
                                {renderCell(
                                  row,
                                  columns.find((c) => c.key === "salary"),
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
                <h3 className="text-lg font-semibold mb-4 text-yellow-800 dark:text-yellow-200">
                  💡 How to Use
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700 dark:text-yellow-300">
                  <div>
                    <h4 className="font-medium mb-2">Editing</h4>
                    <ul className="space-y-1">
                      <li>• Click on any cell to edit inline</li>
                      <li>• Press Enter to save, Escape to cancel</li>
                      <li>• Select dropdowns for role, department, status</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Bulk Operations</h4>
                    <ul className="space-y-1">
                      <li>• Select individual rows or use "Select All"</li>
                      <li>• Delete multiple selected records</li>
                      <li>• Export filtered data to CSV</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            💻 Code Example
          </h2>

          {/* Tab Content */}
          <div className="code-block">
            <DynamicCodeExample componentName="data-grid" />
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
                  Inline Editing
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click any cell to edit directly in the grid
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
                  Select multiple rows for batch actions
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-600 dark:text-green-400 text-lg">
                ✓
              </span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Smart Search
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Search across all fields with real-time filtering
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-600 dark:text-green-400 text-lg">
                ✓
              </span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Data Export
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Export filtered data to CSV format
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
                Admin panels for managing user accounts and permissions
              </p>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl mb-2">📊</div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Data Administration
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                CRUD operations for business data and records
              </p>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl mb-2">🛒</div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Inventory Management
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Product catalogs with bulk editing capabilities
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
