---
title: "TinyPilot: Month 24"
date: 2022-07-01T14:09:52-04:00
description: "Making TinyPilot sales sustainable"
---

## Highlights

- TinyPilot had a record-breaking month of revenue.
- I'm trying to figure out the best approach to software licensing.
- I'm still searching for a web framework to love.

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Create a self-contained tarball for installing TinyPilot

- **Result**: We now have a working install tarball
- **Grade**: A

TinyPilot's install process has been growing more complex over time. It pulls in code from multiple repositories and third-party dependencies, and it's difficult to trace those relationships and the versioning of each part.

We've overhauling the installer with a single tarball that declares all of its dependencies in a clear location. We have [a script that generates the tarball](https://github.com/tiny-pilot/tinypilot/blob/16434c17e4f5e65bc9f00d8ec61870a62e1bf59a/bundler/create-bundle) on each build, and we're in the process of switching the free version of TinyPilot to this system, and we'll migrate TinyPilot Pro soon after.

### Complete the first draft of a full-length blog post about the TinyPilot website redesign

- **Result**: Completed the first draft
- **Grade**: A

I thought it would be easy to write the blog post because I'd written so much about the process in my retrospectives, but it's still taking a long time. It's 5,200 words, which is about twice as long as my typical article, so I'm trying to trim it down.

### Increase ROAS on paid search ads to 2.0

- **Result**: Increased ROAS from 1.79 to 1.99
- **Grade**: A

The digital marketing freelancer working with TinyPilot increased revenue on ad spend to 1.99. I estimate that I'm earning about $0.55 in profit for every dollar I spend on ads.

Unfortunately, I can't just double ad spend and double sales, as the price increases as you try to capture a greater share of search impressions. Still, I'm happy with the performance so far, and I'm continuing to work with a digital marketer to explore new marketing channels.

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | May 2022      | June 2022       | Change                                           |
| ------------------------ | ------------- | --------------- | ------------------------------------------------ |
| Unique Visitors          | 14,296        | 10,056          | <font color="red">-4,240 (-30%)</font>           |
| Total Pageviews          | 24,131        | 18,764          | <font color="red">-5,367 (-22%)</font>           |
| Sales Revenue            | $54,844.20    | $72,476.80      | <font color="green">+$17,632.60 (+32%)</font>    |
| Enterprise Subscriptions | $47.75        | $47.75          | 0                                                |
| Royalties                | $3,269.56     | $1,710.27       | <font color="red">-$1,559.29 (-48%)</font>       |
| Total Revenue            | $58,161.51    | $74,234.82      | <font color="green">+$16,073.31 (+28%)</font>    |
| **Profit**               | **$6,445.38** | **$7,716.34**\* | **<font color="green">+$1,270.96 (+20%)</font>** |

\* _Note: Profit is just a naive delta in my cash balance until I do real bookkeeping mid-month._

This was TinyPilot's all-time strongest month of revenue. And the exciting part is that there was otherwise nothing remarkable about June.

All of TinyPilot's previous record-breaking months were related to some one-time event like a new product launch or a positive review. But June was effectively just a boring old month where nothing happened out of the ordinary. And that's great! It means that what we're doing is repeatable without relying on some external event.

Site visitors are down relative to May because the previous month, my storage server article reached the front page of Hacker News and mentioned TinyPilot, but our overall visit count is still significantly higher than the first quarter of the year. I credit the increase to our new marketing campaign, which is

## How do TinyPilot Pro users prove their license?

I've always wanted TinyPilot's software to be sustainable on its own regardless of whether we continue selling new hardware. For that to happen, there needs to be a way for users to pay for software maintenance.

