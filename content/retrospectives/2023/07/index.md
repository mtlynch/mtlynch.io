---
title: "TinyPilot: Month 36"
date: 2023-07-05T10:24:53-04:00
description: Where is my time going? (2023 edition)
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

### Start a manufacturing batch with a new contract manufacturer

- **Result**: XX
- **Grade**: A

TODO

### Publish TinyPilot Pro 2.6.0

- **Result**: XX
- **Grade**: A

TODO

### Reach $95k in revenue

- **Result**: Reached $93k in revenue.
- **Grade**: C

TinyPilot's earnings were fairly flat. A new review [came out](https://www.youtube.com/watch?v=tx724dhxGxc) but it got a tepid response, so we saw fewer sales than I hoped. Our ad effectiveness decreased as well. In May, we made $3.64 in revenue for every $1 in ad spend, but in June, the ratio dropped to 2.62:1.

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | May 2023       | June 2023        | Change                                           |
| ------------------------ | -------------- | ---------------- | ------------------------------------------------ |
| Unique Visitors          | 7,773          | 8,300            | <font color="green">+527 (+7%)</font>            |
| Sales Revenue            | $89,569.49     | $88,378.45       | <font color="red">-$1,191.04 (-1%)</font>        |
| Enterprise Subscriptions | $290.70        | $290.70          | 0                                                |
| Royalties                | $2,597.71      | $4,399.66        | <font color="green">+$1,801.95 (+69%)</font>     |
| Total Revenue            | $92,457.90     | $93,068.81       | <font color="green">+$610.91 (+1%)</font>        |
| **Profit**               | **$24,034.74** | **$27,553.68**\* | **<font color="green">+$3,518.94 (+15%)</font>** |

\* Profit is a naïve calculation based on my change in cash holdings over the month. I'll update it after I do real bookkeeping mid-month.

## Where does my time go?

Last year, I evaluated [how I was spending my time](/retrospectives/2022/02/#how-can-i-manage-tinypilot-with-only-20-hours-per-week) in one of my retrospectives.

### Task 1: Coordinating changes

Starting about two years ago, my main responsibility within TinyPilot has been coordinating changes. We're always iterating on all aspects of the business. We're improving the software, improving the hardware, integrating new vendors, adding more team members, etc.

As TinyPilot grows, every change has ripple effects that touch different parts of the company.

With the complexity of TinyPilot, so many changes have ripple effects.

#### How I can reduce my time here?

This is the same problem I had last year, and I haven't found a good solution.

The best I can do is continue looking for opportunities to delegate while recognizing that it will be hard.

This is a place where it's pretty hard to reduce time. For example, processes around the 3PL do rise to my level because they involve company-level tradeoffs. Do we trust the information that the 3PL gives us, or is it worth our time to verify it? Do we try to push work onto the 3PL that we view as their responsibility or do we take it on ourselves? Do we invest in tooling to make the process on our side easier?

Look for more opportunities to delegate.

### Task 2: Managing the relationship with our 3PL partner

One of the big projects this year was transitioning our fulfillment to a third-party logistics (3PL) vendor. I expected the hard work to be picking a vendor and then having them start shipping out our orders. I'm finding that there's a long tail of little processes workflows we still need to figure out:

- How do we verify that we're not losing track of inventory when we send it from our office to the 3PL warehouse?
- How do we verify that the 3PL is not losing inventory within their warehouse?
- How do we resolve issues when the 3PL ships the wrong items in an order?
- How do we handle customers who want same-day shipping?

#### How I can reduce my time here?

Delegate more to my team.

I've started delegating more of this work to my team, and it's going well. Instead of getting into the nitty gritty of the process, I give them a high-level goal and they take care of implementation. Like, "We need a system for matching our sales numbers with their inventory numbers."

### Task 3: Overseeing dev work

I spend a lot of time overseeing dev work because it's the part of TinyPilot I enjoy the most. I'm still a developer at heart even though I don't get to spend much time

I can make high-value contributions because I'm in touch with customers. I can often cut cruft because I know very few customers depend on it or that it exists for scenarios that I no longer consider important.

#### How I can reduce my time here?

Limit my time

### Task 4: Overseeing support work

The support engineering team does things like write new tutorials and documentation.

I still skim

#### How can I reduce my time here?

### Management

Currently, I manage seven teammates within TinyPilot, all of whom work 10-20 hours per week. In addition, I'm the sole point of contact with a lot of our major vendors and partners, including our EU distributor, our hardware manufacturer, and

The 3PL is delicate because we're often letting them know about errors or pointing out discrepancies in the information they tell us.

### Why can't I just hire a manager?

When I was at the meetup, one of the questions was why don't I just delegate to a manager? If I want to spend less time managing and more time developing software or writing, why don't I just hire a manager?

The issue is that a lot of the management is distinct

The good news is that I expect a lot of management work to simplify by the end of the year. If we successfully transition to a contract manufacturer and close our local office, that's a

To hire someone who's as capable as me to run

### Email addiction

Because so much of my job has become talking to people rather than doing things, I find myself much more addicted to email.

It often is helpful if I can get people unblocked by answering an email, but it puts me into a state where I have the compulsion to check my email every few minutes. And then if my inbox is empty, I crave a dopamine hit from something, so then I check social media, which is a useless timesink.

## Resolutions

- Create a daily schedule and stick to it

- In the past, one of the things I've found helpful for focus is mapping out my day. I [split my workday into 30-minute blocks](/eliminate-distractions/#schedule-time-for-email-texts-and-social-media). Each morning, I decide in the morning how to spend each block. To avoid checking email compulsively, I schedule in explicit blocks of time for reading and responding to email instead of letting emails be a constant interruption throughout the day.

I've gone in and out of this habit. It's hard to stick to it when most of my work is just and some days, my work is legitimately, "make lots of little decisions via email." In the long-term, I can usually avoid that, but with seven direct reports and four major third-party vendors, there are times where I need to respond to lots of people in a day.

## Side projects

### Learning Nix

Nix has been at the top of my list of interesting-looking technologies for the past year. I've paused my programming side projects to tinker a bit with Nix and NixOS.

I wrote up notes about my first experiences with Nix, and the post. My notes on Nix unexpectedly got a lot of attention on Twitter and Hacker News (TODO: link). That encouraged me to try to capture more of my notes about trying things. My main blog feed is for polished posts, but I've been investing more in a "notes" subsection for things that aren't as polished but I just want to capture what I've learned while it's fresh in my head.

### Building my first home server rack

### Implementing an authentication library for Go

## Wrap up

### What got done?

- Built my first home server rack.

### Lessons learned

-

### Goals for next month

- Reach $98k in sales revenue.
- Stay on schedule for shift to contract manufacturer.
- Spend less than 40% of my time on email.
