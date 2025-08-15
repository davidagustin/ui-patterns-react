'use client';

import { useState } from 'react';

export default function DataGridPattern() {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', department: 'IT', salary: 75000, status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', department: 'Engineering', salary: 65000, status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Designer', department: 'Design', salary: 60000, status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', department: 'Sales', salary: 80000, status: 'Active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Analyst', department: 'Marketing', salary: 55000, status: 'Active' }
  ]);

  const [editingCell, setEditingCell] = useState<{rowId: number, field: string} | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [codeTab, setCodeTab] = useState<'jsx' | 'css'>('jsx');
  const [columnWidths, setColumnWidths] = useState({
    name: 150,
    email: 200,
    role: 120,
    department: 120,
    salary: 100,
    status: 100
  });

  const columns = [
    { key: 'name', label: 'Name', editable: true, type: 'text' },
    { key: 'email', label: 'Email', editable: true, type: 'email' },
    { key: 'role', label: 'Role', editable: true, type: 'select', options: ['Admin', 'Developer', 'Designer', 'Manager', 'Analyst'] },
    { key: 'department', label: 'Department', editable: true, type: 'select', options: ['IT', 'Engineering', 'Design', 'Sales', 'Marketing'] },
    { key: 'salary', label: 'Salary', editable: true, type: 'number' },
    { key: 'status', label: 'Status', editable: true, type: 'select', options: ['Active', 'Inactive'] }
  ];

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleEdit = (rowId: number, field: string) => {
    setEditingCell({ rowId, field });
  };

  const handleSave = (rowId: number, field: string, value: string) => {
    setData(prevData => 
      prevData.map(row => 
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
    setEditingCell(null);
  };

  const handleCancel = () => {
    setEditingCell(null);
  };

  const handleSelectRow = (rowId: number) => {
    setSelectedRows(prev => 
      prev.includes(rowId) 
        ? prev.filter(id => id !== rowId)
        : [...prev, rowId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map(row => row.id));
    }
  };

  const handleDeleteSelected = () => {
    setData(prevData => prevData.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
  };

  const handleExport = () => {
    const csvContent = [
      columns.map(col => col.label).join(','),
      ...filteredData.map(row => 
        columns.map(col => row[col.key as keyof typeof row]).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data-grid-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
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

  const renderCell = (row: any, column: any) => {
    const isEditing = editingCell?.rowId === row.id && editingCell?.field === column.key;
    const value = row[column.key];

    if (isEditing) {
      if (column.type === 'select') {
        return (
          <select
            defaultValue={value}
            onBlur={(e) => handleSave(row.id, column.key, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSave(row.id, column.key, (e.target as HTMLSelectElement).value);
              } else if (e.key === 'Escape') {
                handleCancel();
              }
            }}
            autoFocus
            className="w-full px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {column.options.map((option: string) => (
              <option key={option} value={option}>{option}</option>
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
            if (e.key === 'Enter') {
              handleSave(row.id, column.key, (e.target as HTMLInputElement).value);
            } else if (e.key === 'Escape') {
              handleCancel();
            }
          }}
          autoFocus
          className="w-full px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      );
    }

    if (column.key === 'salary') {
      return `$${value.toLocaleString()}`;
    }

    if (column.key === 'status') {
      return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 'Active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
        }`}>
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
          Interactive data grid with inline editing, sorting, filtering, and bulk operations for managing complex datasets.
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
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {filteredData.length} of {data.length} records
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              {selectedRows.length > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete ({selectedRows.length})
                </button>
              )}
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Data Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => handleSort(column.key)}
                      style={{ width: columnWidths[column.key as keyof typeof columnWidths] }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{column.label}</span>
                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {sortedData.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      selectedRows.includes(row.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100"
                        style={{ width: columnWidths[column.key as keyof typeof columnWidths] }}
                      >
                        {renderCell(row, column)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
{`import { useState } from 'react';

export default function DataGrid() {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', status: 'Active' }
  ]);

  const [editingCell, setEditingCell] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { key: 'name', label: 'Name', editable: true, type: 'text' },
    { key: 'email', label: 'Email', editable: true, type: 'email' },
    { key: 'role', label: 'Role', editable: true, type: 'select', options: ['Admin', 'Developer', 'Designer'] },
    { key: 'status', label: 'Status', editable: true, type: 'select', options: ['Active', 'Inactive'] }
  ];

  const handleEdit = (rowId, field) => {
    setEditingCell({ rowId, field });
  };

  const handleSave = (rowId, field, value) => {
    setData(prevData => 
      prevData.map(row => 
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
    setEditingCell(null);
  };

  const handleSelectRow = (rowId) => {
    setSelectedRows(prev => 
      prev.includes(rowId) 
        ? prev.filter(id => id !== rowId)
        : [...prev, rowId]
    );
  };

  const filteredData = data.filter(row =>
    Object.values(row).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const renderCell = (row, column) => {
    const isEditing = editingCell?.rowId === row.id && editingCell?.field === column.key;
    const value = row[column.key];

    if (isEditing) {
      if (column.type === 'select') {
        return (
          <select
            defaultValue={value}
            onBlur={(e) => handleSave(row.id, column.key, e.target.value)}
            autoFocus
            className="w-full px-2 py-1 border border-blue-500 rounded"
          >
            {column.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      }

      return (
        <input
          type={column.type}
          defaultValue={value}
          onBlur={(e) => handleSave(row.id, column.key, e.target.value)}
          autoFocus
          className="w-full px-2 py-1 border border-blue-500 rounded"
        />
      );
    }

    return (
      <div 
        className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
        onClick={() => column.editable && handleEdit(row.id, column.key)}
      >
        {value}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg"
      />

      {/* Grid */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows.length === filteredData.length}
                  onChange={() => setSelectedRows(filteredData.map(row => row.id))}
                  className="rounded"
                />
              </th>
              {columns.map(column => (
                <th key={column.key} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                    className="rounded"
                  />
                </td>
                {columns.map(column => (
                  <td key={column.key} className="px-4 py-3 text-sm">
                    {renderCell(row, column)}
                  </td>
                ))}
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
{`/* Data Grid Container */
.data-grid-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

/* Search Input */
.data-grid-search {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
}

.data-grid-search:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.data-grid-search::placeholder {
  color: #9ca3af;
}

/* Grid Table */
.data-grid-table {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Table Header */
.data-grid-header {
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.data-grid-header-row {
  display: grid;
  grid-template-columns: 50px 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 0.75rem 1rem;
}

.data-grid-header-cell {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
}

/* Table Body */
.data-grid-body {
  max-height: 400px;
  overflow-y: auto;
}

.data-grid-row {
  display: grid;
  grid-template-columns: 50px 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.2s ease;
}

.data-grid-row:hover {
  background-color: #f9fafb;
}

.data-grid-row:last-child {
  border-bottom: none;
}

.data-grid-cell {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #374151;
}

/* Checkbox Styles */
.data-grid-checkbox {
  width: 1rem;
  height: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.data-grid-checkbox:checked {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.data-grid-checkbox:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Editable Cell */
.editable-cell {
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s ease;
}

.editable-cell:hover {
  background-color: #f3f4f6;
}

.editable-cell.editing {
  padding: 0;
}

/* Edit Input */
.edit-input {
  width: 100%;
  padding: 0.25rem 0.5rem;
  border: 1px solid #3b82f6;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  background: white;
}

.edit-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

/* Edit Select */
.edit-select {
  width: 100%;
  padding: 0.25rem 0.5rem;
  border: 1px solid #3b82f6;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  background: white;
  cursor: pointer;
}

.edit-select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

/* Status Badge */
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-badge.active {
  background-color: #dcfce7;
  color: #166534;
}

.status-badge.inactive {
  background-color: #fef2f2;
  color: #dc2626;
}

/* Bulk Actions */
.bulk-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.bulk-action-button {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.bulk-action-button:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}

.bulk-action-button.danger {
  background-color: #ef4444;
  color: white;
  border-color: #ef4444;
}

.bulk-action-button.danger:hover {
  background-color: #dc2626;
}

/* Responsive Design */
@media (max-width: 768px) {
  .data-grid-header-row,
  .data-grid-row {
    grid-template-columns: 50px 1fr 1fr;
    gap: 0.5rem;
    padding: 0.5rem;
  }
  
  .data-grid-header-cell:nth-child(n+4),
  .data-grid-cell:nth-child(n+4) {
    display: none;
  }
}

@media (max-width: 480px) {
  .data-grid-header-row,
  .data-grid-row {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }
  
  .data-grid-header-cell:first-child,
  .data-grid-cell:first-child {
    display: none;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .data-grid-search {
    background-color: #1f2937;
    border-color: #374151;
    color: #f9fafb;
  }
  
  .data-grid-search::placeholder {
    color: #6b7280;
  }
  
  .data-grid-table {
    background: #1f2937;
    border-color: #374151;
  }
  
  .data-grid-header {
    background-color: #111827;
    border-color: #374151;
  }
  
  .data-grid-row {
    border-color: #374151;
  }
  
  .data-grid-row:hover {
    background-color: #374151;
  }
  
  .data-grid-cell {
    color: #f9fafb;
  }
  
  .editable-cell:hover {
    background-color: #374151;
  }
  
  .edit-input,
  .edit-select {
    background: #374151;
    border-color: #60a5fa;
    color: #f9fafb;
  }
  
  .bulk-actions {
    background-color: #111827;
    border-color: #374151;
  }
  
  .bulk-action-button {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
  
  .bulk-action-button:hover {
    background-color: #4b5563;
  }
}`}
            </pre>
          )}
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Inline Editing</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Click any cell to edit directly in the grid</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Bulk Operations</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Select multiple rows for batch actions</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Smart Search</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Search across all fields with real-time filtering</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Data Export</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Export filtered data to CSV format</p>
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
            <p className="text-sm text-gray-600 dark:text-gray-400">Admin panels for managing user accounts and permissions</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Data Administration</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">CRUD operations for business data and records</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Inventory Management</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Product catalogs with bulk editing capabilities</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
