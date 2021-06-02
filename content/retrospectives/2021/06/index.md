---
title: "TinyPilot: Month 11"
date: 2021-06-02T00:00:00-04:00
description: TODO - One-line summary
---

## Highlights

* I need to increase TinyPilot's profits.

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Increase TinyPilot's revenue to $33k

* **Result**: Increased TinyPilot's revenue to $39k
* **Grade**: A

TinyPilot got a [big review from ServeTheHome](https://www.servethehome.com/tinypilot-voyager-kvm-raspberry-pi-remote/), one of the top blogs / YouTube channels for IT hardware. For a while, we were on track to have our best month ever, but things slowed down in the final week.

### Fully migrate TinyPilot's operations to our new office

* **Result**: TinyPilot operates completely at the new office
* **Grade**: A

We finally moved TinyPilot operations out of my house and into a real office. There were some stressful days, like when I wasn't sure if I could get printing to work on Linux at all, but overall the transition was smooth. I still work from home, but all incoming parts ship to the office, employees build and test the products at the office, and they ship orders to customers from the office.

### Gather feedback on the table of contents for [*Refactoring English*](https://refactoringenglish.com) and iterate on it

* **Result**: I gathered feedback, but I'm not yet sure how to integrate it
* **Grade**: B

I got feedback from the [Write Useful Books community](https://writeusefulbooks.com) and from my mailing list. Responses were a bit lower than I hoped (6 responses from 202 subscribers), but it provided useful feedback.

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric          | April 2021  | May 2021   | Change                                       |
| --------------- | ----------- | ---------- | -------------------------------------------- |
| Unique Visitors | 5,880       | 7,283      | <font color="green">+1,403 (+24%)</font>     |
| Total Pageviews | 10,483      | 13,267     | <font color="green">+2,784 (+27%)</font>     |
| Sales Revenue   | $28,880.65  | $38,767.77 | <font color="green">+$9,887.12 (+34%)</font> |
| Donations       | $0.00       | $0.00      | 0                                            |
| Total Revenue   | $28,880.65  | $38,767.77 | <font color="green">+$9,887.12 (+34%)</font> |
| **Profit**      | **$843.56** | **$7,929.10\***    | **N/A**                                      |

\* Provisional until I do real bookkeeping for the month. This number is just the delta in my checking account since May 1st. It's artifically inflated because I wasn't able to purchase Raspberry Pi boards this month due to chip shortages, but my next order may cost $8k.

## I'm just a manager

From 2012 to 2014, I worked as a software security consultant for a company called iSEC Partners. My manager, Peter, ran the entire team in New York. He would often say self-deprecatingly, "I'm just a manager. I'm overhead." But he was an exceptionally good manager, and everyone knew it. I think he joked about the unimportance of his role because management meant he had less time for the more fun parts of the job like security research and tool development.

I now relate to Peter's sentiment. I'll often get to the end of the day and feel like all I did was write emails. But taking a step back, I can understand why. At this point, I work with a lot of people on TinyPilot:

* three remote software developers
* three local staffers who handle inventory, assembly, and order fulfillment
* two vendors with whom I work closely on 3D printing and electrical engineering

So, eight people in total that I communicate with at least once per week. And on top of that, there are other people and services I work with like my landlord, my HR/payroll service, our knowledge base, and tools for tracking inventory. And I'm the only one handling customer support and sales.

Taking that into consideration, it feels more reasonable that I spend most of my time just writing emails to people to ask them to do things. And I need to embrace that even more. Here's how I plan to do that:

**Avoid doing work that my teammates can do.** One of the dumbest things I do now is take on tasks that someone else on the team is already trained and ready to do. Last month, I talked about how [I only have an hour per day to write code](/retrospectives/2021/05/#my-wrongheaded-promotional-experiment). Thinking about it more, I shouldn't even be doing that because my teammates can write code, and I'm falling behind on tasks that *only* I can do.

**Unhoard Michael-only tasks.** There are a few tasks that other people theoretically could do, but they can't in practice because I'm currently the only one with the required access or knowledge. They're primarily things that cross domains or roles, like managing tools that only my local staff uses. Here are some examples in ascending difficulty of outsourcing them to someone else:

* Manage glue code that connects Shopify to our inventory spreadsheet.
* Manage formulas in our inventory spreadsheet.
* Manage scripts that build TinyPilot production images.
* Answer customer support questions.
* Perform final QA testing on TinyPilot releases.

## How is $30k/month not profitable?

I was lamenting recently to my girlfriend that there are likely easy solutions to many of my issues growing TinyPilot. I'm just not aware of them because I'm not in touch with people who run businesses like mine. She asked who I'd want to be in touch with, and I realized I could just think of people and email them.

The first person who came to mind was [Mike Perham](https://www.mikeperham.com/), the founder of Sidekiq. Mike's [interview on Indie Hackers](https://www.indiehackers.com/podcast/016-mike-perham-of-sidekiq) is one of my favorites. I listened to it when I was still an employee at Google, and his business has always stuck with me as the ideal indie software business. He was earning ~$80k/month writing open source software package. Sidekiq appeal to both hobbyist developers, who paid nothing, and enterprise customers, who paid thousands per year. Best of all, customers run Sidekiq on their own machines, so it's nearly impossible for their to be an emergency that demands Mike's immediate attention.

I've never talked to Mike, so I sent him an email introducing myself and asked if he had any advice. Mike responded the next day with several useful pieces of advice, but the part that most stuck out to me was that my profits were more precarious than I realized:

>Get those profits up. A 5% profit margin is not a healthy business to be in. Either get your costs down, massage your prices a bit or find a software-only addon that can be closer to pure profit.

My average revenue is about $30k per month, but I'm barely breaking even.

I haven't done all my bookkeeping for May yet, so let's look at April.

{{<img src="pie-chart.png" maxWidth="700px" alt="Pie chart of TinyPilot expenses" caption="TinyPilot expenses by category" hasLink="false">}}

|                 Category          | Total        |
|-----------------------------------|--------------|
| Raw Materials                     | $15,637.68   |
| Software Contractors              |  $9,331.79   |
| Local Fulfillment Staff           |  $1,460.12   |
| Electrical Engineering Consulting |   $901.25    |
| Office Rent                       |   $550.00    |
| Advertising                       |   $370.00    |
| Lawyer                            |   $270.00    |
| Office Equipment                  |   $233.72    |
| Graphic Design                    |   $169.00    |
| Stickers                          |   $163.63    |
| Cloud Services                    |   $137.33    |
| Misc                              |    $161.21   |

Raw materials isn't so surprising. My profit margin on physical products is generally around 50-60%, so that matches what I'd expect if my revenues are about $30k per month.

Software is the big one that stands out. It accounts for a third of my expenses.

>Why don't you just write the software yourself?

It's not practical for me to write the majority of TinyPilot's software. There are a lot of moving parts. can't really do that at this point. There's too much to manage, so I don't get enough uninterrupted streaks of development time.

>Why don't you just hire cheaper developers?

The developer's I work with are really good. I've worked with developers who aren't as good, and the issue is that they require a lot of management or they drive down the quality of the code, and if they do that for too long, it becomes unmaintainable garbage. The developers I work with now are

So I don't see any opportunity to reduce costs.

## Capturing value from large customers

This is the classic problem of open source. Your software can bring people millions of dollars in value, but if you don't create the right incentives, they'll just use your software and pay you nothing.

I know of at least one large company where they're using dozens of TinyPilots but they're paying nothing.

I asked Mike Perham about this as well. Here was his response:

>Sounds like your license is allowing large customers to walk all over you. This is YOUR code, right? Change your license, e.g. allow hobbyists to use it with one instance for personal use only. The MIT or BSD license is great for giving away code; it's not good to base a business on.

**Offer Enterprise features for TinyPilot.** One of the features that large customers ask for and nobody else does is programmatic access to the TinyPilot. Like, "I want to monitor the remote screen to detect when the target device has crashed and then generate an alert." I'm going to talk to large customers about an Enterprise version of TinyPilot with this functionality for a steep premium. I think something like $50/month would be ridiculous to a home user, but it's an irrelevant amount of money to a Fortune 500 company if it means they don't have to spend weeks rolling their own solution.

**Offer a SaaS add-on.** TinyPilot is easy to use if you're on the same local network as the device, but if customers want to access their TinyPilots from over the Internet, they currently have to rely on third-party solutions. I've floated the idea to several customers of a "TinyPilot Cloud Portal": a secure web interface which gives them remote access to their TinyPilot devices anywhere on the Internet. There's a bit of trickiness here in that I [want to avoid hosting a service where I have to be on-call](/solo-developer-year-3/#you-can-build-a-successful-business-without-being-available-247), but I'm exploring the possibility of working with a vendor that can own the operational portion of the service.

**Talk to a lawyer who specializes in open source licensing.** I haven't done much research into licensing for TinyPilot. I chose the MIT license for the open source version because it seemed like it gave me the most freedom to choose a different license later, whereas other licenses are less flexible once I've received contributions from other people. The ideal license would keep TinyPilot affordable for personal users who can try it at home and then bring it to their employer for a more expensive license in a commercial setting, [similar to Sidekiq](https://github.com/mperham/sidekiq/wiki/Commercial-FAQ).

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Is It Keto](https://isitketo.org)

{{<revenue-graph project="isitketo">}}

| Metric                   | April 2021  | May 2021    | Change                                      |
| ------------------------ | ----------- | ----------- | ------------------------------------------- |
| Unique Visitors          | 56,094      | 49,085      | <font color="red">-7,009 (-12%)</font>      |
| Total Pageviews          | 123,723     | 108,862     | <font color="red">-14,861 (-12%)</font>     |
| Domain Rating (Ahrefs)   | 11.0        | 11.0        | 0                                           |
| AdSense Revenue          | $560.20     | $466.84     | <font color="red">-$93.36 (-17%)</font>     |
| Amazon Affiliate Revenue | $116.78     | $138.99     | <font color="green">+$22.21 (+19%)</font>   |
| **Total Revenue**        | **$676.98** | **$605.83** | **<font color="red">-$71.15 (-11%)</font>** |

Is It Keto continues to run in the background, but I put in a bit of work this month. Many of my Amazon Affiliate links had gone out of date and were pointing to dead links, so I spent a couple of hours fixing those.

It's *so* tempting to go down a rabbit hole of tinkering with Is It Keto, but I think it's better for me to focus on TinyPilot as much as possible.

### [Hit the Front Page of Hacker News](https://hitthefrontpage.com/)

{{<revenue-graph project="htfp">}}

| Metric                    | April 2021  | May 2021    | Change                                     |
| ------------------------- | ----------- | ----------- | ------------------------------------------ |
| Unique Visitors           | 114         | 191         | <font color="green">+77 (+68%)</font>      |
| Gumroad Revenue           | $341.61     | $417.85     | <font color="green">+$76.24 (+22%)</font>  |
| Blogging for Devs Revenue | $109.20     | $0.00       | <font color="red">-$109.20 (-100%)</font>  |
| **Total Revenue**         | **$450.81** | **$417.85** | **<font color="red">-$32.96 (-7%)</font>** |

This course is still making a few sales per month, but I haven't had time to promote it. One of the highlights was that Dan Willoughby [applied the lessons from the course](https://twitter.com/plainice_/status/1398382363386597376) to write [an article](https://tellspin.app/blog/why-interruptions-are-frustrating-to-developers/) that reached the #2 spot on Hacker News.

### [Zestful](https://zestfuldata.com)

{{<revenue-graph project="zestful">}}

| Metric            | April 2021 | May 2021   | Change                                     |
| ----------------- | ---------- | ---------- | ------------------------------------------ |
| Unique Visitors   | 892        | 659        | <font color="red">-233 (-26%)</font>       |
| Total Pageviews   | 2,132      | 1,784      | <font color="red">-348 (-16%)</font>       |
| RapidAPI Revenue  | $40.82     | $32.85     | <font color="red">-$7.97 (-20%)</font>     |
| **Total Revenue** | **$40.82** | **$32.85** | **<font color="red">-$7.97 (-20%)</font>** |

Even though Zestful is still in maintenance mode, last weekend, I published an [official Python package for it](https://pypi.org/project/zestful-parse-ingredient/). It's something I always thought the project should have, but I kept putting it off because I didn't know how to publish PyPI packages. I ended up learning how to do it in March [while playing around with Restic](https://github.com/mtlynch/resticpy), so I figured why not use this new knowledge to make a package for Zestful.

Now, a user can get up and running with Zestful in minutes. Install the package like this:

```bash
pip install zestful-parse-ingredient
```

Then import it and pass it an ingredient:

```python
import json
import parse_ingredient

ingredient = parse_ingredient.parse('2 1/2 tablespoons finely chopped parsley')
print(json.dumps(ingredient.as_dict()))
```

And you'll see JSON output like this:

```javascript
{
  "quantity": 2.5,
  "unit": "tablespoon",
  "product": "parsley",
  "productSizeModifier": null,
  "preparationNotes": "finely chopped",
  "usdaInfo": {
      "category": "Vegetables and Vegetable Products",
      "description": "Parsley, fresh",
      "fdcId": "170416",
      "matchMethod": "exact"
  },
  "confidence": 0.9858154,
}
```

## Wrap up

### What got done?

* Moved TinyPilot's operations from my house to a real office
* Worked with my inventory manager to document all of our processes in Notion.
  * This worked surprisingly well
*

### Lessons learned

* When it comes to documentation, tell don't show
* Do less work directly and free up sufficient time for management
* TinyPilot needs more profits

### Goals for next month

* Publish a new release of TinyPilot.
* Earn $35k in TinyPilot revenue.
* Create a prototype of the TinyPilot Voyager 2, with built-in Power over Ethernet.
