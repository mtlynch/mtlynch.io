---
title: "Use Your Own Domain Name for Your Podcast with BunnyCDN"
date: 2025-04-11
---

Podcasts are one of the few technologies that achieved decentralization successfully. There are a variety of podcast hosting services, they all use a common protocol, so listeners can hear your podcast with any podcast player they want.

## The problem with vendor-specific RSS URLs

The problem is that if you have a podcast, your podcast host gives you a feed at a URL that's specific to that vendor.

For example, if you host your podcast on Libsyn, your RSS feed looks something like this:

- `https://feeds.libsyn.com/12345/rss`

So if you hand out that link to everyone, and they add it to their podcast players, what happens if you switch to a different podcast host like Buzzsprout or Podbean? All of your listeners will still be checking Libsyn for your episodes.

Some podcast hosts support redirects. So, if you already gave out your Libsyn RSS URL, you could change settings in Libsyn to point your feed at your new Podbean.

The problem is that there's no guarantee that a podcast host will offer a redirect. It effectively helps you migrate to a competing vendor, so why would they want to support it?

## Never distribute a vendor-specific URL

You can avoid getting locked into a specific vendor's RSS URL by always using a custom domain. For example, if your podcast is called "My Awesome Dinosaur Podcast," then you can register this domain name for your show:

- myawesomedinosaurpodcast.com

Note: I'm not going to explain how to purchase a domain name, as that's out of scope, but any domain name provider will be fine. I personally like DNSimple.

Once you own the domain name myawesomedinosaurpodcast.com, you can create a subdomain like this:

- feeds.myawesomedinosaurpodcast.com

When you give out your podcast feed, it will be:

- https://feeds.myawesomedinosaurpodcast.com/rss

If you switch podcast hosts, your listeners will never have to do anything as they'll still listen from your same feeds.myawesomedinosaurpodcast.com. They've never seen any Libsyn or Podbean URL at all.

## Setting this up

Okay, once you purchase the domain and set up the `feeds` subdomain, you have to actually point it at your real podcast.

For this example, I'm going to use these example values:

- `https://feeds.libsyn.com/12345/rss`: The RSS feed your podcast host told you to use.
- `https://feeds.myawesomedinosaurpodcast.com/rss`: The actual URL you'll use instead.

You'll need to create an account with BunnyCDN.

From there, go to Pull Zones > Add Pull Zone.

Put in any name for

## Cost

The costs of using Bunny in this way are on the order of cents per year. Because all you're using them to serve is a small text file. Your podcast vendor still serves the large audio and video files for your podcast.
