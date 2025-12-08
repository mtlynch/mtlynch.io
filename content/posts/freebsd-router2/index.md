---
title: "Create a Practice Router with FreeBSD and Vagrant"
date: 2025-11-26
---

This guide sets up a virtual environment to test PF firewall rules using Vagrant with libvirt. The setup includes a FreeBSD router VM and two Alpine Linux client VMs on separate networks.

## Architecture

```
Vagrant Multi-Machine Setup
├── FreeBSD Router (generic/freebsd14)
│   ├── eth0: NAT (Vagrant management)
│   ├── vtnet1: Private network "pf_vlan10" (192.168.10.2)
│   └── vtnet2: Private network "pf_vlan20" (192.168.20.2)
│
├── Alpine Client A (generic/alpine319)
│   ├── eth0: NAT (Vagrant management)
│   └── eth1: Private network "pf_vlan10" (192.168.10.10)
│
└── Alpine Client B (generic/alpine319)
    ├── eth0: NAT (Vagrant management)
    └── eth1: Private network "pf_vlan20" (192.168.20.10)
```

Traffic between the two client networks must pass through the FreeBSD router, allowing you to test PF firewall rules.

---

## Prerequisites

Install Vagrant and the libvirt plugin:

```bash
# Install vagrant-libvirt plugin
vagrant plugin install vagrant-libvirt
```

Verify libvirt is running:

```bash
sudo systemctl status libvirtd
```

---

## Create the Vagrantfile

Create a project directory and Vagrantfile:

```bash
mkdir --parents ~/pf-lab && cd ~/pf-lab
```

Create the `Vagrantfile`:

{{<inline-file filename="Vagrantfile" language="ruby">}}

---

## Launch the VMs

```bash
cd ~/pf-lab

# Start all VMs
vagrant up
```

This downloads the box images (first run only) and creates three VMs with the configured networks.

### Verify VMs are Running

```bash
vagrant status
```

Expected output:
```
Current machine states:

router                    running (libvirt)
client10                  running (libvirt)
client20                  running (libvirt)
```

---

## Verify Configuration

The Vagrantfile includes provisioners that automatically configure:

- **FreeBSD Router**: Network interfaces (vtnet1, vtnet2), IP forwarding, and PF firewall
- **Alpine Clients**: Static IPs on eth1 and routes to the other network

You can verify the configuration:

```bash
# On the router - check network interfaces
vagrant ssh router
ifconfig vtnet1
ifconfig vtnet2
sysctl net.inet.ip.forwarding

# Check PF is running
sudo pfctl -sr
```

```bash
# On client10
vagrant ssh client10
ip addr show eth1
ip route
```

```bash
# On client20
vagrant ssh client20
ip addr show eth1
ip route
```

---

## PF Configuration

The provisioner installs this PF configuration to `/etc/pf.conf`:

{{<inline-file filename="pf.conf" language="pf">}}

---

## Test Connectivity

### Test 1: Gateway Connectivity

```bash
vagrant ssh client10 --command 'ping -c 3 192.168.10.2'
vagrant ssh client10 --command 'ping -c 3 192.168.20.10'


```bash
vagrant ssh client20 --command 'ping -c 3 192.168.20.2'
```

### Test 2: Cross-Network Connectivity

From client10:
```bash
ping -c 3 192.168.20.10
```

From client20:
```bash
ping -c 3 192.168.10.10
```

### Test 3: Verify Routing on FreeBSD

From the router:

```bash
netstat -rn
```

---

## Test PF Rules

### Test ICMP Works

From client10:
```bash
ping -c 3 192.168.20.10
```

### Test Blocking Traffic

Modify PF rules to block traffic from network 10 to network 20:

```bash
vagrant ssh router --command 'sudo vim /etc/pf.conf'
```

Change the rule:
```pf
# Block network 10 from reaching network 20
block in on $vlan10_if from $vlan10_net to $vlan20_net

# Allow network 20 to reach network 10
pass in on $vlan20_if from $vlan20_net to $vlan10_net
```

Reload:
```bash
vagrant ssh router --command 'sudo pfctl -f /etc/pf.conf'
```

Test from client10 (should fail):

```bash
vagrant ssh client10 --command 'ping -c 3 192.168.20.10'
```

Test from client20 (should succeed):
```bash
vagrant ssh client20 --command 'ping -c 3 192.168.10.10'
```

### Monitor PF Activity

On the FreeBSD router:
```bash
# Watch PF logs in real-time
sudo tcpdump -n -e -ttt -i pflog0

# View PF statistics
sudo pfctl -si

# View state table
sudo pfctl -ss

# View rules with counters
sudo pfctl -vsr
```

---

## Advanced PF Examples

### Allow Only Specific Ports

```pf
# Allow SSH from network 10 to network 20
pass in on $vlan10_if proto tcp from $vlan10_net to $vlan20_net port 22

# Allow HTTP/HTTPS from network 20 to network 10
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

Destroy all VMs and networks:

```bash
cd ~/pf-lab
vagrant destroy --force
```

Remove the project directory:

```bash
rm -rf ~/pf-lab
```

---

## Troubleshooting

### VMs Won't Start

```bash
# Check libvirt status
sudo systemctl status libvirtd

# View Vagrant debug output
VAGRANT_LOG=debug vagrant up
```

### No Network Connectivity

```bash
# On FreeBSD router, verify forwarding is enabled
sysctl net.inet.ip.forwarding
# Should return: net.inet.ip.forwarding: 1

# Verify interfaces are up
ifconfig vtnet1
ifconfig vtnet2
```

### PF Blocking Unexpectedly

```bash
# Temporarily disable PF
sudo pfctl -d

# Test connectivity
ping 192.168.20.10

# Re-enable PF
sudo pfctl -e

# Check which rule is blocking
sudo pfctl -vsr
```

### Check libvirt Networks

```bash
# List networks
sudo virsh net-list --all

# Show network details
sudo virsh net-dumpxml pf_vlan10
```

---

## Summary

| Component | IP Address | Network | Role |
|-----------|------------|---------|------|
| FreeBSD vtnet1 | 192.168.10.2 | pf_vlan10 | Gateway |
| FreeBSD vtnet2 | 192.168.20.2 | pf_vlan20 | Gateway |
| Alpine client10 | 192.168.10.10 | pf_vlan10 | Client |
| Alpine client20 | 192.168.20.10 | pf_vlan20 | Client |

Traffic flow:
```
Client A (192.168.10.10)
    ↓
FreeBSD vtnet1 (192.168.10.2)
    ↓ (PF firewall rules applied)
FreeBSD vtnet2 (192.168.20.2)
    ↓
Client B (192.168.20.10)
```

---

## Useful Commands

### Vagrant Commands

```bash
# Start all VMs
vagrant up

# Start specific VM
vagrant up router

# SSH to VM
vagrant ssh router

# Stop all VMs
vagrant halt

# Destroy all VMs
vagrant destroy --force

# Check VM status
vagrant status

# Reload VM (restart with new Vagrantfile changes)
vagrant reload
```

### FreeBSD Commands

```bash
# View interfaces
ifconfig

# View routing table
netstat -rn

# Check IP forwarding
sysctl net.inet.ip.forwarding

# PF status
sudo pfctl -si

# View PF rules
sudo pfctl -sr

# Reload PF rules
sudo pfctl -f /etc/pf.conf
