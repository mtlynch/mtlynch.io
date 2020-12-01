---
title: "TinyPilot: Month 5"
date: 2020-12-01T10:57:20-05:00
description: TODO - One-line summary
---

## Highlights

* TinyPilot revenue grew 20% to $12k
* Revenue across all my business jumped 26% to $13,600
* I launched my first ever paid course

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Release a high-end version of TinyPilot that arrives pre-assembled in a custom case

* **Result**: Released [TinyPilot Voyager](https://tinypilotkvm.com/product/tinypilot-voyager)
* **Grade**: A

TODO

### Release the first version of [TinyPilot Pro](https://tinypilotkvm.com/pro)

* **Result**: I haven't even figured out how to distribute TinyPilot Pro
* **Grade**: F

Releasing Voyager took longer than I anticipated, so I punted this until December.

### Figure out how to properly track the source of customers who end up completing purchases

* **Result**: I think I'm doing this properly now?
* **Grade**: C-

I figured out how to track sessions as users move between [tinypilotkvm.com](https://tinypilotkvm.com) and my Shopify domain for the checkout process (thanks to [this suggestion from reddit](https://www.reddit.com/r/SideProject/comments/jnkkzu/my_first_10k_month_selling_a_raspberry_pibased/gb3i0cz/?context=3)), but Google Analytics still claims 53% of visitors who complete a purchase typed in the [tinypilotkvm.com](https://tinypilotkvm.com) URL manually, which seems unlikely.

Another founder made a compelling argument to me that my largely tech audience is probably using ad-blockers anyway. That means they won't show up in analytics anyway. It's also not unusual for people to come back to the site later rather than complete their purchase the instant they see an ad, so I might be overindexing on trying to trace the source of purchases.

## Stats

### [TinyPilot](https://tinypilotkvm.com)

{{<revenue-graph project="tinypilot">}}

| Metric             | October 2020   | November 2020  | Change                                           |
| ------------------ | -------------- | -------------- | ------------------------------------------------ |
| Unique Visitors    | 2,604          | 3,118          | <font color="green">+514 (+20%)</font>           |
| Total Pageviews    | 8,780          | 9,021          | <font color="green">+241 (+3%)</font>            |
| Sales Revenue      | $10,176.23     | $12,313.25     | <font color="green">+$2,137.02 (+21%)</font>     |
| Donations          | $90.00         | $0.00          | <font color="red">-$90.00 (-100%)</font>         |
| **Total Earnings** | **$10,263.62** | **$12,313.25** | **<font color="green">+$2,049.63 (+20%)</font>** |

## New products require new habits

I'm finding that one of the biggest sources of stress with running TinyPilot as a business is just new things. When I'm in steady state, it's easy to run TinyPilot. It's a simple system: orders come in, my assistant packs them and mails them out. A few customers have support questions, and I answer them.

When we do something new, everything goes haywire and feels stressful. A good example was international shipping. Shipping a product internationally isn't very hard once you know how to do it, but it's hard to figure out how to do it. The first two weeks that I began selling TinyPilot internationally, my assistant and I were stressing out over whether we were including the right documents, assigning the right product codes, calculating shipping prices correctly. Now, we don't even think about it. International orders are like regular orders with a few extra forms.

We successfully launched Voyager, the new high-end

## Hardcoding comes back to bite me

The biggest schedule slip this month was how poorly I estimated the software tasks related to Voyager. In terms of electronics, the Voyager differs from the hobbyist kit only in the HDMI capture device. The original TinyPilot kits ship with low-cost HDMI to USB dongles, which do pretty good video capture, but their main strength is that they only cost $7-10/each, which is what made TinyPilot so affordable.

The Voyager uses a more advanced HDMI capture device. It requires a slightly different configuration. I had tested it a few months ago, and I got the different capture device working without issue, so I figured I'd just update the TinyPilot installer to .

A few problems here. TinyPilot users perform version-to-version upgrades by running an updater script on their device. That updater script would have to preserve the configuration .

1. I updated the uStreamer role to look for 
1. I updated the TinyPilot installer to place a file in the TinyPilot user's home directory indicating whether this uses the USB dongle or the CSI capture.
1. I changed the update script to default to check if the device was previously configured for an HDMI to CSI chip or the user explicitly selected that install option. Otherwise, default to settings for the USB dongle.

## My first paid course

As of this writing, I've sold XX pre-orders, and I'm currently panicking that I made a huge mistake.

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Is It Keto](https://isitketo.org)

{{<revenue-graph project="isitketo">}}

| Metric                    | October 2020 | November 2020 | Change                                      |
| ------------------------- | ------------ | ------------- | ------------------------------------------- |
| Unique Visitors           | 50,195       | 43,911        | <font color="red">-6,284 (-13%)</font>      |
| Total Pageviews           | 117,428      | 102,143       | <font color="red">-15,285 (-13%)</font>     |
| Domain Rating (Ahrefs)    | 10.0         | 10.0          | 0                                           |
| AdSense Earnings          | $322.58      | $357.51       | <font color="green">+$34.93 (+11%)</font>   |
| Amazon Affiliate Earnings | $188.28      | $74.01        | <font color="red">-$114.27 (-61%)</font>    |
| **Total Earnings**        | **$510.86**  | **$431.52**   | **<font color="red">-$79.34 (-16%)</font>** |

### [Zestful](https://zestfuldata.com)

{{<revenue-graph project="zestful">}}

| Metric                   | October 2020 | November 2020 | Change                                           |
| ------------------------ | ------------ | ------------- | ------------------------------------------------ |
| Unique Visitors          | 436          | 484           | <font color="green">+48 (+11%)</font>            |
| Total Pageviews          | 1,149        | 1,393         | <font color="green">+244 (+21%)</font>           |
| RapidAPI Earnings        | $35.05       | $28.37        | <font color="red">-$6.68 (-19%)</font>           |
| Enterprise Plan Earnings | $0.00        | $872.63       | <font color="green">+$872.63 (+inf%)</font>      |
| **Total Earnings**       | **$35.05**   | **$901.00**   | **<font color="green">+$865.95 (+2471%)</font>** |

## Wrap up

### What got done?

* Launched pre-orders for my [Hacker News course](https://gum.co/htfphn/hacker)
* Two of my blog posts reached the frong page of Hacker News
  * [How I Hired a Freelance Editor for My Blog](https://news.ycombinator.com/item?id=25262272)
  * [Building a Homelab VM Server](https://news.ycombinator.com/item?id=25061823)

### Lessons learned

* New products need new processes
  * I underestimated how much additional time and stress Voyager would create.

### Goals for next month

* Release the first version of [TinyPilot Pro](https://tinypilotkvm.com/pro)
* Publish a follow-up blog post about code reviews