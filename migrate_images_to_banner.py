#!/usr/bin/env python3
"""
Migration script to convert Hugo frontmatter from:
  images: ["/path/to/image.jpg", "/path/to/other.jpg"]
to:
  banner_image: image.jpg

This script:
1. Finds all markdown files with 'images:' in frontmatter
2. Extracts the first image from the list
3. Converts full path to just the filename
4. Replaces 'images:' with 'banner_image:'
5. Creates a migration report
"""

import os
import re
import yaml
from pathlib import Path
from typing import List, Dict, Any, Tuple, Optional

def extract_frontmatter(content: str) -> Tuple[Optional[Dict[str, Any]], str, str]:
    """
    Extract YAML frontmatter from markdown content.
    Returns: (frontmatter_dict, frontmatter_text, body_content)
    """
    # Match YAML frontmatter between --- delimiters
    pattern = r'^---\s*\n(.*?)\n---\s*\n(.*)$'
    match = re.match(pattern, content, re.DOTALL)

    if not match:
        return None, "", content

    frontmatter_text = match.group(1)
    body_content = match.group(2)

    try:
        frontmatter_dict = yaml.safe_load(frontmatter_text)
        return frontmatter_dict, frontmatter_text, body_content
    except yaml.YAMLError as e:
        print(f"Error parsing YAML frontmatter: {e}")
        return None, frontmatter_text, body_content

def extract_filename_from_path(image_path: str) -> str:
    """
    Extract filename from a full path.
    Examples:
      "/retrospectives/2025/05/og-cover.webp" -> "og-cover.webp"
      "retrospectives/2019/05/amazon-earnings.jpg" -> "amazon-earnings.jpg"
    """
    return os.path.basename(image_path)

def convert_images_to_banner_image(frontmatter: Dict[str, Any]) -> Tuple[bool, str, List[str]]:
    """
    Convert 'images' list to 'banner_image' single value.
    Returns: (was_modified, banner_image_filename, skipped_images)
    """
    if 'images' not in frontmatter:
        return False, "", []

    images = frontmatter['images']
    if not images:
        return False, "", []

    # Take the first image
    first_image = images[0]
    banner_image_filename = extract_filename_from_path(first_image)

    # Track skipped images (if there were multiple)
    skipped_images = [extract_filename_from_path(img) for img in images[1:]]

    # Remove 'images' and add 'banner_image'
    del frontmatter['images']
    frontmatter['banner_image'] = banner_image_filename

    return True, banner_image_filename, skipped_images

def update_frontmatter_text(original_frontmatter_text: str, frontmatter_dict: Dict[str, Any]) -> str:
    """
    Update the original frontmatter text with new values.
    This preserves formatting and comments better than dumping new YAML.
    """
    lines = original_frontmatter_text.split('\n')
    new_lines = []
    images_section_started = False
    images_section_ended = False
    banner_image_added = False

    i = 0
    while i < len(lines):
        line = lines[i]

        # Check if this line starts the images section
        if re.match(r'^images:\s*$', line.strip()) or re.match(r'^images:\s*\[', line.strip()):
            images_section_started = True

            # If it's a single-line array format: images: [...]
            if '[' in line:
                # Skip this entire line and find the closing bracket
                while i < len(lines) and ']' not in lines[i]:
                    i += 1
                i += 1  # Skip the line with closing bracket
                images_section_ended = True
            else:
                # Multi-line format, skip this line
                i += 1
                continue

        # If we're in the images section (multi-line format)
        elif images_section_started and not images_section_ended:
            # Skip lines that are part of the images array
            if line.strip().startswith('- ') or line.strip() == '':
                i += 1
                continue
            else:
                # We've reached the end of the images section
                images_section_ended = True
                # Add banner_image before the line that ended the images section
                new_lines.append(f"banner_image: {frontmatter_dict['banner_image']}")
                banner_image_added = True
                # Add the current line that marked the end of the section
                new_lines.append(line)

        # Add the current line if we're not skipping it
        elif not (images_section_started and not images_section_ended):
            new_lines.append(line)

        i += 1

    # If we never found an images section but banner_image exists, add it at the end
    if 'banner_image' in frontmatter_dict and not banner_image_added:
        new_lines.append(f"banner_image: {frontmatter_dict['banner_image']}")

    return '\n'.join(new_lines)

