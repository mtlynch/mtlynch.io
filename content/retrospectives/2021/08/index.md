---
title: "TinyPilot: Month 13"
date: 2021-08-05T00:00:00-04:00
description: A month of delegation.
images:
  - /retrospectives/2021/08/notion-todo.png
---

## Highlights

* TinyPilot's EU distributor is on track to begin sales by the end of August.
* I've freed up time by delegating responsibilities to my teammates.
* I miraculously became unstuck on two tasks that have been blocking work for months.

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Get my EU partner ready to begin sales by the end of August

* **Result**: We're on track to begin sales by the end of the month.
* **Grade**: A

This went well. By next week, my distributor should have all the parts and instructions he needs to begin assembling his own TinyPilot Voyager devices. He's on track to begin sales by the end of this month.

### Define processes that allow TinyPilot's local staff to share and alternate on all tasks

* **Result**: We created a shared to-do list that lets staff alternate tasks.
* **Grade**: A

TinyPilot has never had more than one person at a time managing inventory and fulfillment tasks. It was harder than I expected to create systems that allow two people to share responsibilities equally, but we now have a working system that allows both employees to alternate tasks and coordinate schedules. In addition, I documented the gaps I was filling in so that local staff can handle them.

### Find a designer for the TinyPilot sales site

* **Result**: A new developer is in the process of a redesign.
* **Grade**: A

After months of searching, I finally found a web developer to work on the TinyPilot website, and he's in the process of redesigning it.

### Find an electrical engineering firm that can create a PoE adaptor for TinyPilot Voyager

* **Result**: My original firm found components that allow them to create a PoE adaptor.
* **Grade**: A+

This was another lucky breakthrough. The global chip shortage stymied my electrical engineering firm for months, so I started reaching out to bigger vendors who might have better connections to electronics supply chains. It was going to be a slow process, and they'd likely want to start from scratch.

Fortunately, TinyPilot's existing electrical engineering partner managed to find a supply that should last us 6-12 months at a price less than 10% of what I was prepared to pay. They're currently working on a PCB design for a PoE adaptor and expect to have a prototype within the next 4-6 weeks.

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric          | June 2021  | July 2021  | Change                                     |
| --------------- | ---------- | ---------- | ------------------------------------------ |
| Unique Visitors | 6,339      | 5,234      | <font color="red">-1,105 (-17%)</font>     |
| Total Pageviews | 11,514     | 9,730      | <font color="red">-1,784 (-15%)</font>     |
| Sales Revenue   | $29,446.46 | $23,954.64 | <font color="red">-$5,491.82 (-19%)</font> |
| Enterprise Subscriptions | $48.00 | $48.00 | $0 (0%) |
| Total Revenue   | $29,494.46 | $24,002.64 | <font color="red">-$5,491.82 (-19%)</font> |
| **Profit**      | **<font color="red">-$9,452.32</font>**    | **<font color="red">-$9,713.34</font>**    | **N/A**                                    |

Sales continue to slump, as I've been focusing on setting up EU distribution and transitioning TinyPilot's fulfillment processes to local staff. I'm lucky that TinyPilot can continue to hit $24k in revenue two months without any marketing or advertising, but I need to increase my investments in sales and marketing over the next few months.

## Moving to a managed inventory service

From the first few months of TinyPilot, I've been looking for a managed service to track inventory. The cheap solutions were too simple and only worked for products that required no assembly or manufacturing. The high-end solutions were overly complicated, designed for Enterprise-grade customers with thousands of products and multiple warehouses.

