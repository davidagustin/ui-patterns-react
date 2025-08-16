'use client';

import { useState, useRef, useEffect } from 'react';

export default function SwipeNavigationPattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [currentPage, setCurrentPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const pages = [
    { 
      id: 1, 
      title: 'Home', 
      content: 'Welcome to the home page', 
      color: 'bg-blue-500',
      image: '/next.svg'
    },
    { 
      id: 2, 
      title: 'Profile', 
      content: 'Your profile information', 
      color: 'bg-green-500',
      image: '/vercel.svg'
    },
    { 
      id: 3, 
      title: 'Settings', 
      content: 'App settings and preferences', 
      color: 'bg-purple-500',
      image: '/globe.svg'
    },
    { 
      id: 4, 
      title: 'Messages', 
      content: 'Your conversations', 
      color: 'bg-orange-500',
      image: '/window.svg'
    },
    { 
      id: 5, 
      title: 'Files', 
      content: 'Your documents and files', 
      color: 'bg-red-500',
      image: '/file.svg'
    },
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const diff = startX - currentX;
    const threshold = 80; // Increased threshold for more precise control
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentPage < pages.length - 1) {
        // Swipe left - next page
        setCurrentPage(prev => prev + 1);
      } else if (diff < 0 && currentPage > 0) {
        // Swipe right - previous page
        setCurrentPage(prev => prev - 1);
      }
    }
    
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setCurrentX(e.clientX);
  };

  const handleMouseUp = (e?: React.MouseEvent) => {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const threshold = 80; // Increased threshold for more precise control
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentPage < pages.length - 1) {
        // Swipe left - next page
        setCurrentPage(prev => prev + 1);
      } else if (diff < 0 && currentPage > 0) {
        // Swipe right - previous page
        setCurrentPage(prev => prev - 1);
      }
    }
    
    setIsDragging(false);
  };

  const goToPage = (pageIndex: number) => {
    // Ensure pageIndex is within valid bounds
    if (pageIndex >= 0 && pageIndex < pages.length) {
      setCurrentPage(pageIndex);
    }
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevPage();
      } else if (e.key === 'ArrowRight') {
        nextPage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📱 Swipe Navigation Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Navigate between pages using swipe gestures, providing intuitive mobile navigation with visual feedback.
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
              Swipe left or right to navigate between pages. Use arrow keys or buttons for alternative navigation.
            </p>
            
            <div 
              ref={containerRef}
              className="relative w-full h-64 bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 select-none"
              style={{ 
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Page Container */}
              <div 
                className="flex h-full transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(-${currentPage * 100}%)`,
                  width: `${pages.length * 100}%`
                }}
              >
                {pages.map((page, index) => (
                  <div
                    key={page.id}
                    className={`flex-shrink-0 h-full flex flex-col items-center justify-center ${page.color} text-white relative overflow-hidden`}
                    style={{ width: `${100 / pages.length}%` }}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
                      <img 
                        src={page.image} 
                        alt={`${page.title} background`}
                        className="w-32 h-32 object-contain"
                        style={{ 
                          opacity: 1,
                          maxWidth: '100%',
                          maxHeight: '100%'
                        }}
                      />
                    </div>
                    
                    {/* Content Overlay */}
                    <div className="text-center relative z-10">
                      <h3 className="text-2xl font-bold mb-2">{page.title}</h3>
                      <p className="text-lg opacity-90">{page.content}</p>
                      <p className="text-sm opacity-75 mt-2">Page {index + 1} of {pages.length}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {pages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentPage 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 ${
                  currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                }`}
                aria-label="Previous page"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextPage}
                disabled={currentPage === pages.length - 1}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 ${
                  currentPage === pages.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                }`}
                aria-label="Next page"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Swipe Indicator */}
              {isDragging && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentX < startX ? '← Swipe left' : 'Swipe right →'}
                </div>
              )}

              {/* Swipe Progress Indicator */}
              {isDragging && (
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-black/30 text-white px-2 py-1 rounded text-xs">
                  {Math.abs(startX - currentX)}px / 80px threshold
                </div>
              )}
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">How to Use</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• Swipe left to go to next page</div>
                <div>• Swipe right to go to previous page</div>
                <div>• Use arrow keys for keyboard navigation</div>
                <div>• Click dots to jump to specific pages</div>
                <div>• Use arrow buttons for precise navigation</div>
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
{`import { useState, useRef, useEffect } from 'react';

export default function SwipeNavigation() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const pages = [
    { 
      id: 1, 
      title: 'Home', 
      content: 'Welcome to the home page', 
      color: 'bg-blue-500',
      image: '/next.svg'
    },
    { 
      id: 2, 
      title: 'Profile', 
      content: 'Your profile information', 
      color: 'bg-green-500',
      image: '/vercel.svg'
    },
    { 
      id: 3, 
      title: 'Settings', 
      content: 'App settings and preferences', 
      color: 'bg-purple-500',
      image: '/globe.svg'
    },
    { 
      id: 4, 
      title: 'Messages', 
      content: 'Your conversations', 
      color: 'bg-orange-500',
      image: '/window.svg'
    },
    { 
      id: 5, 
      title: 'Files', 
      content: 'Your documents and files', 
      color: 'bg-red-500',
      image: '/file.svg'
    },
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const diff = startX - currentX;
    const threshold = 80; // Increased threshold for more precise control
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentPage < pages.length - 1) {
        setCurrentPage(prev => prev + 1);
      } else if (diff < 0 && currentPage > 0) {
        setCurrentPage(prev => prev - 1);
      }
    }
    
    setIsDragging(false);
  };

  const goToPage = (pageIndex: number) => {
    // Ensure pageIndex is within valid bounds
    if (pageIndex >= 0 && pageIndex < pages.length) {
      setCurrentPage(pageIndex);
    }
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevPage();
      } else if (e.key === 'ArrowRight') {
        nextPage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-64 bg-white rounded-lg overflow-hidden border select-none"
      style={{ 
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Page Container */}
      <div 
        className="flex h-full transition-transform duration-300 ease-out"
        style={{
          transform: \`translateX(-\${currentPage * 100}%)\`,
          width: \`\${pages.length * 100}%\`
        }}
      >
        {pages.map((page, index) => (
          <div
            key={page.id}
            className={\`flex-shrink-0 h-full flex flex-col items-center justify-center \${page.color} text-white relative overflow-hidden\`}
            style={{ width: \`\${100 / pages.length}%\` }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
              <img 
                src={page.image} 
                alt={\`\${page.title} background\`}
                className="w-32 h-32 object-contain"
                style={{ 
                  opacity: 1,
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
              />
            </div>
            
            {/* Content Overlay */}
            <div className="text-center relative z-10">
              <h3 className="text-2xl font-bold mb-2">{page.title}</h3>
              <p className="text-lg opacity-90">{page.content}</p>
              <p className="text-sm opacity-75 mt-2">Page {index + 1} of {pages.length}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={\`w-3 h-3 rounded-full transition-all duration-200 \${
              index === currentPage 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }\`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevPage}
        disabled={currentPage === 0}
        className={\`absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center \${
          currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
        }\`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextPage}
        disabled={currentPage === pages.length - 1}
        className={\`absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center \${
          currentPage === pages.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
        }\`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Swipe Navigation Container */
.swipe-navigation-container {
  position: relative;
  width: 100%;
  height: 16rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  user-select: none;
}

/* Page Container */
.page-container {
  display: flex;
  height: 100%;
  transition: transform 0.3s ease-out;
}

.page {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.page-background-image {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.2;
}

.page-background-image img {
  width: 8rem;
  height: 8rem;
  object-fit: contain;
  transition: opacity 0.3s ease;
}

.page-content {
  text-align: center;
  position: relative;
  z-index: 10;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.page-description {
  font-size: 1.125rem;
  opacity: 0.9;
}

.page-counter {
  font-size: 0.875rem;
  opacity: 0.75;
  margin-top: 0.5rem;
}

/* Navigation Dots */
.navigation-dots {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  background-color: rgba(255, 255, 255, 0.5);
}

.dot:hover {
  background-color: rgba(255, 255, 255, 0.75);
}

.dot.active {
  background-color: white;
  transform: scale(1.25);
}

/* Navigation Arrows */
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2rem;
  height: 2rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-arrow:hover {
  background-color: white;
  transform: translateY(-50%) scale(1.1);
}

.nav-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-arrow:disabled:hover {
  transform: translateY(-50%) scale(1);
}

.nav-arrow.prev {
  left: 0.5rem;
}

.nav-arrow.next {
  right: 0.5rem;
}

/* Swipe Indicator */
.swipe-indicator {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
}

/* Touch Feedback */
.swipe-navigation-container:active {
  cursor: grabbing;
}

/* Responsive Design */
@media (max-width: 640px) {
  .swipe-navigation-container {
    height: 12rem;
  }
  
  .page-title {
    font-size: 1.25rem;
  }
  
  .page-description {
    font-size: 1rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .swipe-navigation-container {
    background-color: #1f2937;
    border-color: #374151;
  }
  
  .nav-arrow {
    background-color: rgba(31, 41, 55, 0.8);
    color: #9ca3af;
  }
  
  .nav-arrow:hover {
    background-color: #1f2937;
  }
}

/* Animation Keyframes */
@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

/* Accessibility */
.swipe-navigation-container:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.dot:focus-visible,
.nav-arrow:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .page-container,
  .dot,
  .nav-arrow {
    transition: none;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .swipe-navigation-container {
    border-width: 2px;
  }
  
  .nav-arrow {
    border: 1px solid #000;
  }
  
  .dot {
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Swipe Gestures</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Intuitive left/right swipe navigation</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Multiple Navigation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Dots, arrows, and keyboard support</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Feedback</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Smooth transitions and indicators</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Touch & Mouse Support</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Works on both mobile and desktop</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Keyboard Navigation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Arrow key support for accessibility</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Threshold Detection</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Configurable swipe sensitivity</p>
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
            <p className="text-sm text-gray-600 dark:text-gray-400">Page navigation and onboarding</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🖼️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Image Galleries</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Photo browsing and slideshows</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📖</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">E-books & Readers</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Page turning and navigation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
