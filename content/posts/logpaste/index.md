---
title: "LogPaste: A Minimalist Pastebin that Runs Anywhere"
date: "2021-04-05T00:00:00Z"
tags:
- tinypilot
- litestream
description: I needed a simple way for users to share debug logs with me, so I built my own solution with Go and Litestream.
---
As more and more users are running TinyPilot, my open source server management device, I've needed a way for them to share debug logs with me when something goes wrong.

I built a solution called [LogPaste](http://logpaste.com/). If you want an easy way for users to upload logs or other text files. Here are some of its features:

* Users can generate shareable URLs with zero signup
* Users can generate shareable URLs from the command line or JavaScript, even from other domains
* LogPaste runs in a Docker container, so it's simple to deploy
* LogPaste replicates its datastore to any S3-compatible interface
  * You can tear down a LogPaste container and relaunch it on a completely different service, and it will keep all of its data

For the rest of the post, I'll explain why I created LogPaste and what my process was.

## sprunge: My original solution

There are already plenty of services that let you.

I used a service called sprunge. sprunge was great! It's a free service that lets anyone upload log files, and it hosts them forever.

There were a few problems:

* What if sprunge disappears suddenly since nobody is paying for it?
* What if a user accidentally uploads sensitive data to sprunge and wants me to remove it?

I didn't have a good solution to either. I wouldn't have minded paying for a private version of sprunge, but there was no way to contact the maintainer. I looked for other solutions and didn't find anything promising.

sprunge is open source, so I looked into hosting it myself, but I wasn't excited about the code. It depended on the Python 2.7 version of AppEngine and Google Cloud Datastore, two services that Google is eager to kill off.

## Other pastebin services

I found a Github page listing [a bunch of other open source solutions](https://github.com/awesome-selfhosted/awesome-selfhosted#pastebins), but none of them were a match for what I wanted.

* Too complicated
* Depended on a separate database server
*

 I didn't want to have to maintain a server, so that meant something that either ran in Docker or on some platform as a service like AppEngine or Heroku.

None of the solutions fit the bill.

## I'm tired of Google's managed data stores

Confession: I hate maintaining database servers. I hate dealing with installing patches regularly, and I hate worrying that I'm screwing up data backups. I haven't run a database server in production in about 10 years.

Instead, when I've needed a data store, I've used Google Cloud Platform's solution du jour. At first it was Google Cloud Datastore. For all its annoyances, it was a nice solution in many ways.

Then a few years ago, Google decided that Cloud Datastore was dead, and everyone should move to Firebase. Okay, fine. Firebase looked cooler, so I didn't mind moving.

Then, a few years after that, Google insisted that everyone move again to not Fire**base** but Fire**store**.

I was annoyed, but it wasn't until I read Steve Yegge's [open letter to Google Cloud Platform](https://medium.com/@steve.yegge/dear-google-cloud-your-deprecation-policy-is-killing-you-ee7525dc05dc) that I realized how ridiculous it was to keep marrying myself to Google solutions.

So, I wanted a solution that would be platform-agnostic. I didn't want to be stuck with Google because I built against GCP. I wanted to move to whatever cloud provider offered the best service.

But that

I don't want to host a database, but I'm tired of building on top of Google Cloud Platform. For many of the

## Litestream to the rescue

A few weeks earlier, I'd seen a post on Hacker News about Litestream. It's an open source service that replicates SQLite databases to S3 storage.

I realized that this was my ticket out of Google Cloud Platform. I could build my app on top of SQLite, and then Litestream would handle data replication for me. I didn't have to run a whole database server, and I didn't have to pay someone for a managed datastore.

Best of all, it gave me incredible vendor flexibility. S3 isn't even limited to Amazon. Many providers offer S3-compatible interfaces, including BackBlaze B2, XX. You can even host your own S3-compatile server using Minio, which is open source.

## Caveats

* It's not the end of the world if I lose a few log files (it's never happened, to my knowledge)
* If litestream dies in the background, replication stops and I'll lose all log files
  * You could solve this by running the app on Kubernetes, with Litestream in its own container with health checks. For my scenario, it's not worth the added complexity, but it's what I'd do if I were running a service with higher reliability requirements.
