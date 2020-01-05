---
title: What Got Done - Month 1
description: While figuring out my next project, I launched a different product.
images:
- /retrospectives/2019/06/email-diff.png
date: '2019-06-07'
---

## Highlights

* I launched my [task journaling app](https://whatgotdone.com), but it hasn't attracted many users.
* Interviewing potential customers gave me a good idea for my next project.
* I earned $107 from [Is It Keto](https://isitketo.org) and $123 from [Zestful](https://zestfuldata.com) without working on either.

## Goal Grades

### Publish a minimum viable product version of What Got Done

* **Result**: What Got Done is now [live](https://whatgotdone.com).
* **Grade**: A

I launched What Got Done on [May 24th](https://whatgotdone.com/michael/2019-05-24). It hasn't gained much traction, so I'm debating whether to stick with it or focus on other ideas.

### Meet with 10 potential customers for my next product

* **Result**: Had five customer meetings (<font color="red">50% below target</font>)
* **Grade**: C

I got a bit sidetracked in adding post-launch features to What Got Done, so I had fewer customer interviews than I intended. It's hard to motivate myself to do the necessary-but-unglamorous work of user research when it's so enticing to add features to a fresh product.

### Publish a new blog post

* **Result**: Published ["How to Grow Quickly and Never Turn a Profit"](/keep-growing-never-profit/) on the last day of the month
* **Grade**: B+

I did publish the blog post, but I had to scramble a bit to get it in under the deadline I set for myself. I'm still trying to strike a balance between rushing posts out the door and spending 40 hours editing and re-editing a single post.

## Inactive projects

### Is It Keto

Now that Is It Keto is on the backburner, I'm not going to dive as deeply into its metrics, but here's a summary of the most interesting ones:

| Metric                 | April 2019 | May 2019    | Change                                        |
| ---------------------- | ---------- | ----------- | --------------------------------------------- |
| Unique Visitors        | 7,262      | 10,984      | <font color="green">+3,722 (+51%)</font>      |
| Total Pageviews        | 19,732     | 28,751      | <font color="green">+9,019 (+46%)</font>      |
| Domain Authority (Moz) | 9          | 6           | <font color="red">-3 (-33%)</font>            |
| Ranking Keywords (Moz) | 548        | 949         | <font color="green">+401 (+73%)</font>        |
| **Total Earnings**     | **$82.44** | **$107.25** | **<font color="green">+$24.81 (+30%)</font>** |

It's exciting to see that the site is still growing even though I stopped working on it in March. The growth comes entirely from [delayed gains](/keep-growing-never-profit/#search-engines-have-a-substantial-lag) in search engine rankings.

### Zestful

[Zestful](https://zestfuldata.com), the ingredient parsing service I built last year, earned $123.85 of revenue in May. That's the first time its monthly earnings have been more than a couple of dollars.

Almost the full amount comes from a single customer who needed Zestful for a one-time project, so it's unlikely to repeat for long, but it's fun to get a bit of money back on a project that [cost me ~$8k](/solo-developer-year-1/#zestfulhttpszestfuldatacom).

## What Got Done: business or hobby?

{{< img src="whatgotdone.jpg" alt="What Got Done screenshot" caption="My [What Got Done entry](https://whatgotdone.com/michael/2019-06-07) for last week" maxWidth="800px" >}}

I'm not sure what to do with What Got Done. I built it primarily to get practical experience with [Vue.js](https://vuejs.org/), as learning a web framework was one of my [goals for 2019](/solo-developer-year-1/#goals-for-year-two). As a tool, it's useful for me because I like logging my tasks to close out the week. I never thought it was my most promising business idea, but I figured it wouldn't be that much more work to see if it had potential as a paid product.

Now that I've launched it and found that nobody is interested in paying for premium features, I'm considering two options:

**Option A: Let it be free**: Forget about making money from it and treat it as a tool for myself that others can use, too. If it gains traction on its own, I can later revisit the possibility of selling premium features.

**Option B: Sell harder**: Approach more businesses directly and ask them what prevents them from using it.

Option A is undoubtedly easier. Option B seems unattractive, but I can't tell if it's because I [fear rejection](/shipping-too-late/#did-i-delay-my-launch-to-avoid-rejection) or because I'm rationally evaluating the low likelihood of success and the time it will take away from other projects that I consider more promising.

## Leave no stone unturned

The last retrospective mentioned my idea to write [software for stone quarry operators](/retrospectives/2019/05/#an-app-for-rocks). I was struggling to convince any of the quarries I approached to even speak with me because they didn't understand what I wanted.

In May, I continued reaching out to those quarry owners, and here are the results:

* **Owner A**: Polite but firm "no" after an in-person visit and three calls
* **Owner B**: No response after an in-person visit and four or five calls
* **Owner C**: Finally reached the owners, who were friendly and open to speaking to me (took an in-person visit and three phone calls)

The conversation with Owner C was interesting but made it seem that software for quarry owners wasn't such a hot idea. Here were some of the challenges we discussed (some are specific to this particular quarry):

* The quarry itself has no electricity.
* The quarry and large sections of the surrounding area have spotty cell phone coverage.
* Many of their clients are older and prefer to do things by phone.
  * This makes online ordering a no-go.
* Anything that requires workers to carry around phones/tablets is a non-starter:
  * They primarily use walkie-talkies and have to replace them every 12 months due to dust, drops, or accidental crushing.
  * Workers generally wear gloves, eye protection, and ear protection that make it hard for them to interact with a mobile device.
* There's a lot of gruntwork in filling out forms for legal compliance, but they need paper copies on hand for audits.
  * Workers currently record information on clipboards, which are easy to use and cheap to replace in the event of damage.
  * Having to do it digitally would mean consuming the paper forms from the workers, digitizing them somehow, then printing them out again. This didn't sound appealing to anyone.

The owner was open to the idea of automation, and I tried my darndest to find opportunities to integrate software into her business, but we couldn't find anything that would make sense.

## Taking on Google Docs

Last month, I also [described](/retrospectives/2019/05/#simplifying-the-editing-workflow) an idea for a writing tool that focuses on the editing and review process.

After attending [MicroConf](https://www.microconf.com/), my friend [David Toth](https://twitter.com/jupiterunknown) recommended I reach out to copywriters who spoke at that event, so I emailed some of the speakers. What I didn't realize was that the speakers at MicroConf are a special type of writer known as "conversion copywriters." They specialize in writing sales copy for websites and emails.

This ended up being a happy accident because they weren't the right audience for my initial idea, but they turned out to be promising collaborators for a different idea. Email copywriters don't do much back and forth with their clients, so they didn't have a burning need for better revision tools. But they all struggled to find effective ways of sharing email drafts with their clients. Their projects typically require them to write long sequences of emails, often including emails with alternate versions.

Most of them either use Google Docs or the editing interface of the client's email service provider (e.g., MailChimp or HubSpot). None of these tools are a good match for their workflow, but there's nothing better, so they develop workarounds that involve lots of tedious, manual effort.

Based on these conversations, I made [some sketches](https://www.dropbox.com/sh/b7df1s5z40lqd47/AADgcLG5ZmSPM9HRFwb0llPTa?dl=0) of a possible tool specifically aimed at addressing their pain points.

<figure class="half">
  {{< img src="email-comments.png" alt="Wireframe of feedback view" maxWidth="81%" >}}
  {{< img src="email-diff.png" alt="Wireframe of diff view" >}}
  <figcaption>Possible interfaces for email campaign authoring tool</figcaption>
</figure>

This was my first attempt at applying the "market-first approach" that Rob Walling describes in [*Start Small, Stay Small*](/book-reports/start-small-stay-small/). Instead of creating a product and convincing people to use it, you find a market with an unmet need, then build the product that satisfies their need.

I plan to pursue this idea further this month. The reasons I like it are:

* Conversion copywriters make good money and are willing to buy tools that improve their service.
* Large companies are unlikely to build a competing tool because the market is too niche.
* I can build a minimum viable product in 4-6 weeks and continue expanding it if it gains customers.

{{<notice type="info">}}
If you know an email copywriter who might be interested, please ask them to [email me](/about/). I'd love to speak with them.
{{< /notice >}}

## Wrap up

### What got done?

* Launched [What Got Done](https://whatgotdone.com)
* Published a new blog post: ["How to Grow Quickly and Never Turn a Profit"](/keep-growing-never-profit/)
* Paid in-person visits to three stone quarries for customer research (got one interview)
* Reached out to seven content writers and copywriters for customer research (got four interviews)

### Lessons learned

* It's easier to find customers and ask them what they need than to find customers who need your specific product.
  * Credit: This is the "market-first approach," described in [*Start Small, Stay Small*](/book-reports/start-small-stay-small/)
* Copywriters are more open to cold outreach than quarry owners are.
  * Too small a sample size to generalize much, but I suspect that people in tech-focused jobs are more open to new technology offerings.

### Goals for next month

* Publish a new blog post that explains why I built What Got Done
* Interview six email copywriters about their workflow and pain points
* Create a landing page to begin collecting customer emails for my next product
