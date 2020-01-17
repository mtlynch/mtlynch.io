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
* **High savings**: It's hard to work for big software companies for 11 years without building a decently-sized nest egg.
* **Lucky investments**: I've kept most of my savings in the S&P 500 throughout my career, a period of especially strong runs. My small bets on cryptocurrency also paid off well.

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

Zestful is in a strange position because companies who are already parsing ingredients never want to switch to Zestful. If they already have a solution in place, the cost of switching to a new API and taking on a new external dependency is too high.

{{< img src="zestful-seo.jpg" alt="Screenshot of Zestful's appearances in Google search results" hasBorder="True" maxWidth="400px" align="right" caption="My efforts to keep Zestful relevant in search results" >}}

The people who pay for Zestful are developers building a brand new product. In those cases, using a managed service is cheaper than rolling their own solution and building infrastructure around it.

So, how do you sell to companies if they don't even exist yet? My strategy has been to invest in search engine optimization so that Zestful ranks highly for queries like "ingredient parsing."

To attract visitors from Google, I:

* answered a StackOverflow question relating to parsing ingredients.
* wrote a series of blog posts explaining how I built Zestful.
* adjusted the language on the Zestful homepage to mention relevant keywords.

TODO: link all those

### [Is It Keto](https://isitketo.org)

{{< img src="isitketo-screenshot.png" alt="Screenshot of Is It Keto website" hasBorder="True" maxWidth="550px" caption="Is It Keto is a reference site for the keto diet." >}}

