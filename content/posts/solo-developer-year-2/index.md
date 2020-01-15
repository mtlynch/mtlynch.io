---
title: My Second Year as a Solo Developer
date: '2020-01-31'
---

Two years ago, I [quit my job as a developer at Google](/why-i-quit-google/) to build my own software business. A year later, I [posted an update](/solo-developer-year-1/) about how my first year went. It's been another year, so it's time for another update.

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
| Net Profit | -$20,871 | -$2,402 | <font color="green">+$18,469 (+88%)</font> |

Overall, I still finished the year at a loss. Compared to my first year, I improved substantially. I tripled revenue to $7.2k and cut expenses by more than half.

## How can you afford to keep losing money?

Two years is a long time to run a business that loses money, so people are often confused about how I pay for this. Many assume that I take on freelance work, but I've never done that. I'm very fortunate to have the luxury of failing for so long, and it comes down to three main factors:

* Low expenses: I [live in an inexpensive area](/solo-developer-year-1/#so-i-bought-a-house) where my costs are around $2k/mo.
* High savings: It's hard to work for big software companies for 11 years without building a decently-sized nest egg.
* Lucky investments: I've kept most of my savings in the S&P 500 throughout my career at a time when it's had historically strong runs, and I took small bets on cryptocurrency that paid off well.

## Project by project

### [Zestful](https://zestfuldata.com)

{{< img src="zestful-screenshot.png" alt="Screenshot of Zestful website" hasBorder="True" maxWidth="550px" >}}

Zestful launched in mid-2018 as my first attempt at software-as-a-service (SaaS). It allows developers to infer structure from recipe ingredients programmatically. Given an ingredient like `"2 1/2 tablespoons finely chopped parsley"`, Zestful infers that `2.5` is the quantity, `tablespoons` is the unit of measure, `parsley` are the product, and `finely chopped` is a preparation step.

| Income/Expense   | Amount    |
|------------------|-----------|
| Sales            | $5,022 |
| Hosting          | -$80   |
| Domains          | -$12    |
| **Net profit**   | **$4,930‬** |

After earning a flat zero last year, 2019 finally brought Zestful some revenue. XX% of its revenue came from [a single enterprise sale](/retrospectives/2020/01/#zestfulhttpszestfuldatacom). That sale also represented XX% of my revenue for the year across all my businesses.

Zestful is a tricky product to sell because when I pitch it to companies who have apps that could use it, they're not interest in switching. They've either rolled their own solution or they've decided ingredient parsing isn't that important to their business. The customers that buy Zestful are companies who are just starting to build their products. But that presents a challenge for me because how do you sell to companies who don't have a product for you to discover?

The only way I've found is to invest in search engine optimization so that Google shows Zestful first for queries like "ingredient parsing."

* Answered a StackOverflow question relating to parsing ingredients
* Wrote a series of blog posts explaining how I built Zestful
* Adjusted the language on the Zestful homepage to mention relevant keywords

### [Is It Keto](https://isitketo.org)

{{< img src="isitketo-screenshot.png" alt="Screenshot of Is It Keto website" hasBorder="True" maxWidth="550px" >}}

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

At $2.3k of revenue, Is It Keto was my second-highest grossing product for 2019. I abandoned the site in XX, but I came back to it XX months later after realizing that it had grown on its own without me. XX% of Is It Keto's visits come from search engines, and I've never been able to connect any change in my search engine traffics to any action I'm taking. Google seemed to just send more and more traffic my way every month until August, at which point it decided that I had enough users and my referrals stayed roughly the same despite earning more backlinks and producing more content.

{{< img src="isitketo-pageviews.jpg" alt="Graph of Is It Keto pageviews increasing each month until flattening out in August" hasBorder="True" maxWidth="650px" caption="Is It Keto traffic by month" >}}

Is It Keto was also my biggest expense, as I outsourced a lot of my content writing. I spent far more than I should have because I didn't know what rates were reasonable and when to give up on an underperforming writer. I learned a lot from the process and wrote a wildly unpopular [guide to hiring content writers](/hiring-content-writers/) based on my experience.

38% of content writers was on writers who didn't work out. I either stuck with them too long.

### mtlynch.io *(this blog)*

| Income/Expense | 2019 |
|---------------------------------------------|---------|
| Affiliate revenue                           | $374    |
| Development                                 | -$460 |
| [Illustrations](/how-to-hire-a-cartoonist/) | -$769 |
| Hosting                                     | -$150 |
| [Grammarly](https://www.grammarly.com/?affiliateNetwork=cj&affiliateID=8329872) (Grammar and style checking service) | -$140 |
| [Editing](/editor/)                         | -$60 |
| Domain                                      | -$60 |
| **Net profit**                              | **-$1,265** |

Revenue is down, which is fine because I deliberately don't try to earn money from this blog.

In 2019, I struggled to connect with audiences more. Throughout 2017 and 2018, I found it easy to find an audience for an article. I'd write something not thinking about who would read it, share it afterward

There are certain things where I know it's not going to be popular but I write it anyway. I feel that if I had read it when I needed it, I would be so grateful to find it. Posts like, "The Dumbest Task I Ever Outsourced," and,  "Eliminating Distractions from Social Media, Email, and StackOverflow," were meant to have broad appeal, but they were felt like a swing and a miss.

### What Got Done

{{< img src="whatgotdone-screenshot.png" alt="Screenshot of What Got Done website" hasBorder="True" maxWidth="550px" >}}

What Got Done is a reinvention of an internal Google tool that I liked. It allows people to enter free-form text about what they accomplished that week.

| Income/Expense                              | Amount |
|---------------------------------------------|---------|
| Customer interviews                         | -$31 |
| Domain                                      | -$12 |
| **Net profit**                              | **-$43** |

I never thought What Got Done was a brilliant business idea, but I was feeling burned out after initially giving up on Is It Keto, and I wanted a fun project to cheer myself up and as a way to teach myself Vue.js. It was success

I figured that as long as I was building it, I should explore the possibility of making it into a business. I interviewed several businesses to see if they'd be interested in a tool like What Got Done, but the general sentiment I heard was that anyone interested in something like this is currently just doing this in Slack.

### Everything Else

| Expense                   | Purpose   | Amount    | Note  |
|---------------------------|-----------|-----------|-------|
| Conference tickets, travel, and lodging | Networking and training | -$2,182 | |
| [Xero](https://xero.com/) | Bookkeeping | -$151 |  |
| Bench to Xero migration   | Bookkeeping | -$232 | |
| [Circle CI](https://travis-ci.com) | Continuous integration | -$350 |  |
| [Coveralls](https://coveralls.io) | Test coverage tracking | -$270 |  |
| Meetups, books | | -$XX | |

Conferences are a big expense because travel and lodging is expensive, and the conferences that accept me tend to be smaller and don't offer significant travel assistance. I enjoy conferences and I feel that I learn from them, but I can't think of anything I learned from conferences this year that substantially improved my life or my business. I'll continue applying to conferences in 2020, but I'm limiting it to conferences that people have strongly recommended (e.g., MicroConf, PyCon) or conferences in cities that I'd like to visit.

I saved $68/month by switching from from Travis to Circle, which worked out great because it turns out Circle is a much better product. I paid for another year of Coveralls, which I now regret after accepting that code coverage metrics have little value for early stage products. I canceled my Coveralls subscription for next year.

I also switched from managed bookkeeping with Bench to self-serve bookkeeping with Xero. I enjoyed Bench and have no love for Xero, but I couldn't justify spending an extra $1.5k/yr for concierge bookkeeping when my finances are so simple and consistent.

### Notable cutbacks

* Bench
* Travis CI
* Coveralls
* GitHub Pro ($91)

## Grading my goals

In last year's update, I 


### Achieve $500/month in revenue across my businesses

**Grade**: A-

### Present talks at three software conferences

**Grade**: A

| Conference                                  | My notes | Recording |
|---------------------------------------------|----------|-------|
| [NERD Summit](https://2019.nerdsummit.org/) |                                               | ["Modernize any Codebase through Tooling and Technique"](https://youtu.be/GfkVhr6SPz4)
| [PyTexas 2019](https://2019.pytexas.org/)   | [Notes](/retrospectives/pytexas-2019-notes/)  | ["Why Good Developers Write Bad Tests"](https://youtu.be/hM_ex4-xu4E)
| [PyGotham 2019](https://2019.pygotham.org/) | [Notes](/retrospectives/pygotham-2019-notes/) | ["Why Good Developers Write Bad Tests"](https://youtu.be/ElzBGwyDzCc) |

### Publish 12 blog posts.

**Grade**: B

Depending on how you count, I either published 9 or 13 blog posts in 2019. I had nine separate updates to my blog, but one of them was [a five-part series on hiring content writers](/hiring-content-writers/).

### Gain comfort with a JavaScript framework (e.g., [Vue](https://vuejs.org/), [Angular](https://angular.io/), [React](https://reactjs.org/)).

**Grade**: A


## Raise prices, even if nobody's buying

One of the best pieces of [advice I received](/retrospectives/2019/07/#suddenly-everyone-wants-to-parse-ingredients) this year was from [Cory Zue](https://coryzue.com). He suggested that at $0.003 per request, my prices for Zestful were too low.

At the time, Zestful had almost zero customers. Wouldn't raising prices be the solution if I had *too many* customers?

In a way, I did have too many customers. About once a month, I'd get a request from a customer who said they wanted to use Zestful for their next project. They just needed me to add *one teensy tiny* feature before it would satisfy their needs. Eager to win a new customer, I'd spend the next two weeks feverishly implementing the feature they wanted. Then, nothing. They'd either stop responding, tell me they decided not to move forward with their project, or spend $5 on the platform and thank me for processing all their data.

I recognized that this kept happening, but I didn't know of a way to prevent it. If they asked for a feature, it felt unprofessional to say, "Before I decide to implement it, can you tell me the total revenue you'd provide throughout your customer lifetime?" Even if I asked more polite versions of the question, like, "What kind of volume would you need?" they knew nobody would take them seriously if they said they were a small customer, so they'd play up their plans for growth.

It changed the conversations. Instead of me having to guess about whether they were planning to spend real money, they were telling me up front because they wanted to use their volume to negotiate a lower price. Then, if they asked for a new feature, I could politely tell them that I could guarantee it would be implemented by a certain date if they were willing to pre-pay $X, where X is several thousand dollars so that I can justify spending several weeks implement their request.

## Stop outsourcing when it slows you down, not to inflate profits

This year, I substantially cut back on the amount of work I outsourced to freelancers, but not for the reason you might assume. I think people get too obsessed with paper profits and discount the value of their time.

Take Is It Keto. It's basically a content site. Hiring someone takes a lot of time. I have to write a job description, advertise it, screen candidates, negotiate compensation, then train them. For writers on Is It Keto, it usually took three or four months before the total amount of time I saved by outsourcing is a net positive.

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

## Customer research is a full-time job

One of the mistakes I made this year was treating customer research as if it's a project that should take up only 20% of my time. In [April](/retrospectives/2019/05/), I was developing What Got Done, interviewing copywriters about my email tool idea, and trying to get stone quarry operators to talk to me about their software needs. It was way too much.

It seems like it shouldn't take very long because you're probably only talking to customers a very small percentage of the time, but you're doing lots of other things that do take time. You're researching the customers, researching the tools they use, transcribing notes from your meetings.

During the research phase, customers are generally doing you the favor by taking the time to speak with you, so you need to give yourself enough time that you can minimize theirs and respond quickly. If they offer to make you an introduction, they're going to be a lot less enthusiastic about following through if you follow up three weeks later because you're busy exploring four different ideas simultaneously.

## I still love it

Everything's great.

## Goals for year three

Here's what I hope to accomplish in my third year as a solo developer:

* Earn $20,000 in revenue across my businesses.
* Publish 10 blog posts.
* Learn one new technology.

---

*Cover art by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/). Go gopher adapted from a design by [Renee French](http://reneefrench.blogspot.com/).*