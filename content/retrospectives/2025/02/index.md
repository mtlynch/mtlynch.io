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

- **Result**: I published [My Seventh Year as a Bootstrapped Founder](/solo-developer-year-7/)
- **Grade**: A

I was happy with how this came out. I had a hard time figuring out what to include because the year felt fragmented from different major events that I've already written about, but it was a good summary of the year.

It [briefly reached the #1 spot](https://hnrankings.info/42932492/) on Hacker News, but they suddenly kicked it down to #63, and I'm not sure why.

### Finish another chapter of my book

- **Result**: Published ["Passive Voice Considered Harmful"](https://refactoringenglish.com/chapters/passive-voice-considered-harmful/) and an accompanying [interactive exercise](https://refactoringenglish.com/exercises/recognize-passive-voice/).
- **Grade**: A

I got a bit more done on this than I expected, as I didn't plan to include the quiz. I don't think the quiz is amazing, but it's a fun way to combine text content with something more interactive.

### Revise my tutorials chapter based on reader feedback

- **Result**: Added a new section, ["Use unambiguous example values."](https://refactoringenglish.com/chapters/rules-for-software-tutorials/#use-unambiguous-example-values)
- **Grade**: A

I made some line-level fixes based on reader suggestions, but the biggest revision was adding a new section. A few people had wished for guidance on using useful dummy data in examples, and I agreed that it belonged in the article.

## Is it stupid to write a book during an AI revolution?

It's clear to me that AI is causing a revolution in software development.

AI models now [operate at the skill level of a competent junior engineer](/notes/cline-is-mesmerizing/). At the pace they're improving, AI will outperform even the best humans at programming within two years.

I expect a lot of the software industry to restructure around AI. The closest parallel in my lifetime is the shift from desktop software to the Internet.

And I'm writing a book that has nothing to do with AI... Even though I have no job and no company to run, so I can do whatever I want.

I don't want to just chase the newest, shiny thing, but I also feel sitting out AI is like seeing the Internet happen in the late 90s and saying, "I think I want to publish software on a CD that customers order by mail."

AI might even decrease demand for my book because developers might prefer asking an LLM for editing suggestions rather than reading a book about clear writing. On the other hand, maybe AI increases the demand for effective, personal writing. If everything anyone reads is AI-generated, maybe they'll seek out some artisenal, hand-crafted words.

I still think the reasons I chose to focus on the book are still true, but there's a bigger opportunity cost than I expected when I was planning this last year.

## Is there even a market for this book?

The other issue is that writing my book is a long commitment, and I don't yet have confidence that people want to read it.

The [first chapter I released](https://refactoringenglish.com/chapters/rules-for-software-tutorials/) got a positive reception, but that's one of the fun, broad-appeal chapters. I fear that chapters like "Passive voice considered harmful," is more of an "eat your vegetables" lesson. People might recognize it as beneficial, but it's not fun to read. And my usual haunts like Hacker News or reddit wouldn't showcase a post about the passive voice.

The problem is that most of the chapters in my book are "eat your vegetables" chapters.

TODO: Screenshot

I could restructure it so that I talk about a tip like "read your post aloud" as part of the blogging chapter, but it wouldn't quite make sense because that applies to all kinds of writing, not just blog posts.

But maybe I'm approaching it wrong. I don't think most people are interested in an article about the passive voice as they're browsing the web, but they'd probably read a chapter about it if they were reading a book about effective writing.

I'd assumed that the samples I publish for free online would be word-for-word chapters from the book, but I don't need to do that. I can adapt the content for the web however I want, so if I talk about reading your writing aloud as part of a sample chapter on blogging, that's okay. In the actual book, I can restructure it so that tip isn't part of the blogging chapter.

Still, I need to validate that there are customers for this book before I spend another few months on it. So, my plan is to focus on another fun, accessible chapter like, "Write blog posts that developers read," and then start a Kickstarter for people to pre-order based on the initial three chapters. I'll need to set some goal for what I think is a reasonable minimum of pre-orders to justify continuing the work.

## Late to the game: RSS is great

RSS has been around for 25 years, but I never got into RSS readers. I tried Google Reader back in 2011, but I didn't have enough of a critical mass of interesting or new articles in my feed, so I just stopped checking and forgot about it.

In the past few years, a few things have happened to make RSS feeds more appealing:

- The tech people I used to follow on Twitter have all fragmented to different spaces.
- I've become more aware of social media amplifying attention-grabbing posts over technically interesting posts.
- I switched to NixOS as my OS, which makes it easy to self-host [a free, open-source RSS reader](https://github.com/0x2E/fusion).
- I realized I don't like subscribing to blogs via email, as it clutters my inbox and makes me feel like I have to read when I'm not in a good reading mode.
- As AI slop is taking over the web, I want to follow particular people that I like.

So, I installed [the fusion RSS aggregator](https://github.com/0x2E/fusion), and I've found it to be one of my favorite ways to read new blog posts. Whenever I find a blog post I like, I skim their other posts, and if they write about things I find interesting, I just add them into my feeds.

{{<img src="fusion.webp" max-width="650px" has-border="true" caption="I recently started using fusion, an RSS reader, so that I can follow interesting blogs">}}

I go to social media looking for something interesting to read about technology, but every social network surfaces content that's engaging but not necessarily useful to consume. With RSS, I don't have that problem.

## Side projects

### wordword: Find lexical illusions in your blog posts

I recently read a blog post by Matt Might where he explains [the idea of "lexical illusions."](https://matt.might.net/articles/shell-scripts-for-passive-voice-weasel-words-duplicates/) It's when you fail to recognize a duplicate word in text, for example:

> Many readers are not aware that the<br>
> the brain will automatically ignore<br>
> a second instance of the word "the"<br>
> when it starts a new line.

I make this mistake on my blog, so I wanted a tool that could catch this mistake for me automatically.

I wrote the tool leaning heavily on Cline, an AI assistant. I [found it impressive and scary](/notes/cline-is-mesmerizing/) how good Cline was at implementing the tool based on my prompts and test cases.

And the tool works well. I used it to find [seven lexical illusions](https://github.com/mtlynch/mtlynch.io/pull/1414) in already-published articles.

And because I wrote it in Zig, it's super fast. It checks 221 Markdown files in my blog in just 28.7 milliseconds:

```bash
$ hyperfine 'wordword ./'
Benchmark 1: wordword ./
  Time (mean ± σ):      28.7 ms ±   1.3 ms    [User: 11.7 ms, System: 16.5 ms]
  Range (min … max):    26.8 ms …  31.7 ms    90 runs
```

I've added `wordword` to my blog's [CI build](https://github.com/mtlynch/mtlynch.io/pull/1414/files#diff-78a8a19706dbd2a4425dd72bdab0502ed7a2cef16365ab7030a5a0588927bf47) and to my [git pre-commit hook](https://github.com/mtlynch/mtlynch.io/pull/1414/files#diff-c901cafe102063c4ca0cb0d0c42723a4fbe06baefab7c7c4feb8484f54b3ccc5).

## Other small things

### I joined Codeberg as a member

I've been looking for a more open-source git hosting service.

I'd been using Gitlab. But they made [a bizarre decision](https://gitlab.com/gitlab-org/gitlab/-/issues/419602#note_2030565051) to forcefully log out every user every two weeks. It felt like every time I tried to use Gitlab, I was signed out. And then to sign in, I can't even just let my password manager fill out my credentials, as Gitlab forces me to go open my email for a one-time code.

I looked at Codeberg, and I liked it. It's simpler than Gitlab, which is great for me because Gitlab always felt like overkill. And it's fully open-source and implemented in Go and HTML templates, which is my favorite web stack.

And I saw that one of the ways you can pay is by joining as a voting member of the company, so I did that. I haven't used my membership to do anything yet, but it's fun to feel like I'm part of a co-operative rather than just a user.

The biggest downside of Codeberg is that I can't figure out a good continuous integration option to use with it. Codeberg officially recommends self-hosting Woodpecker CI, but CI is deceptively difficult to self-host. CI has access to production secrets, so I'd much rather pay a company to manage CI infrastructure for me and

- WoodpeckerCI: No vendor offers paid managed hosting.
- Codeberg Actions: Experimental project with no paid support.
- CircleCI: No support for Forgejo/Gitea.
- Garnix: No support for Forgejo/Gitea.
- Buildkite:
- Drone: Seems like they only offer managed hosting for Enterprise.
- Harness: This is a new Drone thing, it seems, but I can't figure out if they support Forgejo/Gitea.

### Switched to the ncruces SQLite Go library

- Switched to ncruces implementation of sqlite

### Got a 10 Gbps router

I bought my old router before I had a server rack, so it wasn't rack-mountable. It was a Qotom Q355G4 that sat on a rack shelf.

Fiber Internet recently became available in my area, and the fastest plan is 2 Gbps. This is the first time an ISP has ever offered me &gt; 1 Gbps speeds, so I wanted to do it.

I bought the [Qotom C3758R 1U 10 Gbps router](https://www.servethehome.com/everything-homelab-node-goes-1u-rackmount-qotom-intel-review/) and installed OPNsense business on it. It's doing great.

I always worry that I'm not getting enough RAM or disk space on my router, but OPNsense barely needs anything. I went with 8 GB of RAM and 128 GB of disk. I just checked system load while running a speed test, and RAM never went above 13% and CPU peaked at about 30%, so the hardware is more than sufficient for my needs. Note that I don't have a ton of firewall rules, and I don't use OPNsense's IDS/IPS features.

{{<img src="opnsense-load.webp" has-border="true">}}

I paid $417 including shipping and taxes. I would have preferred to buy from a trusted hardware vendor like OPNsense or Protectli, but OPNsense's cheapest 10 Gbps rack-mounted router is [$1,200](https://shop.opnsense.com/product/dec2752-opnsense-rack-security-appliance/), and Protectli doesn't have any rack mountable options.

### Officially converted to rack studs

After I published my article about building my first home server rack, several readers recommended I use Rackstuds instead of cage nuts. I was skeptical

I couldn't understand the difference between the red studs and the purple studs. The product page says:

> Suitable for rails between 2.7mm/0.106 and 3.2mm/0.125". If ≤ 2.2mm/0.086", use the new red version instead

Huh?

"Rails" in a server rack means to me the things attach to the server to slide it in.

I finally figured out that when Rackstuds talks about rail thickness, they mean the piece of metal on the front of the rack:

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
