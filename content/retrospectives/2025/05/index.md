---
title: "Educational Products: Month 7"
date: "2025-05-09"
description: TODO - One-line summary
---

## Highlights

-

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Write a blog post about lessons from Kickstarter

- **Result**: XX
- **Grade**: XX

TODO

### Complete a new book chapter or teach a live session about a topic from the book

- **Result**: XX
- **Grade**: XX

TODO

### Coordinate rewards with Kickstarter backers

- **Result**: XX
- **Grade**: XX

TODO

## Managing my time as I write a book

I can spend infinite time writing a book

It's easy to get distracted

I hit diminishing returns the longer I write

- Look at my calendar
- Look at my to-do list

I tried LeechBlockNG, but it caused Firefox to hang frequently. I assume it's related to the known issue, [LeechBlock doesn't get along well with Firefox's GC](https://github.com/proginosko/LeechBlockNG/issues/124). I submitted a couple of [small](https://github.com/proginosko/LeechBlockNG/pull/573) [fixes](https://github.com/proginosko/LeechBlockNG/pull/578) but ran out of motivation to keep debugging it.

## Asciidoctor: So far, so good

It was easy to set it up so that it renders to PDF, epub, and HTML. I used Lira [asciidoc-book-starter](https://github.com/lirantal/asciidoc-book-starter) as a starting point and adapted it to Nix. I now have a Nix flake set up so that if I run `nix run`, it renders the book as PDF, epub3, and HTML. I can also render individual formats with commands like `nix run .#pdf`.

I'm not sure if I'll support all three formats. It will depend on how easy it is to keep styling options consistent between the three.

So far, I'm finding Asciidoctor easy to work with. I haven't tried to do anything advanced yet.

The biggest limitation is that I can't do live reload. I'm used to writing in Hugo, so I have VS Code open in one window, and the rendered output open in a browser window. Every time I hit save in VS Code, I see how it renders in under a second.

With Asciidoctor, my write-build-read flow is:

1. Save the file.
1. Run `nix run .#pdf`.
1. Switch to my browser window.
1. Reload the PDF.

Now that I write this out, I realize I should automate this, so I asked an LLM and got this simple script:

```bash
#!/usr/bin/env bash
set -euo pipefail

nix run .#pdf

zathura dist/Refactoring\ English.pdf &
ZATHURAPID=$!

trap 'kill $ZATHURAPID' EXIT

find book -type f \
  | entr -dr nix run .#pdf
```

I'd never heard of zathura, but it's an [open-source PDF reader](https://pwmt.org/projects/zathura/) that automatically reloads on file changes.

It's significantly slower than the near-instant performance I'm used to with Hugo, but it's 5x easier than my previous flow.

One other Asciidoc gotcha is that it doesn't seem to support footnotes, only endnotes.

I haven't tried any custom formatting yet or even embedding images or tables, so I'll have more to report next month.

## Side project: Hacker News Observer

One of my special Hacker News skills is that I can tell people what happened when they ask why their post disappeared from the front page. The secret is that anyone can do this if they know about [Hacker News Rankings](https://hnrankings.info/), a site that charts historical Hacker News data. You just have to recognize a few patterns.

The two main things you can see from historical Hacker News chart is when a post's rank suddenly incrases or decreases dramatically. Like if a post is slowly increasing to the #5 spot, and then the next tick in the chart, it's suddenly at the #200 spot. That means that a moderator probably downranked the story manually.

Charts can also reveal when moderators manually boost a story. If you see a post drowning in the #300 spot, and then suddenly it's ranked #10, it means that a moderator boosted the story, possibly due to the [second chance pool](https://news.ycombinator.com/item?id=26998308), a system where moderators and volunteers hand pick stories that missed the front page in regular voting.

Hacker News Rankings is great, but I'd like to see more data like upvote counts and comment counts alongside rankings. So I built my own version. I haven't published it yet, as I'm still figuring it out.

It polls the [Hacker News API](https://github.com/HackerNews/API) every minute to track the metadata about all of the current Hacker News stories.

Here are some features on my list:

- Automatically tag stories that the moderators have boosted or suppressed.
- Calculate whether it's difficult or easy for a new story to reach the front page at the current time.
  - In other words, automatically determine whether it's a slow news day or a crowded front page.
- Predict a story's trajectory based on how voting and commenting begins.

This is the closest thing I've had to a "big data" project in a long time, as most of my sites generate about 1 MB per month of data, whereas the frequent polls and rich data here generate 30-40 MB per day.

This might be a good opportunity to try out Turso, as it seems like a good way to have a database as a service without forfeiting the benefits of using SQLite.

### Rant: Is there a charting library for simpletons?

One thing that always drives me crazy in web development is charts. I have data that I'd love to put in a chart, but I feel like if I try, it's going to be three days of work to generate a simple line chart.

I started out a few years ago with d3.js, which I found incredibly difficult. I gave up when they switched the documentation to be all notebook-based so that . I'm still baffled by that decision. Were they like, "Why would anyone ever want to use our JS library on a _web page_?"

I switched to Chart.js, and it was simpler, but I still feel like way harder than it could be. I wish there was something that's like Google Sheets or Excel but for JavaScript development. Like, I hand the library an array

## Wrap up

### What got done?

- Held

### Lessons learned

-

### Goals for next month

-

### Requests for help

TODO
