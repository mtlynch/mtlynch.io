---
title: "Educational Products: Month 6"
date: "2025-04-09"
description: TODO - One-line summary
---

## Highlights

-

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Reach my $5k Kickstarter goal for _Refactoring English_.

- **Result**: The Kickstarter reached $6,551 from 191 backers.
- **Grade**: A+

TODO

### Publish the blogging chapter of _Refactoring English_.

- **Result**: Published ["How to Write Blog Posts that Developers Read"](https://refactoringenglish.com/chapters/write-blog-posts-developers-read/)
- **Grade**: A

This did well [on Hacker News](https://news.ycombinator.com/item?id=43503872) and [Lobsters](https://lobste.rs/s/youq7y/how_write_blog_posts_developers_read) but not [reddit](https://www.reddit.com/r/programming/comments/1jl3wgw/how_to_write_blog_posts_that_developers_read/).

### Reach the front page of Hacker News twice by the end of March.

- **Result**: ["How to Write Blog Posts that Developers Read"](https://news.ycombinator.com/item?id=43503872) and [HN Popularity Contest](https://refactoringenglish.com/tools/hn-popularity/) both reached the front page.
- **Grade**: A

TODO

## My book's pre-sale succeeded

I wrote a longer account of it earlier this week, but my book's pre-sale succeeded.

- [My Book's Pre-Sale Just Barely Succeeded](/book-pre-sale-just-barely-succeeded/)

For most of the month, it seemed doomed. It was on track to fall short of my $5k goal by about $1.5k, but then I

I didn't go into it in the story, but my posts consistently received good feedback on lobsters.

## Blogging like my livelihood depended on it

The thing that's exciting about _Refactoring English_'s presale is that it's a glimmer of hope that I could earn a living by blogging.

When I was running TinyPilot, blogging was definitely helpful at first for finding my first 100 or so customers, but it eventually felt like my personal blog wasn't impacting sales for TinyPilot. And that makes sense because just because you enjoy reading about behind the scenes of my company or my software experiments, it doesn't necessarily mean you want to buy a $400 KVM over IP device.

With the complexity of a hardware business, I was almost always limited in hours, so it was hard to dedicate most of my day's "deep thinking" hours to my personal blog when I could have been doing other things to help the business directly.

My hypothesis now is that if I create educational products, I can make blogging sustainable. If I write about something I'm doing, and I have a book that goes into more depth, there's a way for readers to get more information while also funding time I spend writing.

The best example of a blogger who earns money with related content is Julia Evans, who maintains a public blog but also sells digital zines. She doesn't disclose her revenue publicly anymore, but she was making [about $100k/yr from zines as of 2019](https://jvns.ca/blog/2019/10/01/zine-revenue-2019/). That's revenue, not profit, but I'd expect the margins were around 90-95% since the zines were digital, so she just had to pay fees to payment processors and content platforms like Gumroad. And that was before [she started working on her blog full-time](https://jvns.ca/blog/2019/09/13/a-year-explaining-computer-things/).

One of the unusual posts I did this month was, "No Longer My Favorite Git Commit." I've never written a rebuttal to a blog post before,

I felt like I was attacking David Thompson for writing this benign blog post. Or worse, attacking this random developer who wrote the code over a decade ago.

## Fine, I guess I'll just re-learn LaTeX

So far, I've been writing my book using Markdown with Hugo. I haven't started on the official PDF version yet, so I've just been writing I've been punting on the decision to pick a book publishing technology

- [AsciiDoc](https://asciidoc.org/)
- [mdBook](https://rust-lang.github.io/mdBook/)
- [Pollen](https://docs.racket-lang.org/pollen/index.html) - I like the idea, but I'd have to learn Pollen, which means learning Racket, which means learning Lisp, so it's a lot.
- Typst

Surprisingly, there's no book authoring option that can output a PDF, an ePub, and a website from the same source markup. Most of the options can't even do two out of the three without something super hacky like outputting in one format and then using third-party tools to convert from one to the other (e.g., create HTML, then use a headless browser to convert HTML to PDF).

I spent a few hours with Typst. I like that it's open-source, and it's simpler than LaTeX, but it's not enough of an improvement to justify using a newer, less-mature tool. Also, it seems optimized for writing research papers and not as much for writing books.

The other consideration is that publishers can work with LaTeX. My blue-sky path for this book is to self-publish a first edition and then work with a traditional tech publisher like No Starch to do a printed version. I know No Starch can accept books in LaTeX.

One thing I'll also try is to see if I can use something like [lunamark](https://github.com/jgm/lunamark) to convert from Markdown to LaTeX, and then maybe I can just keep using Hugo for the web / ePub version and LaTeX for the PDF.

I worked at a security

## Side projects

### Getting more of the fusion RSS reader under test

- The `pull` package [before (v.0.8.9)](https://github.com/0x2E/fusion/tree/v0.8.9/service/pull) vs. [after (v0.9.3)](https://github.com/0x2E/fusion/tree/v0.9.3/service/pull)

Translate it into your own struct as quickly as possible. You didn't define

Similarly, define interfaces or function types for the external APIs that you call. This makes it explicit which parts of those APIs you need, and it simplifies testing because you don't have to mock out the entire API, just the part you use.

### Starting to sunset What Got Done

In 2019, I [created a web app called What Got Done](/status-updates-to-nobody/). It was my first attempt at a real SaaS business, but I couldn't find any customers.

I still use it every week. I'm now on a five-year streak of posting weekly updates, but I'm the only one. There have been a few users over the years, but they typically get bored of it after a few weeks and stop posting updates.

I wrote it when I knew much less about web development. The site originally used Go, Vue 2, AppEngine, and Google Cloud Firestore. I've since [replaced AppEngine with fly.io and Firestore with SQLite](https://github.com/mtlynch/whatgotdone/pull/639), which made development a bit more pleasant, but I still find it miserable to work in Vue. I don't know of a good way to incrementally move from Vue to vanilla JavaScript, and I don't want to invest 30+ hours in a giant rewrite.

I realized recently that the site would make more sense as just a Hugo project: I'd write my weekly updates in whatever editor I want, and then when I push them to my main branch, and continuous integration would build the site and publish it. That's how this blog works. And for What Got Done, that would eliminate a lot of complexity around user accounts, authentication, and database management. Plus, it means that all of my updates are just on my filesystem as searchable plaintext rather than trapped in a SQL database.

The site does still have some occasional posters, so I don't want to take it away from them, but I closed signups to new users. At some point, I'll probably email recent users to announce sunsetting the project and let them export their data.

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-

### Requests for help

TODO
