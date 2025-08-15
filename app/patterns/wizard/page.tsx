'use client';

import { useState } from 'react';

export default function WizardPattern() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    preferences: '',
    notifications: true,
    newsletter: false
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const steps = [
    {
      id: 0,
      title: 'Personal Information',
      description: 'Tell us about yourself',
      icon: '👤',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>
      )
    },
    {
      id: 1,
      title: 'Company Details',
      description: 'Information about your organization',
      icon: '🏢',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Company Name
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="input-field"
              placeholder="Enter your company name"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Your Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="input-field"
            >
              <option value="">Select your role</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Manager</option>
              <option value="executive">Executive</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: 'Preferences',
      description: 'Customize your experience',
      icon: '⚙️',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Additional Preferences
            </label>
            <textarea
              value={formData.preferences}
              onChange={(e) => setFormData({...formData, preferences: e.target.value})}
              rows={4}
              className="input-field"
              placeholder="Tell us about your preferences, requirements, or any additional information..."
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">Email Notifications</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive important updates via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.notifications}
                  onChange={(e) => setFormData({...formData, notifications: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">Newsletter</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Subscribe to our monthly newsletter</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.newsletter}
                  onChange={(e) => setFormData({...formData, newsletter: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: 'Review & Submit',
      description: 'Review your information',
      icon: '✅',
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Review Your Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Name:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{formData.name || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Email:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{formData.email || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Company:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{formData.company || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Role:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{formData.role || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Notifications:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{formData.notifications ? 'Enabled' : 'Disabled'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Newsletter:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{formData.newsletter ? 'Subscribed' : 'Not subscribed'}</span>
              </div>
            </div>
          </div>
          {formData.preferences && (
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Additional Preferences:</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded">{formData.preferences}</p>
            </div>
          )}
        </div>
      )
    }
  ];

  const validateStep = (stepIndex: number) => {
    const newErrors: {[key: string]: string} = {};
    
    if (stepIndex === 0) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      alert('Wizard completed successfully! Data: ' + JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🧙‍♂️ Wizard Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Guide users through complex processes by breaking them into simple, sequential steps with clear progress indication.
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
              Complete the multi-step form below. Each step validates input before allowing progression to the next step.
            </p>
            
            {/* Progress indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <button
                      onClick={() => goToStep(index)}
                      disabled={index > currentStep}
                      className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all duration-200 ${
                        index < currentStep 
                          ? 'bg-green-600 text-white' 
                          : index === currentStep 
                            ? 'bg-blue-600 text-white ring-4 ring-blue-200 dark:ring-blue-800' 
                            : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                      } ${index <= currentStep ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'}`}
                    >
                      {index < currentStep ? '✓' : step.icon}
                    </button>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-2 rounded ${
                        index < currentStep ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center mt-3">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">{steps[currentStep].title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{steps[currentStep].description}</p>
              </div>
            </div>

            {/* Step content */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
              {steps[currentStep].content}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                ← Previous
              </button>
              
              {currentStep === steps.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Complete Setup
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Next →
                </button>
              )}
            </div>

            <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
              Step {currentStep + 1} of {steps.length}
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
{`import { useState } from 'react';

function WizardExample() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: ''
  });
  const [errors, setErrors] = useState({});

  const steps = [
    {
      id: 0,
      title: 'Personal Information',
      description: 'Tell us about yourself',
      icon: '👤',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={\`input-field \${errors.name ? 'border-red-500' : ''}\`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-medium">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={\`input-field \${errors.email ? 'border-red-500' : ''}\`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>
      )
    },
    {
      id: 1,
      title: 'Company Details',
      description: 'Information about your organization',
      icon: '🏢',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">
              Company Name
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="input-field"
              placeholder="Enter your company name"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">
              Your Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="input-field"
            >
              <option value="">Select your role</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Manager</option>
            </select>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: 'Review & Submit',
      description: 'Review your information',
      icon: '✅',
      content: (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Review Your Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{formData.name || 'Not provided'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{formData.email || 'Not provided'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Company:</span>
              <span className="font-medium">{formData.company || 'Not provided'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Role:</span>
              <span className="font-medium">{formData.role || 'Not provided'}</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  const validateStep = (stepIndex) => {
    const newErrors = {};
    
    if (stepIndex === 0) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex) => {
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      console.log('Wizard completed:', formData);
      alert('Wizard completed successfully!');
    }
  };

  return (
    <div>
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <button
                onClick={() => goToStep(index)}
                disabled={index > currentStep}
                className={\`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium \${
                  index < currentStep 
                    ? 'bg-green-600 text-white' 
                    : index === currentStep 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-300 text-gray-600'
                } \${index <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed'}\`}
              >
                {index < currentStep ? '✓' : step.icon}
              </button>
              {index < steps.length - 1 && (
                <div className={\`flex-1 h-1 mx-2 rounded \${
                  index < currentStep ? 'bg-green-600' : 'bg-gray-300'
                }\`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-3">
          <h3 className="font-semibold">{steps[currentStep].title}</h3>
          <p className="text-sm text-gray-600">{steps[currentStep].description}</p>
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white p-6 rounded-lg border mb-6">
        {steps[currentStep].content}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          ← Previous
        </button>
        
        {currentStep === steps.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded-lg"
          >
            Complete Setup
          </button>
        ) : (
          <button
            onClick={nextStep}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Next →
          </button>
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Step Validation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Validate each step before allowing progression</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Progress Indicator</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Visual progress bar with step completion status</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Navigation Control</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Previous/next buttons with step jumping capability</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Data Persistence</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Maintain form data across step transitions</p>
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
            <h4 className="font-medium text-gray-800 dark:text-gray-200">User Onboarding</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Guide new users through account setup and preferences</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Checkout Process</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Multi-step checkout with shipping and payment information</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚙️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Configuration Wizards</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Setup complex systems with guided configuration steps</p>
          </div>
        </div>
      </div>
    </div>
  );
}
