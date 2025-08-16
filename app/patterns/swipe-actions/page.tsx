'use client';

import { useState, useRef } from 'react';
import { DynamicCodeExample } from '../../../components/shared/CodeGenerator';

export default function SwipeActionsPattern() {
  
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [swipedItem, setSwipedItem] = useState<number | null>(null);
  
  const items = [
    { id: 1, title: 'Email from John Doe', subtitle: 'Meeting tomorrow at 2 PM', time: '2 min ago' },
    { id: 2, title: 'Project Update', subtitle: 'Q4 goals have been achieved', time: '1 hour ago' },
    { id: 3, title: 'System Notification', subtitle: 'Backup completed successfully', time: '3 hours ago' },
    { id: 4, title: 'Team Message', subtitle: 'New team member joining next week', time: '5 hours ago' },
  ];

  const handleSwipe = (itemId: number, direction: 'left' | 'right') => {
    setSwipedItem(itemId);
    
    // Simulate action
    setTimeout(() => {
      setSwipedItem(null);
      if (direction === 'left') {
        alert(`Deleted item ${itemId}`);
      } else {
        alert(`Archived item ${itemId}`);
      }
    }, 300);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          👆 Swipe Actions Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Reveal contextual actions by swiping on list items, providing quick access to common operations.
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
              Swipe left or right on any item to reveal actions. Swipe left for delete, swipe right for archive.
            </p>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {items.map((item) => (
                <SwipeableItem
                  key={item.id}
                  item={item}
                  isSwiped={swipedItem === item.id}
                  onSwipe={handleSwipe}
                />
              ))}
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">How to Use</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• Swipe left to reveal delete action (red)</div>
                <div>• Swipe right to reveal archive action (blue)</div>
                <div>• Tap the action button to execute</div>
                <div>• Tap the item to reset the swipe</div>
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
                componentName="swipe-actions" 
                activeTab={activeTab} 
              />
              }
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Bidirectional Swipes</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Swipe left or right for different actions</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Feedback</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear indication of available actions</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Threshold Detection</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Actions trigger only when threshold is met</p>
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Touch & Mouse Support</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Works on both mobile and desktop</p>
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
            <div className="text-2xl mb-2">📧</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Email Apps</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Archive, delete, or mark as read</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📱</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Mobile Lists</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Quick actions on list items</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">💬</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Chat Applications</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pin, archive, or delete messages</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// SwipeableItem Component
function SwipeableItem({ 
  item, 
  isSwiped, 
  onSwipe 
}: { 
  item: { id: number; title: string; subtitle: string; time: string }; 
  isSwiped: boolean; 
  onSwipe: (itemId: number, direction: 'left' | 'right') => void; 
}) {
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef<number>(0);
  const currentX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    currentX.current = e.touches[0].clientX;
    const diff = currentX.current - startX.current;
    const newTranslateX = Math.max(-120, Math.min(120, diff));
    setTranslateX(newTranslateX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    if (translateX < -60) {
      onSwipe(item.id, 'left');
    } else if (translateX > 60) {
      onSwipe(item.id, 'right');
    }
    
    setTranslateX(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    currentX.current = e.clientX;
    const diff = currentX.current - startX.current;
    const newTranslateX = Math.max(-120, Math.min(120, diff));
    setTranslateX(newTranslateX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    if (translateX < -60) {
      onSwipe(item.id, 'left');
    } else if (translateX > 60) {
      onSwipe(item.id, 'right');
    }
    
    setTranslateX(0);
  };

  const handleAction = (action: 'delete' | 'archive') => {
    onSwipe(item.id, action === 'delete' ? 'left' : 'right');
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Background Actions */}
      <div className="absolute inset-0 flex">
        <div className="flex-1 bg-blue-500 flex items-center justify-center">
          <button
            onClick={() => handleAction('archive')}
            className="text-white font-medium px-4"
          >
            Archive
          </button>
        </div>
        <div className="flex-1 bg-red-500 flex items-center justify-center">
          <button
            onClick={() => handleAction('delete')}
            className="text-white font-medium px-4"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        className={`relative bg-white dark:bg-gray-800 p-4 transition-transform duration-200 ${
          isDragging ? '' : 'duration-200'
        }`}
        style={{ transform: `translateX(${translateX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-gray-800 dark:text-gray-200">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {item.subtitle}
            </p>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {item.time}
          </span>
        </div>
      </div>
    </div>
  );
}
