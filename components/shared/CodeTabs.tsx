'use client';

import { useState } from 'react';

interface CodeTabsProps {
  jsxCode: string;
  cssCode?: string;
  title?: string;
}

export default function CodeTabs({ jsxCode, cssCode, title = "Code Example" }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        💻 {title}
      </h2>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <button
          onClick={() => setActiveTab('jsx')}
          className={`px-4 py-2 font-medium transition-all ${
            activeTab === 'jsx'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          JSX
        </button>
        {cssCode && (
          <button
            onClick={() => setActiveTab('css')}
            className={`px-4 py-2 font-medium transition-all ${
              activeTab === 'css'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            CSS
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="code-block">
        <pre className="text-sm leading-relaxed">
          {activeTab === 'jsx' ? jsxCode : cssCode}
        </pre>
      </div>
    </div>
  );
}