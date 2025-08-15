'use client';

import { useState } from 'react';

export default function CardsPattern() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [codeTab, setCodeTab] = useState<'jsx' | 'css'>('jsx');

  const cards = [
    {
      id: 1,
      title: 'Product Design',
      description: 'Learn the fundamentals of creating beautiful and functional user interfaces with modern design principles.',
      image: 'https://via.placeholder.com/150',
      category: 'Design',
      rating: 4.8,
      students: 1247
    },
    {
      id: 2,
      title: 'React Development',
      description: 'Master React.js with hands-on projects and real-world applications. Build scalable web applications.',
      image: 'https://via.placeholder.com/150',
      category: 'Development',
      rating: 4.9,
      students: 2156
    },
    {
      id: 3,
      title: 'Data Science',
      description: 'Explore data analysis, machine learning, and statistical modeling with Python and modern tools.',
      image: 'https://via.placeholder.com/150',
      category: 'Analytics',
      rating: 4.7,
      students: 892
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🃏 Cards Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Cards present information in a contained, visually distinct unit that can be easily scanned and interacted with.
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
              Click on any card to see the selection effect. Cards are perfect for displaying courses, products, or any grouped content.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => setSelectedCard(card.id)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedCard === card.id 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                >
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      {card.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{card.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">{card.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{card.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{card.students} students</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                      Enroll Now
                    </button>
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
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
              <button
                onClick={() => setCodeTab('jsx')}
                className={`px-4 py-2 font-medium transition-colors ${
                  codeTab === 'jsx'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                JSX
              </button>
              <button
                onClick={() => setCodeTab('css')}
                className={`px-4 py-2 font-medium transition-colors ${
                  codeTab === 'css'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                CSS
              </button>
            </div>

            {/* Tab Content */}
            <div className="code-block">
              {codeTab === 'jsx' ? (
                <pre className="text-sm leading-relaxed">
{`import { useState } from 'react';

export default function CardsPattern() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const cards = [
    {
      id: 1,
      title: 'Product Design',
      description: 'Learn the fundamentals of creating beautiful and functional user interfaces with modern design principles.',
      image: 'https://via.placeholder.com/150',
      category: 'Design',
      rating: 4.8,
      students: 1247
    },
    {
      id: 2,
      title: 'React Development',
      description: 'Master React.js with hands-on projects and real-world applications. Build scalable web applications.',
      image: 'https://via.placeholder.com/150',
      category: 'Development',
      rating: 4.9,
      students: 2156
    },
    {
      id: 3,
      title: 'Data Science',
      description: 'Explore data analysis, machine learning, and statistical modeling with Python and modern tools.',
      image: 'https://via.placeholder.com/150',
      category: 'Analytics',
      rating: 4.7,
      students: 892
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          onClick={() => setSelectedCard(card.id)}
          className={\`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-lg \${
            selectedCard === card.id 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md' 
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }\`}
        >
          <img 
            src={card.image} 
            alt={card.title}
            className="w-full h-32 object-cover rounded mb-3"
          />
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
              {card.category}
            </span>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span className="text-yellow-500">★</span>
              <span className="ml-1">{card.rating}</span>
            </div>
          </div>
          <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">{card.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{card.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">{card.students} students</span>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
              Enroll Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Cards Grid Container */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

/* Individual Card */
.card {
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-color: #d1d5db;
}

/* Card Selection States */
.card-default {
  border-color: #e5e7eb;
}

.card-selected {
  border-color: #3b82f6;
  background-color: #eff6ff;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

/* Card Image */
.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

/* Card Category Badge */
.card-category {
  background-color: #dbeafe;
  color: #1e40af;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Card Rating */
.card-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.star {
  color: #f59e0b;
  font-size: 1rem;
}

/* Card Title */
.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0.75rem 0 0.5rem 0;
  line-height: 1.4;
}

/* Card Description */
.card-description {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Card Footer */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.card-students {
  font-size: 0.75rem;
  color: #9ca3af;
}

/* Card Button */
.card-button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.card-button:hover {
  background-color: #2563eb;
}

.card-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Card Loading State */
.card-loading {
  position: relative;
  overflow: hidden;
}

.card-loading::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0.5rem;
  }
  
  .card {
    padding: 1rem;
  }
  
  .card-image {
    height: 150px;
  }
}

@media (min-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .card {
    background: #1f2937;
    border-color: #374151;
    color: #f9fafb;
  }
  
  .card:hover {
    border-color: #4b5563;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
  
  .card-selected {
    background-color: #1e3a8a;
    border-color: #60a5fa;
  }
  
  .card-title {
    color: #f9fafb;
  }
  
  .card-description {
    color: #d1d5db;
  }
  
  .card-category {
    background-color: #1e3a8a;
    color: #93c5fd;
  }
  
  .card-students {
    color: #9ca3af;
  }
  
  .card-button {
    background-color: #3b82f6;
  }
  
  .card-button:hover {
    background-color: #2563eb;
  }
}

/* Card Animations */
.card {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Card Hover Effects */
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(59, 130, 246, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.card:hover::before {
  opacity: 1;
}

/* Card Focus States */
.card:focus-within {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);}`}
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Hierarchy</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear content organization with titles, descriptions, and actions</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Interactive States</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hover effects and selection states for better UX</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Rich Content</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Support for images, metadata, and action buttons</p>
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
            <div className="text-2xl mb-2">📚</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Course Catalogs</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Display educational content with ratings and enrollment info</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛍️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Product Grids</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Showcase products with images, prices, and actions</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">👥</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">User Profiles</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Present user information and social connections</p>
          </div>
        </div>
      </div>
    </div>
  );
}
