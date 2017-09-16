---
title: Create Your Own Low-Cost Cloud Storage App with Sia and Nextcloud
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
header:
  teaser: images/resized/2017-08-06-sia-nextcloud/480/nextcloud-complete.png
tags:
- sia
- nextcloud
- docker
---

In today's post, I'm going to show you how to set up your own cloud storage web app, similar to Dropbox or Google Drive, but with substantially lower costs. This solution provides cloud storage at ~$0.60 per TB/month. By comparison, the same storage would cost $8.25 per month on Dropbox or $10 per month on Google Drive.

{% include image.html file="nextcloud-complete.png" alt="Completed Nextcloud install" img_link=true %}

# Video tutorial

I created a screencast that walks through the steps of this guide and demonstrates the final result. It achieves an identical result to this blog post, but performs more configuration in GUIs, whereas this blog post uses the command line whenever possible.

If you prefer video tutorials, I recommend you download the files in the ["Create files and folders for Docker"](#create-files-and-folders-for-docker) section below and then follow along with the video.

<iframe width="640" height="360" src="https://www.youtube.com/embed/i3G5RIXJCLk?rel=0&html5=1&origin={{ site.url }}" frameborder="0" allowfullscreen></iframe>

# Requirements

This guide is aimed at **intermediate users**. If you don't have any experience with Docker containers or virtual machines or you're not comfortable using the command line, it will be difficult for you to follow this guide.

{% include image.html file="bad-time.png" alt="You're gonna have a bad time" max_width="597px" class="align-center" %}

I used Windows 10 in the video demo, but this tutorial is completely system-agnostic. The steps I provide will work on any 64-bit operating system that supports Docker, which includes Windows, Mac OS X, Linux, and even some [network storage devices](/sia-via-docker).

To complete this guide, you will need:

* At least 500 Siacoin (SC)
  * You can either [buy it](http://www.buyingsiacoin.com/) or [mine it](/windows-sia-mining/).
* 6 GB of free disk space, preferably on a solid-state drive (SSD)
* [Docker Community Edition](https://store.docker.com/search?offering=community&type=edition) (free) installed on your system

# Time required

The steps in this guide require about **20 minutes** of active time. However, there are several points in the installation process where you must wait minutes to hours for Sia to complete processing, so the total time is 3-4 hours.

* **Create Docker containers**: 5 minutes
* **Configure Sia**: 10 minutes active time, 3-4 hours total time
* **Configure Nextcloud**: 5 minutes

# Components of this solution

## Sia

{% include image.html file="sia-logo.png" alt="Sia logo" max_width="260px" class="align-left" %}

I use **Sia** in this solution to provide backend storage for the web app. I've written [a few posts](/tags/#sia) about Sia previously, as it's one of my favorite new technologies. [Sia](https://sia.tech) is a decentralized file storage network. Users can connect to Sia and [rent out their unused disk space](/sia-via-docker/) to earn money. Prices on the Sia network are very low right now, which is how you can build a cloud storage solution and pay so little for disk space.

## Nextcloud

If you're familiar with Sia, you might be aware that Sia has its own graphical user interface, called [Sia-UI](https://github.com/NebulousLabs/Sia-UI). This UI is limited in functionality. Its main weakness is that it's a desktop app, so you can only access your files from a single computer. It doesn't support any media viewing, so if you want to view photos or video within your cloud storage, you have to copy the file to a folder on your local machine and open the copy.

{% include image.html file="nextcloud-logo.png" alt="Nextcloud logo" max_width="260px" class="align-right" %}

To overcome Sia-UI's limitations, I use **Nextcloud** in this tutorial. [Nextcloud](https://www.nextcloud.com) is an open-source cloud storage web app. It offers a web interface similar to Dropbox or Google Drive. Nextcloud is designed for compatibility with many different storage providers, including Amazon S3, Dropbox, and OpenStack. In February 2017, the Sia team wrote [a custom plugin](https://github.com/NebulousLabs/Sia-Nextcloud) for Nextcloud, which I will use to connect Nextcloud with Sia.

If you're interested in testing out Nextcloud before you proceed further you can try a [free, instant demo](https://demo.nextcloud.com/) on the Nextcloud website.

## Docker

{% include image.html file="docker-logo.png" alt="Docker logo" max_width="260px" class="align-right" %}

Nextcloud is tricky to install because it requires a database, a web server, and several third-party software libraries. Rather than go through the tedium of Nextcloud's installation process, I use **Docker** to handle the entire setup.

Docker allows developers to build apps in "containers." In Docker terms, a container is an isolated environment where the app has access to all the components that it needs to run and nothing extra. In this guide, you'll create containers for Sia and Nextcloud and use a feature called `docker-compose` to join them together so they can communicate.

# Set up Docker containers

## Create files and folders for Docker

To begin, you'll create a directory for this solution and download all the necessary files:

1. Create a directory called `sia-nextcloud`. You'll be downloading the full blockchain within this folder, so make sure it's on a drive with at least 6 GB of free space.
1. Download the three files below into the `sia-nextcloud` directory:
  * [`docker-compose.yml`](/files/sia-nextcloud/docker-compose.yml)
  * [`Dockerfile.nextcloud`](/files/sia-nextcloud/Dockerfile.nextcloud)
  * [`Dockerfile.sia`](/files/sia-nextcloud/Dockerfile.sia)
1. Within `sia-nextcloud` create two directories: `sia-data` and `sia-uploads`.

After downloading these files and creating the appropriate folders, your directory should look like this:

```text
sia-nextcloud/
  sia-data/
  sia-uploads/
  docker-compose.yml
  Dockerfile.nextcloud
  Dockerfile.sia
```

Below, I've included the full text of each file and a brief discussion of what each one is doing.

### docker-compose.yml

{% include files.html title="docker-compose.yml" language="yml" %}

This file defines the high-level architecture of the web app. It tells Docker how to load the Sia and Nextcloud containers and specifies the configuration options the containers need to communicate with each other.

This configuration maps ports within the containers to ports on your local machine, so the line `9980:9980` forwards port 9980 on your local machine to 9980 in the Sia container. This allows apps outside the Sia container to communicate with the Sia server within. Similarly, `8080:80` forwards your local machine's port 8080 to the container's web server port at 80. I chose 8080 because 80 is a privileged port on most systems and requires special permissions to access.

This configuration also sets up Docker storage volumes so that the containers can store data that persists even if the container itself is destroyed. `./sia-data:/mnt/sia-data` gives the Sia container access to the `sia-data/` folder you created above. Within the container, that path will appear as `/mnt/sia-data`. The `./sia-uploads:/mnt/sia-uploads` line achieves a similar effect.

Sia and Nextcloud expect to run on the same system with a single filesystem. In this tutorial's architecture, they are on different systems with independent filesystems, but the `sia-uploads` lines in both containers' configurations allow them to share a path for uploads, which is all that's necessary.

Finally, `nextcloud-data:/var/www/html` allows Nextcloud to persist its configuration information in a named Docker volume called `nextcloud-data`. This ensures that when you restart your Nextcloud container, you don't need to reconfigure Nextcloud from scratch.

### Dockerfile.sia

{% include files.html title="Dockerfile.sia" language="bash" %}

This is the Dockerfile for Sia. It creates a Docker container starting from the barebones Debian Jessie build of Linux. It then downloads the latest release of Sia (which is 1.3.0 as of this writing), unzips it, and runs `siad`, the Sia server daemon. The `--modules gctwr` flag loads only the Sia modules you need for renting Sia storage. The `--sia-directory /mnt/sia-data` flag ensures that Sia uses the persistent volume specified in `docker-compose.yml`.

The confusing part of this Dockerfile is the presence of `socat` and the `--api-addr localhost:8000` flag. [Despite my best efforts](https://github.com/NebulousLabs/Sia/issues/1386), the Sia developers refuse to allow `siad` to bind to non-localhost ports, even though this breaks Docker scenarios. As a workaround, this tutorial configures Sia to bind to `localhost:8000`. `socat` then binds to the non-localhost 9980 port and forward traffic to `localhost:8000`. It's a bit clunky, but it works.

### Dockerfile.nextcloud

{% include files.html title="Dockerfile.nextcloud" language="bash" %}

This file is straightforward because Nextcloud publishes its own Dockerfile. The only thing I added was a line to listen on port 80.

## Launch containers

With the Docker files and folders in place, you're ready to launch your containers. From a command prompt `cd` into your `sia-nextcloud` directory and enter the commands below:

```bash
docker-compose up -d
```

To check the status of your containers, use the `logs` command:

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

If you run `siac` within the container, you will see that Sia has begun syncing its blockchain with the Sia network:

```bash
docker exec -it sianextcloud_sia_1 ./siac consensus
```

```text
Synced: No
Height: 730
Progress (estimated): 0.6%
```

**Optional**: At this point, you can run [Sia-UI](https://github.com/NebulousLabs/Sia-UI/releases/latest) on your local machine to show a graphical display of what your Docker container's Sia server is doing. Sia-UI normally runs its own Sia server instance, but if it detects an existing instance of Sia listening on port 9980, it will connect to the existing server instead. Sia-UI gives you a more visual representation of Sia's activity, but it is purely optional in this tutorial.
{: .notice--info}

# Configure Sia

## Optional: Speed up blockchain sync

Sia needs to download its full blockchain before you can begin using it, but this process can take 1-3 days to complete. I've provided an optional workaround below to reduce the sync time to 30-60 minutes. If you prefer to wait for Sia to sync on its own, you can skip this step and proceed to the [next section](#complete-blockchain-sync).

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
1. Download the Sia [consensus.db file](https://consensus.siahub.info/consensus.db) from the latest [SiaHub](https://siahub.info) snapshot.
1. Copy the `consensus.db` file to `sia-nextcloud/sia-data/consensus/consensus.db` (overwriting the existing file).
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

**Warning**: If you have an existing Sia wallet seed, do not re-use it within your Docker container while your other wallet is running. [Sia has undefined behavior](https://support.sia.tech/knowledge_base/topics/where-are-my-coins-were-they-stolen) if you run two wallets simultaneously with the same seed.
{: .notice--danger}

To create a new Sia wallet, enter the command below:

```bash
docker exec -it sianextcloud_sia_1 ./siac wallet init
```

Sia will generate a 29-word passphrase called a "wallet seed" and display it in the console, similar to the example output below:

```text
guru delayed kidneys viewpoint rover request negative september number yodel aggravate
reheat soapy incur update later bimonthly bacon unusual godfather usher tiers pencil
ultimate vivid unsafe farming costume agile

Wallet encrypted with password:
guru delayed kidneys viewpoint rover request negative september number yodel aggravate
reheat soapy incur update later bimonthly bacon unusual godfather usher tiers pencil
ultimate vivid unsafe farming costume agile
```

This seed controls access to your Siacoin balance, so copy it to a safe place and be sure never to post it online. Sia confusingly displays a seed, followed by an identical password. This surprises many users, but it is Sia's intended behavior.

After you create the wallet, you need to unlock it with your seed passphrase. Enter the command below, then paste in the seed you generated above.

```bash
docker exec -it sianextcloud_sia_1 ./siac wallet unlock
```

Finally, generate a new Siacoin wallet address:

```bash
docker exec -it sianextcloud_sia_1 ./siac wallet address
```

Send at least 500 SC to the wallet you generated. If you don't have Siacoin available, you can either [buy it](http://www.buyingsiacoin.com/) or [mine it](/windows-sia-mining/).

## Create renter contracts

Sia requires you to purchase storage space up front, in the form of "renter contracts." The command below creates an allowance for Sia to purchase 500 SC of contracts for 12 weeks of storage.

```bash
docker exec -it sianextcloud_sia_1 ./siac renter setallowance 500SC 12w
```

At the time of this writing, 500 SC purchases ~2 TB of storage, so you can increase the contract amount if you need more storage. Prices will change over time as the value of Siacoin fluctuates and more renters and hosts enter the market, but your storage price is guaranteed for the duration of your contract.

**Note**: There is a fixed cost to creating rental contracts, so for small rental contracts, the costs don't scale linearly with the amount of storage you purchase. In other words, you can't simply divide the cost of 2 TB by 10 to purchase 200 GB for 50 SC because the cost of creating the contracts themselves is ~130 SC.
{: .notice--info}

After you create an allowance, Sia will begin forming storage contracts. This process takes 20-30 minutes to complete. You can check the number of contracts Sia has formed by running the following command:

```bash
docker exec -it sianextcloud_sia_1 ./siac renter contracts
```

Proceed to the next step when Sia has created at least 20 contracts.

# Configure Nextcloud

Sia is now ready to begin storing data, so it's time to configure your Nextcloud container.

You can configure Nextcloud either through the command line or through the web UI. This uses the command line method. If you prefer to set up Nextcloud via the web UI, you can visit [http://localhost:8080](http://localhost:8080) and follow the steps in my video tutorial, [starting at 13:44](https://youtu.be/i3G5RIXJCLk?t=13m44s).

## Install Nextcloud

When you load the Nextcloud Docker container, Nextcloud's files are present within the container, but Nextcloud is not yet installed, so your first step is to install Nextcloud with the command below.

```bash
docker exec --user www-data -it sianextcloud_nextcloud_1 ./occ maintenance:install --database "sqlite" --database-name "nextcloud"  --database-user "root" --database-pass "root" --admin-user "admin" --admin-pass "admin"
```

You should see the following:

```text
Nextcloud is not installed - only a limited number of commands are available
creating sqlite db
Nextcloud was successfully installed
```

The example command above uses `root`/`root` as the database credentials and `admin`/`admin` as the web app credentials. If you're deploying this on a trusted network, such as your within your home, it's fine to use these defaults. If you're deploying this system on an Internet-facing server, you should choose different, secure credentials.

## Enable external storage providers

Sia acts as an external storage provider in Nextcloud, so enter the following command to enable Nextcloud's support for external providers.

```bash
docker exec --user www-data -it sianextcloud_nextcloud_1 php occ app:enable files_external
```

## Install Sia Nextcloud app

It's time to install Nextcloud's Sia app. Unfortunately, it is not possible to install a Nextcloud app via the command line, so you'll need to perform these steps in a web browser.

**Note**: Nextcloud [recently added support](https://github.com/nextcloud/server/pull/5644) for performing app installs on the command line, but it looks like the feature won't be included in a Nextcloud release until version 13.0.
{: .notice--info}

1. Open [http://localhost:8080](http://localhost:8080) in your browser to access the NextCloud web app.
1. Enter the Nextcloud web app credentials you selected in the ["Install Nextcloud'](#install-nextcloud) step above. If you used the default credentials, this will be `admin`/`admin`.
  {% include image.html file="nextcloud-login.png" alt="Nextcloud login" img_link=true %}
{:start="3"}
1. At the Nextcloud home screen, click the gear icon in the upper right, then click "Apps".
  {% include image.html file="nextcloud-apps.png" alt="Nextcloud apps button" img_link=true %}
{:start="4"}
1. Click the "Tools" category in the left-hand menu.
  {% include image.html file="nextcloud-tools.png" alt="Nextcloud apps button" img_link=true %}
{:start="5"}
1. Scroll down to the "Sia storage report" app and click the "Enable" button below it.
  {% include image.html file="nextcloud-enable-sia.png" alt="Nextcloud apps button" img_link=true %}

## Configure Sia support

The last step of this process is connecting the Sia Nextcloud app to your Sia server instance. To do this, enter the commands below:

```bash
docker exec --user www-data -it sianextcloud_nextcloud_1 php occ files_external:create Sia sia null::null
docker exec --user www-data -it sianextcloud_nextcloud_1 php occ files_external:config 1 apiaddr siad_container:9980
docker exec --user www-data -it sianextcloud_nextcloud_1 php occ files_external:config 1 datadir /mnt/sia-uploads
```

Your Sia Nextcloud integration is complete!

If you open the Files tab of Nextcloud in your browser, you will see a Sia folder. Nextcloud will automatically back up all files in this folder to the Sia network.

{% include image.html file="nextcloud-sia-folder.png" alt="Nextcloud Sia folder" img_link=true %}

# Using Sia with Nextcloud

## Uploading and downloading files

When you upload a file to the Sia folder in Nextcloud, the app copies it to the `sia-uploads` folder you created earlier in the tutorial. Nextcloud then creates a backup of the file in the background by uploading it to the Sia network.

To save space locally, you can delete files that have been fully uploaded to Sia. You can check which files Sia has fully backed up with the following command:

```bash
docker exec -it sianextcloud_sia_1 ./siac renter -v
```

```text
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

Any file with a redundancy of 3.0 or greater is safe to delete from `sia-uploads`.

If you try to download or view a file that you deleted from `sia-uploads`, the Sia Nextcloud app will automatically re-download the file to make it available to you locally, though this may take seconds to minutes depending on the size of the file and your Internet speed.

## Limitations

### No subfolders

While Sia natively allows users to create folders to organize their uploads, the Sia Nextcloud app [does not support folder creation](https://github.com/NebulousLabs/Sia-Nextcloud/issues/13). The web app presents the option, but if you try adding a folder, it just says, "Could not create folder."

### No in-app text editing

The Nextcloud app includes a barebones text editor for editing plaintext files within your cloud storage folder. Unfortunately, this does not work on files within the Sia folder.  If you try to edit a text file in your Sia folder, Nextcloud presents you with a barrage of angry error messages and does not save any of your attempted edits.

# Conclusion

This tutorial showed you how to deploy your own instance of Nextcloud and add low-cost file backup with Sia.

I expect more and more apps to integrate with Sia in the coming months. A few days ago, [Sia announced](https://blog.sia.tech/introducing-s3-style-file-sharing-for-sia-through-the-new-minio-integration-bb880af2366a) a new integration with [Minio](https://www.minio.io/), a distributed object storage server. The techniques you used in this tutorial will help you deploy other apps and integrate them with Sia.

* **Update** (2017-09-13): The Minio integration is [almost complete](https://github.com/minio/minio/pull/4802).
