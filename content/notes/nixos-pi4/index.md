---
title: "Installing NixOS on Raspberry Pi 4"
date: 2023-06-18T08:31:15-04:00
---
I recently started experimenting with Nix and NixOS. Nix allows you to define your software environment from code, and NixOS allows you



All of the instructions I've found so far are incomplete or out of date.

## Requirements

* Raspberry Pi 4
* A microSD card with at least 8 GB of storage
* A separate computer to prepare the microSD card.

## Flashing the NixOS microSD

### Flashing from a Windows system

Download this file:

https://hydra.nixos.org/build/134720986/download/1/nixos-sd-image-21.03pre262561.581232454fd-aarch64-linux.img.zst

The file is encrypted with Facebook's ZSTD compression tool, so you'll need to download that

https://github.com/facebook/zstd/releases/latest


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

## Boot your NixOS system

If everything went well, you should see a boot sequence like the following:

## Enable SSH access (optional)

### Add a password

```bash
passwd
```

```bash
ssh nixos@nixos.local
```

### Add an SSH key

Once your Pi 4 is up and running with NixOS, you'll only have local access.

```bash
# Change to your Github username.
GITHUB_USERNAME="mtlynch"

mkdir -p ~/.ssh && \
  curl "https://github.com/${GITHUB_USERNAME}.keys" > ~/.ssh/authorized_keys
```

```bash
ssh nixos@nixos.local
```

## Write the NixOS configuration file

{{<inline-file filename="configuration.nix" language="nix">}}

```bash
curl \
  --show-error \
  --fail \
  {{< baseurl >}}notes/nixos-pi4/configuration.nix \
  | sudo tee /etc/nixos/configuration.nix && \
  sudo nixos-rebuild boot && \
  reboot
```

I'm intentionally choosing the `boot` option so we don't activate the changes until the next boot. Otherwise, NixOS goes into a broken state where you're still logged in as the `nixos` user, but you can't execute any commands because the `nixos` user has been deleted from the system.


## Upgrade to latest NixOS release that's compatible with the Pi 4

The 21.11 image doesn't install cleanly on the Pi 4, but you can install 21.05 and upgrade to 21.11 cleanly. Builds after 21.11 fail to install on the Pi 4.

```bash
TARGET_RELEASE="21.11"

sudo nix-channel \
  --add "https://nixos.org/channels/nixos-${TARGET_RELEASE}" nixos && \
  sudo nix-channel --update && \
  sudo nixos-rebuild --upgrade boot && \
  sudo reboot
```

Updating to 23.05 fails:

```text
Failed to apply '/nix/store/22l342jmwsaazvnz1zd5qq5m3b3ppsbd-rpi4-vc4-fkms-v3d-overlay-dtbo': FDT_ERR_NOTFOUND
building '/nix/store/w052x98nzkbvmxcmb8wdgmfgqrf8vzv4-smb-dummy.conf.drv'...
error: builder for '/nix/store/cgv9mmkhwy6gc4y48pfmxnjam46404kr-device-tree-overlays.drv' failed with exit code 1
error: 1 dependencies of derivation '/nix/store/5hbkqaz7ldjf5565zakjqxx4xrk5dvn9-nixos-system-pinix-23.05.1156.ad157fe26e7.drv' failed to build
```

## Gotchas

### Gotcha 1: The standard NixOS aarch64 image doesn't work

Designed for UEFI systems, and Raspberry Pi doens't support UEFI.

### Gotcha 4: The Pi's second HDMI port doesn't work

I actually

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

* `nixos-sd-image-22.05.4694.380be19fbd2-aarch64-linux.img` same thing
* `nixos-sd-image-21.11.337977.2766f77c32e-aarch64-linux.img`:

```text
[nixos@nixos:~]$ sudo reboot
sudo: you do not exist in the passwd database

[nixos@nixos:~]$ reboot
Failed to set wall message, ignoring: Transport endpoint is not connected
Failed to reboot system via logind: Transport endpoint is not connected
Failed to talk to init daemon.

[nixos@nixos:~]$ shutdown -h now
Failed to set wall message, ignoring: Transport endpoint is not connected
Failed to power off system via logind: Transport endpoint is not connected
Failed to talk to init daemon.
```

But if you power cycle it, the resulting system seems okay.

* `nixos-sd-image-21.05.4737.022caabb5f2-aarch64-linux.img`: Same as 21.11

### Gotcha 5: The latest hardware version doesn't work

### Gotcha 6: Gnome doesn't work out of the box

I couldn't figure out how to enable the Gnome desktop manager.

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
