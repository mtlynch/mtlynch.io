---
title: 'What I've Been Doing Since Quitting'
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
sidebar:
  nav: main
---

I quit my job on Feb. 1st, so I've now been free for just over three months.

Here's what I've been working on.

## Blogging about quitting

I'd been writing the post in my head for about nine months, then I spent two months writing it for real. It was by far the biggest response I've ever had for an article. People whose books I've read or whose blogs I follow were sharing my article.

## Commenting about blogging about quitting

I had articles occasionally that did well on reddit or Hacker News, but usually just of them. The quitting post became popular in a lot of places at once.

People outside of tech told me that what I wrote about wasn't just a Google thing or a tech thing, but a general big company thing.

I spent the first three days doing nothing but responding to comments, emails, and private messages. I realized that I could probably continue doing that for two weeks and still not be done.

I love getting emails and comments about what I write, so I wanted to give everyone a thoughtful response. I also felt guilty about not responding because they had, after all, taken the time to write me.

One piece of advice I found very helpful was from Stephanie Hurlburt, who . She reached out to me on Twitter after the article, and I asked her how she manages replying to

>I think I'd say first consider that it is 100% okay to take a month or more to respond to someone, and expect a response back. It is even okay to take a year to respond to someone, but maybe don't expect a response back then (they've probably moved on to other things). So in other words, you don't need to tackle every message as it comes in, you can have a day a month where you just power through them.

It's worth noting that she *says* this, but she came up with this very thoughtful, three-paragraph note to me a few minutes after I asked her the question.

## Blogging about Sia

The area I've spent the most time is Sia. I started a blog to talk about my experiemnts with Sia. When I started it, I was still exploring how I could make money with Sia. Maybe I build a service on top of Sia. Maybe I could make money by just doing experiments and writing about them.

The first step was to write a load test for Sia. Nobody had ever done one before, but I needed to see concrete numbers before I built any sort of business on Sia. It seemed simple enough. I wrote upa  test plan and figured it would take about twoo weeks from start to finish.

An investor heard about it and offered to pay me to run these tests. Wow, lucky deal! Someone wants to pay me for somehting I was going to do anyway for free.

Maybe they don't really know what developers make, so they were going to offer me $500/week. Maybe they have millions of dollars invested in this coind and wouldn't flinch at $20k/week.

I figured I'd just do it for free and if he valued quality software, they'd see I wasn't just some random guy slapping together some awful junk code, but was producing code that was documented, tested, and well-factored.

Several people reached out to know if I would be interested in consulting work. A Sia investor heard about my testing plans and offered to pay me for it.

At first, that seemed like a great deal. But I started playing out the scenario and realizing it may not be so great. If I agreed to do it for money, I'm no longer doing it the way I want, but the way they're willing to sign off on. There are obviously perverse incentives collaborating on research with someone who stands to gain or lose a great deal of money depending on the outcome of the research.

## Stressing about deadlines

I was more stressed about deadlines than when I actually had deadlines. I realized that I committed to too many things. I had this idea before I quit that once I didn't have day job, I'd have unlimited time.

"Oh no! I have to finish that blog post while it still feels fresh and relevant!"
"On no! I have to finish slides before my talk!"

## Figuring out what I want

My ultimate goal is a business that:

* Earns me an income that lets me maintain my current lifestyle and eventually lets me start a family
* I either love working on it and/or I can keep working to minimize the amount of time I spend actively working on it
* It's mine

I thought about whether I'd prefer to end the year with $80k in consulting earnings or $100/month from a business I built. I'd prefer the $100/month. I like thinking about changes I can make to increase retention or changes to pricing to affect profit.

## Having adventures

* Gave my first conference talk
* Made my first podcast appearance
* Played a computer game from beginning to end for the first time in 15 years
* Made an April Fool's Day video that was *really* funny for about four people.
* Published a Docker image that has XX pulls
* Went skiing on a Tuesday
* Discovered a neat login bypass vulnerability and reported it to the vendor (public disclosure hopefully ready in a few weeks)

As I write this, I'm sitting in Central Park writing out my blog post in a notebook. Although full disclosure, it was mostly just to say that I did it and I'm now actually finding it too distracting by everything in the park.

The best part of quitting has been how much control I have over my time. If I decide to stop working for a day, I don't have to worry about missing an important meeting or holding up my teammates' work. Conversely, if I work in the evening or the weekend, I don't have to wait until business hours to get an answer or code review from a teammate (I didn't email outside business hours.

As a general rule, I never emailed teammates outside working hours because I didn't want to contribute to a culture that expects people to always be available. I sort of work all the time now, but it's because I'm loving what I work on.

## Struggling to recall office work

The first few days after I quit, I felt like, "Woohoo! I'm free!" But now it strangely just feels like the way my life has always been. 

I know I like this lifestyle way more, and I'd like to do it forever. I'm determined to figure out a way to make this sustainable.

## Narrowing my focus

I have really passionate fans of Space Duck, but the problem is that there are like 30 of them total. It's the obvious cut. it has XX% of the newsletter subscribers, gets XX% of the visitors.

But it's so fun... It's the subject I'm top 10 most knowledgeable in the world about. There are only like 30 people who *want* to beknowledgeable in it, but still.

I keep thinking, "One more experiment..."

## What's next?

To make KetoHub searchable, I need a way to parse ingredients. KetoHub For example, if you were interested in recipes that used tabasco sauce and you started typing, `tab` and we showed you every recipe that includes "**tab**lespoon" somewhere in the recipe, that's a bad result. I currently try to prevent this with a [heinous bundle of regexes](http://regex.info/blog/2006-09-15/247), but I still don't quite get it right. If you search KetoHub today, the search yields a lot of false positives where I parsed the ingredient incorrectly.

There are hosted APIs that offer this, but I tried them and they weren't very accurate and they have very oppressive that force you to display the API provider's logo in your app and they forbid you from archiving results, so a site like KetoHub would have to re-parse the exact same data every day.

A few months ago, someone showed me a *New York Times* [article](https://open.blogs.nytimes.com/2015/04/09/extracting-structured-data-from-recipes-using-conditional-random-fields/) about how they parsed ingredients from their back catalogue of recipes. I started playing with that, and it seemed like a better solution, but it's still not quite accurate. I wrote a post a few months ago about struggling to work with a freelancer

I was reminded of a blog post I liked by Jason Fried called, ["Sell Your By-products."](https://signalvnoise.com/posts/1620-sell-your-by-products):

I'm going to make an ingredient parsing API.
