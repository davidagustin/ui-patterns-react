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
                  className={`card ${selectedCard === card.id ? 'card-selected' : ''}`}
                >
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="card-image"
                  />
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
      image: 'https://via.placeholder.com/150',
      category: 'Design',
      rating: 4.8,
      students: 1247
    },
    {
      id: 2,
      title: 'React Development',
      description: 'Master React.js with hands-on projects and real-world applications.',
      image: 'https://via.placeholder.com/150',
      category: 'Development',
      rating: 4.9,
      students: 2156
    },
    {
      id: 3,
      title: 'Data Science',
      description: 'Explore data analysis, machine learning, and statistical modeling.',
      image: 'https://via.placeholder.com/150',
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
            <img 
              src={card.image} 
              alt={card.title}
              className="card-image"
            />
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

/* Card Image */
.card-image {
  width: 100%;
  height: 8rem;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

.card:hover .card-image {
  transform: scale(1.05);
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
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { left: -100%; }
  100% { left: 100%; }
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
  
  .card-image {
    height: 6rem;
  }
  
  .card-title {
    font-size: 1.125rem;
  }
  
  .card-description {
    font-size: 0.8125rem;
  }
}

@media (max-width: 480px) {
  .cards-container {
    padding: 1rem;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .card-footer {
    flex-direction: column;
    gap: 0.75rem;
    align-items: stretch;
  }
  
  .card-button {
    width: 100%;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .card {
    background-color: #1f2937;
    border-color: #374151;
    color: #f9fafb;
  }
  
  .card:hover {
    border-color: #4b5563;
    background-color: #374151;
  }
  
  .card.card-selected {
    border-color: #60a5fa;
    background-color: #1e3a8a;
  }
  
  .card.card-selected:hover {
    background-color: #1e40af;
  }
  
  .card-category {
    background-color: #1e3a8a;
    color: #93c5fd;
  }
  
  .card-title {
    color: #f9fafb;
  }
  
  .card-description {
    color: #9ca3af;
  }
  
  .card-students {
    color: #6b7280;
  }
  
  .card-rating {
    color: #9ca3af;
  }
}

/* Animation */
.card {
  animation: fadeInUp 0.6s ease;
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

/* Focus Management */
.card:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .card {
    border-width: 2px;
  }
  
  .card.card-selected {
    border-width: 3px;
  }
  
  .card-button {
    border: 2px solid transparent;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .card,
  .card-image,
  .card-button {
    transition: none;
  }
  
  .card:hover {
    transform: none;
  }
  
  .card:hover .card-image {
    transform: none;
  }
  
  .card-button:hover {
    transform: none;
  }
}

/* Print Styles */
@media print {
  .card {
    break-inside: avoid;
    border: 1px solid #000;
    background: white;
    color: #000;
  }
  
  .card-button {
    display: none;
  }
  
  .card:hover {
    transform: none;
    box-shadow: none;
  }
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Hierarchy</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear information structure with images, titles, and descriptions</p>
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Responsive Grid</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Adapts to different screen sizes automatically</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Rich Content</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Supports images, categories, ratings, and action buttons</p>
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
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">E-commerce</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Product catalogs and item displays</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📚</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Learning Platforms</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Course listings and educational content</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📰</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Content Feeds</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Blog posts, articles, and news items</p>
          </div>
        </div>
      </div>
    </div>
  );
}
