"use client";
import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
export default function CardsPattern() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const cards = [
    {
      id: 1,
      title: "Product Design",
      description:
        "Learn the fundamentals of creating beautiful and functional user interfaces with modern design principles.",
      image: "/next.svg",
      category: "Design",
      rating: 4.8,
      students: 1247,
    },
    {
      id: 2,
      title: "React Development",
      description:
        "Master React.js with hands-on projects and real-world applications. Build scalable web applications.",
      image: "/vercel.svg",
      category: "Development",
      rating: 4.9,
      students: 2156,
    },
    {
      id: 3,
      title: "Data Science",
      description:
        "Explore data analysis, machine learning, and statistical modeling with Python and modern tools.",
      image: "/file.svg",
      category: "Analytics",
      rating: 4.7,
      students: 892,
    },
  ];
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🃏 Cards Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Cards present information in a contained, visually distinct unit that
          can be easily scanned and interacted with.
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
              Click on any card to see the selection effect. Cards are perfect
              for displaying courses, products, or any grouped content.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => setSelectedCard(card.id)}
                  className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    selectedCard === card.id
                      ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : ""
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
            {/* Tab Content */}
            <div className="code-block">
              <DynamicCodeExample componentName="cards" />
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
                <span className="text-green-600 dark:text-green-400 text-lg">
                  🎯
                </span>
              </div>
              <div>
                <h3 className="font-medium text-green-800 dark:text-green-200">
                  Interactive Selection
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Click to select cards with visual feedback
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 dark:text-green-400 text-lg">
                  📱
                </span>
              </div>
              <div>
                <h3 className="font-medium text-green-800 dark:text-green-200">
                  Responsive Design
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Adapts to different screen sizes seamlessly
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 dark:text-green-400 text-lg">
                  ⚡
                </span>
              </div>
              <div>
                <h3 className="font-medium text-green-800 dark:text-green-200">
                  Smooth Animations
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Hover effects and transitions for better UX
                </p>
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
                <span className="text-purple-600 dark:text-purple-400 text-xl">
                  🎓
                </span>
              </div>
              <h3 className="font-medium text-purple-800 dark:text-purple-200 text-sm">
                Course Catalogs
              </h3>
              <p className="text-xs text-purple-600 dark:text-purple-400">
                Display educational content
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 dark:text-purple-400 text-xl">
                  🛍️
                </span>
              </div>
              <h3 className="font-medium text-purple-800 dark:text-purple-200 text-sm">
                Product Showcases
              </h3>
              <p className="text-xs text-purple-600 dark:text-purple-400">
                Feature products and services
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 dark:text-purple-400 text-xl">
                  👥
                </span>
              </div>
              <h3 className="font-medium text-purple-800 dark:text-purple-200 text-sm">
                Team Profiles
              </h3>
              <p className="text-xs text-purple-600 dark:text-purple-400">
                Showcase team members
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 dark:text-purple-400 text-xl">
                  📊
                </span>
              </div>
              <h3 className="font-medium text-purple-800 dark:text-purple-200 text-sm">
                Dashboard Widgets
              </h3>
              <p className="text-xs text-purple-600 dark:text-purple-400">
                Display key metrics
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
