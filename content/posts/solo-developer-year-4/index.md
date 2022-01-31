---
title: My Fourth Year as a Bootstrapped Founder
tags:
- annual review
- blogging
- tinypilot
- is it keto
- zestful
description: Four years ago today, I quit my job as a developer at Google to create my own self-funded software business. This is a review of my fourth year and what I've learned so far about bootstrapping software businesses.
date: '2022-02-01'
hero_image: cover.jpg
custom_css: true
images:
- solo-developer-year-4/og-cover.jpg
---
Four years ago, I [quit my job as a developer at Google](/why-i-quit-google/) to create my own self-funded software business.

For the first few years, all of my businesses flopped. They all operated at a loss, and none of them earned more than a few hundred dollars per month in revenue.

Halfway through my third year, I created a network administration device called [TinyPilot](https://tinypilotkvm.com). It quickly caught on, and it's been my main focus ever since. TinyPilot generated $460k in revenue in 2021, its first full year in operation.

In this post, I'll share what I've learned about being a bootstrapped founder from running TinyPilot and my other businesses this past year.

Previous updates:

* [My First Year as a Solo Developer](/solo-developer-year-1/)
* [My Second Year as a Solo Developer](/solo-developer-year-2/)
* [My Third Year as a Solo Developer](/solo-developer-year-3/)

## My first year of profit

After running in the red for the first few years, this is my first year of profit. I earned $13k in profit for the year. Although TinyPilot generated the vast majority of revenue, most of my profit came from old projects running in the background.

<canvas id="total-finances" style="margin-bottom: 50px;"></canvas>

| Metric         | 2020         | 2021       | Change                                        |
|----------------|--------------|------------|-----------------------------------------------|
| Revenue        | $63,477      | $477,449   | {{<delta-cell>}} |
| Expenses       | -$67,441     | -$464,071   | {{<delta-cell>}} |
| **Net Profit** | **<font color="red">-$3,964</font>** | **<font color="green">$13,379</font>** |  **{{<delta-cell>}}** |

{{<notice type="info">}}

**How can you afford to live on so little money?**

I went into more detail [in my year two retrospective](/solo-developer-year-2/#how-can-you-afford-to-keep-losing-money), but the short answer is: low cost of living, significant savings from my Google days, and passive investment income.

{{</notice>}}

## TinyPilot's second year

{{<img src="tinypilot-screenshot.png" maxWidth="650px" caption="[TinyPilot](https://tinypilotkvm.com) is an open-source KVM over IP device built on the Raspberry Pi" hasBorder="true">}}

TinyPilot is an open-source KVM over IP device built on the Raspberry Pi. It allows you to control another computer from your browser without installing any software, even if the computer has no operating system or network connectivity.

<a href="tinypilot-demo-2.1.2-full.gif" style="display: block; margin: auto 0;"><img src="tinypilot-demo-2.1.2-opt.gif" style="margin: 0 auto; display: block; object-fit: contain; max-width: 630px"></a>

At the start of 2021, I was TinyPilot's sole developer, customer support agent, salesperson, and marketer. The only other employee was my girlfriend, who managed inventory and fulfilled orders. We ran TinyPilot out of our Western Massachusetts home, which was slowly transforming into a TinyPilot warehouse.

Today, TinyPilot has a real office, a two-person fulfillment staff, a team of three developers, and a [distributor in Europe](https://kvm-ip.de).

{{<img src="tinypilot-office.jpg" maxWidth="600px" caption="TinyPilot now has a real office where we assemble products and ship out orders." hasBorder="true">}}

### TinyPilot finances

For most of the year, TinyPilot's sales were inconsistent. We saw big spikes when popular tech reviewers featured TinyPilot, but sales dwindled afterward.

Starting in September, we partnered with a European distributor and refocused our website (more on that [below](#sell-just-one-thing)). Those changes smoothed out our sales and made the business less reliant on luck from external events.

{{<revenue-graph project="tinypilot">}}


| Income/Expense                    | 2020        | 2021      | Change
|-----------------------------------|-------------|-----------|---------
| Sales                             | $53,742     | $459,529  | {{<delta-cell>}}
| Raw materials                     | -$46,143    | -$248,273 | {{<delta-cell>}}
| Software development              | -$1,321     | -$119,015 | {{<delta-cell>}}
| Electrical engineering consulting | -$7,130     | -$28,662  | {{<delta-cell>}}
| Fulfillment staff                 | -$2,570     | -$25,893  | {{<delta-cell>}}
| Web design / branding             | -$250       | -$15,931  | {{<delta-cell>}}
| Cloud services                    | -$64        | -$5,554   | {{<delta-cell>}}
| Office space                      | $0          | -$4,400   | {{<delta-cell>}}
| Advertising                       | -$675       | -$3,633   | {{<delta-cell>}}
| Office equipment                  | $0          | -$2,083   | {{<delta-cell>}}
| Everything else                   | $0         | -$2,738   | {{<delta-cell>}}
| **Net profit**                    | <font color="red">**-$5,681**</font> | <font color="green">**$3,108**</font> | **{{<delta-cell>}}** |

{{<notice type="info">}}
**Note**: Net profit is a little misleading, as it doesn't reflect the additional $59k I have in inventory.
{{</notice>}}

### TinyPilot's software development

For fun, I installed the version of TinyPilot from January 2021 and compared it to our January 2022 release. I was surprised at how much has changed in the last year:

<div style="display: flex; justify-content: center; flex-direction: column; max-width: 100%">
<a href="voyager-1.2.1-hello-world.mp4"><img src="voyager-1.2.1-hello-world.gif" alt="Screen capture of Proxmox install through TinyPilot" class="img" style="max-width: 100%; display: block; object-fit: contain;"></a>
<a href="voyager-2.3.2-hello-world.mp4"><img src="voyager-2.3.2-hello-world.gif" alt="Screen capture of Proxmox install through TinyPilot" class="img" style="margin-top: 2rem; max-width: 100%; display: block; object-fit: contain;"></a>
</div>

Aside from UI changes, we've added several major features, including:

* Mount virtual USB drives and CD-ROMs
* Wake on LAN
* Password-based authentication
* Software updates from the web UI
* Video bandwidth tuning

## Other projects

### *Refactoring English*

In writing this blog for the past five years, I've learned several techniques that have made my writing clearer, more interesting, and more accessible. One of my [2021 goals](/solo-developer-year-3/#publish-six-blog-posts-and-one-book) was to publish a book of everything I've learned for other developers interested in improving their writing.

My great shame of the year is that I made almost no progress on the book.

For the past three years, I've had a routine of writing for an hour every morning. That generally translated to about ten blog posts per year. I thought that if I spent that time on a book instead, I'd finish within the year.

Unfortunately, TinyPilot has its own pace that I don't fully control. For the first few months of 2021, I stuck to writing for an hour in the morning, but I'd end every day behind on TinyPilot. I decided to suspend my writing until TinyPilot required less management, but that never happened.

I'm still excited to write the book, and I hope I have more time for it this year.

### mtlynch.io (this blog)

As with my lack of book-writing time, I had very little blog-writing time. I published three new blog posts, my fewest ever in five years of blogging.

Ironically, the year I found myself most desperate to write was the year I had the least time to do it. There are so many things I've learned for TinyPilot that I wish I could capture while the experience is still fresh, but there just isn't enough time.

I kept my habit of writing [monthly retrospectives](/retrospectives/). I budget time for those because they're unambiguously a net positive for my business, even in the short term. Sitting down to organize my thoughts almost always reveals some flaw in my strategy or a weakness in my plans that I wouldn't have noticed otherwise.

| Metric                                                   | 2020    | 2021    | Change |
|----------------------------------------------------------|---------|---------|--------|
| Pageviews                                                | 719,899 | 479,666 | {{<delta-cell>}}
| Affiliate revenue\*                                      | $1,599  | $0      | {{<delta-cell>}}
| [Illustrations](/how-to-hire-a-cartoonist/)              | -$964   | -$384   | {{<delta-cell>}}
| Hosting / Domain                                         | -$534   | -$306   | {{<delta-cell>}}
| [Editing](/editor/) + [Grammarly](https://grammarly.com) | -$222   | -$140   | {{<delta-cell>}}
| **Net profit**                                           | **<font color="red">-$121</font>** | **<font color="red">-$830</font>** | **{{<delta-cell>}}**

{{<notice type="info">}}

\* I [dropped all affiliate partnerships](https://twitter.com/deliberatecoder/status/1342847048811499523) from this blog at the end of 2020.

{{</notice>}}

### Hit the Front Page of Hacker News

{{<img src="htfp-cover.png" maxWidth="550px" caption="[*Hit the Front Page of Hacker News*](https://hitthefrontpage.com) is my course about blogging for technically sophisticated readers.">}}

At the beginning of the year, I released my first-ever [paid course](https://hitthefrontpage.com). It explained my approach to writing blog posts that gain traction on tech-oriented sites like Hacker News and reddit.

I'm proud of the content, and I've heard positive feedback from customers. A few people credited the course for helping them reach the #1 spot on Hacker News. And it wasn't that I taught them special tricks or gimmicks &mdash; the course helped them improve their writing and better understand which topics resonate with the Hacker News audience.

The course reached $7.5k in sales, which fell disappointingly short of my $20k goal. Had TinyPilot not been so busy, I could have spent more time marketing the course and gotten closer to my target. Still, the experience taught me about creating educational products, and I'd like to do more of that in the future.

{{<revenue-graph project="htfp">}}

| Metric              | 2020     | 2021    | Change
|---------------------|----------|---------|--------
| Purchases           | 29       | 230     | {{<delta-cell>}}
| Revenue             | $0       | $7,483  | {{<delta-cell>}}
| Expenses            | -$983    | -$148   | {{<delta-cell>}}
| **Net profit**      | **-$983** | **$7,335** | **{{<delta-cell>}}**

### Is It Keto

{{<img src="isitketo-screenshot.png" alt="Screenshot of Is It Keto website" hasBorder="True" maxWidth="550px" caption="[Is It Keto](https://isitketo.org) tells readers which foods fit the keto diet.">}}

I started [Is It Keto](https://isitketo.org) in 2018. It's a simple site that tells you whether or not particular foods fit the keto diet. It earns money from Amazon Affiliate links and Google AdSense.

I put the site on the back burner when I started TinyPilot, but it continued to grow on its own in 2021, providing a nice side income of $500-$1k/month. That slowed down around June, as other sites began offering similar content and supplanted Is It Keto in search results.

I considered selling the site but I suspect it's only worth $5-10k. It would probably take 30-60 hours to go through the sales process, and I'd rather spend that time on TinyPilot.

| Metric                                                              | 2020      | 2021      | Change
|---------------------------------------------------------------------|-----------|-----------|--------
| Pageviews                                                           | 1,314,583 | 1,163,745 | {{<delta-cell>}}
| Ad revenue                                                          | $2,934    | $5,252    | {{<delta-cell>}}
| Affiliate revenue                                                   | $2,147    | $2,022    | {{<delta-cell>}}
| Freelance designers and [content writers](/hiring-content-writers/) | -$105     | $0        | {{<delta-cell>}}
| Hosting / domain                                                    | -$241     | -$240     | {{<delta-cell>}}
| **Net profit**                                                      | **<font color="green">$4,753</font>** | **<font color="green">$7,034</font>** | **{{<delta-cell>}}**

### Zestful

{{<img src="zestful-screenshot.png" alt="Screenshot of Zestful website" hasBorder="True" maxWidth="550px" caption="[Zestful](https://zestfuldata.com) is an API that parses recipe ingredients into structured data.">}}

Zestful is a paid service that parses recipe ingredients into structured data. For example, if you give it the string `"2 1/2 tablespoons finely chopped parsley"`, it tells you that the quantity is `2.5`, the product is `parsley`, the preparation step is `finely chopped`, etc.

I created Zestful in 2019 and worked on it for a few months before writing it off as a failure. It attracted clients every few months for one-time bulk parses, but it never generated revenue consistently.

2021 was a gratifying comeback year for Zestful. Starting midyear, I began seeing revenue more regularly. New clients began building on top of Zestful, and old clients increased their usage. It now consistently earns a few hundred dollars per month. In December, it broke $1k for the first time from pay-as-you-go users.

{{<revenue-graph project="zestful">}}

| Metric              | 2020     | 2021   | Change
|---------------------|----------|--------|--------
| Revenue             | $1,889   | $2,495 | {{<delta-cell>}}
| Hosting / domain    | -$112    | -$113   | {{<delta-cell>}}
| **Net profit**      | **$1,777**  | **$2,382**    | **{{<delta-cell>}}**

## Lessons learned

### Sell just one thing

For most of the year, TinyPilot earned a steady $20-30k/month in revenue. The months where there was a sales bump, it was because of positive reviews, mainly on YouTube.

Starting in October, revenues doubled to $40-60k/month. TinyPilot didn't receive any new reviews in that period. In fact, I didn't do any marketing at all in those months.

So, what doubled our sales? I got rid of our product page.

{{<img src="old-product-page.png" alt="Screenshot of old TinyPilot product page, listing Voyager and Hobbyist kit side-by-side" maxWidth="600px" caption="TinyPilot used to offer a variety of products." hasBorder="true">}}

Instead, I focused the website exclusively on my flagship product, the TinyPilot Voyager.

{{<img src="no-catalog.png" alt="Screenshot of TinyPilot website with product catalog removed" hasBorder="True" maxWidth="550px" caption="In October, I removed the product catalog page from TinyPilot and focused on my flagship product.">}}

Sales jumped immediately. At first, I thought it might be a coincidence, but they've stayed in their new range for several months now.

{{<img src="weekly-revenue.png" alt="Graph of TinyPilot weekly revenue, where an increase in revenue immediately follows consolidation to one product" maxWidth="700px" caption="TinyPilot’s weekly sales before and after simplifying the website to sell a single product">}}

I think the change eliminated friction and decision-making from the buying process. Customers didn't always understand what the difference was between the products or whether they needed to buy the accessories.

Now that there's only a single option, the purchase decision reduces to a simple question: do you want this product?

{{<notice type="info">}}
**Note**: I considered taking my strategy a step further and selling zero products. That would logically increase my revenue to infinity, but I didn't want to be greedy.
{{</notice>}}

### Good leadership means helping teammates grow

{{<img src="jason-cohen-usual-saaspects.jpg" alt="Screenshot of Jason Cohen being interviewed on The Usual Saaspects podcast" maxWidth="800px" caption="Jason Cohen (left) speaking to Ch Daniel (right) on [*The Usual Saaspects* podcast](https://youtu.be/Sjs5gEUlZyU?t=3605)">}}

In a [recent interview](https://youtu.be/Sjs5gEUlZyU?t=3605), [WPEngine](https://wpengine.com) founder Jason Cohen described leadership in a way that stuck with me:

>With leadership, yes, you're trying to get the right answers, and goals, and decisions... You're also trying to build a team that's smarter and better, that's themselves making better decisions, themselves are coming up with better answers, themselves have better context...
>
>If you're the only one who can do that in the room, you're a terrible leader. Because that means your team isn't getting better.
>
>**The only way for the organization to succeed is if the team is getting better. And that's your job: to build great teams.**

When I started TinyPilot, I thought good management meant protecting my employees from anything outside their job description. I worked hard to fill gaps outside of my employees' roles so that they had consistent, focused work.

Over time, I realized that my protectiveness limited growth. People enjoy learning and evolving in their careers. If I prevent employees from doing anything beyond their original job, I'm hindering their development.

In October, Eric, a member of TinyPilot's fulfillment staff, said he was interested in increasing his hours, so we decided to share the customer support load I'd been carrying alone. It was something I'd considered before, but I worried that customer support required technical knowledge that only I had.

As soon as Eric began working on the support queue, I realized we should have done it earlier. I overestimated the difficulty of our customers' technical questions. Eric could solve most issues by referring to our help forum and email archives. When he couldn't, he'd just escalate to me. Now, Eric handles about 70% of support emails without me.

Eric was surprised at how much he enjoyed taking over customer service. Talking to our customers has made him feel more invested in the business and gives him more insight into how his work benefits them.

And remember my big insight about [consolidating TinyPilot to a single product](/solo-developer-year-4/#sell-just-one-thing)? That happened the same month that Eric started sharing customer support with me. It's no coincidence. Ceding that task gave me back several hours per week of free time, and that provided space to think critically about the way customers see TinyPilot.

## Grading last year's goals

At the start of last year, I [set three high-level goals](/solo-developer-year-3/#goals-for-year-four).

### Grow TinyPilot to $600k in annual revenue

* **Result**: Quadrupled TinyPilot's monthly revenue, totaling $468k for the year
* **Grade**: B

Okay, my $600k revenue goal turned out to be a tad optimistic. I chose that number in January, when revenue had grown 20-200% for the previous five months. After I announced that goal, TinyPilot's sales shriveled by 50% over the next two months. We recovered, but never with the rapid growth of those first few months.

Still, $468k is nothing to sneeze at. It's possible that different decisions would have brought me to $600k, but nothing stands out as an egregious blunder.

### Publish six blog posts and one book

* **Result**: Published three blog posts and zero books
* **Grade**: D

Writing is one of the things I enjoy most, so I'm disappointed I had so little time for it.

Looking back, I still feel like deprioritizing my writing was the right decision, but I fell short of the goal I set.

### Automate TinyPilot management

* **Result**: Systematized enough of TinyPilot to take a one-week vacation
* **Grade**: B-

I've made a lot of progress in getting myself out of the critical path in TinyPilot's day-to-day operations.

My goal was to be able to take a two-week vacation, and I'm not quite there yet. I took a one-week vacation over the holidays, where I didn't check work email or monitor sales. That went well, though I did have to take a call from FedEx to prevent thousands of dollars of equipment from being sent back to China.

## Goals for year four

### Grow TinyPilot to $1M in annual revenue

I've never invested as much as I want in marketing for TinyPilot. I've been fortunate that the business survives almost exclusively on word of mouth and organic search. The only marketing I've done is sending free units to YouTube creators. That's been successful, but there are tons of marketing channels that I've never explored at all.

I think the right marketing channels could double my current revenue. And if I double to $900k, why not just make it a cool million?

### Manage TinyPilot on 20 hours per week

The times when I enjoy TinyPilot most are when things are running smoothly enough that I have space to think about growth. The least pleasant times are when I have a thousand short-term tasks, and they're too urgent or scattered to delegate.

This year, I'd like to continue systematizing TinyPilot so that everything runs smoothly if I only spend 20 hours per week on management. That would also give me time to write and code, neither of which I do now.

### Ship a new TinyPilot hardware product

TinyPilot's core hardware is a Raspberry Pi single-board computer. The Pi has been fantastic in getting TinyPilot up and running, but we're starting to feel its limitations as we grow.

I plan to work with my electrical engineering vendor to develop a new TinyPilot product. It will eliminate the Raspberry Pi and instead use a custom board that we can optimize for our customers' needs.

## Do I still love it?

When I do these [annual writeups](/tags/annual-review/), I think about whether I still love being a bootstrapped founder. This is the first year where it's difficult to say yes. I still like my job, but it's not as fun and easy as when I was just building unsuccessful software products and blogging about it.

I enjoy feeling like I run a real business. Before TinyPilot, my businesses typically earned less than $500/month. At that scale, I felt too limited by capital. You can't hire skilled roles or pay for expert guidance with $500. I frequently had to solve uninteresting problems simply because my revenue was too small to justify better solutions.

With TinyPilot, there's enough money coming in to hire specialists where it makes sense. I enjoy working with a talented dev team again after three years of coding by myself. I pay $200/month for dev tooling and continuous integration because eliminating that gruntwork is obviously a net positive. In my previous businesses, paying for those tools would consume most of my revenue.

I enjoy having a company culture that matches what I always wanted to see from my employers. Everyone has flexible hours. There are no tight deadlines, so people don't have to compromise on quality. Almost all of our work is asynchronous, so everyone has the space to do [deep, focused work](/book-reports/deep-work/).

The hardest part for me about running a business with thousands of real customers is being responsible for failure. We're a team, but the buck ultimately stops with me. When I ship a bad bug or fail to launch a new product by the date I predicted, I find it painful and personally embarrassing. It's a completely different experience from being a developer at Microsoft or Google, where I shared blame with the people who reviewed and tested my work, and we were all eight layers removed from real customers.

Overall, I'm still happy to be working for myself and hope to sustain it for the rest of my working life.

---

*Cover image by [Loraine Yow](https://www.lolo-ology.com/). Thanks to the [Blogging for Devs community](http://bloggingfordevs.com/) for providing early feedback for this post.*

<script src="/js/chart.js/2.9.4/Chart.min.js"></script>
<script>
const dollarFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
const deltaDollarFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  signDisplay: 'always',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
const numberFormatter = new Intl.NumberFormat('en-US', {
  signDisplay: 'always',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
const percentageFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  signDisplay: 'always',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
function drawTotalFinancesChart() {
  var ctx = document.getElementById('total-finances').getContext('2d');
  ctx.height = 400;
  let revenues = new Map();
  revenues.set(2018, 2262);
  revenues.set(2019, 7254);
  revenues.set(2020, 63477);
  revenues.set(2021, 17920.91 + 459528.53);
  let expenses = new Map();
  expenses.set(2018, 23133);
  expenses.set(2019, 9657);
  expenses.set(2020, 67441);
  expenses.set(2021, 7649.72 + 456420.95);
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from(revenues.keys()).map(x => String(x)),
        datasets: [{
          label: 'Revenue',
          data: Array.from(revenues.values()),
          backgroundColor: 'rgb(57, 57, 255)',
          borderColor: 'rgb(131, 131, 235)',
          fill: false,
        }, {
          label: 'Expenses',
          data: Array.from(expenses.values()).map(x => -x),
          backgroundColor: 'rgb(255, 0, 0)',
          borderColor: 'rgb(255, 130, 130)',
          fill: false,
        }, {
          label: 'Net Profit',
          data: Array.from(revenues.keys()).map(y => revenues.get(y) - expenses.get(y)),
          backgroundColor: 'rgb(0, 255, 0)',
          borderColor: 'rgb(172, 255, 172)',
          fill: false,
          }]
        },
      options: {
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
          label: 'Revenue',
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
function parseMetric(raw) {
  return parseInt(raw.replace(/[$,]/gi, ''));
}
function populateDeltaCell(deltaSpan) {
  // Find the parent <td> element
  let el = deltaSpan.parentElement;
  while (el && !(el instanceof HTMLTableCellElement)) {
    el = el.parentElement;
  }
  deltaCell = el;
  const baseValueRaw = deltaCell.previousElementSibling.previousElementSibling.innerText;
  const newValueRaw = deltaCell.previousElementSibling.innerText;
  const baseValue = parseMetric(baseValueRaw);
  const newValue = parseMetric(newValueRaw);
  let absoluteDelta = newValue - baseValue;
  let percentageDelta = absoluteDelta / baseValue;
  if (absoluteDelta > 0) {
    deltaSpan.classList.add('good-delta');
  } else if (absoluteDelta < 0) {
    deltaSpan.classList.add('bad-delta');
  }
  let absoluteFormatter = numberFormatter;
  if (baseValueRaw.indexOf('$') >= 0) {
    absoluteFormatter = deltaDollarFormatter;
  }
  let isNetProfitRow = deltaCell.previousElementSibling.previousElementSibling.previousElementSibling.innerText === "Net profit";
  if (baseValue <= 0) {
    if (newValue <= 0) {
      if (isNetProfitRow) {
        percentageDelta *= -1;
      } else {
        absoluteDelta *= -1;
      }
    } else {
      percentageDelta = Infinity;
    }
  }
  deltaSpan.innerText = `${absoluteFormatter.format(absoluteDelta)} (${percentageFormatter.format(percentageDelta)})`;
}
document.querySelectorAll('[blog-purpose="delta"]').forEach(populateDeltaCell);
drawTotalFinancesChart();
drawCharts("2022-01");
</script>
