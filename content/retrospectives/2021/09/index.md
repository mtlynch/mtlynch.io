---
title: "TinyPilot: Month 14"
date: 2021-09-01T10:07:31-04:00
description: TODO - One-line summary
---

## Highlights

* A redesign of TinyPilot's website might have been responsible for increased sales.


## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Help my EU distributor achieve his first sale

* **Result**: The distributor is accepting orders but has not yet made a sale
* **Grade**: B-

TODO

### Finalize the design of the Voyager 2

* **Result**: XX
* **Grade**: B

TODO

### Publish a sample chapter of [*Refactoring English*](https://refactoringenglish.com)

* **Result**: Almost finished a sample chapter
* **Grade**: XX

It's hard to write about good writing because people expect it to be well-written!

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric          | July 2021      | August 2021    | Change                                            |
| --------------- | -------------- | -------------- | ------------------------------------------------- |
| Unique Visitors | 5,234          | 4,194          | <font color="red">-1,040 (-20%)</font>            |
| Total Pageviews | 9,730          | 8,864          | <font color="red">-866 (-9%)</font>               |
| Sales Revenue   | $23,954.64     | $30,191.04     | <font color="green">+$6,236.40 (+26%)</font>      |
| Enterprise Subscriptions | $48.00 | $48.00 | $0 (0%) |
| Total Revenue   | $24,002.64     | $30,239.04     | <font color="green">+$6,236.40 (+26%)</font>      |
| **Profit**      | <font color="red">**$-9,713.34**</font> | <font color="red">**$-8,049.21**</font> | **<font color="green">+$1,664.13</font>** |

## TinyPilot website improvements

When I first launched TinyPilot's website, I meant for the design to be a placeholder until I improved it. I made small improvements over time, but the design had barely changed since I launched TinyPilot.

One of the hurdles was finding a skilled developer. After going through XX hires who didn't work out, I found a developer in XX, and he had some design ideas for the website.

In August, I worked with TinyPilot's newest developer on implementing his ideas, and I think the site looks more professional as a result:

{{<gallery caption="In August, I worked with one of TinyPilot's developers to redesign the TinyPilot homepage.<br>Original design (left), revised design (right)">}}
  {{<img src="home-before.png" alt="TODO" maxWidth="300px">}}
  {{<img src="home-after.png" alt="TODO" maxWidth="300px" hasBorder="true">}}
{{</gallery>}}


The results are promising. The site generated $7.20 for each visitor, a 60% increase from the previous month.

<div style="margin-bottom: 5rem">
  <canvas id="revenue-per-visitor"></canvas>
</div>

