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

## Linux Bridge Infrastructure

This section creates the VLAN-aware bridge infrastructure on the Linux host. This must be done before creating the FreeBSD VM so the VM can be attached to the bridge at creation time.

On the Linux host machine:

{{<inline-file filename="setup-host-networking" language="bash">}}

### Verify Configuration

```bash
# Show VLAN assignments
sudo bridge vlan show

# Expected output:
# pftest-br0        1 PVID Egress Untagged
# pftest-vlan10     10 PVID Egress Untagged
# pftest-vlan20     20 PVID Egress Untagged
```

---

## FreeBSD VM with SSH Access

This section creates a FreeBSD VM with both a management interface (for SSH access) and a VLAN trunk interface (for routing between VLANs).

### Download FreeBSD VM Image

```bash
# Set up environment variables
VM_DIR="${HOME}/vms"
VM_NAME='pftest-freebsd-router'
VM_IMAGE="${VM_DIR}/${VM_NAME}.raw"
BRIDGE='pftest-br0'

# Create directory for VM images
mkdir --parents "${VM_DIR}"

# Download and extract FreeBSD image
curl --location 'https://download.freebsd.org/releases/VM-IMAGES/14.3-RELEASE/amd64/Latest/FreeBSD-14.3-RELEASE-amd64-ufs.raw.xz' | \
  unxz > "${VM_IMAGE}"
```

### Create VM with Both Network Interfaces

```bash
# Set libvirt to use system connection
LIBVIRT_DEFAULT_URI='qemu:///system'

# Create VM with management network and VLAN bridge
virt-install \
  --name "${VM_NAME}" \
  --memory 1024 \
  --vcpus 2 \
  --disk path="${VM_IMAGE}" \
  --import \
  --os-variant freebsd14.2 \
  --network network=default,model=virtio \
  --network bridge="${BRIDGE}",model=virtio \
  --noautoconsole
```

**Note:** This creates the VM with two interfaces:
- `vtnet0`: Management interface on the default libvirt NAT network (192.168.122.0/24)
- `vtnet1`: VLAN trunk interface on the `pftest-br0` bridge

### Configure VLAN Trunk Port on Linux Host

After the VM starts, configure the VM's bridge interface as a VLAN trunk:

```bash
# Find the VM's VLAN network interface (the one on the bridge)
VNET_IF=$(virsh domiflist "${VM_NAME}" | grep "${BRIDGE}" | awk '{print $1}')

# Configure as trunk port (tagged VLANs 10 and 20)
sudo bridge vlan del vid 1 dev "${VNET_IF}" &&
  sudo bridge vlan add vid 10 dev "${VNET_IF}" &&
  sudo bridge vlan add vid 20 dev "${VNET_IF}"

# Verify trunk configuration
sudo bridge vlan show | grep --after-context=2 "${VNET_IF}"
```

Expected output:
```
vnetX         10
              20
```

### Connect to Console and Enable SSH

```bash
# Connect to graphical console
virt-viewer "${VM_NAME}"
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
virsh domifaddr "${VM_NAME}"

# SSH to the VM
ssh root@192.168.122.x
```


```bash
pkg install --yes doas vim
```

---

## Configure VLAN Interfaces in FreeBSD

SSH into the FreeBSD VM and configure the VLAN interfaces:

```bash
ssh root@192.168.122.x
```

**Configure VLAN interfaces using `sysrc`:**

```bash
# Configure rc.conf using sysrc (no editor needed)
sysrc kld_list+="if_vlan"
sysrc ifconfig_vtnet0="DHCP"
sysrc ifconfig_vtnet1="up"
sysrc cloned_interfaces="vlan10 vlan20"
sysrc ifconfig_vlan10="inet 192.168.10.1/24 vlan 10 vlandev vtnet1"
sysrc ifconfig_vlan20="inet 192.168.20.1/24 vlan 20 vlandev vtnet1"
sysrc gateway_enable="YES"

# Apply the configuration (without disrupting management interface)
ifconfig vtnet1 up
service netif cloneup
sysctl net.inet.ip.forwarding=1
```

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

# Phase 3: Firecracker VMs and Connectivity Testing

## Overview

This phase covers:
- Installing Firecracker
- Downloading kernel and rootfs from Firecracker CI
- Launching Firecracker VMs on each VLAN
- Testing connectivity through the FreeBSD router
- Configuring and testing PF firewall rules


### Create Firecracker working directory

```bash
FIRECRACKER_DIR="${HOME}/pftest/firecracker"

mkdir --parents "${FIRECRACKER_DIR}" &&
  cd "${FIRECRACKER_DIR}"
```

