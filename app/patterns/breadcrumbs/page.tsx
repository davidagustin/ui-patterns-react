'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BreadcrumbsPattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  const breadcrumbs = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Products', href: '/products', icon: '📦' },
    { name: 'Electronics', href: '/products/electronics', icon: '💻' },
    { name: 'Laptops', href: '/products/electronics/laptops', icon: '💻' },
    { name: 'MacBook Pro', href: '/products/electronics/laptops/macbook-pro', icon: '🍎', current: true }
  ];

  const handleBreadcrumbClick = (href: string, isCurrent: boolean) => {
    if (!isCurrent) {
      // In a real app, this would navigate to the page
      console.log(`Navigating to: ${href}`);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🍞 Breadcrumbs Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Provide clear navigation context and help users understand their location within a website hierarchy.
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
              Click on any breadcrumb to simulate navigation. The current page is highlighted and non-clickable.
            </p>
            
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                {breadcrumbs.map((breadcrumb, index) => (
                  <li key={breadcrumb.href} className="flex items-center">
                    {index > 0 && (
                      <svg
                        className="w-4 h-4 text-gray-400 dark:text-gray-500 mx-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    
                    {breadcrumb.current ? (
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                        <span className="mr-1">{breadcrumb.icon}</span>
                        {breadcrumb.name}
                      </span>
                    ) : (
                      <button
                        onClick={() => handleBreadcrumbClick(breadcrumb.href, false)}
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center"
                      >
                        <span className="mr-1">{breadcrumb.icon}</span>
                        {breadcrumb.name}
                      </button>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Current Page</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You are currently viewing: <strong>MacBook Pro</strong> in the Electronics &gt; Laptops category.
              </p>
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

export default function BreadcrumbsPattern() {
  const breadcrumbs = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Products', href: '/products', icon: '📦' },
    { name: 'Electronics', href: '/products/electronics', icon: '💻' },
    { name: 'Laptops', href: '/products/electronics/laptops', icon: '💻' },
    { name: 'MacBook Pro', href: '/products/electronics/laptops/macbook-pro', icon: '🍎', current: true }
  ];

  const handleBreadcrumbClick = (href: string, isCurrent: boolean) => {
    if (!isCurrent) {
      // In a real app, this would navigate to the page
      console.log(\`Navigating to: \${href}\`);
    }
  };

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            {index > 0 && (
              <svg
                className="w-4 h-4 text-gray-400 dark:text-gray-500 mx-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            
            {breadcrumb.current ? (
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                <span className="mr-1">{breadcrumb.icon}</span>
                {breadcrumb.name}
              </span>
            ) : (
              <button
                onClick={() => handleBreadcrumbClick(breadcrumb.href, false)}
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center"
              >
                <span className="mr-1">{breadcrumb.icon}</span>
                {breadcrumb.name}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Breadcrumbs Container */
.breadcrumbs-container {
  display: flex;
  align-items: center;
  padding: 1rem 0;
}

/* Breadcrumbs List */
.breadcrumbs-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
}

/* Breadcrumb Item */
.breadcrumb-item {
  display: flex;
  align-items: center;
}

/* Separator Icon */
.breadcrumb-separator {
  width: 1rem;
  height: 1rem;
  color: #9ca3af;
  margin: 0 0.5rem;
  flex-shrink: 0;
}

/* Breadcrumb Link */
.breadcrumb-link {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: #3b82f6;
  text-decoration: none;
  transition: all 0.2s ease;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.breadcrumb-link:hover {
  color: #1d4ed8;
  background-color: #eff6ff;
  text-decoration: none;
}

.breadcrumb-link:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Breadcrumb Icon */
.breadcrumb-icon {
  margin-right: 0.25rem;
  font-size: 1rem;
}

/* Current Breadcrumb */
.breadcrumb-current {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background-color: #f9fafb;
}

/* Truncated Breadcrumbs */
.breadcrumbs-truncated {
  position: relative;
}

.breadcrumbs-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 50;
  min-width: 200px;
  padding: 0.5rem 0;
}

.breadcrumb-dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #374151;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.breadcrumb-dropdown-item:hover {
  background-color: #f3f4f6;
  text-decoration: none;
}

/* Responsive Design */
@media (max-width: 640px) {
  .breadcrumbs-list {
    flex-wrap: wrap;
    gap: 0.25rem;
  }
  
  .breadcrumb-separator {
    margin: 0 0.25rem;
  }
  
  .breadcrumb-link,
  .breadcrumb-current {
    font-size: 0.75rem;
    padding: 0.125rem 0.375rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .breadcrumb-separator {
    color: #6b7280;
  }
  
  .breadcrumb-link {
    color: #60a5fa;
  }
  
  .breadcrumb-link:hover {
    color: #93c5fd;
    background-color: #1e3a8a;
  }
  
  .breadcrumb-current {
    color: #9ca3af;
    background-color: #374151;
  }
  
  .breadcrumbs-dropdown {
    background-color: #1f2937;
    border-color: #374151;
  }
  
  .breadcrumb-dropdown-item {
    color: #d1d5db;
  }
  
  .breadcrumb-dropdown-item:hover {
    background-color: #374151;
  }
}

/* Accessibility */
.breadcrumbs-container[aria-label] {
  outline: none;
}

.breadcrumb-link[aria-current="page"] {
  color: #6b7280;
  pointer-events: none;
}

/* Focus States */
.breadcrumb-link:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Animation */
.breadcrumb-link {
  transition: all 0.2s ease-in-out;
}

.breadcrumb-link:hover {
  transform: translateY(-1px);
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .breadcrumb-link {
    border: 1px solid transparent;
  }
  
  .breadcrumb-link:hover {
    border-color: #3b82f6;
  }
  
  .breadcrumb-current {
    border: 1px solid #6b7280;
  }
}

/* Print Styles */
@media print {
  .breadcrumbs-container {
    display: none;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .breadcrumb-link {
    transition: none;
  }
  
  .breadcrumb-link:hover {
    transform: none;
  }
}

/* Custom Separators */
.breadcrumb-separator-custom {
  width: 0.5rem;
  height: 0.5rem;
  background-color: #9ca3af;
  border-radius: 50%;
  margin: 0 0.75rem;
}

.breadcrumb-separator-slash {
  color: #9ca3af;
  margin: 0 0.5rem;
  font-weight: 300;
}

/* Breadcrumb with Badges */
.breadcrumb-badge {
  display: inline-flex;
  align-items: center;
  background-color: #f3f4f6;
  color: #374151;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-left: 0.5rem;
}

/* Collapsible Breadcrumbs */
.breadcrumbs-collapsible {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.breadcrumb-toggle {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.breadcrumb-toggle:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.breadcrumb-toggle:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Hierarchical Navigation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Shows the complete path to current location</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Separators</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear distinction between navigation levels</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Current Page Indication</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Highlights the active page</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Accessibility Support</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Proper ARIA labels and keyboard navigation</p>
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
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">E-commerce Sites</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Navigate through product categories</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📁</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">File Systems</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Show folder hierarchy and paths</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📚</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Documentation</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Navigate through help and guides</p>
          </div>
        </div>
      </div>
    </div>
  );
}
