"use client";
import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
export default function InplaceEditorPattern() {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    name: "John Doe",
    title: "Senior Developer",
    email: "john.doe@example.com",
    bio: "Passionate developer with 5+ years of experience in React and Node.js.",
  });
  const [tempValues, setTempValues] = useState({ ...userData });
  const startEditing = (field: string) => {
    setEditingField(field);
    setTempValues({ ...userData });
  };
  const saveEdit = (field: string) => {
    setUserData({
      ...userData,
      [field]: (tempValues as any)[field],
    });
    setEditingField(null);
  };
  const cancelEdit = () => {
    setEditingField(null);
    setTempValues({ ...userData });
  };
  const handleKeyDown = (e: React.KeyboardEvent, field: string) => {
    if (e.key === "Enter") {
      saveEdit(field);
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };
  const renderEditableField = (
    field: keyof typeof userData,
    label: string,
    type: "text" | "textarea" = "text",
  ) => {
    const isEditing = editingField === field;
    const value = isEditing ? tempValues[field] : userData[field];
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        {isEditing ? (
          <div className="space-y-2">
            {type === "textarea" ? (
              <textarea
                value={value}
                onChange={(e) =>
                  setTempValues({ ...tempValues, [field]: e.target.value })
                }
                onKeyDown={(e) => handleKeyDown(e, field)}
                className="input-field resize-none"
                rows={3}
                autoFocus
              />
            ) : (
              <input
                type={type}
                value={value}
                onChange={(e) =>
                  setTempValues({ ...tempValues, [field]: e.target.value })
                }
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
              {type === "textarea" ? (
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  {value}
                </p>
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
          Edit content directly in context without navigating to separate forms,
          providing a seamless editing experience.
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
              Click the edit button next to any field to start editing. Press
              Enter to save or Escape to cancel.
            </p>
            <div className="space-y-4">
              {renderEditableField("name", "Full Name")}
              {renderEditableField("title", "Job Title")}
              {renderEditableField("email", "Email Address")}
              {renderEditableField("bio", "Bio", "textarea")}
            </div>
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                Keyboard Shortcuts
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>
                  •{" "}
                  <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">
                    Enter
                  </kbd>{" "}
                  to save changes
                </div>
                <div>
                  •{" "}
                  <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">
                    Escape
                  </kbd>{" "}
                  to cancel editing
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
            {/* Tab Content */}
            <div className="code-block">
              <DynamicCodeExample componentName="inplace-editor" />
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
                Contextual Editing
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Edit content directly where it appears
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Keyboard Support
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter to save, Escape to cancel
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Visual Feedback
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Clear indication of editing state
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Auto-focus
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatic focus on input when editing starts
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
              User Profiles
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Quick editing of user information and preferences
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📝</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Content Management
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Inline editing of titles, descriptions, and content
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚙️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Settings Panels
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Quick configuration changes without page navigation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
