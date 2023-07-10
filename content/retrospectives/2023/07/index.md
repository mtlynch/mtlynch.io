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

- I'm trying to figure out where I'm spending unnecessary time on TinyPilot.
- I realized I've once again become addicted to email.

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

At a recent indie founder meetup, I mentioned that my biggest constraint was still finding time for proactive tasks. Some of the other meetup attendees were surprised to hear this. I've been running TinyPilot for three years. The process sounds simple: the team manufactures devices, sends them to a warehouse, and the warehouse ships the devices to customers.

Why couldn't I just automate or delegate everything? What required my attention specifically?

Last year, I evaluated [how I was spending my time](/retrospectives/2022/02/#how-can-i-manage-tinypilot-with-only-20-hours-per-week) in one of my retrospectives.

Here are the tasks that occupy most of my time as TinyPilot's founder.

### Task 1: Coordinating changes

Starting about two years ago, my main responsibility within TinyPilot has been coordinating changes. We're always iterating on all aspects of the business. We're improving the software, improving the hardware, integrating new vendors, adding more team members, etc.

As TinyPilot grows, every change has ripple effects that touch different parts of the company.

With the complexity of TinyPilot, so many changes have ripple effects.

#### How I can reduce my time here?

One of the suggestions at the meetup was that I should just hire a manager, but that's harder than it sounds. TinyPilot has three teams composed of two to three people each: software development, support engineering, and customer service / local operations. The three teams have mostly disjoint responsibilities.

If I hired someone to manage just one team, that wouldn't save me much time. If I hired someone to manage all three teams, they'd need to be someone who has experience managing a software team, so they'd probably need a salary of $125k/yr or more. That means the cost to hire that person would be at least $200k/yr, which would soak up all of TinyPilot's current profits.

The best solution I can think of is the underwhelming solution I reached last year: look for more opportunities to delegate.

There are some tasks that I feel like I have to take on because I notice parts that I can't delegate. Often, these tasks have subtasks that I can delegate effectively, but I miss those opportunities because I don't think to look.

The other solution is to pushing more work to vendors instead of doing it in-house. This year, we stopped doing our own fulfillment and transitioned the work a third-party logistics (3PL) vendor. That introduced some new challenges, but it also eliminated a lot of work and other risks. I expect the upcoming transition from in-house product assembly to a contract manufacturer to reduce TinyPilot's complexity even further.

### Task 2: Managing the relationship with our 3PL partner

I expected the hard work to be picking a vendor and then flipping the switch so that orders ship from their warehouse instead of our office.

I'm finding that there's still a long tail of little workflows we still need to figure out with the 3PL vendor:

- How do we keep track of inventory as it travels from our office to the 3PL warehouse?
- How do we verify that the 3PL isn't losing inventory within their warehouse?
- How do we resolve issues when the 3PL ships the wrong items in an order?
- How do we handle customers who want same-day shipping?

#### How I can reduce my time here?

Delegate more to my team.

I've started delegating more of this work to my team, and it's going well. Instead of getting into the nitty gritty of the process, I give them a high-level goal and they take care of implementation. Like, "We need a system for verifying that our sales receipts match the counts in their inventory system."

### Task 3: Overseeing dev work

I spend a lot of time overseeing dev work because it's the part of TinyPilot I enjoy the most. I'm still a developer at heart even though I don't get to spend much time writing code.

I can make high-value contributions because I'm in touch with customers. I can often cut cruft because I know very few customers depend on it or that it exists for scenarios that I no longer consider important.

#### How I can reduce my time here?

Limit my time

### Task 4: Overseeing support work

The support engineering team does things like write new tutorials and documentation.

I still skim

One thing I _could_ do but I'm kind of afraid to do is stop reading support tickets until my team escalates them to me.

#### How can I reduce my time here?

## Getting out of email addiction

Over the last few years, I've oscillated between having a healthy relationship with email and having an unproductive addiction to email.

### How did I lose my good email habits?

Once I have healthy email habits, it's generally easy to keep them up. What typically knocks me out of my healthy habit is when something happens where I have a legitimate need to watch my email aggressively.

Recently, the vendor we use to manufacture TinyPilot's metal cases ran late, and we were running out of the cases we had in stock. If we run out of cases, it's a huge pain &mdash; it blocks a lot of work for the team responsible for assembling devices. When that team has nothing to do, I need to scramble to reassign them. And their new tasks have to be things that they can drop on the floor again in a few days when we (hopefully) get cases again.

In situations like a case shortage, I feel like there's a legitimate need to check email obsessively. Suppose the vendor in China emails me on a Friday evening asking for a decision. If I let the email sit until Monday morning, they won't see my response until Tuesday morning in China. That's a three-day delay, which possibly translates into three days when TinyPilot can't assemble any new devices.

The problem is that after the emergency situation is over, I retain the habit of checking my email constantly. And when I check my email and there's nothing for me to respond to, I still crave the dopamine hit, so I check social media, which is never productive. Now instead of taking a 30-second break to check email, I've taken a 10-30-minute break to check social media.

### Solution 1: Only check email during scheduled email time

Historically, the way I break out of a bad email habit is by mapping out my day explicitly.

Each morning, I split my workday [into 30-minute blocks](/eliminate-distractions/#schedule-time-for-email-texts-and-social-media) and decide how to spend each block. To avoid checking email compulsively, I schedule time for reading and responding to email instead of letting emails be a background hum throughout the day.

I need to force myself to get back in this habit. It's easy to keep up once I'm in the rhythm, but .

### Solution 2: Empower my teammates to use peer review more

As I write this, it's 10 AM, and I've resisted checking my email so far today. But I have the burning feeling that I'm blocking work. I had given feedback on several tasks last week

We use peer reviews, and it goes well, but I'm still doing a lot of review. The two things that I've found hard to delegate to peer review are writing customer-facing documentation and defining internal workflows.

## Side projects

### Learning Nix

Nix has been at the top of my list of interesting-looking technologies for the past year. I've paused my programming side projects to tinker a bit with Nix and NixOS.

I wrote up notes about my first experiences with Nix, and the post. My notes on Nix unexpectedly got a lot of attention on [Twitter](https://twitter.com/deliberatecoder/status/1670241507486441473) and [Hacker News](https://news.ycombinator.com/item?id=36387874). That encouraged me to try to capture more of my notes about trying things. My main blog feed is for polished posts, but I've been investing more in a ["notes"](/notes/) subsection for things that aren't as polished but I just want to capture what I've learned while it's fresh in my head.

### Building my first home server rack

My fiance has pointed out that my office gets dirty because I have wires everywhere that make it hard to clean. I realized I could build a server rack, and we'd both be happy. I'd enjoy a fun project of building a rack, and she'd appreciate the reduction in messiness.

I'm using a managed switch and VLANs for the first time. At first, I found VLANs too cumbersome and hard to debug, but now that I've got the basics, I enjoy them. I want to make VLANs for everything.

### Implementing an authentication library for Go

When I started making web apps in 2018, I was too aware of the risks of managing authentication, so I always outsourced authentication to third-party services. That worked fine, but it created two other problems. The first was that it limited my products' adoption. Others could only deploy my apps on their servers if they also used the same authentication service I used. The other was test complexity. When I wrote end-to-end tests, they were slow and brittle because they depended on a third-party authentication service.

For my most recent project, [ScreenJournal](https://thescreenjournal.com/), I surveyed [what authentication libraries were available](https://github.com/avelino/awesome-go#authentication-and-oauth). My requirements were:

1. It had to be open-source.
1. It had to use Go, my current language of choice for web apps.
1. It had to be a library I build into my app rather than a separate service that runs alongside my app.
1. It had to support SQLite as a datastore.

[goth](https://github.com/markbates/goth) (formerly gomniauth) is popular, but it breaks requirement (3), as it only works with external third-party services.

The other popular Go authentication solution is [authboss](https://github.com/volatiletech/authboss). The documentation is pretty sparse, which I later discovered was [an intentional choice the author made](authboss-support.png) to limit support requests (I sympathize).

I spent an afternoon trying to implement a simple web app with authboss, but I [couldn't even get the basics working](https://github.com/mtlynch/authboss-minimal/pull/6/files). The more I learned about authboss, the less it seemed to match what I wanted from an authentication library.

Now, I'm trying to create my own reusable authentication library. I'm not trying to make it a popular open-source package, just something that saves me the trouble of copy/pasting a bunch of auth code across all of my hobby projects.

## Wrap up

### What got done?

- Built my first home server rack.
- Learned the basics of Nix and NixOS.

### Lessons learned

-

### Goals for next month

- Reach $98k in sales revenue.
- Stay on schedule for TinyPilot's shift to our contract manufacturer.
- Spend less than 40% of my time on email.
