'use client';

import { useState } from 'react';
import { DynamicCodeExample } from '../../../components/shared/CodeGenerator';

export default function FatFooterPattern() {

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🦶 Fat Footer Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Comprehensive footer navigation with multiple sections, links, and information organized in a rich, detailed layout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              A comprehensive footer with company information, navigation links, newsletter signup, and legal information.
            </p>
            
            {/* Fat Footer */}
            <div className="bg-gray-900 text-white rounded-lg overflow-hidden">
              <div className="p-6">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  {/* Company Info */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">🚀</span>
                      <span className="text-xl font-bold">TechCorp</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Building innovative solutions for the digital world. Join us in shaping the future of technology.
                    </p>
                    <div className="flex space-x-3">
                      <button className="text-blue-400 hover:text-blue-300">📘</button>
                      <button className="text-blue-400 hover:text-blue-300">🐦</button>
                      <button className="text-pink-400 hover:text-pink-300">📷</button>
                      <button className="text-blue-600 hover:text-blue-500">💼</button>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Products</h3>
                    <ul className="space-y-2 text-sm">
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Web Platform</a></li>
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mobile App</a></li>
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">API Services</a></li>
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Analytics</a></li>
                    </ul>
                  </div>

                  {/* Company */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Company</h3>
                    <ul className="space-y-2 text-sm">
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Press</a></li>
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
                    </ul>
                  </div>

                  {/* Support */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Support</h3>
                    <ul className="space-y-2 text-sm">
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Documentation</a></li>
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Community</a></li>
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Status</a></li>
                    </ul>
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                      <p className="text-gray-300 text-sm">Get the latest news and updates delivered to your inbox.</p>
                    </div>
                    <div className="flex w-full md:w-auto md:max-w-md">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-l text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 h-10"
                      />
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 transition-colors h-10 flex items-center justify-center whitespace-nowrap">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-6 pt-4 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                  <div className="mb-4 md:mb-0">
                    © 2024 TechCorp. All rights reserved.
                  </div>
                  <div className="flex space-x-6">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                  </div>
                </div>
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
            
            <div className="code-block">
              {
                <DynamicCodeExample 
                componentName="fat-footer" 
                activeTab={activeTab} 
              />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}