## Download Kernel and Rootfs

### Download Latest Kernel from Firecracker CI

```bash
ARCH="$(uname --machine)"
RELEASE_URL='https://github.com/firecracker-microvm/firecracker/releases'
S3_BUCKET_URL='https://s3.amazonaws.com/spec.ccfc.min'

LATEST_VERSION=$(basename "$(curl --fail --silent --show-error --location --head --output /dev/null --write-out '%{url_effective}' "${RELEASE_URL}/latest")")
CI_VERSION="${LATEST_VERSION%.*}"

# Find latest kernel
LATEST_KERNEL_KEY=$(curl --silent "${S3_BUCKET_URL}?prefix=firecracker-ci/${CI_VERSION}/${ARCH}/vmlinux-&list-type=2" \
    | grep --only-matching --perl-regexp "(?<=<Key>)(firecracker-ci/${CI_VERSION}/${ARCH}/vmlinux-[0-9]+\.[0-9]+\.[0-9]{1,3})(?=</Key>)" \
    | sort --version-sort | tail --lines=1)

# Download kernel
wget "${S3_BUCKET_URL}/${LATEST_KERNEL_KEY}"

# Rename for convenience
KERNEL_FILE=$(ls vmlinux-* | tail --lines=1)
echo "Downloaded kernel: ${KERNEL_FILE}"
```

### Download and Prepare Ubuntu Rootfs

```bash
# Install squashfs-tools (if not already installed)
# On Debian/Ubuntu: sudo apt install squashfs-tools
# On NixOS: nix-shell -p squashfs-tools-ng

# Find latest Ubuntu rootfs
LATEST_UBUNTU_KEY=$(curl --silent "${S3_BUCKET_URL}?prefix=firecracker-ci/${CI_VERSION}/${ARCH}/ubuntu-&list-type=2" \
    | grep --only-matching --perl-regexp "(?<=<Key>)(firecracker-ci/${CI_VERSION}/${ARCH}/ubuntu-[0-9]+\.[0-9]+\.squashfs)(?=</Key>)" \
    | sort --version-sort | tail --lines=1)
UBUNTU_VERSION=$(basename "${LATEST_UBUNTU_KEY}" .squashfs | grep --only-matching --extended-regexp '[0-9]+\.[0-9]+')

# Download rootfs
wget --output-document="ubuntu-${UBUNTU_VERSION}.squashfs.upstream" "${S3_BUCKET_URL}/${LATEST_UBUNTU_KEY}"

# Extract squashfs
unsquashfs "ubuntu-${UBUNTU_VERSION}.squashfs.upstream"

# Generate SSH key for VM access
ssh-keygen -f id_rsa -N '' &&
  cp --verbose id_rsa.pub squashfs-root/root/.ssh/authorized_keys &&
  mv --verbose id_rsa "./ubuntu-${UBUNTU_VERSION}.id_rsa"
```

### Create Rootfs Images for Each VLAN

```bash
# Create VLAN 10 rootfs
sudo chown --recursive root:root squashfs-root &&
  truncate --size=1G rootfs-vlan10.ext4 &&
  sudo mkfs.ext4 -d squashfs-root -F rootfs-vlan10.ext4

# Create VLAN 20 rootfs (copy)
cp rootfs-vlan10.ext4 rootfs-vlan20.ext4

# Verify
e2fsck -f -n rootfs-vlan10.ext4 &&
  e2fsck -f -n rootfs-vlan20.ext4

# Store SSH key name
KEY_NAME="ubuntu-${UBUNTU_VERSION}.id_rsa"
echo "SSH Key: ${KEY_NAME}"
```

### Configure Static IPs in Rootfs Images

The Firecracker CI rootfs uses `fcnet-setup.sh` which derives IP from MAC address. For our VLAN setup, we'll configure static IPs via SSH after boot, or pre-configure them:

**Option A: Pre-configure VLAN 10 rootfs**

```bash
ROOTFS_MOUNT='/mnt/rootfs'

# Mount and configure VLAN 10 rootfs
sudo mkdir --parents "${ROOTFS_MOUNT}" &&
  sudo mount rootfs-vlan10.ext4 "${ROOTFS_MOUNT}"

# Create network configuration script
sudo tee "${ROOTFS_MOUNT}/etc/network/interfaces.d/eth0" << 'EOF'
auto eth0
iface eth0 inet static
    address 192.168.10.10
    netmask 255.255.255.0
    gateway 192.168.10.1
EOF

# Set hostname
echo 'vlan10-client' | sudo tee "${ROOTFS_MOUNT}/etc/hostname"

sudo umount "${ROOTFS_MOUNT}"
```

