---
title: Creating a Super Cheap Cloud Storage App with Sia and NextCloud
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
tags:
- sia
- nextcloud
- docker
---

In today's post, I'm going to show you how to build a cloud storage web application, similar to Dropbox or Google Drive, but at substantially lower storage costs. This solution provides cloud storage at ~$0.60 per TB per month. For comparison, Dropbox charges $8.25 per month and Google Drive charges $10 per month.

Don't cancel your Dropbox subscription yet, because this technology is still a bit flaky. In my tests, it crashes quite a bit and sometimes loses entire files, but the technology involved is very interesting, so I wanted to share this tutorial to make it easier for others to build this themselves.

# Video tutorial

I created a video that walks through the steps of this guide and demonstrates the final result. If you prefer video tutorials, I recommend you download the files below and watch the video to follow along with the steps.

The video differs slightly from this blog post in that the video does more by pointing and clicking on UI elements, whereas the blog post relies more on the command line. Both achieve the same result.

# Pre-requisites

This guide is aimed at **intermediate users**. Sia's integration with NextCloud is still very flaky as of this writing, so if you don't have any experience with Docker containers or virtual machines or you're not comfortable using the command-line, it will be difficult for you to follow this guide.

I used Windows 10 in the video demo, but this post is completely system-agnostic. The steps I provide will work on any system that supports Docker, which includes Windows, OS X, Linux, and even some [network storage devices](/sia-via-docker).

To complete this guide, you will need:

