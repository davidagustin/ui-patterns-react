'use client';

import { useState } from 'react';

export default function BottomNavigationPattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [activeNavItem, setActiveNavItem] = useState('home');
  const [activeBadgeItem, setActiveBadgeItem] = useState('home');
  const [activeFloatingItem, setActiveFloatingItem] = useState('home');
  const [activeGestureItem, setActiveGestureItem] = useState('home');

  const basicNavItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'favorites', label: 'Favorites', icon: '❤️' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  const badgeNavItems = [
    { id: 'home', label: 'Home', icon: '🏠', badge: null },
    { id: 'messages', label: 'Messages', icon: '💬', badge: '3' },
    { id: 'notifications', label: 'Alerts', icon: '🔔', badge: '12' },
    { id: 'profile', label: 'Profile', icon: '👤', badge: null },
  ];

  const floatingNavItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'add', label: 'Add', icon: '➕', isFloating: true },
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📱 Bottom Navigation Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Create mobile-friendly bottom navigation bars with icons, badges, and floating action buttons for intuitive app navigation.
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
              Three different bottom navigation styles: basic tabs, with notification badges, and with floating action button.
            </p>
            
            <div className="space-y-8">
              {/* Basic Bottom Navigation */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">1. Basic Bottom Navigation</h3>
                <div className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Mock Content Area */}
                  <div className="h-40 p-6 flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {basicNavItems.find(item => item.id === activeNavItem)?.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {basicNavItems.find(item => item.id === activeNavItem)?.label} Screen
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        This is the {basicNavItems.find(item => item.id === activeNavItem)?.label.toLowerCase()} content area.
                      </p>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <nav className="flex">
                      {basicNavItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveNavItem(item.id)}
                          className={`flex-1 flex flex-col items-center py-3 px-2 transition-all duration-200 ${
                            activeNavItem === item.id
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400'
                          }`}
                        >
                          <span className="text-xl mb-1">{item.icon}</span>
                          <span className="text-xs font-medium">{item.label}</span>
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation with Badges */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">2. With Notification Badges</h3>
                <div className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Mock Content Area */}
                  <div className="h-40 p-6 flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {badgeNavItems.find(item => item.id === activeBadgeItem)?.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {badgeNavItems.find(item => item.id === activeBadgeItem)?.label} Screen
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {activeBadgeItem === 'messages' && 'You have 3 unread messages'}
                        {activeBadgeItem === 'notifications' && 'You have 12 new notifications'}
                        {activeBadgeItem === 'home' && 'Welcome to your dashboard'}
                        {activeBadgeItem === 'profile' && 'Manage your account settings'}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Navigation with Badges */}
                  <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <nav className="flex">
                      {badgeNavItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveBadgeItem(item.id)}
                          className={`relative flex-1 flex flex-col items-center py-3 px-2 transition-all duration-200 ${
                            activeBadgeItem === item.id
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400'
                          }`}
                        >
                          <div className="relative">
                            <span className="text-xl mb-1 block">{item.icon}</span>
                            {item.badge && (
                              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-medium">{item.label}</span>
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation with Floating Action Button */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">3. With Floating Action Button</h3>
                <div className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Mock Content Area */}
                  <div className="h-40 p-6 flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {floatingNavItems.find(item => item.id === activeFloatingItem)?.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {floatingNavItems.find(item => item.id === activeFloatingItem)?.label} Screen
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {activeFloatingItem === 'add' && 'Create new content here'}
                        {activeFloatingItem === 'home' && 'Your main dashboard'}
                        {activeFloatingItem === 'search' && 'Search through content'}
                        {activeFloatingItem === 'chat' && 'Your conversations'}
                        {activeFloatingItem === 'profile' && 'Your profile and settings'}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Navigation with FAB */}
                  <div className="relative bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <nav className="flex relative">
                      {floatingNavItems.map((item, index) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveFloatingItem(item.id)}
                          className={`relative flex-1 flex flex-col items-center py-3 px-2 transition-all duration-200 ${
                            item.isFloating
                              ? 'relative -top-4'
                              : activeFloatingItem === item.id
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400'
                          }`}
                        >
                          {item.isFloating ? (
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
                              <span className="text-white text-xl">{item.icon}</span>
                            </div>
                          ) : (
                            <>
                              <span className="text-xl mb-1">{item.icon}</span>
                              <span className="text-xs font-medium">{item.label}</span>
                            </>
                          )}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>

              {/* Gesture-Enhanced Bottom Navigation */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">4. With Gesture Support</h3>
                <div className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Mock Content Area with Swipe Indicator */}
                  <div className="h-40 p-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700">
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {basicNavItems.find(item => item.id === activeGestureItem)?.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {basicNavItems.find(item => item.id === activeGestureItem)?.label} Screen
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Swipe left/right or tap tabs to navigate
                      </p>
                    </div>
                    
                    {/* Swipe Indicator */}
                    <div className="flex items-center mt-4 space-x-2">
                      <span className="text-xs text-gray-500">← Swipe</span>
                      <div className="flex space-x-1">
                        {basicNavItems.map((item, index) => (
                          <div
                            key={item.id}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              activeGestureItem === item.id
                                ? 'bg-blue-600'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">Swipe →</span>
                    </div>
                  </div>

                  {/* Bottom Navigation with Enhanced Interactions */}
                  <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <nav className="flex relative">
                      {/* Active Indicator */}
                      <div 
                        className="absolute top-0 h-1 bg-blue-600 transition-all duration-300 ease-out"
                        style={{
                          width: `${100 / basicNavItems.length}%`,
                          transform: `translateX(${basicNavItems.findIndex(item => item.id === activeGestureItem) * 100}%)`
                        }}
                      />
                      
                      {basicNavItems.map((item, index) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveGestureItem(item.id)}
                          onMouseEnter={() => {
                            // Add haptic feedback simulation
                            if (navigator.vibrate) navigator.vibrate(10);
                          }}
                          className={`flex-1 flex flex-col items-center py-3 px-2 transition-all duration-200 transform hover:scale-105 ${
                            activeGestureItem === item.id
                              ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                              : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400'
                          }`}
                        >
                          <span className={`text-xl mb-1 transition-transform duration-200 ${
                            activeGestureItem === item.id ? 'scale-110' : ''
                          }`}>
                            {item.icon}
                          </span>
                          <span className="text-xs font-medium">{item.label}</span>
                          
                          {/* Ripple Effect Container */}
                          <div className="absolute inset-0 overflow-hidden rounded-lg">
                            <div className="absolute inset-0 bg-blue-600 opacity-0 scale-0 rounded-full transition-all duration-300 hover:opacity-10 hover:scale-150" />
                          </div>
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Interactive Features</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• Active state indicators with color changes</div>
                <div>• Notification badges with count display</div>
                <div>• Floating action button with shadow effects</div>
                <div>• Gesture support with haptic feedback</div>
                <div>• Smooth hover and transition animations</div>
                <div>• Ripple effects and scale transformations</div>
                <div>• Responsive design for different screen sizes</div>
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

export default function BottomNavigation() {
  const [activeItem, setActiveItem] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'favorites', label: 'Favorites', icon: '❤️' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  const badgeItems = [
    { id: 'home', label: 'Home', icon: '🏠', badge: null },
    { id: 'messages', label: 'Messages', icon: '💬', badge: '3' },
    { id: 'notifications', label: 'Alerts', icon: '🔔', badge: '12' },
    { id: 'profile', label: 'Profile', icon: '👤', badge: null },
  ];

  const floatingItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'add', label: 'Add', icon: '➕', isFloating: true },
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Basic Bottom Navigation */}
      <div className="relative bg-white rounded-lg border overflow-hidden">
        {/* Content Area */}
        <div className="h-40 p-6 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="text-4xl mb-2">
              {navItems.find(item => item.id === activeItem)?.icon}
            </div>
            <h3 className="text-lg font-semibold">
              {navItems.find(item => item.id === activeItem)?.label} Screen
            </h3>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white border-t">
          <nav className="flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={\`flex-1 flex flex-col items-center py-3 px-2 transition-all duration-200 \${
                  activeItem === item.id
                    ? 'text-blue-600'
                    : 'text-gray-400 hover:text-gray-600'
                }\`}
              >
                <span className="text-xl mb-1">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 2. With Notification Badges */}
      <div className="relative bg-white rounded-lg border overflow-hidden">
        <div className="h-40 p-6 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Content with Badges</h3>
          </div>
        </div>

        <div className="bg-white border-t">
          <nav className="flex">
            {badgeItems.map((item) => (
              <button
                key={item.id}
                className={\`relative flex-1 flex flex-col items-center py-3 px-2 transition-all duration-200 \${
                  activeItem === item.id
                    ? 'text-blue-600'
                    : 'text-gray-400 hover:text-gray-600'
                }\`}
              >
                <div className="relative">
                  <span className="text-xl mb-1 block">{item.icon}</span>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 3. With Floating Action Button */}
      <div className="relative bg-white rounded-lg border overflow-hidden">
        <div className="h-40 p-6 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Content with FAB</h3>
          </div>
        </div>

        <div className="relative bg-white border-t">
          <nav className="flex relative">
            {floatingItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={\`relative flex-1 flex flex-col items-center py-3 px-2 transition-all duration-200 \${
                  item.isFloating
                    ? 'relative -top-4'
                    : activeItem === item.id
                    ? 'text-blue-600'
                    : 'text-gray-400 hover:text-gray-600'
                }\`}
              >
                {item.isFloating ? (
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
                    <span className="text-white text-xl">{item.icon}</span>
                  </div>
                ) : (
                  <>
                    <span className="text-xl mb-1">{item.icon}</span>
                    <span className="text-xs font-medium">{item.label}</span>
                  </>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Bottom Navigation Styles */

/* Container */
.bottom-nav-container {
  position: relative;
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

/* Content Area */
.content-area {
  height: 10rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
}

.content-center {
  text-align: center;
}

.content-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.content-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

/* Bottom Navigation */
.bottom-nav {
  background-color: white;
  border-top: 1px solid #e5e7eb;
}

.bottom-nav-list {
  display: flex;
}

/* Navigation Item */
.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.nav-item:hover {
  background-color: #f3f4f6;
}

.nav-item.active {
  color: #3b82f6;
}

.nav-item:not(.active) {
  color: #9ca3af;
}

.nav-item:not(.active):hover {
  color: #6b7280;
}

.nav-item-icon {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.nav-item-label {
  font-size: 0.75rem;
  font-weight: 500;
}

/* Badge Navigation */
.nav-item-with-badge {
  position: relative;
}

.nav-item-badge {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  background-color: #ef4444;
  color: white;
  font-size: 0.75rem;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  z-index: 10;
}

/* Floating Action Button */
.floating-nav {
  position: relative;
}

.fab-item {
  position: relative;
  top: -1rem;
}

.fab-button {
  width: 3rem;
  height: 3rem;
  background-color: #3b82f6;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}

.fab-button:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.fab-icon {
  color: white;
  font-size: 1.25rem;
}

/* Responsive Design */
@media (max-width: 640px) {
  .nav-item {
    padding: 0.5rem 0.25rem;
  }
  
  .nav-item-icon {
    font-size: 1.125rem;
  }
  
  .nav-item-label {
    font-size: 0.625rem;
  }
  
  .fab-button {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .fab-icon {
    font-size: 1rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .bottom-nav-container {
    background-color: #1f2937;
    border-color: #374151;
  }
  
  .content-area {
    background-color: #374151;
  }
  
  .content-title {
    color: #f9fafb;
  }
  
  .bottom-nav {
    background-color: #1f2937;
    border-top-color: #374151;
  }
  
  .nav-item:hover {
    background-color: #374151;
  }
  
  .nav-item.active {
    color: #60a5fa;
  }
  
  .nav-item:not(.active) {
    color: #6b7280;
  }
  
  .nav-item:not(.active):hover {
    color: #9ca3af;
  }
}

/* Animation */
.nav-item {
  transition: all 0.2s ease-in-out;
}

.nav-item-icon {
  transition: transform 0.2s ease;
}

.nav-item:hover .nav-item-icon {
  transform: scale(1.1);
}

.nav-item.active .nav-item-icon {
  transform: scale(1.2);
}

/* Badge Animation */
.nav-item-badge {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

/* Focus States */
.nav-item:focus {
  outline: none;
  background-color: #f3f4f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.fab-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Accessibility */
.nav-item[aria-current="page"] {
  color: #3b82f6;
}

.nav-item-badge[aria-label] {
  position: relative;
}

/* Print Styles */
@media print {
  .bottom-nav {
    display: none;
  }
}

/* Sticky Bottom Navigation */
.bottom-nav-sticky {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: white;
  border-top: 1px solid #e5e7eb;
  box-shadow: 0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Safe Area for Mobile Devices */
@supports (padding: max(0px)) {
  .bottom-nav-sticky {
    padding-bottom: max(env(safe-area-inset-bottom), 0.5rem);
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .nav-item,
  .nav-item-icon,
  .fab-button {
    transition: none;
  }
  
  .nav-item:hover .nav-item-icon,
  .nav-item.active .nav-item-icon {
    transform: none;
  }
  
  .nav-item-badge {
    animation: none;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .nav-item {
    border: 1px solid transparent;
  }
  
  .nav-item:focus {
    border-color: #3b82f6;
  }
  
  .nav-item-badge {
    border: 2px solid white;
  }
}

/* Custom Badge Colors */
.nav-item-badge.success {
  background-color: #10b981;
}

.nav-item-badge.warning {
  background-color: #f59e0b;
}

.nav-item-badge.info {
  background-color: #3b82f6;
}

/* Loading State */
.nav-item.loading {
  opacity: 0.6;
  pointer-events: none;
}

.nav-item.loading .nav-item-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Vibration Effect (for supported devices) */
.nav-item:active {
  /* This would trigger haptic feedback on supported devices */
  user-select: none;
}

/* Notification Dot */
.notification-dot {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  width: 0.5rem;
  height: 0.5rem;
  background-color: #ef4444;
  border-radius: 9999px;
  border: 2px solid white;
}

/* Tab Bar Styles for iOS-like appearance */
.tab-bar {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-top: 0.5px solid rgba(0, 0, 0, 0.1);
}

.tab-bar-item {
  position: relative;
  padding: 0.5rem;
  min-height: 3rem;
}

.tab-bar-item.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2rem;
  height: 2px;
  background-color: #3b82f6;
  border-radius: 0 0 2px 2px;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Icon-Based Navigation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear visual indicators with labels</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Notification Badges</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Count indicators for alerts and messages</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Floating Action Button</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Prominent call-to-action in navigation</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Active State Indicators</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear visual feedback for current tab</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Mobile-Optimized</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Touch-friendly with appropriate sizing</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Smooth Animations</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hover effects and state transitions</p>
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
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Mobile Apps</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Primary navigation for mobile applications</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🌐</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Progressive Web Apps</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Native app-like navigation experience</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">💬</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Social Media Apps</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Quick access to main features and feeds</p>
          </div>
        </div>
      </div>
    </div>
  );
}