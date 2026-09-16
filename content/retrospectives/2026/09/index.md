---
title: "Refactoring English: Month 21"
date: "2026-09-21"
description: Maybe I'll print physical books after all
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and founder of small, indie tech businesses. I'm currently working on a book called [_Refactoring English: Effective Writing for Software Developers_](https://refactoringenglish.com).

Every month, I publish a retrospective like this one to share how things are going with my book and my professional life overall.

{{</notice>}}

## Highlights

-

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Pitch to 5 podcasts to talk about _Refactoring English_

- **Result**: Pitched to one new podcast
- **Grade**: D

I keep skipping this because to pitch to a podcast, I want to actually listen to a full episode of the podcast so I'm not just spamming random podcasts. But after becoming a parent, I don't have many activities that I can do while listening to a podcast, so I almost never listen to podcasts. And then listening to a podcast never feels like the most important thing to do during a workday.

I think I need to just recognize that the right podcast could have a huge impact on the book, so I

### Attract 30k unique readers to the _Refactoring English_ website

- **Result**: Did zero promotion to the website, but still got 7.8k unique readers
- **Grade**: F

TODO

### - Declare the 1.0 release of my book

- **Result**: Announced the 1.0 version
- **Grade**: A

TODO

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

## I've reached 1.0 of the book

## My fear of selling physical books

When I started writing _Refactoring English_, I wanted to keep things simple and publish it just as a PDF. I was open to other formats, and I intentionally chose authoring tools that supported EPUB, HTML, and print just in case there was demand, but I wanted to wait until there was a critical mass of customers willing to pay for other formats.

The format I was least excited to support was print copies, like physical books. My only experience selling a physical product was with TinyPilot, and the physical parts were consistently the most stressful and tedious parts of the work for me. Among my memories of shipping physical products:

- In the early days of TinyPilot, never wanting to travel because nobody would be home to pack orders and leave them out for the mail carrier.
- Customers who threatened to cancel their order or do a credit card chargeback if their order didn't ship the same day that they placed it.
- Having to eat the cost of hundreds of dollars of merchandise each month for packages that customers reported lost or stolen.
- Dealing with the complexity of syncing my website [with a third-party warehouse's internal logistics software](https://mtlynch.io/retrospectives/2023/04/#everyone-just-gives-us-their-admin-password).

As I've gotten closer to the finish line on the book, I've realized a lot of the problems I remember with TinyPilot are either solvable or don't exist with the book.

- Customers expecting immediate shipping: Probably not so common for people buying self-published books from an indie author.
- Eating the cost on products lost in the mail: The risk for a book is ~$20 in manufacturing costs and $3 in shipping as opposed to $150 + $20 for a hardware product

## How do you even print a book?

I know a lot of self-published authors default to Amazon's print on demand service to create physical copies of their books, but dealing with Amazon is also high on my list of things I don't miss about selling a physical product. I want to avoid Amazon as long as possible.

So, how do I print a book?

### Printing with a local print shop

I tried asking a local print shop. I reached out to one in July and never heard back. I assume they saw "initial run of 50-100 copies" and decided I wasn't worth the time. A few weeks later, I tried calling a local print shop that mainly does flyers and business cards and asked if they do books, and they said definitely, and they said they could quote me 50-100 books, and a few days later, I received their quote:

- Grayscale: $24.35/book @ 50 books
- Color: $78.73/book @ 50 books

Yikes!

### Printing with an online print-on-demand vendor

The color price was a total non-starter. If it costs $79 to print, I probably have to charge $90 to break even after all my costs, and that probably prices out too many potential readers. I asked what volume I'd have to hit for price breaks, and they admitted that they just aren't set up to print this kind of book inexpensively.

I checked online for print on demand vendors and found more viable prices for color prints:

- IngramSpark: $12.91/book
- Lulu: $19/book
- Blurb: $25.17/book

## How do I ship a self-published print book?

- Order a bunch of books to my house and ship them out myself as orders come in.
  - Fun and personal, but it's also probably 3-10 minutes of work per order, and books take up a lot of space.
- Order a bunch of books to a 3PL (warehouse and shipping vendor) (TODO: link) and connect a Shopify or Woo store to the 3PL
  - Pain
- Sell on Amazon with Amazon's print on demand service
  - I've hated working with Amazon on the seller side.
  - I might sell on Amazon eventually, but I definitely don't want it to be the first place I try because they're 100x more complicated and merchant-hostile than everyone else.
- Sell with a vendor that does print on demand + fulfillment
  - This is like the Amazon option except you don't have to deal with Amazon.

Lulu seems to have added a lightweight option in the last few weeks called [Buy Button](https://www.lulu.com/sell/sell-on-your-site/buy-button) where it looks like they're using [Stripe Connect](https://stripe.com/connect) so the customer's payment goes directly to my Stripe account with some percentage re-routed to Lulu for their fee.

Lulu's Buy Button option seems like a great path for me at this point because I'm already selling the ebook through Stripe, and it's nice to have everything in a single payment platform.

The downside I see is that Lulu forces me to give customers a mailing address for returns, which means either paying for a virtual mailbox or revealing my home address to customers.

## Side project: Mail Archiver

I'm a [longtime data hoarder](https://mtlynch.io/budget-nas/#why-build-a-nas-server). I still have 20+ year old [AIM logs from my college days](/notes/gleam-first-impressions/#my-project-parsing-old-aim-logs) and an offline copy of all my emails since 2004 when I got an early Gmail account.

I write so many emails, and I'm terrified of losing them, so I always keep a copy on whatever email service I use. Currently, I use Fastmail, and I use a strong password and two-factor auth, so I figure my email is safe. And then I realized LLMs could hack everything, and I successfully hacked into my own Fastmail account without my password or security key (blog post coming). I reported the bug to Fastmail, and they fixed it, but I realized I probably didn't find the _last_ serious security vulnerability in Fastmail, so maybe I shouldn't keep all my old private mail on a third-party cloud service.

I started keeping an offline copy of my mail a long time ago with Thunderbird, but I found that my Thunderbird database would randomly get corrupted, something that's not so appealing for a backup. Then I found out about the [maildir format](https://en.wikipedia.org/wiki/Maildir), where every email is a plaintext file. That sounded great!

About two years ago, I started using offlineimap to sync my emails to my local computer, and that worked fine, though I was a little nervous that offlineimap has gone unmaintained for several years. And then XX years ago, I found out about a modern replacement for offlineimap called imapgoose, which is written in Go and has far better test coverage than offlineimap.

The first challenge was that when I compared offlineimap and imapgoose, they contained slightly different data. Whoops. So one of them had to be backing up incorrectly. I wrote a complicated maildir diffing tool to compare the two directories, but it turned out that they were essentially both correct:

- offlineimap had stale copies of emails that had been moved
- imapgoose and offlineimap sometimes had mail headers that were slightly different at a byte level but equivalent at a semantic level
  - I'm still not 100% sure because offlineimap had the technically incorrect versions and imapgoose had the correct versions, but offlineimap has no logic to fix headers, so I think my mail server has gone through different phases of presenting incorrect headers exactly as the sender sent them or repairing them.

Once I confirmed imapgoose had correct backups, I dropped offlineimap and

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-

### Requests for help

TODO
