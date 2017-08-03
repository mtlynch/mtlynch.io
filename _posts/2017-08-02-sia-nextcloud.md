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

I created a video that walks through the steps of this guide and demonstrates the final result. If you prefer video tutorials, I recommend you download the files below and watch the video to follow along with the steps of this blog.

# Components of this solution

## Sia

I've written [a few posts](/tags/#sia) about Sia previously, as it's one of my favorite new technologies. Sia is a decentralized file storage network. Users can connect to Sia and [rent out their unused disk space](/sia-via-docker/) to earn money. Prices on this network are very low right now, which is why we're able to 

We use Sia in our solution to provide backend storage for our web application. Sia provides a graphical user interface, Sia-UI, but it's very limited in functionality, as Sia's real product is their API, the interface that other applications use to interact with the Sia network. In the video demo, I keep Sia-UI running to give more insight into how we're using Sia in this solution, but we don't need Sia-UI to run at all for this solution to work.

## NextCloud

If you're familiar with Sia, you might be aware that Sia has their own graphical user interface, called Sia-UI. This UI is *extremely* limited in functionality. Its main limitation is that it's a desktop application, so you can only access your files from a single computer. If you have content like photos, video, or documents, you can't view them within Sia-UI. You have to copy them to a separate folder on your computer and view the files there.

NextCloud is an open-source cloud storage web application. It offers a web interface very similar to . You can try a free demo [here](https://demo.nextcloud.com/).

## Docker

Docker is a technology that allows developers to build applications in "containers." In Docker terms, a container is an isolated runtime environment where the running app has access to all the components that it needs to run and very little extra.

# Pre-requisites

This guide is aimed at **intermediate users**. Sia's integration with NextCloud is still very flaky as of this writing, so if you don't have any experience with Docker containers or virtual machines or you're not comfortable using the command-line, it will be difficult for you to follow this guide.

This guide uses Windows for most examples, but all of the heavy lifting is happening within Docker, so this guide will work on any OS that supports Docker, which includes Windows, OS X, Linux, and even some [network storage devices](/sia-via-docker).

To complete this guide, you will need:

* At least 500 Siacoin (SC)
	 *  You can either [buy them](http://www.buyingsiacoin.com/) or [mine them](/windows-sia-mining/).
* 6 GB of free disk space (preferably on an SSD)
* [Docker Community Edition](https://store.docker.com/search?offering=community&type=edition) (free)

# Time required
The steps in this guide requires about **20 minutes** of active time. However, there are several points in the installation process where you must wait minutes to hours for Sia to complete processing, so the total time required for completing this guide is 3-4 hours.

# Create files and folders

`docker-compose.yml`

{% include files.html title="docker-compose.yml.txt" %}

`Dockerfile.sia`

{% include files.html title="Dockerfile.sia" %}

`Dockerfile.nextcloud`

{% include files.html title="Dockerfile.nextcloud" %}

After downloading these files and creating the appropriate folders, your directory should look like this:

```
sia-nextcloud/
  sia-data/
  sia-uploads/
  docker-compose.yml
  Dockerfile.nextcloud
  Dockerfile.sia
```

# Launch containers

```bash
docker-compose up -d
```

You can check status with the `logs` command:

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
# Optional: Speed up blockchain sync
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

# Complete blockchain sync
Now, you need to wait for Sia to finish syncing its blockchain. You can check on status by running [Sia-UI](https://github.com/NebulousLabs/Sia-UI/releases/latest) on your host computer, as it will automatically connect to the siad instance running within the Docker container. You can also just check via the command line by periodically running this command:

```
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

# Load wallet with Siacoin

Next, you need to create a Siacoin wallet within the Docker container and fill it with some Siacoin.


```
docker exec -it sianextcloud_sia_1 ./siac wallet init
```

send Siacoin to the Sia instance in docker.  either [buy them](http://www.buyingsiacoin.com/) or [mine them](/windows-sia-mining/).

If you have an existing Sia wallet seed, do not re-use it in this new wallet, as [Sia has undefined behavior](https://support.sia.tech/knowledge_base/topics/where-are-my-coins-were-they-stolen) if you run two wallets simultaneously with the same seed.

# Form renter contracts

# Configure NextCloud