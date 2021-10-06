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

TinyPilot got busy enough again that I didn't have much time to write this month. Sadly, I'm going to put the book on hold indefinitely, since TinyPilot still needs my full attention.

### Start development on a monthly service-based software complement to TinyPilot

* **Result**: We're still at the design stage, but for good reasons
* **Grade**: B-

I was hoping to start development by the end of the month, but there are more design questions than I anticipated. Still, I don't feel too bad about the delay because investing more in up-front design will save us time on the initial implementation overall and prevent us from locking ourselves into bad decisions.

### Finalize the design of the Voyager 2

* **Result**: We finished all testing on the first Voyager 2
* **Grade**: A

We're running a little late on this, but we're still on track to ship the first Voyager 2 by the end of November. The electrical engineers have built several prototypes, and they've passed all testing, so we're now in the process of ordering the first production batch from a PCB manufacturer.

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

After an unremarkable first half of the month, I got a surprise [review from Jeff Geerling](https://www.youtube.com/watch?v=TIrkEr2AeDY), a beloved blogger and YouTube creator in the Raspberry Pi world.

{{<youtube TIrkEr2AeDY>}}

Jeff's video compared TinyPilot to PiKVM, and I feel like both products came across well. The video already has over 250k views, so it led tons of new customers to TinyPilot.

TinyPilot had $42k in sales from our own website, but it was also a . It was the first full month that [TinyPilot's European distributor](https://www.kvm-ip.de/) was running, and they had a great sales month as well.

## PiKVM's scary fundraising

Speaking of PiKVM, they just raised an enormous amount of money on Kickstarter.

PiKVM is similar to TinyPilot in that they're both KVM over IP products built on the Raspberry Pi. PiKVM's founder Maxim actually reached out to me when I was developing TinyPilot and [helped me get my project off the ground](/tinypilot/#borrowing-from-a-similar-project).

TinyPilot and PiKVM have co-existed and served somewhat different markets. My goal with TinyPilot has always been to make it easy to use, whereas PiKVM has catered more to the DIY crowd who don't mind having to tinker a bit to get things working the way they want.

PiKVM started in 2016. Until recently, PiKVM relied purely on donations, with about $800 in monthly contributions from their Patreon supporters and one-off donations from other sources. In September, they began selling their first-ever paid product through Kickstarter. It's a hardware accessory for the Raspberry Pi that complements PiKVM's software.

When I heard about the Kickstarter, I thought it would perhaps earn $15-20k, enough to manufacture a few hundred units. It ended up far exceeding my expectations, closing with a total of $789k from 3,572 backers.

{{<img src="pikvm-kickstarter.png" alt="Screenshot of PiKVM Kickstarter, showing $789,191 in funds raised" maxWidth="800px" hasBorder="true" caption="PiKVM's Kickstarter raised $789,191.">}}

I'm happy for Maxim, and he certainly deserves it for all the work he's put into PiKVM. That said, it's a bit scary to see a competitor suddenly raise almost a million dollars. Scarier still is that he's commented that he's interested in making a plug 'n play version to compete with TinyPilot.

Still, I think the Kickstarter shows how enormous the market is for products like TinyPilot. PiKVM and TinyPilot still probably capture less than 1% of the total market of people who need a KVM over IP device. And even though PiKVM has a five-year lead on me in developing his product, TinyPilot still has a significant lead in several domains:

**TinyPilot has a dev team**. Even with unlimited money, it's still difficult to find and hire talented developers. Google, Apple, and friends have almost infinite money, and they struggle to hire developers. I have three solid developers that are ramped up on TinyPilot and all the development processes around it, so that's difficult for a competitor to replicate.

**TinyPilot has a learnable codebase**. TinyPilot has extensive unit tests, [continuous integration](https://github.com/tiny-pilot/tinypilot/blob/4476e3b40af6879191a8d682bef54005e74aca48/.circleci/config.yml), and [documentation](https://github.com/tiny-pilot/tinypilot/blob/4476e3b40af6879191a8d682bef54005e74aca48/CONTRIBUTING.md) that make it easy for new developers to work on the code. In contrast, only one person is comfortable with the PiKVM codebase, and that's the founder. The project has significantly less documentation and automated tests than TinyPilot, so new developers will face a steep learning curve.

**TinyPilot has an asssembly pipeline**. PiKVM is currently a simpler product to sell because a generic circuit board manufacturer can produce their product. If they move into pre-assembled devices, they need to hire staff to assemble parts, manage inventory, and ship to distributors. It took me almost a year to get all these processes smoothed out, so it's not the kind of thing a competitor could flip on overnight.

## Investing more into design

Last month, I talked about how [improving TinyPilot's website design](/retrospectives/2021/09/#tinypilot-website-improvements) seems to have increased sales. I decided to continue work on the website by hiring a professional designer.

I interviewed six different designers and firms, and I ended up picking the most expensive one. I might be a rube, but they convinced me to expand the scope of the project significantly.

My plan was to just hand the . They argued that what I should actually do is this:

1. Re-do TinyPilot's branding (logo, fonts, color scheme)
1. Hire a marketing firm to talk about an ad strategy
1. Redesign the TinyPilot website based on the new brand and the ad strategy

I might be a rube who got hornswoggled into an expensive project, but I felt like they made a compelling case. The brand forms the foundation of everything else, so it makes sense to invest more in that now.

{{<img src="tinypilot-logo.jpg" alt="TinyPilot's logo, a chipmunk in an airplane" maxWidth="600px" hasBorder="true" caption="TinyPilot's chipmunk mascot may not be long for this world.">}}

As much as I love the TinyPilot chipmunk, I think the company has outgrown the mascot. The cartoonishness worked in the beginning when we were catering mainly to hobbyists, but now that more of our customers are businesses, I want a logo that's a bit more serious &mdash; not IBM-level serious, but maybe like a notch or two more playful than [Ubiquiti](https://ui.com) or [Proxmox](https://www.proxmox.com/en/).

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

Is It Keto seems to be slowly dying. Another website popped up that does the same thing, and they're outcompeting me in search engine rankings.

I was hoping the site would quietly generate passive income indefinitely, but it's been deflating fast each month.

### [Hit the Front Page of Hacker News](https://hitthefrontpage.com/)

{{<revenue-graph project="htfp">}}

| Metric                    | August 2021 | September 2021 | Change                                       |
| ------------------------- | ----------- | -------------- | -------------------------------------------- |
| Unique Visitors           | 393         | 128            | <font color="red">-265 (-67%)</font>         |
| Gumroad Revenue           | $728.90     | $189.14        | <font color="red">-$539.76 (-74%)</font>     |
| Blogging for Devs Revenue | $0.00       | $27.30         | <font color="green">+$27.30 (+inf%)</font>   |
| **Total Revenue**         | **$728.90** | **$216.44**    | **<font color="red">-$512.46 (-70%)</font>** |

In August, I ran a [pay-what-you-want promotion](/retrospectives/2021/09/#hit-the-front-page-of-hacker-newshttpshitthefrontpagecom) for the course, and that led to a jump in sales. I worried that anyone who would ever consider the course had already purchased it during that promotion, but September showed that a handful of people are still buying.

### [Zestful](https://zestfuldata.com)

{{<revenue-graph project="zestful">}}

| Metric            | August 2021 | September 2021 | Change                                       |
| ----------------- | ----------- | -------------- | -------------------------------------------- |
| Unique Visitors   | 585         | 596            | <font color="green">+11 (+2%)</font>         |
| Total Pageviews   | 1,467       | 1,512          | <font color="green">+45 (+3%)</font>         |
| **Total Revenue** | **$390.80** | **$185.12**    | **<font color="red">-$205.68 (-53%)</font>** |

Zestful is popping up from nowhere as a recurring revenue source. Historically, the service only made money from companies that wanted the Enterprise version for a month or two to bulk process millions of records. The pay-as-you-go service never earned much money. In the last three months, multiple customers are increasing their usage of Zestful to the point that it's generating a few hundred dollars per month in usage fees.

## Wrap up

### What got done?

* Hired a design firm to redesign the TinyPilot website.
* Released the TinyPilot [September update](https://tinypilotkvm.com/blog/whats-new-in-2021-09).
* Moved TinyPilot's image build process to the cloud.
* Moved TinyPilot's email support to [HelpScout](https://helpscout.com), a shared inbox service, which will help me scale customer support.

### Lessons learned

*

### Goals for next month

* Train local staff members to assist with customer support
* Start development on a monthly service-based software complement to TinyPilot
* Complete TinyPilot's website rebrand
