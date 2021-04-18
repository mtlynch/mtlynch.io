---
title: "Update: Stripe's Response Regarding User Tracking"
tags:
- stripe
- privacy
date: '2020-04-30'
images:
- stripe-update/og-image.png
description: Stripe has made several significant, positive changes to its user tracking and privacy policies in the last week.
discuss_urls:
  reddit: https://redd.it/gb2c08
  hacker_news: https://news.ycombinator.com/item?id=23034924
---

Last week, I [published a blog post](/stripe-recording-its-customers/) describing how Stripe recorded visitor behavior on their customers' websites. In short, Stripe's JavaScript library collected information about URLs users visited and telemetry about their mouse movements, even when the site never displayed any Stripe payment forms. I suspected that most Stripe customers were unaware of this and argued that Stripe should disclose their data gathering practices more prominently and in greater detail.

The post generated [a lively discussion on Hacker News](https://news.ycombinator.com/item?id=22936818), including several comments from Patrick Collison, Stripe's co-founder and CEO. In his [top comment](https://news.ycombinator.com/item?id=22937303), he said:

>The question raised ("Is Stripe collecting this data for advertising?") can be readily answered in the negative. This data has never been, would never be, and will never be sold/rented/etc. to advertisers.

Several commenters responded that they appreciated his assurances but wanted to see official and binding language in Stripe's [terms of service](https://stripe.com/legal) and [privacy policy](https://stripe.com/privacy).

Less than a week after my article came out, Stripe [published a blog post](https://stripe.com/blog/advanced-fraud-detection-updates) outlining the changes they had made to better disclose their data collection practices and guarantees around user privacy.

{{< img src="stripe-blog.png" alt="Screenshot of Stripe's blog post" maxWidth="729px" hasBorder="true" linkUrl="https://stripe.com/blog/advanced-fraud-detection-updates" >}}

I've reviewed their new documentation, and I'll discuss how well Stripe's changes address the issues I raised.

## Stripe's changes

### Developer documentation explicitly discloses tracking functionality

To me, the most significant change is that Stripe's developer documentation now discloses their JavaScript library's tracking behavior. Prior to yesterday's changes, the only hints were [these two sentences](https://github.com/stripe/stripe-js/blob/d401405a0106f5a28e45cbad9f5c674697c1117a/README.md#ensuring-stripejs-is-available-everywhere):

>To best leverage Stripe's advanced fraud functionality, ensure that Stripe.js is loaded on every page, not just your checkout page. This allows Stripe to detect anomalous behavior that may be indicative of fraud as customers browse your website.

This omitted critical information and failed to communicate what information the library collected and how it shared that data with Stripe's servers.

In Stripe's current documentation, the library includes a section called ["Disabling advanced fraud detection signals,"](https://github.com/stripe/stripe-js#disabling-advanced-fraud-detection-signals) which links to a webpage that [defines explicitly](https://stripe.com/docs/disputes/prevention/advanced-fraud-detection) the types of information Stripe collects for fraud prevention.

{{< img src="stripe-signals-docs.png" alt="Screenshot of Stripe's fraud detection documentation" maxWidth="650px" hasBorder="true" caption="Stripe's new [fraud detection documentation](https://stripe.com/docs/disputes/prevention/advanced-fraud-detection) is more explicit about how Stripe collects user data." >}}

### Stripe clients have the option to disable tracking

Stripe updated their JavaScript library to give clients the ability to opt-out of deep data collection. They can now load the `<script>` tag with the `advancedFraudSignals=false` parameter to disable this functionality:

```html
<script src="https://js.stripe.com/v3/?advancedFraudSignals=false"></script>
```

Clients using the [`@stripe/stripe-js` npm package](https://www.npmjs.com/package/@stripe/stripe-js) can leverage this feature as well by specifying `{advancedFraudSignals: false}` while initializing the library:

```javascript
import {loadStripe} from '@stripe/stripe-js/pure';

loadStripe.setLoadParameters({advancedFraudSignals: false})
const stripe = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
```

This is a positive change, as it restores power to the website owners to decide how much data they want to exchange to achieve better fraud prevention.

### Privacy policy now explicitly prohibits Stripe from selling user data

On Wednesday, Stripe drastically revised their [privacy policy](https://stripe.com/privacy). The revisions place stricter limitations on how Stripe handles user data and shares it with external partners.

I made a [diff view](https://gist.github.com/mtlynch/3d1cbeb0666d57a48e151cb6998a1870) of the full set of changes to the privacy policy, but I'll highlight the notable ones here.

* **Ad networks and sale of user data are gone**

In my original blog post, I called out this worrying section from Stripe's privacy policy:

<font color="red">

>When you visit our Sites or online services, both we and certain third parties collect information about your online activities over time and across different sites to provide you with advertising about products and services tailored to your individual interests (this type of advertising is called “interest-based advertising”).

</font>

Stripe also had language giving themselves permission to share data with ad partners like AdWords and AdRoll:

<font color="red">

>We work with Google AdWords, Doubleclick, AdRoll and other advertising networks.

</font>

Stripe has cut both of those sections. Their new language is refreshingly clear and direct: Stripe does not sell customer data to advertisers:

<font color="green">

> We do not use, share, rent or sell the Personal Data of our Users’ Customers for interest-based advertising. We do not sell or rent the Personal Data of our Users, their Customers or our Site visitors.

</font>

* **User data is still protected, even after a corporate sale**

Amid the discussion on Hacker News, a [user expressed concern](https://news.ycombinator.com/item?id=22937775) that, despite Stripe's current good intentions, user data could fall into the wrong hands in the event that another company purchased Stripe. Patrick Collison responded:

>I'll ask our legal team if we can somehow contractually preclude ourselves from sharing this data in the case of liquidation or otherwise bind ourselves in a useful fashion...

Perhaps in direct response to that exchange, the new privacy policy includes this clause:

<font color="green">

>Any other entity which buys us or part of our business will have the right to continue to use your Personal Data, but only in the manner set out in this Privacy Policy unless you agree otherwise.

</font>

## Changes I'd still like to see

I'm impressed by Stripe's quick and thorough changes, but there remain areas I think need improvement. I've expressed these concerns to Stripe directly, and they've said they have plans to address them in the future.

### Disclose URL collection more explicitly

On Stripe's dedicated fraud detection page, they include a section ["Types of signals,"](https://stripe.com/docs/disputes/prevention/advanced-fraud-detection#types-of-signals) which explains what information they collect from end-users as part of fraud detection.

In my blog post, I noted that Stripe was collecting full URLs of every page the user visited, including query strings (e.g., `example.com?userId=michael`) and URL fragments (e.g., `example.com#key=1234`). Stripe still doesn't make it clear that they're collecting this information. The closest they come is this section (emphasis mine):

>Advanced fraud detection signals also include activity indicators from the shopping experience that help us distinguish legitimate shoppers from fraudulent purchasers and bots... These signals include mouse activity indicators and **how long a user spends on different pages** in the shopping experience, which are both predictive of bot-like behavior across the duration of a session.

Can a reasonable person deduce from this language that Stripe collects full URLs? I doubt it.

Perhaps you have no sympathy for web applications that store sensitive data in query strings, as that's [widely recognized as an insecure pattern](https://owasp.org/www-community/vulnerabilities/Information_exposure_through_query_strings_in_url). The URL fragment is more serious. That otherwise *is* a safe way to store sensitive information, so it's alarming to see a third-party library sending a copy to an external server.

[Firefox Send](https://github.com/mozilla/send/blob/7a9a75794e7aa7048dcef6a161ef11fa19cfe906/docs/encryption.md) and [Mega.nz](https://mega.nz/help/s/57672896886688a70c8b45ad) are both examples of popular web apps that use the URL fragment to store client-side encryption keys so that users can save end-to-end encrypted files to the cloud without the server ever having access to the underlying data. If Stripe's JS library ran on a site that used a similar scheme, their library would leak sensitive encryption keys to Stripe's servers.

{{< img src="mega-encryption-key.png" alt="Screenshot of Mega.nz displaying encryption key in URL fragment" maxWidth="600px" hasBorder="true" caption="Popular file-sharing application Mega.nz stores sensitive encryption keys in the URL fragment field" >}}

### Support library unloading

While the `loadStripe` function and [`/pure` import path](/stripe-recording-its-customers/#solving-problem-one-defer-stripes-script-loading) give integrators the power to decide when to turn Stripe on, there's still no way to turn Stripe **off**.

Suppose that you want to enable Stripe's advanced fraud detection during a checkout flow, but you want to stop sharing data with Stripe once the transaction completes. The only way to do this right now is to [force a page refresh](/stripe-recording-its-customers/#solving-problem-two-unloading-stripe-after-payment).

It would be better if Stripe offered a simple function like `unloadStripe` that dynamically disabled tracking when the app no longer needed it.

## Why does all this matter?

By including third-party JavaScript packages, website owners confer to the libraries a great deal of trust. With the ability to execute code in the user's browser, JavaScript libraries have the keys to the kingdom. They can access all the information the user can see and can perform actions on the site under the user's privileges.

Website owners have a responsibility (in some jurisdictions, a legal one) to understand what information their site collects, either directly or through third-party libraries. It's good that Stripe is demonstrating responsible data stewardship, but website owners must continue to assert their right to understand what data external partners collect and what limits those partners guarantee about the data.
