---
title: "06"
date: 2022-06-02T10:47:57-04:00
description: TODO - One-line summary
---

## Highlights

-

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Publish a blog post and video about building a homelab NAS server with TinyPilot

- **Result**: Published
- **Grade**: A

This was my first blog post in over a year that wasn't a retrospective or year-end review. It was much longer than I expected it to be because I was trying to capture all of the thoughts. I think what's missing in a lot of PC and server building posts is the "why." I included the tradeoffs I considered, and I think that ended up working well.

### Complete the TinyPilot website redesign

- **Result**: It's finally done
- **Grade**: A

It took eight months and $46k, which was 7x my intended timeline and 3x my intended budget, but it's finally done.

### Hire a marketing agency or freelancer

- **Result**: XX
- **Grade**: XX

TODO

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

## Debian packages are easy

One of the odd design choices in TinyPilot is how we install it. I like Ansible, and so when I was developing the prototype of TinyPilot, I used Ansible to push code to my Raspberry Pi and change all the necessary configuation files to enable the hardware features I needed.

When I released the first version, I didn't know the standard way of accomplishing the same thing, so I just did the simplest possible thing and made a convenience script that bootstrapped its own Ansible environment and ran my Ansible playbooks locally.

And that system worked, so I just kept it.

I considered Debian, but it always seemed scary. You have to use their confusing tools for creating a Debian package, and then you have to set up a repository, and then you have to create a keypair to sign releases.

As it turns out, Debian packages are significantly easier than I thought. They're just a tarball with a particular folder structure and a few special files. All the work of creating and maintaining a Debian package repository is optional, as you can just distribute the `.deb` package files directly without ever needing a repository. I made my first working `.deb` package in about an hour.

To make Janus, it takes 30 minutes to compile from source on the Raspberry Pi. We ended up creating our own Debian package that installs in a few seconds.

Earthly had my favorite tutorial, and XX filled in some of the gaps around preinstall and postinstall scripts.

## Search ads are levelling off

When I last calculated it, Google search ads looked amazing. I calculated that I was making $0.69 in profit for every dollar I spent on Google Ads.

With more data, it's less exciting. When I ran the numbers last month, I was including April and the first week of May. The first 10 days of May were my most successful ad days, so if we look at it by month, it's not as good:

| Metric                     | April     | May       |
| -------------------------- | --------- | --------- |
| Ad spend                   | $804.12   | $4,283.71 |
| Impressions                | 5,270     | 239,498   |
| Clicks                     | 351       | 3,327     |
| Click through rate (CTR)   | 6.6%      | 1.4%      |
| Cost per click (CPC)       | $2.29     | $1.29     |
| Revenue from conversions   | $1,314.91 | $7,649.60 |
| Revenue on ad spend (ROAS) | 1.63      | 1.79      |

About 30% of my revenue goes to hardware and labor costs, so a ROAS at 1.43 or higher is profitable for me. At 1.79, I'm still making about $0.25 for every dollar I spend on ads ($1.43 - 30% - $1 for the ad), which is decent, so I'll keep it going.

## Side projects

### PicoShare

Added metadata editing.

Changed the flow for deleting so that now you click delete and then click yes on a confirmation screen. Before it was one click, deleted no confirmation, no undo.

### WanderJest

Prior to the pandemic, I was [trying to build WanderJest](/retrospectives/2020/04/#putting-wanderjest-on-hold), a business that would help fans find live comedy near them. I [put the site on hold](/retrospectives/2020/04/#putting-wanderjest-on-hold) due to the pandemic and ended up launching TinyPilot instead, but I've kept tending to WanderJest on weekends and evenings.

One of the things that struck me in developing PicoShare is how much faster I can add features. I think the tech stack has a lot to do with it:

|            | PicoShare           | WanderJest |
| ---------- | ------------------- | ---------- |
| Backend    | Go                  | Go         |
| Frontend   | Go                  | Vue 2      |
| Data Store | SQLite + Litestream | Firestore  |

Firestore slows me down a lot because I find it very difficult to make schema changes. The only way I know how to do it is to write custom migration code and deploy it to the production server. With SQLite, I can just download the production database, tinker with it, and then push it out to the server.

And writing a frontend in Go is easier than I expected. The initial experience isn't as nice as Vue. I'd love conditional rendering or reactive properties, and you just don't get that in vanilla JS. But the advantage is that I can throw away almost all of the code for

With Vue on the frontend, my process for rendering data on the page was:

1. Retrieve the data from the datastore.
1. Derive a copy of the data with only the properties we want to share with the frontend.
1. Serialize all the fields to JSON.
1. Write a controller for the frontend that retrieves the data from the backend.
1. Populate page elements based on data we retrieved from the server.

When you render the frontend in Go, you can skip steps 2-4. You don't have to worry about exposing too much information to the client because you're only exposing what you render.

Started reimplementing in pure Go and SQLite.

## Wrap up

### What got done?

- Completed TinyPilot website redesign.
- Published [a new TinyPilot release](https://tinypilotkvm.com/blog/whats-new-in-2022-05).

### Lessons learned

-

### Goals for next month

-
