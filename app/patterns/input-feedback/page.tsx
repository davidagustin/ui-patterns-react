'use client';

import { useState, useEffect } from 'react';

export default function InputFeedbackPattern() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  const [emailStatus, setEmailStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong'>('weak');
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [phoneStatus, setPhoneStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  // Email validation
  useEffect(() => {
    if (!email) {
      setEmailStatus('idle');
      return;
    }

    setEmailStatus('validating');
    const timer = setTimeout(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailStatus(emailRegex.test(email) ? 'valid' : 'invalid');
    }, 500);

    return () => clearTimeout(timer);
  }, [email]);

  // Password strength calculation
  useEffect(() => {
    if (!password) {
      setPasswordStrength('weak');
      return;
    }

    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;

    if (score <= 2) setPasswordStrength('weak');
    else if (score <= 4) setPasswordStrength('medium');
    else setPasswordStrength('strong');
  }, [password]);

  // Username availability check (simulated)
  useEffect(() => {
    if (!username) {
      setUsernameStatus('idle');
      return;
    }

    if (username.length < 3) {
      setUsernameStatus('idle');
      return;
    }

    setUsernameStatus('checking');
    const timer = setTimeout(() => {
      // Simulate API call - usernames 'admin', 'user', 'test' are taken
      const takenUsernames = ['admin', 'user', 'test', 'demo'];
      setUsernameStatus(takenUsernames.includes(username.toLowerCase()) ? 'taken' : 'available');
    }, 1000);

    return () => clearTimeout(timer);
  }, [username]);

  // Phone validation
  useEffect(() => {
    if (!phone) {
      setPhoneStatus('idle');
      return;
    }

    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    setPhoneStatus(phoneRegex.test(phone.replace(/\s/g, '')) ? 'valid' : 'invalid');
  }, [phone]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
      case 'available':
        return '✓';
      case 'invalid':
      case 'taken':
        return '✗';
      case 'validating':
      case 'checking':
        return '⏳';
      default:
        return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
      case 'available':
        return 'text-green-600 dark:text-green-400';
      case 'invalid':
      case 'taken':
        return 'text-red-600 dark:text-red-400';
      case 'validating':
      case 'checking':
        return 'text-yellow-600 dark:text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'strong':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          💬 Input Feedback
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Provide real-time validation and feedback as users type, helping them correct errors immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            
            <div className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`input-field pr-10 ${
                      emailStatus === 'valid' ? 'border-green-500 focus:ring-green-500' :
                      emailStatus === 'invalid' ? 'border-red-500 focus:ring-red-500' :
                      'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {emailStatus !== 'idle' && (
                    <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium ${getStatusColor(emailStatus)}`}>
                      {getStatusIcon(emailStatus)}
                    </span>
                  )}
                </div>
                {emailStatus === 'validating' && (
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">Validating email format...</p>
                )}
                {emailStatus === 'valid' && (
                  <p className="text-sm text-green-600 dark:text-green-400">✓ Valid email address</p>
                )}
                {emailStatus === 'invalid' && email && (
                  <p className="text-sm text-red-600 dark:text-red-400">✗ Please enter a valid email address</p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    placeholder="Enter your password"
                  />
                </div>
                {password && (
                  <div className="space-y-2">
                    <div className="flex space-x-1">
                      <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                        passwordStrength === 'weak' ? 'bg-red-500' :
                        passwordStrength === 'medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}></div>
                      <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                        passwordStrength === 'weak' ? 'bg-gray-300' :
                        passwordStrength === 'medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}></div>
                      <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                        passwordStrength === 'weak' ? 'bg-gray-300' :
                        passwordStrength === 'medium' ? 'bg-gray-300' :
                        'bg-green-500'
                      }`}></div>
                    </div>
                    <p className={`text-sm font-medium ${
                      passwordStrength === 'weak' ? 'text-red-600 dark:text-red-400' :
                      passwordStrength === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-green-600 dark:text-green-400'
                    }`}>
                      Password strength: {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                    </p>
                  </div>
                )}
              </div>

              {/* Username Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`input-field pr-10 ${
                      usernameStatus === 'available' ? 'border-green-500 focus:ring-green-500' :
                      usernameStatus === 'taken' ? 'border-red-500 focus:ring-red-500' :
                      'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Choose a username"
                  />
                  {usernameStatus !== 'idle' && (
                    <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium ${getStatusColor(usernameStatus)}`}>
                      {getStatusIcon(usernameStatus)}
                    </span>
                  )}
                </div>
                {usernameStatus === 'checking' && (
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">Checking availability...</p>
                )}
                {usernameStatus === 'available' && (
                  <p className="text-sm text-green-600 dark:text-green-400">✓ Username is available</p>
                )}
                {usernameStatus === 'taken' && (
                  <p className="text-sm text-red-600 dark:text-red-400">✗ Username is already taken</p>
                )}
                {username && username.length < 3 && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">Username must be at least 3 characters</p>
                )}
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`input-field pr-10 ${
                      phoneStatus === 'valid' ? 'border-green-500 focus:ring-green-500' :
                      phoneStatus === 'invalid' ? 'border-red-500 focus:ring-red-500' :
                      'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Enter phone number"
                  />
                  {phoneStatus !== 'idle' && (
                    <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium ${getStatusColor(phoneStatus)}`}>
                      {getStatusIcon(phoneStatus)}
                    </span>
                  )}
                </div>
                {phoneStatus === 'valid' && (
                  <p className="text-sm text-green-600 dark:text-green-400">✓ Valid phone number</p>
                )}
                {phoneStatus === 'invalid' && phone && (
                  <p className="text-sm text-red-600 dark:text-red-400">✗ Please enter a valid phone number</p>
                )}
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
              <pre className="text-sm leading-relaxed">
{`'use client';

import { useState, useEffect } from 'react';

export default function InputFeedbackExample() {
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState('idle');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('weak');

  // Email validation
  useEffect(() => {
    if (!email) {
      setEmailStatus('idle');
      return;
    }

    setEmailStatus('validating');
    const timer = setTimeout(() => {
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      setEmailStatus(emailRegex.test(email) ? 'valid' : 'invalid');
    }, 500);

    return () => clearTimeout(timer);
  }, [email]);

  // Password strength calculation
  useEffect(() => {
    if (!password) {
      setPasswordStrength('weak');
      return;
    }

    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\\d/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;

    if (score <= 2) setPasswordStrength('weak');
    else if (score <= 4) setPasswordStrength('medium');
    else setPasswordStrength('strong');
  }, [password]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'valid': return '✓';
      case 'invalid': return '✗';
      case 'validating': return '⏳';
      default: return '';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'valid': return 'text-green-600';
      case 'invalid': return 'text-red-600';
      case 'validating': return 'text-yellow-600';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Email Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Email Address</label>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={\`input-field pr-10 \${
              emailStatus === 'valid' ? 'border-green-500' :
              emailStatus === 'invalid' ? 'border-red-500' :
              'border-gray-300'
            }\`}
            placeholder="Enter your email"
          />
          {emailStatus !== 'idle' && (
            <span className={\`absolute right-3 top-1/2 transform -translate-y-1/2 \${getStatusColor(emailStatus)}\`}>
              {getStatusIcon(emailStatus)}
            </span>
          )}
        </div>
        {emailStatus === 'validating' && (
          <p className="text-sm text-yellow-600">Validating...</p>
        )}
        {emailStatus === 'valid' && (
          <p className="text-sm text-green-600">✓ Valid email</p>
        )}
        {emailStatus === 'invalid' && email && (
          <p className="text-sm text-red-600">✗ Invalid email</p>
        )}
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          placeholder="Enter password"
        />
        {password && (
          <div className="space-y-2">
            <div className="flex space-x-1">
              <div className={\`h-2 flex-1 rounded-full \${
                passwordStrength === 'weak' ? 'bg-red-500' :
                passwordStrength === 'medium' ? 'bg-yellow-500' :
                'bg-green-500'
              }\`}></div>
              <div className={\`h-2 flex-1 rounded-full \${
                passwordStrength === 'weak' ? 'bg-gray-300' :
                passwordStrength === 'medium' ? 'bg-yellow-500' :
                'bg-green-500'
              }\`}></div>
              <div className={\`h-2 flex-1 rounded-full \${
                passwordStrength === 'weak' ? 'bg-gray-300' :
                passwordStrength === 'medium' ? 'bg-gray-300' :
                'bg-green-500'
              }\`}></div>
            </div>
            <p className={\`text-sm \${
              passwordStrength === 'weak' ? 'text-red-600' :
              passwordStrength === 'medium' ? 'text-yellow-600' :
              'text-green-600'
            }\`}>
              Strength: {passwordStrength}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}`}
              </pre>
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Real-time Validation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Instant feedback as users type</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Indicators</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Icons and colors show validation status</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Debounced Validation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Prevents excessive validation calls</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Progressive Feedback</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Show different states (checking, valid, invalid)</p>
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
            <div className="text-2xl mb-2">📧</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Email Validation</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Check email format and availability</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🔐</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Password Strength</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Real-time password strength indicators</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">👤</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Username Check</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Verify username availability</p>
          </div>
        </div>
      </div>
    </div>
  );
}
