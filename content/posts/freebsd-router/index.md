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
Linux Host
    ├── virbr0 (default libvirt NAT network, 192.168.122.0/24)
    │   └── vtnet0 → FreeBSD VM management interface (192.168.122.10)
    │
    └── pftest-br0 (bridge with VLAN filtering)
        ├── pftest-vlan10 (TAP, access port, VLAN 10) → Firecracker VM A
        ├── pftest-vlan20 (TAP, access port, VLAN 20) → Firecracker VM B
        └── vtnet1 (TAP, trunk port, VLANs 10+20) → FreeBSD VM
                ├── vlan10 interface (192.168.10.1/24)
                └── vlan20 interface (192.168.20.1/24)
```

---

## FreeBSD VM with SSH Access

This section gets you a FreeBSD VM with SSH access as quickly as possible.

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

### Create VM with Management Network

```bash
# Set libvirt to use system connection
LIBVIRT_DEFAULT_URI='qemu:///system'

# Create VM with management network only (for SSH access)
virt-install \
  --name "$VM_NAME" \
  --memory 1024 \
  --vcpus 2 \
  --disk path="$VM_IMAGE" \
  --import \
  --os-variant freebsd14.2 \
  --network network=default,model=virtio \
  --noautoconsole
```

**Note:** This creates the VM with a single interface on the default libvirt NAT network (192.168.122.0/24), which provides immediate network connectivity.

### Connect to Console and Enable SSH

```bash
# Connect to graphical console
virt-viewer "$VM_NAME"
```

**Login credentials:**
- Username: `root`
- Password: (empty, press Enter)

**Configure network and SSH:**

```bash
# Configure management interface with DHCP
dhclient vtnet0

# Verify IP address (should be 192.168.122.x)
ifconfig vtnet0

# Set root password
passwd

# Enable root SSH login
ee /etc/ssh/sshd_config
# Set `PermitRootLogin yes`

# Enable and start SSH
service sshd enable
service sshd start
```

### Connect via SSH

From your Linux host:
```bash
# Find the VM's IP address (look for 192.168.122.x)
virsh domifaddr "$VM_NAME"

# SSH to the VM
ssh root@192.168.122.x
```


```bash
pkg install --yes doas vim
```

## Linux Bridge Infrastructure

On the Linux host machine:

### Create VLAN-Aware Bridge

```bash
# Create bridge with VLAN filtering enabled
sudo ip link add name pftest-br0 type bridge vlan_filtering 1

# Bring bridge up
sudo ip link set pftest-br0 up

# Verify VLAN filtering is enabled
ip --details link show pftest-br0 | \
  grep --color=auto 'vlan_filtering'
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

## Add VLAN Interface to FreeBSD VM

### Add Second Network Interface to VM

The VM needs a second network interface connected to the VLAN bridge. Shut down the VM and add the interface:

```bash
# Shut down the VM
virsh shutdown "$VM_NAME"

# Wait for shutdown
sleep 5

# Add second network interface on the VLAN bridge
virsh attach-interface "$VM_NAME" \
  --type bridge \
  --source pftest-br0 \
  --model virtio \
  --config

# Start the VM
virsh start "$VM_NAME"
```

### Configure VLAN Trunk Port on Linux Host

```bash
# Wait for VM to start
sleep 5

# Find the VM's VLAN network interface (the one on pftest-br0)
VNET_IF=$(virsh domiflist "$VM_NAME" | grep pftest-br0 | awk '{print $1}')

# Configure as trunk port (tagged VLANs 10 and 20)
sudo bridge vlan del vid 1 dev "$VNET_IF"
sudo bridge vlan add vid 10 dev "$VNET_IF"
sudo bridge vlan add vid 20 dev "$VNET_IF"

# Verify trunk configuration
sudo bridge vlan show | grep --after-context=2 "$VNET_IF"
```

Expected output:
```
vnetX         10
              20
```

### Configure VLAN Interfaces in FreeBSD

SSH into the FreeBSD VM and configure the VLAN interfaces:

```bash
ssh root@192.168.122.x
```

**Configure VLAN interfaces:**
```bash
# Load VLAN kernel module
kldload if_vlan

# Bring up the VLAN trunk interface
ifconfig vtnet1 up

# Create VLAN 10 interface on vtnet1 (the trunk port)
ifconfig vlan10 create vlan 10 vlandev vtnet1

# Create VLAN 20 interface on vtnet1
ifconfig vlan20 create vlan 20 vlandev vtnet1

# Assign IP addresses
ifconfig vlan10 inet 192.168.10.1/24
ifconfig vlan20 inet 192.168.20.1/24

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
ifconfig_vtnet0="DHCP"
ifconfig_vtnet1="up"
cloned_interfaces="vlan10 vlan20"
ifconfig_vlan10="inet 192.168.10.1/24 vlan 10 vlandev vtnet1"
ifconfig_vlan20="inet 192.168.20.1/24 vlan 20 vlandev vtnet1"
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

Future sections will cover:
- Launching Firecracker VMs connected to pftest-vlan10 and pftest-vlan20
- Testing connectivity between VLANs through the FreeBSD router
- Configuring and testing PF firewall rules
