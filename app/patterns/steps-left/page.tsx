'use client';

import { useState } from 'react';

export default function StepsLeftPattern() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  const checkoutSteps = [
    {
      id: 0,
      title: 'Shopping Cart',
      description: 'Review your items',
      icon: '🛒',
      required: true,
      estimated: '2 min'
    },
    {
      id: 1,
      title: 'Shipping Information',
      description: 'Enter delivery details',
      icon: '📦',
      required: true,
      estimated: '3 min'
    },
    {
      id: 2,
      title: 'Payment Method',
      description: 'Choose payment option',
      icon: '💳',
      required: true,
      estimated: '2 min'
    },
    {
      id: 3,
      title: 'Gift Message',
      description: 'Add a personal note',
      icon: '💝',
      required: false,
      estimated: '1 min'
    },
    {
      id: 4,
      title: 'Order Review',
      description: 'Confirm your order',
      icon: '✅',
      required: true,
      estimated: '1 min'
    }
  ];

  const getStepsLeft = () => {
    const requiredSteps = checkoutSteps.filter(step => step.required);
    const completedRequiredSteps = requiredSteps.filter(step => 
      completedSteps.includes(step.id) || step.id < currentStep
    );
    return requiredSteps.length - completedRequiredSteps.length;
  };

  const getTotalTimeLeft = () => {
    const remainingSteps = checkoutSteps.filter(step => 
      step.id >= currentStep && (step.required || completedSteps.includes(step.id))
    );
    return remainingSteps.reduce((total, step) => {
      const time = parseInt(step.estimated.split(' ')[0]);
      return total + time;
    }, 0);
  };

  const nextStep = () => {
    if (currentStep < checkoutSteps.length - 1) {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCompletedSteps(prev => prev.filter(step => step !== currentStep - 1));
    }
  };

  const skipOptionalStep = () => {
    if (!checkoutSteps[currentStep].required) {
      nextStep();
    }
  };

  const stepsLeft = getStepsLeft();
  const timeLeft = getTotalTimeLeft();
  const progress = ((currentStep + completedSteps.length) / checkoutSteps.length) * 100;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📋 Steps Left Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Show users how many steps remain in a process with clear progress indicators and time estimates.
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
              Navigate through the checkout process and see how the steps remaining counter updates.
            </p>
            
            {/* Steps Left Indicator */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Checkout Progress</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Complete your purchase</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {stepsLeft}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    step{stepsLeft !== 1 ? 's' : ''} left
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              
              {/* Time Estimate */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Estimated time remaining:
                </span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {timeLeft} minute{timeLeft !== 1 ? 's' : ''}
                </span>
              </div>
              
              {/* Steps Overview */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-5 gap-2">
                  {checkoutSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`text-center p-2 rounded-lg transition-all duration-200 ${
                        completedSteps.includes(step.id) || step.id < currentStep
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                          : step.id === currentStep
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <div className="text-lg mb-1">{step.icon}</div>
                      <div className="text-xs font-medium">{step.title}</div>
                      {!step.required && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">Optional</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Step Content */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{checkoutSteps[currentStep].icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {checkoutSteps[currentStep].title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {checkoutSteps[currentStep].description}
                  </p>
                  <div className="flex items-center mt-1 space-x-4">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Est. {checkoutSteps[currentStep].estimated}
                    </span>
                    {!checkoutSteps[currentStep].required && (
                      <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full">
                        Optional
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Step-specific content */}
              <div className="space-y-4">
                {currentStep === 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">Items in your cart</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm">Wireless Headphones</span>
                        <span className="font-medium">$99.99</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm">Phone Case</span>
                        <span className="font-medium">$24.99</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {currentStep === 1 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">Shipping Address</h4>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="input-field w-full"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      className="input-field w-full"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="City"
                        className="input-field"
                      />
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        className="input-field"
                      />
                    </div>
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">Payment Method</h4>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                        <input type="radio" name="payment" className="mr-3" defaultChecked />
                        <span className="text-sm">Credit Card</span>
                      </label>
                      <label className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                        <input type="radio" name="payment" className="mr-3" />
                        <span className="text-sm">PayPal</span>
                      </label>
                    </div>
                  </div>
                )}
                
                {currentStep === 3 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">Gift Message (Optional)</h4>
                    <textarea
                      placeholder="Add a personal message..."
                      className="input-field w-full resize-none"
                      rows={3}
                    />
                  </div>
                )}
                
                {currentStep === 4 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">Order Summary</h4>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Subtotal:</span>
                        <span className="font-medium">$124.98</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Shipping:</span>
                        <span className="font-medium">$5.99</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-2">
                        <span className="font-medium">Total:</span>
                        <span className="font-bold">$130.97</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Back
              </button>
              
              <div className="flex space-x-2">
                {!checkoutSteps[currentStep].required && (
                  <button
                    onClick={skipOptionalStep}
                    className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    Skip
                  </button>
                )}
                <button
                  onClick={nextStep}
                  disabled={currentStep === checkoutSteps.length - 1}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 rounded-md transition-colors"
                >
                  {currentStep === checkoutSteps.length - 1 ? 'Complete Order' : 'Continue'}
                </button>
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

export default function StepsLeft() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    {
      id: 0,
      title: 'Shopping Cart',
      description: 'Review your items',
      icon: '🛒',
      required: true,
      estimated: '2 min'
    },
    {
      id: 1,
      title: 'Shipping Info',
      description: 'Enter delivery details',
      icon: '📦',
      required: true,
      estimated: '3 min'
    },
    {
      id: 2,
      title: 'Payment',
      description: 'Choose payment option',
      icon: '💳',
      required: true,
      estimated: '2 min'
    },
    {
      id: 3,
      title: 'Gift Message',
      description: 'Add a personal note',
      icon: '💝',
      required: false,
      estimated: '1 min'
    }
  ];

  const stepsLeft = useMemo(() => {
    const requiredSteps = steps.filter(step => step.required);
    const completedRequired = requiredSteps.filter(step => 
      completedSteps.includes(step.id) || step.id < currentStep
    );
    return requiredSteps.length - completedRequired.length;
  }, [currentStep, completedSteps, steps]);

  const timeLeft = useMemo(() => {
    const remainingSteps = steps.filter(step => 
      step.id >= currentStep && 
      (step.required || completedSteps.includes(step.id))
    );
    return remainingSteps.reduce((total, step) => {
      const time = parseInt(step.estimated.split(' ')[0]);
      return total + time;
    }, 0);
  }, [currentStep, completedSteps, steps]);

  const progress = useMemo(() => {
    return ((currentStep + completedSteps.length) / steps.length) * 100;
  }, [currentStep, completedSteps.length, steps.length]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const skipOptionalStep = () => {
    if (!steps[currentStep].required) {
      nextStep();
    }
  };

  return (
    <div className="steps-container">
      {/* Steps Left Indicator */}
      <div className="steps-indicator">
        <div className="indicator-header">
          <div>
            <h3 className="indicator-title">Checkout Progress</h3>
            <p className="indicator-subtitle">Complete your purchase</p>
          </div>
          <div className="steps-count">
            <div className="count-number">{stepsLeft}</div>
            <div className="count-label">
              step{stepsLeft !== 1 ? 's' : ''} left
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-labels">
            <span>Progress</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="progress-track">
            <div 
              className="progress-fill"
              style={{ width: \`\${progress}%\` }}
            />
          </div>
        </div>
        
        {/* Time Estimate */}
        <div className="time-estimate">
          <span>Estimated time remaining:</span>
          <span className="time-value">
            {timeLeft} minute{timeLeft !== 1 ? 's' : ''}
          </span>
        </div>
        
        {/* Steps Overview */}
        <div className="steps-overview">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={\`step-item \${
                completedSteps.includes(step.id) || step.id < currentStep
                  ? 'step-completed'
                  : step.id === currentStep
                  ? 'step-current'
                  : 'step-pending'
              }\`}
            >
              <div className="step-icon">{step.icon}</div>
              <div className="step-title">{step.title}</div>
              {!step.required && (
                <div className="step-optional">Optional</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <div className="step-content">
        <div className="step-header">
          <span className="step-icon-large">
            {steps[currentStep].icon}
          </span>
          <div>
            <h3 className="step-title-large">
              {steps[currentStep].title}
            </h3>
            <p className="step-description">
              {steps[currentStep].description}
            </p>
            <div className="step-meta">
              <span>Est. {steps[currentStep].estimated}</span>
              {!steps[currentStep].required && (
                <span className="optional-badge">Optional</span>
              )}
            </div>
          </div>
        </div>
        
        {/* Step content would go here */}
        <div className="step-form">
          {/* Dynamic content based on current step */}
        </div>
      </div>

      {/* Navigation */}
      <div className="step-navigation">
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0}
          className="nav-button nav-back"
        >
          Back
        </button>
        
        <div className="nav-actions">
          {!steps[currentStep].required && (
            <button
              onClick={skipOptionalStep}
              className="nav-button nav-skip"
            >
              Skip
            </button>
          )}
          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="nav-button nav-continue"
          >
            {currentStep === steps.length - 1 ? 'Complete' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Steps Container */
.steps-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Steps Indicator */
.steps-indicator {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.indicator-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.indicator-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.indicator-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

/* Steps Count */
.steps-count {
  text-align: right;
}

.count-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3b82f6;
  line-height: 1;
}

.count-label {
  font-size: 0.75rem;
  color: #6b7280;
}

/* Progress Section */
.progress-section {
  margin-bottom: 1rem;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.progress-track {
  width: 100%;
  height: 0.5rem;
  background-color: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #3b82f6;
  border-radius: 9999px;
  transition: width 0.3s ease-out;
}

/* Time Estimate */
.time-estimate {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.time-value {
  font-weight: 500;
  color: #1f2937;
}

/* Steps Overview */
.steps-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
}

.step-item {
  text-align: center;
  padding: 0.75rem 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.step-item.step-completed {
  background-color: #dcfce7;
  color: #166534;
}

.step-item.step-current {
  background-color: #dbeafe;
  color: #1e40af;
}

.step-item.step-pending {
  background-color: #f3f4f6;
  color: #6b7280;
}

.step-icon {
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
}

.step-title {
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.2;
}

.step-optional {
  font-size: 0.625rem;
  color: #9ca3af;
  margin-top: 0.125rem;
}

/* Step Content */
.step-content {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.step-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.step-icon-large {
  font-size: 2rem;
  margin-right: 0.75rem;
}

.step-title-large {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.step-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.step-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #9ca3af;
}

.optional-badge {
  padding: 0.125rem 0.5rem;
  background-color: #fef3c7;
  color: #92400e;
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 500;
}

/* Navigation */
.step-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.nav-actions {
  display: flex;
  gap: 0.5rem;
}

.nav-button {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-back {
  background-color: white;
  border-color: #d1d5db;
  color: #374151;
}

.nav-back:hover:not(:disabled) {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.nav-skip {
  background-color: transparent;
  border-color: transparent;
  color: #6b7280;
}

.nav-skip:hover {
  color: #374151;
}

.nav-continue {
  background-color: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.nav-continue:hover:not(:disabled) {
  background-color: #2563eb;
  border-color: #2563eb;
}

.nav-continue:disabled {
  background-color: #9ca3af;
  border-color: #9ca3af;
}

/* Responsive Design */
@media (max-width: 640px) {
  .steps-container {
    padding: 1rem;
  }
  
  .indicator-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .steps-overview {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.25rem;
  }
  
  .step-item {
    padding: 0.5rem 0.25rem;
  }
  
  .step-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .step-icon-large {
    margin-right: 0;
  }
  
  .step-navigation {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .nav-button {
    flex: 1;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .steps-container {
    background-color: #1f2937;
    color: #f9fafb;
  }
  
  .steps-indicator {
    background-color: #374151;
    border-color: #4b5563;
  }
  
  .indicator-title {
    color: #f9fafb;
  }
  
  .indicator-subtitle,
  .count-label,
  .progress-labels,
  .time-estimate {
    color: #9ca3af;
  }
  
  .time-value {
    color: #d1d5db;
  }
  
  .progress-track {
    background-color: #4b5563;
  }
  
  .step-item.step-completed {
    background-color: rgba(34, 197, 94, 0.2);
    color: #4ade80;
  }
  
  .step-item.step-current {
    background-color: rgba(59, 130, 246, 0.2);
    color: #60a5fa;
  }
  
  .step-item.step-pending {
    background-color: #4b5563;
    color: #9ca3af;
  }
  
  .step-content {
    background-color: #374151;
    border-color: #4b5563;
  }
  
  .step-title-large {
    color: #f9fafb;
  }
  
  .step-description {
    color: #d1d5db;
  }
  
  .step-meta {
    color: #9ca3af;
  }
  
  .optional-badge {
    background-color: rgba(245, 158, 11, 0.2);
    color: #fbbf24;
  }
  
  .step-navigation {
    border-top-color: #4b5563;
  }
  
  .nav-back {
    background-color: #374151;
    border-color: #4b5563;
    color: #d1d5db;
  }
  
  .nav-back:hover:not(:disabled) {
    background-color: #4b5563;
    border-color: #6b7280;
  }
  
  .nav-skip {
    color: #9ca3af;
  }
  
  .nav-skip:hover {
    color: #d1d5db;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .steps-indicator,
  .step-content,
  .nav-button {
    border-width: 2px;
  }
  
  .progress-track {
    border: 1px solid #000;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .progress-fill,
  .step-item,
  .nav-button {
    transition: none;
  }
}

/* Print Styles */
@media print {
  .step-navigation {
    display: none;
  }
  
  .steps-indicator,
  .step-content {
    border: 1px solid #000;
    background: white;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Real-time Counter</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Updates automatically as steps are completed</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Time Estimates</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Shows expected time to completion</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Optional Steps</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Handles required vs optional step logic</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Progress</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Progress bar and step indicators</p>
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
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Checkout Process</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">E-commerce checkout with multiple steps</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📋</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Form Completion</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Multi-step forms and applications</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚙️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Setup Wizard</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Application or account setup process</p>
          </div>
        </div>
      </div>
    </div>
  );
}