'use client';

import { useState, useEffect } from 'react';

export default function CarouselPattern() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  const slides = [
    {
      id: 1,
      title: 'Beautiful Design',
      description: 'Create stunning user interfaces with modern design principles',
      image: 'https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=Design',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Responsive Layout',
      description: 'Build applications that work perfectly on all devices',
      image: 'https://via.placeholder.com/600x400/10B981/FFFFFF?text=Responsive',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      title: 'Fast Performance',
      description: 'Optimize your applications for lightning-fast loading times',
      image: 'https://via.placeholder.com/600x400/F59E0B/FFFFFF?text=Performance',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 4,
      title: 'User Experience',
      description: 'Focus on creating intuitive and delightful user experiences',
      image: 'https://via.placeholder.com/600x400/EF4444/FFFFFF?text=UX',
      color: 'from-red-500 to-red-600'
    }
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

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🎠 Carousel Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Display multiple items in a rotating slideshow with navigation controls and smooth transitions.
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
              Navigate through the slides using the arrows or dots. The carousel auto-plays every 5 seconds.
            </p>
            
            <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              {/* Carousel Container */}
              <div className="relative h-64 overflow-hidden">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      index === currentSlide
                        ? 'opacity-100 translate-x-0'
                        : index < currentSlide
                        ? 'opacity-0 -translate-x-full'
                        : 'opacity-0 translate-x-full'
                    }`}
                  >
                    <div className={`h-full bg-gradient-to-r ${slide.color} flex items-center justify-center`}>
                      <div className="text-center text-white p-6">
                        <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
                        <p className="text-lg opacity-90">{slide.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 hover:bg-opacity-100 dark:hover:bg-opacity-100 text-gray-800 dark:text-gray-200 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 hover:bg-opacity-100 dark:hover:bg-opacity-100 text-gray-800 dark:text-gray-200 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentSlide
                        ? 'bg-white scale-125'
                        : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Slide Counter */}
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                {currentSlide + 1} / {slides.length}
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Carousel Features</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• Auto-play with 5-second intervals</div>
                <div>• Smooth slide transitions</div>
                <div>• Navigation arrows and dot indicators</div>
                <div>• Slide counter display</div>
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
{`import { useState, useEffect } from 'react';

