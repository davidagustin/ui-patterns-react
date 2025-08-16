"use client";
import React from "react";

// StackBlitz integration
export const sendToStackBlitz = async (
  componentName: string,
) => {
  try {
    // Get the actual component source code and component name
    const { sourceCode: actualComponentCode, componentName: extractedComponentName } = await extractComponentSource(componentName);
    
    // Create the form data for StackBlitz POST API
    const formData = new FormData();
    
    // Project metadata
    formData.append("project[title]", `${componentName} - UI Pattern`);
    formData.append("project[description]", `Interactive demo of ${componentName} UI pattern`);
    formData.append("project[template]", "create-react-app");
    
    // Main component file with the actual pattern code
    formData.append("project[files][src/App.tsx]", `import React from 'react';
import './index.css';

${actualComponentCode}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">${componentName} - UI Pattern Demo</h1>
        <p className="text-gray-600">This is a demo of the ${componentName} UI pattern.</p>
      </header>
      <main className="p-6">
        <${extractedComponentName} />
      </main>
    </div>
  );
}

export default App;`);
    
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

    formData.append("project[files][src/index.css]", `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: system-ui, sans-serif;
  }
  
  body {
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
  }
}

@layer components {
  .App {
    @apply min-h-screen bg-gray-50;
  }
  
  .App-header {
    @apply bg-white shadow-sm border-b border-gray-200 p-6;
  }
  
  .App-header h1 {
    @apply text-2xl font-bold text-gray-900 mb-2;
  }
  
  .App-header p {
    @apply text-gray-600;
  }
  
  main {
    @apply p-6;
  }
}`);

    formData.append("project[files][tailwind.config.js]", `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`);

    formData.append("project[files][postcss.config.js]", `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`);

    formData.append("project[files][package.json]", `{
  "name": "${componentName}-ui-pattern",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0"
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
      "react-scripts": "5.0.1",
      "tailwindcss": "^3.3.0",
      "autoprefixer": "^10.4.0"
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
): Promise<{ sourceCode: string; componentName: string }> => {
  try {
    // Try to fetch the actual source file
    const response = await fetch(`/api/source/${componentName}`);
    if (response.ok) {
      let sourceCode = await response.text();
      
      // Extract the component name from the source code
      let extractedComponentName = 'InteractiveExample'; // fallback
      const componentNameMatch = sourceCode.match(/export\s+default\s+(?:function|const)\s+(\w+)/);
      if (componentNameMatch) {
        extractedComponentName = componentNameMatch[1];
      }
      
      // Remove export default from the component code
      sourceCode = sourceCode.replace(/export\s+default\s+function\s+(\w+)/, 'function $1');
      sourceCode = sourceCode.replace(/export\s+default\s+const\s+(\w+)/, 'const $1');
      sourceCode = sourceCode.replace(/export\s+default\s+(\w+)/, '$1');
      
      // Also remove any trailing export statements
      sourceCode = sourceCode.replace(/\n\s*export\s+default\s+\w+;?\s*$/g, '');
      
      // Fix import paths to work in StackBlitz environment
      sourceCode = sourceCode.replace(
        /import\s+\{[^}]*\}\s+from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/components\/shared\/CodeGenerator['"];?/g,
        '// Import removed for StackBlitz compatibility'
      );
      sourceCode = sourceCode.replace(
        /import\s+\{[^}]*\}\s+from\s+['"]\.\.\/\.\.\/\.\.\/components\/shared\/CodeGenerator['"];?/g,
        '// Import removed for StackBlitz compatibility'
      );
      sourceCode = sourceCode.replace(
        /import\s+\{[^}]*\}\s+from\s+['"]\.\.\/\.\.\/components\/Tooltip['"];?/g,
        '// Import removed for StackBlitz compatibility'
      );
      sourceCode = sourceCode.replace(
        /import\s+\{[^}]*\}\s+from\s+['"]\.\.\/\.\.\/\.\.\/components\/Tooltip['"];?/g,
        '// Import removed for StackBlitz compatibility'
      );
      sourceCode = sourceCode.replace(
        /import\s+\{[^}]*\}\s+from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/components\/Tooltip['"];?/g,
        '// Import removed for StackBlitz compatibility'
      );
      
      // Remove any remaining import statements that reference non-existent files
      sourceCode = sourceCode.replace(
        /import\s+.*from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/.*['"];?\n?/g,
        ''
      );
      sourceCode = sourceCode.replace(
        /import\s+.*from\s+['"]\.\.\/\.\.\/\.\.\/.*['"];?\n?/g,
        ''
      );
      
      // Clean up any extra whitespace
      sourceCode = sourceCode.trim();
      
      return { sourceCode, componentName: extractedComponentName };
    }
  } catch (error) {
    console.warn("Could not fetch source code:", error);
  }

  // Fallback: return a placeholder
  return {
    sourceCode: `// Source code for ${componentName} could not be loaded dynamically
// This would contain the actual runtime-extracted source code`,
    componentName: 'InteractiveExample'
  };
};

// Hook for StackBlitz integration
export const useStackBlitz = (componentName: string) => {
  const [isSendingToStackBlitz, setIsSendingToStackBlitz] = React.useState(false);

  const handleSendToStackBlitz = async () => {
    setIsSendingToStackBlitz(true);
    try {
      const success = await sendToStackBlitz(componentName);
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

  return {
    isSendingToStackBlitz,
    handleSendToStackBlitz,
  };
};
