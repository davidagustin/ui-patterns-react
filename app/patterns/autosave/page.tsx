"use client";
import { useState, useEffect } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
export default function AutosavePattern() {
  const [content, setContent] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  // Simulate autosave functionality
  useEffect(() => {
    if (content && content.length > 0) {
      setIsSaving(true);
      setSaveStatus("saving");
      const timer = setTimeout(() => {
        // Simulate API call
        setLastSaved(new Date());
        setIsSaving(false);
        setSaveStatus("saved");
        // Reset status after 3 seconds
        setTimeout(() => setSaveStatus("idle"), 3000);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [content]);
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const getStatusText = () => {
    switch (saveStatus) {
      case "saving":
        return "Saving...";
      case "saved":
        return "All changes saved";
      case "error":
        return "Save failed";
      default:
        return lastSaved
          ? `Last saved ${lastSaved.toLocaleTimeString()}`
          : "Start typing to auto-save";
    }
  };
  const getStatusColor = () => {
    switch (saveStatus) {
      case "saving":
        return "text-yellow-600 dark:text-yellow-400";
      case "saved":
        return "text-green-600 dark:text-green-400";
      case "error":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-500 dark:text-gray-400";
    }
  };
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          💾 Autosave Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Automatically save user progress to prevent data loss and provide
          peace of mind during content creation.
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
              Start typing in the text area below. The content will
              automatically save after you stop typing for 1 second.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">
                  Document Editor
                </h3>
                <div className={`text-sm font-medium ${getStatusColor()}`}>
                  {isSaving && <span className="animate-pulse">⏳</span>}
                  {saveStatus === "saved" && <span>✅</span>}
                  {getStatusText()}
                </div>
              </div>
              <textarea
                value={content}
                onChange={handleContentChange}
                placeholder="Start typing your content here... The autosave feature will automatically save your work as you type."
                rows={8}
                className="input-field resize-none"
              />
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{content.length} characters</span>
                <span>Auto-saves every 1 second after you stop typing</span>
              </div>
            </div>
          </div>
        </div>
        {/* Code Example */}
        <DynamicCodeExample componentName="autosave" />
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
                Debounced Saving
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Saves after user stops typing to avoid excessive API calls
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
                Clear indicators showing save status and last saved time
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Error Handling
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Graceful handling of save failures with user notification
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Data Recovery
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatic recovery of unsaved changes on page reload
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Best Practices */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold mb-4 text-yellow-800 dark:text-yellow-200">
          💡 Best Practices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">
                1.
              </span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Use Debouncing
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Wait for user to stop typing before saving
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">
                2.
              </span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Show Save Status
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Provide clear visual feedback about save state
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">
                3.
              </span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Handle Errors Gracefully
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Retry failed saves and notify users appropriately
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">
                4.
              </span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Optimize Performance
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use efficient save intervals and batch updates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
