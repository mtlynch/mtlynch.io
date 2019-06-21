---
title: Staying Motivated by Sending Status Updates to Nobody
tags:
- what got done
- startups
header:
  teaser: images/status-updates-to-nobody/cover.jpg
  og_image: images/status-updates-to-nobody/cover.jpg
---

{% include image.html file="cover.jpg" alt="Staying Motivated by Sending Status Updates to Nobody (cover image)" max_width="1000px" img_link=true %}

At my last job, status meetings with my manager were outstandingly efficient. He never ran me through the typical drill of listing list off everything I did since our last meeting. Instead, we jumped right to the meaty discussions that required an in-person back-and-forth: career growth, team development, and challenging technical problems.

How did my manager have the right context so that we could skip to the good stuff? He read my Snippets.

# What are Snippets?

Snippets is the name of an internal tool at Google for sharing status with your teammates. It's just a plain text field where you write down your accomplishments for the week. The following week, your manager and teammates receive your update in a weekly email digest.

At first, it just seemed like an idol in the worship of Google's cult of internal openness, but I quickly realized that a surprising amount of value came from something that was basically just a textbox.

# I don't hate meetings &mdash; I hate *bad* meetings

Like most developers, I had always hated team sync meetings. Even if the meeting was only an hour, the interruption ruined my productivity for several more. I understood why they were necessary: team members need to coordinate their work with one another, and it's easiest to answer questions and resolve confusion with everyone in one room. Still, I spent most of these meetings feeling bored.

It never occurred to me that you could separate the fact-reporting part from the discussion part, but Snippets did precisely that. Our team meetings were lean and productive because everyone walked in with shared facts that we'd read from each other's weekly updates.

# You've been writing status updates?

After two years at Google, I switched teams. My one-on-one manager meetings regressed back to the "recite facts to me" format I suffered through at previous companies. Team meetings inefficient as well. It turned out that my new manager didn't believe in reading Snippets. He preferred to hear about status updates in person.

It was maddening. There was a better system right at our fingertips. Why were we burning the majority of our team meetings listening to each person deliver a disorganized monologue as they tried to remember their work for the week.

# Fine, then I won't tell anyone what I'm doing

When I found out that my manager didn't read my status updates, I was pissed off. He was the primary audience for them, and I put considerable care into preparing my updates, so it was a slap in the face that my manager couldn't take five minutes to read them.

In response, I stopped writing them. I couldn't wait to see the look on my manager's face when the team crumbled miserably because they no longer had access to my amazing and all-important status updates.

That didn't happen. Instead, I found myself writing Snippets again a few weeks later, knowing full well that my manager would never read them.

# The joy of sending status updates to nobody

Friday afternoons are when my brain lies to me about the week. It often tells me that my entire week was useless because I spent the whole time chasing a bug and still haven't found the root cause.

Writing status updates forced me to see my week objectively. I'd review my outgoing emails, my code check-ins, and my calendar. Invariably, this exercise reminded me that I accomplished far more than my bleak, never-gonna-solve-this-bug mindset suggested.

There were times where I completely forgot about a cool feature I launched on Tuesday because of an unrelated issue that popped up on Wednesday. Even when a single bug truly did absorb my entire week, my investigation always produced useful artifacts, like better documentation or new automated tests.

Without Snippets, I forgot all of that and remembered only what I hadn't accomplished.

# Other tools don't get it

In early 2018, [I left Google](/why-i-quit-google/). I searched for an external replacement for Snippets to no avail.

There are dozens of "share status with your team" services, but they're all top-down rather than bottom-up. That is, they're designed for *managers*. They promise pretty graphs and dashboards so that managers feel like they have their finger on the pulse of the team.

{% include image.html file="monday-screenshot.jpg" alt="Screenshot of Monday.com feature page" max_width="475px" img_link="true" class="img-border" fig_caption="Monday.com promises managers slick dashboards to track their employees' work but forces the employees to enter status in a rigid format." %}

Everyone enjoys cool visualizations, but generating them requires the employees to enter information in whatever rigid format the tool expects. Team members have to do bookkeeping for the sake of bookkeeping and concoct numbers to represent how "complete" each task is.

The beauty of Snippets was that it was *just* a textbox. That meant that the employee had full autonomy over how they described their work without any overhead.

# I'm blocked because I don't have a textbox?

Unable to find a Snippets substitute, I stopped writing them. My morale tanked. Without a ritual to end the week on a positive, work just felt like an endless series of thankless tasks.

My frequent searches for a public, Snippets-like service always came up empty. One day, a profound and obvious realization struck me &mdash; Snippets is just a textbox. I could get a textbox anywhere.

I immediately created a new Google Doc and wrote my update for the week:

{% include image.html file="docs-snippets.jpg" alt="Screenshot of my first Snippet in Google Docs" max_width="500px" img_link="true" class="img-border" fig_caption="Recording weekly status updates in Google Docs" %}

I recorded my status updates in that private Google Doc every week for a year. Nobody else saw it, but that was fine. It gave me back the habit I was missing. Each week ended with a reminder of how much I accomplished, and it felt great.

# Creating yet another status update tool

After a year, writing updates in my private Doc still gave me satisfaction, but I missed writing for an audience. I saw the myriad benefits of [publishing my monthly retrospectives](/keep-growing-never-profit/#i-published-monthly-goals-and-stuck-to-them) and wanted to do the same thing for my weekly updates. 

One of [my 2019 goals](/solo-developer-year-1/#goals-for-year-two) was to gain expertise in a JavaScript framework, so that felt like a great excuse to create my own custom status sharing tool. And I did. It's called [What Got Done](https://whatgotdone.com):

{% assign fig_caption = "My [most recent update](https://whatgotdone.com/michael/2019-06-07) on What Got Done" | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="whatgotdone-screenshot.jpg" alt="Screenshot of Monday.com feature page" max_width="800px" img_link="true" fig_caption=fig_caption %}

I record my status updates in it every week. In the last month, the site has attracted **three** other users. Hear that, venture capital investors? 300% month-over-month growth!

If you'd like to experience the joy of reviewing your accomplishments each week, come [take it for a spin](https://whatgotdone.com). It's free.

**Shamelesss plug**: If you're interested in using this tool for your job, [shoot me an email](/about/).
{: .notice--info}

---

*Cover art by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/).*