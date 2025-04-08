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

- **Result**: The Kickstarter reached $6,701 from 196 backers.
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

For most of the month, it seemed doomed. It was on track to fall short of my $5k goal by about $1.5k, but then one of my blog posts got attention on Hacker News just before the pre-sale ended.

In the end, the Kickstarter raised $6,551, exceeding its $5k goal.

I wrote a longer account of it last week:

- [My Book's Pre-Sale Just Barely Succeeded](/book-pre-sale-just-barely-succeeded/)

I plan to write a dedicated post about Kickstarter, but I had a great experience with it. It turned out to be a good way to measure interest in this book. And the $6.5k in pre-orders is higher than I'd expect to get as an advance if I published the book with a traditional publisher.

## Can I make the Julia Evans business model work for me?

The thing that's exciting about _Refactoring English_'s presale is that it's a glimmer of hope that I could earn a living by blogging.

When I was running TinyPilot, blogging definitely helped me find my first few dozen customers. Eventually, it felt like my personal blog wasn't helping sales at all. And that makes sense because people who are interested in behind the scenes diaries at an indie company are not necessarily interested in buying a $400 KVM over IP device.

With the complexity of a hardware business, I was almost always limited in hours, so it was hard to dedicate most of my day's "deep thinking" hours to my personal blog when I could have been doing other things to help the business directly. Ever since, I've been trying to figure out what business I could run where blogging aligns well with the business' profitability.

My hypothesis is that I can make blogging sustainable by creating educational products. If I write about something I'm doing, and I have a book that goes into more depth, there's a way for readers to get more information while also funding time I spend writing.

The best example of a blogger who earns money with related content is [Julia Evans](https://jvns.ca). She maintains a software blog and monetizes her work by selling [illustrated zines](https://wizardzines.com/).

Julia doesn't disclose her revenue publicly anymore, but she was making [about $100k/yr from zines as of 2019](https://jvns.ca/blog/2019/10/01/zine-revenue-2019/). That $100k/yr was before [she started working on her blog full-time](https://jvns.ca/blog/2019/09/13/a-year-explaining-computer-things/). Granted, it was revenue, not profit, but I'd expect the margins were around 90-95% since the zines were digital, so she just had to pay fees to payment processors and content platforms like Gumroad.

So, $100k in revenue when it was still a side project is quite good. Let's imagine that Julia tripled her sales by working on her business full-time instead of after hours. If I can be half as successful as she was, then that's $150k/yr from blogging and selling related products. It sounds challenging but achievable.

## Blogging like my livelihood depends on it

March was an interesting blogging challenge because the primary way I was trying to find customers for my book was by writing successful blog posts. That's unusual for me, as I'm usually not writing to a deadline or choosing topics for maximum readers.

I have a long list of topic ideas and half-written posts, so I evaluated them on these dimensions:

- **Ease**: How easy would it take me to write a post that feels complete?
- **Potential audience**: If this post succeeds, how large is the potential audience that would enjoy it?
- **Probability of success**: How likely is this post to reach its intended audience?
- **Overlap with book**: If a reader discovers this post, how likely are they to be interested in my book?

I didn't sit down and formally score my ideas, but the rough mental calculation looked kind of like this:

| Title                                                                                                                     | Ease | Potential audience | Probability of Success | Overlap with book |
| ------------------------------------------------------------------------------------------------------------------------- | ---- | ------------------ | ---------------------- | ----------------- |
| [No Longer My Favorite Git Commit](https://mtlynch.io/no-longer-my-favorite-git-commit/)                                  | 4    | 5                  | 4                      | 4                 |
| [How to Write Useful Commit Messages](https://refactoringenglish.com/chapters/commit-messages/)                           | 2    | 5                  | 3                      | 4                 |
| [How to Write Blog Posts that Developers Read](https://refactoringenglish.com/chapters/write-blog-posts-developers-read/) | 2    | 4                  | 2                      | 5                 |
| How to Maintain an Open-Source Project and Remain Happy                                                                   | 3    | 3                  | 4                      | 2                 |
| Fine Tuning Your Writing: Using Strong Verbs                                                                              | 5    | 1                  | 1                      | 5                 |
| Three Months Using NixOS after 35 Years on Windows                                                                        | 3    | 2                  | 5                      | 1                 |
| Use Zig to Build C Applications                                                                                           | 3    | 3                  | 4                      | 1                 |

I ended up picking the top three from that list, but they didn't perform as expected:

| Title                                                                                                                     | Impact on Sales | Total Readers | Hacker News | reddit |
| ------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------- | ----------- | ------ |
| [How to Write Blog Posts that Developers Read](https://refactoringenglish.com/chapters/write-blog-posts-developers-read/) | High            | 22.3k         | 9.7k        | 325    |
| [How to Write Useful Commit Messages](https://refactoringenglish.com/chapters/commit-messages/)                           | Medium          | 2.6k          | 126         | 1.2k   |
| [No Longer My Favorite Git Commit](https://mtlynch.io/no-longer-my-favorite-git-commit/)                                  | Low             | 31.6k         | 87          | 6.4k   |

"How to Write Blog Posts that Developers Read" was a surprise win.

"How to Write Useful Commit Messages" was okay.

"No Longer My Favorite Git Commit" was my best post idea because I knew I could write it quickly, and I thought there was a large potential audience since the original was so popular. It did okay on reddit but flopped on Hacker News. I didn't realize until I sat down to write this post that [Google Discover](https://blog.google/products/search/introducing-google-discover/) (a thing I didn't even realize existed) featured my post, which brought in 15k readers.

I've never written a rebuttal to a blog post before,

I felt like I was attacking David Thompson for writing this benign blog post. Or worse, attacking this random developer who wrote the code over a decade ago.

## Hacker News Popularity Contest

There's a technique called "engineering as marketing" that's popular with engineers who are bad at marketing. The idea is that if you want people to check out your paid product, you you create free tools that lead them to your actual product.

## Picking a markup language for the book

So far, I've been writing my book using Markdown with Hugo. I haven't started on the official PDF version yet, so I've just been writing I've been punting on the decision to pick a book publishing technology.

Now that the book is officially happening, I need to pick a method for writing it. The features I'm interested in are:

- Can the tool natively output PDF?
- Can the tool natively output epub?
- Can the tool natively output HTML?
- How mature is the tool? How likely am I to hit new bugs or dead ends trying to achieve simple things?
- Which DRM-free technical traditional publishers support this format?
  - I'm going to self-publish the first edition, but it would be nice to have the option to work with a traditional publisher on a print version for a second edition.

The options seem to be:

| Tool                                                     | PDF | epub | HTML | Maturity  | Publisher Support                        |
| -------------------------------------------------------- | --- | ---- | ---- | --------- | ---------------------------------------- |
| [AsciiDoc](https://asciidoc.org/)                        | ✅  | ✅   | ✅   | High      | [Manning](https://www.manning.com/)      |
| [LaTeX](https://www.latex-project.org/)                  | ✅  | ❌   | ❌   | Very high | [No Starch Press](https://nostarch.com/) |
| [Pollen](https://docs.racket-lang.org/pollen/index.html) | ❌  | ❌   | ✅   | Low       | None                                     |
| [Typst](https://typst.app/)                              | ✅  | ❌   | ❌   | Low       | None                                     |
| [mdBook](https://rust-lang.github.io/mdBook/)            | ❌  | ❌   | ✅   | Low       | None                                     |

It looks like the winner is either AsciiDoc or LaTeX.

There are third-party tools to convert from AsciiDoc to LaTeX. It's probably not fun, but if _No Starch_ tells me they want to publish a second edition of my book, I can probably suck it up and do a one-time conversion.

I spent a few hours with Typst. I like that it's open-source, and it's simpler than LaTeX, but it's not enough of an improvement to justify using a newer, less-mature tool. Also, it seems optimized for writing research papers and not as much for writing books.

## Side projects

### Getting more of the fusion RSS reader under test

Since switching to NixOS a few months ago, I've enjoyed hosting [more services on my personal machine](/retrospectives/2025/02/#late-to-the-game-rss-is-great). My favorite is [fusion](https://github.com/0x2E/fusion), a minimal RSS reader built with Go, Svelte, and SQLite.

{{<img src="fusion.webp" has-border="true" max-width="700px" caption="[fusion](https://github.com/0x2E/fusion) is a minimal RSS reader built with Go, Svelte, and SQLite.">}}

My favorite thing about fusion is that its maintainer has been friendly and receptive to code contributions, so I've been working on [small improvements](https://github.com/0x2E/fusion/pulls?q=is%3Apr+author%3Amtlynch) to the code in my spare time.

The contribution I'm most proud of is refactoring the `pull` package and getting more of it under test:

- The `pull` package [before (v.0.8.9)](https://github.com/0x2E/fusion/tree/v0.8.9/service/pull) vs. [after (v0.9.3)](https://github.com/0x2E/fusion/tree/v0.9.3/service/pull)

It started because I wanted to [add support for the `If-Modified-Since` HTTP header](https://github.com/0x2E/fusion/pull/113), but when I looked at [the code responsible for initiating HTTP requests](https://github.com/0x2E/fusion/blob/v0.8.9/service/pull/handle.go#L16-L78), it was difficult to modify. There were a few issues:

- The code was mixing together lots of different responsibilities: reading the database, logic about when to query a feed, parsing external data, and writing results back to the database.
- The code had no automated tests to exercise it.
- If I wanted to write tests, the only exported function that exercised this code was [`Puller.PullAll`](https://github.com/0x2E/fusion/blob/v0.8.9/service/pull/pull.go#L55-L99), which adds even more complexity because that function also manages a pool of worker processes.

The main changes I made were:

- I moved [HTTP logic to its own file](https://github.com/0x2E/fusion/blob/v0.9.3/service/pull/client/client.go).
- I moved [RSS parsing to its own file](https://github.com/0x2E/fusion/blob/v0.9.3/service/pull/client/parse.go).
- I split out the logic for [querying a single feed](https://github.com/0x2E/fusion/blob/v0.9.3/service/pull/singlefeed.go#L78-L90) out from the component that manages multiple workers, which simplifies testing the logic for a single feed.
- I created [a simpler, clearer interface](https://github.com/0x2E/fusion/blob/v0.9.3/service/pull/singlefeed.go#L24-L28) for how this piece of code interacts with the database, which made it easier to mock out the database in tests.
- I created [a dedicated function for deciding whether to update a feed](https://github.com/0x2E/fusion/blob/v0.9.3/service/pull/handle.go#L65-L80) rather than intermingle the decision with other parts of the update workflow.

I'd like to tidy it up a bit further, but I'm pleased with the progress so far, and it's helped me fix several bugs and improve fusion's functionality.

### I should officially sunset What Got Done

In 2019, I [created a web app called What Got Done](/status-updates-to-nobody/). It was my first attempt at a real SaaS business, but I couldn't find any customers.

I still use it every week. I'm now on a five-year streak of posting weekly updates, but I'm the only consistent user. Occasionally, other people pick it up, but they typically get bored of it after a few weeks and stop posting updates.

I wrote it when I knew much less about web development. The site originally used Go, Vue 2, AppEngine, and Google Cloud Firestore. I've since [replaced AppEngine with fly.io and Firestore with SQLite](https://github.com/mtlynch/whatgotdone/pull/639), which made development a bit more pleasant, but I still find it miserable to work in Vue. I don't know of a good way to incrementally move from Vue to vanilla JavaScript, and I don't want to invest 30+ hours in a giant rewrite.

I realized recently that the site would make more sense as a static site that I generate with Hugo: I'd write my weekly updates in whatever editor I want, and then when I push them to my main branch, and continuous integration would build the site and publish it. That's how this blog works. And for What Got Done, that would eliminate a lot of complexity around user accounts, authentication, and database management. Plus, it means that all of my updates are just on my filesystem as searchable plaintext rather than trapped in a SQL database.

It costs me nothing to keep the site running, and I've only had to spend about five hours per year on maintenance. So, I'm not in a rush to sunset it, but I did take the first step of closing signups.

At some point, I'll probably email recent users to announce sunsetting the project and let them export their data.

## Interesting links

- [Four years of running a SaaS in a competitive market](https://maxrozen.com/on-four-years-running-saas-competitive-market) - This is one of the best blog posts I've ever read about building a bootstrapped company. I [agree with](https://news.ycombinator.com/item?id=43581755) almost all the lessons Max shares. Everything rings true for me based on my experience as a bootstrapped founder.

## Wrap up

### What got done?

- Published ["No Longer My Favorite Git Commit"](https://mtlynch.io/no-longer-my-favorite-git-commit/)
- Published ["How to Write Blog Posts that Developers Read"](https://refactoringenglish.com/chapters/write-blog-posts-developers-read/)
- Released [Hacker News Popularity Contest](https://refactoringenglish.com/tools/hn-popularity/)

### Goals for next month

- Write a blog post about lessons from Kickstarter.
- Complete a new book chapter or teach a live session about a topic from the book.
- Coordinate rewards with all the Kickstarter backers who opted for a public thanks or editorial help with a blog post.

### Requests for help

TODO

<script src="script.js"></script>
