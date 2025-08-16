"use client";
import { useMemo, useEffect, useState } from "react";

// StackBlitz integration
export const sendToStackBlitz = async (
  componentName: string,
  sourceCode: string,
) => {
  try {
    // Create the form data for StackBlitz POST API
    const formData = new FormData();
    
    // Project metadata
    formData.append("project[title]", `${componentName} - UI Pattern`);
    formData.append("project[description]", `Interactive demo of ${componentName} UI pattern`);
    formData.append("project[template]", "create-react-app");
    
    // Main component file
    formData.append("project[files][src/App.tsx]", `"use client";

import React from 'react';
import { DynamicCodeExample } from './components/shared/CodeGenerator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>${componentName} - UI Pattern Demo</h1>
        <p>This is a demo of the ${componentName} UI pattern.</p>
      </header>
      <main>
        <DynamicCodeExample componentName="${componentName}" />
      </main>
    </div>
  );
}

export default App;`);
    
    // Include the CodeGenerator component
    formData.append("project[files][src/components/shared/CodeGenerator.tsx]", `"use client";

import { useMemo, useEffect, useState } from "react";

// Runtime source code extractor
export const extractComponentSource = async (
  componentName: string,
): Promise<string> => {
  try {
    // Try to fetch the actual source file
    const response = await fetch(\`/api/source/\${componentName}\`);
    if (response.ok) {
      return await response.text();
    }
  } catch (error) {
    console.warn("Could not fetch source code:", error);
  }

  // Fallback: return a placeholder
  return \`// Source code for \${componentName} could not be loaded dynamically
// This would contain the actual runtime-extracted source code\`;
};

// Dynamic code generator that fetches real source code
export const useDynamicCode = (
  componentName: string,
) => {
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

  return { sourceCode, loading };
};

// Component that displays dynamic code
export const DynamicCodeExample = ({
  componentName,
}: {
  componentName: string;
}) => {
  const { sourceCode, loading } = useDynamicCode(componentName);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          <span className="mr-2">💻</span>
          Code Example
        </h3>
      </div>
      
      <pre className="text-sm leading-relaxed bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
        {loading ? (
          <div className="text-gray-500 italic">Loading source code...</div>
        ) : (
          sourceCode
        )}
      </pre>
    </div>
  );
};`);
    
    // Essential create-react-app files
    formData.append("project[files][public/index.html]", `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <title>${componentName} - UI Pattern</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`);

    formData.append("project[files][src/index.js]", `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`);

    formData.append("project[files][src/index.css]", `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}`);

    formData.append("project[files][package.json]", `{
  "name": "${componentName}-ui-pattern",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`);

    formData.append("project[files][README.md]", `# ${componentName} - UI Pattern

This is a demo of the ${componentName} UI pattern created with Create React App.

## Available Scripts

In the project directory, you can run:

### \`npm start\`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### \`npm test\`

Launches the test runner in the interactive watch mode.

### \`npm run build\`

Builds the app for production to the \`build\` folder.

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).`);

    // Dependencies for React project
    const dependencies = {
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-scripts": "5.0.1"
    };
    formData.append("project[dependencies]", JSON.stringify(dependencies));
    
    // Project settings
    const settings = {
      "compile": {
        "clearConsole": false
      }
    };
    formData.append("project[settings]", JSON.stringify(settings));
    
    // Create and submit the form
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://stackblitz.com/run";
    form.target = "_blank";
    
    // Add form data to form
    for (const [key, value] of formData.entries()) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value as string;
      form.appendChild(input);
    }
    
    // Submit the form
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    
    return true;
  } catch (error) {
    console.error("Failed to send to StackBlitz:", error);
    return false;
  }
};

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
export const useDynamicCode = (
  componentName: string,
) => {
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

  return { sourceCode, loading };
};

// Component that displays dynamic code with StackBlitz integration
export const DynamicCodeExample = ({
  componentName,
}: {
  componentName: string;
}) => {
  const { sourceCode, loading } = useDynamicCode(componentName);
  const [isSendingToStackBlitz, setIsSendingToStackBlitz] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSendToStackBlitz = async () => {
    if (!sourceCode) {
      console.warn("No source code available to send to StackBlitz");
      return;
    }

    setIsSendingToStackBlitz(true);
    try {
      const success = await sendToStackBlitz(componentName, sourceCode);
      if (success) {
        console.log("Successfully sent to StackBlitz");
      } else {
        console.error("Failed to send to StackBlitz");
      }
    } catch (error) {
      console.error("Error sending to StackBlitz:", error);
    } finally {
      setIsSendingToStackBlitz(false);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(sourceCode || "");
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  const handleShareLink = () => {
    const url = `${window.location.origin}/patterns/${componentName}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Header with JSX tab and action icons */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        {/* JSX Tab */}
        <div className="flex">
          <div className="px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400">
            JSX
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2 pr-4">
          <button
            onClick={handleShareLink}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Copy link to this example"
            style={{ transitionDelay: '0ms' }}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={isExpanded ? "Collapse code view" : "Expand code view"}
            style={{ transitionDelay: '0ms' }}
          >
            {isExpanded ? (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>
          <button
            onClick={handleSendToStackBlitz}
            disabled={loading || isSendingToStackBlitz || !sourceCode}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Open in StackBlitz"
            style={{ transitionDelay: '0ms' }}
          >
            {isSendingToStackBlitz ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Code content area */}
      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-none' : 'max-h-96'} relative`}>
        <div className={`bg-gray-50 dark:bg-gray-800 ${isExpanded ? '' : 'overflow-hidden'}`}>
          <pre className={`text-sm leading-relaxed p-4 ${isExpanded ? 'overflow-x-auto' : 'overflow-y-auto max-h-96'}`}>
            {loading ? (
              <div className="text-gray-500 italic">Loading source code...</div>
            ) : (
              sourceCode
            )}
          </pre>
        </div>
        
        {/* Copy button in top-right */}
        <button
          onClick={handleCopyCode}
          className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center border border-gray-200 dark:border-gray-600"
          title="Copy code to clipboard"
          style={{ transitionDelay: '0ms' }}
        >
          {copySuccess ? (
            <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>
      
      {!isExpanded && (
        <div className="text-center py-2 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setIsExpanded(true)}
            className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            title="Click to expand full code"
            style={{ transitionDelay: '0ms' }}
          >
            Click to expand full code
          </button>
        </div>
      )}
      
      {isExpanded && (
        <div className="text-center py-2 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setIsExpanded(false)}
            className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            title="Click to collapse code view"
            style={{ transitionDelay: '0ms' }}
          >
            Click to collapse code view
          </button>
        </div>
      )}
    </div>
  );
};

// Alternative approach: Use Function.toString() to get function source
export const getFunctionSource = (fn: (...args: any[]) => any): string => {
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
