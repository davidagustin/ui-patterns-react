'use client';

import { useState } from 'react';
import { DynamicCodeExample } from '../../../components/shared/CodeGenerator';

export default function ImageGalleryPattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentFilter, setCurrentFilter] = useState('all');

  const images = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
      alt: 'Mountain landscape',
      category: 'nature',
      title: 'Mountain Vista'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop&crop=center',
      alt: 'Forest path',
      category: 'nature',
      title: 'Forest Path'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&crop=center',
      alt: 'City skyline',
      category: 'urban',
      title: 'City Skyline'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&crop=center',
      alt: 'Ocean waves',
      category: 'nature',
      title: 'Ocean Waves'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=300&fit=crop&crop=center',
      alt: 'Night city',
      category: 'urban',
      title: 'Night City'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center',
      alt: 'Abstract art',
      category: 'art',
      title: 'Abstract Art'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
      alt: 'Desert landscape',
      category: 'nature',
      title: 'Desert Landscape'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop&crop=center',
      alt: 'Modern architecture',
      category: 'urban',
      title: 'Modern Architecture'
    }
  ];

  const filters = [
    { key: 'all', label: 'All', count: images.length },
    { key: 'nature', label: 'Nature', count: images.filter(img => img.category === 'nature').length },
    { key: 'urban', label: 'Urban', count: images.filter(img => img.category === 'urban').length },
    { key: 'art', label: 'Art', count: images.filter(img => img.category === 'art').length }
  ];

  const filteredImages = currentFilter === 'all' 
    ? images 
    : images.filter(img => img.category === currentFilter);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const previousImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage !== null) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        previousImage();
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🖼️ Image Gallery Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Responsive image grid with filtering, lightbox view, and keyboard navigation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            
            <div className="space-y-6">
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setCurrentFilter(filter.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentFilter === filter.key
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="group relative aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-end">
                      <div className="w-full p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                        <h3 className="font-medium text-sm">{image.title}</h3>
                        <p className="text-xs opacity-90 capitalize">{image.category}</p>
                      </div>
                    </div>

                    {/* Zoom Icon */}
                    <div className="absolute top-2 right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">🔍</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {filteredImages.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📷</div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                    No images found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try selecting a different category
                  </p>
                </div>
              )}
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
                componentName="image-gallery" 
                activeTab={activeTab} 
              />
              }
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-4xl max-h-full p-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={filteredImages[selectedImage].src}
              alt={filteredImages[selectedImage].alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              ×
            </button>
            
            {/* Navigation Buttons */}
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              ←
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              →
            </button>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
              <h3 className="font-medium">{filteredImages[selectedImage].title}</h3>
              <p className="text-sm opacity-90 capitalize">{filteredImages[selectedImage].category}</p>
              <p className="text-xs opacity-75 mt-1">
                {selectedImage + 1} of {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Key Features */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold mb-4 text-green-800 dark:text-green-200">
          ✨ Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Responsive Grid</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Adaptive layout that works on all screen sizes</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Category Filtering</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Filter images by categories with counts</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Lightbox View</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Full-screen image viewer with navigation</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Keyboard Navigation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Arrow keys and escape for lightbox control</p>
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
            <div className="text-2xl mb-2">📸</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Photo Portfolios</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Photographer and artist portfolios</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🏠</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Real Estate</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Property listing image galleries</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛍️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Product Galleries</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">E-commerce product image displays</p>
          </div>
        </div>
      </div>
    </div>
  );
}
