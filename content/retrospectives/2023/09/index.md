---
title: "TinyPilot: Month 38"
date: 2023-09-02T07:12:40-04:00
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

Shopify has no native support for recurring subscriptions, so I had to search through the 50+ third-party Shopify apps that add this functionality. The problem is that almost all of them are designed for subscription box services where the customer wants to receive physical goods on a recurring basis.

Most of the Shopify subscription apps didn't support digital products. The few that did would only work on a native Shopify store, which I [don't have](/tinypilot-redesign/#why-didnt-you-just-use-a-shopify-template).

My options at this point are:

1. Sell renewing subscriptions outside of Shopify entirely (e.g., with Paddle, LemonSqueezy, Stripe).
1. Convert TinyPilot's purchase flow to a native Shopify store and then revisit Shopify's third-party subscription apps.

(1) requires the dev team to build a lot of infrastructure to support an off-Shopify checkout and to make sure our support teams still can access customer information outside of Shopify.

(2) keeps everything consolidated in Shopify, but it's also a major project. The last time I asked someone for an estimate, they quoted me $20k for the conversion. It's something I'd like to do eventually because a native Shopify store would have lots of other benefits, but I don't have bandwidth to take it on right now.

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

\* Profit is a naïve calculation based on my change in cash holdings over the month. I'll update it after I do real bookkeeping mid-month.

## Essential vs. accidental dev work for TinyPilot

In Fred Brooks' famous essay, "No Silver Bullet" (TODO: link), he points out that you can divide software work into "essential" and "accidental" work. Essential work includes things like defining requirements. Even if you have unlimited tooling and resources, you can't create a useful application if you don't take the time to figure out what the software should do.

Accidental work includes things that we only have to do because of the limitations of our tools. For example, managing memory in C is something we wouldn't have to care about if we had unlimited resources.

I've been thinking about that essay a lot lately in terms of TinyPilot's dev work. A lot of what we're doing feels like accidental complexity. I took a look at

And that's not even taking into account the cost of these tasks. The essential complexity tasks generally were less costly.

We have to install an application and test it on real Raspberry Pi hardware. We're also responsible for . I'd love it if we updated TinyPilot by just updating servers we control. What we do is closer to the way people ship desktop software.

## Making TinyPilot less configurable

One of the biggest sources of technical debt for TinyPilot is our use of Ansible. When I created TinyPilot, I didn't know how to distribute software on Linux systems, but I did know how to use Ansible. So I just created Ansible roles.

One of the realizations I wish I'd had earlier was that what made my Ansible mistake worse was how configurable I had made it.

## The return of free time

I have time to write for an hour every day. Before TinyPilot, I published ten full-length blog posts per year. I'm still not back to that, but I'm getting closer. I'm publishing a blog post or a briefer note every month.

What's worked?

Mature teams that can work independently. Can peer review each other's work.

I've been conservative about taking on new projects. I have a major project right now of moving from in-house manufacturing to the third-party contract manufacturer, and that's the only project I'm taking on. There are days where that project balloons up and I need to spend the day focusing on that to prevent a delay. If I had multiple projects, I run the risk that days like that would overlap or pile up.

What still needs work

Steering everyone away from writing documentation.

## Side projects

### Development environments in Nix

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-

### Requests for help

TODO
