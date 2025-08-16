"use client";

import { useState, useEffect } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function GoodDefaultsPattern() {
  const [activeTab, setActiveTab] = useState<"jsx" | "css">("jsx");
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    country: "United States",
    timezone: "America/New_York",
    language: "English",
    notifications: true,
    theme: "system",
    dateFormat: "MM/DD/YYYY",
  });

  const [projectSettings, setProjectSettings] = useState({
    projectName: "",
    description: "",
    visibility: "private",
    license: "MIT",
    includeReadme: true,
    includeGitignore: true,
    framework: "react",
    packageManager: "npm",
  });

  const [formData, setFormData] = useState({
    quantity: 1,
    priority: "medium",
    category: "general",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // 7 days from now
    assignee: "current-user",
    status: "pending",
  });

  const [preferences, setPreferences] = useState({
    emailFrequency: "weekly",
    marketingEmails: false,
    securityAlerts: true,
    autoSave: true,
    autoBackup: true,
    compressionLevel: "medium",
  });

  // Simulate detecting user's location/timezone
  useEffect(() => {
    const detectUserLocation = () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const locale = navigator.language;

        setUserProfile((prev) => ({
          ...prev,
          timezone,
          language: locale.startsWith("en")
            ? "English"
            : locale.startsWith("es")
              ? "Spanish"
              : locale.startsWith("fr")
                ? "French"
                : "English",
        }));
      } catch (error) {
        console.log("Could not detect user location");
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
          Provide smart default values that reduce user effort, improve
          completion rates, and guide users toward optimal choices.
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
              Notice how forms are pre-filled with sensible defaults based on
              context, user location, and common preferences.
            </p>

            <div className="space-y-6">
              {/* User Profile with Smart Defaults */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  User Profile (Location-based Defaults)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={userProfile.name}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, name: e.target.value })
                    }
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={userProfile.email}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, email: e.target.value })
                    }
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  <select
                    value={userProfile.country}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        country: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        timezone: e.target.value,
                      })
                    }
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">
                      Pacific Time (PT)
                    </option>
                    <option value="Europe/London">London (GMT)</option>
                  </select>
                  <select
                    value={userProfile.language}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        language: e.target.value,
                      })
                    }
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Español</option>
                    <option value="French">Français</option>
                    <option value="German">Deutsch</option>
                  </select>
                  <select
                    value={userProfile.theme}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, theme: e.target.value })
                    }
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="system">🔄 System (Recommended)</option>
                    <option value="light">☀️ Light</option>
                    <option value="dark">🌙 Dark</option>
                  </select>
                </div>
                <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs text-blue-700 dark:text-blue-300">
                  💡 Defaults detected: {userProfile.timezone},{" "}
                  {userProfile.language}
                </div>
              </div>

              {/* Project Settings with Opinionated Defaults */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Project Setup (Opinionated Defaults)
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={projectSettings.projectName}
                    onChange={(e) =>
                      setProjectSettings({
                        ...projectSettings,
                        projectName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <select
                      value={projectSettings.visibility}
                      onChange={(e) =>
                        setProjectSettings({
                          ...projectSettings,
                          visibility: e.target.value,
                        })
                      }
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    >
                      <option value="private">🔒 Private (Recommended)</option>
                      <option value="public">🌐 Public</option>
                    </select>
                    <select
                      value={projectSettings.license}
                      onChange={(e) =>
                        setProjectSettings({
                          ...projectSettings,
                          license: e.target.value,
                        })
                      }
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
                        onChange={(e) =>
                          setProjectSettings({
                            ...projectSettings,
                            includeReadme: e.target.checked,
                          })
                        }
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span>Include README.md</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={projectSettings.includeGitignore}
                        onChange={(e) =>
                          setProjectSettings({
                            ...projectSettings,
                            includeGitignore: e.target.checked,
                          })
                        }
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
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Create Task (Context-aware Defaults)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quantity: parseInt(e.target.value) || 1,
                      })
                    }
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder="Quantity"
                  />
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  <select
                    value={formData.assignee}
                    onChange={(e) =>
                      setFormData({ ...formData, assignee: e.target.value })
                    }
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
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Preferences (Safe Defaults)
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <select
                      value={preferences.emailFrequency}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          emailFrequency: e.target.value,
                        })
                      }
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    >
                      <option value="never">Never</option>
                      <option value="weekly">📧 Weekly (Balanced)</option>
                      <option value="daily">Daily</option>
                      <option value="instant">Instant</option>
                    </select>
                    <select
                      value={preferences.compressionLevel}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          compressionLevel: e.target.value,
                        })
                      }
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
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            marketingEmails: e.target.checked,
                          })
                        }
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span>Marketing emails (opt-in)</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={preferences.securityAlerts}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            securityAlerts: e.target.checked,
                          })
                        }
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span>Security alerts (recommended)</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={preferences.autoSave}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            autoSave: e.target.checked,
                          })
                        }
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span>Auto-save (convenience)</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={preferences.autoBackup}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            autoBackup: e.target.checked,
                          })
                        }
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span>Auto-backup (safety)</span>
                    </label>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-orange-50 dark:bg-orange-900/20 rounded text-xs text-orange-700 dark:text-orange-300">
                  🛡️ Security features enabled by default, marketing disabled
                  for privacy
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

            <div className="code-block">
              {
                <DynamicCodeExample componentName="good-defaults" />
              }
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
                Smart Detection
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatically detect user location, language, and preferences
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Privacy-First
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Security features enabled, marketing disabled by default
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Context-Aware
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Defaults change based on user type and context
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Best Practices
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Promote good habits and optimal choices
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
            <div className="text-2xl mb-2">📝</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Registration Forms
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Pre-fill location, language, and safe privacy settings
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚙️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Project Setup
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Choose optimal frameworks and configurations
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              E-commerce
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Set reasonable quantities and shipping preferences
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
