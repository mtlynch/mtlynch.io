---
title: "Educational Products: Month 3"
date: "2025-01-09"
description: TODO - One-line summary
---

## Highlights

-

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Finish two chapters of _Refactoring English_

- **Result**: Finished one chapter and got 75% through the next.
- **Grade**: XX

TODO

### Work with a designer to complete the cover design for _Refactoring English_

- **Result**: Decided to do the cover design on my own.
- **Grade**: C

TODO

## Thoughts on finishing my first chapter

- Changing an article after it's published
- Too much bash
- Make examples copy/pasteable
  - Readers won't learn if they copy/paste.
- Revisions
- Feels unwieldy. There are still parts where that I felt flow poorly, but I was tired of editing it. I think 2,000 word chunks are my ideal. This was 5,400 words.
- The rule "Teach one thing" at publication time was called, "Boil it down to the essentials." I realized in participating in discussion that the original heading didn't really fit, and "Teach one thing" more crisply captured what I thihk.
- I got a lot of pushback on "Use computers to evaluate conditional logic"
  - I think they're right, and that was my weakest rule.
  - That was in my head because it was a rule I championed within TinyPilot, but it makes more sense in a troubleshooting context than in tutorials. For example, I would encourage support engineers to avoid things like, "If you're running version 1.9.2, run command `X`. If you're running version 1.9.3, run command `Y`." Instead, I tried as much as possible to give commands snippets that would just figure out the state of the system and do the right thing.

It's interesting getting responses from people who are like, "I think you're wrong about some of your advice. As evidence, look at this spectacular tutorial that I wrote." And then I read their tutorial, and it's offensively bad.

In truth, I'm happy to get that reaction because I feel immensely confident that those authors are wrong, and I'm right. Or not so much that they're "wrong" exactly, but I feel confident that I have a better read on what the majority of developers want than the people do that are giving me these critiques.

### What's the right way to iterate on an article after I publish it?

