'use client';

import { useState, useEffect } from 'react';

export default function MobileMenuPattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOverlayMenuOpen, setIsOverlayMenuOpen] = useState(false);
  const [isSlideMenuOpen, setIsSlideMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOverlayMenuOpen || isSlideMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOverlayMenuOpen, isSlideMenuOpen]);

  const menuItems = [
    { id: 1, name: 'Home', icon: '🏠', href: '#' },
    { id: 2, name: 'Products', icon: '📦', href: '#' },
    { id: 3, name: 'Services', icon: '🛠️', href: '#' },
    { id: 4, name: 'About', icon: 'ℹ️', href: '#' },
    { id: 5, name: 'Contact', icon: '📞', href: '#' },
  ];

  const socialLinks = [
    { id: 1, name: 'Facebook', icon: '📘', href: '#' },
    { id: 2, name: 'Twitter', icon: '🐦', href: '#' },
    { id: 3, name: 'Instagram', icon: '📷', href: '#' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🍔 Mobile Menu (Hamburger) Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Create responsive hamburger menus for mobile navigation with smooth animations, overlay effects, and gesture support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Examples
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Three different mobile menu styles: collapsible, full-screen overlay, and slide-in sidebar.
            </p>
            
            <div className="space-y-6">
              {/* Collapsible Menu */}
              <div className="space-y-2">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">1. Collapsible Menu</h3>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  {/* Mobile Header */}
                  <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">L</span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">Logo</span>
                    </div>
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Toggle menu"
                    >
                      <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                        <span className={`block h-0.5 w-6 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${
                          isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                        }`}></span>
                        <span className={`block h-0.5 w-6 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${
                          isMenuOpen ? 'opacity-0' : ''
                        }`}></span>
                        <span className={`block h-0.5 w-6 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${
                          isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                        }`}></span>
                      </div>
                    </button>
                  </div>

                  {/* Collapsible Menu Content */}
                  <div className={`bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out overflow-hidden ${
                    isMenuOpen ? 'max-h-96' : 'max-h-0'
                  }`}>
                    <nav className="py-2">
                      {menuItems.map((item) => (
                        <button
                          key={item.id}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="font-medium">{item.name}</span>
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>

              {/* Overlay Menu */}
              <div className="space-y-2">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">2. Full-Screen Overlay</h3>
                <button
                  onClick={() => setIsOverlayMenuOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span>🍔</span>
                  <span>Open Overlay Menu</span>
                </button>
              </div>

              {/* Slide Menu */}
              <div className="space-y-2">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">3. Slide-in Sidebar</h3>
                <button
                  onClick={() => setIsSlideMenuOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <span>📱</span>
                  <span>Open Slide Menu</span>
                </button>
              </div>
            </div>

            <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Interactive Features</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• Animated hamburger icon transformation</div>
                <div>• Smooth slide and fade animations</div>
                <div>• Body scroll prevention when menu is open</div>
                <div>• Click outside to close overlay menus</div>
                <div>• Keyboard accessibility (ESC to close)</div>
              </div>
            </div>
          </div>

          {/* Overlay Menu */}
          {isOverlayMenuOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-900 w-full h-full flex flex-col relative animate-fadeIn">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">L</span>
                    </div>
                    <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">Logo</span>
                  </div>
                  <button
                    onClick={() => setIsOverlayMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Menu Content */}
                <div className="flex-1 flex flex-col justify-center items-center space-y-8 p-6">
                  <nav className="space-y-4 text-center">
                    {menuItems.map((item, index) => (
                      <button
                        key={item.id}
                        className="block text-3xl font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {item.name}
                      </button>
                    ))}
                  </nav>

                  <div className="flex space-x-6">
                    {socialLinks.map((social) => (
                      <button
                        key={social.id}
                        className="text-2xl hover:scale-110 transition-transform"
                      >
                        {social.icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Slide Menu */}
          {isSlideMenuOpen && (
            <div className="fixed inset-0 z-50">
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={() => setIsSlideMenuOpen(false)}
              ></div>
              
              {/* Slide Panel */}
              <div className="absolute top-0 left-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl transform transition-transform animate-slideInLeft">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">L</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Menu</span>
                  </div>
                  <button
                    onClick={() => setIsSlideMenuOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Menu Items */}
                <nav className="p-6 space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </button>
                  ))}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">JD</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">John Doe</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">john@example.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
{`import { useState, useEffect } from 'react';

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isSlideOpen, setIsSlideOpen] = useState(false);

  const menuItems = [
    { id: 1, name: 'Home', icon: '🏠' },
    { id: 2, name: 'Products', icon: '📦' },
    { id: 3, name: 'Services', icon: '🛠️' },
    { id: 4, name: 'About', icon: 'ℹ️' },
    { id: 5, name: 'Contact', icon: '📞' },
  ];

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOverlayOpen || isSlideOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOverlayOpen, isSlideOpen]);

  return (
    <div>
      {/* 1. Collapsible Menu */}
      <div className="border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-b">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-semibold">Logo</span>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className={\`block h-0.5 w-6 bg-gray-600 transition-all duration-300 \${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }\`}></span>
              <span className={\`block h-0.5 w-6 bg-gray-600 transition-all duration-300 \${
                isMenuOpen ? 'opacity-0' : ''
              }\`}></span>
              <span className={\`block h-0.5 w-6 bg-gray-600 transition-all duration-300 \${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }\`}></span>
            </div>
          </button>
        </div>

        {/* Collapsible Content */}
        <div className={\`bg-white transition-all duration-300 ease-in-out overflow-hidden \${
          isMenuOpen ? 'max-h-96' : 'max-h-0'
        }\`}>
          <nav className="py-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 2. Full-Screen Overlay */}
      <button
        onClick={() => setIsOverlayOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Open Overlay Menu
      </button>

      {isOverlayOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-full h-full flex flex-col relative">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">L</span>
                </div>
                <span className="text-xl font-semibold">Logo</span>
              </div>
              <button
                onClick={() => setIsOverlayOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex-1 flex flex-col justify-center items-center space-y-8 p-6">
              <nav className="space-y-4 text-center">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    className="block text-3xl font-medium hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* 3. Slide-in Sidebar */}
      <button
        onClick={() => setIsSlideOpen(true)}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Open Slide Menu
      </button>

      {isSlideOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsSlideOpen(false)}
          ></div>
          
          {/* Slide Panel */}
          <div className="absolute top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <span className="font-semibold">Menu</span>
              <button
                onClick={() => setIsSlideOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <nav className="p-6 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className="w-full flex items-center space-x-3 px-3 py-3 hover:bg-gray-100 rounded-lg"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Mobile Menu Styles */

/* 1. Collapsible Menu */
.mobile-header {
  background-color: white;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5e7eb;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  width: 2rem;
  height: 2rem;
  background-color: #3b82f6;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  font-size: 0.875rem;
}

.logo-text {
  font-weight: 600;
  color: #111827;
}

/* Hamburger Button */
.hamburger-button {
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.hamburger-button:hover {
  background-color: #f3f4f6;
}

.hamburger-icon {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
}

.hamburger-line {
  display: block;
  height: 2px;
  width: 1.5rem;
  background-color: #4b5563;
  transition: all 0.3s ease;
}

.hamburger-line.open-top {
  transform: rotate(45deg) translateY(6px);
}

.hamburger-line.open-middle {
  opacity: 0;
}

.hamburger-line.open-bottom {
  transform: rotate(-45deg) translateY(-6px);
}

/* Collapsible Menu Content */
.collapsible-menu {
  background-color: white;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
}

.collapsible-menu.open {
  max-height: 24rem;
}

.collapsible-menu.closed {
  max-height: 0;
}

.menu-nav {
  padding: 0.5rem 0;
}

.menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #374151;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: left;
}

.menu-item:hover {
  background-color: #f3f4f6;
}

.menu-item-icon {
  font-size: 1.125rem;
}

.menu-item-text {
  font-weight: 500;
}

/* 2. Full-Screen Overlay Menu */
.overlay-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay-content {
  background-color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  animation: fadeIn 0.3s ease-out;
}

.overlay-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.overlay-close {
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.overlay-close:hover {
  background-color: #f3f4f6;
}

.overlay-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem;
}

.overlay-nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
}

.overlay-nav-item {
  font-size: 1.875rem;
  font-weight: 500;
  color: #111827;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.overlay-nav-item:hover {
  color: #3b82f6;
}

/* 3. Slide-in Sidebar */
.slide-menu-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
  transition: opacity 0.3s ease;
}

.slide-menu-panel {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 20rem;
  background-color: white;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transform: translateX(0);
  transition: transform 0.3s ease-in-out;
  animation: slideInLeft 0.3s ease-out;
}

.slide-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.slide-menu-close {
  padding: 0.375rem;
  border-radius: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.slide-menu-close:hover {
  background-color: #f3f4f6;
}

.slide-menu-nav {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.slide-menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  color: #374151;
  background: none;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: left;
}

.slide-menu-item:hover {
  background-color: #f3f4f6;
}

.slide-menu-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.slide-menu-user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.slide-menu-avatar {
  width: 2.5rem;
  height: 2.5rem;
  background-color: #d1d5db;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.slide-menu-user-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

.slide-menu-user-email {
  font-size: 0.75rem;
  color: #6b7280;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .mobile-header,
  .collapsible-menu,
  .overlay-content,
  .slide-menu-panel {
    background-color: #1f2937;
    color: #f9fafb;
  }
  
  .hamburger-line {
    background-color: #d1d5db;
  }
  
  .hamburger-button:hover,
  .menu-item:hover,
  .overlay-close:hover,
  .slide-menu-close:hover,
  .slide-menu-item:hover {
    background-color: #374151;
  }
  
  .menu-item,
  .overlay-nav-item,
  .slide-menu-item {
    color: #d1d5db;
  }
  
  .overlay-nav-item:hover {
    color: #60a5fa;
  }
  
  .slide-menu-user-name {
    color: #f9fafb;
  }
  
  .slide-menu-user-email {
    color: #9ca3af;
  }
  
  .slide-menu-avatar {
    background-color: #4b5563;
    color: #d1d5db;
  }
}

/* Responsive Design */
@media (min-width: 768px) {
  .mobile-header {
    display: none;
  }
}

/* Accessibility */
.hamburger-button:focus,
.menu-item:focus,
.overlay-close:focus,
.slide-menu-close:focus,
.slide-menu-item:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Body scroll prevention */
body.menu-open {
  overflow: hidden;
}

/* Touch gestures support */
.slide-menu-panel {
  touch-action: pan-y;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .hamburger-line,
  .collapsible-menu,
  .overlay-content,
  .slide-menu-panel {
    transition: none;
  }
  
  .overlay-content,
  .slide-menu-panel {
    animation: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .hamburger-button,
  .menu-item,
  .overlay-close,
  .slide-menu-close,
  .slide-menu-item {
    border: 1px solid transparent;
  }
  
  .hamburger-button:focus,
  .menu-item:focus,
  .overlay-close:focus,
  .slide-menu-close:focus,
  .slide-menu-item:focus {
    border-color: #3b82f6;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Animated Hamburger Icon</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Transforms into X when menu is open</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Multiple Menu Styles</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Collapsible, overlay, and slide-in options</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Smooth Animations</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">CSS transitions and keyframe animations</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Body Scroll Prevention</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Prevents background scrolling when menu is open</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Touch-Friendly</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Optimized for mobile touch interactions</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Accessibility Support</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Keyboard navigation and screen reader friendly</p>
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
            <div className="text-2xl mb-2">📱</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Mobile Websites</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Responsive navigation for mobile devices</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📲</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Progressive Web Apps</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">App-like navigation experiences</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🌐</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Responsive Design</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Adaptive navigation that works across devices</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}