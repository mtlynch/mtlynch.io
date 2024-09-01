---
title: "Notes on Noah Bragg's first Stoke Fire Livestream"
date: 2024-09-01T00:00:00-04:00
---

I've been interested in Ethereum the past few months, especially the Base ecosystem. The problem is that after hours of reading about Base, I still don't get what Base is.

Every few months, I check back in on the Base website's developer section to see if there's a path to building on Base for a beginner, and the path seems to be "here are some disparate tutorials for very specific things, and if you have questions, come ask us on Discord."

So, I was excited to see that Noah Bragg, an indie founder I follow on Twitter, has started livestreaming his process of building a simple game on top of the Base ecosystem.

I've taken notes on my takeaways from

## The game

- The game is called Stoke Fire.
- The game is inspired by Age of Empires II, which Noah played as a kid.
- Game will be free to play to encourage participation
- Game state will be in NFTS to make it easier to transfer between wallets, but people
  wouldn't trade it.
- On Base because he expects consumes to be there due to Coinbase's investment.

### Early access

- Early access is available via Noah's [I Must Build](https://www.hypersub.xyz/s/i-must-build-qytohm9l69s) subscription on [Hypersub](https://hypersub.xyz)
  - Hypersub is like Patreon for on-chain.

## Solidity

- Solidity continues to seem gross to me.
  - In an ecosystem where correctness and readability is critical, Solidity introduces tons of needless footguns and gotchas. It's like they looked at C++ and JavaScript and adopted the worst parts.

## Diamond

- Diamond is a framework for deploying smart contacts
  with mutability.

- Weakens guarantees of smart contract, but facilitates iteration
- Adding facets seems tedious, requires adding to deploy scripts (52m52s)

- Commenters say you can use helpers to get facets automatically.

## Forge

- Forge is how he runs tests
- Noah likes forge for testing
- Likes testing in Solidity because he can reuse a lot of production code.
- Easy to test different blockchain conditions like timestamps and wallet balance.

## Warpcast has a web app

- Farcaster is like the Ethereum equivalent of Twitter or Mastodon.
- Farcaster makes it look like Warpcast is mobile-only, but I realized from Noah's stream that Warpcast has [a web app](https://warpcast.com/).

  - I think you still need the mobile app to create your account.

- He's using some streaming thing that unifies Twitter, Youtube , Warpcast

Q: Why such large ints? Doesn't that increase gas fees?
