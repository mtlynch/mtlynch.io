---
title: "Educational Products: Month 6"
date: "2025-04-09"
description: I'm officially writing a book!
---

## Highlights

- My book's pre-sale succeeded.

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

## Testing the Julia Evans business model

The thing that's exciting about _Refactoring English_'s presale is that it's a glimmer of hope that I could earn a living by blogging.

When I was running TinyPilot, blogging helped me find my first 100 customers, but it eventually felt like my personal blog wasn't helping sales at all. And that makes sense because people who are interested in behind the scenes details of an indie company are not necessarily interested in buying a $400 KVM over IP device.

With the complexity of a hardware business, I was almost always limited in hours, so it was hard to dedicate most of my day's "deep thinking" hours to my personal blog when I could have been doing other things to help the business directly. Ever since, I've been looking for a busines that aligns with blogging so that I feel like my writing isn't competing with time I could be spending on the business.

My hypothesis is that I can make blogging sustainable by creating educational products. If I write about something I'm doing, and I have a book that goes into more depth, there's a way for readers to get more information while also funding time I spend writing.

The best example of a blogger who earns money with related content is [Julia Evans](https://jvns.ca), who maintains a software blog and monetizes her work by selling illustrated zines.

Julia doesn't disclose her revenue publicly anymore, but she was making [about $100k/yr from zines as of 2019](https://jvns.ca/blog/2019/10/01/zine-revenue-2019/), which strongly suggests this is viable. That $100k/yr was before [she started working on her blog full-time](https://jvns.ca/blog/2019/09/13/a-year-explaining-computer-things/). Granted, it was revenue, not profit, but I'd expect the margins were around 90-95% since the zines were digital, so she just had to pay fees to payment processors and content platforms like Gumroad.

## Blogging like my livelihood depends on it

March was an interesting blogging challenge because the primary way I was trying to find customers for my book was by writing successful blog posts. That's unusual for me, as I'm usually not writing to a deadline or choosing topics for maximum readers.

- Ease: How easy would it take me to write a post that feels complete?
- Potential audience: If this post succeeds, how large is the potential audience that would enjoy it?
- Probability of success: How likely is this post to reach its intended audience?
- Overlap with book: If a reader discovers this post, how likely are they to be interested in my book?

I had a few posts in mind:

| Title                                                                                                                     | Ease | Potential audience | Probability of Success | Overlap with book |
| ------------------------------------------------------------------------------------------------------------------------- | ---- | ------------------ | ---------------------- | ----------------- |
| [No Longer My Favorite Git Commit](https://mtlynch.io/no-longer-my-favorite-git-commit/)                                  | 4    | 5                  | 4                      | 4                 |
| [How to Write Useful Commit Messages](https://refactoringenglish.com/chapters/commit-messages/)                           | 2    | 5                  | 3                      | 4                 |
| [How to Write Blog Posts that Developers Read](https://refactoringenglish.com/chapters/write-blog-posts-developers-read/) | 1    | 5                  | 2                      | 5                 |
| How to Maintain an Open-Source Project and Remain Happy                                                                   | 3    | 3                  | 4                      | 2                 |
| Fine Tuning Your Writing: Using Strong Verbs                                                                              | 5    | 1                  | 1                      | 5                 |
| Three Months Using NixOS after 35 Years on Windows                                                                        | 3    | 2                  | 5                      | 1                 |
| Use Zig to Build C Applications                                                                                           | 3    | 3                  | 4                      | 1                 |

One of the unusual posts I did this month was, "No Longer My Favorite Git Commit." I've never written a rebuttal to a blog post before,

I felt like I was attacking David Thompson for writing this benign blog post. Or worse, attacking this random developer who wrote the code over a decade ago.

## Picking a markup language for the book

So far, I've been writing my book using Markdown with Hugo. I haven't started on the official PDF version yet, so I've just been writing I've been punting on the decision to pick a book publishing technology.

Now that the book is officially happening, I need to pick a method for writing it. The features I'm interested in are:

- Can the tool natively output PDF?
- Can the tool natively output epub?
- Can the tool natively output HTML?
- How mature is the tool? How likely am I to hit new bugs or dead ends trying to achieve simple things?
- Which DRM-free technical traditional publishers support this format?
  - I'm going to self-publish the first edition, but it would be nice to have the option to work with a traditional publisher on a print version for a second edition.

| Tool                                                     | PDF | epub | HTML | Maturity  | Publisher Support |
| -------------------------------------------------------- | --- | ---- | ---- | --------- | ----------------- |
| [AsciiDoc](https://asciidoc.org/)                        | ✅  | ✅   | ✅   | High      | Manning           |
| [LaTeX](https://www.latex-project.org/)                  | ✅  | ❌   | ❌   | Very high | No Starch         |
| [Pollen](https://docs.racket-lang.org/pollen/index.html) | ❌  | ❌   | ✅   | Medium    | None              |
| [Typst](https://typst.app/)                              | ✅  | ❌   | ❌   | Low       | None              |
| [mdBook](https://rust-lang.github.io/mdBook/)            | ❌  | ❌   | ✅   | Low       | None              |

It looks like the winner is either AsciiDoc or LaTeX.

AsciiDoc has the downside of being a Ruby tool, and I find the Ruby ecosystem hard to work with. The tool's been around for so long and I don't need anything especially complicated in my book, so I hope it will be fine.

There are third-party tools to convert from AsciiDoc to LaTeX. It's probably not fun, but if I do a one-time conversion because No Starch says they want to publish my book, that probably won't be too bad.

I spent a few hours with Typst. I like that it's open-source, and it's simpler than LaTeX, but it's not enough of an improvement to justify using a newer, less-mature tool. Also, it seems optimized for writing research papers and not as much for writing books.

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

<script src="script.js"></script>
