'use client';

import { useState } from 'react';
import { DynamicCodeExample } from '../../../components/shared/CodeGenerator';

export default function AlternatingRowsPattern() {
  
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const data = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-01-14' },
    { id: 3, name: 'Carol Davis', email: 'carol@example.com', role: 'Viewer', status: 'Inactive', lastLogin: '2024-01-10' },
    { id: 4, name: 'David Wilson', email: 'david@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-01-15' },
    { id: 5, name: 'Eva Brown', email: 'eva@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-13' },
    { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', status: 'Inactive', lastLogin: '2024-01-08' },
    { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-01-15' },
    { id: 8, name: 'Henry Taylor', email: 'henry@example.com', role: 'Viewer', status: 'Active', lastLogin: '2024-01-12' },
  ];

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleRowSelection = (id: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAllRows = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(data.map(row => row.id)));
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📊 Alternating Row Colors Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Improve table readability with alternating row colors, hover effects, and selection states for better data scanning.
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
              Click headers to sort, select rows with checkboxes, and notice the alternating row colors for better readability.
            </p>
            
            {/* Table Controls */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {selectedRows.size} of {data.length} rows selected
              </div>
              <button
                onClick={() => setSelectedRows(new Set())}
                className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                disabled={selectedRows.size === 0}
              >
                Clear Selection
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedRows.size === data.length}
                        onChange={toggleAllRows}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    {[
                      { key: 'name', label: 'Name' },
                      { key: 'email', label: 'Email' },
                      { key: 'role', label: 'Role' },
                      { key: 'status', label: 'Status' },
                      { key: 'lastLogin', label: 'Last Login' }
                    ].map(({ key, label }) => (
                      <th
                        key={key}
                        onClick={() => handleSort(key)}
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center space-x-1">
                          <span>{label}</span>
                          <span className="text-gray-400">
                            {sortField === key ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {sortedData.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`
                        ${index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}
                        ${selectedRows.has(row.id) ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700' : ''}
                        hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer
                      `}
                      onClick={() => toggleRowSelection(row.id)}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.has(row.id)}
                          onChange={() => toggleRowSelection(row.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {row.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        {row.email}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          row.role === 'Admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                          row.role === 'Editor' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {row.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          row.status === 'Active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        {row.lastLogin}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              💻 Code Example
            </h2>
            
            {/* Tab Navigation */}

            {/* Tab Content */}
            <div className="code-block">
              {
                <DynamicCodeExample 
                componentName="alternating-rows" 
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
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Alternating Colors</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Even and odd rows with different background colors</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Hover Effects</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Visual feedback when hovering over rows</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Selection States</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear visual indication of selected rows</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Sorting Support</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Click headers to sort data ascending/descending</p>
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
            <h4 className="font-medium text-gray-800 dark:text-gray-200">User Management</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Admin panels and user lists</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Data Reports</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Financial and analytics reports</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📋</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Data Tables</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Any tabular data display</p>
          </div>
        </div>
      </div>
    </div>
  );
}