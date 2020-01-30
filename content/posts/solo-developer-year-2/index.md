---
title: My Second Year as a Solo Developer
date: '2020-01-31'
images:
- solo-developer-year-2/cover.jpg
---

{{< img src="cover.jpg" alt="My second year as a solo developer (cover image)" >}}

Two years ago, I [quit my job as a developer at Google](/why-i-quit-google/) to build my own software business. A year later, I [posted an update](/solo-developer-year-1/) about my finances, happiness, and lessons learned. Today marks the end of my second full year, so it's time for another update.

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

| Metric     | 2018        | 2019       | Change                                        |
|------------|-------------|------------|-----------------------------------------------|
| Revenue    | $2,262   | $7,254  | <font color="green">+$4,992 (+220%)</font> |
| Expenses   | $23,133  | $9,657  | <font color="green">-$13,477 (-58%)</font> |
| **Net Profit** | **<font color="red">-$20,871</font>** | **<font color="red">-$2,402</font>** | **<font color="green">+$18,469 (+88%)</font>** |

My second year was a huge improvement financially. I increased profits by $18.5k! Overall, I still lost money, but try not to get too hung up on that. I tripled revenue to $7.2k and cut expenses by more than half.

## How can you afford to keep losing money?

My uncanny ability to remain long-term unprofitable often perplexes people. They assume that I fund my money-losing businesses with freelance work, but the truth is that I put 100% of my working hours into my non-lucrative businesses. This is possible due to three main factors:

