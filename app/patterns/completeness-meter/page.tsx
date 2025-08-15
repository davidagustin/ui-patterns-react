'use client';

import { useState } from 'react';

export default function CompletenessMeterPattern() {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: '',
    skills: [] as string[],
    experience: '',
    education: '',
    location: '',
    portfolio: '',
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: ''
    }
  });

  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  const calculateCompleteness = () => {
    const fields = [
      profileData.name,
      profileData.email,
      profileData.bio,
      profileData.avatar,
      profileData.experience,
      profileData.education,
      profileData.location,
      profileData.portfolio,
      profileData.socialLinks.linkedin,
      profileData.socialLinks.github,
      profileData.socialLinks.twitter
    ];
    
    const skillsWeight = profileData.skills.length > 0 ? 1 : 0;
    const totalFields = fields.length + 1; // +1 for skills
    const filledFields = fields.filter(field => field.trim() !== '').length + skillsWeight;
    
    return Math.round((filledFields / totalFields) * 100);
  };

  const completeness = calculateCompleteness();

  const getCompletenessColor = (percentage: number) => {
    if (percentage < 30) return 'bg-red-500';
    if (percentage < 60) return 'bg-yellow-500';
    if (percentage < 80) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getCompletenessMessage = (percentage: number) => {
    if (percentage < 30) return { text: 'Getting started', icon: '🚀' };
    if (percentage < 60) return { text: 'Making progress', icon: '📈' };
    if (percentage < 80) return { text: 'Almost there', icon: '🎯' };
    if (percentage < 100) return { text: 'Nearly complete', icon: '✨' };
    return { text: 'Profile complete!', icon: '🎉' };
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('socialLinks.')) {
      const socialField = field.split('.')[1];
      setProfileData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialField]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !profileData.skills.includes(skill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
    }
  };

  const removeSkill = (skill: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const message = getCompletenessMessage(completeness);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📊 Completeness Meter Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Show users their progress towards completing a task or profile with visual feedback and encouragement.
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
              Fill out the profile form below and watch the completeness meter update in real-time.
            </p>
            
            {/* Completeness Meter */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Profile Completeness</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{message.icon}</span>
                  <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{completeness}%</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ease-out ${getCompletenessColor(completeness)}`}
                    style={{ width: `${completeness}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>0%</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{message.text}</span>
                  <span>100%</span>
                </div>
              </div>
              
              {/* Encouragement Message */}
              <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {completeness < 100 
                    ? `You're ${100 - completeness}% away from a complete profile. Keep going!`
                    : 'Congratulations! Your profile is now complete and will be more visible to others.'
                  }
                </p>
              </div>
            </div>

            {/* Profile Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Edit Profile</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="input-field w-full"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="input-field w-full"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="input-field w-full resize-none"
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Experience Level
                  </label>
                  <select
                    value={profileData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="input-field w-full"
                  >
                    <option value="">Select experience</option>
                    <option value="junior">Junior (0-2 years)</option>
                    <option value="mid">Mid-level (2-5 years)</option>
                    <option value="senior">Senior (5+ years)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Education
                  </label>
                  <input
                    type="text"
                    value={profileData.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    className="input-field w-full"
                    placeholder="Your education background"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="input-field w-full"
                    placeholder="Your location"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Portfolio URL
                  </label>
                  <input
                    type="url"
                    value={profileData.portfolio}
                    onChange={(e) => handleInputChange('portfolio', e.target.value)}
                    className="input-field w-full"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
              
              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Skills
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profileData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    className="input-field flex-1"
                    placeholder="Add a skill and press Enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addSkill(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              </div>
              
              {/* Social Links */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Social Links</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="url"
                    value={profileData.socialLinks.linkedin}
                    onChange={(e) => handleInputChange('socialLinks.linkedin', e.target.value)}
                    className="input-field"
                    placeholder="LinkedIn URL"
                  />
                  <input
                    type="url"
                    value={profileData.socialLinks.github}
                    onChange={(e) => handleInputChange('socialLinks.github', e.target.value)}
                    className="input-field"
                    placeholder="GitHub URL"
                  />
                  <input
                    type="url"
                    value={profileData.socialLinks.twitter}
                    onChange={(e) => handleInputChange('socialLinks.twitter', e.target.value)}
                    className="input-field"
                    placeholder="Twitter URL"
                  />
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
{`import { useState, useMemo } from 'react';

export default function CompletenessMeter() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    skills: [],
    experience: '',
    location: ''
  });

  const calculateCompleteness = useMemo(() => {
    const fields = [
      formData.name,
      formData.email,
      formData.bio,
      formData.experience,
      formData.location
    ];
    
    const skillsWeight = formData.skills.length > 0 ? 1 : 0;
    const totalFields = fields.length + 1;
    const filledFields = fields.filter(field => 
      field.trim() !== ''
    ).length + skillsWeight;
    
    return Math.round((filledFields / totalFields) * 100);
  }, [formData]);

  const getCompletenessColor = (percentage) => {
    if (percentage < 30) return 'bg-red-500';
    if (percentage < 60) return 'bg-yellow-500';
    if (percentage < 80) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getCompletenessMessage = (percentage) => {
    if (percentage < 30) return 'Getting started 🚀';
    if (percentage < 60) return 'Making progress 📈';
    if (percentage < 80) return 'Almost there 🎯';
    if (percentage < 100) return 'Nearly complete ✨';
    return 'Profile complete! 🎉';
  };

  return (
    <div className="completeness-container">
      {/* Completeness Meter */}
      <div className="completeness-meter">
        <div className="meter-header">
          <h3 className="meter-title">Profile Completeness</h3>
          <span className="meter-percentage">{calculateCompleteness}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-track">
            <div 
              className={\`progress-fill \${getCompletenessColor(calculateCompleteness)}\`}
              style={{ width: \`\${calculateCompleteness}%\` }}
            />
          </div>
          <div className="progress-labels">
            <span>0%</span>
            <span className="progress-message">
              {getCompletenessMessage(calculateCompleteness)}
            </span>
            <span>100%</span>
          </div>
        </div>
        
        {/* Encouragement Message */}
        <div className="encouragement">
          <p>
            {calculateCompleteness < 100 
              ? \`You're \${100 - calculateCompleteness}% away from completion!\`
              : 'Congratulations! Your profile is complete.'
            }
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="form-container">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({
            ...prev, 
            name: e.target.value
          }))}
          placeholder="Full Name"
          className="form-input"
        />
        
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({
            ...prev, 
            email: e.target.value
          }))}
          placeholder="Email Address"
          className="form-input"
        />
        
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData(prev => ({
            ...prev, 
            bio: e.target.value
          }))}
          placeholder="Bio"
          className="form-textarea"
        />
        
        <select
          value={formData.experience}
          onChange={(e) => setFormData(prev => ({
            ...prev, 
            experience: e.target.value
          }))}
          className="form-select"
        >
          <option value="">Select experience level</option>
          <option value="junior">Junior (0-2 years)</option>
          <option value="mid">Mid-level (2-5 years)</option>
          <option value="senior">Senior (5+ years)</option>
        </select>
        
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({
            ...prev, 
            location: e.target.value
          }))}
          placeholder="Location"
          className="form-input"
        />
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Completeness Meter Container */
.completeness-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 1.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Completeness Meter */
.completeness-meter {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.meter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.meter-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
}

.meter-percentage {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

/* Progress Bar */
.progress-container {
  position: relative;
}

.progress-track {
  width: 100%;
  height: 0.75rem;
  background-color: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.progress-fill {
  height: 100%;
  border-radius: 9999px;
  transition: width 0.5s ease-out;
}

.progress-fill.bg-red-500 {
  background-color: #ef4444;
}

.progress-fill.bg-yellow-500 {
  background-color: #eab308;
}

.progress-fill.bg-blue-500 {
  background-color: #3b82f6;
}

.progress-fill.bg-green-500 {
  background-color: #10b981;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #6b7280;
}

.progress-message {
  font-weight: 500;
  color: #374151;
}

/* Encouragement Message */
.encouragement {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
}

.encouragement p {
  font-size: 0.875rem;
  color: #4b5563;
  margin: 0;
}

/* Form Styles */
.form-container {
  display: grid;
  gap: 1rem;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

/* Responsive Design */
@media (max-width: 640px) {
  .completeness-container {
    padding: 1rem;
  }
  
  .meter-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .progress-labels {
    flex-direction: column;
    gap: 0.25rem;
    text-align: center;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .completeness-container {
    background-color: #1f2937;
    color: #f9fafb;
  }
  
  .completeness-meter {
    background-color: #374151;
    border-color: #4b5563;
  }
  
  .meter-title,
  .meter-percentage {
    color: #f9fafb;
  }
  
  .progress-track {
    background-color: #4b5563;
  }
  
  .progress-message {
    color: #d1d5db;
  }
  
  .progress-labels {
    color: #9ca3af;
  }
  
  .encouragement {
    background-color: #4b5563;
  }
  
  .encouragement p {
    color: #d1d5db;
  }
  
  .form-input,
  .form-textarea,
  .form-select {
    background-color: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
  
  .form-input:focus,
  .form-textarea:focus,
  .form-select:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .progress-track {
    border: 2px solid #000;
  }
  
  .progress-fill {
    border: 1px solid #000;
  }
  
  .form-input,
  .form-textarea,
  .form-select {
    border-width: 2px;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .progress-fill {
    transition: none;
  }
}

/* Animation */
@keyframes progressGrow {
  from {
    width: 0%;
  }
  to {
    width: var(--progress-width);
  }
}

.progress-fill {
  animation: progressGrow 0.8s ease-out;
}

/* Accessibility */
.progress-track {
  role: progressbar;
  aria-valuemin: 0;
  aria-valuemax: 100;
}

.meter-percentage::after {
  content: ' complete';
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

/* Print Styles */
@media print {
  .completeness-meter {
    border: 2px solid #000;
    background: white;
  }
  
  .progress-track {
    border: 1px solid #000;
  }
  
  .progress-fill {
    background: #000 !important;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Real-time Updates</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Progress updates instantly as fields are filled</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Feedback</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Color-coded progress bar with status messages</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Motivational Messages</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Encouraging text based on completion level</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Flexible Calculation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Customizable field weighting and scoring</p>
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
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Profile Setup</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">User profile completion tracking</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📋</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Form Progress</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Long form completion status</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Goal Tracking</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Progress towards objectives</p>
          </div>
        </div>
      </div>
    </div>
  );
}