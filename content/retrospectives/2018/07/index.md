---
title: "Zestful: Month 4"
description: Shipping too late
date: "2018-07-02"
---

## Background

Zestful Data provides paid APIs to assist recipe and cooking apps. My first API is a recipe ingredient parser.

Given an ingredient string like `"1 1/2 cups finely chopped red onions"`, the API gives back a JSON dictionary like this:

```json
{
  "quantity": 1.5,
  "unit": "cup",
  "product": "red onions",
  "preparationNotes": "finely chopped"
}
```

## Previous months

I didn't do these reports before, but I should have. Here are the previous months, in brief.

- Month 1 (March 2018)
  - Floated API idea to a potential customer, they seemed interested.
  - Assigned a contractor to get a command-line proof-of-concept working.
- Month 2 (April 2018)
  - Contractor continued working on proof-of-concept (~10 hours per week).
- Month 3 (May 2018)
  - Contractor got command-line proof-of-concept working.
  - I started working on product full-time (still assisted ~10-15 hours per week by the contractor)
  - Added REST API, got it running on Heroku.
  - Created a [basic demo site](https://ingredientparser.com/).
  - Announced Ingredient Parser [on my blog](/since-quitting/#new-project-ingredient-parsing-as-a-service).

## Talking to customers

After I announced the Ingredient Parser on my blog, I got 28 mailing list signups. Only three listed company names or used non-Gmail addresses, so I sent each of those three a personalized email thanking them for signing up and asking to speak with them more about how the API could be useful for them, but none of them responded.

One person sent an email titled "I'd pay for your ingredient parser if it had this" and asked if I could support unit conversion (e.g. gallons -> liters). We had a good chat about what the interface would look like, and I told him I'd work on it and follow up in a few weeks when I had something for him to play with.

Another reader reached out and said he couldn't afford to pay because he wants it just for his hobby app, but he'd give me bug reports in exchange for free access. I agreed, and he found some interesting bugs and gave useful suggestions about improving the API interface.

## Launching too late

On the podcast, @csallen always says that no matter how much good advice people hear, they'll still make the same mistakes. I always thought, "No way! I'm going to avoid the obvious mistakes I hear about over and over." But now I think I made the oft-repeated mistake of shipping too late.

This was tricky because it's an API. I'm asking customers to build against my interface. Once I define the interface and publish it, it's very hard for me to change it. I could just launch an initial API and deprecate it later if I discovered that my interface wasn't right, but I feared the complexity of running multiple versions of the same API.

In retrospect, I should have just taken the risk and gotten something up for sale earlier. Instead, I created a [rate-limited demo site](https://ingredientparser.com/), but I would have essentially gotten that for free if I published on an API marketplace. The benefit of rolling my own was that it allows people to test out how it works with no signups, but it probably wasn't worth the 3-4 weeks I spent on it.

## Cold approaching customers

The inbound emails I got after my blog post may have lulled myself into a false sense of security. I deferred on cold emails until I had a demo site to show them, but now as I reach out to different app developers, I'm becoming nervous about whether my API can actually provide value for them. I sent emails to five different app developers in the last few days and haven't gotten a response from any of them yet.

When I've explained the API to people in person, I've given the example of, "Imagine the recipe author wrote the ingredient as `"6 ounces orange juice - be sure to pick a brand with no sugar-added"`. If the user searches for `sugar`, that recipe would be a bad match. If they use my API, they'll know that 'sugar' isn't part of the product itself and shouldn't match." As I start to cold-approach customers, I realized that in practice, my API might not solve the problem above. A query for `sugar` would still match things like `"Sugar-free chocolate chips"` which is undesirable as well.

The other use-case I imagine is building shopping lists. Most recipe apps just concatenate ingredients together to create a shopping list, so if one recipe includes "2 slices of bacon" and another includes "3 slices bacon", the shopping list will be "2 slices bacon, 3 slices bacon" because the app doesn't know how to add strings together. With my API, they could make it "5 slices bacon" but it wouldn't work if one of them was a particular type of bacon and the other was unspecified (e.g. "uncured bacon" and "bacon").

There's also a much lower tolerance for errors when creating a shopping list. For search, it's not a big deal if there's 5-10% false positives or false negatives. That's better than no search at all or naive matching against the entire ingredient string. But users really don't want to go to the store and buy the wrong ingredient or the wrong amount, so I don't think my parser is accurate enough to prevent that. I doubt any ingredient parser will ever be accurate enough for that on random web data.

The anxiety I'm feeling is further hammering home the lesson of shipping as early as possible and seeing what customers are willing to pay for.

## Costs

- Python contractor - $8,060
- Angular tutor - $525
- Infrastructure (Travis CI, Coveralls, Heroku, etc.) - $690
- **Total (four months)** - **$9,275**

## What went well

- I'm gaining useful knowledge about web development and machine learning.
- Email signups and inbound inquiries indicate there's at least _some_ interest.

## What I could have done better

- Get a paid API endpoint up earlier
- More status reports
  - Just the act of writing out my choices and future strategy is incredibly useful.

## Plans for July

- **Main goal**: Get something up for sale ASAP.
- Commission basic logo ($200) for API marketplace.
- Publish first endpoint to API marketplace.
- Add unit conversion support for customer who requested it.
- Continue reaching out to recipe app developers to try to set up calls.