* **Low expenses**: I have no children and [live in an inexpensive area](/solo-developer-year-1/#so-i-bought-a-house) where my costs are around $2k/mo.
* **High savings**: It's hard to work for big software companies for 11 years without building a decent nest egg.
* **Lucky investments**: I've kept most of my savings in the S&P 500 throughout my career, which has coincided with especially strong market runs runs. My small bets on [cryptocurrency](/tags/sia/) also paid off well.

## Project by project

### [Zestful](https://zestfuldata.com)

{{< img src="zestful-screenshot.png" alt="Screenshot of Zestful website" hasBorder="True" maxWidth="550px" caption="Zestful is a SaaS for parsing recipe ingredients." >}}

Zestful launched in mid-2018 as my first attempt at a software-as-a-service (SaaS) business. It allows food apps to recognize the structure of recipe ingredients. Given an ingredient like `"2 1/2 tablespoons finely chopped parsley"`, Zestful infers that `2.5` is the quantity, `tablespoons` is the unit of measure, `parsley` is the product, and `finely chopped` is a preparation step.

After earning [a big fat zero](/solo-developer-year-1/#zestfulhttpszestfuldatacom) last year, Zestful finally brought in some revenue in 2019. XX% of its revenue came from [a single enterprise sale](/retrospectives/2020/01/#zestfulhttpszestfuldatacom). That sale also represented XX% of total revenue across all my businesses.

| Income/Expense   | Amount    |
|------------------|-----------|
| Sales            | $5,022 |
| Hosting          | -$80   |
| Domains          | -$12    |
| **Net profit**   | **$4,930‬** |

{{< img src="zestful-seo.jpg" alt="Screenshot of Zestful's appearances in Google search results" hasBorder="True" maxWidth="400px" align="right" caption="My efforts to keep Zestful relevant in search results" >}}

Zestful is in a strange position because companies who parse ingredients never want to switch to Zestful. The cost and risk of migrating to a new API is too high to justify potential improvements in price or performance. Instead, all of Zestful's customers are companies building a brand new product.

How do you sell to companies if they don't even exist yet? My strategy has been to invest in search engine optimization so that Zestful ranks highly for queries like "ingredient parsing."

### [Is It Keto](https://isitketo.org)

{{< img src="isitketo-screenshot.png" alt="Screenshot of Is It Keto website" hasBorder="True" maxWidth="550px" caption="Is It Keto is a reference site for followers of the keto diet." >}}

Is It Keto  gives readers clear, simple answers about which foods are compatible with [the keto diet](https://en.wikipedia.org/wiki/Ketogenic_diet). It generates revenue through Google AdSense display ads and receives an affiliate commission for every Amazon purchase through the site.

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

XX% of Is It Keto's visits come from search engines, but I've never been able to connect improvements in search traffic to anything I did. There were months when I added lots of content, [optimized page titles](/retrospectives/2019/09/#taking-affiliate-revenue-advice-from-reddit), and [earned high-ranking backlinks](/retrospectives/2019/09/#finally-a-backlink-for-is-it-keto), yet traffic remained flat. Other times, I ignored the site for months and Google traffic grew the entire time. 

Is It Keto was also my biggest expense, as I outsourced much of the writing. I spent too much on writing because of my inexperience at hiring and managing writers. The experience taugh me a lot and led me to write my widely ignored [guide to hiring content writers](/hiring-content-writers/).

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

Pageviews are down substantially, which is unsurprising. My [quitting Google post](/why-i-quit-google/) received 500k pageviews in 2018, so I didn't expect to produce another hit like that.

Still, I struggled to find readers in 2019. Throughout 2017 and 2018, many of my articles became popular without me trying very hard to promote them. I'd write the article then find an appreciative community to share it with afterwards. In 2019,

I branched out from technical posts into more posts about the struggles of running a bootstrapped business. Even though there are plenty of online communities for bootstrappers, they tend to be much less welcoming to off-site blog posts. Probably because they'd otherwise be overrun with self-promoters and snake oil sellers.

Revenue is also down, which is fine because I don't go out of my way to earn money from this blog. My development costs fell dramatically. The site's freelance developer shifted focus more to his full-time job, and I gained enough web dev skills from other projects that adding features myself is usually easy.

### What Got Done

{{< img src="whatgotdone-screenshot.png" alt="Screenshot of What Got Done website" maxWidth="550px" caption="What Got Done is a task journaling app." >}}

What Got Done is a tool for recording and sharing weekly work accomplishments. It's [a technique that I learned](/status-updates-to-nobody/) while working at Google, and I've been using it to record [my progress](https://whatgotdone.com/michael) every week for the last 10 months.

| Income/Expense                              | Amount |
|---------------------------------------------|---------|
| Customer interviews                         | -$31 |
| Domain                                      | -$12 |
| **Net profit**                              | **-$43** |

I never thought What Got Done was a brilliant business idea, but I was [feeling frustrated](/keep-growing-never-profit/) after months of failing to turn a profit on Is It Keto. What Got Done seemed like a fun project to cheer myself up and teach myself [Vue.js](https://vuejs.org/), a popular web framework.

It worked! I love Vue.js. I've finally found a tool that lets me build websites quickly without struggling to navigate through a maze of leaky abstraction.

I figured that as long as I was building What Got Done, I should explore the possibility of making it into a business. After interviews with several businesses, it seemed the vast majority felt that they could [achieve the same thing with a dedicated Slack channel](/retrospectives/2019/08/#why-use-what-got-done-when-we-have-slack), so I moved on.

### Everything Else

| Expense                   | Purpose   | Amount    |
|---------------------------|-----------|-----------|
| Conferences               | Networking and training | -$2,182 |
| [Xero](https://xero.com/) | Bookkeeping | -$151 |
| Bench to Xero migration (freelance accountant)   | Bookkeeping | -$232 |
| [Circle CI](https://circleci.com) | Continuous integration | -$350 |
| [Coveralls](https://coveralls.io) | Test coverage tracking | -$270 |

Conferences are a big expense because travel and lodging is expensive, and the conferences that accepted my speaking proposals offered minimal travel assistance.

Switching from from Travis to Circle reduced my expenses by $68/month, which worked out great because I prefer Circle's product. They improve faster rapidly and integrate better with Docker. Coveralls unfortunately auto-renewed without me consciously choosing it again. I've since accepted that code coverage metrics have little value for early stage products and canceled for next year.

I also switched from managed bookkeeping with [Bench](https://bench.co) to self-serve bookkeeping with Xero. I enjoyed Bench and have no love for Xero, but I couldn't justify an extra $1.5k/year for concierge bookkeeping when my finances are so simple and repetitive.

## Lessons learned

### Raise prices, even if nobody's buying

One of the best pieces of [advice I received](/retrospectives/2019/07/#suddenly-everyone-wants-to-parse-ingredients) this year was from [Cory Zue](https://coryzue.com). He suggested that at $0.003 per request, my prices for Zestful were too low. At the time, Zestful had almost zero paying users. How could my prices be too low if nobody was buying?

Though Zestful had few real customers, it had many *prospective* customers. Every few weeks, a new company contacted me saying that they were interested in Zestful, but it was missing one tiny feature they absolutely needed. Desperate to win my first big client, I'd work feverishly to implement the feature they wanted. A week later, I'd proudly deliver it to them.

"Oh, yeah," they'd reply sheepishly. "That was for a project we decided not to pursue."

It cost these companies nothing to ask for features, but it was extremely time-consuming for me to meet with them and implement their wishlist. I recognized what was happening but couldn't figure out a way to stop it. Ignoring the request was an option, but what if they truly were prepared to spend thousands per month?

When I took Cory's advice and raised prices, it changed the conversation in a way I didn't expect. At $0.003 per request, nobody tried to negotiate with me on price. When I bumped my rates 6.5x to $0.02 per request, everyone started askeding about volume discounts. Then, when they claimed they'd buy after I added their pet feature, I gave them this line:

>Great! You can pre-pay for three months of service, and your billing cycle won't start until that feature is available.

I've never been burned on a feature request since.

My prices are high enough that most customers have to spend a few hundred dollars per month to use Zestful, which discourages people from arranging meetings to tell me about the long feature list I'd have to implement to earn their $5/month. Interestingly, the customers who ended up purchasing enterprise plans had no feature requests, and those deals closed in a matter of days.

### Pursuing the right idea means rejecting the wrong ones

My first year as a founder, I was a puppy chasing whatever ball happened to roll by. If one of my projects failed to get traction, I'd work on whatever idea was front of mind. Building a "quick" prototype felt cheap and easy at a project's outset, but it always took weeks of coding and then months of work trying to attract customers.

My friend [David Toth](https://twitter.com/jupiterunknown) taught me the value of idea screening. He pointed out that whatever idea I pursue is going to determine my life for at least several months, so it's worth choosing carefully. Instead of bounding off after the first good idea he has, David's strategy is to generate ideas until he has a list of at least 10. He then evaluates that list carefully to choose which has the highest chance of success.

Reading [*Start Small, Stay Small*](https://amzn.to/2HZT8lA) ([notes](/book-reports/start-small-stay-small/)) and [*The Mom Test*](https://amzn.to/2ZshKrl) ([notes](/book-reports/the-mom-test/)) also influenced how I approach new businesses. Both books encourage founders to start with market research and build the product later. As a result, I was conservative about what I built and always reminded myself to bail if my research indicated an idea was no longer my best chance of success.

### Take bigger swings

When I set last year's goal to $500/month in revenue, some people encouraged me to set a higher target. New businesses have a high chance of failure, so I may as well attempt something with a higher payoff.

Looking back, I still feel that $500/month was sensible. Is It Keto was a nice "beginner business" because the mechanics were so simple. Ads and affiliate purchases generated about $0.01 per vistor, on average. More visits meant more money, so I got to experiment with different growth strategies without worrying about things like sales copy, pricing, or customer support. It was gratifying to watch my revenues begin at a [paltry $1/month](https://www.indiehackers.com/forum/isitketo-month-4-my-first-dollar-of-revenue-03e572f661) then slowly grow by 50-150% each month to the $400/month number the site reached by the end of the year.

The flip side was seeing how low-risk businesses can be limiting. When margins are a penny per customer, most avenues for expansion are off the table. It makes no sense to pay $0.50-$1.50 per click for an ad if the visitor only generates $0.01 in revenue. I'd love to bring on an employee to help grow the site, but even a cheap $200/month freelancer would have to double my traffic to justify their cost.

Now that I'm entering my third year as a founder, I'm ready to make bigger bets. Growing Is It Keto gave me the confidence to push myself more. That means taking on projects where success means high enough margins to afford hiring a couple of people part time.

## I still love it

When people find out that I've run at a financial loss for the past two years, they worry I regret leaving my job. It's common for founders to experience burnout after a year or two, but I've been fortunate in never feeling that way. I chalk this up to my healthy sense of self-doubt at the start of this project, which made me assume I'd fail for awhile before finding success. Also, it's easy to not stress about earning money when you're in no danger of running out.

Every day, I come downstairs and enjoy a leisurely breakfast with my girlfriend. We live at the end of a dead end street, so when she leaves for work, my house is perfectly quiet. After writing for 60-90 minutes, I map out the rest of my day. I don't work after dinner or on the weekends. If I feel sleepy at 3pm, I take a nap and never worry about what my manager thinks.

Before quitting, the part of the lifestyle I fantasized about most was the independence of it, and it's indeed as satisfying as I dreamed. I love having full autonomy over my day and the freedom to completely change direction on my businesses or start over when it feels right.

I'd do this forever.

## Grading my goals

In last year's update, I [gave myself four goals](/solo-developer-year-1/#goals-for-year-two) for the year:

### Achieve $500/month in revenue across my businesses

**Grade**: B+

I achieved this, though it feels like cheating to include [my huge outlier sale](/retrospectives/2020/01/#zestfulhttpszestfuldatacom) from December. Without it, I'd be at $441 in total revenue for December, which is closer to what I expect the trend will be through early 2020. It's not quite $500, but it's satisfyingly close.

### Present talks at three software conferences

**Grade**: A

Three conferences accepted my proposals, and I'm proud of my presentations at all of them:

| Conference                                  | My notes | Presentation |
|---------------------------------------------|----------|-------|
| [NERD Summit](https://2019.nerdsummit.org/) | -                                           | ["Modernize any Codebase through Tooling and Technique"](https://youtu.be/GfkVhr6SPz4)
| [PyTexas 2019](https://2019.pytexas.org/)   | [Notes](/retrospectives/pytexas-2019-notes/)  | ["Why Good Developers Write Bad Tests"](https://youtu.be/hM_ex4-xu4E)
| [PyGotham 2019](https://2019.pygotham.org/) | [Notes](/retrospectives/pygotham-2019-notes/) | ["Why Good Developers Write Bad Tests"](https://youtu.be/ElzBGwyDzCc) |

I enjoy conferences and pick up useful information by attending, but if I'm being honest, there's nothing I took from any of the conferences this year that substantially improved my life or my business. Between travel, time spent preparing my talks, and attending the event itself, I spent six to eight weeks of full-time work on conference presentations.

I'll continue applying to and attending conferences in 2020, but I'm being more selective based on strong recommendations or proximity to friends I'd like to visit.

### Publish 12 blog posts

**Grade**: B

Depending on how you count, I either published 9 or 13 blog posts in 2019. I had nine separate updates to my blog, but one of them was [a five-part series on hiring content writers](/hiring-content-writers/).

### Gain comfort with a JavaScript framework

**Grade**: A

I'm not a Vue expert, but I'd describe myself as "conversational." I can build sites quickly without getting stuck on the framework itself.

After years of banging my head against the wall with [Angular](https://angular.io), I'm happy to have found a framework that feels appropriate for solo developers.

## What's next

The project that I hope to focus on for a large portion of year three is [WanderJest](https://wanderjest.com), a website I launched in January.

TODO: WanderJest screenshot

WanderJest is a resource for comedy performers and their fans. Comedy show listings are currently scattered amongst Facebook groups, comedy club websites, and ticket sellers like TicketMaster or EventBrite. My hope is for WanderJest to unify these disparate event listings and make it easier for performers to attract audiences. Basically, <a href="https://bandsintown.com" rel="nofollow">Bandsintown</a>, but for comedy.

I'm piloting it in my home area of Western Mass, but I'll be expanding it to other areas soon.

## Goals for year three

Here's what I hope to accomplish in my third year as a solo developer:

* Earn $20,000 in revenue across my businesses.
  * I tripled revenues in 2019, so $20k would mean tripling again.
* Publish 10 blog posts.
  * This gives me time for one per month with some room for longer posts or taking a month off to prepare a conference presentation.
* Learn one new technology.
  * I've been looking for an excuse to learn [Rust](https://www.rust-lang.org).

---

*Cover art by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/). Go gopher adapted from a design by [Renee French](http://reneefrench.blogspot.com/).*