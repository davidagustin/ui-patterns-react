"use client";

import { useState, useRef, useEffect } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function ImageZoomPattern() {
  const [activeTab, setActiveTab] = useState<"jsx" | "css">("jsx");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Zoom controls
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.25 : 0.25;
    const newZoom = Math.max(0.5, Math.min(3, zoomLevel + delta));
    setZoomLevel(newZoom);
  };

  // Mouse drag handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // Calculate boundaries based on zoom level
      const maxX = (zoomLevel - 1) * 100;
      const maxY = (zoomLevel - 1) * 100;

      setPosition({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY)),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Reset position when zoom level changes
  useEffect(() => {
    if (zoomLevel <= 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [zoomLevel]);

  // Prevent text selection during drag
  useEffect(() => {
    if (isDragging) {
      document.body.style.userSelect = "none";
    } else {
      document.body.style.userSelect = "";
    }

    return () => {
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🔍 Image Zoom Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Interactive image zoom functionality with mouse controls, wheel zoom,
          and smooth transitions.
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
              Use the zoom controls or mouse wheel to zoom in/out. Click and
              drag to pan when zoomed in.
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
                Zoom Level: {zoomLevel.toFixed(2)}x
              </div>

              {/* Image Container */}
              <div
                ref={containerRef}
                className="relative w-full h-80 overflow-hidden border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800"
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img
                  ref={imageRef}
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center"
                  alt="Zoomable Image"
                  className="w-full h-full object-cover transition-transform duration-200 ease-out"
                  style={{
                    transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
                    cursor:
                      zoomLevel > 1
                        ? isDragging
                          ? "grabbing"
                          : "grab"
                        : "default",
                    transformOrigin: "center center",
                  }}
                  draggable={false}
                />

                {/* Zoom indicator */}
                {zoomLevel > 1 && (
                  <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    {zoomLevel.toFixed(1)}x
                  </div>
                )}
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

            {/* Tab Content */}
            <div className="code-block">
              <DynamicCodeExample componentName="image-zoom" />
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
            <li>
              • <strong>Mouse Wheel Zoom:</strong> Intuitive zoom in/out with
              mouse wheel
            </li>
            <li>
              • <strong>Click & Drag Pan:</strong> Click and drag to pan when
              zoomed in
            </li>
            <li>
              • <strong>Boundary Constraints:</strong> Image stays within
              container bounds
            </li>
            <li>
              • <strong>Zoom Controls:</strong> Button controls for precise zoom
              levels
            </li>
            <li>
              • <strong>Reset Functionality:</strong> Quick reset to original
              view
            </li>
            <li>
              • <strong>Smooth Transitions:</strong> CSS transitions for fluid
              animations
            </li>
            <li>
              • <strong>Responsive Design:</strong> Works on all screen sizes
            </li>
            <li>
              • <strong>Performance Optimized:</strong> Efficient rendering with
              useRef
            </li>
            <li>
              • <strong>Proper Cursor Feedback:</strong> Grab/grabbing cursors
              for better UX
            </li>
            <li>
              • <strong>True Runtime Code Generation:</strong> Code example
              extracted from actual source files
            </li>
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
            <li>
              • <strong>Product Galleries:</strong> Detailed product image
              viewing
            </li>
            <li>
              • <strong>Document Viewers:</strong> PDF and document zoom
              functionality
            </li>
            <li>
              • <strong>Map Applications:</strong> Interactive map zoom and pan
            </li>
            <li>
              • <strong>Image Editors:</strong> Photo editing and cropping tools
            </li>
            <li>
              • <strong>Medical Imaging:</strong> X-ray and scan viewing
              applications
            </li>
            <li>
              • <strong>Art Galleries:</strong> High-resolution artwork viewing
            </li>
            <li>
              • <strong>Real Estate:</strong> Property photo exploration
            </li>
            <li>
              • <strong>E-commerce:</strong> Product detail image examination
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
