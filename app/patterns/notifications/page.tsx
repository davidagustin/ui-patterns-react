'use client';

import { useState, useEffect } from 'react';
import Tooltip from '../../../components/Tooltip';

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
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

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
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Click the buttons below to see different types of notifications. The notifications will appear in the panel above.
            </p>
            
            {/* Notifications Display */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                📋 Notifications Panel
              </h3>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                    <div className="text-3xl mb-2">🔔</div>
                    <p className="text-sm">No notifications yet</p>
                    <p className="text-xs">Click the buttons below to add notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={getNotificationClasses(notification.type)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <span className="text-lg">
                            {getNotificationIcon(notification.type)}
                          </span>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{notification.title}</h3>
                            <p className="text-xs mt-1">{notification.message}</p>
                            {notification.action && (
                              <button
                                onClick={notification.action.onClick}
                                className="mt-2 px-2 py-1 text-xs bg-white dark:bg-gray-800 rounded border hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              >
                                {notification.action.label}
                              </button>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeNotification(notification.id)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-2 text-sm"
                          aria-label="Remove notification"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Notification Controls */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => addNotification({
                    type: 'success',
                    title: 'Success!',
                    message: 'Your action was completed successfully.',
                    duration: 5000
                  })}
                  className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                >
                  Success
                </button>
                
                <button
                  onClick={() => addNotification({
                    type: 'error',
                    title: 'Error!',
                    message: 'Something went wrong. Please try again.',
                    duration: 0
                  })}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  Error
                </button>
                
                <button
                  onClick={() => addNotification({
                    type: 'warning',
                    title: 'Warning!',
                    message: 'Please review your input before proceeding.',
                    duration: 8000
                  })}
                  className="px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                >
                  Warning
                </button>
                
                <button
                  onClick={() => addNotification({
                    type: 'info',
                    title: 'Information',
                    message: 'Here is some helpful information for you.',
                    duration: 6000
                  })}
                  className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  Info
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => showToastMessage('Operation completed successfully!', 'success')}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  Success Toast
                </button>
                
                <button
                  onClick={() => showToastMessage('An error occurred!', 'error')}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Error Toast
                </button>
              </div>

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
                className="w-full px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
              >
                With Action
              </button>

              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="w-full px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  Clear All ({notificationCount})
                </button>
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

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
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

  return (
    <div className="notifications-container">
      {/* Notifications Display */}
      <div className="notifications-panel">
        <h3>📋 Notifications</h3>
        <div className="notifications-list">
          {notifications.length === 0 ? (
            <div className="empty-state">
              <div>🔔</div>
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={getNotificationClasses(notification.type)}
              >
                <div className="notification-content">
                  <span className="notification-icon">
                    {getNotificationIcon(notification.type)}
                  </span>
                  <div className="notification-text">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    {notification.action && (
                      <button onClick={notification.action.onClick}>
                        {notification.action.label}
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="close-btn"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Toast Message */}
      {showToast && (
        <div className={\`toast-message \${toastType}\`}>
          <span>{getNotificationIcon(toastType)}</span>
          <span>{toastMessage}</span>
          <button onClick={() => setShowToast(false)}>✕</button>
        </div>
      )}
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Notifications Styles */
.notifications-container {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.notifications-panel {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.notifications-panel h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #374151;
}

.notifications-list {
  max-height: 300px;
  overflow-y: auto;
  space-y: 0.75rem;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}

.empty-state div {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.notification-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.notification-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.notification-text {
  flex: 1;
}

.notification-text h4 {
  font-weight: 500;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
}

.notification-text p {
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.notification-text button {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.notification-text button:hover {
  background-color: #f9fafb;
}

.close-btn {
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.25rem;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #6b7280;
}

/* Toast Message */
.toast-message {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 50;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: slideIn 0.3s ease-out;
}

.toast-message.success {
  background-color: #10b981;
  color: white;
}

.toast-message.error {
  background-color: #ef4444;
  color: white;
}

.toast-message.warning {
  background-color: #f59e0b;
  color: white;
}

.toast-message.info {
  background-color: #3b82f6;
  color: white;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}`}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Message */}
      {showToast && (
        <div className={getToastClasses(toastType)}>
          <div className="flex items-center space-x-2">
            <span>
              {getNotificationIcon(toastType)}
            </span>
            <span>{toastMessage}</span>
            <button
              onClick={() => setShowToast(false)}
              className="ml-2 text-white hover:text-gray-200"
              aria-label="Close toast"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
