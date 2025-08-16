'use client';

import { useState, useRef } from 'react';
import { DynamicCodeExample } from '../../../components/shared/CodeGenerator';

export default function PinchZoomPattern() {
  
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const startDistance = useRef<number>(0);
  const startScale = useRef<number>(1);
  const startPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch gesture
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      startDistance.current = distance;
      startScale.current = scale;
    } else if (e.touches.length === 1) {
      // Pan gesture
      setIsDragging(true);
      startPosition.current = {
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    
    if (e.touches.length === 2) {
      // Pinch gesture
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      
      const newScale = Math.max(0.5, Math.min(3, startScale.current * (distance / startDistance.current)));
      setScale(newScale);
    } else if (e.touches.length === 1 && isDragging) {
      // Pan gesture
      const newX = e.touches[0].clientX - startPosition.current.x;
      const newY = e.touches[0].clientY - startPosition.current.y;
      
      // Limit panning based on scale
      const maxX = (scale - 1) * 100;
      const maxY = (scale - 1) * 100;
      
      setPosition({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY))
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startPosition.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - startPosition.current.x;
      const newY = e.clientY - startPosition.current.y;
      
      const maxX = (scale - 1) * 100;
      const maxY = (scale - 1) * 100;
      
      setPosition({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.5, Math.min(3, scale * delta));
    setScale(newScale);
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🔍 Pinch to Zoom Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Allow users to zoom in and out of content using pinch gestures or mouse wheel, with smooth panning support.
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
              Use pinch gestures on mobile or mouse wheel on desktop to zoom. Drag to pan when zoomed in.
            </p>
            
            <div 
              ref={containerRef}
              className="relative w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
            >
              <img
                ref={imageRef}
                src="/next.svg"
                alt="Mountain landscape"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-200"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  cursor: isDragging ? 'grabbing' : 'grab'
                }}
                draggable={false}
              />
              
              {/* Zoom Controls */}
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => setScale(Math.max(0.5, scale - 0.2))}
                  className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <button
                  onClick={() => setScale(Math.min(3, scale + 0.2))}
                  className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <button
                  onClick={resetZoom}
                  className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>

              {/* Zoom Info */}
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                {Math.round(scale * 100)}%
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">How to Use</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• Pinch with two fingers to zoom in/out (mobile)</div>
                <div>• Use mouse wheel to zoom in/out (desktop)</div>
                <div>• Drag to pan when zoomed in</div>
                <div>• Use the zoom controls for precise control</div>
                <div>• Click reset to return to original size</div>
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
                componentName="pinch-zoom" 
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Pinch Gestures</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Natural zoom with two-finger pinch</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Mouse Wheel Support</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Zoom with mouse wheel on desktop</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Pan & Drag</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Move around when zoomed in</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Zoom Limits</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Prevent over-zooming or under-zooming</p>
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Reset Functionality</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Return to original size and position</p>
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
            <div className="text-2xl mb-2">🖼️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Image Viewers</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Examine photos and images in detail</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🗺️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Maps & Charts</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Navigate detailed maps and diagrams</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📄</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Document Viewers</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Read and examine documents closely</p>
          </div>
        </div>
      </div>
    </div>
  );
}
