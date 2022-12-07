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
| **Profit**               | **$26,997.39** | **$21,508.21**\* | **<font color="red">-$5,489.18 (-20%)</font>** |

\* Profit is a naïve calculation based on my change in cash holdings over the month. I'll update it after I do real bookkeeping mid-month.

## We don't have enough time to save ourselves time

One of the goals for November was to begin transitioning fulfillment to a third-party logistics (3PL) vendor. I asked a member of the fulfillment team to review our workflows and prepare for how we hand that over to a 3PL vendor.

The next week, we saw a spike in orders, so there was no progress on researching the transition to 3PL. And then two weeks later, we were still catching up from the sales spike, so there still wasn't progress.

The next time I met with the member of the fulfillment staff, I asked how much spare capacity we usually have for atypical tasks like this, and I was surprised to learn that it was roughly zero. The fulfillment team's short-term tasks of assembling devices, shipping out orders, and responding to suppport requests was enough to occupy all of their hours for the week.

When short-term tasks take up all your time, it's too late to fix the problem. Often, there are obvious ways to reduce your load, but switching processes, automating, or delegating require an upfront investment. If you're already at capacity, you reach an unpleasant state where you don't have enough time to save yourself time.

## Using long-term tasks as an early warning sign

The support engineers have the clearest split between short- and long-term tasks. The support engineers' urgent responsibility is responding to customer support requests on the TinyPilot help forum and on our CRM platform. Support volume ebbs and flows, so when the support engineers have spare time, they look for recurring patterns in support requests and write [help articles](https://tinypilotkvm.com/faq) explaining how to address the issues.

I asked them to. I realized I should have noticed that . The problem is that it's not really sharpening the saw. It's not time-sensitive but it's not sharpening the saw.

| Team                | Short-term tasks                                                                           | Long-term tasks                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Founder             | Team management<br>Vendor management<br>Reviewing work<br>Filling gaps in responsibilities | Marketing<br>Public writing<br>Re-evaluating strategy<br>Hiring and training                               |
| Fulfillment staff   | Assembling devices<br>Fulfilling orders<br>Customer service                                | Creating customer support playbooks<br>Assisting in marketing                                              |
| Support engineers   | Answering technical support questions                                                      | Writing documentation<br>Investigating difficult bugs                                                      |
| Software developers | Releasing new features<br>Fixing urgent bugs                                               | Refactoring code<br>Improving development experience<br>Creating automated tests<br>Fixing non-urgent bugs |

## When delegation folds back on you

## Getting out of the Ansible hole

[Ansible](https://github.com/ansible/ansible) is a tool for configuring servers automatically. I've been using it for seven years at this point, and it's how I manage all the [virtual machines in my homelab](/building-a-vm-homelab/).

When I started work on TinyPilot back in 2020, I needed a way to deploy code onto my Raspberry Pi device and configure the OS functionality TinyPilot needed. Ansible was the natural choice. And when I decided to release TinyPilot as a real product, I figured the easiest way

At the time, I definitely knew that Ansible was not the standard way of installing software on Linux. The Raspberry Pi OS is based on Debian, so the more conventional installation would have been to use Debian packages. The problem was that I didn't know anything about Debian packages, and they seemed like a lot of work.

Would I have to set up my own apt repository? TinyPilot depended on nginx. I knew that Debian packages could declare dependencies on other packages, but was there a way of

## Side projects

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-
