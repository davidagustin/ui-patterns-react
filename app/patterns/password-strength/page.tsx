'use client';

import { useState, useEffect } from 'react';

export default function PasswordStrengthPattern() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState<'weak' | 'medium' | 'strong' | 'very-strong'>('weak');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  const calculateStrength = (password: string) => {
    let score = 0;
    const feedback: string[] = [];

    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('At least 8 characters');
    }

    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include lowercase letters');
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include uppercase letters');
    }

    if (/[0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include numbers');
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include special characters');
    }

    return { score, feedback };
  };

  const { score, feedback } = calculateStrength(password);

  const getStrengthColor = () => {
    if (score <= 1) return 'bg-red-500';
    if (score <= 2) return 'bg-orange-500';
    if (score <= 3) return 'bg-yellow-500';
    if (score <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (score <= 1) return 'Very Weak';
    if (score <= 2) return 'Weak';
    if (score <= 3) return 'Fair';
    if (score <= 4) return 'Good';
    return 'Strong';
  };

  const getStrengthWidth = () => {
    return `${(score / 5) * 100}%`;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🔒 Password Strength Meter Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Provide real-time visual feedback on password strength to help users create secure passwords.
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
              Type a password to see the strength meter in action. The meter evaluates length, character types, and provides helpful feedback.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pr-12"
                    placeholder="Enter your password..."
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {/* Strength Meter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password Strength
                  </span>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${
                    score <= 1 ? 'text-red-600 bg-red-100 dark:bg-red-900/20' :
                    score <= 2 ? 'text-orange-600 bg-orange-100 dark:bg-orange-900/20' :
                    score <= 3 ? 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20' :
                    score <= 4 ? 'text-blue-600 bg-blue-100 dark:bg-blue-900/20' :
                    'text-green-600 bg-green-100 dark:bg-green-900/20'
                  }`}>
                    {getStrengthText()}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                    style={{ width: getStrengthWidth() }}
                  />
                </div>
                
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Score: {score}/5
                </div>
              </div>

              {/* Feedback */}
              {feedback.length > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                    💡 Suggestions to improve your password:
                  </h4>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                    {feedback.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Success Message */}
              {score === 5 && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <div className="flex items-center text-green-800 dark:text-green-200">
                    <span className="text-lg mr-2">✅</span>
                    <span className="font-medium">Excellent! Your password is strong and secure.</span>
                  </div>
                </div>
              )}
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

export default function PasswordStrengthPattern() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const calculateStrength = (password: string) => {
    let score = 0;
    const feedback: string[] = [];

    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('At least 8 characters');
    }

    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include lowercase letters');
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include uppercase letters');
    }

    if (/[0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include numbers');
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include special characters');
    }

    return { score, feedback };
  };

  const { score, feedback } = calculateStrength(password);

  const getStrengthColor = () => {
    if (score <= 1) return 'bg-red-500';
    if (score <= 2) return 'bg-orange-500';
    if (score <= 3) return 'bg-yellow-500';
    if (score <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (score <= 1) return 'Very Weak';
    if (score <= 2) return 'Weak';
    if (score <= 3) return 'Fair';
    if (score <= 4) return 'Good';
    return 'Strong';
  };

  const getStrengthWidth = () => {
    return \`\${(score / 5) * 100}%\`;
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field pr-12"
            placeholder="Enter your password..."
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
      </div>

      {/* Strength Meter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Password Strength</span>
          <span className="text-sm font-medium px-2 py-1 rounded">
            {getStrengthText()}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={\`h-2 rounded-full transition-all duration-300 \${getStrengthColor()}\`}
            style={{ width: getStrengthWidth() }}
          />
        </div>
      </div>

      {/* Feedback */}
      {feedback.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">
            Suggestions to improve your password:
          </h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            {feedback.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}`}
              </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`.password-strength-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
}

.password-input-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.password-input {
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: 3rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.password-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.toggle-password-button {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: color 0.3s ease;
}

.toggle-password-button:hover {
  color: #374151;
}

.strength-meter {
  margin-bottom: 1.5rem;
}

.strength-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 4px;
}

.strength-fill.weak {
  width: 25%;
  background: #ef4444;
}

.strength-fill.medium {
  width: 50%;
  background: #f59e0b;
}

.strength-fill.strong {
  width: 75%;
  background: #10b981;
}

.strength-fill.very-strong {
  width: 100%;
  background: #059669;
}

.strength-text {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.strength-text.weak {
  color: #ef4444;
}

.strength-text.medium {
  color: #f59e0b;
}

.strength-text.strong {
  color: #10b981;
}

.strength-text.very-strong {
  color: #059669;
}

.strength-description {
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.requirements-list {
  background: #f9fafb;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.requirements-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
}

.requirement-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.requirement-icon {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.625rem;
  flex-shrink: 0;
}

.requirement-icon.met {
  background: #10b981;
  color: white;
}

.requirement-icon.unmet {
  background: #e5e7eb;
  color: #6b7280;
}

.requirement-text {
  color: #374151;
}

.requirement-text.met {
  color: #059669;
}

.requirement-text.unmet {
  color: #6b7280;
}

.suggestions {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.5rem;
  padding: 1rem;
}

.suggestions-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 0.5rem;
}

.suggestions-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.suggestions-list li {
  font-size: 0.875rem;
  color: #1e40af;
  margin-bottom: 0.25rem;
  padding-left: 1rem;
  position: relative;
}

.suggestions-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #3b82f6;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .password-input {
    background: #1f2937;
    border-color: #374151;
    color: #f9fafb;
  }
  
  .password-input:focus {
    border-color: #3b82f6;
  }
  
  .requirements-list {
    background: #1f2937;
  }
  
  .requirements-title {
    color: #d1d5db;
  }
  
  .requirement-text {
    color: #d1d5db;
  }
  
  .requirement-text.unmet {
    color: #9ca3af;
  }
  
  .requirement-icon.unmet {
    background: #374151;
    color: #9ca3af;
  }
  
  .suggestions {
    background: #1e3a8a;
    border-color: #3b82f6;
  }
  
  .suggestions-title {
    color: #93c5fd;
  }
  
  .suggestions-list li {
    color: #93c5fd;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Real-time Evaluation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Instant feedback as users type their password</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Progress Bar</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Color-coded strength indicator with smooth animations</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Helpful Feedback</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Specific suggestions to improve password strength</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Show/Hide Toggle</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Allow users to see their password while typing</p>
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
            <div className="text-2xl mb-2">👤</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">User Registration</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Guide users to create strong passwords during sign-up</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🔐</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Password Reset</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Ensure new passwords meet security requirements</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚙️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Settings Panel</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Allow users to update their password securely</p>
          </div>
        </div>
      </div>
    </div>
  );
}
