---
title: "LogPaste: A Minimalist Pastebin that Runs Anywhere"
date: "2021-04-05T00:00:00Z"
tags:
- tinypilot
- litestream
description: I needed a simple way for users to share debug logs with me, so I built my own solution with Go and Litestream.
---
My software runs offline, so I don't have access to my users' logs. When users reported issues to me, I needed a frictionless way for them to share debug logs with me.

I built a solution called [LogPaste](http://logpaste.com/). If you want an easy way for users to upload logs or other text files. Here are some of its features:

* Users can generate shareable URLs with zero signup
* Users can generate shareable URLs from a single shell command or a few lines of JavaScript
* LogPaste runs in a Docker container, so it's simple to deploy
* LogPaste replicates its datastore to any S3-compatible interface
  * You can tear down a LogPaste container and relaunch it on a completely different service, and it will keep all of its data

For the rest of the post, I'll explain why I created LogPaste and what my process was.

## sprunge: My original solution

I initially solved this problem using a service called sprunge. sprunge was great! It's a free service that lets anyone upload log files, and it hosts them forever.

But free is a double edged sword. If nobody's paying for the service, it could very well disappear at any moment. Additionally, as a non-paying user, I have no control over the service. If one of my customers accidentally uploads their social security number and all of their bank logins to sprunge, I have no way to clear it for them.

Fortunately, sprunge is open source. Maybe I could host it myself. But when I looked at the code, I realized sprunge was not long for this world. Nobody had touched the code in XX years, and it depended on the Python 2.7 version of AppEngine and Google Cloud Datastore, two services that Google is actively killing off.

## I don't want to maintain a database server

I found a Github page listing [a bunch of other open source solutions](https://github.com/awesome-selfhosted/awesome-selfhosted#pastebins), but none of them were a match for what I wanted.

Most of them were too complicated and offered lots of bells and whistles I didn't need. I just wanted simple ability to upload from the command-line or JavaScript.

The other issue is that almost all the solutions expected you to run a separate database server to manage the uploads. For just a simple log sharing service, I didn't want to maintain a database, and I wasn't too excited to pay a premium for managed database hosting on a service that would write to the database only a few times per day.

## I'm tired of Google Cloud data stores

For the last eight years, I've avoided maintaining my own database by using managed data services on Google Cloud Platform. Originally, that worked out great. Google abstracted away the infrastructure and let me just worry about my data. I never dealt with outages or data corruption.

Then, Google started doing its Google thing and decided to replace its good service with a service that *promised* to be great once you rewrote all of your code.

Steve Yegge's [open letter to Google Cloud Platform](https://medium.com/@steve.yegge/dear-google-cloud-your-deprecation-policy-is-killing-you-ee7525dc05dc) is the best summary of the situation I've ever read. Google Cloud Platform is continually forcing its clients to rewrite their code in order to achieve the same level of service. I don't want to marry myself to Google-specific technologies.

So, I don't want to maintain my own database server, and I don't want to marry myself to a particular provider, what do I do?

## Litestream: the best of both worlds

A few weeks earlier, I'd seen a post on Hacker News about Litestream. It's an open source tool that replicates SQLite databases to S3 storage.

I realized that this was my ticket out of Google Cloud Platform. I could build my app on top of SQLite, and then Litestream would handle data replication for me. I didn't have to run a whole database server, and I didn't have to pay someone for a managed datastore.

Best of all, it gave me incredible vendor flexibility. I can run on any platform because I can run sqlite anywhere. And I have tons of options for the data replication because many providers offer S3-compatible interfaces. BackBlaze B2, Wasabi. You can even host your own S3-compatile server using Minio, which is open source.

## Combining Litestream with Docker

Generally, Docker containers should hold Just One Service. But the jump from a service that can live entirely in one Docker container to one that depends on two increases the complexity significantly. I decide to do something a little bit hacky and just run Litestream as a background service.

So, in my Docker entrypoint script, I first use Litestream to pull down the latest database:

```bash
# TODO
```

Then, before I start my web service, I spawn a Litestream instance in the background that watches my SQLite database and continually replicates it to an S3 instance:

```bash
# TODO
```

I pass in my S3 credentials as environment variables, because I don't want to hardcode them into my source.

## Customizability

I wanted to make LogPaste easy for other hosts to customize, so I added command-line flags and environment variables that allow you to apply your own branding.

## Demo

Here's a demo of LogPaste that's built against my demo instance:

<div class="upload-form">
  <textarea id="upload-textarea" placeholder="Enter some text"></textarea>
  <button class="button" id="upload">Upload</button>
</div>
<div id="result"></div>

<script src="http://logpaste.com/js/logpaste.js"></script>
<script>
const baseUrl = 'http://logpaste.com';
document.getElementById("upload").addEventListener("click", (evt) => {
  const textToUpload = document.getElementById("upload-textarea").value;
  logpaste
    .uploadText(textToUpload, baseUrl)
    .then((id) => {
      document.getElementById("result").innerText = `${baseUrl}/${id}`;
    })
    .catch((error) => {
      document.getElementById("result").innerText = error;
    });
});
</script>

The code is pretty simple:

```html
<div class="upload-form">
  <textarea id="upload-textarea" placeholder="Enter some text"></textarea>
  <button class="button" id="upload">Upload</button>
</div>
<div id="result"></div>

<script src="http://logpaste.com/js/logpaste.js"></script>
<script>
const baseUrl = 'http://logpaste.com';
document.getElementById("upload").addEventListener("click", (evt) => {
  const textToUpload = document.getElementById("upload-textarea").value;
  logpaste
    .uploadText(textToUpload, baseUrl)
    .then((id) => {
      document.getElementById("result").innerText = `${baseUrl}/${id}`;
    })
    .catch((error) => {
      document.getElementById("result").innerText = error;
    });
});
</script>
```

## I'm using this in production

I've been using this for several weeks. When I added the ability to upload debug logs from my app's web interface, LogPaste made the process a lot simpler because it sends the proper CORS headers, so you can upload across domains. With sprunge, I would have had to do a lot of other stuff.

## Caveats

While I have been successfully using LogPaste and Litestream in production for the past few months, I'm not running what most people would consider "production-scale" loads on it. These components may do strange things under heavier loads, and I haven't seen it yet.

There are a few qualities that make this solution especially friendly to my use case:

* This is a low-volume service. Users only upload logs a handful of times per day.
* If litestream dies in the background, replication stops and I'll lose all subsequent log files
  * This has never happened to me, but it could.
  * I suspect that I could work around this with regular health checks.
  * You could solve this by running the app on Kubernetes, with Litestream in its own container with health checks. For my scenario, it's not worth the added complexity, but it's what I'd do if I were running a service with higher reliability requirements.
