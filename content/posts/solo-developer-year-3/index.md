---
title: My Third Year as a Solo Developer
tags:
- annual review
- blogging
- tinypilot
- is it keto
- wanderjest
description: TODO
hero_image: cover.jpg
images:
- code-review-love/og-cover.jpg
date: '2021-02-01'
---

{{<notice type="danger">}}
**Note**: This is a preview of an upcoming blog post. Please do not share this URL.
{{</notice>}}

Today is the third anniversary of me [quitting my developer job at Google](/why-i-quit-google/) to build my own software business. I posted updates at the end of my [first](/solo-developer-year-1/) and [second](/solo-developer-year-2/) years, so it's time for another update.

## The year things clicked into place

In my first two years working for myself, I earned less than $10k total. [My goal](/solo-developer-year-2/#goals-for-year-three) was to end the third year with at least $20k in total revenue.

For the first six months, it looked like I'd fall short. My businesses collectively earned about $300/month, and none of my new ideas were working.

Miraculously, one new product in May turned everything around. By the end of the year, I earned $63k in revenue, far exceeding my goal.

<canvas id="overall-finances"></canvas>

Okay, my net profits are still negative, but this time I have a good excuse!

I sell a physical product now, so my income lags my expenses by two or three months. My profit margins are 50% to 200% per sale, so the numbers will catch up eventually.

{{<notice type="info">}}

**Wait, how can you afford to keep losing money?**

I went into more detail about this [in last year's retrospective](/solo-developer-year-2/#how-can-you-afford-to-keep-losing-money), but the short version is: low cost of living, significant savings from my Google days, and passive investment income.

{{</notice>}}

## Project by project

### [TinyPilot](https://tinypilotkvm.com)

{{<img src="voyager.jpg" maxWidth="550px" caption="[TinyPilot](https://tinypilotkvm.com) is an inexpensive device I created to manage servers remotely">}}

For the past few years, I've done all my software development on a [home server](/building-a-vm-homelab/). It works great, except when I screw up the network configuration or want to install a new operating system. My server has no monitor or keyboard attached, so I have to drag it over to my desk, swap all the cables with my workstation, and then swap everything back when I'm done.

I had read that the Raspberry Pi could masquerade as a USB keyboard, and I knew it could capture video. I wondered if I could turn one of my Raspberry Pis into a little remote administration device. That way, I could plug it into a server, and it would spin up a web interface where I could type in keyboard input and see the server's video output.

After a few months of tinkering, I had a working prototype.

{{<gallery caption="Prototype of TinyPilot, my open source KVM over IP device">}}

{{<img src="win-ubuntu.jpg" alt="Photo of TinyPilot connecting two computers" maxWidth="600px">}}

<a href="tinypilot-bios.gif" style="max-width: 445px"><img src="tinypilot-bios.gif" style="object-fit: contain;"></a>

{{</gallery>}}

Was there even a market for this? I figured I could sell one or two kits per week, so if I made $80 per kit, it would be worth my time packing up and shipping boxes.

Then, I published [a blog post](/tinypilot/) about it.

Immediately, it became clear that this business was different than anything I'd ever done before. It reached the front page of Hacker News and became [one of the top "Show HN" posts](https://bestofshowhn.com/) of all time.

{{<gallery caption="TinyPilot's response on Hacker News and reddit">}}
 {{<img src="tinypilot-hn.png">}}
 {{<img src="tinypilot-reddit.png" hasBorder="true">}}
{{</gallery>}}

Four hours after the blog post went live, customers had purchased all nine of the kits in my inventory. Within a week, the blog post had driven $8.8k in sales.

There was a drop in sales after that initial spike, but TinyPilot has been growing consistently ever since then. I had no experience with shipping a physical product, so I quickly had to learn how to manage inventory, systemetize the order fulfillment process, and work with vendors to make circuit boards and 3D-printed cases.

TinyPilot ended the year with almost $54k in total revenue. In terms of net income, I'm still in the negative, but it's because my costs are front-loaded. My expenses for 2020 include inventory to last me through February 2021.

{{<revenue-graph project="tinypilot">}}

| Income/Expense            | 2020        |
|---------------------------|-------------|
| Sales                     | $53,362     |
| Donations                 | $380        |
| Materials                 | -$XX        |
| EE consulting             | -$7,130     |
| Order fulfillment         | -$2,570     |
| Software development      | -$1,321     |
| Open source contributions | -$1,270     |
| Advertising               | -$675       |
| Graphic design            | -$250       |
| Hosting / Domains         | -$XX        |
| **Net profit**            | **-$XX**    |

### [Hit the Front Page of Hacker News](https://hitthefrontpage.com)

{{<img src="htfp-cover.png" maxWidth="550px" caption="[*Hit the Front Page of Hacker News*](https://hitthefrontpage.com) is my video course about my blogging">}}

In May, I gave an informal presentation to my peer mentorship group called ["How to be a Sort of Successful Software Blogger."](https://decks.mtlynch.io/show-and-tell-2020-05/) I tried to reverse engineer the techniques that made my writing especially successful on sites like Hacker News and reddit. I enjoyed deconstructing my process, but I didn't know what more to do with the material.

Over the course of the year, I saw more and more developers teach what they knew in paid courses. TinyPilot had shown me how powerful it could be to align my blog with my business, so I felt like if people liked my writing, they might buy a course about how I do it.

The course was much harder than I expected. What I planned to be 30-40 hours of work turned into nearly 200. I [released the course](https://hitthefrontpage.com) in January, and the audience turned out to be smaller than I expected, but I'm still proud of the material, and many of the customers who have watched it have told me that it taught them a lot.

| Metric            | 2020        |
|-------------------|-------------|
| Pre-orders            | 29          |
| Pre-order revenue             | $1,431        |
| Private presentations       | $400        |
| Cover design      | -$293        |
| Recording equipment       | -$584        |
| **Net profit**    | **$954**    |

### mtlynch.io (this blog)

I don't think of my blog as a business. I write mainly for enjoyment.

Perhaps because it's not a business, I'd never thought much about strategy before this year. I wrote with an attitude of, "This topic is on my mind right now, so I'm going to write about it and see what happens." Sometimes the post would find an audience, but more often it wouldn't.

My big change in 2020 was thinking more strategically about topics. Before I began any new post, I asked myself two questions:

1. How many readers are interested in this topic?
1. Do I have a way of reaching them?

This small bit of planning made a huge difference in my readership. In 2019, my posts averaged 5,000 readers in their first week. In 2020, this number jumped to 25,000. Eight of my nine blog posts reached the front page of Hacker News, and four of them reached the #1 slot.

| Metric                                      | 2019    | 2020    | Change |
|---------------------------------------------|---------| --------|--------|
| Pageviews                                   | 273,817 | 719,899 | <font color="green">+XX (+XX%)</font>
| Affiliate revenue\*                         | $374    | $1,599     | <font color="green">+$XX (-XX%)</font>
| Development                                 | -$460   | $0      | <font color="green">+$460 (-100%)</font>
| [Illustrations](/how-to-hire-a-cartoonist/) | -$769   | -$964    | <font color="red">+$XX (+XX%)</font>
| Hosting / Domain                            | -$150   | -$XX     | <font color="green">-$XX (-XX%)</font>
| [Editing](/editor/) + [Grammarly](https://grammarly.com)  | -$200    | -$222 | <font color="green">-$XX (-XX%)</font>
| **Net profit**                              | **<font color="red">-$3,835</font>** | **<font color="green">$XX</font>** | <font color="green">+$XX (+XX%)</font> |

\* I [dropped all affiliate partnerships](https://twitter.com/deliberatecoder/status/1342847048811499523) from this blog at the end of 2020.

## Failed projects

### [Is It Keto](https://isitketo.org)

{{<img src="isitketo-screenshot.png" alt="Screenshot of Is It Keto website" hasBorder="True" maxWidth="550px" caption="[Is It Keto](https://isitketo.org) tells readers which foods fit the keto diet.">}}

I started [Is It Keto](https://isitketo.org) in 2018. It's a simple site that tells you whether or not certain foods fit the keto diet.

I gave up on it in 2019 but [came crawling back](/retrospectives/2020/05/) in April 2020 after several of new business ideas flopped. Is It Keto was profitable, but barely. It earned less than $0.01 per visitor, so it needed a drastic increase in visitors and/or earnings.

{{<revenue-graph project="isitketo">}}

To scale growth, I tried to automate article-writing. For all of Is It Keto's life, each article was 100% original and custom-written by me or [writers I hired](/hiring-content-writers/). In reviewing my existing articles, I noticed a consistent structure and patterns that I could abstract into templates. Plugging in the right food name, photos, and nutritional information would allow the site to auto-generate articles.

{{<img src="isitketo-template.png" caption="Creating Is It Keto articles programmatically from templates">}}

At first, it seemed like this would allow me to add hundreds of articles per week, but I found it harder than I expected to auto-generate content while still maintaining accuracy and quality. In two months, I only managed to add 118 articles. The more templates I added, the faster I could go, but this strategy attracted too few additional users to make it worthwhile.

The other idea came from my friend [Justin Vincent](http://nugget.one/jv), who was flabberghsted to hear that I was earning so little from 73k pageviews per month. He recommended that I build a paid sister product and use Is It Keto to generate a stream of qualified leads. I tested a few landing pages for paid keto communities and apps, but only 0.1% of visitors [signed up for more information](/retrospectives/2020/07/#validating-keto-product-ideas). Around this time, TinyPilot began taking off, so I once again put Is It Keto on the backburner.

| Metric                                      | 2019    | 2020      | Change |
|---------------------------------------------|---------|-----------|---------|
| Pageviews                                   | 521,913 | 1,314,583   | <font color="green">+XX (+XX%)</font>
| Ad revenue                                  | $940    | $2,934         | <font color="green">+$XX (+XX%)</font>
| Affiliate revenue                           | $1,315  | $2,147      | <font color="green">+$XX (+XX%)</font>
| Meal plan sales\*                           | $24     | $18          | <font color="green">+$XX (+XX%)</font>
| Freelance designers and [content writers](/hiring-content-writers/) | -$3,845 | $0     | <font color="green">$3,845 (-100%)</font>
| Hosting / domain                            | -$103   | XX          | <font color="red">+$XX (+XX%)</font>
| **Net profit**                              | **<font color="red">-$1,882 </font>**  | **<font color="green">$XX</font>** | <font color="green">$XX (+XX%)</font>

\* I gave up on these in January 2020

### [WanderJest](https://wanderjest.com)

{{<img src="wanderjest-feb-2020.jpg" alt="Screenshot WanderJest website" hasBorder="True" maxWidth="600px" caption="[WanderJest](https://wanderjest.com) helps comedy fans find live comedy shows nearby.">}}

WanderJest was a short-lived project I started at the beginning of the year. I described it as "Bandsintown, but for comedy."

I love live comedy, but I've missed countless opportunities to see a comedian perform near me because I'm not on the right mailing list, not following the right social media account, or not checking Ticketmaster at the right time. WanderJest was going to solve that by aggregating together show listings from as many sources as possible.

My plan was to earn money through affiliate deals with theaters, but nobody ever used my discount codes. Once COVID hit, I [shuttered the site](/retrospectives/2020/04/#putting-wanderjest-on-hold).

### [Portfolio Rebalancer](https://assetrebalancer.com/)

{{<img src="rebalancer-screenshot.png" alt="Screenshot of Is It Keto website" hasBorder="True" maxWidth="550px" caption="[Portfolio Rebalancer](https://assetrebalancer.com/) helps passive investors manage their investments.">}}

My investment portfolio is 45% US stock, 35% bonds, and 20% international stocks. As market prices fluctuate, the balance of my investments change, so I have to move money around to get back to my target ratios. This involves tediously plugging numbers into a spreadsheet until everything looks right.

I quickly put together a simple web app that automated the process and began sharing the tool on reddit, my blog, and through Google ads. The tool attracted 1,000 visitors in its first month, but only one person was interested enough to sign up for the free trial. They decided not to upgrade to a paid plan. I was never that confident in the idea, so I [moved on](/retrospectives/2020/05/#portfolio-rebalancer-has-lots-of-visitors-but-no-sales).

## Lessons learned

### Product-market fit is magic

Finding "product-market fit" means building a product and connecting to enough customers to make your business viable. When founders talk about achieving product-market fit, they describe it in the same breathless tone as finding true love. Now, I understand why.

The first two and a half years of working on my own, I was grinding away and growing, but it would take hundreds of hours to earn an extra $100/month. Other times, I'd [make a big sale](/retrospectives/2020/01/#zestfulhttpszestfuldatacom) but fail to replicate it.

TinyPilot was product-market fit at first sight. As soon as I published the blog post, I knew.

The experience has been completely different than with anything else I've built. It feels like the product drives the business, and I'm just along for the ride. There have been several months where I felt like I made critical mistakes in managing the business, and it continued growing anyway. It's a good enough match for what customers want that there's still room for huge blunders.

### You can build a successful business without being available 24/7

I still have a vivid memory of a show I saw at the [UCB comedy theater](https://ucbtheatre.com/) in late 2017. I don't recall anything about the performance. All I remember is worrying that the pager in my pocket could go off at any moment and force me to rush home.

My team at Google had an "on-call rotatation," which meant that you had to carry a pager at all times for two weeks every two months. If the pager went off, you had to be "fingers on keyboard" within 30 minutes.

When I left Google, I was unsure of many things about my future, but I was certain of one thing: I'm never carrying a pager again. I've refused to entertain any business idea where an outage would be A Big Deal.

Around the two year mark, thoughts began creeping into my mind that *this* was the thing holding me back. Other founders were building services that promised constant availability, so why should I expect to succeed with anything less?

Fortunately, bootstrapped founder extraordinare Jason Cohen told me to keep doing what I'm doing. Well, he didn't tell *me* exactly, but it felt like he was speaking directly to me. At [the 32-minute mark](https://youtu.be/otbnC2zE2rw?t=1962) of his excellent talk, ["Designing the Ideal Bootstrapped Business,"](https://www.youtube.com/watch?v=otbnC2zE2rw) Cohen pointedly discourages founders from creating "real-time" businesses. He explained that if you're a self-funded small business, you can't afford to be so available that customers can wake you up in the middle of the night.

<div style="max-width: 600px; display: block; margin: 0 auto;">

{{<youtube id="otbnC2zE2rw" title="Designing the Ideal Bootstrapped Business">}}

</div>

 I'm so glad I didn't cave to the pressure. TinyPilot is about as far from "real-time" as it gets. Customers run my software on their own hardware, so I could shut down every server and delete every code repository, and TinyPilot customers could happily continue using their devices uninterrupted, forever.

### Success is more stressful than failure

Even though TinyPilot doesn't require constant availability, my brain often forgets that.

After my big launch, I couldn't sleep for two days. After mailing out all nine devices to my customers, I was terrified of what could happen next. What if everyone got their devices, and none of them worked? What if there was some horrible bug that destroyed people's servers?

{{<img src="first-9.jpg" maxWidth="400px" caption="Just after packing my first nine TinyPilot orders">}}

Happy reports from customers began pouring in days later, so I relaxed and took pleasure in the success. But every few weeks, something new would pop up to worry me for days. A shipment of parts I needed got stuck in customs. A positive review drove a surge of customers and cleared out my inventory. I filled out an international invoice and wondered if I made any paperwork mistakes that would send me to export jail.

Realistically, the pressure I feel is all self-imposed. If I'm out of stock for a few days, who cares? In the rare event that I ship an order late, I feel anxious about disappointing the customer, but nobody's ever gotten upset. In fact, when I apologize that a shipment is delayed, customers only ever reply back to say they're impressed I took the time to let them know.

I've been getting better at easing the pressure on myself and separating work from life, but it's an ongoing process. The things I've found most helpful are systems that allow me to disconnect and avoid work emails outside of work hours.

## Grading last year's goals

At the start of last year, I [set three high-level goals](/solo-developer-year-2/#goals-for-year-three).

### Earn $20k in revenue across my businesses

* **Result**: Earned $XX in revenue
* **Grade**: A+

It looked bleak at the beginning, but I far exceeded my goal. Considering my 2019 revenue was only $7.2k, this year's $XXk feels like a major accomplishment.

### Publish 10 blog posts

* **Result**: Published nine blog posts
* **Grade**: A-

I was on track to publish 10 posts, but I decided to skip my tenth post in order to make [my video course](https://hitthefrontpage.com). Nevertheless, I'm pleased with the results of my blogging this year.

### Learn one new technology

* **Result**: Learned more JavaScript
* **Grade**: B-

I was hoping to find an excuse to learn Rust, but I never found a good match.

Instead, I gained breadth and depth in JavaScript. I already knew Vue, but this year I learned Gridsome, a Vue-based static site generator. I used it to build [my TinyPilot sales site](https://tinypilotkvm.com) and [rewrite Is It Keto](https://whatgotdone.com/michael/2020-04-17).

I also learned to use plain JavaScript more effectively. TinyPilot's web app [is pure JavaScript](https://github.com/mtlynch/tinypilot/tree/bf07bfe72941457cf068ca0a44c6b0d62dd9ef05/app/static/js) with no build or compilation steps. It's astonishing how much complexity that eliminates.

## Goals for year four

### Grow TinyPilot to $600k in annual revenue

Okay, as crazy as it sounds to go from a goal of $20k to $600k, I think this is achievable. TinyPilot earned over $40k in January, so I'd have to grow an average of 4% per month to reach a $600k annual total.

### Publish six blog posts and one book

Ever since I began working for myself, I've distantly fantasized about self-publishing a book. This year, I'm finally going to do it.

The book will teach software developers practical ways to improve their writing. The tentative title is [*Refactoring English: Effective Writing for Software Developers*](https://refactoringenglish.com) (TODO: put up landing page).

### Automate TinyPilot management

My girlfriend works with me part-time on TinyPilot, managing inventory and packing orders. We enjoy working together, but it's a fragile system that scales poorly. If either of us can't work for a few days, we quickly accumulate a massive backlog.

I'd like to systematize and outsource enough of our processes that we can take a two-week vacation and let the business run on its own.

## Closing thoughts

Before I quit my job, I was constantly reading books and listening to podcasts about startups. The part that felt most exhilerating to me were the infinite possibilites.

When you run your own business, you can do *anything*. You can focus on the product, marketing, sales, or a dozen other things. And within those categories, there are infinite subcategories: which part of your product do you focus on? What type of marketing will work best?

Like many software developers, I enjoy systems and experiments. I loved the idea of having these tools at my disposal: marketing, , and putting them together to earn money.

With any fantasy, you figure it's never going to be as fun as you expect. For me, running a successful business actually is as exciting as I imagined. Stressful, but fun.

Once again, I feel incredibly fortunate to be working for myself, and I hope I can continue for as long as possible.

---

*Thanks to [Monica Lent](https://monicalent.com/) and the [Blogging for Devs community](http://bloggingfordevs.com/) for providing early feedback for this post.*

<script src="/js/chart.js/2.9.4/Chart.min.js"></script>
<script>
const dollarFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
function drawChart(chartId, labels, data) {
  const ctx = document.getElementById(chartId);
  if (!ctx) {
    return;
  }
  ctx.height = 300;
  const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Earnings',
          data: data,
          backgroundColor: '#047a15',
          borderColor: '#4ba658',
          fill: false,
          lineTension: 0.0,
          }]
        },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            label: function(tooltipItems) {
              return dollarFormatter.format(parseFloat(tooltipItems.yLabel));
            },
          },
        },
        scales: {
              yAxes: [{
                  ticks: {
                    suggestedMin: 0,
                      callback: function(value) {
                          return dollarFormatter.format(value);
                      }
                  }
              }]
          }
      },
  });
}
// Parse a date string like "2020-05" into a JavaScript Date object.
function parseDate(d) {
  const dateParts = d.split('-');
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1;
  return new Date(year, month);
}
function drawCharts(limit) {
  fetch('/data/project-revenue.json')
    .then(res => res.json())
    .then(revenueByProject => {
      const limitDate = parseDate(limit);
      for ([project, data] of Object.entries(revenueByProject)) {
        let dates = [];
        for (d of Object.keys(data)) {
          const date = parseDate(d);
          if (date >= limitDate) {
            continue;
          }
          dates.push(date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear());
        }
        let values = Object.values(data).slice(0, dates.length);
        drawChart(project + '-revenue', dates, values);
      }
    });
}
function drawOverallChart() {
  const ctx = document.getElementById("overall-finances");
  if (!ctx) {
    return;
  }
  ctx.height = 500;
  const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          datasets: [
            {
              label: 'Net Profit',
              data: [-20871, -2402, -3964],
              type: 'line',
              backgroundColor: 'black',
              borderColor: 'black',
              pointBorderColor: 'black',
              pointBackgroundColor: 'black',
              fill: false,
            },
            {
              label: 'Expenses',
              data: [-23133, -9657, -67441],
              backgroundColor: 'red'
            },
            {
              label: 'Revenue',
              data: [2262, 7254, 63477],
              backgroundColor: '#047a15'
            }
          ],
          labels: ['2018', '2019', '2020']
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            label: function(tooltipItems) {
              return dollarFormatter.format(parseFloat(tooltipItems.yLabel));
            },
          },
        },
        scales: {
              yAxes: [{
                  ticks: {
                    suggestedMin: 0,
                      callback: function(value) {
                          return dollarFormatter.format(value);
                      }
                  }
              }]
          }
      },
  });
}
drawOverallChart();
drawCharts("2021-01");
</script>
