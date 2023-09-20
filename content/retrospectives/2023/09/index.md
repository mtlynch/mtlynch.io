---
title: "TinyPilot: Month 38"
date: 2023-09-20T00:00:00-04:00
description: TODO - One-line summary
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and the founder of [TinyPilot](https://tinypilotkvm.com), an independent computer hardware company. I started the company in 2020, and it now earns $60-80k/month in revenue and employs seven other people.

Every month, I publish a retrospective like this one to share how things are going with my business and my professional life overall.
{{</notice>}}

## Highlights

-

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Shift manufacturing to our contract manufacturer as quickly as possible

- **Result**: XX
- **Grade**: XX

TODO

### Create a detailed plan for moving out of TinyPilot's local office

- **Result**: We now have a month-by-month moveout plan with target dates and milestones.
- **Grade**: A

There's still a chicken-and-egg problem with some of the equipment I want to sell. Like if we sell the printer, how do we print shipping labels to sell anything else? But worse comes to worst, I just store the leftovers at my house and sell from here.

### Test an option for auto-renewing TinyPilot licenses

- **Result**: Tried to test but found no suitable tools
- **Grade**: B

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | July 2023      | August 2023    | Change                                          |
| ------------------------ | -------------- | -------------- | ----------------------------------------------- |
| Unique Visitors          | 7,800          | 6,900          | <font color="red">-900 (-12%)</font>            |
| Sales Revenue            | $79,635.02     | $91,670.46     | <font color="green">+$12,035.44 (+15%)</font>   |
| Enterprise Subscriptions | $290.70        | $290.70        | 0                                               |
| Royalties                | $3,777.52      | $2,969.62      | <font color="red">-$807.90 (-21%)</font>        |
| Total Revenue            | $83,703.24     | $94,930.78     | <font color="green">+$11,227.54 (+13%)</font>   |
| **Profit**               | **$26,359.62** | **$28,454.42** | **<font color="green">+$2,094.80 (+8%)</font>** |

## My failed attempts at recurring subscriptions

Shopify has no native support for recurring subscriptions, so I had to search through the 50+ third-party Shopify apps that add this functionality. The problem is that almost all of them are designed for subscription box services where the customer wants to receive physical goods on a recurring basis.

Most of the Shopify subscription apps didn't support digital products. The few that did would only work on a native Shopify store, which I [don't have](/tinypilot-redesign/#why-didnt-you-just-use-a-shopify-template).

My options at this point are:

1. Sell renewing subscriptions outside of Shopify entirely (e.g., with Paddle, LemonSqueezy, Stripe).
1. Convert TinyPilot's purchase flow to a native Shopify store and then revisit Shopify's third-party subscription apps.

(1) requires the dev team to build a lot of infrastructure to support an off-Shopify checkout and to make sure our support teams still can access customer information outside of Shopify.

(2) keeps everything consolidated in Shopify, but it's also a major project. The last time I asked someone for an estimate, they quoted me $20k for the conversion. It's something I'd like to do eventually because a native Shopify store would have lots of other benefits, but I don't have bandwidth to take it on right now.

## Making TinyPilot less configurable

One of the biggest sources of technical debt for TinyPilot is [our use of Ansible](/solo-developer-year-5/#ansible-and-git-are-not-software-distribution-tools). When I created TinyPilot, I didn't know how to distribute software on Linux systems, but I did know how to use Ansible. So, TinyPilot's installer was a minimal shell script that started Ansible and then used Ansible to do the heavy lifting of the installation.

Over time, it became clearer that Ansible was the wrong choice, as our install process grew slower and more complex. So, I realized about 18 months in that Ansible was a mistake.

The more subtle mistake I overlooked was that I'd made the installer too _configurable_.

When you're publishing Ansible roles, it's good practice to abstract away differences between operating systems and hardware architectures. So, for example, to copy a set of files to a directory, you don't just say, "Install everything to `/opt/whatever`." You say, "Install everything to `{{ my_target_dir }}`," and then in your `defaults.yml` file, you'd define `my_target_dir: /opt/whatever`. That way, if FreeBSD systems wanted you to install to a different location, you could override `my_target_dir` only on FreeBSD systems to point to something like `/usr/local/whatever`.

But TinyPilot supports just one OS and one hardware platform: Raspberry Pi OS on the Raspberry Pi 4.

Out of habit, I'd abstracted away all these decisions to make the Ansible role as flexible as possible. But that flexibility came at a cost. It made our code much harder to reason about. To understand any particular step in the installer, you often had to jump between three or more files to understand how Ansible would populate the variables in a real install.

Granted, there were users who appreciated this flexibility so that they could use TinyPilot [on systems that we don't officially support](https://github.com/tiny-pilot/tinypilot/discussions/755). Almost none of these users were paying customers, so we were paying a significant cost to support flexibility when it wasn't serving the customers who fund TinyPilot's development.

In the [latest TinyPilot release](https://tinypilotkvm.com/pro/changes#261), we've gotten rid of Ansible, but we've also eliminated almost all configuration options outside of the web UI. There have been no reports of upgrade issues, which strongly suggests that none of our customers needed this configurability at all.

## Essential vs. accidental dev work for TinyPilot

In his famous essay, ["No Silver Bullet,"](https://www.cgl.ucsf.edu/Outreach/pc204/NoSilverBullet.html) Fred Brooks points out that you can divide software work into "essential difficulties" and "accidental difficulties."

Essential difficulties include things like defining requirements and designing the UI. Even if you have unlimited tooling and resources, you can't create a useful application if you don't take the time to figure out what the software should do or how the user interacts with it.

Accidental difficulties include things that we only have to do because of the limitations of our tools. For example, managing memory in C is something we wouldn't have to care about if we had perfect tooling or unlimited RAM.

I've been thinking about that essay a lot lately in terms of TinyPilot's dev work. A lot of what we're doing feels like accidental difficulties.

I took a look at the tasks on TinyPilot's last sprint divided them into "essential difficulties" (green) and "accidental difficulties" (red):

{{<img src="essential-vs-accidental-2.6.1.webp" max-width="350px" has-border="true" caption="The tasks in TinyPilot's 2.6.1, colored according to essential difficulty (green) vs. accidental difficulty (red)">}}

Nine tasks dealt with essential difficulty like adding or refining features, while 28 (76%) dealt with accidental difficulty like regressions, package updates, or refactoring.

I don't have a good way to scale effort by dev hours, but I suspect our accidental difficulty tasks took longer, on average, than essential difficulty tasks. We could be spending as much as 90% of our time on accidental difficulty.

## How do we reduce accidental difficulty?

As I thought about this breakdown more, I realized it doesn't quite match the way I think about TinyPilot's dev work. There are three categories I care about and roughly how much time I'd like to dedicate to each:

| Category                           | % of Effort |
| ---------------------------------- | ----------- |
| Improving the product              | 70%         |
| Automation and reducing complexity | 20%         |
| Regular maintenance                | 10%         |

The problem is that these numbers are hard to balance. Every new line of code increases maintenance cost.

Granted, the 20% investment in complexity should reduce maintenance costs, but it won't always offset the load from new features. Last year we added support for H.264 video, but we had to integrate [Janus](https://janus.conf.meetecho.com/), a third-party WebRTC server. WebRTC is extremely complicated, so that single feature increased our maintenance burden by 20-30% overnight.

Thinking about this more, maybe I should be sticking to [my 50% rule](/solo-developer-year-5/#run-at-50-capacity). We should spend 50% of our time improving the product, then spend time on necessary maintenance, and spend whatever's left over on automation and reducing complexity.

{{<img src="three-category-2.6.1.webp" max-width="350px" has-border="true" caption="The tasks in TinyPilot's 2.6.1, colored according to improving the product (green), automation and redcing complexity (blue), and regular maintenance (red)">}}

Revisiting the last release through that lens, we had:

| Category                           | # of tasks | % of tasks |
| ---------------------------------- | ---------- | ---------- |
| Improving the product              | 8          | 22%        |
| Automation and reducing complexity | 26         | 70%        |
| Regular maintenance                | 3          | 8%         |

## Side projects

### Development environments in Nix

## Wrap up

### What got done?

- Published [TinyPilot Pro 2.6.1](https://tinypilotkvm.com/blog/whats-new-in-2023-09)
- TinyPilot [removed Ansible from our install process](https://github.com/tiny-pilot/tinypilot/issues/1596), yielding a huge performance increase and reduction of complexity
- Published ["_Aardvark'd_: The Fog Creek Documentary, 18 Years Later"](/aardvarkd/)

### Lessons learned

-

### Goals for next month

- Shift manufacturing to our contract manufacturer as quickly as possible
- Delegate tasks for clearing the TinyPilot office
