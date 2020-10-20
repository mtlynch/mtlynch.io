---
title: My Eight-Year Quest to Digitize 45 Videotapes (Part Two)
date: "2020-05-26T00:00:01Z"
tags:
- digitizing
- mediagoblin
- clipbucket
- docker
- gcsfuse
- nginx
- google cloud storage
images:
- digitizing-2/mediagoblin-home.png
description: How I used MediaGoblin and Google Cloud Storage to create a private media server for less than $1/month.
discuss_urls:
  reddit: https://redd.it/gqxvxb
  hacker_news: https://news.ycombinator.com/item?id=24839848
---

In [part one](/digitizing-1), I described my arduous journey to capture my old home movies in digital format and divide them into individual scenes. After processing all the clips, I wanted the experience of exploring them to be as simple as looking up clips on YouTube. Because these videos are my family's private memories, *actual* YouTube is too public. I needed a way to share them that was both user-friendly and secure.

## Step 3: Sharing

### ClipBucket, the open-source YouTube clone you can't really install

The first solution I tried was [ClipBucket](https://github.com/arslancb/clipbucket), which advertises itself as an open-source YouTube clone that you can self-host.

{{< img src="clipbucket-github.png" alt="ClipBucket's repository on Github" maxWidth="500px" hasBorder="true" caption="[ClipBucket](https://github.com/arslancb/clipbucket) is an open-source clone of YouTube that users can self-host (theoretically)." >}}

Puzzlingly, ClipBucket offered no installation instructions. Using a [third-party guide](https://linoxide.com/linux-how-to/setup-clipbucket-video-sharing-website-linux/), I [automated the installation process](/ansible-role-clipbucket/) using [Ansible](https://docs.ansible.com/ansible/latest/index.html), a configuration management tool for servers.

Part of the difficulty was that ClipBucket's installation scripts were flat-out broken. As a [Google employee](/why-i-quit-google/) at the time, I couldn't contribute patches to a YouTube clone, but [I submitted a bug report](https://github.com/arslancb/clipbucket/issues/223) that should have made the fixes obvious. Months went by, and they never acknowledged the problem. Instead, they introduced even *more* breaking errors on every release.

ClipBucket's business ran on a consulting model &mdash; they released their code for free and charged customers who needed help deploying it. Slowly, it dawned on me that the company earning money on paid installation support probably wasn't super interested in self-serve deployment.

### MediaGoblin, a more modern alternative

After a few months of frustration with ClipBucket, I reassessed what was available and found [MediaGoblin](https://mediagoblin.org/).

{{< img src="mediagoblin-homepage.png" alt="MediaGoblin's homepage" maxWidth="800px" caption="[MediaGoblin](https://mediagoblin.org/) is a self-hosted media sharing platform." >}}

There was plenty to like about MediaGoblin. Unlike ClipBucket's unsightly PHP, MediaGoblin was written in Python, a language in which I have plenty of experience. It included a [command-line interface](https://mediagoblin.readthedocs.io/en/v0.9.0/siteadmin/commandline-upload.html) that made it easy to automate video uploads. Best of all, MediaGoblin [offered a Docker image](https://wiki.mediagoblin.org/index.php?title=EasyDeployment&oldid=1874), which would eliminate any installation guesswork.

{{<notice type="info">}}
[**Docker**](https://www.docker.com/) is a technology that allows developers to build a self-contained environment for an application that runs anywhere. I rely on it heavily in [many of my projects](/tags/docker/).
{{</notice>}}

### The surprising difficulty of re-dockerizing MediaGoblin

I assumed MediaGoblin's Docker image would make deployment trivial. Well, not quite.

There were two features I needed that weren't available in the pre-built image:

* Authentication
  * MediaGoblin is public by default, so I needed a way to prevent strangers from accessing the site.
* Transcoding
  * Any time you upload a video, MediaGoblin attempts to re-encode it for optimal streaming. For videos that are already streaming-friendly, this step degrades quality and wastes processing cycles.
  * MediaGoblin offers [configuration options to skip transcoding](https://wiki.mediagoblin.org/Configure_MediaGoblin#Disable_transcoding), but the existing Docker image was non-configurable.

No problem. The Docker image was [open-source](https://notabug.org/dachary/mediagoblin-docker), so I could [rebuild it myself](https://github.com/mtlynch/mediagoblin-docker).

Sadly, the Docker image no longer built against the current [MediaGoblin repository](https://savannah.gnu.org/git/?group=mediagoblin). I tried syncing it to the version that matched the last successful build, but that failed as well. Even though I was building with the exact same code, MediaGoblin's external dependencies had changed out from under it, breaking the build. Dozens of hours later, after sitting through MediaGoblin's 10+ minute build process over and over again, I finally got it working.

Months later, the same thing happened. MediaGoblin's dependency churn has broken my build several times in the past couple of years, including once more as I was writing this article. I finally made [my own fork of MediaGoblin](https://github.com/mtlynch/mediagoblin) that [hardcoded all dependencies](https://github.com/mtlynch/mediagoblin/pull/8/files) to explicit versions. In other words, instead of dubiously stating that MediaGoblin works with any version of [celery](http://www.celeryproject.org/) >= 3.0, I set it to depend on celery's [4.2.1 release](https://pypi.org/project/celery/4.2.1/) because I've tested MediaGoblin against that version. It seems like MediaGoblin needs a [mechanism for reproducible builds](https://stackoverflow.com/a/52665767/90388), but I haven't yet taken that on.

Anyhow, after many hours of struggle, MediaGoblin finally reached a point where I could build and tweak it within Docker. From there, it was straightforward to [skip unnecessary video transcoding](https://github.com/mtlynch/mediagoblin-docker/blob/81a8a33840dd76bd82e200de3f4b26cbc180208b/mediagoblin.ini#L38-L43) and [add Nginx](https://github.com/mtlynch/mediagoblin-docker/blob/81a8a33840dd76bd82e200de3f4b26cbc180208b/default.conf.tmpl#L63-L64) for authentication.

## Step 4: Hosting

With MediaGoblin running under Docker on my local machine, the next step was to deploy my setup to a cloud server so my family could access the videos.

### MediaGoblin and the video storage problem

There are plenty of platforms that accept an application's Docker image and host it at a publicly-accessible URL. The wrinkle was that, in addition to the MediaGoblin application itself, there were 33 GB of video files to share. It was possible to hard-code them into the Docker image, but that was cumbersome and ugly. A one-line change to a configuration file would require me to re-deploy 33 GB of data.

When I was using ClipBucket, I solved this problem using [gcsfuse](https://github.com/GoogleCloudPlatform/gcsfuse), a utility that allows the operating system to load directories on Google Cloud Storage as regular filesystem paths. I put the video files on Google Cloud Storage and used gcsfuse to make them appear to ClipBucket as local files.

The difference was that ClipBucket ran in a full virtual machine, whereas MediaGoblin ran in a Docker container. Mounting cloud storage files under Docker turned out to be far more complicated. I spent dozens of hours solving all the gotchas and wrote a [whole blog post](/retrofit-docker-gcs/) about it.

{{< img src="mg-gcs-architecture.jpg" alt="Architecture diagram of MediaGoblin + Docker + gcsfuse" caption="Initial architecture for integrating MediaGoblin with Google Cloud Storage, documented in my [2018 blog post](/retrofit-docker-gcs/)" maxWidth="500px" hasBorder="True" >}}

After weeks of coercing all the components to play nicely together, it worked. Without making any changes to MediaGoblin's code, I was able to trick it into reading and writing its media files to Google Cloud Storage.

The only problem was that it made MediaGoblin unusably slow. Loading the video thumbnails on the homepage took a full 20 seconds. If you jumped forward while watching a video, MediaGoblin stalled for a 10-second eternity before resuming playback.

The underlying issue was that video and image files followed a long, circuitous route to the user. They had to go from Google Cloud Storage through gcsfuse to MediaGoblin to Nginx and then finally to the user's browser. gcsfuse was a major bottleneck, as it's not optimized for speed. It warns about its poor latency right [on the project homepage](https://github.com/GoogleCloudPlatform/gcsfuse#latency-and-rsync):

{{< img src="gcsfuse-latency.png" alt="Latency warning from gcsfuse Github repository" caption="Warnings in gcsfuse documentation [about slow performance](https://github.com/GoogleCloudPlatform/gcsfuse#latency-and-rsync)" maxWidth="700px" hasBorder="True" >}}

Ideally, the browser would fetch files directly from Google Cloud Storage, bypassing all the intermediate layers. How could I do that without delving into MediaGoblin's codebase and adding complicated integration logic for Google Cloud Storage?

### The Nginx `sub_filter` trick

Fortunately, I found a simple solution that was only *kind of* ugly. I [added this filter](https://github.com/mtlynch/mediagoblin-docker/blob/6bf661b51011ff562a6be58dd22dfa190e8a7696/default.conf.tmpl#L61-L62) to Nginx's `default.conf` file:

```text
sub_filter "/mgoblin_media/media_entries/" "https://storage.googleapis.com/MY-GCS-BUCKET/media_entries/";
sub_filter_once off;
```

In my setup, Nginx served as a proxy between the end-user and MediaGoblin. The above directive tells Nginx to perform a search and replace on all of MediaGoblin's HTML responses before passing them on to the end-user. Nginx swaps out all relative paths to media files on MediaGoblin and replaces them with Google Cloud Storage URLs.

For example, MediaGoblin generates HTML that looks like this:

```html {hl_lines=[3]}
<video width="720" height="480" controls autoplay>
  <source
    src="/mgoblin_media/media_entries/16/Michael-riding-a-bike.mp4"
    type="video/mp4">
</video>
```

Nginx modifies the response to look like this:

```html {hl_lines=[3]}
<video width="720" height="480" controls autoplay>
  <source
    src="https://storage.googleapis.com/MY-GCS-BUCKET/media_entries/16/Michael-riding-a-bike.mp4"
    type="video/mp4">
</video>
```

Here's how it all fits together:

{{< img src="final-architecture.jpg" alt="Architecture diagram of MediaGoblin + Docker + nginx rewriting responses to GCS" caption="Nginx rewrites responses from MediaGoblin so that clients can retrieve media files directly from Google Cloud Storage." maxWidth="600px" hasBorder="True" >}}

The neat part of my solution was that it required no modification to MediaGoblin's code. A two-line Nginx directive seamlessly integrated MediaGoblin and Google Cloud Storage even though the two services had zero awareness of one another.

{{<notice type="danger">}}
**Note**: This solution requires the files on Google Cloud Storage to be world-readable. To mitigate the risk of unauthorized access, I use a long, random bucket name (e.g., `mediagoblin-39dpduhfz1wstbprmyk5ak29`) and ensure that the bucket's access control policy prevents unauthorized users from listing directory contents.
{{</notice>}}

## The final product

At this point, I had a complete, working solution. MediaGoblin happily ran in its own container on Google Cloud Platform, which meant I didn't have to patch or upgrade very often. Everything about my process was automated and reproducible, making it easy to push changes or roll back to previous versions.

My family loved how easy it was to browse through videos. With the Nginx performance hack, the experience was as snappy as browsing YouTube.

The browse screen looked like this:

{{< img src="mediagoblin-home.png" alt="MediaGoblin browse screen" maxWidth="800px" caption="Browse screen of my family's home video sharing server" >}}

Clicking a thumbnail brought you to a screen like this:

{{< img src="mediagoblin-single-video.jpg" alt="Screenshot of MediaGoblin displaying a video" maxWidth="800px" caption="Viewing an individual clip on the media server" >}}

After years of work, it was incredibly gratifying to give my family the YouTube-like experience for exploring our videos that I originally envisioned.

### Bonus: Bringing costs below $1/month

Home videos are the kind of thing you only watch every few months. My family collectively accessed the site for about 20 hours per year, but my server ran 24/7. I was paying $15/month for a server that sat idle 99.7% of the time.

At the end of 2018, Google released [Cloud Run](https://cloud.google.com/run). Its killer feature was launching Docker containers fast enough to respond to HTTP requests. That allowed your server to wait in standby mode and only run when someone visited your URL. For infrequently accessed apps like mine, this reduced costs from $15/month to a few cents per year.

For reasons I no longer remember, Cloud Run didn't work with my MediaGoblin image. But the existence of Cloud Run reminded me that [Heroku](https://heroku.com) offered a similar service for free, and their tools are far more user-friendly than Google's.

With a free app server, my only cost is data storage. Google's standard regional storage is 2.3 cents/GB, and the video collection takes up 33 GB, so I only pay $0.77/month.

{{< img src="gcs-bill.png" alt="Bill for $0.77 from Google Cloud Platform" caption="The cost of this entire solution is only $0.77 per month." hasBorder="True" >}}

## Tips for anyone about to try this

This process obviously took me a long time, but I hope this article can save others 80-90% of the effort of digitizing and sharing their home videos. The next section has a [detailed walkthrough](/digitizing-home-videos-walkthrough/) of the nuts and bolts of my solution, but here are some general tips for digitizing and sharing home videos:

* Capture as much metadata as possible during the raw capture and edit stages.
  * Labels on the tapes often have valuable information.
  * Keep a record of which clip came from which tape and in what order.
  * Note any clues in the clip about the recording date.
* Consider outsourcing the raw capture to professionals.
  * It's *extremely* difficult and expensive for you to match the quality of a video digitization company.
  * But steer clear of a company called EverPresent (email me if you want the details).
* If you do your own capture, buy plenty of disk space.
  * Uncompressed video captures are ~100-200 MB per minute of standard definition video.
  * I stored everything on my 10 TB [Synology DS412+](http://amzn.to/2pf3unf).
* Record metadata in an application-agnostic format.
  * Clip descriptions, time codes, dates, etc.
  * If you keep it in an application-specific format (or worse, throw it away), you can't reproduce the work if you decide on a different solution.
  * When you watch the videos during editing, you see lots of useful metadata. You'll lose it if you don't capture it.
    * What's happening in the video?
    * Who's in it?
    * When was it recorded?
* Mark your favorites.
  * Honestly, most home video footage is pretty boring.
  * I apply the "best of" tag to my favorite clips and browse through those when I want to see fun videos.
* Build the end-to-end solution as soon as possible.
  * I tried to capture all the tapes first, then edit all the tapes, etc.
  * I wish I had started with a single tape and done the work necessary to share that. It would have shown me how decisions early in the process affect the final result.
* Minimize transcoding.
  * Every time you edit or re-encode a clip, you degrade the quality.
  * Capture the raw footage at the highest possible quality, and then transcode each clip exactly once to a format that browsers can play natively.
* Use the simplest possible solution for sharing the video clips.
  * In retrospect, MediaGoblin is too complex a tool for the not-so-complicated scenario of generating web pages to display an unchanging set of video files.
  * If I were starting over, I would have used a static site generator like [Hugo](https://gohugo.io/), [Jekyll](https://jekyllrb.com/), or [Gridsome](https://gridsome.org/).
* Make a montage.
  * Video montages are a fun way to bring together the best moments from several home videos.
  * Montages are all about the music. ["Slow Show" by The National](https://amzn.to/3d7brAc) is amazing for montages, and nobody else seems to have realized.

## An end-to-end walkthrough of my process

If you want the nitty-gritty of how I did this, I created a [tutorial](/digitizing-home-videos-walkthrough/) that shows my entire workflow from start to finish. It includes all the source code and commands to replicate my process.

* [Editing and Sharing Home Videos with MediaGoblin](/digitizing-home-videos-walkthrough/)

---

*Illustrations by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/).*

*Special thanks to my family for allowing me to share a selection of these clips and stills, for recording everything in the first place, and for being so supportive throughout this process.*