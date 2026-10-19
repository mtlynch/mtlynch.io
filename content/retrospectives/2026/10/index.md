---
title: "Refactoring English: Month 22"
date: "2026-10-21"
description: TODO - One-line summary
custom_css: true
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and founder of small, indie tech businesses. I'm currently working on a book called [_Refactoring English: Effective Writing for Software Developers_](https://refactoringenglish.com).

Every month, I publish a retrospective like this one to share how things are going with my book and my professional life overall.

{{</notice>}}

## Highlights

-

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Announce the official launch of the book

- **Result**: XX
- **Grade**: XX

TODO

### Pitch to two podcasts

- **Result**: Pitched to just one podcast
- **Grade**: C

I ended up spending a lot more time than I expected touching up the print version, so I had less time to pitch to podcasts.

### Publish a new blog post that attracts readers to the book's website

- **Result**: XX
- **Grade**: XX

TODO

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

This was the second best month of visitors, though I didn't directly cause it. A reader submitted my XX post to both

https://old.reddit.com/r/programming/comments/1wd1jt9/how_to_write_an_effective_software_design_document/

https://old.reddit.com/r/programming/comments/1uevttg/how_to_write_an_effective_software_design_document/

The same reader also submitted to Hacker News, and for whatever reason, this submission took off even though it had been submitted nine times before and never reached critical mass.

## The evolution of the print version

<div id="book-slideshow" role="region" aria-label="Book page revisions">
  <figure>
    <a id="book-slide-link" href="/retrospectives/2026/10/timelapse/2026-09-07T15:50:13Z_afcd884f.webp">
      <img id="book-slide-image" src="/retrospectives/2026/10/timelapse/2026-09-07T15:50:13Z_afcd884f.webp" alt="Chapter 7, Verbs Drive the Sentence — Initial print version" width="2100" height="3000" loading="lazy">
      <span id="book-slide-error" role="status" hidden>Image unavailable. Use Previous or Next to try another revision.</span>
    </a>
    <figcaption aria-live="polite" aria-atomic="true">
      <p id="book-slide-caption">Initial print version</p>
    </figcaption>
  </figure>
  <div id="book-slide-controls" hidden>
    <button id="book-slide-previous" type="button" aria-disabled="true">← Previous</button>
    <button id="book-slide-next" type="button">Next →</button>
  </div>
  <noscript><p>Enable JavaScript to browse the remaining revisions.</p></noscript>
</div>

<script src="slideshow.js" defer></script>

## Launch week

I normally cover the previous month in these retros, but since I'm late and the October launch is fresh in my mind, I'll cover it here.

So, a quick by the numbers comparing sales to the prior week for reference:

| Metric               | Prior Week | Launch Week | Change           |
| -------------------- | ---------- | ----------- | ---------------- |
| Unique visitors      | 2,379      | 23,478      | {{<delta-cell>}} |
| Sale count (ebook)   | 8          | 70          | {{<delta-cell>}} |
| Sale revenue (ebook) | $355.56    | $1,897.41   | {{<delta-cell>}} |
| Profit (ebook)       | $339.09    | $1,801.27   | {{<delta-cell>}} |
| Sale count (print)   | 0          | 57          | {{<delta-cell>}} |
| Sale revenue (print) | $0         | $1,772.42   | {{<delta-cell>}} |
| Profit (print)       | $0         | $453.16     | {{<delta-cell>}} |
| Sale count (total)   | 8          | 127         | {{<delta-cell>}} |
| Sale revenue (total) | $355.56    | $3,669.83   | {{<delta-cell>}} |
| Profit (total)       | $339.09    | $2,254.43   | {{<delta-cell>}} |

Here were my launch week promotional activities:

