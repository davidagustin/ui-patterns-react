'use client';

import { useState } from 'react';

export default function ThumbnailPattern() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [thumbnailSize, setThumbnailSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [showTooltips, setShowTooltips] = useState(true);
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  const images = [
    { id: 1, title: 'Mountain Landscape', src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMTA5OTgxIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPk1vdW50YWluIExhbmRzY2FwZTwvdGV4dD4KPHN2Zz4K', description: 'Beautiful mountain landscape with snow-capped peaks' },
    { id: 2, title: 'Ocean View', src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMUY4MDNBIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPk9jZWFuIFZpZXc8L3RleHQ+CjxzdmcvPgo=', description: 'Serene ocean view with crystal clear waters' },
    { id: 3, title: 'Forest Path', src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMTY3QTZGRC8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkZvcmVzdCBQYXRoPC90ZXh0Pgo8c3ZnLz4K', description: 'Peaceful forest path surrounded by tall trees' },
    { id: 4, title: 'City Skyline', src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjM0I4MkY2Ii8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkNpdHkgU2t5bGluZTwvdGV4dD4KPHN2Zz4K', description: 'Modern city skyline at sunset' },
    { id: 5, title: 'Desert Dunes', src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjU5RTBCIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkRlc2VydCBEdW5lczwvdGV4dD4KPHN2Zz4K', description: 'Golden sand dunes stretching to the horizon' },
    { id: 6, title: 'Garden Flowers', src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjOEI1Q0Y2Ii8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkdhcmRlbiBGbG93ZXJzPC90ZXh0Pgo8c3ZnLz4K', description: 'Colorful flowers blooming in a garden' },
  ];

  const getSizeClasses = () => {
    switch (thumbnailSize) {
      case 'small': return 'w-16 h-16';
      case 'medium': return 'w-20 h-20';
      case 'large': return 'w-24 h-24';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🖼️ Thumbnail Gallery Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Interactive thumbnail gallery with preview, zoom, and navigation controls for efficient image browsing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            
            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Thumbnail Size
                </label>
                <select
                  value={thumbnailSize}
                  onChange={(e) => setThumbnailSize(e.target.value as 'small' | 'medium' | 'large')}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showTooltips}
                    onChange={(e) => setShowTooltips(e.target.checked)}
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Show Tooltips</span>
                </label>
              </div>
            </div>

            {/* Main Image Display */}
            <div className="relative mb-6">
              <div 
                className={`relative overflow-hidden rounded-lg cursor-zoom-in transition-transform ${isZoomed ? 'transform scale-110' : ''}`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={images[selectedImage].src}
                  alt={images[selectedImage].title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">{images[selectedImage].title}</h3>
                    <p className="text-sm opacity-90">{images[selectedImage].description}</p>
                  </div>
                </div>
                {isZoomed && (
                  <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    Click to zoom out
                  </div>
                )}
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                →
              </button>
            </div>

            {/* Thumbnail Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                Thumbnails ({images.length})
              </h3>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className="relative group"
                    title={showTooltips ? image.title : undefined}
                  >
                    <button
                      onClick={() => setSelectedImage(index)}
                      className={`${getSizeClasses()} rounded-lg overflow-hidden border-2 transition-all hover:shadow-lg ${
                        selectedImage === index
                          ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                          : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                      }`}
                    >
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                      {selectedImage === index && (
                        <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                          <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                            ✓
                          </div>
                        </div>
                      )}
                    </button>
                    
                    {/* Tooltip */}
                    {showTooltips && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        {image.title}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Image Info */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                {images[selectedImage].title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {images[selectedImage].description}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                <span>Image {selectedImage + 1} of {images.length}</span>
                <span>Click thumbnail or use arrows to navigate</span>
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
            <div className="code-block">
              <pre className="text-sm leading-relaxed">
{`import { useState } from 'react';

export default function ThumbnailGallery() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const images = [
    { id: 1, title: 'Mountain Landscape', src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNjZCQjZBIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4Ij5Nb3VudGFpbiBMYW5kc2NhcGU8L3RleHQ+Cjwvc3ZnPgo=' },
    { id: 2, title: 'Ocean View', src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNDA5MEZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4Ij5PY2VhbiBWaWV3PC90ZXh0Pgo8L3N2Zz4K' },
    { id: 3, title: 'Forest Path', src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNDc4QTQyIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4Ij5Gb3Jlc3QgUGF0aDwvdGV4dD4KPHN2Zz4K' },
  ];

  return (
    <div className="space-y-6">
      {/* Main Image Display */}
      <div className="relative">
        <div 
          className="relative overflow-hidden rounded-lg cursor-zoom-in"
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <img
            src={images[selectedImage].src}
            alt={images[selectedImage].title}
            className={\`w-full h-80 object-cover transition-transform \${
              isZoomed ? 'transform scale-110' : ''
            }\`}
          />
          
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity">
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-semibold">
                {images[selectedImage].title}
              </h3>
            </div>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={() => setSelectedImage(prev => 
            prev > 0 ? prev - 1 : images.length - 1
          )}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
        >
          ←
        </button>
        <button
          onClick={() => setSelectedImage(prev => 
            prev < images.length - 1 ? prev + 1 : 0
          )}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
        >
          →
        </button>
      </div>

      {/* Thumbnail Grid */}
      <div className="flex flex-wrap gap-2 justify-center">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(index)}
            className={\`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all hover:shadow-lg \${
              selectedImage === index
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-300 hover:border-blue-300'
            }\`}
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            {selectedImage === index && (
              <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  ✓
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Image Info */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">
          {images[selectedImage].title}
        </h4>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Image {selectedImage + 1} of {images.length}</span>
          <span>Click thumbnail or use arrows to navigate</span>
        </div>
      </div>
    </div>
  );
}`}
              </pre>
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

export default function ThumbnailGallery() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const images = [
    { id: 1, title: 'Mountain Landscape', src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNjZCQjZBIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4Ij5Nb3VudGFpbiBMYW5kc2NhcGU8L3RleHQ+Cjwvc3ZnPgo=' },
    { id: 2, title: 'Ocean View', src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNDA5MEZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4Ij5PY2VhbiBWaWV3PC90ZXh0Pgo8L3N2Zz4K' },
    { id: 3, title: 'Forest Path', src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNDc4QTQyIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4Ij5Gb3Jlc3QgUGF0aDwvdGV4dD4KPHN2Zz4K' }
  ];

  return (
    <div className="thumbnail-gallery">
      {/* Main Image Display */}
      <div className="main-image-container">
        <div 
          className={\`main-image \${isZoomed ? 'zoomed' : ''}\`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <img
            src={images[selectedImage].src}
            alt={images[selectedImage].title}
            className="main-image-img"
          />
          
          {/* Image Overlay */}
          <div className="image-overlay">
            <div className="image-info">
              <h3 className="image-title">
                {images[selectedImage].title}
              </h3>
            </div>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={() => setSelectedImage(prev => 
            prev > 0 ? prev - 1 : images.length - 1
          )}
          className="nav-button nav-prev"
        >
          ←
        </button>
        <button
          onClick={() => setSelectedImage(prev => 
            prev < images.length - 1 ? prev + 1 : 0
          )}
          className="nav-button nav-next"
        >
          →
        </button>
      </div>

      {/* Thumbnail Grid */}
      <div className="thumbnail-grid">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(index)}
            className={\`thumbnail-item \${selectedImage === index ? 'selected' : ''}\`}
          >
            <img
              src={image.src}
              alt={image.title}
              className="thumbnail-img"
            />
            {selectedImage === index && (
              <div className="thumbnail-selected">
                <div className="selected-indicator">✓</div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Image Info */}
      <div className="image-info-panel">
        <h4 className="info-title">
          {images[selectedImage].title}
        </h4>
        <div className="info-meta">
          <span>Image {selectedImage + 1} of {images.length}</span>
        </div>
      </div>
    </div>
  );
}`}
              </pre>
            ) : (
              <pre className="text-sm leading-relaxed">
{`/* Thumbnail Gallery Container */
.thumbnail-gallery {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

/* Main Image Container */
.main-image-container {
  position: relative;
  margin-bottom: 1rem;
}

.main-image {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  cursor: zoom-in;
  transition: transform 0.3s ease;
}

.main-image.zoomed {
  transform: scale(1.1);
  cursor: zoom-out;
}

.main-image-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

/* Image Overlay */
.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.main-image:hover .image-overlay {
  opacity: 1;
}

.image-info {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  color: white;
}

.image-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
}

/* Navigation Buttons */
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 1.25rem;
}

.nav-button:hover {
  background: rgba(0, 0, 0, 0.7);
}

.nav-prev {
  left: 1rem;
}

.nav-next {
  right: 1rem;
}

/* Thumbnail Grid */
.thumbnail-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.thumbnail-item {
  position: relative;
  width: 5rem;
  height: 5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 2px solid #e5e7eb;
  transition: all 0.2s ease;
  cursor: pointer;
  background: none;
}

.thumbnail-item:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.thumbnail-item.selected {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-selected {
  position: absolute;
  inset: 0;
  background: rgba(59, 130, 246, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.selected-indicator {
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Image Info Panel */
.image-info-panel {
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.info-title {
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.info-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #6b7280;
}

/* Controls */
.thumbnail-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.control-select {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background: white;
}

.control-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.control-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.control-checkbox input {
  width: 1rem;
  height: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .thumbnail-gallery {
    padding: 0.5rem;
  }
  
  .main-image-img {
    height: 300px;
  }
  
  .nav-button {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
  }
  
  .thumbnail-item {
    width: 4rem;
    height: 4rem;
  }
  
  .thumbnail-grid {
    gap: 0.25rem;
  }
}

@media (max-width: 480px) {
  .main-image-img {
    height: 250px;
  }
  
  .nav-button {
    width: 2rem;
    height: 2rem;
    font-size: 0.875rem;
  }
  
  .nav-prev {
    left: 0.5rem;
  }
  
  .nav-next {
    right: 0.5rem;
  }
  
  .thumbnail-item {
    width: 3rem;
    height: 3rem;
  }
  
  .thumbnail-controls {
    flex-direction: column;
    gap: 0.75rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .thumbnail-item {
    border-color: #374151;
  }
  
  .thumbnail-item:hover {
    border-color: #60a5fa;
  }
  
  .thumbnail-item.selected {
    border-color: #60a5fa;
    box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.2);
  }
  
  .thumbnail-selected {
    background: rgba(96, 165, 250, 0.2);
  }
  
  .selected-indicator {
    background: #60a5fa;
  }
  
  .image-info-panel {
    background: #1f2937;
    border-color: #374151;
  }
  
  .info-title {
    color: #f9fafb;
  }
  
  .info-meta {
    color: #9ca3af;
  }
  
  .thumbnail-controls {
    background: #1f2937;
    border-color: #374151;
  }
  
  .control-label {
    color: #d1d5db;
  }
  
  .control-select {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
  
  .control-select:focus {
    border-color: #60a5fa;
  }
}`}
              </pre>
            )}
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Interactive Thumbnails</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Click thumbnails to navigate between images</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Zoom Functionality</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Click main image to zoom in/out</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Keyboard Navigation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Arrow keys for quick image browsing</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Responsive Design</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Adapts to different screen sizes</p>
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
            <div className="text-2xl mb-2">📷</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Photo Galleries</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Portfolio and photography websites</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛍️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Product Images</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">E-commerce product galleries</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Image Previews</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">File managers and media browsers</p>
          </div>
        </div>
      </div>
    </div>
  );
}