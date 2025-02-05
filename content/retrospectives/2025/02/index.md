---
title: "Educational Products: Month 4"
date: "2025-02-11"
description: TODO - One-line summary
---

## Highlights

-

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Publish my 2024 [annual review](/tags/annual-review/) blog post

- **Result**: XX
- **Grade**: A

TODO

### Finish another chapter of my book

- **Result**: Published ["Passive Voice Considered Harmful"](https://refactoringenglish.com/chapters/passive-voice-considered-harmful/) and an accompanying [interactive exercise](https://refactoringenglish.com/exercises/recognize-passive-voice/).
- **Grade**: A

TODO

### Revise my tutorials chapter based on reader feedback

- **Result**: Added a new section, ["Use unambiguous example values."](https://refactoringenglish.com/chapters/rules-for-software-tutorials/#use-unambiguous-example-values)
- **Grade**: A

I made some line-level fixes based on reader suggestions, but the biggest revision was adding a new section. A few people had wished for guidance on using useful dummy data in examples, and I agreed that it belonged in the article.

## Is it stupid to write a book during an AI revolution?

I think it's clear now that AI is causing a revolution in software development.

AI models now [operate at the skill level of a competent junior engineer](/notes/cline-is-mesmerizing/). At the pace they're improving, AI will outperform even the best humans at programming within two years.

I expect a lot of the software industry and the world at large to restructure around AI. The closest parallel in my lifetime is the shift from desktop software to the Internet and the web.

And I'm writing a book that has nothing to do with AI... Even though I have no job and no company to run, so I can do whatever I want.

I don't want to just chase the newest, shiny thing, but I also feel sitting out AI is like seeing the Internet happen in the late 90s and saying, "I think I want to publish software on a CD that customers order by mail."

AI might even decrease demand for my book because developers might prefer asking an LLM for editing suggestions rather than reading a book about clear writing.

On the other hand, maybe AI increases the demand for effective, personal writing. If everything anyone reads is AI-generated, maybe they'll seek out some artisenal, hand-crafted words.

## Is there even a market for this book?

The other issue is that writing my book is a long commitment, and I don't yet have confidence that people want to read it.

The [first chapter I released](https://refactoringenglish.com/chapters/rules-for-software-tutorials/) got a positive reception, but that's one of the fun, broad-appeal chapters. I fear that chapters like "Passive voice considered harmful," is more of an "eat your vegetables" lesson. People might recognize it as beneficial, but it's not fun to read. And my usual haunts like Hacker News or reddit wouldn't showcase a post about the passive voice.

The problem is that most of the chapters in my book are "eat your vegetables" chapters.

TODO: Screenshot

I could restructure it so that I talk about a tip like "read your post aloud" as part of the blogging chapter, but it wouldn't quite make sense because that applies to all kinds of writing, not just blog posts.

But maybe I'm approaching it wrong. I don't think most people are interested in an article about the passive voice as they're browsing the web, but they'd probably read a chapter about it if they were reading a book about effective writing.

I'd assumed that the samples I publish for free online would be word-for-word chapters from the book, but I don't need to do that. I can adapt the content for the web however I want, so if I talk about reading your writing aloud as part of a sample chapter on blogging, that's okay, because in the real book, I can present the same content in a different structure.

Still, I need to validate that there are customers for this book before I spend another few months on it. So, my plan is to focus on another fun, accessible chapter like blog posts and then start a Kickstarter for people to pre-order based on the initial three chapters. I'll need to set some goal for what I think is a reasonable minimum of pre-orders to justify continuing the work.

## Late to the game: RSS is great

RSS has been around for XX years, but I never got into RSS readers. I tried Google Reader back in XX, but I didn't have enough of a critical mass of interesting or new articles in my feed, so I just stopped checking and forgot about it.

In the past few years, a few things have happened to make RSS feeds more appealing:

- The tech people I used to follow on Twitter have all fragmented to different spaces.
- I've become more aware of social media amplifying attention-grabbing posts over technically interesting posts.
- I switched to NixOS as my OS, which makes it easy to self-host [a free, open-source RSS reader](https://github.com/0x2E/fusion).
- I realized I don't like subscribing to blogs via email, as it clutters my inbox and makes me feel like I have to read when I'm not in a good reading mode.
- As AI slop is taking over the web, I want to follow particular people that I like.

So, I installed [the fusion RSS aggregator](https://github.com/0x2E/fusion) on my system, and I feel silly I didn't start doing this earlier. It's a nice way to find interesting articles, and I don't have to wait on reddit or Hacker News to surface them to me.

{{<img src="fusion.webp" max-width="650px" has-border="true" caption="I recently started using fusion, an RSS reader, so that I can follow interesting blogs">}}

## Side projects

### wordword: Find lexical illusions in your blog posts

It can scan my full blog directory in XX milliseconds.

## Other small things

### I started using Cline as an AI coding assistant

### I joined Codeberg as a member

I've been looking for a more open-source git hosting service.

I'd been using Gitlab. But they made [a bizarre decision](https://gitlab.com/gitlab-org/gitlab/-/issues/419602#note_2030565051) to forcefully log out every user every two weeks. It felt like every time I tried to use Gitlab, I was signed out, then I had to sign in, and every sign-in requires me to check my email for a one-time code.

I looked at Codeberg, and I liked it. It's simpler than Gitlab, which is great for me because Gitlab always felt like overkill. And it's fully open-source and implemented in Go and HTML templates, which is my favorite web stack.

And I saw that one of the ways you can pay is by joining as a voting member of the company, so I did that. I haven't used my membership to do anything yet, but it's fun to feel like I'm part of a co-operative rather than just a customer.

### Switched from KeePass to KeePassXC

It's nice. I've

It has an official browser extension, whereas KeePass sort of leaves you on your own to decide which third-party extension to trust. And in my experience so far, KeePassXC's Firefox extension is better at recognizing login fields than the Kee extension was for KeePass.

### Switched to the ncruces SQLite Go library

- Switched to ncruces implementation of sqlite

### Got a 10 Gbps router

I bought my old router before I had a server rack, so it wasn't rack-mountable. It was a Qotom Q355G4 that sat on a rack shelf.

Fiber Internet recently became available in my area, and the fastest plan is 2 Gbps. This is the first time an ISP has ever offered me &gt; 1 Gbps speeds, so I wanted to do it.

I bought the [Qotom C3758R 1U 10 Gbps router](https://www.servethehome.com/everything-homelab-node-goes-1u-rackmount-qotom-intel-review/) and installed OPNsense business on it. It's doing great. I always worry that I'm not getting enough RAM or disk space on my router, but OPNsense barely needs anything. I went with 8 GB of RAM and 128 GB of disk. I just checked system load while running a speed test, and RAM never went above 13% and CPU stayed at about 30%, so the hardware is more than sufficient for my needs. Note that I don't have a ton of firewall rules, and I don't use OPNsense's IDS/IPS features.

{{<img src="opnsense-load.webp" has-border="true">}}

I paid $417 including shipping and taxes. I would have preferred to buy from a trusted hardware vendor like OPNsense or Protectli, but OPNsense's cheapest 10 Gbps rack-mounted router is [three times the price](https://shop.opnsense.com/product/dec2752-opnsense-rack-security-appliance/), and Protectli doesn't have any rack mountable options.

### Officially converted to rack studs

After I published my article about building my first home server rack, several readers recommended I use Rack Studs instead of cage nuts. I was skeptical

I couldn't understand the difference between the red studs and the purple studs. The product page says:

> Suitable for rails between 2.7mm/0.106 and 3.2mm/0.125". If ≤ 2.2mm/0.086", use the new red version instead

Huh?

"Rails" in a server rack means to me the things attach to the server to slide it in.

I finally figured out that they mean the thickness of the piece of metal on the front of the rack:

{{<img src="rail-thickness.webp" max-width="700px">}}

On my StarTech rack, red Rackstuds fit with effort, but purple studs fit comfortably.

If you buy the Rackstuds Duo, they only work on components that are exactly 1U, whereas the loose Rackstuds work for rack mounting anything.

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

- Complete the blogging chapter of _Refactoring English_.
- Begin selling pre-orders for _Refactoring English_.

### Requests for help

- Please [reach out](/about) or leave a comment below if you have opinions on tools for writing a book in a markup language that supports rendering to both PDF and HTML.
  - The options I'm considering are:
    - [AsciiDoc](https://asciidoc.org/)
    - [mdBook](https://rust-lang.github.io/mdBook/)
    - [Pollen](https://docs.racket-lang.org/pollen/index.html) - I like the idea, but I'd have to learn Pollen, which means learning Racket, which means learning Lisp, so it's a lot.
- If you have suggestions for a Kickstarter alternative that's more focused on publishing ebooks, [let me know](/about).