When [Salvatore Sanfilippo](http://antirez.com), creator of Redis, paused his programming work to write a sci-fi novel, he [observed](https://antirez.com/news/135):

> I believe the most sharp difference between writing and programming is that, once written, edited and finalized, a novel remains immutable, mostly.

He went on to say that programmers should learn from novelists and resist the urge to rewrite the core logic of their app after it's done, but it made me realize that the format of ebooks makes it easy to treat books more like software and keep iterating on it based on reader feedback.

I'm obviously not the first person to think of this, and the whole LeanPub platform is based on the idea of selling books as the author is in the process of writing and editing it.

My plan for

My blog posts are usually pretty static. Once I publish them, I don't rewrite them unless someone points out a mistake.

For the book, I'm trying to publish chapters in near-finished state, but I'm also treating them as non-final.

But it does create a problem I've never dealt with before in that I'm messing up past discussion. Like on Hacker News, Lobsters, and reddit, commenters disagreed with my point about "Let computers evaluate conditional logic." And I think they're right. That was my weakest point, and I'm probably going to cut it. But if I cut it, it's confusing for anyone reading these discussions wondering why people are disagreeing with a point that never appears in the post.

The best solution I can think of is to include a note at the bottom saying that I'm still revising it and link to the version of the chapter as it was originally published.

### What's my marketing strategy now?

It wasn't a sensational reception, but it got a decent response on Lobsters, Hacker News, and the /r/programming subreddit.

I thought, "Okay, I need to just keep sharing preview chapters like this to those same channels."

Then, I reviewed my table of contents and realized that this is basically my only chapter that works on any of the channels where I shared it. Most of those channels have a rule that's basically, "If there's no code in the post, it doesn't belong here." So, /r/programming is probably not going to be excited to read my ranty chapter about why I hate the passive voice.

One idea I've had is to do freelance editing for other writers and use that to inform the _Refactoring English_. Except I don't think "editing" is exactly what I'd be good at. Like I think people hear editor and think I'm going to polish their writing for them, but what I actually want to do is identify problems in their writing and explain principles and techniques to help them improve it themselves.

## My poor experience hiring a book cover designer through Reedsy

One of my distractions in November from working on my book was to convince myself I needed [a professionally-designed cover](/retrospectives/2024/12/#maybe-i-need-a-book-cover). I started the process in November, but work was scheduled to happen in December.

I found the designer through Reedsy, a platform that several people recommended in the Write Useful Books community. The common review was that it was pricey but worth it.

I wrote [a design brief](https://docs.google.com/document/d/1SUQ6GTeyL-XWmZYlJdQgyvQHZdHiUvCy0G-dh5nnrQM/edit?usp=sharing) explaining what I wanted and sent it to four designers. My budget was $350-650. One bid 20% over my max budget, another declined saying that my budget was too low, and one never responded.

The only valid bid came from Gary, who offered to do the cover for £350 (US$434). He had a portfolio with dozens of book covers and a perfect 5.0-star rating on Reedsy. He proposed a one-month timeline, with the fee split into three payments, which seemed fine to me, so I hired him.

### Working with Gary

A week went by, and I hadn't heard anything. After my first payment was auto-billed, I asked for an ETA on when I could see some drafts, and he said he'd send concepts the next day, which he did.

{{<img src="cover-ideas.webp" max-width="800px" caption="Initial book cover ideas from the designer I hired through Reedsy">}}

Sample 01 looked good, but it was a direct ripoff of [_Beautiful Code_](https://www.oreilly.com/library/view/beautiful-code/9780596510046/), which I had cited in my brief.
I found the rest underwhelming, but I blamed myself for not spending more time on my brief.

As I reviewed the concepts, I realized what I cared about conveying was the idea of careful, deliberate work. I felt like Sample 06 of the zen garden and Sample 05 of the clay mold were on the right track, so I asked to explore those. I suggested an image of a sculptor carving stone.

Another week went by, and Gary sent a minor variation on the zen garden idea, and a cover where someone was holding a chisel to a raw stone.

The next week was the holidays, and I started to worry that the project wouldn't complete by the December 30th finish date. Gary emailed me the Monday before Christmas to say he was returning to work on December 27th.

By the end of the day on December 27th, I realized I was in a bit of a pickle. Gary was in the UK, so his business day was long over. Reedsy was going to auto-bill me at noon ET on December 30th, but that was a Monday. And Reedsy prohibits me from disputing a bill in the last 24 hours, so I had zero business days left to get completed work.

I asked Reedsy support to push back my final payment a week, as Gary hadn't delivered his work. Reedsy told me that I had to take it up with Gary. I explained that if I waited until the next business day to get a response from Gary, Reedsy would auto-bill me. Reedsy support insisted I try to resolve it with Gary anyway.

I tried to remove my credit card from Reedsy, but they prevent you from removing your card without replacing it with another.

I emailed Gary at 5 PM ET on Friday, and he responded that he didn't work "corporate hours," so he was still on track to finish the project by working the weekend, but he pushed back my payment as a courtesy. He seemed miffed that I'd complained to Reedsy and said no client had behaved that way.

I, on the other hand, do try to stick to regular working hours, so I didn't want to spend my weekend rushing to finish this project with Gary. I snoozed the emails until Monday, but Reedsy sent me another email Saturday warning me that if I didn't log in and accept the new payment schedule within 24 hours, it would revert back to the original. So, I logged in and did that and put off the rest of the discussion until Monday.

When I checked on Monday, Gary had sent updates on the two concepts, but they were both pretty mediocre. One looked clearly AI-generated and unrealistic. The other was just not capturing the tone I asked for.

I pressed Gary for details about whether the images were AI-generated and if they met the license requirements I'd specified in my brief. He got cagey at that point, so I asked to cancel the project. I offered that he could keep the £231 (US$287) I already paid, but I'd cancel the final payment. He agreed, so that was that.

I gave Gary a 3-star review across the board. I didn't think he was awful, but just kinda meh and bad at communicating timelines. My review is public, but Reedsy still claims that Gary has a perfect 5.0-star rating even though he only has five reviews.

{{<img src="gary-reedsy-reviews.webp" max-width="800px" caption="Despite me giving Gary a 3-star review, he still has a perfect 5.0 rating with five reviews." has-border="true">}}

### My DIY book cover

I found [a royalty-free image on Unsplash](https://unsplash.com/photos/shallow-focus-photo-gray-balance-stone-HWRAHxoBlpU) that I felt captured the spirit of quiet, careful work, and added I some text.

{{<img src="refactoring-english-cover-800px.webp" max-width="350px" has-border="true">}}

I know it looks amateurish, but I'm about 80% as satisfied as I expected to be with Gary's work. But this was free and took me an hour. I'm treating it as a placeholder, and I can always hire someone or invest more time later.

### Takeaways for hiring a graphic designer

- Tie payments to project milestones, not dates.
- Be explicit about whether you're okay with the designer using AI-generated images or AI-assisted image compositing.
- Be explicit that you want to see license information for third-party assets like photos or fonts.
  - I had said in the brief that all the assets needed to have compatible licenses.
  - It would have been better to say the contractor had to deliver the license information and not just pinky promise that they're providing an asset in compliance with its license.
- Don't plan a project that's supposed to end right after Christmas.
- Reedsy biases the experience heavily to favor contractors rather than its clients.

## NixOS encourages me to make mini-utilities

I started writing this as part of the retrospective, but I thought it would work as its own standalone post:

- ["NixOS encourages me to make mini-utilities"](/notes/nixos-encourages-mini-utilities/)

## Side projects

### Making PicoShare work with large files

## Wrap up

### What got done?

- Set up my new NixOS system.
- Set up offlineimap to keep a local copy of my email, and I back it up with daily snapshots.

### Lessons learned

-

### Goals for next month

-

### Requests for help

- TODO
