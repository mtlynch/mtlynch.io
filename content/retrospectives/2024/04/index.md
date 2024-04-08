---
title: "TinyPilot: Month 45"
date: 2024-04-10T00:00:00-04:00
description: TODO - One-line summary
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and the founder of [TinyPilot](https://tinypilotkvm.com), an independent computer hardware company. I started the company in 2020, and it now earns $80-100k/month in revenue and employs six other people.

Every month, I publish a retrospective like this one to share how things are going with my business and my professional life overall.
{{</notice>}}

## Highlights

-

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Fill the gaps in TinyPilot's release documentation

- **Result**: XX
- **Grade**: XX

TODO

### Complete 2023 taxes

- **Result**: XX
- **Grade**: XX

TODO

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | February 2024  | March 2024    | Change                                          |
| ------------------------ | -------------- | ------------- | ----------------------------------------------- |
| Unique Visitors          | 13,000         | 9,100         | <font color="red">-3,900 (-30%)</font>          |
| Sales Revenue            | $82,517.42     | $107,809.83   | <font color="green">+$25,292.41 (+31%)</font>   |
| Enterprise Subscriptions | $290.70        | $290.70       | 0                                               |
| Royalties                | $3,373.65      | $2,442.12     | <font color="red">-$931.53 (-28%)</font>        |
| Total Revenue            | $86,181.77     | $110,542.65   | <font color="green">+$24,360.88 (+28%)</font>   |
| **Profit**               | **$23,599.09** | **$3,193.73** | **<font color="red">-$20,405.36 (-86%)</font>** |

## Hardening TinyPilot's release process

https://circleci.com/changelog/expression-based-context-restrictions/

## Migrating services between hosts badly and then a little better

### The Firebase to Netlify migration

Moving from Firebase to Netlify

One other side-benefit of Netlify is that the config file is in YAML, which allows comments. Firebase's config file was in JSON, which does not allow comments. But comments are incredibly helpful for static site configuration. For example, we maintain a set of HTTP redirects through the configuration file, and it's extremely valuable to have comments explaining why a redirect is there and whether or not it needs to exist permanently.

I updated the DNS entries for `tinypilotkvm.com`, and everything worked. I tried visiting the site and: TLS error. Uh oh. That's bad. Nobody wants to shop on a site that's serving a TLS error.

Had Netlify not generated the TLS certificate yet? I checked the TLS error, and it turned out that my browser was complaining about a TLS certificate from Firebase. Huh? Wouldn't Firebase still be serving the old site with the old certificate?

My mental model of the visitors was that they'd fall in two buckets depending on how fresh the information was in their DNS server:

1. They query a DNS server that has the old Firebase address -> They see the old Firebase version working as it did before I updated DNS.
1. They query a DNS server that has the new Netlify address -> They see the new Netlify version working.

Even now, I don't understand why I was seeing a Firebase certificate error.

As a workaround, I configured Firebase to redirect visitors to `netlify-next.tinypilotkvm.com` (TODO: Check). That worked, so customers stopped seeing the TLS error, but they might have found the URL a bit strange. Still, it was signed correctly.

For a full day after, the old site was still receiving traffic, but after a few days, Firebase stopped receiving any traffic for `tinypilotkvm.com`.

### The AWS to Fly.io migration

When it came time to

### A general strategy

Move a service on example.com from platform A to platfrom B.

1. Deploy your service to platform B.
1. Set up a subdomain for your service pointing to platform B.
   - Choose a subdomain that won't weird out your customers too much if they see it like `www2.example.com` or `web.example.com` not `insecure-staging.example.com`.
1. Make sure you can visit platform B through your new subdomain with no TLS errors in your browser.
1. Reduce the TTL on root `example.com` DNS entries to something low like 1-5 minutes.
1. Generate a certificate for `example.com` on platform B.
   - This is usually under "add a custom domain" setting.

For the real migration:

1. Pick a time when traffic is low to your service and schedule the migration for that time.
   - If you might need support from your teammates, make sure they're available at this time.
1. Update DNS entries to point to platform B instead of platform A.

After a day:

1. Verify that traffic to platform B has stopped.
1. Restore your DNS entries TTL to something sensible like 60 minutes.

## Side projects

### Writing a simple compiler

It accepts code that's semantically incorrect like `PUSH1 RETURN`, but it's good enough for my purposes.

## Wrap up

### What got done?

- Published ["Why does an extraneous build step make my Zig app 10x faster?"](https://mtlynch.io/zig-extraneous-build/)
- Published ["Building My First Homelab Server Rack"](https://mtlynch.io/building-first-homelab-rack/).
- Completed delegation of our RMA process to a third-party vendor.

### Lessons learned

-

### Goals for next month

-
