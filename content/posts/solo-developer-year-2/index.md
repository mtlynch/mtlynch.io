---
title: My Second Year as a Solo Developer
date: '2020-01-31'
---

Two years ago, I [quit my job as a developer at Google](/why-i-quit-google/) to build my own software business. A year later, I [posted an update](/solo-developer-year-1/) about how my first year went. Today marks the end of my second full year, so it's time for another update.

## How I made and spent money

<canvas id="myChart"></canvas>
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"></script>
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
          label: function(tooltipItems, data) {
            let original = parseFloat(tooltipItems.yLabel).toLocaleString();
            if (original[0] === "-") {
              return " -$" + original.substring(1);
            }
            return " $" + original;
          },
        },
      },
    },
});
</script>

| Metric     | 2018        | 2019       | Change                                        |
|------------|-------------|------------|-----------------------------------------------|
| Revenue    | $2,262   | $7,254  | <font color="green">+$4,992 (+220%)</font> |
| Expenses   | $23,133  | $9,657  | <font color="green">-$13,477 (-58%)</font> |
| **Net Profit** | **<font color="red">-$20,871</font>** | **<font color="red">-$2,402</font>** | **<font color="green">+$18,469 (+88%)</font>** |

My second year was a huge improvement financially. I increased profits by $18.5k! Overall, I still lost money, but try not to get too hung up on that. I tripled revenue to $7.2k and cut expenses by more than half, which I'm excited about.

## How can you afford to keep losing money?

People are often confused about my uncanny ability to remain unprofitable for so long and continue surviving. They assume that I fund my money-losing businesses with freelance work, but my businesses are my full-time job.

I'm very fortunate to have the luxury of failing for so long, and it's possible due to three main factors:

