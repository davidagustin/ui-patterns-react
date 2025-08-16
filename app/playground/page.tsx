"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PlaygroundContent() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState("");
  const [componentName, setComponentName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const codeParam = searchParams.get("code");
    const componentParam = searchParams.get("component");
    
    if (codeParam) {
      setCode(decodeURIComponent(codeParam));
    }
    if (componentParam) {
      setComponentName(componentParam);
    }
    setIsLoading(false);
  }, [searchParams]);

  const executeCode = () => {
    try {
      // Create a safe execution environment
      const iframe = document.getElementById("preview-iframe") as HTMLIFrameElement;
      if (iframe && iframe.contentWindow) {
        const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>Component Preview</title>
              <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
              <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
              <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                body { margin: 0; padding: 20px; font-family: system-ui, sans-serif; }
                .preview-container { border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background: white; }
              </style>
            </head>
            <body>
              <div id="root"></div>
              <script type="text/babel">
                ${code}
                
                // Render the component
                const root = ReactDOM.createRoot(document.getElementById('root'));
                root.render(React.createElement(InteractiveExample || FormsPattern || TabsPattern || componentName));
              </script>
            </body>
          </html>
        `;
        
        iframe.srcdoc = htmlContent;
      }
    } catch (err) {
      setError("Failed to execute code: " + (err as Error).message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto p-6">
          <div className="text-center">Loading playground...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🎮 Component Playground
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Test and experiment with UI pattern components
            {componentName && (
              <span className="ml-2 text-blue-600 dark:text-blue-400">
                • {componentName}
              </span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Code Editor</span>
                <button
                  onClick={executeCode}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md transition-colors"
                >
                  Run Code
                </button>
              </div>
            </div>
            <div className="p-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 p-4 bg-gray-900 text-gray-100 font-mono text-sm rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your component code will appear here..."
              />
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
              <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Live Preview</span>
            </div>
            <div className="p-4">
              {error && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                </div>
              )}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700">
                <iframe
                  id="preview-iframe"
                  className="w-full h-96 border-0 rounded-md"
                  title="Component Preview"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="text-blue-900 dark:text-blue-100 font-semibold mb-2">How to use:</h3>
          <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
            <li>• The code from your pattern is automatically loaded</li>
            <li>• Click "Run Code" to execute and see the live preview</li>
            <li>• Modify the code in the editor to experiment</li>
            <li>• The preview updates in real-time</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlaygroundContent />
    </Suspense>
  );
}
