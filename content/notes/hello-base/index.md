---
title: "My Feedback about Hello Base"
date: 2024-12-05
tags:
  - ethereum
---

## The cryptocurrency language barrier

There's an unforunate language barrier among technologists right now.

Cryptocurrency enthusiasts are excited about the ecosystem and what's going on in crypto-world right now. They're trying to bring new people in, but they're often so entrenched in their crypto bubble that they struggle to explain any crypto stuff to non-crypto people.

I feel like I'm a good candidate to bridge the language gap, as I understand the fundamentals of cryptocurrency but I haven't been following any crypto stuff closely for about seven years.

## Base is supposed to be the bridge

A year ago, I listented to [an interview with Jesse Pollak on an episode of _Into the Bytecode_](https://www.intothebytecode.com/jesse-pollak/). He was excited about this new technology Coinbase was working on called [Base](https://base.org).

Base is supposed to appeal to developers who are new to the cryptocurrency world and make it easy for them to start building within that ecosystem.

I started exploring Base, and I found that [it suffers from the same language barriers as most other cryptocurrency projects](/notes/im-still-confused-about-base/). I found the official documentation hard to follow, and it seemed to assume the reader had a deep understanding of the Ethereum blockchain.

Jesse Pollak has responded to my feedback a [few](https://x.com/jessepollak/status/1823035258306277595) [times](https://x.com/jessepollak/status/1832504751038329300) to say it's helpful in understanding the non-crypto perspective, but then he continues doing exactly what he'd been doing before, so I lost interest in giving him feedback.

## I'm summoned once again

This week, [Steve Simkins](https://x.com/stevedylandev) [tagged me on Twitter](https://x.com/stevedylandev/status/1864392117281239077) to share an intro to Base that he'd made:

- [Hello Base](https://www.hellobase.dev/)

I'm going to take another crack at Base and share my thoughts as a non-crypto insider about how the messaging looks.

## What I like about Hello Base

### Provides a clear path forward

The official Base docs immediately present new developers with a dizzying maze of paths in their "getting started" documentation.

Hello Base provides the reader with a clear flow from start to finish. They don't have to pick among several paths of what to learn in order to get started. There's a single track that eliminates any complexity of which learning path to take.

### Lets you do the full tutorial in the browser

Hello Base does a nice job of simplifying the hello world example. The reader doesn't have to install any tools or learn a complicated tech stack. They can try everything from right within their browser.

### Explains its terminology

One of my critiques of the official Base intro documentation is that it casually uses a lot of insider terms that would confuse newcomers.

Hello Base does a good job of recognizing the concepts that newcomers won't understand and explains them up front. It provides a concise explanation of the problems that Base is trying to solve within the cryptocurrency ecosystem.

## Where I think Hello Base could improve

### Get to the value earlier

I think Hello Base suffers from a similar issue a lot of other Base documentation does in that it assumes the reader is excited about Base.

The reality is that 99% of readers don't care about Base and will close the tab within a few seconds if you don't give them a compelling reason to stay.

The first paragraph should explain to the reader why they should care about Base and why they should continue reading.

Here's the first paragraph, currently:

> If you're a developer and you've never touched a blockchain or know very little about them, you're in the right place. In just a few short minutes you'll learn the fundementals and see how you can start building on Base, a blockchain designed to bring the next generation of developers onchain.

If I'm a non-blockchain developer and I read this, what does Base give me? Why should I learn Base as opposed to any other blockchain technology? Why should I learn Base instead of web2 technologies?

Compare Hello Base's intro to [Ruby on Rails' intro](https://rubyonrails.org/):

> Compress the complexity of modern web apps.
>
> Learn just what you need to get started, then keep leveling up as you go. Ruby on Rails scales from HELLO WORLD to IPO.

Rails' pitch is compelling. It says that it's going to make it simple to get up and running, and I can use the same tools to reach massive scale.

I'd love to see a Base intro that answers this question right off the bat:

- What can I do on Base today that I can't do with any other technology?

Jesse Pollak has given [examples of apps you can build on Base](https://x.com/jessepollak/status/1833661719711023421) that, to me, feel extremely uncompelling. It's not the easiest way to do authentication or to send payments, so we shouldn't pretend that it is.

If I'm a web2 developer, why should I build on Base as opposed to any other tech stack available?

Hello Base doesn't have to make the case that it's the best solution for everyone. It's fine if it's niche right now (e.g., it's a way for you to accept payments if you don't have access to traditional banking), but there needs to be some compelling use case to draw people in.

### Trim it down to the fun stuff

I'd love to see the tutorial get to something fun right away. I understand that Hello Base wants to explain the fundamentals, but that should come after showing the reader something cool.

If I read a Python tutorial, it doesn't start with an explanation of the history of typed vs. untyped languages and proceed to extoll the virtues of memory safety. It just shows me how to print "hello world."

The reason that "hello, world!" is the canonical programming example is because it's on chapter 1, page 1 of _The C Programming Language_ by Kerninghan and Richie (K&R). While other programming books at the time were starting with the fundamentalls of variables and typing, K&R got to an example straight away.

### Can we do better than hello world?

Kind of related to the above points, I keep seeing Base / Ethereum examples that show how a more convoluted way of doing something that you could already do with web2 technologies.

Maybe for the first example, that's the way it has to be, but is there something cooler we can show that takes advantage of the unique properties of Base?

If the reader isn't excited about the idea of storing data on a blockchain for its own sake, what's something exciting you can do easily with Base that's either hard or impossible with web2 technologies?

Can I put content behind a paywall without giving Gumroad a 10% cut? Can I create a simple way for fans to give me monthly donations without getting approval from Patreon?

### Minimize jargon

Even though Hello Base explains most of the terminology, there's still a lot that's not actually defined (e.g., "gas", "optimistic rollups").

But even if you defined everything, a reader can't skim to get a sense of what the tutorial is about because halfway through, we're basically speaking another language.

Here's an excerpt from 30% through the tutorial. I've bolded the terms that would be unfamiliar to a non-crypto developer:

> Another large benefit to these **rollups** is they stay **EVM compatible**, which means the code you wrote for **Ethereum** can be **deployed to an L2** without any extra work.

Do we need these explanations at all? If I'm following a tutorial, I just want to see the technology in action. I don't need to know the history. And I'm fine with a simplified explanation of any concepts I need to understand.

### Be honest about the challenges of Base

One of my biggest gripes with the messaging about Base is that they keep repeating this chant of, "It's the easiest way for developers to build new web apps! It's permissionless, so anyone can do it anywhere!"

And then you try to start building and they're like, "Oh, by the way, you need a Coinbase account\*, and Coinbase is going to need to do a full body scan to verify your identity. And also, your app can't store persistent data that's more than a few kilobytes unless you do these awkward workarounds. And also, you can't ever change your app after you deploy it unless you do these awkward workarounds."

\* I know you don't really need a Coinbase account to use Base, but the tutorials all take that path without presenting alternatives.

Base has some rough edges right now that make onboarding hard. I think tutorials should be honest about them rather than surprise developers halfway through or pretend the pain points aren't there:

- You need to spend money even to experiment with Base.
- It's a pain to get money onchain (even on testnet, since testnet faucets make you jump through hoops).
- You can't modify apps like you normally can in web2.
- You can't store data as simply as you can in web2.
- You seem to have to interact with a lot of disparate players just to do basic development (OnChainKit, Hardhat, Coinbase, Solidity).
  - This might not be true, but this is my perception from casual exploration so far.

### Break the dependency on Coinbase

I'm sure there are good reasons why it has to be Coinbase, but it really drags the tutorial down if the reader has to create a Coinbase wallet.

I actually resisted for a while to even try the tutorial because I thought I needed to do real Coinbase verification (Coinbase locked my account for strange reasons years ago).

I was relieved to find it let me create the wallet with only a passkey, but maybe that could be clearer so the reader doesn't think they have to go through the whole account setup process.

But I'd love to see this friction gone entirely. I'd prefer a tutorial that's frictionless and fake (i.e. doesn't really publish to the blockchain) than one that makes me jump through hoops just to publish a "hello world" smart contract to the Base testnet.

### Test on Firefox

I was able to get through the tutorial up to "Read Contract" and then it just stopped working at "Read Contract." I'm using Firefox on Win10:

{{<video src="hello-base-broken.mp4">}}
