---
title: "TinyPilot: Month 11"
date: 2021-06-02T00:00:00-04:00
description: TODO - One-line summary
---

## Highlights

*

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Increase TinyPilot's revenue to $33k

* **Result**: XX
* **Grade**: A

TinyPilot got a [big review from ServeTheHome](https://www.servethehome.com/tinypilot-voyager-kvm-raspberry-pi-remote/), one of the top blogs / YouTube channels for IT hardware, and that led to a big jump in purchases. For a while, we were on track to have our best month ever, but things slowed down in the final week.

### Fully migrate TinyPilot's operations to our new office

* **Result**: TinyPilot operates completely at the new office
* **Grade**: A

We finally moved TinyPilot operations out of my house and into a real office. There were some stressful days, like when I wasn't sure if I could get printing to work on Linux at all, but overall the transition was smooth. I still work from home, but all incoming parts ship to the office, employees build and test the products at the office, and they ship orders to customers from the office.

### Gather feedback on the table of contents for [*Refactoring English*](https://refactoringenglish.com) and iterate on it

* **Result**: XX
* **Grade**: A

I got feedback from the [Write Useful Books community](https://writeusefulbooks.com) and from my mailing list. Responses were a bit lower than I hoped (6 responses from 202 subscribers), but it provided useful feedback.

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

## How is $30k/month not profitable?

My average revenue is about $30k per month, but I'm barely breaking even.

I haven't done all my bookkeeping for May yet, so let's look at April.

{{<img src="pie-chart.png" maxWidth="800px" alt="Pie chart of TinyPilot expenses" caption="TinyPilot expenses by category" hasLink="false">}}

|                 Category          | Total        |
|-----------------------------------|--------------|
| Raw Materials                     | $15,637.68   |
| Software Contractors              |  $9,331.79   |
| Electrical Engineering Consulting |   $901.25    |
| Office Rent                       |   $550.00    |
| Advertising                       |   $370.00    |
| Legal Counsel                     |   $270.00    |
| Office Equipment                  |   $233.72    |
| Graphic Design                    |   $169.00    |
| Stickers                          |   $163.63    |
| Cloud Services                    |   $137.33    |
| Local Contractors                 |   $129.12    |
| Misc                              |    $161.21   |

## I'm just a manager

## Building a knowledge base in Notion

Here are a few gotchas I've run into:

* If you import a document by copy/pasting all text and images from Google Docs (or anywhere else) into Notion, it will *look* like it worked, but it didn't actually import the images. It's hotlinking the images, so if they're on Google Docs, the images will break in a few days as Docs-embedded images don't have permalinks.
  * I realized this the hard way when I thought everything was imported properly, then all the links broke and we had to tediously replace each image, one-by-one.
* Duplicating a link doesn't actually duplicate the link &mdash; it creates a whole duplicate document.
  * I have multiple processes that share the same steps (e.g., both my Voyager and Hobbyist products follow the same process for printing customer invoices). I thought I was creating multiple links to the same document, but it turned out that I was creating multiple documents that were out of sync.
* If on page A, you want to include a reference to page B, you can only do it once. If you do it a second time, it will silently remove the old reference and move it to the new spot.

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Is It Keto](https://isitketo.org)

{{<revenue-graph project="isitketo">}}

### [Hit the Front Page of Hacker News](https://hitthefrontpage.com/)

{{<revenue-graph project="htfp">}}

### [Zestful](https://zestfuldata.com)

{{<revenue-graph project="zestful">}}

I learned the process of publishing a PyPI package, so I figured it shouldn't be too hard. It ended up being a *little* harder than I expected, but I got the package up in a day.

## Wrap up

### What got done?

*

### Lessons learned

*

### Goals for next month

* Publish a new release of TinyPilot
* Earn $35k in revenue
* Create a prototype of the TinyPilot Voyager 2, with built-in Power over Ethernet
