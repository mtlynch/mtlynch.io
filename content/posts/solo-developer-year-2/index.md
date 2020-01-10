---
title: My Second Year as a Solo Developer
date: '2020-01-31'
---

Previously, on mtlynch.io...

* Feb. 2018: I [quit Google to work for myself](/why-i-quit-google/)
* Feb. 2019: I posted a [one-year update](/solo-developer-year-1/)

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
});
</script>

| Metric     | 2018        | 2019       | Change                                        |
|------------|-------------|------------|-----------------------------------------------|
| Revenue    | $2,262   | $7,254  | <font color="green">+$4,992 (+220%)</font> |
| Expenses   | $23,133  | $9,657  | <font color="green">-$13,477 (-58%)</font> |
| Net Profit | -$20,871 | -$2,402 | <font color="green">+$18,469 (+88%)</font> |

I still finished the year in the red, but I'm much closer to profitability than I was last year.

## How do you afford to keep losing money?

When I tell people what I do or even if they read my blog, people come away thinking that I fund my ventures by freelancing, but I've actually never done freelance work. I recognize that I'm very fortunate to pursue this lifestyle, and it comes from three main factors.

* Low expenses: I live in an inexpensive area where my expenses are around $2k/mo.
* High savings: It's hard to work for big software companies for 11 years without a healthy pad of savings.
* Lucky investments: I've been putting money into the S&P 500 for historically strong runs and I took small bets on cryptocurrency that paid off well.

## Why I outsourced less

People are obsessed with profits. It seems crazy to 

It is a bad idea because it bogs you down.

Just because I outsource something doesn't make it worth outsourcing. I was excited about delegating all of Is It Keto's Twitter to an overseas freelancer, but I realized I was paying $XX for every visitor from Twitter and only earning back $XX..

## Raise prices, even if nobody's buying

One of the best pieces of [advice I received](/retrospectives/2019/07/#suddenly-everyone-wants-to-parse-ingredients) this year was from [Cory Zue](https://coryzue.com).

It changed the conversations. Instead 

## Idea screening is more important than a good idea

* Stone quarries: Most quarry owners weren't interested in talking to me, the one that did didn't seem to have problems I could solve with software.
* Email copywriters: 
* Sheet metal shops: There are existing solutions

Even What Got Done, which I did build, is something I deliberately bailed on because it wasn't gaining traction. My main goal in building it was that I felt frustrated that Is It Keto hadn't grown the way I wanted (it turned out all I had to do was let it sit for XX months), so I wanted a fun project where I could learn Vue.js.

## Project by project

### [Zestful](https://zestfuldata.com)

{{< img src="zestful-screenshot.png" alt="Screenshot of Zestful website" hasBorder="True" maxWidth="500px" >}}

Zestful was my first attempt at software-as-a-service (SaaS). It allows developers to infer structure from recipe ingredients programmatically. Given an ingredient like `"2 1/2 tablespoons finely chopped parsley"`, Zestful tells the application that `2.5` is the quantity, `tablespoons` is the unit of measure, `parsley` are the product, and `finely chopped` is a preparation step.

| Income/Expense   | Amount    |
|------------------|-----------|
| Sales            | $5,022 |
| Hosting          | -$80   |
| Domains          | -$12    |
| **Net profit**   | **$4,930‬** |

### [Is It Keto](https://isitketo.org)

{{< img src="isitketo-screenshot.png" alt="Screenshot of Is It Keto website" hasBorder="True" maxWidth="500px" >}}

Is It Keto gives readers clear, simple answers about which foods are compatible with [the keto diet](https://en.wikipedia.org/wiki/Ketogenic_diet). If the food is keto-friendly, the site displays a purchase link and receives commission from any sales. The site also earns money from display ads through Google AdSense.

| Income/Expense           | Amount     |
|--------------------------|------------|
| Amazon Affiliate revenue | $1,315  |
| Google AdSense revenue   | $940    |
| Meal plan sales          | $24     |
| Content writing          | -$3,845   |
| Social media management  | -$314   |
| Graphic design           | -$163   |
| Hosting                  | -$103   |
| Domain                   | -$12   |
| **Net profit**           | **-$2,158** |

Total of ~$2.3k of revenue.

38% of content writers was on writers who didn't work out. I either stuck with them too long.

### mtlynch.io *(this blog)*

| Income/Expense | Amount |
|---------------------------------------------|---------|
| Affiliate revenue                           | $374     |
| Development                                 | -$460 |
| [Illustrations](/how-to-hire-a-cartoonist/) | -$769 |
| Hosting                                     | -$150 |
| [Grammarly](https://www.grammarly.com/?affiliateNetwork=cj&affiliateID=8329872) (Grammar and style checking service) | -$140 |
| [Editing](/editor/)                         | -$60 |
| Domain                                      | -$60 |
| **Net profit**                              | **-$1,265** |

### What Got Done

{{< img src="whatgotdone-screenshot.png" alt="Screenshot of What Got Done website" hasBorder="True" maxWidth="500px" >}}

| Income/Expense                              | Amount |
|---------------------------------------------|---------|
| Customer interviews                         | -$31 |
| Domain                                      | -$12 |
| **Net profit**                              | **-$43** |

### Everything Else

| Expense                   | Purpose   | Amount    | Note  |
|---------------------------|-----------|-----------|-------|
| Conference tickets, travel, and lodging | Networking and training | -$2,182 | |
| [Xero](https://xero.com/) | Bookkeeping | -$151 |  |
| Bench to Xero migration   | Bookkeeping | -$232 | |
| [Circle CI](https://travis-ci.com) | Continuous integration | -$350 |  |
| [Coveralls](https://coveralls.io) | Test coverage tracking | -$270 |  |
| Meetups, books | | -$XX | |

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

## Goals for year three

Here's what I hope to accomplish in my third year as a solo developer:

* Earn $20,000 in revenue across my businesses.
* Present talks at three software conferences.
* Publish 10 blog posts.
* Learn one new technology.

---

*Cover art by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/). Go gopher adapted from a design by [Renee French](http://reneefrench.blogspot.com/).*