---
title: "Installing NixOS on Raspberry Pi 4"
date: 2023-06-18T08:31:15-04:00
---

All of the instructions I've found so far are incomplete or out of date.

## Requirements

* Raspberry Pi 4
* A microSD card with at least 8 GB of storage
* A separate computer to prepare the microSD card.

## Flashing the Nix installer microSD

### Flashing from a Windows system

Download this file:

https://hydra.nixos.org/build/134720986/download/1/nixos-sd-image-21.03pre262561.581232454fd-aarch64-linux.img.zst

The file is encrypted with Facebook's ZSTD compression tool, so you'll need to download that


```ps
zstd.exe -d "C:\tmp\nixos-sd-image-21.03pre262561.581232454fd-aarch64-linux.img.zst"
```

Any tool for flashing a microSD. I like Balena Etcher.

## Flashing from a Linux or OS X system

The easiest way to do is to install a Nix environment.

```bash
curl \
  --proto '=https' \
  --tlsv1.2 \
  --show-error \
  --silent \
  --fail \
  --location https://install.determinate.systems/nix | sh -s -- install && \
  . /nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh
```

```bash
$ nix --version
nix (Nix) 2.13.3
```

```bash
# This will take a few minutes.
nix-shell -p curl zstd

# Need an older build due to this bug: https://github.com/NixOS/nixpkgs/issues/179701
URL='https://hydra.nixos.org/build/134720986/download/1/nixos-sd-image-21.03pre262561.581232454fd-aarch64-linux.img.zst'

IMG_FILE="${URL##https:/*/}"
curl \
  --proto '=https' \
  --show-error \
  --fail \
  --location "${URL}" \
  | unzstd --decompress - > "${IMG_FILE}"
```

Insert your USB drive into one of the Pi 4's two blue USB 3.0 ports. The black USB 2.0 ports will work as well, but they're slower.

To find the device path of your USB key, run `lsblk`, and you'll see output like the following:

```bash
$ lsblk -o NAME,SIZE,VENDOR,MODEL,LABEL,UUID
NAME         SIZE VENDOR   MODEL           LABEL  UUID
sda         28.7G  USB     SanDisk_3.2Gen1
└─sda1      28.7G                                 CC29-5059
mmcblk0       29G
├─mmcblk0p1  256M                          bootfs 9E81-4F92
└─mmcblk0p2 28.8G                          rootfs cf2895ca-6dc2-4797-8040-f76ba1508f41
```

In my case, my SanDisk USB drive has the name `sda`, so the device path is `/dev/sda`.

```bash
# Change to the USB drive path you found above.
OUTPUT_DEVICE='/dev/sda'

sudo dd \
  if="${IMG_FILE}" \
  of="${OUTPUT_DEVICE}" \
  bs=4096 \
  conv=fsync \
  status=progress
```

## Enable SSH access (optional)

```bash
# Change to your Github username.
GITHUB_USERNAME="mtlynch"

sudo mkdir -p ~/.ssh && \
  curl "https://github.com/${GITHUB_USERNAME}.keys" > ~/.ssh/authorized_keys
```

## Write the NixOS configuration file

{{<inline-file filename="configuration.nix" language="nix">}}

```bash
curl \
  --show-error \
  --fail \
  {{< baseurl >}}notes/nixos-pi4/configuration.nix \
  | sudo tee /etc/nixos/configuration.nix
```

```bash
sudo nixos-install --root / && \
  reboot
```


## Gotchas

### Gotcha 1: The standard NixOS installer doesn't work


### Gotcha 4: The Pi's second HDMI port doesn't work

I actually

### Gotcha 2: The microSD image is an installer, not the final OS

It's an environment for installing NixOS. It's similar to if you boot from an Ubuntu live CD. While you can use it temporarily as an OS, it's meant to be the OS from which you install your real OS.

### Gotcha 3: The latest NixOS (23.05) microSD doesn't work on Raspberry Pi 4

Tried with `nixos-sd-image-23.05.1123.aaef163eac7-aarch64-linux.img`.

Gets an error:

```text
Applying overlay rpi4-vc4-fkms-v3d-overlay to bcm2711-rpi-cm4-io.dtb...
Failed to apply '/nix/store/22l342jmwsaazvnz1zd5qq5m3b3ppsbd-rpi4-vc4-fkms-v3d-overlay-dtbo': FDT_ERR_NOTFOUND
error: builder for '/nix/store/cgv9mmkhwy6gc4y48pfmxnjam46404kr-device-tree-overlays.drv' failed with exit code 1
error: 1 dependencies of derivation '/nix/store/w77gh3p4wzbildmmr2dh1c254qlm3nv4-nixos-system-pinix-23.05.1123.aaef163eac7.drv' failed to build
```

I can work around it by deleting this line from configuration.nix:

```nix
hardware.raspberry-pi."4".fkms-3d.enable = true;
```

The install then fails later on:

```text
installing the boot loader...
removing user ‘nixos’
setting up /etc...
removing obsolete symlink ‘/etc/hostid’...
removing obsolete symlink ‘/etc/systemd/pstore.conf’...
removing obsolete symlink ‘/etc/zfs/zpool.d’...
...
umount: ???: umount failed: No such file or directory.
```

And the system is then in a broken state:

```text
[nixos@nixos:~]$ sudo reboot
sudo: you do not exist in the passwd database

[nixos@nixos:~]$ reboot
Call to Reboot failed: Access denied
```

If I power cycle the Pi at that point, it successfully boots into the new NixOS install, but there's no XFCE desktop GUI, just a terminal:

{{<video src="nixos-23.05-no-gui.mp4" max-width="800px" caption="The NixOS 22.11 microSD image fails to boot on a Raspberry Pi 4.">}}

When I delete the line, it doesn't install a desktop GUI.

## Gotcha: The previous stable NixOS (22.11) can't boot on a Pi 4

Tried with `nixos-sd-image-22.11.4604.fc95eb4fc3c-aarch64-linux.img`, but it doesn't boot.

{{<video src="nixos-22.11-boot-fail.mp4" max-width="800px" caption="The NixOS 22.11 microSD image fails to boot on a Raspberry Pi 4.">}}

### Gotcha 5: The latest hardware version doesn't work

### Gotcha 6: Gnome doesn't work out of the box



https://github.com/facebook/zstd/releases


## Troubleshooting: Upgrade to the latest bootloader

Install the latest bootloader:

```bash
sudo raspi-config nonint do_boot_rom E1 && \
  sudo reboot
```

Install the latest Raspberry Pi EEPROM:

```bash
sudo apt update && \
  sudo apt install --yes rpi-eeprom && \
  sudo rpi-eeprom-update -a && \
  sudo reboot
```
