---
title: "Running NixOS on Proxmox"
date: 2023-09-24
lastmod: 2024-10-21
tags:
  - nix
---

{{<notice type="info">}}
**Compatibility**: These instructions work as of Proxmox 8.x and NixOS 24.05.
{{</notice>}}

One of the stumbling blocks I ran into when trying out NixOS was that I couldn't run it under [Proxmox](https://www.proxmox.com/en/), my preferred virtual machine server.

Through some trial and error, I figured out how to install NixOS as a Proxmox container.

## Download the NixOS container image

First, download the latest [NixOS x86_x64 lxdContainerImage image](https://hydra.nixos.org/job/nixos/release-24.05/nixos.lxdContainerImage.x86_64-linux). For other hardware architectures, see [this GitHub comment](https://github.com/NixOS/nixpkgs/issues/43781#issuecomment-1707132209).

{{<notice type="warning">}}
**Warning**: Hydra also features a build called [`proxmoxLXC.x86_64-linux`](https://hydra.nixos.org/job/nixos/release-24.05/nixos.proxmoxLXC.x86_64-linux). I expected it to work even better on Proxmox, but it seems to be broken. It boots NixOS, but the login does not accept any standard NixOS credential (`nixos`, `root`).
{{</notice>}}

At the time of this writing, the latest NixOS container build is [275970650](https://hydra.nixos.org/build/275970650), but you can just click whatever is the latest build as you read this.

{{<img src="download-build.webp" alt="Screenshot of latest builds page, showing a NixOS container image build each day." has-border="true" max-width="724px">}}

From the build result page, click the link labeled `nixos-system-x86_64-linux.tar.xz` to download the image:

{{<img src="build-result.webp" alt="Screenshot of metadata page for a NixOS build from 2023-09-21" has-border="true" max-width="700px">}}

## Upload the image to Proxmox

Now, it's time to upload the image to Proxmox. Scroll down to one of your Proxmox storage nodes.

Click the storage node you'd like to use. The default is called `local`, but you may have others.

{{<img src="click-local.webp" alt="Screenshot of local storage node menu item in the Server View of Proxmox" has-border="true">}}

From the storage node, click "CT Templates," and then click "Download from URL."

{{<img src="ct-templates.webp" alt="Screenshot of settings pages for storage node, showing the CT Templates tab is selected and an arrow pointing to the Upload button" has-border="true">}}

The NixOS container image download doesn't include any version or date information. For organization, I renamed my image file to:

- `nixos-2024-10-21-lxdContainerImage.x86_64-linux.tar.xz`

Renaming will help you identify which version of NixOS this is when you see it later in Proxmox, though this step is optional.

{{<img src="download-from-url.webp" alt="Screenshot of download settings showing the build URL at the top and the custom filename in the middle field" has-border="true">}}

Click "Download" to download the template to Proxmox.

## Create a NixOS container

{{<notice type="warning">}}
**Warning**: Creating a container through the Proxmox web UI does not work with this template. You need to perform this step through the Proxmox terminal.
{{</notice>}}

For the next step, SSH to your Proxmox system and switch to the `root` user context:

```bash
ssh root@pve
```

From the Proxmox SSH session, select the settings for the new NixOS container:

```bash
# Where the template file is located
TEMPLATE_STORAGE='local'
# Name of the template file downloaded from Hydra.
TEMPLATE_FILE='nixos-2024-10-21-lxdContainerImage.x86_64-linux.tar.xz'
# Name to assign to new NixOS container.
CONTAINER_HOSTNAME='nixos'
# Which storage location to place the new NixOS container.
CONTAINER_STORAGE='local'
# How much RAM to assign the new container.
CONTAINER_RAM_IN_MB='8192'
# How much disk space to assign the new container.
CONTAINER_DISK_SIZE_IN_GB='80'
```

With those settings in place, create the new NixOS container with `pct create`:

```bash
pct create "$(pvesh get /cluster/nextid)" \
  --arch amd64 \
  "${TEMPLATE_STORAGE}:vztmpl/${TEMPLATE_FILE}" \
  --ostype unmanaged \
  --description nixos \
  --hostname "${CONTAINER_HOSTNAME}" \
  --net0 name=eth0,bridge=vmbr0,ip=dhcp,firewall=1 \
  --storage "${CONTAINER_STORAGE}" \
  --memory "${CONTAINER_RAM_IN_MB}" \
  --rootfs ${CONTAINER_STORAGE}:${CONTAINER_DISK_SIZE_IN_GB} \
  --unprivileged 1 \
  --features nesting=1 \
  --cmode console \
  --onboot 1 \
  --start 1
```

## Log in to NixOS

Your NixOS container is now configured and should be running.

Confusingly, if you visit the Console tab for your new container, you'll see only a black screen:

{{<img src="black-screen.webp" alt="Screenshot of a black screen in the Proxmox container on the Console tab" has-border="true">}}

If you hit "Enter," you should see the standard NixOS prompt. You can log in with username `root` and no password.

{{<img src="nixos-prompt.webp" alt="Screenshot of nixos default login prompt in a Proxmox container on the Console tab" has-border="true">}}

## Get SSH access to NixOS

Strangely, the `configuration.nix` file that ships with the NixOS container image does not work. If you try to run `nixos-rebuild`, you'll see errors about a missing `lxd.nix` file. Even if you fix those, there are other systemd errors.

Before you fix those, it's easier if you have SSH access. The easiest way I've found to do that is to download your SSH keys to the system. If you have a GitHub account with SSH keys enabled, you can do that as follows:

```bash
GITHUB_USERNAME='your-github-username' # Replace this.

mkdir -p ~/.ssh && \
  curl "https://github.com/${GITHUB_USERNAME}.keys" > ~/.ssh/authorized_keys
```

After this, you should be able to SSH in to your NixOS system with `ssh root@nixos`.

## Configuring NixOS

I've created a basic configuration for a NixOS server system as a Proxmox container. You can download this configuration by running the following command:

```bash
curl \
  --show-error \
  --fail \
  {{<baseurl>}}notes/nixos-proxmox/configuration.nix \
  > /etc/nixos/configuration.nix
```

Apply the new configuration by running the following commands:

```bash
nix-channel --update && \
  nixos-rebuild switch --upgrade && \
  echo "install complete, rebooting..." && \
  poweroff --reboot
```

From there, you have a basic NixOS server system, which you can configure however you like.

## References

- <https://nixos.wiki/wiki/Proxmox_Linux_Container>
- <https://blog.xirion.net/posts/nixos-proxmox-lxc/>
- <https://taoofmac.com/space/blog/2024/08/17/1530>
