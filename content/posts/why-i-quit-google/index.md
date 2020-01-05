---
title: Why I Quit Google to Work for Myself
description: For the past four years, I've worked as a software developer at Google.
  On February 1st, I quit. It was because they refused to buy me a Christmas present.
discuss_urls:
  reddit: https://redd.it/80whkc
  hacker_news: https://news.ycombinator.com/item?id=16483241
  indie_hackers: https://www.indiehackers.com/forum/why-i-quit-google-to-work-for-myself-284c36ec48
tags:
- entrepreneurship
- google
- sia
date: '2018-02-28'
images:
- why-i-quit-google/spoiled-coder.png
---

For the past four years, I've worked as a software developer at Google. On February 1st, I quit. It was because they refused to buy me a Christmas present.

Well, I guess it's a little more complicated than that.

## The first two years

Two years in, I loved Google.

When the annual employee survey asked me whether I expected to be at Google in five years, it was a no-brainer.

Of *course* I'd still be at Google in five years. I was surrounded by the best engineers in the world, using the most advanced development tools in the world, and eating the free-est food in the world.

{{< img src="spoiled-coder.png" alt="My typical day at Google" maxWidth="750px" >}}

My most recent performance rating was "Strongly Exceeds Expectations." If I just kept going, I'd soon be promoted to the next level, Senior Software Engineer. What a great title! Forever after in my career, I'd be able to say, "Yes, I was a *Senior* Software Engineer. At *Google*." People would be so impressed.

My manager assured me that my promotion was close. He felt that I was already capable of senior-level work. I just needed the right project to prove it to the promotion committee.

## Your manager doesn't promote you?

No, managers at Google can't promote their direct reports. They don't even get a vote.

Instead, promotion decisions come from small committees of upper-level software engineers and managers who have never heard of you until the day they decide on your promotion.

You apply for promotion by assembling a "promo packet": a collection of written recommendations from your teammates, design documents you've created, and mini-essays you write to explain why your work merits a promotion.

A promotion committee then reviews your packet with a handful of others, and they spend the day deciding who gets promoted and who doesn't.

During my two-year honeymoon phase, this system sounded great to me. Of *course* my fate should be in the hands of a mysterious committee who's never met me. They wouldn't be tainted by any sort of favoritism or politics. They'd see past all that and recognize me for my high-quality code and shrewd engineering decisions.

## That's not really how it works

Before I put together my first promo packet, I never thought about the logistics of how it all worked.

In my head, the promotion committee was this omniscient and fair entity. If I spent each day choosing the right problems to solve, making the codebase better, and helping my team execute efficiently, the promotion committee would magically know this and reward me for it.

Unsurprisingly, it doesn't work like that. It took me two years to figure that out.

## Working naïvely

My main responsibility until that point was a legacy data pipeline. It had been in maintenance mode for years, but load had increased, and the pipeline was buckling under the pressure. It frequently died silently or produced incorrect output. Its failures took days to diagnose because nobody had written documentation for it since its original design spec.

I proudly and lovingly nursed the pipeline back to health. I fixed dozens of bugs and wrote automated tests to make sure they wouldn't reappear. I deleted thousands of lines of code that were either dead or could be replaced by modern libraries. I documented the pipeline as I learned it so that the institutional knowledge was available to my teammates instead of siloed in my head.

The problem, as I discovered at promotion time, was that none of this was quantifiable. I couldn't prove that anything I did had a positive impact on Google.

## Metrics or it didn't happen

The pipeline didn't record many metrics. The ones it did have made it look like things had gotten worse. My bug discoveries caused the overall bug count to increase. The pipeline's failures increased because I made it fail fast on anomalies instead of silently passing along bad data. I drastically reduced the time developers spent repairing those failures, but there were no metrics that tracked developer time.

My other work didn't look so good on paper either. On several occasions, I put my projects on hold for weeks or even months at a time to help a teammate whose launch was at risk. It was the right decision for the team, but it looked unimpressive in a promo packet. To the promotion committee, my teammate's project was the big, important work that demanded coordination from multiple developers. If they hornswoggled me into helping them, it's evidence of their strong leadership qualities. I was just the mindless peon whose work was so irrelevant that it could be pre-empted at a moment's notice.

