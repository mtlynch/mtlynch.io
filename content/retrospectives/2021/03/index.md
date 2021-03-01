---
title: "TinyPilot: Month 8"
date: 2021-03-01T08:00:07-05:00
description: TODO - One-line summary
---

## Highlights

*

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Attract five bloggers or YouTubers to a TinyPilot affiliate program

* **Result**: Failed to even launch an affiliate program
* **Grade**: D

I thought this would be easy. I use Shopify as my payments backend, and there are tons of Shopify apps that let you create affiliate programs. I only realized after trying to up an affiliate program that every option requires you to hand over all of your customers' personal information.

Instead, I'm rolling my own, which I'm hoping is [as simple as it seems](https://www.joelonsoftware.com/2002/03/04/nothing-is-as-simple-as-it-seems/). I think all I need to do is tell affiliates to use a link like `tinpilotkvm.com/?ref=some-affiliate` and record the affiliate ID with the transaction. At the end of the month, I pay everyone manually. It doesn't scale, but it should be fine for five affiliates.

### Add two features to TinyPilot that reduce support or manufacturing costs

* **Result**: I added three features to the app and two features to the website that reduce support costs
* **Grade**: B

I added three new convenience features to TinyPilot, but I haven't yet cut an official release with those features:

* Update TinyPilot through the web UI
* Change hostname through the web UI
* View debug logs from the web UI

I also added a [support forum](https://forum.tinypilotkvm.com) and [frequently asked questions pages](https://tinypilotkvm.com/faq), both of which I should have added a long time ago, but they're both helping to let users answer their own support questions instead of relying on me for private email support.

### Collect feedback from 10 customers about a potential rack-mounted version of TinyPilot

* **Result**: XX
* **Grade**: D

TODO

## [TinyPilot](https://tinypilotkvm.com) stats

| Metric             | January 2021   | February 2021  | Change                                         |
| ------------------ | -------------- | -------------- | ---------------------------------------------- |
| Unique Visitors    | 11,249         | 7,824          | <font color="red">-3,425 (-30%)</font>         |
| Total Pageviews    | 17,737         | 12,909         | <font color="red">-4,828 (-27%)</font>         |
| Sales Revenue      | $41,992.92     | $33,061.41     | <font color="red">-$8,931.51 (-21%)</font>     |
| Donations          | $0.00          | $50.00         | <font color="green">+$50.00 (+inf%)</font>     |
| **Total Earnings** | **$41,992.92** | **$33,109.96** | **<font color="red">-$8,882.96 (-21%)</font>** |

{{<revenue-graph project="tinypilot">}}

## Dealing with materials shortage

Throughout January, I kept hearing from vendors talk about how things would slow down in February due to Chinese New Year. I heeded the warnings and purchased enough of the parts I get from China to last me through mid-March. Even so, I thought everyone was exaggerating. I thought there would maybe be a week where things stop

I placed an order on February 4th with my usual supplier for the high-quality HDMI capture chip I use in Voyager, my premium TinyPilot. Nothing happeend, so I figured I just was too late and I'd get it when things started up again at the end of the month.

Then I got this message:

At first, it didn't seem like a big deal. I'd just order from another vendor. But my backup vendor was out of stock as well. I found several other vendors, but I was nervous about placing huge orders with a vendor I've never worked with before. Some vendors can take months to ship, and I don't want $5k tied up in a vendor taking their time.

The curveball was that the supplier who makes the high-quality HDMI capture chips I use in the Voyager told me after r

## YouTube success might not replicate

## Topic 3

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Is It Keto](https://isitketo.org)

| Metric                    | January 2021 | February 2021 | Change                                       |
| ------------------------- | ------------ | ------------- | -------------------------------------------- |
| Unique Visitors           | 80,177       | 60,437        | <font color="red">-19,740 (-25%)</font>      |
| Total Pageviews           | 182,367      | 135,865       | <font color="red">-46,502 (-25%)</font>      |
| Domain Rating (Ahrefs)    | 11.0         | 11.0          | 0                                            |
| AdSense Earnings          | $677.36      | $584.18       | <font color="red">-$93.18 (-14%)</font>      |
| Amazon Affiliate Earnings | $238.02      | $202.78       | <font color="red">-$35.24 (-15%)</font>      |
| **Total Earnings**        | **$915.38**  | **$786.96**   | **<font color="red">-$128.42 (-14%)</font>** |

{{<revenue-graph project="isitketo">}}

### [Hit the Front Page of Hacker News](https://hitthefrontpage.com/)

{{<revenue-graph project="htfp">}}

| Metric             | January 2021  | February 2021 | Change                                         |
| ------------------ | ------------- | ------------- | ---------------------------------------------- |
| Unique Visitors    | 1,042         | 483           | <font color="red">-559 (-54%)</font>           |
| **Total Earnings** | **$2,565.22** | **$359.95**   | **<font color="red">-$2,205.27 (-86%)</font>** |

### [Zestful](https://zestfuldata.com)

{{<revenue-graph project="zestful">}}

| Metric             | January 2021 | February 2021 | Change                                       |
| ------------------ | ------------ | ------------- | -------------------------------------------- |
| Unique Visitors    | 419          | 434           | <font color="green">+15 (+4%)</font>         |
| Total Pageviews    | 1,194        | 1,236         | <font color="green">+42 (+4%)</font>         |
| RapidAPI Earnings  | $155.50      | $32.52        | <font color="red">-$122.98 (-79%)</font>     |
| **Total Earnings** | **$155.50**  | **$32.52**    | **<font color="red">-$122.98 (-79%)</font>** |

## Wrap up

### What got done?

* Hired three developers

### Lessons learned

* Prepare more for Chinese New Year

### Goals for next month

* Hire a part-time employees to begin taking over fulfillment.
  * My current fulfillment manager goes back to grad eschool in June.
* Attract five bloggers or YouTubers to a TinyPilot affiliate program.
* Collect feedback from 10 customers about a potential rack-mounted version of TinyPilot.
