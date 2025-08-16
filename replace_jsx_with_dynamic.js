const fs = require('fs');
const path = require('path');

// Function to replace hardcoded JSX code with dynamic code generation
function replaceJsxWithDynamic(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Extract component name from file path
    const componentName = path.basename(path.dirname(filePath));

    // Add import for DynamicCodeExample if not present
    if (!content.includes('DynamicCodeExample')) {
      const importRegex = /import.*from.*['"]react['"];?/;
      if (importRegex.test(content)) {
        content = content.replace(
          importRegex,
          `$&\nimport { DynamicCodeExample } from '../../../components/shared/CodeGenerator';`
        );
        modified = true;
      }
    }

    // Remove hardcoded JSX code blocks
    const jsxCodeRegex = /<pre className="text-sm leading-relaxed">\s*\{`[\s\S]*?`\}\s*<\/pre>/g;
    if (jsxCodeRegex.test(content)) {
      content = content.replace(jsxCodeRegex, (match) => {
        return `<DynamicCodeExample \n                componentName="${componentName}" \n                activeTab={activeTab} \n              />`;
      });
      modified = true;
    }

    // Remove generateRuntimeCode functions
    const generateFunctionRegex = /const generateRuntimeCode = \(\) => \{[\s\S]*?\};/g;
    if (generateFunctionRegex.test(content)) {
      content = content.replace(generateFunctionRegex, '');
      modified = true;
    }

    // Remove jsxCode variable declarations
    const jsxCodeVarRegex = /const jsxCode = `[\s\S]*?`;/g;
    if (jsxCodeVarRegex.test(content)) {
      content = content.replace(jsxCodeVarRegex, '');
      modified = true;
    }

    // Add activeTab state if not present
    if (!content.includes('activeTab') && !content.includes('useState')) {
      const useStateRegex = /const \[.*\] = useState/;
      if (useStateRegex.test(content)) {
        content = content.replace(
          useStateRegex,
          `const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');\n  $&`
        );
        modified = true;
      }
    }

    // Clean up any empty lines that might have been left
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
      return componentName;
    } else {
      console.log(`⏭️  No changes needed: ${filePath}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return null;
  }
}

// Function to update the route.ts file with component mappings
function updateRouteFile(componentNames) {
  const routePath = 'app/api/source/[component]/route.ts';
  
  try {
    let content = fs.readFileSync(routePath, 'utf8');
    
    // Find the componentPaths object
    const componentPathsRegex = /const componentPaths: Record<string, string> = \{[\s\S]*?\};/;
    const match = content.match(componentPathsRegex);
    
    if (match) {
      // Extract existing mappings
      const existingMappings = match[0];
      
      // Create new mappings
      const newMappings = componentNames.map(name => {
        return `      '${name}': 'app/patterns/${name}/page.tsx'`;
      }).join(',\n');
      
      // Replace the componentPaths object
      const newComponentPaths = `const componentPaths: Record<string, string> = {\n${newMappings}\n    };`;
      
      content = content.replace(componentPathsRegex, newComponentPaths);
      
      fs.writeFileSync(routePath, content, 'utf8');
      console.log(`✅ Updated route.ts with ${componentNames.length} component mappings`);
    }
  } catch (error) {
    console.error('❌ Error updating route.ts:', error.message);
  }
}

// Get all pattern files
const patternsDir = path.join(__dirname, 'app', 'patterns');
const files = [];
const componentNames = [];

function walkDir(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (item === 'page.tsx') {
      files.push(fullPath);
    }
  }
}

walkDir(patternsDir);

console.log(`Found ${files.length} pattern files to process...\n`);

// Process each file
files.forEach(file => {
  const componentName = replaceJsxWithDynamic(file);
  if (componentName) {
    componentNames.push(componentName);
  }
});

// Update the route.ts file
if (componentNames.length > 0) {
  updateRouteFile(componentNames);
}

console.log('\n🎉 JSX to dynamic code conversion completed!');
console.log(`Updated ${componentNames.length} files with dynamic code generation.`);
