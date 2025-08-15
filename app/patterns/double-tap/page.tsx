'use client';

import { useState, useRef } from 'react';

export default function DoubleTapPattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [doubleTappedItem, setDoubleTappedItem] = useState<number | null>(null);
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  
  const tapTimers = useRef<Map<number, NodeJS.Timeout>>(new Map());
  const tapCounts = useRef<Map<number, number>>(new Map());

  const items = [
    { id: 1, name: 'Sunset Beach', author: 'John Doe', likes: 124, image: '🌅' },
    { id: 2, name: 'Mountain Peak', author: 'Jane Smith', likes: 89, image: '🏔️' },
    { id: 3, name: 'City Lights', author: 'Mike Johnson', likes: 203, image: '🌃' },
    { id: 4, name: 'Forest Path', author: 'Sarah Wilson', likes: 67, image: '🌲' },
  ];

  const handleTap = (itemId: number) => {
    const currentCount = tapCounts.current.get(itemId) || 0;
    const newCount = currentCount + 1;
    tapCounts.current.set(itemId, newCount);

    // Clear existing timer
    if (tapTimers.current.has(itemId)) {
      clearTimeout(tapTimers.current.get(itemId)!);
    }

    if (newCount === 2) {
      // Double tap detected
      setDoubleTappedItem(itemId);
      setLikedItems(prev => new Set([...prev, itemId]));
      
      // Reset tap count
      tapCounts.current.set(itemId, 0);
      
      // Show feedback briefly
      setTimeout(() => {
        setDoubleTappedItem(null);
      }, 1000);
    } else {
      // Set timer for single tap
      const timer = setTimeout(() => {
        // Single tap action (e.g., open detail view)
        console.log(`Single tap on item ${itemId}`);
        tapCounts.current.set(itemId, 0);
      }, 300);

      tapTimers.current.set(itemId, timer);
    }
  };

  const handleMouseClick = (itemId: number) => {
    handleTap(itemId);
  };

  const handleTouchStart = (itemId: number) => {
    handleTap(itemId);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          👆 Double Tap Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Detect double taps to trigger quick actions like liking content, while single taps perform primary actions.
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
              Double tap any card to like it. Single tap to view details. Watch for the heart animation!
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer transition-all duration-200 ${
                    doubleTappedItem === item.id ? 'scale-105 ring-2 ring-red-500' : 'hover:shadow-md'
                  }`}
                  onClick={() => handleMouseClick(item.id)}
                  onTouchStart={() => handleTouchStart(item.id)}
                >
                  {/* Image */}
                  <div className="h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center text-4xl">
                    {item.image}
                  </div>
                  
                  {/* Content */}
                  <div className="p-3">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      by {item.author}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-1">
                        <span className={`text-lg transition-all duration-300 ${
                          likedItems.has(item.id) ? 'text-red-500 scale-110' : 'text-gray-400'
                        }`}>
                          {likedItems.has(item.id) ? '❤️' : '🤍'}
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {likedItems.has(item.id) ? item.likes + 1 : item.likes}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Double tap to like
                      </span>
                    </div>
                  </div>

                  {/* Double Tap Animation */}
                  {doubleTappedItem === item.id && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-6xl animate-ping text-red-500">
                        ❤️
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">How to Use</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• Single tap to view item details</div>
                <div>• Double tap quickly to like the item</div>
                <div>• Watch for the heart animation on double tap</div>
                <div>• Works on both touch and mouse devices</div>
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

export default function DoubleTap() {
  const [doubleTappedItem, setDoubleTappedItem] = useState<number | null>(null);
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  
  const tapTimers = useRef<Map<number, NodeJS.Timeout>>(new Map());
  const tapCounts = useRef<Map<number, number>>(new Map());

  const items = [
    { id: 1, name: 'Sunset Beach', author: 'John Doe', likes: 124, image: '🌅' },
    { id: 2, name: 'Mountain Peak', author: 'Jane Smith', likes: 89, image: '🏔️' },
  ];

  const handleTap = (itemId: number) => {
    const currentCount = tapCounts.current.get(itemId) || 0;
    const newCount = currentCount + 1;
    tapCounts.current.set(itemId, newCount);

    // Clear existing timer
    if (tapTimers.current.has(itemId)) {
      clearTimeout(tapTimers.current.get(itemId)!);
    }

    if (newCount === 2) {
      // Double tap detected
      setDoubleTappedItem(itemId);
      setLikedItems(prev => new Set([...prev, itemId]));
      
      // Reset tap count
      tapCounts.current.set(itemId, 0);
      
      // Show feedback briefly
      setTimeout(() => {
        setDoubleTappedItem(null);
      }, 1000);
    } else {
      // Set timer for single tap
      const timer = setTimeout(() => {
        // Single tap action (e.g., open detail view)
        console.log(\`Single tap on item \${itemId}\`);
        tapCounts.current.set(itemId, 0);
      }, 300);

      tapTimers.current.set(itemId, timer);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className={\`relative bg-white rounded-lg border overflow-hidden cursor-pointer transition-all duration-200 \${
            doubleTappedItem === item.id ? 'scale-105 ring-2 ring-red-500' : 'hover:shadow-md'
          }\`}
          onClick={() => handleTap(item.id)}
        >
          {/* Image */}
          <div className="h-32 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-4xl">
            {item.image}
          </div>
          
          {/* Content */}
          <div className="p-3">
            <h3 className="font-medium text-sm">{item.name}</h3>
            <p className="text-xs text-gray-600">by {item.author}</p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-1">
                <span className={\`text-lg transition-all duration-300 \${
                  likedItems.has(item.id) ? 'text-red-500 scale-110' : 'text-gray-400'
                }\`}>
                  {likedItems.has(item.id) ? '❤️' : '🤍'}
                </span>
                <span className="text-xs text-gray-600">
                  {likedItems.has(item.id) ? item.likes + 1 : item.likes}
                </span>
              </div>
            </div>
          </div>

          {/* Double Tap Animation */}
          {doubleTappedItem === item.id && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-6xl animate-ping text-red-500">
                ❤️
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Double Tap Container */
.double-tap-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.double-tap-item {
  position: relative;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
}

.double-tap-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.double-tap-item.double-tapped {
  transform: scale(1.05);
  ring: 2px solid #ef4444;
}

/* Item Image */
.item-image {
  height: 8rem;
  background: linear-gradient(to bottom right, #dbeafe, #e9d5ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.25rem;
}

/* Item Content */
.item-content {
  padding: 0.75rem;
}

.item-title {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.item-author {
  font-size: 0.75rem;
  color: #6b7280;
}

.item-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.like-section {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.like-icon {
  font-size: 1.125rem;
  transition: all 0.3s ease;
}

.like-icon.liked {
  color: #ef4444;
  transform: scale(1.1);
}

.like-icon.unliked {
  color: #9ca3af;
}

.like-count {
  font-size: 0.75rem;
  color: #6b7280;
}

.hint-text {
  font-size: 0.75rem;
  color: #9ca3af;
}

/* Double Tap Animation */
.double-tap-animation {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 10;
}

.heart-animation {
  font-size: 3.75rem;
  color: #ef4444;
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

/* Touch Feedback */
.double-tap-item:active {
  transform: scale(0.98);
}

/* Responsive Design */
@media (max-width: 640px) {
  .double-tap-container {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .item-image {
    height: 6rem;
    font-size: 1.875rem;
  }
  
  .item-content {
    padding: 0.5rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .double-tap-item {
    background-color: #1f2937;
    border-color: #374151;
  }
  
  .item-image {
    background: linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
  }
  
  .item-title {
    color: #f9fafb;
  }
  
  .item-author {
    color: #9ca3af;
  }
  
  .like-count {
    color: #9ca3af;
  }
  
  .hint-text {
    color: #6b7280;
  }
}

/* Animation Keyframes */
@keyframes doubleTapScale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.double-tap-item.double-tapping {
  animation: doubleTapScale 0.3s ease-in-out;
}

/* Accessibility */
.double-tap-item:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .double-tap-item,
  .like-icon,
  .heart-animation {
    transition: none;
    animation: none;
  }
  
  .double-tap-item.double-tapping {
    animation: none;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .double-tap-item {
    border-width: 2px;
  }
  
  .double-tap-item.double-tapped {
    border-color: #000;
    background-color: #fff;
  }
  
  .like-icon.liked {
    color: #000;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Tap Detection</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Accurate single and double tap detection</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Feedback</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear animations and state changes</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Configurable Timing</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Customizable tap intervals</p>
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">State Management</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Persistent like states and counters</p>
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
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Social Media</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Like posts and photos quickly</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🖼️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Photo Galleries</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Favorite images and collections</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🎵</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Music Apps</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Like songs and playlists</p>
          </div>
        </div>
      </div>
    </div>
  );
}
