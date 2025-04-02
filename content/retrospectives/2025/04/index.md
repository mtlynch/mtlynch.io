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

- **Result**: XX
- **Grade**: XX

TODO

### Publish the blogging chapter of _Refactoring English_.

- **Result**: XX
- **Grade**: XX

TODO

### Reach the front page of Hacker News twice by the end of March.

- **Result**: XX
- **Grade**: XX

TODO

## My book's pre-sale succeeded

I wrote a longer account of it [earlier this week](/book-pre-sale-just-barely-succeeded/), but my book's pre-sale succeeded.

For most of the month, it seemed doomed. It was on track to fall short of my $5k goal by about $1.5k, but then I

I didn't go into it in the story, but my posts consistently received good feedback on lobsters.

## Blogging like my livelihood depended on it

## I guess I'll just re-learn LaTeX

So far, I've been writing my book using Markdown in Hugo. I looked at Typst, and it's simpler than LaTeX, but it's still fairly complicated.

The other consideration is that

I worked at a security

## Getting more of the fusion RSS reader under test

- Before: [v.0.8.9](https://github.com/0x2E/fusion/tree/v0.8.9/service/pull)
- After: [v0.9.3](https://github.com/0x2E/fusion/tree/v0.9.3/service/pull)

Translate it into your own struct as quickly as possible. You didn't define

Similarly, define interfaces or function types for the external APIs that you call. This makes it explicit which parts of those APIs you need, and it simplifies testing because you don't have to mock out the entire API, just the part you use.

## Starting to sunset What Got Done

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
