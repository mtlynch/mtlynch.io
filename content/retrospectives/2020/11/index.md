---
title: "TinyPilot: Month 4"
date: 2020-11-02T08:18:10-05:00
description: My first $10k month
---

## Highlights

* TinyPilot hit $10k in revenue, its highest grossing month and highest-revenue month for anything ever.

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Sell 60 TinyPilot kits and power connectors

* **Result**: Sold 47 kits and 35 connectors (82 total)
* **Grade**: A+

TODO

### Test three new marketing channels

* **Result**: XX
* **Grade**: B

I did test a lot of new channels, but I did a poor job of 

### Interview seven IT professionals about whether they'd use TinyPilot in their work

* **Result**: Had four phone/video calls and several more email exchanges
* **Grade**: B+

TODO

## Stats

### [TinyPilot](https://tinypilotkvm.com)

| Metric             | September 2020 | October 2020   | Change                                            |
| ------------------ | -------------- | -------------- | ------------------------------------------------- |
| Unique Visitors    | 1,741          | 2,604          | <font color="green">+863 (+50%)</font>            |
| Total Pageviews    | 7,057          | 8,780          | <font color="green">+1,723 (+24%)</font>          |
| Sales Revenue      | $3,636.03      | $10,176.23     | <font color="green">+$6,540.20 (+180%)</font>     |
| Donations          | $187.40        | $90.00         | <font color="red">-$97.40 (-52%)</font>           |
| **Total Earnings** | **$3,817.99**  | **$10,263.62** | **<font color="green">+$6,445.63 (+169%)</font>** |

## What a difference a well-stocked inventory makes

This is TinyPilot's best month ever. It even beat August, when TinyPilot hit #1 on Hacker News It's also, uncoincidentally, the only month where I didn't have to list items as backordered because I ran out of inventory.

This month, we were able to sell the entire month, and I think that's the biggest reason that sales were so high.

The two main changes were:

1. I delegated inventory management to my assistant and empowered her to purchase new supplies when we're running low.
1. We reorganized our inventory spreadsheet to give us better insight into our inventory.

When I first started, I made an ugly spreadsheet that looked like this:

{{<img src="inventory-old.png" alt="Screenshot of old, cluttered inventory spreadsheet" hasBorder="true">}}

The new spreadsheet looks like this:

{{<img src="inventory-overview.png" alt="New spreadsheet shows totals of what's in stock and when to reorder" hasBorder="true">}}

The key difference is that it gives a sensible overview in terms of what's most important for managing inventory. When we're due for a reorder, it automatically calculates the amount we should order in a highlighted column.

It's a function of:

1. How expensive is this part?
1. How long does it take for this part to arrive?
1. How many of our products use this part?
1. What discounts are available for bulk orders?

For example, the HDMI dongle is needed in both TinyPilot kits, takes several weeks to ship because it comes from China, but it's relatively cheap, so we aim to keep between 60-100 in stock. At the other end of the spectrum, at $55/unit, the 4 GB Raspberry Pi is the most expensive part, but it's available from several sellers with a turnaround of only a few days, so we don't need to keep many on hand.

When we place orders for new inventory or fulfill customer orders, we update these two child spreadsheets that automatically update the counts in the inventory overview sheet:

{{<gallery caption="Outgoing customer orders (left) and incoming inventory shipments (right) automatically update the counts in our inventory overview spreadsheet.">}}
  {{<img src="inventory-orders.png" alt="Google Sheet screenshot of order count by day." hasBorder="true">}}
  {{<img src="inventory-incoming.png" alt="Google Sheet screenshot of incoming inventory orders." hasBorder="true">}}
{{</gallery>}}

## Where should TinyPilot go?

Most of my time this month was setting up. I had a hard time doing this because:

1. I find it unpleasant to cold email strangers asking for a meeting
1. Prospecting customers distracts me immensely, because in the process of researching their company, I end up going down rabbit holes and forgetting what I'm doing

