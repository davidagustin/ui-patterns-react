"use client";

import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function ThumbnailPattern() {
  const [activeTab, setActiveTab] = useState<"jsx" | "css">("jsx");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [thumbnailSize, setThumbnailSize] = useState<
    "small" | "medium" | "large"
  >("medium");
  const [showTooltips, setShowTooltips] = useState(true);

  const images = [
    {
      id: 1,
      title: "Mountain Landscape",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      fallback: "https://picsum.photos/800/600?random=1",
      description: "Beautiful mountain landscape with snow-capped peaks",
    },
    {
      id: 2,
      title: "Ocean View",
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      fallback: "https://picsum.photos/800/600?random=2",
      description: "Serene ocean view with crystal clear waters",
    },
    {
      id: 3,
      title: "Forest Path",
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      fallback: "https://picsum.photos/800/600?random=3",
      description: "Peaceful forest path surrounded by tall trees",
    },
    {
      id: 4,
      title: "City Skyline",
      src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      fallback: "https://picsum.photos/800/600?random=4",
      description: "Modern city skyline at sunset",
    },
    {
      id: 5,
      title: "Desert Dunes",
      src: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop",
      fallback: "https://picsum.photos/800/600?random=5",
      description: "Golden sand dunes stretching to the horizon",
    },
    {
      id: 6,
      title: "Garden Flowers",
      src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop",
      fallback: "https://picsum.photos/800/600?random=6",
      description: "Colorful flowers blooming in a garden",
    },
  ];

  const getSizeClasses = () => {
    switch (thumbnailSize) {
      case "small":
        return "w-16 h-16";
      case "medium":
        return "w-20 h-20";
      case "large":
        return "w-24 h-24";
    }
  };

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    fallbackUrl: string,
  ) => {
    event.currentTarget.src = fallbackUrl;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🖼️ Thumbnail Gallery Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Interactive thumbnail gallery with preview, zoom, and navigation
          controls for efficient image browsing.
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
              Browse through the image gallery. Use the controls to adjust
              thumbnail size and toggle tooltips. Click on thumbnails or use
              navigation arrows to view different images.
            </p>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Thumbnail Size
                </label>
                <select
                  value={thumbnailSize}
                  onChange={(e) =>
                    setThumbnailSize(
                      e.target.value as "small" | "medium" | "large",
                    )
                  }
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
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Show Tooltips
                  </span>
                </label>
              </div>
            </div>

            {/* Main Image Display */}
            <div className="relative mb-6">
              <div
                className={`relative overflow-hidden rounded-lg cursor-zoom-in transition-transform ${isZoomed ? "transform scale-110" : ""}`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={images[selectedImage].src}
                  alt={images[selectedImage].title}
                  onError={(e) =>
                    handleImageError(e, images[selectedImage].fallback)
                  }
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">
                      {images[selectedImage].title}
                    </h3>
                    <p className="text-sm opacity-90">
                      {images[selectedImage].description}
                    </p>
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
                onClick={() =>
                  setSelectedImage((prev) =>
                    prev > 0 ? prev - 1 : images.length - 1,
                  )
                }
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                ←
              </button>
              <button
                onClick={() =>
                  setSelectedImage((prev) =>
                    prev < images.length - 1 ? prev + 1 : 0,
                  )
                }
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
                          ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                          : "border-gray-300 dark:border-gray-600 hover:border-blue-300"
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
                <span>
                  Image {selectedImage + 1} of {images.length}
                </span>
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
              {
                <DynamicCodeExample
                  componentName="thumbnail"
                  activeTab={activeTab}
                />
              }
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
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Interactive Thumbnails
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click thumbnails to navigate between images
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Zoom Functionality
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click main image to zoom in/out
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Keyboard Navigation
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Arrow keys for quick image browsing
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Responsive Design
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Adapts to different screen sizes
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
            <div className="text-2xl mb-2">📷</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Photo Galleries
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Portfolio and photography websites
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛍️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Product Images
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              E-commerce product galleries
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Image Previews
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              File managers and media browsers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
