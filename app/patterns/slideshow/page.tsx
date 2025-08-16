"use client";

import { useState, useEffect } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function SlideshowPattern() {
  const [activeTab, setActiveTab] = useState<"jsx" | "css">("jsx");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const slides = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop&crop=center",
      title: "Beautiful Mountain View",
      description:
        "Majestic peaks reaching towards the sky, a breathtaking natural wonder.",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=450&fit=crop&crop=center",
      title: "Serene Ocean Waves",
      description:
        "Endless blue horizons where sky meets sea in perfect harmony.",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=450&fit=crop&crop=center",
      title: "Vibrant City Lights",
      description:
        "Urban energy illuminated against the night sky, a symphony of lights.",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop&crop=center",
      title: "Glorious Sunset",
      description: "Golden hour painting the world in warm, enchanting colors.",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop&crop=center",
      title: "Tranquil Forest",
      description:
        "Peaceful woodland paths inviting quiet contemplation and wonder.",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🎭 Slideshow Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Present images in a sequential, auto-advancing format with navigation
          controls for engaging visual storytelling.
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
              Navigate through slides using arrows, dots, or auto-play. Click
              play/pause to control automatic advancement.
            </p>

            {/* Slideshow Container */}
            <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
              {/* Main Slide Display */}
              <div className="relative h-full">
                <img
                  src={slides[currentSlide].src}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover"
                />

                {/* Slide Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-white text-xl font-bold mb-2">
                    {slides[currentSlide].title}
                  </h3>
                  <p className="text-gray-200 text-sm">
                    {slides[currentSlide].description}
                  </p>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  →
                </button>

                {/* Slide Counter */}
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentSlide + 1} / {slides.length}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div
                  className="h-full bg-white transition-all duration-1000 ease-linear"
                  style={{
                    width: isPlaying
                      ? "100%"
                      : `${((currentSlide + 1) / slides.length) * 100}%`,
                    transitionDuration: isPlaying ? "4000ms" : "300ms",
                  }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-4">
              {/* Dot Indicators */}
              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide
                        ? "bg-blue-500"
                        : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>

              {/* Play/Pause Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isPlaying
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {isPlaying ? "⏸️ Pause" : "▶️ Play"}
              </button>
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
                  componentName="slideshow"
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
                Auto-Play Mode
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatic slide advancement with play/pause controls
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Navigation Controls
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Arrow buttons and dot indicators for manual control
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Content Overlay
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Title and description overlays on images
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Progress Indicator
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Visual progress bar and slide counter
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
            <div className="text-2xl mb-2">🏢</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Product Showcases
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Highlight product features and benefits
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📖</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Hero Sections
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Engaging homepage banners
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🎨</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Portfolio Presentations
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showcase creative work dynamically
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
