"use client";
import { useMemo, useEffect, useState } from "react";
import { Copy, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
// Runtime source code extractor
export const extractComponentSource = async (
  componentName: string,
): Promise<string> => {
  try {
    // Try to fetch the actual source file
    const response = await fetch(`/api/source/${componentName}`);
    if (response.ok) {
      return await response.text();
    }
  } catch (error) {
    console.warn("Could not fetch source code:", error);
  }
  // Fallback: return a placeholder
  return `// Source code for ${componentName} could not be loaded dynamically
// This would contain the actual runtime-extracted source code`;
};
// Dynamic code generator that fetches real source code
export const useDynamicCode = (componentName: string) => {
  const [sourceCode, setSourceCode] = useState<string>("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadSourceCode = async () => {
      setLoading(true);
      try {
        const jsxSource = await extractComponentSource(componentName);
        setSourceCode(jsxSource);
      } catch (error) {
        console.error("Failed to load source code:", error);
      } finally {
        setLoading(false);
      }
    };
    loadSourceCode();
  }, [componentName]);
  const currentCode = useMemo(() => {
    if (loading) {
      return "// Loading source code...";
    }
    return sourceCode;
  }, [sourceCode, loading]);
  return { currentCode, loading };
};
// Component that displays dynamic code
export const DynamicCodeExample = ({
  componentName,
}: {
  componentName: string;
}) => {
  const { currentCode, loading } = useDynamicCode(componentName);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const openPlayground = () => {
    // Create a form to submit to StackBlitz POST API
    const form = document.createElement('form');
    form.method = 'post';
    form.action = 'https://stackblitz.com/run';
    form.target = '_blank';
    form.style.display = 'none';

    // Add form fields for StackBlitz project
    const addField = (name: string, value: string) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    };

    // Project metadata
    addField('project[title]', `${componentName} - UI Pattern Example`);
    addField('project[description]', `Interactive example of the ${componentName} UI pattern`);
    addField('project[template]', 'create-react-app');

    // Add the main component file
    addField('project[files][src/App.js]', currentCode);

    // Add package.json dependencies for React and Tailwind
    const dependencies = {
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "tailwindcss": "^3.3.0",
      "@tailwindcss/forms": "^0.5.0"
    };
    addField('project[dependencies]', JSON.stringify(dependencies));

    // Add Tailwind CSS configuration
    addField('project[files][tailwind.config.js]', `module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}`);

    // Add CSS file with Tailwind imports
    addField('project[files][src/index.css]', `@tailwind base;
@tailwind components;
@tailwind utilities;`);

    // Add index.js to import CSS and render the app
    addField('project[files][src/index.js]', `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`);

    // Add HTML file
    addField('project[files][public/index.html]', `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="UI Pattern Example" />
    <title>${componentName} - UI Pattern</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`);

    // Submit the form
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center justify-end">
          <div className="flex items-center space-x-2">
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
              title="Copy code"
            >
              <Copy size={12} />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            
            {/* Playground Button */}
            <button
              onClick={openPlayground}
              className="flex items-center space-x-1 px-2 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
              title="Open in playground"
            >
              <ExternalLink size={12} />
              <span>Playground</span>
            </button>
            
            {/* Expand/Collapse Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-1 px-2 py-1 text-xs bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Code Content */}
      <div className={`overflow-y-auto transition-all duration-300 ${
        isExpanded ? 'max-h-none' : 'max-h-64'
      }`}>
        <pre className="text-sm leading-relaxed p-4 text-gray-100 bg-gray-900 font-mono">
          {loading ? (
            <div className="text-gray-400 italic">Loading source code...</div>
          ) : (
            currentCode
          )}
        </pre>
      </div>
    </div>
  );
};
// Alternative approach: Use Function.toString() to get function source
export const getFunctionSource = (fn: Function): string => {
  try {
    return fn.toString();
  } catch (error) {
    return "// Function source could not be extracted";
  }
};
// Extract component source using Function.toString()
export const extractComponentSourceFromFunction = (
  component: React.ComponentType,
): string => {
  try {
    // This would extract the actual function source code
    const source = component.toString();
    return source;
  } catch (error) {
    return "// Component source could not be extracted";
  }
};
