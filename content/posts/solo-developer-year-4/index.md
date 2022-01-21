---
title: My Fourth Year as a Solo Developer
tags:
- annual review
- blogging
- tinypilot
- is it keto
- zestful
description: TODO
date: '2022-02-01'
hero_image: cover.jpg
---
Four years ago to the day, I [quit my job as a developer at Google](/why-i-quit-google/) to experiment with bootstrapping a software business. I attempted several businesses for the first few years, and one finally caught on in 2020.

Previous updates:

* [My First Year as a Solo Developer](/solo-developer-year-1/)
* [My Second Year as a Solo Developer](/solo-developer-year-2/)
* [My Third Year as a Solo Developer](/solo-developer-year-3/)

## The year of scaling

TODO: Graph of money

{{<notice type="info">}}

**How can you afford to keep losing money?**

I went into more detail [in my year two retrospective](/solo-developer-year-2/#how-can-you-afford-to-keep-losing-money), but the short answer is: low cost of living, significant savings from my Google days, and passive investment income.

{{</notice>}}

## TinyPilot's second year

In 2021, I focused mainly on TinyPilot, a company [I created in mid-2020](/tinypilot). TinyPilot is an open-source KVM over IP device built on the Raspberry Pi. It allows you to control another computer from your browser without installing any software, even when the computer is in BIOS or has no network connectivity.

At the start of 2021, I was TinyPilot's sole developer, customer support person, salesperson, and marketer. The only other employee was my girlfriend, who managed inventory and fulfilled orders. We ran TinyPilot out of our home, which was slowly transforming into a TinyPilot warehouse and fulfillment center.

Today, TinyPilot has a real office, a two-person fulfillment staff, a team of three developers, and a [distributor in Europe](https://kvm-ip.de).

{{<revenue-graph project="tinypilot">}}

TODO: Stats

Revenue is XXx what from 2020, but we also had the full year. But sales are growing steadily.

### Software progress

The software has changed a lot in the last year, too. For fun, I installed the version of TinyPilot from January 2021 and compared it to our January 2022 release. I was surprised at how much has changed in just a year in just the UI:

TODO: GIF comparison

We've added several major features in the last year including:

* Mounting virtual USB drives and CD-ROMs
* Wake on LAN
* Password-based authentication
* Software updates from the web UI
* Video bandwidth tuning

## Other projects

### *Refactoring English*

One of my 2021 goals (TODO: link) was to publish a book about techniques developers can use to improve their writing. I've learned several techniques and habits that have made my writing more effective. I wanted to write a book capturing all the techniques I apply when writing.

My great shame of the year is that I made almost no progress on this book.

I've had a morning ritual for the past three years of writing for an hour every morning. That generally translated to about ten blog posts per year. I thought that if I spent that time on a book instead, I'd be done within a year.

Unfortunately, TinyPilot has its own pace that I don't fully control. For the first few months of 2021, I stuck to writing for an hour in the morning, but I'd end every day without finishing everything I needed to do for TinyPilot. I decided to [suspend my writing](/retrospectives/2021/09/#can-i-afford-to-keep-writing) until TinyPilot required less attention, but that never happened.

I'm still excited to write this book, and I hope I have more time for it this year.

### mtlynch.io (this blog)

As with my lack of book-writing time, I had very little blog-writing time. I published three new blog posts, my fewest-ever in five years of blogging.

Ironically, the year that I have the least amount of time to write is the year that I had the most to write about. There are so many things I have to learn for TinyPilot that I wish I could capture while the experience is still fresh in my mind, but there just isn't enough time.

I kept my habit of writing [monthly retrospectives](/retrospectives/). I can budget time for those because an unambiguous net positive for my business, even in the short term. Almost every retrospective I write, I discover some flaw in my strategy or a weakness in my plans that I wouldn't have noticed had I not sat down to organize my thoughts and write everything out.

### Hit the Front Page of Hacker News

{{<img src="htfp-cover.png" maxWidth="550px" caption="[*Hit the Front Page of Hacker News*](https://hitthefrontpage.com) is my course about my blogging.">}}

At the beginning of the year, I released my first-ever paid course. It explained my approach to writing blog posts that gain traction on tech-oriented sites like Hacker News and reddit.

I'm proud of the content, and I've heard positive feedback from customers. A few people credited it with helping them write blog posts that became very popular on Hacker News.

It earned $XX in its first year, which was a bit disappointing. I was hoping for something closer to $20k. Had TinyPilot not been so busy, I could have spent more time marketing it and gotten closer to my goal. Still, the expereience taught me a lot about creating an educational product, and I'd like to do more of it in the future.

{{<revenue-graph project="htfp">}}

### Is It Keto

{{<img src="isitketo-screenshot.png" alt="Screenshot of Is It Keto website" hasBorder="True" maxWidth="550px" caption="[Is It Keto](https://isitketo.org) tells readers which foods fit the keto diet.">}}

I started [Is It Keto](https://isitketo.org) in 2018. It's a simple site that tells you whether or not particular foods fit the keto diet. It earns money from Amazon Affiliate links and Google AdSense.

I put the site on the backburner when I started TinyPilot, but it continued to grow on its own in 2021, and it was providing a nice side income of $500-1,000 per month.

Around June, I noticed another site overtake Is It Keto for most search queries. They have the same idea as my site, but they've scaled the content better, and they're continuing to improve the site, so they're rightfully absorbing all of my visitors and revenue.

I considered selling the site but I suspect it's only worth $5-10k. It would probably take 30-60 hours to go through the sales process, and I'd rather spend that time on TinyPilot.

### Zestful

Zestful is a paid service that parses recipe ingredients into structured data. For example, if you give it the string `"2 1/2 tablespoons finely chopped parsley"`, it tells you that the quantity is `2.5`, the product is `parsley`, the preparation is `finely chopped`, etc.

I created Zestful in 2019 and worked on it for a few months before writing it off as a failure. It attracted clients every few months for one-time bulk parses, but it never generated revenue consistently.

2021 was a nice comeback year for Zestful. It had occasionally attracted clients for one-time bulk jobs, but it never generated revenue reliably. Starting midyear, I began seeing revenue more regularly. New clients started building on top of Zestful, and old clients were increasing their usage. It now earns a few hundred dollars per month, and in December it broke $1k for the first time from pay-as-you-go users.

Because of TinyPilot, I don't have time to work on the site, but it fortunately hasn't required any work at all. None of the clients have reported issues or requested technical support, so it's living the SaaS dream of pure passive income.

{{<revenue-graph project="zestful">}}

## Lessons learned

### Sell just one thing

For most of the year, TinyPilot earned a steady $20-30k per month in revenue. The months where there was a bump in revenue, it was because we got a new positive review from a popular YouTube channel.

Starting in October, revenues doubled to $40-60k per month. TinyPilot didn't receive any new reviews in that span. In fact, I didn't do any marketing at all.

So, what doubled our sales? I got rid of our product page.

Until that point, TinyPilot had always offered different versions so that customers could a product to match their budget. Customers who wanted the custom-designed plug 'n play model could buy our flagship TinyPilot Voyager. Customers who wanted a more DIY experience could buy our Hobbyist Kit. People who already had all the hardware could buy a software-only package.

One of the products that impressed me this past year was the reMarkable 2 tablet. The checkout process on their website is almost hypnotizing. They do a great job of upselling you with add-ons without making you feel manipulated. And a big part of that is that there's a single flow. You never decide *which* reMarkable to buy. They sell a single product, and the checkout flow just offers you different accessories.

I decided to try moving TinyPilot closer to reMarkable's design. In October, I got rid of the product catalog and instead focused the website exclusively on my main product, the TinyPilot Voyager.

Sales jumped immediately. They're consistently double what they were prior to the change. At first, I thought it might be a coincidence, but they've stayed in their new range for several months now.

I considered taking it a step further and selling zero products. That would logically increase my revenue to infinity, but I don't want to be greedy.

{{<img src="weekly-revenue.png" alt="Graph of TinyPilot weekly revenue, where an increase in revenue immediately follows consolidation to one product" maxWidth="800px" caption="TinyPilot’s weekly sales before and after simplifying the website to sell a single product">}}

### Good management attracts a good team

A few months ago, I had a video call with my friend Matt. Matt and I met as developers on the BitLocker team at Microsoft when we were both fresh out of college. He's one of the smartest developers I know, and he has incredible insight into software and organizations at both a high level and a low level.

He had followed TinyPilot's progress on my blog, but this was the first time Matt and I were talking about it. I was telling him how lucky I was that I ended up with such a good team. The developers I hired and the local staff that run the TinyPilot office have all worked out great.

>Well, give yourself some credit. I know you, and you probably shaped that team by putting processes in place that allowed people to work well.

In my experience, Matt is right about everything, so I have no choice but to accept his praise.

I'm certainly not an expert manager, but I think Matt is right that some of my. Based on my frustrations with previous jobs, I tried to create processes that avoided the things that frustrated me at previous jobs. I w

* Employees have flexibility.
* I give [thorough details](/freelancer-guidelines/) about what to expect from the hiring process and the job.
* My hiring process is quick, as talented people don't want to waste time on a lengthy, unpaid screening process.
* Communication is mostly written and asynchronous, which gives people flexibility.
* I document processes and encourage others to invest in documentation so that everyone has clear, shared expectations.
* We operate under the assumption that everyone who works on TinyPilot is smart and well-intentioned, so when things go wrong, it indicates a bad process rather than a bad person.

### Leadership means helping teammates grow

A few months ago, I listened to [an interview with Jason Cohen](https://youtu.be/Sjs5gEUlZyU?t=3605), and what he said something about leadership stuck with me:

>With leadership, yes, you're trying to get the right answers, and goals, and decisions... You're also trying to build a team that's smarter and better, that's themselves making better decisions, themselves are coming up with better answers, themselves have better context. They're smarter in whatever that means... That's also the goal.
>
>If you're the only one who can do that in the room, you're a terrible leader. Because that means your team isn't getting better. That's the only way for the organization to succeed is if the team is getting better. And that's your job: to build great teams.

In the past year, the best management decisions I've made are the ones that get me out of the way so the team can work more independently. And I never realize how much I was constraining things until after I see how well the team does without me.

One good example of the team taking on more responsibility is code reviews. In July, TinyPilot had two developers but I was still personally reviewing every code change. I worried that if the developers reviewed each other's code, it would slow things down since they worked part-time and on different schedules.

We tried having every developer act as reviewer, and [everyone liked it](/retrospectives/2021/08/#allow-developers-to-review-each-others-pull-requests). I've seen the developers grow from reading code and giving feedback with more rigor than they've been asked to before. Latency is a little higher, but the team reports that it hasn't made the dev experience meaningfully worse. I never felt like I was spending

 In July, we tried an experiment where the developers would [review each other's code changes. The comments they gave to each other were pretty much the same as the comments I would have given. Taking myself out of the process also made me realize just . I was realizing it had freed up an extra hour or two per day.

Something similar happened with customer service. John, one was interested in more hours, so I asked if he'd like to do customer service. I set up a shared inbox and directed support emails to it. And wow it's so much easier.

When I was the only one answering customer support emails, a simple issue like a customer asking to update the address on their order would be a complex ordeal requiring 5-6 emails to resolve. I'd have to check their order and see if it was packed, email my staff to see if anyone could fix the package before it gets picked up, wait for a response, then follow up with the customer.

Now, simple issues stay simple. The customer emails us. John handles it and tells the customer no problem, and it's done. I'm completely out of the critical path, and John has more ownership over his role.

## Grading last year's goals

At the start of last year, I [set three high-level goals](/solo-developer-year-3/#goals-for-year-four).

### Grow TinyPilot to $600k in annual revenue

* **Result**:
* **Grade**: B

I was a little over-optimistic because at the time I set my goals, revenue had grown 20-200% every month for the previous five months. But then in February, sales slumped and I never recaptured the rapid growth of the first few months.

Still, $500k is nothing to sneeze at. I think I could have reached my goal with different decisions, but nothing in particular stands out as a blunder. Even with the obvious win of reducing to one product, I'm not sure it would have been effective had we done it earlier because having a low-end option might have helped the product reach a wider audience.

### Publish six blog posts and one book

* **Result**: Published three blog posts and zero books
* **Grade**: D

As I said above, I wish I had more time to write. Writing is one of the things I most enjoy, so I'm disappointed I had so little time for it, but in retrospect I wouldn't have changed how I allocated my time.

### Automate TinyPilot management

* **Result**:
* **Grade**: B-

This time last year, I was still running TinyPilot out of my house, and my girlfriend and I were the only employees.

I've made a lot of progress in getting myself out of the critical path. I took a one-week vacation over the holidays, and that mostly worked fine, although I did have to do about 30 minutes of emergency work to prevent thousands of dollars of equipment from being sent back to China.

## Goals for year four

### Grow TinyPilot to $1M in annual revenue

There hasn't been any time for marketing. I think I should be able to explore more marketing channels. I've reached out to YouTube reviewers offering them review units, and that's been successful, but there are tons of paid marketing channels I haven't tested at all. I think there's a lot of room to grow.

 double revenue

### Manage TinyPilot on 30 hours per week

This is a continuation of my goal from last year. I've been good about not working on TinyPilot during evenings or weekends, but I crave more slack time. The times when I most enjoy TinyPilot are  . The times I enjoy it least are when there are so many

 I'd like to manage TinyPilot on 30 hours per week so that I have time left over to write and develop new skills.

I feel like I get stuck in what XX calls the urgent but unimportant quadrant. The time I enjoy TinyPilot the most are when I feel like I've gotten through all of my emails and I have time to think about new things to add. The times when I enjoy it least are when it feels like there are a thousand little things that need to get done, and I'm the only one in a position to do them.

## Do I still love it?

This has definitely been my most stressful year as a founder.

I like feeling like I'm running a real business. There's real money coming in, so I get to make intelligent decisions about how to allocate resources. In my previous projects, my businesses would make like $50/month, and at that scale, there's not really any interesting business decisions to make. Like, do I hire a competent developer to write four lines of code with that $50?

I love writing and programming, and the past year didn't leave me much time to do either. The nature of the business requires . My team is growing

I still prefer it to working for any employer I've had, but it's not a happy-go-lucky. I'd like to find ways back to the parts that I loved.

---

*Cover image by [Loraine Yow](https://www.lolo-ology.com/).*


<script src="/js/chart.js/2.9.4/Chart.min.js"></script>
<script>
const dollarFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
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
          label: 'Total Revenue',
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
/*
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
}*/
//drawOverallChart();
drawCharts("2022-01");
</script>
