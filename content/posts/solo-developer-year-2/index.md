---
title: My Second Year as a Solo Developer
tags:
  - annual review
  - blogging
  - zestful
  - is it keto
  - wanderjest
  - what got done
date: "2020-01-31"
images:
  - solo-developer-year-2/cover.jpg
description: Two years ago, I quit my developer job at Google to build my own software business. A year later, I posted an update about my finances, happiness, and lessons learned. Today marks the end of my second full year, so it's time for another update.
discuss_urls:
  hacker_news: https://news.ycombinator.com/item?id=22201337
  reddit: https://redd.it/ewp2rw
---

{{<img src="cover.jpg" alt="My second year as a solo developer (cover image)">}}

Two years ago, I [quit my developer job at Google](/why-i-quit-google/) to build my own software business. A year later, I [posted an update](/solo-developer-year-1/) about my finances, happiness, and lessons learned. Today marks the end of my second year, so it's time for another update.

## How I made and spent money

<canvas id="myChart" style="margin-bottom: 50px;"></canvas>

<script src="/third-party/chart.js/2.9.4/Chart.min.js"></script>
<script>
var ctx = document.getElementById('myChart').getContext('2d');
ctx.height = 400;
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [{
        label: 'Revenue',
        data: [
          20.08,
          33.15,
          68.83,
          81.11,
          193.58,
          94.12,
          278.12,
          999.37,
          513.47,
          460.64,
          167.84,
          4343.83,
        ],
        backgroundColor: 'rgb(57, 57, 255)',
        borderColor: 'rgb(131, 131, 235)',
        fill: false,
      }, {
        label: 'Expenses',
        data: [
          -926.05,
          -1967.04,
          -1710.88,
          -702.41,
          -502.31,
          -473.16,
          -134.82,
          -227.16,
          -697.33,
          -384.58,
          -1384.61,
          -546.26,
        ],
        backgroundColor: 'rgb(255, 0, 0)',
        borderColor: 'rgb(255, 130, 130)',
        fill: false,
      }, {
        label: 'Net Profit',
        data: [
          -905.97,
          -1933.89,
          -1642.05,
          -621.30,
          -308.73,
          -379.04,
          143.30,
          772.21,
          -183.86,
          76.06,
          -1216.77,
          3797.57,
        ],
        backgroundColor: 'rgb(0, 255, 0)',
        borderColor: 'rgb(172, 255, 172)',
        fill: false,
        }]
      },
    options: {
      tooltips: {
        callbacks: {
          label: function(tooltipItems) {
            let original = parseFloat(tooltipItems.yLabel).toLocaleString();
            if (original[0] === "-") {
              return " -$" + original.substring(1);
            }
            return " $" + original;
          },
        },
      },
      scales: {
            yAxes: [{
                ticks: {
                    callback: function(value) {
                        return '$' + value;
                    }
                }
            }]
        }
    },
});
</script>

| Metric         | 2018                                  | 2019                                 | Change                                         |
| -------------- | ------------------------------------- | ------------------------------------ | ---------------------------------------------- |
| Revenue        | $2,262                                | $7,254                               | <font color="green">+$4,992 (+220%)</font>     |
| Expenses       | $23,133                               | $9,657                               | <font color="green">-$13,477 (-58%)</font>     |
| **Net Profit** | **<font color="red">-$20,871</font>** | **<font color="red">-$2,402</font>** | **<font color="green">+$18,469 (+88%)</font>** |

My second year was a huge improvement financially. I increased profits by $18.5k!

Overall, I still lost money, but try not to get too hung up on that. I tripled revenue to $7.2k and cut expenses by more than half.

## How can you afford to keep losing money?

My long-term unprofitability often perplexes people. They assume I fund my money-losing endeavors with freelance work, but the truth is that 100% of my working hours go into my non-lucrative businesses. This is possible due to three main factors:

