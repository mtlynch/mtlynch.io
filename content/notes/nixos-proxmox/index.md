---
title: "Running NixOS on Proxmox"
date: 2023-09-24T00:00:00-04:00
tags:
  - nix
---

One of the stumbling blocks I ran into when trying out NixOS was that I couldn't run it under [Proxmox](https://www.proxmox.com/en/), my preferred virtual machine server.

Through some trial and error, I figured out how to install NixOS as a Proxmox container.

## Download the NixOS container image

First, download the latest [NixOS x86_x64 container image](https://hydra.nixos.org/job/nixos/trunk-combined/nixos.lxdContainerImage.x86_64-linux). For other hardware architectures, see [this Github comment](https://github.com/NixOS/nixpkgs/issues/43781#issuecomment-1707132209).

At the time of this writing, the latest NixOS container build is [235933548](https://hydra.nixos.org/build/235933548), but you can just click whatever is the latest build as you read this.

{{<img src="download-build.webp" alt="Screenshot of latest builds page, showing a NixOS container image build each day." has-border="true" max-width="800px">}}

From the build result page, click the link labeled `nixos-system-x86_64-linux.tar.xz` to download the image:

{{<img src="build-result.webp" alt="Screenshot of metadata page for a NixOS build from 2023-09-21" has-border="true" max-width="700px">}}

## Rename the NixOS container image (optional)

The NixOS container image download doesn't include any version or date information. For organization, I renamed my image file to:

- `nixos-2023-09-21-lxdContainerImage.x86_64-linux.tar.xz`

Renaming will help you identify which version of NixOS this is when you see it later in Proxmox, though this step is optional.

## Upload the image to Proxmox

Now, it's time to upload the image to Proxmox. Scroll down to one of your Proxmox storage nodes.

Click the storage node you'd like to use. The default is called `local`, but you may have others.

{{<img src="click-local.webp" alt="Screenshot of local storage node menu item in the Server View of Proxmox" has-border="true">}}

From the storage node, click "CT Templates," and then click "Upload."

{{<img src="ct-templates.webp" alt="Screenshot of settings pages for storage node, showing the CT Templates tab is selected and an arrow pointing to the Upload button" has-border="true">}}

In the upload dialog, click "Select File..." and select the NixOS container image you downloaded [above](#download-the-nixos-container-image), and click "Upload."

{{<img src="upload-template.webp" alt="Screenshot of template upload dialog with content set to 'Container template'" has-border="true">}}

## Create a NixOS container

Now that your Proxmox server has the NixOS image available, you can create your first NixOS container.

Scroll up to your Proxmox node, right click it, and select "Create CT":

{{<img src="create-ct.webp" alt="Screenshot of Proxmox context menu for pve node with an arrow pointing to 'Create CT' menu option" has-border="true">}}

In the "Hostname" field, select any hostname you'd like, such as `nixos1`.

{{<img src="nixos-hostname.webp" alt="Screenshot of first page of Create LXC Container wizard. Hostname is set to nixos1, Node is set to pve. CT ID is set to 151. Other fields are not populated."  has-border="true">}}

The Proxmox dialog requires you to fill out the password fields, but they have no effect in NixOS. Put in any value you want.

Ignore the SSH public key field, as it has no effect within NixOS.

On the Template tab, choose the NixOS image you uploaded above:

{{<img src="choose-template.webp" alt="Screenshot of Template tab of Create LXC Container wizard showing that nixos-2023-09-21-lxdContainerImage.x86_64-linux.tar.xz is the template being selected" has-border="true">}}

Proceed through the container creation wizard normally, choosing your preferred values for disk, CPU, memory, and network.

On the last page, leave "Start after created" unchecked and click "Finish."

{{<img src="dont-start.webp" alt="Screenshot of summary screen of Create LXC Container wizard showing that 'Start after created' is unchecked" has-border="true">}}

The output will contain these warnings, which are safe to ignore:

```text
Architecture detection failed: open '/bin/sh' failed: No such file or directory

Falling back to amd64.
Use `pct set VMID --arch ARCH` to change.
unknown ID 'nixos' in /etc/os-release file, trying fallback detection
/etc/os-release file not found and autodetection failed, falling back to 'unmanaged'
```

## Enable nesting

For NixOS to work properly under Proxmox, you need to enable the "Nesting" feature of the container.

Navigate to the NixOS container you just created, then click the Options tab, and click "Features."

{{<img src="click-features.webp" alt="Screenshot of settings tab for new Proxmox container. The Options tab is selected and there's an arrow pointing to the 'Features' row" has-border="true">}}

Click the box next to "Nesting" and then hit "OK."

{{<img src="enable-nesting.webp" alt="Screenshot of the Proxmox Edit Features dialog showing that Nesting is now checked" has-border="true">}}

## Start NixOS

Your NixOS container is now configured!

You can start your container normally. At the Console, you should see a standard NixOS prompt:

{{<img src="nixos-prompt.webp" alt="Screenshot of nixos default login prompt in a Proxmox container on the Console tab" has-border="true">}}

As the prompt says, you can log in with username `root` and no password.

## Configure NixOS system

I've created a basic configuration for a NixOS server system as a Proxmox container. You can download this configuration by running the following command:

```bash
curl \
  --show-error \
  --fail \
  {{<baseurl>}}/notes/nixos-proxmox/configuration.nix \
  | sudo tee /etc/nixos/configuration.nix
```

Apply the new configuration by running the following commands:

```bash
sudo nixos-rebuild boot && \
  echo "install complete, rebooting..." && \
  sudo poweroff --reboot
```

## References

- https://nixos.wiki/wiki/Proxmox_Linux_Container
- https://blog.xirion.net/posts/nixos-proxmox-lxc/
