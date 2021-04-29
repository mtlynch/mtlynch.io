---
title: My Eight-Year Quest to Digitize 45 Videotapes (Part One)
date: "2020-05-26T00:00:00Z"
tags:
- pyscenedetect
- digitizing
hero_image: cover.jpg
description: My journey to create a YouTube of memories from my family's old home videos.
discuss_urls:
  reddit: https://redd.it/gqxvxb
  hacker_news: https://news.ycombinator.com/item?id=24839848
---
For the last eight years, I've carried around this box of videotapes through four different apartments and one house. They're family home videos from my childhood.

{{< img src="videotapes.jpg" alt="All of my family's old home videos" maxWidth="500px" >}}

After 600+ hours of work, I finally digitized and organized them well enough to throw away the original tapes. Here's what the footage looks like now:

{{< gallery caption="All of my home videos, digitized and watchable from a private media sharing server" >}}
  {{< img src="mediagoblin-home.png" alt="MediaGoblin browse screen" maxWidth="440px" >}}
  {{< img src="mediagoblin-single-video.jpg" alt="Screenshot of MediaGoblin displaying a video" maxWidth="413px" >}}
{{< /gallery >}}

There are 513 separate clips, each with a title, description, a recording date, tags for everyone in the video, and everyone's ages at the time of the recording. I host everything on a private media-sharing website that only my family can access, and it costs less than $1 per month to keep it running.

This post explains how I did it, why it took me eight years, and how you can achieve the same thing with slightly less effort.

## My naïve first try

Around 2010, my mom bought some sort of VHS to DVD converter and ran all of our home videos through it.

{{< img src="original-dvds.jpg" alt="Photo of rewritable DVDs labeled by letter" caption="The original DVD copies of the tapes my mom made (I'm not sure what happened to the missing letters)" maxWidth="600px" >}}

The problem was that there was only one set of DVDs. Everyone in my family lived in a different state, which made it inconvenient to pass discs around.

In 2012, my sister gave me the DVDs. I ripped them to video files and threw them all up on cloud storage. Problem solved!

{{< img src="gcs-files.jpg" alt="Screenshot of my converted DVD files on Google Cloud Storage" caption="Sharing DVD rips of my family's home videos on Google Cloud Storage" maxWidth="900px" hasBorder="true" >}}

A few weeks later, I asked if anyone had watched the tapes. Nobody had. I hadn't either. In the age of YouTube, it seemed so boring to download a 3-hour mystery file in search of interesting footage.

The only one excited was my mom. "Okay, great," she said, "Now, can I *finally* throw out all these tapes?"

Uh oh. That was a scary question. What if there were tapes that we missed? What if we could digitize at a higher quality? What if there was interesting information on the VHS tape labels?

I'd never feel comfortable throwing away the original tapes until I was confident that we had a comprehensive capture of all the videos at the highest possible quality. That meant doing the work myself.

Little did I know what I was getting myself into.

## That doesn't sound so hard

If you're wondering why this took me eight years and hundreds of hours, I don't blame you. I thought it would be an easy project too.

Here's what the digitization process looks like from start to finish:

{{< img src="digitizing-process.jpg" alt="TODO" maxWidth="800px" hasBorder="true" >}}

Or rather, that's what the digitization process looks like in theory. Here's what it looked like in practice:

{{< img src="digitizing-process-reality.jpg" alt="TODO" maxWidth="800px" hasBorder="true" >}}

Most of the time I spent was in re-work. I'd complete a stage only to discover a flaw in my technique one or two steps later. For example, I captured video from 20 tapes before realizing that the audio was slightly out of sync. Or I discovered after weeks of editing that I'd been exporting video in a format that doesn't support online streaming.

For the sake of everyone's sanity, I'm explaining the process as if it had continual forward motion instead of constantly forcing my readers to jump backward and restart along with me.

## Step 1: Video capture

Okay, back to 2012. My mom was eager to end her 20-year custodianship of the family home videos, so the next time I saw her, she handed me a huge cardboard box of videotapes. My digitization adventure had begun.

The obvious solution would be to outsource it to a professional. There are plenty of digitization companies, including businesses that specialize in processing old home videos.

