---
title: "OPNsense Clicks"
date: 2025-11-13
---

```bash
sudo virt-install \
  --name opnsense \
  --memory 2048 \
  --vcpus 2 \
  --disk size=20 \
  --cdrom /home/mike/scratch/OPNsense-25.7-dvd-amd64.iso \
  --network network=default,model=virtio \
  --network network=default,model=virtio \
  --graphics vnc \
  --os-variant freebsd13.0 \
  --boot uefi
```
