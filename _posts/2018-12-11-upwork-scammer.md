---
title: The Upwork Scammer
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
sidebar:
  nav: main
classes: wide
---

Most of the bids I received were in the $30-40 range. One was for $10.

{% include image.html file="lizzie-r-profile.png" alt="Screenshot of Lizzie R's Upwork profile page" max_width="715px" img_link="true" fig_caption="Upwork profile for &quot;Lizzie R.&quot;" %}

I know what you're thinking. Too good to be true.

If I'm wrong, I lose $50. If I'm right, I find a great freelancer for a low price.

# Too good to be true

I told Lizzie to limit her time to five hours. If she wasn't done at the 4.5 hour mark, spend the last 30 minutes collecting what she had so far to share with me. She billed five hours. The shared document was untouched, and I hadn't received any messages from her.

# Maybe mass surveillance is a good thing

Upwork offers a . Lizzie had let Work Diary monitor her computer for the five hours she was supposedly working for me. Here's what it looks like for my contract with Lizzie:

{% include image.html file="workdiary-dashboard.jpg" alt="Screenshot of Work Diary dashboard" max_width="800px" img_link="true" fig_caption="Overview of Lizzie's activities in Work Diary" %}

It even collects information about how many keystrokes and mouse clicks the freelancer executed:

TODO: Keystroke chart.

Here's the first screenshot:

{% include image.html file="workdiary-1.jpg" alt="Screenshot of Lizzie R's WorkDiary history" max_width="800px" img_link="true" fig_caption="First Work Diary screenshot" %}

Okay, that seems fine. She's off to a good start! She's checking how much space is left on her hard drive. She doesn't want to run out of space halfway through writing my document and leave me empty-handed.

The next several screenshots show Lizzie writing an article about mantras in Hinduism. Definitely nothing to do with my project, but she was billing the work to me.

{% include image.html file="workdiary-2.jpg" alt="Screenshot of Lizzie R's WorkDiary history" max_width="800px" img_link="true" fig_caption="First Work Diary screenshot" %}

{% include image.html file="workdiary-3.jpg" alt="Screenshot of Lizzie R's WorkDiary history" max_width="800px" img_link="true" fig_caption="First Work Diary screenshot" %}

{% include image.html file="workdiary-4.jpg" alt="Screenshot of Lizzie R's WorkDiary history" max_width="800px" img_link="true" fig_caption="First Work Diary screenshot" %}

It got really interesting when I saw a screenshot of Lizzie using Upwork's messaging interface to talk to her other clients:

{% include image.html file="workdiary-5.jpg" alt="Screenshot of Lizzie R's WorkDiary history" max_width="800px" img_link="true" fig_caption="First Work Diary screenshot" %}

This one confused me a bit because it was a conversation with Upwork, but neither end of the conversation was Lizzie. Then, I realized she was logged in as a separate Upwork user with the name Abi Hensley.

I searched the name on Upwork and found [Abi's profile](https://www.upwork.com/o/profiles/users/_~012951f3927669080e). Sure enough, it had the exact same profile text and hourly rate as Lizzie:

{% include image.html file="abi-h-profile.png" alt="Screenshot of Abi H's Upwork profile" max_width="715px" img_link="true" fig_caption="Upwork profile for &quot;Abi H.&quot;, with identical text to &quot;Lizzie R.&quot;" %}

# Who is Grace?

One of the screenshots shows Lizzie's Documents folder:

{% include image.html file="workdiary-6.jpg" alt="Screenshot of Lizzie R's WorkDiary history" max_width="800px" img_link="true" fig_caption="First Work Diary screenshot" %}

It shows several files with the name "Grace" in the title: "Grace Application Letter", "Grace CV", "Grace Intenship[sic] letter." There was a PDF whose filename was Grace followed by what looked like a last name. It was a unique enough last name that when I Googled the full name, there was only a single result. A Facebook profile:

{% include image.html file="grace-facebook.png" alt="Screenshot of Lizzie R's WorkDiary history" max_width="504px" img_link="true" fig_caption="First Work Diary screenshot" %}

That's not very conclusive. She freelances, so maybe those are someone else's files. Or it's a different Facebook profile with the same name.

# It's 9 PM. Do you know where you are?

I realized there was another hint in the screenshots. Upwork showed this screenshot at 6:15 PM Greenwich Mean Time but the freelancer's screen showed that it was 9:17 PM.

{% include image.html file="time-comparison.jpg" alt="Screenshot of Abi H's Upwork profile" max_width="715px" img_link="true" fig_caption="Upwork profile for &quot;Abi H.&quot;, with identical text to &quot;Lizzie R.&quot;" %}

I didn't know what time zone that was offhand, but I was sure it wasn't Nevada. I checked a time zone converter to find out how 6:15 PM translates to the time in Kenya. Sure enough...

{% include image.html file="utc-to-nairobi.png" alt="Screenshot of Abi H's Upwork profile" max_width="758px" img_link="true" fig_caption="Upwork profile for &quot;Abi H.&quot;, with identical text to &quot;Lizzie R.&quot;" %}

# Terminating the contract



# How did she write a good profile?

How did she write her profile so well? I Googled the text and realized she stitched together the content from two different Australian writers. Most of the text comes from this [woman's LinkedIn](https://www.linkedin.com/in/laraflanagan/) and the intro comes from [another freelancer](https://www.upwork.com/o/profiles/users/_~017434da88fc78860a/) right from Upwork.

{% include image.html file="profile-stitching.png" alt="Screenshot of demo app landing page" max_width="800px" class="img-border" img_link="true" fig_caption="" %}

I'm still looking for writers for Is It Keto? If you're a good writer (and not a Kenyan pretending), email me a writing sample and your hourly rate: michael@mtlynch.io. If you're a Kenyan scammer pretending to be a good writer, I want to work with you as well! Just put `[This is a scam]` in the subject line to save me some detective work.

# The cross-contamination problem

Upwork forces the freelancer to install such invasive spyware, yet it fails to pick up on many signals that should be

* Two users are using the same computer and IP though they claim to be in cities that are 2,000 miles apart
* Two users have exactly identical profiles
* Large sections of a new user's profile are plagiarized from a more established user on the same platform

I'll reserve a bit of judgment because I used to work on a fraud-detection team at Google, so I'm familiar with outsiders saying, "Why can't you just look for X," when the true reason is that there are non-obvious cases where X is a false positive. Like maybe the IP address is because of VPNs. But the more likely solution is that Upwork cares more about empowering micromanagers to ding their freelancers for not typing enough keystrokes.