'use client';

import { useState } from 'react';

export default function CardsPattern() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  const cards = [
    {
      id: 1,
      title: 'Product Design',
      description: 'Learn the fundamentals of creating beautiful and functional user interfaces with modern design principles.',
      image: '/next.svg',
      category: 'Design',
      rating: 4.8,
      students: 1247
    },
    {
      id: 2,
      title: 'React Development',
      description: 'Master React.js with hands-on projects and real-world applications. Build scalable web applications.',
      image: '/vercel.svg',
      category: 'Development',
      rating: 4.9,
      students: 2156
    },
    {
      id: 3,
      title: 'Data Science',
      description: 'Explore data analysis, machine learning, and statistical modeling with Python and modern tools.',
      image: '/file.svg',
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
                  className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    selectedCard === card.id 
                      ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : ''
                  }`}
                >
                  <div className="w-full h-32 bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    <img 
                      src={card.image} 
                      alt={card.title}
                      className="max-w-full max-h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                      {card.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="font-medium">{card.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {card.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {card.students} students
                    </span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors">
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
{`import { useState } from 'react';

export default function CardsPattern() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const cards = [
    {
      id: 1,
      title: 'Product Design',
      description: 'Learn the fundamentals of creating beautiful and functional user interfaces.',
      image: '/next.svg',
      category: 'Design',
      rating: 4.8,
      students: 1247
    },
    {
      id: 2,
      title: 'React Development',
      description: 'Master React.js with hands-on projects and real-world applications.',
      image: '/vercel.svg',
      category: 'Development',
      rating: 4.9,
      students: 2156
    },
    {
      id: 3,
      title: 'Data Science',
      description: 'Explore data analysis, machine learning, and statistical modeling.',
      image: '/file.svg',
      category: 'Analytics',
      rating: 4.7,
      students: 892
    }
  ];

  return (
    <div className="cards-container">
      <div className="cards-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => setSelectedCard(card.id)}
            className={\`card \${selectedCard === card.id ? 'card-selected' : ''}\`}
          >
            <div className="card-image-container">
              <img 
                src={card.image} 
                alt={card.title}
                className="card-image"
              />
            </div>
            <div className="card-header">
              <span className="card-category">{card.category}</span>
              <div className="card-rating">
                <span className="rating-star">★</span>
                <span className="rating-value">{card.rating}</span>
              </div>
            </div>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
            <div className="card-footer">
              <span className="card-students">{card.students} students</span>
              <button className="card-button">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Cards Container */
.cards-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Cards Grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

/* Card Base */
.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: #d1d5db;
}

.card:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Selected Card State */
.card.card-selected {
  border-color: #3b82f6;
  background-color: #eff6ff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.card.card-selected:hover {
  background-color: #dbeafe;
}

/* Card Image Container */
.card-image-container {
  width: 100%;
  height: 8rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.card:hover .card-image-container {
  transform: scale(1.05);
}

/* Card Image */
.card-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  padding: 1rem;
}

/* Card Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

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

.card-rating {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.rating-star {
  color: #f59e0b;
  margin-right: 0.25rem;
}

.rating-value {
  font-weight: 500;
}

/* Card Title */
.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
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
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.card-students {
  font-size: 0.75rem;
  color: #9ca3af;
}

.card-button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.card-button:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

.card-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .card {
    padding: 1rem;
  }
  
  .card-image-container {
    height: 6rem;
  }
  
  .card-title {
    font-size: 1.125rem;
  }
  
  .card-description {
    font-size: 0.8125rem;
  }
}`}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <h2 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">
            ✨ Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 dark:text-green-400 text-lg">🎯</span>
              </div>
              <div>
                <h3 className="font-medium text-green-800 dark:text-green-200">Interactive Selection</h3>
                <p className="text-sm text-green-600 dark:text-green-400">Click to select cards with visual feedback</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 dark:text-green-400 text-lg">📱</span>
              </div>
              <div>
                <h3 className="font-medium text-green-800 dark:text-green-200">Responsive Design</h3>
                <p className="text-sm text-green-600 dark:text-green-400">Adapts to different screen sizes seamlessly</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 dark:text-green-400 text-lg">⚡</span>
              </div>
              <div>
                <h3 className="font-medium text-green-800 dark:text-green-200">Smooth Animations</h3>
                <p className="text-sm text-green-600 dark:text-green-400">Hover effects and transitions for better UX</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <h2 className="text-xl font-semibold mb-4 text-purple-800 dark:text-purple-200">
            🎯 Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 dark:text-purple-400 text-xl">🎓</span>
              </div>
              <h3 className="font-medium text-purple-800 dark:text-purple-200 text-sm">Course Catalogs</h3>
              <p className="text-xs text-purple-600 dark:text-purple-400">Display educational content</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 dark:text-purple-400 text-xl">🛍️</span>
              </div>
              <h3 className="font-medium text-purple-800 dark:text-purple-200 text-sm">Product Showcases</h3>
              <p className="text-xs text-purple-600 dark:text-purple-400">Feature products and services</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 dark:text-purple-400 text-xl">👥</span>
              </div>
              <h3 className="font-medium text-purple-800 dark:text-purple-200 text-sm">Team Profiles</h3>
              <p className="text-xs text-purple-600 dark:text-purple-400">Showcase team members</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 dark:text-purple-400 text-xl">📊</span>
              </div>
              <h3 className="font-medium text-purple-800 dark:text-purple-200 text-sm">Dashboard Widgets</h3>
              <p className="text-xs text-purple-600 dark:text-purple-400">Display key metrics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
