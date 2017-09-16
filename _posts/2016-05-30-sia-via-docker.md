---
title: Running Sia on a Synology NAS via Docker
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
date: '2016-05-30 00:00:00 -0400'
header:
  teaser: images/resized/2016-05-30-sia-via-docker/480/sia-running.png
tags:
- docker
- sia
- synology
- nas
excerpt: A walkthrough for setting up Sia in Docker in Synology DSM
---

{% include base_path %}

# Overview

[Sia](https://sia.tech/) is a decentralized, peer-to-peer network for buying and selling computer storage space. If you have extra storage space, Sia allows you to sell it to others who want to store their files on the Sia cloud network.

Hosting a Sia server on your personal laptop or desktop can be challenging. People typically turn off their personal machines at times, or at least reboot them on a regular basis. This present a problem for an application like Sia, as it needs to maintain high availability to serve clients on the network.

A convenient solution is to run Sia on a network attached storage ([NAS](https://en.wikipedia.org/wiki/Network-attached_storage)) device. A NAS is designed to remain powered on at all times and rarely needs reboots. Plus, the whole point of a NAS is to provide lots of storage, so it likely has plenty to spare. Many commercial NAS devices include support for Docker, a virtualization tool that can run Sia.

In this guide, I'll show you how to set up a Sia server on a NAS device using [Docker](https://www.docker.com/).

# Why host?

Many newcomers to Sia ask, "Will I make a lot of money hosting on Sia?" The honest answer is that **hosting storage on Sia is NOT lucrative**.... yet.

{% include image.html file="siahub-2percent.png" alt="SiaHub screenshot" max_width="380px" class="align-right" %}

The storage rental market has not yet reached critical mass. [SiaHub](https://siahub.info), my favorite Sia host explorer, shows that the total storage capacity of Sia's network (as of 2017-05-25) is a whopping 1.1 petabytes. Only 2% of that capacity has been rented. With such a surplus of space, hosts can't sell their storage space unless they price it at almost zero.

SiaPulse has a nice [host earnings calculator](http://siapulse.com/page/tools) that you should check out if you're interested in estimating how much you'd make by renting out your storage space.

So the money's not rolling in quite yet, but here are a couple reasons you might want to participate anyway:

## Advantageous position if rental market succeeds

Unlike competitors such as [Storj](https://storj.io/), Sia is aimed at selling storage to enterprise customers rather than home users. To date, no large company is relying heavily on Sia, but if even one medium to large business begins using Sia as a storage backend, that could completely kickstart the market.

When users purchase storage on Sia, the host selection algorithm gives strong preference to hosts that have participated in the network longer. This means that if a buying frenzy comes about, a host with months of solid history will have a strong advantage over hosts that are newly joining the network.

## It's fun

I personally host just to experiment with something new. I find it fun to tweak my host pricing and see how it affects the number of storage contracts I receive.  Sia has also connected me with an [enthusiastic community](https://reddit.com/r/siacoin) of other Sia users.

# Software versions

This guide uses the latest version of each software component at the time of writing:

<figure class="align-right">
  <a href="https://www.amazon.com/Synology-DiskStation-Diskless-Attached-DS412/dp/B007JLE84C/ref=as_li_ss_il?ie=UTF8&linkCode=li2&tag=mtlynch-20&linkId=3f9ff9d103c0282622ec5adb5959fa2a" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B007JLE84C&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=mtlynch-20" alt="Synology DS412+" ></a>
  <figcaption>Synology DS412+ NAS device</figcaption>
</figure>

* DiskStation Manager (DSM) 6.1.2-15132
* Sia v.1.3.0
* Docker v.1.11.2

Though this guide is written specifically for the Synology DSM system, the steps relating to Docker should be applicable on any platform that supports Docker.

I successfully tested this on a [Synology DS412+](http://amzn.to/2pf3unf), but these steps should work on any Synology NAS with the latest DSM and sufficient CPU/RAM. It should also be straightforward to adapt these instructions to work for another full featured consumer NAS, such as a [QNAP NAS](https://www.qnap.com/en-us/).

# Configuring the NAS

## Install Docker

First, install Docker.

Docker is one of the few Synology-published, official packages available for DSM. Find it in Package Center by searching for `docker` and clicking "Install."

{% include image.html file="package-docker.png" alt="Install Docker package" %}

## Create Sia directory

Next, create a dedicated Shared Folder for Sia. This is the folder where Sia will store all of its state information, including encrypted wallet files and the blockchain database.

From File Station, create a new Shared Folder and name it "sia":

{% include image.html file="new-shared-folder.png" alt="Create new shared folder" max_width="547px" %}

## Enable SSH access to DiskStation

There are no pre-packaged Docker images for Sia, so you'll create a `Dockerfile` to define the Docker image. Because the DSM Docker app does not support creation of images from a `Dockerfile`, you'll do this through the command line.

To enable this functionality, open Control Panel > Terminal & SNMP and check the box next to "Enable SSH service."

{% include image.html file="enable-ssh.png" alt="Install Docker package" %}

# Creating the Docker image

Connect to your NAS over SSH from another machine on the network. Linux and OS X users can run the following command from the terminal. Windows users need an SSH client, such as [Cygwin](https://www.cygwin.com).

```bash
ssh admin@diskstation
```

*Note: The rest of the commands in this section assume that you are running as an admin user on the Synology NAS.*

Now that you have a shell on the NAS, switch to the `/tmp/` directory:

```bash
admin@DiskStation:/$ cd /tmp

admin@DiskStation:/tmp/$

```

Using the following command, download the Sia `Dockerfile` I created:

```bash
wget {{ site.url }}/files/sia-via-docker/Dockerfile
```

The `Dockerfile` contents are listed below:

{% include files.html title="Dockerfile" %}

This `Dockerfile` does a few things:

* Downloads Sia v.1.3.0, the latest stable release as of this writing, and installs it to the `/opt/sia` directory.
* Configures the image to run `siad`, the Sia daemon process, when the container launches.
* Uses `socat` to forward the container's external port 8000 to the container's localhost:9980 port (the `siad` API port). Otherwise, no `siac` client outside the container could execute commands against the container's `siad` server.
* Instructs `siad` to use `/mnt/sia` as its folder for Sia state information. In the next step, you'll link `/mnt/sia` to the Synology Shared Folder "sia" created earlier so that the files `siad` generates are visible on the NAS.

With your `Dockerfile` complete, you are ready to build and run the container:

```bash
# Create a Docker image tagged with the label "sia"
admin@DiskStation:/tmp/$ sudo docker build --tag sia .

# NOTE: Replace 10.0.0.101 with the IP address of your Synology NAS on your
# local network.
admin@DiskStation:/tmp/$ LOCAL_IP=10.0.0.101

# Create a Docker container based on the Sia image and start running it in the
# background.
admin@DiskStation:/tmp/$ sudo docker run \
  --detach \
  --publish "${LOCAL_IP}:9980:8000" \
  --publish 9981:9981 \
  --publish 9982:9982 \
  --volume /volume1/sia:/mnt/sia \
  --name sia-container sia
```

The previous commands do the following:

* Creates a Docker image from the `Dockerfile`.
* Creates a Docker container for our image and starts running the container in the background.
* Forwards traffic to ports `9980`-`9982` on the NAS (the Docker host) to those same port numbers within the Sia container.
  * **Important**: Notice that for port `9980` you bind *only to the local network interface*, whereas for other ports you implicitly bind to all interfaces. This is a security measure. Anyone who communicates with `siad` on port `9980` has full control of our host and can, for example, empty our wallet. This measure is not strictly necessary if our network does not expose this port externally, but it is a useful precaution regardless.
  * My NAS has the IP address `10.0.0.101`. You can find your NAS's IP address with the command `dig diskstation +short` from another machine on your local network.

## Checking for success

From DSM, open the Docker app and view the "Container" panel. You should see something similar to the following:

{% include image.html file="sia-running.png" alt="Sia container running" %}

If you open the "sia" Shared Folder we created earlier, you'll see that `siad` has created several folders:

{% include image.html file="sia-folder-populated.png" alt="Sia generated folders" %}

# Configuring Sia

## Checking status

Let's connect to our Sia daemon using the command-line client, `siac`.

With `siad` running on our NAS, you can communicate with it from any other machine on your local network. The machine will need the [latest Sia
release](https://github.com/NebulousLabs/Sia/releases).

Once you've copied the `siac` binary to your machine, you can run `siac` commands by specifying your NAS's hostname in the `addr` parameter:

```bash
# DISKSTATION is the hostname of the NAS on my local network, the default for
# Synology NAS devices.
$ ./siac --addr DISKSTATION:9980
Synced: No
Block:  0000000001ac2429ee234370ddf139ce87161277eded4bd58bcd31c5e5e2554f
Height: 727
Target: [0 0 0 0 12 204 204 204 204 204 204 204 204 204 204 204 204 204 204 204 204 204 204 204 204 204 204 204 204 204 204 204]
```

## Adding host storage

To create storage space to sell to other Sia users, create a dedicated subdirectory called `host-storage` in your "sia" shared folder:

{% include image.html file="create-storage-folder.png" alt="Sia storage folder" %}

Then, use `siac` to add that folder as a new Sia host storage folder:

```bash
./siac --addr DISKSTATION:9980 host folder add /mnt/sia/host-storage 500GB
```

Note that `/mnt/sia/host-storage` is the path from the *daemon's* perspective from within the Docker container, not the perspective of `siac`.

# Allow Sia through firewall

Sia needs to communicate with remote peers over ports `9981` and `9982`. When using a  home router, configure it to forward these ports to the Synology NAS. The exact process will vary by router, but it should look something like the following:

*Note: Replace `10.0.0.101` with the IP address of your Synology NAS.*

{% include image.html file="firewall.png" alt="Firewall settings" %}

You should **not** expose port `9980` because that is Sia's port for API communications. Exposing it to the public Internet would leave your Sia host vulnerable to compromise.

# How to upgrade Sia

Sia is still a new technology and new important releases come out every month or so. Renters use the server's version to determine which host to purchase file contracts from, so it's in your best interest to upgrade soon after new releases.

If you've followed this guide, all of Sia's state is kept outside the Docker container, so you can safely upgrade without affecting your Sia wallet or storage contracts.

1. From any machine on your network, gracefully shut down your `siad` server:

    ```bash
    ./siac --addr DISKSTATION:9980 stop
    ```

1. Get the version number of the [latest Sia release](https://github.com/NebulousLabs/Sia/releases/latest)
1. SSH into your NAS as `admin`.

    ```bash
    ssh admin@diskstation
    ```

1. Edit your `Dockerfile` to change the `SIA_VERSION` variable to match the latest Sia version.
1. Run the following commands:

    ```bash
    # Rebuild the Docker image
    admin@DiskStation:/tmp/$ sudo docker build --tag sia .

    # Remove the old container.
    # NOTE: If Docker says the container is still running, wait a few minutes to
    # allow siad to finish shutting down gracefully and re-try this command. It may
    # take up to 10 minutes.
    admin@Diskstation:/tmp$ sudo docker rm sia-container

    # NOTE: Replace 10.0.0.101 with the IP address of the Synology NAS on your
    # local network.
    admin@DiskStation:/tmp/$ LOCAL_IP=10.0.0.101

    # Re-create the Docker container.
    admin@DiskStation:/tmp/$ sudo docker run \
      --detach \
      --publish "${LOCAL_IP}:9980:8000" \
      --publish 9981:9981 \
      --publish 9982:9982 \
      --volume /volume1/sia:/mnt/sia \
      --name sia-container sia
    ```

When you complete this process, you'll have a new Sia Docker container running the latest version of Sia.

# Conclusion

You now have a working Sia node that stays online as long as your NAS is up and running.

Because this configuration keeps all of Sia's persistent state outside of the container, it's very easy to modify your `Dockerfile` to upgrade Sia as new releases are published.

# Further reading

This guide showed you how to get your host up and running, but there's more you need do to configure your host and optimize it to maximize your profits. The Sia developers have written some excellent guides to help you do that:

* [How to Run a Host on Sia](https://blog.sia.tech/how-to-run-a-host-on-sia-2159ebc4725): An in-depth walkthrough of configuring a Sia host.
* [Host Profit Maximization Thread](https://forum.sia.tech/topic/1037/host-profit-maximization-thread): A guide to tweaking host settings to maximize profits.

# Earning Siacoin by mining

Another way of earning Siacoin is by using your computer's graphics processor to support the Sia network's computational needs. Compared to hosting, mining yields significantly higher revenues and pays out within hours or days instead of weeks. Mining also requires less specialized equipment.

If you're interested in getting started, check out my other guide, "[A Beginner’s Guide to Mining Siacoin]({{ base_path }}/windows-sia-mining/)."

# Updates

* 2016-05-30: Original publication.
* 2016-07-08: Updated instructions for the Sia 1.0.0 release.
* 2017-01-15: Updated instructions for the Sia 1.0.4 release.
* 2017-05-07: Updated instructions for the Sia 1.2.1 release.
* 2017-05-23: Updated instructions for the Sia 1.2.2 release.
* 2017-05-25: Revised a lot of the text, added instructions for version-to-version upgrades.
* 2017-07-25: Updated instructions for the Sia 1.3.0 release.
