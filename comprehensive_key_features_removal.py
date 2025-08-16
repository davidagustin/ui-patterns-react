#!/usr/bin/env python3
import os
import re
import glob

def remove_all_key_features_comprehensive():
    """Remove all Key Features cards from pattern pages with comprehensive pattern matching"""
    
    # Get all pattern page files
    pattern_files = glob.glob("app/patterns/*/page.tsx")
    
    for file_path in pattern_files:
        print(f"Processing: {file_path}")
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Pattern 1: Key Features with space-y-6 wrapper and any gradient
            pattern1 = r'(\s*{/\* Key Features \*/}\s*<div className="space-y-6">\s*<div className="bg-gradient-to-[^"]* from-green-50[^"]* rounded-xl p-6 border border-green-200 dark:border-green-800">\s*<h[23] className="[^"]*">\s*✨ Key Features\s*</h[23]>.*?</div>\s*</div>\s*)'
            
            # Pattern 2: Key Features without space-y-6 wrapper and any gradient
            pattern2 = r'(\s*<div className="bg-gradient-to-[^"]* from-green-50[^"]* rounded-xl p-6 border border-green-200 dark:border-green-800">\s*<h[23] className="[^"]*">\s*✨ Key Features\s*</h[23]>.*?</div>\s*)'
            
            # Pattern 3: Key Features with any gradient and any heading level
            pattern3 = r'(\s*<div className="bg-gradient-to-[^"]* from-green-50[^"]* rounded-xl p-6 border border-green-200 dark:border-green-800">\s*<h[23] className="[^"]*">\s*✨ Key Features\s*</h[23]>.*?</div>\s*)'
            
            # Apply all patterns
            content = re.sub(pattern1, '', content, flags=re.DOTALL)
            content = re.sub(pattern2, '', content, flags=re.DOTALL)
            content = re.sub(pattern3, '', content, flags=re.DOTALL)
            
            # Also remove any remaining Key Features comments
            content = re.sub(r'\s*{/\* Key Features \*/}', '', content)
            
            # Write the updated content back to the file
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
                
            print(f"✅ Updated: {file_path}")
            
        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")

if __name__ == "__main__":
    remove_all_key_features_comprehensive()
    print("🎉 Comprehensive Key Features removal completed!")
