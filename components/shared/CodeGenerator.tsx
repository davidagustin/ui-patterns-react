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
    // Create a CodeSandbox URL with the code
    const codeSandboxUrl = `https://codesandbox.io/s/new?file=/App.js&content=${encodeURIComponent(currentCode)}`;
    window.open(codeSandboxUrl, '_blank');
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