* At least 500 Siacoin (SC)
	 *  You can either [buy them](http://www.buyingsiacoin.com/) or [mine them](/windows-sia-mining/).
* 6 GB of free disk space (preferably on an SSD)
* [Docker Community Edition](https://store.docker.com/search?offering=community&type=edition) (free) installed on your system

# Time required

The steps in this guide requires about **20 minutes** of active time. However, there are several points in the installation process where you must wait minutes to hours for Sia to complete processing, so the total time required for completing this guide is 3-4 hours.

# Components of this solution

## Sia

We use **Sia** in our solution to provide backend storage for our web application. I've written [a few posts](/tags/#sia) about Sia previously, as it's one of my favorite new technologies. [Sia](https://sia.tech) is a decentralized file storage network. Users can connect to Sia and [rent out their unused disk space](/sia-via-docker/) to earn money. Prices on this network are very low right now, which is how you can build a cloud storage solution and pay so little for disk space.

## NextCloud

If you're familiar with Sia, you might be aware that Sia has their own graphical user interface, called Sia-UI. This UI is *extremely* limited in functionality. Its main weakness is that it's a desktop application, so you can only access your files from a single computer. It also lacks support for viewing files, so if you have content like photos, video, or documents, you can't display them within Sia-UI. You have to copy them to a separate folder on your computer and view the files there.

We overcome Sia-UI's limitations with **NextCloud**. [NextCloud](https://www.nextcloud.com) is an open-source cloud storage web application. It offers a web interface very similar to DropBox or Google Drive. NextCloud is designed for compatibility with many different storage providers, including Amazon S3, Dropbox, and OpenStack. In February 2017, the Sia team wrote [a Sia plugin](https://github.com/NebulousLabs/Sia-Nextcloud) for NextCloud, which we will be using to connect NextCloud and Sia.

If you want to try out NextCloud before you deploy your own solution with this blog post, you can try a free demo [here](https://demo.nextcloud.com/).

## Docker

NextCloud is pretty tricky to install because it requires a database server, a web server, and several software libraries. Rather than explain to you how to go through all those installation or configuration steps, we'll be using **Docker** to take care of all of that for us. Docker is a technology that allows developers to build applications in "containers." In Docker terms, a container is an isolated environment where the app has access to all the components that it needs to run and nothing extra. We'll be creating containers for Sia and NextCloud and using a feature called `docker-compose` to join the two containers together so they can communicate with each other.

# Set up Docker containers
## Create files and folders for Docker

To begin, you'll create a directory for all the Docker files and download the configuration files for your containers.

1. Create a directory called `sia-nextcloud`. You'll be downloading the full blockchain within this folder, so make sure it's on a drive with at least 6 GB of free space.
1. Within `sia-nextcloud` create two directories: `sia-data` and `sia-uploads`.
1. Download the three files below into `sia-nextcloud`:
   1. [`docker-compose.yml`](/files/sia-nextcloud/docker-compose.yml)
   1. [`Dockerfile.nextcloud`](/files/sia-nextcloud/Dockerfile.nextcloud)
   1. [`Dockerfile.sia`](/files/sia-nextcloud/Dockerfile.sia)

After downloading these files and creating the appropriate folders, your directory should look like this:

```
sia-nextcloud/
  sia-data/
  sia-uploads/
  docker-compose.yml
  Dockerfile.nextcloud
  Dockerfile.sia
```

Below, I've included the full text of each file as well as download links. I'll talk briefly about what's happening in each file.

`docker-compose.yml`

{% include files.html title="docker-compose.yml" language="yml" %}

This is the top-level file for our solution. It tells Docker how to load the Sia and NextCloud containers and specifies the configuration options the containers need to communicate with each other.

It maps ports within the containers to ports on your local machine, so the line `9980:9980` forwards port 9980 on your local machine to 9980 in the Sia container so that applications outside the container can communicate with the Sia server, which listens on 9980. Similarly, `8080:80` forwards your local machine's port 8080 to the container's web server port at 80. I chose 8080 because 80 is a privileged port on most systems and requires special permissions to access.

This configuration also sets up volumes so that the containers can store data that persists even if the container itself is destroyed. `./sia-data:/mnt/sia-data` gives the Sia container access to the `sia-data/` folder you created above. Within the container, that path will appear as `/mnt/sia-data`. The `./sia-uploads:/mnt/sia-uploads` line achieves a similar effect. Sia and NextCloud expect to run on the same system with a single filesystem. In my architecture, they are on different systems with indpependent filesystems, but the `sia-uploads` lines in both containers' configurations allow them to share a filesystem path for uploads, which is sufficient for this system's needs. Finally, `nextcloud-data:/var/www/html` allows NextCloud to persist its configuration information in a named Docker volume called `nextcloud-data`. This ensures that when you restart the NextCloud container, you don't need to go through all the steps of setting up a fresh NextCloud server.

`Dockerfile.sia`

{% include files.html title="Dockerfile.sia" %}

This is the Dockerfile for Sia. It creates a Docker container starting from the very barebones Debian Jessie build of Linux. It then downloads the latest release of Sia (which is 1.3.0 as of this writing), unzips it, and runs `siad`, the Sia server daemon. The `--modules gctwr` flag limits Sia's modules to only those needed for acting as a renter. The `--sia-directory /mnt/sia-data` flag ensures that Sia uses the persist volume that's specified in `docker-compose.yml`.

The confusing part of this Dockerfile is the presence of `socat` and the `--api-addr localhost:8000` flag. [Despite my best efforts](https://github.com/NebulousLabs/Sia/issues/1386), the Sia developers refuse to allow `siad` to bind to non-localhost ports, even though this breaks Docker scenarios. As a workaround, I configure Sia to bind to `localhost:8000` and then use the socat tool to bind to the public 9980 port and forward traffic to 8000. It's a bit clunky, but it works.

`Dockerfile.nextcloud`

{% include files.html title="Dockerfile.nextcloud" %}

This file is very straightforward because NextCloud publishes its own Dockerfile. The only thing I added was a line to listen on port 80.

## Launch containers

With the Docker files and folders in place, you're ready to launch your containers:

```bash
docker-compose up -d
```

You can check the status of your containers with the `logs` command:

```bash
docker-compose logs
```

When Sia has finished loading, you will see  a sequence in the logs that looks like this:

```
sia_1        | Loading...
sia_1        | (0/5) Loading siad...
sia_1        | (1/5) Loading gateway...
sia_1        | (2/5) Loading consensus...
sia_1        | (3/5) Loading transaction pool...
sia_1        | (4/5) Loading wallet...
sia_1        | (5/5) Loading renter...
sia_1        | Finished loading in 0.7577895 seconds
```

If you run `siac` within the container, you will see that Sia is syncing its blockchain with the Sia network:

```bash
docker exec -it sianextcloud_sia_1 ./siac consensus
```

```
Synced: No
Height: 730
Progress (estimated): 0.6%
```

At this point, you can run [Sia-UI](https://github.com/NebulousLabs/Sia-UI/releases/latest) on your local machine and it will automatically connect to the Sia instance within Docker. This will give you a graphical view of what Sia is doing, but it is not necessary.

# Configure Sia

## Optional: Speed up blockchain sync

Sia needs to download its full blockchain before you can begin using it, but this process can take 1-3 days to complete. This step provides a workaround so that you can complete the blockchain sync faster, but this step is **optional**.

If you would prefer to wait 1-3 days for Sia to sync on its own, skip to the [next section](#complete-blockchain-sync).

If you would like to reduce the sync time to 30-60 minutes, follow the steps below:

1. Shut down the Docker containers.
  ```bash
  # Tell Sia to shut down gracefully.
  docker exec -it sianextcloud_sia_1 ./siac stop
  # Give Sia a few seconds to shut down gracefully.
  sleep 5
  # Stop the Docker containers.
  docker-compose down
  ```
1. Download the Sia [consensus.db file](https://consensus.siahub.info/consensus.db) (this uses [SiaHub](https://siahub.info)'s mirror).
1. Copy the `consensus.db` file to `sia-nextcloud/sia-data/consensus/consensus.db` (overwrite the existing file).
1. Restart the Docker containers.
  ```bash
  docker-compose up -d
  ```
1. Check the container logs periodically until Sia has processed the new blockchain and finished loading:
  ```bash
  docker-compose logs
  ```
  When Sia finishes loading, you'll see a message in the logs similar to the following:
    ```text
    sia_1        | Finished loading in 0.7577895 seconds
    ```
    In my tests, this process took 50 minutes on a solid-state drive (SSD). If you're running Sia on a hard-disk drive (HDD), it will take considerably longer.

## Complete blockchain sync

Now, you need to wait for Sia to finish syncing its blockchain. You can check on status by running [Sia-UI](https://github.com/NebulousLabs/Sia-UI/releases/latest) on your host computer, as it will automatically connect to the siad instance running within the Docker container. You can also just check via the command line by periodically running this command:

```bash
docker exec -it sianextcloud_sia_1 ./siac consensus
```

When Sia is synced, you will see `Synced: Yes` in the output, like this:

```
Synced: Yes
Block:      000000000000000fdd4d3b48b096e048ad78f8f4fb88d21a025cd5411950e57e
Height:     117094
Target:     [0 0 0 0 0 0 0 80 208 66 215 153 200 154 90 98 77 172 145 117 174 173 42 79 94 33 89 166 121 200 173 209]
Difficulty: 228263093718558163
```

## Load wallet with Siacoin

Next, you need to create a Siacoin wallet within the Docker container and send it at least 500 SC.

1. Create a new Sia wallet:
  ```bash
  docker exec -it sianextcloud_sia_1 ./siac wallet init
  ```
	
	Sia will generate a 29-word passphrase called a "wallet seed." This seed controls access to your Siacoin, so copy it to a safe place and be sure never to post it online. Sia confusingly displays a seed, followed by the password, which is identical. This surprises many users, but it is expected behavior.
1. After you create the wallet, you need to unlock it with your seed passphrase. Enter the command below, then paste in your seed.
```bash
docker exec -it sianextcloud_sia_1 ./siac wallet unlock
```
1. Finally,
```bash
docker exec -it sianextcloud_sia_1 ./siac wallet address
```
send Siacoin to the Sia instance in docker.  either [buy them](http://www.buyingsiacoin.com/) or [mine them](/windows-sia-mining/).

If you have an existing Sia wallet seed, do not re-use it in the Sia wallet within your Docker container. [Sia has undefined behavior](https://support.sia.tech/knowledge_base/topics/where-are-my-coins-were-they-stolen) if you run two wallets simultaneously with the same seed.
{: .notice--danger}

## Create renter contracts

# Configure NextCloud

```bash
DB_USER=root
DB_PASS=root
NEXTCLOUD_USER=admin
NEXTCLOUD_PASS=admin

docker exec --user www-data -it sianextcloud_nextcloud_1 ./occ maintenance:install \
  --database "sqlite" \
  --database-name "nextcloud" \
  --database-user "${DB_USER}" \
  --database-pass "${DB_PASS}" \
  --admin-user "${NEXTCLOUD_USER}" \
  --admin-pass "${NEXTCLOUD_PASS}"

docker exec --user www-data -it sianextcloud_nextcloud_1 php occ app:enable files_external

docker exec --user www-data -it sianextcloud_nextcloud_1 php occ files_external:create Sia sia null::null

docker exec --user www-data -it sianextcloud_nextcloud_1 php occ files_external:config 1 apiaddr siad_container:9980

docker exec --user www-data -it sianextcloud_nextcloud_1 php occ files_external:config 1 datadir /mnt/sia-uploads
```

# Limitations

## Instability
