'use client';

import { useState } from 'react';
import { DynamicCodeExample } from '../../../components/shared/CodeGenerator';
import Link from 'next/link';

export default function NavbarPattern() {
  
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '#', current: true },
    { name: 'Products', href: '#', current: false },
    { name: 'Services', href: '#', current: false },
    { name: 'About', href: '#', current: false },
    { name: 'Contact', href: '#', current: false },
  ];

  const notifications = [
    { id: 1, title: 'New order received', time: '2 minutes ago', unread: true },
    { id: 2, title: 'Payment processed', time: '1 hour ago', unread: true },
    { id: 3, title: 'Shipment delivered', time: '3 hours ago', unread: false },
  ];

  const searchSuggestions = [
    { id: 1, title: 'Dashboard Analytics', type: 'page', icon: '📊' },
    { id: 2, title: 'User Management', type: 'page', icon: '👥' },
    { id: 3, title: 'Product Settings', type: 'setting', icon: '⚙️' },
    { id: 4, title: 'Order Reports', type: 'report', icon: '📋' },
    { id: 5, title: 'Email Templates', type: 'template', icon: '✉️' },
  ];

  const filteredSuggestions = searchSuggestions.filter(suggestion =>
    suggestion.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🧭 Navigation Bar Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Create responsive top navigation bars with branding, menu items, and user actions for consistent site-wide navigation.
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
              A complete navigation bar with logo, menu items, search, notifications, and user profile dropdown.
            </p>
            
            {/* Navigation Bar */}
            <nav className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                  {/* Logo */}
                  <div className="flex items-center">
                    <div className="flex-shrink-0 flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">L</span>
                      </div>
                      <span className="text-xl font-bold text-gray-900 dark:text-gray-100">Logo</span>
                    </div>
                  </div>

                  {/* Navigation Links - Desktop */}
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigationItems.map((item) => (
                        <button
                          key={item.name}
                          className={`px-3 py-3 rounded-md text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                            item.current
                              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Side Items */}
                  <div className="flex items-center space-x-4">
                    {/* Enhanced Search with Dropdown */}
                    <div className="hidden lg:block">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search pages, settings, reports..."
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                          onFocus={() => setIsSearchFocused(true)}
                          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                          className="w-64 px-4 py-3 pl-10 pr-4 text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          style={{ fontSize: '16px' }}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        
                        {/* Search Dropdown */}
                        {isSearchFocused && (searchValue || true) && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                            {searchValue ? (
                              filteredSuggestions.length > 0 ? (
                                <div className="py-1">
                                  {filteredSuggestions.map((suggestion) => (
                                    <button
                                      key={suggestion.id}
                                      onClick={() => {
                                        setSearchValue(suggestion.title);
                                        setIsSearchFocused(false);
                                        console.log(`Navigating to: ${suggestion.title}`);
                                      }}
                                      className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors min-h-[44px]"
                                    >
                                      <span className="text-lg">{suggestion.icon}</span>
                                      <div className="flex-1 text-left">
                                        <div className="font-medium">{suggestion.title}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{suggestion.type}</div>
                                      </div>
                                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                    </button>
                                  ))}
                                </div>
                              ) : (
                                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                  No results found for "{searchValue}"
                                </div>
                              )
                            ) : (
                              <div className="py-1">
                                <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  Recent Searches
                                </div>
                                {searchSuggestions.slice(0, 3).map((suggestion) => (
                                  <button
                                    key={suggestion.id}
                                    onClick={() => {
                                      setSearchValue(suggestion.title);
                                      setIsSearchFocused(false);
                                      console.log(`Navigating to: ${suggestion.title}`);
                                    }}
                                    className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors min-h-[44px]"
                                  >
                                    <span className="text-lg">{suggestion.icon}</span>
                                    <div className="flex-1 text-left">
                                      <div className="font-medium">{suggestion.title}</div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{suggestion.type}</div>
                                    </div>
                                  </button>
                                ))}
                                <div className="border-t border-gray-200 dark:border-gray-700 mt-1 pt-1">
                                  <div className="px-4 py-2 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer">
                                    View all search options
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Notifications */}
                    <div className="relative">
                      <button
                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                        className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM15 17H9a6 6 0 01-6-6V9a6 6 0 016-6h6a6 6 0 016 6v2" />
                        </svg>
                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-gray-800"></span>
                      </button>

                      {/* Notifications Dropdown */}
                      {isNotificationsOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                          </div>
                          <div className="max-h-64 overflow-y-auto">
                            {notifications.map((notification) => (
                              <div key={notification.id} className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <div className="flex items-start">
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{notification.title}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                                  </div>
                                  {notification.unread && (
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="p-4 bg-gray-50 dark:bg-gray-700">
                            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                              View all notifications
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Profile Menu */}
                    <div className="relative">
                      <button
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">JD</span>
                        </div>
                        <svg className="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Profile Dropdown */}
                      {isProfileMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">John Doe</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">john@example.com</p>
                          </div>
                          <div className="py-2">
                            <button className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 min-h-[44px]">
                              Profile
                            </button>
                            <button className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 min-h-[44px]">
                              Settings
                            </button>
                            <button className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 min-h-[44px]">
                              Help
                            </button>
                            <hr className="my-2 border-gray-200 dark:border-gray-700" />
                            <button className="block w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 min-h-[44px]">
                              Sign out
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Mobile menu button */}
                    <button 
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Menu */}
              {isMobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigationItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors min-h-[44px] ${
                          item.current
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                  
                  {/* Mobile Search */}
                  <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontSize: '16px' }}
                    />
                  </div>

                  {/* Mobile Profile Section */}
                  <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">JD</span>
                      </div>
                      <div>
                        <div className="text-base font-medium text-gray-900 dark:text-gray-100">John Doe</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">john@example.com</div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <button className="block w-full text-left px-3 py-3 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg min-h-[44px]">
                        Profile Settings
                      </button>
                      <button className="block w-full text-left px-3 py-3 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg min-h-[44px]">
                        Billing
                      </button>
                      <button className="block w-full text-left px-3 py-3 text-base text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg min-h-[44px]">
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </nav>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Interactive Features</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• Click notification bell to see dropdown</div>
                <div>• Click profile avatar to access user menu</div>
                <div>• Search input with keyboard navigation</div>
                <div>• Responsive design with mobile menu button</div>
                <div>• Active state indicators for current page</div>
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

            {/* Tab Content */}
            <div className="code-block">
              {
                <DynamicCodeExample 
                componentName="navbar" 
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Responsive Design</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Adapts to all screen sizes with mobile menu</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Brand Identity</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Logo placement and consistent branding</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Search Integration</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Built-in search with keyboard shortcuts</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">User Actions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Notifications, profile menu, and settings</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Active States</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Visual indicators for current page</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Dropdown Menus</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Contextual menus with smooth animations</p>
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
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Websites</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Main navigation for corporate and personal sites</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">💼</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Web Applications</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">SaaS platforms and admin dashboards</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">E-commerce</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Shopping sites with categories and user account</p>
          </div>
        </div>
      </div>
    </div>
  );
}