**Pre-configure VLAN 20 rootfs**

```bash
sudo mount rootfs-vlan20.ext4 "${ROOTFS_MOUNT}"

sudo tee "${ROOTFS_MOUNT}/etc/network/interfaces.d/eth0" << 'EOF'
auto eth0
iface eth0 inet static
    address 192.168.20.10
    netmask 255.255.255.0
    gateway 192.168.20.1
EOF

echo 'vlan20-client' | sudo tee "${ROOTFS_MOUNT}/etc/hostname"

sudo umount "${ROOTFS_MOUNT}"
```

**Option B: Configure via SSH after boot (see later section)**

---

## Create VM Configuration Files

### VLAN 10 VM Configuration

```bash
KERNEL_FILE=$(ls vmlinux-* | tail --lines=1)

cat > vm-vlan10-config.json << EOF
{
  "boot-source": {
    "kernel_image_path": "./${KERNEL_FILE}",
    "boot_args": "console=ttyS0 reboot=k panic=1"
  },
  "drives": [
    {
      "drive_id": "rootfs",
      "path_on_host": "./rootfs-vlan10.ext4",
      "is_root_device": true,
      "is_read_only": false
    }
  ],
  "network-interfaces": [
    {
      "iface_id": "eth0",
      "guest_mac": "06:00:AC:10:0A:01",
      "host_dev_name": "pftest-vlan10"
    }
  ],
  "machine-config": {
    "vcpu_count": 1,
    "mem_size_mib": 256
  }
}
EOF
```

### VLAN 20 VM Configuration

```bash
cat > vm-vlan20-config.json << EOF
{
  "boot-source": {
    "kernel_image_path": "./${KERNEL_FILE}",
    "boot_args": "console=ttyS0 reboot=k panic=1"
  },
  "drives": [
    {
      "drive_id": "rootfs",
      "path_on_host": "./rootfs-vlan20.ext4",
      "is_root_device": true,
      "is_read_only": false
    }
  ],
  "network-interfaces": [
    {
      "iface_id": "eth0",
      "guest_mac": "06:00:AC:14:0A:01",
      "host_dev_name": "pftest-vlan20"
    }
  ],
  "machine-config": {
    "vcpu_count": 1,
    "mem_size_mib": 256
  }
}
EOF
```

---

## Launch Firecracker VMs

### Launch VLAN 10 VM (Terminal 1)

```bash
cd "${FIRECRACKER_DIR}"

VLAN10_SOCKET='/tmp/firecracker-vlan10.socket'

# Remove stale socket
sudo rm --force "${VLAN10_SOCKET}"

# Launch Firecracker with PCI transport (recommended)
sudo ./firecracker \
  --api-sock "${VLAN10_SOCKET}" \
  --config-file vm-vlan10-config.json \
  --enable-pci
```

You should see the VM boot and eventually a login prompt.

**Login credentials:**
- Username: `root`
- Password: `root`

### Launch VLAN 20 VM (Terminal 2)

```bash
cd "${FIRECRACKER_DIR}"

VLAN20_SOCKET='/tmp/firecracker-vlan20.socket'

# Remove stale socket
sudo rm --force "${VLAN20_SOCKET}"

# Launch Firecracker
sudo ./firecracker \
  --api-sock "${VLAN20_SOCKET}" \
  --config-file vm-vlan20-config.json \
  --enable-pci
```

---

## Configure Network in VMs (If Not Pre-configured)

If you didn't pre-configure the rootfs, configure networking after boot:

### In VLAN 10 VM Console

```bash
# Configure network
ip link set eth0 up
ip addr add 192.168.10.10/24 dev eth0
ip route add default via 192.168.10.1

# Verify
ip addr show eth0
ip route
```

### In VLAN 20 VM Console

```bash
# Configure network
ip link set eth0 up
ip addr add 192.168.20.10/24 dev eth0
ip route add default via 192.168.20.1

# Verify
ip addr show eth0
ip route
```

---

## Connectivity Testing

### Test 1: Verify Local Gateway Connectivity

**From VLAN 10 VM:**
```bash
# Ping FreeBSD router (VLAN 10 gateway)
ping --count=3 192.168.10.1
```

**From VLAN 20 VM:**
```bash
# Ping FreeBSD router (VLAN 20 gateway)
ping --count=3 192.168.20.1
```

### Test 2: Cross-VLAN Connectivity (Before PF Rules)

