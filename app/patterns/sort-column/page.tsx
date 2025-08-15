'use client';

import { useState } from 'react';

export default function SortColumnPattern() {
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [codeTab, setCodeTab] = useState<'jsx' | 'css'>('jsx');

  const sampleData = [
    { id: 1, name: 'John Smith', email: 'john@email.com', role: 'Developer', salary: 75000, joinDate: '2023-01-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', role: 'Designer', salary: 65000, joinDate: '2023-03-20' },
    { id: 3, name: 'Mike Wilson', email: 'mike@email.com', role: 'Manager', salary: 95000, joinDate: '2022-11-10' },
    { id: 4, name: 'Emily Davis', email: 'emily@email.com', role: 'Developer', salary: 80000, joinDate: '2023-06-05' },
    { id: 5, name: 'David Brown', email: 'david@email.com', role: 'Analyst', salary: 70000, joinDate: '2023-02-28' }
  ];

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortedData = () => {
    return [...sampleData].sort((a, b) => {
      let aValue = a[sortField as keyof typeof a];
      let bValue = b[sortField as keyof typeof b];

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return '↕️';
    }
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(salary);
  };

  const sortedData = getSortedData();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🔄 Sort By Column
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Sort table data by clicking on column headers with visual indicators for sort direction.
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
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Click column headers to sort
                </span>
                <span className="text-sm text-blue-600 dark:text-blue-400">
                  Sorted by: {sortField} ({sortDirection})
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => handleSort('name')}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Name</span>
                          <span className="text-gray-400">{getSortIcon('name')}</span>
                        </div>
                      </th>
                      <th 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => handleSort('role')}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Role</span>
                          <span className="text-gray-400">{getSortIcon('role')}</span>
                        </div>
                      </th>
                      <th 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => handleSort('salary')}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Salary</span>
                          <span className="text-gray-400">{getSortIcon('salary')}</span>
                        </div>
                      </th>
                      <th 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => handleSort('joinDate')}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Join Date</span>
                          <span className="text-gray-400">{getSortIcon('joinDate')}</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {sortedData.map((row) => (
                      <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
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
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                          {formatSalary(row.salary)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                          {formatDate(row.joinDate)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {sortedData.length} results
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
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
              <button
                onClick={() => setCodeTab('jsx')}
                className={`px-4 py-2 font-medium transition-colors ${
                  codeTab === 'jsx'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                JSX
              </button>
              <button
                onClick={() => setCodeTab('css')}
                className={`px-4 py-2 font-medium transition-colors ${
                  codeTab === 'css'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                CSS
              </button>
            </div>

            {/* Tab Content */}
            <div className="code-block">
              {codeTab === 'jsx' ? (
              <pre className="text-sm leading-relaxed">
{`'use client';

import { useState } from 'react';

export default function SortableTable() {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const data = [
    { id: 1, name: 'John Smith', role: 'Developer', salary: 75000, joinDate: '2023-01-15' }
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortedData = () => {
    return [...data].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const sortedData = getSortedData();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Click headers to sort</span>
        <span className="text-sm text-blue-600">
          Sorted by: {sortField} ({sortDirection})
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Name</span>
                  <span className="text-gray-400">{getSortIcon('name')}</span>
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('role')}
              >
                <div className="flex items-center space-x-1">
                  <span>Role</span>
                  <span className="text-gray-400">{getSortIcon('role')}</span>
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('salary')}
              >
                <div className="flex items-center space-x-1">
                  <span>Salary</span>
                  <span className="text-gray-400">{getSortIcon('salary')}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{row.name}</td>
                <td className="px-4 py-3 text-sm">{row.role}</td>
                <td className="px-4 py-3 text-sm">
                  {\`$\${row.salary.toLocaleString()}\`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`}
              </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Sortable Table Container */
.sortable-table-container {
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Sort Controls */
.sort-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.sort-info {
  font-size: 0.875rem;
  color: #6b7280;
}

.sort-indicator {
  font-size: 0.875rem;
  color: #3b82f6;
  font-weight: 500;
}

/* Sortable Table */
.sortable-table {
  width: 100%;
  border-collapse: collapse;
}

/* Table Header */
.sortable-header {
  background: #f9fafb;
}

.sortable-header-cell {
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #e5e7eb;
}

.sortable-header-cell:hover {
  background: #f3f4f6;
  color: #374151;
}

.sortable-header-cell.active {
  background: #eff6ff;
  color: #1d4ed8;
}

/* Sort Icon Container */
.sort-icon-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-icon {
  font-size: 0.875rem;
  transition: transform 0.2s ease;
}

.sort-icon.asc {
  transform: rotate(0deg);
}

.sort-icon.desc {
  transform: rotate(180deg);
}

.sort-icon.neutral {
  opacity: 0.4;
}

/* Table Body */
.sortable-body {
  background: white;
}

.sortable-row {
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.2s ease;
}

.sortable-row:hover {
  background: #f9fafb;
}

.sortable-row:last-child {
  border-bottom: none;
}

.sortable-cell {
  padding: 0.75rem 1rem;
  vertical-align: top;
}

/* User Info Cell */
.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 500;
  color: #111827;
  margin-bottom: 0.25rem;
}

.user-email {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Role Cell */
.user-role {
  font-size: 0.875rem;
  color: #111827;
}

/* Salary Cell */
.salary-amount {
  font-size: 0.875rem;
  font-weight: 600;
  color: #059669;
}

/* Date Cell */
.join-date {
  font-size: 0.875rem;
  color: #111827;
}

/* Results Counter */
.results-counter {
  padding: 0.75rem 1rem;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
}

/* Sort Animation */
.sortable-row {
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .sort-controls {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .sortable-header-cell,
  .sortable-cell {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
  
  .sortable-header-cell:nth-child(n+4),
  .sortable-cell:nth-child(n+4) {
    display: none;
  }
}

@media (max-width: 480px) {
  .sortable-header-cell:nth-child(n+3),
  .sortable-cell:nth-child(n+3) {
    display: none;
  }
  
  .user-info {
    gap: 0.125rem;
  }
  
  .user-name,
  .user-email {
    font-size: 0.875rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .sortable-table-container,
  .sortable-body {
    background: #1f2937;
    border-color: #374151;
  }
  
  .sort-controls,
  .sortable-header,
  .results-counter {
    background: #111827;
    border-color: #374151;
  }
  
  .sortable-row {
    border-color: #374151;
  }
  
  .sortable-row:hover {
    background: #374151;
  }
  
  .sortable-header-cell {
    color: #9ca3af;
  }
  
  .sortable-header-cell:hover {
    background: #374151;
    color: #d1d5db;
  }
  
  .sortable-header-cell.active {
    background: #1e3a8a;
    color: #60a5fa;
  }
  
  .user-name {
    color: #f9fafb;
  }
  
  .user-email {
    color: #9ca3af;
  }
  
  .user-role,
  .join-date {
    color: #f9fafb;
  }
  
  .salary-amount {
    color: #34d399;
  }
  
  .sort-info,
  .results-counter {
    color: #9ca3af;
  }
  
  .sort-indicator {
    color: #60a5fa;
  }
}

/* Accessibility */
.sortable-header-cell:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.sortable-header-cell[aria-sort="ascending"] .sort-icon {
  transform: rotate(0deg);
}

.sortable-header-cell[aria-sort="descending"] .sort-icon {
  transform: rotate(180deg);
}

.sortable-header-cell[aria-sort="none"] .sort-icon {
  opacity: 0.4;
}

/* Loading State */
.sortable-table.loading {
  opacity: 0.6;
  pointer-events: none;
}

.sortable-table.loading .sortable-row {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Click to Sort</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Click column headers to sort data</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Indicators</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Arrows show current sort direction</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Toggle Direction</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Click same column to reverse sort</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Multiple Data Types</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sort strings, numbers, and dates</p>
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
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Data Tables</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Sort user lists, products, or reports</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📈</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Analytics</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Sort metrics by value or date</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📋</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Admin Panels</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage users, orders, or content</p>
          </div>
        </div>
      </div>
    </div>
  );
}
