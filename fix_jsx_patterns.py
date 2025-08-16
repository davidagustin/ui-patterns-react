#!/usr/bin/env python3
import os
import re
import glob

def fix_jsx_file(file_path):
    """Remove activeTab prop from DynamicCodeExample components"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Remove activeTab prop from DynamicCodeExample components (multi-line format)
    content = re.sub(
        r'<DynamicCodeExample\s+componentName="([^"]+)"\s+activeTab={activeTab}\s+/>',
        r'<DynamicCodeExample componentName="\1" />',
        content
    )
    
    # Also handle the case where it's on separate lines
    content = re.sub(
        r'<DynamicCodeExample\s*\n\s*componentName="([^"]+)"\s*\n\s*activeTab={activeTab}\s*\n\s*/>',
        r'<DynamicCodeExample componentName="\1" />',
        content
    )
    
    # Write the fixed content back if changed
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed: {file_path}")
        return True
    
    return False

# Get all pattern files
pattern_files = glob.glob("app/patterns/*/page.tsx")

fixed_count = 0
for file_path in pattern_files:
    if os.path.exists(file_path):
        if fix_jsx_file(file_path):
            fixed_count += 1

print(f"Fixed {fixed_count} files!")