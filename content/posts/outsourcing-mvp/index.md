---
title: The Perils of Outsourcing Your MVP
tags:
- mvp
- outsourcing
- startups
- web scraping
- ketohub
discuss_urls:
  hacker_news: https://news.ycombinator.com/item?id=15861032
description: 'A few months ago, I had a brilliant idea for a website. Then, I had
  an even brillianter idea: build the website, but outsource all the work.'
date: '2017-12-06'
images:
- outsourcing-mvp/wireframe-v1.jpg
---

A few months ago, I had a brilliant idea for a website. Then, I had an even *brillianter* idea: build the website, but outsource all the work.

Every great website starts with an MVP: the minimum viable product. It demonstrates the idea in its simplest form to test whether anyone is interested. When Twitter launched their MVP, you could only tweet pictures of Russet potatoes. Slack famously launched with language support limited to pig latin. Netflix is now so synonymous with instant streaming that you may have forgotten its first version, which required you to select a movie, then wait several days until Reed Hastings arrived at your house to act out the plot himself.

I had a simple plan to build my MVP:

1. Write a quick design specification.
1. Find a rock star freelance developer with 10 years of experience in whichever web framework is the trendiest and most bleeding-edge.
1. Offer said freelancer $4/hr so that I can maximize site profits.
1. Watch the MVP blossom into a thriving web property frequented by millions of passionate users demanding that I take their money.

You may be surprised to learn that this plan did *not* work. I'm not writing this from my luxurious $200 million Silicon Valley two-bedroom apartment. I didn't grab headlines with an outrageous buyout from Facebook. Instead, I'm writing this from my regular one-bedroom apartment after receiving a half-finished product and somehow becoming my freelancer's freelancer.

## The idea

