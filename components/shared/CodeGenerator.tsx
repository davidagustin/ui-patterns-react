"use client";

import { useMemo, useEffect, useState } from "react";

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
  activeTab: "jsx" | "css",
) => {
  const [sourceCode, setSourceCode] = useState<string>("");
  const [cssCode, setCssCode] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSourceCode = async () => {
      setLoading(true);
      try {
        const jsxSource = await extractComponentSource(componentName);
        const cssSource = await extractComponentSource(`${componentName}.css`);

        setSourceCode(jsxSource);
        setCssCode(cssSource);
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
    return activeTab === "jsx" ? sourceCode : cssCode;
  }, [activeTab, sourceCode, cssCode, loading]);

  return { currentCode, loading };
};

// Component that displays dynamic code
export const DynamicCodeExample = ({
  componentName,
  activeTab,
}: {
  componentName: string;
  activeTab: "jsx" | "css";
}) => {
  const { currentCode, loading } = useDynamicCode(componentName, activeTab);

  return (
    <pre className="text-sm leading-relaxed">
      {loading ? (
        <div className="text-gray-500 italic">Loading source code...</div>
      ) : (
        currentCode
      )}
    </pre>
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
