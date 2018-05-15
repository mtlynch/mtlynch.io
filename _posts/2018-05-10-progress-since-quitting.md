---
title: What I've Been Doing Since Quitting
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

For the last nine months of my job, I was mentally writing a blog post that detailed all the reasons I left Google. I started writing it for real about a month before I quit and spent several hours each week writing and rewriting it until I finally published it a month after I quit.

I didn't really know what the response would be. I thought it would be interesting for people who knew me personally to understand why I left what seemed to be a very attractive position at Google. I 

The response was far bigger than I imagined. That week, my blog had the biggest number of readers by a factor of XX. People whose books I've read or whose blogs I follow were sharing my article and reaching out to me. People were telling me they found my article through social media channels I had never even heard of.

## Commenting about blogging about quitting

The day I published it, I spent the entire day just responding to emails and comments. It was great! It was like I 

Then I spent the next day doing the same thing and it was a little less fun.

By the third day, I was just anxious. I realized I could probably spend the next two weeks doing nothing but responding to comments and private messages. I knew I could ignore them if I chose to, but that felt disrespectful to the people who had taken time out to write me.

One piece of advice I found very helpful was from Stephanie Hurlburt, who was one of the people I mentioned above who I followed on Twitter and then she surprised me by reaching out to me directly after the article. I asked her how she manages replying to the many messages she receives, and she gave me this excellent advice:

>I think I'd say first consider that it is 100% okay to take a month or more to respond to someone, and expect a response back. It is even okay to take a year to respond to someone, but maybe don't expect a response back then (they've probably moved on to other things). So in other words, you don't need to tackle every message as it comes in, you can have a day a month where you just power through them.

It sounds simple, but this was very freeing and relieved my anxiety.

Sidenote: Stephanie *says*  it's okay to delay responses for a month, but she came up with a very thoughtful, three-paragraph note to me a few minutes after I asked her my question about managing correspondence. It's very possible that she's tricking me so that she can maintain her position as the most helpful person on Twitter.

## Experimenting with Sia

For the past two years, I've contributed to and written frequently (TODO: link) about a decentralized storage project called Sia. It was an obvious candidate for my focus after I quit. I thought that I could build an online service that capitalizes on Sia's lower costs. Or maybe I could just earn money by doing experiments with distributed storage and blogging about it. Or maybe I could do both and my blog posts would attract customers for whatever business I decided to build.

It didn't really work out. My first major project was to do a rigorous test of Sia's capacity and costs. The project maintainers had claimed for years that the network could support storage at $2 per TB per month (this is roughly XX% of what Amazon charges), but nobody had ever demonstrated this in practice.

If I was going to build a business on top of Sia, I needed to know how much it cost in practice. I also needed to know how much it could store. People knew that there was a limit to how much data you could upload to Sia before the software falls over, but they didn't know if that was 1 TB or 50 TB.

I decided to write a load test for Sia. It would attempt to maximize Sia's storage and track the total cost of doing this.

The result of the test was that Sia was [not as cheap as everyone thought](https://blog.spaceduck.io/load-test-wrapup/#storage-isnt-that-cheap). It was cheaper than Amazon or Google's cloud storage offerings, but also much buggier and difficult to use. There are low-cost storage providers like Backblaze B2 and Wasabi whose prices are on par or even cheaper than Sia, but with a lot less complexity, so I couldn't find a situation where building a business on Sia would give me an advantage over someone who built a business on top of a traditional cloud storage provider.

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

As I write this, I'm sitting in Central Park writing out my blog post in a notebook. Although if I'm being honest, a big factor in why I'm here was so that I could write that previous sentence. Now that I'm here, I'm too distracted

Okay, now I'm comfortably back in my darkened, cramped apartment. Much easier to write now!

The best part of quitting has been how much control I have over my time. If I decide to stop working for a day, I don't have to worry about missing an important meeting or holding up my teammates' work. Conversely, if I work in the evening or the weekend, I don't have to wait until business hours to get an answer or code review from a teammate (I didn't email outside business hours.

As a general rule, I never emailed teammates outside working hours because I didn't want to contribute to a culture that expects people to always be available. I sort of work all the time now, but it's because I'm loving what I work on.

## Struggling to recall office work

The first few days after I quit, I felt like, "Woohoo! I'm free!" But now it strangely just feels like the way my life has always been. 

I know I like this lifestyle way more, and I'd like to do it forever. I'm determined to figure out a way to make this sustainable.

## Narrowing my focus

I have really passionate fans of Space Duck, but the problem is that there are like 30 of them total. It's the obvious cut. it has XX% of the newsletter subscribers, gets XX% of the visitors.

But it's so fun... It's the subject I'm top 10 most knowledgeable in the world about. There are only like 30 people who *want* to beknowledgeable in it, but still.

I keep thinking, "One more experiment..."

## Parsing ingredients

## What's next?

To make KetoHub searchable, I need a way to parse ingredients. KetoHub For example, if you were interested in recipes that used tabasco sauce and you started typing, `tab` and we showed you every recipe that includes "**tab**lespoon" somewhere in the recipe, that's a bad result. I currently try to prevent this with a [heinous bundle of regexes](http://regex.info/blog/2006-09-15/247), but I still don't quite get it right. If you search KetoHub today, the search yields a lot of false positives where I parsed the ingredient incorrectly.

There are hosted APIs that offer this, but I tried them and they weren't very accurate and they have very oppressive that force you to display the API provider's logo in your app and they forbid you from archiving results, so a site like KetoHub would have to re-parse the exact same data every day.

A few months ago, someone showed me a *New York Times* [article](https://open.blogs.nytimes.com/2015/04/09/extracting-structured-data-from-recipes-using-conditional-random-fields/) about how they parsed ingredients from their back catalogue of recipes. I started playing with that, and it seemed like a better solution, but it's still not quite accurate. I wrote a post a few months ago about struggling to work with a freelancer

I was reminded of a blog post I liked by Jason Fried called, ["Sell Your By-products."](https://signalvnoise.com/posts/1620-sell-your-by-products):

I'm going to make an ingredient parsing API.