'use client';

import { useState, useEffect } from 'react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function NotificationsPattern() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [notificationCount, setNotificationCount] = useState(0);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    const newNotification = { ...notification, id };
    setNotifications(prev => [newNotification, ...prev]);
    setNotificationCount(prev => prev + 1);

    // Auto-remove notification after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration || 5000);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setNotificationCount(prev => Math.max(0, prev - 1));
  };

  const showToastMessage = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setNotificationCount(0);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  const getNotificationClasses = (type: string) => {
    const baseClasses = 'p-4 rounded-lg border-l-4 shadow-lg';
    switch (type) {
      case 'success':
        return `${baseClasses} bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-200`;
      case 'error':
        return `${baseClasses} bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200`;
      case 'warning':
        return `${baseClasses} bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 text-yellow-800 dark:text-yellow-200`;
      case 'info':
        return `${baseClasses} bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-800 dark:text-blue-200`;
      default:
        return `${baseClasses} bg-gray-50 dark:bg-gray-900/20 border-gray-500 text-gray-800 dark:text-gray-200`;
    }
  };

  const getToastClasses = (type: string) => {
    const baseClasses = 'fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300';
    switch (type) {
      case 'success':
        return `${baseClasses} bg-green-500 text-white`;
      case 'error':
        return `${baseClasses} bg-red-500 text-white`;
      case 'warning':
        return `${baseClasses} bg-yellow-500 text-white`;
      case 'info':
        return `${baseClasses} bg-blue-500 text-white`;
      default:
        return `${baseClasses} bg-gray-500 text-white`;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🔔 Notifications Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Comprehensive notification system with different types, toast messages, and notification management.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            
            <div className="space-y-4">
              {/* Notification Controls */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => addNotification({
                    type: 'success',
                    title: 'Success!',
                    message: 'Your action was completed successfully.',
                    duration: 5000
                  })}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Success Notification
                </button>
                
                <button
                  onClick={() => addNotification({
                    type: 'error',
                    title: 'Error!',
                    message: 'Something went wrong. Please try again.',
                    duration: 0
                  })}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Error Notification
                </button>
                
                <button
                  onClick={() => addNotification({
                    type: 'warning',
                    title: 'Warning!',
                    message: 'Please review your input before proceeding.',
                    duration: 8000
                  })}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Warning Notification
                </button>
                
                <button
                  onClick={() => addNotification({
                    type: 'info',
                    title: 'Information',
                    message: 'Here is some helpful information for you.',
                    duration: 6000
                  })}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Info Notification
                </button>
              </div>

              {/* Toast Controls */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => showToastMessage('Operation completed successfully!', 'success')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Success Toast
                </button>
                
                <button
                  onClick={() => showToastMessage('An error occurred!', 'error')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Error Toast
                </button>
              </div>

              {/* Notification with Action */}
              <button
                onClick={() => addNotification({
                  type: 'info',
                  title: 'Update Available',
                  message: 'A new version is available for download.',
                  duration: 0,
                  action: {
                    label: 'Download Now',
                    onClick: () => {
                      showToastMessage('Download started!', 'success');
                      removeNotification(Date.now().toString());
                    }
                  }
                })}
                className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Notification with Action
              </button>

              {/* Clear All */}
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Clear All Notifications ({notificationCount})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Notifications Display */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              📋 Notifications Panel
            </h2>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <div className="text-4xl mb-2">🔔</div>
                  <p>No notifications yet</p>
                  <p className="text-sm">Click the buttons to add notifications</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={getNotificationClasses(notification.type)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <span className="text-xl">{getNotificationIcon(notification.type)}</span>
                        <div className="flex-1">
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm mt-1">{notification.message}</p>
                          {notification.action && (
                            <button
                              onClick={notification.action.onClick}
                              className="mt-2 px-3 py-1 text-xs bg-white dark:bg-gray-800 rounded border hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              {notification.action.label}
                            </button>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-2"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Message */}
      {showToast && (
        <div className={getToastClasses(toastType)}>
          <div className="flex items-center space-x-2">
            <span>{getNotificationIcon(toastType)}</span>
            <span>{toastMessage}</span>
            <button
              onClick={() => setShowToast(false)}
              className="ml-2 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Code Example */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          💻 Code Example
        </h2>
        <div className="code-block">
          <pre className="text-sm leading-relaxed">
{`import { useState } from 'react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function NotificationsComponent() {
  const [notifications, setNotifications] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const addNotification = (notification) => {
    const id = Date.now().toString();
    const newNotification = { ...notification, id };
    setNotifications(prev => [newNotification, ...prev]);

    // Auto-remove notification after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration || 5000);
    }
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const getNotificationClasses = (type) => {
    const baseClasses = 'p-4 rounded-lg border-l-4 shadow-lg';
    switch (type) {
      case 'success':
        return \`\${baseClasses} bg-green-50 border-green-500 text-green-800\`;
      case 'error':
        return \`\${baseClasses} bg-red-50 border-red-500 text-red-800\`;
      case 'warning':
        return \`\${baseClasses} bg-yellow-50 border-yellow-500 text-yellow-800\`;
      case 'info':
        return \`\${baseClasses} bg-blue-50 border-blue-500 text-blue-800\`;
      default:
        return \`\${baseClasses} bg-gray-50 border-gray-500 text-gray-800\`;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  return (
    <div className="space-y-4">
      {/* Notification Controls */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => addNotification({
            type: 'success',
            title: 'Success!',
            message: 'Your action was completed successfully.',
            duration: 5000
          })}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Success Notification
        </button>
        
        <button
          onClick={() => addNotification({
            type: 'error',
            title: 'Error!',
            message: 'Something went wrong.',
            duration: 0
          })}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Error Notification
        </button>
      </div>

      {/* Notifications Display */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={getNotificationClasses(notification.type)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <span className="text-xl">{getNotificationIcon(notification.type)}</span>
                <div>
                  <h3 className="font-medium">{notification.title}</h3>
                  <p className="text-sm mt-1">{notification.message}</p>
                  {notification.action && (
                    <button
                      onClick={notification.action.onClick}
                      className="mt-2 px-3 py-1 text-xs bg-white rounded border"
                    >
                      {notification.action.label}
                    </button>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toast Message */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg bg-green-500 text-white">
          <div className="flex items-center space-x-2">
            <span>{getNotificationIcon(toastType)}</span>
            <span>{toastMessage}</span>
            <button
              onClick={() => setShowToast(false)}
              className="ml-2 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}`}
          </pre>
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Multiple Types</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Success, error, warning, and info notifications</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Auto-dismiss</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Configurable auto-removal with custom durations</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Action Buttons</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Interactive notifications with custom actions</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Toast Messages</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Temporary toast notifications for quick feedback</p>
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
            <div className="text-2xl mb-2">✅</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Form Submissions</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Success/error feedback for user actions</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🔄</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">System Updates</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Real-time system status and updates</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📱</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Mobile Apps</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Push notifications and alerts</p>
          </div>
        </div>
      </div>
    </div>
  );
}
