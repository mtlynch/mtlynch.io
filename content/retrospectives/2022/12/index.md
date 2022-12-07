---
title: "TinyPilot: Month 29"
date: 2022-12-06T09:16:53-05:00
description: TinyPilot's first $100k month
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and the founder of [TinyPilot](https://tinypilotkvm.com), an independent computer hardware company. I started the company in 2020, and it now earns $60-80k/month in revenue and employs six other people.

Every month, I publish a retrospective like this one to share how things are going with my business and in my professional life overall.
{{</notice>}}

## Highlights

- TinyPilot generated over $100k of monthly revenue for the first time ever.

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Prepare to transition TinyPilot's fulfillment to a 3PL vendor

- **Result**: XX
- **Grade**: XX

TODO

### Continue onboarding new support engineers

- **Result**: XX
- **Grade**: XX

TODO

### Reduce projects where I'm in the critical path

- **Result**: XX
- **Grade**: XX

TODO

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | October 2022   | November 2022    | Change                                         |
| ------------------------ | -------------- | ---------------- | ---------------------------------------------- |
| Unique Visitors          | 7,994          | 9,512            | <font color="green">+1,518 (+19%)</font>       |
| Total Pageviews          | 17,862         | 20,387           | <font color="green">+2,525 (+14%)</font>       |
| Sales Revenue            | $85,834.20     | $107,223.10      | <font color="green">+$21,388.90 (+25%)</font>  |
| Enterprise Subscriptions | $290.70        | $290.70          | 0                                              |
| Royalties                | $5,544.12      | $4,402.50        | <font color="red">-$1,141.62 (-21%)</font>     |
| Total Revenue            | $91,669.02     | $111,916.30      | <font color="green">+$20,247.28 (+22%)</font>  |
| **Profit**               | **$26,042.39** | **$21,508.21**\* | **<font color="red">-$4,534.18 (-17%)</font>** |

\* Profit is a naïve calculation based on my change in cash holdings over the month. I'll update it after I do real bookkeeping mid-month.

## We don't have enough time to save ourselves time

One of the goals for November was to begin transitioning fulfillment to a third-party logistics (3PL) vendor. I asked a member of the fulfillment team to review our workflows and prepare for how we hand that over to a 3PL vendor.

The next week, we saw a spike in orders, so there was no progress on researching the transition to 3PL. And then two weeks later, we were still catching up from the sales spike, so there still wasn't progress.

The next time I met with the member of the fulfillment staff, I asked how much spare capacity we usually have for atypical tasks like this, and I was surprised to learn that it was roughly zero. The fulfillment team's short-term tasks of assembling devices, shipping out orders, and responding to suppport requests was enough to occupy all of their hours for the week.

When short-term tasks take up all your time, it's too late to fix the problem. Often, there are obvious ways to reduce your load, but switching processes, automating, or delegating require an upfront investment. If you're already at capacity, you reach an unpleasant state where you don't have enough time to save yourself time.

## Using long-term tasks as an early warning for exhaustion

The support engineers have the clearest split between short- and long-term tasks. The support engineers' urgent responsibility is responding to customer support requests on the TinyPilot help forum and on our CRM platform. Support volume ebbs and flows, so when the support engineers have spare time, they look for recurring patterns in support requests and write [help articles](https://tinypilotkvm.com/faq) explaining how to address the issues.

Everyone at TinyPilot has a mix of short-term tasks and long-term tasks:

| Team                | Short-term tasks                                                                           | Long-term tasks                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Founder             | Team management<br>Vendor management<br>Reviewing work<br>Filling gaps in responsibilities | Marketing<br>Public writing<br>Re-evaluating strategy<br>Hiring and training                               |
| Fulfillment staff   | Assembling devices<br>Fulfilling orders<br>Customer service                                | Creating customer support playbooks<br>Assisting in marketing                                              |
| Support engineers   | Answering technical support questions                                                      | Writing documentation<br>Investigating difficult bugs                                                      |
| Software developers | Releasing new features<br>Fixing urgent bugs                                               | Refactoring code<br>Improving development experience<br>Creating automated tests<br>Fixing non-urgent bugs |

The surprise with fulfillment staff has made me realize I should use long-term tasks as the canary in the coal mine. When a team stops making progress on long-term tasks, they're likely approaching their maximum capacity. It's best to reshuffle things early until they're at full capacity and have no time to make changes.

There are two problems with this. The first is that the team who's most frequently ignoring their long-term tasks is the founder team, by which I mean me. So when I'm at capacity, it's easy for me to overlook other teams slowing down on long-term tasks or be unable to react. I suppose the solution to that is to increase the priority for me to keep some spare capacity so that I can do that.

The other problem is that the fulfillment team has the least obvious set of long-term tasks. With the support engineers, there's a natural virtuous cycle. Nobody likes answering the same question over and over, so the sooner they write an FAQ, the sooner they can stop answering the same question. With the fulfillment staff, there's not really an equivalent. They can do things to optimize the fulfillment process, but I don't think there's much room for improvement there, and it's not the kind of thing you can improve every week.

## Getting out of the Ansible hole

[Ansible](https://github.com/ansible/ansible) is a tool for configuring servers automatically. I've been using it for seven years, and it's how I manage all the [virtual machines in my homelab](/building-a-vm-homelab/).

When I started work on TinyPilot back in 2020, I needed a way to deploy code onto my Raspberry Pi device and configure the OS functionality TinyPilot needed. Ansible was the natural choice. And when I decided to release TinyPilot as a real product, the easiest way to let users install it was to just replicate the workflow I used during development. I created [a simple install script](https://github.com/tiny-pilot/tinypilot/blob/2a97cf02bd6e032a2fc60846d7d2c60be92c7c74/quick-install) that bootstrapped an Ansible environment and then installed TinyPilot via Ansible.

At the time, I definitely knew that Ansible was not the standard way of installing software on Linux. Raspberry Pi OS is based on Debian, so the more conventional installation would have been to use Debian packages. The problem was that I didn't know anything about Debian packages, and they seemed like a lot of work.

Would I have to set up my own apt repository? Do I have to manage repo keys? What if TinyPilot both depends on another package and needs to configure that package? TinyPilot depended on nginx, so how was I supposed to configure nginx from my own package?

Two and a half years later, the dev team is paying the price for my choice of Ansible. As TinyPilot has grown and become more complex, our Ansible configuration has become complex as well. The TinyPilot installation process should take a few seconds, but instead it takes up to six minutes with all the Ansible overhead.

Beyond the impact on the end-user, Ansible has a tendency to swallow up development resources.

Here are the things I wish I'd known about Debian when I started work on TinyPilot:

- You can create and distribute standalone Debian packages without running your own apt repository.
- Creating a simple Debian package takes five minutes if you're following the right tutorial.
- You can [use Docker QEMU](https://github.com/tiny-pilot/janus-debian/blob/e29efc6ee3585cc01a22d1263863ed4f57325080/.circleci/config.yml#L15L63) to build ARM Debian packages from AMD systems.
- If your package needs to configure another package, the typical way to do it is by adding a file to a configuration directory rather than tinkering with another package's existing file.
  - For example, a TinyPilot Debian package could configure nginx by adding a file to `/etc/nginx/sites-enabled`.

The hardest part of learning Debian was finding useful information amid all the noise. A lot of the resources basically say, "Just read [the 9,000 page Debian maintainer's guide](https://www.debian.org/doc/manuals/debmake-doc/), but ignore the parts that are out of date."

The guides I found most helpful were:

- ["Creating and hosting your own deb packages and apt repo"](https://earthly.dev/blog/creating-and-hosting-your-own-deb-packages-and-apt-repo/) by Alex Couture-Beil
- ["Pragmatic Debian packaging"](https://vincent.bernat.ch/en/blog/2019-pragmatic-debian-packaging) by Vincent Bernat

Vincent was even kind enough to [hop on a video call with me](https://m.mtlynch.io/@vbernat@hachyderm.io/109369842244090259) to answer some of my remaining questions about Debian packages.

## Side projects

### [ScreenJournal](https://github.com/mtlynch/screenjournal)

I watch a lot of TV shows and movies, and I enjoy recommending what I like to friends. I often find myself struggling to remember what I watched and who I recommended it to.

I've checked around for apps that let you track movies and TV the same way you'd track reading with Goodreads, but nothing matched what I had in mind. I feel like my friends are exhausted with social apps that default to public, so I wanted something that lets you create a micro-community of friends who want to share recommendations. Less like Twitter, more like Discord.

I've started working on an app for sharing movie reviews with friends. It's called [ScreenJournal](https://github.com/mtlynch/screenjournal):

{{<img src="screenjournal.png" max-width="800px" has-border="true" caption="[ScreenJournal](https://github.com/mtlynch/screenjournal) is like Goodreads but for couch potatoes." alt="Screenshot of my movie reviews on ScreenJournal">}}

It's not quite ready for prime time yet, as the reviews are private, but it only supports a single admin user. Right now, it's only effective as a private movie journal for one person, but the next featue on my list is support for multiple users.

User management is notoriously hard to get right, so I've always avoided rolling my own implementation. For the past few years, I've used my friend [David Toth](https://twitter.com/jupiterunknown)'s [UserKit](https://userkit.io) service to manage users, but that service isn't yet open to the public, so it limits who can use my code. I looked for an open-source user management framework for Go, but the majority relied on OAuth from external services, which I didn't want. The rest were so heavyweight and complicated that I didn't want to bother.

Instead, I'm living dangerously and rolling my own user management. For session management, I'm using [jeff](https://github.com/abraithwaite/jeff), and for authentication, I'm going to use [bcrypt](https://pkg.go.dev/golang.org/x/crypto/bcrypt) and hope for the best.

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-