def process_markdown_file(file_path: Path) -> Dict[str, Any]:
    """
    Process a single markdown file.
    Returns a report dictionary with migration details.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        frontmatter_dict, frontmatter_text, body_content = extract_frontmatter(content)

        if not frontmatter_dict:
            return {
                'status': 'skipped',
                'reason': 'No frontmatter found',
                'file': str(file_path)
            }

        if 'images' not in frontmatter_dict:
            return {
                'status': 'skipped',
                'reason': 'No images field found',
                'file': str(file_path)
            }

        # Convert images to banner_image
        was_modified, banner_image, skipped_images = convert_images_to_banner_image(frontmatter_dict)

        if not was_modified:
            return {
                'status': 'skipped',
                'reason': 'Images field was empty',
                'file': str(file_path)
            }

        # Update the frontmatter text
        new_frontmatter_text = update_frontmatter_text(frontmatter_text, frontmatter_dict)

        # Reconstruct the file content
        new_content = f"---\n{new_frontmatter_text}\n---\n\n{body_content}"

        # Write the updated content back to the file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        return {
            'status': 'migrated',
            'file': str(file_path),
            'banner_image': banner_image,
            'skipped_images': skipped_images,
            'skipped_count': len(skipped_images)
        }

    except Exception as e:
        return {
            'status': 'error',
            'file': str(file_path),
            'error': str(e)
        }

def find_markdown_files(content_dir: str) -> List[Path]:
    """Find all markdown files in the content directory."""
    content_path = Path(content_dir)
    return list(content_path.rglob('*.md'))

def main():
    content_dir = 'content'

    if not os.path.exists(content_dir):
        print(f"Error: Content directory '{content_dir}' not found.")
        print("Please run this script from the Hugo site root directory.")
        return

    print("🔍 Finding markdown files...")
    markdown_files = find_markdown_files(content_dir)
    print(f"Found {len(markdown_files)} markdown files")

    print("\n📝 Processing files...")
    results = []

    for file_path in markdown_files:
        result = process_markdown_file(file_path)
        results.append(result)

        if result['status'] == 'migrated':
            skipped_note = f" (skipped {result['skipped_count']} additional images)" if result['skipped_count'] > 0 else ""
            print(f"✅ {result['file']} -> {result['banner_image']}{skipped_note}")
        elif result['status'] == 'error':
            print(f"❌ {result['file']}: {result['error']}")

    # Generate summary report
    migrated = [r for r in results if r['status'] == 'migrated']
    skipped = [r for r in results if r['status'] == 'skipped']
    errors = [r for r in results if r['status'] == 'error']

    print(f"\n📊 Migration Summary:")
    print(f"✅ Migrated: {len(migrated)} files")
    print(f"⏭️  Skipped: {len(skipped)} files")
    print(f"❌ Errors: {len(errors)} files")

    # Show files with multiple images that were skipped
    files_with_skipped = [r for r in migrated if r['skipped_count'] > 0]
    if files_with_skipped:
        print(f"\n⚠️  Files with additional images that were skipped:")
        for result in files_with_skipped:
            print(f"   {result['file']}: kept '{result['banner_image']}', skipped {result['skipped_images']}")

    if errors:
        print(f"\n❌ Files with errors:")
        for result in errors:
            print(f"   {result['file']}: {result['error']}")

    print(f"\n🎉 Migration complete! Updated {len(migrated)} files.")
    if len(migrated) > 0:
        print("Next steps:")
        print("1. Run the Hugo templates update")
        print("2. Test the site build with 'hugo'")
        print("3. Check that all banner_image files exist")

if __name__ == "__main__":
    main()
