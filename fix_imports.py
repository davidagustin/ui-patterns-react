#!/usr/bin/env python3
import os
import re
import glob

def fix_imports(file_path):
    """Fix incorrect import paths for CodeGenerator component"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Fix the incorrect import path - from app/patterns/*/ to components/shared/CodeGenerator
    content = re.sub(
        r'from "../../../../components/shared/CodeGenerator"',
        r'from "../../../components/shared/CodeGenerator"',
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
pattern_files = glob.glob('app/patterns/*/page.tsx')

fixed_count = 0
for file_path in pattern_files:
    if fix_imports(file_path):
        fixed_count += 1

print(f"\nFixed {fixed_count} files with incorrect import paths.")
