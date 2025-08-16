'use client';

import { useState } from 'react';

export default function ThumbnailPattern() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [thumbnailSize, setThumbnailSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [showTooltips, setShowTooltips] = useState(true);
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  const images = [
    { 
      id: 1, 
      title: 'Mountain Landscape', 
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      fallback: 'https://picsum.photos/800/600?random=1',
      description: 'Beautiful mountain landscape with snow-capped peaks' 
    },
    { 
      id: 2, 
      title: 'Ocean View', 
      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
      fallback: 'https://picsum.photos/800/600?random=2',
      description: 'Serene ocean view with crystal clear waters' 
    },
    { 
      id: 3, 
      title: 'Forest Path', 
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      fallback: 'https://picsum.photos/800/600?random=3',
      description: 'Peaceful forest path surrounded by tall trees' 
    },
    { 
      id: 4, 
      title: 'City Skyline', 
      src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
      fallback: 'https://picsum.photos/800/600?random=4',
      description: 'Modern city skyline at sunset' 
    },
    { 
      id: 5, 
      title: 'Desert Dunes', 
      src: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop',
      fallback: 'https://picsum.photos/800/600?random=5',
      description: 'Golden sand dunes stretching to the horizon' 
    },
    { 
      id: 6, 
      title: 'Garden Flowers', 
      src: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop',
      fallback: 'https://picsum.photos/800/600?random=6',
      description: 'Colorful flowers blooming in a garden' 
    },
  ];

  const getSizeClasses = () => {
    switch (thumbnailSize) {
      case 'small': return 'w-16 h-16';
      case 'medium': return 'w-20 h-20';
      case 'large': return 'w-24 h-24';
    }
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>, fallbackUrl: string) => {
    event.currentTarget.src = fallbackUrl;
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
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Browse through the image gallery. Use the controls to adjust thumbnail size and toggle tooltips. Click on thumbnails or use navigation arrows to view different images.
            </p>
            
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
                  onError={(e) => handleImageError(e, images[selectedImage].fallback)}
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
                        onError={(e) => handleImageError(e, image.fallback)}
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
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10 transition-opacity">
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

            <div className="code-block">
              {activeTab === 'jsx' ? (
                <pre className="text-sm leading-relaxed">
{`import { useState } from 'react';

export default function ThumbnailGallery() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [thumbnailSize, setThumbnailSize] = useState('medium');
  const [showTooltips, setShowTooltips] = useState(true);

  const images = [
    {
      id: 1,
      title: 'Mountain Landscape',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      fallback: 'https://picsum.photos/800/600?random=1',
      description: 'Beautiful mountain landscape with snow-capped peaks'
    },
    {
      id: 2,
      title: 'Ocean View',
      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
      fallback: 'https://picsum.photos/800/600?random=2',
      description: 'Serene ocean view with crystal clear waters'
    },
    {
      id: 3,
      title: 'Forest Path',
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      fallback: 'https://picsum.photos/800/600?random=3',
      description: 'Peaceful forest path surrounded by tall trees'
    },
    {
      id: 4,
      title: 'City Skyline',
      src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
      fallback: 'https://picsum.photos/800/600?random=4',
      description: 'Modern city skyline at sunset'
    },
    {
      id: 5,
      title: 'Desert Dunes',
      src: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop',
      fallback: 'https://picsum.photos/800/600?random=5',
      description: 'Golden sand dunes stretching to the horizon'
    },
    {
      id: 6,
      title: 'Garden Flowers',
      src: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop',
      fallback: 'https://picsum.photos/800/600?random=6',
      description: 'Colorful flowers blooming in a garden'
    },
  ];

  const getSizeClasses = () => {
    switch (thumbnailSize) {
      case 'small': return 'w-16 h-16';
      case 'medium': return 'w-20 h-20';
      case 'large': return 'w-24 h-24';
    }
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>, fallbackUrl: string) => {
    event.currentTarget.src = fallbackUrl;
  };

  return (
    <div className="thumbnail-gallery">
      {/* Controls */}
      <div className="gallery-controls">
        <select
          value={thumbnailSize}
          onChange={(e) => setThumbnailSize(e.target.value as 'small' | 'medium' | 'large')}
          className="size-selector"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        
        <label className="tooltip-toggle">
          <input
            type="checkbox"
            checked={showTooltips}
            onChange={(e) => setShowTooltips(e.target.checked)}
          />
          Show Tooltips
        </label>
      </div>

      {/* Main Image Display */}
      <div className="main-image-container">
        <div 
          className={\`main-image \${isZoomed ? 'zoomed' : ''}\`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <img
            src={images[selectedImage].src}
            alt={images[selectedImage].title}
            onError={(e) => handleImageError(e, images[selectedImage].fallback)}
            className="main-image-img"
          />
          <div className="image-overlay">
            <h3>{images[selectedImage].title}</h3>
            <p>{images[selectedImage].description}</p>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1)}
          className="nav-arrow nav-prev"
        >
          ←
        </button>
        <button
          onClick={() => setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0)}
          className="nav-arrow nav-next"
        >
          →
        </button>
      </div>

      {/* Thumbnail Grid */}
      <div className="thumbnail-grid">
        <h3>Thumbnails ({images.length})</h3>
        <div className="thumbnails-container">
          {images.map((image, index) => (
            <div key={image.id} className="thumbnail-wrapper">
              <button
                onClick={() => setSelectedImage(index)}
                className={\`thumbnail \${selectedImage === index ? 'selected' : ''}\`}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  onError={(e) => handleImageError(e, image.fallback)}
                  className="thumbnail-img"
                />
                {selectedImage === index && (
                  <div className="selected-indicator">✓</div>
                )}
              </button>
              
              {showTooltips && (
                <div className="thumbnail-tooltip">
                  {image.title}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Image Info */}
      <div className="image-info">
        <h4>{images[selectedImage].title}</h4>
        <p>{images[selectedImage].description}</p>
        <div className="image-meta">
          <span>Image {selectedImage + 1} of {images.length}</span>
          <span>Click thumbnail or use arrows to navigate</span>
        </div>
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Thumbnail Gallery Styles */

.thumbnail-gallery {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

/* Controls */
.gallery-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.size-selector {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  font-size: 0.875rem;
  min-width: 120px;
}

.tooltip-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
}

.tooltip-toggle input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #d1d5db;
}

/* Main Image Display */
.main-image-container {
  position: relative;
  margin-bottom: 1.5rem;
}

.main-image {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  cursor: zoom-in;
  transition: transform 0.2s ease;
}

.main-image.zoomed {
  transform: scale(1.1);
}

.main-image-img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  display: block;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
  opacity: 0;
  transition: opacity 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  color: white;
}

.main-image:hover .image-overlay {
  opacity: 1;
}

.image-overlay h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.image-overlay p {
  font-size: 0.875rem;
  opacity: 0.9;
}

/* Navigation Arrows */
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-arrow:hover {
  background: rgba(0,0,0,0.7);
}

.nav-prev {
  left: 0.5rem;
}

.nav-next {
  right: 0.5rem;
}

/* Thumbnail Grid */
.thumbnail-grid {
  margin-bottom: 1.5rem;
}

.thumbnail-grid h3 {
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #374151;
}

.thumbnails-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.thumbnail-wrapper {
  position: relative;
}

.thumbnail {
  border: 2px solid #d1d5db;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  background: none;
  padding: 0;
  position: relative;
}

.thumbnail.selected {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.thumbnail:hover {
  border-color: #93c5fd;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.selected-indicator {
  position: absolute;
  inset: 0;
  background: rgba(59, 130, 246, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.selected-indicator::before {
  content: '✓';
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
}

/* Thumbnail Sizes */
.thumbnail.small {
  width: 4rem;
  height: 4rem;
}

.thumbnail.medium {
  width: 5rem;
  height: 5rem;
}

.thumbnail.large {
  width: 6rem;
  height: 6rem;
}

/* Tooltips */
.thumbnail-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: black;
  color: white;
  font-size: 0.75rem;
  border-radius: 0.25rem;
  opacity: 0;
  pointer-events: none;
  white-space: nowrap;
  z-index: 10;
  transition: opacity 0.2s ease;
}

.thumbnail-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: black;
}

.thumbnail-wrapper:hover .thumbnail-tooltip {
  opacity: 1;
}

/* Image Info */
.image-info {
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.image-info h4 {
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #374151;
}

.image-info p {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.image-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #9ca3af;
}

/* Responsive Design */
@media (max-width: 768px) {
  .gallery-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .size-selector {
    min-width: auto;
  }
  
  .thumbnails-container {
    justify-content: flex-start;
  }
  
  .image-meta {
    flex-direction: column;
    gap: 0.25rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .size-selector {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
  
  .thumbnail-grid h3 {
    color: #f9fafb;
  }
  
  .thumbnail {
    border-color: #4b5563;
  }
  
  .thumbnail:hover {
    border-color: #60a5fa;
  }
  
  .image-info {
    background: #374151;
    border-color: #4b5563;
  }
  
  .image-info h4 {
    color: #f9fafb;
  }
  
  .image-info p {
    color: #d1d5db;
  }
  
  .image-meta {
    color: #9ca3af;
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