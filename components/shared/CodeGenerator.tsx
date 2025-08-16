"use client";
import React, { useEffect, useState } from "react";
import { useStackBlitz } from "./StackBlitzIntegration";

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
  const { isSendingToStackBlitz, handleSendToStackBlitz } = useStackBlitz(componentName);
  
  // Check if we have valid source code (not the fallback message)
  const hasValidSourceCode = sourceCode && 
    !sourceCode.includes('Source code for') && 
    !sourceCode.includes('could not be loaded dynamically') &&
    sourceCode.length > 100; // Ensure we have substantial code
  const [isExpanded, setIsExpanded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

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
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-sm ${isExpanded ? '' : 'border border-gray-200 dark:border-gray-700'}`}>
      {/* Header with JSX tab and action icons */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-2">
        {/* JSX Tab */}
        <div className="flex">
          <div className="px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400">
            JSX
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
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
            disabled={loading || isSendingToStackBlitz || !hasValidSourceCode}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title={!hasValidSourceCode ? "Source code not available" : "Open in StackBlitz"}
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
        <div className="text-center border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setIsExpanded(true)}
            className="text-blue-600 dark:text-blue-400 text-xs font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 py-0.5"
            title="Click to expand full code"
            style={{ transitionDelay: '0ms' }}
          >
            Click to expand full code
          </button>
        </div>
      )}
    </div>
  );
};

// Alternative approach: Use Function.toString() to get function source
export const getFunctionSource = (fn: (...args: unknown[]) => unknown): string => {
  try {
    return fn.toString();
  } catch {
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
  } catch {
    return "// Component source could not be extracted";
  }
};
