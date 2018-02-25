---
title: Why I Quit Google to Work For Myself
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
sidebar:
  nav: main
header:
  teaser: images/resized/2018-02-12-why-i-quit-google/768/spoiled-coder.png
---

I started working at Google in early 2014. For the first two years, I loved the job. Then I applied for a promotion.

My last day was February 1. I worked at Google for just under four years.

TODO: Better intro

# The first two years

Two years in, I still loved Google.

The annual employee survey asked me how likely I was to still be working for Google in five years. It was a no brainer.

Of *course* I'd still be at Google in five years. I was surrounded by the best engineers in the world, using the most advanced development tools in the world, and eating the free-est food in the world.

{% include image.html file="spoiled-coder.png" alt="My typical day at Google" max_width="750px" img_link=true %}

My most recent performance rating was "Strongly Exceeds Expectations." If I just kept going, I'd soon be promoted to the next level, Senior Software Engineer. What a great title! Forever after in my career, I'd be able to say, "Yes, I was a *Senior* Software Engineer. At *Google*." People would be so impressed.

My manager assured me that my promotion was close. He felt that I was already capable of senior-level work. I just needed the right project to prove it to the promotion committee.

# Your manager doesn't promote you?

No, managers at Google can't promote their direct reports. They don't even get a vote.

Instead, promotion decisions come from small committees of upper-level software engineers and managers, none of whom have ever heard of you until the day they decide on your promotion.

You apply for promotion by assembling a "promo packet": a collection of written recommendations from your teammates, design documents you've created, and mini-essays you've written to explain why your work merits a promotion.

A promotion committee receives your packet, along with a handful of other people's packets the committee was assigned, and they spend the day deciding who gets promoted and who doesn't.

During my two year honeymoon phase, this system sounded great to me. Of *course* my fate should be in the hands of an anonymous committee who's never met me. They wouldn't be tainted by any sort of favoritism or politics. They'd see past all that and recognize me for my high quality code and consistently good engineering decisions.

# That's not really how it works

Before I put together my first promo packet, I never thought about the logistics of how the promotion committee would see my work.

In my head, the promotion committee was this omniscient and fair entity. If I spent each day choosing the right problems to solve, making the codebase better, and helping my team execute efficiently, the promotion committee would magically know this and reward me for it.

Unsurprisingly, it doesn't work like that. It took me two years to figure that out.

# Working naively

My main responsibility until that point was a legacy data pipeline. It had been in maintenance mode for years, but load had increased and the pipeline was buckling under the presssure. It frequently died silently or produced incorrect output. Its failures could take days to diagnose because nobody had written documentation for it since the original design spec.

I proudly nursed the pipeline back to health. I found dozens of bugs, fixed many of them, and wrote automated tests to make sure the bugs wouldn't reappear. I deleted thousands of lines of code that were either dead or could be replaced by modern libraries. I documented the pipeline as I learned it so that the institutional knowledge about the pipeline was available to my teammates instead of siloed in my head. 

The problem, as I discovered at promotion time, was that none of this was quantifiable. My work's impact on Google was unprovable.

# Metrics or it didn't happen

The pipeline had very few recorded metrics. The ones it did have made it look like things had gotten worse. All my bug discoveries caused the overall bug count to increase. Pipeline failures had gone up because I made it fail fast on anomalies instead of silently passing along bad data. I drastically reduced the amount of developer time required to keep the pipeline running, but there were no metrics that tracked developer time.

Other work I had done didn't look so good on paper either. There were several times in my first two years where I put my projects on hold for weeks or sometimes months so that I could help a teammate whose launch was at risk. It was the right decision for the team, but it looked very unimpressive in a promo packet. To the promotion committee, my teammate's work was big and important enough that they "managed" other developers while delivering it. I was just the mindless peon whose work was so irrelevant that it could be pre-empted at a moment's notice.

