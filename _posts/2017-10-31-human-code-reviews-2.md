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

This is the second half of my article about how to communicate well and avoid pitfalls in code reviews. In this half, I focus on techniques to bring your code review to a successful close while avoiding ugly conflict.

I've laid some groundwork in [part one](/human-code-reviews-1/), so I recommend starting there. If you're impatient, here's the short version: a good code reviewer is someone who not only finds bugs but who communicates their critiques like a human talking to other humans.

# My worst code review

The worst code review of my life was for a former teammate I'll call Mallory. She started at the company several years before I joined, but had only recently transferred to my team. Her first assignment was to add a feature to a data pipeline that I maintained.

### The review

When Mallory sent me her first changelist for review, the code was a bit rough. She had never written Python before, and she was building on top of a klunky legacy system.

I dutifully recorded all of the issues I found, 59 in total. According to the code review literature I've [discussed previously](/human-code-reviews-1/), I had done a great job. I found SO many mistakes, therefore I must be a good reviewer.

A few days later, Mallory sent me the updated changelist and her responses to my notes. She had fixed the simple issues: typos, renaming variables, etc. But she refused to address higher-level notes, such as my observation that her code had undefined behavior for malformed input. She also declined my suggestion to refactor a function that was nested six levels deep in `for` loops and `if` statements. Instead, she explained dismissively that these issues were not worth the engineering time to fix.

I sent a new round of notes, angry and frustrated. My tone was professional, but meandering into the realm of passive-aggressive. "Can you explain *why* we want undefined behavior for malformed input?" As you might guess, Mallory's replies in the next round of review were even more obstinate and contemptuous.

{% include image.html file="boulder.png" alt="Pushing the code review boulder back and forth" max_width="800px"  img_link=true %}

### A bitter cycle

It was Tuesday, a week later. Mallory and I were still going back and forth on the same review. I sent her my latest round of notes the evening before. I had purposely withheld them until she left for the day because I didn't want to be in the same room as she read them.

All morning, I felt a sinking weight in the pit of my stomach as I dreaded the next round of review. I came back from lunch to see that Mallory was away from her desk, but had sent me a new round of changes. I guess she didn't want to be around to see me read her responses either.

I felt my heart begin pounding in my chest as I grew more infuriated by each of her responses. I immediately started drafting rebuttals, angrily pointing out that she had neither made the changes I suggested nor provided an explanation of why I should approve the changelist without those changes. I didn't want to send them until she was out of the office, so I spent the afternoon trying to get other work done. But I ended up just re-editing my replies and ruminating.

Then we'd do the exact same thing the next day. The code barely changed. This went on for three weeks.

### Intervention

Our most senior teammate, who I'll call Bob, thankfully broke this cycle. He returned from a long vacation, alarmed to find us bitterly flinging code review notes back and forth. He immediately recognized the situation for what it was: a stalemate. He requested to take over the review, and we both agreed.

Bob began his review by asking Mallory to create new changelists, splitting off two small libraries that we had never really fought about, each about 30-50 lines. Once Mallory did that, Bob instantly approved those changelists without any notes.

Then, Bob came back to the main changelist, which was trimmed down to about 200 lines of code. He made a few small suggestions, which Mallory addressed. Then, he approved the changelist.

Bob's whole review was done in two days.

### Communication matters

You may have deduced that this conflict wasn't really about the code. The code had legitimate issues, but they were clearly solvable by teammates who were able to communicate effectively.

It was an unpleasant experience, but one I'm glad for because it caused me to reevaluate and improve my approach to reviews. Below, I share techniques that will reduce your chances of running into a similarly undesirable outcome in your code reviews. Finally, I'll return to Mallory and explain why my original techniques were backward and why Bob's were quietly brilliant.

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

While your teammate might, in *theory*, want to explore every opportunity to improve their code, developer patience is finite. They'll quickly grow frustrated if you withhold approval for round after round because you keep finding new and brilliant ideas about how they can further polish their changelist.

I privately think of the code in terms of letter grades, from A to F. When I receive a changelist that starts at a D, I try to help the author raise quality to a C or a B-. Not perfect, but good enough.

It's possible, in theory, to bring a D up to an A+, but I've it's just not worth it. It will take eight or more rounds of review. By the end, the author will hate you and will never want to send you code again.