<script>
window.addEventListener("load", function () {
  let pairs = [
    ["2020-7", 1.78],
    ["2020-8", 1.29],
    ["2020-9", 2.09],
    ["2020-10", 3.91],
    ["2020-11", 3.95],
    ["2020-12", 4.41],
    ["2021-1", 3.73],
    ["2021-2", 4.23],
    ["2021-3", 3.41],
    ["2021-4", 4.91],
    ["2021-5", 5.32],
    ["2021-6", 4.65],
    ["2021-7", 4.58],
    ["2021-8", 7.20],
  ];
  let dates = [];
  let values = [];
  for (const pair of pairs) {
    const d = parseDate(pair[0]);
    dates.push(d.toLocaleString('default', { month: 'long' }) + ' ' + d.getFullYear());
    values.push(pair[1]);
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  drawChart("revenue-per-visitor", dates, values, "Revenue per Visitor", formatter.format);
});
</script>

I didn't do a rigorous A/B test to prove that the new site made a difference, so it's possible that this was a fluke, so we'll see how September turns out.

I'll go through the changes piece by piece.

First, we adjusted the navbar so that it now lines up with the content on the page:

{{<img src="navbar.png" alt="TODO" maxWidth="800px" hasBorder="true">}}

The feature brags are now more compact. You can't see it in the screenshot, but we removed the animations, which were a bit distracting.

{{<img src="feature-brags.png" alt="TODO" maxWidth="800px" hasBorder="true">}}

I changed the reviews from a stack of boxes to a carousel that rotates every few seconds with a new review:

{{<img src="reviews.png" alt="TODO" maxWidth="800px" hasBorder="true">}}

And lastly, we redesigned the footer. It was a jumbled mess before, but now it looks deliberate and organized:

{{<img src="footer.png" alt="TODO" maxWidth="800px" hasBorder="true">}}

This is just a first pass. I'd still like to hire a professional designer to iterate on this.

## Adding a European distributor

{{<img src="kvm-ip-voyager.png" alt="TODO" maxWidth="800px" hasBorder="true" caption="TinyPilot Voyager now also [ships from Europe](https://www.kvm-ip.de/en/p/tinypilot-voyager-1).">}}

## Carving out more time for myself

### QA testing

### Automated license checks

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Is It Keto](https://isitketo.org)

{{<revenue-graph project="isitketo">}}

| Metric                   | July 2021   | August 2021 | Change                                      |
| ------------------------ | ----------- | ----------- | ------------------------------------------- |
| Unique Visitors          | 39,568      | 30,439      | <font color="red">-9,129 (-23%)</font>      |
| Total Pageviews          | 96,494      | 72,340      | <font color="red">-24,154 (-25%)</font>     |
| Domain Rating (Ahrefs)   | 13.0        | 12.0        | <font color="red">-1.0 (-8%)</font>         |
| AdSense Revenue          | $438.07     | $358.43     | <font color="red">-$79.64 (-18%)</font>     |
| Amazon Affiliate Revenue | $59.65      | $43.73      | <font color="red">-$15.92 (-27%)</font>     |
| **Total Revenue**        | **$497.72** | **$402.16** | **<font color="red">-$95.56 (-19%)</font>** |

I ended up getting approved to join MediaVine, the premium ad network. But then they sent me the contract, and the terms felt especially onerous, even relative to typically onerous terms for these kinds of deals. The way it was worded seemed to imply that they can request unlimited site changes from me, and I have to do them. It also requires me to serve their ads exclusively for at least three months. If I even *spoke* to another advertiser, I'd be in breach of Mediavine's contract.

### [Hit the Front Page of Hacker News](https://hitthefrontpage.com/)

{{<revenue-graph project="htfp">}}

| Metric                    | July 2021   | August 2021 | Change                                          |
| ------------------------- | ----------- | ----------- | ----------------------------------------------- |
| Unique Visitors           | 109         | 393         | <font color="green">+284 (+261%)</font>         |
| Gumroad Revenue           | $218.09     | $728.90     | <font color="green">+$510.81 (+234%)</font>     |
| Blogging for Devs Revenue | $27.30      | $0.00       | <font color="red">-$27.30 (-100%)</font>        |
| **Total Revenue**         | **$245.39** | **$728.90** | **<font color="green">+$483.51 (+197%)</font>** |

Tried a Pay What You Want thing

### [Zestful](https://zestfuldata.com)

{{<revenue-graph project="zestful">}}

| Metric            | July 2021   | August 2021 | Change                                       |
| ----------------- | ----------- | ----------- | -------------------------------------------- |
| Unique Visitors   | 547         | 585         | <font color="green">+38 (+7%)</font>         |
| Total Pageviews   | 1,300       | 1,467       | <font color="green">+167 (+13%)</font>       |
| RapidAPI Revenue  | $620.67     | $390.80     | <font color="red">-$229.87 (-37%)</font>     |
| **Total Revenue** | **$620.67** | **$390.80** | **<font color="red">-$229.87 (-37%)</font>** |

Spike in usage was not fraud

Potential buyer

I [spent $7.4k](/solo-developer-year-1/#zestfulhttpszestfuldatacom) hiring a freelancer to help me launch the first version, and I had a few other smaller costs leading to a total cost of $8k.

Including August, my lifetime revenue from Zestful is now $8,246.40

Interestingly, this brings my lifetime revenue to $7,855.59

I'm not getting my hopes up, but it will be a nice bonus if it happens.

## Wrap up

### What got done?

* Helped European distributor launch his sales site
* Revamped TinyPilot's homepage
* Booked appearances on two podcasts
* Automated license checks for TinyPilot
  * The previous system was for customers to email me so I could do it manually.
* Migrated TinyPilot's mailing list from Mailchimp to EmailOctopus

### Lessons learned

*

### Goals for next month

* Publish a sample chapter of [*Refactoring English*](https://refactoringenglish.com)
