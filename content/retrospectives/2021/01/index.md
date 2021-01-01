---
title: "TinyPilot: Month 6"
date: 2021-01-04T08:23:03-05:00
description: I'm getting fantastic results despite feeling like I'm screwing up severely.
---

## Highlights

* TinyPilot had another record-breaking month, with $15k in revenue.

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Release the first version of [TinyPilot Pro](https://tinypilotkvm.com/pro)

* **Result**: XX
* **Grade**: XX

TODO

### Receive TinyPilot reviews from two bloggers or YouTubers with a relevant audience

* **Result**: Two YouTubers have agreed to review TinyPilot, but they haven't published yet.
* **Grade**: D

TinyPilot Pro sort of messed up my plans here. I'd been in conversation with a large YouTube channel interested in reviewing TinyPilot, but before they started recording, they emailed concerned that they'd release a review and a week later I'd release all these new features in TinyPilot Pro that their review video didn't cover.

### Record five out of seven parts to my [Hacker News course](https://gum.co/htfphn/hacker)

* **Result**: Recorded five parts and published them to pre-order customers
* **Grade**: A

TODO

## Stats

### [TinyPilot](https://tinypilotkvm.com)

{{<revenue-graph project="tinypilot">}}

| Metric             | November 2020  | December 2020  | Change                                           |
| ------------------ | -------------- | -------------- | ------------------------------------------------ |
| Unique Visitors    | 3,118          | 3,486          | <font color="green">+368 (+12%)</font>           |
| Total Pageviews    | 9,021          | 5,785          | <font color="red">-3,236 (-36%)</font>           |
| Sales Revenue      | $12,313.25     | $15,358.31     | <font color="green">+$3,045.06 (+25%)</font>     |
| Donations          | $0.00          | $9.00          | <font color="green">+$9.00 (+inf%)</font>        |
| **Total Earnings** | **$12,313.25** | **$15,367.05** | **<font color="green">+$3,053.80 (+25%)</font>** |

### [Hit the Front Page of Hacker News](https://tinypilotkvm.com)

| Metric             | December 2020  |
| ------------------ | -------------- |
| Total Pageviews    | 2,243          |
| Orders             | 30             |
| **Total Earnings** | **$1,181.40**  |

## I gave myself too many deadlines

I definitely overcommitted in December.

I generally avoid promising customers a product by a certain deadline, because TinyPilot is still so young, and things change quickly. At the same time, I was getting more and more embarrassed about the fact that I had been promising TinyPilot Pro "soon" for the last six months, and I had made zero progress on it.

TODO: TinyPilot Pro

In particular, so may customers asked when TinyPilot would support TLS and password protection. They're must-have features for customers who want to use TinyPilot on a shared network. I kept saying they'd be in the first release of TinyPilot Pro, but I kept pushing that bask. Embarrassed to stall on these features for so long, I finally started telling customers that I'd support these features by the end of the year.

And then on top of that, I'm working on [my first-ever video course](https://gum.co/htfphn/hacker). I estimated that it would take ~40 hours to write, record, edit, and publish. That's roughly how long it takes me to write a new blog post, so I figured I'd just do that instead of my next blog post, so it wouldn't take any time away from TinyPilot.

TODO: Screenshot from video

I *vastly* underestimated the work involved in the course. It's probably going to take 150-200 hours to create this course, all told. I started 

Lastly, I started a tradition of always publishing a yearly retrospeective on Feb. 1st, the anniversary of me [quitting my job to work for myself](/why-i-quit-google/). I want to keep up that tradition, so that means I need to have that blog post ready by Feb. 1st.

## I generated record sales by accident

I was running out of HDMI capture chips. It was a Wednesday. Then I sold two more.

I figured I could slow down the pace of sales by raising the price. So I tried bumping the price to $299. Two hours later, a customer emailed me asking how soon I could ship seven! I explained the situation, and he said that he was fine with shipping two immediately and waiting a few days for the remaining five, so that was $2,093 from a single customer.

## Trying the "honor system" system of software licensing

One of the biggest benefits of open source software is that you never have to worry about protecting secrets because everything's open anyway.

TinyPilot depends on several other components, so the free users install it with a script that bootstraps an Ansible environment and then uses Ansible roles to install TinyPilot and all of its dependencies. It's an unusual strategy for installation, but it's worked well for TinyPilot, and I wanted to reuse as much as possible for TinyPilot Pro.

 TinyPilot Pro isn't open source, so how do I make the code available without. And I want TinyPilot Pro to share as much code as possible with the open source TinyPilot, so I didn't want to maintain a completely separate installer for TinyPilot Pro.

## Keyboard engineers are smarter than I realized

Don't try to overengineer solutions. Find a solution for the problem at hand, and revisit it if the simple solution doesn't work.

Keystroke capture is one of the first things I did. And JavaScript offers keyboard events that look like this:

```javascript
{}
```

The `keyCode` event seemed like the obvious choice because it was a number. Generally, depending on numbers or codes is more robust than depending on human-readable names.

When a French customer asked if I could add support for AZERTY keyboard layouts, I bought a French keyboard. Most of the keycodes were the same, so I just created two mappings: one for QWERTY and one for AZERTY. I added a configuration flag to indicate whether TinyPilot should work on QWERTY or AZERTY. Not an elegant solution, but it worked well enough for my French customer.

Then, I got an email from a Norwegian customer. Fortunately, they decided

Then, I received an email from a German customer.

A few months later, I noticed that the `keyCode` field was technically deprecated. The preferred field was now `key`, so I tried it, and the results didn't make any sense. I 

## I'm hiring for TinyPilot

If you're interested in freelance Python and JavaScript development (regular JavaScript, no fancy frameworks), get in touch.

https://docs.google.com/document/d/1wbXw6G7c6T-PnqIZzFzzzx8Iy3NKTHqcb6SDEPgdKxc/edit?usp=sharing

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Is It Keto](https://isitketo.org)

{{<revenue-graph project="isitketo">}}

| Metric                    | November 2020 | December 2020 | Change                                        |
| ------------------------- | ------------- | ------------- | --------------------------------------------- |
| Unique Visitors           | 43,911        | 49,373        | <font color="green">+5,462 (+12%)</font>      |
| Total Pageviews           | 102,143       | 93,242        | <font color="red">-8,901 (-9%)</font>         |
| Domain Rating (Ahrefs)    | 10.0          | 10.0          | 0                                             |
| AdSense Earnings          | $357.51       | $334.72       | <font color="red">-$22.79 (-6%)</font>        |
| Amazon Affiliate Earnings | $74.01        | $149.99       | <font color="green">+$75.98 (+103%)</font>    |
| **Total Earnings**        | **$431.52**   | **$484.71**   | **<font color="green">+$53.19 (+12%)</font>** |

There isn't anything new at Is It Keto. I'm expecting a significant bump in January, as people often begin looking into healthier eating options at the start of the new year. I spent an hour updating Amazon Affiliate links so that I maximize the value from the upcoming surge months. Otherwise, Is It Keto remains on auto-pilot in the background.

### [Zestful](https://zestfuldata.com)

{{<revenue-graph project="zestful">}}

| Metric                   | November 2020 | December 2020 | Change                                       |
| ------------------------ | ------------- | ------------- | -------------------------------------------- |
| Unique Visitors          | 484           | 507           | <font color="green">+23 (+5%)</font>         |
| Total Pageviews          | 1,393         | 1,511         | <font color="green">+118 (+8%)</font>        |
| RapidAPI Earnings        | $28.37        | $103.33       | <font color="green">+$74.96 (+264%)</font>   |
| Enterprise Plan Earnings | $872.63       | $0.00         | <font color="red">-$872.63 (-100%)</font>    |
| **Total Earnings**       | **$901.00**   | **$103.33**   | **<font color="red">-$797.67 (-89%)</font>** |

Zestful's quiet. The enterprise customer finished their one-month plan and didn't need to renew, as expected. There was a jump in RapidAPI earnings, but that came from a single user who had a burst of requests over a two-day period and hasn't used the service since.

## Wrap up

### What got done?

*

### Lessons learned

*

### Goals for next month

* Hire a freelance developer to help with TinyPilot development