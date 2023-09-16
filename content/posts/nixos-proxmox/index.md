---
title: "Nixos Proxmox"
date: 2023-09-16T15:59:30-04:00
---

```bash
curl \
  --show-error \
  --fail \
  {{<baseurl>}}/nixos-pi4/configuration.nix \
  | sudo tee /etc/nixos/configuration.nix
```
