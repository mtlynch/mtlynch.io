---
title: How to Do Code Reviews Like a Human (Part Two)
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
sidebar:
  nav: main
header:
  teaser: images/2017-10-31-human-code-reviews-2/cover-part-two.png
---

{% include image.html file="cover-part-two.png" alt=""  img_link=true %}

This is the second half of my article about how to avoid pitfalls and communicate well in code reviews. You probably want to start with [part one](/human-code-reviews-1/), but if you're impatient, here's the short version: your effectiveness as a code reviewer is based not only on your ability to find bugs but also by the way that you interact with your teammates.

In this half, I focus on techniques to bring your code review to a successful close while avoiding ugly conflict.

# My worst code review

The worst code review of my life was for a former teammate I'll call Mallory. At the time of this review, she had just transferred to my team, though she had been at the company for several years. Her first assignment was to add a feature to a data pipeline that I maintained.

### The dreaded stalemate

After a few weeks, I received a changelist of about 300 lines of Python code. I reviewed it, and the code had a lot of issues. I expected it to be a bit rough around the edges because any new teammate has to spend some time ramping up to find the team's rhythm. These issues were beyond simple ramp-up friction. The code quality was what I'd expect from a college intern, not from a developer with 10+ years of industry experience. (TODO: Trim)

I sent my first round of notes back to Mallory. I had written 59 notes. That was my first big mistake.

A few days later, Mallory sent me an updated changelist and responses to my notes. She had fixed the simple issues. Typos, renaming variables, and such. But she wouldn't fix higher level problems I identified, such as undefined behavior for malformed input or my request to refactor a function that was nested six levels deep in `for` loops and `if` statements. Instead, she brushed these off with dismissive explanations that they weren't worth the engineering time to fix.

I sent a new round of notes, angry and frustrated. My tone was professional, but meandering into the passive aggressive realm of professional. "Can you explain *why* we want undefined behavior for malformed input?" As you might guess, Mallory's responses became even more obstinate and contemptuous.

{% include image.html file="boulder.png" alt="Pushing the code review boulder back and forth" max_width="800px"  img_link=true %}

This cycle became a torturous daily routine. It was the same each day. All morning, I would feel a sinking weight at the pit of my stomach, dreading the response she was going to send me. I would come back from lunch to find a new round of changes in my inbox. As I read the updates, I could feel my heart thumping in my chest as her responses made me more infuriated. And then I'd write more notes that passive-aggressively pointed out that she had neither made the changes I suggested nor provided an explanation of why I should approve the changelist without those changes.

Then we'd do the exact same thing the next day. The code barely changed. This went on for three weeks.

### Intervention

Our most senior teammate, who I'll call Bob, thankfully broke this cycle. He returned from a long vacation, disturbed to find us bitterly flinging code review notes back and forth. He immediately recognized the situation for what it was: a stalemate. He requested to take over the review, and we all agreed.

Bob's began his review by asking Mallory to create new changelists by splitting off two small pieces of code that we had never really fought about, each about 30-50 lines. Once Mallory did that, Bob instantly approved those changelists without any notes 

Then Bob came back to the main changelist, which was now about 200 lines of code. He made some small suggestions, which Mallory addressed, then he approved.

Bob's whole review was done in two days.

### The techniques matter

You may have figured out that this conflict wasn't really about the code. The code had legitimate issues, but these were solvable. They just required teammates who could communicate effectively.

It was an unpleasant experience, but it caused me to reevaluate my approach. My reviews are now better for it.

Below, I share techniques that will reduce your chances of running into a similarly unpleasant outcome in your code reviews. Later, I'll return to Mallory and explain why my original approach with Mallory was completely backwards and why Bob's was quietly brilliant.

# Techniques

