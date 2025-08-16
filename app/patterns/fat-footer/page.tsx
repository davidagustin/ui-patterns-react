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
            
            {/* Fat Footer */}
            <div className="bg-gray-900 text-white rounded-lg overflow-hidden">
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                <div className="mt-8 pt-8 border-t border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                      <p className="text-gray-300 text-sm">Get the latest news and updates delivered to your inbox.</p>
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 h-10"
                      />
                      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors h-10 flex items-center">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
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
    <footer className="fat-footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section">
            <div className="brand">
              <span className="brand-icon">🚀</span>
              <span className="brand-name">TechCorp</span>
            </div>
            <p className="brand-description">
              Building innovative solutions for the digital world.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">💼</a>
            </div>
          </div>

          {/* Products */}
          <div className="footer-section">
            <h3 className="section-title">Products</h3>
            <ul className="footer-links">
              <li><a href="#">Web Platform</a></li>
              <li><a href="#">Mobile App</a></li>
              <li><a href="#">API Services</a></li>
              <li><a href="#">Analytics</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-section">
            <h3 className="section-title">Company</h3>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h3 className="section-title">Support</h3>
            <ul className="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Status</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="newsletter-section">
          <div className="newsletter-content">
            <div className="newsletter-info">
              <h3>Stay Updated</h3>
              <p>Get the latest news and updates.</p>
            </div>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <div className="copyright">
            © 2024 TechCorp. All rights reserved.
          </div>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Fat Footer */
.fat-footer {
  background-color: #1f2937;
  color: white;
  padding: 3rem 0 1rem;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Footer Grid */
.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Brand Section */
.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.brand-icon {
  font-size: 2rem;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: bold;
}

.brand-description {
  color: #d1d5db;
  font-size: 0.875rem;
  line-height: 1.5;
}

.social-links {
  display: flex;
  gap: 0.75rem;
}

.social-link {
  font-size: 1.5rem;
  transition: transform 0.2s ease;
}

.social-link:hover {
  transform: scale(1.1);
}

/* Section Titles */
.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

/* Footer Links */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-links a {
  color: #d1d5db;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: white;
}

/* Newsletter Section */
.newsletter-section {
  padding: 2rem 0;
  border-top: 1px solid #374151;
  border-bottom: 1px solid #374151;
}

.newsletter-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}

.newsletter-info h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.newsletter-info p {
  color: #d1d5db;
  font-size: 0.875rem;
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
}

.newsletter-form input {
  flex: 1;
  padding: 0.75rem;
  background-color: #374151;
  border: 1px solid #4b5563;
  border-radius: 0.375rem;
  color: white;
}

.newsletter-form input::placeholder {
  color: #9ca3af;
}

.newsletter-form button {
  padding: 0.75rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.newsletter-form button:hover {
  background-color: #2563eb;
}

/* Footer Bottom */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  font-size: 0.875rem;
  color: #9ca3af;
}

.legal-links {
  display: flex;
  gap: 1.5rem;
}

.legal-links a {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.2s ease;
}

.legal-links a:hover {
  color: white;
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .newsletter-content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .legal-links {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 640px) {
  .fat-footer {
    padding: 2rem 0 1rem;
  }
  
  .footer-content {
    padding: 0 1rem;
  }
  
  .newsletter-form {
    flex-direction: column;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Rich Content Organization</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Multiple sections with categorized links and information</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Newsletter Signup</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Integrated email subscription form</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Social Media Links</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Easy access to social platforms</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Legal Information</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Copyright and legal policy links</p>
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
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Corporate Websites</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive company information and navigation</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">E-commerce Sites</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Product categories, support, and legal information</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📰</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">News & Media</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Content sections, subscription, and contact info</p>
          </div>
        </div>
      </div>
    </div>
  );
}