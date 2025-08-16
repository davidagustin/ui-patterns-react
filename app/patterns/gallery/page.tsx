"use client";

import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function GalleryPattern() {
  const [activeTab, setActiveTab] = useState<"jsx" | "css">("jsx");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const [brokenImages, setBrokenImages] = useState<Set<number>>(new Set());

  const handleImageError = (imageId: number) => {
    setBrokenImages((prev) => new Set(prev).add(imageId));
  };

  const images = [
    {
      id: 1,
      src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNjZCQjZBIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4Ij5Nb3VudGFpbiBWaWV3PC90ZXh0Pgo8L3N2Zz4K",
      title: "Mountain View",
      category: "nature",
      alt: "Beautiful mountain landscape",
    },
    {
      id: 2,
      src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNDA5MEZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4Ij5PY2VhbiBXYXZlczwvdGV4dD4KPC9zdmc+",
      title: "Ocean Waves",
      category: "nature",
      alt: "Ocean waves crashing on shore",
    },
    {
      id: 3,
      src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjOTMzM0VBIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4Ij5DaXR5IFNreWxpbmU8L3RleHQ+Cjwvc3ZnPgo=",
      title: "City Skyline",
      category: "urban",
      alt: "Modern city skyline at sunset",
    },
    {
      id: 4,
      src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjU5RTBCIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4Ij5EZXNlcnQgU3Vuc2V0PC90ZXh0Pgo8L3N2Zz4K",
      title: "Desert Sunset",
      category: "nature",
      alt: "Beautiful desert sunset",
    },
    {
      id: 5,
      src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNDc4QTQyIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4Ij5Gb3Jlc3QgUGF0aDwvdGV4dD4KPC9zdmc+",
      title: "Forest Path",
      category: "nature",
      alt: "Peaceful forest path",
    },
    {
      id: 6,
      src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRUY0NDQ0Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4Ij5TdHJlZXQgQXJ0PC90ZXh0Pgo8L3N2Zz4K",
      title: "Street Art",
      category: "urban",
      alt: "Colorful street art mural",
    },
  ];

  const categories = ["all", "nature", "urban"];

  const filteredImages =
    filterCategory === "all"
      ? images
      : images.filter((img) => img.category === filterCategory);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🖼️ Gallery Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Display collections of images with filtering, grid layouts, and
          lightbox preview functionality for optimal browsing experience.
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
              Filter images by category and click any image to view it in a
              lightbox modal.
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filterCategory === category
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)} (
                  {category === "all"
                    ? images.length
                    : images.filter((img) => img.category === category).length}
                  )
                </button>
              ))}
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  onClick={() => setSelectedImage(image.id)}
                  className="relative group cursor-pointer overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 aspect-square hover:shadow-lg transition-all duration-300"
                >
                  {brokenImages.has(image.id) ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-700 p-4">
                      <div className="text-gray-400 dark:text-gray-500 text-2xl mb-2">
                        🖼️
                      </div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs text-center">
                        <div className="font-medium mb-1">
                          Image Unavailable
                        </div>
                        <div className="text-gray-400 dark:text-gray-500">
                          {image.title}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                      onError={() => handleImageError(image.id)}
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                      🔍 View
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 sm:p-3">
                    <h3 className="text-white text-xs sm:text-sm font-medium truncate">
                      {image.title}
                    </h3>
                  </div>
                </div>
              ))}
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
              {
                <DynamicCodeExample
                  componentName="gallery"
                  activeTab={activeTab}
                />
              }
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999] cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={images.find((img) => img.id === selectedImage)?.src}
            alt={images.find((img) => img.id === selectedImage)?.alt}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white text-2xl w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors z-10"
          >
            ×
          </button>
        </div>
      )}

      {/* Key Features */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold mb-4 text-green-800 dark:text-green-200">
          ✨ Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Category Filtering
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Filter images by category with live count
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Responsive Grid
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Auto-adjusting grid layout for all screen sizes
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Lightbox Preview
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Full-screen image viewing with overlay
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Hover Effects
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Smooth animations and zoom effects
              </p>
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
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Photo Portfolios
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showcase photography work
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🏢</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Product Catalogs
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Display product images
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🎨</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Art Collections
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Curate artwork displays
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