{:start="9"}
1. [Aim to bring the code up a letter grade or two](#aim-to-bring-the-code-up-a-letter-grade-or-two)
1. Limit feedback on repeated patterns
1. Respect the scope of the review
1. Look for opportunities to split up large reviews
1. Offer sincere praise
1. Grant approval when remaining fixes are trivial
1. [Handle stalemates proactively](#handle-stalemates-proactively)

TODO: Link each technique to its heading.

## Aim to bring the code up a letter grade or two

Early in my career, I would only approve a changelist once I had run out of suggestions to help the author improve it. The time spent writing the code is very small relative to the total future cost of maintaining the code. If it took a week of back-and-forths to make the code the best it could be, so be it.

The problem is that people have limited patience. While your teammate might like the *idea* of making the changelist the best it can possibly be, they'll quickly grow frustrated if you make them go round after round of review, continually telling them that their code is not yet good enough.

If a code review comes to you as a D, the only way you're getting it up to an A+ is if you go eight or more rounds of review. By the end of it, the author will hate you and will never want to send you a code review ever again.

Instead, I privately think of the code in terms of letter grades you received in school. When I receive a changelist that starts at a D, I try to help the author get it to a C or a B-. Not perfect, but good enough.

But if you accept C-grade code, won't you eventually have a C-grade codebase? Fortunately, no. I find that when I help a teammate go from a D to a C, the next code review they send me will *start* at  roughly a C. Within a few months, they send me reviews that start as Bs, and I can help them bring those to As.

{% include image.html file="letter-grade.png" alt="Reviewer helping author bring paper up by a letter grade"  img_link=true %}

Fs are the exception. An F is for code that is either functionally incorrect or so convoluted that you don't have confidence in its correctness. The only reason you should withhold approval is if the code remains at F after a few rounds of review (see the section on [stalemates](#handle-stalemates-proactively), below).

## Limit feedback on repeated patterns

There are certain patterns of mistakes that can appear many times within a single changelist: mistakes stemming from lack of familiarity with the technology stack or the team's style guide. When you notice that several of the author's mistakes fit the same pattern, don't flag  every single instance. You don't want to spend your time writing the same note 25 times, and the author certainly doesn't want to read 25 duplicate notes.

If you see a pattern repeat two or three times, it's fine to call out each instance. Anything more than that, just ask the author to fix the pattern rather than flagging each individual instance.

>Function names should have a an underscore if they're not part of the module's public interface.
>(ditto throughout)

## Respect the scope of the review

Some reviewers have a mindset of "one more thing while you're here" that *seems* helpful, but is actually counterproductive. The reviewer will identify something *near* the lines being modified and ask the author to fix that too. Then, I'll fix that, and they'll notice something nearby the line I just fixed and ask me to fix that too. And on and on until a narrowly scoped changelist has expanded to include lots of unrelated changes.

>If a hungry little mouse shows up on your doorstep, you might want to give him a cookie. And if you give him a cookie, he'll ask for a glass of milk. He'll want to look in a mirror to make sure he doesn't have a milk mustache, and then he'll ask for a pair of scissors to give himself a trim...
>
>-Laura Joffe Numeroff, [*If You Give a Mouse a Cookie*](http://amzn.to/2iFNk4u).

The rule of thumb is: if the changelist doesn't touch it, it's out of scope.

For example, in the code snippet below:

```diff
eight = 9
-SaveFile()
+SaveFile(encoding.ASCII)
SeekToPosition(eight)
```

Even if you're going to stay up all night haunted by the knowledge of a [magic number](https://en.wikipedia.org/wiki/Magic_number_(programming)) in your code base, assigned to a ridiculous variable name, it's out of scope. Even if the author of the changelist under review is the same person who wrote the code outside the diff,  it's still out of scope. If it's really bad, file a bug or submit your own fix — don't force it onto the author's plate for this review.

The exception is when the changelist affects the surrounding code without actually touching it.

```diff
bool Document::ValidateAndSerialize(Handle* output_handle) {
-  ValidationResult validation_result = validator_->Validate(&contents_);
-  if (validation_result == ValidationResult::Failure) {
-    return false;
-  }
  return serializer_->Serialize(&contents_);
}
```

TODO: show a diff of this

In this case, you should point out that the author needs to rename the function from `ValidateAndSerialize` to just `Serialize`. They haven't touched the line that defines the function name, but their changes caused the line to become incorrect. This is especially common for things like naming or code comments where the change causes it to go out of date.

I will softly break this rule if I don't have many notes, but I notice something nearby that would be an easy fix. In these cases, I make it clear that they can ignore the note.

{% include image.html file="out-of-scope-note.png" alt="Pointing out an issue that's out of scope" max_width="790px" %}

## Look for opportunities to split up large reviews

If you receive a changelist that's more than 300-400 lines of code, encourage the author to split it into smaller pieces. Push back proportionally harder the more the changelist exceeds 400 lines of code. I personally refuse to review changelists that are over 1,000 lines.

{% include image.html file="magician.png" alt="Magician splits large reviews" max_width="800px"  img_link=true %}

The author may gripe about splitting the changelist because it's a very tedious task. Ease their burden in your request by suggesting logical boundaries for the split. The easiest case is when the changelist touches multiple files independently. in which case they can just split the changelist into smaller sets of files. In harder cases, look for the lowest layer of the changelist - functions or classes that are at a lower abstraction layer than the rest of the changes and ask to split those changes into their own changelist, then circle back to the changes on top of those later.

You should especially try to find ways to split up the changelist if the code is low quality, like what you'd grade a D or F.
The difficulty of reviewing bad code grows exponentially with the size of the changelist. Instead, divide and conquer. You're much better off reviewing two sloppy 250-line changelists than a single 500-line abomination.

## Offer sincere praise

Code reviews don't need to be all negative. They are an opportunity for positive reinforcement as well. If you sent someone a changelist to review, wouldn't you like to hear comments like these in response?

* "I never knew about this API. That's really useful!"
* "This is a really elegant solution. I never would have thought of this."
* "Breaking up this function was a really good idea. It's so much simpler now."

If you give the author a tough note that required them to rewrite a lot of their code, show appreciation in the next review round for their hard work. A simple, "This looks much better!" gives recognition that you value the effort they put in.

{% include image.html file="mma.png" alt="Sincere praise at an MMA match" max_width="650px"  img_link=true %}

If you've given them feedback on previous reviews about bad coding habits and you see in a new review that they've made an effort to correct those habits, call this out.

Be especially cognizant of opportunities to offer praise when you review code for a junior developer or for someone new to the team. These are the people for whom a code review is the most stressful, so offering positive reinforcement establishes you as their supportive teammate rather than their code review opponent.

## Grant approval when remaining fixes are trivial

Some reviewers have the misconception that they should not approve a code review until they witness fixes for every last issue. This is poor practice. It wastes time for both the reviewer and the author.

Grant approval when the following are true of your remaining notes:

* You have no more notes.
* The remaining changes you're suggesting are so trivial that it's not worth the cost of an additional round of review (e.g., renaming a variable, fixing a typo).
* Your final round of notes consist of minor suggestions that you don't mind if the author rejects, so your approval stands whether or not they act on them.
  * Explicitly mark optional notes as optional so that your teammate doesn't assume the approval is contingent on accepting the notes.

If your only remaining note is that the author missed a period at the end of a comment and you *don't* grant approval, it signals that you're either a control freak or you have such a low opinion of your teammate that you can't trust them to add punctuation without screwing something else up.

This doesn't always go perfectly. I'd say that 5% of the time, the author either misinterprets or completely misses a note I gave alongside my approval. To mitigate this, I simply look at the changes the author makes after my approval. In the rare case of miscommunication, I either follow up with them to let them know or just fix it myself and send it to them for review. Doing a small amount of work in the 5% case is much better than adding unnecessary effort and delay in the 95% case.

## Handle stalemates proactively

The worst possible outcome of a code review is a stalemate: you refuse to sign off on the changelist without further changes, and the author refuses to make the changes you want.

{% include image.html file="pilots.png" alt="Tension during code review" max_width="850px"  img_link=true %}

Some indications that you're headed for a stalemate:

* The tone of discussion is becoming hostile.
* Your notes per review round are not trending downward.
* You're getting pushback on an unusually high number of your notes.

By the time you observe symptoms, things are already in an unhealthy state. It's important to be proactive in getting out of that state as quickly as possible.

***Consider a design review***

A contentious code review may mean reveal weaknesses earlier in the process. Are you arguing about things that should have been covered during the design review? *Was* there a design review?

If you're really arguing about a high-level design issue that affects your whole team, that shouldn't be a decision between the two people who happen to be on the code review. Talk to the author about opening up the discussion to other members of your team in the form of a design review.

***Talk it out***

Meet in person or over video chat to work through the issues you're stuck on. Text communication makes it easy to build animosity toward your teammate and imagine they're coming from a place of stubbornness or incompetence. Talking in person will break that for both you and your teammate.

***Concede or Escalate***

The longer you sit in stalemate, the more damaging it is to your relationship with your teammate. If alternatives haven't gotten you unstuck, your options are to either concede or escalate.

Weigh the cost of just approving the changes. You can't build quality software if you just throw up your hands at the first sign of trouble, but you also can't build good software when you and your teammate have fought so bitterly about this issue that you can no longer work together.

If concession is not an option, talk to the author about escalating the discussion to your team's manager or tech lead. Offer to allow the author to reassign to a different reviewer. Whether the escalation goes in your favor or the new reviewer agrees with your notes, it's critical that you accept the decisions and move on. Continuing to fight it will drag out a bad situation and make you look unprofessional.

***Recovering from a stalemate***

Arguments in code review tend to be less about the code and more about the relationship between the author and reviewer. If you reached stalemate or near-stalemate, this pattern will repeat if you don't address the underlying tensions between you and your teammate.

* Discuss the situation with your manager
  * If there's conflict on the team, your manager should know about it. Maybe the author is just difficult to work with. Maybe you're contributing to the situation in ways you don't recognize, and your manager can expose your blind spots.
* Take a break from each other
  * If possible, avoid sending each other code reviews for a few weeks until things have cooled off a bit.
* Research conflict resolution
  * I read [*Crucial Conversations*](http://amzn.to/2hvUbsP) and found it to be helpful. Its advice may sound common-sense, but there's tremendous value in thinking deliberately about your approach to conflict when you're not actually in an emotionally heated state of conflict.

# My worst code review: revisited

Remember my terrible code review with Mallory? Why did it go so badly for me, but so smoothly for Bob?

This was Mallory's first code review on the team. She probably felt pressure and judgment that I didn't take the time to recognize. She didn't know the team had a blame-free culture around code reviews, so seeing 59 notes in a single round likely set off her fight of flight response.

I acted emotionally as well. I had taken time to write suggestions I felt were thoughtful and would improve our code. Seeing them dismissed so casually made me feel as though she wasn't showing me respect me as a teammate. I was fearful of the precedent I'd be setting. If I allowed her to just submit code without convincing me of its correctness or maintainability, our codebase would soon devolve into a hacky, unmaintainable mess.

## What I did wrong

The biggest problem was that I didn't adjust my techniques to take into account that it was Mallory's first review on the team. Ths was most problematic in the volume of notes I gave. I should have [started out with only high-level notes](/human-code-reviews-1/#start-high-level-and-work-your-way-down) so that she didn't feel ambushed by seeing a new critique every five lines of code.

I should have done more to demonstrate that I wasn't there to obstruct the work, but rather help it move forward by providing [code examples](/human-code-reviews-1/#be-generous-with-code-examples) and [calling out the positives](#offer-sincere-praise) in her changelist.

I also allowed the stalemate to drag on too long. After a few rounds, it should have been clear to me that we were not making meaningful progress in the review. I should have  [taken the initiative](#handle-stalemates-proactively) to make a drastic change, such as meeting in person to address the deeper conflict or escalating to our manager.

## What Bob did right

Bob's first move of [splitting up the review](#look-for-opportunities-to-split-up-large-reviews) was very effective. Here was a review that had been painfully stalled for three weeks. Suddenly, two pieces of it are now checked in. Now both Mallory and Bob feel good because there's tangible progress. There are still issues with the remaining chunk, but now it's a smaller, easier to manage changelist.

Bob also [didn't try to strangle the review to perfection](#aim-to-bring-the-code-up-a-letter-grade-or-two). He likely could recognize the same issues that I was screaming about, but he also realized Mallory would be on the team awhile, and that if he was not so rigid in the short term, quality would go up in the long term.

# Conclusion

After I published the first half of this articles, several readers commented that the communication style I advocate is patronizing or too indirect. This is reasonable and expected. A note that one person considers patronizing, another person interprets as caring. Conversely, a note that's concise and efficient to one person can read as brusque and rude to another. The right way to communicate will depend on a variety of factors: your teammate's personality, your personality, your company's culture, etc. Take time to notice which techniques yield positive results with each of your teammates.

What I hope you take away from this article is that with every action you take during a code review, you are making choices, whether or not you're conscious of them.  It's not important that you make *my* choices. It's important you recognize there *are* choices. The techniques I describe in the article are meant to get you to think critically about how you approach your code reviews.

Good luck, and may your code reviews be human-like.

# Further Reading

His excerpt ["Humanizing Peer Reviews"](www.processimpact.com/articles/humanizing_reviews.html) is definitely worth a read.


*Edited by [Samantha Mason](https://www.upwork.com/fl/samanthamason). Illustrations by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/). Thanks to [@global4g](https://twitter.com/global4g) for providing valuable feedback on an early draft of this post.*