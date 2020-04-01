---
title: "A Pandemic Reset Month"
date: 2020-04-02T00:00:00Z
description: TODO - One-line summary
---

## Highlights

* My loved ones and I remain safe and healthy despite COVID-19.
* WanderJest is on hiatus due to the nationwide shutdown.
* I'm working on a product to help investors rebalance their portfolios.

## COVID-19 and me

Obviously, the most relevant thing to happen in the last month has been the global spread of COVID-19. It has been a difficult and rapidly-changing time for all of us, and I hope that everyone can return to normal life as quickly as it's safe to do so.

I'm extremely fortunate to be in a position where I can continue living safely and doing most of what I want in spite of the virus. I always worked from home, so nothing has changed there. My girlfriend works in our second office slash guest bedroom. We're both very grateful to have each other during this.

The biggest change is that I don't get to see my family in person anymore, but we've started arranging video chats to stay connected.

My girlfriend and I are self-isolating strictly, both for our own safety and the safety of those around us. I'm grateful that I moved from NYC to a small town, as it's easy for me to hang out in my yard, visit my bee hives, or go for walks without risking anyone's health. I'm an introvert nerd, so staying home and doing everything on the computer isn't that hard for me.

I have been feeling more anxious. Last month, I was [backsliding into social media addiction](/retrospectives/2020/03/#managing-stress) because Facebook and Instagram were integral parts of my business. I recognized what I had to do to stop obsessively checking social media, and I did well for about a week, then COVID-19 happened, and I began checking everything all the time, desperate for updates. I'm still doing a pretty poor job of managing that, but I'm hoping that April will be a reset and get me back to [my good social media habits](/eliminate-distractions/).

## My failed scavenger hunt

In my last retrospective, I had [invested $600 into publicity for a comedy scavenger hunt](/retrospectives/2020/03/#100-in-revenue-but-at-what-cost), and I was worried it would flop. It did indeed flop, and not even due to COVID-19.

The first week of March, people were still attending local comedy shows as normal. I'd go to these shows and hand out promotional cards about the scavenger hunt and explain to people that if they took a picture during the show and tagged it @WanderJest on social media, they'd enter a grand prize drawing for $200. People generally seemed receptive. I got a lot of, "$200? Wow! Cool."

And then they just wouldn't take any photos.

Comedians didn't seem excited about it either, even the ones who had paid to sponsor the contest. When I was designing the contest, I felt so clever for including a $50 prize for "most photographed performer." I thought it would make performers feel invested in the contest, too, and inspire them to mention it when they hosted comedy shows. But nobody did.

The contest was supposed to last If I had the entire month, I would have probed more to figure out why people didn't want to participate. My best guess is that local comedy is cool, and PR contests are not cool. Perhaps people didn't want to be seen as desperate for $200 especially when nobody else was participating.

## COVID-19 and WanderJest

Even before the start of the month, news about COVID-19 was getting worse. But as we all know now, it quickly got much worse. On March 10th, the governor of Massachusetts declared a state of emergency and prohibited gatherings of over 50 people. Most local comedy shows in the area fit within that, but I no longer felt comfortable attending, and I didn't want to incentivize others to attend. I publicly canceled the contest and refunded all of the sponsors. For all the money I invested in publicity, I had only one entrant, the wife of one of the sponsors who had posted a photo the night before. Technically, the grand prize was $200, but that felt like a bit much for one photo in a contest that had to end early, so I offered her $100 and she felt like that was fair.

I was still in a difficult position because people weren't canceling their shows. I wanted to just shutter WanderJest and say, "Hey, stop attending shows! Comedy is great but we're in emergency mode, and this is not an essential service." But these performers had taken a chance on me and sponsored the scavenger hunt even though I had failed to build excitement for the contest. I felt guilty turning around a week later and withdrawing my support of their shows.

A week later, people were starting to cancel shows and it was clear that this was getting even more serious. I replaced the WanderJest show listings page with a notice saying that the site was going on a temporary hiatus until the COVID-19 crisis was over.

## Takeaways from WanderJest

If I were to do it over with the same information, I would have done the same thing. If I wanted to protect myself from failure, I could have waited to officially launch the contest until I had enough signups, but at the time, I think aggressively pursuing the contest was the right move. Requiring signups would have saved money but delayed me learning about the contest.

My takeaway was that WanderJest wasn't working in its original form and needed a drastic change

* Doing the same thing, but scaling it to a bigger city like New York or Chicago, where there's a bigger fanbase of die-hard comedy fans.
* Switching focus from performers to venues and offering more services to them.
* Switching focus from local performers to traveling comedians who rely on comedy for their income.

## Creating an investment rebalancer

Without WanderJest, I needed a new project. Something that occurred to me a few weeks before was that I rebalance my portfolio regularly, and it's a pretty tedious process.

Because of the recent market volatility, interest in portfolio rebalancing is spiking.

TODO: Show optimalrebalancer

There are services that offer portfolio rebalancing tools, but they're part of bulkier offerings that include comprehensive investment management services. I'm hoping that there's a niche of people who want to maintain more control than they get with a robo-investing service like Betterment but who also value their time enough that they don't want to fiddle with a clunky spreadsheet for an hour every time they want to rebalance.

## How do you balance percentages?

It's been interesting because it's the most computer science-y project I've ever worked on. For most things I work on, I feel like I'm mostly gluing services together and deciding how to organize and present data. The portfolio rebalancer requires me to spend a lot more time thinking about abstract algorithms

## Interesting discoveries

### Writing slide decks in Markdown with hugo-reveal

I was scheduled to speak at NERD Summit in March. Fortunately, they decided pretty early on to go virtual and hold all presentations over Zoom.

I generally write my presentations using Google Slides, but I've been seeing tools pop up that offer Markdown-based

It is nice having everything in source control. It also allows me to add this template that auto-generates [an index for all of my talks](https://decks.mtlynch.io), which is cool. And the source is all [public](https://github.com/mtlynch/slide-decks).

One of the most conspicuously absent features is lack of support for making element on a slide appear one by one. The theme technically supports it, but it doesn't work for things like bulleted lists, and even when it does work, it makes the layout a little bit wonky. As a workaround, I made slides that were much shorter, so instead of revealing the next bullet point, I'd advance to the next slide. Maybe this is better because it potentially makes for a more lively presentation.

The other big missing piece is drag and drop layouts. In Google Slides, having an arrow overlay appear over a picture is trivial, but if I wanted to do it in reveal-hugo, I think it would have involved gross CSS and absolute positioning, which I didn't want to spend time on.

### MailChimp alternatives

I've been on MailChimp for the past three years. It offers tons of features, and I only need ~2% of them, but I've always fit into the free tier, so it's been fine.Recently I've started bumping up against their 2,000 contact limit, so I've had to frequently cull my mailing list of email addresses that look like bot signups (I apologize to any legitimate subscribers who have an @discountsunglasses4u.us email address).

But once you break out of MailChimp's free tier, they get very expensive very quickly. Most providers charge by the number of contact under the assumption that you're emailing each contact 5-6x per month. I email my contacts only once or twice per month, so I want something that's priced a little bit more toward infrequent senders.

I also grew envious of Victor Zhou's mailing list implementation, where he allows readers to subscribe to particular topics.

I began exploring MailChimp alternatives looking for a service that's a better match for my simple needs.

| Provider   | Price for 2,501 subscribers | My notes |
|------------|-----------------------------|----------|
| [Email Octopus Connect](https://emailoctopus.com/pricing-connect) | $19/month            | My favorite user experience of all the services I've tested, but they don't support list segmentation, so I wouldn't be able to do subscribe by topic. But their API is pretty easy to use, they have a simple feature set that *almost* perfectly matches my need, and when I emailed support with questions, I got prompt answers directly from the CEO. I'm hoping they implement list segmentation so I can switch to them before I hit the hard limit of MailChimp's free tier. |
| [BigMailer](https://www.bigmailer.io) | $3/month                        | I kept *wanting* to like them, as they seem to offer all of the functionality I want at an aggressive price, but I ran into so many ugly parts of their product that I gave up. [Their API is atrocious](https://docs.bigmailer.io/reference#updatecontact). |
| [Sendinblue](https://www.sendinblue.com) | $25/month                       | One of the few providers that charges based on number of emails sent rather than number of contacts, but their product is pretty messy, so I gave up on them. |
| <a href="https://convertkit.com" rel="nofollow">ConvertKit</a> | $49/month                       | They were the first newsletter service I ever tried, but they bungled enough of their stuff that I vowed never to return. |
| [TinyLetter](https://tinyletter.com) | Free                      | TinyLetter is MailChimp's free, no-frills newsletter service. They don't track click rates, and they don't offer any way of letting users subscribe by topic. |
| [MailChimp Pay As You Go](https://mailchimp.com/help/about-the-pay-as-you-go-plan/) | ~$75 per newsletter send | I never realized MailChimp had a pay as you go plan where you pay by the email rather than by the contact. Unfortunately, this only makes sense if you send *really* infrequently, like once a quarter or something because each email costs:<br><br>`$0.03 * subscriber count` |
| [Sendy](https://sendy.co/)    | $59 (one-time fee)          | I've heard good things, but it requires me to manage my own LAMP server, and I don't want to do that. |
| [Mailtrain](https://mailtrain.org/) | $0 (open source)           | I played around with the Docker image and it seems alright, but I don't want to have to maintain my own LAMP server or Kubernetes cluster just to send emails. |
| [listmonk](https://listmonk.app/) | $0 (open source)            | Ditto, but even worse because it's still in alpha and is not recommended for real-world usage. |

I have a lot more to say about the process of evaluating newsletter services, and I'm debating whether it's worth writing a whole blog post about it.

## Legacy project stats

### [WanderJest](https://wanderjest.com)


### [Is It Keto](https://isitketo.org)

### [Zestful](https://zestfuldata.com)

## Wrap up

### What got done?

*

### Lessons learned

* If I print promotional cards, the cards should 
  * The cards I printed said, "Win fabulous cash prizes" but I think it would have been better to say something more specific like, "Every photo enters you into a drawing to win the $200 cash prize."

### Goals for next month

* Decide whether to pursue the portfolio rebalancer or switch projects.