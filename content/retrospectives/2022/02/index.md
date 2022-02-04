---
title: "TinyPilot: Month 19"
date: 2022-02-02T10:15:05-05:00
description: TODO - One-line summary
---

## Highlights

*

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Launch Voyager 2: PoE Edition

* **Result**: Delayed the launch a few weeks due to a hardware issue
* **Grade**: D

My new electrical engineering vendor reviewed the PoE version before I started sales, and they discovered that the device can shut off under heavy CPU load. Fortunately, we can fix it with better heat management in the case, but it's going to take a few weeks.

### Write a job description for TinyPilot support engineer and begin interviewing candidates

* **Result**: I wrote a [job description](https://tinypilotkvm.com/jobs/support-engineer), but I haven't posted it to any job boards.
* **Grade**: C+

It's one of those things that I keep deprioritizing because it's not urgent but if I had a support engineer, a lot of other issues would go away.

### Publish my fourth [annual retrospective](/tags/annual-review/)

* **Result**: Published my [annual retrospective](/solo-developer-year-4/)
* **Grade**: A

I was glad to publish it, as I'd been working on it for a few weeks.

I was surprised the post didn't get more traction on Hacker News and reddit. Usually, my annual updates are popular there, but this year was a miss on both sites. I can understand reddit, since I'm sharing them ot the /r/programming subreddit, and this year was less focused on software, but I thought it would be a great match for Hacker News. But as always, there's a lot of luck involved, so I can't draw too much from an individual post.

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | December 2021   | January 2022   | Change                                            |
| ------------------------ | --------------- | -------------- | ------------------------------------------------- |
| Unique Visitors          | 6,156           | 7,282          | <font color="green">+1,126 (+18%)</font>          |
| Total Pageviews          | 12,840          | 15,477         | <font color="green">+2,637 (+21%)</font>          |
| Sales Revenue            | $52,224.65      | $51,066.78     | <font color="red">-$1,157.87 (-2%)</font>         |
| Enterprise Subscriptions | $47.75          | $47.75         | 0                                                 |
| Royalties                | $1,100.47       | $5,075.00      | <font color="green">+$3,974.53 (+361%)</font>     |
| Total Revenue            | $53,372.87      | $56,189.53     | <font color="green">+$2,816.66 (+5%)</font>       |
| **Profit**               | <font color="red">**$-15,207.05**</font> | <font color="red">**$-8,425.67**</font> | **<font color="green">+$6,781.38 (+45%)</font>** |

Sales continued strong. And that's on top of having to pause sales for four days because we were sold out of Voyager 2.

I'm still cash flow negative and probably will be for the next month or two. Now that we're confident in the design for the Voyager 2, I'm stockpiling parts for the next 18-24 months so that we don't have to keep redesigning our circuit boards when parts go out of stock. We've had to do this six or seven times already, and it's a costly, unpleasant process.

## How can I get management to 20 hours per week?

One of my goals for this year is to manage TinyPilot with only 20 hours per week. I'm currently spending about 45 hours per week on TinyPilot. I don't have a good way of measuring it rigorously, but here's how I think the hours break down vs how I'd want to spend those hours:

| Task                                                 | Hours per week   | Ideal hours/wk |
|------------------------------------------------------|------------------|----------------|
| Coordinating changes                                 | 12               | 2              |
| Answering technical support questions                | 8                | 2              |
| Overseeing dev work                                  | 5                | 2              |
| Preparing TinyPilot releases                         | 5                | 2              |
| Making software architecture decisions               | 4                | 2              |
| Communicating with employees                         | 3                | 3              |
| Communicating with major vendors / distributors      | 4                | 1              |
| Administration/payroll/taxes                         | 2                | 0.5            |
| Answering sales questions                            | 1                | 0.5            |
| Answering non-technical support questions            | 1                | 0.5            |
| **Total**                                            | **45**           | **15.5**       |

{{<notice type="info">}}

**Note**: These are targets I want to hit on average, not strict limits. If a customer tells me they have a few questions about buying 200 Voyagers, I'm not going to say, "Sorry, I hit my half-hour limit on sales calls this week."

{{</notice>}}

I spend most of my time on coordinating changes. By this I mean little adjustments as TinyPilot evolves. For example, releasing a new product involves many big changes up front in assembling and shipping it, and then there are many small adjustments for months afterward as we work out all the kinks. It's a complicated enough topic that I split it into its own section [below](#how-can-i-spend-less-time-coordinating-changes).

Technical support questions is the most obvious place to outsource. That's been on my mind for months, but I haven't been prioritizing it enough. I'm working on that now. (TODO: link)

I'm still spending too much time preparing TinyPilot releases, but I've been working on automating and delegating that. It's been a long process. Each release used to take me about 35 hours between building, testing, and writing the announcement. Now, it's down to about 15 hours. The dev team has automated a lot of the build process, and TinyPilot's local staff has taken over most of manual testing. There's still more to do, but we're making steady progress.

Software architecture decisions is another one where I spend a lot of time, but my dev team is also working on taking on more of that responsibility.


## How can I spend less time coordinating changes?

Coordinating changes is one of the biggest places where I spend my time, and it's probably the least fun. There was a good example recently.

TinyPilot's EU distributor emailed me to say that on about 10% of his Voyager 2 builds, the USB-C ports come out misaligned so badly that he can't plug in USB-C cables.

{{<img src="port-skew.jpg" maxWidth="600px" alt="Photo of USB-C ports on Voyager 2 skewing right" caption="TinyPilot's EU distributor reported that he saw the USB-C ports skewing within the case on some builds.">}}

This was the sequence to get it sorted out:

1. I email the distributor to say I'll investigate and get back to him.
1. I email TinyPilot's local staff to see if they've seen anything similar.
1. TinyPilot's local staff says they've seen it, but not as extreme as the distributor is seeing it.
1. I ask local staff to investigate where the inconsistency in builds is coming from (e.g., case, PCBs, build technique).
1. Staff tells me they can't identify a cause after a few hours of investigating.
1. I email our distributor letting him know that we're revising the case to fix the issue.
1. I email our 3D printing partner and ask him to work around it by widening the USB-C holes.
1. TinyPilot's 3D printing partner prints a prototype and ships it to us.
1. I ask TinyPilot's staff to test a build with the new case and verify it works.
1. Staff verifies that the new case works and should fix the issue.
1. I email our 3D printing partner asking for the design files and requesting that we change our cases to the new design.
1. 3D printing partner sends me the case design files.
1. I send the design files to our distributor.

So, that was a lot of work to fix a skew of a few millimeters.

Looking back, I don't see obvious pieces I should have delegated. I can't put my distributor in contact with my staff or 3D printing designer and just tell them to do whatever he asks. I guess I could have delegated more of the interaction with the 3D printing vendor. Like, steps 7 to 11 could have been, "I ask my staff to work out a fix with the 3D printing vendor and send me the design files when they're done." That would have only saved me a small amount of work, but I should still get in the habit of empowering TinyPilot's local staff to own more of our assembly process.

Similar issues come up once or twice a week that need coordination between disparate parts of TinyPilot, and they require decisions from me.

The other factor is that there are just a lot of changes happening at TinyPilot all the time. Right now, I'm overseeing seven separate major projects:

1. We're switching electrical engineering vendors.
1. We're revising the Voyager 2's electrical design in response to part shortages.
1. We're wrapping up manufacturing and testing for the PoE version of the Voyager 2.
1. We're redesigning the website.
1. We're hiring our first support engineer.
1. We're exploring case manufacturing options that scale higher.
1. We're working with an external consultant to add H264 video support to TinyPilot.

From this, I'm realizing I should be more conservative in taking on major projects. If I change fewer things, I'll spend less time coordinating changes.

Another change I can make is to treat bandwidth as a first-class concern when hiring external vendors. The website redesign is taking months longer than I expected because the design firm is averaging only five hours per week on TinyPilot when I expected it to be more like 20. In the future, I'll talk more about hours per week during the hiring process.

## Back to scaling manufacturing

Around this time last year, I was in a panic looking for a way to scale up TinyPilot. The bottleneck at the time was the Voyager's 3D printed case. My 3D printing vendor could only produce around 100 per month, and we were quickly approaching that limit.

I was scrambling to figure out if I could switch to a different manufacturing method that scaled better, such as injection molding. The quotes I got at the time were $20-30k up front to create the mold, but then after that, they'd be able to crank out as many cases as I wanted for about $7/case.

The issue became moot because sales dropped after that. We were able to stockpile enough cases in the slow months to carry us through the busy months.

Now, we're back. Since I got rid of our other products and focused on the TinyPilot Voyager 2, we're consuming Voyager 2 cases faster than before. And because the Voyager 2 case is larger, it takes 50% longer to produce each case. TinyPilot's 3D printing partner can produce a maximum of 200 cases per month, and we're selling 130-150 units per month. We don't have much room to grow until demand outpaces our manufacturing capacity.



## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Is It Keto](https://isitketo.org)

{{<revenue-graph project="isitketo">}}

| Metric                   | December 2021 | January 2022 | Change                                         |
| ------------------------ | ------------- | ------------ | ---------------------------------------------- |
| Unique Visitors          | 15,781        | 25,948       | <font color="green">+10,167 (+64%)</font>      |
| Total Pageviews          | 35,740        | 59,351       | <font color="green">+23,611 (+66%)</font>      |
| Domain Rating (Ahrefs)   | 11.0          | 14.0         | <font color="green">+3.0 (+27%)</font>         |
| AdSense Revenue          | $171.00       | $291.47      | <font color="green">+$120.47 (+70%)</font>     |
| Amazon Affiliate Revenue | $30.21        | $51.45       | <font color="green">+$21.24 (+70%)</font>      |
| **Total Revenue**        | **$201.21**   | **$342.92**  | **<font color="green">+$141.71 (+70%)</font>** |

### [Hit the Front Page of Hacker News](https://hitthefrontpage.com/)

{{<revenue-graph project="htfp">}}

| Metric                    | December 2021 | January 2022 | Change                                        |
| ------------------------- | ------------- | ------------ | --------------------------------------------- |
| Unique Visitors           | 106           | 140          | <font color="green">+34 (+32%)</font>         |
| Gumroad Revenue           | $19.30        | $66.59       | <font color="green">+$47.29 (+245%)</font>    |
| Blogging for Devs Revenue | $27.30        | $0.00        | <font color="red">-$27.30 (-100%)</font>      |
| **Total Revenue**         | **$46.60**    | **$66.59**   | **<font color="green">+$19.99 (+43%)</font>** |

### [Zestful](https://zestfuldata.com)

{{<revenue-graph project="zestful">}}

| Metric            | December 2021 | January 2022 | Change                                       |
| ----------------- | ------------- | ------------ | -------------------------------------------- |
| Unique Visitors   | 461           | 564          | <font color="green">+103 (+22%)</font>       |
| Total Pageviews   | 1,176         | 1,514        | <font color="green">+338 (+29%)</font>       |
| RapidAPI Revenue  | $1,252.31     | $847.38      | <font color="red">-$404.93 (-32%)</font>     |
| **Total Revenue** | **$1,252.31** | **$847.38**  | **<font color="red">-$404.93 (-32%)</font>** |

## Wrap up

### What got done?

*

### Lessons learned

*

### Goals for next month

* Launch Voyager 2: PoE Edition
  * For real this time.
* Hire a TinyPilot support engineer
