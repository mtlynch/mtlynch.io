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

I worked as a software engineer for Google from 2014 to 2018. I quit my job (TODO: link) on Feb. 1st, so I've now been free for just over three months.

## What's it like not having a job?

That's the most common question people ask. What's it like?

For the first few days, I felt like, "Woohoo! I'm free!" It was like starting a long-awaited vacation, but one that would potentially last forever.

Now, it just feels normal. Enjoyable, but normal. It seems weird to me that I ever had a full-time job. The closest parallel I can think of is remembering being in high school. "I sat listening to people talk for *six hours a day*? And then I had to do go home and do more work?" I know that it happened, but it seems so foreign to me now.

## My quitting blog post

About nine months before I left Google, I started mentally writing a blog post about all the reasons I was going to quit. It was a nice outlet. Every time something frustrated me, I thought, "That's absurd! I'm definitely writing about that in the blog post."

I spent about two months writing it for real, starting a month before I left and finally publishing it the last day of the month I quit so it would still feel fresh and relevant.

I didn't know what the response would be. I thought people who knew me personally would enjoy reading it to understand why I left what seemed to be a very attractive position at Google. I also thought it might appeal to people who have left Google or other big tech companies for similar reasons.

The response to the post exceeded even my wildest expectations. That week, my blog had the biggest number of readers by a factor of XX. My blog post found its way to people whose books and essays I've read. They were sharing it and saying positive things about the post. My friends were telling me that they found my article through social media channels I had never even heard of.

## Responding to feedback

The day I published it, I spent the entire day just responding to emails and comments. It was great! It was like I was a celebrity responding to fan mail. But better because the responses were thought provoking and forced me to think (TODO: redundant) about my blog post from different perspectives.

The next day, I continued responding to messages, and it was a little less fun.

By the third day, I started to feel overwhelmed. I realized I could spend the next two weeks doing nothing but responding to feedback about my post.

Especially because so many people responding were asking about what I was doing post-Google. "Well, I've been primarily focused on talking about quitting and relishing the dopamine hit of seeing new messages all the time about this post."

TODO: Cartoon. It's like the "More cake, Mr. Coder?" but the waiter is saying, "More messages, Mr. Coder?" The tray contains several envelopes. The coder is on the floor buried under a pile of envelopes and saying, "Yes, please. Keep 'em coming."

I knew I could ignore the messages and comments I was receiving, but people had taken the time to write me. I thought that the least I could do was send them a quick note back. Except I take a really long time to write emails. If I respoond to someone with a simple note like, "Thanks, I'm glad you liked the article!" it probably took me about 15 minutes reading their message over and over again to be sure that was an appropriate response and that I'm not ignoring anything in their message that they'd expect me to address specifically.

## Letting go

One of the people who reached out after the blog post was Stephanie Hurlburt, who runs a graphics startup and is well-known on Twitter for sharing useful advice for startup founders. I followed on Twitter and was delighted and surprised that she sent me a message in response to my article, unpromptedly offering to help me with my plans if I needed it.

I realized that with how prolific Stephanie is, she must constantly be in the state where she's receiving more feedback than she has time to respond. I asked her how she manages replying to the many messages she receives, and she gave me this excellent advice:

>it is 100% okay to take a month or more to respond to someone, and expect a response back. It is even okay to take a year to respond to someone, but maybe don't expect a response back then (they've probably moved on to other things). So in other words, you don't need to tackle every message as it comes in, you can have a day a month where you just power through them.

It sounds simple, but this was very freeing and relieved my anxiety. I had felt this need to get back to everyone in a timely manner. Once she said this, I felt like I had permission to take my time. I resumed the projects I was working on but would add an item to my daily to-do list: "Respond to five emails," or "Respond to 20 twitter DMs."

Sidenote: Stephanie *says*  it's okay to delay responses for a month, but she came up with a very thoughtful, three-paragraph note to me a few minutes after I asked her my question about managing correspondence. It's very possible that she's tricking me so that she can maintain her position as the most helpful person on Twitter.

In her reply, Stephanie also said that it's okay and inevitable to not respond to everyone. You have to be selective about which messages to respond to. She mentioned that there are ways to respond to people other than email, like writing a blog post that addresses common questions you receive privately.