By chance, I stumbled across [Craftybase](https://craftybase.com), which finally seemed like a solution that matched TinyPilot. And it *sort of* does, but it's been a rough transition.

Some things about Craftybase are well-designed and fit our workflows perfectly. My favorite feature is "recipes," which define the raw materials that make up a product. For example, I can tell Craftybase that a TinyPilot Power Connector consists of one case and one circuit board. When I record a "build" in Craftybase of 10 Power Connectors, it knows to deduct 10 cases and 10 circuit boards from my inventory.

{{<img src="craftybase-recipe.png" maxWidth="800px" alt="Screenshot of Craftybase flagging HDMI capture chips as low in stock" caption="Craftybase's 'recipe' feature allows you to define the components that make up each of your products." hasBorder="true">}}

Recipes can also contain other items I manufactured, which works nicely for TinyPilot's multi-stage manufacturing. For example, we build TinyPilot Voyagers in phases. We'll usually build a batch of 10+ Voyager devices, test them, and then pack each device into a box with the necessary cables, instructions, and microSD card. Craftybase allows us to track components at different stages of this process, as recipes can contain raw materials and parts we built at an earlier stage.

Unfortunately, most of our workflows in Craftybase are fairly bumpy. The most egregious example is managing incoming shipments. Craftybase allows you to define a "low stock limit" for each item, a number it uses to highlight any parts that are running low.

{{<img src="craftybase-low-stock.png" maxWidth="800px" alt="Screenshot of Craftybase's recipe feature" caption="Craftybase highlights materials when their quantity in stock falls below your low stock threshold." hasBorder="true">}}

The problem is that it continues flagging the item even after you've ordered more, as the flag ignores pending shipments. In the example above, I recorded in Craftybase that I have an order of HDMI capture chips arriving at the end of the month. Craftybase still flags this item as low in stock even though there's nothing left for me to do.

That means that when TinyPilot staff want to figure out which items to reorder, they have to go through every flagged item individually and check whether it's *actually* low in stock after taking into account pending orders.

At first, I thought there was a simple workaround. I assumed Craftybase's "purchased" column represented pending shipments. It turns out that "purchased" is actually the total quantity I've purchased since the beginning of time, an irrelevant metric that Craftybase gives bizarrely prominent real estate.

{{<img src="all-purchased.png" maxWidth="800px" alt="Screenshot of Craftybase flagging HDMI capture chips as low in stock" caption="Craftybase highlights materials when their quantity in stock falls below your low stock threshold." hasBorder="true">}}

The workaround is that for each item flagged as low in stock, we have to dive into the details, check the total in stock, add pending orders, then check whether that number falls below our low stock limit. Checking for low stock should be a two-second workflow, but Craftybase has turned it into a tedious and complex process requiring several minutes of work.

{{<gallery caption="To check whether an item is low in stock in Craftybase, you have to correlate numbers across multiple screens.">}}
  {{<img src="low-stock-limit.png" maxWidth="500px" alt="Screenshot of Craftybase flagging HDMI capture chips as low in stock" hasBorder="true">}}
  {{<img src="total-pending.png" maxWidth="800px" alt="Screenshot of Craftybase flagging HDMI capture chips as low in stock" hasBorder="true">}}
{{</gallery>}}

## Freeing up more time with delegation

For most of TinyPilot, I've struggled with a shortage of time. There are many moving parts to the business, and I'm the sole bridge across all of them.

In June, I identified [a list of tasks](/retrospectives/2021/06/#unhoard-michael-only-tasks) that I could delegate with some investment in training and tools. I'm pleased to say that I've successfully delegated or eliminated half of the items on that list, plus several more.

### Excuse myself from spreadsheet duty

TinyPilot's previous inventory solution was a homegrown spreadsheet that I maintained. It supported TinyPilot's workflows well, but it was inflexible. Any time we added a new product or changed parts, I had to spend several hours fiddling with my hacky spreadsheet formulas to make things work again.

{{<img src="tinypilot-inventory.png" maxWidth="800px" alt="Screenshot of TinyPilot inventory in Google Sheets" caption="For TinyPilot's first year, we tracked all inventory in a series of spreadsheets with complicated formulas." hasBorder="true">}}

As much as Craftybase frustrates me, it eliminates me from the critical path of our inventory process. Craftybase tracks our inventory with more granularity and flexibility than we could with the spreadsheet, though it does require a depressing amount of workarounds.

### Create a shared to-do list for local staff

One of the tasks I was still unintentionally micromanaging was task assignment. Each of TinyPilot's local employees visit the office three days per week for a few hours. For tasks that happen every day, such as order fulfillment or processing incoming deliveries, it's easy to direct employees to tackle them during their shift.

Tasks that happen once per week or month are harder to distribute across two employees. For the first few months in the local office, the weekly and monthly tasks were a disorganized mix of "do it when it needs doing," "wait for Michael to ask for help," or "Michael will just do this."

One of TinyPilot's employees was interested in learning more about [Notion](https://notion.so), the tool we use for our knowledge base. This seemed like a good Notion project, so I asked him to create a shared to-do list to manage weekly and monthly tasks.

{{<img src="notion-todo.png" maxWidth="800px" alt="TinyPilot's shared to-do list in Notion" caption="TinyPilot's local staff tracks outstanding tasks in a shared to-do list in [Notion](https://notion.so)." hasBorder="true">}}

We've been using the to-do list successfully for the past three weeks. The major disadvantage is that we haven't found a good way of creating recurring tasks in Notion. Our workaround is to repopulate the list by hand every few months. It's tedious, but it's only about an hour of work per quarter.

### Train local staff to reorder raw materials

For most of TinyPilot's life, my girlfriend managed inventory, including reordering raw materials when we were running low. When she went back to grad school in June, we transferred most of her responsibilities to a new employee, but reordering materials fell back onto my plate.

Reordering inventory is a deceptively difficult task to outsource. It's not just explaining how to do it; it's figuring out how to share credentials to vendor websites, giving them a new debit card number that's spending-capped to limit mistakes, etc. Assigning someone to manage inventory also requires time to build up trust. I don't want to hand a brand new employee a credit card and say, "You're now responsible for $10k/month in spending."

In July, I finally created [Bitwarden](https://bitwarden.com/download/) accounts for everyone on the team, which allows us to share credentials securely. I also wrote instructions on how to order from our various vendors.

{{<img src="order-raw.png" maxWidth="800px" alt="Screenshot of TinyPilot's internal Notion page for ordering raw parts" caption="TinyPilot's internal documentation for reordering raw materials" hasBorder="true">}}

Maintaining inventory levels feels like such a small amount of work, but there are so many little tasks involved in the process of reordering supplies that I'm always immensely relieved when someone else takes it over.

### Allow developers to review each other's pull requests

Since February, two freelance developers have worked with me on TinyPilot, and a third joined last month. I've mostly stopped writing code due to lack of time, but I was still the code reviewer on every single change.

A few months ago, we tried eliminating me from the code review process, but it didn't take. I'm available full-time, whereas the other developers are only available part-time at mostly non-overlapping hours. If they had a sequence of changes that depended on each other, [latency between reviews could kill progress](/code-review-love/#13-minimize-lag-between-rounds-of-review).

At our monthly dev meeting, we realized that only a fraction of changes come in a sequence like that. For most changes, it's not a big deal if you have to wait a day or two for a review. So, developers are now reviewing each other's code.

As someone who still sees themselves as an indie developer, it feels scary to own code that I didn't personally review. But I trust my teammates, and I think this system works better for the company overall.

### Externalize the image building process

Every time we publish a new release of TinyPilot, I create a microSD image with the latest version of TinyPilot pre-installed. My process for building a microSD image requires a Raspberry Pi, so I'd been using a spare Pi and SSD that sit in the corner of my office.

{{<img src="pi-build-server.jpg" maxWidth="600px" alt="Photo of Pi and SSD drive" caption="The official TinyPilot build server, until recently">}}

Even though TinyPilot's developers are perfectly capable of managing the code, it was too difficult to coordinate shared access to a single server silo'ed in my house. As a result, I remained the sole maintainer of the build code.

Sometimes, I hopelessly Google something for months and months, desperate for a solution, only to find out that I was using the wrong search terms. I always wanted Pi cloud hosting, and I'd routinely searched for "pi cloud hosting" or "pi cloud server," only to find unhelpful results about using your own Pi as a cloud server. Finally, it occurred to me to search "pi dedicated server." That led me to [Mythic Beasts](https://www.mythic-beasts.com/), a company that offers cloud-hosted Raspberry Pi servers that you can rent by the second.

{{<img src="mb-hosting.png" maxWidth="800px" alt="Screenshot of Mythic Beasts Raspberry Pi pricing" caption="[Mythic Beasts](https://www.mythic-beasts.com/) offers bare-metal Raspberry Pi server hosting." hasBorder="true">}}

Mythic Beasts has a nice API for dynamically spinning up Pi servers, but I realized that their server costs are so inexpensive relative to developer time, it's cheaper for me to give each of my developers a personal server that runs 24/7/365 than to automate any clever server allocation logic.

With the server problem solved, I cleaned up my image building code and shared it with my team. Now any TinyPilot developer can provision their server with the latest build code and use it to generate a TinyPilot microSD image. More importantly, if we discover bugs in the process or add new steps, TinyPilot's developers can make those changes instead of it being a Michael-only task.

## Starting EU distribution

My biggest project over the past month has been getting things rolling with my new EU distributor. I currently sell to European customers, but shipping overseas is slow, expensive, and can involve surprise tariffs at delivery time. The EU distributor will be manufacturing and shipping TinyPilot from Germany, which will improve the purchase experience for consumers in the EU.

One of the major challenges in forming the partnership is how to balance commitment with flexibility. Historically, it's been hard to predict TinyPilot's future more than a few months in advance, so I try to stay as flexible as possible. Understandably, my distributor requires some level of long-term commitment from me. It takes a lot of work and capital investment to begin selling TinyPilot devices, so he doesn't want me to pull the rug out from him if another distributor comes along with a better deal.

The other struggle has been royalties. We agreed that the best way to align our incentives was to share profits by percentage. That way, the distributor can experiment with different prices without being limited by a fixed payment to me. And if he finds that he can sell at a higher price, I benefit from that higher price alongside him.

The difficulty in splitting profits is that it leads to hard questions about how, exactly, to calculate them. If my distributor gives away free devices as part of marketing, does he owe me royalties for those units? Does labor cost factor into profit per unit? If we invest in product improvements together, how does that affect our profit calculation?

We've been figuring out those questions and trying to anticipate potential sources of conflict. At this point, we're about 95% done with the contract, and it looks like we're on track to finalize it in weeks, if not days.

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Is It Keto](https://isitketo.org)

{{<revenue-graph project="isitketo">}}

| Metric                   | June 2021   | July 2021   | Change                                       |
| ------------------------ | ----------- | ----------- | -------------------------------------------- |
| Unique Visitors          | 49,839      | 39,568      | <font color="red">-10,271 (-21%)</font>      |
| Total Pageviews          | 122,700     | 96,494      | <font color="red">-26,206 (-21%)</font>      |
| Domain Rating (Ahrefs)   | 13.0        | 13.0        | 0                                            |
| AdSense Revenue          | $536.85     | $438.07     | <font color="red">-$98.78 (-18%)</font>      |
| Amazon Affiliate Revenue | $134.59     | $59.65      | <font color="red">-$74.94 (-56%)</font>      |
| **Total Revenue**        | **$671.44** | **$497.72** | **<font color="red">-$173.72 (-26%)</font>** |

Last month, I was celebrating how well Is It Keto's audience has held up so long after the annual January surge. I guess I jinxed it because this month had the year's biggest month-over-month drop in visitors, falling by over 20%.

Sadly, the slump coincides with me applying to partner with a higher-tier display ad partner. I've heard recommendations to switch from Google AdSense to MediaVine, as the latter pays publishers considerably more. MediaVine has a minimum requirement of 100k pageviews per month, which I had when I applied, but now I'm just below. We'll see what happens, I guess.

### [Hit the Front Page of Hacker News](https://hitthefrontpage.com/)

{{<revenue-graph project="htfp">}}

| Metric                    | June 2021   | July 2021   | Change                                         |
| ------------------------- | ----------- | ----------- | ---------------------------------------------- |
| Unique Visitors           | 248         | 109         | <font color="red">-139 (-56%)</font>           |
| Gumroad Revenue           | $123.52     | $218.09     | <font color="green">+$94.57 (+77%)</font>      |
| Blogging for Devs Revenue | $0.00       | $27.30      | <font color="green">+$27.30 (+inf%)</font>     |
| **Total Revenue**         | **$123.52** | **$245.39** | **<font color="green">+$121.87 (+99%)</font>** |

There hasn't been anything new with the course. A few people per month purchase it and seem to like it, but I haven't been promoting it. Martin Schleiss gave it a favorable mention in his [recent blog post](https://schleiss.io/retrospectives/mid-june-2021). I'm planning to pitch myself as a guest on some tech podcasts this month, so that might lead new people to the course.

### [Zestful](https://zestfuldata.com)

{{<revenue-graph project="zestful">}}

| Metric            | June 2021  | July 2021   | Change                                           |
| ----------------- | ---------- | ----------- | ------------------------------------------------ |
| Unique Visitors   | 594        | 547         | <font color="red">-47 (-8%)</font>               |
| Total Pageviews   | 1,470      | 1,300       | <font color="red">-170 (-12%)</font>             |
| **Total Revenue** | **$40.20** | **$620.67** | **<font color="green">+$580.47 (+1444%)</font>** |

There was a big jump in Zestful usage this month, but I'm pretty sure it's fraudulent. There were several users that signed up within days of each other with usernames like `joe-84ad853`. The bulk of this month's earnings came from one of those accounts. No Zestful customer has ever spent more than $100 on API requests without reaching out to me for a volume discount. This user never reached out, so I'm highly suspicious. RapidAPI claims I'll receive the money on August 30th, but I'll be shocked if that actually happens.

## Wrap up

### What got done?

* Published a [new TinyPilot release](https://tinypilotkvm.com/blog/whats-new-in-2021-07)
* Found a developer to manage the TinyPilot website
* Resumed progress on the TinyPilot PoE HAT and rack mount
* Migrated to a managed inventory service

### Lessons learned

* An imperfect workflow is better than one that depends on the CEO.
  * As much as Craftybase's user interface and limitations frustrate me, it's better than me being stuck maintaining formulas in a complicated spreadsheet.

### Goals for next month

* Help my EU distributor achieve his first sale.
* Finalize the design of the Voyager 2.
* Publish a sample chapter of [*Refactoring English*](https://refactoringenglish.com).
