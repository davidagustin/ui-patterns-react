'use client';

import { useState } from 'react';

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
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
              <button
                onClick={() => setActiveTab('jsx')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'jsx'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                JSX
              </button>
              <button
                onClick={() => setActiveTab('css')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'css'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                CSS
              </button>
            </div>

            {/* Tab Content */}
            <div className="code-block">
              {activeTab === 'jsx' ? (
                <pre className="text-sm leading-relaxed">
{`import { useState } from 'react';

export default function AlternatingRows() {
  const [selectedRows, setSelectedRows] = useState(new Set());

  const data = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
    { id: 3, name: 'Carol Davis', email: 'carol@example.com', role: 'Viewer' },
    // ... more data
  ];

  const toggleRowSelection = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  return (
    <div className="table-container">
      <table className="alternating-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={row.id}
              className={\`
                \${index % 2 === 0 ? 'even-row' : 'odd-row'}
                \${selectedRows.has(row.id) ? 'selected-row' : ''}
                table-row
              \`}
              onClick={() => toggleRowSelection(row.id)}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.has(row.id)}
                  onChange={() => toggleRowSelection(row.id)}
                />
              </td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>
                <span className="role-badge">{row.role}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Table Container */
.table-container {
  overflow-x: auto;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.alternating-table {
  width: 100%;
  border-collapse: collapse;
}

/* Table Header */
.alternating-table thead {
  background-color: #f9fafb;
}

.alternating-table th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
}

/* Table Body */
.alternating-table tbody {
  background-color: white;
  divide-y: 1px solid #e5e7eb;
}

/* Alternating Row Colors */
.table-row {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.even-row {
  background-color: white;
}

.odd-row {
  background-color: #f9fafb;
}

/* Hover Effects */
.table-row:hover {
  background-color: #f3f4f6 !important;
}

/* Selected Row State */
.selected-row {
  background-color: #dbeafe !important;
  border-color: #93c5fd;
}

.selected-row:hover {
  background-color: #bfdbfe !important;
}

/* Table Cells */
.alternating-table td {
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #111827;
  white-space: nowrap;
}

/* Role Badge */
.role-badge {
  display: inline-flex;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
  background-color: #e5e7eb;
  color: #374151;
}

/* Checkbox Styling */
.alternating-table input[type="checkbox"] {
  border-radius: 0.25rem;
  border: 1px solid #d1d5db;
  color: #3b82f6;
}

.alternating-table input[type="checkbox"]:focus {
  ring: 2px;
  ring-color: #3b82f6;
  ring-opacity: 0.5;
}

/* Sortable Headers */
.sortable-header {
  cursor: pointer;
  user-select: none;
}

.sortable-header:hover {
  background-color: #f3f4f6;
}

.sort-indicator {
  margin-left: 0.25rem;
  color: #9ca3af;
}

/* Responsive Design */
@media (max-width: 768px) {
  .alternating-table {
    font-size: 0.8125rem;
  }
  
  .alternating-table th,
  .alternating-table td {
    padding: 0.5rem;
  }
  
  .table-container {
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .table-container {
    border-color: #374151;
  }
  
  .alternating-table thead {
    background-color: #1f2937;
  }
  
  .alternating-table th {
    color: #9ca3af;
    border-color: #374151;
  }
  
  .alternating-table tbody {
    background-color: #111827;
  }
  
  .even-row {
    background-color: #111827;
  }
  
  .odd-row {
    background-color: #1f2937;
  }
  
  .table-row:hover {
    background-color: #374151 !important;
  }
  
  .selected-row {
    background-color: #1e3a8a !important;
    border-color: #3b82f6;
  }
  
  .selected-row:hover {
    background-color: #1e40af !important;
  }
  
  .alternating-table td {
    color: #f9fafb;
  }
  
  .role-badge {
    background-color: #374151;
    color: #d1d5db;
  }
}

/* Accessibility */
.alternating-table:focus-within {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.table-row:focus {
  outline: 2px solid #3b82f6;
  outline-offset: -2px;
}

/* Performance Optimization */
.alternating-table {
  contain: layout style;
}

/* Loading State */
.table-loading {
  opacity: 0.7;
  pointer-events: none;
}

.table-loading tbody tr {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}`}
                </pre>
              )}
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