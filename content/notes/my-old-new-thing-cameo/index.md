---
title: "My Cameo on Old New Thing"
date: 2025-09-11
---

I remembered today that I was once featured, anonymously, in a post on Raymond Chen's classic Windows blog, _The Old New Thing_:

- ["If you wished a language supported the preprocessor, you know, you can fix that"](https://devblogs.microsoft.com/oldnewthing/20090724-00/?p=17373) by Raymond Chen, on _The Old New Thing_

Raymond described me in the post as "a customer," but I was actually a fellow Microsoft employee at the time. I worked in the same (enormous) Windows subdivision of Microsoft as Raymond.

## My question

At the time, I was doing C++ development on Windows 8. I worked on the BitLocker team, which had strangely complex set of knobs through Group Policy. So, I was working on making error messages clearer when an admin picked an invalid Group Policy value or set conflicting Group Policy settings.

And part of that was putting values in the error messages.

trying to improve error messages

I asked the question on an internal mailing list at Microsoft, probably one about C++ development or Windows APIs. Raymond replied to my question on the list and said something like, "There's no law that says you can't use the preprocessor," and I think he elaborated less than what he wrote on his blog.

I regularly read Raymond's blog, and I was excited to see my question pop up a few months later even though he was sort of making fun of me.

## I still wouldn't know to do this

It's funny looking back on this exchange because at the time I felt like, "Wow, I'm dumb for not knowing I could use the preprocessor like this." But 16 years later, Raymond's solution to run the C preprocessor on a non-C/C++ file still strikes me as unexpected/hacky.

If it weren't for this exchange, I'd never even know you could tell Visual C++ (or any C compiler for that matter) to run only the preprocessor step.

## This wouldn't happen at Google

It's also weird looking back on this and seeing that this was a problem I was trying to solve myself. But, why? This doesn't at all feel like an unusu

## How I've grown

I'd like to say that the Michael of today wouldn't be so surprised becuase I'd be more familiar with my tools and my build system, but I'm actually still not.
