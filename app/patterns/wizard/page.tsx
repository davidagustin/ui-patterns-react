"use client";

import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function WizardPattern() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "Account Setup",
      description: "Create your account details",
      icon: "👤",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Account Information
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
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
                className="input-field w-full"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                className="input-field w-full"
                placeholder="Create a password"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      title: "Profile Details",
      description: "Tell us about yourself",
      icon: "📋",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Profile Information
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              <textarea
                className="input-field w-full resize-none"
                rows={3}
                placeholder="Tell us about yourself..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                type="text"
                className="input-field w-full"
                placeholder="Where are you located?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Website
              </label>
              <input
                type="url"
                className="input-field w-full"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Preferences",
      description: "Set your preferences",
      icon: "⚙️",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Account Preferences
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notification Settings
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Email notifications
                  </span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Push notifications
                  </span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Weekly newsletter
                  </span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Privacy Level
              </label>
              <select className="input-field w-full">
                <option>Public Profile</option>
                <option>Friends Only</option>
                <option>Private</option>
              </select>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Review & Complete",
      description: "Review your information",
      icon: "✅",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Review Your Information
          </h3>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Account Type:
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Standard Account
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Email Notifications:
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Enabled
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Privacy Level:
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Public Profile
              </span>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Your account will be created with these settings. You can modify
              them later in your account settings.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const isStepComplete = (stepIndex: number) => {
    return stepIndex < currentStep;
  };

  const isStepActive = (stepIndex: number) => {
    return stepIndex === currentStep;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🧙‍♂️ Wizard Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Guide users through complex multi-step processes with clear progress
          indicators and intuitive navigation.
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
              Complete the account setup wizard by navigating through each step.
              Click on step indicators to jump to any step.
            </p>

            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => goToStep(index)}
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                        isStepActive(index)
                          ? "border-blue-600 bg-blue-600 text-white"
                          : isStepComplete(index)
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500"
                      }`}
                    >
                      {isStepComplete(index) ? (
                        <span className="text-sm">✓</span>
                      ) : (
                        <span className="text-lg">{step.icon}</span>
                      )}
                    </button>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-16 h-0.5 mx-2 ${
                          isStepComplete(index + 1)
                            ? "bg-green-500"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step Labels */}
              <div className="flex justify-between mt-4">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`text-center flex-1 ${index < steps.length - 1 ? "mr-4" : ""}`}
                  >
                    <div
                      className={`text-sm font-medium ${
                        isStepActive(index)
                          ? "text-blue-600 dark:text-blue-400"
                          : isStepComplete(index)
                            ? "text-green-600 dark:text-green-400"
                            : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {step.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 min-h-[300px]">
              {steps[currentStep].content}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                Step {currentStep + 1} of {steps.length}
              </div>

              <button
                onClick={nextStep}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                {currentStep === steps.length - 1 ? "Complete Setup" : "Next"}
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

            {/* Tab Content */}
            <div className="code-block">
              <DynamicCodeExample componentName="wizard" />
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
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Progress Indicator
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Visual progress bar with step completion status
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Step Navigation
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click on any step to jump directly to it
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Validation Support
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Prevent progression until current step is valid
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Responsive Design
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Adapts to different screen sizes
              </p>
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
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Account Setup
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Multi-step user registration and onboarding
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Checkout Process
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              E-commerce checkout with multiple steps
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚙️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Configuration
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Complex setup and configuration flows
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
