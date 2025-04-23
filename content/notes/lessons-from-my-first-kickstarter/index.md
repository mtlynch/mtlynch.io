---
title: "Lessons From My First Kickstarter"
date: 2025-04-21
---

## Overall: I'm pleasantly surprised with Kickstarter

## What I liked about Kickstarter

### No upsells, no dark patterns

I've tried a lot of other "creator platforms" and it quickly becomes obvious that the platform is trying to milk creators every step of the way.

### Manage expectations well

I considered selling the pre-orders directly through a platform like Stripe or PayPal. I ended up choosing Kickstarter, and I'm glad I did for a few reasons.

First, Kickstarter does a good job of letting customers and authors share risk. Their [help documentation](https://help.kickstarter.com/hc/en-us/articles/1260805506289-A-project-I-backed-isn-t-able-to-fulfill-what-does-this-mean-for-the-backers):

> The funds that you pledged to a project went directly to the creator to help them with bringing their creative idea to life. If the creator has already used the funds to pay for project costs, they may not be in a position to offer refunds.
>
> Remember, backing a project on Kickstarter is not the same as buying an existing item in a store, and as such **receiving a reward in return for pledging is not guaranteed**.

Normally, an author assumes nearly all the risk of writing a book. It takes months or years to complete a book. Lots of things can come up in that time that prevent the author from completing the book, in which case, they receive no compensation for years of work.

If I tried to sell pre-orders through PayPal and then something happened where the book was late or I couldn't complete it, customers could complain to PayPal and say I didn't hold up my end of the deal, and I'm a fraud, and I should be in the "no compensation for months of work" category.

Kickstarter lets customers take on the risk instead of the author.

With Kickstarter, customers technically are not purchasing the book but rather inside access to the process of writing it. They're buying a 90% chance (or less, depending on their faith in me) that I'll deliver a book by the end of the year. And as a reward for the risk, they get a discounted price, early access to the book, and a voice in the book's direction.

What happens if something happens, and I can't finish the book?

- Do I walk away with zero?
- Do I have to negotiate with everyone about how much they think is fair for me to keep?
- Do I have to deal with a whole mess of headaches trying to give people refunds six months after the fact?

The thing that Kickstarter does well is set expectations around uncertainty.

TODO: You're along for the ride.

### Kickstarter found customers for me

Beyond that, Kickstarter found some customers for me.

### I succeeded even with an amateurish profile

You can spend infinite time making a Kickstarter project. Some projects have intro videos and testimonials that look like they took months to create.

I didn't want to do that.

Mainly because I don't enjoy working on that kind of stuff, but also because I didn't want to do all that stuff before I even knew if anyone wanted this book.

In total, I spent 5-10 hours on my Kickstarter project. I was able to recycle a lot of the material that was already on my website. I made a short intro video because that's what other people seemed to do and it felt like a good way to demonstrate that I'm a real person and this isn't just an AI-generated money grab. The video only took me about 90 minutes. I just wrote a short script, memorized it, and then recorded it about ten times until I had a take I liked.

You can spend infinite time polishing a presentation and making an amazing video. If you're good at that, that's a good edge, but I just wanted to see if anyone was interested in my book, so I didn't want to spend weeks and weeks making a jaw-dropping Kickstarter page only to find out that nobody was interested in the book to begin with.

## What I disliked about Kickstarter

### Anti-fraud measures add onerous constraints

Can't change the price of late pledge.

You can't experiment with pricing because once someone buys it, that's the price. For premium rewards that you expect only a handful of people to buy, err on making them too expensive and bring down the price.

### Late pledges are confusing

Kickstarter has a surprising behavior where you stop being able to edit certain things at surprising times. For example, once a customer purchases a reward tier. And once the fundraising window ends, you can't enable late pledges.

Apparently they were enabled for my project but not per-item. And then you can't flip them on after without talking to support, but it meant losing momentum.

### Payouts UX is confusing and bad

Doesn't show you how much is pending.

When you receive a payment, it tells you to check payouts, but nothing is there. It takes about a day to update.

It's surprising that Kickstarter is so bad at this.

### Spammers will find you

One thing to be aware of if you offer a project on Kickstarter: spammers will immediately swarm you. I got emails from about ten different spammers offering to ["help out" with my presale](/retrospectives/2025/03/#except-for-kickstarter-spammers). Even though my email isn't in the Kickstarter itself, they found my email address by digging through the book website and then finding my contact information on my personal blog.

Annoyingly, a few of the spammers pose as interested customers, so they'll keep asking one vague question per email about the product until they eventually offer to introduce you to their friend who's good at Kickstarter.

I had a big surge in spam for the first week of the campaign, but then no new outreach after that, though the original spammers kept pestering me to respond.

## Suggestions for authors considering Kickstarter to pre-sell their books

### Allocate time for bank verification

I was able to get my Kickstarter up and running quickly, but I'm glad I gave myself lead time for Kickstarter to verify my banking information, as that took a few days and required giving a bunch of documentation to Stripe, Kickstarter's payment provider.

### Don't offer "forever" rewards

Don't offer things that set an expecation that you have to fulfill an obligation forever.

For example, when I said I'd thank backers in a particular reward tier, I said it applies to the first edition. I wanted to avoid running into issues if I want to work with a publisher later. When I offered company sponsorships, I limited the time to six months, and ensured that I'm not agreeing to present a company's logo on the book's website forever.

### Look at similar non-fiction book projects

https://www.kickstarter.com/projects/robwalling/the-saas-playbook-by-rob-walling

https://www.kickstarter.com/projects/tracyosborn/hello-web-app-intro-to-building-web-apps-with-djan

https://www.kickstarter.com/discover/categories/publishing/nonfiction

### Set the delivery date to the slowest item in the reward tier

I find Kickstarter's tier system pretty confusing. There are two components to it: there are reward items and reward tiers. An item is a thing like an ebook or a shoutout on the website. An item can appear in one or more reward tiers.

That makes sense, right?

Here's where it gets confusing: the rewards also have descriptions and delivery dates, but they're on the _tiers_ not the items. So if I have a tier that

One thing I screwed up in creating the rewards was that I didn't include the book itself in the $75 personal sponsor. So a few people purchased the $75 tier and then were surprised to realize it technically doesn't include the book itself. And once someone has purchased a reward, I can't edit it, even to add items. So, my workaround was just to tell people

### Keep track of how customers found you

Kickstarter can analyze UTM parameters, but I never added them to any of my links. It probably would have been helpful to know which readers came from my personal blog vs. the book's website vs. the mailing list. They collect data based on the HTTP referer header, but that's not as reliable as UTM parameters.

### Offering premium rewards

I offered pre-orders of the book for $25 as the standard item in the Kickstarter, but I also offered other options for people who wanted to contribute more:

- $75: Your name and a link on the website, plus a thank you in the first edition of the book.
- $150: Personalized writing feedback on a blog post or draft.
  - I originally priced this at $300 and nobody bought, but four people purchased after I reduced the price to $150.
- $150: Team license to the book for up to 10 people within an organization.
