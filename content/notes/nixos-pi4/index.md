---
title: "Installing NixOS on Raspberry Pi 4"
date: 2023-06-18T08:31:15-04:00
---

I recently started experimenting with Nix and NixOS. Nix is a tool that allows you to define your software environment from code, and NixOS allows you to define your entire operating system configuration in code.

The Raspberry Pi is a good system for experimenting with new technology, so I decided to install NixOS on my Raspberry Pi 4. Most of the tutorials for installing NixOS on a Raspberry Pi 4 are incomplete or out of date, so I decided to write one that works as of 2023.

I'm a newcomer to NixOS, so this guide is geared toward beginners.

## Requirements

To follow this tutorial, you'll need:

* Raspberry Pi 4
* A microSD card with at least 8 GB of storage
* A separate computer to prepare the microSD card.

## Download the NixOS microSD image

First, you'll need to flash the NixOS disk image onto a microSD card.

To begin, download the latest working NixOS disk image. As of this writing, the latest NixOS image that works on the Raspberry Pi 4 is almost two years old, unfortunately:

Download the disk image from the link below:

* [nixos-sd-image-21.11.337977.2766f77c32e-aarch64-linux](https://hydra.nixos.org/build/213143754/download/1/nixos-sd-image-21.11.337977.2766f77c32e-aarch64-linux.img.zst)

## Decompress the NixOS microSD image

NixOS microSD images are compressed with an uncommon compression format called ZSTD, an open-source format from Facebook. To decompress the image, you'll need to download the latest ZSTD release for your platform:

* [ZSTD releases](https://github.com/facebook/zstd/releases/latest)

Once you have both the ZSTD tool and the image, decompress the image with the following command:

```bash
zstd --decompress "nixos-sd-image-21.11.337977.2766f77c32e-aarch64-linux.img.zst"
```

## Flash the NixOS microSD image

After you've decompressed the image, flash it to a microSD using your favorite microSD flashing utility. If you don't know what to use, I recommend [balenaEtcher ](https://etcher.balena.io/), as it's user-friendly and works on any major OS.

{{<img src="balena-etcher-nixos.webp">}}

When you flash the microSD, choose the `.img` file rather than the `.img.zst` file, as most flashing tools won't understand the ZSTD format.

## Insert the microSD card into your Pi

TODO

## Boot your NixOS system

If everything went well, you should see a boot sequence like the following:

{{<video src="nixos-21.11-successful-boot.mp4" max-width="800px" caption="A successful boot of the NixOS 21.11 microSD image on a Raspberry Pi 4.">}}

The boot is complete when you see a command prompt that says:

```bash
[nixos@nixos~:]$
```

## Enable SSH access (optional)

I find it helpful

### SSH option 1: Add a password

```bash
passwd
```

```bash
ssh nixos@nixos.local
```

### SSH option 2: Add an SSH key

Once your Pi 4 is up and running with NixOS, you'll only have local access.

```bash
# Change to your Github username.
GITHUB_USERNAME="mtlynch"

mkdir -p ~/.ssh && \
  curl "https://github.com/${GITHUB_USERNAME}.keys" > ~/.ssh/authorized_keys
```

If you see an error that says `certificate is not valid yet`, it means that your Pi hasn't yet sync'ed its time to time servers. Wait 60 seconds and try the command again.

```bash
ssh nixos@nixos.local
```

## Write the NixOS configuration file

You're now in NixOS!

Except you're now in a bit of an unusual state. NixOS has an unusual install process for the Raspberry Pi.

For most operating systems, you download a bootable ISO file, boot into that, and then that environment installs the operating system for you. That's the experience you have when you download a GUI-based installer for NixOS on UEFI systems.

Installing an operating system on Raspberry Pi works a bit differently. Usually, to install an OS on the Pi, you flash a disk image onto a microSD, then boot to the microSD. There's no install process because the environment is ready to go once you boot the microSD.

With NixOS, it's like a cross between both experiences. You've flashed a NixOS environment to the microSD, but you still kind of need to install NixOS.

To begin, download the configuration file I've customized for the Raspberry Pi 4:

```bash
curl \
  --show-error \
  --fail \
  {{<baseurl>}}notes/nixos-pi4/configuration.nix \
  | sudo tee /etc/nixos/configuration.nix
```

You can make changes to `/etc/nixos/configuration.nix` at this point using `nano` or `vim`. You might want to change the `hostname`, `user`, or `password` values at the top, but you can also do that later.

```bash
sudo nano /etc/nixos/configuration.nix
```

When you're happy with your `configuration.nix`, run these commands to apply the configuration to your system and reboot:

```bash
sudo nixos-rebuild boot && \
  echo "install complete, rebooting..." && \
  sudo poweroff --reboot
```

## Logging in

TODO: change

If you used the default `configuration.nix` above, your username is `tempuser` and your password is `somepass`:

## Make changes (optional)

When you log in, you'll notice you don't have a web browser.

{{<img src="no-firefox.webp">}}

In 2023, we have to have a web browser!

Add Firefox browser to `configuration.nix`:

```bash
sudo nixos-rebuild switch
```

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

TODO: Do we have to update `configuration.nix` with `TARGET_RELEASE`? Or does Nix do that for us?

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

If I power cycle the Pi at that point, it successfully boots into the new NixOS install, but there's no XFCE desktop GUI, just a terminal:

{{<video src="nixos-23.05-no-gui.mp4" max-width="800px" caption="The NixOS 22.11 microSD image fails to boot on a Raspberry Pi 4.">}}

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

But if you power cycle it, the resulting system seems okay. Thought it was due to `rebuild switch`, but I got the same results with `rebuild boot`.

* `nixos-sd-image-21.05.4737.022caabb5f2-aarch64-linux.img`: Same as 21.11

### Gotcha: `reboot` command doesn't work

After the initial install with `sudo nixos-rebuild boot`

```text
[nixos@nixos:~]$ reboot
Failed to set wall message, ignoring: Transport endpoint is not connected
Failed to reboot system via logind: Transport endpoint is not connected
Failed to talk to init daemon.

[nixos@nixos:~]$ shutdown -h now
Failed to set wall message, ignoring: Transport endpoint is not connected
Failed to power off system via logind: Transport endpoint is not connected
Failed to talk to init daemon.
```

Workaround was to use `sudo poweroff --reboot`.

### Gotcha 5: The latest Pi hardware version doesn't work

https://github.com/NixOS/nixos-hardware/issues/651

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
