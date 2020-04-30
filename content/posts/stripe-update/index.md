---
title: "Update: Stripe's Response Regarding User Tracking"
tags:
- stripe
- privacy
date: '2020-04-30'
description: Stripe has made several significant, positive changes to its user tracking and privacy policies in the last week.
---

Last week, I published a blog post about how Stripe was recording visitor behavior on websites that used Stripe as a payment processor. As a Stripe customer, this behavior caught me by surprise, as I didn't expect Stripe to record behavior about my visitors unless they were interacting with a Stripe payment form on my website.

The post reached #1 on Hacker News, where it prompted a lively discussion, including [feedback from Patrick Collison](https://news.ycombinator.com/item?id=22937303), Stripe's CEO and co-founder. In his top comment, he said:

>The question raised ("Is Stripe collecting this data for advertising?") can be readily answered in the negative. This data has never been, would never be, and will never be sold/rented/etc. to advertisers.

Several commenters responded saying that they appreciated his assurances, but they wanted Stripe's official terms of service and privacy policy to make these claims explicit and binding.

Only seven days after my blog post, Stripe [published a blog post](https://stripe.com/blog/advanced-fraud-detection-updates) outlining the changes they had made to better disclose their data collection practices and guarantees around user privacy.

TODO: Screenshot of new section

## Stripe's changes

### Developer documentation explicitly discloses tracking functionality

The most significant change to me is that Stripe's developer documentation now clearly discloses their JavaScript library's tracking behavior. Prior to yesterday's changes, the only indicator in their documentation was [this line](https://github.com/stripe/stripe-js/blob/d401405a0106f5a28e45cbad9f5c674697c1117a/README.md#ensuring-stripejs-is-available-everywhere):

>To best leverage Stripe's advanced fraud functionality, ensure that Stripe.js is loaded on every page, not just your checkout page. This allows Stripe to detect anomalous behavior that may be indicative of fraud as customers browse your website.

This omitted a lot of information and didn't make it clear what information the library collected and how it reported it to Stripe's servers.

In Stripe's current documentation, the library includes a section called ["Disabling advanced fraud detection signals"](https://github.com/stripe/stripe-js#disabling-advanced-fraud-detection-signals), which links to a webpage that [explicitly defines](https://stripe.com/docs/disputes/prevention/advanced-fraud-detection) the types of information Stripe collects for fraud prevention.

### Stripe clients have the option to disable tracking

Stripe updated their JavaScript library to give clients the option to opt-out of data collection. They can now load the `<script>` tag with the following flag:

```html
<script src="https://js.stripe.com/v3/?advancedFraudSignals=false"></script>
```

Clients using the [`@stripe/stripe-js` npm package](https://www.npmjs.com/package/@stripe/stripe-js) can use this as well by specifying a parameter while initializing the library:

```javascript
import {loadStripe} from '@stripe/stripe-js/pure';

loadStripe.setLoadParameters({advancedFraudSignals: false})
const stripe = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
```

This is a positive change, as different clients have different levels of tolerance to fraud. A merchant who sells custom PCs is more concerned about chargebacks than a merchant who sells a $9/month SaaS app.

### Privacy policy now explicitly prohibits Stripe from selling user data

I made a [diff view](https://gist.github.com/mtlynch/3d1cbeb0666d57a48e151cb6998a1870) of the full set of changes to the privacy policy, but I'll highlight the notable ones here.

* **Ad networks and sale of user data are gone**

In my original blog post, I called out this worrying section from Stripe's privacy policy:

<font color="red">

>When you visit our Sites or online services, both we and certain third parties collect information about your online activities over time and across different sites to provide you with advertising about products and services tailored to your individual interests (this type of advertising is called “interest-based advertising”).

</font>

Stripe also had language giving themselves permission to share data with ad partners like AdWords and AdRoll, but this section is now gone:

<font color="red">

>We work with Google AdWords, Doubleclick, AdRoll and other advertising networks.

</font>

The new language is refreshingly clear and direct: Stripe does not sell customer data to advertisers:

<font color="green">

> We do not use, share, rent or sell the Personal Data of our Users’ Customers for interest-based advertising. We do not sell or rent the Personal Data of our Users, their Customers or our Site visitors.

</font>

* **User data is still protected, even after a corporate sale**

I believe this was a direct response to [this comment on Hacker News](https://news.ycombinator.com/item?id=22937775) pointing out that even if Stripe acts as a responsible data steward now, user data is still at risk if another corporation purchases Stripe. Patrick Collison responded:

>I'll ask our legal team if we can somehow contractually preclude ourselves from sharing this data in the case of liquidation or otherwise bind ourselves in a useful fashion...

In the latest update to their privacy policy, Stripe included this clause:

<font color="green">

>Any other entity which buys us or part of our business will have the right to continue to use your Personal Data, but only in the manner set out in this Privacy Policy unless you agree otherwise.

</font>

## Changes I'd still like to see

### Disclose URL collection more explicitly

On Stripe's dedicated fraud detection page, they include a section ["Types of signals"](https://stripe.com/docs/disputes/prevention/advanced-fraud-detection#types-of-signals), which explains what information they collect from end-users to perform fraud detection.

In my blog post, I noted that Stripe was collecting full URLs of every page the user visited, including query strings (e.g., `example.com?userId=michael`) and URL fragments (e.g., `example.com#key=1234`). Stripe still doesn't make it clear that they're collecting this information. The closest they come is this section (empthasis mine):

>Advanced fraud detection signals also include activity indicators from the shopping experience that help us distinguish legitimate shoppers from fraudulent purchasers and bots... These signals include mouse activity indicators and **how long a user spends on different pages** in the shopping experience, which are both predictive of bot-like behavior across the duration of a session.

Web applications shouldn't store sensitve data in query strings, but it still happens.

The URL fragment is more serious, as that otherwise *is* an otherwise safe way to store sensitive information. [Firefox Send](https://github.com/mozilla/send/blob/7a9a75794e7aa7048dcef6a161ef11fa19cfe906/docs/encryption.md) and [Mega.nz](https://mega.nz/help/s/57672896886688a70c8b45ad) are examples of popular web apps that use the URL fragment to store client-side encryption keys so that users can store end-to-end encrypted files in the cloud without the server ever having access to the underlying data. If Stripe's JS library ran on a site that used a similar scheme, the JS library would send secret encryption keys to Stripe's servers.

{{< img src="mega-encryption-key.png" alt="Screenshot of Mega.nz displaying encryption key in URL fragment" maxWidth="600px" hasBorder="true" caption="Popular file sharing application Mega.nz stores sensitive encryption keys in the URL fragment field" >}}

### Support library unloading

While the `loadStripe` library gives integrators the power to decide when to turn Stripe on, Stripe still offers no way to turn Stripe **off**. If you want to allow tracking on your page during a checkout flow but disable it after the transaction is complete, the only way to do this right now is to force a page refresh to unload Stripe from the browser context.

## Why does this matter?

If you load a JavaScript library on your page, that library basically has the keys to the kingdom. JavaScript running on your page has access to all of the user's data and can perform actions as the user. Developers have a responsibility to understand what 