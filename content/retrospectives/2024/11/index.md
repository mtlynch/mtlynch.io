---
title: "Paternity Leave: Month 3"
date: "2024-11-13T00:00:00-05:00"
description: TODO - One-line summary
---

## Highlights

-

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Enjoy family time

- **Result**: Enjoyed time with my wife and son.
- **Grade**: A

I found it helpful since the last retrospective to remind myself that even when it seems like I'm going long stretches without working, I'm making that choice, and I'm still mostly in control of my time.

I'm still finding the right balance between work and family time, and things continue feeling better.

### Publish my tutorial on fuzz testing with Nix

- **Result**: I finally [finished the post](/nix-fuzz-testing-1/), but it didn't get much traction.
- **Grade**: A

I feel a bit conflicted about this post. Writing the post taught me a lot about Nix and fuzz testing, but I spent longer than I expected writing it. At first, I thought, "Oh, I can do a quick writeup in a few hours about what I did here," but I ended up spending 20+ hours on it.

I used to have a bad habit of feeling like once I learned something difficult, I absolutely had to write a blog post explaining it even if the audience for article was tiny or if I had no way of reaching readers. Previous examples include ["Hiring Content Writers: A Guide for Small Businesses"](/hiring-content-writers/) (there's an audience, but I don't have a good way of reaching them) and ["Retrofitting Apps for Cloud Storage with Zero Code Changes"](/retrofit-docker-gcs/) (too niche to be worth it).

I've spoken to readers who are glad that I've written those articles, but I also have to consider the opportunity cost. In the time I spent writing my Nix fuzzing article, was there another article that would benefit me more or reach more readers?

It's also discouraging to write software tutorials in an age of LLMs. Five years ago, there was a long-term return on tutorials, as people would discover them through web searches later. These days, if I write a niche tutorial, I think LLMs will just steal whatever I write, and the reader will have no idea it came from me.

## Easing back into work

One new change is that my wife offered to

## Implementing major features through stacked diffs

For the past few weeks, I've spent most of my hobby programming time on ScreenJournal, my movie review app. The idea of it is like letterboxd or Goodreads, but the reviews are private and the code is open-source.

I always wanted it to support reviewing both movies and TV shows, but I implemented movies first because they were simpler. I intentionally avoided design choices that would make it easier to add TV shows in the future, as I didn't know if it would ever happen, so I wanted to optimize for the functionality that was there.

Now, I want to support TV show reviews, so I have to make a lot of changes to the codebase where I assumed the user would always be reviewing a movie. The full changes will probably be about 2,000 lines of code, which is significantly larger than I'd like for a single changelist. I'm using the term "changelist," but I'm talking about something like a pull request in Github terms or a merge request in Gitlab terms.

Not aware of any command that says to push the whole stack back up. And then you have to force push, which makes the Github PR ugly.

https://steveklabnik.github.io/jujutsu-tutorial/advanced/simultaneous-edits.html

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-

### Requests for help

TODO
