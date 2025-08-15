'use client';

import { useState } from 'react';

export default function InlineHelpPattern() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
    postalCode: ''
  });

  const [activeHelp, setActiveHelp] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  const helpContent = {
    username: {
      title: "Username Requirements",
      content: "Your username must be 3-20 characters long and can only contain letters, numbers, and underscores. It cannot start with a number.",
      icon: "👤",
      type: "info"
    },
    email: {
      title: "Email Address",
      content: "We'll use this email to send you important account updates and notifications. Make sure it's an email you check regularly.",
      icon: "✉️",
      type: "info"
    },
    password: {
      title: "Strong Password Tips",
      content: "Create a strong password with at least 8 characters, including uppercase and lowercase letters, numbers, and special characters. Avoid common words or personal information.",
      icon: "🔒",
      type: "security"
    },
    confirmPassword: {
      title: "Password Confirmation",
      content: "Re-enter your password exactly as you typed it above. This helps ensure you remember your password correctly.",
      icon: "✅",
      type: "info"
    },
    phoneNumber: {
      title: "Phone Number Format",
      content: "Enter your phone number including area code. We support formats like (555) 123-4567, 555-123-4567, or 5551234567.",
      icon: "📱",
      type: "info"
    },
    dateOfBirth: {
      title: "Date of Birth",
      content: "Your date of birth is used for age verification and security purposes. We won't share this information publicly.",
      icon: "🎂",
      type: "privacy"
    },
    address: {
      title: "Shipping Address",
      content: "Enter your full street address including apartment or unit number. This will be used as your default shipping address.",
      icon: "🏠",
      type: "info"
    },
    postalCode: {
      title: "Postal Code",
      content: "Enter your ZIP or postal code. This helps us calculate shipping costs and delivery times for your orders.",
      icon: "📮",
      type: "info"
    }
  };

  const getHelpTypeColor = (type: string) => {
    switch (type) {
      case 'security':
        return 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20';
      case 'privacy':
        return 'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20';
      default:
        return 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  const getHelpTypeTextColor = (type: string) => {
    switch (type) {
      case 'security':
        return 'text-yellow-800 dark:text-yellow-200';
      case 'privacy':
        return 'text-purple-800 dark:text-purple-200';
      default:
        return 'text-blue-800 dark:text-blue-200';
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleHelp = (field: string) => {
    setActiveHelp(activeHelp === field ? null : field);
  };

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'username':
        return value.length >= 3 && value.length <= 20 && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(value);
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'password':
        return value.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value);
      case 'confirmPassword':
        return value === formData.password;
      case 'phoneNumber':
        return /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(value);
      default:
        return value.trim() !== '';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          💡 Inline Help Box Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Provide contextual help and guidance directly within forms and interfaces to reduce user confusion and errors.
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
              Click on the help icons (?) next to each field to see contextual help. Watch how validation states update in real-time.
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Create Account</h3>
              
              {/* Username Field */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username *
                  </label>
                  <button
                    type="button"
                    onClick={() => toggleHelp('username')}
                    className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    <span className="text-xs font-bold">?</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className={`input-field w-full ${
                    formData.username && !validateField('username', formData.username)
                      ? 'border-red-300 dark:border-red-600'
                      : formData.username && validateField('username', formData.username)
                      ? 'border-green-300 dark:border-green-600'
                      : ''
                  }`}
                  placeholder="Enter your username"
                />
                {activeHelp === 'username' && (
                  <div className={`p-3 rounded-lg border ${getHelpTypeColor(helpContent.username.type)}`}>
                    <div className="flex items-start space-x-2">
                      <span className="text-lg">{helpContent.username.icon}</span>
                      <div>
                        <h4 className={`font-medium ${getHelpTypeTextColor(helpContent.username.type)}`}>
                          {helpContent.username.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {helpContent.username.content}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address *
                  </label>
                  <button
                    type="button"
                    onClick={() => toggleHelp('email')}
                    className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    <span className="text-xs font-bold">?</span>
                  </button>
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`input-field w-full ${
                    formData.email && !validateField('email', formData.email)
                      ? 'border-red-300 dark:border-red-600'
                      : formData.email && validateField('email', formData.email)
                      ? 'border-green-300 dark:border-green-600'
                      : ''
                  }`}
                  placeholder="your@email.com"
                />
                {activeHelp === 'email' && (
                  <div className={`p-3 rounded-lg border ${getHelpTypeColor(helpContent.email.type)}`}>
                    <div className="flex items-start space-x-2">
                      <span className="text-lg">{helpContent.email.icon}</span>
                      <div>
                        <h4 className={`font-medium ${getHelpTypeTextColor(helpContent.email.type)}`}>
                          {helpContent.email.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {helpContent.email.content}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password *
                  </label>
                  <button
                    type="button"
                    onClick={() => toggleHelp('password')}
                    className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    <span className="text-xs font-bold">?</span>
                  </button>
                </div>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`input-field w-full ${
                    formData.password && !validateField('password', formData.password)
                      ? 'border-red-300 dark:border-red-600'
                      : formData.password && validateField('password', formData.password)
                      ? 'border-green-300 dark:border-green-600'
                      : ''
                  }`}
                  placeholder="Create a strong password"
                />
                {activeHelp === 'password' && (
                  <div className={`p-3 rounded-lg border ${getHelpTypeColor(helpContent.password.type)}`}>
                    <div className="flex items-start space-x-2">
                      <span className="text-lg">{helpContent.password.icon}</span>
                      <div>
                        <h4 className={`font-medium ${getHelpTypeTextColor(helpContent.password.type)}`}>
                          {helpContent.password.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {helpContent.password.content}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Phone Number Field */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <button
                    type="button"
                    onClick={() => toggleHelp('phoneNumber')}
                    className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    <span className="text-xs font-bold">?</span>
                  </button>
                </div>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="input-field w-full"
                  placeholder="(555) 123-4567"
                />
                {activeHelp === 'phoneNumber' && (
                  <div className={`p-3 rounded-lg border ${getHelpTypeColor(helpContent.phoneNumber.type)}`}>
                    <div className="flex items-start space-x-2">
                      <span className="text-lg">{helpContent.phoneNumber.icon}</span>
                      <div>
                        <h4 className={`font-medium ${getHelpTypeTextColor(helpContent.phoneNumber.type)}`}>
                          {helpContent.phoneNumber.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {helpContent.phoneNumber.content}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Date of Birth Field */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date of Birth
                  </label>
                  <button
                    type="button"
                    onClick={() => toggleHelp('dateOfBirth')}
                    className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    <span className="text-xs font-bold">?</span>
                  </button>
                </div>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="input-field w-full"
                />
                {activeHelp === 'dateOfBirth' && (
                  <div className={`p-3 rounded-lg border ${getHelpTypeColor(helpContent.dateOfBirth.type)}`}>
                    <div className="flex items-start space-x-2">
                      <span className="text-lg">{helpContent.dateOfBirth.icon}</span>
                      <div>
                        <h4 className={`font-medium ${getHelpTypeTextColor(helpContent.dateOfBirth.type)}`}>
                          {helpContent.dateOfBirth.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {helpContent.dateOfBirth.content}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Address Field */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Address
                  </label>
                  <button
                    type="button"
                    onClick={() => toggleHelp('address')}
                    className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    <span className="text-xs font-bold">?</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="input-field w-full"
                  placeholder="123 Main Street, Apt 4B"
                />
                {activeHelp === 'address' && (
                  <div className={`p-3 rounded-lg border ${getHelpTypeColor(helpContent.address.type)}`}>
                    <div className="flex items-start space-x-2">
                      <span className="text-lg">{helpContent.address.icon}</span>
                      <div>
                        <h4 className={`font-medium ${getHelpTypeTextColor(helpContent.address.type)}`}>
                          {helpContent.address.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {helpContent.address.content}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                Create Account
              </button>
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

export default function InlineHelp() {
  const [activeHelp, setActiveHelp] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const helpContent = {
    username: {
      title: "Username Requirements",
      content: "Must be 3-20 characters, letters, numbers, and underscores only.",
      icon: "👤",
      type: "info"
    },
    email: {
      title: "Email Address", 
      content: "We'll use this for account updates and notifications.",
      icon: "✉️",
      type: "info"
    },
    password: {
      title: "Strong Password Tips",
      content: "At least 8 characters with uppercase, lowercase, numbers, and symbols.",
      icon: "🔒",
      type: "security"
    }
  };

  const getHelpTypeColor = (type) => {
    switch (type) {
      case 'security':
        return 'border-yellow-200 bg-yellow-50';
      case 'privacy':
        return 'border-purple-200 bg-purple-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  const toggleHelp = (field) => {
    setActiveHelp(activeHelp === field ? null : field);
  };

  const validateField = (field, value) => {
    switch (field) {
      case 'username':
        return value.length >= 3 && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(value);
      case 'email':
        return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);
      case 'password':
        return value.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/.test(value);
      default:
        return value.trim() !== '';
    }
  };

  return (
    <div className="form-container">
      {Object.keys(helpContent).map(field => (
        <div key={field} className="field-group">
          {/* Field Label with Help Button */}
          <div className="label-row">
            <label className="field-label">
              {field.charAt(0).toUpperCase() + field.slice(1)} *
            </label>
            <button
              type="button"
              onClick={() => toggleHelp(field)}
              className="help-button"
            >
              <span className="help-icon">?</span>
            </button>
          </div>
          
          {/* Input Field */}
          <input
            type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
            value={formData[field]}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              [field]: e.target.value
            }))}
            className={\`form-input \${
              formData[field] && !validateField(field, formData[field])
                ? 'input-error'
                : formData[field] && validateField(field, formData[field])
                ? 'input-success'
                : ''
            }\`}
            placeholder={\`Enter your \${field}\`}
          />
          
          {/* Inline Help Box */}
          {activeHelp === field && (
            <div className={\`help-box \${getHelpTypeColor(helpContent[field].type)}\`}>
              <div className="help-content">
                <span className="help-emoji">{helpContent[field].icon}</span>
                <div>
                  <h4 className="help-title">
                    {helpContent[field].title}
                  </h4>
                  <p className="help-text">
                    {helpContent[field].content}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      
      <button
        type="submit"
        className="submit-button"
      >
        Create Account
      </button>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Form Container */
.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 1.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Field Group */
.field-group {
  margin-bottom: 1.5rem;
}

/* Label Row */
.label-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

/* Help Button */
.help-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background-color: #dbeafe;
  color: #2563eb;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.help-button:hover {
  background-color: #bfdbfe;
}

.help-icon {
  font-size: 0.75rem;
  font-weight: 700;
}

/* Form Input */
.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Validation States */
.input-error {
  border-color: #ef4444;
}

.input-error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.input-success {
  border-color: #10b981;
}

.input-success:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

/* Help Box */
.help-box {
  margin-top: 0.5rem;
  padding: 0.75rem;
  border: 1px solid;
  border-radius: 0.5rem;
  animation: slideDown 0.2s ease-out;
}

/* Help Box Types */
.help-box.border-blue-200 {
  border-color: #bfdbfe;
  background-color: #eff6ff;
}

.help-box.border-yellow-200 {
  border-color: #fde68a;
  background-color: #fffbeb;
}

.help-box.border-purple-200 {
  border-color: #e9d5ff;
  background-color: #faf5ff;
}

/* Help Content */
.help-content {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.help-emoji {
  font-size: 1.125rem;
  line-height: 1;
}

.help-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.help-text {
  font-size: 0.875rem;
  color: #4b5563;
  margin: 0;
  line-height: 1.4;
}

/* Submit Button */
.submit-button {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  background-color: #3b82f6;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-button:hover {
  background-color: #2563eb;
}

.submit-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

/* Animations */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
    max-height: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0);
    max-height: 200px;
  }
}

/* Responsive Design */
@media (max-width: 640px) {
  .form-container {
    padding: 1rem;
    margin: 0 1rem;
  }
  
  .field-group {
    margin-bottom: 1rem;
  }
  
  .help-content {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .help-emoji {
    align-self: flex-start;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .form-container {
    background-color: #1f2937;
    color: #f9fafb;
  }
  
  .field-label {
    color: #d1d5db;
  }
  
  .help-button {
    background-color: rgba(59, 130, 246, 0.2);
    color: #60a5fa;
  }
  
  .help-button:hover {
    background-color: rgba(59, 130, 246, 0.3);
  }
  
  .form-input {
    background-color: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
  
  .form-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
  
  .help-box.border-blue-200 {
    border-color: #1e40af;
    background-color: rgba(59, 130, 246, 0.1);
  }
  
  .help-box.border-yellow-200 {
    border-color: #b45309;
    background-color: rgba(245, 158, 11, 0.1);
  }
  
  .help-box.border-purple-200 {
    border-color: #7c3aed;
    background-color: rgba(139, 92, 246, 0.1);
  }
  
  .help-title {
    color: #f9fafb;
  }
  
  .help-text {
    color: #d1d5db;
  }
  
  .submit-button {
    background-color: #3b82f6;
  }
  
  .submit-button:hover {
    background-color: #2563eb;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .help-button {
    border: 2px solid currentColor;
  }
  
  .form-input {
    border-width: 2px;
  }
  
  .help-box {
    border-width: 2px;
  }
  
  .submit-button {
    border: 2px solid #1e40af;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .help-box {
    animation: none;
  }
  
  .form-input,
  .help-button,
  .submit-button {
    transition: none;
  }
}

/* Focus Visible */
.help-button:focus-visible,
.form-input:focus-visible,
.submit-button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Print Styles */
@media print {
  .help-button {
    display: none;
  }
  
  .help-box {
    border: 1px solid #000;
    background: white !important;
  }
  
  .form-container {
    box-shadow: none;
    border: 1px solid #000;
  }
}

/* Touch Devices */
@media (hover: none) and (pointer: coarse) {
  .help-button {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .help-icon {
    font-size: 1rem;
  }
  
  .form-input {
    padding: 1rem;
  }
  
  .submit-button {
    padding: 1rem;
    font-size: 1rem;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Contextual Help</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Field-specific guidance and tips</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Toggle Visibility</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Show/hide help content on demand</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Categorization</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Color-coded help types (info, security, privacy)</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Validation Integration</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Works alongside form validation</p>
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
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Registration Forms</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">User signup with field requirements</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚙️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Settings Pages</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Configuration options with explanations</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">💳</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Payment Forms</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Billing information with security tips</p>
          </div>
        </div>
      </div>
    </div>
  );
}