I'm reasonably privacy-sensitive, so I felt uncomfortable handing strangers footage that includes me potty training (at the appropriate age; nothing weird!). Besides, I thought, how hard could it be to digitize video?

Spoiler alert: really hard.

### My first attempt at video capture

The old family VCR was still in my dad's basement, so I asked him to dig it out next time we met for lunch. I bought a [cheap RCA to USB adaptor](https://smile.amazon.com/gp/product/B00M7T8T1E/) from Amazon, and I was off to the races.

{{< img src="totmc-adaptor.jpg" alt="Picture of TOTMC RCA to USB adaptor" caption="The [TOTMC video capture device](https://smile.amazon.com/gp/product/B00M7T8T1E/), the first of many A/V devices I purchased throughout this process." maxWidth="400px" hasBorder="true" >}}

To process the video from the USB capture device, I used VirtualDub, which was a bit dated in 2012, but not *that* dated.

{{< img src="virtualdub-capture.jpg" alt="Capturing video in [VirtualDub](http://www.virtualdub.org)" caption="Using VirtualDub to capture raw footage of me reading to my dad at age 4" maxWidth="650px" hasBorder="true" >}}

### The pernicious plague of audio skew

As I started the editing process, I realized that the audio and video were slightly out of sync. Okay, no problem. I can shift the audio a little bit.

Ten minutes later, it was out of sync again. Did I not shift it enough the first time?

It slowly dawned on me that the audio and video weren't simply offset &mdash; they captured at different rates. They diverged more and more throughout the tape. To keep them in sync, I'd repeatedly have to adjust the audio manually every few minutes of tape.

{{< img src="audio-skew.jpg" alt="Diagram of audio skew with and without correction" maxWidth="800px" hasBorder="true" caption="If your video setup captures audio and video at different rates, the only solution is to correct the audio by hand every few minutes." >}}

Do you know how difficult it is to distinguish between a sound that occurs 10 milliseconds too early or 10 milliseconds too late? It's tough! Judge for yourself.

Here's a video of me playing with my poor, patient kitten Black Magic. The audio is slightly out of sync with the video. Is the audio ahead of the video or behind it?

{{< video src="magicjump.mp4" caption="Example of a video clip with audio and video out of sync" >}}

Here's the part where Magic jumps, slowed to 1/5th speed:

{{< video src="magicjump-slowmo.mp4" caption="Audio and video out of sync, slowed to 1/5th speed" >}}

{{<notice type="info">}}
**Answer**: The audio is coming in a few milliseconds late.
{{</notice>}}

### Maybe I should spend an extra hundred dollars instead of wasting hundreds of hours

Audio correction alone took hours of tedious, maddening work. It finally occurred to me that I might avoid this headache if I chose something other than Amazon's cheapest video capture device. After a bit more research, I bought a new one:

{{< img src="S-Video-capture.jpg" alt="GV-USB2 video capture device" caption="My second attempt at [purchasing a video capture device](https://smile.amazon.com/gp/product/B00428BF1Y/)" maxWidth="300px" >}}

Even with the new device, there was still audio skew.

### Going super