**From VLAN 10 VM:**
```bash
# Ping VLAN 20 client
ping --count=3 192.168.20.10
```

**From VLAN 20 VM:**
```bash
# Ping VLAN 10 client
ping --count=3 192.168.10.10
```

### Test 3: Verify Routing on FreeBSD

**From FreeBSD router (virsh console):**
```bash
# Check routing table
netstat -rn

# Verify both interfaces are up
ifconfig vlan10
ifconfig vlan20

# Test connectivity to both clients
ping -c 3 192.168.10.10
ping -c 3 192.168.20.10
```

Note: FreeBSD's `ping` uses `-c` for count (no long flag available).

---

## Configure PF Firewall on FreeBSD

### Enable PF

```bash
# On FreeBSD router
ee /etc/rc.conf
```

Add:
```
pf_enable="YES"
pf_rules="/etc/pf.conf"
pflog_enable="YES"
```

### Create Basic PF Rules

```bash
ee /etc/pf.conf
```

**Example PF Configuration:**

```pf
# Macros
ext_if = "vtnet0"
vlan10_if = "vlan10"
vlan20_if = "vlan20"

vlan10_net = "192.168.10.0/24"
vlan20_net = "192.168.20.0/24"

# Options
set skip on lo0
set block-policy drop

# Scrub
scrub in all

# Default deny
block all

# Allow traffic on VLAN interfaces
pass on $vlan10_if inet proto icmp all
pass on $vlan20_if inet proto icmp all

# Allow VLAN 10 to reach VLAN 20
pass in on $vlan10_if from $vlan10_net to $vlan20_net

# Allow VLAN 20 to reach VLAN 10
pass in on $vlan20_if from $vlan20_net to $vlan10_net

# Allow established connections
pass out on $vlan10_if from $vlan10_net
pass out on $vlan20_if from $vlan20_net
```

### Load PF Rules

```bash
# Check syntax
pfctl -n -f /etc/pf.conf

# Load rules
pfctl -f /etc/pf.conf

# Enable PF
pfctl -e

# Verify rules loaded
pfctl -sr
```

---

## Test PF Rules

### Test 4: Verify ICMP Works

**From VLAN 10 VM:**
```bash
ping --count=3 192.168.20.10
```

### Test 5: Block Cross-VLAN Traffic

**Modify PF rules to block VLAN 10 → VLAN 20:**

```bash
ee /etc/pf.conf
```

Change:
```pf
# Block VLAN 10 from reaching VLAN 20
block in on $vlan10_if from $vlan10_net to $vlan20_net

# Allow VLAN 20 to reach VLAN 10
pass in on $vlan20_if from $vlan20_net to $vlan10_net
```

Reload:
```bash
pfctl -f /etc/pf.conf
```

**Test from VLAN 10 VM:**
```bash
# This should now fail
ping --count=3 192.168.20.10
```

**Test from VLAN 20 VM:**
```bash
# This should still work
ping --count=3 192.168.10.10
```

### Test 6: Monitor PF Activity

**On FreeBSD router:**
```bash
# Watch PF logs in real-time
tcpdump -n -e -ttt -i pflog0

# View PF statistics
pfctl -si

# View state table
pfctl -ss

# View rules with counters
pfctl -vsr
```

Note: FreeBSD's `tcpdump` and `pfctl` use short flags (no long flags available).

---

## Advanced PF Testing Examples

### Allow Only Specific Ports

```pf
# Allow SSH from VLAN 10 to VLAN 20
pass in on $vlan10_if proto tcp from $vlan10_net to $vlan20_net port 22

# Allow HTTP/HTTPS from VLAN 20 to VLAN 10
pass in on $vlan20_if proto tcp from $vlan20_net to $vlan10_net port { 80, 443 }
```

### Rate Limiting

```pf
# Limit ICMP to 10 packets per second
pass in on $vlan10_if inet proto icmp all icmp-type echoreq max-pkt-rate 10/1
```

### Logging Specific Traffic

```pf
# Log blocked traffic
block log all

# Log specific allowed traffic
pass log in on $vlan10_if from $vlan10_net to $vlan20_net
```

---

## Cleanup

### Stop Firecracker VMs

In each Firecracker terminal, either:
- Type `reboot` in the guest (graceful shutdown)
- Press `Ctrl+C` to kill Firecracker

Or from another terminal:
```bash
sudo pkill --full 'firecracker.*vlan10'
sudo pkill --full 'firecracker.*vlan20'
```

### Stop FreeBSD VM

```bash
virsh shutdown pftest-freebsd-router
# Or force stop:
virsh destroy pftest-freebsd-router
```