{% include image.html file="letter-grade.png" alt="Reviewer helping author bring paper up by a letter grade"  img_link=true %}

"But if I accept C-grade code, won't I end up with a C-grade codebase?"

Fortunately, no. I find that when I help a teammate go from a D to a C, the next changelist they send me will *start* at a C. Within a few months, they're sending me reviews that start as Bs. I can help them bring those to As.

An F is reserved for code that is either functionally incorrect or so convoluted that you don't have confidence in its correctness. The only reason you should withhold approval is if the code remains at F after a few rounds of review (see the section on [stalemates](#handle-stalemates-proactively), below).

## Limit feedback on repeated patterns

When you notice that several of the author's mistakes fit the same pattern, don't flag  every single instance. You don't want to spend your time writing the same note 25 times, and the author certainly doesn't want to read 25 duplicate notes.

If you see a pattern repeat two or three times, it's fine to call out each occurrence. Anything more than that, just ask the author to fix the pattern rather than every particular instance.

>Function names should have an underscore if they're not part of the module's public interface.
>(ditto throughout)

TODO: Make this a screenshot.

## Respect the scope of the review

There's an anti-pattern I see frequently in reviews where the reviewer identifies something *near* the lines being modified and asks the author to fix that too. The reviewer believes they're being helpful, but this practice is counterproductive. Once the author complies, the reviewer usually realizes that the code is better but inconsistent, so it needs a few more minor changes. And on and on until a narrowly-scoped changelist has expanded to include lots of unrelated changes.

{% include image.html file="if-you-give-a-mouse-a-cookie.jpg" alt="If You Give a Mouse a Cookie" max_width="240px" fig_caption=fig_caption class="align-right" img_link=true %}

