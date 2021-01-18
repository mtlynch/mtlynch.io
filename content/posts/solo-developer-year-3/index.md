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

I went into more detail about this in last year's retrospective (TODO: link), but the short version is: low cost of living, significant savings from my Google days, and passive investment income.

{{</notice>}}

## Project by project

### WanderJest

I started the year with an ambitious new project called WanderJest. I described it as "Bandsintown, but for comedy." I love live comedy, but I'm terrible at discovering shows. There's no unified place to find out about them. I've missed countless opportunities to see a comedian's show because I'm not on the right mailing list, not following the right social media account, or not checking Ticketmaster daily. I wanted WanderJest to provide a convenient, aggregate view of all live comedy near you.

My plan was to earn money through affiliate partnerships. Comedians struggle to get fans to their shows, so if I could help, that would be valuable.

The only problem was that I couldn't bring anyone to shows. I made a few affiliate deals with theaters and show organizers, and in two months, a grand total of zero ticket buyers used my discount code.

All that was sure to change with my big, brilliant marketing stunt. I spent [a thousand dollars](/retrospectives/2020/03/#100-in-revenue-but-at-what-cost) marketing a "Comedy Scavenger Hunt" that would award cash prizes to fans for attending local comedy shows. The month of the big event? March 2020. You can probably guess how that turned out. [I shuttered the site](/retrospectives/2020/04/#putting-wanderjest-on-hold) in mid-March.

It was the most fun I've ever had building a product. Even though everything I tried completely failed, I found it so fun to be in the comedy world, going to shows and interviewing comedians about what tools would help them.

### Portfolio Rebalancer

After shutting down WanderJest, I didn't know what to work on. With COVID turning everything upside down, I decided to just make a tool I wanted personally: a portfolio rebalancer.

My investment portfolio is XX% bonds, XX% US stocks, and XX% international stocks. As market prices change, the balance of my investments change, so I have to move money around to get back to my target ratios.

I've always just done this in a spreadsheet. It's a tedious process where I plug in a bunch of hypothetical trades and keep adjusting numbers until everything looks right. Why not automate it in a web app?

Only one person was interested enough to sign up for the free trial, and they ultimately decided not to buy. After a month, a month, I decided it wasn't worth pursuing and moved on.

### Is It Keto

I started Is It Keto in 2018. It's a simple site that just tells you whether or not certain foods fit the keto diet. I go through cycles where I focus on it for a while, ditch it because I'm not passionate about it, then come back a few months later as it's grown in the background.

{{<revenue-graph project="isitketo">}}

I had two new ideas for Is It Keto.

The first was to templatize content. For all of Is It Keto's life, each article was 100% original and custom-written by me or writers I hired (TODO: link). I always knew I could auto-generate some of the content based on nutritional data, but I feared Google would punish me. But this year, an SEO friend explained that I'd misunderstood the rules. Adding value by generating text or UI around data is fine. Google just doesn't like it if you generate a bunch of garbage text meant to look like human-written content.

My other idea was from my friend Justin Vincent, who recommended that I offer a sister product to Is It Keto. I was getting XX unique visitors per month, and he said I was squandering the opportunity by just showing them ads and affiliate links. I tested a few landing pages for paid keto communities and apps, but only XX% of visitors signed up for the mailing list. It seemed like it would be a long time before I find any way to earn money from these sister products, and I wasn't sure I was that excited about keto.

Luckily, the decision became easy for me.

### TinyPilot

In May, I started tinkering with a device that would allow me to manage my servers remotely. Once I got it working, I tried selling kits to other people so that they could build their own. I didn't think much would come of it, but I thought maybe I could earn an extra few hundred dollars per month by selling one or two per week.

I blogged about it, and I knew immediately that this project was different. It reached the front page of Hacker News and became one of the top "Show HN" posts of all time. Within hours, I sold all 13 of the kits I'd purchased, and things continued to grow from there. I ended the year with $XXk in revenue.

{{<revenue-graph project="tinypilot">}}

While I was working on Is It Keto, I was thinking about building a new VM server. I was beginning to hit the limits of my old one, and I wanted to correct some mistakes I made in building it.

The biggest mistake I made in building my first server was not considering remote management. If I ever ran into issues booting the server, I had to drag it over to my desk, swap all my keyboard and monitor cables, fix the issue, then put everything back.

I had read that the Raspberry Pi could emulate a keyboard. I was pretty sure it could capture video, too. So if I could get that working, I could build my own KVM over IP device. I started tinkering with it around May.

I wrote a blog post about it thinking that it could be a neat side project. My hope was that I could make an extra $100 per week selling little kits to reproduce my project. But I posted it to Hacker News, and I sold out within hours.

I realized there was a real business here that was way bigger than any other project I was working on.

### Hit the Front Page of Hacker News

In XX, I gave a talk to my peer mentorship group called "How to be a Sort of Successful Software Blogger." The talk covered the best tips I'd learned about blogging in the past few years.

I liked writing it, but as I mentioned above, I didn't have anywhere to share it.

### mtlynch.io (this blog)

I don't think of my blog as a business. I write because I enjoy it and want to improve my writing.

Perhaps because it's not a business, I'd never thought much about strategy for the blog.

At the beginning of 2020, I had two realizations.

The first is that I have more fun with my blog when my posts attract a large audience. Before 2020, I wrote with an attitude of, "This topic is on my mind right now, so I'm going to write about it and see what happens." Sometimes the post would find an audience, but more often it wouldn't.

Now, I think about sharing the article before I write it. Would this do well on reddit? Would Hacker News find this interesting? Is this a topic people ever Google?

That change made a huge difference in my readership. Looking at the number of readers each article attracts the first week after publication, the median went from XX in 2019 to XX in 2020. All but one of my blog posts reached the front page of Hacker News, and four of them reached the #1 slot.

## Lessons learned

### Success in one area leads to success elsewhere

People are more interested in what I post on Twitter and . And then because of that, when I send people cold emails, they're more interested in talking to me because

I was always a little resentful of other indie developers who get attention by boasting about revenue without doing any real introspection or sharing anything useful. Time and again, I'd see people cheer on a post that was basically, "Wow, I spent two hours putting up a landing page, went to sleep, and woke up to find $20k in pre-orders! Go me!" It felt like

Now that I'm earning more money, I feel like my suspicions are confirmed. It's so much easier to attract people to content about your business when you're making money. My retrospectives, which people were never that excited about before, suddenly get a lot of attention on Twitter and reddit even though nothing has changed except for the numbers.


I noticed that once I started talking about earning money, people became more interested in following me on Facebook. I write monthly retrospectives, and I used to post them occasionally to the /r/SideProject subreddit, but once my revenue reached $10k, people would get excited about them. Even when the retrospective was me saying how I did a bad job that month and neglected my business, people were still excited that my revenues grew.

### The first $1,000 is harder than the next $9,000

The first two and a half years of working on my own, I was grinding away to grow my little businesses. Last year, Cory Zue inspired me to take bigger swings and go for something that earned serious money from the start rather than try to monetize my businesses $0.01 per unique visitor at a time.

I thought earning $10,000 per month would be an order of magnitude harder than earning $1,000, but it's significantly easier. TinyPilot feels like it just grows on its own. Maybe that's an illusion because I am thinking strategically about how to develop the product, but it feels like it has this momentum of its own.

### There's no shame in seeking product-founder fit

One of the considerations I've had in all the businesses I've ever started is that I wanted to be able to tune out on evenings and weekends. One of the things I hated most at Google was being "on call" where a page could wake me up at 3 AM, and I'd have to get up and fix the issue, then go to work like normal the next day.

None of my projects require me to carry a pager. Is It Keto could have a complete outage over the weekend, and it wouldn't matter much.  I'd lose a little bit of ad revenue, but that's it.

Imagine instead that I had built a web service called Is It Lethal, and it allowed pharmacies to automatically check whether prescription drug combinations could kill their patients. That's the kind of thing that needs to be online all the time, and if it's down at 4 AM, someone should page me. An outage there would be A Big Deal.

I was always a little embarrassed that I had this restriction. I felt like I wasn't a *real* entrepreneur by limiting myself in this way. I wondered if the reason none of my products had taken off was because I was being too prissy about carrying a pager.

After my last year-in-review, Patrick McKenzie recommended I watch a Jason Cohen video. Jason Cohen has launched several successful startups. In the video, he recommends that solo founders avoid businesses where an outage is A Big Deal.

### Success is more stressful than failure

I didn't make money, but people were supportive. I was the scrappy little developer who kept on going.

## Grading last year's goals

At the start of last year, I [set three high-level goals](/solo-developer-year-2/#goals-for-year-three). Here's how I performed against them.

### Earn $20,000 in revenue across my businesses

* **Result**: Earned $XX in revenue
* **Grade**: A+

For the first half of the year, I didn't think I'd make it. Fortunately, I landed on a winner with TinyPilot that put me way above my goal.

### Publish 10 blog posts

* **Result**: Published 9 blog posts
* **Grade**: A-

Depending on how you count, Instead of a tenth blog post, I published

### Learn one new technology

* **Result**: Learned more JavaScript
* **Grade**: B-

I was hoping to find an excuse to learn Rust, but I never found a good match.

Instead, I ended up gaining more breadth and depth in JavaScript. I already knew Vue, but this year I learned to use Gridsome, a Vue-based static site generator. I used it to rewrite Is It Keto and to build [my TinyPilot sales site](https://tinypilotkvm.com). I also learned to use pure JavaScript more effectively. TinyPilot's web app is pure JavaScript (TODO: link) with no Webpack or compilation step, and I love the simplicity of it.

## Goals for year four

### Earn $250,000 in revenue across my businesses

This is an aggressive goal. It's certainly a big jump from my previous goal of $20,000. Based on TinyPilot's rate of growth, it feels achievable.

### Publish six blog posts and one ebook

I enjoy writing more than recording video lessons. I'd like to write a book that teaches software developers to write effectively. It's tentatively titled *Refactoring English: Effective Writing for Software Developers*.

### Automate TinyPilot management

My girlfriend works with me on TinyPilot part-time. She manages inventory and packs orders, but this is fragile and doesn't scale well. I'd like to systematize and outsource enough of our processes that we can take a two-week vacation and let the business run on its own.

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
                          return '$' + value;
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
