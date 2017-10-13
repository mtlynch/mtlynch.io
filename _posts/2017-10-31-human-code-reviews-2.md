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
---

# Techniques
## Aim to bring the code up a letter grade or two

Early in my career, the bar I set for adding my approval to a code review was that I could say, "This code is as good as if I had written it myself." It only seemed sensible. My name was forever forged in the source history as the person who approved the change, so I wanted to make sure it was the best that I could possibly make it.

This worked fine because early in my career, most of the people around me were better developers than I was. As a junior developer, my view of what could be improved in the code was limited to straightforward and uncontroversial things like, "The function naming is inconsistent across these two classes."

As I gained more experience, I began to see opportunities for deeper improvements in code I was reviewing. It's a very different experience for a senior dev to get simple, easily addressable notes from a junior dev. I realized it's much more unpleasant for a junior dev to get deep notes from a more senior dev.

If a code review comes to you as a D, the only way you're getting it up to an A+ is if you go eight rounds of review. By the end of it, the author will hate you and will never want to send you a code review ever again.

If I get a D code review now, I try to help the author get it to a C or a B-. Usually, I find that the next code review they send me will start at a C.

An F is for code that is either functionally incorrect or so convoluted that you don't have confidence of its correctness. The only reason you should withhold approval is if you can't raise the code above an F (see the section on stalemates, below).

## Limit feedback on repeated patterns

