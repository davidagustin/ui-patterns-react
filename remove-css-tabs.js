#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Function to remove CSS tab from a single file
function removeCssTabFromFile(filePath) {
  console.log(`Processing: ${filePath}`);

  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  // 1. Remove activeTab state declaration
  const activeTabStateRegex =
    /const \[activeTab, setActiveTab\] = useState<"jsx" \| "css">\("jsx"\);/g;
  if (activeTabStateRegex.test(content)) {
    content = content.replace(activeTabStateRegex, "");
    modified = true;
    console.log(`  - Removed activeTab state`);
  }

  // 2. Remove CSS tab button
  const cssTabButtonRegex =
    /<button\s+onClick=\{\(\) => setActiveTab\("css"\)\}\s+className=\{`[^`]*`\}\s*>\s*CSS\s*<\/button>/g;
  if (cssTabButtonRegex.test(content)) {
    content = content.replace(cssTabButtonRegex, "");
    modified = true;
    console.log(`  - Removed CSS tab button`);
  }

  // 3. Remove activeTab === "css" condition from JSX tab button
  const jsxTabButtonRegex =
    /(<button\s+onClick=\{\(\) => setActiveTab\("jsx"\)\}\s+className=\{`[^`]*)(activeTab === "jsx"[^`]*)(`\}>)/g;
  if (jsxTabButtonRegex.test(content)) {
    content = content.replace(jsxTabButtonRegex, "$1true$3");
    modified = true;
    console.log(`  - Updated JSX tab button`);
  }

  // 4. Remove activeTab prop from DynamicCodeExample
  const dynamicCodeExampleRegex =
    /<DynamicCodeExample[^>]*activeTab=\{activeTab\}[^>]*\/>/g;
  if (dynamicCodeExampleRegex.test(content)) {
    content = content.replace(dynamicCodeExampleRegex, (match) => {
      return match.replace(/\s+activeTab=\{activeTab\}/, "");
    });
    modified = true;
    console.log(`  - Removed activeTab prop from DynamicCodeExample`);
  }

  // 5. Clean up any empty flex containers
  const emptyFlexContainerRegex = /<div[^>]*flex[^>]*>\s*<\/div>/g;
  if (emptyFlexContainerRegex.test(content)) {
    content = content.replace(emptyFlexContainerRegex, "");
    modified = true;
    console.log(`  - Removed empty flex container`);
  }

  // 6. Clean up any remaining setActiveTab calls
  const setActiveTabRegex = /setActiveTab\("jsx"\)/g;
  if (setActiveTabRegex.test(content)) {
    content = content.replace(setActiveTabRegex, "");
    modified = true;
    console.log(`  - Removed setActiveTab calls`);
  }

  // 7. Remove border-b class from tab container if it's the only child
  const tabContainerRegex =
    /<div[^>]*flex[^>]*border-b[^>]*>\s*<button[^>]*>JSX<\/button>\s*<\/div>/g;
  if (tabContainerRegex.test(content)) {
    content = content.replace(tabContainerRegex, "");
    modified = true;
    console.log(`  - Removed tab container`);
  }

  // 8. Clean up extra whitespace and newlines
  content = content.replace(/\n\s*\n\s*\n/g, "\n\n");
  content = content.replace(/\s+$/gm, "");

  if (modified) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`  ✓ Updated ${filePath}`);
  } else {
    console.log(`  - No changes needed`);
  }

  return modified;
}

// Function to update CodeGenerator component
function updateCodeGenerator() {
  const codeGeneratorPath = "components/shared/CodeGenerator.tsx";
  console.log(`\nUpdating: ${codeGeneratorPath}`);

  let content = fs.readFileSync(codeGeneratorPath, "utf8");
  let modified = false;

  // 1. Remove activeTab parameter from useDynamicCode
  const useDynamicCodeRegex =
    /export const useDynamicCode = \(\s*componentName: string,\s*activeTab: "jsx" \| "css",\s*\)/g;
  if (useDynamicCodeRegex.test(content)) {
    content = content.replace(
      useDynamicCodeRegex,
      "export const useDynamicCode = (\n  componentName: string,\n)",
    );
    modified = true;
    console.log(`  - Removed activeTab parameter from useDynamicCode`);
  }

  // 2. Remove activeTab parameter from DynamicCodeExample
  const dynamicCodeExampleTypeRegex =
    /export const DynamicCodeExample = \(\{\s*componentName,\s*activeTab,\s*\}: \{\s*componentName: string;\s*activeTab: "jsx" \| "css";\s*\}\)/g;
  if (dynamicCodeExampleTypeRegex.test(content)) {
    content = content.replace(
      dynamicCodeExampleTypeRegex,
      "export const DynamicCodeExample = ({\n  componentName,\n}: {\n  componentName: string;\n})",
    );
    modified = true;
    console.log(`  - Removed activeTab parameter from DynamicCodeExample`);
  }

  // 3. Update useDynamicCode call
  const useDynamicCodeCallRegex =
    /const \{ currentCode, loading \} = useDynamicCode\(componentName, activeTab\);/g;
  if (useDynamicCodeCallRegex.test(content)) {
    content = content.replace(
      useDynamicCodeCallRegex,
      "const { currentCode, loading } = useDynamicCode(componentName);",
    );
    modified = true;
    console.log(`  - Updated useDynamicCode call`);
  }

  // 4. Remove activeTab logic from currentCode
  const currentCodeRegex =
    /const currentCode = useMemo\(\(\) => \{\s*if \(loading\) \{\s*return "\/\/ Loading source code\.\.\.";\s*\}\s*return activeTab === "jsx" \? sourceCode : cssCode;\s*\}, \[activeTab, sourceCode, cssCode, loading\]\);/g;
  if (currentCodeRegex.test(content)) {
    content = content.replace(
      currentCodeRegex,
      `const currentCode = useMemo(() => {
    if (loading) {
      return "// Loading source code...";
    }
    return sourceCode;
  }, [sourceCode, loading]);`,
    );
    modified = true;
    console.log(`  - Updated currentCode logic`);
  }

  // 5. Remove cssCode related code
  const cssCodeRegex =
    /const \[cssCode, setCssCode\] = useState<string>\(""\);/g;
  if (cssCodeRegex.test(content)) {
    content = content.replace(cssCodeRegex, "");
    modified = true;
    console.log(`  - Removed cssCode state`);
  }

  // 6. Remove cssCode from setCssCode call
  const setCssCodeRegex = /setCssCode\(cssSource\);/g;
  if (setCssCodeRegex.test(content)) {
    content = content.replace(setCssCodeRegex, "");
    modified = true;
    console.log(`  - Removed setCssCode call`);
  }

  // 7. Remove cssSource extraction
  const cssSourceRegex =
    /const cssSource = await extractComponentSource\(`\$\{componentName\}\.css`\);/g;
  if (cssSourceRegex.test(content)) {
    content = content.replace(cssSourceRegex, "");
    modified = true;
    console.log(`  - Removed cssSource extraction`);
  }

  // 8. Clean up extra whitespace and newlines
  content = content.replace(/\n\s*\n\s*\n/g, "\n\n");
  content = content.replace(/\s+$/gm, "");

  if (modified) {
    fs.writeFileSync(codeGeneratorPath, content, "utf8");
    console.log(`  ✓ Updated ${codeGeneratorPath}`);
  } else {
    console.log(`  - No changes needed`);
  }

  return modified;
}

// Main execution
async function main() {
  console.log("🚀 Starting CSS tab removal script...\n");

  // Find all pattern files
  const patternFiles = glob.sync("app/patterns/*/page.tsx");

  if (patternFiles.length === 0) {
    console.log("❌ No pattern files found!");
    return;
  }

  console.log(`Found ${patternFiles.length} pattern files to process:\n`);

  let totalModified = 0;

  // Process each pattern file
  for (const file of patternFiles) {
    const modified = removeCssTabFromFile(file);
    if (modified) {
      totalModified++;
    }
  }

  // Update CodeGenerator component
  const codeGeneratorModified = updateCodeGenerator();

  console.log(`\n📊 Summary:`);
  console.log(`- Processed ${patternFiles.length} pattern files`);
  console.log(`- Modified ${totalModified} pattern files`);
  console.log(
    `- CodeGenerator component: ${codeGeneratorModified ? "Updated" : "No changes"}`,
  );
  console.log(`\n✅ CSS tab removal completed!`);
}

// Run the script
main().catch(console.error);
