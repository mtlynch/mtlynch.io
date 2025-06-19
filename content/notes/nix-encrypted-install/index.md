---
title: "Nix Encrypted Install"
date: 2025-06-19
---

Create partition
Size: 2 GB
File system: fat32
Mount point: /boot
Flags: boot

8192 MiB
File system: linuxswap
Encrypt
Flags: swap

Remainder
File system: ext4
Encrypt
Mount point: /
