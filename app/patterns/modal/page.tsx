'use client';

import { useState, useEffect } from 'react';
import { DynamicCodeExample } from '../../../components/shared/CodeGenerator';

export default function ModalPattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<'simple' | 'form' | 'confirmation'>('simple');
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [codeTab, setCodeTab] = useState<'jsx' | 'css'>('jsx');

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted! Data: ' + JSON.stringify(formData));
    closeModal();
    setFormData({ name: '', email: '' });
  };

  const handleConfirm = () => {
    alert('Action confirmed!');
    closeModal();
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'form':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 text-base"
                style={{ fontSize: '16px' }}
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 text-base"
                style={{ fontSize: '16px' }}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors min-h-[44px] flex items-center justify-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors min-h-[44px] flex items-center justify-center"
              >
                Submit
              </button>
            </div>
          </form>
        );

      case 'confirmation':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Delete Account
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={closeModal}
                className="px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors min-h-[44px] flex items-center justify-center"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors min-h-[44px] flex items-center justify-center"
              >
                Delete
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Simple Modal
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is a simple modal with basic content. You can put any content here including text, images, or other components.
            </p>
            <div className="flex justify-end pt-4">
              <button
                onClick={closeModal}
                className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors min-h-[44px] flex items-center justify-center"
              >
                Close
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🪟 Modal Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Overlay content on top of the current page to focus user attention on specific actions or information without navigation.
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
              Try different types of modals. Press Escape to close any open modal.
            </p>
            
            <div className="space-y-4">
              {/* Modal Type Selector */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setModalType('simple')}
                  className={`px-4 py-3 rounded text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                    modalType === 'simple'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Simple Modal
                </button>
                <button
                  onClick={() => setModalType('form')}
                  className={`px-4 py-3 rounded text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                    modalType === 'form'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Form Modal
                </button>
                <button
                  onClick={() => setModalType('confirmation')}
                  className={`px-4 py-3 rounded text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                    modalType === 'confirmation'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Confirmation Modal
                </button>
              </div>

              {/* Open Modal Button */}
              <button
                onClick={openModal}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium min-h-[44px] flex items-center justify-center text-base"
              >
                Open {modalType.charAt(0).toUpperCase() + modalType.slice(1)} Modal
              </button>

              {/* Modal */}
              {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                    onClick={closeModal}
                  />
                  
                  {/* Modal Container */}
                  <div className="flex min-h-full items-end sm:items-center justify-center p-4">
                    <div className="relative bg-white dark:bg-gray-900 rounded-t-lg sm:rounded-lg shadow-xl max-w-md w-full mx-auto transform transition-all">
                      {/* Close Button */}
                      <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label="Close modal"
                      >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      
                      {/* Modal Content */}
                      <div className="p-6">
                        {renderModalContent()}
                      </div>
                    </div>
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

            {/* Tab Content */}
            <div className="code-block">
              {codeTab === 'jsx' ? (
                <DynamicCodeExample 
                componentName="modal" 
                activeTab={activeTab} 
              />
              ) : (
                <DynamicCodeExample 
                componentName="modal" 
                activeTab={activeTab} 
              />
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Backdrop Click</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Close modal by clicking outside the content area</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Escape Key</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Keyboard accessibility with Escape key to close</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Body Scroll Lock</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Prevent background scrolling when modal is open</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Focus Management</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Proper focus trapping and restoration</p>
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
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Form Input</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Collect user input without page navigation</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚠️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Confirmations</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Confirm destructive actions before execution</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">ℹ️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Information Display</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Show additional details or help information</p>
          </div>
        </div>
      </div>
    </div>
  );
}
