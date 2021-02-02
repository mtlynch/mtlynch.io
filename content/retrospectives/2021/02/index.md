---
title: "TinyPilot: Month 7"
date: 2021-02-02T00:00:00-05:00
description: Frighteningly fast growth
---

## Highlights

*

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Goal 1

* **Result**: XX
* **Grade**: XX

TODO

### Goal 2

* **Result**: XX
* **Grade**: XX

TODO

### Goal 3

* **Result**: XX
* **Grade**: XX

TODO

## Stats

### [TinyPilot](https://tinypilotkvm.com)

{{<revenue-graph project="tinypilot">}}

## My first YouTube review

## My first postmortem

One of the most valuable practices I learned from working at Google is [blameless postmortems](https://landing.google.com/sre/book/chapters/postmortem-culture.html). When something goes majorly wrong, you get back to steady state and then write a report analyzing what happened.

As the name implies, the document is *blameless*. It's never, "Michael deleted a file because he's stupid, so we had an outage." The underlying assumption of a postmortem is that everyone on the team is smart and diligent, so if something went wrong that *looks* like someone being stupid, the underlying issue is that the *systems* failed to protect against normal human error.

### Inventory targets were too low

We manage inventory with a spreadsheet.

What's the biggest rush we could imagine?

Hadn't adjusted

* **Fix**: Schedule a monthly adjustment of inventory targets.
* **Fix**: Whenever we're at risk of running out of an item, double our inventory targets.

### Urgency was not obvious

Our inventory spreadsheet

* **Fix**: Add

### Inventory spreadsheet gives ambiguous order information

Our inventory spreadsheet is in terms of absolute quantity, but some items ship in packs rather than individually. Our power adapters come in packs of three, and we needed XX extra, but we accidentally ordered XX 3-packs instead of dividing the number by three first. It was a human mistake, but it highlights how our system invites mistakes because the person ordering inventory needs to do mental arithmetic that varies for each order.

**Fix**: Add a separate column in the spreadsheet for "reorder quantity" that takes into account quantity per-pack.

### Handling time is too short

When I first started TinyPilot, I promised shipping within one business day. That caused a ton of stress and constantly context switching to get orders out immediately. Within a month, I changed the promise to two days.

That's worked out fine, but we realized that almost every time we've had to put up a backorder notice, an extra day of buffer would have saved us, including this instance.

* **Fix**: Increase advertised handling time to three days.

## Where's the inventory management app for me?

You may have noticed that in the postmortem, most of the problems come back to the fact that we're managing inventory with a homegrown spreadsheet. I've looked for inventory management apps several times throughout the life of TinyPilot, but every solution is either too simple or too complicated.

The "too simple" solutions assume that everything in my inventory is an item I can sell directly like a T-shirt or a sneaker. They have no concept of something like a bare circuit board, which I keep in inventory to build a power connector, but I never as a raw part.

The "too complicated" solutions support features like "kitting" (selling a product composed of multiple products) or bills of materials (a list of materials that make up a product), but they're 10x too heavyweight for what I want. For example, if I want to tell the app that I turned one Voyager case + one Raspberry Pi + one microSD card into an assembled Voyager, it's a 10-step workflow that asks me which warehouse the parts came from, the contact details for each part manufacturer, the purchase order this assembly is associated with, etc.

My dream inventory app would do the following:

* The app connects with Shopify, so when a Voyager order comes in, it automatically deducts from inventory one Voyager case, one Raspberry Pi, etc.
* I hit a button to say that I placed a new order for part X and the ETA is date Y
* I hit a button to say an order arrived and is now part of my inventory
* The app extrapolates recent order velocity and warns me to reorder if I'm headed to depletion for a part

If you're reading this and want to build a SaaS app, I would pay you $200/month if you build a solution that matches TinyPilot's use case.

## Scaling production

## Scaling development

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Hit the Front Page of Hacker News](https://hitthefrontpage.com)

TODO

### [Is It Keto](https://isitketo.org)

{{<revenue-graph project="isitketo">}}

### [Zestful](https://zestfuldata.com)

{{<revenue-graph project="zestful">}}

## Wrap up

### What got done?

*

### Lessons learned

*

### Goals for next month

*
