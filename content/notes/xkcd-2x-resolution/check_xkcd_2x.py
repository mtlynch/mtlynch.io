#!/usr/bin/env python3
"""
Check if 2x resolution versions of xkcd comics are available.

This script checks a range of xkcd comic IDs to see if high-resolution (2x)
versions of the images are available. It fetches the standard image URL from
the xkcd API and then checks if a 2x version exists by adding "_2x" to the filename.
"""

import argparse
import json
import logging
import sys
import urllib.request
import urllib.error
from urllib.parse import urlparse
import os


def get_comic_info(comic_id):
    """
    Fetch comic information from xkcd API.

    Args:
        comic_id (int): The xkcd comic ID

    Returns:
        dict: Comic information or None if not found
    """
    url = f"https://xkcd.com/{comic_id}/info.0.json"
    try:
        with urllib.request.urlopen(url) as response:
            return json.loads(response.read().decode())
    except urllib.error.HTTPError as e:
        if e.code == 404:
            # Comic doesn't exist (e.g., xkcd #404), skip it
            print(f"Comic #{comic_id} not found (404): {url}", file=sys.stderr)
            return None
        else:
            # Other HTTP errors should be reported and re-raised
            print(f"HTTP error {e.code} for comic #{comic_id}: {url}", file=sys.stderr)
            raise
    except Exception as e:
        # Other errors (network, JSON parsing, etc.)
        print(f"Error fetching comic #{comic_id} from {url}: {e}", file=sys.stderr)
        raise


def construct_2x_url(img_url):
    """
    Construct the 2x resolution URL from the standard image URL.

    Args:
        img_url (str): The standard image URL

    Returns:
        str: The 2x resolution URL
    """
    # Parse the URL to get the path
    parsed = urlparse(img_url)
    path = parsed.path

    # Split the filename and extension
    filename, ext = os.path.splitext(path)

    # Add _2x before the extension
    new_path = f"{filename}_2x{ext}"

    # Reconstruct the URL
    return f"{parsed.scheme}://{parsed.netloc}{new_path}"


def check_2x_exists(url):
    """
    Check if a 2x resolution image exists by making a HEAD request.

    Args:
        url (str): The URL to check

    Returns:
        bool: True if the image exists, False otherwise
    """
    try:
        req = urllib.request.Request(url, method='HEAD')
        with urllib.request.urlopen(req) as response:
            return response.status == 200
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return False
        raise
    except Exception:
        raise


def main():
    # Configure logging to output to stderr
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s',
        stream=sys.stderr
    )
    logger = logging.getLogger(__name__)

    parser = argparse.ArgumentParser(
        description="Check if 2x resolution versions of xkcd comics are available"
    )
    parser.add_argument(
        "--start",
        type=int,
        required=True,
        help="Starting comic ID (inclusive)"
    )
    parser.add_argument(
        "--end",
        type=int,
        required=True,
        help="Ending comic ID (inclusive)"
    )

    args = parser.parse_args()

    if args.start > args.end:
        print("Error: start ID must be less than or equal to end ID", file=sys.stderr)
        sys.exit(1)

    if args.start < 1:
        print("Error: comic IDs must be positive integers", file=sys.stderr)
        sys.exit(1)

    total_comics = args.end - args.start + 1
    logger.info(f"Starting check for {total_comics} comics (#{args.start} to #{args.end})")

    processed_count = 0
    found_2x_count = 0

    for comic_id in range(args.start, args.end + 1):
        processed_count += 1

        # Get comic info
        comic_info = get_comic_info(comic_id)

        # Skip if comic doesn't exist
        if comic_info is None:
            logger.info(f"Comic #{comic_id} ({processed_count}/{total_comics}): does not exist, skipping")
            continue

        # Get the standard image URL
        img_url = comic_info.get('img')
        if not img_url:
            logger.info(f"Comic #{comic_id} ({processed_count}/{total_comics}): no image URL, skipping")
            continue

        # Construct 2x URL
        img_2x_url = construct_2x_url(img_url)

        # Check if 2x version exists
        if check_2x_exists(img_2x_url):
            found_2x_count += 1
            logger.info(f"Comic #{comic_id} ({processed_count}/{total_comics}): ✓ 2x version available")
            print(f"#{comic_id}: {img_2x_url}")
        else:
            logger.info(f"Comic #{comic_id} ({processed_count}/{total_comics}): ✗ no 2x version")
            print(f"#{comic_id}: No higher res available")

    logger.info(f"Completed check: found {found_2x_count} comics with 2x versions out of {processed_count} processed")


if __name__ == "__main__":
    main()
