'use client';

import { useState } from 'react';

export default function PaginationPattern() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [codeTab, setCodeTab] = useState<'jsx' | 'css'>('jsx');
  
  const allItems = [
    { id: 1, name: 'Product A', category: 'Electronics', price: '$299' },
    { id: 2, name: 'Product B', category: 'Clothing', price: '$89' },
    { id: 3, name: 'Product C', category: 'Electronics', price: '$199' },
    { id: 4, name: 'Product D', category: 'Books', price: '$24' },
    { id: 5, name: 'Product E', category: 'Electronics', price: '$399' },
    { id: 6, name: 'Product F', category: 'Clothing', price: '$129' },
    { id: 7, name: 'Product G', category: 'Books', price: '$18' },
    { id: 8, name: 'Product H', category: 'Electronics', price: '$599' },
    { id: 9, name: 'Product I', category: 'Clothing', price: '$79' },
    { id: 10, name: 'Product J', category: 'Books', price: '$32' },
    { id: 11, name: 'Product K', category: 'Electronics', price: '$249' },
    { id: 12, name: 'Product L', category: 'Clothing', price: '$149' },
    { id: 13, name: 'Product M', category: 'Books', price: '$28' },
    { id: 14, name: 'Product N', category: 'Electronics', price: '$349' },
    { id: 15, name: 'Product O', category: 'Clothing', price: '$99' }
  ];

  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = allItems.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📄 Pagination Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Break large sets of content into manageable pages, improving performance and user experience with clear navigation controls.
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
              Navigate through the product list using different pagination controls. Try changing the items per page.
            </p>
            
            <div className="space-y-4">
              {/* Items Per Page Selector */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">Items per page:</label>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1); // Reset to first page when changing items per page
                    }}
                    className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800"
                  >
                    <option value={3}>3</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                  </select>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {startIndex + 1}-{Math.min(endIndex, allItems.length)} of {allItems.length} items
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {currentItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{item.id}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{item.category}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={goToFirstPage}
                    disabled={currentPage === 1}
                    className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Go to first page"
                  >
                    ««
                  </button>
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Go to previous page"
                  >
                    «
                  </button>
                </div>

                <div className="flex items-center space-x-1">
                  {getVisiblePages().map((page, index) => (
                    <div key={index}>
                      {page === '...' ? (
                        <span className="px-3 py-1 text-sm text-gray-500 dark:text-gray-400">...</span>
                      ) : (
                        <button
                          onClick={() => goToPage(page as number)}
                          className={`px-3 py-1 text-sm rounded transition-colors ${
                            currentPage === page
                              ? 'bg-blue-600 text-white'
                              : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Go to next page"
                  >
                    »
                  </button>
                  <button
                    onClick={goToLastPage}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Go to last page"
                  >
                    »»
                  </button>
                </div>
              </div>

              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages}
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
{`import { useState } from 'react';

export default function PaginationPattern() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  const allItems = [
    { id: 1, name: 'Product A', category: 'Electronics', price: '$299' },
    { id: 2, name: 'Product B', category: 'Clothing', price: '$89' },
    // ... more items
  ];

  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = allItems.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="pagination-container">
      {/* Items per page selector */}
      <div className="pagination-controls">
        <div className="items-per-page">
          <label className="items-label">Items per page:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="items-select"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>
        </div>
        <span className="items-info">
          Showing {startIndex + 1}-{Math.min(endIndex, allItems.length)} of {allItems.length}
        </span>
      </div>

      {/* Data display */}
      <div className="items-list">
        {currentItems.map((item) => (
          <div key={item.id} className="item-card">
            <h3 className="item-name">{item.name}</h3>
            <p className="item-category">{item.category}</p>
            <p className="item-price">{item.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="pagination-navigation">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="nav-button"
        >
          Previous
        </button>

        <div className="page-numbers">
          {getVisiblePages().map((page, index) => (
            <div key={index}>
              {page === '...' ? (
                <span className="page-ellipsis">...</span>
              ) : (
                <button
                  onClick={() => goToPage(page as number)}
                  className={\`page-button \${currentPage === page ? 'page-active' : ''}\`}
                >
                  {page}
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="nav-button"
        >
          Next
        </button>
      </div>

      <div className="page-info">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Pagination Container */
.pagination-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Pagination Controls */
.pagination-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.items-per-page {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.items-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.items-select {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.items-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.items-info {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Items List */
.items-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.item-card {
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: #f9fafb;
  transition: all 0.2s ease;
}

.item-card:hover {
  border-color: #d1d5db;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.item-name {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.item-category {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.item-price {
  font-size: 1rem;
  font-weight: 600;
  color: #059669;
}

/* Pagination Navigation */
.pagination-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.nav-button {
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

.nav-button:hover:not(:disabled) {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Page Numbers */
.page-numbers {
  display: flex;
  gap: 0.25rem;
  align-items: center;
}

.page-button {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 2.5rem;
  text-align: center;
}

.page-button:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.page-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.page-active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.page-active:hover {
  background: #2563eb;
  border-color: #2563eb;
}

.page-ellipsis {
  padding: 0.5rem 0.75rem;
  color: #6b7280;
  font-size: 0.875rem;
  min-width: 2.5rem;
  text-align: center;
}

/* Page Info */
.page-info {
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

/* Responsive Design */
@media (max-width: 640px) {
  .pagination-container {
    padding: 1rem;
  }
  
  .pagination-controls {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .pagination-navigation {
    flex-direction: column;
    gap: 1rem;
  }
  
  .page-numbers {
    order: 1;
  }
  
  .nav-button {
    order: 2;
  }
  
  .items-list {
    grid-template-columns: 1fr;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .pagination-container {
    background: #1f2937;
    color: #f9fafb;
  }
  
  .items-select {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
  
  .item-card {
    background: #374151;
    border-color: #4b5563;
  }
  
  .item-name {
    color: #f9fafb;
  }
  
  .nav-button,
  .page-button {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
  
  .nav-button:hover:not(:disabled),
  .page-button:hover {
    background: #4b5563;
  }
  
  .page-active {
    background: #3b82f6;
    border-color: #3b82f6;
  }
  
  .page-active:hover {
    background: #2563eb;
  }
}

/* Animation */
.pagination-container {
  animation: fadeInUp 0.3s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Focus Management */
.pagination-container:focus-within {
  outline: none;
}

/* Accessibility */
.page-button[aria-current="true"] {
  background: #3b82f6;
  color: white;
}

.nav-button:focus-visible,
.page-button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Smart Page Numbers</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Show ellipsis for large page ranges</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Items Per Page</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Configurable page size with automatic reset</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Navigation Controls</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">First, previous, next, and last page buttons</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Status Information</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Show current page and total items count</p>
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
            <p className="text-sm text-gray-600 dark:text-gray-400">Navigate through large datasets and records</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">E-commerce</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Browse product catalogs and search results</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📰</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Content Lists</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Display articles, posts, and content feeds</p>
          </div>
        </div>
      </div>
    </div>
  );
}
