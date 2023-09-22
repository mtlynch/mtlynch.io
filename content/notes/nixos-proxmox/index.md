---
title: "Running NixOS on Proxmox"
date: 2023-09-21T15:59:30-04:00
---

- https://nixos.wiki/wiki/Proxmox_Linux_Container (not so good)
- https://blog.xirion.net/posts/nixos-proxmox-lxc/ (good, but don't know why they rely on CLI)

## On first boot

```bash
nix-channel --update
```

## Copy `configuration.nix`

```bash
curl \
  --show-error \
  --fail \
  {{<baseurl>}}/nixos-proxmox/configuration.nix \
  | sudo tee /etc/nixos/configuration.nix
```
