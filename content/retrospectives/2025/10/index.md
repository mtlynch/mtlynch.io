---
title: "Refactoring English: Month 10"
date: "2025-10-08"
description: TODO - One-line summary
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

### Publish something that attracts new readers to the _Refactoring English_ website

- **Result**: Published ["The Software Essays that Shaped Me"](https://refactoringenglish.com/blog/software-essays-that-shaped-me/), which attracted 16k readers in the first three days
- **Grade**: B+

TODO

### Publish a new chapter of _Refactoring English_

- **Result**: Didn't publish anything new
- **Grade**: F

I wrote a first draft of a new chapter, but I didn't end up publishing it. I ended up spending more time than I planned on "The Software Essays that Shaped Me" and freelance editing clients.

### Write personalized emails to 20 readers I haven't spoken to before

- **Result**: Emailed two new readers
- **Grade**: D

I was going to write this off and say that I'm not learning anything anymore by reaching out to customers. Then, a few days ago, a reader I reached out to in August followed up to say he used what he learned from my book to get an article on the front page of Hacker News for the first time. So, that was pretty indisputably valuable and tells me I should be doing more of this.

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

## Experimenting with bunts

In baseball, a bunt is when you hold the bat in place to hit the ball rather than taking a swing and possibly missing. The upside is that you're less likely to miss the ball, but the downside is that you won't hit the ball very far. The best you can hope for with a bunt is making it to first base, but a bunt is almost never going to be a homerun.

Most of my blog posts are "swing for the fences" type posts where I'm trying for a homerun. I'm putting in a lot of effort because I'm hoping to reach #1 on Hacker News, reddit, or search results.

The problem is that my "swing for the fences" posts take me about a month to write, so I'd have to put my book on hold for a month every time I write one. I've been thinking about whether I could do some "bunt" posts instead. That way, I can only put my book on hold for a week rather than the whole month.

I don't want to take a topic that deserves a lot of effort and just do a low-effort version of it. Rather, I want to take a topic that's easy to cover and just see how it does.

17 hours on "The Software Essays that Shaped Me," four hours on ["I Once Appeared in The Old New Thing"](/my-old-new-thing-cameo/).

Previously, when I had posts do well on Hacker News, a noticeable portion of readers [purchased the book](/my-6k-advance/#publishing-book-excerpts). This time, only one person purchased. Maybe everyone seeing it on Hacker News has already seen that I'm writing the book, so everyone who's interested has already bought?

I woke up the morning after it had already fallen off the front page of Hacker News and suddenly realized: I never included the ad for the book!

All the sample chapters on the book's website include a little self-ad to tell the reader I'm writing a book on this topic, and they can buy early access.

TODO: Screenshot

I forgot to include the self-ad for the blog post, so 14k readers saw my post and had no idea I'm writing a book about this.

## Adjusting my approach to freelance editing

As I write my book, I also decided to offer freelance editing to help other developers improve writing on their blogs. My idea was that it's an opportunity to make sure the way I explain concepts in the book makes sense to real people.

At the beginning, freelance editing did give me good ideas for my book. But as I do more jobs, I'm getting fewer ideas for my book.

Two new clients hired me for editing this month, prompting me to think more about my strategy with editing.

And there's also a pretty high cost to the editing. Each job takes me between four to seven hours, and it eats up my "hard thinking" of the day, so it's hard for me to do my own writing in the same day. I also feel a time pressure, even though nobody has asked me to hurry. But just knowing my own writing process, it sucks to have gates where you're stuck for days waiting for feedback.

So, what I really wanted is some way to keep doing the editing, but _only_ for people who have read the book. I've doubled my normal rates for everyone, but I'm planning to email book customers and say that they get 90% off the listed rates if they pinky promise that they've read everything I've published so far and accompany their draft with a one-page addendum explaining what they were able to apply to their writing and what they didn't understand or struggled to put into practice.

I don't care that much about the money because I hope that whatever I could charge in the short term would be insignificant relative to what I'd make long-term from writing a better book. But there's value in clients paying so that they feel like they have skin in the game, too.

## Why do I keep skipping out on reader outreach?

I keep setting this goal and missing, and I'm not sure why. On its face, it doesn't seem that hard, but it never seems like the most important thing, so I keep deferring it.

There are other tasks I procrastinate because I don't enjoy doing it, but I actually do enjoy reaching out to readers. It's fun to see what different readers are up to and how they might apply my techniques.

Emailing readers also requires a lot of activation energy because I have to:

1. Go to my list of pre-paid readers
1. Look for ones that have a website (so I can say something personalized)
1. Read through their website to learn more about them
1. Write an email and word it carefully to avoid sounding AI-generated

This is the third time I've set this goal and missed by a large margin, so I'm going to try just setting a lower goal. I'm also going to try to reduce the activation energy by first gathering a list of customers to email and their websites. That way, when I'm in the mood to reach out, so I'm not starting from scratch every time.

## The hassle of sending post-purchase emails with Stripe

A few _Refactoring English_ customers have emailed me confused because they paid but never got an email with a link to the book. I collect payment through Stripe, and Stripe redirects customers to the book's URL after they complete payment or don't notice the redirect, they lose access to the book.

Whenever I get these emails, I dig around in Stripe to look for a setting to customize the emails, give up after a few minutes, and then just email the correct link to the customer.

Last month, I finally sat down and searched through Stripe's documentation and forum posts, and I can't find any way to customize the email Stripe sends after a customer completes a one-time payment. As far as I can tell, the only option is to spin up your own web server to listen for Stripe webhooks, then send your own emails from your own email provider. All because Stripe can't be bothered to let merchants customize any text in the payment completion emails...

Setting up a web server to respond to web hooks isn't _that_ hard, but it's a much bigger hassle than I'd like. I decided to do it with Netlify functions, which I've never used before.

I was originally going to send the emails with Postmark. I've [done that on other projects](https://github.com/mtlynch/screenjournal/tree/ef234562c4157cebcb41d3d2647ca20678444da4/email), but it takes a surprising amount of Go code to send emails with SMTP. And then even doing a minimal amount of text formatting is another layer of complexity. I've also been less enthusiastic about Postmark since it was sold from Wildbit (a company I admire) to ActiveCampaign (a spam company).

I decided partway into coding it that it's simpler if I automatically add the customer to Buttondown, my mailing list manager, and then I set up Buttondown to automatically send users a post-purchase email when I add them to the list. That way, I'm outsourcing the email design, formatting, and sending to Buttondown. It keeps my webhook simple because all it has to do is receive a notification from Stripe, verify it's for the right product, and then POST a request to Buttondown to add the user to the list. I'd been wanting to set up something to automatically sync to Buttondown anyway so that all customers get new chapter announcements.

But I still feel like it's silly that Stripe doesn't let me just customize my post-purchase emails...

## Side projects

### I just want to watch TV on my Roku

Recently, I noticed that when I tried to use the Jellyfin streaming app on my Roku to watch TV shows and movies from my storage server, the video would take a long time to load and then hang every few minutes. I felt like I was back in the "Bufferring..." era of streaming video with RealPlayer back in the 90s.

I checked my storage server's metrics and noticed that the CPU was pegged to 100% when I tried to watch. I figured maybe the CPU I bought in XX wasn't cutting it anymore, so I found the fastest compatible version and bought it used on eBay for $130. It arrived with bent pins, but I fortunately was able to realign them with a utility knife and get the CPU working.

I tried streaming video again, and it was still pegging the CPU. So much for the new CPU.

Then, I thought, "Why is this pegging the CPU at all? If the Roku needs the video in another format, can't I just re-encode it to that format offline?" I save most of my media in H.264, which plays natively in web browsers without transcoding. The [Roku specs](https://developer.roku.com/docs/specs/media/streaming-specifications.md) say that Roku devices support H.264 natively, and they suggested that this was true even for my ancient 2016 model Roku Premiere. I tried encoding videos to different formats, and they all had the same skipping issue.

Fortunately, streaming devices have come down a lot in price since I last bought one, which I fear is due to Roku finding other ways to monetize me as a customer. But it was only $30 to buy a Roku Streaming Stick Plus, so I upgraded to that. And I got everything set up and... videos still stuttered.

So, I finally questioned whether this was a bug in the Jellyfin client source code. Fortunately, it's open source, so I could peek in. I looked at recent bugs and found that someone had reported subtitles were always on, something I also noticed.

After spending several hours debugging it, I noticed that Roku had a bunch of options around transcoding. I adjusted all of them to eliminate bitrate limits and attempt to play videos natively rather than transcode, and it worked! Videos worked again on my old Roku, too. If only I'd found that first before buying a whole new Roku and CPU. But now I can watch

And I'm kind of sucked into Jellyfin development now, so I'm trying to act on some opportunities for improvement that I noticed while debugging my issue.

### Breaking down Hacker News success by the hour

I initially thought I had a bug that overcounted the success rate, as the percentage of Hacker News submissions that reach the front page feels lower than 12% in my experience. But then I looked at some random slices from the last few days, and it seems to match up. If I browse `/newest`, there will typically be 2-5 stories that reached the front page. I found [a 30-minute slice from a few days ago](https://news.ycombinator.com/newest?next=45440276&n=1081) where 27% of submissions reached the front page, which is surprising.

I thought that success rate would be significantly higher on the weekends, when there are fewer submissions. It turns out that's true, but the effect is much smaller than I thought. 12.0% of submissions reach the front page on weekdays, whereas 13.7% make it on weekends. I thought it was going to be a 2-3x difference.

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

- Set up editing discounts for readers who have read the book

### Requests for help

TODO
