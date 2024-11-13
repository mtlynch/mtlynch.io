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

Now, I want to support TV show reviews, so I have to make a lot of changes to the codebase where I assumed the user would always be reviewing a movie.

The full changes will probably be about 2,000 lines of code, which is significantly larger than I'd like for a single changelist. I'm using the term "changelist," but I'm talking about something like a pull request in Github terms or a merge request in Gitlab terms.

In the past, the way I've tackled large changes like this is that I have a feature branch that's in a broken or incomplete state until I finish the feature. I either make changes directly into the feature branch or I branch off that feature branch again for a subtask and then merge in the subtask when I'm done.

The problem with this approach is that the feature branch becomes a giant blob of changes that are too large to understand. You can see an example of this [when I migrated What Got Done from Firestore to SQLite](https://github.com/mtlynch/whatgotdone/pull/639). There were lots of substeps within that change, but they're not inspectable because everything is mixed together.

So, for this ScreenJournal change, I tried something different. Instead of keeping a big, messy feature branch, I did stacked diffs. I started by looking for a small complete subtask that . I decided to start with the search screen. The original ScreenJournal review flow starts with the user searching for the movie they want to review. I had to edit this page to let the user pick a movie or TV show.

Not aware of any command that says to push the whole stack back up. And then you have to force push, which makes the Github PR ugly.

https://steveklabnik.github.io/jujutsu-tutorial/advanced/simultaneous-edits.html

## Recommendations

- ["Why I still blog after 15 years"](https://www.jonashietala.se/blog/2024/09/25/why_i_still_blog_after_15_years) by Jonas Hietala
  - I related a lot to his post about blogging, and as I explored his site more, I was like, "Oh, this guy is like the Swedish version of me." So if you enjoy my writing, you'd probably enjoy his as well.
- ["Notes on Ukraine"](https://mattlakeman.org/2022/05/15/notes-on-ukraine/) by Matt Lakeman
  - I discovered Lakeman's blog last week, and every day since then, I just keep thinking, "Who is this guy?" He travels to not-so-popular destinations, usually for ten days or so and then publishes a blog post about the country. But it's not like postcard to your mom blog posts; these are novella-length blog posts based on hours of study of the history of the country and conversations with locals.
  - I also discovered that he has a long posting history elsewhere on the Internet under the username `dormin111`.
  - The craziest thing about all his work is that there's seemingly no angle. Usually, when you see someone invest so much into their writing, it's usually obvious how it benefits them: they have a Substack or YouTube channel that earns them money, and their free articles are loss leaders for the thing that supports them financially. But I can't find any angle or profit motive in any of Lakeman's stuff. He just seems like a guy who loves thinking deeploy about things and sharing his thoughts.
  - Anyway, this Ukraine post, I naturally assumed he visited before the war, but it turned out that he visited two months into the war and interviewed people within miles of the front lines.
- Cyberpunk 2077 (video game)
  - I don't play video games much, but I buy one new game per year and play until I get bored, which usually takes 5-25 hours over a few days. I'm at about 25 hours of play with this game, and I'm still enjoying it, and I find its depth amazing. I think I've only explored like 3% of the game so far, so it amazes me that modern games have such expansive worlds.
  - I usually don't care about stories in video games and find it irritating when games make me sit through boring exposition, but Cyberpunk is one of the few games where I find the story compelling enough to pay attention. And it's cool to see them invest so much into voice acting to the point that Keanu Reeves plays a major role in the game.
- Detroiters (TV show)
  - I'd heard of this show, but I think the name always dissuaded me from watching. A show where the defining feature is that they live in Detroit? No thanks.
  - And then somehow I saw [this clip](https://www.youtube.com/watch?v=yWBqnpCCasg) from the show and realized that great people are in it, and the tone is like a slightly more grounded sitcom version of _I Think You Should Leave_. And I'm eight episodes in, and it's great.

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-

### Requests for help

TODO
