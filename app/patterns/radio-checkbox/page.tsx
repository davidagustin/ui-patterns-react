'use client';

import { useState } from 'react';

export default function RadioCheckboxPattern() {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false
  });
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  const paymentOptions = [
    { id: 'credit', label: 'Credit Card', description: 'Pay with credit or debit card' },
    { id: 'paypal', label: 'PayPal', description: 'Pay with your PayPal account' },
    { id: 'bank', label: 'Bank Transfer', description: 'Direct bank transfer' },
    { id: 'crypto', label: 'Cryptocurrency', description: 'Pay with Bitcoin or Ethereum' }
  ];

  const services = [
    { id: 'web-design', label: 'Web Design' },
    { id: 'development', label: 'Development' },
    { id: 'seo', label: 'SEO Optimization' },
    { id: 'marketing', label: 'Digital Marketing' },
    { id: 'consulting', label: 'Consulting' }
  ];

  const themeOptions = [
    { id: 'light', label: 'Light Theme', icon: '☀️' },
    { id: 'dark', label: 'Dark Theme', icon: '🌙' },
    { id: 'auto', label: 'Auto Theme', icon: '⚡' }
  ];

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, serviceId]);
    } else {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    }
  };

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [type]: !notifications[type]
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ☑️ Radio Buttons & Checkboxes
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Essential form controls for single and multiple selections with clear visual feedback and accessibility support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Examples
            </h2>
            
            <div className="space-y-8">
              {/* Radio Buttons - Payment Method */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Payment Method (Radio Buttons)
                </h3>
                <div className="space-y-3">
                  {paymentOptions.map((option) => (
                    <div key={option.id} className="flex items-start space-x-3">
                      <input
                        type="radio"
                        id={option.id}
                        name="payment"
                        value={option.id}
                        checked={selectedOption === option.id}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <div className="flex-1">
                        <label htmlFor={option.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                          {option.label}
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{option.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {selectedOption && (
                  <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Selected: <strong>{paymentOptions.find(opt => opt.id === selectedOption)?.label}</strong>
                    </p>
                  </div>
                )}
              </div>

              {/* Checkboxes - Services */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Services Needed (Checkboxes)
                </h3>
                <div className="space-y-3">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id={service.id}
                        checked={selectedServices.includes(service.id)}
                        onChange={(e) => handleServiceChange(service.id, e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <label htmlFor={service.id} className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                        {service.label}
                      </label>
                    </div>
                  ))}
                </div>
                {selectedServices.length > 0 && (
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Selected ({selectedServices.length}): {selectedServices.map(id => services.find(s => s.id === id)?.label).join(', ')}
                    </p>
                  </div>
                )}
              </div>

              {/* Custom Styled Radio Buttons */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Theme Selection (Custom Styled)
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {themeOptions.map((theme) => (
                    <div key={theme.id} className="relative">
                      <input
                        type="radio"
                        id={theme.id}
                        name="theme"
                        value={theme.id}
                        checked={selectedTheme === theme.id}
                        onChange={(e) => setSelectedTheme(e.target.value)}
                        className="sr-only peer"
                      />
                      <label
                        htmlFor={theme.id}
                        className="flex items-center p-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 transition-all"
                      >
                        <span className="text-2xl mr-3">{theme.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{theme.label}</div>
                        </div>
                        <div className="ml-auto">
                          <div className="w-4 h-4 rounded-full border-2 border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 relative">
                            <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100"></div>
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Toggle Switches */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Notification Preferences (Toggle Switches)
                </h3>
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, enabled]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {key === 'email' ? 'Email Notifications' : 
                           key === 'push' ? 'Push Notifications' : 'SMS Notifications'}
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {key === 'email' ? 'Receive updates via email' : 
                           key === 'push' ? 'Browser push notifications' : 'Text message alerts'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleNotificationChange(key as keyof typeof notifications)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                        role="switch"
                        aria-checked={enabled}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
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
{`'use client';

import { useState } from 'react';

export default function RadioCheckboxPattern() {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false
  });

  const paymentOptions = [
    { id: 'credit', label: 'Credit Card', description: 'Pay with credit or debit card' },
    { id: 'paypal', label: 'PayPal', description: 'Pay with your PayPal account' }
  ];

  const services = [
    { id: 'web-design', label: 'Web Design' },
    { id: 'development', label: 'Development' },
    { id: 'seo', label: 'SEO Optimization' }
  ];

  const handleServiceChange = (serviceId, checked) => {
    if (checked) {
      setSelectedServices([...selectedServices, serviceId]);
    } else {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    }
  };

  const handleNotificationChange = (type) => {
    setNotifications({
      ...notifications,
      [type]: !notifications[type]
    });
  };

  return (
    <div className="space-y-6">
      {/* Radio Buttons */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Payment Method</h3>
        <div className="space-y-3">
          {paymentOptions.map((option) => (
            <div key={option.id} className="flex items-start space-x-3">
              <input
                type="radio"
                id={option.id}
                name="payment"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <div className="flex-1">
                <label htmlFor={option.id} className="block text-sm font-medium cursor-pointer">
                  {option.label}
                </label>
                <p className="text-xs text-gray-500">{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkboxes */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Services Needed</h3>
        <div className="space-y-3">
          {services.map((service) => (
            <div key={service.id} className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={service.id}
                checked={selectedServices.includes(service.id)}
                onChange={(e) => handleServiceChange(service.id, e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={service.id} className="text-sm font-medium cursor-pointer">
                {service.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Toggle Switch */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notification Preferences</h3>
        {Object.entries(notifications).map(([key, enabled]) => (
          <div key={key} className="flex items-center justify-between">
            <label className="text-sm font-medium">
              {key.charAt(0).toUpperCase() + key.slice(1)} Notifications
            </label>
            <button
              type="button"
              onClick={() => handleNotificationChange(key)}
              className={\`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 \${
                enabled ? 'bg-blue-600' : 'bg-gray-200'
              }\`}
              role="switch"
              aria-checked={enabled}
            >
              <span
                className={\`inline-block h-4 w-4 transform rounded-full bg-white transition-transform \${
                  enabled ? 'translate-x-6' : 'translate-x-1'
                }\`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Radio Button Styles */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.radio-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.radio-item:hover {
  background-color: #f9fafb;
  border-color: #e5e7eb;
}

.radio-input {
  width: 1rem;
  height: 1rem;
  margin-top: 0.25rem;
  accent-color: #3b82f6;
  cursor: pointer;
}

.radio-label {
  flex: 1;
  cursor: pointer;
}

.radio-title {
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

.radio-description {
  font-size: 0.75rem;
  color: #6b7280;
}

/* Checkbox Styles */
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.checkbox-input {
  width: 1rem;
  height: 1rem;
  accent-color: #3b82f6;
  cursor: pointer;
}

.checkbox-label {
  font-weight: 500;
  color: #374151;
  cursor: pointer;
}

/* Custom Radio Button */
.custom-radio {
  position: relative;
}

.custom-radio-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.custom-radio-button {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background-color: white;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.custom-radio-button:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
}

.custom-radio-input:checked + .custom-radio-button {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.radio-indicator {
  width: 1rem;
  height: 1rem;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  margin-left: auto;
  position: relative;
  transition: all 0.2s ease;
}

.custom-radio-input:checked + .custom-radio-button .radio-indicator {
  border-color: #3b82f6;
  background-color: #3b82f6;
}

.radio-indicator::after {
  content: '';
  width: 0.5rem;
  height: 0.5rem;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.custom-radio-input:checked + .custom-radio-button .radio-indicator::after {
  opacity: 1;
}

/* Toggle Switch */
.toggle-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 2.75rem;
  height: 1.5rem;
  background-color: #e5e7eb;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.toggle-switch.active {
  background-color: #3b82f6;
}

.toggle-switch:focus {
  outline: none;
  box-shadow: 0 0 0 2px #3b82f6, 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.toggle-thumb {
  display: block;
  width: 1rem;
  height: 1rem;
  background-color: white;
  border-radius: 50%;
  transform: translateX(0.25rem);
  transition: transform 0.2s ease;
}

.toggle-switch.active .toggle-thumb {
  transform: translateX(1.5rem);
}

/* Form Section */
.form-section {
  margin-bottom: 2rem;
}

.form-section h3 {
  font-size: 1.125rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 1rem;
}

/* Selection Summary */
.selection-summary {
  margin-top: 0.75rem;
  padding: 0.75rem;
  background-color: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 0.5rem;
}

.selection-text {
  font-size: 0.875rem;
  color: #0c4a6e;
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .radio-item:hover {
    background-color: #374151;
    border-color: #4b5563;
  }
  
  .radio-title,
  .checkbox-label {
    color: #f3f4f6;
  }
  
  .radio-description {
    color: #9ca3af;
  }
  
  .custom-radio-button {
    background-color: #1f2937;
    border-color: #4b5563;
  }
  
  .custom-radio-button:hover {
    background-color: #374151;
  }
  
  .custom-radio-input:checked + .custom-radio-button {
    background-color: #1e3a8a;
  }
  
  .toggle-switch {
    background-color: #4b5563;
  }
  
  .selection-summary {
    background-color: #1e3a8a;
    border-color: #3b82f6;
  }
  
  .selection-text {
    color: #93c5fd;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .radio-item,
  .custom-radio-button,
  .radio-indicator,
  .toggle-switch,
  .toggle-thumb {
    transition: none;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .radio-input,
  .checkbox-input {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
  
  .custom-radio-button {
    border-width: 3px;
  }
  
  .toggle-switch {
    border: 2px solid currentColor;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Accessible Design</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Proper ARIA labels, keyboard navigation, and focus management</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Custom Styling</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Beautifully styled alternatives to default browser controls</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Multiple Variations</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Standard, custom styled, and toggle switch variations</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Feedback</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear selection states and hover effects</p>
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
            <div className="text-2xl mb-2">📝</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Forms & Surveys</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Single and multiple choice questions</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚙️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Settings Panels</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">User preferences and configuration options</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">E-commerce</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Product options, payment methods, and shipping</p>
          </div>
        </div>
      </div>
    </div>
  );
}