'use client';

import { useState, useEffect } from 'react';

export default function CarouselPattern() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: 'Welcome to Our Platform',
      content: 'Discover amazing features and tools that will help you succeed in your projects.',
      color: 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800',
      icon: '🚀'
    },
    {
      id: 2,
      title: 'Powerful Analytics',
      content: 'Get insights into your data with our advanced analytics and reporting tools.',
      color: 'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800',
      icon: '📊'
    },
    {
      id: 3,
      title: 'Team Collaboration',
      content: 'Work together seamlessly with real-time collaboration features and shared workspaces.',
      color: 'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800',
      icon: '👥'
    },
    {
      id: 4,
      title: 'Secure & Reliable',
      content: 'Your data is protected with enterprise-grade security and 99.9% uptime guarantee.',
      color: 'bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800',
      icon: '🔒'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

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

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🎠 Carousel Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Display multiple items in a rotating sequence, allowing users to browse through content without taking up too much space.
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
              Navigate through the slides using the controls below. The carousel can auto-play and supports keyboard navigation.
            </p>
            
            <div className="relative max-w-md mx-auto">
              {/* Carousel container */}
              <div className="relative overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600 shadow-lg">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {slides.map((slide) => (
                    <div
                      key={slide.id}
                      className={`w-full flex-shrink-0 p-8 ${slide.color} min-h-[250px] flex flex-col items-center justify-center text-center`}
                    >
                      <div className="text-4xl mb-4">{slide.icon}</div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{slide.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{slide.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-lg"
                aria-label="Previous slide"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-lg"
                aria-label="Next slide"
              >
                →
              </button>

              {/* Dots indicator */}
              <div className="flex justify-center mt-4 space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentSlide === index 
                        ? 'bg-blue-600 dark:bg-blue-400' 
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Auto-play toggle */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={toggleAutoPlay}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    isAutoPlaying 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {isAutoPlaying ? '⏸️ Pause' : '▶️ Play'}
                </button>
              </div>
            </div>

            <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
              Slide {currentSlide + 1} of {slides.length}
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
{`import { useState, useEffect } from 'react';

function CarouselExample() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    { id: 1, title: 'Slide 1', content: 'Content 1', icon: '🚀' },
    { id: 2, title: 'Slide 2', content: 'Content 2', icon: '📊' },
    { id: 3, title: 'Slide 3', content: 'Content 3', icon: '👥' }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg">
        <div 
          className="flex transition-transform duration-500"
          style={{ transform: \`translateX(-\${currentSlide * 100}%)\` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="w-full flex-shrink-0 p-8">
              <div className="text-4xl mb-4">{slide.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{slide.title}</h3>
              <p>{slide.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <button onClick={prevSlide} className="absolute left-2 top-1/2">
        ←
      </button>
      <button onClick={nextSlide} className="absolute right-2 top-1/2">
        →
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={\`w-3 h-3 rounded-full \${
              currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
            }\`}
          />
        ))}
      </div>
    </div>
  );
}`}
              </pre>
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Automatic slide rotation with pause/play controls</p>
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Navigation arrows, dots, and keyboard support</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Responsive Design</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Adapts to different screen sizes and orientations</p>
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
            <p className="text-sm text-gray-600 dark:text-gray-400">Showcase product images or photo collections</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📢</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Feature Highlights</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Present key features and benefits of products</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🎬</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Content Slideshows</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Display testimonials, news, or promotional content</p>
          </div>
        </div>
      </div>
    </div>
  );
}
