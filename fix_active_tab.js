const fs = require('fs');
const path = require('path');

// Function to fix missing activeTab state
function fixActiveTab(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Check if activeTab is referenced but not defined
    if (content.includes('activeTab') && !content.includes('const [activeTab')) {
      // Add activeTab state after the first useState
      const useStateRegex = /const \[.*\] = useState/;
      if (useStateRegex.test(content)) {
        content = content.replace(
          useStateRegex,
          `const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');\n  $&`
        );
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed activeTab: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// Get all pattern files
const patternsDir = path.join(__dirname, 'app', 'patterns');
const files = [];

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

console.log(`Found ${files.length} pattern files to check...\n`);

// Process each file
files.forEach(file => {
  fixActiveTab(file);
});

console.log('\n🎉 ActiveTab fix completed!');
