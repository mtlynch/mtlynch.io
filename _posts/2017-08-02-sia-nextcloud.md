---
title: 'Tutorial: Configuring NextCloud with Sia'
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

# Video tutorial
I created a video that walks through the steps of this guide and demonstrates the final result.
# Why NextCloud?
# Pre-requisites

This guide is aimed at **intermediate users**. Sia's integration with NextCloud is still very flaky as of this writing, so if you're not familiar with the concepts of containers or virtual machines or you're not comfortable using the command-line, it will be difficult for you to follow this guide.

This guide uses Windows for most examples, but all of the heavy lifting is happening within Docker, so this guide will work on any OS that supports Docker, which includes Windows, OS X, Linux, and even some [network storage devices](/sia-via-docker).

To complete this guide, you will need:

* At least 500 Siacoin (SC)
	 *  You can either [buy them](http://www.buyingsiacoin.com/) or [mine them](/windows-sia-mining/)
* 6 GB of free disk space (preferably on an SSD)
* [Docker Community Edition](https://store.docker.com/search?offering=community&type=edition) (free)

# Time required
The steps in this guide will take about **20 minutes** to complete. However, there are several points in the installation process where you must wait minutes to hours for Sia to complete processing, so the total time required for completing this guide is 3-4 hours.

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

When Sia has finished loading, you will see 

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
# Optional: Speed up blockchain sync
Sia needs to download its full blockchain before you can begin using it, but this process can take 1-3 days to complete. There is a workaround to complete the blockchain sync in 30-60 minutes, but it is optional.

If you would prefer to wait 1-3 days for Sia to sync on its own, skip to the next section.

If you would like to reduce the sync time to 30-60 minutes, follow the steps in this section.

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

# Load wallet with Siacoin

# Form renter contracts

# Configure NextCloud