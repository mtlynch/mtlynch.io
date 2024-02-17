---
title: "Host Your Podcast on a Custom Domain for Free"
date: "2022-09-15T00:00:00-04:00"
---

One of the biggest gotchas is hosting a podcast is how important it is to control your own domain name.

When you start a podcast on a podcasting platform, they generate an RSS feed for you. The podcasting platform will give you an RSS URL that looks like this:

* <https://feeds.simplecast.com/byb4nhvN>
* <https://feeds.transistor.fm/the-indie-hackers-podcast>
* <https://feeds.acast.com/public/shows/last-laugh-daily-beast>

Podcast players and portals like iTunes and Spotify use the RSS feed to retrieve your list of episodes and find out when you publish more.

## Why not use my podcast platform's RSS URL?

Podcast platforms come and go. The new, hot platform today could be out of business in a year.

Suppose you host your podcast on SimpleCast, and you give your SimpleCast RSS URL to iTunes, Spotify, and all of your subscribers. But then SimpleCast goes bankrupt and can't afford to run their servers anymore. You've just lost all of your susbscribers.

The dedicated ones might notice that they're not getting updates and find your new URL, but the vast majority won't. And then you have to go through all the podcast portals like iTunes, Google Podcasts, and friends to tell them your new URL.

## A custom domain keeps you in control

The reason I host my blog on `mtlynch.io` rather than something like `blogger.com/mtlynch` is that the custom domain gives me freedom to use any blogging platform I want. I've switched web hosts three times since starting the blog, and the change has been completely transparent to readers.

For the time being, there's an excellent level of competition between podcasting platforms. There's no podcasting monopoly, so new platforms are popping up all the time that offer new features and services. If you have a custom domain, it's easy to switch to whichever podcasting platform offers the best deal for creators.

When I started my podcast, I hosted it on Libsyn for $5/month. I thought Libsyn was so-so. They drew me in with a flashy marketing site, but their internal dashboards looked like they hadn't been updated in ten years. When I re-evaluated the offerings a year later, I found Anchor, which offered free hosting and a modern interface. Because I controlled my podcast's RSS feed, it was trivial to make the switch from Libsyn to Anchor.

After I switched, [Spotify acquired Anchor](https://techcrunch.com/2019/02/06/spotify-doubles-down-on-podcasts/). I'm not a fan of Spotify, and I think they're bad for the podcasting ecosystem, so if they start messing with Anchor, I can switch hosts again whenever I'd like.

## What about redirects?

Redirects work okay, but they're not ideal.

### Not all podcast players handle redirects properly

### The podcasting platform can hold you hostage

Some podcast platforms don't even offer redirects. Some offer it only for an extra fee.

Even if your podcasting platform supports redirects now, you have no guarantee that they'll offer it indefinitely. What if in a year, they see their customers moving to a competitor? The struggling platform might drop support for redirects as a way of hanging onto their customers.

## How to set it up

### The easy way:

As long as your podcast platform isn't also your domain registrar, you're fine.

### The cool way: host your RSS feed with a CDN

You can do this with any CDN like Cloudflare or Akamai. I use BunnyCDN because I find their interface simple and easy to use. Bunny costs $0.01 per month to use, and you have to fund your account with a minimum of $10.

If you want 100% free, Cloudflare offers a CDN that's totally free.

See below for step-by-step instructions on setting this up with Bunny CDN.

## Considerations for your RSS URL

### Separate it from your website domain

If you host your podcast on `mypodcast.com`, host your RSS feed on a subdomain like `feeds.mypodcast.com`. Subdomains are free and easy to set up with most domain regsitrars.

The reason you want a separate domain is that

### Use a non-root path

Don't just use `feeds.mypodcast.com/` instead do something like `feeds.mypodcast.com/rss` or `feeds.mypodcast.com/mypodcast`.

This part isn't as important as a separate domain, but it keeps things a little clearer when working with CDNs or if you ever decide to host multiple podcasts on your feed (e.g., `feeds.mypodcast.com/spinoff-show`).

## Hosting a podcast RSS feed with BunnyCDN



### Step 0. Create a Bunny CDN account

If you don't already have an account, create one and fund it with the minimum amount of credit. As of this writing, the minimum is $10.

### Step 1. Create a new pull zone

### Step 2. Add an edge rule to match your path

### Step 3. Link your domain name to your pull zone

## Risks of using a CDN

### More moving pieces

Caching issues with the CDN. If the CDN goes down or the podcasting platform goes down. Major CDNs don't go down very often, but [it does happen](https://blog.cloudflare.com/cloudflare-outage-on-june-21-2022/).

### Forfeit features of your podcasting platform

If your podcasting platform generates a website for you, the website is going to direct users to their platform-specific RSS feed and not your custom domain.

## Isn't podcast bandwidth expensive?

Yes, but fortunately, you're only responsible for a tiny fraction of it.

If you use a CDN for your podcast feed, you're only hosting your feed, not the actual episode content.

RSS feeds are tiny, usually just a few hundred kilobytes. Even with 100k subscribers, it would cost you pennies per year to host your podcast on a CDN.
