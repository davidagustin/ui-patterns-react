'use client';

import { useState, useRef, useEffect } from 'react';

export default function ImageZoomPattern() {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
    setIsZoomed(true);
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
    if (zoomLevel <= 1.5) {
      setIsZoomed(false);
    }
  };

  const handleReset = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    setIsZoomed(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (zoomLevel > 1 && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      
      // Calculate boundary limits based on zoom level
      const maxOffset = (zoomLevel - 1) * 50; // 50% of the zoom excess
      
      // Constrain the position within boundaries
      const constrainedX = Math.max(-maxOffset, Math.min(maxOffset, x * 25));
      const constrainedY = Math.max(-maxOffset, Math.min(maxOffset, y * 25));
      
      setPosition({ x: constrainedX, y: constrainedY });
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  // Reset position when zoom level changes
  useEffect(() => {
    if (zoomLevel <= 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [zoomLevel]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🔍 Image Zoom Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Interactive image zoom functionality with mouse controls, wheel zoom, and smooth transitions.
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
              Use the zoom controls or mouse wheel to zoom in/out. Move your mouse to pan when zoomed in.
            </p>
            
            <div className="space-y-4">
              {/* Zoom Controls */}
              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.5}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Zoom Out
                </button>
                <button
                  onClick={handleReset}
                  className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Zoom In
                </button>
              </div>
              
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                Zoom Level: {zoomLevel.toFixed(1)}x
              </div>

              {/* Image Container */}
              <div
                ref={containerRef}
                className="image-zoom-container"
                onMouseMove={handleMouseMove}
                onWheel={handleWheel}
              >
                <img
                  ref={imageRef}
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center"
                  alt="Zoomable Image"
                  className="image-zoom-image"
                  style={{
                    transform: `scale(${zoomLevel}) translate(${position.x}%, ${position.y}%)`,
                    cursor: isZoomed ? 'grab' : 'default',
                  }}
                />
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

            {/* Code Content */}
            <div className="code-block">
              {activeTab === 'jsx' ? (
                <pre className="text-sm leading-relaxed">
{`import { useState, useRef, useEffect } from 'react';

export default function ImageZoomPattern() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
    setIsZoomed(true);
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
    if (zoomLevel <= 1.5) {
      setIsZoomed(false);
    }
  };

  const handleReset = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    setIsZoomed(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (zoomLevel > 1 && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      
      // Calculate boundary limits based on zoom level
      const maxOffset = (zoomLevel - 1) * 50; // 50% of the zoom excess
      
      // Constrain the position within boundaries
      const constrainedX = Math.max(-maxOffset, Math.min(maxOffset, x * 25));
      const constrainedY = Math.max(-maxOffset, Math.min(maxOffset, y * 25));
      
      setPosition({ x: constrainedX, y: constrainedY });
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  // Reset position when zoom level changes
  useEffect(() => {
    if (zoomLevel <= 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [zoomLevel]);

  return (
    <div className="space-y-4">
      {/* Zoom Controls */}
      <div className="flex gap-2 justify-center">
        <button 
          onClick={handleZoomOut}
          disabled={zoomLevel <= 0.5}
          className="zoom-button"
        >
          Zoom Out
        </button>
        <button onClick={handleReset} className="zoom-button">
          Reset
        </button>
        <button 
          onClick={handleZoomIn}
          disabled={zoomLevel >= 3}
          className="zoom-button"
        >
          Zoom In
        </button>
      </div>
      
      {/* Image Container */}
      <div
        ref={containerRef}
        className="image-zoom-container"
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
      >
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center"
          alt="Zoomable Image"
          className="image-zoom-image"
          style={{
            transform: \`scale(\${zoomLevel}) translate(\${position.x}%, \${position.y}%)\`,
            cursor: isZoomed ? 'grab' : 'default',
          }}
        />
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Image Zoom Container */
.image-zoom-container {
  width: 100%;
  height: 300px;
  overflow: hidden;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  position: relative;
  background: #f9fafb;
  user-select: none;
}

/* Image Zoom Image */
.image-zoom-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.1s ease-out;
  transform-origin: center center;
  pointer-events: none;
}

/* Zoom Controls */
.zoom-button {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 0.875rem;
}

.zoom-button:hover:not(:disabled) {
  background: #2563eb;
}

.zoom-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

/* Zoom Level Display */
.zoom-level {
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .image-zoom-container {
    height: 200px;
  }
  
  .zoom-controls {
    flex-wrap: wrap;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .image-zoom-container {
    border-color: #374151;
    background: #1f2937;
  }
  
  .zoom-level {
    color: #9ca3af;
  }
}

/* Animation */
.image-zoom-image {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Focus Management */
.zoom-button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Accessibility */
.image-zoom-container:focus-within {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}`}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <h2 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">
            ✨ Key Features
          </h2>
                      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• <strong>Mouse Wheel Zoom:</strong> Intuitive zoom in/out with mouse wheel</li>
              <li>• <strong>Pan Navigation:</strong> Move mouse to pan when zoomed in</li>
              <li>• <strong>Boundary Constraints:</strong> Image stays within container bounds</li>
              <li>• <strong>Zoom Controls:</strong> Button controls for precise zoom levels</li>
              <li>• <strong>Reset Functionality:</strong> Quick reset to original view</li>
              <li>• <strong>Smooth Transitions:</strong> CSS transitions for fluid animations</li>
              <li>• <strong>Responsive Design:</strong> Works on all screen sizes</li>
              <li>• <strong>Touch Support:</strong> Compatible with touch devices</li>
              <li>• <strong>Performance Optimized:</strong> Efficient rendering with useRef</li>
            </ul>
        </div>
      </div>

      {/* Common Use Cases */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <h2 className="text-xl font-semibold mb-4 text-purple-800 dark:text-purple-200">
            🎯 Common Use Cases
          </h2>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>• <strong>Product Galleries:</strong> Detailed product image viewing</li>
            <li>• <strong>Document Viewers:</strong> PDF and document zoom functionality</li>
            <li>• <strong>Map Applications:</strong> Interactive map zoom and pan</li>
            <li>• <strong>Image Editors:</strong> Photo editing and cropping tools</li>
            <li>• <strong>Medical Imaging:</strong> X-ray and scan viewing applications</li>
            <li>• <strong>Art Galleries:</strong> High-resolution artwork viewing</li>
            <li>• <strong>Real Estate:</strong> Property photo exploration</li>
            <li>• <strong>E-commerce:</strong> Product detail image examination</li>
          </ul>
        </div>
      </div>
    </div>
  );
}