I follow the [keto diet](https://www.dietdoctor.com/low-carb/keto) and like trying new recipes. There are plenty of good ones online, but they're spread across dozens of blogs, each with a different structure. These blogs tend to be slow and hard to navigate because keto bloggers rarely have experience with web development.

{{< img src="keto-sites.png" alt="Existing keto sites" maxWidth="700px" >}}

My idea was KetoHub, a keto recipe directory. It would aggregate recipes from across the web into one easy-to-use website.

{{< img src="wireframe-v1.jpg" alt="Mockup of KetoHub v1" caption="Initial sketch of KetoHub" maxWidth="600px" >}}

## Finding a freelancer

Most of KetoHub's heavy lifting was web scraping -- crawling recipe blogs and pulling out the relevant data. This is a common job on freelance developer sites like Upwork or Fiverr. I could probably find someone for a low price, but I might end up with code that crumbles to pieces if I try to iterate beyond the MVP.

Oh, wait! This would be a perfect job for my friend Ferngully (who agreed to let me write about her under the condition that I assign her a silly pseudonym). She recently quit her job to travel but was due back in a few days to look for full-time work. She would probably have time to freelance in the meantime. We had worked together in the past, so I knew she was a solid developer and that we work well together.

I reached out to her, and she was immediately on board. She knew from our past work that my code reviews are ~~pedantic and whiny~~ rigorous. She told me she was excited about the challenge of meeting my tough standards.

I wrote a [design document](ketohub-v1-design-doc.pdf) that laid out the components of the website at a high level. Ferngully would handle the backend scraping tasks, while I would build a simple web frontend to display the recipes.

{{< img src="ketohub-architecture.png" alt="KetoHub architecture diagram" caption="KetoHub architecture diagram" maxWidth="800px" >}}

## Why aren't we live?

When I was initially discussing the project with Ferngully, she asked if I had any deadlines. "No deadlines. Just focus on writing good code."

It's the same thing I tell any developer working on a side project with me. I'd rather receive high-quality code on Thursday than hastily slapped-together code on Monday. I estimated that Ferngully's portion would take 30-50 hours to implement. We'd be done in about a week. Maybe two or three if my estimates were off or if she worked fewer than 40 hours per week.

At the time, I was in a busy period with my day job. It could be months before I'd have time to build the frontend. Certainly, I'd be the bottleneck.

After I finished the design document, I thought about how anticlimactic it would be if Ferngully delivered the scraping code only to have it sit in a drawer for months. I spent a few evenings putting together a basic frontend. It displayed some sample recipes I scraped by hand. We'd be ready to add in the full recipe data and launch as soon as Ferngully completed her work.

{{< img src="ketohub-mvp.png" alt="Basic KetoHub site with dummy data" caption="Screenshot of KetoHub&rsquo;s MVP, populated with data scraped by hand" maxWidth="700px" >}}

That's when I started getting anxious.

It took me a week to complete the web portion, but I still hadn't seen any code from Ferngully. What was she doing?

Before I built the frontend, the project was stress-free. Now that we had a site ready with dummy data, it felt like we had a living thing that we were keeping caged. With each passing day, my code was withering into obsolescence. I just wanted to show KetoHub to the world so that I could get to the part of this process where Mark Zuckerberg  invites me for champagne on his personal-information-collecting superyacht.

## Working under low bandwidth

Ferngully sent me her first code review at the end of the second week. It was a partial implementation of the first backend component. She had averaged 15 hours per week, but she was starting her full-time job the following Monday. Her hours were sure to go down after that.

I revisited the design document to see if I could trim anything out. It called for the backend to programmatically upload recipe data to the website's data store. I could reduce Ferngully's work if she just wrote data to a local filesystem instead. Then, I'd use existing command-line tools to upload that data to the website.

Okay, maybe the limited time was a good thing. If I could trim elements out of the MVP and still achieve the same thing, it wasn't really in its most minimal form.

I was optimistic that we could wrap this up in a few more weeks.

## Becoming my freelancer's freelancer

Unfortunately, Ferngully's job reduced her availability even more than I had anticipated. Over the next month, she averaged less than five hours per week on KetoHub. At this rate, it would take us months to finish.

If this was another freelancer, I would have just thanked them for their work and found a new developer. But Ferngully was not only my friend but a friend going through the stress of a new job. I didn't want to add to her plate by pushing for more hours or overhauling the project plan. Nevertheless, I was kicking myself for how lax I had been earlier when she asked about deadlines.

Maybe I could reassign some of her work to me. No, I'd be annoyed if someone hired me for a job, then did it themselves. I revisited the design document to see if we could simplify it further, but I couldn't find anything to cut out. Then, I began thinking about whether I could adjust our development process to shift some time expenses from her to me.

Wait a second. What was going on? I outsourced KetoHub to save myself time, but now I was restructuring the project to optimize for Ferngully's time in place of my own. How did I become my freelancer's freelancer?

## Simplifying code reviews

Regardless of who was freelancing for whom, I wanted us to complete the project, and quickly. The biggest time expense I could cut was my famously picky code reviews.

The reviews were expensive for both of us. I put [a lot of thought into my code reviews](/human-code-reviews-1/), and it took time for Ferngully to implement my suggestions. With days or weeks of latency between review rounds, we were also burning cycles just remembering context for where we were in the review.

To save time, I decided to stop giving Ferngully notes. When she sent me her next changelist for review, I merged it in, tweaked it a bit to match my standards, and boom -- we had our first complete backend component. Only two left!

## This doesn't make sense

Ferngully was less enthused about my clever new time-saving technique. The tough reviews gave her technical growth. Without those, KetoHub was just work, and she had enough of that at work.

I debated whether I could keep doing notes. Even when I was skipping them, I wasn't sure I was actually saving time overall with a freelancer. If I started writing them again, I'd definitely be in the negative timewise.  I'd be paying a freelancer a nontrivial hourly rate, and it would cost me more in time than writing the code myself.

We talked it over and decided it no longer made sense for Ferngully to work on KetoHub. With the first component completed, it was a convenient time for her to transition off the project.

## Implementing it myself

The Saturday night after I wrapped up with Ferngully, I continued where she left off and resolved to keep going until the MVP was live. By 2 AM, the first version was complete. I was embarrassed by how plain it looked, but it was done.

{{< img src="ketohub-v1-done.png" alt="Completed first version of KetoHub" caption="KetoHub, when the MVP was finally complete" maxWidth="800px" >}}

I quickly realized that I should have done the project solo from the start.

A prototype requires so many small decisions about tradeoffs. Do I spend an extra hour to fix a bug that only affects 10% of recipes? Which modules should have automated tests? It would be impossible to specify these answers ahead of time to a freelancer. Working solo, I can just follow my intuition.

Building it myself also made it so much easier to fix weaknesses in the design. Even on a team of two, design flaws incur high frictional costs. When Ferngully spotted an issue, she had to confirm it with me, I'd update the design document, she'd read it, throw away some work, then finally reimplement it according to the new design. When I work solo, that whole process is almost instant.

Finally, by outsourcing the backend, I was obscuring a core part of the business from myself. When I got my hands dirty with web scraping, it sparked ideas for recipe data I could use in future iterations of KetoHub and gave me better insight into the site's design constraints.

## Takeaways

Despite the issues, this process taught me important lessons about creating new websites and working with freelancers. The biggest lesson was: if you're a developer, **build your own MVP**.

If you choose to work with a freelancer:

* **Discuss target completion dates**.
  * You don't have to set rigid deadlines, but figure out up front if you're in the same ballpark.
* **Agree on weekly bandwidth**.
  * Your freelancer may have other clients or priorities. Find out how much time they'll be able to dedicate to your project.

---

*This article was edited by [Samantha Mason](https://www.samanthamasonfreelancer.com).*

*If you're a keto dieter interested in finding new recipes, check out [KetoHub](https://ketohub.io), the website I've been talking about this whole article.*
