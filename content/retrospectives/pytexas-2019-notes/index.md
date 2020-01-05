---
title: Notes from PyTexas 2019
description: My notes and self-critiques from speaking at PyTexas.
date: '2019-04-18'
---

## Overview

This past weekend, [PyTexas](https://www.pytexas.org/2019/) invited me to speak at their annual conference in Austin, Texas.

It was a fun trip, and I learned a lot. It was also expensive, both financially and in terms of time. I'm taking these notes partly to share what I learned and partly to help me decide whether the benefits I get from attending conferences outweigh the costs.

## Favorite Talks

### Intentional Deployment: Best Practices for Feature Flag Management

{{< youtube AD8LSdy7b2s >}}

**Speaker**: [Caitlin Rubin](https://www.linkedin.com/in/caitlin-rubin-a3b1a2103/) from Optimizely

Feature flags allow a software team to change an application's behavior at runtime rather than pushing an entirely new deployment. For substantial changes, you often want to do a progressive rollout, enabling it for 1% of users, then 5%, then 25%, just so that you can limit the damage if the change causes things to blow up in production. Teams frequently achieve this slow rollout with feature flags.

Feature flags suffer from the [tragedy of the commons](https://en.wikipedia.org/wiki/Tragedy_of_the_commons) problem. It's easy for any individual developer to add a flag for their new feature, but if everyone constantly puts in new feature flags, the application accrues so many different execution paths that it becomes difficult to reason about the program's behavior. Further, once the team enables a feature globally, the developer has little incentive to do the grungy work of removing the branching logic and eliminating the flag.

This talk succinctly explained feature flags, why they can cause problems, and shared concrete steps for preventing those issues. In particular, I liked Caitlin's suggestion of a ["WIP limit"](https://kanbanize.com/kanban-resources/getting-started/what-is-wip/) - a work in progress limit. If your team sets a WIP limit of two, then only two feature flags can exist at a given time. This encourages developers to be thoughtful about when to use feature flags and ensures that developers remove the flags when the application no longer requires the branching feature logic.

Other things I liked:

* Slide deck was clean, never overwhelming the audience with text
* Slides advanced or updated every few seconds to keep things moving
* Caitlin telegraphed comfort on stage, spoke clearly and calmly
* Good mix of humor sprinkled throughout the presentation

### Free yourself from your ORM with mypy!

{{< youtube oLvEXiV0L-Q >}}

**Speaker**: Thomas Stephens from uStudio

I've always had an aversion to object-relational mapping (ORM) frameworks. They allow developers to move application objects in and out of data stores without having to implement a lot of serialization and deserialization logic by hand. Thomas articulated the problem I've always had with ORM systems but could never put into words: they bind your object model to your ORM framework.

I've also seen [mypy](http://mypy-lang.org/) and understood the appeal, but I tried it about a year ago and had a hard time getting it to work on my projects (most of which are Python 2.7), so I just gave up. If you haven't seen it, it's a static type checker for Python. It reads [PEP 484](https://www.python.org/dev/peps/pep-0484/) type hints in your code and tells you when you're violating them.

This talk provided a gentle introduction to mypy and highlighted a far-reaching benefit of using it. Namely, implementing your own data serialization and deserialization without too much hassle and leaning. Thomas demonstrated how you can lean on the type checker heavily to prevent common serialization errors.

Other things I liked:

* Clear articulation of the problem he's trying to solve
* Simple live-coding that was easy to follow
* Code was elegant and clear

### When Booleans Are Not Enough... State Machines?

{{< youtube I1Mzx_tSpew >}}

**Speaker**: [Harrington Joseph](https://twitter.com/harph) from Netflix

**[Slides](https://speakerdeck.com/hjoseph/when-booleans-are-not-enough-dot-dot-dot-state-machines)**

Applications often use booleans to track an object's state. Because Harrington is with Netflix, he used the example of a video player, which highlighted the issue well. A video can either be playing, paused, or stopped. A naive approach would track this with booleans like `is_playing` and `is_paused`.

Managing state like this imposes a heavy burden on the developer because now they have to do a lot of work to deduce state. Inferring a "stopped" state requires checking `is_playing == False and is_paused == False`, which is convoluted. It also puts a lot of work on the developer to check illegal state transitions. For example, you can't pause a video that's already stopped, so enforcing that restriction clutters your code.

Harrington demonstrated how the [pytransitions library](https://github.com/pytransitions/transitions) elegantly solves that problem. It allows you to define your application's state transitions with a simple list of states &mdash; then the library manages all the transitions for you. You can check which state you're in, and the library raises an exception on any illegal state transition; you don't have to write any code to check it manually.

Other things I liked:

* Beautiful slides
  * The dark theme worked well
  * The full-screen code snippets with syntax highlighting made it easy to read
  * Great diagrams of state machines that were easy to understand
* Clear code examples
  * Elided out code that wasn't relevant to his core point, making everything easy to think about

## Other notable takeaways

### There are code review tools for prose

This had nothing to do with Python but was a valuable gem I picked up serendipitously by talking to another conference attendee.

One idea I've had for a future project is to build something like [Reviewable](https://reviewable.io/), but for prose content instead of code. I've searched for tools like that but found only heavyweight tools geared toward large publishers (e.g., tools for newspapers, optimized for complicated workflows with many approvers). When I talked to Caitlin Rubin, she mentioned to me that she knew of a tool like that called <a href="https://www.penflip.com/" rel="nofollow">Penflip</a>.

The first day I tried visiting Penflip, I got a 502 gateway error even after many retries. The next day, the page loaded, but everything was extremely slow and ultimately led to unrecoverable server errors. So, it seems like it might not be an active product anymore.

Still, having one product name gave me a toehold to search for others. Apparently, there's a whole mess of "code review, but for content" products out there that have failed:

* <a href="https://draftin.com/" rel="nofollow">Draft</a>: One of the few still-functional editing apps but doesn't seem to support reviews well.
* [Editorially](http://stet.editorially.com/articles/goodbye/): This was a free tool that people reputedly loved, but it shut down in 2014. I found many articles mourning its closure.
* <a href="https://typewrite.io" rel="nofollow">Typewrite</a>: Site is still up, but functionality is broken to the point that I can't even sign up. Last Twitter post was in 2014, so I think it's dead.
* Poetica: I've seen this mentioned, but it's now dead. Didn't seem especially popular.

### The Zen of Python

Several speakers mentioned [The Zen of Python](https://www.python.org/dev/peps/pep-0020/), a famous list of guiding principles for Python. I had never seen this list before, but they're good to know. They also appear in any Python interpreter if you type `import this`.

```text
>>> import this
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
```

### PyCon is a big deal

Several people spoke glowingly of PyCon. PyTexas is a small, regional conference, but PyCon is national &mdash; the big leagues. It sounds like the quality of presentations is high and there are more helpful people to meet. I had been relying on [PaperCall](https://www.papercall.io/) to show me upcoming conferences, but I don't think PyCon used it, so I missed the submission deadline. I need to add it to my calendar for next year.

## What made presentations effective

* Speaker comfort
  * The talks that were the best were ones where the speaker felt comfortable and took their time.
  * The best example of this was Adrienne Lowe's keynote, ["The Zen of Python Teams."](https://www.youtube.com/watch?v=OmvUbHtSAaM)
* Personalization
  * I found talks more engaging when the speaker was part of the story. What problem were you trying to solve? What were the challenges you faced? What did you learn? Answering these questions was far more engaging than just a dry summary of "did you know tool X exists to solve problem Y?"

## What weakened presentations

* Mic issues
  * It's unfortunate that one of the most common things to take me out of presentations was something so basic and boring as audio quality.
  * The conference used the [Tony Robbins-style over the ear mic](https://upload.wikimedia.org/wikipedia/commons/5/5e/Tony_Robbins.jpg), which many speakers had trouble positioning correctly, so audio would often drift in and out.
  * Other speakers chose a handheld mic but had trouble holding it close enough to their mouth and speaking loudly enough for the mic to pick it up.
* Slide lethargy
  * The best presenters kept their slides moving briskly. They either advanced a slide or made a new bullet appear at least once every 30 seconds. I remember a feeling of "stuckness" when presenters kept the same slide up without changing anything for 60 seconds or more.
* Script-reading
  * Part of the fun of attending a live conference is that you, as the attendee, are part of the talk. The speaker is responding to your energy and adapting their presentation accordingly. When the speaker has long sections that they're reading verbatim from a script (or worse, when the entire presentation is a static script), you lose the fun of a live presentation.
* Animated gifs
  * I found these distracting, especially if they sat on the screen looping for more than a few seconds.
  * I often felt the cheap joke undermined the speaker's point.
* "This is an old slide."
  * A few presentations included information that was a year or two out of date because they were recycled from previous conferences. The speaker excused it by saying the slide was old, but it always made me feel disappointed that the speaker didn't care enough about their talk to do a run-through beforehand to catch these issues.

## Critiquing my own talk

{{< youtube hM_ex4-xu4E >}}

**Speaker**: Michael Lynch (me)

**[Slides](https://mtlynch.page.link/gdbt)**

* What went well
  * Preparedness: I did 5-8 run-throughs in the weeks leading up to the talk, so I felt comfortable with the material.
  * Slide pacing: Reviewing the video, it feels like I'm avoiding slide lethargy and moving the presentation forward at a good pace.
  * My dig at Java (see [16:15](https://youtu.be/hM_ex4-xu4E?t=975)) got a good laugh.

* What needs improvement
  * Slow down: I was talking way too fast. I forgot to keep a timer up, so I was in kind of a rushed panic to finish on time. My rehearsals were running about 27 minutes, but at the real event, I went so fast that I only used 22 minutes of my half-hour slot.
  * Look up more: I spent too much time looking down at my screen to read the content instead of engaging the audience.
  * "Magic numbers are fine in test code" (at [19:58](https://youtu.be/hM_ex4-xu4E?t=1198))
    * This line needed more justification. Fortunately, someone asked about this in the Q & A, so I was able to cover it, but it should have been part of the presentation proper.

## Other thoughts

### Attending as a speaker is more valuable than attending as a regular guest

In considering whether to attend more conferences, I've debated whether I should go to some as an attendee rather than as a speaker. I feel like there's about an order of magnitude more value in attending as a speaker.

People are more interested in talking to you as a speaker. This is true even before you've given your talk because there's a feeling of, "Oh, well you must be good at something." And then after your talk, people who want to meet you have an easy topic to discuss with you because they know at least one thing you're passionate about.

I also found that speakers made a more lasting impression on me than other attendees. I had conversations with lots of interesting people, but the ones that stick with me days later are the ones who gave a talk.

### I should have asked for something

Every speaker effectively gets a free "call to action" in their presentation. For most speakers, it's an invitation to apply to their company or to use their product. I'm not hiring, and I'm [between projects](/retrospectives/2019/04/), so a call to action didn't occur to me.

About an hour after my talk, I thought, "Oh, I should have asked businesses to send me their pain points!" I suspect that many PyTexas attendees have some part of their day jobs where they think, "I hate doing this. Why isn't there a managed service that handles this for us?" A lot of those problems go unsolved because it's hard for product-builders to connect with small businesses that have unmet needs. PyTexas might have been a good place to just say, "Hey, come talk to me, and maybe I'll build that service for you."

### Single-track conferences have a different vibe

This was the first conference I attended that was single-track. By this, I mean that only one presentation was happening at any given time, so attendees never had to decide which talks to attend because there was only ever one choice.

The single track was positive in that everyone saw the same talks, so you could discuss any presentation with anyone else, and they probably saw it. As a speaker, it's also nice to have 100% of the audience see your talk.

The downside is that single-track events lack the shuffling that multi-track conferences create naturally. In a multi-track conference, most people move to a different room after each talk and end up meeting new people. At PyTexas, most people stuck to a single table the entire day, so there was less mingling than I've seen at other conferences.

## Costs

I ended up spending more to attend this conference than I expected:

| Expense | Amount |
|---------|--------|
| Airfare | $699.96 |
| Airbnb (2 nights) | $253.26 |
| Airport parking | $89.79 |
| Uber rides | $81.93 |
| Gas | $33.01 |
| Food | $26.29 |
| PyTexas ticket | ~~$85~~ (free through PyTexas grant) |
| **Total** | **$1,184.24** |

Beyond the monetary cost, it was expensive in terms of time. It's a two-day conference, but it wiped me out for about five days. I lost roughly a day in transit each way, and then it took me about a day to catch up on non-work errands that I'd missed while I was away. Outside that, I spent 20-30 hours preparing my slide deck and rehearsing it.

## Conclusion: Keep attending, but strategically

At the beginning of the year, I [set a goal](/solo-developer-year-1/#goals-for-year-two) to speak at three conferences in 2019. PyTexas was conference #2, so I think one more for the year will be a good amount.

The benefits for me are meeting new people, hearing about tools and techniques that I otherwise wouldn't be exposed to, and getting practice public speaking. One of the biggest takeaways was learning about Penflip, which was wholly unexpected but could save me tons of time and money in avoiding their mistakes.