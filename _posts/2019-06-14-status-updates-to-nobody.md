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

At my last job, status meetings with my manager were outstandingly efficient. He never ran me through the tedious drill of listing list off everything I did since our last meeting. Instead, we jumped right to the meaty discussions that required an in-person back-and-forth: career growth, team development, difficult technical problems.

How did my manager have the right context so that we could skip to the important stuff? He read my Snippets.

# What are Snippets?

Snippets is the name of an internal tool at Google for sharing status with your teammates. It's just a text field where you write down your accomplishments for the week. At the beginning of the following week, your manager and teammates receive your update in a weekly email digest.

At first, it seemed like yet another pointless extension of Google's internal worship of openness and transparency, but I quickly realized how much value came from something that was basically just a textbox.

In-person meetings are, of course, necessary &mdash; some discussions require a low-latency, interactive discussion that would be difficult over email or instant messaging. But meeting time is expensive, as it requires everyone attending to interrupt their day and coordinate schedules to be there.

Snippets trimmed unnecessary waste from status meetings. I wrote my Snippets on my time, outside of meeetings. My manager and teammates read them at their leisure. Our in-person meetings were lean and productive because we focused on complex topics that required live discussion instead of squandering precious meeting time on basic facts.

# You've been writing status updates?

After two years at Google, I switched teams and got a new manager. My one-on-one meetings regressed back to the "list everything you did this week" format I suffered through at previous companies. It turned out that my new manager didn't believe in reading Snippets. He preferred to hear about status updates in person.

That explained our team status meetings. We met for an hour each week but burned the majority of the time listening to each team member deliver a disorganized monologue in which they tried to remember what they did that week.

It was maddening. Most of the company was using a better system, so why were we still having these wasteful, tedious status meetings?

# Fine, then I won't tell anyone what I'm doing

When I found out that my manager didn't read my status updates, I was pissed off. I put considerable care into preparing them each week, and my manager couldn't take five minutes to read them?

I decided to just stop writing them. I couldn't wait to see the look on my manager's face when the team crumbled miserably because they no longer had access to my amazing and all-important status updates.

That didn't happen. Instead, I found myself writing Snippets again a few weeks later, knowing full well that my manager would never read them.

# The joy of sending status updates to nobody

Friday afternoons are when my brain lies to me about my week. It often tells me that I wasted all my time chasing down a bug and still haven't found the root cause.

Writing status updates forced me to see my week objectively. I'd review my outgoing emails, my code check-ins, and my calendar. Invariably, this exercise reminded me that I accomplished far more than I thought in my bleak, never-gonna-solve-this-bug mood.

There were times where I completely forgot about a cool feature I launched on Tuesday because I couldn't remember past an unrelated issue that popped up on Wednesday. And even when I did truly burn an entire week on a single bug, my investigation always produced useful artifacts, like better documentation or additional automated tests.

Without Snippets, I forgot all of that and remembered only the things I hadn't accomplished.

# Other tools don't get it

After [leaving Google](/why-i-quit-google/), I searched for an external replacement for Snippets to no avail.

There are dozens of "share status with your team" services, but they're all top-down rather than bottom-up. That is, they're designed for *managers*. They promise pretty graphs and dashboards so that managers feel like they have their finger on the pulse of the team.

{% include image.html file="monday-screenshot.jpg" alt="Screenshot of Monday.com feature page" max_width="675px" img_link="true" class="img-border" fig_caption="Monday.com promises managers slick dashboards to track their employees' work but forces the employees to enter status in a rigid format." %}

Everyone enjoys nice visualizations, but they require the employees to enter information in whatever rigid format the tool expects. Team members have to do bookkeeping for the sake of bookkeeping and concoct numbers to represent how "complete" a project is.

The beauty of Snippets was that it was *just* a textbox. That meant that the employee had full autonomy over how they described their work without any overhead.

# I'm blocked because I don't have a textbox?

Unable to find a Snippets substitute, I stopped writing them. My morale took a hit as I went into Snippets withdrawal. Without a ritual to end my week on a positive, my work just felt like an endless series of thankless tasks.

I routinely checked around to see if there was any service like Snippets and always came up empty. One day, a profound and obvious realization struck me &mdash; Snippets is just a textbox. I could get a textbox anywhere.

I created a new Google Doc and wrote my update for the week:

{% include image.html file="docs-snippets.jpg" alt="Screenshot of my first Snippet in Google Docs" max_width="500px" img_link="true" class="img-border" fig_caption="Recording weekly status updates in Google Docs" %}

Every week for a year, I dutifully recorded my status updates in a private Google Doc. Nobody else saw it, but that was fine. It gave me back the habit I was missing. Each week ended with a reminder of how much I accomplished, and it felt great.

# Creating yet another status update tool

After a year, writing updates still gave me satisfaction, but I missed writing for an audience. I saw the myriad benefits of [publishing my monthly retrospectives](/keep-growing-never-profit/#i-published-monthly-goals-and-stuck-to-them) and wanted to do the same thing for my weekly updates. I also hadn't made any progress on my [2019 goal](/solo-developer-year-1/#goals-for-year-two) of gaining expertise in a JavaScript framework.

All these factors gave me a great excuse to create my own custom status sharing web app. So I did. It's called [What Got Done](https://whatgotdone.com):

TODO: What Got Done screenshot

I record my status updates in it every week. In the last month, the site has attracted **three** other users. Hear that venture capital investors? 300% month-over-month growth!

If you'd like to experience the joy of a weekly accomplishment review, come [take it for a spin](https://whatgotdone.com). It's free.

**Shamelesss plug**: If you're interested in using this tool for your job, [email me](/about/).
{: .notice--info}

---

*Cover art by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/).*