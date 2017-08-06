---
title: Create Your Own Low-Cost Cloud Storage App with Sia and Nextcloud
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

In today's post, I'm going to show you how to build a cloud storage web app, similar to Dropbox or Google Drive, but with substantially lower storage costs. This solution provides cloud storage at ~$0.60 per TB per month. For comparison, Dropbox charges $8.25 per month and Google Drive charges $10 per month.

[![Completed Nextcloud install](/images/sia-nextcloud/nextcloud-complete.png)](/images/sia-nextcloud/nextcloud-complete.png){: .align-center}

Don't cancel your Dropbox subscription yet, because this technology is still a bit flaky. In my tests, it crashes quite a bit and sometimes loses entire files, but the technology is cool, so I wanted to share this tutorial to make it easy for you to try this out yourself.

# Video tutorial

I created a video that walks through the steps of this guide and demonstrates the final result. If you prefer video tutorials, I recommend you download the files in the ["Create files and folders for Docker"](#create-files-and-folders-for-docker) section below and watch the video to follow along with the steps.

<iframe width="640" height="360" src="https://www.youtube.com/embed/i3G5RIXJCLk?rel=0&html5=1&origin={{ site.url }}" frameborder="0" allowfullscreen></iframe>

# Requirements

This guide is aimed at **intermediate users**. Sia's integration with Nextcloud is still very flaky as of this writing, so if you don't have any experience with Docker containers or virtual machines or you're not comfortable using the command-line, it will be difficult for you to follow this guide.

![You're gonna have a bad time](/images/sia-nextcloud/bad-time.png){: .align-center}

I used Windows 10 in the video demo, but this tutorial is completely system-agnostic. The steps I provide will work on any operating system that supports Docker, which includes Windows, OS X, Linux, and even some [network storage devices](/sia-via-docker).

To complete this guide, you will need:

* At least 500 Siacoin (SC)
  * You can either [buy it](http://www.buyingsiacoin.com/) or [mine it](/windows-sia-mining/).
* 6 GB of free disk space, preferably on an solid-state drive (SSD)
* [Docker Community Edition](https://store.docker.com/search?offering=community&type=edition) (free) installed on your system

# Time required

The steps in this guide requires about **20 minutes** of active time. However, there are several points in the installation process where you must wait minutes to hours for Sia to complete processing, so the total time required for completing this guide is 3-4 hours.

# Components of this solution

## Sia

I use **Sia** in this solution to provide backend storage for the web app. I've written [a few posts](/tags/#sia) about Sia previously, as it's one of my favorite new technologies. [Sia](https://sia.tech) is a decentralized file storage network. Users can connect to Sia and [rent out their unused disk space](/sia-via-docker/) to earn money. Prices on this network are very low right now, which is how you can build a cloud storage solution and pay so little for disk space.

## Nextcloud

If you're familiar with Sia, you might be aware that Sia has their own graphical user interface, called Sia-UI. This UI is *extremely* limited in functionality. Its main weakness is that it's a desktop application, so you can only access your files from a single computer. It also lacks support for viewing files, so if you have content like photos, video, or documents, you can't display them within Sia-UI. You have to copy them to a separate folder on your computer and view the files there.

To overcome Sia-UI's limitations, I use **Nextcloud**. [Nextcloud](https://www.nextcloud.com) is an open-source cloud storage web app. It offers a web interface very similar to DropBox or Google Drive. Nextcloud is designed for compatibility with many different storage providers, including Amazon S3, Dropbox, and OpenStack. In February 2017, the Sia team wrote [a Sia plugin](https://github.com/NebulousLabs/Sia-Nextcloud) for Nextcloud, which I will use to connect Nextcloud and Sia.

If you want to try out Nextcloud before you deploy your own solution with this blog post, you can try a free demo [here](https://demo.nextcloud.com/).

## Docker

Nextcloud is pretty tricky to install because it requires a database server, a web server, and several software libraries. Rather than explain to you how to go through all those installation or configuration steps, we'll be using **Docker** to take care of all of that for us.

Docker allows developers to build applications in "containers." In Docker terms, a container is an isolated environment where the app has access to all the components that it needs to run and nothing extra. We'll be creating containers for Sia and Nextcloud and using a feature called `docker-compose` to join the two containers together so they can communicate with each other.

# Set up Docker containers

## Create files and folders for Docker

To begin, create a directory for all the Docker files and download the configuration files for your containers.

1. Create a directory called `sia-nextcloud`. You'll be downloading the full blockchain within this folder, so make sure it's on a drive with at least 6 GB of free space.
1. Within `sia-nextcloud` create two directories: `sia-data` and `sia-uploads`.
1. Download the three files below into `sia-nextcloud`:
  * [`docker-compose.yml`](/files/sia-nextcloud/docker-compose.yml)
  * [`Dockerfile.nextcloud`](/files/sia-nextcloud/Dockerfile.nextcloud)
  * [`Dockerfile.sia`](/files/sia-nextcloud/Dockerfile.sia)

After downloading these files and creating the appropriate folders, your directory should look like this:

```text
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

This is the top-level file for our solution. It tells Docker how to load the Sia and Nextcloud containers and specifies the configuration options the containers need to communicate with each other.

It maps ports within the containers to ports on your local machine, so the line `9980:9980` forwards port 9980 on your local machine to 9980 in the Sia container. This allows applications outside the Sia container to communicate with the Sia server within. Similarly, `8080:80` forwards your local machine's port 8080 to the container's web server port at 80. I chose 8080 because 80 is a privileged port on most systems and requires special permissions to access.

This configuration also sets up volumes so that the containers can store data that persists even if the container itself is destroyed. `./sia-data:/mnt/sia-data` gives the Sia container access to the `sia-data/` folder you created above. Within the container, that path will appear as `/mnt/sia-data`. The `./sia-uploads:/mnt/sia-uploads` line achieves a similar effect. Sia and Nextcloud expect to run on the same system with a single filesystem. In my architecture, they are on different systems with indpependent filesystems, but the `sia-uploads` lines in both containers' configurations allow them to share a filesystem path for uploads, which is sufficient for this system's needs. Finally, `nextcloud-data:/var/www/html` allows Nextcloud to persist its configuration information in a named Docker volume called `nextcloud-data`. This ensures that when you restart the Nextcloud container, you don't need to go through all the steps of setting up a fresh Nextcloud server.

`Dockerfile.sia`

{% include files.html title="Dockerfile.sia" language="bash" %}

This is the Dockerfile for Sia. It creates a Docker container starting from the very barebones Debian Jessie build of Linux. It then downloads the latest release of Sia (which is 1.3.0 as of this writing), unzips it, and runs `siad`, the Sia server daemon. The `--modules gctwr` flag limits Sia's modules to only those needed for acting as a renter. The `--sia-directory /mnt/sia-data` flag ensures that Sia uses the persist volume that's specified in `docker-compose.yml`.

The confusing part of this Dockerfile is the presence of `socat` and the `--api-addr localhost:8000` flag. [Despite my best efforts](https://github.com/NebulousLabs/Sia/issues/1386), the Sia developers refuse to allow `siad` to bind to non-localhost ports, even though this breaks Docker scenarios. As a workaround, I configure Sia to bind to `localhost:8000` and then use the socat tool to bind to the public 9980 port and forward traffic to 8000. It's a bit clunky, but it works.

`Dockerfile.nextcloud`

{% include files.html title="Dockerfile.nextcloud" language="bash" %}

This file is very straightforward because Nextcloud publishes its own Dockerfile. The only thing I added was a line to listen on port 80.

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

```text
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

```text
Synced: No
Height: 730
Progress (estimated): 0.6%
```

**Optional**: At this point, you can run [Sia-UI](https://github.com/NebulousLabs/Sia-UI/releases/latest) on your local machine to get a graphical display of what your Sia server is doing within the Docker container. Sia-UI normally runs its own Sia server instance, but if it detects an existing instance of Sia listening on port 9980, it will connect to the existing server. Sia-UI is useful in giving you a more visual representation of the actions Sia is performing, but it's not necessary that you run Sia-UI.

# Configure Sia

## Optional: Speed up blockchain sync

Sia needs to download its full blockchain before you can begin using it, but this process can take 1-3 days to complete. This step provides a workaround to reduce the sync time to 30-60 minutes. If you would prefer to wait 1-3 days for Sia to sync on its own, you can skip this step and proceed to the [next section](#complete-blockchain-sync).

To apply the blockchain sync workaround:

1. Shut down the Docker containers.
  ```bash
  # Tell Sia to shut down gracefully.
  docker exec -it sianextcloud_sia_1 ./siac stop
  # Give Sia a few seconds to shut down gracefully.
  sleep 5
  # Stop the Docker containers.
  docker-compose down
  ```
1. Download the Sia [consensus.db file](https://consensus.siahub.info/consensus.db) (this uses [SiaHub](https://siahub.info)'s latest snapshot).
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

In my tests, this process took 50 minutes on an SSD. If you're running Sia on a hard-disk drive (HDD), it will take several hours.

## Complete blockchain sync

Now, you need to wait for Sia to finish syncing its blockchain. You can check on status by periodically running this command:

```bash
docker exec -it sianextcloud_sia_1 ./siac consensus
```

When Sia is synced, you will see `Synced: Yes` in the output, like this:

```text
Synced: Yes
Block:      000000000000000fdd4d3b48b096e048ad78f8f4fb88d21a025cd5411950e57e
Height:     117094
Target:     [0 0 0 0 0 0 0 80 208 66 215 153 200 154 90 98 77 172 145 117 174 173 42 79 94 33 89 166 121 200 173 209]
Difficulty: 228263093718558163
```

## Load wallet with Siacoin

Next, you need to create a Siacoin wallet within the Docker container and send it at least 500 SC.

Create a new Sia wallet:

```bash
docker exec -it sianextcloud_sia_1 ./siac wallet init
```

Sia will generate a 29-word passphrase called a "wallet seed" and display it in the console, similar to the below:

```text
guru delayed kidneys viewpoint rover request negative september number yodel aggravate
reheat soapy incur update later bimonthly bacon unusual godfather usher tiers pencil
ultimate vivid unsafe farming costume agile

Wallet encrypted with password:
guru delayed kidneys viewpoint rover request negative september number yodel aggravate
reheat soapy incur update later bimonthly bacon unusual godfather usher tiers pencil
ultimate vivid unsafe farming costume agile
```

This seed controls access to your Siacoin, so copy it to a safe place and be sure never to post it online (unless you're writing a Sia tutorial). Sia confusingly displays a seed, followed by an identical password. This surprises many users, but it is Sia's intended behavior.

After you create the wallet, you need to unlock it with your seed passphrase. Enter the command below, then paste in the seed you generated above.

```bash
docker exec -it sianextcloud_sia_1 ./siac wallet unlock
```

Finally, generate a new Siacoin wallet address, and send at least 500 SC to that wallet. If you don't have Siacoin available, you can either [buy it](http://www.buyingsiacoin.com/) or [mine it](/windows-sia-mining/).

```bash
docker exec -it sianextcloud_sia_1 ./siac wallet address
```

**Warning**: If you have an existing Sia wallet seed, do not re-use it in the Sia wallet within your Docker container. [Sia has undefined behavior](https://support.sia.tech/knowledge_base/topics/where-are-my-coins-were-they-stolen) if you run two wallets simultaneously with the same seed.
{: .notice--danger}

## Create renter contracts

Unlike most cloud storage providers that use a pay-as-you-go model, Sia requires you to purchase storage space up front, in the form of "renter contracts." To purchase a set of renter contracts for your Nextcloud setup, enter the following command:

```bash
docker exec -it sianextcloud_sia_1 ./siac renter setallowance 500SC 12w
```

In my tests, 500 SC was enough to purchase ~2 TB of storage space, but prices will change over time as the network evolves.

**Note**: There is a fixed cost to creating rental contracts, so for small rental contracts, the costs don't quite scale linearly with the amount of storage you purchase. In other words, you can't simply divide by 10 and try to spend 50 SC on 200 GB because the cost of creating the contracts themselves is ~130 SC.
{: .notice--info}

After you create an allowance, Sia will begin forming storage contracts. This process takes 20-30 minutes to complete. You can check on the number of contracts formed by running the following command:

```bash
docker exec -it sianextcloud_sia_1 ./siac renter contracts
```

Proceed to the next step when Sia has created at least twenty contracts.

# Configure Nextcloud

Sia is now all set to begin storing data, so it's time to configure your Nextcloud container.

If you prefer, you can visit [http://localhost:8080](http://localhost:8080) and configure Nextcloud via the web UI based on the steps in the video tutorial, [starting at 13:44](https://youtu.be/i3G5RIXJCLk?t=13m44s). But, since this tutorial is mainly command-line based, I've included the steps to perform this configuration mostly via command-line.

## Install Nextcloud

The command below uses `root`/`root` as the database credentials and `admin`/`admin` as the web app credentials. If you're deploying this on a trusted network, such as your home network, it's fine to use these defaults. If you're deploying this system on a server that is Internet-facing, you should choose your own, secure credentials.

```bash
docker exec --user www-data -it sianextcloud_nextcloud_1 ./occ maintenance:install --database "sqlite" --database-name "nextcloud"  --database-user "root" --database-pass "root" --admin-user "admin" --admin-pass "admin"
```

You should see the following:

```text
Nextcloud is not installed - only a limited number of commands are available
creating sqlite db
Nextcloud was successfully installed
```

## Enable external storage providers

Sia is an external storage provider in Nextcloud, so enter the following command to enable support for external providers.

```bash
docker exec --user www-data -it sianextcloud_nextcloud_1 php occ app:enable files_external
```

## Install Sia Nextcloud app

Unfortunately, it is not possible to install a Nextcloud app through the command line, so you'll need to perform these steps in a web browser:

1. Go to [http://localhost:8080](http://localhost:8080) to access the NextCloud web app.
1. Enter the Nextcloud web app credentials you selected in the ["Install Nextcloud'](#install-nextcloud) step above. If you used the default credentials, this will be `admin`/`admin`.
  [![Nextcloud login](/images/sia-nextcloud/nextcloud-login.png)](/images/sia-nextcloud/nextcloud-login.png)
1. At the Nextcloud home screen, click the gear icon in the upper right, then click "Apps".
  [![Nextcloud apps button](/images/sia-nextcloud/nextcloud-apps.png)](/images/sia-nextcloud/nextcloud-apps.png)
1. Click the "Tools" category in the lefthand menu.
  [![Nextcloud apps button](/images/sia-nextcloud/nextcloud-tools.png)](/images/sia-nextcloud/nextcloud-tools.png)
1. Scroll down to the app "Sia storage report" and click the "Enable" button below it.
  [![Nextcloud apps button](/images/sia-nextcloud/nextcloud-enable-sia.png)](/images/sia-nextcloud/nextcloud-enable-sia.png)
	
Nextcloud [recently added support](https://github.com/nextcloud/server/pull/5644) for performing app installs on the command line, but it looks like the feature won't be included in a Nextcloud release until version 13.0.

## Configure Sia support

The last step is to connect the Sia Nextcloud app to your Sia server instance. To do this, enter the commands below:

```bash
docker exec --user www-data -it sianextcloud_nextcloud_1 php occ files_external:create Sia sia null::null
docker exec --user www-data -it sianextcloud_nextcloud_1 php occ files_external:config 1 apiaddr siad_container:9980
docker exec --user www-data -it sianextcloud_nextcloud_1 php occ files_external:config 1 datadir /mnt/sia-uploads
```

Your integration is now complete. If you navigate to the Files tab of Nextcloud, you will see a Sia folder available.

[![Nextcloud Sia folder](/images/sia-nextcloud/nextcloud-sia-folder.png)](/images/sia-nextcloud/nextcloud-sia-folder.png)

# Using your Sia folder
When you upload a file to the Sia folder in Nextcloud, the app copies it to the `sia-uploads` folder you created earlier in the tutorial. It then uses this copy to upload the file to the Sia network.

To save space locally, you can delete files that have been uploaded to Sia with 3x redundancy. You can check this with the following command:

```bash
docker exec -it sianextcloud_sia_1 ./siac renter -v
```

```
Renter info:
        Storage Spending:  1.449 SC
        Upload Spending:   48.65 mS
        Download Spending: 3.887 mS
        Unspent Funds:     217.7 SC
        Total Allocated:   219.2 SC

Tracking 8 files:
File size  Available  Progress  Redundancy  Renewing  Sia path
  5.60 MB  Yes          86.67%        2.60  Yes       08 Hospital Beds.mp3
143.12 MB  Yes         101.67%        3.00  Yes       Futurama - s01e08 - A Big Piece Of Garbage.mp4
175.37 MB  Yes         100.67%        3.00  Yes       Futurama - s01e09 - Hell Is Other Robots.mp4
  3.72 MB  Yes          56.67%        1.70  Yes       IMG_20170725_204611.jpg
  3.37 MB  Yes         100.00%        3.00  Yes       IMG_20170725_204704.jpg
  3.39 MB  Yes         100.00%        3.00  Yes       IMG_20170725_204727.jpg
  3.64 MB  Yes          96.67%        2.90  Yes       IMG_20170725_204928.jpg
  3.25 MB  Yes          63.33%        1.90  Yes       IMG_20170725_204944.jpg
```
# Limitations

## Instability and data loss

This is a big one. In my tests, the Sia Nextcloud integration does not appear to be ready for real world use quite yet.

When I try uploading a few ~100 MB files at a time, the Sia server instance crashes. When I restart it, it often has lost several files that it had previously uploaded to full 3x redundancy. It's not clear whether this is a bug in the Sia server itself or a bug that is limited to the Sia Nextcloud app.

## No subfolders

While Sia natively allows users to create folders to organize their uploads, the Sia Nextcloud app [does not support folder creation](https://github.com/NebulousLabs/Sia-Nextcloud/issues/13). The web app presents the option, but if you try adding a folder, it just says"Could not create folder."

## No in-app text editing

The Nextcloud app includes a barebones text editor for editing plaintext files within your cloud storage folder. Unfortunately, this does not work on files within Sia.  If you try, Nextcloud presents you with a barrage of angry error messages and does not save any of your attempted edits.

# Conclusion


I hope this tutorial will make it easier to use and test the Sia Nextcloud integration for the Sia dev team and the community of contributors. A few days ago, [Sia announced](https://blog.sia.tech/introducing-s3-style-file-sharing-for-sia-through-the-new-minio-integration-bb880af2366a) a similar integration with the distributed object storage server Minio. I haven't tested this integration yet, but you should be able to create a similar solution using the techniques I described here.