- **Low expenses**: I have no children and [live in an inexpensive area](/solo-developer-year-1/#so-i-bought-a-house) where my costs are ~$2k/month.
- **High savings**: It's hard to work for big software companies for 11 years without building a decent nest egg.
- **Lucky investments**: Throughout my career, most of my money has been in the S&P 500 during periods of especially strong market runs. My small bets on [cryptocurrency](/tags/sia/) also paid off well.

## Project by project

### [Zestful](https://zestfuldata.com)

{{<img src="zestful-screenshot.png" alt="Screenshot of Zestful website" has-border="true" max-width="550px" caption="Zestful is a SaaS for parsing recipe ingredients.">}}

Zestful launched in mid-2018 as my first attempt at a software-as-a-service (SaaS) business. It allows food apps to recognize the structure of recipe ingredients. Given an ingredient like, "2 1/2 tablespoons finely chopped parsley," Zestful infers that `2.5` is the quantity, `tablespoons` is the unit of measure, `parsley` is the product, and `finely chopped` is a preparation step.

After earning [a big fat zero](/solo-developer-year-1/#zestfulhttpszestfuldatacom) last year, Zestful finally realized significant revenue throughout 2019. [A single enterprise sale in December](/retrospectives/2020/01/#zestfulhttpszestfuldatacom) accounted for 79% of its annual revenue. That sale also represented 53% of total revenue across all my businesses.

| Income/Expense | 2018        | 2019        | Change                                      |
| -------------- | ----------- | ----------- | ------------------------------------------- |
| Sales          | $0          | $5,022      | <font color="green">+$5,022 (+inf%)</font>  |
| Hosting        | -$164       | -$80        | <font color="green">-$84 (-51%)</font>      |
| Domains        | $-50        | -$12        | <font color="green">-$38 (-76%)</font>      |
| Logo Design    | $-200       | $0          | <font color="green">-$200 (-100%)</font>    |
| Development    | -$7,440     | $0          | <font color="green">-$7,440 (-100%)</font>  |
| **Net profit** | **-$7,854** | **$4,930‬** | <font color="green">+$12,784 (+162%)</font> |

{{<img src="zestful-seo.jpg" alt="Screenshot of Zestful's appearances in Google search results" has-border="true" max-width="400px" align="right" caption="My efforts to keep Zestful relevant in search results">}}

Zestful is in a strange position because companies who parse ingredients [never want to switch to Zestful](/shipping-too-late/#the-harsh-reality). The cost of migrating to a new API outweighs potential price and performance improvements. Instead, all of Zestful's customers are companies building a brand new product.

How do you sell to companies if they don't even exist yet? My strategy has been to invest in search engine optimization so that Zestful ranks highly for queries like "ingredient parsing."

### [Is It Keto](https://isitketo.org)

{{<img src="isitketo-screenshot.png" alt="Screenshot of Is It Keto website" has-border="true" max-width="550px" caption="Is It Keto is a reference site for followers of the keto diet.">}}

Is It Keto gives readers clear, straightforward answers about which foods are compatible with [the keto diet](https://en.wikipedia.org/wiki/Ketogenic_diet). It generates revenue through Google AdSense display ads and receives commission for every Amazon purchase through the site.

| Income/Expense                              | 2018                                  | 2019                                 | Change                                         |
| ------------------------------------------- | ------------------------------------- | ------------------------------------ | ---------------------------------------------- |
| Pageviews                                   | 16,208                                | 521,913                              | <font color="green">+505,705 (+3,120%)</font>  |
| Food corpus size                            | 53                                    | 202                                  | <font color="green">+149 (+281%)</font>        |
| Amazon Affiliate revenue                    | $1                                    | $1,315                               | <font color="green">+$1,314 (+131,400%)</font> |
| Google AdSense revenue                      | N/A                                   | $940                                 | <font color="green">+$940 (+inf%)</font>       |
| Meal plan sales                             | N/A                                   | $24                                  | <font color="green">+$24 (+inf%)</font>        |
| [Content writing](/hiring-content-writers/) | $0                                    | -$3,845                              | <font color="red">+$3,845 (+inf%)</font>       |
| Social media management                     | $0                                    | -$314                                | <font color="red">+$314 (+inf%)</font>         |
| Graphic design                              | -$211                                 | -$163                                | <font color="green">-$48 (-23%)</font>         |
| Development                                 | -$1,660                               | $0                                   | <font color="green">-$1,660 (-100%)</font>     |
| Hosting                                     | $0                                    | -$103                                | <font color="red">+$103 (+inf%)</font>         |
| Domain                                      | -$12                                  | -$12                                 | -                                              |
| **Net profit**                              | **<font color="red">-$1,882 </font>** | **<font color="red">-$2,158</font>** | <font color="red">-$276 (-15%)</font>          |

At $2.3k of revenue, Is It Keto was my second-highest-grossing product for 2019. I [abandoned the site in April](/retrospectives/2019/04/) but [came back four months later](/retrospectives/2019/09/) after realizing that it had grown by itself without me.

{{<img src="isitketo-pageviews.jpg" alt="Graph of Is It Keto pageviews increasing each month until flattening out in August" has-border="true" max-width="650px" caption="Is It Keto traffic by month">}}

88% of Is It Keto's visitors come from search engines, but I've never been able to connect improvements in search traffic to any change I made to the site. There were months when I added lots of content, [optimized page titles](/retrospectives/2019/09/#taking-affiliate-revenue-advice-from-reddit), and [earned high-ranking backlinks](/retrospectives/2019/09/#finally-a-backlink-for-is-it-keto), yet traffic remained flat. Other times, I ignored the site for months, and Google traffic grew the entire time.

Is It Keto was also my biggest expense, as I outsourced much of the writing. That cost me more than it should have because I knew nothing about hiring and managing writers, but the experience taught me a lot and led to my widely ignored [guide to hiring content writers](/hiring-content-writers/).

### mtlynch.io _(this blog)_

| Metric                                                                  | 2018                                 | 2019                                 | Change                                    |
| ----------------------------------------------------------------------- | ------------------------------------ | ------------------------------------ | ----------------------------------------- |
| Pageviews                                                               | 981,587                              | 273,817                              | <font color="red">-707,770 (-72%)</font>  |
| Affiliate revenue                                                       | $1,244                               | $374                                 | <font color="red">-$870 (-70%)</font>     |
| Development                                                             | -$3,896                              | -$460                                | <font color="green">-$3,436 (-88%)</font> |
| [Illustrations](/how-to-hire-a-cartoonist/)                             | -$599                                | -$769                                | <font color="red">+$170 (+28%)</font>     |
| Hosting                                                                 | -$309                                | -$150                                | <font color="green">-$159 (-51%)</font>   |
| [Grammarly](https://grammarly.com) (Grammar and style checking service) | -$140                                | -$140                                | -                                         |
| [Editing](/editor/)                                                     | -$75                                 | -$60                                 | <font color="green">-$15 (-20%)</font>    |
| Domain                                                                  | -$60                                 | -$60                                 | -                                         |
| **Net profit**                                                          | **<font color="red">-$3,835</font>** | **<font color="red">-$1,265</font>** | <font color="green">+$2,570 (+67%)</font> |

Pageviews are down substantially, which is unsurprising. My [quitting Google post](/why-i-quit-google/) received 500k pageviews in 2018, so I didn't expect to land another smash hit like that.

Still, I struggled to find readers last year. Throughout the preceding two years, many of my posts became popular without me trying very hard to promote them. I'd write the article then find an appreciative community to share it with afterward.

In 2019, I branched out from technical writing and focused more on the struggles of running a bootstrapped business. Even though there are plenty of online communities for bootstrappers, they attract self-promoters, so the groups are less welcoming to off-site blog posts. I've also noticed that readers are less interested in business lessons unless the story involves thousands of dollars &mdash; earning or losing large sums both seem to work.

Blog revenue is also down, which is fine because I don't go out of my way to earn money from this blog. My development costs fell dramatically because the site's freelancer shifted focus to his full-time job. Rather than hiring someone else, I've taken over development myself, as my web programming skills have improved over the last couple of years.

### What Got Done

{{<img src="whatgotdone-screenshot.png" alt="Screenshot of What Got Done website" max-width="550px" caption="What Got Done is a task journaling app.">}}

What Got Done is a tool for recording and sharing weekly work accomplishments. It's [a technique that I learned](/status-updates-to-nobody/) while working at Google, and I've been using it to record [my progress](https://whatgotdone.com/michael) every week for the last 10 months.

| Income/Expense      | Amount   |
| ------------------- | -------- |
| Customer interviews | -$31     |
| Domain              | -$12     |
| **Net profit**      | **-$43** |

I never thought What Got Done was a brilliant business idea, but [months of failing to turn a profit on Is It Keto](/keep-growing-never-profit/) left me feeling frustrated. What Got Done seemed like a fun project to cheer me up and an opportunity to teach myself [Vue.js](https://vuejs.org/), a popular web framework.

And it worked! I love Vue. I've finally found a tool that lets me build websites quickly without struggling through a maze of leaky abstraction.

As long as I was building What Got Done, I figured that it was worth exploring whether the site could make money. After interviews with several companies, it seemed that managers felt that they could [accomplish the same results with a dedicated Slack channel](/retrospectives/2019/08/#why-use-what-got-done-when-we-have-slack), so I moved on.

### Everything Else

| Expense                                        | Purpose                 | Amount  |
| ---------------------------------------------- | ----------------------- | ------- |
| Conferences                                    | Networking and training | -$2,182 |
| [Xero](https://xero.com/)                      | Bookkeeping             | -$151   |
| Bench to Xero migration (freelance accountant) | Bookkeeping             | -$232   |
| [Circle CI](https://circleci.com)              | Continuous integration  | -$350   |
| [Coveralls](https://coveralls.io)              | Test coverage tracking  | -$270   |

Conferences were a hefty expense because travel and lodging are expensive, and the conferences that accepted my speaking proposals were regional events with minimal travel assistance budgets.

Switching from Travis to Circle for continuous integration reduced my expenses by $68/month, which worked out great because it turned out that I love Circle. They improve their product faster and integrate better with Docker. Coveralls unfortunately auto-renewed without me consciously choosing to do so. I've since accepted that code coverage metrics have little value for early-stage products and canceled for next year.

I also switched from managed bookkeeping with [Bench](https://bench.co) to self-serve bookkeeping with Xero. I enjoyed Bench and have no love for Xero, but it was hard to justify an extra $1.5k/year for concierge bookkeeping when my finances were so simple and repetitive.

## Lessons learned

### Raise prices, even if nobody's buying

One of the best pieces of [advice I received](/retrospectives/2019/07/#suddenly-everyone-wants-to-parse-ingredients) this year was from [Cory Zue](https://coryzue.com). He suggested that at $0.003 per request, my prices for Zestful were too low. At the time, Zestful had almost zero paid users. How could my prices be too low if nobody was buying?

Though Zestful had few real customers, it had many _prospective_ customers. Every few weeks, a new company contacted me saying that they were interested in Zestful, but it was missing one tiny feature they absolutely needed. Desperate to win my first big client, I'd work feverishly to implement the functionality they wanted. A week later, I'd proudly deliver it to them.

"Oh, yeah," they'd reply sheepishly. "That was for a project we decided not to pursue."

It cost these companies nothing to ask for features, but it was extremely time-consuming for me to meet with them and implement their wishlist. I recognized what was happening but couldn't figure out a way to stop it. Ignoring the request was an option, but what if they genuinely were prepared to spend thousands per month?

When I took Cory's advice and raised prices, it changed the conversation in an unexpected way. At $0.003 per request, nobody tried to negotiate with me on price. When my rates jumped by 6.5x to $0.02 per request, everyone started asking about volume discounts. Then, when they claimed they'd buy after Zestful had their pet feature, I gave them this line:

> Great! You can pre-pay for three months of service, and your billing cycle won't start until that feature is available.

I've never been burned on a feature request since.

My prices are high enough that most customers have to spend a few hundred dollars each month to use Zestful, which discourages people from telling me about the all-important features I'd have to implement to earn their $5/month. Interestingly, the customers who ended up purchasing enterprise plans had no feature requests, and those deals closed in a matter of days.

### Pursuing the right idea means rejecting the wrong ones

My first year as a founder, I was a puppy chasing any ball that happened to roll by. If one of my projects failed to achieve traction, I'd work on whatever idea was next in my mental queue. Building a "quick" prototype felt cheap and easy at a project's outset, but it always took weeks of coding and subsequent months of work courting customers.

My friend [David Toth](https://twitter.com/jupiterunknown) taught me the value of idea screening. He pointed out that whatever idea I pursue determines large parts of my life for several months at the minimum, so it's worth choosing carefully. Instead of bounding off after the first good idea he has, David generates ideas until he has a list of at least 10. He then evaluates that list carefully to choose which has the highest chance of success.

Reading [_Start Small, Stay Small_](https://smile.amazon.com/Start-Small-Stay-Developers-Launching/dp/0615373968/) ([notes](/book-reports/start-small-stay-small/)) and [_The Mom Test_](https://smile.amazon.com/Mom-Test-customers-business-everyone/dp/1492180742/) ([notes](/book-reports/the-mom-test/)) also influenced how I approach new businesses. Both books encourage founders to start with market research and build the product later. As a result, I was conservative about building anything and gave myself permission to bail if my investigation indicated an idea was no longer my best chance of success.

### Take bigger swings

When I set last year's goal to $500/month in revenue, people encouraged me to set a higher target. New businesses have a high chance of failure, so I may as well shoot for the moon.

Looking back, I still feel that $500/month was sensible. Is It Keto was a nice "beginner business" because the mechanics were so simple. Ads and affiliate purchases generated about $0.01 per visitor, on average. More visits meant more money, so I got to experiment with different growth strategies without worrying about things like pricing, sales funnels, or customer support. It was gratifying to watch my revenues begin at a [paltry $1/month](https://www.indiehackers.com/forum/isitketo-month-4-my-first-dollar-of-revenue-03e572f661) and then grow by 50-150% each month to reach $400/month by the end of the year.

The flip side was seeing the limitations of low-margin businesses. When revenues are a penny per customer, most avenues for expansion are off the table. It makes no sense to pay $0.50-$1.50 per click for an ad if the visitor only generates $0.01 in revenue. I'd love to bring on an employee to help grow the site, but even a cheap $200/month freelancer would have to double my traffic to justify their cost.

Now that I'm entering my third year as a founder, I'm ready to make bigger bets. Growing Is It Keto gave me the confidence to push myself more. That means taking on projects where success would afford me a couple of part-time contractors.

## I still love it

When people find out that I've run at a financial loss for the past two years, they worry that I regret leaving my cushy Google job. It's common for founders to experience burnout after a year or two, but I've been fortunate never to feel that way. I chalk this up to my healthy sense of self-doubt at the start of this adventure &mdash; I expected to fail awhile before finding success. It's also easy to avoid financial stress when you're in no danger of running out of money.

Every day, I come downstairs and enjoy a leisurely breakfast with my girlfriend. We live at the end of a dead-end street, so when she leaves for work, my house is perfectly quiet. After writing for 60-90 minutes, I map out the rest of my day. I don't work after dinner or on the weekends. If I feel sleepy at 3pm, I take a nap and never worry about what my manager thinks.

Before quitting, the part of the lifestyle I fantasized about most was the pure independence of it. It is indeed as satisfying as I dreamed. I love having full autonomy over my day and the freedom to completely change the direction of my businesses or start over when it feels right.

I'd do this forever.

## Grading my goals

In last year's update, I [gave myself four goals](/solo-developer-year-1/#goals-for-year-two) for the year:

### Achieve $500/month in revenue across my businesses

**Grade**: B+

I did hit this goal in that my revenue was $604/month for the year and $1,657/month for Q4, though it feels like cheating to include [my huge outlier sale](/retrospectives/2020/01/#zestfulhttpszestfuldatacom) from December. Without it, I'd be at $441 in total revenue for December, which is closer to what the likely trend will be through early 2020. It's not quite $500, but it's satisfyingly close.

### Present talks at three software conferences

**Grade**: A

Three conferences accepted my speaking proposals, and I'm proud of my presentations at all of them:

| Conference                                  | My notes                                      | Presentation                                                                           |
| ------------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------- |
| [NERD Summit](https://2019.nerdsummit.org/) | -                                             | ["Modernize any Codebase through Tooling and Technique"](https://youtu.be/GfkVhr6SPz4) |
| [PyTexas 2019](https://2019.pytexas.org/)   | [Notes](/retrospectives/pytexas-2019-notes/)  | ["Why Good Developers Write Bad Tests"](https://youtu.be/hM_ex4-xu4E)                  |
| [PyGotham 2019](https://2019.pygotham.org/) | [Notes](/retrospectives/pygotham-2019-notes/) | ["Why Good Developers Write Bad Tests"](https://youtu.be/ElzBGwyDzCc)                  |

I enjoy conferences and pick up useful information by attending, but if I'm being honest, they don't materially improve my professional or personal life. Between travel, preparing my talks, and attending the event itself, I spent six to eight weeks of full-time work on conference presentations.

I'll continue applying to and attending conferences in 2020, but I'll be more selective than last year.

### Publish 12 blog posts

**Grade**: B

Depending on how you count, I either published 9 or 13 blog posts in 2019. There were nine separate updates to my blog, but one of them was [a five-part series on hiring content writers](/hiring-content-writers/). Overall, I'm pleased with my writing for the year, though I did [wish more of my posts had gained traction](#mtlynchio-_this-blog_).

### Gain comfort with a JavaScript framework

**Grade**: A

I'm not a Vue expert, but I'd describe myself as "conversational." I can build sites quickly without getting stuck on the framework itself.

After years of banging my head against the wall with [Angular](https://angular.io), I'm delighted to have found a framework that feels appropriate for solo developers.

## What's next

The project that I hope to focus on for a large portion of the coming year is [WanderJest](https://wanderjest.com), a website I created a few weeks ago.

{{<img src="wanderjest-feb-2020.jpg" alt="Screenshot of WanderJest website" max-width="600px" caption="[WanderJest](https://wanderjest.com) is a resource for finding live comedy shows." has-border="true">}}

It's difficult to find local comedy shows, as listings are scattered amongst Facebook groups, comedy club websites, and ticket sellers like TicketMaster and Eventbrite. My hope is for WanderJest to unify these disparate sources, making it easier for audiences to find shows. Basically, the idea is <a href="https://bandsintown.com" rel="nofollow">Bandsintown</a>, but for comedy.

I'm piloting it in my home area of Western Massachusetts, but I'll soon expand it to other areas.

## Goals for year three

Here's what I hope to accomplish in my third year as a solo developer:

- Earn $20,000 in revenue across my businesses.
  - I tripled revenues in 2019, so $20k means tripling again.
- Publish 10 blog posts.
  - This gives me time for about one article per month with enough slack for longer posts and time off to prepare a conference presentation.
- Learn one new technology.
  - Learning a totally new language or framework tends to improve my overall thinking about software, and I've been looking for an excuse to learn [Rust](https://www.rust-lang.org).

## Updates

- **Update (Feb. 1, 2021)**: [My Third Year as a Solo Developer](/solo-developer-year-3/)
- **Update (Feb. 1, 2022)**: [My Fourth Year as a Bootstrapped Founder](/solo-developer-year-4/)

---

_Cover art by [Loraine Yow](https://www.loraineyow.com/). Go gopher adapted from a design by [Renee French](http://reneefrench.blogspot.com/)._