>If a hungry little mouse shows up on your doorstep, you might want to give him a cookie. And if you give him a cookie, he'll ask for a glass of milk. He'll want to look in a mirror to make sure he doesn't have a milk mustache, and then he'll ask for a pair of scissors to give himself a trim...
>
>-Laura Joffe Numeroff, [*If You Give a Mouse a Cookie*](http://amzn.to/2iFNk4u)

The rule of thumb is: if the changelist doesn't touch the line, it's out of scope.

Here's an example:

```diff
eight = 9
-SaveFile()
+SaveFile(encoding.ASCII)
SeekToPosition(eight)
```

TODO: Show a diff of this. Highlight the first line as out of scope.

Even if you're going to stay up all night haunted by the [magic number](https://en.wikipedia.org/wiki/Magic_number_(programming)) in your codebase assigned to a ridiculous variable name, it's out of scope. Even if the author is the same person who wrote those nearby lines,  it's still out of scope. If it's egregiously bad, file a bug or submit your own fix. But don't force it onto the author's plate in this review.

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

In this case, you should point out that the author needs to rename the function from `ValidateAndSerialize` to just `Serialize`. They haven't touched the line containing the function signature, but their changes caused the line to become incorrect.

I softly break this rule if I don't have many notes, but I notice an easy fix nearby. In these cases, I make it clear that the author can ignore the note if they please.

{% include image.html file="out-of-scope-note.png" alt="Pointing out an issue that's out of scope" max_width="790px" %}

## Look for opportunities to split up large reviews

If you receive a changelist that's more than 300-400 lines of code, encourage the author to split it into smaller pieces. Push back proportionally harder the more the changelist goes over 400 lines. I personally refuse to review changelists that are over 1,000 lines.

{% include image.html file="magician.png" alt="Magician splits large reviews" max_width="800px"  img_link=true %}

The author may gripe about splitting the changelist because it's a tedious task. Ease their burden by offering suggestions of logical boundaries for the split. The easiest case is when the changelist touches multiple files independently. In that case, they can just split the changelist into smaller sets of files. In harder cases, look for the ground level of the changelist — functions or classes that are at a lower layer of abstraction than the rest of the changes. Ask the author to split those changes into a separate changelist, then circle back to the rest of the code after the first changelist is merged in.

When the code is low quality, you should especially encourage the author to split up the changelist. The difficulty of reviewing bad code grows exponentially with the size of the changelist. Divide and conquer. You're better off reviewing a couple 300-line sloppy changelists than a single 600-line abomination.

## Offer sincere praise

Most reviewers focus only on what's *wrong* with the code, but reviews are a valuable opportunity to reinforce positive behaviors.

For example, imagine you're reviewing a changelist and you come across a particularly clear, concise function comment. If the author has struggled to write good documentation in the past, let them know they nailed it this time. They'll improve faster if you tell them when they're getting it right instead of just waiting to ding them when they screw up.

{% include image.html file="mma.png" alt="Sincere praise at an MMA match" max_width="650px"  img_link=true %}

Praise is by no means reserved for when an author shows improvement. Any time I see something in the changelist that delights me, I tell the author about it:

* "I never knew about this API. That's really useful!"
* "This is an elegant solution. I never would have thought of this."
* "Breaking up this function was a great idea. It's so much simpler now."

Look especially hard (todo: reword) for opportunities to offer praise if the author is a junior developer or joined the team recently, as they're likely to feel nervous or defensive during a review. Sincere compliments demonstrate that you are a supportive teammate. not a sadistic gatekeeper.

## Grant approval when remaining fixes are trivial

Some reviewers have the misconception that they should withhold approval until they witness fixes for every last note. This is poor practice. It adds needless code review rounds, wasting time for both the author and reviewer.

Grant approval when any of the following are true:

* You have no more notes.
* Your remaining notes are for trivial issues.
  * e.g., renaming a variable, fixing a typo
* Your remaining notes are optional suggestions.
  * Explicitly mark these as optional so that your teammate doesn't assume your approval is contingent on accepting the notes.

I've seen reviewers withhold approval because the author missed a period at the end of a code comment. This squanders development cycles and signals to the author that the reviewer can't trust them to add simple punctuation unsupervised.

There is a risk in granting approval when there are outstanding notes. I estimate that ~5% of the time, the author either misinterprets a note or misses it completely. To mitigate this, I simply review the author's post-approval changes. In the rare case of miscommunication, I either follow up with the author afterward or create my own changelist with a fix. Adding a small amount of work to the 5% case is better than adding unnecessary effort and delay in the 95% case.

## Handle stalemates proactively

The worst possible outcome of a code review is a stalemate: you refuse to sign off on the changelist without further changes, but the author refuses to make those changes.

Here are some indicators that you're headed for a stalemate:

* The tone of discussion is becoming tense or hostile.
* Your notes per review round are not trending downward.
* You're getting pushback on an unusually high number of your notes.

{% include image.html file="pilots.png" alt="Tension during code review" max_width="850px"  img_link=true %}

### Talk it out

Meet in person or over video chat to work through the issues you're stuck on. Text communication has a way of causing you to forget there's a real human at the other end of the computer. It becomes too easy to imagine your teammate is coming from a place of stubbornness or incompetence. An in-person conversation will break that spell for both you and the author.

### Consider a design review

A contentious code review may indicate weaknesses earlier in the process. Are you arguing about things that should have been covered during the design review? *Was* there a design review?

If the root of the disagreement is a high-level design issue, you should hash that out at the team level rather than leaving it in the hands of the two people who happen to be on the code review. Talk to the author about opening up the discussion to other members of your team in the form of a design review.

### Concede or Escalate

The longer you and your teammate stew in stalemate, the more damaging it is to your relationship. If alternatives haven't gotten you unstuck, your options are to either concede or escalate.

Weigh the cost of just approving the changes. You can't build quality software if you casually accept low-quality code, but you also can't achieve high quality when you and your teammate fight so bitterly that you can no longer work together. How bad would it *really* be if you approved the changelist? Is it code that could potentially lose customer data? Or is it a background process where, at worst, the job will fail and require a developer to debug it? If it's closer to the latter, consider simply conceding so that you can help your teammate improve in the future on good terms.

If concession is not an option, talk to the author about escalating the discussion to your team's manager or tech lead. Offer to allow the author to reassign to a different reviewer. If the escalation goes against you, it's critical to accept the decision and move on. Continuing to fight it will drag out a bad situation and make you look unprofessional.

### Recovering from a stalemate

Messy arguments in reviews tend to be less about the code and more about the relationship between the author and reviewer. If you reached stalemate or near-stalemate, this pattern will repeat if you don't address the underlying tensions between you and your teammate.

* Discuss the situation with your manager.
  * If there's conflict on the team, your manager should know about it. Maybe the author is just difficult to work with. Perhaps you're contributing to the situation in ways you don't recognize. A good manager will help both of you address these issues.
* Take a break from each other.
  * If possible, avoid sending each other code reviews for a few weeks until things have cooled off a bit.
* Study techniques for conflict resolution.
  * I've found the book [*Crucial Conversations*](http://amzn.to/2hvUbsP) to be helpful. Its advice may sound common-sense, but there's tremendous value in thinking critically about your approach to conflict.

# My worst code review: revisited

Remember the code review with Mallory? Why did mine turn into a three-week slog through passive-aggressive muck while Bob's was a two-day breeze?

## What I did wrong

This was Mallory's first review on the team, and I failed to account for the fact that receiving code review notes from a new person would make her feel judged. I should have [started out with only high-level notes](/human-code-reviews-1/#start-high-level-and-work-your-way-down) so that she didn't feel ambushed by critiques from me after every five lines of code.

I should have done more to demonstrate that I wasn't there to obstruct her work, but rather help it move forward. I could have provided [code examples](/human-code-reviews-1/#be-generous-with-code-examples) or [called out the positives](#offer-sincere-praise) in her changelist.

I allowed [my ego](/human-code-reviews-1/#never-say-you) negatively affected the in the review. I had spent the past year nursing this old pipeline back to health. Suddenly Mallory starts futzing with it and can't be bothered to take my concerns seriously? A good author doesn't take confuse code review notes as personal criticism. A good reviewer is similarly responsible for detaching their emotions from the review.

Finally, I allowed the stalemate to drag on too long. After a few rounds, it should have been clear to me that we were not making meaningful progress. I should have [taken the initiative](#handle-stalemates-proactively) to make a drastic change, such as meeting in person to address the deeper conflict or escalating to our manager.

*(**Note to Samantha**: I feel like there's too much "I" in this section, but I'm not sure how to get rid of it. Suggestions?)*

## What Bob did right

Bob's first move of [splitting up the review](#look-for-opportunities-to-split-up-large-reviews) was very effective. Here was a review that had been painfully stalled for three weeks. Suddenly, two pieces of it are checked in. Now both Mallory and Bob feel good because there's tangible progress. There are still issues with the remaining chunk, but it's a smaller, easier to manage changelist.

Bob also [didn't try to strangle the review to perfection](#aim-to-bring-the-code-up-a-letter-grade-or-two). He likely recognized the same issues that I was screaming about, but he also realized Mallory would be on the team awhile. He was willing to be flexible in the short term because it positioned him to improve quality in the long term.

# Conclusion

After I published the first half of this article, several readers took issue with the communication style I recommended. Some found it patronizing. Others worried that it was too indirect and risked miscommunication. This feedback is reasonable and expected.

One person may read a terse review comment and judge it as brusque or rude. Another may deem the same comment concise and efficient.

A variety of factors determine the ideal way to communicate: your teammate's personality, your personality, your company's culture, etc. The only way to decide what's right in your particular situation is to pay attention to results and think critically. Which techniques yield positive results with each of your teammates? Which ones result in poor code quality, tension, or inefficiency?

Every time you write a note during a code review, you make choices.  It's not important that you make *my* choices - it's important that you recognize there *are* choices. The more deliberate you are about your choices and the more, the better your reviews will be.

Good luck, and may your code reviews be human-like.

# Further Reading

Dr. Karl Wiegers is the only author I found who wrote about the importance of communication in code reviews. He summarizes his views nicely in his article, ["Humanizing Peer Reviews"](http://www.processimpact.com/articles/humanizing_reviews.html). Wiegers' book, [*Peer Reviews in Software: A Practical Guide*](http://amzn.to/2Ai1nBy), from which the article is excerpted, offers a detailed blueprint for a highly regimented approach to reviews.

*Edited by [Samantha Mason](https://www.upwork.com/fl/samanthamason). Illustrations by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/). Thanks to [@global4g](https://twitter.com/global4g) for providing valuable feedback on an early draft of this post.*