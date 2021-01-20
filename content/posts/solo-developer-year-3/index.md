---
title: My Third Year as a Solo Developer
tags:
- annual review
- blogging
- tinypilot
- is it keto
- wanderjest
hero_image: cover.jpg
date: '2021-02-01'
---

Today is the third anniversary of me [quitting my developer job at Google](/why-i-quit-google/) to build my own software business. I posted updates at the end of my [first](/solo-developer-year-1/) and [second](/solo-developer-year-2/) years on my own, and this year will be no different.

## The big picture

This is the year that things finally began clicking into place for me. I made less than $10,000 total in my first two years, so I [set a goal](/solo-developer-year-2/#goals-for-year-three) to earn $20k by the end of my third year.

For the first six months, it didn't look like I was going to make it. My businesses collectively earned about $300/month, and none of my ideas for new revenue sources were working.

Miraculously, I had one good idea, and it turned everything around. By the end of the year, I had $XX in revenue, far exceeding my goal.

TODO: Graph

Okay, I'm still not making a profit, but this time I have a good excuse! I sell a physical product now, so my income lags my expenses by two or three months. My profit margins are XX% to XX% per sale, so the numbers will catch up eventually.

{{<notice type="info">}}

**Wait, how can you afford to keep losing money?**

I went into more detail about this [in last year's retrospective](/solo-developer-year-2/#how-can-you-afford-to-keep-losing-money), but the short version is: low cost of living, significant savings from my Google days, and passive investment income.

{{</notice>}}

## Project by project

### [WanderJest](https://wanderjest.com)

{{<img src="wanderjest-feb-2020.jpg" alt="Screenshot WanderJest website" hasBorder="True" maxWidth="600px" caption="[WanderJest](https://wanderjest.com) helps comedy fans find live comedy shows nearby.">}}

I started the year with an ambitious new project called WanderJest. I described it as "Bandsintown, but for comedy." I love live comedy, but I'm terrible at discovering shows. There's no unified place to find out about them. I've missed countless opportunities to see a comedian's show because I'm not on the right mailing list, not following the right social media account, or not checking Ticketmaster daily. I wanted WanderJest to provide a convenient, aggregate view of all live comedy near you.

My plan was to earn money through affiliate partnerships. Comedians struggle to get fans to their shows, so if I could help, that would be valuable.

The only problem was that I couldn't bring anyone to shows. I made a few affiliate deals with theaters and show organizers, and in two months, a grand total of zero ticket buyers used my discount codes.

All that was sure to change with my big, brilliant marketing stunt. I spent [a thousand dollars](/retrospectives/2020/03/#100-in-revenue-but-at-what-cost) marketing a "Comedy Scavenger Hunt" that would award cash prizes to fans for attending local comedy shows. The month of the big event? March 2020. You can probably guess how that turned out.

Despite the fact that everything I tried completely failed, it was the most fun I've ever had building a product. I found it so fun to be in the comedy world, going to shows and interviewing comedians about what tools would help them.

### [Portfolio Rebalancer](https://assetrebalancer.com/)

{{<img src="rebalancer-screenshot.png" alt="Screenshot of Is It Keto website" hasBorder="True" maxWidth="550px" caption="[Portfolio Rebalancer](https://assetrebalancer.com/) helps passive investors manage their investments.">}}

After shutting down WanderJest, I didn't know what to work on. With COVID turning everything upside down, I decided to just make a tool I wanted personally: a portfolio rebalancer.

My investment portfolio is 45% US stock, 35% bonds, and 20% international stocks. As market prices change, the balance of my investments change, so I have to move money around to get back to my target ratios.

I've always just done this in a spreadsheet. It's a tedious process where I plug in a bunch of hypothetical trades and keep adjusting numbers until everything looks right. Why not automate it in a web app?

Only one person was interested enough to sign up for the free trial, and they ultimately decided not to buy. After a month, a month, I decided it wasn't worth pursuing and moved on.

### [Is It Keto](https://isitketo.org)

{{<img src="isitketo-screenshot.png" alt="Screenshot of Is It Keto website" hasBorder="True" maxWidth="550px" caption="[Is It Keto](https://isitketo.org) tells readers which foods fit the keto diet.">}}

I started Is It Keto in 2018. It's a simple site that just tells you whether or not certain foods fit the keto diet. I go through cycles where I focus on it for a while, ditch it because I'm not passionate about it, then come back a few months later as it's grown in the background.

{{<revenue-graph project="isitketo">}}

I had two new ideas for Is It Keto.

The first was to templatize content. For all of Is It Keto's life, each article was 100% original and custom-written by me or [writers I hired](/hiring-content-writers/). I always knew I could auto-generate some of the content based on nutritional data, but I feared Google would punish me. But this year, an SEO friend explained that I'd misunderstood the rules. Adding value by generating text or UI around data is fine. Google just doesn't like it if you generate a bunch of garbage text meant to look like human-written content.

My other idea was from my friend Justin Vincent, who recommended that I offer a sister product to Is It Keto. I was getting XX unique visitors per month, and he said I was squandering the opportunity by just showing them ads and affiliate links. I tested a few landing pages for paid keto communities and apps, but only 0.1% of visitors [signed up for the mailing list](/retrospectives/2020/07/#validating-keto-product-ideas). It seemed like it would be a long time before I find any way to earn money from these sister products, and I wasn't sure I was that excited about keto.

### TinyPilot

In May, I started thinking about [building a new VM server](/building-a-vm-homelab/). One of the biggest problems with my previous server was that it was a pain to fix when it failed to boot or I wanted to install a new operating system.

I had read that the Raspberry Pi could emulate a keyboard. I was pretty sure it could capture video, too. So if I could get that working, I could build my own remote management device. I started tinkering with it around May. Once I got it working, I tried selling kits to other people so that they could build their own. I didn't think much would come of it, but I thought maybe I could earn an extra few hundred dollars per month by selling one or two per week.

Then, I blogged about TinyPilot. It immediately became clear that this business was different from anything else I'd ever built before.

It reached the front page of Hacker News and became one of the top "Show HN" posts of all time. Within hours, I sold all 13 of the kits I had in stock, and things continued to grow from there. I ended the year with $53k in revenue.

{{<revenue-graph project="tinypilot">}}

### [Hit the Front Page of Hacker News](https://hitthefrontpage.com)

{{<img src="htfp-cover.png" maxWidth="550px" caption="[*Hit the Front Page of Hacker News*](https://hitthefrontpage.com), a video course I released this year about my blogging techniques.">}}

In May, I gave a talk to my peer mentorship group called ["How to be a Sort of Successful Software Blogger."](https://decks.mtlynch.io/show-and-tell-2020-05/) The talk covered the best tips I'd learned about blogging in the past few years and explained why I thought my writing has been especially successful at succeeding on sites like Hacker News and reddit.

I had fun deconstructing my process and explaining it. I wanted to talk more about it, but I didn't have a good place to share it. Every time I had ever tried to blog about blogging, the articles flopped because there are way too many people trying to give blogging advice.

After seeing several other developers sell educational products, I thought it could work that way. I had also seen how powerful it could be to align my blog with my business, so I felt like if people liked my writing, maybe they'd buy a course about how I do it.

Cory Zue teased me about how jaded I've become to be disappointed over $3,000 in sales, when that number exceeded my earnings for all of 2018.

### mtlynch.io (this blog)

I don't think of my blog as a business. I write because I enjoy it and want to improve my writing.

Perhaps because it's not a business, I'd never thought much about strategy. I wrote with an attitude of, "This topic is on my mind right now, so I'm going to write about it and see what happens." Sometimes the post would find an audience, but more often it wouldn't.

The big change I made this year was planning up-front about my audience, which meant asking myself two questions before I began writing:

1. How many readers are interested in this topic?
1. Do I have a way of reaching them?

Question #2 is important, as it would have saved me the three months I spent writing "Hiring Content Writers: A Guide for Small Businesses." There are plenty of people interested in that topic, but I have no way of reaching them.

Asking myself these two questions made a huge difference in my readership. In 2019, my articles attracted an average of 5,000 readers in their first week. In 2020, this jumped to 25,000. Eight of my nine blog posts reached the front page of Hacker News, and four of them reached the #1 slot.

## Lessons learned

### Product market fit is magic

There's a term that's popular in the startup community: product-market fit. It means that you built a product that matches the needs of a critical mass of users. People talk about it the way they talk about finding true love, and now I understand why.

The first two and a half years of working on my own, I was grinding away to grow my little businesses. Last year, Cory Zue inspired me to take bigger swings and go for something that earned serious money from the start rather than pursue businesses that were earning me $0.01 per user.

With TinyPilot, there's clearly product market fit, and it's such a different experience. It feels like the product drives the business, and I'm just along for the ride. There have been many months where I felt like I made big mistakes in managing the business, and it continued growing anyway.

I thought earning $10,000 per month would be an order of magnitude harder than earning $1,000, but it's significantly easier. TinyPilot feels like it just grows on its own. Maybe that's an illusion because I am thinking strategically about how to develop the product, but it feels like it has this momentum of its own.

### There's no shame in seeking product-founder fit

One of the things I hated most at Google was the on-call rotation. Every two months, I had to take a two-week on-call shift, which meant carrying a pager and being ready 24/7 to accept the page and get in front of my work laptop in under 30 minutes. There were several times the pager woke me up in the middle of the night,

Since leaving Google, I've been careful about avoiding businesses where an outage would be A Big Deal. I didn't want to wake up at 4am to handle a work emergency, and I didn't want to carry a laptop with me everywhere I went.

My friend Justin Vincent refers to this as "product-founder fit." People focus heavily on "product-market fit," &mdash; building a product that serves a good group of customers. But before that, you need to figure out the product-founder fit. Is this building this product something that would make *you* happy?

Around the two year mark, I started worrying that this restriction that was preventing me from succeeding. I kept seeing other founders succeed with businesses that most definitely do require a pager. Maybe there wasn't space for founders who weren't willing to make that commitment?

After my last year-in-review, Patrick McKenzie recommended I watch a talk by Jason Cohen, who has launched several multimillion dollar startups. In the video, he recommends that solo founders avoid businesses where an outage is A Big Deal. He says that there's too high a risk of burnout.

That was a big relief. Just being able to hear from someone else that it's okay to protect your focus like that was nice.

And now it's working. TinyPilot had $XXk of revenue last month, but I never have to worry about outages. TinyPilot customers run my software on their own devices. I could shut down every server and delete every code repository, and TinyPilot customers could happily using what they purchased.

### Success in one area leads to success elsewhere

People are more interested in what I post on Twitter and . And then because of that, when I send people cold emails, they're more interested in talking to me because

I was always a little resentful of other indie developers who get attention by boasting about revenue without doing any real introspection or sharing anything useful. Time and again, I'd see people cheer on a post that was basically, "Wow, I spent two hours putting up a landing page, went to sleep, and woke up to find $20k in pre-orders! Go me!" It felt like

Now that I'm earning more money, I feel like my suspicions are confirmed. It's so much easier to attract people to content about your business when you're making money. My retrospectives, which people were never that excited about before, suddenly get a lot of attention on Twitter and reddit even though nothing has changed except for the numbers.

I noticed that once I started talking about earning money, people became more interested in following me on Facebook. I write monthly retrospectives, and I used to post them occasionally to the /r/SideProject subreddit, but once my revenue reached $10k, people would get excited about them. Even when the retrospective was me saying how I did a bad job that month and neglected my business, people were still excited that my revenues grew.

### Success is more stressful than failure

I didn't make money, but people were supportive. I was the scrappy little developer who kept on going.

## Grading last year's goals

At the start of last year, I [set three high-level goals](/solo-developer-year-2/#goals-for-year-three). Here's how I performed against them.

### Earn $20,000 in revenue across my businesses

* **Result**: Earned $XX in revenue
* **Grade**: A+

For the first half of the year, I didn't think I'd make it. Fortunately, TinyPilot grew so quickly that it put me well past my goal.

### Publish 10 blog posts

* **Result**: Published nine blog posts
* **Grade**: A-

I was on track to publish 10 posts, but I decided to forego my tenth post to make time to produce my video course. Nevertheless, I'm pleased with the results of my blog posts this year.

### Learn one new technology

* **Result**: Learned more JavaScript
* **Grade**: B-

I was hoping to find an excuse to learn Rust, but I never found a good match.

Instead, I ended up gaining more breadth and depth in JavaScript. I already knew Vue, but this year I learned to use Gridsome, a Vue-based static site generator. I used it to rewrite Is It Keto and to build [my TinyPilot sales site](https://tinypilotkvm.com).

I also learned to use plain JavaScript more effectively. TinyPilot's web app [is pure JavaScript](https://github.com/mtlynch/tinypilot/tree/bf07bfe72941457cf068ca0a44c6b0d62dd9ef05/app/static/js) with no Webpack or compilation step, and I love the simplicity of it.

## Goals for year four

### Earn $500,000 in revenue across my businesses

Okay, as crazy as it sounds to go from a goal of $20k to $500k, I think this is achievable. TinyPilot has already earned $30k in January, so I'd just have to grow an average of XX% per month to reach $500k by end of year.

### Publish six blog posts and one ebook

I've distantly fantasized about writing a book ever since I began working for myself, and I want to finally do it this year. The book will teach software developers easy ways to make their writing more effective. It's tentatively titled [*Refactoring English: Effective Writing for Software Developers*](https://refactoringenglish.com).

### Automate TinyPilot management

My girlfriend works with me part-time on TinyPilot, managing inventory and packing orders. We enjoy working together, but it's a fragile system that scales poorly. I'd like to systematize and outsource enough of our processes that we can take a two-week vacation and let the business run on its own.

<script src="/js/chart.js/2.9.4/Chart.min.js"></script>
<script>
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
                    suggestedMin: 0,
                      callback: function(value) {
                          return '$' + value.toLocaleString();
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
drawCharts("2021-01");
</script>
