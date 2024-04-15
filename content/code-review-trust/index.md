---
title: "You Still Need Code Reviews, Even When You Trust Your Developers"
date: 2024-02-10T22:24:23-05:00
---

I'm always surprised and a little baffled when I hear people tell me that they've figured out a cool software development efficiency hack: just skip code reviews.

The justification for skipping code reviews is usually accompanied by a claim that they have so much trust in their dev team that code reviews aren't worth it. Some variation of:

> We have a high-trust team, so we don't need code reviews.

To me, it's like hearing someone tell me that they have a high-trust carpool group, so they don't use seatbelts.

https://www.raycast.com/blog/no-code-reviews-by-default

## It's not about trust

Stephen King is one of the world's most talented and successful writers. But everything Stephen King writes goes through an editor who reviews his work.

Why does Stephen King need an editor?

Does Stephen King's publisher not trust Stephen King? If King didn't have an editor, would he sneak in a 400-line sentence? Would he make a bunch of syntax errors?

Obviously, the answer to all of those questions is, "no."

Stephen King, along with virtually every other successful author, works with an editor because it elevates the quality of their work.

## How can you communicate with humans without feedback from humans?

Stephen King has characters, stories, and feelings in his mind, and his novels are a his medium for transmitting those ideas to other humans. Writing is an imperfect medium, so the best way for any writer to learn whether their work is having the intended effect is to have real people read the book and provide feedback.

No matter how good of a writer you are, you can't predict perfectly how other people will interpret your writing. Maybe a part that you expected to be exciting is a real bore. Maybe you had an idea of this character in your head, but people reading your writing ended up with an idea that's not really matching.

The only way to find out how effective you are is to have someone read it and give you feedback.

## What's the point of a code review?

When people say that they don't need code reviews because they trust their teammates, the subtext is that code reviews exist to defend against untrustworthy teammates. Maybe they're useful for teams where the developers are dumb or malicious, but on _our_ team, we don't need reviews.

But code reviews have tremendous benefits, and containing damage from dumb or outright malevolent teammates isn't really high on the list.

So what's the value of code reviews? Why does anyone invest time into them when it's so easy and tempting to skip them?

### Improving code quality

The most important result of code reviews in my experience is improving code quality. Just like Stephen King's editor increases the quality of his novels, there's tremendous value in having another developer read the code and let you know the parts that they struggled to understand and hear their ideas for improving it.

AI coding assistants can't do it well, at least not yet.

### Spreading knowledge across the team

It's the best technique I've seen for spreading knowledge. I think you can do trainings, but nothing beats showing you a technique in exactly the context where it matters in your work.

### Catching bugs

Note that this is benefit number three! And this list is very much in descending order of importance.

This is the third most important result.

It's very rare for me to catch functional mistakes in a code review. I sometimes catch gaps in test coverage, which, in turn, reveal bugs.

Often, I'm not identifying bugs but the risk of a bug in the future. For example, we're adding a value in two different files that have to match. What happens in the future if we update one and forget to update the other? Can we reduce the chances of that happening?

### Identifying style violations

This is the benefit people always complain about, so I'll mention it. People who crticize code reviews complain talk as though this is the only purpose of code reviews, and I see it as the least valuable part of code reviews, but it still has value.

I think style violations get a bad rap.

Most style discussion should be automated with linters and formatters. If you're arguing about tabs vs. spaces or where to put the curly braces, that's a waste of code review resources. But there are still style conventions that automated tools can't catch.

Consistent code is easier to read and maintain. And some style rules aren't just about superficial decisions like tabs vs. spaces, they're about protecting the codebase from anti-patterns.

For example, one rule in Google's C++ style guide is [Avoid complicated template programming](https://google.github.io/styleguide/cppguide.html#Template_metaprogramming). You can't really automate that check because a linter can't decide perfectly what's complicated and what's reasonable, so a human has to do it. But if that weren't in the style guide, people would feel more emboldened to do crazy template metaprogramming that reviewers might _think_ they understand but they actually don't.

## Are code reviews terrible? Or do you have a crappy team?

When I talk to people about code reviews who dislike code reviews, what I consistently find is that they're in one of two scenarios:

- They're on an engineering team that's either immature or toxic
- They have trouble collaborating with other people in general

Rubber duck debugging where just explaining the problem to someone, even a rubber duck, allows you to solve the problem. Same thing with code reviews. Before I send my code to a reviewer, I review it myself and try to put myself in the reviewer's shoes.

## Code reviews should be required and blocking

In cases where people say they still have reviews, but they water them down to speed things up, I still think those are bad ideas.

### Why not make reviews optional?

Skipping reviews accrues debt, both for your codebase and your team.

Skipping reviews might speed up feature velocity in the short term, but how good is quality if you've never gotten feedback on it from anyone else? And how difficult is it going to be to maintain it a year from now when you've left the team?

And withouot reviews, how is your team getting better over time? How are junior developers improving if nobody's giving them feedback on their code? How is _anyone_ improving if nobody is telling them about parts that make no sense?

So with optional reviews, someone who's optimizing their career has no reason to request reviews. It's much easier to get recognition for launching new features than for delivering maintainable code, so a self-interested developer crank out features with crappy code, then collect their promotion and leave the team before it all falls apart.

