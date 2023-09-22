---
title: "Running NixOS on Proxmox"
date: 2023-09-21T15:59:30-04:00
tags:
  - nix
---

- https://nixos.wiki/wiki/Proxmox_Linux_Container (not so good)
- https://blog.xirion.net/posts/nixos-proxmox-lxc/ (good, but don't know why they rely on CLI)

## Images

https://github.com/NixOS/nixpkgs/issues/43781#issuecomment-1707132209

## Copy `configuration.nix`

```bash
curl \
  --show-error \
  --fail \
  {{<baseurl>}}/notes/nixos-proxmox/configuration.nix \
  | sudo tee /etc/nixos/configuration.nix
```

```bash
sudo nixos-rebuild boot
```
