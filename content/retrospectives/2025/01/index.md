---
title: "Educational Products: Month 1"
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
- **Grade**: XX

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

I checked for recommendations in the Write Useful Books community, and several people described mentioned Reedsy, a service I'd never heard of before. They common review was that it was pricey but worth it.

I wrote [a design brief](https://docs.google.com/document/d/1SUQ6GTeyL-XWmZYlJdQgyvQHZdHiUvCy0G-dh5nnrQM/edit?usp=sharing) explaining what I wanted and sent it to three designers. One of them bid

Gary had a portfolio with dozens of book covers and a perfect 5.0-star rating. He proposed a one-month timeline, with the fee split into three payments, which seemed fine to me.

Gary wasn't awful, but he was just kind of mediocre and slow. A week went by, and I hadn't heard anything. After my first payment was auto-billed, I asked for an ETA on when I could see some drafts, and he said he'd send concepts the next day, which he did.

{{<img src="cover-ideas.webp" max-width="800px" caption="Initial book cover ideas from the designer I hired through Reedsy">}}

Sample 01 looked good, but it was a direct ripoff of [_Beautiful Code_](https://www.oreilly.com/library/view/beautiful-code/9780596510046/), which I had cited in my brief.
I found the rest underwhelming, but I felt like it was my fault for not spending more time on my brief.

As I reviewed the concepts, I realized what I cared about conveying was the idea of careful, deliberate work. I felt like Sample 06 of the zen garden and Sample 05 of the clay mold were on the right track, so I asked to explore those.

Another week went by, and Gary sent a minor variation on the zen garden idea, and a cover where someone was starting to

The next week was the holidays, and I started to worry that the project wouldn't complete by the December 30th finish date. Gary emailed me the Monday before Christmas to say he was returning to work on December 27th.

I found [a royalty-free image on Unsplash](https://unsplash.com/photos/shallow-focus-photo-gray-balance-stone-HWRAHxoBlpU) that I felt captured the spirit of quiet, careful work, and added I some text.

{{<img src="refactoring-english-cover-800px.webp" max-width="350px" has-border="true">}}

I know it looks amateurish, but I'm about 80% as satisfied as I expected to be with Gary's work. But this was free and took me an hour. I'm treating it as a placeholder, and I can always hire someone or invest more time later.

The experience also put me off Reedsy. Reedsy wouldn't allow me to cancel my final payment. I tried to delete my credit card, but they prevent you from removing your card without replacing it with another one.

I gave Gary a 3-star review across the board, and my review is public, but Reedsy still claims that Gary has a perfect 5.0-star rating even though he only has five reviews.

Takeaways:

- Tie payments to project milestones.
- Be explicit about whether you're okay with the designer using AI-generated images or AI-assisted image compositing.
- Be explicit that you want to see license information for third-party assets like photos or fonts.
  - I had said in the brief that all the assets needed to have compatible licenses, but it would have been better to say they had to deliver the license information and not just pinky promise that it's okay.
- Reedsy sides heavily with its platform vendors rather than its clients.

## NixOS encourages me to make mini-utilities

One of my favorite things about using NixOS is that it rewards me for creating personal utilities.

I create a lot of personal utilities anyway, but

### Streamabilizer: Make videos web-streamable

A utility I've wanted for years but never bothered to make is a tool for making videos web-streamable. Modern browsers can play MP4 videos natively, but the video has to be encoded specifically to support web streaming.

Sometimes, I'll want to throw a video onto PicoShare to send someone, but the video isn't web-streamable. So, I find the [SuperUser answer](https://superuser.com/a/438471) I've found 100x times before, copy the ffmpeg incantation, modify it for my filename and the path to ffmpeg on my system, then run the command.

I always knew I should automate more of that. The easiest would be to create my own wrapper script so that I didn't have to look up ffmpeg's semantics. But then it would break if I installed a new version of ffmpeg. And then I'd have to remember where on my filesystem that wrapper script was. And then do I have to replicate the script between my laptop and desktop?

I could make a web interface, but Windows isn't so friendly to hosting web services in the background. And if I host it in the cloud, it's expensive because I need to run ffmpeg on the backend, so I need a whole server. And I'd have to put in abuse protection.

But if I'm already running NixOS, creating a utility to make web-streamable videos is so much less friction.

### Basic Go Web App: A basic Go web app

### Pointer Brother: Point to things in screenshots

Named in honor of [The Pointer Brothers](https://www.youtube.com/watch?v=0OwgTEB51Os)

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
