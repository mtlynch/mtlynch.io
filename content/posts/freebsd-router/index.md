---
title: "Freebsd Router"
date: 2025-11-26
---

# PF Firewall Testing Environment Setup Guide

## Overview

This guide sets up a virtual environment on a Linux host to test PF firewall rules using:
- **Linux host**: Provides VLAN-aware bridge infrastructure
- **FreeBSD VM**: Router/firewall running PF with VLAN interfaces
- **Firecracker VMs**: Client machines in separate VLANs

## Architecture

```
Linux Host (pftest-br0 bridge with VLAN filtering)
    ├── pftest-vlan10 (TAP, access port, VLAN 10) → Firecracker VM A
    ├── pftest-vlan20 (TAP, access port, VLAN 20) → Firecracker VM B
    └── vnetX (TAP, trunk port, VLANs 10+20) → FreeBSD VM
            ├── vlan10 interface (192.168.10.1/24)
            └── vlan20 interface (192.168.20.1/24)
```

---

## Phase 1: Linux Bridge Infrastructure

### Create VLAN-Aware Bridge

```bash
# Create bridge with VLAN filtering enabled
sudo ip link add name pftest-br0 type bridge vlan_filtering 1

# Bring bridge up
sudo ip link set pftest-br0 up

# Verify VLAN filtering is enabled
ip --details link show pftest-br0
```

### Create TAP Devices for Firecracker VMs

```bash
# TAP for Firecracker VM A (VLAN 10)
sudo ip tuntap add pftest-vlan10 mode tap
sudo ip link set pftest-vlan10 up

# TAP for Firecracker VM B (VLAN 20)
sudo ip tuntap add pftest-vlan20 mode tap
sudo ip link set pftest-vlan20 up
```

### Attach TAP Devices to Bridge

```bash
# Add TAPs to bridge
sudo ip link set pftest-vlan10 master pftest-br0
sudo ip link set pftest-vlan20 master pftest-br0
```

### Configure VLAN Assignments

```bash
# Configure pftest-vlan10 as access port on VLAN 10
sudo bridge vlan del vid 1 dev pftest-vlan10
sudo bridge vlan add vid 10 dev pftest-vlan10 pvid untagged

# Configure pftest-vlan20 as access port on VLAN 20
sudo bridge vlan del vid 1 dev pftest-vlan20
sudo bridge vlan add vid 20 dev pftest-vlan20 pvid untagged
```

### Verify Configuration

```bash
# Show VLAN assignments
sudo bridge vlan show

# Expected output:
# pftest-vlan10     10 PVID Egress Untagged
# pftest-vlan20     20 PVID Egress Untagged
```

---

## Phase 2: FreeBSD VM Deployment

### Download FreeBSD VM Image

```bash
# Set up environment variables
VM_DIR="$HOME/vms"
VM_NAME='pftest-freebsd-router'
VM_IMAGE="$VM_DIR/$VM_NAME.raw"

# Create directory for VM images
mkdir --parents "$VM_DIR"

# Download and extract FreeBSD image
curl --location https://download.freebsd.org/releases/VM-IMAGES/14.3-RELEASE/amd64/Latest/FreeBSD-14.3-RELEASE-amd64-ufs.raw.xz | \
  unxz > "$VM_IMAGE"
```

### Enable Serial Console on FreeBSD Image

The FreeBSD VM image doesn't have serial console enabled by default. We need to configure it before booting the VM:

```bash
# Attach image to a loop device with partition scanning
LOOP_DEV=$(sudo losetup --partscan --find --show "$VM_IMAGE")

# Mount the UFS root partition (partition 4 on FreeBSD VM images)
sudo mount "${LOOP_DEV}p4" /mnt

# Enable serial console in the bootloader
echo 'console="comconsole"' | sudo tee --append /mnt/boot/loader.conf

# Unmount and release loop device
sudo umount /mnt
sudo losetup --detach "$LOOP_DEV"
```

### Create VM Using virt-install

```bash
# Set libvirt to use system connection
LIBVIRT_DEFAULT_URI='qemu:///system'

# Create and start VM with a single command
virt-install \
  --name "$VM_NAME" \
  --memory 1024 \
  --vcpus 2 \
  --disk path="$VM_IMAGE" \
  --import \
  --os-variant freebsd14.0 \
  --network bridge=pftest-br0,model=virtio \
  --graphics none \
  --console pty,target_type=serial \
  --boot useserial=on \
  --noautoconsole
```

