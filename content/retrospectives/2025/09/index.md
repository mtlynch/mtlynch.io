---
title: "Educational Products: Month 11"
date: "2025-09-09"
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

### Write personalized emails to 20 readers I haven't spoken to before

- **Result**: XX
- **Grade**: XX

TODO

### Publish a new chapter of _Refactoring English_

- **Result**: XX
- **Grade**: XX

TODO

### Complete [my remaining marketing tasks](/retrospectives/2025/07/#how-can-i-improve-marketing-for-the-book)

- **Result**: XX
- **Grade**: XX

TODO

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

## The surprising difficulty of editing a 30-minute video interview

Back in July 2024, I recorded an interview with Adam Gordon Bell as part of my reboot of _Hit the Front Page of Hacker News_. I ended up not being able to finish recording the course before I took paternity leave, so I shelved the reboot indefinitely.

That left me in an awkward spot with this interview. Adam was kind enough to volunteer his time to me, so I felt guitly not publishing the interview at all.

When I started offering early access to _Refactoring English_, I thought it would be a good time to release the interview. If people liked the interview, maybe they'd check out the book.

You know those tasks you put off forever, and you think, "I've been putting this off for so long, and it's so silly because if I just sat down and did it, I'd be done in an hour and I could stop carrying it around in my head." I thought for sure this interview would be like that.

It ended up not being like that.

### The return of the plague of audio skew

I recorded the interview using a service called Riverside. After the call, Riverside generated video files for both ends of the call and a merged, sync'ed version of the conversation. I spot-checked the videos to verify they worked but never watched them start to finish.

I thought the work would just be taking the merged version and throwing it up on YouTube. Maybe if there were interruptions or long digressions, I'd trim them out, but I figured the video was nearly done.

