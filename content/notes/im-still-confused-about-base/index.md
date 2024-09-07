---
title: "I'm Still Confused About Base"
date: 2024-09-07T00:00:00-04:00
tags:
  - ethereum
---

A year ago, I listented to [an interview with Jesse Pollak on an episode of _Into the Bytecode_](https://www.intothebytecode.com/jesse-pollak/).

Jesse works for Coinbase, and he noticed that lots of developers building apps on top of Ethereum were solving the same problems over and over again. He started a project at Coinbase to create a layer on top of Etherum called Base. Base would get Ethereum developers up and running faster because they could use shared solutions to these common problems.

Jesse also hoped that Base would make Ethereum development more accessible to a wider array of developers by lowering the barrier to entry. His goal was to bring a billion users on-chain (i.e., interacting with the Ethereum blockchain in some way).

## Base sounds great, in theory

Jesse's ideas resonated strongly with me. I felt like I was exactly Base's target demographic, as I've never done Ethereum development, but I've worked with other cryptocurrencies and was interested in Ethereum's growing ecosystem.

But then I visited [the Base website](https://base.org) and basically hit a wall. It was filled with crypto insider jargon like this:

> Base is built as an Ethereum L2, with the security, stability, and scalability you need to power your dapps. Confidently deploy any EVM codebase and onramp your users and assets from Ethereum L1, Coinbase, and other interoperable chains.

I pushed on, looking for some explanation of how Base achieves all the things that Jesse was talking about, but the Base documentation seemed to be mostly tutorials for general-purpose Ethereum development. I couldn't understand why someone would develop on Base as opposed to Ethereum.

I've kept checking the Base website every few months, and I've interacted with Jesse a few times on Twitter. Every time I say that I don't understand Base, he points me to the docs.

## Me navigating the Base documentation today

I wrote up some notes this week about [what I learned from watching Noah Bragg's livestream](/notes/noah-bragg-stokefire-1/) about build a new game on top of Base.

My write-up [caught Jesse Pollak's attention](https://x.com/jessepollak/status/1832226332639686680), and he asked again where the disconnect is for me in the Base documentation, so I recorded a short video to explain what obstacles I see in learning about Base as a new developer:

<div style="position:relative;padding-top:56.25%;"><iframe src="https://iframe.mediadelivery.net/embed/304035/49e70f23-8074-404e-8adb-440a922996f6?autoplay=false&loop=false&muted=false&preload=true&responsive=true" loading="lazy" style="border:0;position:absolute;top:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true"></iframe></div>

This video is also on [YouTube](https://youtu.be/5CieQkjcgZg?feature=shared).

If you don't feel like watching the whole video, my key points are:

- The language on the Base website is very jargony and alienates potential developers who aren't already familiar with Ethereum concepts.
- The Base Learn site is organized in a way where you have to do a lot of boring toil (learning concepts, installing tools) before you can do anything fun with Base technology.
  - I'd love to see a simple "Hello, World!" tutorial that lets the reader do something neat with Base with as few pre-requisites as possible.
- The tutorials / lessons on Base Learn are tightly coupled, so the reader can't pick their tutorials a la carte because the site assumes the reader has completed every tutorial before it.
  - e.g., the Base Learn "Hello World" tutorial assumes you've installed Node.js and Remix from previous tutorials.
- I think ["Go by Example"](https://gobyexample.com/) is an excellent example of self-contained tutorials that effectively teach the reader about a new technology.

## What I understand about Base

- Base is a layer on top of Ethereum.
- Base is a network, not a coin or token.
  - You can't buy 1 Base the way you could buy 1 Bitcoin or 1 Ethereum.
  - Instead, you can transmit other coins and tokens on the Base network (e.g., you can send me 100 USDC via Base just like how you might send 100 USDC via the Ethereum network).
- Base has low transaction fees.
  - Currently, transaction fees on Base are about US$0.01 per transaction, whereas on Ethereum, they're just under US$1.00.
- Coinbase is currently driving Base, but the goal is for Base to work independently of Coinbase's involvement.
  - Because of Coinbase's popularity with casual crypto users, there's potential for a large population of crypto users to begin performing transactions using Base.

## What I don't understand about Base

- Is Base just a drop-in replacement for Ethereum or is there something more?
  - To develop on Base, do you essentially write all the same code you'd write for Ethereum but just select the Base blockchain at some point?
- When Jesse talked about how Base was supposed to solve common problems from Ethereum development, how does it do that?
- Am I the target audience for Base? Or is it designed for people who are already comfortable developing with Ethereum?
- All the tutorials and examples I can find on Base's website use heavy tech stacks with Typescript, Next.js, React, and friends. Are those necessary for Base development, or is Coinbase just using those technologies to court frontend developers?
  - Jesse has pointed me to [OnchainKit](https://onchainkit.xyz/), but learning React and Typescript as a pre-requisite for learning Base is very unappealing.
  - Is there a version of onchain development where I just write some code in a text editor and deploy it with a command-line tool?
