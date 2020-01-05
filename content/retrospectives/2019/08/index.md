---
title: What Got Done - Month 3
description: Ending the What Got Done experiment.
images:
- /retrospectives/2019/08/whatgotdone-new-users-2019-07.jpg
date: '2019-08-02'
---

## Highlights

* I'm shelving [What Got Done](https://whatgotdone.com), as customers seem uninterested in the idea.
* [Zestful](https://zestfuldata.com) has become my greatest challenge in not sweating the small stuff.
* [Is It Keto](https://isitketo.org) continues growing in the background, with a 22% increase in revenue and a 35% rise in traffic.

## Goal Grades

### Conduct five calls with new customers

* **Result**: Conducted nine calls and meetings (five for What Got Done, three for Zestful, one for a project idea)
* **Grade**: A+

I got almost twice as many interviews as I thought I would for and improved my skills at customer conversations.

### Implement two commonly-requested Zestful features

* **Result**: Added USDA matching and handling for "either/or" ingredients
* **Grade**: B

I successfully added a feature to Zestful that allows it to match user-supplied ingredients to entries in the [USDA's Food Database](https://fdc.nal.usda.gov/index.html), but coverage isn't as high as I hoped (I set out for 80% and achieved 73%).

USDA matching took longer than I expected, so I only had time to implement one other minor improvement, which is to handle ingredient strings with either/or options. Given an ingredient like "2 cups chicken stock or low-sodium broth," Zestful will pick a single ingredient, whereas its previous behavior was to return a nonsensical mashup like "chicken stock low-sodium."

### Add two engagement-encouraging features to What Got Done

* **Result**: Added a reactions feature and a preview panel for update drafts
* **Grade**: B

What Got Done users can now add [reactions](https://imgur.com/sN626Tm) to posts (e.g., thumbs up, celebration), but it had no apparent effect on engagement. Only two or three users have tried the feature.

As with Zestful, I was short on time and couldn't implement the other feature I wanted (reminder emails), so I added a small, easy feature: [live markdown render previews](https://imgur.com/jRuRpjJ).

## Inactive projects

### [Is It Keto](https://isitketo.org)

Now that Is It Keto is on the back burner, I'm not going to dive as deeply into its metrics, but here's a summary of the most interesting ones:

| Metric                    | June 2019   | July 2019   | Change                                        |
| ------------------------- | ----------- | ----------- | --------------------------------------------- |
| Unique Visitors           | 14,419      | 19,526      | <font color="green">+5,107 (+35%)</font>      |
| Total Pageviews           | 39,405      | 53,467      | <font color="green">+14,062 (+36%)</font>     |
| Domain Authority (Moz)    | 6           | 6           | 0                                             |
| Ranking Keywords (Moz)    | 862         | 1,442       | <font color="green">+580 (+67%)</font>        |
| AdSense Earnings          | N/A         | $71.49      | N/A                                           |
| Amazon Affiliate Earnings | $138.76     | $153.98     | <font color="green">+$15.22 (+11%)</font>     |
| **Total Earnings**        | **$138.76** | **$225.47** | **<font color="green">+$86.71 (+62%)</font>** |

It feels strange to keep ignoring Is It Keto, given that it's grown at least 30-50% in traffic and revenue every month this year. I'm torn between my urge to focus more on my most profitable project and my desire to stop splitting my focus among many ideas.

## Why use What Got Done when we have Slack?

In July, I conducted five customer interviews for What Got Done:

* Three were interviews with ex-Google founders who I found through cold outreach.
* One was an inbound inquiry from someone who read [my blog post about the joy of Snippets](/status-updates-to-nobody/).
* One was a tech startup owner near where I live.

Four other founders responded to my emails and politely declined my meeting requests.

Except for the person who reached out to me, the consistent feedback I heard was that everyone is currently sharing team status updates through Slack and standup meetings. Nobody raved about their solution, but everyone felt satisfied enough that they weren't interested in exploring alternatives.

One other path I thought might make What Got Done viable was organic growth. There was a steady stream of [new user signups at the end of June](/retrospectives/2019/07/#a-jumpstart-for-what-got-done). If people continued using the free plan, maybe What Got Done would gain momentum, and people would push for their employers to adopt a paid plan. Unfortunately, organic growth tapered off in early July:

<figure class="half">
  {{< img src="whatgotdone-new-users-2019-07.jpg" alt="Screenshot of Is It Keto after adding AdSense ads" maxWidth="600px" hasBorder="True" >}}
  {{< img src="whatgotdone-active-users-2019-07.jpg" alt="Screenshot of Is It Keto after adding AdSense ads" maxWidth="600px" hasBorder="True" >}}
  <figcaption>Daily signups and user actives for What Got Done - July 2019</figcaption>
</figure>

I'm going to shelve What Got Done as a business idea and keep it as a personal tool. My primary motivation in building it was [to teach myself Vue.js](/retrospectives/2019/05/#the-what-got-done-app), and I was successful in that regard. It wasn't my strongest business idea, but I figured I'd try selling it if I was going to build the app either way. It turned out to be too weak as a business product, so I'm going to focus on other ideas that have greater potential.

## Zestful and resisting the urge to fix everything

This month, I realized that [Zestful](https://zestfuldata.com), my unprofitable ingredient parsing service, is the perfect project to tempt my perfectionist tendencies. It involves a web app, a RESTful web service, a training application, and a machine learning pipeline, so the whole thing has so many small, imperfect parts that it's a constant challenge to resist fixing lots of little things. Unfortunately, July was a month where I succumbed to this temptation more often than not.

For example, I realized that Zestful was incorrectly parsing the ingredient "ground cinnamon." It considered "cinnamon" the product and "ground" to be a preparation step for the ingredient. Few people grind their own cinnamon sticks, so the product should be "ground cinnamon." I investigated the cause and discovered that my training dataset featured many examples of "ground cinnamon" that had incorrect labels, so the model got confused.

It seemed like a quick fix, but I probably spent an hour hunting down all the bad "ground cinnamon" examples. I finally finished, proud to have eliminated an error case, but I didn't really improve anything meaningful. Only 0.3% of Zestful's requests include "ground cinnamon." What's more, the previous behavior of returning "cinnamon" was adequate because everyone assumes "cinnamon" means "ground cinnamon" anyway.

{{< img src="ground-cinnamon.jpg" alt="Screenshot of parsing ground cinnamon on Zestful" caption="Boy, did it take way too long to make this work" maxWidth="796px" hasBorder="True" >}}

Fixing these things is satisfying in the moment because it's fun to make my parser more accurate. But it's too easy to disappear down the rabbit hole, chasing lots of minor error cases, only to wake up days later realizing that overall accuracy has barely changed. The parser will never be 100% accurate, and I could spend an eternity pursuing ever-decreasing gains in accuracy.

My goal going forward is to resist the urge to fix issues on Zestful unless a paying customer asks for it.

## Integrating AdSense into Is It Keto

In June, I experimented with an advertising partner on my nutrition site, [Is It Keto](https://isitketo.org). I ended up hating the result and decided to shut it off after 11 days. The ads were [ugly and screwed up my page for mobile users](/retrospectives/2019/07/#a-brief-experiment-with-display-ads-on-is-it-keto).

Still, it got me thinking about the appeal of banner ads as a monetization strategy. Prior to that experiment, Is It Keto only made money when people clicked on the site's Amazon product links. This was good for pages like [Metamucil](http://isitketo.org/metamucil) because a visitor might reasonably decide to buy [Metamucil fiber capsules](https://amzn.to/2ZqGbW1) after visiting the website. It's not a good strategy for pages like [Lettuce](http://isitketo.org/lettuce) because nobody orders lettuce from Amazon (except for [some unfortunate people who do](/keep-growing-never-profit/#i-didnt-think-through-my-monetization-strategy)).

Relying on Amazon Affiliate links meant that most Is It Keto pages earned nothing unless they convinced the visitor to click through to another article about a more lucrative product. With banner ads, every popular page earned money for the site regardless of whether it encouraged the user to buy anything on Amazon.

So, I signed up for Google AdSense and have had a positive experience so far. The key differences are:

* I control ad placement.
  * The previous ad partner automatically crammed ads into any open space they could find.
  * By choosing placement manually, I prevent the ads from ruining the look and feel of the site.
* I control which ads appear.
  * The review dashboard helps me ensure that users never see ads that are spammy or masquerade as features of my site.
  * e.g., ads that [insert a fake "Print" button](/retrospectives/2019/07/isitketo-ads.png)

{{< img src="adsense-ads.jpg" alt="Screenshot of Is It Keto after adding AdSense ads" caption="Is It Keto with ads from Google AdSense and Amazon Affiliate Program" maxWidth="600px" hasBorder="True" >}}

So far, I'm earning $2.29 per 1,000 pageviews. My previous ad network measured in terms of unique visitors, so in those terms, I'm earning about ~$5 per 1,000 sessions. It's slightly less than the ~$8 I made from the previous ad partner, but I'm happy with the current tradeoff of ad intrusiveness vs. revenue generation.

## Wrap up

### What got done?

* Conducted nine customer interviews
* Implemented a "reactions" feature for What Got Done
* Added USDA matching to Zestful
* Added support for "either/or" ingredients in Zestful
* Added Google AdSense to Is It Keto

### Lessons learned

* I don't mind banner ads so much when I control how they appear on my site.
* I can get a good reply rate by sending personalized, cold emails to founders who are ex-Google:
  * I emailed 15 founders
  * I received 7 responses (47% response rate)
  * I arranged 3 meetings (20% conversion rate)
* I need to stop tinkering with Zestful unless I can tie the need directly to a paying customer's request.

### Goals for next month

* Publish a new blog post on [mtlynch.io](https://mtlynch.io).
* Publish an MVP for my [email copywriter tool idea](/retrospectives/2019/07/#slowing-down-on-the-email-tool-for-copywriters).
* Prep What Got Done for the backburner.
  * Fix a few small outstanding bugs.
  * Document everything that I'll undoubtedly forget if I return to it in six months.
  * *Maybe* open-source it.