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
- Inspirations
  - Age of Empires II, which Noah played as a kid.
  - Manor Lords, made by a solo dev over six years.
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

- [Forge](https://book.getfoundry.sh/reference/forge/forge) is how he runs tests
- Noah likes forge for testing
- Likes testing in Solidity because he can reuse a lot of production code.
- Easy to test different blockchain conditions like timestamps and wallet balance.

74m172 - forge looks super complicated, can't control randomness, have to stick in arbitrary magic numbers to be at the right blockchain number.

I found forge's output really convoluted. It's surprising that when an assert fails, it doesn't print the line number or even the source code that caused the failure. At 85m24s, the failure is just `1 != 2`, and it's on the developer to figure out where the assertion is in source. I've never seen a test framework _not_ print out the line number of where an assertion failed.

At 91m45s, in order to assert that his production code threw an error, he has to redefine the error in his test code, which is strange.

## Warpcast has a web app

- Farcaster is like the Ethereum equivalent of Twitter or Mastodon.
- Farcaster makes it look like Warpcast is mobile-only, but I realized from Noah's stream that Warpcast has [a web app](https://warpcast.com/).

  - I think you still need the mobile app to create your account.

## What got done

- Noah added support in the game for using wood to build huts.
- He started to implement functionality to attract villagers based on what resources are available in the village, but he had to pause work because he was mentally exhausted.

## Streaming

- He had a peak of 250 viewers.
  - At the end, it turns out he's not sure if this is concurrent viewers or the total aggregate count that tuned into the stream at any point.
- Most viewers came from Twitter.
- He was admittedly rusty at livestreaming and had a lot of dead air during the stream.

- He's using some streaming thing that unifies Twitter, Youtube , Warpcast

## Opportunities for improvement

### Convenience dev scripts

Noah at one point got stuck for seFor difficult-to-remember command-line syntax like `forge test --match-contract BuildFacetTest -vvvv`, I suggest writing a convenience script and storing it in the repo so it would instead look like `./dev-scripts/run-single-test BuildFacetTest`. I do this with some repos.

Noah is already using `make`, so these could instead be `make` commands.

### Mock randomness out of tests

Randomness makes tests really hard to understand. Potentially dependency injection so you can see how much

## Unanswered questions

### Why blockchain?

I was left wondering at the end of the video why Noah is building Stoke Fire on the blockchain. He mentioned that he wanted to try something more original on the blockchain, and that's what got me interested, but I still can't figure out how the blockchain helps. So far, it seems like the blockchain is making everything 10x more complicated.

### My, what large ints you have!

Q: Why such large ints? Doesn't that increase gas fees?

### Why the underscores?

Q: Why do his function arguments start with an underscore? I recognize this convention from Python and JavaScript to hint to the reader that the variable is private/protected, but aren't function argments already private?
