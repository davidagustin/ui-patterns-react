'use client';

import { useState } from 'react';

export default function FatFooterPattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

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

            <div className="code-block">
              {activeTab === 'jsx' ? (
                <pre className="text-sm leading-relaxed">
{`export default function FatFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🚀</span>
              <span className="text-xl font-bold">TechCorp</span>
            </div>
            <p className="text-gray-300 text-sm">
              Building innovative solutions for the digital world.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-blue-400 hover:text-blue-300">📘</a>
              <a href="#" className="text-blue-400 hover:text-blue-300">🐦</a>
              <a href="#" className="text-pink-400 hover:text-pink-300">📷</a>
              <a href="#" className="text-blue-600 hover:text-blue-500">💼</a>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white">Web Platform</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Mobile App</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">API Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Analytics</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Press</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Documentation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Community</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Status</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="pt-4 border-t border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-300 text-sm">
                Get the latest news and updates delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full md:w-auto md:max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-l text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 h-10"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors h-10 flex items-center justify-center whitespace-nowrap">
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
    </footer>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Fat Footer Styles */
.fat-footer {
  background-color: #111827;
  color: white;
}

.fat-footer .footer-content {
  max-width: 72rem;
  margin: 0 auto;
  padding: 1.5rem;
}

.fat-footer .footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .fat-footer .footer-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.fat-footer .footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.fat-footer .brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.fat-footer .brand-icon {
  font-size: 1.5rem;
}

.fat-footer .brand-name {
  font-size: 1.25rem;
  font-weight: bold;
}

.fat-footer .brand-description {
  color: #d1d5db;
  font-size: 0.875rem;
  line-height: 1.5;
}

.fat-footer .social-links {
  display: flex;
  gap: 0.75rem;
}

.fat-footer .social-link {
  color: #60a5fa;
  transition: color 0.2s;
}

.fat-footer .social-link:hover {
  color: #93c5fd;
}

.fat-footer .section-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.fat-footer .footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.fat-footer .footer-links a {
  color: #d1d5db;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s;
}

.fat-footer .footer-links a:hover {
  color: white;
}

.fat-footer .newsletter-section {
  padding-top: 1rem;
  border-top: 1px solid #374151;
}

.fat-footer .newsletter-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

@media (min-width: 768px) {
  .fat-footer .newsletter-content {
    flex-direction: row;
  }
}

.fat-footer .newsletter-text {
  flex: 1;
}

.fat-footer .newsletter-form {
  display: flex;
  width: 100%;
  max-width: 28rem;
}

@media (min-width: 768px) {
  .fat-footer .newsletter-form {
    width: auto;
  }
}

.fat-footer .newsletter-input {
  flex: 1;
  padding: 0.5rem 1rem;
  background-color: #1f2937;
  border: 1px solid #4b5563;
  border-radius: 0.375rem 0 0 0.375rem;
  color: white;
  font-size: 0.875rem;
}

.fat-footer .newsletter-input::placeholder {
  color: #9ca3af;
}

.fat-footer .newsletter-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.fat-footer .newsletter-button {
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0 0.375rem 0.375rem 0;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
}

.fat-footer .newsletter-button:hover {
  background-color: #1d4ed8;
}

.fat-footer .footer-bottom {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #374151;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #9ca3af;
}

@media (min-width: 768px) {
  .fat-footer .footer-bottom {
    flex-direction: row;
  }
}

.fat-footer .copyright {
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .fat-footer .copyright {
    margin-bottom: 0;
  }
}

.fat-footer .legal-links {
  display: flex;
  gap: 1.5rem;
}

.fat-footer .legal-links a {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.2s;
}

.fat-footer .legal-links a:hover {
  color: white;
}`}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}