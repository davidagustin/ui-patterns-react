'use client';

import { useState, useRef, useEffect } from 'react';

export default function PullToRefreshPattern() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);
  const isPulling = useRef<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      isPulling.current = true;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPulling.current) return;
    
    currentY.current = e.touches[0].clientY;
    const distance = Math.max(0, currentY.current - startY.current);
    
    if (distance > 0) {
      e.preventDefault();
      setPullDistance(Math.min(distance * 0.5, 100));
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance > 60) {
      // Trigger refresh
      setIsRefreshing(true);
      setPullDistance(0);
      
      // Simulate refresh
      setTimeout(() => {
        setIsRefreshing(false);
        setLastUpdate(new Date());
      }, 2000);
    } else {
      setPullDistance(0);
    }
    
    isPulling.current = false;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      startY.current = e.clientY;
      isPulling.current = true;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPulling.current) return;
    
    currentY.current = e.clientY;
    const distance = Math.max(0, currentY.current - startY.current);
    
    if (distance > 0) {
      setPullDistance(Math.min(distance * 0.5, 100));
    }
  };

  const handleMouseUp = () => {
    if (pullDistance > 60) {
      setIsRefreshing(true);
      setPullDistance(0);
      
      setTimeout(() => {
        setIsRefreshing(false);
        setLastUpdate(new Date());
      }, 2000);
    } else {
      setPullDistance(0);
    }
    
    isPulling.current = false;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🔄 Pull to Refresh Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Allow users to refresh content by pulling down on scrollable content, providing intuitive mobile interaction.
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
              Pull down on the content area to trigger a refresh. Works on both touch and mouse devices.
            </p>
            
            <div 
              ref={containerRef}
              className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              style={{ height: '300px' }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Pull Indicator */}
              <div 
                className={`absolute top-0 left-0 right-0 flex items-center justify-center transition-all duration-200 ${
                  pullDistance > 0 ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ 
                  transform: `translateY(${pullDistance}px)`,
                  height: '60px'
                }}
              >
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                  {isRefreshing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                      <span className="text-sm font-medium">Refreshing...</span>
                    </>
                  ) : (
                    <>
                      <svg className={`w-5 h-5 transition-transform ${pullDistance > 30 ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      <span className="text-sm font-medium">
                        {pullDistance > 30 ? 'Release to refresh' : 'Pull to refresh'}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 pt-16">
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">Latest Updates</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Last updated: {lastUpdate.toLocaleTimeString()}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">Item 1</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">This is some sample content</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">Item 2</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">More sample content here</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">Item 3</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Additional content items</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">How to Use</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• Pull down from the top of the content area</div>
                <div>• Release when you see "Release to refresh"</div>
                <div>• Wait for the refresh animation to complete</div>
                <div>• Works on both touch devices and desktop</div>
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
{`import { useState, useRef } from 'react';

export default function PullToRefresh() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);
  const isPulling = useRef<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      isPulling.current = true;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPulling.current) return;
    
    currentY.current = e.touches[0].clientY;
    const distance = Math.max(0, currentY.current - startY.current);
    
    if (distance > 0) {
      e.preventDefault();
      setPullDistance(Math.min(distance * 0.5, 100));
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance > 60) {
      setIsRefreshing(true);
      setPullDistance(0);
      
      // Simulate refresh
      setTimeout(() => {
        setIsRefreshing(false);
        setLastUpdate(new Date());
      }, 2000);
    } else {
      setPullDistance(0);
    }
    
    isPulling.current = false;
  };

  return (
    <div 
      ref={containerRef}
      className="relative bg-white rounded-lg border overflow-hidden"
      style={{ height: '300px' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull Indicator */}
      <div 
        className={\`absolute top-0 left-0 right-0 flex items-center justify-center transition-all duration-200 \${
          pullDistance > 0 ? 'opacity-100' : 'opacity-0'
        }\`}
        style={{ 
          transform: \`translateY(\${pullDistance}px)\`,
          height: '60px'
        }}
      >
        <div className="flex items-center space-x-2 text-blue-600">
          {isRefreshing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
              <span className="text-sm font-medium">Refreshing...</span>
            </>
          ) : (
            <>
              <svg className={\`w-5 h-5 transition-transform \${pullDistance > 30 ? 'rotate-180' : ''}\`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span className="text-sm font-medium">
                {pullDistance > 30 ? 'Release to refresh' : 'Pull to refresh'}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pt-16">
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="font-medium">Latest Updates</h3>
            <p className="text-sm text-gray-600">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium">Item 1</h4>
              <p className="text-sm text-gray-600">This is some sample content</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium">Item 2</h4>
              <p className="text-sm text-gray-600">More sample content here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Pull to Refresh Container */
.pull-refresh-container {
  position: relative;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  height: 300px;
  user-select: none;
}

/* Pull Indicator */
.pull-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  height: 60px;
  background: linear-gradient(to bottom, rgba(59, 130, 246, 0.1), transparent);
}

.pull-indicator.hidden {
  opacity: 0;
}

.pull-indicator.visible {
  opacity: 1;
}

/* Indicator Content */
.indicator-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2563eb;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Arrow Icon */
.pull-arrow {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.2s ease;
}

.pull-arrow.rotated {
  transform: rotate(180deg);
}

/* Loading Spinner */
.loading-spinner {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #2563eb;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Content Area */
.content-area {
  padding: 1rem;
  padding-top: 4rem;
}

/* Content Items */
.content-item {
  background-color: #f9fafb;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}

.content-item h3 {
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

.content-item p {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Touch Feedback */
.pull-refresh-container:active {
  cursor: grabbing;
}

/* Responsive Design */
@media (max-width: 640px) {
  .pull-refresh-container {
    height: 250px;
  }
  
  .content-area {
    padding: 0.75rem;
    padding-top: 3.5rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .pull-refresh-container {
    background-color: #1f2937;
    border-color: #374151;
  }
  
  .pull-indicator {
    background: linear-gradient(to bottom, rgba(59, 130, 246, 0.2), transparent);
  }
  
  .content-item {
    background-color: #374151;
  }
  
  .content-item h3 {
    color: #f9fafb;
  }
  
  .content-item p {
    color: #9ca3af;
  }
}

/* Accessibility */
.pull-refresh-container:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .pull-indicator,
  .pull-arrow,
  .loading-spinner {
    transition: none;
    animation: none;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .pull-refresh-container {
    border-width: 2px;
  }
  
  .content-item {
    border: 1px solid #000;
  }
}`}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold mb-4 text-green-800 dark:text-green-200">
          ✨ Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Touch & Mouse Support</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Works on both mobile and desktop devices</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Feedback</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear indication of pull distance and state</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Threshold Detection</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Triggers refresh only when threshold is met</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Loading States</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Shows loading animation during refresh</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Smooth Animations</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Fluid transitions and visual feedback</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Accessibility</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Keyboard navigation and screen reader support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-semibold mb-4 text-purple-800 dark:text-purple-200">
          🎯 Use Cases
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📱</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Mobile Apps</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Refresh feeds and content lists</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📰</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">News Feeds</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Update latest articles and posts</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">💬</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Chat Applications</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Load new messages and updates</p>
          </div>
        </div>
      </div>
    </div>
  );
}