* **Low expenses**: I [live in an inexpensive area](/solo-developer-year-1/#so-i-bought-a-house) where my costs are around $2k/mo.
* **High savings**: It's hard to work for big software companies for 11 years without building a decent nest egg.
* **Lucky investments**: I've kept most of my savings in the S&P 500 throughout my career, which has coincided with especially strong market runs runs. My small bets on cryptocurrency also paid off well.

## Project by project

### [Zestful](https://zestfuldata.com)

{{< img src="zestful-screenshot.png" alt="Screenshot of Zestful website" hasBorder="True" maxWidth="550px" caption="Zestful is a SaaS for parsing recipe ingredients." >}}

Zestful launched in mid-2018 as my first attempt at software-as-a-service (SaaS). It allows developers to infer structure from recipe ingredients programmatically. Given an ingredient like `"2 1/2 tablespoons finely chopped parsley"`, Zestful infers that `2.5` is the quantity, `tablespoons` is the unit of measure, `parsley` is the product, and `finely chopped` is a preparation step.

After earning a big fat zero last year, Zestful finally brought in some revenue in 2019. XX% of its revenue came from [a single enterprise sale](/retrospectives/2020/01/#zestfulhttpszestfuldatacom). That sale also represented XX% of my revenue for the year across all my businesses.

| Income/Expense   | Amount    |
|------------------|-----------|
| Sales            | $5,022 |
| Hosting          | -$80   |
| Domains          | -$12    |
| **Net profit**   | **$4,930‬** |

Zestful is in a strange position because companies who are already parsing ingredients never want to switch to Zestful. If they already have a solution in place, the cost of switching to a new API and taking on a new external dependency is too high. All of Zestful's customers are companies building a brand new product.

{{< img src="zestful-seo.jpg" alt="Screenshot of Zestful's appearances in Google search results" hasBorder="True" maxWidth="400px" align="right" caption="My efforts to keep Zestful relevant in search results" >}}

How do you sell to companies if they don't even exist yet? My strategy has been to invest in search engine optimization so that Zestful ranks highly for queries like "ingredient parsing."

To attract visitors from Google, I:

* answered a StackOverflow question relating to parsing ingredients.
* wrote a series of blog posts explaining how I built Zestful.
* adjusted the language on the Zestful homepage to mention relevant keywords.

TODO: link all those

### [Is It Keto](https://isitketo.org)

{{< img src="isitketo-screenshot.png" alt="Screenshot of Is It Keto website" hasBorder="True" maxWidth="550px" caption="Is It Keto is a reference site for the keto diet." >}}

Is It Keto was my attempt to earn money from Amazon Affiliate sales. The site gives readers clear, simple answers about which foods are compatible with [the keto diet](https://en.wikipedia.org/wiki/Ketogenic_diet). It generates revenue through affiliate links and Google AdSense display ads.

| Income/Expense                              | 2018    | 2019    |
|---------------------------------------------|---------|---------|
| Pageviews                                   |         | 521,913 |
| Food corpus size                            |         | XX      |
| Amazon Affiliate revenue                    |         | $1,315  |
| Google AdSense revenue                      | N/A     | $940    |
| Meal plan sales                             | N/A     | $24     |
| [Content writing](/hiring-content-writers/) | $0      | -$3,845 |
| Social media management                     | $0      | -$314   |
| Graphic design                              |         | -$163   |
| Hosting                                     | $0      | -$103   |
| Domain                                      | -$12    | -$12    |
| **Net profit**                              |         | **<font color="red">-$2,158</font>** |

At $2.3k of revenue, Is It Keto was my second-highest grossing product for 2019. I abandoned the site in XX, but I came back to it XX months later after realizing that it had grown on its own without me.

{{< img src="isitketo-pageviews.jpg" alt="Graph of Is It Keto pageviews increasing each month until flattening out in August" hasBorder="True" maxWidth="650px" caption="Is It Keto traffic by month" >}}

XX% of Is It Keto's visits come from search engines, but I've never been able to connect any change I implement to any fluctuation in search engine traffic. There were months when I added lots of content, [tuned page titles and headings](/retrospectives/2019/09/#taking-affiliate-revenue-advice-from-reddit), and [earned high-ranking backlinks](/retrospectives/2019/09/#finally-a-backlink-for-is-it-keto), yet traffic remained flat. At other points, I completely ignored the site for months and Google traffic grew the entire time. 

Is It Keto was also my biggest expense, as I outsourced much of the writing. I spent far more than I should have because I didn't know what rates were reasonable and when to give up on an underperforming writer. I learned a lot from the process and wrote a seemingly too-niche-to-be-popular [guide to hiring content writers](/hiring-content-writers/) based on my experience.

### mtlynch.io *(this blog)*

| Metric                                      | 2018    | 2019    | Change |
|---------------------------------------------|---------|---------|--------|
| Pageviews                                   | 981,587 | 273,817 |
| Affiliate revenue                           | $1,244  | $374    |
| Development                                 | -$3,896 | -$460   |
| [Illustrations](/how-to-hire-a-cartoonist/) | -$599    | -$769   |
| Hosting                                     | -$309    | -$150   |
| [Grammarly](https://www.grammarly.com/?affiliateNetwork=cj&affiliateID=8329872) (Grammar and style checking service) | -$140 | -$140 | +0 (0%) |
| [Editing](/editor/)                         | -$75    | -$60 |
| Domain                                      | -$60    | -$60 | +0 (0%) |
| **Net profit**                              | **<font color="red">-$3,835</font>** | **<font color="red">-$1,265</font>** | +$XX (XX%) |

Pageviews are down substantially, which is to be expected. My quitting Google post received 500k pageviews alone last year, so it would be surprising if I could write another hit like that. Still, I struggled to find readers. Throughout 2017 and 2018, many of my articles became popular without me putting much though into subject matter or promotion. I'd write the article then find an appropriate community to share it with afterwards. In 2019, I found it hard to do that. It might be because my writing shifted from general programmer things to more niche business founder things, and people are more welcoming of the former.

Revenue is down, which is fine because I don't go out of my way to earn money from this blog. My development costs fell dramatically. This is partly due to the site's freelance developer having less time, but also my increased comfort with web development means that it's no longer so time-consuming for me to add features myself.

### What Got Done

{{< img src="whatgotdone-screenshot.png" alt="Screenshot of What Got Done website" maxWidth="550px" caption="What Got Done is a task journaling app." >}}

What Got Done is a tool for recording and sharing weekly work accomplishments. It's a technique that I learned while working at Google (TODO: link), and I've been using it to record [my progress](https://whatgotdone.com/michael) every week for the last 10 months.

| Income/Expense                              | Amount |
|---------------------------------------------|---------|
| Customer interviews                         | -$31 |
| Domain                                      | -$12 |
| **Net profit**                              | **-$43** |

I never thought What Got Done was a brilliant business idea, but I was feeling burned out after failing for months to turn a profit on Is It Keto (TODO: link). What Got Done seemed like a fun project to cheer myself up and teach myself Vue.js. And it was! I love Vue.js. I've finally found a web framework that lets me build websites quickly without struggling to navigate through a jungle of leaky abstraction.

I figured that as long as I was building What Got Done, I should explore the possibility of making it into a business. After interviews with several businesses, nobody seemed to feel that What Got Done fit them better than a dedicated Slack channel (TODO: link), so I moved on.

### Everything Else

| Expense                   | Purpose   | Amount    |
|---------------------------|-----------|-----------|
| Conferences               | Networking and training | -$2,182 |
| [Xero](https://xero.com/) | Bookkeeping | -$151 |
| Bench to Xero migration (freelance accountant)   | Bookkeeping | -$232 |
| [Circle CI](https://circleci.com) | Continuous integration | -$350 |
| [Coveralls](https://coveralls.io) | Test coverage tracking | -$270 |

Conferences are a big expense because travel and lodging is expensive, and the conferences that accept my speaking proposals tend to have minimal budgets for travel assistance.

I saved $68/month by switching from from Travis to Circle, which worked out great because Circle adds features quicker and integrates better with Docker. I paid for another year of Coveralls, though I now regret after accepting that code coverage metrics have little value for early stage products. I've since disabled auto-renew.

I also switched from managed bookkeeping with [Bench](https://bench.co) to self-serve bookkeeping with Xero. I enjoyed Bench and have no love for Xero, but I couldn't justify spending an extra $1.5k/yr for concierge bookkeeping when my finances are so simple and consistent.

## Grading my goals

In last year's update, I gave myself four goals for the year. Here's how I grade myself against these goals:

### Achieve $500/month in revenue across my businesses

**Grade**: B+

I achieved this, though I'm kind of cheating by relying on one huge outlier sale in December that put me at ~$4.4k in total revenue for the month. Without it, I'd be at $441 in total revenue for December, which is more representative of revenue I expect to continue in 2020.

### Present talks at three software conferences

**Grade**: A

Three software conferences accepted my speaking proposals, and I'm proud of my presentations at all of them:

| Conference                                  | My notes | Recording |
|---------------------------------------------|----------|-------|
| [NERD Summit](https://2019.nerdsummit.org/) | -                                           | ["Modernize any Codebase through Tooling and Technique"](https://youtu.be/GfkVhr6SPz4)
| [PyTexas 2019](https://2019.pytexas.org/)   | [Notes](/retrospectives/pytexas-2019-notes/)  | ["Why Good Developers Write Bad Tests"](https://youtu.be/hM_ex4-xu4E)
| [PyGotham 2019](https://2019.pygotham.org/) | [Notes](/retrospectives/pygotham-2019-notes/) | ["Why Good Developers Write Bad Tests"](https://youtu.be/ElzBGwyDzCc) |

I enjoy conferences and pick up useful information by attending, but if I'm being honest, there's nothing I took from any of the conferences this year that substantially improved my life or my business. Between travel, time spent preparing my talks, and time at the conference itself, I spent around six weeks of full-time work to attend these three conferences.

I'll continue applying to and attending conferences in 2020, but I'm limiting it to conferences that people have strongly recommended or in cities near friends I'd like to visit.

### Publish 12 blog posts.

**Grade**: B

Depending on how you count, I either published 9 or 13 blog posts in 2019. I had nine separate updates to my blog, but one of them was [a five-part series on hiring content writers](/hiring-content-writers/).

### Gain comfort with a JavaScript framework (e.g., [Vue](https://vuejs.org/), [Angular](https://angular.io/), [React](https://reactjs.org/)).

**Grade**: A

I'm not a Vue expert, but I'm "conversational" and can build sites quickly without getting stuck on the framework itself. After years of banging my head against the wall trying to use Angular, I'm happy to have finally switched over to a framework that feels appropriate for solo developers.

## Lessons learned

### Raise prices, even if nobody's buying

One of the best pieces of [advice I received](/retrospectives/2019/07/#suddenly-everyone-wants-to-parse-ingredients) this year was from [Cory Zue](https://coryzue.com). He suggested that at $0.003 per request, my prices for Zestful were too low. At the time, Zestful had almost zero paying customers. How could my prices be too low if nobody was buying?

Though Zestful had few paying customers, it had many *prospective* customers. Every few weeks, a new company would contact me saying that they were interested in Zestful, but it was missing one tiny feature they absolutely needed. Desperate to win my first big customer, I'd work feverishly to implement the feature they wanted. A week later, I'd proudly deliver it to them.

"Oh,yeah," they'd respond. "That was for a project we actually decided not to pursue."

It cost them nothing to ask for features, but it was extremely time-consuming for me to meet with them and implement their wishlist. I recognized what was happening, but I couldn't figure out a way to stop it. I could refuse, but what if they truly would spend thousands per month if I met their needs?

When I took Cory's advice and raised prices, it changed the conversation in a way I didn't expect. At $0.003 per request, nobody tried to negotiate prices. When I bumped my rates 6.5x to $0.02 per request, everyone who approached me asked if I could offer volume discounts. That forced them to tell me how much data they needed to process. When people say they'll buy if I add their pet feature, I give them this line:

>You can pre-pay for three months of service, and your billing cycle won't start until that feature is available.

I've never been burned on a feature request since. The prices are high enough that most customers have to spend a few hundred dollars per month to use Zestful, which discourages people from setting up meetings with me to tell me about the long feature list I'd have to implement to earn their $5/month. Interestingly, the customers who ended up purchasing enterprise Zestful plans had no feature requests, and those deals closed in a matter of days.

### Pursuing the right idea means rejecting the wrong ones

One of the best lessons I learned from my friend David Toth is that founders tend to undervalue idea screening. As lean manufacturing techniques beccome more popular with startups, people think of building a minimum viable product as cheap. But it still usually means weeks or months of work.

 Because it feels very cheap to explore an idea and build an MVP, most people rush into that without considering other ideas. But really, even a quick failure takes weeks or months of effort. A marginal but long-term loser business can take years to reveal itself as such.

David's rule of thumb is that before he pursues an idea, he comes up with at least 10 concepts so that he can choose the best one.

I'm worse at David at generating ideas, but I took this advice to heart. Combined with [my takeaways from the book *The Mom Test*](/book-reports/the-mom-test/), I was conservative about building products. I spent more time interviewing customers to validate ideas before I started building software to solve the problem I imagined needed solving.

* Stone quarries: Most quarry owners weren't interested in talking to me, the one that did didn't seem to have problems I could solve with software.
* Email copywriters: 
* Sheet metal shops: There are existing solutions

The exception was What Got Done, which I did build without validating the idea, but mainly to meet my goal of learning a JavaScript framework. But I figured that as long as I was building it, I might as well see if there's a viable business there, and it seemed like the answer was no..

### Take bigger swings

Last year, when I set my goal to $500/month in revenue, some commenters encouraged me to set a higher target. Solo businesses have a high risk of failure, so I may as well attempt something with a higher payoff.

Looking back, I feel that $500/month was a good target. Is It Keto felt like a nice "beginner business." It was fun to work on because it was a fairly simple system. If I could attract visitors, those visitors would generate revenue through ads or affiliate purchases. As my friend David Toth put it, I had "levers to work with." When I spent several hours a day promoting the business on Facebook and Reddit, I saw that new people came from those sites and increased my revenue, even if it was only fractions of a penny.

But I also saw how that's limiting. Even now, each customer yields only ~$0.015 in revenue, which limits the tools I can use. Paid advertising is off the table, because I've never seen any advertising channel that costs a penny per visitor. I'd love to bring on an employee, but with per-user revenue so low, it's hard for any employee to justify their cost. If I paid a freelancer $200/month to help grow the site, they'd have to bring in ~13k additional visitors, a 50% increase from my current user base.

Now that I'm entering my third year of this, I'm ready to take bigger bets. Is It Keto gave me confidence in different aspects of running a business, so I'm not as worried that I'm screwing things up. I'm aiming for projects where success means high enough margins that I can afford to grow it by hiring one or two other people to join me part time.

## I still love it

When people find out that I'm not making money, they worry I'm disappointed about the outcome of leaving my job. It's common for other solo developers to experience burnout after a year or two, but I've been fortunate in never feeling that way. A big part of this is my existing financial security, so I never worry about running out of money. And I also expected it to take several years before I landed on a business that earned serious profits, so I'm not disappointed.

Every day, I come downstairs and have breakfast with my girlfriend. When she leaves, I write for 60-90 minutes.  My house is at the end of a dead-end road, so it's perfectly quiet. After writing, I map out how to spend the rest of my day. I don't work after dinner or on the weekends. If I feel sleepy at 3pm, I take a nap and don't have to worry that my co-workers think I'm not pulling my weight.

Before I quit, the part of working for myself that I most fantasized about was just the independence of it. And it turns out that it's as satisfying as I imagined. I love being in charge of my entire day and having the freedom to completely change direction on my businesses or start over when it feels right.

## What's next

The project that I hope to focus on for a large portion of year three is [WanderJest](https://wanderjest.com), a website I launched in January.

TODO: WanderJest screenshot

WanderJest is a resource for comedy performers and their fans. Comedy show listings are currently scattered amongst Facebook groups, comedy club websites, and ticket sellers like TicketMaster or EventBrite. My hope is for WanderJest to unify these disparate event listings and make it easier for performers to attract audiences. Basically, <a href="https://bandsintown.com" rel="nofollow">Bandsintown</a>, but for comedy.

I'm piloting it in my home area of Western Mass, but I'll be expanding it to other areas soon.

## Goals for year three

Here's what I hope to accomplish in my third year as a solo developer:

* Earn $20,000 in revenue across my businesses.
  * Setting a per-year target feels more sensible than targeting a per-month rate by the end of the year. I tripled revenues in 2019, so would mean tripling again.
* Publish 10 blog posts.
  * This gives me time for one per month with some room for longer posts or taking a month off to prepare a conference presentation.
* Learn one new technology.
  * It doesn't have to benefit my business, but it would be cool if it did. I've been interested in learning more about Rust or Kubernetes.

---

*Cover art by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/). Go gopher adapted from a design by [Renee French](http://reneefrench.blogspot.com/).*