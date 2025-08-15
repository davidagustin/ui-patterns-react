'use client';

import { useState, useRef, useEffect } from 'react';

export default function HorizontalDropdownPattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    {
      id: 'products',
      label: 'Products',
      items: [
        { id: 'web-app', label: 'Web Application', description: 'Build modern web apps', icon: '🌐' },
        { id: 'mobile-app', label: 'Mobile App', description: 'iOS and Android apps', icon: '📱' },
        { id: 'desktop-app', label: 'Desktop App', description: 'Cross-platform desktop', icon: '💻' },
        { id: 'api', label: 'API Services', description: 'RESTful and GraphQL APIs', icon: '🔌' },
      ]
    },
    {
      id: 'solutions',
      label: 'Solutions',
      items: [
        { id: 'ecommerce', label: 'E-commerce', description: 'Online store solutions', icon: '🛒' },
        { id: 'cms', label: 'Content Management', description: 'Manage your content', icon: '📝' },
        { id: 'analytics', label: 'Analytics', description: 'Data insights and reports', icon: '📊' },
        { id: 'automation', label: 'Automation', description: 'Workflow automation', icon: '⚡' },
      ]
    },
    {
      id: 'resources',
      label: 'Resources',
      items: [
        { id: 'docs', label: 'Documentation', description: 'Comprehensive guides', icon: '📚' },
        { id: 'tutorials', label: 'Tutorials', description: 'Step-by-step tutorials', icon: '🎓' },
        { id: 'blog', label: 'Blog', description: 'Latest news and updates', icon: '📰' },
        { id: 'community', label: 'Community', description: 'Join our community', icon: '👥' },
      ]
    }
  ];

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ↔️ Horizontal Dropdown Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Organize navigation items in a horizontal layout with dropdown menus, perfect for main navigation bars and mega menus.
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
              Hover over or click the navigation items to see horizontal dropdown menus. Each menu shows organized content with icons and descriptions.
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-visible" ref={dropdownRef}>
              {/* Main Navigation Bar */}
              <div className="flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 relative">
                {/* Header Row */}
                <div className="flex items-center justify-between w-full lg:w-auto">
                  {/* Logo */}
                  <div className="flex items-center px-4 lg:px-6 py-4">
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">🚀 TechCorp</span>
                  </div>

                  {/* Actions - Mobile */}
                  <div className="flex items-center space-x-4 px-4 lg:hidden">
                    <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                      Login
                    </button>
                    <button className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                      Get Started
                    </button>
                  </div>
                </div>

                {/* Navigation Items */}
                <div className="flex flex-col lg:flex-row lg:flex-1">
                  {menuItems.map((item) => (
                    <div key={item.id} className="relative">
                      <button
                        onClick={() => toggleDropdown(item.id)}
                        onMouseEnter={() => setActiveDropdown(item.id)}
                        className={`flex items-center justify-between lg:justify-start space-x-1 px-4 lg:px-6 py-4 text-sm font-medium transition-all duration-200 w-full lg:w-auto ${
                          activeDropdown === item.id
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <span>{item.label}</span>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === item.id ? 'rotate-180' : ''
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

                      {/* Dropdown Menu */}
                      {activeDropdown === item.id && (
                        <div className="absolute lg:static top-full left-0 mt-1 lg:mt-0 w-80 max-w-[calc(100vw-2rem)] lg:w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg lg:rounded-none lg:border-l-0 lg:border-r-0 lg:border-t-0 shadow-lg lg:shadow-none z-50 overflow-hidden">
                          <div className="p-4">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                              {item.label}
                            </h3>
                            <div className="grid grid-cols-1 gap-2">
                              {item.items.map((subItem) => (
                                <button
                                  key={subItem.id}
                                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left group"
                                >
                                  <span className="text-xl flex-shrink-0">{subItem.icon}</span>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 dark:text-gray-100 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                      {subItem.label}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                      {subItem.description}
                                    </div>
                                  </div>
                                  <svg className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-900">
                            <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                              View all {item.label.toLowerCase()} →
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Actions - Desktop */}
                <div className="hidden lg:flex items-center space-x-4 px-6">
                  <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                    Login
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Get Started
                  </button>
                </div>
              </div>

              {/* Mega Menu Example */}
              <div className="p-4 md:p-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Mega Menu Style</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 md:p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {menuItems.map((section) => (
                      <div key={`mega-${section.id}`}>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm">
                          {section.label}
                        </h4>
                        <ul className="space-y-2">
                          {section.items.map((item) => (
                            <li key={`mega-${item.id}`}>
                              <button className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-full text-left">
                                <span className="text-base">{item.icon}</span>
                                <span className="truncate">{item.label}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
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
{`import { useState, useRef, useEffect } from 'react';

export default function HorizontalDropdown() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const menuItems = [
    {
      id: 'products',
      label: 'Products',
      items: [
        { id: 'web-app', label: 'Web Application', description: 'Build modern web apps', icon: '🌐' },
        { id: 'mobile-app', label: 'Mobile App', description: 'iOS and Android apps', icon: '📱' },
        { id: 'desktop-app', label: 'Desktop App', description: 'Cross-platform desktop', icon: '💻' },
      ]
    },
    {
      id: 'solutions',
      label: 'Solutions',
      items: [
        { id: 'ecommerce', label: 'E-commerce', description: 'Online store solutions', icon: '🛒' },
        { id: 'cms', label: 'Content Management', description: 'Manage your content', icon: '📝' },
        { id: 'analytics', label: 'Analytics', description: 'Data insights', icon: '📊' },
      ]
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <nav className="horizontal-dropdown" ref={dropdownRef}>
      <div className="nav-bar">
        {/* Logo */}
        <div className="nav-logo">
          <span className="logo-text">🚀 TechCorp</span>
        </div>

        {/* Navigation Items */}
        <div className="nav-items">
          {menuItems.map((item) => (
            <div key={item.id} className="nav-item">
              <button
                onClick={() => toggleDropdown(item.id)}
                onMouseEnter={() => setActiveDropdown(item.id)}
                className={\`nav-trigger \${activeDropdown === item.id ? 'active' : ''}\`}
              >
                <span>{item.label}</span>
                <svg className={\`chevron \${activeDropdown === item.id ? 'open' : ''}\`}>
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </button>

              {/* Dropdown */}
              {activeDropdown === item.id && (
                <div className="dropdown-menu">
                  <div className="dropdown-content">
                    <h3 className="dropdown-title">{item.label}</h3>
                    <div className="dropdown-items">
                      {item.items.map((subItem) => (
                        <button key={subItem.id} className="dropdown-item">
                          <span className="item-icon">{subItem.icon}</span>
                          <div className="item-content">
                            <div className="item-label">{subItem.label}</div>
                            <div className="item-description">{subItem.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="dropdown-footer">
                    <button className="view-all-btn">
                      View all {item.label.toLowerCase()} →
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="nav-actions">
          <button className="login-btn">Login</button>
          <button className="cta-btn">Get Started</button>
        </div>
      </div>
    </nav>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Horizontal Dropdown */
.horizontal-dropdown {
  position: relative;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: visible;
}

/* Navigation Bar */
.nav-bar {
  display: flex;
  align-items: center;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  position: relative;
}

/* Logo */
.nav-logo {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: bold;
  color: #3b82f6;
}

/* Navigation Items */
.nav-items {
  display: flex;
  flex: 1;
}

.nav-item {
  position: relative;
}

.nav-trigger {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-trigger:hover {
  background-color: #f3f4f6;
}

.nav-trigger.active {
  background-color: #eff6ff;
  color: #1d4ed8;
}

.chevron {
  width: 1rem;
  height: 1rem;
  fill: currentColor;
  transition: transform 0.2s ease;
}

.chevron.open {
  transform: rotate(180deg);
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.25rem;
  width: 20rem;
  max-width: calc(100vw - 2rem);
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 50;
  overflow: hidden;
  animation: dropdownSlide 0.2s ease-out;
}

/* Auto-position dropdowns to stay in viewport */
.dropdown-menu.right-align {
  left: auto;
  right: 0;
}

@keyframes dropdownSlide {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-content {
  padding: 1rem;
}

.dropdown-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.75rem;
}

.dropdown-items {
  display: grid;
  gap: 0.5rem;
}

.dropdown-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: none;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: left;
}

.dropdown-item:hover {
  background-color: #f9fafb;
}

.item-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-label {
  font-weight: 500;
  color: #111827;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.item-description {
  font-size: 0.75rem;
  color: #6b7280;
}

/* Dropdown Footer */
.dropdown-footer {
  padding: 0.75rem;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
}

.view-all-btn {
  font-size: 0.75rem;
  color: #3b82f6;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.2s ease;
}

.view-all-btn:hover {
  color: #1d4ed8;
}

/* Navigation Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 1.5rem;
}

.login-btn {
  font-size: 0.875rem;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.login-btn:hover {
  color: #111827;
}

.cta-btn {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.cta-btn:hover {
  background-color: #2563eb;
}

/* Mega Menu Style */
.mega-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.25rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 50;
  padding: 2rem;
}

.mega-menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .mega-menu-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }
}

.mega-section {
  padding: 0;
}

.mega-section-title {
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
}

.mega-section-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mega-section-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s ease;
}

.mega-section-item:hover {
  color: #3b82f6;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .nav-bar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .nav-items {
    flex-direction: column;
  }
  
  .nav-trigger {
    justify-content: space-between;
    width: 100%;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .dropdown-menu {
    position: static;
    width: 100%;
    max-width: none;
    margin-top: 0;
    border-radius: 0;
    border-left: none;
    border-right: none;
    border-top: none;
    box-shadow: none;
  }
  
  .nav-actions {
    display: none;
  }
  
  .nav-logo {
    padding: 1rem 1.5rem;
  }
}

@media (max-width: 640px) {
  .mega-menu-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .nav-trigger {
    padding: 0.875rem 1rem;
  }
  
  .dropdown-menu {
    border-bottom: 1px solid #e5e7eb;
  }
  
  .dropdown-content {
    padding: 0.75rem;
  }
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .horizontal-dropdown {
    background: #1f2937;
    border-color: #374151;
  }
  
  .nav-bar {
    background-color: #111827;
    border-bottom-color: #374151;
  }
  
  .logo-text {
    color: #60a5fa;
  }
  
  .nav-trigger {
    color: #f9fafb;
  }
  
  .nav-trigger:hover {
    background-color: #374151;
  }
  
  .nav-trigger.active {
    background-color: #1e3a8a;
    color: #93c5fd;
  }
  
  .dropdown-menu {
    background: #1f2937;
    border-color: #374151;
  }
  
  .dropdown-title,
  .item-label {
    color: #f9fafb;
  }
  
  .item-description {
    color: #9ca3af;
  }
  
  .dropdown-item:hover {
    background-color: #374151;
  }
  
  .dropdown-footer {
    background-color: #111827;
    border-top-color: #374151;
  }
  
  .view-all-btn {
    color: #60a5fa;
  }
  
  .view-all-btn:hover {
    color: #93c5fd;
  }
  
  .login-btn {
    color: #9ca3af;
  }
  
  .login-btn:hover {
    color: #f9fafb;
  }
}

/* Focus States */
.nav-trigger:focus,
.dropdown-item:focus,
.login-btn:focus,
.cta-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

/* Accessibility */
.nav-trigger[aria-expanded="true"] {
  background-color: #eff6ff;
  color: #1d4ed8;
}

/* Loading State */
.nav-item.loading .nav-trigger {
  pointer-events: none;
  opacity: 0.6;
}

.nav-item.loading .chevron::after {
  content: '';
  position: absolute;
  width: 0.75rem;
  height: 0.75rem;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Horizontal Layout</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Efficient use of horizontal space in navigation bars</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Rich Content</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Icons, descriptions, and organized menu items</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Hover & Click Support</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Both hover and click interactions supported</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Mega Menu Option</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Support for large, multi-column menus</p>
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
            <div className="text-2xl mb-2">🌐</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Website Headers</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Main navigation for websites and web apps</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">E-commerce</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Product category navigation and mega menus</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🏢</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Corporate Sites</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Service and solution category navigation</p>
          </div>
        </div>
      </div>
    </div>
  );
}