### Remove All Resources

```bash
VM_NAME='pftest-freebsd-router'
VM_DIR="${HOME}/vms"
FIRECRACKER_DIR="${HOME}/pftest/firecracker"
BRIDGE='pftest-br0'

# Remove FreeBSD VM
virsh undefine "${VM_NAME}" &&
  rm --force "${VM_DIR}/${VM_NAME}.raw"

# Remove Firecracker files
rm --recursive --force "${FIRECRACKER_DIR}"

# Remove network infrastructure
sudo ip link set pftest-vlan10 nomaster &&
  sudo ip link set pftest-vlan20 nomaster &&
  sudo ip link delete pftest-vlan10 &&
  sudo ip link delete pftest-vlan20 &&
  sudo ip link delete "${BRIDGE}"

# Remove sockets
sudo rm --force /tmp/firecracker-vlan10.socket /tmp/firecracker-vlan20.socket
```

---

## Troubleshooting

### Firecracker Won't Start

```bash
# Check KVM access
[ -r /dev/kvm ] && [ -w /dev/kvm ] && echo 'OK' || echo 'FAIL'

# Grant access if needed
sudo setfacl --modify="u:${USER}:rw" /dev/kvm
```

### No Network Connectivity

```bash
# Verify TAP devices exist and are up
ip link show pftest-vlan10
ip link show pftest-vlan20

# Verify bridge membership
bridge link show

# Verify VLAN configuration
sudo bridge vlan show

# Check for traffic on bridge
sudo tcpdump --interface=pftest-br0 -e -n
```

### FreeBSD Not Forwarding

```bash
# On FreeBSD, verify forwarding is enabled
sysctl net.inet.ip.forwarding
# Should return: net.inet.ip.forwarding: 1

# If not, enable it
sysctl net.inet.ip.forwarding=1
```

### PF Blocking Unexpectedly

```bash
# Temporarily disable PF
pfctl -d

# Test connectivity
ping 192.168.20.10

# Re-enable PF
pfctl -e

# Check which rule is blocking
pfctl -vsr
# Look at packet/byte counters
```

### API Socket Errors

```bash
# Verify socket exists
ls -la /tmp/firecracker-vlan10.socket

# Check socket is accessible
ss -a | grep firecracker

# Test with socat
socat - UNIX-CONNECT:/tmp/firecracker-vlan10.socket
```

---

## Summary

| Component | IP Address | VLAN | Role |
|-----------|------------|------|------|
| FreeBSD vlan10 | 192.168.10.1 | 10 | Gateway |
| FreeBSD vlan20 | 192.168.20.1 | 20 | Gateway |
| Firecracker VM A | 192.168.10.10 | 10 | Client |
| Firecracker VM B | 192.168.20.10 | 20 | Client |

Traffic flow:
```
VLAN 10 Client (192.168.10.10)
    ↓ (untagged on pftest-vlan10)
pftest-br0 (tags as VLAN 10)
    ↓ (tagged VLAN 10)
FreeBSD vlan10 (192.168.10.1)
    ↓ (PF firewall rules applied)
FreeBSD vlan20 (192.168.20.1)
    ↓ (tagged VLAN 20)
pftest-br0 (untags VLAN 20)
    ↓ (untagged on pftest-vlan20)
VLAN 20 Client (192.168.20.10)
```

---

## Useful Commands

### VM Management
```bash
VM_NAME='pftest-freebsd-router'

# List all VMs
virsh list --all

# Start VM
virsh start "${VM_NAME}"

# Stop VM gracefully
virsh shutdown "${VM_NAME}"

# Force stop VM
virsh destroy "${VM_NAME}"

# Connect to console
virsh console "${VM_NAME}"

# Get VM info
virsh dominfo "${VM_NAME}"

# Show VM network interfaces
virsh domiflist "${VM_NAME}"
```

### Network Verification
```bash
BRIDGE='pftest-br0'

# Show bridge configuration
bridge link show

# Show VLAN configuration
sudo bridge vlan show

# Monitor traffic on specific interface
sudo tcpdump --interface="${BRIDGE}" -e -n

# Monitor VLAN-tagged traffic
sudo tcpdump --interface="${BRIDGE}" -e -n vlan
```

### Cleanup Commands

{{<inline-file filename="cleanup-host" language="bash">}}

---

## Next Steps

Future sections will cover:
- Launching Firecracker VMs connected to pftest-vlan10 and pftest-vlan20
- Testing connectivity between VLANs through the FreeBSD router
- Configuring and testing PF firewall rules
