'use client';

import { useState } from 'react';

export default function InplaceEditorPattern() {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [userData, setUserData] = useState({
    name: 'John Doe',
    title: 'Senior Developer',
    email: 'john.doe@example.com',
    bio: 'Passionate developer with 5+ years of experience in React and Node.js.'
  });

  const [tempValues, setTempValues] = useState({ ...userData });

  const startEditing = (field: string) => {
    setEditingField(field);
    setTempValues({ ...userData });
  };

  const saveEdit = (field: string) => {
    setUserData({
      ...userData,
      [field]: (tempValues as any)[field]
    });
    setEditingField(null);
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValues({ ...userData });
  };

  const handleKeyDown = (e: React.KeyboardEvent, field: string) => {
    if (e.key === 'Enter') {
      saveEdit(field);
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const renderEditableField = (field: keyof typeof userData, label: string, type: 'text' | 'textarea' = 'text') => {
    const isEditing = editingField === field;
    const value = isEditing ? tempValues[field] : userData[field];

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        {isEditing ? (
          <div className="space-y-2">
            {type === 'textarea' ? (
              <textarea
                value={value}
                onChange={(e) => setTempValues({ ...tempValues, [field]: e.target.value })}
                onKeyDown={(e) => handleKeyDown(e, field)}
                className="input-field resize-none"
                rows={3}
                autoFocus
              />
            ) : (
              <input
                type={type}
                value={value}
                onChange={(e) => setTempValues({ ...tempValues, [field]: e.target.value })}
                onKeyDown={(e) => handleKeyDown(e, field)}
                className="input-field"
                autoFocus
              />
            )}
            <div className="flex space-x-2">
              <button
                onClick={() => saveEdit(field)}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={cancelEdit}
                className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex-1">
              {type === 'textarea' ? (
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{value}</p>
              ) : (
                <p className="text-gray-800 dark:text-gray-200">{value}</p>
              )}
            </div>
            <button
              onClick={() => startEditing(field)}
              className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              ✏️ Edit
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ✏️ Inplace Editor Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Edit content directly in context without navigating to separate forms, providing a seamless editing experience.
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
              Click the edit button next to any field to start editing. Press Enter to save or Escape to cancel.
            </p>
            
            <div className="space-y-4">
              {renderEditableField('name', 'Full Name')}
              {renderEditableField('title', 'Job Title')}
              {renderEditableField('email', 'Email Address')}
              {renderEditableField('bio', 'Bio', 'textarea')}
            </div>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Keyboard Shortcuts</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Enter</kbd> to save changes</div>
                <div>• <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Escape</kbd> to cancel editing</div>
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
{`import { useState } from 'react';

function InplaceEditorExample() {
  const [editingField, setEditingField] = useState(null);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    title: 'Senior Developer'
  });
  const [tempValues, setTempValues] = useState({ ...userData });

  const startEditing = (field) => {
    setEditingField(field);
    setTempValues({ ...userData });
  };

  const saveEdit = (field) => {
    setUserData({
      ...userData,
      [field]: tempValues[field]
    });
    setEditingField(null);
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValues({ ...userData });
  };

  const handleKeyDown = (e, field) => {
    if (e.key === 'Enter') {
      saveEdit(field);
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const renderEditableField = (field, label) => {
    const isEditing = editingField === field;
    const value = isEditing ? tempValues[field] : userData[field];

    return (
      <div>
        <label>{label}</label>
        {isEditing ? (
          <div>
            <input
              value={value}
              onChange={(e) => setTempValues({ ...tempValues, [field]: e.target.value })}
              onKeyDown={(e) => handleKeyDown(e, field)}
              autoFocus
            />
            <button onClick={() => saveEdit(field)}>Save</button>
            <button onClick={cancelEdit}>Cancel</button>
          </div>
        ) : (
          <div>
            <span>{value}</span>
            <button onClick={() => startEditing(field)}>Edit</button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {renderEditableField('name', 'Full Name')}
      {renderEditableField('title', 'Job Title')}
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Inplace Editor Container */
.inplace-editor-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

/* Editable Field */
.editable-field {
  margin-bottom: 1.5rem;
}

.editable-field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

/* Display Mode */
.editable-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: white;
  transition: all 0.2s ease;
}

.editable-display:hover {
  border-color: #d1d5db;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.editable-display-value {
  font-size: 1rem;
  color: #111827;
  font-weight: 500;
}

.editable-edit-button {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.editable-edit-button:hover {
  background-color: #2563eb;
}

.editable-edit-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Edit Mode */
.editable-edit {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  border: 2px solid #3b82f6;
  border-radius: 0.5rem;
  background-color: #f8fafc;
}

.editable-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.editable-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.editable-input::placeholder {
  color: #9ca3af;
}

/* Action Buttons */
.editable-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.editable-save-button {
  padding: 0.5rem 1rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.editable-save-button:hover {
  background-color: #059669;
}

.editable-save-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.editable-cancel-button {
  padding: 0.5rem 1rem;
  background-color: #6b7280;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.editable-cancel-button:hover {
  background-color: #4b5563;
}

.editable-cancel-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.1);
}

/* Loading State */
.editable-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  color: #6b7280;
  font-style: italic;
}

.loading-spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Success State */
.editable-success {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #dcfce7;
  color: #166534;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.success-icon {
  margin-right: 0.5rem;
}

/* Error State */
.editable-error {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #fef2f2;
  color: #dc2626;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.error-icon {
  margin-right: 0.5rem;
}

/* Keyboard Shortcuts */
.keyboard-shortcuts {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.keyboard-shortcuts h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.keyboard-shortcuts ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.keyboard-shortcuts li {
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.keyboard-key {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
  margin-right: 0.5rem;
  font-family: monospace;
}

/* Responsive Design */
@media (max-width: 640px) {
  .inplace-editor-container {
    padding: 1rem;
  }
  
  .editable-display {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .editable-actions {
    justify-content: stretch;
  }
  
  .editable-save-button,
  .editable-cancel-button {
    flex: 1;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .editable-field-label {
    color: #d1d5db;
  }
  
  .editable-display {
    background-color: #1f2937;
    border-color: #374151;
  }
  
  .editable-display:hover {
    border-color: #4b5563;
  }
  
  .editable-display-value {
    color: #f9fafb;
  }
  
  .editable-edit {
    background-color: #111827;
    border-color: #60a5fa;
  }
  
  .editable-input {
    background-color: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
  
  .editable-input:focus {
    border-color: #60a5fa;
  }
  
  .editable-input::placeholder {
    color: #6b7280;
  }
  
  .keyboard-shortcuts {
    background-color: #111827;
    border-color: #374151;
  }
  
  .keyboard-shortcuts h4 {
    color: #d1d5db;
  }
  
  .keyboard-shortcuts li {
    color: #9ca3af;
  }
  
  .keyboard-key {
    background-color: #374151;
    border-color: #4b5563;
    color: #f9fafb;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Contextual Editing</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Edit content directly where it appears</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Keyboard Support</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enter to save, Escape to cancel</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Feedback</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear indication of editing state</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Auto-focus</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Automatic focus on input when editing starts</p>
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
            <h4 className="font-medium text-gray-800 dark:text-gray-200">User Profiles</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Quick editing of user information and preferences</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📝</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Content Management</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Inline editing of titles, descriptions, and content</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚙️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Settings Panels</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Quick configuration changes without page navigation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
