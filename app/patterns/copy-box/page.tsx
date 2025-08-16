"use client";
import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
export default function CopyBoxPattern() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());
  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems((prev) => new Set(prev).add(id));
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  const codeSnippets = [
    {
      id: "react-component",
      title: "React Component",
      language: "jsx",
      code: `import React from 'react';
export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {children}
    </button>
  );
}`,
    },
    {
      id: "css-animation",
      title: "CSS Animation",
      language: "css",
      code: `@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.fade-in {
  animation: fadeIn 0.3s ease-out;
}`,
    },
    {
      id: "api-key",
      title: "API Configuration",
      language: "javascript",
      code: `const config = {
  apiKey: 'sk-1234567890abcdef',
  baseURL: 'https://api.example.com/v1',
  timeout: 10000
};`,
    },
  ];
  const commands = [
    {
      id: "npm-install",
      title: "Install Dependencies",
      command: "npm install react react-dom @types/react",
    },
    {
      id: "git-clone",
      title: "Clone Repository",
      command: "git clone https://github.com/username/repository.git",
    },
    {
      id: "docker-run",
      title: "Run Docker Container",
      command: "docker run -p 3000:3000 -d my-app:latest",
    },
  ];
  const snippets = [
    {
      id: "email",
      title: "Email Address",
      content: "support@example.com",
    },
    {
      id: "phone",
      title: "Phone Number",
      content: "+1 (555) 123-4567",
    },
    {
      id: "address",
      title: "Office Address",
      content: "123 Main St, Suite 100, City, ST 12345",
    },
  ];
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📋 Copy Box Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Enable users to quickly copy content to their clipboard with visual
          feedback and multiple content types.
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
              Click any copy button to copy content to your clipboard. Notice
              the visual feedback when copying.
            </p>
            {/* Code Snippets */}
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium mb-3 text-gray-800 dark:text-gray-200">
                  Code Snippets
                </h3>
                <div className="space-y-4">
                  {codeSnippets.map((snippet) => (
                    <div key={snippet.id} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {snippet.title}
                        </span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-400">
                          {snippet.language}
                        </span>
                      </div>
                      <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                        <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
                          <code>{snippet.code}</code>
                        </pre>
                        <button
                          onClick={() =>
                            copyToClipboard(snippet.code, snippet.id)
                          }
                          className={`absolute top-3 right-3 px-3 py-1 rounded text-sm font-medium transition-all ${
                            copiedItems.has(snippet.id)
                              ? "bg-green-500 text-white"
                              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          }`}
                        >
                          {copiedItems.has(snippet.id) ? (
                            <span className="flex items-center space-x-1">
                              <span>✓</span>
                              <span>Copied!</span>
                            </span>
                          ) : (
                            <span className="flex items-center space-x-1">
                              <span>📋</span>
                              <span>Copy</span>
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Terminal Commands */}
              <div>
                <h3 className="text-md font-medium mb-3 text-gray-800 dark:text-gray-200">
                  Terminal Commands
                </h3>
                <div className="space-y-3">
                  {commands.map((cmd) => (
                    <div
                      key={cmd.id}
                      className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                          {cmd.title}
                        </div>
                        <code className="text-sm font-mono text-gray-600 dark:text-gray-400">
                          {cmd.command}
                        </code>
                      </div>
                      <button
                        onClick={() => copyToClipboard(cmd.command, cmd.id)}
                        className={`ml-3 px-3 py-1 rounded text-sm font-medium transition-all ${
                          copiedItems.has(cmd.id)
                            ? "bg-green-500 text-white"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        {copiedItems.has(cmd.id) ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              {/* Text Snippets */}
              <div>
                <h3 className="text-md font-medium mb-3 text-gray-800 dark:text-gray-200">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  {snippets.map((snippet) => (
                    <div
                      key={snippet.id}
                      className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div>
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {snippet.title}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {snippet.content}
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(snippet.content, snippet.id)
                        }
                        className={`px-3 py-1 rounded text-sm transition-all ${
                          copiedItems.has(snippet.id)
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                        }`}
                      >
                        {copiedItems.has(snippet.id) ? "✓" : "📋"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Code Example */}
<DynamicCodeExample componentName="copy-box" activeTab="jsx" />
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
                One-Click Copy
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Instant clipboard copying with single button click
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
                Clear success indication when content is copied
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Multiple Content Types
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Support for code, commands, and plain text
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
                Graceful fallback for unsupported browsers
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
            <div className="text-2xl mb-2">💻</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Code Documentation
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Copy code snippets and examples
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Terminal Commands
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Quick command copying for tutorials
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📞</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Contact Information
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Easy sharing of emails and addresses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
