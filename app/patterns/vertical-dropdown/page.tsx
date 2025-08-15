'use client';

import { useState } from 'react';

export default function VerticalDropdownPattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

  const toggleDropdown = (id: string) => {
    const newOpenDropdowns = new Set(openDropdowns);
    if (newOpenDropdowns.has(id)) {
      newOpenDropdowns.delete(id);
    } else {
      newOpenDropdowns.add(id);
    }
    setOpenDropdowns(newOpenDropdowns);
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      items: [
        { id: 'overview', label: 'Overview', icon: '👁️' },
        { id: 'analytics', label: 'Analytics', icon: '📈' },
        { id: 'reports', label: 'Reports', icon: '📋' },
      ]
    },
    {
      id: 'products',
      label: 'Products',
      icon: '📦',
      items: [
        { id: 'catalog', label: 'Product Catalog', icon: '📚' },
        { id: 'categories', label: 'Categories', icon: '🏷️' },
        { id: 'inventory', label: 'Inventory', icon: '📦' },
        { id: 'pricing', label: 'Pricing', icon: '💰' },
      ]
    },
    {
      id: 'users',
      label: 'Users',
      icon: '👥',
      items: [
        { id: 'customers', label: 'Customers', icon: '👤' },
        { id: 'admins', label: 'Administrators', icon: '👨‍💼' },
        { id: 'permissions', label: 'Permissions', icon: '🔐' },
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      items: [
        { id: 'general', label: 'General', icon: '🔧' },
        { id: 'security', label: 'Security', icon: '🔒' },
        { id: 'integrations', label: 'Integrations', icon: '🔌' },
        { id: 'billing', label: 'Billing', icon: '💳' },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📋 Vertical Dropdown Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Organize navigation items in a vertical layout with expandable sections, perfect for sidebars and navigation panels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Click on the sections to expand and collapse the vertical dropdown menus. Notice the smooth animations and nested structure.
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="w-64 bg-gray-50 dark:bg-gray-900">
                {menuItems.map((section) => (
                  <div key={section.id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    {/* Section Header */}
                    <button
                      onClick={() => toggleDropdown(section.id)}
                      className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{section.icon}</span>
                        <span className="font-medium">{section.label}</span>
                      </div>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openDropdowns.has(section.id) ? 'rotate-180' : ''
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {/* Dropdown Items */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openDropdowns.has(section.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="bg-gray-25 dark:bg-gray-850">
                        {section.items.map((item) => (
                          <button
                            key={item.id}
                            className="flex items-center space-x-3 w-full px-6 py-2 text-left text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                          >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternative Style - Accordion */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                Accordion Style Vertical Menu
              </h3>
              <div className="w-64">
                {menuItems.slice(0, 2).map((section) => (
                  <div key={`accordion-${section.id}`} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <button
                      onClick={() => toggleDropdown(`accordion-${section.id}`)}
                      className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors ${
                        openDropdowns.has(`accordion-${section.id}`)
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{section.icon}</span>
                        <span className="font-medium">{section.label}</span>
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        openDropdowns.has(`accordion-${section.id}`)
                          ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      }`}>
                        <svg
                          className={`w-3 h-3 transition-transform duration-200 ${
                            openDropdowns.has(`accordion-${section.id}`) ? 'rotate-180' : ''
                          }`}
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
                    </button>

                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        openDropdowns.has(`accordion-${section.id}`) ? 'max-h-96' : 'max-h-0'
                      } overflow-hidden`}
                    >
                      <div className="py-2">
                        {section.items.map((item) => (
                          <button
                            key={`accordion-${item.id}`}
                            className="flex items-center space-x-3 w-full px-8 py-2 text-left text-sm text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                          >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
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

            <div className="code-block">
              {activeTab === 'jsx' ? (
                <pre className="text-sm leading-relaxed">
{`import { useState } from 'react';

export default function VerticalDropdown() {
  const [openSections, setOpenSections] = useState(new Set());

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      items: [
        { id: 'overview', label: 'Overview', icon: '👁️' },
        { id: 'analytics', label: 'Analytics', icon: '📈' },
        { id: 'reports', label: 'Reports', icon: '📋' },
      ]
    },
    {
      id: 'products',
      label: 'Products',
      icon: '📦',
      items: [
        { id: 'catalog', label: 'Product Catalog', icon: '📚' },
        { id: 'categories', label: 'Categories', icon: '🏷️' },
        { id: 'inventory', label: 'Inventory', icon: '📦' },
      ]
    }
  ];

  const toggleSection = (sectionId) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(sectionId)) {
      newOpenSections.delete(sectionId);
    } else {
      newOpenSections.add(sectionId);
    }
    setOpenSections(newOpenSections);
  };

  return (
    <nav className="vertical-dropdown">
      {menuItems.map((section) => (
        <div key={section.id} className="dropdown-section">
          {/* Section Header */}
          <button
            onClick={() => toggleSection(section.id)}
            className="section-header"
          >
            <div className="section-info">
              <span className="section-icon">{section.icon}</span>
              <span className="section-label">{section.label}</span>
            </div>
            <svg
              className={\`chevron \${openSections.has(section.id) ? 'chevron-open' : ''}\`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </button>

          {/* Dropdown Items */}
          <div className={\`dropdown-items \${openSections.has(section.id) ? 'open' : ''}\`}>
            <div className="items-container">
              {section.items.map((item) => (
                <button key={item.id} className="dropdown-item">
                  <span className="item-icon">{item.icon}</span>
                  <span className="item-label">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </nav>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Vertical Dropdown */
.vertical-dropdown {
  width: 16rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

/* Dropdown Section */
.dropdown-section {
  border-bottom: 1px solid #e5e7eb;
}

.dropdown-section:last-child {
  border-bottom: none;
}

/* Section Header */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem 1rem;
  background: #f9fafb;
  color: #374151;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.section-header:hover {
  background-color: #f3f4f6;
}

.section-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-icon {
  font-size: 1.125rem;
}

.section-label {
  font-weight: 500;
}

/* Chevron */
.chevron {
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s ease;
}

.chevron-open {
  transform: rotate(180deg);
}

/* Dropdown Items */
.dropdown-items {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.dropdown-items.open {
  max-height: 24rem;
  opacity: 1;
}

.items-container {
  background: #fafafa;
}

/* Individual Items */
.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.5rem 1.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.item-icon {
  font-size: 1rem;
}

.item-label {
  font-weight: 400;
}

/* Active State */
.dropdown-item.active {
  background-color: #eff6ff;
  color: #1d4ed8;
  font-weight: 500;
}

/* Accordion Style */
.accordion-style .section-header {
  background: white;
  padding: 1rem;
}

.accordion-style .section-header.active {
  background-color: #eff6ff;
  color: #1d4ed8;
}

.accordion-style .dropdown-items {
  background: white;
}

.accordion-style .dropdown-item {
  padding: 0.5rem 2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .vertical-dropdown {
    width: 100%;
  }
  
  .section-header {
    padding: 1rem;
  }
  
  .dropdown-item {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .vertical-dropdown {
    background: #1f2937;
    border-color: #374151;
  }
  
  .dropdown-section {
    border-bottom-color: #374151;
  }
  
  .section-header {
    background: #111827;
    color: #f9fafb;
  }
  
  .section-header:hover {
    background-color: #374151;
  }
  
  .items-container {
    background: #1f2937;
  }
  
  .dropdown-item {
    color: #9ca3af;
  }
  
  .dropdown-item:hover {
    background-color: #374151;
    color: #f9fafb;
  }
  
  .dropdown-item.active {
    background-color: #1e3a8a;
    color: #93c5fd;
  }
}

/* Focus States */
.section-header:focus,
.dropdown-item:focus {
  outline: none;
  box-shadow: inset 0 0 0 2px #3b82f6;
}

/* Animation Enhancements */
.dropdown-items {
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.2s ease-in-out;
}

.dropdown-item {
  transform: translateX(0);
  transition: all 0.2s ease,
              transform 0.15s ease;
}

.dropdown-item:hover {
  transform: translateX(4px);
}

/* Nested Dropdowns */
.nested-dropdown {
  position: relative;
}

.nested-items {
  position: absolute;
  left: 100%;
  top: 0;
  width: 12rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 50;
}

/* Loading State */
.dropdown-item.loading {
  pointer-events: none;
  opacity: 0.6;
}

.dropdown-item.loading::after {
  content: '';
  display: inline-block;
  width: 0.75rem;
  height: 0.75rem;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-left: auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Expandable Sections</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Smooth expand/collapse animations for organized content</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Hierarchy</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear distinction between sections and items</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Multiple Styles</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Standard and accordion-style implementations</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Icon Support</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Icons for both sections and individual items</p>
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
            <div className="text-2xl mb-2">🏢</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Admin Sidebars</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Organize admin functions in expandable categories</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📱</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Mobile Navigation</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Space-efficient navigation for mobile apps</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📚</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Documentation Sites</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Organize content hierarchy in sidebars</p>
          </div>
        </div>
      </div>
    </div>
  );
}