If there's a repeated pattern, don't flag it every single time. As discussed in a [previous section](#start-high-level and-work-your-way-down), there is a cost to every note you give. You don't want to spend your time writing the same note 25 times, and the author certainly doesn't want to read 25 duplicate notes.

If you see a pattern repeat two or three times, it's fine to call out each instance. Anything more than that, just ask the author to fix the pattern rather than flagging each individual instance.

For exmple:

>Style guide forbids abbreviations in names, so we should change `net_name` to `network_name`
>(ditto for `ip_addr` -> `ip_address` and `client_af` -> `client_address_family`)

>Function names should have a an underscore if they're not part of the module's public interface.
>(ditto throughout)

## Respect the scope of the review

I occasionally run into an, "If you give a mouse a cookie" problem on code reviews, where my reviewer will see something *near* the code I'm modifying and ask me to fix that too. Then, I'll fix that, and they'll notice something nearby the line I just fixed and ask me to fix that too. And on and on until a narrowly scoped changelist has expanded to include lots of unrelated changes.

The rule of thumb is: if the changelist doesn't touch it, it's out of scope.

For example, in the code snippet below:

```python
 eight = 9
-SaveFile()
+SaveFileByHandle(handle)
```

TODO: find a better example

Even if you're going to stay up all night haunted by the knowledge of a [magic number](https://en.wikipedia.org/wiki/Magic_number_(programming)) in your code base, assigned to a ridiculous variable name, it's still out of scope. Even if the author is the same person who wrote the code outside the diff,  it's still out of scope. If it's really bad, file a bug or submit your own fix, but it's not part of this code review.

The exception to this is when the changelist affects the surrounding code, even if it doesn't actually touch it.

```c++
bool Document::ValidateAndSerialize(Handle* output_handle) {
  ValidationResult validation_result = validator_->Validate(&contents_);
  if (ValidationResult == ValidationResult::Failure) {
    return false;
  }
  return serializer_->Serialize(&contents_);
}
```

TODO: show a diff of this

In this case, you should point out that the function name `ValidateAndSerialize` needs to change even though they're not actually touching that line. This is especially common for things like naming or code comments where the change causes it to go out of date.

I'll also softly break this rule if the the changelist is already pretty solid and I have very few notes, but I notice something nearby that would be an easy fix. In these cases, I make it clear that they can ignore the note.

>(out of scope, optional) We can avoid an additional copy by using a constant reference as the loop iterator.

TODO: show a diff of this

## Look for opportunities to split up large reviews

If you receive a changelist that's more than 300-400 lines of code, push back and ask the author to split up the changelist. You should push back exponentially harder as the size increases above 400 lines of code. I personally refuse to review changelists that are over 1,000 lines.

Depending on the author, they may gripe about being asked to split a changelist because it's a very tedious task. Try to help them out by suggesting logical boundaries where they can split the code. The easiest case is if the changelist has changes to multiple modules. If this is the case. In harder cases, look for the lowest layer of the changelist - functions or classes that are at a lower abstraction layer than the rest of the changes and ask to split those changes into their own changelist, then circle back to the changes on top of those later.

You should especially try to find ways to split up the changelist if the code is bad, like what you'd grade a D or F.
If you can pick a self-contained 75-line piece out of a 400, start out by asking the author if they'd mind splitting that out. This is good for two reasons. It lets you divide and conquer. Bad code gets exponentially harder as its size increases, so you're much better off reviewing two bad 250-line changelists than a single 500-line changelist. Second, it gives the author positive momentum

Ideally you should request a split at the beginning of the code review, but if you find yourself arguing endlessly about part of the code review, asking the author to split off an uncontroversial part of the changelist can be a way to ease tensions. Part of what's frustrating from the author's perspective if you're going back and forth about code review notes is that they feel like you're obstructing their progress. They probably have deadlines they're trying to hit and they might see you as obstructing those goals. If you split off a piece they can check in, you're making them feel good by showing that you can make tangible progress together.

## Welcome housekeeping changelists enthusiastically

One of the kindest things your teammates can do is a pure housekeeping code change. By "pure housekeeping," I mean a change that does not affect the software's production functionality, but makes the code easier to maintain. This includes:

* Refactoring code (*pure* refactoring that does not change behavior) (TODO: Refactoring can be very large and require scrutiny, clarify that these should be narrowly scoped and systematic).
* Deleting dead code
* Adding test cases
* Improving documentation

When my teammates send me these types of reviews, I am SOOOO happy. These types of changes are a big gift. They help everyone on the team by making the code easier to maintain.

Correspondingly, one of my biggest pet peeves is when I send out a pure refactoring change that clearly simplifies the code and my reviewer refuses to sign off until I improve it *more*.

You know the expression, "Don't look a gift horse in the mouth?" This is worse than looking a gift horse in the mouth. This is receiving a gift horse, looking it in the mouth for *an hour*, then refusing to accept it until you receive a gift saddle as well.

When a teammate asks you to review a pure housekeeping change, ask yourself, "Does this change make the code better than it was before?" If the answer is yes, give immediate approval. Add some notes, but make it clear that they are optional. If you really care about further improvements, you can write them yourself after your teammate has checked in their code. If you are nitpicky or demanding when reviewing pure housekeeping changes, you will leave your teammate feeling like no good deed goes unpunished, and it will discourage them from making these types of contributions in the future.

## Offer sincere praise

Code reviews don't need to be all negative. They are an opportunity for positive reinforcement as well. If you sent someone a changelist to review, wouldn't you like to hear comments like these in response?

* "I never knew about this API. That's really useful!"
* "This is a really elegant solution. I never would have thought of this."
* "Breaking up this function was a really good idea. It's so much simpler now."

If you gave the author a tough note that required them to rewrite a lot of their code, show appreciation that they put in the work. I'll sometimes say things like, "This looks much better!"

If you've given them feedback on previous reviews about bad coding habits and you see in a new review that they've made an effort to correct those habits, call this out as well. For example, if I've given notes in the past about documentation that's hard to read, then in a subsequent changelist, they send me documentation that's very clear, I'll usually say something like, "I like this function comment. It's very clear and thorough."

If you're reviewing code for a junior developer or someone who is new to the team, be especially cognizant of opportunities to offer praise. These are the people for whom a code review is the most stressful, so offering positive reinforcement is a good way of showing you value them as a teammate.

## Grant approval when remaining fixes are trivial

Some reviewers have the misconception that they should not approve a code review until they've witnessed fixes for every last issue. This is poor practice and wastes time for both the reviewer and the author.

Granting approval when the following are true of your remaining notes:

* You have no more notes worth discussing.
* The remaining changes you're suggesting are so trivial that it's not worth the cost of an additional round of review (e.g. renaming a variable, fixing a typo).
* Your final round of notes consist of minor suggestions that you don't mind if the author rejects, so your approval stands whether or not they act on them.
  * Explicitly mark optional notes as optional so that your teammate doesn't assume the approval is contingent on accepting the notes.

If your only remaining note is that the author missed a period at the end of a comment and you *don't* grant approval, you're either a control freak or you have such a low opinion of your teammate that you can't trust them to add punctuation without screwing something else up.

This doesn't always go perfectly. I'd say that 5% of the time, the author either misinterprets or completely misses a note I gave alongside my approval. To mitigate this, I simply look at the changes the author makes after my approval. In the rare case of miscommunication, I either follow up with them to let them know or just fix it myself and send it to them for review. Doing a small amount of work in the 5% case is much better than adding unnecessary effort and delay in the 95% case.

## Handle stalemates proactively

The worst possible outcome of a code review is a stalemate: you refuse to sign off on the changelist without further changes and the author refuses to accept your notes and make the requested changes.

In my entire software development career, I've only had one code review reach stalemate. It was not fun.  It was unpleasant to experience and it was difficult afterward just due to the strain on my relationship with my teammate and my reputation as a reviewer. It's kind of like being involved in a fistfight at the office. Even if you weren't the aggressor, it looks bad that you were involved at all.

Some indications that you're headed for a stalemate:

* The tone of discussion is becoming hostile.
* Your notes per review are not trending downward.
  * In a normal review, you number of notes should be strictly decreasing after about two or three rounds as you and the author converge on a shared vision of the code.
* You're getting pushback on a very high number of your notes.

By the time you observe symptoms, things are already in an unhealthy state. It's important that you be proactive in getting out of that state as quickly as possible.

***Option 1: Talk it out***

Meet in person or over video chat to work through the issues you're stuck on. Something about text communication makes it really easy to hate your teammate and assume they're coming from a place of stubbornness or incompetence. Talking in person will break that for both you and your teammate.

***Option 2: Evaluate whether you need a design review***

A contentious code review may mean that the design itself is flawed. Are you arguing about things that should really have been covered during the design review? *Was* there a design review?

If this is really a high-level design issue that affects your whole team, talk to the author about opening up the discussion to other members of your team so that you're not put in a position of preventing a bad design decision all by yourself.

***Option 3: Escalate***

You don't want to just sit on it or keep circling around. The longer you sit in stalemate, the more damaging it is to your relationship with your teammate. Talk to the author about escalating the discussion to your team's manager or tech lead. Offer to allow the author to reassign to a different reviewer. Whether the escalation goes in your favor or the new reviewer agrees with your notes, it's critical that you accept the decisions and move on. Continuing to fight it will drag out a bad situation and make you look unprofessional.

***Recovering from a stalemate***

Arguments in code review tend to be less about the code and more about the relationship between the author and reviewer. If you reached stalemate or near-stalemate, it's probably going to happen again in the future if you don't address the underlying issues in your relationship with that teammate.

* Discuss the situation with your team's manager
  * If there's conflict on the team, your manager should know about it. Maybe the author is difficult to work with and others have run into issues as well and your manager has specific suggestions. Maybe your manager can observe things you yourself are doing that might be contributing to the situation.
* Take a break from each other
  * Don't send each other code reviews until things have cooled off.
* Read [*Crucial Conversations*](http://amzn.to/2hvUbsP)
  * After my stalemate review, my manager suggested I read this book. It's a good resource for structuring difficult professional discussions so that they remain productive and avoid fighting.

# Conclusion

TODO: Say something conclusive and profound