## Experimenting with cryptocurrency

For the past two years, I've contributed to and written frequently (TODO: link) about a decentralized storage project called Sia.

It was an obvious choice for my post-Google focus. One of its main value propositions is that it offers storage and data transfer at much cheaper rates than traditiona cloud storage providers like Amazon. If I could find a business whose main cost is storage or data transfer, . For example, I'd imagine that this is one of the biggest costs of a service like Vimeo, the video streaming platform. If I could offer a video streaming service where I'm paying 1/10th of Vimeo's costs, maybe I could win business from Vimeo.

I also liked writing about Sia. I thought that could either continue blogging about Sia and use it to attract customers to whatever service I was building. Or maybe writing about Sia would be 

TODO: Add space duck logo

My first major project was to do a rigorous test of Sia's capacity and costs. Sia claimed that it could achieve very low costs, but measuring its true costs was surprisingly difficult. Nobody ever had the combination of time, motivation, and knowledge to do it. But as a Sia enthusiast who just quit his job, that person was me.

Unfortunately, the results of the test were disappointing. I concluded that Sia was [not as cheap as everyone thought](https://blog.spaceduck.io/load-test-wrapup/#storage-isnt-that-cheap). Worse, I encountered [so many bugs](https://github.com/NebulousLabs/Sia/issues?utf8=%E2%9C%93&q=is%3Aissue+author%3Amtlynch+) during basic usage. These got so little traction from the dev team that I realized this was not the horse I wanted to hitch my wagon to.

If I was going to build a service that capitalized on Sia's low cost, I had to know just how low that cost really was.

claimed for years that the network could support storage at $2 per TB per month (this is roughly XX% of what Amazon charges), but nobody had ever demonstrated this in practice.

I had an engaged, passionate group of readers, but that group was about 40 people.

 I spent more time on it than I should have. It was obvious to me halfways through my experiment that my business plans wouldn't work, but I wanted to finish what I pledged to finish. And while running the experiment, it was too easy to think, "Oh, I have an idea for a quick 

I could build an online service that capitalizes on Sia's lower costs. Or maybe I could just earn money by doing experiments with distributed storage and blogging about it. Or maybe I could do both and my blog posts would attract customers for whatever business I decided to build.


If I was going to build a business on top of Sia, I needed to know how much it cost in practice. I also needed to know how much it could store. People knew that there was a limit to how much data you could upload to Sia before the software falls over, but they didn't know if that was 1 TB or 50 TB.

I decided to write a load test for Sia. It would attempt to maximize Sia's storage and track the total cost of doing this.

The result of the test was that  It was cheaper than Amazon or Google's cloud storage offerings, but also much buggier and difficult to use. There are low-cost storage providers like Backblaze B2 and Wasabi whose prices are on par or even cheaper than Sia, but with a lot less complexity, so I couldn't find a situation where building a business on Sia would give me an advantage over someone who built a business on top of a traditional cloud storage provider.

## Managing stress

Before I quit, I kept reading stories of people saying how founding even a small business comes with a lot of stress. I thought, "I'm sure that's true, but I'm going to be spending every day in my pajamas, so how stressed will I really be?"

CARTOON: Me realizing I missed a delivery. "Oh no, I didn't buzz up a delivery. Now I have to go downstairs. I'll have to put on pants. I'm so stressed." Single tear.

For the first two months, pretty stressed. And I wasn't even to the point where I had real things to stress about like product releases or sales figures. I was just stressing about goals and deadlines I set for myself that nobody else even cared about. I realized I felt more stressed about my consequenceless, self-imposed deadlines than I ever was about deadlines at my actual job.

"Oh no! I have to finish that blog post while it still feels fresh and relevant!"
"On no! I got accepted to speak at a conference. Now I have to make slides!"
"Oh no! People really liked that quitting blog post. Now I have to follow up with something!"

Part of the problem was that before I quit, I had this vision of freedom where without a job, I'd have unlimited time. So I committed to more projects than I should have, started collaborations with more people than I could practically collaborate with. It took me a few weeks to realize what I'd done and then another six weeks to gracefully complete my obligations, all the while saying "no" to pretty much everyone.

There was a common piece of advice for goal-setting I heard a lot when I was at Microsoft and I really liked: Underpromise and overdeliver.

I'm now feeling more stressed about deadlines, but I get this kind of enthusiasm stress where I'm too excited about what I'm working on to do anything but work on it. I hear all the time, "Don't bury yourself in the code. Half of the job is going out and finding customers." And I will. Soon...

## Having adventures

The best part of quitting has been how much control I have over my time. At 3 o'clock in the afternoon, I can go for a run if I feel like it. Or just take a nap. I know I'm not going to miss a meeting or hold up anyone's work. A couple months ago, I wanted to go skiing, so I just... went skiing. On a Tuesday!

As I write this, I'm sitting in Central Park writing out my blog post in a notebook. Although if I'm being honest, I mostly came here so I could write that last sentence. Now that I'm actually here, I'm realizing it's too distracting because I have the focus of a kitten trying to type up her doctoral dissertation while there's a feather on a string bouncing next to her.

Okay, now I'm comfortably back in my darkened, cramped apartment. Much easier to write now!

I also applied to a bunch of conferences for the first time ever. I adapted my posts about code reviews for a conference talk. I got rejected from all of them, but I was accepted to NERD summit, so I gave my first conference talk. One of the attendees liked the talk and invited me to his podcast, so a few weeks later, I made my first ever appearance on a podcast.

I played a computer game from beginning to end for the first time in 15 years. When I had a job, I'd want to switch off from my job and work on my own projects. I'd play computer games occasionally, but after about 20-30 hours on a single game, I'd start feeling guilty that I wasn't using my home time productively and stop playing. Now that I'm working on my own projects full-time, I decided that a good way to switch off is to play computer games. I played XCOM 2 from beginning to end. It was great!

## Reading the ingredients

I've been reading a lot of ingredients.

That's not a metaphor. I've spent the last few weeks staring at thousands of ingredients from recipes. "2 1/2 lbs ground beef", "2 diced lettuce heads."

Ingredients generally break down into four pieces of information:

TODO: Graphic of \[quantity\] \[units\] \[thing you buy at the store\] \[what you do to prepare it\]

Humans can interpret ingredients easily. When you see, "2 tomatoes, diced," you know to go to the store, buy two tomatoes, then dice them. If you see, "2 tablespoons ground cinnamon," you're probably not going to buy cinnamon sticks and a cinnamon grinder. You'll buy a thing of ground cinnamon.

It's much harder for computers to figure this out. This was a problem I had with KetoHub, my keto recipe aggregator site. When users enter ingredients into KetoHub, what they probably mean to search for is the thing they bought from the grocery store. If you search KetoHub for "Dash" you probably want to see recipes that use [Mrs. Dash seasoning](https://amzn.to/2Ks05bh) and not every recipe ever that happpens to include "a **dash** of cinnamon.".

For the initial version of KetoHub, I just did this with regular expressions, a quick and dirty way of processing text programmatically.

TODO: Quote about regular expressions.

Over time, my regular expressions got more complicated and fragile, so I needed a more robust solution.

[heinous bundle of regexes](http://regex.info/blog/2006-09-15/247)


There are hosted APIs that offer this, but I tried them and they weren't very accurate and they have very oppressive that force you to display the API provider's logo in your app and they forbid you from archiving results, so a site like KetoHub would have to re-parse the exact same data every day.

A few months ago, a commenter on Indie Hackers showed me (TODO: link) a blog post about how *The New York Times* [parsed ingredients](https://open.blogs.nytimes.com/2015/04/09/extracting-structured-data-from-recipes-using-conditional-random-fields/)  from their back catalogue of recipes using machine learning. That sounded neat, but it would be overkill for my little recipe aggregator site.

Then I remembered a blog post I liked by Jason Fried called, ["Sell Your By-products."](https://signalvnoise.com/posts/1620-sell-your-by-products). If this was a problem for KetoHub, maybe it was a problem for other sites and I could sell my API to them. There are APIs that do this already, but they're either pathetically inaccurate or have very oppressive licensing terms.

TODO: Link.