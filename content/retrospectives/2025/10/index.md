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

- **Result**: XX
- **Grade**: B+

TODO

### Publish a new chapter of _Refactoring English_

- **Result**: XX
- **Grade**: F

TODO

### Write personalized emails to 20 readers I haven't spoken to before

- **Result**: Emails two new readers
- **Grade**: D

I was going to write this off and say that I'm not learning anything anymore by reaching out to customers, but then a reader I reached out to in August followed up and said he used what he learned from my book to get his first article on the front page of Hacker News for the first time.

This is the third time I've set this goal and missed by a large margin, so I'm going to try just setting a lower goal. I think 20 is too intimidating, and I get too far behind and know I won't catch up. But if I add a reminder to myself to email one customer a day, that's more attainable.

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

## Experimenting with bunts

17 hours on "The Software Essays that Shaped Me," four hours on ["I Once Appeared in The Old New Thing"](/my-old-new-thing-cameo/).

Got to the front page and forgot to include an ad for the book. So like 8,000 readers saw it and had no idea I'm writing a book about this. D'oh! But lesson learned. I made it so that the ad is part of my template, so it appears by default rather than me having to remember to add it.

## Adjusting my approach to freelance editing

Two new clients hired me for editing this month, prompting me to think more about my strategy with editing.

My initial idea with taking on editing clients was that it's an opportunity to make sure the way I explain concepts in the book makes sense to real people. And at the beginning, the work gave me good ideas for my book. But as I do more jobs, I find that all the feedback I give is stuff I've already said in my book.

And there's also a pretty high cost to the editing. I put a lot of work into the editing, so I find that it eats up my "hard thinking" of the day, which conflicts with me doing other types of writing. With individual posts especially, I feel a time pressure, even though nobody has asked me to hurry. But just knowing my own writing process, it sucks to have gates where you're stuck for days waiting for feedback.

So, what I really wanted is some way to keep doing the editing, but _only_ for people who have read the book. I've doubled my normal rates for everyone, but I'm planning to email book customers and say that they get 80% off the listed rates if they pinky promise that they've read everything I've published so far.

## The hassle of sending post-purchase emails with Stripe

A few _Refactoring English_ customers have emailed me confused because they paid but never got an email with a link to the book. I collect payment through Stripe, and Stripe redirects customers to the book's URL after they complete payment or don't notice the redirect, they lose access to the book.

Whenever I get these emails, I dig around in Stripe to look for a setting to customize the emails, give up after a few minutes, and then just email the correct link to the customer.

Last month, I finally sat down and searched through Stripe's documentation and forum posts, and I can't find any way to customize the email Stripe sends after a customer completes a one-time payment. As far as I can tell, the only option is to spin up your own web server to listen for Stripe webhooks, then send your own emails from your own email provider. All because Stripe can't be bothered to let merchants customize any text in the payment completion emails...

Setting up a web server to respond to web hooks isn't _that_ hard, but it's a much bigger hassle than I'd like. I decided to do it with Netlify functions, which I've never used before. I was originally going to send the emails with Postmark, as I've [done that before](https://github.com/mtlynch/screenjournal/tree/ef234562c4157cebcb41d3d2647ca20678444da4/email), but it takes a surprising amount of Go code to send emails with SMTP. And that's not even getting into creating the emails to beging with.

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

-

### Requests for help

TODO
