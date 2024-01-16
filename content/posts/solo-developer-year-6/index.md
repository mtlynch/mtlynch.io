---
title: "My Sixth Year as a Bootstrapped Founder"
tags:
  - annual review
  - tinypilot
date: 2024-02-10T00:00:00-05:00
description: Six years ago today, I quit my job as a developer at Google to create my own self-funded software business. This is a review of my last year and what I've learned so far about bootstrapping software businesses.
---

<!-- Disable linter complaints about duplicate headers -->
<!-- markdownlint-disable MD024 -->

Six years ago, I [quit my job as a developer at Google](/why-i-quit-google/) to create my own bootstrapped software company.

For the first few years, all of my businesses flopped. None of them earned more than a few hundred dollars per month in revenue, and they all had negative profits.

Halfway through my third year, I created a device called [TinyPilot](https://tinypilotkvm.com) that allows users to control their computers remotely. The product quickly caught on, and it's been my main focus ever since.

In 2023, TinyPilot earned $200k in profit, a 10x increase from 2022. The business also generated $997k in revenue, which, can we just all agree it's basically $1M?

In this post, I'll share what I've learned about being a bootstrapped founder from my sixth year doing it.

## Previous updates

- [My First Year as a Solo Developer](/solo-developer-year-1/)
- [My Second Year as a Solo Developer](/solo-developer-year-2/)
- [My Third Year as a Solo Developer](/solo-developer-year-3/)
- [My Fourth Year as a Bootstrapped Founder](/solo-developer-year-4/)
- [My Fifth Year as a Bootstrapped Founder](/solo-developer-year-5/)

## Highlights from the year

### TinyPilot became 10x more profitable

{{<revenue-graph project="tinypilot">}}

Show cash profit vs. COGS profit

### My most terrifying moment

One lazy Saturday afternoon in February, I heard a knock on my door. I opened it in my pajamas to see a guy in his mid-forties on my porch.

"Are you the TinyPilot guy?" he asked me.

"Uh oh," I thought.

Was this a disgruntled customer? Was I about to be served a court order by a process server?

"Yes..." I said cautiously.

"I'm the handyman at the office. A pipe burst, and we can't get into your suite. Can you come down?"

I got in my car and did the three-minute drive to the office, wondering if this was the end of my business. We assembled all of our hardware in that office, and we fulfilled all of our orders from there. I had insurance, but I had chosen coverage a year before when we carried lower inventory. And even if insurance paid out, TinyPilot would be dead in the water for three to six months until we could get replacement materials from our overseas manufacturers and start the whole manufacturing pipeline up again.

I got to the building and saw that, as the handyman said, the building was flooded. I walked to the second floor and saw that the carpets were soaked. But I noticed that the water had flowed not from TinyPilot's office but the conference room next door. I opened the door to TinyPilot's office, and everything was bone dry. The water hadn't even trickled past the door.

I breathed a sigh of relief. It seemed like instead of being out $100k and out of commission for a few days, we'd be shut down for maybe a week as they cleaned up the mess and fixed the sprinklers.

On Monday, I called our landlord to ask when we'd be able to get back into the office. He said casually that they were working on it, but we might have to move temporarily because the flood may have damaged our wall. I asked when the move would have to happen, and just as casually, he said it would probably be in the next few days, and he'd let me know.

Normally, being forced to move my entire office on a few days' notice would be disruptive, but it was _especially_ disruptive this week, as I was planning to take a two-week trip out of the country, my longest travel, by far, since starting TinyPilot. How was the team supposed to find a new office and move there while I was away?

Further, the office IT guy was me &mdash; nobody else knew how to set up our router, desktop, or print server if we were to move. And if they can't print shipping labels, they can't fulfill orders.

Fortunately, the landlord had a spare office in the same building, so I had just enough time before I left to move all of our computer equipment and get it set up before I left. And it turned out that they never had to tear down our wall anyway, so when I returned, I just put everything back.

The experience made me never want to be in that situation again, and it illustrated sharply just how much risk I was taking on by managing so much of TinyPilot's operations in a tiny office with just two part-time employees.

### A year of outsourcing

In XX, TinyPilot migrated its fulfillment to a third-party logistics (3PL) warehouse. They took over for

Our fulfillment had always been extremely smooth, which was why it took me so long to outsource it. In the past two years, the team had made maybe three total shipping errors out of about 3,500 orders. We advertised three business days of handling time, but 97% of orders went out within one business day.

When we shifted to the 3PL, we saved less time than I hoped, but it was a major reduction in stress. I didn't realize until we did it how stressful it was to make sure that the office was staffed and nothing was blocking us from fulfilling orders like an Internet outage, a disk failure on the office desktop, etc.

I hired a third part-time employee on a temporary basis. And even with three people, it was tough to keep up with orders.

Getting the new manufacturer up and running took XX months. They've worked out even better than we hoped. Our previous manufacturing partners have all been companies based in China. We found a US-based company with facilities overseas. They've been really hands-on in working with to improve aspects of the product, and they designed a retail box for us.

### TinyPilot looks like a real product now

It's been a 3D-printed case. I'd tried to find people to design a nicer box for the product, but it never came together, and it was never my top priority. But it definitely felt a little amateur that we shipped our product in a plain brown box with the device and all the cables just globbed together in a bubble-wrap pouch.

But now, it looks like a real thing. If someone were to do an unboxing video, I'd be happy to see them open it.

Retail box

Metal case

## Lessons learned

### There's a hidden-stress in being responsible for low-latency responses

Deliberately designed not to be a low-latency business. Nobody carries a pager. Nothing has to happen within minutes.

There's such a big difference between having to make sure the office can run every day to not.

Our responsibility became building enough devicees. And then when we switched over to the manufacturer, the low-latency part became support, and there are fewer single-points of failure. And very few that we manage ourselves.

Two people could be unavailable.

Buffer of about a week's worth of devices.

### As a project matures, more time goes to

I felt frustrated that we were making such slow progress on features and we were getting bogged down with maintenance tasks.

But what's the pattern.

### Encourage my teammates to escalate in parallel

Escalate in parallel. Now I'm stuck holding the baton. The ticket is stuck on me. We try to respond to customers within one business day, so . A lot of the time, they knew the right answer anyway. I was just holding things up to say, "Yes, that sounds reasonable."

I changed the guidance to be that people should do the best they can and escalate to me if they're unsure. They should only stop responding in the cases where they just have no idea.

TODO: Talk about

## Grading last year's goals

Last year, I set [three high-level goals](/solo-developer-year-5/#goals-for-year-four) that I wanted to achieve during the year. Here's how I did against those goals:

### Manage TinyPilot on 20 hours per week

- **Result**: I worked 35-40 hours per week, a reduction from previous years, and traveled more than ever
- **Grade**: B-

It's not 20 hours, but it's . I got married, I attended three conferences. I was out of the office for about five weeks, and things went smoothly.

My workday used to start whenever I woke up, usually 7 or 8am, and end when I ate dinner at 6:30pm, with breaks for breakfast, lunch, and exercise. This year, I moved the end time up to 5:30pm, and . In 2022, it frequently felt like I was ending the day without getting to everything I wanted, whereas in 2023, I frequently felt like I got to everything I needred to.

There were several week-long stretches where I was like, "Here's my emergency number if someone is physially injured or in danger." And fortunately, the phone never rang.

In 2023, I found more time for writing wrote four new blog posts but 15 new "notes" posts, which is what I started doing when I wanted to share something but I didn't want to polish it enough for a blog post.

### Earn $100k in profit

- **Result**: Earned $200k in profit
- **Grade**: A+

This caught me by surprise.

I anticipated spending a lot more on electrical engineering. Last year, I thought we were going to move manufacturing to China, so I thought I'd have to manage that process through my EE vendor. I ended up getting lucky and finding a US-based contract manufacturer with facilities in Vietnam, so I was mostly able to work with them directly rather than needing my EE vendor to bridge the gap.

I also underestimated how much the metal case would increase the value. I didn't experiment much with price before, but we were selling the 3D-printed version for $XX. When I switched to the metal case, I discovered that customers were willing to buy even at a higher price (TODO: link).

### Close the TinyPilot office

- **Result**: We still have the office but it's non-critical
- **Grade**: B

I originally gave our landlord notice that we'd be moving out on XX. Then when things ran late, I asked if we could have another two months. And then I realized we needed to inspect the shipments, and I asked if we could go month-to-month.

So, if a pipe burst in our office tomorrow and destroyed everything, it would be inconvenient, but we'd be fine. The most important thing we do there now is process returns, but we're in the process of handing that job over to our manufacturer.

## Goals for year seven

### Manage TinyPilot on 20 hours per week

### Goal 2

### Goal 3

## Do I still love it?

Every year, when I write these blog posts, I ask myself whether I still love what I'm doing.

I always felt like, "Worse comes to worst, I just go back to working at a big tech company." But now I feel grateful that I'm more protected from layoffs and I've spent the last six years building skills around making money without an employer.

I still prefer working for myself to having an employer. I still feel grateful for the freedom to have my own company. And I still want to do it forever.

---

_Cover image by [Loraine Yow](https://www.lolo-ology.com/). Thanks to my lovely fiancé and the [Blogging for Devs community](https://bloggingfordevs.com/) for providing early feedback on this post._

<script src="/third-party/chart.js/2.9.4/Chart.min.js"></script>
<script src="script.js"></script>
