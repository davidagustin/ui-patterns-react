'use client';

import { useState } from 'react';

interface CodeTabsProps {
  jsxCode: string;
  title?: string;
}

export default function CodeTabs({ jsxCode, title = "Code Example" }: CodeTabsProps) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        💻 {title}
      </h2>
      
      {/* Tab Content */}
      <div className="code-block">
        <pre className="text-sm leading-relaxed">
          {jsxCode}
        </pre>
      </div>
    </div>
  );
}