I submitted my first promo packet, and the results were what I feared: the promotion committee said that I hadn't proven I could handle technical complexity, and they couldn't see the impact I had on Google.

{{< img src="promo-committee.png" alt="Arguing my case to the promotion committee" maxWidth="800px" >}}

## Learning from rejection

The rejection was a difficult blow, but I wasn't discouraged. I felt I was performing above my level, but the promotion committee couldn't see it. That was solvable.

I decided that I had been too naïve in my first couple years. I didn't do enough planning up front to make sure the work I was doing left a paper trail. Now that I understood how the process worked, I could keep doing the same good work, just with better record-keeping.

For example, my team was receiving tons of distracting email alerts due to false alarms. Old me would have just fixed these alerts. But now I knew that for this work to appear in my promo packet, I should first set up metrics so that we'd have historical records of alert frequency. At promotion time, I'd have an impressive-looking graph of the alerts trending downward.

Shortly after, I was assigned a project that seemed destined for promotion. It depended heavily on machine-learning, which was and still is the hot thing at Google. It would automate a task that hundreds of human operators were doing manually, so it had a clear, objective impact on Google. It also required me to lead a junior developer throughout the project, which generally won points with promotion committees.

## The holiday gift wake up call

A few months later, Google [made headlines](http://fortune.com/2016/12/09/alphabet-donated-its-employees-holiday-gifts-to-charity/) when they ended their long-standing tradition of giving lavish holiday gifts to all of their employees. Instead, they used the gift budget to buy ~~advertising disguised as charity~~ Chromebooks for underprivileged schoolchildren.

Shortly after this, I witnessed the following conversation between two employees:

>**Employee A**: You effectively **are** still getting the gift. Cuts like these increase the value of Google's stock. You can sell your stock grants and buy any present you choose.
>
>**Employee B**: What if I told my wife that I wasn't buying her a Christmas gift, but she could use the money in our bank account to buy any present she wants?
>
>**Employee A**: You're in a **business** relationship with Google. If you're disappointed that Google isn't "romancing" you with gifts like you do for your wife, you have a misguided notion of the relationship.

Wait a second. *I* was in a business relationship with Google.

It may sound strange that it took me two and a half years to realize it, but Google does a good job of building a sense of community within the organization. To make us feel that we're not just employees, but that we *are* Google.

That conversation made me realize that I'm *not* Google. I provide a service to Google in exchange for money.

So if Google and I have a business relationship that exists to serve each side's interests, why was I spending time on all these tasks that served Google's interests instead of my own? If the promotion committee doesn't reward bugfixing or team support work, why was I doing that?

## Optimizing for promotion

My first denied promotion taught me the wrong lesson. I thought I could keep doing the same work but package it to look good for the promotion committee. I should have done the opposite: figure out what the promotion committee wants, and do that work exclusively.

I adopted a new strategy. Before starting any task, I asked myself whether it would help my case for promotion. If the answer was no, I didn't do it.

My quality bar for code dropped from, "Will we be able to maintain this for the next 5 years?" to, "Can this last until I'm promoted?" I didn't file or fix any bugs unless they risked my project's launch. I wriggled out of all responsibilities for maintenance work. I stopped volunteering for campus recruiting events. I went from conducting one or two interviews per week to zero.

## Then my project was canceled

Priorities shifted. Management traded my project away to our sister team in India. In exchange, that team gave us one of their projects. It was an undocumented system, built on deprecated infrastructure, but it was nevertheless a critical component in production. I was assigned to untangle it from our sister team's code and migrate it to a new framework, all while keeping it running in production and hitting its performance metrics.

As far as my promotion was concerned, this was a setback of several months. Because I hadn't released anything for my canceled project, the two months I spent on it were worthless. It would take me weeks just to get up to speed on the system I was inheriting, and I was liable to lose several more in the gruntwork of keeping it operational.

## What am I even doing?

It  was the third time in six months that my manager had reassigned me midway through a project. Each time, he assured me that it had nothing to do with the quality of my work, but rather some shift in upper management strategy or team headcount.

At this point, I took a step back to assess what was happening from a high level.  Forget my manager, forget his managers, forget the promotion committee. What if I boiled it down to just me and just Google? What was happening in our "business relationship?"

Well, Google kept telling me that it couldn't judge my work until it saw me complete a project. Meanwhile, I couldn't complete any projects because Google kept interrupting them midway through and assigning me new ones.

The dynamic felt absurd.

{{< img src="book-publisher.png" alt="The Google promotion committee approach to book publishing" maxWidth="750px" >}}

My career was being dictated by a shifting, anonymous committee who thought about me for an hour of their lives. Management decisions that I had no input into were erasing months of my career progress.

Worst of all, I wasn't proud of my work. Instead of asking myself, "How can I solve this challenging problem?" I was asking, "How can I make this problem *look* challenging for promotion?" I hated that.

Even if I got the promotion, what then? Popular wisdom said that each promotion was exponentially harder than the last. To continue advancing my career, I'd need projects that were even larger in scope and involved collaboration with more partner teams. But that just meant the project could fail due to even more factors outside my control, wasting months or years of my life.

## What's the alternative?

Around this time, I discovered [Indie Hackers](https://www.indiehackers.com/).

{{< img src="indie-hackers.png" alt="Screenshot of Indie Hackers website" maxWidth="750px" >}}

It's an online community for founders of small software businesses. Emphasis on small. These weren't Zuckerberg hopefuls, but rather people who wanted to build modest, profitable businesses that pay their bills.

I had always been interested in starting my own software company, but I only knew of the Silicon Valley startup path. I thought being a software founder meant spending most of my time fundraising and the rest of it worrying about how to attract my next million users.

Indie Hackers presented an attractive alternative. Most members built their businesses with their own savings or as side projects to their full-time jobs. They didn't answer to investors, and they certainly didn't have to prove themselves to anonymous committees.

There were downsides, of course. Their income was less steady, and they faced more numerous catastrophic risks. If I ever made a mistake at Google that cost the company $10 million, I would suffer no consequences. I'd be asked to write a post-mortem, and everyone would celebrate the learning opportunity. For most of these founders, a $10 million mistake would mean the end of their business and several lifetimes of debt.

Founders on Indie Hackers captivated me because they were in control. Whether their business became a runaway success or stagnated for years, they were calling the shots. At Google, I didn't feel in control of my own projects, much less my career growth or my team's direction.

I thought about it for months and finally decided. I wanted to be an Indie Hacker.

## One last thing before I leave

I still had unfinished business at Google. After investing three years into my promotion, I hated the idea of leaving with nothing to show for it. There were only a few months left until I could reapply for promotion, so I decided to give it one last shot.

Six weeks before the performance period ended, my project was canceled. Again.

Actually, my whole team was canceled. This was a common enough occurrence at Google that there was a euphemism for it: a defrag. Management transferred my team's projects to our sister team in India. My teammates and I all had to start over in different areas of the company.

I applied for the promotion anyway. Weeks later, my manager read me the results. My performance rating was "Superb," the highest possible score, given to around 5% of employees each cycle. The promotion committee noted that in the past six months, I clearly demonstrated senior-level work. These were, uncoincidentally, the months when I was optimizing for promotion.

*But* they felt that six months wasn't a long enough track record, so... better luck next time.

My manager told me I had a strong chance at promotion if I did the same quality work for another six months. I can't say I wasn't tempted, but by that point, I'd been hearing, "great shot at promotion in six months," for the past two years.

It was time to go.

## What's next?

When I tell people I left Google, they assume I must have some brilliant startup idea. Only an *idiot* would leave a job as cushy as Google Software Engineer.

But I am indeed an idiot with no idea.

My plan is to try different projects for a few months each to see if any of them catch on, for example:

* Continue working on [KetoHub](/tags/ketohub) to see if I can make it profitable
* Build a business on top of Sia, a distributed storage technology I've [written about frequently](/tags/sia)
* Spend more time writing, and look for ways to earn money from it

Google was a great place to work, and I learned valuable skills during my time there. Leaving was difficult because I had more to learn, but there will always be employers like Google. I won't always have the freedom to start my own company, so I look forward to seeing where this takes me.

---

*Illustrations by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/).*
