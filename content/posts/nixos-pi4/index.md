---
title: "Installing NixOS on Raspberry Pi 4"
date: 2023-06-18T08:31:15-04:00
tags:
  - nix
  - raspberry pi
description: TODO
#images:
#  - TODO
---

[Nix](https://nixos.org/) is a tool that allows you to define your software environment from code. Nix has several components to it, and one of the most interesting to me is NixOS, which lets you use Nix tooling to define your entire OS configuration from plaintext configuration.

I only recently started [experimenting with Nix](/notes/nix-first-impressions/), and there's a huge amount to learn. One of the first things I tried to do was [install NixOS on my Raspberry Pi](/notes/nix-first-impressions/#failed-attempt-2-nixos-on-the-raspberry-pi-4), but my first several attempts failed. It turns out that all NixOS Pi tutorials I could find were either incomplete or out of date.

So, I present to you my complete and working guide to installing NixOS on a Raspberry Pi 4. I'm a newcomer to NixOS, so this guide is for Nix beginners, but I assume you have basic familiarity with Raspberry Pi and Linux.

## Requirements

To follow this tutorial, you'll need:

- Raspberry Pi 4
- A microSD card with at least 8 GB of storage
- A separate computer to flash the microSD card.

## Download the NixOS microSD image

As of this writing, the latest NixOS image that works on the Raspberry Pi 4 is NixOS 21.11, which is almost two years old. Later releases don't work on the Raspberry Pi, and I'll explain why [later in this post](#the-future-of-nixos-on-the-raspberry-pi). For now, I'm going to run NixOS on the Pi the only way I know how.

Download the NixOS microSD image from the link below:

- [nixos-sd-image-21.11.337977.2766f77c32e-aarch64-linux](https://hydra.nixos.org/build/213143754/download/1/nixos-sd-image-21.11.337977.2766f77c32e-aarch64-linux.img.zst)

## Decompress the NixOS microSD image

The NixOS team compresses its microSD images with an uncommon compression format called [Zstandard](https://facebook.github.io/zstd/), an open-source format from Facebook. To decompress the image, download the latest Zstandard release for your platform:

- [Zstandard releases](https://github.com/facebook/zstd/releases/latest)

Once you have both the Zstandard tool and the NixOS microSD image, decompress the `.img.zst` file with the following command:

```bash
zstd --decompress "nixos-sd-image-21.11.337977.2766f77c32e-aarch64-linux.img.zst"
```

Decompressing the Zstandard file should produce a file called `nixos-sd-image-21.11.337977.2766f77c32e-aarch64-linux.img`.

## Flash the NixOS microSD image

After you've decompressed the image, flash it to a microSD using your favorite microSD flashing utility.

If you don't know which microSD flashing tool to use, I recommend [balenaEtcher](https://etcher.balena.io/). It's user-friendly and works on every major OS.

{{<img src="balena-etcher-nixos.webp" alt="Screenshot of balenaEtcher">}}

When you flash the microSD, choose the `.img` file rather than the `.img.zst` file, as most flashing tools won't understand the ZSTD format.

## Insert the microSD card into your Pi

TODO

## Connect a display and keyboard to your Pi

Most Raspberry Pi images offer a way to access the device over the network on the first boot. I haven't found a way to do that with NixOS, so you'll need to temporarily connect a keyboard and HDMI display to your Pi to see what's happening.

I'm controlling my Pi with [TinyPilot](https://tinypilotkvm.com), a device [I created for situations just like this](/tinypilot/). But you don't need a TinyPilot, as you can do the same thing with a plain old keyboard and HDMI display.

{{<notice type="warning">}}
**Note**: NixOS only sends display output to the Pi's XX HDMI port. If you connect the HDMI cable to the other port, you won't see anything after the rainbow screen.
{{</notice>}}

## Boot your NixOS system

Power on your Raspberry Pi. If everything went well, you should see a boot sequence like the following:

{{<video src="nixos-21.11-successful-boot.mp4" max-width="800px" caption="A successful boot of the NixOS 21.11 microSD image on a Raspberry Pi 4.">}}

The boot is complete when you see the NixOS command prompt:

```bash
[nixos@nixos~:]$
```

If the boot failed, try [updating your Pi's bootloader](#troubleshooting-upgrade-to-the-latest-pi-bootloader) to the latest available version and then trying again.

## Enable SSH access (optional)

When working with Raspberry Pis, I find SSH much more convenient than typing on a separate keyboard or using TinyPilot.

There are two options for enabling SSH access on a fresh NixOS system.

### Option 1: Add a password

On the NixOS system, you can set a password on the `nixos` user account by running the following command:

```bash
passwd
```

Once you've set a password, you can SSH into your NixOS system normally:

```bash
ssh nixos@nixos.local
```

### Option 2: Add an SSH key

You can also add your SSH public key as an authorized key on the system. If you authenticate to Github with SSH keys, Github offers a convenient way to download your SSH key to your device:

```bash
GITHUB_USERNAME="your-github-username" # Replace this.

mkdir -p ~/.ssh && \
  curl "https://github.com/${GITHUB_USERNAME}.keys" > ~/.ssh/authorized_keys
```

If you see an error that says `certificate is not valid yet`, it means that your Pi is still synchronizing its time. Wait 60 seconds, and try the command again.

Once you've added your public SSH key to the NixOS system, you can SSH in like normal:

```bash
ssh nixos@nixos.local
```

## Write the NixOS configuration file

You're now in NixOS!

There's not much you can do yet because it's a minimal NixOS environment with nothing installed.

To make this more interesting, you can install a desktop GUI and a few applications. To begin, download [my example NixOS configuration file]({{<baseurl>}}nixos-pi4/configuration.nix):

```bash
curl \
  --show-error \
  --fail \
  {{<baseurl>}}nixos-pi4/configuration.nix \
  | sudo tee /etc/nixos/configuration.nix
```

You can make changes to `/etc/nixos/configuration.nix` at this point using `nano` or `vim`. You might want to change the `hostname`, `user`, or `password` values at the top.

```bash
sudo nano /etc/nixos/configuration.nix
```

Don't worry too much about customizing the configuration file perfectly just yet. With NixOS, you can change your mind about any option at any time, and applying it is as easy as editing the configuration file again.

When you're happy with your `configuration.nix`, run these commands to apply the configuration to your system and reboot:

```bash
sudo nixos-rebuild boot && \
  echo "install complete, rebooting..." && \
  sudo poweroff --reboot
```

When the reboot completes, you should see a screen that looks like this:

{{<img src="tempuser-login.webp">}}

Your Pi is now running NixOS with a [Gnome desktop environment](https://www.gnome.org/)!

If you used the default `configuration.nix` above, your username is `tempuser` and your password is `somepass`.

## Experimenting with NixOS

At this point, your NixOS system is up and running.

You're free to explore NixOS as you wish, but I've included a couple of simple experiments you can try on your new system that require no additional Nix knowledge.

### Experiment 1: Change the desktop enviroment

The `configuration.nix` above assumes you want to use the Gnome desktop environment, but maybe you prefer [a different one](https://nixos.wiki/wiki/Category:Desktop_environment). There's another desktop manager called [Plasma](https://nixos.wiki/wiki/KDE) that's a bit more like Microsoft Windows.

To change your NixOS system to use Plasma instead of Gnome, open the your `configuration.nix` file in a text editor:

```bash
sudo nano /etc/nixos/configuration.nix
```

Find these lines in the file:

```text
    displayManager.gdm.enable = true;
    desktopManager.gnome.enable = true;
```

And replace them with these lines:

```text
    displayManager.sddm.enable = true;
    desktopManager.plasma5.enable = true;
```

To apply the changes, run these commands:

```bash
sudo nixos-rebuild boot && sudo reboot
```

When you reboot, you should see a desktop like the following:

{{<gallery caption="Switching desktop managers from Gnome to Plasma is a two-line change in NixOS.">}}
{{<img src="plasma-desktop.webp" max-width="400px">}}
{{<img src="plasma-desktop2.webp" max-width="400px">}}
{{</gallery>}}

All it took to change your whole desktop environment was just a two-line change.

### Experiment 2: Create an ad-hoc environment

One of the most approachable tools I've found for Nix is `nix-shell`. It lets you create environments on the fly with any software packages you specify.

`nix-shell` doesn't affect any other configuration on your system, so you're free to try new tools without risk of breaking anything else.

I sometimes run into projects I wrote a few years ago that depend on an older version of Node.js. I've tried tools like [`nvm`](https://nvm.sh) to install Node versions side-by-side, but I always end up spending 20 minutes remembering how to use `nvm` and get it configured right.

Even though `nix-shell` is a general purpose tool for installing packages, I find it more convenient even than language-specific dev tools like `nvm`.

Here's how you can create an environment with Node.js 18.x:

```bash
$ nix-shell --packages nodejs-18_x
these paths will be fetched (11.25 MiB download, 52.36 MiB unpacked):
  /nix/store/87kgx3ym4kgmqwaijckqvbfrkzm8ax75-nodejs-18.2.0
copying path '/nix/store/87kgx3ym4kgmqwaijckqvbfrkzm8ax75-nodejs-18.2.0' from 'https://cache.nixos.org'...

[nix-shell:~]$ node --version
v18.2.0

[nix-shell:~]$ npm --version
8.9.0
```

When you're done with the environment, just hit `Ctrl+D` or type `exit`.

Here's how you can do the same thing to create a Node.js 16.x environment:

```bash
$ nix-shell --packages nodejs-16_x
these paths will be fetched (10.77 MiB download, 50.24 MiB unpacked):
  /nix/store/1ba3sqw3rkadg2ksywqc85lq2hvx9fvk-nodejs-16.15.0
copying path '/nix/store/1ba3sqw3rkadg2ksywqc85lq2hvx9fvk-nodejs-16.15.0' from 'https://cache.nixos.org'...

[nix-shell:~]$ node --version
v16.15.0

[nix-shell:~]$ npm --version
8.5.5
```

[nix-develop](https://nixos.org/manual/nix/stable/command-ref/new-cli/nix3-develop.html) is the better tool for managing development environments, but it unfortunately is not available in NixOS 21.11.

## The future of NixOS on the Raspberry Pi

I suspect the reason that NixOS builds after November 2021 fail to install on a Raspberry Pi is due to this October 2021 post on the Nix forums:

- [Planning for a better NixOS on ARM (and other non-x86_64 systems)](https://discourse.nixos.org/t/planning-for-a-better-nixos-on-arm-and-other-non-x86-64-systems/15346)

Most of the explanation is over my head, but the basic idea is that prior to 2021, NixOS worked on the Raspberry Pi. The work required to keep NixOS compatible with the Pi was unsustainable. The dev team doesn't have the resources to maintain an OS and to have special code specifically for the Raspberry Pi.

Instead, the dev team's plan is to build generic images that can boot from any UEFI environment. The NixOS images you see on NixOS' [download page](https://nixos.org/download.html) are the UEFI-based images.

The problem is that Raspberry Pi does not support UEFI. To bridge the gap, NixOS is relying on third-party bootloaders like [Tow-Boot](https://tow-boot.org/), which create UEFI environments on systems that don't have UEFI.

I tried this flow out, but I couldn't get it to work. Here were my steps:

1. Download the latest [Tow-Boot release for Raspberry Pi](https://github.com/Tow-Boot/Tow-Boot/releases/download/release-2021.10-005/raspberryPi-aarch64-2021.10-005.tar.xz) (2021.10-005)
1. Flash the Tow-Boot image onto a USB stick.
1. Download [NixOS 23.05 Gnome (64-bit ARM)](https://nixos.org/download.html).
1. Flash the NixOS image onto a microSD.
1. Insert both the USB stick and the microSD into a Raspberry Pi 4.
1. Power on the Raspberry Pi 4.

The Pi boots into Tow-Boot, and then it boots from Tow-Boot to the NixOS image on the microSD.

{{<video src="tow-boot-to-nixos-1.mp4" max-width="800px" caption="I used Tow-Boot to load the standard NixOS graphical installer.">}}

I proceeded through the graphical installer, but it locked up at 46% progress.

{{<video src="installer-hang.mp4" max-width="800px" caption="When I boot NixOS under Tow-Boot on a Raspberry Pi 4, the installer locks up the system at 46% progress.">}}

I tried again with NixOS 23.05 minimal, but it also hung partway through. I tried again with 22.11, and same thing. I'm not sure if Tow-Boot 2021.10 + NixOS 23.05 is expected to work on the Raspberry Pi 4, but I couldn't figure out any way to make it happen.

Interestingly, after talking to a member of the NixOS documentation team, I found out that [the preview image of NixOS 23.11](https://hydra.nixos.org/build/226381178/download/1/nixos-sd-image-23.11pre500597.0fbe93c5a7c-aarch64-linux.img.zst) installs successfully on the Raspberry Pi 4 without Tow-Boot. Given that, I'm not sure if Tow-Boot is still the plan. I would have used the 23.11 preview in this tutorial, except I couldn't get the desktop GUI to work.

## Appendix: Gotchas

In creating this tutorial, I ran into a ton of paths that didn't work. I've collected them here for the sake of saving others time retrying the same steps.

### Gotcha 1: The standard NixOS aarch64 image doesn't work

When I checked the NixOS download page, I saw that they offered 64-bit ARM images.

{{<img src="nixos-arm64.webp" alt="Screenshot of 64-bit ARM download links on NixOS download page" max-width="700px" has-border="true" caption="NixOS offers bootable images for 64-bit ARM systems">}}

"Wonderful!" I thought to myself, as the Pi 4 has a 64-bit ARM CPU. But then the Pi [couldn't boot the image at all](/notes/nix-first-impressions/#failed-attempt-2-nixos-on-the-raspberry-pi-4).

{{<img src="pi-noboot.png" alt="Pi boot screen that says 'Progress: Trying boot mode USB-MSD'" max-width="700px" caption="The Pi 4 fails to boot the standard NixOS ARM image">}}

I learned later that NixOS's main pre-built 64-bit ARM images require the system to have UEFI, which the Raspberry Pi 4 does not support. To boot one of these images, you need to first boot to [Tow-Boot](#the-future-of-nixos-on-the-raspberry-pi).

### Gotcha 2: The latest NixOS (23.05) microSD doesn't work on Raspberry Pi 4

NixOS still publishes microSD images for single-board computers like the Raspberry Pi. I tried flashing `nixos-sd-image-23.05.1123.aaef163eac7-aarch64-linux.img` to a microSD, but I got this error when I tried to apply my `configuration.nix`:

```text
Applying overlay rpi4-vc4-fkms-v3d-overlay to bcm2711-rpi-cm4-io.dtb...
Failed to apply '/nix/store/22l342jmwsaazvnz1zd5qq5m3b3ppsbd-rpi4-vc4-fkms-v3d-overlay-dtbo': FDT_ERR_NOTFOUND
error: builder for '/nix/store/cgv9mmkhwy6gc4y48pfmxnjam46404kr-device-tree-overlays.drv' failed with exit code 1
error: 1 dependencies of derivation '/nix/store/w77gh3p4wzbildmmr2dh1c254qlm3nv4-nixos-system-pinix-23.05.1123.aaef163eac7.drv' failed to build
```

That error led me to [a bug](https://github.com/NixOS/nixos-hardware/issues/631) in the `nixos-hardware` issue, but there's no fix available at the time of this writing.

I can work around the bug by deleting this line from configuration.nix:

```text
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

If I power cycle the Pi at that point, it successfully boots into the new NixOS install, but there's no desktop GUI, just a terminal:

{{<video src="nixos-23.05-no-gui.mp4" max-width="800px" caption="The NixOS 22.11 microSD image fails to boot on a Raspberry Pi 4.">}}

### Gotcha 3: NixOS 22.05 and 22.11 can't boot on a Pi 4

After failing to configure NixOS with version 23.05, I tried again with `nixos-sd-image-22.11.4604.fc95eb4fc3c-aarch64-linux.img`, but it failed to boot. I tried a few times, and it always either drops the signal entirely or displays a green screen:

{{<video src="nixos-22.11-boot-fail.mp4" max-width="800px" caption="The NixOS 22.11 microSD image fails to boot on a Raspberry Pi 4.">}}

I tried again with `nixos-sd-image-22.05.4694.380be19fbd2-aarch64-linux.img` and got the same result.

### Gotcha 4: `reboot` command doesn't work

I found that after applying my initial `configuration.nix` file with `sudo nixos-rebuild boot`, the `reboot` and `shutdown` commands fail:

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

I was able to work around this by running `sudo poweroff --reboot`.

### Gotcha 5: The latest Pi hardware version doesn't work

You may have noticed that [my `configuration.nix` file]({{<baseurl>}}nixos-pi4/configuration.nix) depends on the [NixOS/nixos-hardware](https://github.com/NixOS/nixos-hardware) repository, but not the latest version:

```nix
nixosHardwareVersion = "ad1114ee372a52aa0b4934f72835bd14a212a642";
...
imports = ["${fetchTarball "https://github.com/NixOS/nixos-hardware/archive/${nixosHardwareVersion}.tar.gz" }/raspberry-pi/4"];
```

I [reported this bug](https://github.com/NixOS/nixos-hardware/issues/651), and Alexander Groleau from the NixOS docs team [let me know](https://github.com/NixOS/nixos-hardware/issues/651#issuecomment-1630066858) that on current versions of NixOS, the `nixos-hardware` repo isn't necessary at all.

### Gotcha 6: Updating to a later NixOS version doesn't work

Even though [installing from the 23.05 NixOS disk image failed](#gotcha-3-the-latest-nixos-2305-microsd-doesnt-work-on-raspberry-pi-4), I thought I'd work around the issue by doing an in-place upgrade of NixOS from 21.11 to 23.05. Unfortunately, that failed, too.

I tried installing 21.11 through my process above, then rebuilding for 23.05 with the following commands:

```bash
TARGET_RELEASE="23.05"

sudo nix-channel \
  --add "https://nixos.org/channels/nixos-${TARGET_RELEASE}" nixos && \
  sudo nix-channel --update && \
  sudo nixos-rebuild --upgrade boot && \
  sudo reboot
```

That process ultimately fails with the [same error](https://github.com/NixOS/nixos-hardware/issues/631) as installing from the 23.05 disk image:

```text
Failed to apply '/nix/store/22l342jmwsaazvnz1zd5qq5m3b3ppsbd-rpi4-vc4-fkms-v3d-overlay-dtbo': FDT_ERR_NOTFOUND
building '/nix/store/w052x98nzkbvmxcmb8wdgmfgqrf8vzv4-smb-dummy.conf.drv'...
error: builder for '/nix/store/cgv9mmkhwy6gc4y48pfmxnjam46404kr-device-tree-overlays.drv' failed with exit code 1
error: 1 dependencies of derivation '/nix/store/5hbkqaz7ldjf5565zakjqxx4xrk5dvn9-nixos-system-pinix-23.05.1156.ad157fe26e7.drv' failed to build
```

## Troubleshooting

### Upgrade to the latest Pi bootloader

If you're running into boot issues with NixOS, you may need to update your Pi's bootloader and [EEPROM](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#raspberry-pi-4-boot-eeprom).

Boot a recent build of [Raspberry Pi OS (aka "Raspbian")](https://www.raspberrypi.com/software/operating-systems/), then run these command to install the latest bootloader:

```bash
sudo raspi-config nonint do_boot_rom E1 && \
  sudo reboot
```

To update the EEPROM, run these commands:

```bash
sudo apt update && \
  sudo apt install --yes rpi-eeprom && \
  sudo rpi-eeprom-update -a && \
  sudo reboot
```

The Pi 4 devices I tested booted the NixOS 21.11 disk image out of the box, so the above steps weren't necessary for me.