If code reviews are required, it's harder to game the system. You can't crank out indecipherable code just to get your pet feature launched because you still have to get a teammate to affirm that they understand your change and feel comfortable maintaining it.

### Why not async reviews?

It's the wrong dynamic.

Have you ever had a teammate ask you to relax your standards on a code review because they needed to merge this in urgently, but they'd clean it up later. How'd that work out? In my experience, they never come back to clean it up. Something else happens, and cleaning up this one change never seems like the highest priority again.

It's not representative of the agreement. The developer is asking the team to take responsibility for this change. The team should decide whether to accept it, not chase you around to fix it after the fact.

If you study to become a doctor, you don't get an async medical license. You don't just go out and practice medicine, and then it's the licensing board's job to chase you down and encourage you to consider following more best practices like maybe washing your hands before surgery.

## When should you skip code reviews?

Code reviews defend against silo'ing. If all code goes through review before you merge it, it's harder to end up in a situation where only one person on the team understands part of the codebase. If someone reviewed it and signed off on it, they should be comfortable maintaining it as well.

But maybe you're not worried about the one expert on a component leaving unexpectedly and now nobody else can touch that code. So, skipping code reviews is good for situations where the developers have agreed to work at the same company for the rest of their lives. And also, they're all immortal, so you don't have to worry about health or age taking them away from the team.

Although, seriously, I can think of two situations where code reviews aren't worth it.

Software development is engineering, and there's no one right technique in engineering for every situation. I don't think code review is always the answer.

You fully gain the benefits of code reviews over a 1-3 year time horizon. If you're an early-stage startup, a year from now, you could be bankrupt or developing an entirely different product. In those cases, I get why you'd skip code reviews.

Similarly, if you're a one-person dev team, I'd skip code reviews. I wouldn't bother with code review as a service or getting reviews from external teams. The value just isn't there if your reviewer isn't someone with skin in the game who's thinking about whether they feel comfortable maintaining this code with you.

### Early-stage startup

The first is if you're an ultra fast-paced startup. Early-stage startups are almost always in a race against time. Their options are to either experience hypergrowth or flame out trying. So, for them, it doesn't matter so much if they end up with a bunch of code nobody knows how to maintain. Their goal isn't long-term maintainability. If you got 100M users in two years, maybe it's okay that your code is all nonsense that your developers vomited out on adderall-fueled coding marathons. You've got investors clamoring to throw millions of dollars at you, so maybe you can use some of that money to untangle your code and throw in some automated tests.

### Working solo

The second situation where I recommend skipping code reviews is if you work alone or if you're the team's only developer. I've seen workarounds to this like code review as a service businesses, receiving reviews from someone on another team, or receiving reviews from a non-developer. All of these are kind of shallow imitations of a real code review. In a real code review, a lot of the value is that your reviewer is on your team and has skin in the game. They don't want to accept a 4000-line function because they don't want to be the person debugging it at 3 AM if they're on pager duty during an outage.

---

## Notes

### When to skip code reviews

Dev velocity at any cost. Want to keep building because you might go bust in six months, and you'll worry then whether anyone understands the codebase.

You work by yourself. It's not worth the cost of pulling some other person in or doing one of those code review services. The quality can never be as good as someone who has skin in the game and feels a shared sense of ownership over the codebase.

### You need a reviewer because important communication requires review

Jerry Seinfeld is one of the most talented comedians. When he records a comedy special, he doesn't just write a list of jokes by himself and then tell them for the first time on the special. When Seinfeld records a special, he's told those jokes dozens of times, honing the wording. For every joke you hear in the special, there are probably fifty that he thought would be funny until he tried to tell them on stage and got a poor response from the audience.

Novels and stand up specials are entertainment. The worst thing that happens when t

The payoff to a code review is actually even higher. When your teammates review your code, it makes all of you stronger developers. It's the most effective way I've ever seen for percolating good practices across a team organically. And it prevents disastrous mistakes like security vulnerabilities and

The worst thing that would happen if Stephen King or Jerry Seinfeld skipped reviews is that audiences wouldn't have a good time. If you skip reviews, maybe you accidentally wipe your database or introduce a vulnerability that allows exposes all of your customers' data.

### We just do asynchronous, optional reviews

It would be like doing asynchronous, optional fact checking on a news story or asynchronous, optional identity checks when crossing a country's border. How about asynchronous, optional identity checks when crossing a border. You go on by, and we might verify your identity, and if it turns out that you're a criminal, we'll email you and ask you to leave.

But this attitude makes sense to people who think that code reviews exist to prevent stupid developers from introducing bugs.

If your feedback is that you think the code would be easier to understand if the author broke this 20-method class into four separate classes with more tightly-scoped responsibilities, why would they bother? Their version is already live in production and working fine.

The dynamics are skewed in the wrong way.

### If you hate code reviews, you probably have a crappy team

> Why would I do code reviews? They're just a way for abrasive senior devs to inflict their style choices on junior devs.

No, that's not an indictment of code reviews. That's a problem with your team's culture. The senior dev shouldn't be bullying people in the first place, and style nitpicks should rarely even be part of a code review discussion in the first place.

> They take so long. I have to wait a week just to check in a simple feature?

I agree that they add time and friction. There's certainly a cost.
