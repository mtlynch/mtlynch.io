---
title: "Install NixOS on a Free Oracle Cloud VM"
date: 2025-02-06
---

https://prithu.dev/notes/installing-nixos-on-oracle-cloud-arm-instance/

{{<img src="vm-settings.webp" has-border="true">}}

Upload your SSH public key.

Wait until the VM instance shows as "Running"

{{<img src="vm-running.webp" has-border="true">}}

## Log in over SSH

Copy your VM's public IP address:

```bash
VM_IP='1.2.3.4' # Replace with your VM's IP.
```

```bash
ssh "ubuntu@${VM_IP}"
```

```bash
wget https://boot.netboot.xyz/ipxe/netboot.xyz-arm64.efi && \
  sudo install \
    --owner=root \
    --group=root \
    --mode=664 \
    netboot.xyz-arm64.efi \
    /boot/efi/netboot.efi
```

## Boot into EFI boot manager

Scroll down to the "Resources" section at the bottom of the VM page and click "Console connection"

{{<img src="console-connection.webp" has-border="true">}}

Click "Launch Cloud Shell connection."

From your SSH session:

```bash
sudo reboot
```

In the Cloud Shell keep hitting the Escape key as the system reboots. You should eventually see the EFI boot manager:

{{<img src="boot-manager.webp" has-border="true">}}

Go to Boot Manager > EFI Internal Shell.

{{<img src="internal-shell.webp" has-border="true">}}

Press any key to skip `startup.nsh`.

From the EFI Shell prompt, type:

```bash
fs0:netboot.efi
```

1. Choose Distributions > Linux Network Installs (arm64)
1. Choose `NixOS`
1. Choose `NixOS nixos-24.11`

## Configure SSH access

You should automatically log in as user `nixos` with no password prompt.

```bash
GITHUB_USERNAME='your-github-username'
```

```bash
mkdir -p ~/.ssh && \
  curl "https://github.com/${GITHUB_USERNAME}.keys" > ~/.ssh/authorized_keys
```

Go back to your standard terminal, and SSH in again, this time to the NixOS install environment:

```bash
ssh "nixos@${VM_IP}"
```

## Configure the NixOS install

Elevate to root

```bash
sudo su
```

```bash
mount /dev/disk/by-label/cloudimg-rootfs /mnt && \
  mkdir -p /mnt/boot && \
  mount /dev/disk/by-label/UEFI /mnt/boot && \
  nixos-generate-config --root /mnt
```

{{<inline-file filename="vars.nix" language="javascript">}}

{{<inline-file filename="configuration.nix" language="javascript">}}

```bash
curl \
  --show-error \
  --fail \
  {{<baseurl>}}notes/nixos-oracle-cloud/configuration.nix \
  > /mnt/etc/nixos/configuration.nix && \
  curl \
    --show-error \
    --fail \
    {{<baseurl>}}notes/nixos-oracle-cloud/vars.nix \
    > /mnt/etc/nixos/vars.nix
```

```bash
nano /mnt/etc/nixos/vars.nix
```

TODO: Copy configuration.nix

```bash
nixos-install --no-root-password
```

```bash
shutdown --reboot now
```