export default function CarouselPattern() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Beautiful Design',
      description: 'Create stunning user interfaces with modern design principles',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Responsive Layout',
      description: 'Build applications that work perfectly on all devices',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      title: 'Fast Performance',
      description: 'Optimize your applications for lightning-fast loading times',
      color: 'from-yellow-500 to-yellow-600'
    }
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

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      {/* Carousel Container */}
      <div className="carousel-wrapper">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={\`carousel-slide \${
              index === currentSlide
                ? 'slide-active'
                : index < currentSlide
                ? 'slide-prev'
                : 'slide-next'
            }\`}
          >
            <div className={\`slide-content bg-gradient-to-r \${slide.color}\`}>
              <div className="slide-text">
                <h3 className="slide-title">{slide.title}</h3>
                <p className="slide-description">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="carousel-button carousel-prev"
        aria-label="Previous slide"
      >
        <svg className="carousel-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="carousel-button carousel-next"
        aria-label="Next slide"
      >
        <svg className="carousel-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={\`carousel-dot \${
              index === currentSlide ? 'dot-active' : ''
            }\`}
            aria-label={\`Go to slide \${index + 1}\`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="carousel-counter">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Carousel Container */
.carousel-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Carousel Wrapper */
.carousel-wrapper {
  position: relative;
  height: 400px;
  overflow: hidden;
}

/* Carousel Slide */
.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s ease-in-out;
  opacity: 0;
  transform: translateX(100%);
}

.carousel-slide.slide-active {
  opacity: 1;
  transform: translateX(0);
}

.carousel-slide.slide-prev {
  opacity: 0;
  transform: translateX(-100%);
}

.carousel-slide.slide-next {
  opacity: 0;
  transform: translateX(100%);
}

/* Slide Content */
.slide-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 2rem;
}

.slide-text {
  max-width: 500px;
}

.slide-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.slide-description {
  font-size: 1.125rem;
  opacity: 0.9;
  line-height: 1.5;
}

/* Navigation Buttons */
.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #374151;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.carousel-button:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.carousel-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.carousel-prev {
  left: 1rem;
}

.carousel-next {
  right: 1rem;
}

.carousel-icon {
  width: 1.5rem;
  height: 1.5rem;
}

/* Dot Indicators */
.carousel-dots {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.carousel-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.carousel-dot:hover {
  background: rgba(255, 255, 255, 0.75);
  transform: scale(1.2);
}

.carousel-dot.dot-active {
  background: white;
  transform: scale(1.25);
}

.carousel-dot:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
}

/* Slide Counter */
.carousel-counter {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Auto-play Animation */
@keyframes autoPlay {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

.carousel-auto-play {
  animation: autoPlay 5s linear infinite;
}

/* Responsive Design */
@media (max-width: 768px) {
  .carousel-wrapper {
    height: 300px;
  }
  
  .slide-title {
    font-size: 1.5rem;
  }
  
  .slide-description {
    font-size: 1rem;
  }
  
  .carousel-button {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .carousel-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .carousel-dots {
    bottom: 0.75rem;
  }
  
  .carousel-counter {
    top: 0.75rem;
    right: 0.75rem;
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .carousel-wrapper {
    height: 250px;
  }
  
  .slide-content {
    padding: 1rem;
  }
  
  .slide-title {
    font-size: 1.25rem;
  }
  
  .slide-description {
    font-size: 0.875rem;
  }
  
  .carousel-button {
    width: 2rem;
    height: 2rem;
  }
  
  .carousel-icon {
    width: 1rem;
    height: 1rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .carousel-container {
    background: #1f2937;
  }
  
  .carousel-button {
    background: rgba(31, 41, 55, 0.8);
    color: #d1d5db;
  }
  
  .carousel-button:hover {
    background: rgba(31, 41, 55, 1);
  }
  
  .carousel-dot {
    background: rgba(255, 255, 255, 0.3);
  }
  
  .carousel-dot:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  
  .carousel-dot.dot-active {
    background: white;
  }
}

/* Touch Support */
@media (hover: none) and (pointer: coarse) {
  .carousel-button:hover {
    transform: translateY(-50%);
  }
  
  .carousel-dot:hover {
    transform: scale(1);
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .carousel-button {
    border: 2px solid #000;
  }
  
  .carousel-dot {
    border: 1px solid #000;
  }
  
  .carousel-counter {
    border: 1px solid #fff;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .carousel-slide {
    transition: none;
  }
  
  .carousel-button {
    transition: none;
  }
  
  .carousel-button:hover {
    transform: translateY(-50%);
  }
  
  .carousel-dot {
    transition: none;
  }
  
  .carousel-dot:hover {
    transform: scale(1);
  }
  
  .carousel-auto-play {
    animation: none;
  }
}

/* Print Styles */
@media print {
  .carousel-button,
  .carousel-dots,
  .carousel-counter {
    display: none;
  }
  
  .carousel-slide {
    position: static;
    opacity: 1;
    transform: none;
    page-break-inside: avoid;
  }
  
  .carousel-wrapper {
    height: auto;
    overflow: visible;
  }
}

/* Loading State */
.carousel-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  background: #f3f4f6;
  color: #6b7280;
}

.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Auto-play</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Automatic slide rotation with configurable intervals</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Smooth Transitions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">CSS transitions for fluid slide animations</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Multiple Controls</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Arrow buttons, dot indicators, and slide counter</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Touch Support</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Works seamlessly on mobile devices</p>
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
            <div className="text-2xl mb-2">🖼️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Image Galleries</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Showcase product photos and portfolios</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📢</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Testimonials</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Rotate customer reviews and feedback</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Feature Highlights</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Present key features and benefits</p>
          </div>
        </div>
      </div>
    </div>
  );
}