- Launch announcement on Hacker News
- Launch announcement to book email list
- Launch announcement to mtlynch.io email list
- Published [Anti-Patterns in Software Blogging](https://refactoringenglish.com/blog/anti-patterns-software-blogging/)
  - Went to #1 on [Lobsters](https://lobste.rs/s/rwdufq/anti_patterns_software_blogging), [/r/programming](https://www.reddit.com/r/programming/comments/1wzw4cw/antipatterns_in_software_blogging/) and peaked at #8 on [Hacker News](https://news.ycombinator.com/item?id=49992257)
- Published ["Why are Agent Harnesses so Dumb?"](https://mtlynch.io/why-are-coding-agents-so-dumb/)
  - It got a decent response on [Hacker News](https://news.ycombinator.com/item?id=50020947) and [Lobsters](https://lobste.rs/s/t5htlf/why_are_coding_agents_so_dumb)

![alt text](image.png)

An

## Converting my book from Asciidoc to Markdown

I got so tired of Asciidoc syntax that I spent a day writing (largely with AI) a Markdown to Asciidoc compiler.

Before, to render an example callout like this, I had to write gross Asciidoc that looked like this:

```asciidoc
[.bad-example-block]
--
[.bad-example-header]
× *BAD*: Use confusing jargon.

> [.bad-example]#Go is an excellent programming language for beginners because
> of its measured take on OO and its strong GC-based auto-memory management.#

--
```

And it's especially annoying because the GOOD and the XX are the same in every good example, but Asciidoc doesn't support templates.

So, I wrote my own Markdown compiler that supports Hugo-style templates. So, now, when I want to generate a bad example callout, I write this simpler and more readable shortcode:

<!-- prettier-ignore -->
```markdown
{{</*example type="bad" heading="Use confusing jargon."*/>}}
Go is an excellent programming language for beginners because
of its measured take on OO and its strong GC-based auto-memory management.
{{</*/example*/>}}
```

Examples were the place where

This was also helpful in situations where I want to mark a section as `[%unbreakable]`, which tells Asciidoc not to insert a page break within it. And also, whenever I write that, I hear the theme song to _Unbreakable Kimmy Schmidt_ in my head. But Asciidoc has annoying rules about how `[%unbreakable]` combines with other elements, so I didn't know a way to make an example and its preceding paragraph unbreakable. But then I just had AI figure out the semantics so I just write:

<!-- prettier-ignore -->
```markdown
{{</*unbreakable*/>}}

Hello

{{</*/unbreakable*/>}}
```

## Recommendation: Atuin

Atuin has been on my list for like a year to check out. I like the idea of it. I don't know if deployment got easier since I last checked in because I recall a dependency on Postgres that I was dreading. But then when I finally set aside a couple of hours to install it, I was done in about five minutes.

This was especially easy because I use NixOS, so installing it just looked like this:

```nix
home-manager.users.mike.programs.atuin = {
  enable = true;
  enableBashIntegration = true;
  # Use bash's default up arrow behavior.
  flags = ["--disable-up-arrow"];
  # Let home-manager manage my Atuin settings.
  forceOverwriteSettings = true;
  settings = {
    # Don't sync to a cloud service.
    auto_sync = false;
    db_path = "/home/mike/.local/share/atuin/history.db";
    dialect = "us";
    # Don't record commands that begin with leading space.
    history_filter = ["^ "];
  };
};
```

The biggest decision I had to make was whether to let it take over my up arrow. I didn't realize Atuin took over the up arrow by default, so when it first started happening, I found it jarring. I spent a few days trying to get used to it to see it was a worse workflow or if it was just unfamiliar.

I found that I prefer bash's default up arrow behavior to Atuin's. Usually, when I hit the up arrow in bash, I am trying to get to a recent command in that specific directory, but I still like having Atuin store my whole shell history because I can hit `Ctrl+R` to search when I'm looking for a command that wasn't in the local shell.

## Blog posts I enjoyed

- [Cryptic Comments on an NPR Spotify Show](https://www.thisamericanlife.org/897/transcript): This is a recent episode of _This American Life_ about a producer who found strange comments on an . I read the transcript and then listened to the audio, but I wish I'd listened to the audio first because it was more fun that way. Spoiler: it's the real-life manifestation of The Onion's 2014-but-still-timely video: ["Teens Migrating From Facebook To Comments Section Of Slow-Motion Deer Video."](https://www.youtube.com/watch?v=a4mMY2Kl3GY)
- [Every layer of review makes you 10x slower](https://apenwarr.ca/log/20260316-every-layer-of-review-makes-you-10x-slower)
  - This post is the best articulation I've found about the cognitive dissonance I feel about how much of a speedup I expect from AI vs. how much I experience in practice:
    > Code a simple bug fix: 30 minutes. Get it code reviewed by the peer next to you: 5 hours... AI’s direct impact on this problem is minimal. Okay, so Claude can code it in 3 minutes instead of 30? That’s super, Claude, great work. Now you either get to spend 27 minutes reviewing the code yourself in a back-and-forth loop with the AI (this is actually kinda fun); or you save 27 minutes and submit unverified code to the code reviewer, who will still take 5 hours like before, but who will now be mad that you’re making them read the slop that you were too lazy to read yourself.

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-

### Requests for help

TODO
