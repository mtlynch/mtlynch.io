---
title: What Got Done - Month 3
excerpt: Ending the What Got Done experiment.
header:
  og_image: /images/retrospectives/2019/08/whatgotdone-new-users-2019-07.jpg
---

## One-Line Summary

Ending the What Got Done experiment.

## Highlights

* I'm shelving [What Got Done](https://whatgotdone.com), as customers seem uninterested in the idea.
* [Zestful](https://zestfuldata.com) has become my greatest challenge in not sweating the small stuff.
* [Is It Keto](https://isitketo.org) continues growing in the background, with a 22% increase in revenue and a 35% rise in traffic.

## Goal Grades

### Conduct five calls with new customers

* **Result**: Conducted nine calls and meetings (five for What Got Done, three for Zestful, one for a project idea)
* **Grade**: A+

I got almost twice as many interviews as I thought I would and gained valuable insights from the discussions.

### Implement two commonly-requested Zestful features

* **Result**: Added USDA matching and handling for "either/or" ingredients
* **Grade**: B

I successfully added a feature to Zestful that allows it to match user-supplied ingredients to entries in the [USDA's Food Database](https://fdc.nal.usda.gov/index.html), but coverage isn't as high as I hoped (I set out for 80% and achieved 73%).

USDA matching took longer than I expected, so I only had time to implement a minor improvement, which is to handle ingredient strings with either/or options. Given an ingredient like "2 cups chicken stock or low-sodium broth," Zestful will pick a single ingredient, whereas its previous behavior was to return a nonsensical mashup like "chicken stock low-sodium."

### Add two engagement-encouraging features to What Got Done

* **Result**: Added a reactions feature and a preview panel for update drafts
* **Grade**: B

What Got Done users can now add [reactions](https://imgur.com/sN626Tm) to posts (e.g., thumbs up, celebration), but it had no apparent effect on engagement. Only two or three users have tried the feature.

Like with Zestful, I was short on time and couldn't implement the other feature I wanted (reminder emails), so I added a small, easy feature: [live markdown render previews](https://imgur.com/jRuRpjJ).

## Inactive projects

### Is It Keto

Now that Is It Keto is on the back burner, I'm not going to dive as deeply into its metrics, but here's a summary of the most interesting ones:

| Metric                 | June 2019 | July 2019 | Change |
|------------------------|-----------|-----------|--------|
| Total Earnings         | $184.25   | $225.47   | <font color="green">+$41.22 (+22%)</font> |
| Unique Visitors        | 14,419    | 19,526    | <font color="green">+5,107 (+35%)</font> |
| Total Pageviews        | 39,405    | 53,467    | <font color="green">+14,062 (+36%)</font> |
| Domain Authority (Moz) | 6         | 6         | 0 |
| Ranking Keywords (Moz) | 862       | 1,442     | <font color="green">+580 (+67%)</font> |

It feels strange to keep ignoring Is It Keto, given that it's grown at least 30-50% in traffic and revenue every month this year. I'm torn between resuming focus on my most profitable project and my desire to stop splitting my focus among too many separate projects.

## Why use What Got Done when we have Slack?

In July, I conducted five customer interviews for What Got Done:

* Three were interviews with ex-Google founders who I found through cold outreach.
* One was an inbound inquiry from someone who read [my blog post about the joy of Snippets](/status-updates-to-nobody/).
* One was a tech startup owner near where I live.

Four other founders responded to my emails and politely declined meeting.

With the exception of the person who reached out to me, the consistent feedback I heard was that everyone is currently sharing team statups updates through Slack and standup meetings. Nobody raved about their solution, but everyone agreed it solved the problem adequately enough that it wasn't worth exploring alternatives.

One other path that seemed viable in June was organic growth. If more people began using the free version, maybe it would gain momentum and people would push for their employers to adopt it. Unfortunately, organic growth tapered off in July:

<figure class="half">
  {% include image.html file="whatgotdone-new-users-2019-07.jpg" alt="Screenshot of Is It Keto after adding AdSense ads" max_width="600px" class="img-border" media_rendition="half" img_link="true" %}
  {% include image.html file="whatgotdone-active-users-2019-07.jpg" alt="Screenshot of Is It Keto after adding AdSense ads" max_width="600px" class="img-border" media_rendition="half" img_link="true" %}
  <figcaption>Daily signups and user actives for What Got Done - July 2019</figcaption>
</figure>

I'm going to shelve What Got Done as a business idea and keep it as a personal tool. My primary motivation in building it was [to teach myself Vue.js](/retrospectives/2019/05/#the-what-got-done-app). It wasn't my strongest business idea, but I figured I'd try selling it if I was going to build the app either way. It turned out to not be too weak as a business product, so I'm going to focus on other ideas that I think have greater potential.

## Zestful and resisting the urge to fix everything

This month, I realized that [Zestful](https://zestfuldata.com), my unprofitable ingredient parsing service, is the perfect project to tempt my perfectionist tendencies. It's built on a machine learning system, so the whole thing has so many small, imperfect parts that it's a constant challenge to resist fixing lots of little things. Unfortunately, July was a month where I succumbed to this temptation more often than not.

For example, I realized that Zestful was incorrectly parsing the ingredient "ground cinnamon." It considered "cinnamon" the product and "ground" to be a preparation step for the ingredient. Few people grind their own cinnamon sticks, so the product should just be "ground cinnamon." I investigated the cause and discovered that many of the "ground cinnamon" examples in my training dataset incorrectly marked "ground" as a preparation step so the model got confused.

It seemed like a quick fix, but I probably spent 45 minutes hunting down all the bad "ground cinnamon" examples. I finally finished, proud to have eliminated an error case, but I didn't really make improve anything meaningful. Only 0.3% of Zestful's requests include "ground cinnamon." What's more, the previous behavior of returning "cinnamon" was fine because everyone assumes "cinnamon" means "ground cinnamon" anyway.

{% include image.html file="ground-cinnamon.jpg" alt="Screenshot of parsing ground cinnamon on Zestful"  max_width="796px" class="img-border" img_link="true" fig_caption="Boy, did it take way too long to make this work" %}

Fixing these things is satisfying in the moment because it's fun to make my parser more accurate. The problem is that it's so easy to go down the rabbit hole chasing lots of minor error cases and wake up days later only to realize that overall accuracy has barely changed. The parser will never be 100% accurate, and I could spend an eternity pursuing ever decreasing gains in accuracy.

My goal going forward is to resist the urge to fix issues on Zestful unless a paying customer asks for it.

## Integrating AdSense into Is It Keto

In June, I experimented with an advertising partner on my nutrition site, [Is It Keto](https://isitketo.org). I ended up hating the result and decided to shut it off after 11 days. The ads were [ugly and screwed up my page for mobile users](/retrospectives/2019/07/#a-brief-experiment-with-display-ads-on-is-it-keto).

Still, it got me thinking about the appeal of banner ads to monetize Is It Keto. Prior to that experiment, Is It Keto only made money when people clicked on the site's Amazon product links. This was good for pages like [Metamucil](http://isitketo.org/metamucil) because a visitor might reasonably decide to buy [Metamucil fiber capsules](https://amzn.to/2ZqGbW1). It's not a good strategy for pages like [Lettuce](http://isitketo.org/lettuce) because nobody orders lettuce from Amazon (except for [some people who do](/keep-growing-never-profit/#i-didnt-think-through-my-monetization-strategy)).

Relying on Amazon Affiliate ads meant that most Is It Keto pages earned nothing unless they convinced the visitor to click through to another article about a more lucrative product. With banner ads, every popular page earned money for the site regardless of whether it encouraged the user to buy anything on Amazon.

So, I signed up for Google AdSense and have had a great experience so far. The key differences are:

* I control placement of the ads
  * The previous ad partner automatically crammed ads into any open space they could find.
  * By choosing placement manually, I prevent the ads from ruining the user experience.
* I can review ads to ensure that my users never see ads that are spammy or masquerade as features of my site.
  * e.g., ads that [insert a fake "Print" button](/images/retrospectives/2019/07/isitketo-ads.png)

{% include image.html file="adsense-ads.jpg" alt="Screenshot of Is It Keto after adding AdSense ads"  max_width="600px" class="img-border" img_link="true" fig_caption="Is It Keto with ads from Google AdSense and Amazon Affiliate Program" %}

So far, I'm earning $2.29 per 1,000 pageviews. My previous ad network measured in terms of unique visitors, so in those terms, I'm earning about ~$5 per 1,000 sessions. It's slightly less than the ~$8 I earned from the previous ad partner, but I'm happy with the current tradeoff of ad intrusiveness vs. revenue generation.

## Wrap Up

### What Got Done?

* Conducted nine customer interviews
* Implemented a "reactions" feature for What Got Done
* Added USDA matching to Zestful
* Added support for "either/or" ingredients in Zestful
* Added Google AdSense to Is It Keto

### Lessons Learned

* I don't mind banner ads so much when I get to choose their placement on my site.
* I can get a good reply rate by sending personalized, cold emails to ex-Google founders:
  * I emailed 15 founders
  * I received 7 responses (47% response rate)
  * I arranged 3 meetings (20% conversion rate)
* I need to stop tinkering with Zestful unless I can tie the need directly to a paying customer's request.

### Goals for May

* Publish a new blog post on [mtlynch.io](https://mtlynch.io).
* Publish an MVP for my [email copywriter tool idea](/retrospectives/2019/07/#slowing-down-on-the-email-tool-for-copywriters).
* Prep What Got Done for the backburner.
  * Fix a few small outstanding bugs.
  * Document everything that I'll undoubtedly forget if I return to it in six months.
  * *Maybe* open-source it.