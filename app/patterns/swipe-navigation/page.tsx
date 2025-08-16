"use client";

import { useState, useRef, useEffect } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function SwipeNavigationPattern() {
  const [currentPage, setCurrentPage] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [activeTab, setActiveTab] = useState<"jsx" | "css">("jsx");

  const containerRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<HTMLDivElement>(null);

  const pages = [
    {
      id: 1,
      title: "Welcome to Our App",
      description: "Discover amazing features and start your journey with us.",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center",
      color: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      title: "Smart Features",
      description:
        "Intelligent tools that adapt to your needs and preferences.",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&crop=center",
      color: "from-green-500 to-blue-600",
    },
    {
      id: 3,
      title: "Seamless Experience",
      description:
        "Smooth interactions and intuitive design for the best user experience.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
      color: "from-purple-500 to-pink-600",
    },
    {
      id: 4,
      title: "Powerful Analytics",
      description:
        "Get insights and track your progress with detailed analytics.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
      color: "from-orange-500 to-red-600",
    },
    {
      id: 5,
      title: "Ready to Start",
      description:
        "Everything is set up. Begin your journey and explore the possibilities.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center",
      color: "from-indigo-500 to-purple-600",
    },
  ];

  const containerWidth = containerRef.current?.offsetWidth || 0;

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const newCurrentX = e.touches[0].clientX;
    setCurrentX(newCurrentX);

    const diff = newCurrentX - startX;
    const newTranslateX = currentPage * -containerWidth + diff;

    // Limit the translation
    const maxTranslateX = 0;
    const minTranslateX = -(pages.length - 1) * containerWidth;

    setTranslateX(
      Math.max(minTranslateX, Math.min(maxTranslateX, newTranslateX)),
    );
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const diff = currentX - startX;
    const threshold = containerWidth * 0.3; // 30% threshold

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentPage > 0) {
        // Swipe right - go to previous page
        goToPage(currentPage - 1);
      } else if (diff < 0 && currentPage < pages.length - 1) {
        // Swipe left - go to next page
        goToPage(currentPage + 1);
      } else {
        // Reset to current page
        setTranslateX(currentPage * -containerWidth);
      }
    } else {
      // Reset to current page
      setTranslateX(currentPage * -containerWidth);
    }

    setIsDragging(false);
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const newCurrentX = e.clientX;
    setCurrentX(newCurrentX);

    const diff = newCurrentX - startX;
    const newTranslateX = currentPage * -containerWidth + diff;

    // Limit the translation
    const maxTranslateX = 0;
    const minTranslateX = -(pages.length - 1) * containerWidth;

    setTranslateX(
      Math.max(minTranslateX, Math.min(maxTranslateX, newTranslateX)),
    );
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const diff = currentX - startX;
    const threshold = containerWidth * 0.3; // 30% threshold

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentPage > 0) {
        // Swipe right - go to previous page
        goToPage(currentPage - 1);
      } else if (diff < 0 && currentPage < pages.length - 1) {
        // Swipe left - go to next page
        goToPage(currentPage + 1);
      } else {
        // Reset to current page
        setTranslateX(currentPage * -containerWidth);
      }
    } else {
      // Reset to current page
      setTranslateX(currentPage * -containerWidth);
    }

    setIsDragging(false);
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    setTranslateX(pageIndex * -containerWidth);
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  };

  // Sync translateX with currentPage when not dragging
  useEffect(() => {
    if (!isDragging) {
      setTranslateX(currentPage * -containerWidth);
    }
  }, [currentPage, isDragging, containerWidth]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevPage();
      } else if (e.key === "ArrowRight") {
        nextPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📱 Swipe Navigation Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Intuitive swipe gestures for navigating between pages with smooth
          animations and visual feedback.
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
              Swipe left or right to navigate between pages. You can also use
              the navigation buttons or keyboard arrows.
            </p>

            {/* Swipe Container */}
            <div
              ref={containerRef}
              className="relative w-full h-80 overflow-hidden rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800"
              style={{ userSelect: isDragging ? "none" : "auto" }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Pages Container */}
              <div
                ref={pagesRef}
                className="flex h-full transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(${translateX}px)`,
                  width: `${pages.length * 100}%`,
                }}
              >
                {pages.map((page, index) => (
                  <div
                    key={page.id}
                    className="relative w-full h-full flex-shrink-0"
                    style={{ width: `${100 / pages.length}%` }}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 opacity-30">
                      <img
                        src={page.image}
                        alt={page.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${page.color} bg-opacity-90`}
                    >
                      <div className="flex flex-col justify-center items-center h-full px-4 text-center text-white">
                        <h3 className="text-2xl font-bold mb-4">
                          {page.title}
                        </h3>
                        <p className="text-lg opacity-90 max-w-md">
                          {page.description}
                        </p>
                        <div className="mt-6 text-sm opacity-75">
                          Page {index + 1} of {pages.length}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                onClick={nextPage}
                disabled={currentPage === pages.length - 1}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center space-x-2 mt-4">
              {pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentPage
                      ? "bg-blue-600 scale-125"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>

            {/* Swipe Progress */}
            <div className="mt-4 text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Swipe Progress:{" "}
                {Math.round(
                  (Math.abs(translateX) /
                    (containerWidth * (pages.length - 1))) *
                    100,
                )}
                %
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
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
              <button
                onClick={() => setActiveTab("jsx")}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === "jsx"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
                JSX
              </button>
              <button
                onClick={() => setActiveTab("css")}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === "css"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
                CSS
              </button>
            </div>

            {/* Tab Content */}
            <div className="code-block">
              <DynamicCodeExample componentName="swipe-navigation" />
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
              • <strong>Touch & Mouse Support:</strong> Works on both touch
              devices and desktop
            </li>
            <li>
              • <strong>Smooth Animations:</strong> CSS transitions for fluid
              page changes
            </li>
            <li>
              • <strong>Threshold-based Swiping:</strong> 30% threshold for page
              changes
            </li>
            <li>
              • <strong>Boundary Constraints:</strong> Prevents over-swiping
              beyond limits
            </li>
            <li>
              • <strong>Visual Feedback:</strong> Progress indicators and
              navigation buttons
            </li>
            <li>
              • <strong>Keyboard Navigation:</strong> Arrow keys for
              accessibility
            </li>
            <li>
              • <strong>Responsive Design:</strong> Adapts to different screen
              sizes
            </li>
            <li>
              • <strong>Performance Optimized:</strong> Efficient touch event
              handling
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
              • <strong>Onboarding Flows:</strong> Welcome screens and feature
              introductions
            </li>
            <li>
              • <strong>Image Galleries:</strong> Photo browsing and slideshows
            </li>
            <li>
              • <strong>Product Showcases:</strong> Multiple product views and
              details
            </li>
            <li>
              • <strong>Story Formats:</strong> Social media stories and
              narratives
            </li>
            <li>
              • <strong>Carousel Components:</strong> Content rotation and
              browsing
            </li>
            <li>
              • <strong>Wizard Interfaces:</strong> Step-by-step processes
            </li>
            <li>
              • <strong>Presentation Slides:</strong> Interactive presentations
            </li>
            <li>
              • <strong>Mobile Apps:</strong> Native-like navigation experiences
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
