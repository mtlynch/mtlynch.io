---
title: Sia-Minio Integration Postmortem
tags:
- siacoin
- cryptocurrency
- sia
description: An analysis of how Nebulous Labs can improve its bounty program for Sia
date: '2017-12-01'
images:
- sia-minio-postmortem/minio-postmortem.png
---

One of the best things I learned from working at Google is the practice of [blame-free postmortems](https://landing.google.com/sre/book/chapters/postmortem-culture.html). When something goes wrong, you wait until the dust settles, then write a report analyzing what happened. The report explains how the problem occurred and defines concrete steps the team can take to mitigate the problem in the future.

I saw a good opportunity for a postmortem last week. Work officially completed on a [bounty-funded project](https://github.com/NebulousLabs/Sia/issues/2155) to integrate Sia support into Minio, but it took several months longer than expected and went through multiple large-scale rewrites.

[Sia](https://sia.tech/) is a decentralized cloud storage technology.  I've [written about it before](/tags/sia), as it's one of my favorite technologies. [Minio](https://minio.io/) is an open-source S3-compatible file server. The integration between the two means that users can now back data up to the Sia network using any backup software compatible with Amazon S3.

This integration is a Big Deal, and I'm planning to write a lot more about once the software stablizes following Sia's December release. In the meantime, I saw a valuable opportunity to lead a postmortem on the integration process.  I approached the Nebulous Labs team, and they liked the idea. I contacted the author of the Sia-Minio integration code, who was supportive as well and agreed to contribute to the report with me. The Nebulous Labs and Minio teams reviewed it and approved it for publication, so you can find our full report below:

{{< img src="minio-postmortem.png" alt="Minio postmortem" maxWidth="600px" linkUrl="https://docs.google.com/document/d/1Bupw6vQQCfiv6r28BARsa4kjDWOhowWvDzAQmwLWrY8/edit?usp=sharing" >}}
