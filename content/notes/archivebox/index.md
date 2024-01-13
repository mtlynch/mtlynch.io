---
title: "ArchiveBox is Super Cool"
date: 2024-01-13T00:00:00-05:00
---

Have you ever used archive.org's [Internet Wayback Machine](https://web.archive.org/)? It's a free site that's been archiving the web since 1996. So, ifyou want to see what Google looked like in 1998, [they've got it](https://web.archive.org/web/19981111184551/http://google.com/).

ArchiveBox is like your own, personal Internet Wayback Machine. It's free and open-source, and you can use it to archive

## Why archive?

Until about a year ago, I never had the inclination to archive a website locally. There are tools online that archive websites and save a public copy, so why would I go to the trouble of self-hosting my own archive?

Then, last year, there was a power grab from a lot of social media companies. reddit famously locked down its third-party APIs, which broke a lot of the sites that archived reddit, and those archives just disappeared. When Musk took over Twitter, people started deleting their Twitter profiles and moving elsewhere.

There was a lot of content that I assumed would be either online or archived somewhere, and it quickly disappeared.

## ArchiveBox

I recently wanted

## Installing

```bash
mkdir archivebox && \
  cd archivebox && \
  curl -O 'https://raw.githubusercontent.com/ArchiveBox/ArchiveBox/dev/docker-compose.yml' && \
  docker compose run archivebox init --setup
```

```bash
docker compose up
```

I just discovered Archive

And after marveling at this new thing I just discovered, I realized I saw the author, Nick Sweeting, demo this tool [at PyGotham in 2019](/retrospectives/pygotham-2019-notes/#archiving-the-internet-before-it-all-rots-away). I think I

## Archiving reddit posts

```text
https://old.reddit.com/r/legaladvice/comments/2o3g9g/neighbors_stupidly_caused_themselves_to_be/
https://old.reddit.com/r/legaladvice/comments/2ooy1x/update_my_neighbors_caused_themselves_to_be/
https://old.reddit.com/r/legaladvice/comments/4dci57/update_my_neighbors_caused_themselves_to_be/
```

- [reddit-singlefile](reddit-singlefile.html)

Downloads it as a single HTML file. It's a neat trick! It smushes all the HTML, JavaScript, and CSS into a single file. And it even base64-encodes image files so that it can inline them right into the HTML.

## Archiving YouTube videos

There are more specialized tools for archiving YouTube videos like, but ArchiveBox also bundles youtube-dl, so you can just hand it a YouTube URL, and it will archive the page and the video.

So if I want to make sure I always have a copy of the _Lonely Island_ / _SNL_ classic, "Like a Boss," I can archive it, and ArchiveBox saves the video in the archive.
