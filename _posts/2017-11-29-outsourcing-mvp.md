---
title: The Perils of Outsourcing Your MVP
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
sidebar:
  nav: main
---

Ferngully, who agreed to let me write about her under the condition that I assign her a silly pseudonym. We had worked together in the past, but I had left the team a year before, and she had just quit her job to travel in Europe. She was coming home in a few weeks and would begin looking for a job.

I wrote a mockup and a [design document](/files/outsourcing-mvp/ketohub-v1-design-doc.pdf).

{% include image.html file="wireframe-v1.jpg" alt="Mockup of KetoHub v1" max_width="600px" img_link=true class="align-left" %}

I felt like it would be discouraging if she delivered the backend only to sit for months waiting for me to do anything with it, so I rushed to put together a frontend.



I realized the normal dynamic had flipped. Normally you outsource work because you're too short on time to do the work. Now I had time, but I was waiting on my freelancer.

We agreed that it no longer made sense for her to work on it. A few days later, I resolved to  night, I worked on KetoHub until 2am.

# Drawbacks of outsourcing your MVP
## Only you know which corners to cut

The reason I was able to do it so much faster is because I know which corners I want to cut. Web scraping is by its nature inexact and messy. Implementing it requires decisions about the tradeoffs between cost and correctness. Is it better to spend an extra two hours coding so that I can scrape two more recipes correctly? It's difficult for me to specify these tradeoffs in advance so that another developer can adhere to them. When I'm implementing it myself, I can kind of just go by feel.

## Understand what's core to your business

The web scraping is too core to KetoHub

(TODO: link to Signal v. Noise)

For example, this blog, I work with an excellent developer (TODO link). The core element of my blog is the content and I want to

## Slower to react

I realized part of the architecture was wrong, so I can just change it. When I'm outsourcing, I have to rewrite the design doc, interrupt her work, she reads the design doc, she continues working.

There's a cost to interrupting someone and redirecting them. It's annoying to have someone continually stopping you and redirecting you. If it's my own work, that cost isn't there at all because it doesn't bother me to realize I'm doing something wrong and quickly fix it.

# Don't outsource your critical path

I couldn't make any useful progress until her work was complete. I could iterate on the UI with more dummy data, but I thought it was very likely that seeing the actual data would make me reevaluate a lot of my UI decisions. I was right.

## Lessons about working with freelancers

* Establish expectations about bandwidth per week
* Establish expectations around communication
  * Now when I hire freelancers, I have a conversation in the beginning about expected response times.