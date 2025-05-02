---
title: "Educational Products: Month 7"
date: "2025-05-09"
description: TODO - One-line summary
---

## Highlights

-

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Write a blog post about lessons from Kickstarter.

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

## Side project: Hacker News Observer

I'm currently generating 30-40 MB per day

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
