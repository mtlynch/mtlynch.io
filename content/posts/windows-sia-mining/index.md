---
title: A Beginner's Guide to Mining Siacoin
tags:
- siacoin
- cryptocurrency
- mining
- sia
description: A step-by-step guide from zero to mining automation
lastmod: '2018-01-27T21:47:00-05:00'
date: '2017-05-20'
images:
- windows-sia-mining/luxor-mining-pool.png
---

{{<notice type="warning">}}
**This guide is out of date.**

This post describes mining Sia with a desktop graphics card (GPU), but [custom mining hardware](https://obelisk.tech) is now available for Sia. The custom hardware has made Sia GPU mining non-viable. This guide will still work, but you may never reach payout, even with a high-end GPU.
{{< /notice >}}

## Overview

[Sia](https://sia.tech/) is a decentralized, peer-to-peer network for buying and
selling computer storage space.

Users pay for transactions within Sia using a cryptocurrency called Siacoin. Like Bitcoin, Sia relies on "miners" to supply computing power to the network. These miners are paid for their contributions in Siacoin.

In this guide, I'll show you how to generate money when you're not using your Windows PC by setting it up to mine Siacoin.

## Time Required

This guide looks long, but it's just because there are lots of screenshots. I estimate that it only takes about **20 minutes** to get started with mining.

| Task | Time |
|-------|--------|
| Installing software | 5-10 minutes |
| Creating  a Siacoin wallet | 5 minutes (fast method) / 3 days (slow method) |
| Setting up automatic mining | 5 minutes |
| **Total** | **~20 minutes** |

## Software versions

This guide uses the latest version of each software component at the time of writing:

* Sia-UI v.1.3.1
* CUDA v.8.0.61
* OpenCL 2.0
* Marlin v.1.0.0
* Windows 10 (will also work on Windows 7, Windows 8, Windows 8.1)

## Find your graphics card type

Siacoin mining uses your computer's graphics card (which I'll refer to as "GPU" for graphics processing unit).

Different GPUs require different software, so follow the steps below to determine your GPU type:

1. Hit Win+R to open the run dialog.
1. Type `devmgmt.msc` and hit Enter.
  {{< img src="run-window-devicemgr.png" alt="Run devicemgr" maxWidth="399px" >}}
1. Expand the "Display adapters" entry

You should see something like the following:

{{< img src="device-manager.png" alt="Device Manager&#58; Display adapters" >}}

Note whether your GPU begins with "NVIDIA" or "AMD."

* If you have an **NVIDIA** GPU, you will install **CUDA**.
* If you have an **AMD** GPU, you will install **OpenCL**.

If you see something else, you likely don't have a compatible GPU. This means you won't be able to mine Siacoin, but check the [mining hardware section](#siacoin-mining-hardware) (below) to see what mining-ready GPUs are available for your next build.

## Install GPU library

In order to run a Siacoin miner, you must install the correct library for the mining software to communicate with your computer's GPU.

### Install CUDA (for NVIDIA GPUs)

If you have an NVIDIA GPU, you'll need to install CUDA. For AMD GPUs, skip to the [next section](#install-opencl-for-amd-gpus).

1. Go to [https://developer.nvidia.com/cuda-downloads](https://developer.nvidia.com/cuda-downloads)
1. Next to "Operating System," click "Windows."
1. Click the version that corresponds to your version of Windows.
1. For "Installer Type" click "exe (network)."
1. Click "Download."
1. Open the downloaded file and proceed through the installation using the default options.

### Install OpenCL (for AMD GPUs)

If you have an AMD GPU, you'll need OpenCL. It may be installed already, as it is included with many AMD drivers, but to ensure you have the latest version, follow the steps below.

1. Go to [https://www.amd.com/en/support](https://www.amd.com/en/support)
1. Under "Automatically Detect and Install Your Driver" click "Download Now"
1. Open the downloaded file and proceed through the installation using the default options.

## Install a Siacoin miner

There are a few different Siacoin miners to choose from, but they all offer similar features and performance. This guide uses the Marlin miner because it is compatible with both CUDA and OpenCL, but you might want to check out [other mining options](https://siawiki.tech/mining/software).

To install Marlin, follow the steps below:

1. Go to the [Marlin miner](https://github.com/SiaMining/marlin/releases/latest) download page.
1. Click the link for "Windows (64-bit)" to download the Marlin package.
1. When the download completes, open it and unzip to `C:\marlin`
  {{< img src="extract-to.png" alt="Extract Marlin" maxWidth="614px" >}}
1. Hit Win+R to open the Windows run dialog.
1. Type `cmd` and hit Enter.
  {{< img src="cmd.png" alt="Run cmd" maxWidth="399px" >}}
1. In the Command Prompt, type the following:

    ```
    C:\marlin\marlin.exe --selftest
    ```

You should see output that says `PASS` on each line:

    2017/05/18 20:24:30 Starting marlin 1.0.0
    2017/05/18 20:24:31 OpenCL error: cannot load OpenCL.dll
    2017/05/18 20:24:31 CUDA (driver version 8.0)
    2017/05/18 20:24:31  [0] GeForce GTX 970 (CC 5.2)
    2017/05/18 20:24:31 [0] default   : PASS
    2017/05/18 20:24:31 [0] m1p0      : PASS
    2017/05/18 20:24:31 [0] m1p1      : PASS
    2017/05/18 20:24:31 [0] m1p1x32   : PASS
    2017/05/18 20:24:31 [0] m1p4x32   : PASS
    2017/05/18 20:24:31 [0] m2p0      : PASS
    2017/05/18 20:24:31 [0] m2p1      : PASS
    2017/05/18 20:24:31 [0] m2p1x32   : PASS
    2017/05/18 20:24:31 [0] m2p2      : PASS
    2017/05/18 20:24:31 [0] m2p2x32   : PASS
    2017/05/18 20:24:31 [0] m2p4      : PASS
    2017/05/18 20:24:31 [0] m2p4x32   : PASS
    2017/05/18 20:24:31 [0] x1p1      : PASS
    2017/05/18 20:24:31 [0] x1p1x32   : PASS
    2017/05/18 20:24:31 [0] x1p2x32   : PASS
    2017/05/18 20:24:31 [0] x1p3x32   : PASS
    2017/05/18 20:24:31 [0] x1p4x32   : PASS
    2017/05/18 20:24:31 [0] x1p5x32   : PASS

This verifies that your GPU library is installed correctly and your miner is able to access it. All you need now is a Siacoin wallet and you'll be ready to begin mining.

## Generate a Siacoin wallet

In order to mine, you'll need a Siacoin wallet to store the coins you earn. There are currently two main options for Siacoin wallets, which I describe below.

### Bittrex - The quick 'n dirty way

The fastest way to create a Siacoin wallet is to use [Bittrex](https://www.bittrex.com/), a cryptocurrency exchange. Bittrex provides a web wallet, so you can create an account and generate a Siacoin wallet instantly.

The downside is that you have to trust Bittrex to keep your Siacoin secure. There have not been any major security breaches at Bittrex that cost their customers money, but many other exchanges have had issues with this, and Bittrex is by no means immune.

I recommend *starting* with Bittrex as you build familiarity with Siacoin and mining. Once you become comfortable, create a wallet with Sia-UI, move your Siacoin from Bittrex to your Sia-UI wallet, and set your Sia-UI address as your new mining address.

To create a wallet with Bittrex, follow the steps below:

1. Go to [Bittrex](https://www.bittrex.com/).
1. Create a new account and log in.
1. From the upper right menu, click Wallets.
  {{< img src="bittrex-wallet-button.png" alt="Bittrex wallet button" maxWidth="800px" >}}
1. Type `siacoin` in the search bar.
  {{< img src="bittrex-search.png" alt="Bittrex search bar" maxWidth="800px" >}}
1. In the "Siacoin" row that appears, click the + sign.
  {{< img src="siacoin-deposit.png" alt="Bittrex deposit button" maxWidth="800px" >}}
1. You will see a pop-up window showing a long series of letters and numbers. This is your Siacoin wallet address.
{{< img src="bittrex-address.png" alt="Bittrex deposit address" maxWidth="500px" >}}
1. Save this address and proceed to the [Start mining](#start-mining) step.

### Sia-UI - The better, but slower way

*If you created a wallet with Bittrex, you can skip this section.*

Sia-UI is Sia's official Windows app. Developed and maintained by the Sia developers, it is the most secure and powerful Sia wallet available (though this is somewhat by virtue of it being the *only* Windows wallet available).

#### Download and Launch Sia-UI

1. Go to the [Sia-UI download page](https://github.com/NebulousLabs/Sia-UI/releases/latest)
1. Click the link ending in `-win32-x64.zip` (e.g. `Sia-UI-vXX.YY.ZZ-win32-x64.zip`)
1. Extract the downloaded file to `C:\Sia-UI`
  {{< img src="extract-sia-ui.png" alt="Extract Sia-UI" maxWidth="616px" >}}
1. Click "Sia-UI" in the extracted files.
  {{< img src="explorer-sia-ui.png" alt="image" >}}
1. A Windows Firewall dialog will appear asking if you want to give Sia access. Click "Allow".
  {{< img src="sia-allow-access.png" alt="image" maxWidth="531px" >}}

#### Set up Sia-UI wallet

You'll see a progress bar in the upper right corner that represents Sia-UI's progress synchronizing your app with the rest of the Sia network. While you wait for synchronization to reach 100%,  create your Siacoin wallet with the steps below:

1. In the lefthand sidebar, click the "Wallet" button.
  {{< img src="sia-ui-wallet.png" alt="image" >}}
1. Click "Create a new wallet."
  {{< img src="sia-ui-create-wallet.png" alt="Sia-UI create wallet" >}}
1. Sia-UI then displays your wallet seed. This is a series of words that gives you access to your Siacoin wallet.
  * **Save your wallet seed**. Either write it down on paper or save it to a text file.
  * Sia offers to let you choose a wallet *password* that is distinct from your wallet *seed*. For simplicity, leave the password as is so that it will match your seed.
  * **Important**: You'll need your wallet seed to access your wallet every time you start Sia-UI. If you lose your wallet seed, you can never recover the money inside your wallet.
  * **Important**: Anyone who has your wallet seed controls your Siacoin balance. Never post your wallet seed online (unless you're writing a Siacoin mining tutorial).

  {{< img src="sia-seed.png" alt="Sia-UI seed" >}}
1. Click the button that says "I have written these down in a safe place."
1. Because Sia-UI maintains a healthy skepticism of its users, the next screen challenges you to enter the wallet seed you just saved. Type in the seed you saved in step 3 and click "Confirm."
  {{< img src="sia-password-and-seed.png" alt="Sia-UI enter seed and password" >}}
1. [Bizzarely](https://github.com/NebulousLabs/Sia/issues/2592), Sia-UI then asks you to confirm the seed *again*, so paste it one final time and click "Unlock."
  {{< img src="sia-unlock.png" alt="Sia-UI enter seed" >}}

At this point, Sia-UI will likely still be synchronizing with the rest of the network. Unfortunately, you can't use your wallet until this process completes.

First-time synchronization is *sloooooow*. It can take hours to days to get synchronized depending on your disk speed and network connection. I posted a [workaround on reddit](https://www.reddit.com/r/siacoin/comments/6c7fk5/complete_your_sia_firsttime_blockchain_sync_in_20/) that reduces the wait time to ~20 minutes, so check that out if you don't feel like waiting.

When you're finally synchronized, click the "Receive Siacoin" button in the wallet screen:

  {{< img src="sia-ui-receive-siacoin.png" alt="Sia-UI save address" >}}

You will see a "Receiving Address" field and a "Description" field. In the Description, type `Mining revenues` (or whatever label you prefer):

{{< img src="sia-ui-address.png" alt="Sia-UI receive siacoin" >}}

Sia will now show your Siacoin receiving address labeled `Mining revenues`. You can access it at any time by hitting the "Receive Siacoin" button.

{{< img src="sia-ui-address2.png" alt="Sia-UI address" >}}

## Start mining

You're ready to start mining! To begin, follow the steps below:

1. Open Notepad
1. Go to File > Open and enter `C:\marlin\marlin.bat`
1. Replace the file contents with the following:

```text
SET payout_address=YOUR SIACOIN WALLET ADDRESS
SET intensity=18
SET pool_server=us-east.luxor.tech:3333

marlin.exe --user %payout_address% --intensity %intensity% --host %pool_server%
```

1. Change `YOUR SIACOIN WALLET ADDRESS` to your own wallet address. The file should look like the following:
  {{< img src="marlin-bat.png" alt="Marlin batch file" >}}
1. Go to File > Save and close Notepad.
1. Go to `C:\marlin` in Windows Explorer.
1. Double-click on `marlin.bat`.
  {{< img src="explorer-marlin.png" alt="Marlin in Explorer" maxWidth="604px" >}}
1. If you get a security warning, click "Run."
  {{< img src="marlin-warning.png" alt="Marlin warning" maxWidth="466px" >}}

You're mining! You should see output like the following:

```text
2017/11/08 11:59:15 Starting marlin 1.0.0
2017/11/08 11:59:15 CUDA (driver version 9.1)
2017/11/08 11:59:15  [0] GeForce GTX 970 (CC 5.2)
2017/11/08 11:59:15 OpenCL: NVIDIA CUDA
2017/11/08 11:59:15  [1] GPU: GeForce GTX 970
2017/11/08 11:59:15 Connecting to us-east.luxor.tech:3333...
2017/11/08 11:59:15 [0] Initializing GeForce GTX 970
2017/11/08 11:59:15 Difficulty set to 107G
2017/11/08 11:59:15 New block ...72226449 detected, difficulty 147P
2017/11/08 11:59:15 Authentication successful
2017/11/08 11:59:16 [0] Initialized, work size 262144
2017/11/08 11:59:16 [0] Accepted 2b5b471d D: 42G/17G  965.8 MH/s
2017/11/08 11:59:18 [0] Accepted 0c1e4a1f D: 23G/17G  965.8 MH/s
2017/11/08 11:59:18 [0] Accepted 727c0e70 D: 50G/17G  967.5 MH/s
2017/11/08 11:59:21 [0] Accepted f1eede1e D: 46G/17G  966.2 MH/s
```

Close the window to stop mining.

If you configured your Siacoin wallet address correctly in Marlin's settings, you will see your mining activity in the Luxor dashboard:

* `https://sia.luxor.tech/miners/your siacoin address`

I'll go into more details about the Luxor mining pool [below](#using-the-mining-pool).

You'll notice that your system responds sluggishly while you're running the miner. This is because mining consumes all available graphics resources, which makes it difficult for you to use your computer normally. Don't worry. We'll address this in the next section.

## Configure miner to run automatically

You're all set up and generating Siacoin, but there's a problem: mining monopolizes your graphics processor and makes it difficult for you to do anything else on your computer.

You could start the miner when you leave your computer and turn it off when you return, but that's a pain.

Instead, you can use a handy feature built in to Windows called Task Scheduler. It allows you to configure Siacoin mining like a screensaver - it runs when you're away and automatically shuts off when you return.

Configuring a scheduled task is a bit tedious. To save you the trouble, I've created a task configuration file you can import into Task Scheduler through the steps below:

1. Download my Sia Mining Task configuration file: [SiaMiningTask.xml](SiaMiningTask.xml) (right-click and hit "Save link as...").
1. Hit Win+R to open the Windows run dialog.
1. Type `control schedtasks` and hit Enter.
  {{< img src="run-schedtasks.png" alt="Run Task Scheduler" maxWidth="399px" >}}
1. Task Scheduler will appear. From the right hand menu, click "Import Task..."
1. Specify the `SiaMiningTask.xml` file you downloaded in step 1.

This will create a pre-populated task for you with the correct settings for your Siacoin miner. Click "OK" to finish creating the task.

With this task created, your PC will mine Siacoin automatically any time you leave the mouse and keyboard untouched for ten minutes. As soon as you touch the mouse or keyboard, mining stops so as not to interfere with your normal usage.

## Using the mining pool

Mining is a game of chance. Your machine is doing repeated calculations with random numbers hoping to discover a solution to an equation that the Siacoin network needs at the given moment. The computer that finds a solution receives a miner's reward. The reward is currently ~200,000 Siacoin (~$1,300 USD). A solution is found roughly once every ten minutes, but due to the number of miners active, it is possible for your miner to go months without getting lucky and stumbling on a solution.

This guide configures your miner to participate in the Luxor mining *pool* to give you a more regular and predictable mining income stream. With a mining pool, all participants implicitly agree to share effort and share rewards proportionally. The Luxor mining pool takes a 0.3% fee for administering this system. This fee is unusually low for a mining pool and will likely increase to 2-3% by next 2018.

The Luxor mining pool provides a dashboard that allows you to monitor your miner's activity:

* `https://sia.luxor.tech/miners/your siacoin address`

{{< img src="luxor-mining-pool.png" alt="Luxor screenshot" >}}

When the unpaid balance for your wallet address reaches 500 Siacoin, the pool pays out your rewards. Within six hours, you will see a deposit in your wallet for a little over 500 Siacoin.

My particular GPU reaches the payout threshold about once every two weeks (as of November 2017). Your experience will vary depending on the performance of your GPU, the percentage of time your miner is running, and the number of other active Siacoin miners.

## Cashing out your Siacoin

Now that you've accumulated some Siacoin, you probably want a way of spending them.

There are cryptocurrency exchanges that allow you to sell Siacoin, but they don't support converting Siacoin directly to fiat (e.g. dollars, Euros). You need to convert your Siacoin in two stages:

1. Convert Siacoin to Bitcoin.
1. Convert Bitcoin to fiat currency.

### Converting Siacoin to Bitcoin

There are a few options for converting your Siacoin to Bitcoin:

* [Bittrex](https://bittrex.com): (*recommended*) Bittrex has historically provided the most solid support for Siacoin.
* [ShapeShift](https://shapeshift.io): ShapeShift is simple and fast because there's no signup required. Just give them your Bitcoin address, and they'll give you a Siacoin deposit address. Unfortunately, their support for Siacoin is rather erratic and they only offer Siacoin exchanges intermittently.
* [Bisq](https://bisq.io): (*for advanced users*) Bisq (formerly BitSquare) is a decentralized, peer-to-peer exchange. Trading is slower and involves more steps, but can give you better rates than traditional exchanges. Bisq also supports converting Siacoin directly to fiat, but you're relying on another person not to rip you off. If you choose this option, take steps protect yourself from fraud.
* ~~Poloniex~~: Poloniex was once the leading exchange for Siacoin, but their support and platform has been awful for most of 2017, frequently freezing users' funds for weeks without any communication. I recommend avoiding Poloniex if you have any other exchange option.

### Converting Bitcoin to fiat currency (regular money)

Bitcoin has been around longer and the ecosystem is much more mature, so you have several options for cashing out your Bitcoins. Bitcoin exchanges are beyond the scope of this post, but here are a few places to start.

* [Gemini](https://gemini.com/): Caters to US customers.
* [BitStamp](https://www.bitstamp.net): Caters to European customers.
* [LocalBitcoins](https://localbitcoins.com/): A private, peer-to-peer Bitcoin exchange.

A [more comprehensive list](https://bitcoin.org/en/exchanges) is available at bitcoin.org.

## Siacoin mining hardware

The tables below show estimated mining performance of different GPUs. These numbers are based on anonymous, self-reported data from a mix of systems, aggregated from Sia mining wikis. Don't expect 100% accuracy, but they should give you a rough idea of how different systems perform.

The performance metric is a function of how many million mining calculations the chip can do per second (measured in megahashes per second or MH/s). The rate that a GPU generates mining income is directly proportional to its MH/s. In other words, all things being equal, a 2,000 MH/s GPU will generate twice as much income as a 1,000 MH/s GPU.

For each GPU chip, I've provided an example GPU product that contains that chip, but the same GPU chip is generally available from a variety of manufacturers.

### NVIDIA GPUs

GPU | Performance (MH/s) | Example
---|---|---
GTX 660 | 300 | [EVGA GeForce GTX 660](http://amzn.to/2qAGdM8)
GTX 670 | 400 | [ASUS GeForce GTX 670](http://amzn.to/2qH58Mg)
GTX 970 | 895 | [EVGA GeForce GTX 970](http://amzn.to/2r25sIO)
GTX 980 | 1,290 | [GIGABYTE GeForce GTX 980](http://amzn.to/2qDGgY5)
GTX Titan X | 1,300 | [EVGA GeForce GTX TITAN X](http://amzn.to/2q2Rulz)
GTX 980 Ti | 1,540 | [GIGABYTE GeForce GTX 980Ti](http://amzn.to/2qH6bvP)
GTX 980 Ti Hybrid | 1,725 | [EVGA GeForce GTX 980 Ti](https://amzn.to/2MNRd5L)
GTX 1080 FE | 2,190 | [EVGA GeForce GTX 1080 Founders Edition](https://amzn.to/2GyHpW0)

### AMD GPUs

GPU | Performance (MH/s) | Example
---|---|---
R9 270X | 635 | [Gigabyte R9 270X](http://amzn.to/2q2Pxpb)
R9 380 | 750 | [ASUS STRIX Radeon R9 380](http://amzn.to/2q2Rjqy)
HD 7970 | 790 | [Sapphire Radeon HD 7970](http://amzn.to/2q2AeNo)
R9 290 | 1,050 | [Sapphire Radeon R9 290](http://amzn.to/2rBk2Ut)
R9 290X | 1,200 | [Sapphire Radeon R9 290X](http://amzn.to/2rBSvkZ)
R9 390x | 1,200 | [Sapphire Radeon NITRO R9 390X](http://amzn.to/2q2APyO)
R9 Nano | 1,600 | [XFX Radeon R9 Nano](http://amzn.to/2q2PUAb)
R9 Fury X | 1,800 | [XFX RADEON R9 FURY X](http://amzn.to/2q2PZ6X)
R9 295x2 | 2,250 | [Sapphire Radeon R9 295X2](http://amzn.to/2q2Xtqs)

I do **not** recommend buying a GPU for the express purpose of mining Siacoin. Your profits are determined by Siacoin's market price and the number of other active miners on the network. These variables can change drastically at any time.

If you're buying a new GPU anyway, and you're interested in Siacoin mining performance as a factor in your decision, the tables above can help you decide.

## Caveats

Here are a few things to keep in mind as you begin Siacoin mining:

* Heat: Siacoin mining adds considerable stress to your GPU and may reduce its lifetime. Monitor your GPU's heat to make sure mining is not heating it to the point of damaging to your system.
* Taxes: Many jurisdictions consider cryptocurrency mining profits to be taxable income. If you convert to fiat through an exchange such as Coinbase or Gemini, they are legally required to share your financial information with tax authorities if requested.
* Electricity costs: Your GPU consumes more electricity when it is mining Siacoin than when it is doing less intensive tasks such as browsing Facebook. Be sure to take the cost of electricity into account when considering your mining profit.

## Earning Siacoin by hosting

Another way of earning Siacoin is by renting out your unused hard disk space. The Siacoin hosting economy hasn't  reached critical mass yet, and hosting is suited for more advanced users, but if you're interested, I wrote a [Guide to Hosting Sia on a Synology NAS](/sia-via-docker/).

## Troubleshooting

Having trouble getting up and running? Here are some common issues readers have run into and how to fix them.

### Miner crashes immediately

**Symptoms**: When you run `marlin.bat` a command window pops up and immediately closes.

This usually happens because the mining settings are too intense for your GPU. To fix this, follow the steps below

1. Open Notepad
1. Go to File > Open and enter `C:\marlin\marlin.bat`
1. Change the `intensity` value to `1`.
  {{< img src="lower-intensity.png" alt="Marlin batch file" >}}
1. Go to File > Save and close Notepad.
1. Try running `marlin.bat` again.

If it succeeds, repeat these steps with increasing intensity until you find the highest intensity that is still stable.

If it fails after you've lowered the intensity, try the following:

1. Hit Win+R to open the Windows run dialog.
1. Type `cmd` and hit Enter.
  {{< img src="cmd.png" alt="Run cmd" maxWidth="399px" >}}
1. In the Command Prompt, type the following:
```
cd C:\marlin
marlin.bat
```

This won't fix the issue, but the window will stay open so that you can see the error message Marlin is producing before it crashes.

### Miner shows 0 MH/s

**Symptoms**: The Marlin miner runs, but shows a hash rate of 0 MH/s.

This can happen if the mining settings are too intense for your GPU. To fix this, follow the same steps for [Miner crashes immediately](#miner-crashes-immediately).
