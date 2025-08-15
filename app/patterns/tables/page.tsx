'use client';

import { useState } from 'react';

export default function TablesPattern() {
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, department: 'Engineering', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, department: 'Design', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, department: 'Marketing', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 28, department: 'Engineering', status: 'Active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 32, department: 'Sales', status: 'Active' },
    { id: 6, name: 'Diana Davis', email: 'diana@example.com', age: 29, department: 'Design', status: 'Inactive' },
  ];

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredData.map(row => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const filteredData = data.filter(row =>
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📊 Tables Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Organize data in rows and columns with sorting, filtering, and interactive features for efficient data management.
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
              Try sorting columns, searching, and selecting rows. The table supports multiple interactive features.
            </p>
            
            <div className="space-y-4">
              {/* Search and Actions */}
              <div className="flex items-center justify-between">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search all columns..."
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                </div>
                {selectedRows.length > 0 && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedRows.length} row(s) selected
                  </div>
                )}
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <th className="border border-gray-300 dark:border-gray-600 p-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="rounded"
                        />
                      </th>
                      <th 
                        className="border border-gray-300 dark:border-gray-600 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => handleSort('name')}
                      >
                        <div className="flex items-center justify-between">
                          <span>Name</span>
                          {sortField === 'name' && (
                            <span className="text-blue-600 dark:text-blue-400">
                              {sortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="border border-gray-300 dark:border-gray-600 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => handleSort('email')}
                      >
                        <div className="flex items-center justify-between">
                          <span>Email</span>
                          {sortField === 'email' && (
                            <span className="text-blue-600 dark:text-blue-400">
                              {sortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="border border-gray-300 dark:border-gray-600 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => handleSort('age')}
                      >
                        <div className="flex items-center justify-between">
                          <span>Age</span>
                          {sortField === 'age' && (
                            <span className="text-blue-600 dark:text-blue-400">
                              {sortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="border border-gray-300 dark:border-gray-600 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => handleSort('department')}
                      >
                        <div className="flex items-center justify-between">
                          <span>Department</span>
                          {sortField === 'department' && (
                            <span className="text-blue-600 dark:text-blue-400">
                              {sortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="border border-gray-300 dark:border-gray-600 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => handleSort('status')}
                      >
                        <div className="flex items-center justify-between">
                          <span>Status</span>
                          {sortField === 'status' && (
                            <span className="text-blue-600 dark:text-blue-400">
                              {sortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.map((row, index) => (
                      <tr 
                        key={row.id} 
                        className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'} hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors`}
                      >
                        <td className="border border-gray-300 dark:border-gray-600 p-3">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(row.id)}
                            onChange={(e) => handleSelectRow(row.id, e.target.checked)}
                            className="rounded"
                          />
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 p-3 font-medium text-gray-900 dark:text-gray-100">
                          {row.name}
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">
                          {row.email}
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">
                          {row.age}
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">
                          {row.department}
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {sortedData.length} of {data.length} records
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
            <div className="code-block">
              <pre className="text-sm leading-relaxed">
{`import { useState } from 'react';

function TableExample() {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, department: 'Engineering', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, department: 'Design', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, department: 'Marketing', status: 'Inactive' }
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(filteredData.map(row => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const filteredData = data.filter(row =>
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const getStatusColor = (status) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search all columns..."
          className="px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-3">
              <input
                type="checkbox"
                checked={selectedRows.length === filteredData.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </th>
            <th 
              className="border p-3 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center justify-between">
                <span>Name</span>
                {sortField === 'name' && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
            <th 
              className="border p-3 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('email')}
            >
              <div className="flex items-center justify-between">
                <span>Email</span>
                {sortField === 'email' && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
            <th 
              className="border p-3 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('age')}
            >
              <div className="flex items-center justify-between">
                <span>Age</span>
                {sortField === 'age' && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
            <th 
              className="border p-3 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('department')}
            >
              <div className="flex items-center justify-between">
                <span>Department</span>
                {sortField === 'department' && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
            <th 
              className="border p-3 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('status')}
            >
              <div className="flex items-center justify-between">
                <span>Status</span>
                {sortField === 'status' && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={row.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="border p-3">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={(e) => handleSelectRow(row.id, e.target.checked)}
                />
              </td>
              <td className="border p-3 font-medium">{row.name}</td>
              <td className="border p-3">{row.email}</td>
              <td className="border p-3">{row.age}</td>
              <td className="border p-3">{row.department}</td>
              <td className="border p-3">
                <span className={\`px-2 py-1 rounded-full text-xs font-medium \${getStatusColor(row.status)}\`}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-sm text-gray-600 mt-2">
        Showing {sortedData.length} of {data.length} records
      </div>
    </div>
  );
}`}
              </pre>
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Sortable Columns</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Click column headers to sort data ascending/descending</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Global Search</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Search across all columns with real-time filtering</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Row Selection</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Select individual rows or all rows with checkboxes</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Indicators</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Status badges, hover effects, and alternating row colors</p>
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
            <p className="text-sm text-gray-600 dark:text-gray-400">Display and manage user accounts with sorting and filtering</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Data Analytics</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Present large datasets with interactive exploration features</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Product Catalogs</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Showcase products with searchable and sortable attributes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