Maybe it was the VCR. [Digitization forums](http://www.digitalfaq.com/guides/video/capture-playback-hardware.htm) said audio skew wouldn't happen with a VCR that had a "time-based corrector" (TBC), a common feature on Super VHS (S-VHS) VCRs.

Of course! What was I doing messing around with my dumb *regular* VCR when there was a **super** VCR that could solve my problem?

Nobody makes S-VHS VCRs anymore, but they're still available on eBay. I spent $179 on a JVC SR-V10U, a VCR model that's supposedly well-suited to VHS digitization:

{{< img src="jvc-vcr.jpg" alt="Photo of expensive VCR with S-VHS support" caption="The vintage JVC SR-V10U VCR that I bought on eBay for $179" maxWidth="650px" >}}

The super VCR arrived in the mail. After months of struggling with mismatched sound, I was overjoyed to have right in my hands the equipment that promised to solve all my problems.

I opened the box, hooked everything up, and the audio was still out of sync. Sigh.

### Tedious troubleshooting and the multi-year rut

Troubleshooting my hardware was miserable. I'd haul all the equipment out of my closet, crawl behind my desktop to plug everything in, try a capture, and see that it didn't work.

Oh, a random forum post from 2008 says to install some sketchy, unsigned Chinese device driver? It's a terrible idea, but I'm desperate. It doesn't fix the problem.

I tried different capturing software. I bought a [special VHS tape](https://smile.amazon.com/gp/product/B000001ON6) to clean the magnetic heads of my VCR. I bought a [third capture device](https://smile.amazon.com/gp/product/B00EAS14KI/ref/). The results were always the same.

Invariably, I'd give up, disconnect everything, and banish the equipment to my closet for another few months.

### Surrendering to digitization professionals

Fast forward to 2018. I had dragged these videotapes and tons of equipment to four different apartments, and I was preparing to [move from New York City to Massachusetts](/solo-developer-year-1/#so-i-bought-a-house). I couldn't justify moving this stuff again when it had become clear that I'd never finish the project on my own.

I asked my family if they'd be comfortable with me sending the tapes to a digitization company. Fortunately, nobody minded &mdash; they were all much more interested in seeing the footage again.

>**Me**: But it means some company has access to all of our home videos. You're okay with that?<br>
>**My sister**: Yeah, I don't care. You're the only one who worries about that. Wait, you could have just paid someone to do that from the start?<br>
>**Me**: Uh...

It cost $750 to digitize all 45 tapes. That may sound expensive, but by that point, I would have paid anything to avoid another minute of troubleshooting video equipment.

When the files came back, the quality was undisputably better. My captures always had "tearing" around the edges, but the specialists digitized everything without any distortion. Best of all, the audio and video synced up perfectly.

Here's a video that compares the digitization company's capture with one of my own:

{{< video src="programming-pro-vs-mine.mp4" caption="A comparison of professional video capture vs. my own on a tape of my mom recording my first experience writing code" maxWidth="640px" >}}

## Step 2: Editing

With home videos, about 90% of the footage is boring, 8% is entertaining, and 2% is amazing. After you digitize the tapes, there's still lots of work to do.

### Editing with Adobe Premiere

VHS tapes contain a long stream of video clips mixed with dead air. To edit a tape, you have to identify where each clip starts and ends.

For my editing, I used [Adobe Premiere Elements](https://www.adobe.com/products/premiere-elements.html), which costs less than $100 for a lifetime license. Its crucial feature for editing VHS tapes is the zoomable timeline. It allows you to find rough scene boundaries quickly and then zoom in to find the exact video frame where a clip starts or ends.

{{< img src="premiere-elements-timeline.jpg" alt="Screenshot of Adobe Premiere Elements' zoomable edit feature" caption="The invaluable zoomable edit timeline in Adobe Premiere Elements" maxWidth="1000px" hasBorder="true" >}}

The problem with Premiere is that it requires frequent starting and stopping. My process was:

1. Open a raw capture file containing 30-120 minutes of video.
1. Mark the boundaries of an individual clip.
1. Export the clip.
1. Wait 2-15 minutes until the export completes.
1. Repeat steps 2-4 until the tape ends.

The long waits meant that I was constantly context-switching between video editing and some other task, scrambling my focus for hours

The other drawback was non-reproducibility. Fixing a small error was almost as hard as doing the entire thing from scratch. That bit me hard when I reached the video-sharing stage. Only then did I realize I should have been exporting the videos in a format that web browsers could stream natively. My options were to restart the tedious process of exporting hundreds of clips or to re-encode the exported videos to another format, degrading their quality.

### Robo-editing

After an embarrassing number of hours doing everything by hand, I wondered if I could simply throw artificial intelligence at the problem. Identifying clip boundaries seemed like a suitable machine learning task. I knew that accuracy would be less than perfect, but maybe it could do 80% of the work, and I'd fix the last 20% manually.

I experimented with a tool called [pyscenedetect](https://pyscenedetect.readthedocs.io/en/latest/), which analyzes video files and prints out the timecodes where scene changes occur:

```bash
 $ docker run \
    --volume "/videos:/opt" \
    handflucht/pyscenedetect \
    --input /opt/test.mp4 \
    --output /opt \
    detect-content --threshold 80 \
    list-scenes
[PySceneDetect] Output directory set:
  /opt
[PySceneDetect] Loaded 1 video, framerate: 29.97 FPS, resolution: 720 x 480
[PySceneDetect] Downscale factor set to 3, effective resolution: 240 x 160
[PySceneDetect] Scene list CSV file name format:
  $VIDEO_NAME-Scenes.csv
[PySceneDetect] Detecting scenes...
[PySceneDetect] Processed 55135 frames in 117.6 seconds (average 468.96 FPS).
[PySceneDetect] Detected 33 scenes, average shot length 55.7 seconds.
[PySceneDetect] Writing scene list to CSV file:
  /opt/test-Scenes.csv
[PySceneDetect] Scene List:
-----------------------------------------------------------------------
 | Scene # | Start Frame |  Start Time  |  End Frame  |   End Time   |
-----------------------------------------------------------------------
 |      1  |           0 | 00:00:00.000 |        1011 | 00:00:33.734 |
 |      2  |        1011 | 00:00:33.734 |        1292 | 00:00:43.110 |
 |      3  |        1292 | 00:00:43.110 |        1878 | 00:01:02.663 |
 |      4  |        1878 | 00:01:02.663 |        2027 | 00:01:07.634 |
 ...
```

It was indeed about 80% accurate, but checking the tool's work took more time than it saved me. Nevertheless, pyscenedetect sparked one of my most important realizations of this entire project: identifying scene boundaries and exporting clips are separate tasks.

### I remembered that I'm a programmer

Until that point, I had thought of "editing" as everything I was doing in Adobe Premiere. Chopping out subclips of raw footage felt inextricably tied to finding clip boundaries because that's how Premiere presented it. When pyscenedetect printed out its table of metadata, it made me realize I could decouple scene finding from video exporting. That was a gamechanger.

The reason that editing was so tedious and time-consuming was that I had to keep waiting for Premiere to export each clip. If I recorded the metadata in a spreadsheet and wrote a script that exported videos automatically, the editing process would fly by.

What's more, spreadsheets dramatically expanded the type of information I captured. Initially, I stuffed metadata into the filename, but that's limiting and inflexible. Having an entire spreadsheet allowed me to catalog so much more about the clip like who's in it, when it was recorded, and any other data I want to present alongside the video when people watch it.

{{< img src="spreadsheet.png" alt="Spreadsheet of home video metadata" caption="Capturing metadata about my home videos in a giant spreadsheet" maxWidth="750px" hasBorder="true" >}}

Later, I was able to use that metadata to add information to the clips like how old we all were and a detailed description of what's going on in the clip.

{{< img src="spreadsheet-to-meta.png" alt="Visualization of how items in my spreadsheet translate to metadata in my media sharing solution" caption="With the added flexibility of a spreadsheet, I can record metadata that gives more information about the clips and makes them easier to browse." maxWidth="800px" >}}

### The glory of an automated solution

With the spreadsheet in hand, I [wrote a script](https://github.com/mtlynch/process-home-videos) that chopped my raw videos into smaller clips based on a CSV input.

Here's a screen capture of what it looks like in action:

<script id="asciicast-iJEbKDENYw4oyKWWwqJroXNl4" data-speed="1.3" src="https://asciinema.org/a/iJEbKDENYw4oyKWWwqJroXNl4.js" async></script>

At this point, I'd spent **hundreds** of hours tediously selecting clip boundaries in Premiere, hitting export, waiting a few minutes for it to complete, then starting over. Not only that, I had repeated this process several times on the same footage after discovering quality problems later on.

Once I automated the clip slicing part, it was a massive weight off my shoulders. I didn't have to worry about forgetting metadata or picking the wrong output format. If I discovered a mistake after the fact, I could just tweak my script and rerun everything.

## Part two

Capturing and editing the clips was only half the battle. I still needed a way to share everything with my family in a way that was fun, secure, and affordable.

In [part two](/digitizing-2/) of this post, I describe the open source media server I used to share these clips with my family for only $0.77/month.

* [My Eight Year Quest to Digitize 45 Videotapes (Part Two)](/digitizing-2)

---

*Illustrations by [Loraine Yow](https://www.lolo-ology.com/).*

*Special thanks to my family for allowing me to share a selection of these clips and stills, for recording everything in the first place, and for being so supportive throughout this process.*
