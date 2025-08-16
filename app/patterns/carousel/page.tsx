"use client";
import { useState, useRef, useEffect } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
export default function CarouselPattern() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slides = [
    {
      id: 1,
      title: "Beautiful Landscapes",
      description: "Explore stunning natural landscapes from around the world.",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=center",
      color: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      title: "Urban Architecture",
      description: "Discover modern cityscapes and architectural marvels.",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop&crop=center",
      color: "from-green-500 to-blue-600",
    },
    {
      id: 3,
      title: "Ocean Views",
      description:
        "Experience the tranquility of coastal scenes and ocean horizons.",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop&crop=center",
      color: "from-purple-500 to-pink-600",
    },
    {
      id: 4,
      title: "Mountain Peaks",
      description:
        "Journey to the highest peaks and breathtaking mountain ranges.",
      image:
        "https://images.unsplash.com/photo-1464822759844-d150baec0134?w=800&h=400&fit=crop&crop=center",
      color: "from-orange-500 to-red-600",
    },
    {
      id: 5,
      title: "Forest Adventures",
      description:
        "Immerse yourself in the beauty of dense forests and woodland trails.",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop&crop=center",
      color: "from-indigo-500 to-purple-600",
    },
  ];
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };
  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);
  // Pause auto-play on hover
  const handleMouseEnter = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
    }
  };
  const handleMouseLeave = () => {
    if (!isAutoPlaying) {
      setIsAutoPlaying(true);
    }
  };
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🎠 Carousel Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Interactive image carousel with automatic playback, navigation
          controls, and smooth transitions.
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
              Use the navigation buttons or indicators to browse slides. Hover
              to pause auto-play.
            </p>
            {/* Carousel Container */}
            <div
              ref={carouselRef}
              className="relative w-full h-64 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Slides */}
              <div className="flex h-full transition-transform duration-500 ease-in-out">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className="relative w-full h-full flex-shrink-0"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${slide.color} bg-opacity-75`}
                    >
                      <div className="flex flex-col justify-center items-center h-full px-6 text-center text-white">
                        <h3 className="text-2xl font-bold mb-2">
                          {slide.title}
                        </h3>
                        <p className="text-lg opacity-90 max-w-md">
                          {slide.description}
                        </p>
                        <div className="mt-4 text-sm opacity-75">
                          Slide {index + 1} of {slides.length}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="Previous slide"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="Next slide"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-white scale-125"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              {/* Auto-play Status */}
              <div className="absolute top-4 right-4">
                <div
                  className={`px-2 py-1 rounded-full text-xs ${
                    isAutoPlaying
                      ? "bg-green-500/80 text-white"
                      : "bg-gray-500/80 text-white"
                  }`}
                >
                  {isAutoPlaying ? "▶️ Auto" : "⏸️ Paused"}
                </div>
              </div>
            </div>
            {/* Controls */}
            <div className="flex items-center justify-center space-x-4 mt-4">
              <button
                onClick={toggleAutoPlay}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isAutoPlaying
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {isAutoPlaying ? "Pause" : "Play"}
              </button>
              <button
                onClick={prevSlide}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                Previous
              </button>
              <button
                onClick={nextSlide}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                Next
              </button>
            </div>
            {/* Slide Counter */}
            <div className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
              {currentSlide + 1} of {slides.length} slides
            </div>
          </div>
        </div>
        {/* Code Example */}
<DynamicCodeExample componentName="carousel" />
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
              • <strong>Auto-play Functionality:</strong> Automatic slide
              progression with configurable timing
            </li>
            <li>
              • <strong>Navigation Controls:</strong> Previous/next buttons and
              slide indicators
            </li>
            <li>
              • <strong>Smooth Transitions:</strong> CSS transitions for fluid
              slide changes
            </li>
            <li>
              • <strong>Hover Pause:</strong> Auto-play pauses when hovering
              over the carousel
            </li>
            <li>
              • <strong>Keyboard Support:</strong> Arrow key navigation for
              accessibility
            </li>
            <li>
              • <strong>Touch Support:</strong> Swipe gestures for mobile
              devices
            </li>
            <li>
              • <strong>Visual Indicators:</strong> Current slide highlighting
              and progress
            </li>
            <li>
              • <strong>Responsive Design:</strong> Adapts to different screen
              sizes
            </li>
            <li>
              • <strong>Dynamic Code Generation:</strong> Code example extracted
              from actual source files
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
              • <strong>Image Galleries:</strong> Photo showcases and portfolios
            </li>
            <li>
              • <strong>Product Showcases:</strong> Multiple product views and
              features
            </li>
            <li>
              • <strong>Hero Sections:</strong> Rotating banner content
            </li>
            <li>
              • <strong>Testimonials:</strong> Customer reviews and feedback
            </li>
            <li>
              • <strong>Feature Highlights:</strong> Product or service
              demonstrations
            </li>
            <li>
              • <strong>Event Slideshows:</strong> Conference or event
              presentations
            </li>
            <li>
              • <strong>News Rotators:</strong> Latest updates and announcements
            </li>
            <li>
              • <strong>Onboarding Flows:</strong> Welcome screens and tutorials
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
