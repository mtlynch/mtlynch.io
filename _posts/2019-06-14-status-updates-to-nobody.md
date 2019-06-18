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

At my last job, status meetings with my manager were outstandingly efficient. He never asked me to list off everything I did since our last meeting. Instead, we jumped right to the meaty discussions that required an in-person back-and-forth: career growth, team development, difficult technical problems.

How did my manager have the right context to let me skip to the important stuff? He read my snippets.

# What are snippets?

Snippets is the name of an internal tool at Google for sharing status with your teammates. It's just a text field where you write down your accomplishments for the week. At the beginning of the following week, your manager and teammates receive your Snippet in a weekly email digest.

At first it just seemed like yet another tool to celebrate Google's internal culture of openness and transparency, but I was amazed at how much value came from something that was basically just a textbox. In-person meetings are for topics that require discussion. The majority of status meetings are just people listing off facts while everyone else sits there bored.

# You've been writing status updates?

After two years at Google, I switched teams and got a new manager. My one-on-one meetings regressed back to the "list everything you did this week" format I suffered through at previous companies. It turned out that my new manager didn't believe in reading Snippets. He preferred to hear about status updates in person.

That explained our team status meetings. The weekly team sync was an hour, but we burned the majority of it listening to each teammate deliver a disorganized monologue about what they had done in the last few days. These speeches didn't require feedback so we could have gotten the same information by just watching a pre-recorded video. Or by reading a written summary...

# Fine, then I won't tell anyone what I'm doing

When I found out that my manager didn't read my status updates, I was pissed off. I put a lot of care into preparing them each week, and my manager couldn't take five minutes to read them?

I decided to just stop writing them. Boy, won't my manager feel stupid when the team instantly disintegrates without my critical status updates?

Instead, the thing that disintegrated was my morale. I soon went into Snippets withdrawal and found myself writing them again two weeks later, knowing full well that my manager would never read them.

# Reflection is useful in itself

Friday afternoons are when my brain lies to me about my week. It often tells me that I got nothing done because I wasted all my time chasing down a bug for which I still haven't found the root cause.

Writing status updates broke that illusion. To write my update for the week, I'd review my outgoing emails, my code check-ins, and my calendar. Invariably, this exercise would show me that I accomplished much more than I remembered in my bleak, never-gonna-solve-this-bug mood.

There were times where I completely forgot about a cool feature I launched on Tuesday because I couldn't remember past an unrelated bug that popped up on Wednesday. And even in cases where I really did chase a bug for an entire week, I always produced something useful during the search, like additional documentation or more automated tests.

# Other status tools don't get it

After [I left Google](/why-i-quit-google/), I fruitlessly searched for an external replacement for Snippets. There are dozens of "share status with your team" services, but they're all top-down rather than bottom-up. That is, they're designed for *managers*. They promise pretty graphs and dashboards so that managers feel like they've got their finger on the pulse of their team.

{% include image.html file="monday-screenshot.jpg" alt="Screenshot of Monday.com feature page" max_width="675px" img_link="true" class="img-border" fig_caption="Monday.com promises managers slick dashboards to track their employees' work" %}

Everyone enjoys nice visualizations, but in order for the tool to create them, the employees have to enter information in the status tool's particular structured format. They have to do bookkeeping for the sake of bookkeeping and concoct numbers to represent how "complete" a project is.

The beauty of Snippets was that it really was *just* a textbox. That meant that the employee had full autonomy over how they described their work. The tool didn't impose any overhead or bookkeeping on the user.

# I'm blocked because I don't have a textbox?

Unable to find a Snippets substitute, I stopped writing them. Just like my last attempt to quit, my morale took a hit. Without the ritual of Snippets, my weeks just felt like an endless series of tasks.

I routinely checked around to see if there was any service like Snippets until a profound and obvious realization struck me &mdash; Snippets is just a textbox. I could get a textbox anywhere.

That Friday, I created a new Google Doc and wrote my update for the week:

{% include image.html file="docs-snippets.jpg" alt="Screenshot of my first Snippet in Google Docs" max_width="500px" img_link="true" class="img-border" fig_caption="Recording weekly status updates in Google Docs" %}

Every week for a year, I dutifully recorded my status updates in a private Google Doc. Nobody else could see it, but that was fine. It gave me back the ritual I'd been missing. I ended each work week by reminding myself of everything I accomplished. It felt great.

# Creating yet another status update tool

In April, I [gave up on a business](/keep-growing-never-profit/) I worked on for the past five months. Writing my private weekly updates still gave me satisfaction, but I missed writing for an audience, especially after seeing how [much value I got from making my monthly retrospectives public](/keep-growing-never-profit/#i-published-monthly-goals-and-stuck-to-them). I also hadn't made any progress on my [2019 goal](/solo-developer-year-1/#goals-for-year-two) of gaining expertise in a JavaScript framework.

All these factors gave me a great excuse to create my own custom status sharing web app. So I did. It's called What Got Done:

TODO: What Got Done screenshot

I record my status updates in it every week. In the last month, the site has attracted **three** other users. Hear that venture capital investors? 300% month-over-month growth!

If you'd like to experience the joy of weekly reflections, come take it for a spin. It's free.

If you're interested in using this tool for your job, [email me](/about/).
{: .notice--info}

---

*Cover art by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/).*