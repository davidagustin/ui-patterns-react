"use client";
import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
export default function HomeLinkPattern() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🏠 Home Link Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Provide users with a quick and intuitive way to return to the main
          homepage from anywhere in your application.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            {/* Logo Home Link */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Logo as Home Link
                </h3>
                <div className="flex items-center justify-between p-3 bg-blue-600 text-white rounded-lg">
                  <button className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                    <span className="text-xl">🚀</span>
                    <span className="font-bold text-lg">TechCorp</span>
                  </button>
                  <nav className="flex space-x-4 text-sm">
                    <a href="#" className="hover:opacity-80">
                      Products
                    </a>
                    <a href="#" className="hover:opacity-80">
                      About
                    </a>
                    <a href="#" className="hover:opacity-80">
                      Contact
                    </a>
                  </nav>
                </div>
              </div>
              {/* Breadcrumb Home Link */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Breadcrumb Home Link
                </h3>
                <nav className="flex items-center space-x-2 text-sm">
                  <button className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                    <span>🏠</span>
                    <span>Home</span>
                  </button>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Products
                  </span>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Electronics
                  </span>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">
                    Laptops
                  </span>
                </nav>
              </div>
              {/* Back to Home Button */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Dedicated Home Button
                </h3>
                <div className="flex items-center justify-between">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                    <span>🏠</span>
                    <span>Back to Home</span>
                  </button>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Currently viewing: Product Details
                  </div>
                </div>
              </div>
              {/* Mobile Home Tab */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Mobile Bottom Navigation
                </h3>
                <div className="flex justify-center">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 w-80">
                    <div className="grid grid-cols-5 gap-1">
                      <button className="flex flex-col items-center p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
                        <span className="text-lg">🏠</span>
                        <span className="text-xs font-medium">Home</span>
                      </button>
                      <button className="flex flex-col items-center p-3 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                        <span className="text-lg">🔍</span>
                        <span className="text-xs">Search</span>
                      </button>
                      <button className="flex flex-col items-center p-3 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                        <span className="text-lg">❤️</span>
                        <span className="text-xs">Favorites</span>
                      </button>
                      <button className="flex flex-col items-center p-3 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                        <span className="text-lg">🛒</span>
                        <span className="text-xs">Cart</span>
                      </button>
                      <button className="flex flex-col items-center p-3 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                        <span className="text-lg">👤</span>
                        <span className="text-xs">Profile</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating Home Button */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 relative">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Floating Action Button
                </h3>
                <div className="h-32 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 relative">
                  <span>Content Area</span>
                  <button className="absolute bottom-4 right-4 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    🏠
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Code Example */}
<DynamicCodeExample componentName="home-link" />
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
                Multiple Implementation Options
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Logo links, breadcrumbs, buttons, and mobile navigation
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Universal Recognition
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Home icon and text are universally understood
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Accessibility Friendly
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Clear focus states and semantic HTML
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
                Adapts to different screen sizes and contexts
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
            <div className="text-2xl mb-2">🌐</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Website Navigation
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Easy return to homepage from any page
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📱</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Mobile Apps
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Bottom navigation and floating buttons
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              E-commerce
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Quick return to main shopping area
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
