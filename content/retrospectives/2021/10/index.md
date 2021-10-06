---
title: "10"
date: 2021-10-05T11:58:24-04:00
description: TODO - One-line summary
---

## Highlights

*

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Publish a sample chapter of [*Refactoring English*](https://refactoringenglish.com)

* **Result**: Made progress but didn't publish a chapter
* **Grade**: D

TinyPilot got busy enough again that I didn't have much time to write this month, so I'm not sure when I'll be able to pick up the book again.

### Start development on a monthly service-based software complement to TinyPilot

* **Result**: XX
* **Grade**: B-

TODO

### Finalize the design of the Voyager 2

* **Result**: XX
* **Grade**: A

TODO

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | August 2021     | September 2021 | Change                                              |
| ------------------------ | --------------- | -------------- | --------------------------------------------------- |
| Unique Visitors          | 4,194           | 9,960          | <font color="green">+5,766 (+137%)</font>           |
| Total Pageviews          | 8,864           | 15,744         | <font color="green">+6,880 (+78%)</font>            |
| Sales Revenue            | $30,191.04      | $42,234.17     | <font color="green">+$12,043.13 (+40%)</font>       |
| Enterprise Subscriptions | $48.00          | $48.00         | 0                                                   |
| Royalties                | N/A             | $3,000.00\*      | N/A                                                 |
| Total Revenue            | $30,239.04      | $45,282.17     | <font color="green">+$15,043.13 (+50%)</font>       |
| **Profit**               | <font color="red">**$-10,140.95**</font> | **$7,168.50**\**  | **<font color="green">+$17,309.45 (+inf%)</font>** |

\* Royalties are an estimate until my distributor and I calculate the totals.<br>
\*\* Profit is provisional until I complete my monthly bookkeeping. Currently, it's just the delta in my cash for the month minus my credit card balance.

After an unremarkable first half of the month, I got a surprise [review from Jeff Geerling](https://www.youtube.com/watch?v=TIrkEr2AeDY), a beloved blogger and YouTube creator in the Raspberry Pi world. Jeff's video compared TinyPilot to PiKVM, and I feel like both products came across well. The video already has over 250k views, so it led tons of new customers to TinyPilot.

## PiKVM's scary fundraising

Speaking of PiKVM, they just raised an enormous amount of money on Kickstarter.

PiKVM is a similar KVM over IP product. While I was launching TinyPilot, Maxim, PiKVM's founder and sole developer reached out to me and helped me get TinyPilot off the ground.

PiKVM started in XX, predating TinyPilot by five years. Until recently PiKVM relied purely on donations, with about $800 in monthly contributions from their Patreon. In September, they launched a Kickstarter to sell their first paid product, a hardware accessory for the Raspberry Pi that complements PiKVM's software.

When I heard about the Kickstarter, I thought it would perhaps earn $15-20k, enough to manufacture a few hundred units. It ended up far exceeding my expectations, closing with a total of $789k from 3,572 backers.

I'm happy for Maxim, and he certainly deserves it for all the work he's put into PiKVM, but I'd be lying if I said it didn't make me nervous.

Granted, I think PiKVM and TinyPilot serve different niches. TinyPilot is plug 'n play


My advantages are still:

**TinyPilot has a dev team**. Even with unlimited money, it's still difficult to find and hire talented developers. Google, Apple, and friends have almost infinite money, and they struggle to hire developers. I've assembled a strong, cohesive dev team, but it took months and leveraged what I see as my unique strengths

**TinyPilot has a learnable codebase**. TinyPilot has extensive unit tests, continuous integration, and [documentation](https://github.com/tiny-pilot/tinypilot/blob/4476e3b40af6879191a8d682bef54005e74aca48/CONTRIBUTING.md) that make it easy for new developers to work on the code. Only one person is comfortable with the PiKVM codebase, and that's the founder. There's a 500-fold difference between PiKVM's founder and the next most prolific contributor. For TinyPilot, I only have 2x as much code as the next most active contributor and only 10x more than the one after that.

**TinyPilot has an asssembly pipeline**. PiKVM is currently a simpler product to sell because it can go directly from a circuit board factory to a customer or a distributor. If they move into pre-assembled devices, they need to hire staff to assemble products and manage inventory. It took me a year to set that up and smooth out  For anyone to compete with TinyPilot by building a pre-assembled device, they'd need to hire and train staff to do this. This isn't trivial, and it took me several months to fully delegate. PiKVM is cutting out some complexity by delegating order fulfillment to another company, but that only works for products that don't require any assembly or functional testing.

## Investing more into marketing

I didn't have development bandwidth. I didn't want to

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Is It Keto](https://isitketo.org)

{{<revenue-graph project="isitketo">}}

| Metric                   | August 2021 | September 2021 | Change                                      |
| ------------------------ | ----------- | -------------- | ------------------------------------------- |
| Unique Visitors          | 30,439      | 23,618         | <font color="red">-6,821 (-22%)</font>      |
| Total Pageviews          | 72,340      | 56,246         | <font color="red">-16,094 (-22%)</font>     |
| Domain Rating (Ahrefs)   | 12.0        | 11.0           | <font color="red">-1.0 (-8%)</font>         |
| AdSense Revenue          | $358.43     | $264.63        | <font color="red">-$93.80 (-26%)</font>     |
| Amazon Affiliate Revenue | $43.73      | $77.42         | <font color="green">+$33.69 (+77%)</font>   |
| **Total Revenue**        | **$402.16** | **$342.05**    | **<font color="red">-$60.11 (-15%)</font>** |

Is It Keto seems to be slowly dying. Another website popped up that does the same thing as Is It Keto, but they're actively building it, so they're outcompeting me in search engine rankings. I was hoping to quietly collect passive income on it indefinitely, but it's been deflating fast each month.

### [Hit the Front Page of Hacker News](https://hitthefrontpage.com/)

{{<revenue-graph project="htfp">}}

| Metric                    | August 2021 | September 2021 | Change                                       |
| ------------------------- | ----------- | -------------- | -------------------------------------------- |
| Unique Visitors           | 393         | 128            | <font color="red">-265 (-67%)</font>         |
| Gumroad Revenue           | $728.90     | $189.14        | <font color="red">-$539.76 (-74%)</font>     |
| Blogging for Devs Revenue | $0.00       | $27.30         | <font color="green">+$27.30 (+inf%)</font>   |
| **Total Revenue**         | **$728.90** | **$216.44**    | **<font color="red">-$512.46 (-70%)</font>** |

In August, I ran a pay-what-you-want promotion for the course, and that led to a jump in sales. I worried that anyone who would ever consider the course had already purchased it during that promotion, but September showed that a handful of people are still buying.

### [Zestful](https://zestfuldata.com)

{{<revenue-graph project="zestful">}}

| Metric            | August 2021 | September 2021 | Change                                       |
| ----------------- | ----------- | -------------- | -------------------------------------------- |
| Unique Visitors   | 585         | 596            | <font color="green">+11 (+2%)</font>         |
| Total Pageviews   | 1,467       | 1,512          | <font color="green">+45 (+3%)</font>         |
| RapidAPI Revenue  | $390.80     | $185.12        | <font color="red">-$205.68 (-53%)</font>     |
| **Total Revenue** | **$390.80** | **$185.12**    | **<font color="red">-$205.68 (-53%)</font>** |

Zestful is popping up from nowhere as a recurring revenue source. Historically, the service only made money from companies that wanted the Enterprise version for a month or two to bulk process millions of records. The pay-as-you-go service never earned much money. In the last three months, multiple customers are increasing their usage of Zestful to the point that it's generating a few hundred dollars per month in usage fees.

## Wrap up

### What got done?

* Hired a design firm to redesign the TinyPilot website.
* Published the TinyPilot [September update](https://tinypilotkvm.com/blog/whats-new-in-2021-09).
* Moved TinyPilot's image build process to the cloud.

### Lessons learned

*

### Goals for next month

* Train local staff members to assist with customer support
* Start development on a monthly service-based software complement to TinyPilot
* Complete TinyPilot's website rebrand