Is It Keto gives readers clear, simple answers about which foods are compatible with [the keto diet](https://en.wikipedia.org/wiki/Ketogenic_diet). It earns money through Amazon Affiliate links and Google AdSense display ads.

| Income/Expense                              | 2019     |
|---------------------------------------------|----------|
| Pageviews                                   | 521,913  |
| Food corpus size                            | XX       |
| Amazon Affiliate revenue                    | $1,315  |
| Google AdSense revenue                      | $940    |
| Meal plan sales                             | $24     |
| [Content writing](/hiring-content-writers/) | -$3,845   |
| Social media management                     | -$314   |
| Graphic design                              | -$163   |
| Hosting                                     | -$103   |
| Domain                                      | -$12   |
| **Net profit**                              | **-$2,158** |

At $2.3k of revenue, Is It Keto was my second-highest grossing product for 2019. I abandoned the site in XX, but I came back to it XX months later after realizing that it had grown on its own without me.

{{< img src="isitketo-pageviews.jpg" alt="Graph of Is It Keto pageviews increasing each month until flattening out in August" hasBorder="True" maxWidth="650px" caption="Is It Keto traffic by month" >}}

XX% of Is It Keto's visits come from search engines, but I've never been able to connect any change I implement to any fluctuation in search engine traffic. There were months when I added lots of content, [tuned page titles and headings](/retrospectives/2019/09/#taking-affiliate-revenue-advice-from-reddit), and [earned high-ranking backlinks](/retrospectives/2019/09/#finally-a-backlink-for-is-it-keto), yet traffic remained flat. At other points, I completely ignored the site for months and Google traffic grew the entire time. 

Is It Keto was also my biggest expense, as I outsourced a lot of my content writing. I spent far more than I should have because I didn't know what rates were reasonable and when to give up on an underperforming writer. I learned a lot from the process and wrote a seemingly too-niche-to-be-popular [guide to hiring content writers](/hiring-content-writers/) based on my experience.

### mtlynch.io *(this blog)*

| Metric                                      | 2018    | 2019    | Change |
|---------------------------------------------|---------|---------|--------|
| Pageviews                                   | 981,587 | 273,817 |
| Affiliate revenue                           | $1,244  | $374    |
| Development                                 | -$3,896 | -$460   |
| [Illustrations](/how-to-hire-a-cartoonist/) | -$599    | -$769   |
| Hosting                                     | -$309    | -$150   |
| [Grammarly](https://www.grammarly.com/?affiliateNetwork=cj&affiliateID=8329872) (Grammar and style checking service) | -$140 | -$140 |
| [Editing](/editor/)                         | -$75    | -$60 |
| Domain                                      | -$60    | -$60 | - |
| **Net profit**                              | **-$3,835** | **-$1,265** | +$XX (XX%) |

In 2019, I struggled to connect with audiences more. Throughout 2017 and 2018, I found it easy to find an audience for an article. I'd write something not thinking about who would read it, share it afterward

There are certain things where I know it's not going to be popular but I write it anyway. I feel that if I had read it when I needed it, I would be so grateful to find it. Posts like, "The Dumbest Task I Ever Outsourced," and,  "Eliminating Distractions from Social Media, Email, and StackOverflow," were meant to have broad appeal, but they fell flat.

Revenue is down, which is fine because I don't try to earn money from this blog. If I'm going to link to a product anyway, I use an affiliate link, but I don't let affiliate links guide what I write. Costs are down, mainly because Andrew Newhouse, the excellent freelance developer who manages the coding, has had less time for freelancing, so I've taken on more of the development myself. Although I prefer to focus on the writing when it comes to my blog, I've gotten better at web development, so it's become easier for me to do the things Andrew used to do.

### What Got Done

{{< img src="whatgotdone-screenshot.png" alt="Screenshot of What Got Done website" maxWidth="550px" caption="What Got Done is a task journaling app." >}}

What Got Done is a tool for recording and sharing weekly work accomplishments. It's a technique that I learned while working at Google (TODO: link), and I've been using it to record [my progress](https://whatgotdone.com/michael) every week for the last 10 months.

| Income/Expense                              | Amount |
|---------------------------------------------|---------|
| Customer interviews                         | -$31 |
| Domain                                      | -$12 |
| **Net profit**                              | **-$43** |

I never thought What Got Done was a brilliant business idea, but I was feeling burned out after failing to grow Is It Keto for months. What Got Done seemed like a fun project to cheer myself up and teach myself Vue.js. And it was! I love Vue.js. I've finally found a web framework that lets me build websites quickly without getting mired of leaky abstraction.

I figured that as long as I was building it, I should explore the possibility of making it into a business. I interviewed several businesses to see if they'd be interested in a tool like What Got Done, but the general sentiment was that everyone is satisfied solving this problem with a dedicated Slack channel.

### Everything Else

| Expense                   | Purpose   | Amount    |
|---------------------------|-----------|-----------|
| Conferences               | Networking and training | -$2,182 |
| [Xero](https://xero.com/) | Bookkeeping | -$151 |
| Bench to Xero migration   | Bookkeeping | -$232 |
| [Circle CI](https://travis-ci.com) | Continuous integration | -$350 |
| [Coveralls](https://coveralls.io) | Test coverage tracking | -$270 |

Conferences are a big expense because travel and lodging is expensive, and the conferences that accept my speaking proposals tend to have minimal budgets for travel assistance.

I saved $68/month by switching from from Travis to Circle, which worked out great because Circle adds features quicker and integrates better with Docker. I paid for another year of Coveralls, which I now regret after accepting that code coverage metrics have little value for early stage products. I've since disabled auto-renew.

I also switched from managed bookkeeping with [Bench](https://bench.co) to self-serve bookkeeping with Xero. I enjoyed Bench and have no love for Xero, but I couldn't justify spending an extra $1.5k/yr for concierge bookkeeping when my finances are so simple and consistent.

## Grading my goals

In last year's update, I gave myself four goals for the year. Here's how I grade myself against these goals:

### Achieve $500/month in revenue across my businesses

**Grade**: B+

I achieved this, though I do feel like I'm kind of cheating by relying on one huge outlier sale that put me at ~$4.4k in total revenue for December. Without it, I'd be at $440.85 in total revenue for the month, which is more representative of revenue I expect to continue in 2020.

### Present talks at three software conferences

**Grade**: A

Three software conferences accepted my speaking proposals, and I'm proud of my presentations at all of them:

| Conference                                  | My notes | Recording |
|---------------------------------------------|----------|-------|
| [NERD Summit](https://2019.nerdsummit.org/) | -                                           | ["Modernize any Codebase through Tooling and Technique"](https://youtu.be/GfkVhr6SPz4)
| [PyTexas 2019](https://2019.pytexas.org/)   | [Notes](/retrospectives/pytexas-2019-notes/)  | ["Why Good Developers Write Bad Tests"](https://youtu.be/hM_ex4-xu4E)
| [PyGotham 2019](https://2019.pygotham.org/) | [Notes](/retrospectives/pygotham-2019-notes/) | ["Why Good Developers Write Bad Tests"](https://youtu.be/ElzBGwyDzCc) |

I enjoy conferences and pick up useful information by attending, but if I'm being honest, there's nothing I took from any of the conferences this year that substantially improved my life or my business. Between travel, time spent preparing my talks, and time at the conference itself, I spent around six weeks of full-time work to attend these three conferences.

I'll continue applying to and attending conferences in 2020, but I'm limiting it to conferences that people have strongly recommended (e.g., MicroConf, PyCon) and events near friends I'd like to visit.

### Publish 12 blog posts.

**Grade**: B

Depending on how you count, I either published 9 or 13 blog posts in 2019. I had nine separate updates to my blog, but one of them was [a five-part series on hiring content writers](/hiring-content-writers/).

### Gain comfort with a JavaScript framework (e.g., [Vue](https://vuejs.org/), [Angular](https://angular.io/), [React](https://reactjs.org/)).

**Grade**: A


## Raise prices, even if nobody's buying

One of the best pieces of [advice I received](/retrospectives/2019/07/#suddenly-everyone-wants-to-parse-ingredients) this year was from [Cory Zue](https://coryzue.com). He suggested that at $0.003 per request, my prices for Zestful were too low. At the time, Zestful had almost zero paying customers. How could my prices be too low if nobody was buying?

Though Zestful had few paying customers, it had many *prospective* customers. Every few weeks, a new company would contact me saying that they were interested in using Zestful, but it was missing one tiny feature they absolutely needed. Desperate to win my first real customer, I'd spend the subsequent week feverishly implementing the feature they wanted. I'd proudly deliver, "Oh,yeah, that was for a project we actually decided not to pursue."

It cost them nothing to ask for features, but it was extremely time-consuming for me to meet with them and implement their wishlist. I recognized what was happening, but I couldn't figure out a way to stop it. I was afraid to refuse because what if one of them followed through and ended up paying me thousdands of dollars per month if I add their pet feature.

When I took Cory's advice and raised prices, it changed the conversation in a way I didn't expect. At $0.003 per request, nobody tried to negotiate prices. When I bumped my rates 6.5x to $0.02 per request, everyone asked if I could offer volume discounts. Because they were asking for volume discounts, it forced them to tell me how much data they needed to process. Then, if they said they'd buy if I implemented their pet feature, I gave them this line:

>You can pre-pay for three months of service, and your billing cycle won't start until that feature is available.

I've never been burned on a feature request since. The prices are high enough that most customers have to spend a few hundred dollars per month to use Zestful, which discourages customers from setting up meetings with me to tell me about the long feature list I'd have to implement to earn their $5/month. Interestingly, the customers who ended up purchasing enterprise Zestful plans had no feature requests, and those deals closed in a matter of days.

## Stop outsourcing when it slows you down, not to inflate profits

I think popular opinion about outsourcing is wrong. I happily outsource if it saves me time, and I don't care if it deflates my profits. I'm implicitly losing around $300k a year by not taking a big company software job, so if I spend an extra $2-3k here and there so that a freelancer can save a month of my time, I'm happy to do it.

That said, I've discovered that hiring freelancers for new products almost always slows me down. When I'm developing a brand new company, assumptions change so quickly and I so often change direction and take on tasks I didn't expect that hiring a freelancer just doesn't work. Freelancers are great at doing well-defined tasks at a consistent rate.

Take Is It Keto. It's basically a content site. Hiring someone takes a lot of time. I have to create a job description, advertise it, screen candidates, negotiate compensation, then train them. It typically took three or four months before a writer saved me more time than I had spent hiring and training them.

For a new business, four months is an eternity. By the four-month mark, I've already

TODO: Graph of time spent vs. time saved

Even this blog, I used to deliberately outsource all the coding so that I could focus on writing. I recently 

People are obsessed with profits. It seems crazy to 

It is a bad idea because it bogs you down.

Just because I outsource something doesn't make it worth outsourcing. I was excited about delegating all of Is It Keto's Twitter to an overseas freelancer, but I realized I was paying $XX for every visitor from Twitter and only earning back $XX..

## Pursuing the right idea means rejecting the wrong ones

One of the best lessons I learned from my friend David Toth is that founders tend to undervalue the importance of idea screening. Because it feels very cheap to explore an idea and build an MVP, most people rush into that without considering other ideas. But really, even a quick failure takes weeks or months of effort. A marginal but long-term loser business can take years to reveal itself as such.

David's rule of thumb is that before he pursues an idea, he comes up with at least 10 concepts so that he can choose the best one.

I'm worse at David at generating ideas, but I took this advice to heart. Combined with [my takeaways from the book *The Mom Test*](/book-reports/the-mom-test/), I was conservative about building products. I spent more time interviewing customers to validate ideas before I started building software to solve the problem I imagined needed solving.

* Stone quarries: Most quarry owners weren't interested in talking to me, the one that did didn't seem to have problems I could solve with software.
* Email copywriters: 
* Sheet metal shops: There are existing solutions

The exception was What Got Done, which I did build without validating the idea, but mainly to meet my goal of learning a JavaScript framework. But I figured that as long as I was building it, I might as well see if there's a viable business there, and it seemed like the answer was no..

## Start taking bigger swings

One of the other changes in my thinking was that I decided to start taking bigger swings. Feedback I saw last year was that $500/month is too low a target. Solo businesses have a high risk of failure, so I may as well attempt something with a higher payoff.

That's true, but I needed the low target to get started. If I made a product that costs $50k, chances are that I'd fail, but it would be hard to figure out why I failed. Also, I'd probably have to invest a lot more time into the idea before I discovered it failed.

Is It Keto was a great beginner business because I could see how my investment translated to revenue. When I spent several hours a day promoting the business on Facebook and Reddit, I saw that new people came from those sites and increased my revenue, even if by a fraction of a penny each.

I also saw how that's limiting. Because each customer yields only ~$XX in revenue, it limits the tools I can use. I can't use any kind of paid advertising because no channel is going to sell me visitors for less than $XX per visitor. Toward the end of the year, I found a college student who produced content for the site at $15/hr, but I wasn't even sure if that was net profitable.

Now that I'm entering my third year of this, I'm ready to take bigger bets so that if I'm successful, the business will earn enough to grow it with other developers and skilled positions.


## I still love it

Everything's great.

## What's next

TODO: Talk about WanderJest

## Goals for year three

Here's what I hope to accomplish in my third year as a solo developer:

* Earn $20,000 in revenue across my businesses.
* Publish 10 blog posts.
* Learn one new technology.

---

*Cover art by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/). Go gopher adapted from a design by [Renee French](http://reneefrench.blogspot.com/).*