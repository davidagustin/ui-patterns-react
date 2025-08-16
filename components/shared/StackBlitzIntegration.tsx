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

    // Add CSS module file for components that use it
    formData.append("project[files][src/App.module.css]", `/* Custom notification styles */
.notificationWrapper {
  @apply flex flex-row items-center justify-between w-96 bg-gray-900 px-4 py-6 text-white shadow-2xl hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 rounded-xl relative transition-all duration-500 ease-in-out;
}

.iconWrapper {
  @apply text-xl;
}

.contentWrapper {
  @apply flex flex-col items-start justify-center ml-4 cursor-default;
}

.contentWrapper h1 {
  @apply text-base text-gray-200 font-semibold leading-none tracking-wider;
}

.contentWrapper p {
  @apply text-sm text-gray-400 mt-2 leading-relaxed tracking-wider;
}

.closeIcon {
  @apply absolute top-2 right-2 cursor-pointer text-lg;
}`);
    
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

    formData.append("project[files][src/index.css]", `/* Tailwind CSS - Base styles */
* {
  box-sizing: border-box;
}

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

/* Tailwind CSS - Utility classes */
.min-h-screen { min-height: 100vh; }
.bg-gray-50 { background-color: #f9fafb; }
.bg-white { background-color: #ffffff; }
.bg-gray-900 { background-color: #111827; }
.bg-indigo-500 { background-color: #6366f1; }
.bg-gray-800 { background-color: #1f2937; }
.bg-gray-700 { background-color: #374151; }
.bg-gray-600 { background-color: #4b5563; }

.text-white { color: #ffffff; }
.text-gray-600 { color: #4b5563; }
.text-gray-900 { color: #111827; }
.text-gray-200 { color: #e5e7eb; }
.text-gray-400 { color: #9ca3af; }
.text-gray-300 { color: #d1d5db; }
.text-indigo-600 { color: #4f46e5; }

.shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
.shadow-2xl { box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); }

.border-b { border-bottom-width: 1px; }
.border-gray-200 { border-color: #e5e7eb; }
.border-blue-200 { border-color: #bfdbfe; }
.border-blue-800 { border-color: #1e40af; }

.p-6 { padding: 1.5rem; }
.p-4 { padding: 1rem; }
.p-2 { padding: 0.5rem; }
.p-3 { padding: 0.75rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
.py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-12 { padding-top: 3rem; padding-bottom: 3rem; }

.m-0 { margin: 0; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-4 { margin-top: 1rem; }
.mt-10 { margin-top: 2.5rem; }
.ml-4 { margin-left: 1rem; }

.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-base { font-size: 1rem; line-height: 1.5rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }

.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }
.font-extrabold { font-weight: 800; }

.rounded-md { border-radius: 0.375rem; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-lg { border-radius: 0.5rem; }

.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }
.flex-1 { flex: 1 1 0%; }
.flex-shrink-0 { flex-shrink: 0; }

.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.items-stretch { align-items: stretch; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-start { justify-content: flex-start; }

.w-96 { width: 24rem; }
.w-auto { width: auto; }
.w-6 { width: 1.5rem; }
.w-8 { width: 2rem; }
.w-12 { width: 3rem; }

.h-6 { height: 1.5rem; }
.h-8 { height: 2rem; }
.h-12 { height: 3rem; }
.h-16 { height: 4rem; }

.space-x-4 > * + * { margin-left: 1rem; }
.space-y-1 > * + * { margin-top: 0.25rem; }
.space-y-10 > * + * { margin-top: 2.5rem; }

.max-w-7xl { max-width: 80rem; }
.max-w-2xl { max-width: 42rem; }

.mx-auto { margin-left: auto; margin-right: auto; }

.relative { position: relative; }
.absolute { position: absolute; }
.inset-y-0 { top: 0; bottom: 0; }
.left-0 { left: 0; }
.right-2 { right: 0.5rem; }
.top-2 { top: 0.5rem; }

.block { display: block; }
.hidden { display: none; }
.inline-flex { display: inline-flex; }

.cursor-pointer { cursor: pointer; }
.cursor-default { cursor: default; }

.transition-all { transition-property: all; }
.transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; }
.duration-500 { transition-duration: 500ms; }
.ease-in-out { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }

.transform-gpu { transform: translateZ(0); }
.translate-y-0 { transform: translateY(0); }
.hover\\:translate-y-1:hover { transform: translateY(0.25rem); }

.hover\\:shadow-none:hover { box-shadow: none; }
.hover\\:bg-gray-700:hover { background-color: #374151; }
.hover\\:text-white:hover { color: #ffffff; }

.focus\\:outline-none:focus { outline: 2px solid transparent; outline-offset: 2px; }
.focus\\:ring-2:focus { box-shadow: 0 0 0 2px rgb(255 255 255); }
.focus\\:ring-inset:focus { box-shadow: inset 0 0 0 2px rgb(255 255 255); }
.focus\\:ring-white:focus { box-shadow: 0 0 0 2px rgb(255 255 255); }

.leading-none { line-height: 1; }
.leading-relaxed { line-height: 1.625; }
.leading-6 { line-height: 1.5rem; }
.leading-8 { line-height: 2rem; }

.tracking-wide { letter-spacing: 0.025em; }
.tracking-wider { letter-spacing: 0.05em; }
.tracking-tight { letter-spacing: -0.025em; }

.uppercase { text-transform: uppercase; }

/* Grid utilities */
.grid { display: grid; }
.md\\:grid { display: grid; }
.md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.md\\:gap-x-8 { column-gap: 2rem; }
.md\\:gap-y-10 { row-gap: 2.5rem; }
.md\\:space-y-0 > * + * { margin-top: 0; }

/* Responsive utilities */
.sm\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.sm\\:px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
.sm\\:block { display: block; }
.sm\\:hidden { display: none; }
.sm\\:items-stretch { align-items: stretch; }
.sm\\:justify-start { justify-content: flex-start; }
.sm\\:ml-6 { margin-left: 1.5rem; }
.sm\\:hidden { display: none; }

.lg\\:px-8 { padding-left: 2rem; padding-right: 2rem; }
.lg\\:block { display: block; }
.lg\\:hidden { display: none; }
.lg\\:text-center { text-align: center; }
.lg\\:mx-auto { margin-left: auto; margin-right: auto; }
.lg\\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }

/* Custom notification styles */
.notificationWrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 24rem;
  background-color: #111827;
  padding: 1rem 1.5rem;
  color: #ffffff;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  border-radius: 0.75rem;
  position: relative;
  transition: all 500ms ease-in-out;
  transform: translateZ(0) translateY(0);
}

.notificationWrapper:hover {
  box-shadow: none;
  transform: translateZ(0) translateY(0.25rem);
}

.iconWrapper {
  font-size: 1.25rem;
}

.contentWrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 1rem;
  cursor: default;
}

.contentWrapper h1 {
  font-size: 1rem;
  line-height: 1.5rem;
  color: #e5e7eb;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.05em;
}

.contentWrapper p {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #9ca3af;
  margin-top: 0.5rem;
  line-height: 1.625;
  letter-spacing: 0.05em;
}

.closeIcon {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
  font-size: 1.125rem;
}

/* Form styles */
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}

.form-section {
  margin-bottom: 2rem;
}

.form-section h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.15s ease-in-out;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgb(99 102 241 / 0.1);
}

.form-group input.error {
  border-color: #ef4444;
}

.form-group .error-message {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.checkbox-group {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.checkbox-group input[type="checkbox"] {
  width: auto;
  margin-right: 0.5rem;
}

.checkbox-group label {
  margin-bottom: 0;
  font-size: 0.875rem;
  color: #6b7280;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  text-decoration: none;
}

.btn-primary {
  background-color: #6366f1;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #5855eb;
}

.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgb(99 102 241 / 0.1);
}

.btn-secondary {
  background-color: #6b7280;
  color: #ffffff;
}

.btn-secondary:hover {
  background-color: #4b5563;
}

/* Navigation styles */
.nav {
  background-color: #1f2937;
}

.nav-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
}

.nav-logo {
  display: flex;
  align-items: center;
}

.nav-logo img {
  height: 2rem;
  width: auto;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  color: #d1d5db;
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.15s ease-in-out;
}

.nav-link:hover {
  background-color: #374151;
  color: #ffffff;
}

.nav-link.active {
  background-color: #111827;
  color: #ffffff;
}

/* Mobile menu */
.mobile-menu-button {
  display: none;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;
}

.mobile-menu-button:hover {
  color: #ffffff;
  background-color: #374151;
}

.mobile-menu {
  display: none;
  padding: 0.5rem 0;
}

.mobile-menu a {
  display: block;
  padding: 0.75rem 1rem;
  color: #d1d5db;
  text-decoration: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
}

.mobile-menu a:hover {
  background-color: #374151;
  color: #ffffff;
}

.mobile-menu a.active {
  background-color: #111827;
  color: #ffffff;
}

@media (max-width: 640px) {
  .mobile-menu-button {
    display: flex;
  }
  
  .nav-menu {
    display: none;
  }
  
  .mobile-menu {
    display: block;
  }
}

@media (min-width: 768px) {
  .md\\:grid {
    display: grid;
  }
  
  .md\\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  
  .md\\:gap-x-8 {
    column-gap: 2rem;
  }
  
  .md\\:gap-y-10 {
    row-gap: 2.5rem;
  }
  
  .md\\:space-y-0 > * + * {
    margin-top: 0;
  }
}

@media (min-width: 1024px) {
  .lg\\:px-8 {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  
  .lg\\:text-center {
    text-align: center;
  }
  
  .lg\\:mx-auto {
    margin-left: auto;
    margin-right: auto;
  }
  
  .lg\\:text-4xl {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }
}`);



    formData.append("project[files][package.json]", `{
  "name": "${componentName}-ui-pattern",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "classnames": "^2.3.1",
    "react-hot-toast": "^2.1.1",
    "react-icons": "^4.3.1"
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
      
      // Remove DynamicCodeExample usage and related code
      sourceCode = sourceCode.replace(
        /<DynamicCodeExample[^>]*\/>/g,
        '// DynamicCodeExample removed for StackBlitz compatibility'
      );
      sourceCode = sourceCode.replace(
        /<DynamicCodeExample[^>]*>[\s\S]*?<\/DynamicCodeExample>/g,
        '// DynamicCodeExample removed for StackBlitz compatibility'
      );
      
      // Remove any remaining references to DynamicCodeExample
      sourceCode = sourceCode.replace(
        /DynamicCodeExample/g,
        '// DynamicCodeExample removed'
      );
      
      // Remove Code Example comments
      sourceCode = sourceCode.replace(
        /{\/\* Code Example \*\/}/g,
        '// Code Example section removed for StackBlitz compatibility'
      );
      
      // Remove CodeTabs components
      sourceCode = sourceCode.replace(
        /<CodeTabs[^>]*>[\s\S]*?<\/CodeTabs>/g,
        '// CodeTabs removed for StackBlitz compatibility'
      );
      
      // Remove PatternHeader components
      sourceCode = sourceCode.replace(
        /<PatternHeader[^>]*>[\s\S]*?<\/PatternHeader>/g,
        '// PatternHeader removed for StackBlitz compatibility'
      );
      
      // Remove Key Features comments
      sourceCode = sourceCode.replace(
        /{\/\* Key Features \*\/}/g,
        '// Key Features section removed for StackBlitz compatibility'
      );
      
      // Remove Common Use Cases comments
      sourceCode = sourceCode.replace(
        /{\/\* Common Use Cases \*\/}/g,
        '// Common Use Cases section removed for StackBlitz compatibility'
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
