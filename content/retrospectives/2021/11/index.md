---
title: "TinyPilot: Month 16"
date: 2021-11-08T09:31:27-05:00
description: TODO - One-line summary
---

## Highlights

*

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Train local staff members to assist with customer support

* **Result**: Local staff members are answering ~50% of support emails
* **Grade**: A-

We now have a shared support queue using [HelpScout](https://www.helpscout.com/). There are still plenty of requests where nobody else has the context and technical background yet, but it's great to have help on about half the requests.

### Start development on a monthly service-based software complement to TinyPilot

* **Result**: Paused development after a tepid user reception
* **Grade**: C-

I [published a preview](https://tinypilotkvm.com/blog/tinypilot-cloud-waitlist) of a service called TinyPilot Cloud and offered signups for early access. There wasn't enough interest from users, so I've paused the project for now.

### Complete TinyPilot's website rebrand

* **Result**: We're very close, but it's not done yet.
* **Grade**: B-

The rebrand is taking longer than expected, but I expect to have it completed this month. I'm excited about the website's new look.

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | September 2021 | October 2021   | Change                                           |
| ------------------------ | -------------- | -------------- | ------------------------------------------------ |
| Unique Visitors          | 9,960          | 6,898          | <font color="red">-3,062 (-31%)</font>           |
| Total Pageviews          | 15,744         | 13,008         | <font color="red">-2,736 (-17%)</font>           |
| Sales Revenue            | $42,234.17     | $34,927.55     | <font color="red">-$7,306.62 (-17%)</font>       |
| Enterprise Subscriptions | $48.00         | $48.00         | 0                                                |
| Royalties                | $3,431.35      | $6,804.53      | <font color="green">+$3,373.18 (+98%)</font>     |
| Total Revenue            | $45,713.52     | $41,780.08     | <font color="red">-$3,933.44 (-9%)</font>        |
| **Profit**               | **$11,713.04** | **<font color="red">-$1,194.62</font>** | **<font color="red">-$12,907.66 (-110%)</font>** |

Sales in the EU are going strong, so royalties have doubled since last month. I finished the month in the negative because I'm adding about $5k/month in expenses on the website rebrand and redesign, but those are short-term costs that should wrap up by the end of the year.

## The TinyPilot Cloud flop

One of the most common requests I hear from users is that they want to access their TinyPilot devices over the Internet. There are a few [third-party solutions](https://tinypilotkvm.com/faq/cloud-access), but they're either slow or inconvenient to set up.

Naturally, this led to the idea for TinyPilot Cloud, a simple and performant way to enable cloud access to your TinyPilot device. It would be a big advantage for TinyPilot because no other KVM over IP device offers this natively. And it fits in with the TinyPilot brand of making everything dead simple while preserving performance and security.

With the open-source tools and cloud vendors available, TinyPilot Cloud seemed like it would take only a month of dev work to deploy a minimum viable product.I worked with other TinyPilot developers on a simple proof-of-concept implementation using [Wireguard](https://www.wireguard.com/) and [fly.io](https://fly.io). It was harder than I anticipated, but it worked better than any of the existing third-party cloud access solutions.

So far, so good! Now that we had a fully-working proof-of-concept, I wrote a requirements document and asked TinyPilot's most senior developer to turn it into a design document. That also turned out to be more difficult than either of us expected.

As part of the design work, he created screenshots to mock up the user flow. I saw those and thought, "Oh, I could make a good teaser blog post." And then I realized it would be a good way to measure interest, so I created a separate mailing list.

{{<img src="cloud-preview-post.png" alt="Screenshot of TinyPilot blog post about TinyPilot Cloud" maxWidth="600px" caption="A teaser [blog post](https://tinypilotkvm.com/blog/tinypilot-cloud-waitlist) I published about TinyPilot Cloud." hasBorder="true">}}

I sent out the [blog post](https://tinypilotkvm.com/blog/tinypilot-cloud-waitlist) to TinyPilot's 450 mailing list subscribers. 94 of them clicked the link, which is a strong conversion rate. But after two days, only two users had signed up for the TinyPilot Cloud waitlist.

{{<img src="cloud-waitlist.png" alt="Screenshot of EmailOctopus showing only two signups" maxWidth="700px" caption="Two days after the teaser blog post, only two users had signed up for early access to TinyPilot Cloud." hasBorder="true">}}

That was *way* less than I was hoping for. I was expecting maybe 50 signups, of which 25 could turn into actual customers, so we'd be starting out with ~$750/month. Development and operations would cost significantly more than that, but it would be a decent start. If, out of a biased sample of people who actively follow TinyPilot, only two were interested

I reached out to users on the signup list individually to ask. The bigger customers tend to want to own their own cloud access solution, like integrating TinyPilot into their VPN.

## Simplifying to just one product

The first TinyPilot product I offered was the TinyPilot Hobbyist Kit. Before I had any custom hardware or cases, I offered TinyPilot as just a convenient set of off-the-shelf hardware that allowed customers to build a TinyPilot the same way I built my first one.

{{<img src="hobbyist-parts.jpg" alt="Photo of parts in TinyPilot hobbyist kit" maxWidth="600px" caption="TinyPilot Hobbyist Kit, RIP">}}

As TinyPilot has evolved and I've added the high-end TinyPilot Voyager, I continued to offer the Hobbyist Kit as a way for price-conscious customers to use the product.

When I began working with a design firm on a rebrand for TinyPilot, they asked me who I want TinyPilot to appeal to. I said small-to-medium-sized businesses and tech-savvy consumers.

After that conversation, I began to wonder whether the Hobbyist Kit was hindering that goal. Seeing the TinyPilot Voyager next to a cheap DIY device might send the message that the Voyager is only a small step up from something you could build yourself.

{{<img src="old-product-page.png" alt="Screenshot of old TinyPilot product page, listing Voyager and Hobbyist kit side by side" maxWidth="800px" caption="Does the TinyPilot Voyager look cheap sitting alongside the Hobbyist Kit?" hasBorder="true">}}

There has also been a shortage of Raspberry Pi devices, and the wait time on new orders is six months or more. If it's possible that I'll run out of Raspberry Pis before the chip shortage eases up, it seemed foolish to waste them on my $190 product instead of my $350 product.

Halfway through the month, I retired the Hobbyist Kit from the website to focus on the Voyager:

{{<img src="no-hobbyist-kit.png" alt="Screenshot of website without Hobbyist kit" maxWidth="300px" caption="Removing the TinyPilot Hobbyist kit from the products page" hasBorder="true">}}

That felt nicer. If a customer wanted a KVM over IP device, the choice was unambigous. They didn't have to research the Hobbyist kit and Voyager and evaluate whether they were willing to pay more for a plug 'n play device.

Then, I thought, "Why stop there?" Did all the other products need to be there? When customers upgrade to TinyPilot Pro, they typically purchase directly from their TinyPilot web dashboard rather than navigating the website. And I still wanted to offer the power connectors for the DIY crowd, but I could still do that without listing it on my main product page. At that point, I realized I didn't even need a product index page.

Trimming out the accessory products allowed me to focus the TinyPilot website around my flagship product: the TinyPilot Voyager.

{{<img src="one-product.png" alt="Screenshot of TinyPilot website, offering only one product" maxWidth="600px" caption="The TinyPilot website now offers a single product: the Voyager" hasBorder="true">}}

Reducing to a single product offers a lot of benefits. There's less complexity for customer support, it gives us more room to store inventory, and it simplifies our order fulfillment process.

The Voyager 2 is on track to ship in a month or two. My original plan was to sell both models side-by-side and experiment with price to cater to more customers, but seeing how much easier it is to sell a single product, I'm probably going to phase out Voyager 1 soon after I start shipping its successor.

## Taking a test vacation

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Is It Keto](https://isitketo.org)

{{<revenue-graph project="isitketo">}}

| Metric                   | September 2021 | October 2021 | Change                                      |
| ------------------------ | -------------- | ------------ | ------------------------------------------- |
| Unique Visitors          | 23,618         | 20,321       | <font color="red">-3,297 (-14%)</font>      |
| Total Pageviews          | 56,246         | 47,487       | <font color="red">-8,759 (-16%)</font>      |
| Domain Rating (Ahrefs)   | 11.0           | 11.0         | 0                                           |
| AdSense Revenue          | $264.63        | $230.64      | <font color="red">-$33.99 (-13%)</font>     |
| Amazon Affiliate Revenue | $77.42         | $27.76       | <font color="red">-$49.66 (-64%)</font>     |
| **Total Revenue**        | **$342.05**    | **$258.40**  | **<font color="red">-$83.65 (-24%)</font>** |

### [Hit the Front Page of Hacker News](https://hitthefrontpage.com/)

{{<revenue-graph project="htfp">}}

| Metric                    | September 2021 | October 2021 | Change                                       |
| ------------------------- | -------------- | ------------ | -------------------------------------------- |
| Unique Visitors           | 128            | 100          | <font color="red">-28 (-22%)</font>          |
| Gumroad Revenue           | $189.14        | $75.27       | <font color="red">-$113.87 (-60%)</font>     |
| Blogging for Devs Revenue | $27.30         | $0.00        | <font color="red">-$27.30 (-100%)</font>     |
| **Total Revenue**         | **$216.44**    | **$75.27**   | **<font color="red">-$141.17 (-65%)</font>** |

### [Zestful](https://zestfuldata.com)

{{<revenue-graph project="zestful">}}

| Metric            | September 2021 | October 2021 | Change                                      |
| ----------------- | -------------- | ------------ | ------------------------------------------- |
| Unique Visitors   | 596            | 613          | <font color="green">+17 (+3%)</font>        |
| Total Pageviews   | 1,512          | 1,426        | <font color="red">-86 (-6%)</font>          |
| RapidAPI Revenue  | $185.12        | $99.74       | <font color="red">-$85.38 (-46%)</font>     |
| **Total Revenue** | **$185.12**    | **$99.74**   | **<font color="red">-$85.38 (-46%)</font>** |

The person who [expressed interest in acquiring Zestful](/retrospectives/2021/09/#zestfulhttpszestfuldatacom) stopped following up and hasn't replied to my emails, so that's no longer in play.

## Wrap up

### What got done?

*

### Lessons learned

*

### Goals for next month

*