I launched a paid version of TinyPilot called TinyPilot Pro back in December of 2020. I initially planned to launch with license key checks, but I [decided to punt on it](/retrospectives/2021/01/#enforcing-software-licenses-via-the-honor-system) because licenses wouldn't expire for a year. But now it's 18 months later, and very few users renew their licenses because they don't even realize they're expired.

I'm planning to start checking for a valid license when a user upgrades to the latest version, but it requires the user to prove to the update server that they have an active TinyPilot Pro license.

Here are the options I'm considering:

### Device ID

TinyPilot runs on the Raspberry Pi, and every Pi device has a hardware serial number that you can retrieve like this:

```bash
$ cat /proc/cpuinfo | grep Serial | cut -d ' ' -f 2
10000000ecf8821b
```

We could collect the device IDs from each Pi before we sell them to a customer. When the user attempts to upgrade, we just check if their device ID is pre-registered and activate based on their device ID.

- Pros
  - Easy for the user - can't lose it or forget their device ID
- Cons
  - We still need a solution for users who purchased before we started recording device IDs
  - Requires us to keep track of all the device IDs
  - Adds an extra step to the device manufacturing process

### Order details

Today, when a customer wants to download the official TinyPilot disk image, we ask for their order number and the email address associated with their purchase:

{{<img src="download-image.png" alt="Screenshot of image download page on TinyPilot website" hasBorder="true" caption="The TinyPilot website currently grants TinyPilot image downloads based on the user proving they know details of their order.">}}

We could use the same logic within the TinyPilot web app to gate upgrades.

- Pros
  - Minimizes bookkeeping because we don’t have to keep track of keys or device IDs, as we’re already storing order information
  - Works for all past customers because we already have their order information
- Cons
  - End-users don't always know their order details if they bought from a reseller or if someone else at their company purchased the device
  - Every time we start selling through a new channel (e.g., Amazon, eBay), we’d have to write custom code to query order information from that channel

### Printed activation key

We could generate a set of activation keys, similar to how you activate Microsoft Windows or Office (e.g. `1F9PA-V4JD5-4JPOM`). The keys could be printed out and included with the device, and the user types it in to prove they have a license.

- Pros
  - Works the same regardless of whether the user buys directly from us or through Amazon, eBay, etc.
- Cons
  - Users are prone to lose or ignore a printed slip of paper in their order
  - We still need a solution for users who purchased before we started handing out activation keys

### License baked into the software

One possibility I considered would be to bake a unique license key into each customer's installation. We flash images for customers and provide installer scripts, so we could theoretically place a unique key file on each customer's machine.

- Pros
  - Works the same regardless of whether the user buys directly from us or through Amazon, eBay, etc.
  - User can't lose their key
- Cons
  - Wildly impractical and complicated to implement
    - We'd have to generate custom disk images for each customer and make sure the customer always install their particular image
  - We still need a solution for users who purchased before we started baking in activation keys

### Some combination

The route I'm leaning towards is checking the device ID first to see if it's pre-registered and then falling back to prompting the user for their order details.

Of the options I can think of, that seems to be the least error prone and puts the least amount of work on end-users.

## Abandon all hope, ye who enters the Amazon Sellers Marketplace

For a long time, I've considered selling TinyPilot on Amazon, as many people now shop exclusively on Amazon and don't look elsewhere. I was resistant because I expected signing up as an Amazon seller to be a miserable and tedious process. Having gone through the process, it is more miserable and tedious than I expected.

It took three weeks before I could even start offering a product. Every few days, Amazon told me I needed some new approval.

First, Amazon had to verify my identity with my driver's license and credit card. Then, I needed to appear on a live video call holding my driver's license in front of my face and bending it to prove it wasn't just a printout.

Then, Amazon froze my account for a day because they couldn't verify my credit card. Yes, the same credit card I'd had on file with Amazon for a year and used to make ~$50k in purchases through Amazon.

Then, Amazon froze my account so they could verify I'm entitled to use the "TinyPilot" brand name. I showed them proof that I'm the owner of TinyPilot, LLC, and I sent them photos of my product with "TinyPilot" written on the side.

{{<img src="first-proof.jpg" alt="Photo of TinyPilot Voyager from the side with TinyPilot brand name showing" caption="Photo I sent to Amazon as proof that the brand name &ldquo;TinyPilot&rdquo; appears on my product" maxWidth="500px">}}

They said they'd review within three days, but it actually took 10. Their conclusion was that my photos didn't sufficiently prove that "TinyPilot" was permanently affixed to my product...

{{<img src="not-permanently-affixed.png" alt="Thank you for your patience. This is the follow up regarding 5665 error. We have completed our review and we are sorry to inform you that your brand does not meet our criteria for approval. In the provided images, we do not see sufficient proof that the branding is permanently affixed to the product and/or packaging, per the Brand Name Policy. In future, if you would like to request another review, we require new images that show 'TinyPilot' is permanently affixed to the product and/or packaging." hasBorder="true" caption="Amazon thinks &ldquo;TinyPilot&rdquo; is not affixed permanently enough to my product.">}}

So, I sent new photos much more focused on the brand name, and only then did they finally approve the product.

{{<img src="new-affixed-proof.jpg" alt="Photo of me holding a TinyPilot Voyager 2 with a dated note to Amazon" caption="Is this affixed enough for you, Amazon?" maxWidth="600px">}}

The new problem was that TinyPilot didn't show up in search results if you search for "tinypilot":

{{<img src="tinypilot-results.png" alt="Photo of me holding a TinyPilot Voyager 2 with a dated note to Amazon" hasBorder="true" caption="TinyPilot doesn't appear in search results for 'tinypilot'" maxWidth="700px">}}

This is especially weird given that Amazon's autocomplete suggestions were all clearly about my product:

{{<img src="autocomplete.png" alt="Photo of me holding a TinyPilot Voyager 2 with a dated note to Amazon" hasBorder="true" caption="Amazon's search suggestions for 'tinypilot' are all clearly about my product, but it still doesn't appear in search results." maxWidth="700px">}}

Even "tinypilot kvm over ip" didn't show my product until page two or three of search results.

I ended up just purchasing ads on Amazon, which finally led to my first few Amazon sales.

Amazon customers seem to have drastically different expectations than customers who purchase directly from the TinyPilot website. The first customer to purchase through Amazon sent a message with the order "ship this with UPS 2-day," but we don't offer UPS shipping. I responded to the customer's message, but I wasn't sure what to do. Should I cancel the order and risk a penalty from Amazon? Wait for the customer to respond and risk Amazon penalizing me for shipping late? I ended up waiting a day and canceling after not hearing back. Then, the customer placed the same order, so we just fulfilled it with USPS and didn't hear any complaints.

A few days later, a different Amazon customer sent me a message saying she was "very disappointed" that her product hadn't arrived yet, as she paid $10 for expedited shipping. I checked the tracking and saw that we shipped her product a day early via USPS Priority, but USPS screwed up and was running late. This is obviously out of our control, but I suspect customers don't understand the difference between purchasing from a third-party seller and purchasing directly from Amazon with their own delivery fleet.

We sometimes get these types of complaints from customers who order directly, but it's nowhere near the rates we're seeing on Amazon.

I'm hoping the hardest parts are over, so I'll stick with it and see if Amazon grows our sales as we accrue ratings there.

## Still searching for a lovable web framework

As I mentioned in [my last update](/retrospectives/2022/06/#wanderjesthttpswanderjestcom), I'm rebuilding [WanderJest](https://wanderjest.com), a tool for finding live comedy that I put on hold [at the start of the pandemic](/retrospectives/2020/04/#putting-wanderjest-on-hold).

I'm rewriting WanderJest in Go + VanillaJS + SQLite as a "back to basics" tech stack after years of trying to work with SPA frameworks like Angular and Vue. Chris Ferdinandi articulates some of my frustrations in his article, ["SPAs were a mistake."](https://gomakethings.com/spas-were-a-mistake/)

I like my current tech stack better than anything I've tried in the past, but I still don't _love_ it. I spend the majority of my time on tedious tasks just gluing things together.

For example, to allow users to create profiles on WanderJest with their photo, bio, and links to other social networks, I need to:

1. Create web UI forms to allow the user to create and edit their profile
1. Create server-side endpoints to receive the user submissions
1. Create data models to represent profile information
1. Write serialization/deserialization code to move data in and out of the data store
1. Write SQL queries for inserting and retrieving the data from the data store
1. Create a web UI for rendering the profile information

It's fewer steps than other frameworks I've used, but that stuff is _really boring_.

[Phoenix LiveView](https://github.com/phoenixframework/phoenix_live_view) has been on my list for the past year or so, as it's what the cool kids over at [fly.io](https://fly.io) are all excited about. Part of Phoenix's promise is that it automates many of the repetitive tasks I listed above. Chris McCord made a [neat demo](https://www.youtube.com/watch?v=MZvmYaFkNJI) where he uses Phoenix to build a basic Twitter clone in 15 minutes.

At the same time, I'm afraid of a "grass is always greener" mentality that has me constantly hopping around to different frameworks without learning any particular stack well. Maybe a good compromise is [Ruby on Rails](https://rubyonrails.org), which I think has a similar developer experience to Phoenix but with a more mature ecosystem around it.

## Wrap up

### What got done?

- Started selling TinyPilot on Amazon
- Completed a first draft of a new full-length blog article
- Completed the process of generating install bundles for TinyPilot

### Lessons learned

-

### Goals for next month

- Finalize plans for managing TinyPilot licenses
