---
title: "TinyPilot: Month 5"
date: 2020-12-01T10:57:20-05:00
description: TODO - One-line summary
hide_affiliate_warning: true # No affiliate links in this article
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

## Adding Voyager and the mysterious sales gap

The biggest TinyPilot news in November was [the release of TinyPilot Voyager](https://tinypilotkvm.com/blog/introducing-voyager). It uses a higher-quality video capture device, and I worked with a 3D printing lab to create a nice case for it that packages together all the parts nicely.

{{<img src="voyager-angled.jpg" maxWidth="600px" caption="[Voyager](https://tinypilotkvm.com/product/tinypilot-voyager) is the new model of TinyPilot, aimed at business customers.">}}

 Unlike my previous products, which ship as kits the end-user has to assemble, Voyager comes pre-assembled, so it's plug 'n play.

I expected a big response from Voyager because in the weeks leading up to its launch, whenever I had conversations with business customers interested in purchasing TinyPilot kits, I showed them previews of Voyager, and they said they'd pay much more for it. On launch day, 100% of those customers put their money where their mouths were and purchased Voyager on release day.

Then, for five days, nobody bought any Voyagers. In fact, nobody bought TinyPilot kits of any kind. The rest of the month, I was selling two or three TinyPilots per day. What was going on?

I began worrying. There's a bit of a mysterious art to pricing. I was offering Voyager for $249, and the low-end kit for $169. Was there some pricing psychology to why customers were buying before, and I had broken it by changing pricing?

Then again, it was only five days. Five days is too small a sample to draw any meaningful conclusions when my sales volume ranges from zero to five sales per day. And this sales gap occurred in the five days leading up to Black Friday, so I figured maybe customers were just waiting for me to offer discounts on Black Friday.

Fortunately, Black Friday seemed to break the spell. Over Black Friday weekend, I offered a 20% discount on all TinyPilot products, and I sold 12 Voyagers and one low-end kit. Sales seem to be continuing past Black Friday, as I've sold five Voyagers and two kits in the two days since the sale ended.

## Voyager pricing

Voyager is exciting because it's a product that only I offer, so I can charge a premium for it. My costs for each Voyager are ~$106/unit, so I make a profit of $144 on each unit (58% margins). I have similar margins on the kits, but my profits are lower in absolute terms (~$85/unit) because of the lower price point.

| Product      | Cost    | Retail Price | Profit |
|--------------|---------|--------------|--------|
| Hobbyist kit | $84.22  | $169.99      | $85.77 (50.5%)  |
| Voyager      | $106.22 | $249.99      | $143.77 (57.5%) |

I plan to experiment more with Voyager's pricing, as I suspect there's room to grow upward.

Before I released TinyPilot, one of my business clients said to me, "You should make a custom enclosure for these, because business clients like me would pay $400 for them." TinyPilot replaces enterprise KVMs, where [costs are $600-1,000 per device](https://mtlynch.io/tinypilot/#commercial-solutions). Many of those solutions require clients to run old versions of Java just to access the interface, so it's possible I don't even have to compete with them on price.

## New products require new habits

I'm finding that one of the biggest sources of stress with running TinyPilot as a business is just new things. When I'm in steady state, it's easy to run TinyPilot. It's a simple system: orders come in, my assistant packs them and mails them out. There are a few special cases here and there, but for the most part, once a routine forms, it's low-stress.

When we do something new, everything goes haywire and feels stressful. It happened when I started selling TinyPilot internationally. Now that I know the process, it's easy, but figuring out the process and setting everything up for the first time was stressful.

One of the things I wish I had budgeted for with Voyager was padding time estimates to account for learning new habits.
We successfully launched Voyager, the new high-end

## Eliminating sales questions with a product add-on

One of the most common questions customers ask about TinyPilot was, "Does it work with servers that have VGA output instead of HDMI?" For the first month, my answer was that a VGA to HDMI adapter would probably work, but I'd never tested it.

After the third inquiry about VGA support, I purchased a VGA to HDMI adapter from Amazon, verified that it worked with TinyPilot, and just began recommending that product to any customers who asked.

As I continued receiving questions about VGA, I started thinking about ways to answer the question before they have to email me. So I did this:

{{<img src="vga-add-on.png" hasBorder="true" caption="Adding a VGA add-on option eliminated my customers' most common pre-sales question.">}}

About one-third of my customers now choose the VGA add-on, so the experiment was a success. I sell the adapter at cost, but it creates convenience for my customers who don't have to go elsewhere to purchase it separately.


## My first paid course

The idea of making a paid course or book has been in the back of my mind for the past couple of years. Two things happened recently that made me think much more seriously about it.

The first was TinyPilot. In the back of my mind, I felt embarrassed to try to sell a course teaching anything when none of my businesses were profitable. I thought back to this joke ad that ran in the 90s where a slick guru tells you to pay $50 for his guide to fast wealth, and the book is titled, *How to Convince People to Send You $50 for a Book*. But with TinyPilot succeeding, I felt like the things I know are demonstrably valuable.

The other factor was [Daniel Vasallo's interview on the Indie Hackers podcast](https://www.indiehackers.com/podcast/177-daniel-vassallo). I've been following Daniel's progress because he [left Amazon](https://danielvassallo.com/only-intrinsic-motivation-lasts/) for reasons similar to [why I left Google](https://mtlynch.io/why-i-quit-google/). In the year after he started working for himself, he released an [ebook about AWS](https://gumroad.com/l/aws-good-parts/dv), which earned $100k, and [a video course about Twitter](https://gumroad.com/l/twitter-audience/dv) that earned $150k. He recorded and published the Twitter course in just 16 hours to test his theory that people care more about information quality than production value.

{{<img src="177-daniel-vassallo.png" maxWidth="650px" caption="[Daniel Vasallo's interview on the Indie Hackers podcast](https://www.indiehackers.com/podcast/177-daniel-vassallo) made me realize how accessible and profitable it is to make a paid video course.">}}

$150k for 16 hours of work? That sounded like a great deal to me!

Okay, I didn't really expect to make $150k, but I thought $20k was achievable. And I fuss too much over editing to do it in 16 hours, but I could probably put together a course in 40 hours.

In the last year, I've realized that one of my unique skills is writing articles that reach the front page of [Hacker News](https://news.ycombinator.com/), so I decided to make a course that teaches everything I've learned about doing that.

{{<img src="htfp-cover.jpg" maxWidth="750px" caption="[*Hit the Front Page of Hacker News*](https://gum.co/htfphn/hacker) is my new video course about writing articles that succeed on [Hacker News](https://news.ycombinator.com/).">}}

I announced the course on Tuesday, and sales have been... slow.

{{<img src="htfp-sales.png" maxWidth="740px" hasBorder="true" alt="Screenshot from Gumroad showing 478 visits to my sales page and 5 sales for $300 total.">}}

As of this writing, I've sold five pre-orders for $300 total. I'm happy to have sales, but I'm a bit worried that I overestimated the market for this book. One possibility is that people are much less interested in pre-paying for a course that's not yet available. I might create a landing page instead that just collects emails to announce the release date and direct people there instead.

I've spent about 30 hours already putting together slides, working on the cover image, and presenting to test audiences, and I haven't even started recording the real course yet. I'd estimate that there's 30-50 hours of work to go, so I'm worried about splitting my focus too much between TinyPilot and this course.

But it's **fine**. I think whatever happens, it'll be an interesting learning experience and will inform whether I do more of this type of work.

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

Is It Keto is still chugging along in the background. Amazon Affiliate revenue is dwindling, likely because I haven't updated them in a few months, so many of them are pointing to products that no longer exist. But the process of updating them is 90-180 minutes of tedious work, so I'd rather spend the time on TinyPilot.

### [Zestful](https://zestfuldata.com)

{{<revenue-graph project="zestful">}}

| Metric                   | October 2020 | November 2020 | Change                                           |
| ------------------------ | ------------ | ------------- | ------------------------------------------------ |
| Unique Visitors          | 436          | 484           | <font color="green">+48 (+11%)</font>            |
| Total Pageviews          | 1,149        | 1,393         | <font color="green">+244 (+21%)</font>           |
| RapidAPI Earnings        | $35.05       | $28.37        | <font color="red">-$6.68 (-19%)</font>           |
| Enterprise Plan Earnings | $0.00        | $872.63       | <font color="green">+$872.63 (+inf%)</font>      |
| **Total Earnings**       | **$35.05**   | **$901.00**   | **<font color="green">+$865.95 (+2471%)</font>** |

Zestful had a nice jump this month. One of my longtime pay-as-you go customers upgraded to a short-term unlimited plan because he had a big batch of ingredients he needed to parse in a big batch. So that was a nice sale, but it's definitely a one-off.

## Wrap up

### What got done?

* Launched pre-orders for my [Hacker News course](https://gum.co/htfphn/hacker)
* Two of my blog posts reached the front page of Hacker News
  * [How I Hired a Freelance Editor for My Blog](https://news.ycombinator.com/item?id=25262272)
  * [Building a Homelab VM Server](https://news.ycombinator.com/item?id=25061823)

### Lessons learned

* New products need new processes.
  * Adapting to new processes creates stress.
  * I underestiated
* Plan to pay back technical debt
  * It took two weeks longer than I expected to release Voyager because I forgot about shortcuts I took earlier in TinyPilot's software.
  * For simplicity, I baked assumptions into the code about which video capture device it would use, and untangling those assumptions was messy.

### Goals for next month

* Release the first version of [TinyPilot Pro](https://tinypilotkvm.com/pro).
* Receive TinyPilot reviews from two bloggers or YouTubers with a relevant audience.
* Record five out of seven parts of my [Hacker News course](https://gum.co/htfphn/hacker).