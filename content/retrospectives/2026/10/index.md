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

This was the second best month of visitors for the book, though I didn't directly cause it.

A reader submitted my ["How to Write an Effective Software Design Document"](https://refactoringenglish.com/excerpts/write-an-effective-design-doc/) post to both /r/programming and Hacker News, and the post took off in both places. That was surprising because the post had been submitted to Hacker News [nine times before](https://hn.algolia.com/?dateRange=all&page=0&prefix=true&query=https%3A%2F%2Frefactoringenglish.com%2Fexcerpts%2Fwrite-an-effective-design-doc%2F&sort=byPopularity&type=story) and never took off, but the tenth time did it. And I'd [submitted the post](https://old.reddit.com/r/programming/comments/1uevttg/how_to_write_an_effective_software_design_document/) to /r/programming a few months ago, and it _did_ take off, but I guess everyone forgot or was happy to [read it again two months later](https://old.reddit.com/r/programming/comments/1wd1jt9/how_to_write_an_effective_software_design_document/)

## The evolution of the print version

I initially planned not to put much effort into the print version. The PDF version already looked pretty good, and customers have been buying it for over a year with no complaints about the design, so I wasn't about to become a typography expert to make a beautiful print version.

But then a reader named Alexey Zubkov reached out to me with a few suggestions and offered to work with me on the typography. And he pointed out all these things I never noticed, but then once he pointed them out, they felt like huge, glaring errors.

One of the big things I didn't realize was that the font I was using supported kerning, but Asciidoctor wasn't using it. Asciidoctor can't read kerning from new style font formats, so I used AI to add a build step that calculated all the letter combinations in the book and then created a custom font file with XX in those.

I made a little slideshow to show how a single page evolved over 30 separate typography improvements, and I'm not even showing the changes that didn't affect that particular page.

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

| Metric               | Prior Week  | Launch Week   | Change               |
| -------------------- | ----------- | ------------- | -------------------- |
| Unique visitors      | 2,379       | 23,478        | {{<delta-cell>}}     |
| Sale count (ebook)   | 8           | 70            | {{<delta-cell>}}     |
| Sale revenue (ebook) | $355.56     | $1,897.41     | {{<delta-cell>}}     |
| Profit (ebook)       | $339.09     | $1,801.27     | {{<delta-cell>}}     |
| Sale count (print)   | 0           | 57            | {{<delta-cell>}}     |
| Sale revenue (print) | $0          | $1,772.42     | {{<delta-cell>}}     |
| Profit (print)       | $0          | $453.16       | {{<delta-cell>}}     |
| Sale count (total)   | 8           | 127           | {{<delta-cell>}}     |
| Sale revenue (total) | $355.56     | $3,669.83     | {{<delta-cell>}}     |
| **Profit (total)**   | **$339.09** | **$2,254.43** | **{{<delta-cell>}}** |

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

The example callouts were where the Markdown syntax was most obviously cleaner, but it also allowed me to stop thinking about Asciidoc's confusing rules, like how Asciidoctor sometimes converts straight quotes to curly quotes, but sometimes it doesn't. With Markdown, I can just write straight quotes everywhere, and my Markdown-to-Asciidoc compiler makes sure they render as curly quotes in the final version.

## Tool recommendation: Atuin

Atuin has been on my list for like a year to check out. I like the idea of it. I don't know if deployment got easier since I last checked in because I recall a dependency on Postgres that I was dreading. But then when I finally set aside a couple of hours to install it, I was done in about five minutes.

Installing Atuin was especially easy because I use NixOS, so a basic configuration just looked like this:

```nix
home-manager.users.mike.programs.atuin = {
  enable = true;
  enableBashIntegration = true;
};
```

The biggest decision I had to make was whether to let Atuin take over my up arrow. I didn't realize Atuin took over the up arrow by default, so when it first started happening, I found it jarring. I couldn't decide if Atuin's up-arroow takeover was a worse workflow or if I just needed to adjust, but after about a week of trying to use it, I disabled Atuin from hijacking the up arrow.

Now, the way I search my shell history is:

- `Up Arrow`: Triggers [`history-search-backward`](https://www.gnu.org/software/bash/manual/html_node/Commands-For-History.html#index-history_002dsearch_002dbackward-_0028_0029), bash's built in search for the current session
- `Ctrl+R`: Triggers Atuin to search over all commands across all sessions.

My final Atuin config looks like this:

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
    db_path = "/home/michael/.local/share/atuin/history.db";
    dialect = "us";
    # Don't record commands that begin with leading space.
    history_filter = ["^ "];
  };
};
```

## Blog posts I enjoyed

- [Cryptic Comments on an NPR Spotify Show](https://www.thisamericanlife.org/897/transcript): This is a recent episode of _This American Life_ about a producer who found strange comments on an . I read the transcript and then listened to the audio, but I wish I'd listened to the audio first because it was more fun that way. Spoiler: it's the real-life manifestation of The Onion's 2014-but-still-timely video: ["Teens Migrating From Facebook To Comments Section Of Slow-Motion Deer Video."](https://www.youtube.com/watch?v=a4mMY2Kl3GY)
- [Every layer of review makes you 10x slower](https://apenwarr.ca/log/20260316-every-layer-of-review-makes-you-10x-slower)
  - This post is the best articulation I've found about the cognitive dissonance I feel about how much of a speedup I expect from AI vs. how much I experience in practice:
    > Code a simple bug fix: 30 minutes. Get it code reviewed by the peer next to you: 5 hours... AI’s direct impact on this problem is minimal. Okay, so Claude can code it in 3 minutes instead of 30? That’s super, Claude, great work. Now you either get to spend 27 minutes reviewing the code yourself in a back-and-forth loop with the AI (this is actually kinda fun); or you save 27 minutes and submit unverified code to the code reviewer, who will still take 5 hours like before, but who will now be mad that you’re making them read the slop that you were too lazy to read yourself.
- [A Marginal-Utility Case for Stealing My Grandmother’s Pain Pills](https://morewrong.lol/?post=marignal-utility-grandmothers-pain-pills) - This is a parody of LessWrong (popular rationalist site) that I thought was pretty funny. I then saw [JeffTK describe it as AI-written](https://news.ycombinator.com/item?id=50098276) and thought it was too funny to be AI-generated. The only thing that makes me think it's AI-written is the number of articles (68) that are on this site that seems to have appeared out of nowhere. It also links to a Substack parody called Smugstack featuring articles like ["I'm an Anti-Racist Educator. It's Not My Job to Educate You."](https://smugstack.lol/p/its-not-my-job-to-educate-you/) I don't know what to make of it because all the articles are like two or three orders of magnitude funnier than anything I've seen AI produce, but I can't imagine this author was privately writing stuff this good for this long, and nobody noticed until now. My best guess is that the author has a good sense of humor and is injecting the core jokes but is using AI to flesh out the specifics.

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-

### Requests for help

TODO
