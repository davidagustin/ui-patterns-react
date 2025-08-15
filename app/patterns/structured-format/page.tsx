'use client';

import { useState } from 'react';

export default function StructuredFormatPattern() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [date, setDate] = useState('');
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      const parts = [match[1], match[2], match[3]].filter(Boolean);
      return parts.join('-');
    }
    return cleaned;
  };

  const formatCreditCard = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/);
    if (match) {
      const parts = [match[1], match[2], match[3], match[4]].filter(Boolean);
      return parts.join(' ');
    }
    return cleaned;
  };

  const formatDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,2})(\d{0,2})(\d{0,4})$/);
    if (match) {
      const parts = [match[1], match[2], match[3]].filter(Boolean);
      return parts.join('/');
    }
    return cleaned;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📋 Structured Format Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Format input with specific patterns to improve user experience and data consistency.
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
              Try entering data in the fields below. The formatting will be applied automatically as you type.
            </p>
            <div className="space-y-4">
              <div className="format-field">
                <label className="format-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                  placeholder="(555) 123-4567"
                  className="format-input"
                  maxLength={12}
                />
                <p className="format-hint">Format: XXX-XXX-XXXX</p>
              </div>

              <div className="format-field">
                <label className="format-label">
                  Credit Card
                </label>
                <input
                  type="text"
                  value={creditCard}
                  onChange={(e) => setCreditCard(formatCreditCard(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  className="format-input"
                  maxLength={19}
                />
                <p className="format-hint">Format: XXXX XXXX XXXX XXXX</p>
              </div>

              <div className="format-field">
                <label className="format-label">
                  Date
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(formatDate(e.target.value))}
                  placeholder="MM/DD/YYYY"
                  className="format-input"
                  maxLength={10}
                />
                <p className="format-hint">Format: MM/DD/YYYY</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Formatting Features</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• Automatic formatting as you type</div>
                <div>• Input validation and cleaning</div>
                <div>• Visual feedback for correct formats</div>
                <div>• Maximum length enforcement</div>
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
{`import { useState } from 'react';

export default function StructuredFormatPattern() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [date, setDate] = useState('');

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\\D/g, '');
    const match = cleaned.match(/^(\\d{0,3})(\\d{0,3})(\\d{0,4})$/);
    if (match) {
      const parts = [match[1], match[2], match[3]].filter(Boolean);
      return parts.join('-');
    }
    return cleaned;
  };

  const formatCreditCard = (value: string) => {
    const cleaned = value.replace(/\\D/g, '');
    const match = cleaned.match(/^(\\d{0,4})(\\d{0,4})(\\d{0,4})(\\d{0,4})$/);
    if (match) {
      const parts = [match[1], match[2], match[3], match[4]].filter(Boolean);
      return parts.join(' ');
    }
    return cleaned;
  };

  const formatDate = (value: string) => {
    const cleaned = value.replace(/\\D/g, '');
    const match = cleaned.match(/^(\\d{0,2})(\\d{0,2})(\\d{0,4})$/);
    if (match) {
      const parts = [match[1], match[2], match[3]].filter(Boolean);
      return parts.join('/');
    }
    return cleaned;
  };

  return (
    <div className="format-container">
      <div className="format-fields">
        <div className="format-field">
          <label className="format-label">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
            placeholder="(555) 123-4567"
            className="format-input"
            maxLength={12}
          />
          <p className="format-hint">Format: XXX-XXX-XXXX</p>
        </div>

        <div className="format-field">
          <label className="format-label">Credit Card</label>
          <input
            type="text"
            value={creditCard}
            onChange={(e) => setCreditCard(formatCreditCard(e.target.value))}
            placeholder="1234 5678 9012 3456"
            className="format-input"
            maxLength={19}
          />
          <p className="format-hint">Format: XXXX XXXX XXXX XXXX</p>
        </div>

        <div className="format-field">
          <label className="format-label">Date</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(formatDate(e.target.value))}
            placeholder="MM/DD/YYYY"
            className="format-input"
            maxLength={10}
          />
          <p className="format-hint">Format: MM/DD/YYYY</p>
        </div>
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Format Container */
.format-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

/* Format Fields */
.format-fields {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Format Field */
.format-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Format Label */
.format-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

/* Format Input */
.format-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: white;
  color: #111827;
}

.format-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.format-input::placeholder {
  color: #9ca3af;
  font-style: italic;
}

.format-input:invalid {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.format-input:valid {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

/* Format Hint */
.format-hint {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
  font-style: italic;
}

/* Input States */
.format-input:disabled {
  background-color: #f9fafb;
  color: #6b7280;
  cursor: not-allowed;
}

.format-input:read-only {
  background-color: #f9fafb;
  color: #374151;
}

/* Loading State */
.format-input.loading {
  background-image: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Success State */
.format-input.success {
  border-color: #10b981;
  background-color: #f0fdf4;
}

.format-input.success:focus {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

/* Error State */
.format-input.error {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.format-input.error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Responsive Design */
@media (max-width: 640px) {
  .format-container {
    padding: 1rem;
  }
  
  .format-input {
    padding: 0.625rem;
    font-size: 0.875rem;
  }
  
  .format-label {
    font-size: 0.8125rem;
  }
  
  .format-hint {
    font-size: 0.6875rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .format-label {
    color: #d1d5db;
  }
  
  .format-input {
    background-color: #1f2937;
    border-color: #374151;
    color: #f9fafb;
  }
  
  .format-input:focus {
    border-color: #60a5fa;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
  }
  
  .format-input::placeholder {
    color: #6b7280;
  }
  
  .format-input:invalid {
    border-color: #f87171;
    box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.1);
  }
  
  .format-input:valid {
    border-color: #34d399;
    box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.1);
  }
  
  .format-hint {
    color: #9ca3af;
  }
  
  .format-input:disabled {
    background-color: #374151;
    color: #6b7280;
  }
  
  .format-input:read-only {
    background-color: #374151;
    color: #d1d5db;
  }
  
  .format-input.success {
    background-color: #064e3b;
  }
  
  .format-input.error {
    background-color: #450a0a;
  }
}

/* Animation */
.format-input {
  animation: fadeInUp 0.3s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Focus Management */
.format-input:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .format-input {
    border-width: 2px;
  }
  
  .format-input:focus {
    border-width: 3px;
  }
  
  .format-input:invalid {
    border-width: 3px;
  }
  
  .format-input:valid {
    border-width: 3px;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .format-input {
    transition: none;
    animation: none;
  }
  
  .format-input.loading {
    animation: none;
  }
}

/* Print Styles */
@media print {
  .format-input {
    border: 1px solid #000;
    background: white;
    color: #000;
  }
  
  .format-hint {
    display: none;
  }
}

/* Custom Format Patterns */
.format-input[data-format="phone"] {
  font-family: 'Courier New', monospace;
  letter-spacing: 0.05em;
}

.format-input[data-format="credit-card"] {
  font-family: 'Courier New', monospace;
  letter-spacing: 0.1em;
}

.format-input[data-format="date"] {
  font-family: 'Courier New', monospace;
  letter-spacing: 0.05em;
}

/* Validation Icons */
.format-field {
  position: relative;
}

.format-field::after {
  content: '';
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.format-field.valid::after {
  content: '✓';
  color: #10b981;
  opacity: 1;
}

.format-field.invalid::after {
  content: '✗';
  color: #ef4444;
  opacity: 1;
}

/* Accessibility */
.format-input[aria-invalid="true"] {
  border-color: #ef4444;
}

.format-input[aria-invalid="false"] {
  border-color: #10b981;
}

/* RTL Support */
[dir="rtl"] .format-field::after {
  right: auto;
  left: 0.75rem;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Real-time Formatting</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Format input as user types for immediate feedback</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Input Validation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clean and validate data automatically</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Feedback</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear indication of valid/invalid formats</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Multiple Patterns</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Support for various data formats and patterns</p>
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
            <div className="text-2xl mb-2">📱</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Contact Forms</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Phone numbers, addresses, and personal info</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">💳</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Payment Forms</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Credit cards, account numbers, and dates</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📅</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Date Inputs</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Birth dates, appointments, and schedules</p>
          </div>
        </div>
      </div>
    </div>
  );
}