Basically the features I teased in [TinyPilot Pro](https://tinypilotkvm.com/pro) when I first started selling TinyPilot and wanted to give customers an idea of where it was headed.

### Remote access

The most common feature that came up in customer discussions was remote access. Right now, TinyPilot works on the local network and leaves it as an exercise to the user if they want to make it accessible from a remote connection. Customers frequently mentioned a desired scenario of shipping a TinyPilot to an end-user, the user connects the device to either their WiFi or Ethernet, and the device phones home to the operator to allow them to control it remotely via some sort of TinyPilot management web portal.

A TinyPilot management portal would be incredibly lucrative, as customers seemed to feel that $5/device/month would be a reasonable price for such a service. 

The problem with offering such a service is that it's operationally difficult to manage. If I'm selling customers a remote access portal, it would need to have uptime somewhere north of three nines (99.9% availability). That means that the service is down for no more than 8 hours per year. It also ups the ante for security, as a service that has physical-level access to thousands of production servers would be an attractive target for criminals.

That's not the type of business I'd like to run. I don't want to sleep with a pager next to me in case my server goes down at 3 AM, and I have to fix it.

Instead, I'm exploring partnerships with companies that would be interested in maintaining such a service. TinyPilot would apply its own branding so that customers see it as an integrated product, but the partner company would handle operations. It's also possible that I find an open source solution and show customers how to maintain their own management portals, but that's less likely.

### Power management

Another common feature, for both home and business users, is power management. In addition to typing and moving the mouse on a computer, customers want to physically power the device off and on.

Other DIY Pi projects achieve this by having the customer wire a relay directly to the pins on their motherboard. I've always found this too invasive for the level of customer I'm targeting, so I've punted on a solution here.

There are "smart" plugs that allow users to turn power on and off via WiFi, but almost all of the solutions I've seen are proprietary, so they don't have open interfaces that allow other devices on the network to interact with them easily.

I'm working with my electrical engineering partner on a way to 

I have a potential solution, at least for US outlets.

### Remotely mount drives

A user reached out who was interested in working on the feature, but that's something I planned to reserve for the Pro version. Instead, I purchased the copyright for the code from them and have it queued for integration in the pro codebase.

## Experimenting with paid reddit ads

I'd never tried reddit ads before, but I have to say that the experience was disappointing. I got decent clicks, but the platform itself is unintuitive and a pain to use. As far as I can tell, you can't edit an ad after you create it, even if it hasn't run. You can only duplicate it and then make changes to the copy. The copy of course becomes immutable the moment you hit save.

Ads can't run until they receive manual approval, which is fine and expected. But seemingly irrelevant changes to the ad would put it back into an unapproved state. Like I changed which subreddits I wanted the ad to display in, and that froze my ads until they could be re-approved.

### Micro-targeting /r/homelab

I started with ads that ran exclusively in the /r/homelab subreddit. Here were my top-performing ads:

| Ad Copy | Impressions | Clicks | CPC | CTR | Conversions |
|---------|-------------|--------|-----|-----|--------------|
| [Tired of swapping your monitor cables?](tired-of-swapping.png) | 2,929 | 67 | $1.53 | 2.287% | 0 |
| [Stop paying $600 for KVM over IP devices](hey-stop-paying.png) | 836 | 14 | $1.91 | 1.675% | 0 |
| [I got tired of bloat-laden enterprise KVMs](i-got-tired.png) | 2,498 | 41 | $1.69 | 1.641% | 0 |

The click-through-rate is pretty good, but nobody purchased anything through those ads. I even added an event for "Add item to cart" and zero users even did that after clicking a reddit ad.

### Hey - not just for horses

It seems like starting the copy with "Hey /r/homelab" made a difference, as I ran ads that were almost identical except without the salutation, and they got a fraction of the click-through rate.

{{<gallery caption="Two ads that I posted to reddit, identical except for the opening salutation. The version that begins with 'Hey /r/homelab' had a click-through-rate of 1.675% while the version without had a click-through rate of 0.479%.">}}
  {{<img src="hey-stop-paying.png" alt="Hey /r/homelab, stop paying $600+ for KVM over IP devices. TinyPilot is an open source KVM over IP starting at just $169.99." hasBorder="true">}}
  {{<img src="stop-paying.png" alt="Stop paying $600+ for KVM over IP devices. TinyPilot is an open source KVM over IP starting at just $169.99." hasBorder="true">}}
{{</gallery>}}

### Going broader

After testing the waters with /r/homelab, I tried a new campaign that showed the ad to more subreddits, but the results were much worse. My overall click-through-rate was 0.435% with a cost-per-click of $2.21. The /r/homelab and /r/homelabsales subreddits continued to perform far better than any others.

It's worth noting that I dropped the "Hey [subreddit]" on these ads, so maybe they would have performed better had I customized each ad on a per-subreddit basis.

### Are these numbers right?

As I look back on these numbers, I'm doubting their accuracy. My initial impression was that reddit users weren't interested in buying. I paid $360 for 208 clicks, and none of those visitors even clicked "Add to Cart."

Looking at Google Analytics, that seems questionable:

{{<img src="reddit-ga.png" hasBorder="true">}}

They perform worse on most metrics than my typical user, but not *that* much worse.

There were 4 orders in these three days, which means that overall my conversion rate is 1.429%. If I trust that these numbers are accurate, my conversion rate from reddit is 0% and from other sources, it's 1.786%. It's low sample sizes, so it's plausible, but I'm a bit skeptical that my metrics claim none of my reddit visitors ever added an item to their cart.

What I should have done (and what I'll do in the coming weeks) is verify for myself whether reddit's analytics properly track these events. I added them via Google Tag Manager, but I never tested them by clicking an ad myself to see if reddit's analytics reflected the event.

## Other marketing channels

### Organic search

Organic search is TinyPilot's largest source of customers. When I started the business, I was hoping to reach the front page of Google results for searches like "raspberry pi kvm over ip." In October, I realized TinyPilot is now on the front page for much broader terms like "kvm over ip."

{{<img src="tinypilot-google.png" maxWidth="300px" hasBorder="true">}}

### Writing more blog posts

This month, I published a new post about building my [homelab VM server](/building-a-vm-homelab/) and explained how TinyPilot made the process easier. My original article was #1 for a few popular Google queries, such as "homelab vm" and "vm server" so I expect that the update will help me keep my position there.

I submitted the new post to several subreddits, including one I wasn't aware of before, [/r/HomeServer](https://www.reddit.com/r/HomeServer/). When my VM server post [did well](https://www.reddit.com/r/HomeServer/comments/j7eiuo/my_home_vm_server_for_software_development/), I also submitted my original TinyPilot article, which [got a positive reception as well](https://www.reddit.com/r/HomeServer/comments/jeoc74/tinypilot_build_a_kvm_over_ip_for_under_100/).

{{<img src="homeserver.png" alt="96 upvotes for VM server post, 119 for TinyPilot post" hasBorder="true">}}

### The TinyPilot mailing list

TinyPilot has a mailing list, and when I paused sales in September to chase down the power issue, I invited customers to sign up for the mailing list to find out when sales would reopen. I expected a burst of sales when I announced the sales, and I wanted to reward customers for waiting, so I offered an exclusive 10% off coupon.

Only one customer purchased with the coupon, so I guess there wasn't really a backlog of users waiting to purchase. The coupon also sort of backfired, as another customer emailed asking if they could use the coupon on an order they placed the previous day, which I allowed since I didn't want to penalize them for buying early.

### Homelab blogs

[NetworkProfile](https://blog.networkprofile.org) is a cool blog I found through self-hosting and homelab posts on Reddit. I asked the author if he'd be interested in reviewing a TinyPilot device, and he liked the idea because he needed a new KVM over IP for his security camera server. He published a thorough review within days of receiving the device that covered both the good and the bad of TinyPilot:

{{<img src="networkprofile-review.png" alt="Screenshot of NetworkProfile review header" hasBorder="true" maxWidth="600px" linkUrl="https://blog.networkprofile.org/tinypilot-open-sourve-ipkvm/" caption="TinyPilot received its first public review [in the NetworkProfile blog](https://blog.networkprofile.org/tinypilot-open-sourve-ipkvm/).">}}

I also reached out to a large hardware blog that's interested in featuring TinyPilot in November, so I hope to have a positive update about that next month.

### Blind bargains podcast

This one just happened with me initiating it. I saw I had some referrals from a site called Blind Bargains, a podcast for people who are blind or have low vision. [Alex Hall](https://twitter.com/mehgcap) joined as a guest to talk about his experience as a blind PC builder.

BIOS interfaces typically have poor accessibility support, so there's no way for blind users to discover what appears on the screen. Alex configured his TinyPilot so that his friend could access it over the Internet and describe to him what appeared on the screen during BIOS.

If you're interested in [checking out the episode](https://www.blindbargains.com/bargains.php?m=22022), the TinyPilot discussion begins at 1:03:57.

### Self-hosting newsletter

Lastly, I submitted TinyPilot to a self-hosting newsletter. They listed it on their weekly roundup but didn't include it in their newsletter. I can pay $500 to be featured for sure, but I suspect that the audience is too small to get a positive return on investment there.

## Tracking acquisition

The takeaway I'm realizing now as I look back on my marketing experiments is that I need to improve my conversion tracking.

The challenge is that I have sort of an unusual payment flow:

1. User lands on TinyPilot website from Google search, paid ad, or link from external site.
1. User adds an item to their cart and clicks "Check out."
1. TinyPilot sends the user to Shopify to complete their checkout.
1. Shopify sends the user to an "Order complete" page when they complete their checkout.

So, Shopify can't track identify where purchases came from because they see 100% of customers arrive from the TinyPilot website. I run Google Analytics on the TinyPilot website, but it fails to track conversions because when the user clicks "Check out" and then returns to TinyPilot after their purchase is complete, Google Analytics sees those as two separate sessions and doesn't link them.

I'm sure this is solvable, as my flow isn't *that* crazy. I just need to spend some time figuring out how to keep track of where customers originate from as they complete the payment flow.

{{<notice type="info">}}
The problem of tracking sessions across Shopify checkouts feels like one of those problems that's easy to solve once you've done it, so if I have any readers who know the solution, [get in touch](/about/).
{{</notice>}}

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Is It Keto](https://isitketo.org)

| Metric                    | September 2020 | October 2020 | Change                                         |
| ------------------------- | -------------- | ------------ | ---------------------------------------------- |
| Unique Visitors           | 44,751         | 50,195       | <font color="green">+5,444 (+12%)</font>       |
| Total Pageviews           | 110,922        | 117,428      | <font color="green">+6,506 (+6%)</font>        |
| Domain Rating (Ahrefs)    | 10.0           | 10.0         | 0                                              |
| AdSense Earnings          | $161.06        | $322.58      | <font color="green">+$161.52 (+100%)</font>    |
| AdThrive Earnings         | $135.00        | N/A          | N/A                                            |
| Amazon Affiliate Earnings | $83.03         | $188.28      | <font color="green">+$105.25 (+127%)</font>    |
| **Total Earnings**        | **$379.09**    | **$510.86**  | **<font color="green">+$131.77 (+35%)</font>** |

Is It Keto had nice growth this month, and I'm not sure why. I haven't touched it at all since September.

These numbers further confirm what I've always liked about Is It Keto as a business: it continues making money passively, and all effort I spend actively developing it serves to increase the passive income it generates when I stop managing it.

### [Zestful](https://zestfuldata.com)

| Metric             | September 2020 | October 2020 | Change                                         |
| ------------------ | -------------- | ------------ | ---------------------------------------------- |
| Unique Visitors    | 333            | 436          | <font color="green">+103 (+31%)</font>         |
| Total Pageviews    | 849            | 1,149        | <font color="green">+300 (+35%)</font>         |
| RapidAPI Earnings  | $12.27         | $35.05       | <font color="green">+$22.78 (+186%)</font>     |
| **Total Earnings** | **$12.27**     | **$35.05**   | **<font color="green">+$22.78 (+186%)</font>** |

Zestful continues its multi-month streak of sub-$100 revenue from low-volume clients and zero Enterprise sales.

I received an inquiry from a large customer interested in an enterprise package for Zestful. It could potentially be a significant source of revenue, but I'm worried about it distracting me from TinyPilot. Historically, enterprise Zestful customers have required little to no support, so it might turn out to be a win-win.

## Wrap up

### What got done?

* Set a new record for revenue, at $10,263 in TinyPilot sales.
* Interviewed several businesses about what functionality they want from TinyPilot.
* Published a new blog post about [using TinyPilot to build my new home VM server](http://blog:1313/building-a-vm-homelab/).
* My article on digitizing home videos [hit #3 on Hacker News](https://news.ycombinator.com/item?id=24839848).

### Lessons learned

* Inventory management makes a huge difference
  * Customers are understandably more interested in purchasing TinyPilot when there isn't a backlog of several weeks.
  * At the same time, it [requires a lot of cash](https://twitter.com/deliberatecoder/status/1322547428999024641) to pre-pay for inventory in advance.
* Need conversion

### Goals for next month

* Release a high-end version of TinyPilot that requires no assembly
* Sell 10 pre-orders for a video course I'm working on
* Release a v1 of TinyPilot Pro?