When I finally sat down to watch the video carefully a year after recording it, I realized that the audio and video were [out of sync](/digitizing-1/#the-pernicious-plague-of-audio-skew). You could hear our voices before our lips moved in the video.

{{<video src="bad-sync.mp4" caption="In the video Riverside generated, the audio and video were slightly out of sync.">}}

Okay, no problem. I could reprocess the video with ffmpeg to shift the audio slightly.

Nope, it turned out that the audio skew was different on either end of the conversation. Adam's end was shifted about 425ms, while mine was about 150ms. That meant I had to go back to the original, unmerged videos of the separate ends of our conversation, fix the skew in those, then re-merge them myself.

### Searching for a usable open-source video editor

My standard tool for editing video used to be Adobe Premiere, but I switched to Linux last year, and Premiere isn't available for Linux. Plus, I'm sick of Adobe as a company at this point.

I started editing the videos in Shotcut, a video editor I'd been learning last summer. It took a while to figure out how to even show side-by-side videos in Shotcut, but I eventually hacked something together with zoom and crop filters.

Playback when I edited was incredibly choppy because even on my [fairly new, high-end desktop](/retrospectives/2024/12/#building-my-new-development-desktop), it was choking while merging two 1080p videos. So, to hear how the video actually sounded, I had to export the video. And Shotcut doesn't support exporting only a portion of a video, so I was exporting the full 30 minutes, which took several hours each time. Sidenote: I eventually discovered you can downscale playback in Shotcut for faster performance during editing.

When watching the exported videos, I noticed that every time I split a clip, Shotcut would insert a loud pop. Even if I didn't actually cut anything at the split point, it still happened. The mere act of splitting one contiguous clip into two adjacent clips created the pop artifact.

{{<img src="shotcut-split.webp" has-border="false" caption="Just splitting a clip without making any change to it created a &ldquo;pop&rdquo; in the audio.">}}

I discovered the pops are [a known issue in Shotcut](https://forum.shotcut.org/t/splitting-audio-adds-pops-clicks/24903), which I couldn't believe. How can anyone edit video when every split in the video adds a distracting audio artifact? But a lot of commenters said that _every_ video or audio editing tool has this same problem.

What?!?

I've edited hundreds of media files using other tools, and I've never seen any of them insert pops when I split a clip.

I tried other open-source video editing tools for Linux. Kdenlive crashed a few minutes into me trying to edit. Flowblade couldn't load at all, but I eventually found [a workaround](https://github.com/jliljebl/flowblade/blob/af9610bdc12c453ac9bd03bd1b97f68ab6a0482e/README.md). And Flowblade seemed like a simpler version of Shotcut, so I started over in the editing process in Flowblade and had to figure out how to create side-by-side video in Flowblade.

After about an hour of editing in Flowblade, I tried exporting the video, and the pops were back. They [had a bug about it, too](https://github.com/jliljebl/flowblade/issues/799), and their understanding of it was [based on an explanation from Dan Dennedy](https://github.com/jliljebl/flowblade/issues/799#issuecomment-634252961), who is... the author of Shotcut. And it seemed like Flowblade was built on top of MLT, the same media framework that powers Shotcut. So, I was back to the exact same bug.

Anyway, this is already way too long and boring, so to skip to the end: I eventually worked around the pops by converting the audio sampling rate on the videos from 44.1 kHz to 48 kHz, which fixed it for some reason.

I ran into lots of other bugs, but they're too tedious to recount here.

### Takeaways for editing video

- Do as much pre-processing as possible using ffmpeg scripts.
- Save the ffmpeg scripts in case you need to tweak the pre-processing later.
  - Even if you're _so_ confident you won't need to do any pre-processing, save the scripts, ideally with source control.
- An audio sampling rate of 44.1 kHz apparently causes problems in editing, whereas I don't have any issues if I convert the rate to 48 kHz during pre-processing.
  - I have no idea why.

## Having too much fun with an interview transcript

When I finished editing the video with Adam Gordon Bell, that should have been it, right? I spent so much time on the video that surely I must have been eager to publish it and call it a day.

No! Once I finished editing the video, it was time to obsess over the transcript. Except, I actually had fun doing that part.

I feel like every transcript I read online, the designer was like, "Let's take all the fun and excitement of a courtroom transcript printed on a piece of paper, and do the exact same thing on the web!"

{{<img src="courtroom-transcript.webp" max-width="450px" caption="What if we could somehow use the web browser to make conversation transcripts more interesting?">}}

Come on! Let's take advantage of the web to do stuff that's not possible on a piece of paper:

- Use colors and formatting to make it obvious who's speaking.
- Make it easy to jump from the written transcript to the same moment in the video.
- Link to URLs the same way you would in a blog post.

Another common issue in transcripts is that the person transcribing the audio doesn't know anything about the subject, so there are mistakes from mishearing or misunderstanding words. For example, a transcriber who has never seen C code would have a hard time transcribing an interview about C code where they talk about "char star" (`char*`).

So, I spent a lot of time on this transcript making it accurate, interactive, and fun to read:

{{<img src="transcript.webp" max-width="600px" caption="I added mini-features to the interview transcript to make it fun to read.">}}

- Each end of the conversation appears in a distinct color of speech bubble, so it's easy to track who's talking.
- There are little play button icons in each speech bubble that jump to the video and start playback at the moment from the transcript.
- I pulled out my favorite quotes into big blockquotes.
- I structure different sections of the conversation with headings.

## Helping Tyler Cipriani reach #1 on Hacker News

Giving feedback to real writers helps me write my book, so I've been doing [freelance editing](https://refactoringenglish.com/services/blog-editing/) for other indie dev bloggers.

I really try to wow clients by putting a lot of effort into my notes, and I wanted some way of conveying that to potential clients other than just saying, "Trust me! My notes are really good!" I wanted to show a real example of the type of notes I write.

One of my past clients probably would have given me permission to publish their notes if I'd asked, but it felt unprofessional to use work they'd paid for as my own marketing, and I didn't want to negotiate a, "I'll give you back this much money if you let me," deal.

So, my plan was to find someone who would let me edit their post for free in exchange for me publishing the notes and them crediting me as the editor in the article.

My stretch goal was that their article would be popular in places where potential readers of my book might hang out, and if they got to the end and saw, "Edited by _Refactoring English_," they'd think, "Hey, what's that?" And it also looks good to potential clients if I can point to a past client and say, "Look, this person hired me, and their article succeeded in the places where you want to succeed."

A few months ago, Tyler Cipriani hired me for [a high-level review](https://refactoringenglish.com/services/blog-review/) of his blog. He seemed happy with the results, so I pitched him my free editing idea, and he agreed.

Tyler's article reached the #1 spot [on Hacker News](https://news.ycombinator.com/item?id=44916783), [Lobsters](https://lobste.rs/s/vew3ph/future_large_files_git_is_git), and [reddit](https://www.reddit.com/r/git/comments/1mrukfp/the_future_of_large_files_in_git_is_git/).

One of the biggest takeaways for both of us was the importance of tuning the writing for an audience.

## Side projects

## Wrap up

### What got done?

- Published ["Give Your Spouse the Gift of a Couple's Email Domain"](/couples-email-domain/)
- Published a [tutorial on flashing an AirGradient air quality monitor](/notes/flash-airgradient-cli/) from the command line.
- Published ["Reader Feedback about my Chapter List"](https://refactoringenglish.com/blog/chapter-interest-results/)
- Went back to using LeechBlockNG

### Lessons learned

-

### Goals for next month

-

### Requests for help

TODO
