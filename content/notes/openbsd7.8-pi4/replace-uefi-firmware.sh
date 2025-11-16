#!/usr/bin/env bash

set -eu

# Configuration variables
IMAGE_FILE="miniroot78.img"
OUTPUT_IMAGE="miniroot78-pi-uefi.img"
UEFI_URL="https://github.com/pftf/RPi4/releases/download/v1.42/RPi4_UEFI_Firmware_v1.42.zip"
UEFI_ZIP="RPi4_UEFI_Firmware_v1.42.zip"
MOUNT_POINT=""
LOOP_DEVICE=""
TEMP_DIR=""

# Track errors
ERRORS=()

# Cleanup function - idempotent
cleanup() {
    local exit_code=$?

    echo "Running cleanup..."

    # Unmount if mounted
    [[ -n "${MOUNT_POINT}" ]] && mountpoint --quiet "${MOUNT_POINT}" 2>/dev/null && sudo umount "${MOUNT_POINT}"

    # Remove temporary directories
    [[ -n "${MOUNT_POINT}" ]] && [[ -d "${MOUNT_POINT}" ]] && rmdir "${MOUNT_POINT}"
    [[ -n "${TEMP_DIR}" ]] && [[ -d "${TEMP_DIR}" ]] && rm -rf "${TEMP_DIR}"

    # Detach loop device
    [[ -n "${LOOP_DEVICE}" ]] && [[ -e "${LOOP_DEVICE}" ]] && sudo losetup --detach "${LOOP_DEVICE}"

    echo "Cleanup complete"

    # Print errors if any
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

trap cleanup EXIT

# Create temporary directories
MOUNT_POINT=$(mktemp --directory --tmpdir openbsd-fat.XXXXXXXXXX)
TEMP_DIR=$(mktemp --directory --tmpdir uefi-download.XXXXXXXXXX)
echo "Created temporary directories"

# Copy original image to new output file
echo "Creating copy of original image..."
cp "${IMAGE_FILE}" "${OUTPUT_IMAGE}"
echo "Created ${OUTPUT_IMAGE}"

# Download UEFI firmware if not present
if [[ ! -f "${UEFI_ZIP}" ]]; then
    echo "Downloading RPi4 UEFI firmware..."
    wget --output-document="${TEMP_DIR}/${UEFI_ZIP}" "${UEFI_URL}"
else
    echo "Using existing ${UEFI_ZIP}"
    cp "${UEFI_ZIP}" "${TEMP_DIR}/"
fi

# Extract UEFI firmware
echo "Extracting UEFI firmware..."
unzip -q "${TEMP_DIR}/${UEFI_ZIP}" -d "${TEMP_DIR}/uefi"

# Set up loop device on the OUTPUT image
LOOP_DEVICE=$(sudo losetup --find --show --partscan "${OUTPUT_IMAGE}")
echo "Loop device created: ${LOOP_DEVICE}"

# Wait for partitions
sleep 1

# Display partition info
echo "Partition table:"
sudo fdisk --list "${LOOP_DEVICE}" | grep "${LOOP_DEVICE}"

# Mount the FAT partition (partition 1)
FAT_PARTITION="${LOOP_DEVICE}p1"
echo "Mounting FAT partition: ${FAT_PARTITION}"

sudo mount "${FAT_PARTITION}" "${MOUNT_POINT}"

# Clear existing contents
echo "Removing original bootloader files..."
sudo rm -rf "${MOUNT_POINT:?}"/*

# Copy UEFI firmware to FAT partition
echo "Installing RPi4 UEFI firmware..."
sudo cp -r "${TEMP_DIR}/uefi"/* "${MOUNT_POINT}/"

# Create boot configuration script for later use
echo "Creating boot configuration script..."
sudo tee "${MOUNT_POINT}/setup_openbsd_boot.sh" > /dev/null << 'EOF'
#!/bin/sh
# Run this during OpenBSD installation after dropping to shell with '!'
echo "set tty fb0" > /mnt/etc/boot.conf
echo "Boot configuration created!"
EOF

# Create a config.txt for better framebuffer support
echo "Creating config.txt for framebuffer..."
sudo tee "${MOUNT_POINT}/config.txt" > /dev/null << 'EOF'
arm_64bit=1
enable_uart=1
enable_gic=1
armstub=RPI_EFI.fd
disable_commandline_tags=2
device_tree_address=0x1f0000
device_tree_end=0x200000

# Framebuffer settings
hdmi_group=2
hdmi_mode=82
disable_overscan=1
EOF

# Show what's on the FAT partition now
echo ""
echo "FAT partition contents:"
sudo ls -la "${MOUNT_POINT}/"

# Sync and unmount
sync
sudo umount "${MOUNT_POINT}"

echo ""
echo "=========================================="
echo "SUCCESS: UEFI firmware installed"
echo "=========================================="
echo ""
echo "Output file: ${OUTPUT_IMAGE}"
echo ""
echo "Next steps:"
echo "1. Write image to SD card:"
echo "   sudo dd if=${OUTPUT_IMAGE} of=/dev/sdX bs=1M status=progress"
echo ""
echo "2. Boot the RPi4 - you'll see UEFI firmware screen"
echo ""
echo "3. During OpenBSD installation, when prompted for 'Location of sets?':"
echo "   - Press '!' to drop to shell"
echo "   - Run: mount /dev/sd0i /mnt2 && sh /mnt2/setup_openbsd_boot.sh"
echo "   - Type 'exit' to continue"
echo ""
echo "Note: UEFI firmware provides better framebuffer support which may"
echo "      resolve your console issues even without boot.conf changes."