**Note:** The `--noautoconsole` flag prevents automatic console connection. You'll connect manually in the next step.

### Configure FreeBSD VM Network Interface as Trunk Port

```bash
# Wait for VM to start
sleep 5

# Find the VM's network interface
VNET_IF=$(virsh domiflist "$VM_NAME" | grep pftest-br0 | awk '{print $1}')

# Configure as trunk port (tagged VLANs 10 and 20)
sudo bridge vlan del vid 1 dev $VNET_IF
sudo bridge vlan add vid 10 dev $VNET_IF
sudo bridge vlan add vid 20 dev $VNET_IF

# Verify trunk configuration
sudo bridge vlan show | grep --after-context=2 $VNET_IF
```

Expected output:
```
vnetX         10
              20
```

### Connect to FreeBSD Console

```bash
# Connect to serial console
virsh console "$VM_NAME"

# To disconnect: Ctrl+]
```

### Login and Configure FreeBSD

**Login credentials:**
- Username: `root`
- Password: (empty, press Enter)

**Set root password:**
```bash
passwd
```

**Configure VLAN interfaces:**
```bash
# Load VLAN kernel module
kldload if_vlan

# Create VLAN 10 interface
ifconfig vlan10 create vlan 10 vlandev vtnet0

# Create VLAN 20 interface
ifconfig vlan20 create vlan 20 vlandev vtnet0

# Assign IP addresses
ifconfig vlan10 inet 192.168.10.1/24
ifconfig vlan20 inet 192.168.20.1/24

# Bring up parent interface
ifconfig vtnet0 up

# Enable IP forwarding
sysctl net.inet.ip.forwarding=1

# Verify configuration
ifconfig vlan10
ifconfig vlan20
```

**Make configuration persistent:**
```bash
# Edit rc.conf
ee /etc/rc.conf
```

Add these lines:
```
kld_list="if_vlan"
ifconfig_vtnet0="up"
cloned_interfaces="vlan10 vlan20"
ifconfig_vlan10="inet 192.168.10.1/24 vlan 10 vlandev vtnet0"
ifconfig_vlan20="inet 192.168.20.1/24 vlan 20 vlandev vtnet0"
gateway_enable="YES"
sshd_enable="YES"
```

Save and exit (Ctrl+C, then Enter in `ee` editor).

### Verify Complete Setup

**From FreeBSD:**
```bash
# Check interfaces
ifconfig vlan10
ifconfig vlan20

# Check routing table
netstat -rn

# Verify IP forwarding
sysctl net.inet.ip.forwarding
```

**From Linux host:**
```bash
# Verify complete VLAN configuration
sudo bridge vlan show

# Expected output:
# pftest-vlan10     10 PVID Egress Untagged
# pftest-vlan20     20 PVID Egress Untagged
# vnetX             10
#                   20
```

---

## Useful Commands

### VM Management
```bash
# List all VMs
virsh list --all

# Start VM
virsh start pftest-freebsd-router

# Stop VM gracefully
virsh shutdown pftest-freebsd-router

# Force stop VM
virsh destroy pftest-freebsd-router

# Connect to console
virsh console pftest-freebsd-router

# Get VM info
virsh dominfo pftest-freebsd-router

# Show VM network interfaces
virsh domiflist pftest-freebsd-router
```

### Network Verification
```bash
# Show bridge configuration
bridge link show

# Show VLAN configuration
sudo bridge vlan show

# Monitor traffic on specific interface
sudo tcpdump --interface=pftest-br0 -e -n

# Monitor VLAN-tagged traffic
sudo tcpdump --interface=pftest-br0 -e -n vlan
```

### Cleanup Commands
```bash
# Stop and remove VM
virsh destroy pftest-freebsd-router
virsh undefine pftest-freebsd-router

# Remove TAP devices
sudo ip link set pftest-vlan10 nomaster
sudo ip link set pftest-vlan20 nomaster
sudo ip link delete pftest-vlan10
sudo ip link delete pftest-vlan20

# Remove bridge
sudo ip link delete pftest-br0
```

---

## Next Steps

Phase 3 will cover:
- Launching Firecracker VMs connected to pftest-vlan10 and pftest-vlan20
- Testing connectivity between VLANs through the FreeBSD router
- Configuring and testing PF firewall rules
