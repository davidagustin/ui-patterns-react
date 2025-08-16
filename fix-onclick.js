#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Function to fix empty onClick handlers
function fixOnClickHandlers(filePath) {
  console.log(`Fixing: ${filePath}`);

  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  // Fix empty onClick handlers
  const emptyOnClickRegex = /onClick=\{\(\) => \}/g;
  if (emptyOnClickRegex.test(content)) {
    content = content.replace(emptyOnClickRegex, "");
    modified = true;
    console.log(`  - Removed empty onClick handlers`);
  }

  // Fix onClick handlers with only setActiveTab calls
  const setActiveTabOnClickRegex = /onClick=\{\(\) => setActiveTab\("jsx"\)\}/g;
  if (setActiveTabOnClickRegex.test(content)) {
    content = content.replace(setActiveTabOnClickRegex, "");
    modified = true;
    console.log(`  - Removed setActiveTab onClick handlers`);
  }

  // Remove activeTab === "jsx" conditions from className
  const activeTabConditionRegex = /activeTab === "jsx"/g;
  if (activeTabConditionRegex.test(content)) {
    content = content.replace(activeTabConditionRegex, "true");
    modified = true;
    console.log(`  - Fixed activeTab conditions`);
  }

  // Remove empty button elements
  const emptyButtonRegex =
    /<button\s+className=\{`[^`]*`\}\s*>\s*JSX\s*<\/button>/g;
  if (emptyButtonRegex.test(content)) {
    content = content.replace(emptyButtonRegex, "");
    modified = true;
    console.log(`  - Removed empty JSX buttons`);
  }

  // Remove empty flex containers
  const emptyFlexContainerRegex = /<div[^>]*flex[^>]*border-b[^>]*>\s*<\/div>/g;
  if (emptyFlexContainerRegex.test(content)) {
    content = content.replace(emptyFlexContainerRegex, "");
    modified = true;
    console.log(`  - Removed empty flex containers`);
  }

  // Clean up extra whitespace and newlines
  content = content.replace(/\n\s*\n\s*\n/g, "\n\n");
  content = content.replace(/\s+$/gm, "");

  if (modified) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`  ✓ Fixed ${filePath}`);
  } else {
    console.log(`  - No fixes needed`);
  }

  return modified;
}

// Main execution
async function main() {
  console.log("🔧 Starting onClick handler fix script...\n");

  // Find all pattern files
  const patternFiles = glob.sync("app/patterns/*/page.tsx");

  if (patternFiles.length === 0) {
    console.log("❌ No pattern files found!");
    return;
  }

  console.log(`Found ${patternFiles.length} pattern files to check:\n`);

  let totalFixed = 0;

  // Process each pattern file
  for (const file of patternFiles) {
    const fixed = fixOnClickHandlers(file);
    if (fixed) {
      totalFixed++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`- Processed ${patternFiles.length} pattern files`);
  console.log(`- Fixed ${totalFixed} pattern files`);
  console.log(`\n✅ OnClick handler fixes completed!`);
}

// Run the script
main().catch(console.error);
