#!/usr/bin/env bash

set -eu

# Configuration variables
IMAGE_FILE="install78.img"
FILESYSTEM_TYPE="ufs"
UFS_TYPE="44bsd"
MOUNT_OPTIONS="ufstype=${UFS_TYPE},rw"
BOOT_CONF_PATH="etc/boot.conf"

# Track errors
ERRORS=()

# Will be set after creating temp directory
MOUNT_POINT=""
LOOP_DEVICE=""

# Cleanup function - idempotent
cleanup() {
    local exit_code=$?

    echo "Running cleanup..."

    # Unmount if mounted
    if [[ -n "${MOUNT_POINT}" ]] && mountpoint --quiet "${MOUNT_POINT}" 2>/dev/null; then
        sudo umount "${MOUNT_POINT}" || true
    fi

    # Remove temporary mount directory
    if [[ -n "${MOUNT_POINT}" ]] && [[ -d "${MOUNT_POINT}" ]]; then
        rmdir "${MOUNT_POINT}" || true
    fi

    # Detach loop device if it exists
    if [[ -n "${LOOP_DEVICE}" ]] && [[ -e "${LOOP_DEVICE}" ]]; then
        sudo losetup --detach "${LOOP_DEVICE}" || true
    fi

    echo "Cleanup complete"

    # Print errors if any occurred
    if [[ ${exit_code} -ne 0 ]] || [[ ${#ERRORS[@]} -gt 0 ]]; then
        echo ""
        echo "=========================================="
        echo "ERRORS ENCOUNTERED:"
        echo "=========================================="

        if [[ ${#ERRORS[@]} -gt 0 ]]; then
            for error in "${ERRORS[@]}"; do
                echo "  - ${error}"
            done
        fi

        if [[ ${exit_code} -ne 0 ]]; then
            echo "  - Script exited with code: ${exit_code}"
        fi

        echo "=========================================="
        exit 1
    fi
}

# Set trap to run cleanup on exit (success or failure)
trap cleanup EXIT

# Create temporary mount directory
MOUNT_POINT=$(mktemp --directory --tmpdir openbsd-mount.XXXXXXXXXX)
echo "Created temporary mount point: ${MOUNT_POINT}"

# Find next available loop device (default is read-write, no -r flag)
LOOP_DEVICE=$(sudo losetup --find --show --partscan "${IMAGE_FILE}")
echo "Loop device created: ${LOOP_DEVICE}"

# Set loop device to read-write mode explicitly
sudo blockdev --setrw "${LOOP_DEVICE}" || true

# Verify loop device is not read-only (0 = rw, 1 = ro)
if [[ $(sudo blockdev --getro "${LOOP_DEVICE}") -eq 1 ]]; then
    ERRORS+=("Loop device is read-only")
    echo "ERROR: Loop device is read-only"
    exit 1
fi

# Wait for partition devices to appear
sleep 1

# Display partition table for verification
echo "Partition table:"
sudo fdisk --list "${LOOP_DEVICE}"

# Identify the OpenBSD partition (typically partition 4 in GPT layout)
OPENBSD_PARTITION="${LOOP_DEVICE}p4"
echo "Using partition: ${OPENBSD_PARTITION}"

# Set partition to read-write mode
sudo blockdev --setrw "${OPENBSD_PARTITION}" || true

# Mount the OpenBSD FFS partition with read-write access
sudo mount \
    --types "${FILESYSTEM_TYPE}" \
    --options "${MOUNT_OPTIONS}" \
    "${OPENBSD_PARTITION}" \
    "${MOUNT_POINT}"

echo "Partition mounted at ${MOUNT_POINT}"

# Try to remount as read-write if initially read-only
if ! grep -q "${MOUNT_POINT}.*rw" /proc/mounts; then
    echo "Mount is read-only, attempting to remount as read-write..."
    if sudo mount --options remount,rw "${MOUNT_POINT}"; then
        echo "Successfully remounted as read-write"
    else
        echo "Remount failed"
    fi
fi

# Final verification of mount status
if grep -q "${MOUNT_POINT}.*rw" /proc/mounts; then
    echo "Mount is read-write: OK"
else
    ERRORS+=("Mount is read-only - Linux may not support writing to OpenBSD FFS")
    ERRORS+=("Consider: 1) Using a BSD system, 2) Modifying during installation, or 3) Using FAT partition")
    echo "ERROR: Mount is read-only"
    grep "${MOUNT_POINT}" /proc/mounts
    echo ""
    echo "NOTE: Linux's UFS/FFS write support is limited. The filesystem may be"
    echo "      incompatible with Linux's write capabilities for OpenBSD's FFS2."
    exit 1
fi

# Check if etc directory exists
if [[ ! -d "${MOUNT_POINT}/etc" ]]; then
    ERRORS+=("Directory ${MOUNT_POINT}/etc does not exist")
    echo "ERROR: ${MOUNT_POINT}/etc not found"
    echo "Available directories:"
    sudo ls -la "${MOUNT_POINT}/"
    exit 1
fi

# Create boot.conf with desired content
if ! echo "set tty fb0" | sudo tee "${MOUNT_POINT}/${BOOT_CONF_PATH}" > /dev/null; then
    ERRORS+=("Failed to create ${BOOT_CONF_PATH}")
    exit 1
fi

echo "boot.conf created successfully"

# Verify the content
echo "Verifying boot.conf content:"
if ! sudo cat "${MOUNT_POINT}/${BOOT_CONF_PATH}"; then
    ERRORS+=("Failed to read ${BOOT_CONF_PATH}")
    exit 1
fi

# Sync to ensure writes are flushed
sync

echo "Image modification complete. Cleanup will run automatically."
