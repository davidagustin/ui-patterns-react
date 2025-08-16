const fs = require("fs");
const path = require("path");

// File path
const filePath = path.join(
  __dirname,
  "app",
  "patterns",
  "copy-box",
  "page.tsx",
);

// Read the file
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // Split the content into lines
  const lines = data.split("\n");

  // Remove line 9 (index 8 since arrays are 0-indexed)
  if (lines.length >= 9) {
    lines.splice(8, 1); // Remove 1 line starting at index 8

    // Join the lines back together
    const newContent = lines.join("\n");

    // Write the modified content back to the file
    fs.writeFile(filePath, newContent, "utf8", (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log("Successfully removed line 9 from copy-box/page.tsx");
      console.log("Removed line was:", lines[8] || "Line not found");
    });
  } else {
    console.error("File has fewer than 9 lines");
  }
});
