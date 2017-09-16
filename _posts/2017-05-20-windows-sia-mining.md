---
title: A Beginner's Guide to Mining Siacoin
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
date: '2017-05-20 00:00:00'
header:
  related: images/resized/2017-05-20-windows-sia-mining/480/siamining-pool.png
tags:
- siacoin
- cryptocurrency
- mining
- sia
excerpt: A step-by-step guide from zero to mining automation
---

{% include base_path %}

# Overview

[Sia](https://sia.tech/) is a decentralized, peer-to-peer network for buying and
selling computer storage space.

Users pay for transactions within Sia using a cryptocurrency called Siacoin. Like Bitcoin, Sia relies on "miners" to supply computing power to the network. These miners are paid for their contributions in Siacoin.

In this guide, I'll show you how to generate money when you're not using your Windows PC by setting it up to mine Siacoin.

# Why mine Siacoin?

If  your PC supports high-end gaming or graphic design, your graphics card may have the potential to generate extra income through Siacoin mining.

Even if you don't have top of the line graphics hardware, you still may be able to earn a significant amount of money mining Siacoin. I mine with an [NVIDIA GTX 970](http://amzn.to/2r1RPJw), which was released almost three years ago. It generates ~2,000 Siacoin per week. At current Siacoin prices ($6.72 USD per thousand Siacoin), this is equivalent to a weekly revenue of ~$13 USD. This is not bad, considering I don't need to put in any work after the initial setup. You can estimate your own profit from mining by using the [minings earning calculator](http://siapulse.com/page/tools) on SiaPulse.

If you're not looking for extra income, maybe you're interested in playing with cryptocurrency. Siacoin mining provides an easy, low-risk way to get your feet wet.

# Time Required

This guide looks long, but it's just because there are lots of screenshots. I estimate that it only takes about **20 minutes** to get started with mining.

| Task | Time |
|-------|--------|
| Installing software | 5-10 minutes |
| Creating  a Siacoin wallet | 5 minutes (fast method) / 3 days (slow method) |
| Setting up automatic mining | 5 minutes |
| **Total** | **~20 minutes** |

# Software versions

This guide uses the latest version of each software component at the time of writing:

* Sia-UI v.1.2.1
* CUDA v.8.0.61
* OpenCL 2.0
* Marlin v.1.0.0
* Windows 10 (will also work on Windows 7, Windows 8, Windows 8.1)

# Find your graphics card type

Siacoin mining uses your computer's graphics card (which I'll refer to as "GPU" for graphics processing unit).

Different GPUs require different software, so follow the steps below to determine your GPU type:

1. Hit Win+R to open the run dialog.
1. Type `devmgmt.msc` and hit Enter.
  {% include image.html file="run-window-devicemgr.png" alt="Run devicemgr" max_width="399px" %}
{:start="3"}
1. Expand the "Display adapters" entry

You should see something like the following:

{% include image.html file="device-manager.png" alt="Device Manager&#58; Display adapters" %}

Note whether your GPU begins with "NVIDIA" or "AMD."

* If you have an **NVIDIA** GPU, you will install **CUDA**.
* If you have an **AMD** GPU, you will install **OpenCL**.

If you see something else, you likely don't have a compatible GPU. This means you won't be able to mine Siacoin, but check the [mining hardware section](#siacoin-mining-hardware) (below) to see what mining-ready GPUs are available for your next build.

# Install GPU library

In order to run a Siacoin miner, you must install the correct library for the mining software to communicate with your computer's GPU.

## Install CUDA (for NVIDIA GPUs)

If you have an NVIDIA GPU, you'll need to install CUDA. For AMD GPUs, skip to the [next section](#install-opencl-for-amd-gpus).

1. Go to [https://developer.nvidia.com/cuda-downloads](https://developer.nvidia.com/cuda-downloads)
1. Next to "Operating System," click "Windows."
1. Click the version that corresponds to your version of Windows.
1. For "Installer Type" click "exe (network)."
1. Click "Download."
1. Open the downloaded file and proceed through the installation using the default options.

## Install OpenCL (for AMD GPUs)

If you have an AMD GPU, you'll need OpenCL. It may be installed already, as it is included with many AMD drivers, but to ensure you have the latest version, follow the steps below.

1. Go to [https://support.amd.com/en-us/download](https://support.amd.com/en-us/download)
1. Under "Automatically Detect and Install Your Driver" click "Download Now"
1. Open the downloaded file and proceed through the installation using the default options.

# Install a Siacoin miner

There are a few different Siacoin miners to choose from, but they all offer similar features and performance. This guide uses the Marlin miner because it is compatible with both CUDA and OpenCL, but you might want to check out [other mining options](https://siawiki.tech/mining/software).

To install Marlin, follow the steps below:

1. Go to the [Marlin miner](https://github.com/SiaMining/marlin/releases/latest) download page.
1. Click the link for "Windows (64-bit)" to download the Marlin package.
1. When the download completes, open it and unzip to `C:\marlin`
  {% include image.html file="extract-to.png" alt="Extract Marlin" max_width="614px" %}
{:start="4"}
1. Hit Win+R to open the Windows run dialog.
1. Type `cmd` and hit Enter.
  {% include image.html file="cmd.png" alt="Run cmd" max_width="399px" %}
{:start="6"}
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

# Generate a Siacoin wallet

In order to mine, you'll need a Siacoin wallet to store the coins you earn. There are currently two main options for Siacoin wallets, which I describe below.

## Poloniex - The quick 'n dirty way

The fastest way to create a Siacoin wallet is to use [Poloniex](https://www.poloniex.com/), a cryptocurrency exchange. Poloniex provides a web wallet, so you can create an account and generate a Siacoin wallet instantly.

The downside is that you have to trust Poloniex to keep your Siacoin secure. There have not been any major security breaches at Poloniex that cost their customers money, but many other exchanges have had issues with this, and Poloniex is by no means immune.

I recommend *starting* with Poloniex as you build familiarity with Siacoin and mining. Once you become comfortable, create a wallet with Sia-UI, move your Siacoin from Poloniex to your Sia-UI wallet, and set your Sia-UI address as your new mining address.

To create a wallet with Poloniex, follow the steps below:

1. Go to [Poloniex](https://www.poloniex.com/).
1. Create a new account and log in.
1. From the upper right menu, click Balances > Deposits & Withdrawals.
  {% include image.html file="poloniex-balances.png" alt="Poloniex balances button" %}
{:start="4"}
1. Find "**SC** - Siacoin" in the list of cryptocurrencies and click the "Deposit" link on that row
  {% include image.html file="siacoin-deposit.png" alt="Poloniex deposit button" %}

You will see a long series of letters and numbers. This is your Siacoin wallet address.

{% include image.html file="poloniex-address.png" alt="Poloniex deposit address" %}

Save this address and proceed to the [Start mining](#start-mining) step.

## Sia-UI - The better, but slower way

*If you created a wallet with Poloniex, you can skip this section.*

Sia-UI is Sia's official Windows app. Developed and maintained by the Sia developers, it is the most secure and powerful Sia wallet available (though this is somewhat by virtue of it being the *only* Windows wallet available).

### Download and Launch Sia-UI

1. Go to the [Sia-UI download page](https://github.com/NebulousLabs/Sia-UI/releases/latest)
1. Click the link ending in `-win32-x64.zip` (e.g. `Sia-UI-vXX.YY.ZZ-win32-x64.zip`)
1. Extract the downloaded file to `C:\Sia-UI`
  {% include image.html file="extract-sia-ui.png" alt="Extract Sia-UI" max_width="616px" %}
{:start="4"}
1. Click "Sia-UI" in the extracted files.
  {% include image.html file="explorer-sia-ui.png" alt="image" max_width="" %}
{: start="5"}
1. A Windows Firewall dialog will appear asking if you want to give Sia access. Click "Allow".
  {% include image.html file="sia-allow-access.png" alt="image" max_width="531px" %}

### Set up Sia-UI wallet

You'll see a progress bar in the upper right corner that represents Sia-UI's progress synchronizing your app with the rest of the Sia network. While you wait for synchronization to reach 100%,  create your Siacoin wallet with the steps below:

1. In the lefthand sidebar, click the "Wallet" button.
  {% include image.html file="sia-ui-wallet.png" alt="image" %}
{:start="2"}
1. Click "Create a new wallet."
  {% include image.html file="sia-ui-create-wallet.png" alt="Sia-UI create wallet" %}
{:start="3"}
1. Sia-UI then displays your wallet seed. This is a series of words that gives you access to your Siacoin wallet.
  * **Save your wallet seed**. Either write it down on paper or save it to a text file.
  * Sia offers to let you choose a wallet *password* that is distinct from your wallet *seed*. For simplicity, leave the password as is so that it will match your seed.
  * **Important**: You'll need your wallet seed to access your wallet every time you start Sia-UI. If you lose your wallet seed, you can never recover the money inside your wallet.
  * **Important**: Anyone who has your wallet seed controls your Siacoin balance. Never post your wallet seed online (unless you're writing a Siacoin mining tutorial).

  {% include image.html file="sia-seed.png" alt="Sia-UI seed" %}
{:start="4"}
1. Click the button that says "I have written these down in a safe place."
1. Because Sia-UI maintains a healthy skepticism of its users, the next screen challenges you to enter the wallet seed you just saved. Type in the seed you saved in step 3 and click "Unlock."
  {% include image.html file="sia-unlock.png" alt="Sia-UI enter seed" %}

At this point, Sia-UI will likely still be synchronizing with the rest of the network. Unfortunately, you can't use your wallet until this process completes.

First-time synchronization is *sloooooow*. It can take hours to days to get synchronized depending on your disk speed and network connection. I posted a [workaround on reddit](https://www.reddit.com/r/siacoin/comments/6c7fk5/complete_your_sia_firsttime_blockchain_sync_in_20/) that reduces the wait time to ~20 minutes, so check that out if you don't feel like waiting.

When you're finally synchronized, click the "Receive Siacoin" button in the wallet screen:

  {% include image.html file="sia-ui-receive-siacoin.png" alt="Sia-UI receive siacoin" %}

You will see a long series of letters and numbers. This is your Siacoin wallet address.

{% include image.html file="sia-ui-address.png" alt="Sia-UI address" %}

Save this address and proceed to the [Start mining](#start-mining) step.

*Note*: Every time you click the "Receive Siacoin" button, Sia will generate a new wallet address for you. This is normal. You will still receive payments sent to any of your previously generated addresses. If you want to see a full list of your wallet addresses, go to the "Terminal" view and type `wallet addresses`.

# Start mining

You're ready to start mining! To begin, follow the steps below:

1. Open Notepad
1. Go to File > Open and enter `C:\marlin\marlin.bat`
1. Under "Your Payout Address" change the address to your own Siacoin wallet address.
  {% include image.html file="marlin-bat.png" alt="Marlin batch file" %}
{:start="4"}
1. Go to File > Save and close Notepad.
1. Go to `C:\marlin` in Windows Explorer.
1. Double-click on `marlin.bat`.
  {% include image.html file="explorer-marlin.png" alt="Marlin in Explorer" max_width="604px" %}
{:start="7"}
1. If you get a security warning, click "Run."
  {% include image.html file="marlin-warning.png" alt="Marlin warning" max_width="466px" %}

You're mining! You should see output like the following:

```text
2017/05/19 22:55:17 Starting marlin 1.0.0
2017/05/19 22:55:18 CUDA (driver version 8.0)
2017/05/19 22:55:18  [0] GeForce GTX 970 (CC 5.2)
2017/05/19 22:55:18 OpenCL: NVIDIA CUDA
2017/05/19 22:55:18  [1] GPU: GeForce GTX 970
2017/05/19 22:55:18 [0] Initializing GeForce GTX 970
2017/05/19 22:55:18 Connecting to siamining.com:3333...
2017/05/19 22:55:18 Difficulty set to 17G
2017/05/19 22:55:18 New block ...fa4d65e6 detected, difficulty 43P
2017/05/19 22:55:18 Authentication successful
2017/05/19 22:55:18 [0] Initialized, work size 268435456
2017/05/19 22:55:18 [0] Accepted 2b5b471d D: 42G/17G  965.8 MH/s
2017/05/19 22:55:18 [0] Accepted 0c1e4a1f D: 23G/17G  965.8 MH/s
2017/05/19 22:55:20 [0] Accepted 727c0e70 D: 50G/17G  967.5 MH/s
2017/05/19 22:55:23 [0] Accepted f1eede1e D: 46G/17G  966.2 MH/s
```

Close the window to stop mining.

If you configured your Siacoin wallet address correctly in Marlin's settings, you will see your mining activity in the SiaMining dashboard:

* `https://siamining.com/addresses/[your siacoin address]`

I'll go into more details about the SiaMining pool [below](#using-the-mining-pool).

You'll notice that your system responds sluggishly while you're running the miner. This is because mining consumes all available graphics resources, which makes it difficult for you to use your computer normally. Don't worry. We'll address this in the next section.

# Configure miner to run automatically

You're all set up and generating Siacoin, but there's a problem: mining monopolizes your graphics processor and makes it difficult for you to do anything else on your computer.

You could start the miner when you leave your computer and turn it off when you return, but that's a pain.

Instead, you can use a handy feature built in to Windows called Task Scheduler. It allows you to configure Siacoin mining like a screensaver - it runs when you're away and automatically shuts off when you return.

Configuring a scheduled task is a bit tedious. To save you the trouble, I've created a task configuration file you can import into Task Scheduler through the steps below:

1. Download my Sia Mining Task configuration file: [SiaMiningTask.xml]({{ base_path }}/files/SiaMiningTask.xml) (right-click and hit "Save link as...").
1. Hit Win+R to open the Windows run dialog.
1. Type `control schedtasks` and hit Enter.
  {% include image.html file="run-schedtasks.png" alt="Run Task Scheduler" max_width="399px" %}
{:start="4"}
1. Task Scheduler will appear. From the right hand menu, click "Import Task..."
1. Specify the `SiaMiningTask.xml` file you downloaded in step 1.

This will create a pre-populated task for you with the correct settings for your Siacoin miner. Click "OK" to finish creating the task.

With this task created, your PC will mine Siacoin automatically any time you leave the mouse and keyboard untouched for ten minutes. As soon as you touch the mouse or keyboard, mining stops so as not to interfere with your normal usage.

# Using the mining pool

Mining is a game of chance. Your machine is doing repeated calculations with random numbers hoping to discover a solution to an equation that the Siacoin network needs at the given moment. The computer that finds a solution receives a miner's reward. The reward is currently ~200,000 Siacoin (~$1,300 USD). A solution is found roughly once every ten minutes, but due to the number of miners active, it is possible for your miner to go months without getting lucky and stumbling on a solution.

This guide configures your miner to participate in the SiaMining *pool* to give you a more regular and predictable mining income stream. With a mining pool, all participants implicitly agree to share effort and share rewards proportionally. The SiaMining pool takes a 3% fee for administering this system.

The SiaMining pool provides a dashboard that allows you to monitor your miner's activity:

* `https://siamining.com/addresses/[your siacoin address]`

{% include image.html file="siamining-pool.png" alt="SiaMining screenshot" img_link="true" %}

When the unpaid balance for your wallet address reaches 500 Siacoin, the pool pays out your rewards. Within six hours, you will see a deposit in your wallet for a little over 500 Siacoin.

My particular GPU reaches the payout threshold about once per week. Your experience will vary depending on the performance of your GPU, the percentage of time your miner is running, and the number of other active Siacoin miners.

# Cashing out your Siacoin

Now that you've accumulated some Siacoin, you probably want a way of spending them.

There are cryptocurrency exchanges that allow you to sell Siacoin, but they don't support converting Siacoin directly to fiat (e.g. dollars, Euros). You need to convert your Siacoin in two stages:

1. Convert Siacoin to Bitcoin.
1. Convert Bitcoin to fiat currency.

You may also consider holding your Siacoin as an investment. Over the past year, Siacoin's value has increased 35-fold (e.g. $100 of Siacoin purchased a year ago would be worth ~$3,500 today). Siacoin has been trading for less than two years. By comparison, when Bitcoin was this age, its price was ~$5 per coin. Today, Bitcoin is worth almost $2,000 per coin.

That said, the future of cryptocurrencies is highly unpredictable. In a year or two, Siacoin may be worthless. Consider your tolerance for risk when deciding to hold or sell your Siacoin.

## Converting Siacoin to Bitcoin

There are a few options for converting your Siacoin to Bitcoin:

* [ShapeShift](https://shapeshift.io): (*recommended*) ShapeShift is simple and fast because there's no signup required. Just give them your Bitcoin address, and they'll give you a Siacoin deposit address. You send Siacoin and receive your Bitcoins. Boom. Done.
* [Poloniex](https://poloniex.com): Poloniex is the other major exchange that supports Siacoin. It's more complicated than ShapeShift, and they sometimes hold up your transactions for hours, but they usually get the job done.
* [BitSquare](https://bitsquare.io): (*for advanced users*) BitSquare is a decentralized, peer-to-peer exchange. Trading is slower and involves more steps, but can give you better rates than traditional exchanges. BitSquare also supports converting Siacoin directly to fiat, but you're relying on another person not to rip you off. If you choose this option, take steps protect yourself from fraud.

## Converting Bitcoin to fiat currency (regular money)

Bitcoin has been around longer and the ecosystem is much more mature, so you have several options for cashing out your Bitcoins. Bitcoin exchanges are beyond the scope of this post, but here are a few places to start.

* [Gemini](https://gemini.com/): Caters to US customers.
* [BitStamp](https://www.bitstamp.net): Caters to European customers.
* [LocalBitcoins](https://localbitcoins.com/): A private, peer-to-peer Bitcoin exchange.

A [more comprehensive list](https://bitcoin.org/en/exchanges) is available at bitcoin.org.

# Siacoin mining hardware

The tables below show estimated mining performance of different GPUs. These numbers are based on anonymous, self-reported data from a mix of systems, aggregated from Sia mining wikis. Don't expect 100% accuracy, but they should give you a rough idea of how different systems perform.

The performance metric is a function of how many million mining calculations the chip can do per second (measured in megahashes per second or MH/s). The rate that a GPU generates mining income is directly proportional to its MH/s. In other words, all things being equal, a 2,000 MH/s GPU will generate twice as much income as a 1,000 MH/s GPU.

For each GPU chip, I've provided an example GPU product that contains that chip, but the same GPU chip is generally available from a variety of manufacturers.

## NVIDIA GPUs

GPU | Performance (MH/s) | Example
---|---|---
GTX 660 | 300 | [EVGA GeForce GTX 660](http://amzn.to/2qAGdM8)
GTX 670 | 400 | [ASUS GeForce GTX 670](http://amzn.to/2qH58Mg)
GTX 970 | 895 | [EVGA GeForce GTX 970](http://amzn.to/2r25sIO)
GTX 980 | 1,290 | [GIGABYTE GeForce GTX 980](http://amzn.to/2qDGgY5)
GTX Titan X | 1,300 | [EVGA GeForce GTX TITAN X](http://amzn.to/2q2Rulz)
GTX 980 Ti | 1,540 | [GIGABYTE GeForce GTX 980Ti](http://amzn.to/2qH6bvP)
GTX 980 Ti Hybrid | 1,725 | [EVGA GeForce GTX 980 Ti](http://amzn.to/2rBvkbA)
GTX 1080 FE | 2,190 | [EVGA GeForce GTX 1080 Founders Edition](http://amzn.to/2q2OKoj)

## AMD GPUs

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

**Update (2017-06-30)**: On June 23rd, 2017, Sia [announced](https://www.reddit.com/r/siacoin/comments/6j1gyg/obelisks_sia_asics_full_details/) an upcoming Siacoin ASIC miner called the [Obelisk](https://obelisk.tech/), expected to produce 100 times the hash rate of a GPU. The Obelisk is targeting a ship date between March and June 2018. When Obelisk customers begin using their devices, GPU mining for Siacoin will become unprofitable. If you plan to invest in GPU hardware, keep in mind that your Siacoin mining revenues will end soon after the Obelisk ships.

# Caveats

Here are a few things to keep in mind as you begin Siacoin mining:

* Heat: Siacoin mining adds considerable stress to your GPU and may reduce its lifetime. Monitor your GPU's heat to make sure mining is not heating it to the point of damaging to your system.
* Taxes: Many jurisdictions consider cryptocurrency mining profits to be taxable income. If you convert to fiat through an exchange such as Coinbase or Gemini, they are legally required to share your financial information with tax authorities if requested.
* Electricity costs: Your GPU consumes more electricity when it is mining Siacoin than when it is doing less intensive tasks such as browsing Facebook. Be sure to take the cost of electricity into account when considering your mining profit.

# Earning Siacoin by hosting

Another way of earning Siacoin is by renting out your unused hard disk space. The Siacoin hosting economy hasn't  reached critical mass yet, and hosting is suited for more advanced users, but if you're interested, I wrote a [Guide to Hosting Sia on a Synology NAS]({{ base_path }}/sia-via-docker/).

# Troubleshooting

Having trouble getting up and running? Here are some common issues readers have run into and how to fix them.

## Miner crashes immediately

**Symptoms**: When you run `marlin.bat` a command window pops up and immediately closes.

This usually happens because the mining settings are too intense for your GPU. To fix this, follow the steps below

1. Open Notepad
1. Go to File > Open and enter `C:\marlin\marlin.bat`
1. Under "Your Payout Address" change the address to your own Siacoin wallet address.
  {% include image.html file="lower-intensity.png" alt="Marlin batch file" %}
{:start="4"}
1. Go to File > Save and close Notepad.
1. Try running `marlin.bat` again.

If it succeeds, repeat these steps with increasing intensity until you find the highest intensity that is still stable.

If it fails after you've lowered the intensity, try the following:

1. Hit Win+R to open the Windows run dialog.
1. Type `cmd` and hit Enter.
  {% include image.html file="cmd.png" alt="Run cmd" max_width="399px" %}
{:start="3"}
1. In the Command Prompt, type the following:

    ```
cd C:\marlin
marlin.bat
    ```

This won't fix the issue, but the window will stay open so that you can see the error message Marlin is producing before it crashes.

## Miner shows 0 MH/s

**Symptoms**: The Marlin miner runs, but shows a hash rate of 0 MH/s.

This can happen if the mining settings are too intense for your GPU. To fix this, follow the same steps for [Miner crashes immediately](#miner-crashes-immediately).
