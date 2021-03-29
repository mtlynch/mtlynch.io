---
title: "LogPaste: A Minimalist Pastebin that Runs Anywhere"
date: "2021-04-05T00:00:00Z"
tags:
- tinypilot
- litestream
description: I needed a simple way for users to share debug logs with me, so I built my own solution with Go and Litestream.
---
I recently needed a frictionless way for my users to share their debug logs with me. I wanted a service that would allow them to upload some text or a file from the command line and get back a URL they could share with me. I would have happily paid for such a service, but I couldn't find anything that matched my needs. Instead, I built my own and am releasing the code under the open source MIT license.

My service is called LogPaste. Here are some of its features:

* Users can share text logs with zero signup
* Users can generate shareable URLs from a single shell command or a few lines of JavaScript
* LogPaste runs in a Docker container, so it's simple to deploy
* LogPaste replicates its datastore to any S3-compatible interface
  * You can tear down a LogPaste container and relaunch it on a completely different service, and it will keep all of its data

For the rest of the post, I'll explain why I created LogPaste and what my process was.

## sprunge is about to die

I initially collected log files from users with a service called sprunge, which was a nearly perfect match for my needs. It's a free service that accepts uploads of plaintext files and hosts them forever.

Unfortunately, "free" is a double edged sword. If nobody's paying for the service, it could very well disappear at any moment. Additionally, as a non-paying user, I have no control over the service. If one of my customers accidentally uploads their social security number and all of their bank logins to sprunge, I have no way to purge the record.

sprunge is open source, so I thought I could simply self-host it. But when I looked at the code, I realized sprunge was not long for this world. Nobody had touched the code in XX years. Further, it depended on the Python 2.7 version of AppEngine and Google Cloud Datastore, two services that Google is actively killing off.

## I don't want to maintain a database server

I found a Github page listing [a bunch of other open source solutions](https://github.com/awesome-selfhosted/awesome-selfhosted#pastebins), but none of them were a match for what I wanted. Most of them were too complicated and offered lots of bells and whistles I didn't need. I just wanted simple ability to upload from the command-line or JavaScript. Worse, almost all the solutions required a separate database server to manage the uploads.

Confession: I hate maintaining database servers.

In fact, I've been building my own software products and services for the last eight years, and I've never used a database server in production. I don't want to be responsible for database backups or software upgrades, so anything that requires a database is a dealbreaker for me.

I've avoided the burden of database ownership by using Google-managed datastores like Cloud Datastore, Firebase, and Firestore. But every few years, Google decides to build a new, shiny datastore solution, deprecates its old solution, and [dumps all the migration work onto their customers](https://medium.com/@steve.yegge/dear-google-cloud-your-deprecation-policy-is-killing-you-ee7525dc05dc). That was exactly what was happening to sprunge. I was tired of Google's shiny object syndrome and didn't want to build another service on top of their proprietary tech.

## Litestream: all the fun of a database server minus the hassle

A few weeks earlier, a post popped up on Hacker News about Litestream. It's an open source tool that replicates SQLite databases to S3 storage.

I realized that this was my ticket out of Google Cloud Platform. I could build my app on top of SQLite, and then Litestream would handle data replication for me. I didn't have to run a whole database server, and I didn't have to pay someone for a managed datastore.

Best of all, it gave me incredible vendor flexibility. I can run on any platform because I can run sqlite anywhere. And I have tons of options for the data replication because many providers offer S3-compatible interfaces. BackBlaze B2, Wasabi. You can even host your own open source S3-compatile server using Minio.

## Combining Litestream with Docker

Generally, Docker containers should hold Just One Service. But the jump from a service that can live entirely in one Docker container to one that depends on two increases the complexity significantly. It's a bit of a hack, but I just run Litestream as a background service within my LogPaste container.

So, in my Docker entrypoint script, I first use Litestream to pull down the latest database:

```bash
# TODO
```

Then, before I start my web service, I spawn a Litestream instance in the background that watches my SQLite database and continually replicates it to an S3 instance:

```bash
# TODO
```

I pass in my S3 credentials as environment variables, because I don't want to hardcode them into my source.

TODO: Diagram

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

## LogPaste under real-world usage

I run a business called TinyPilot, where I provide open source KVM over IP devices that let users control their servers remotely. Because all code runs on the end-user's device, I need a simple way for users to share debug logs with me when things go wrong, so I integrated with LogPaste.

I migrated from sprunge to LogPaste, and it's worked well

LogPaste has been handling all of TinyPilot's debug logs for the past few months, and

I've been using LogPaste for several weeks. When I added the ability to upload debug logs from my app's web interface, LogPaste made the process a lot simpler because it sends the proper CORS headers, so you can upload across domains. With sprunge, I would have had to do a lot of other stuff.

## Caveat: My use-case is especially gentle

While I'm using LogPaste in production, my server isn't serving what most developers would consider "production-scale" loads. It's possible LogPaste would experience scaling issues.

There are a few qualities that make this solution especially friendly to my use case:

* This is a low-volume service. Users only upload logs a handful of times per day.
* I use LogPaste to store non-critical data.
  * These are debug logs, so they're good to have indefinitely, but if I screwed up and lost everything, it would be a mild inconvenience at worst.
* Volume is low enough that I expect to never use more than one server instance.
  * Growing beyond a single server is considerably more complicated, as Litestream can't sync writes from multiple servers.
* If litestream dies in the background, replication stops and I'll lose all subsequent log files
  * This has never happened to me, but it could.
  * I suspect that I could work around this with regular health checks.
  * You could solve this by running the app on Kubernetes, with Litestream in its own container with health checks. For my scenario, it's not worth the added complexity.

## Self-hosting LogPaste

It's trivial to run your own instance of LogPaste.

I've included deployment instructions for a couple other services that offer managed Docker hosting:

* Run LogPaste on Docker
* Run LogPaste on Heroku
* Run LogPaste on Amazon LightSail
