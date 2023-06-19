---
title: "Installing NixOS on Raspberry Pi 4"
date: 2023-06-18T08:31:15-04:00
---

## Gotcha 1: The standard NixOS installer doesn't work


## Gotcha 2: The microSD image is an installer, not the final OS

It's an environment for installing NixOS. It's similar to if you boot from an Ubuntu live CD. While you can use it temporarily as an OS, it's meant to be the OS from which you install your real OS.

## Gotcha 3: The latest NixOS microSD doesn't work on Raspberry Pi 4

## Gotcha 4: The Pi's second HDMI port doesn't work

I actually

## Gotcha 5: The latest hardware version doesn't work

## Gotcha 6: Gnome doesn't work out of the box



All of the instructions I've found so far are incomplete or out of date.

* Raspberry Pi 4
* A USB thumbdrive with at least 4 GB of storage
* A microSD card with at least 8 GB of storage

https://github.com/facebook/zstd/releases


## Install Raspberry Pi OS (64-bit)

Use whatever your favorite tool is to flash Raspberry Pi OS onto the microSD. I used the official Raspberry Pi Imager v1.74, and I installed Raspberry Pi OS Lite Bullseye (2023-05-03). The important thing is that you install the 64-bit version rather than the default 32-bit version.

There are lots of tutorials about installing Raspberry Pi OS, so I'll skip the details there, but you just need to install it and get to

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

## Install Nix within Raspberry Pi OS

Before you can install the full NixOS, you're going to install Nix (the tool) to prepare your NixOS installer disk.

Run this command on your Raspberry Pi:

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

## Install

```bash
nix-channel --add https://nixos.org/channels/nixos-version nixpkgs

nix-env -f '<nixpkgs>' -iA nixos-install-tools

# Necessary?
sudo `which nixos-generate-config`
```

Replace `/etc/nixos/configuration.nix`

```bash
nix-env -p /nix/var/nix/profiles/system -f '<nixpkgs/nixos>' -I nixos-config=/etc/nixos/configuration.nix -iA system

sudo chown -R 0:0 /nix
```

```bash
sudo touch /etc/NIXOS
echo etc/nixos | sudo tee /etc/NIXOS_LUSTRATE

sudo mv -v /boot /boot.bak &&
  sudo /nix/var/nix/profiles/system/bin/switch-to-configuration boot
```

## Flashing the Nix installer to the USB drive

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

## Boot to Nix installer

Shut down Raspberry Pi

```bash
sudo shutdown --poweroff now
```

Remove the microSD, but leave the USB drive inserted. Start the Raspberry Pi again to boot to the Nix installer.

Note that the Pi will only produce HDMI output from HDMI XX

## Mount the microSD

TODO: Cut?

```bash
lsblk
```

Wait until you see `mmcblk0`.


I'm not sure how to get around this step. We need to partition the disk the way NixOS expects, and I suspect there's an easier way than downloading the whole installer OS again, but this is the only way I know that works.

```bash
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

```bash
OUTPUT_DEVICE='/dev/mmcblk0'

sudo dd \
  if="${IMG_FILE}" \
  of="${OUTPUT_DEVICE}" \
  bs=4096 \
  conv=fsync \
  status=progress
```

```bash
# cut?
sudo mkdir -p /mnt && \
  sudo mount /dev/mmcblk0p2 /mnt && \
  sudo mkdir -p /mnt/etc/nixos
```

## Write the NixOS configuration file

TODO: Look into `nix-install --system`

{{<inline-file filename="configuration.nix" language="nix">}}

```bash
curl \
  --show-error \
  --fail \
  {{< baseurl >}}notes/nixos-pi4/configuration.nix \
  | sudo tee /etc/nixos/configuration.nix
```

## Mount the microSD

```bash
sudo nixos-install --root / && \
  reboot
```
