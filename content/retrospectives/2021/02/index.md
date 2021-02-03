---
title: "TinyPilot: Month 7"
date: 2021-02-02T00:00:00-05:00
description: Frighteningly fast growth
---

## Highlights

*

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Hire a freelance developer to help with TinyPilot development

* **Result**: I ran one trial hire that didn't work out, but I'm currently trying with another.
* **Grade**: A

It's been a while since I worked regularly with another developer, so I'd forgotten how long it takes people to ramp up. It also makes it hard to distinguish between someone who's still ramping up and someone who's a poor fit.

### Receive TinyPilot reviews from two bloggers or YouTubers with a relevant audience

* **Result**: Received one YouTube review and two others are in progress
* **Grade**: A-

I underestimated how long it takes for YouTubers to make new videos. One new review came out, but it's based on outreach I did in November. Two other YouTubers agreed to review, but they're still working on their videos.

Also, the one review turned out to be almost too much to handle. More on that [below](#my-first-youtube-review).

### Earn $4k in revenue from Hit the Front Page of Hacker News

* **Result**: Earned $2.6k in revenue
* **Grade**: C

The course hasn't played out quite the way I'd hoped. I'm happy with the material I created, but far fewer people are purchasing it than I anticipated.

I tried several different techniques to market it, but none of them have had a noticeable effect on sales.

## Stats

### [TinyPilot](https://tinypilotkvm.com)

{{<revenue-graph project="tinypilot">}}

| Metric             | December 2020  | January 2021   | Change                                             |
| ------------------ | -------------- | -------------- | -------------------------------------------------- |
| Unique Visitors    | 3,486          | 11,249         | <font color="green">+7,763 (+223%)</font>          |
| Total Pageviews    | 5,785          | 17,737         | <font color="green">+11,952 (+207%)</font>         |
| Sales Revenue      | $15,358.31     | $41,992.92     | <font color="green">+$26,634.61 (+173%)</font>     |
| Donations          | $9.00          | $0.00          | <font color="red">-$9.00 (-100%)</font>            |
| **Total Earnings** | **$15,367.05** | **$41,992.92** | **<font color="green">+$26,625.87 (+173%)</font>** |

This was a huge month for TinyPilot, and the majority is due to one positive YouTube review.

## My first YouTube review

I discovered the Craft Computing YouTube channel early last year when it was the only tutorial I found that did a good job helping me install Proxmox for the first time (TODO: link). A few months later, Jeff, the host, announced that he had  [quit his job](https://www.youtube.com/watch?v=5yTq0DLLeN0) as an IT manager to work for himself, so I felt a kinship there (TODO: link).

In November, I reached out to ask if he'd be interested in reviewing TinyPilot. He agreed, so I quickly shipped one over, but I didn't hear anything for a few months. I was beginning to wonder whether my Voyager just got tossed into a big heap of free hardware that companies send him.

Just before I was going to bed on January 12th, Jeff emailed me to say he posted the review.

<div style="max-width: 600px; display: block; margin: 0 auto;">

{{<youtube id="CyEpshm16HY" title="Designing the Ideal Bootstrapped Business">}}

</div>

My girlfriend and I watched it on the big TV in our living room to get the full experience, and it was extremely surreal. Jeff was a guy I knew as a distant YouTube personality, but now he was on a big screen in my living room *holding my product and speaking directly to me*!

Jeff loved the product and shared the many ways it impressed him. I was anxious the whole way through that he would suddenly stop and say, "Actually, now that I think about it, this product is bad, and I don't like it." But fortunately, the review was positive throughout, and his critiques were minor.

The results were strong and immediate. The next day, I received XX orders and earned XX in revenue, beating old records by far. The next day, the number of orders dropped, but more of the customers purchased high end kits, so the total revenue remained the same (almost *exactly* the same - there was a $XX increase).

## My first postmortem

One of the most valuable practices I learned from working at Google is [blameless postmortems](https://landing.google.com/sre/book/chapters/postmortem-culture.html). When something goes majorly wrong, you get back to steady state and then write a report analyzing what happened.

As the name implies, the document is *blameless*. It's never, "We had an outage because Michael is stupid and deleted the wrong file." The underlying assumption of a postmortem is that everyone on the team is smart and diligent, so if something went wrong, it was the systems and not the people who failed. When a failure looks like someone being stupid, the root cause is that the existing process failed to protect against expected human error.

Below, I've listed the major issues we discovered and what changes we put in place to mitigate them in the future.

### Inventory targets were too low

We manage inventory with a spreadsheet. For each part we carry, we define a minimum and maximum. For example, Raspberry Pis had a minimum of 40 and a maximum of 80. That means that anytime our inventory of Raspberry Pis drops below 40 Pis, we order enough to get our supply back to 80.

The problem was that we'd never adjust these targets except when they became a problem. Even though TinyPilot's sales grow each month, we didn't change the targets until we hit a shortage. And then when we're in a shortage, we're so panicked about the shortage that it's hard to think rationally about what the new targets should be.

* **Fix**: Schedule a monthly adjustment of inventory targets.
* **Fix**: Assume the next surge in orders will be more intense than the previous one.
* **Fix**: Whenever we're at risk of running out of an item, double our inventory targets.

### Urgency was not obvious

Our standard workflow with the inventory spreadsheet is to "top up" any item that falls below the threshold of what's in stock. So when we dipped below the minimum for USB cables, we ordered new ones in our usual workflow, with standard ground shipping. What we didn't realize that at the rate customers were purchasing, some parts would reach zero before our resupply arrived.

* **Fix**: Highlight numbers in the "in stock" column when they reach dangerously low levels.
* **Fix**: Upgrade to Amazon Business Prime to make two-day shipping a no-brainer.
* **Fix**: Look for inventory management software that includes alerting based on trends.

### Handling time is too short

When I first started TinyPilot, I promised shipping within one business day. It immediately became clear that a one-day turnaround was unsustainable, as it forced me to constantly context-switch to rush orders out. A few weeks in, I changed the advertised turnaround time to two days.

For the first week of orders after the review, we were getting all orders out on time. On day nine, we finally ran out of a part and wouldn't have it in time to meet the two-day window, so we listed items as backordered.

Afterwards, we realized that if our turnaround time were three business days, we never would have been able to accomodate the full rush without ever missing our deadlines. In fact, about 80% of previous instances where we ran up against the deadline, an extra day of buffer would have solved the problem.

* **Fix**: Increase advertised handling time to three days.

### Managing inventory creates unnecessary cognitive load

Our inventory spreadsheet is in terms of absolute quantity, but some items ship in packs rather than individually. Our power adapters come in packs of three, and we needed XX extra, but we accidentally ordered XX 3-packs instead of dividing the number by three first.

The over-order was a human mistake, but it highlights how our system invites mistakes. The person placing the order needs to do mental arithmetic that varies for each order.

**Fix**: Add a column in the spreadsheet for "reorder quantity" that factors in quantity-per-pack.

## Where's the inventory management app for me?

You may have noticed that in the postmortem, most of the problems come back to our ad-hoc, homegrown spreadsheet. I've looked for inventory management apps several times throughout the life of TinyPilot, but every solution is either too simple or too complicated.

My ideal workflow would be that I record the sale of a TinyPilot Voyager (better yet, it finds out directly from Shopify), and the app deducts from my inventory all the components that make up a Voyager: case, cables, microSD card, and Raspberry Pi.

The "too simple" solutions have no concept of "product components." They track inventory only of finished products like T-shirts or sneakers. The "too complicated" solutions understand components, but they see orders as heavyweight workflows that involve a sales lifecycle, purchase order numbers, and tracking which warehouse holds the parts needed.

If you're reading this and want to build a SaaS app, I would pay you $200/month if you build a solution that matches TinyPilot's use case.

## How can I scale?

To scale production, I'm blah blah

### Scaling support

As the number of TinyPilot customers increases, I'm also receiving more support emails to the point where I'm spending up to half my working hours on technical support.

Jen Yip wrote last year about how she [keeps her support emails from growing](https://lunchbag.ca/company-of-one/#optimizing-customer-support) by building tools in her app that allow users to solve common support issues.

About half the support requests are actually just missing features in the app itself. Like someone will ask how to turn on WiFi. Currently, they have to go to the command line and look up instructions for the Raspberry Pi operating system, but this should be something users can do right from the TinyPilot web interface. I'm prioritizing features like that and also making debugging tools more visible when things go wrong.

### Scaling manufacturing

3D-printed parts are great because adjustments to the design are fast and inexpensive. The downside is that it's slower and more expensive than other methods. The lab that makes my Voyager cases can produce only 40 per week with the material I want. As I begin to reach the point of shipping 40 Voyagers per week, this will become a bottleneck.

I reached out to injection molding vendors. They they create a steel or aluminum mold of the case, fill it with plastic, then press it into shape. Creating the mold is slow and expensive, but once the mold is created, they can produce 1,000 per day at low costs. But the quotes came back $20-40k in upfront costs to make a mold for the Voyager. That's a bit too pricey at this point.

Instead, I'm exploring other materials with my 3D printing lab. Even if they're more expensive, I'd prefer that to committing $20k to a particular design that I might want to change in a few months.

The other part of manufacturing. My girlfriend slash inventory manager currently handles all the assembly, but we may reach a point where she doesn't have enough time to do order fullfilment, inventory management, assembly, and other tasks on top of being a full-time student. We're reviewing which tasks we can outsource when we reach the limits of her available work time.

### Scaling development

With all the other parts of running TinyPilot, I've sadly had very little time to work on the software.

* [Job description](https://docs.google.com/document/d/1DPvwbEqCJjJ2f6GklQ0lQnVvfgFNsAAahgzLRjox1-g/edit?usp=sharing)
* [Guidelines for working with me](https://docs.google.com/document/d/1wbXw6G7c6T-PnqIZzFzzzx8Iy3NKTHqcb6SDEPgdKxc/edit?usp=sharing)

It's hard because a lot of the existing code is prototype-grade that I wrote quickly to get the first version up and running. But when new developers come in, they think that's the standard quality of code that I expect, and they start writing code of similar quality or building on the weak foundation that's in place.

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Hit the Front Page of Hacker News](https://hitthefrontpage.com)

{{<revenue-graph project="htfp">}}

| Metric             | December 2020 | January 2021  | Change                                           |
| ------------------ | ------------- | ------------- | ------------------------------------------------ |
| Unique Visitors    | 2,595         | 1,042         | <font color="red">-1,553 (-60%)</font>           |
| **Total Earnings** | **$1,431.00** | **$2,565.22** | **<font color="green">+$1,134.22 (+79%)</font>** |

I'm planning to write a retrospective later this month that's focused entirely on what I learned from recording and marketing the course.

### [Is It Keto](https://isitketo.org)

{{<revenue-graph project="isitketo">}}

| Metric                    | December 2020 | January 2021 | Change                                         |
| ------------------------- | ------------- | ------------ | ---------------------------------------------- |
| Unique Visitors           | 49,373        | 80,177       | <font color="green">+30,804 (+62%)</font>      |
| Total Pageviews           | 93,242        | 182,367      | <font color="green">+89,125 (+96%)</font>      |
| Domain Rating (Ahrefs)    | 10.0          | 11.0         | <font color="green">+1.0 (+10%)</font>         |
| AdSense Earnings          | $334.72       | $677.36      | <font color="green">+$342.64 (+102%)</font>    |
| Amazon Affiliate Earnings | $149.99       | $238.02      | <font color="green">+$88.03 (+59%)</font>      |
| **Total Earnings**        | **$484.71**   | **$915.38**  | **<font color="green">+$430.67 (+89%)</font>** |

### [Zestful](https://zestfuldata.com)

{{<revenue-graph project="zestful">}}

| Metric             | December 2020 | January 2021 | Change                                        |
| ------------------ | ------------- | ------------ | --------------------------------------------- |
| Unique Visitors    | 507           | 419          | <font color="red">-88 (-17%)</font>           |
| Total Pageviews    | 1,511         | 1,194        | <font color="red">-317 (-21%)</font>          |
| RapidAPI Earnings  | $103.33       | $155.50      | <font color="green">+$52.17 (+50%)</font>     |
| **Total Earnings** | **$103.33**   | **$155.50**  | **<font color="green">+$52.17 (+50%)</font>** |

## Wrap up

### What got done?

*

### Lessons learned

*

### Goals for next month

* Attract five bloggers or YouTubers to a TinyPilot affiliate program
