'use client';

import { useState, useEffect } from 'react';

export default function GoodDefaultsPattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    country: 'United States',
    timezone: 'America/New_York',
    language: 'English',
    notifications: true,
    theme: 'system',
    dateFormat: 'MM/DD/YYYY',
  });

  const [projectSettings, setProjectSettings] = useState({
    projectName: '',
    description: '',
    visibility: 'private',
    license: 'MIT',
    includeReadme: true,
    includeGitignore: true,
    framework: 'react',
    packageManager: 'npm',
  });

  const [formData, setFormData] = useState({
    quantity: 1,
    priority: 'medium',
    category: 'general',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
    assignee: 'current-user',
    status: 'pending',
  });

  const [preferences, setPreferences] = useState({
    emailFrequency: 'weekly',
    marketingEmails: false,
    securityAlerts: true,
    autoSave: true,
    autoBackup: true,
    compressionLevel: 'medium',
  });

  // Simulate detecting user's location/timezone
  useEffect(() => {
    const detectUserLocation = () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const locale = navigator.language;
        
        setUserProfile(prev => ({
          ...prev,
          timezone,
          language: locale.startsWith('en') ? 'English' : 
                   locale.startsWith('es') ? 'Spanish' :
                   locale.startsWith('fr') ? 'French' : 'English'
        }));
      } catch (error) {
        console.log('Could not detect user location');
      }
    };

    detectUserLocation();
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ⚡ Good Defaults Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Provide smart default values that reduce user effort, improve completion rates, and guide users toward optimal choices.
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
              Notice how forms are pre-filled with sensible defaults based on context, user location, and common preferences.
            </p>
            
            <div className="space-y-6">
              {/* User Profile with Smart Defaults */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">User Profile (Location-based Defaults)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  <select
                    value={userProfile.country}
                    onChange={(e) => setUserProfile({...userProfile, country: e.target.value})}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="United States">🇺🇸 United States</option>
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="United Kingdom">🇬🇧 United Kingdom</option>
                    <option value="Germany">🇩🇪 Germany</option>
                    <option value="France">🇫🇷 France</option>
                  </select>
                  <select
                    value={userProfile.timezone}
                    onChange={(e) => setUserProfile({...userProfile, timezone: e.target.value})}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                  </select>
                  <select
                    value={userProfile.language}
                    onChange={(e) => setUserProfile({...userProfile, language: e.target.value})}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Español</option>
                    <option value="French">Français</option>
                    <option value="German">Deutsch</option>
                  </select>
                  <select
                    value={userProfile.theme}
                    onChange={(e) => setUserProfile({...userProfile, theme: e.target.value})}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="system">🔄 System (Recommended)</option>
                    <option value="light">☀️ Light</option>
                    <option value="dark">🌙 Dark</option>
                  </select>
                </div>
                <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs text-blue-700 dark:text-blue-300">
                  💡 Defaults detected: {userProfile.timezone}, {userProfile.language}
                </div>
              </div>

              {/* Project Settings with Opinionated Defaults */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Project Setup (Opinionated Defaults)</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={projectSettings.projectName}
                    onChange={(e) => setProjectSettings({...projectSettings, projectName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <select
                      value={projectSettings.visibility}
                      onChange={(e) => setProjectSettings({...projectSettings, visibility: e.target.value})}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    >
                      <option value="private">🔒 Private (Recommended)</option>
                      <option value="public">🌐 Public</option>
                    </select>
                    <select
                      value={projectSettings.license}
                      onChange={(e) => setProjectSettings({...projectSettings, license: e.target.value})}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    >
                      <option value="MIT">MIT License (Popular)</option>
                      <option value="Apache-2.0">Apache 2.0</option>
                      <option value="GPL-3.0">GPL 3.0</option>
                      <option value="None">No License</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={projectSettings.includeReadme}
                        onChange={(e) => setProjectSettings({...projectSettings, includeReadme: e.target.checked})}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span>Include README.md</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={projectSettings.includeGitignore}
                        onChange={(e) => setProjectSettings({...projectSettings, includeGitignore: e.target.checked})}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span>Include .gitignore</span>
                    </label>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded text-xs text-green-700 dark:text-green-300">
                  ✅ Recommended settings selected for best practices
                </div>
              </div>

              {/* Task Form with Context-aware Defaults */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Create Task (Context-aware Defaults)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder="Quantity"
                  />
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="low">🟢 Low Priority</option>
                    <option value="medium">🟡 Medium Priority (Default)</option>
                    <option value="high">🟠 High Priority</option>
                    <option value="urgent">🔴 Urgent</option>
                  </select>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  <select
                    value={formData.assignee}
                    onChange={(e) => setFormData({...formData, assignee: e.target.value})}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="current-user">👤 Assign to me</option>
                    <option value="team-lead">👨‍💼 Team Lead</option>
                    <option value="unassigned">❓ Unassigned</option>
                  </select>
                </div>
                <div className="mt-3 p-2 bg-purple-50 dark:bg-purple-900/20 rounded text-xs text-purple-700 dark:text-purple-300">
                  📅 Due date set to 7 days from now (typical project timeline)
                </div>
              </div>

              {/* Notification Preferences with Safe Defaults */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Preferences (Safe Defaults)</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <select
                      value={preferences.emailFrequency}
                      onChange={(e) => setPreferences({...preferences, emailFrequency: e.target.value})}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    >
                      <option value="never">Never</option>
                      <option value="weekly">📧 Weekly (Balanced)</option>
                      <option value="daily">Daily</option>
                      <option value="instant">Instant</option>
                    </select>
                    <select
                      value={preferences.compressionLevel}
                      onChange={(e) => setPreferences({...preferences, compressionLevel: e.target.value})}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    >
                      <option value="low">Low Compression</option>
                      <option value="medium">⚖️ Medium (Optimal)</option>
                      <option value="high">High Compression</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={preferences.marketingEmails}
                        onChange={(e) => setPreferences({...preferences, marketingEmails: e.target.checked})}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span>Marketing emails (opt-in)</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={preferences.securityAlerts}
                        onChange={(e) => setPreferences({...preferences, securityAlerts: e.target.checked})}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span>Security alerts (recommended)</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={preferences.autoSave}
                        onChange={(e) => setPreferences({...preferences, autoSave: e.target.checked})}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span>Auto-save (convenience)</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={preferences.autoBackup}
                        onChange={(e) => setPreferences({...preferences, autoBackup: e.target.checked})}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span>Auto-backup (safety)</span>
                    </label>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-orange-50 dark:bg-orange-900/20 rounded text-xs text-orange-700 dark:text-orange-300">
                  🛡️ Security features enabled by default, marketing disabled for privacy
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
{`import { useState, useEffect } from 'react';

export default function GoodDefaults() {
  const [formData, setFormData] = useState({
    country: 'United States', // Most common
    timezone: 'America/New_York', // Will be detected
    language: 'English', // Browser default
    notifications: true, // Useful feature
    theme: 'system', // Respect user preference
    privacy: 'private', // Safe default
    quantity: 1, // Sensible minimum
    priority: 'medium', // Balanced choice
    dueDate: getDefaultDueDate(), // 7 days from now
    emailFrequency: 'weekly', // Not overwhelming
    securityAlerts: true, // Safety first
    marketingEmails: false, // Privacy first
  });

  // Smart detection of user preferences
  useEffect(() => {
    const detectUserDefaults = () => {
      try {
        // Detect timezone
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Detect language
        const language = navigator.language;
        const languageName = language.startsWith('en') ? 'English' :
                           language.startsWith('es') ? 'Spanish' :
                           language.startsWith('fr') ? 'French' : 'English';
        
        // Detect theme preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = prefersDark ? 'dark' : 'light';
        
        setFormData(prev => ({
          ...prev,
          timezone,
          language: languageName,
          theme: 'system' // Still prefer system for flexibility
        }));
      } catch (error) {
        console.log('Could not detect user preferences, using defaults');
      }
    };

    detectUserDefaults();
  }, []);

  // Helper function for smart date defaults
  function getDefaultDueDate() {
    const date = new Date();
    date.setDate(date.getDate() + 7); // 7 days from now
    return date.toISOString().split('T')[0];
  }

  // Context-aware defaults based on user type
  const getProjectDefaults = (userType = 'developer') => {
    const defaults = {
      developer: {
        framework: 'react', // Popular choice
        license: 'MIT', // Open source friendly
        includeTests: true, // Best practice
        packageManager: 'npm', // Most common
      },
      designer: {
        colorScheme: 'modern', // Trendy choice
        components: 'minimal', // Clean approach
        responsive: true, // Essential
        accessibility: true, // Important
      },
      business: {
        analytics: true, // Data-driven
        seo: true, // Visibility
        security: 'high', // Compliance
        backup: 'daily', // Risk management
      }
    };
    
    return defaults[userType] || defaults.developer;
  };

  // Location-based defaults
  const getLocationDefaults = (country) => {
    const locationDefaults = {
      'United States': {
        currency: 'USD',
        dateFormat: 'MM/DD/YYYY',
        timezone: 'America/New_York',
        language: 'English'
      },
      'United Kingdom': {
        currency: 'GBP',
        dateFormat: 'DD/MM/YYYY',
        timezone: 'Europe/London',
        language: 'English'
      },
      'Germany': {
        currency: 'EUR',
        dateFormat: 'DD.MM.YYYY',
        timezone: 'Europe/Berlin',
        language: 'German'
      }
    };
    
    return locationDefaults[country] || locationDefaults['United States'];
  };

  return (
    <form className="good-defaults-form">
      {/* User Profile with Smart Defaults */}
      <section className="form-section">
        <h3>Profile Settings</h3>
        
        <select
          value={formData.country}
          onChange={(e) => {
            const country = e.target.value;
            const locationDefaults = getLocationDefaults(country);
            setFormData(prev => ({
              ...prev,
              country,
              ...locationDefaults
            }));
          }}
          className="form-field"
        >
          <option value="United States">🇺🇸 United States</option>
          <option value="United Kingdom">🇬🇧 United Kingdom</option>
          <option value="Germany">🇩🇪 Germany</option>
        </select>

        <select value={formData.theme} className="form-field">
          <option value="system">🔄 System (Recommended)</option>
          <option value="light">☀️ Light</option>
          <option value="dark">🌙 Dark</option>
        </select>
      </section>

      {/* Privacy-First Defaults */}
      <section className="form-section">
        <h3>Privacy & Notifications</h3>
        
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.securityAlerts}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              securityAlerts: e.target.checked
            }))}
          />
          Security alerts (recommended ✅)
        </label>
        
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.marketingEmails}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              marketingEmails: e.target.checked
            }))}
          />
          Marketing emails (opt-in 🔒)
        </label>
      </section>

      {/* Smart Task Defaults */}
      <section className="form-section">
        <h3>Task Settings</h3>
        
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            dueDate: e.target.value
          }))}
          className="form-field"
        />
        
        <select value={formData.priority} className="form-field">
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority (Default)</option>
          <option value="high">High Priority</option>
        </select>
      </section>

      <button type="submit" className="submit-btn">
        Create with Smart Defaults
      </button>
    </form>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Good Defaults Form */
.good-defaults-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Form Sections */
.form-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.form-section h3 {
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
}

/* Form Fields */
.form-field {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
}

.form-field:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
}

/* Recommended Options Styling */
.form-field option[value*="system"],
.form-field option[value*="medium"],
.form-field option[value*="private"] {
  background-color: #e6fffa;
  font-weight: 600;
}

/* Checkbox Labels */
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #4a5568;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  accent-color: #3182ce;
}

/* Recommended vs Opt-in Styling */
.checkbox-label:has(input:checked) {
  color: #2d3748;
  font-weight: 500;
}

/* Security/Safety Indicators */
.checkbox-label:contains("recommended") {
  color: #059669;
}

.checkbox-label:contains("opt-in") {
  color: #d69e2e;
}

/* Smart Default Indicators */
.form-field[data-smart-default="true"] {
  border-color: #48bb78;
  background-color: #f0fff4;
}

.form-field[data-smart-default="true"]:focus {
  border-color: #38a169;
  box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.1);
}

/* Default Value Hints */
.form-field::after {
  content: attr(data-default-hint);
  position: absolute;
  top: 100%;
  left: 0;
  font-size: 0.75rem;
  color: #718096;
  margin-top: 0.25rem;
}

/* Submit Button */
.submit-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.submit-btn:active {
  transform: translateY(0);
}

/* Status Indicators */
.default-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-top: 0.5rem;
}

.default-indicator.smart {
  background-color: #e6fffa;
  color: #234e52;
  border: 1px solid #81e6d9;
}

.default-indicator.recommended {
  background-color: #f0fff4;
  color: #22543d;
  border: 1px solid #9ae6b4;
}

.default-indicator.safe {
  background-color: #fef5e7;
  color: #744210;
  border: 1px solid #f6e05e;
}

/* Responsive Design */
@media (max-width: 640px) {
  .good-defaults-form {
    padding: 1rem;
    margin: 1rem;
  }
  
  .form-section {
    padding: 1rem;
  }
  
  .form-field {
    padding: 0.5rem;
  }
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .good-defaults-form {
    background: #2d3748;
    color: #e2e8f0;
  }
  
  .form-section {
    background: #4a5568;
    border-color: #718096;
  }
  
  .form-section h3 {
    color: #e2e8f0;
  }
  
  .form-field {
    background: #2d3748;
    border-color: #718096;
    color: #e2e8f0;
  }
  
  .form-field:focus {
    border-color: #63b3ed;
    box-shadow: 0 0 0 3px rgba(99, 179, 237, 0.1);
  }
  
  .checkbox-label {
    color: #a0aec0;
  }
  
  .default-indicator.smart {
    background-color: #234e52;
    color: #81e6d9;
  }
  
  .default-indicator.recommended {
    background-color: #22543d;
    color: #9ae6b4;
  }
}

/* Accessibility */
.form-field:focus-visible {
  outline: 2px solid #3182ce;
  outline-offset: 2px;
}

.checkbox-label:focus-within {
  outline: 2px solid #3182ce;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Animation for Smart Defaults */
.form-field[data-auto-filled="true"] {
  animation: highlightDefault 0.5s ease-in-out;
}

@keyframes highlightDefault {
  0% {
    background-color: #e6fffa;
    transform: scale(1.02);
  }
  100% {
    background-color: white;
    transform: scale(1);
  }
}

/* Validation States */
.form-field.valid {
  border-color: #48bb78;
}

.form-field.invalid {
  border-color: #f56565;
}

.form-field.has-smart-default {
  position: relative;
}

.form-field.has-smart-default::before {
  content: '🤖';
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.875rem;
  opacity: 0.6;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Smart Detection</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Automatically detect user location, language, and preferences</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Privacy-First</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Security features enabled, marketing disabled by default</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Context-Aware</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Defaults change based on user type and context</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Best Practices</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Promote good habits and optimal choices</p>
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
            <p className="text-sm text-gray-600 dark:text-gray-400">Pre-fill location, language, and safe privacy settings</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚙️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Project Setup</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Choose optimal frameworks and configurations</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">E-commerce</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Set reasonable quantities and shipping preferences</p>
          </div>
        </div>
      </div>
    </div>
  );
}