---
title: "TinyPilot: Month 29"
date: 2022-12-06T09:16:53-05:00
description: Worry when long term tasks stop.
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and the founder of [TinyPilot](https://tinypilotkvm.com), an independent computer hardware company. I started the company in 2020, and it now earns $60-80k/month in revenue and employs six other people.

Every month, I publish a retrospective like this one to share how things are going with my business and in my professional life overall.
{{</notice>}}

## Highlights

- TinyPilot generated $112k of monthly revenue, breaking the six-figure mark for the first time ever.
-

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Prepare to transition TinyPilot's fulfillment to a 3PL vendor

- **Result**: Started the onboarding process with a single, low-volume product
- **Grade**: B

I underestimated how much spare capacity the local staff would have to work on this. Combined with the unexpected spike in sales, we didn't make progress adapting our in-house fulfillment workflow to a 3PL vendor. Still, we can move forward with an imperfect process and improve it as the 3PL vendor frees up our time.

### Continue onboarding new support engineers

- **Result**: Both support engineers are answering around 80% of support tickets unassisted.
- **Grade**: A

TODO

### Reduce projects where I'm in the critical path

- **Result**: I've resisted the urge to initiate any new projects.
- **Grade**: B

I know that launching a new TinyPilot model always requires a lot of my time. Even though there are days where I feel like I have some spare bandwidth, I'm trying to keep as much of my time free as possible.

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

TinyPilot hit another all-time high in sales, reaching $112k in total revenue. This is the first month we ever crossed the six-figure mark.

The jump was largely due to TinyPilot receiving a positive mention on [Linus Tech Tips](https://youtu.be/232opnNPGNo), one of the most popular YouTube channels for homelab enthusiasts. Even though the review was primarily about our competitor's product, the channel has so many subscribers that TinyPilot saw a sizable surge in orders for the following two weeks.

I'm happy to see three-month trailing profit staying comfortably in the positive, even amid atypically high costs. TinyPilot's is paying a premium to produce 3D-printed cases [beyond our normal capacity](/retrospectives/2022/11/#the-race-for-more-cases), but our costs should drop significantly in January as we switch to metal cases.

## We don't have enough time to save ourselves time

One of the goals for November was to begin transitioning fulfillment to a third-party logistics (3PL) vendor. I asked a member of the fulfillment team to review our workflows and prepare for how we hand that over to a 3PL vendor.

The next week, we saw a spike in orders from the Linus Tech Tips video, so there was no progress on researching the transition to 3PL. And then two weeks later, we were still catching up from the sales spike, so there still wasn't progress.

The next time I met with the member of the fulfillment staff, I asked how much spare capacity we usually have for atypical tasks like this, and I was surprised to learn that it was roughly zero. The fulfillment team's short-term tasks of assembling devices, shipping out orders, and responding to suppport requests was enough to occupy all of their hours for the week.

Usually, when a process is taking too much time, there are ways of freeing up resources. You could invest in automation, hire additional people, move to a managed service, etc. With any change in workflow, there's a frictional cost

When short-term tasks take up all your time, it's too late to fix the problem. Often, there are obvious ways to reduce your load, but switching processes, automating, or delegating require an upfront investment. If you're already at capacity, you reach an unpleasant state where you don't have enough time to save yourself time.

## Using long-term tasks as an early warning for exhaustion

The support engineers have the clearest split between short- and long-term tasks. The support engineers' urgent responsibility is responding to customer support requests on the TinyPilot help forum and on our CRM platform. Support volume ebbs and flows, so when the support engineers have spare time, they look for recurring patterns in support requests and write [help articles](https://tinypilotkvm.com/faq) explaining how to address the issues.

Everyone at TinyPilot has a mix of short-term tasks and long-term tasks:

| Team                | Short-term tasks                                                                           | Long-term tasks                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Founder             | Team management<br>Vendor management<br>Reviewing work<br>Filling gaps in responsibilities | Marketing<br>Public writing<br>Re-evaluating strategy<br>Hiring and training                               |
| Fulfillment staff   | Assembling devices<br>Fulfilling orders<br>Customer service                                | Creating customer support playbooks<br>Assisting in marketing                                              |
| Support engineers   | Answering technical support questions                                                      | Writing documentation<br>Writing blog posts<br>Investigating difficult bugs                                |
| Software developers | Releasing new features<br>Fixing urgent bugs                                               | Refactoring code<br>Improving development experience<br>Creating automated tests<br>Fixing non-urgent bugs |

The surprise with fulfillment staff has made me realize I should use long-term tasks as the canary in the coal mine. When a team stops making progress on long-term tasks, they're likely approaching their maximum capacity. At that point, I should find ways to reduce load by decreasing responsibilities or add capacity by hiring, outsourcing, or purchasing better tools. There's always a switching cost to any new process, so if I wait until a team is spending all their time on urgent, short-term tasks, they'll have no time to make changes.

There are two problems with this. The first is that the team who's most frequently ignoring their long-term tasks is the founder team, by which I mean me. So when I'm overloaded, I won't notice a slowdown on long-term tasks. Even if I do, I don't have time to do anything about it. I suppose the solution to that is to increase the priority for me to keep some spare capacity so that I can do that.

The other problem is that the fulfillment team has the least obvious set of long-term tasks. With the support engineers, there's a natural virtuous cycle. Nobody likes answering the same question over and over, so the sooner they write an FAQ, the sooner they can stop answering the same question. With the fulfillment staff, there's not really an equivalent. They can do things to optimize the fulfillment process, but I don't think there's much room for improvement there, and it's not the kind of thing you can improve every week.

## Getting out of the Ansible hole

[Ansible](https://github.com/ansible/ansible) is a tool for configuring servers automatically. I've been using it for seven years, and it's how I manage all the [virtual machines in my homelab](/building-a-vm-homelab/).

When I started work on TinyPilot back in 2020, I needed a way to deploy code onto my Raspberry Pi device and configure the OS functionality TinyPilot needed. Ansible was the natural choice because it's designed for that use-case.

When I decided to release TinyPilot as a real product, the easiest way to let users install it was to just replicate the workflow I used during development. I created [a simple install script](https://github.com/tiny-pilot/tinypilot/blob/2a97cf02bd6e032a2fc60846d7d2c60be92c7c74/quick-install) that bootstrapped an Ansible environment and then installed TinyPilot via Ansible.

At the time, I knew that the more conventional installation would have been to use Debian packages. The problem was that I didn't know anything about Debian packages, and they seemed like a lot of work. Would I have to set up my own apt repository? Do I have to manage repo keys? TinyPilot depended on nginx, so how was I supposed to configure nginx from my own package?

Two and a half years later, the dev team is paying the price for my choice of Ansible. As TinyPilot has developed more features, our Ansible configuration has become complex. The TinyPilot installation process should take a few seconds, but instead it takes up to six minutes with all the overhead of Ansible.

Beyond the impact on the end-user, Ansible has a tendency to swallow up development resources.

Here are the things I wish I'd known about Debian when I started work on TinyPilot:

- You can create and distribute standalone Debian packages without running your own apt repository.
- Creating a simple Debian package takes five minutes if you're following the right tutorial.
- You can [use Docker QEMU](https://github.com/tiny-pilot/janus-debian/blob/e29efc6ee3585cc01a22d1263863ed4f57325080/.circleci/config.yml#L15L63) to build ARM Debian packages from x64 systems.
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

- Started the onboarding process with a 3PL vendor.
- Improved TinyPilot's Debian package in several important ways.
- Found a better payment platform for international contractors.
  - Deel has been a poor experience, and I wasn't crazy about Remote.com, so we're going with [Pilot](https://pilot.co).

### Lessons learned

- Long-term tasks are a good leading indicator of resource exhaustion.
  - If a team stops making progress on long-term tasks, it's important.
  - It's especially important for a founder to keep time for long-term tasks because they otherwise can't respond effectively to resource exhaustion on other teams.
- Debian packaging isn't as intimidating as it first seems

### Goals for next month

- Manufacture the first production batch of metal TinyPilot Voyager cases.
- Reach code complete on the next TinyPilot Pro release.