I applied for a promotion for the first time at Google, and the committee's response was what I feared: they said that I hadn't proven I could handle technical complexity, and they couldn't see the impact I'd had on Google.

{% include image.html file="promo-committee.png" alt="Arguing my case to the promotion committee" max_width="750px" img_link=true %}

# New strategy

The rejection was a tough hit, but I wasn't discouraged. I was doing senior-level work, but the promotion committee couldn't see it. That was solvable.

I was too naive my first couple years. I didn't factor the promotion committee's perspective in how I chose my work. After going through the process once, I could keep doing the same kind of work, but I just had to plan better so that I'd have a paper trail I could show at promotion time.

For example, my team was getting tons of alert emails due to false alarms. I could spend some time on that problem because we tracked the number of alerts over time. I'd be able to show the promotion committee a chart of the alerts going down after I started working on the problem.

A few months later, I was assigned a project that seemed destined for promotion. It was a machine-learning project, which is the sexy thing at Google right now. It would automate a task that Google was paying hundreds of human operators to do manually, so there would be a clear, objective impact on Google. It also required me to lead a junior developer throughout the project, which would win leadership points with the promotion committee.

# The holiday gift wake up call

A few months later, Google [made headlines](http://fortune.com/2016/12/09/alphabet-donated-its-employees-holiday-gifts-to-charity/) for their holiday gifts. Breaking their tradition of buying lavish gifts for employees, they spent the money on ~~advertising disguised as charity~~ Chromebooks for underprivileged schoolchildren.

Shortly after this, I witnessed the following conversation between two employees:

>**Employee A**: You effectively **are** still getting the gift. Cuts like these increase the value of Google's stock. You can sell your stock grants and buy any present you choose.
>
>**Employee B**: What if I told my wife that I wasn't buying her a Christmas gift, but she could use the money in our bank account to buy a present for herself? That wouldn't go over well.
>
>**Employee A**: You're in a **business** relationship with Google. If you're disappointed that Google isn't "romancing" you with gifts like a spouse would, you have a misguided notion of the relationship.

Wait a second. *I* was in a business relationship with Google.

It may sound strange that it took me two and a half years to realize it, but Google does a very good job of building a sense of community among its employees. To make us feel that we're not just employees, but that we *are* Google.

That conversation made me realize that I'm *not* Google. I provide a service for Google in exchange for money.

So if Google and I have a business relationship that exists to serve each side's interests, why was I spending time on all these tasks that served Google's interests instead of my own? If the promotion committee sees no value in bugfixing or team support work, why was I doing that?

# Optimizing for promotion

I realized that my first denied promotion taught me the wrong lesson.

I thought I could keep doing the same work but package it to look good for the promotion committee. I should have done the opposite: figure out what the promotion committee wants, and do work that satisfies it.

Before starting any task, I asked myself, "Will this help my case for promotion?"

My quality bar for code dropped from, "Will we be able to maintain this for the next 5 years?" to, "Can this last until I get promoted?" I didn't file or fix any bugs unless they risked my project's launch. I wriggled out of all responsibilities for maintenance work. I stopped volunteering for campus recruiting events. I went from conducting one or two interviews per week to zero.

# Then my project was canceled

Priorities shifted. Management traded my project away to our sister team in India. In exchange, they gave us an old, undocumented system that was nevertheless a critical component in production. I was assigned to untangle it from our sister team's other systems and migrate it to a new framework, all while keeping it running in production and hitting its performance metrics.

As far as my promotion was concerned, this was a setback of several months. The two months I spent on my previous project were worthless because I hadn't released anything. It would take me weeks just to get up to speed on the new project. I was liable to lose several more in the gruntwork of keeping it up and running.

# What am I even doing?

That  was the third time in six months my manager had reassigned me midway through a project.

I thought about the situation in terms of my business relationship with Google.  Forget my manager, forget the promotion committee, forget my teammates. What if I boiled it down to just me and just Google? What was happening in our "business relationship?"

Well, Google, kept telling me that it couldn't judge whether I was capable of senior-level work until it saw me complete a project. Meanwhile, I couldn't complete any projects because Google kept interrupting them midway through. The dynamic felt absurd.

{% include image.html file="book-publisher.png" max_width="750px" alt="The Google promotion committee approach to book publishing" img_link=true %}

My career was being dictated by a shifting, anonymous committee who thought about me for an hour of their lives. Management decisions that I had no input into were erasing months of my career progress.

Worst of all, I wasn't proud of my work. Instead of asking myself, "How can I solve this challenging problem?" I was asking, "How can I make this problem *look* challenging for promotion?" I hated that.

Even if I got the promotion, what then? Popular wisdom said that each promotion was exponentially harder. To continue advancing my career, I'd need projects that were even larger in scope and involved collaboration with more partner teams. But that just meant the project could fail due to even more factors outside my control, wasting months or years.

# What's the alternative?

Around this time, I discovered [Indie Hackers](https://www.indiehackers.com/). It's an online community for founders of small software businesses. Emphasis on small. These weren't Zuckerberg hopefuls, but rather people who wanted to build modest, profitable businesses that could pay their bills.

I had always been interested in starting my own software company, but I only knew of the Silicon Valley startup path. I thought founding my own software business meant spending most of my time fundraising. I thought it meant fighting ruthlessly to expand until the company was worth a billion dollars.

Indie Hackers presented an attractive alternative. Most members built their businesses using their own savings or as side projects as they worked full-time jobs. They didn't have to answer to investors, and they certainly didn't have to prove themselves to anonymous committees.

There were downsides, of course. With your own business, there's less security, the stakes are higher, more things can go catastrophically wrong. If I ever made a mistake at Google that cost the company $10 million, I would suffer no consequences. I'd be asked to write a post-mortem, and everyone would celebrate the learning opportunity. If I made a $10 million mistake in a business I owned, I'd be in debt for ten lifetimes.

I realized what appealed to me so strongly about these founders was that they were in control. Whether their business became a runaway success or stagnated for years, they were calling the shots. At Google, I didn't feel like I was in control of my own projects, much less my career growth or my team's direction.

I thought about it for months and finally decided. I wanted to be an Indie Hacker.

# One last thing before I leave

I still had some unfinished business at Google. I invested almost three years into this promotion, and I hated the idea of leaving with nothing to show for it. I decided to stay a few more months to give it one last shot.

Six weeks before the performance period ended, my project was canceled. Again.

Actually, my whole team was canceled. This is a common enough occurence at Google that there's a name for it: a defrag. Management transferred my team's projects to our sister team in India. My teammates and I all had to start over on new teams.

I applied for the promotion anyway. My performance rating was "Superb," the highest possible rating, given to around 5% of employees each cycle. The promotion committee noted that the six months when I was optimizing for a promotion clearly demonstrated senior-level work. BUT they added that six months wasn't long enough of a track record so, better luck next time.

My manager told me I could get the promotion if I did the same quality work for another six months. I was tempted. But by that point, I'd been hearing, "really great shot at promotion in six months," for the past two years. It was time to go.

# What's next?

When I tell people I left Google, they assume I must have some brilliant startup idea. Only an idiot would leave a cushy job as a developer at Google.

But I am indeed an idiot with no idea.

My plan is to try different projects for a few months each to see if any of them catch on, for example:

* Continue working on [KetoHub](/tags/#ketohub) to see if I can make it profitable
* Build a business on top of Sia, a distributed storage technology I've [written about frequently](/tags/#sia)
* Spend more time writing, and look for ways to earn money from it

Google was a great place to work, and I learned a lot in my time there. I know I would regret it if I never tried to start a business of my own. I have the opportunity to do it now, and I don't know if I'll ever have it again, so here goes.

TODO: rewrite last paragraph