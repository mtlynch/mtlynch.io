---
title: Stripe is Silently Recording Entire Sessions on Customer Sites
tags:
- stripe
- security
- portfolio rebalancer
date: '2020-04-21'
---

While integrating Stripe payments into my web app, I discovered that the official Stripe JavaScript library records all user browsing activity on my site and reports it back to Stripe. This data includes:

1. Every URL the user visits on my site, including pages that have nothing to do with payments or Stripe
1. Telemetry about how the user moves their mouse cursor while browsing my site

This post shares what I found, who else it affects, and how you can mitigate this behavior in your applications.

## Who's affected?

This affects your website if either of the following are true:

* Your base page template includes the Stripe script tag:
  * `<script src="https://js.stripe.com/v3">`
* Your app is a single page app, such as React, Vue, or Angular, and you use Stripe to process payments.

You are **not** affected if:

* Your app is a traditional, pre-rendered website using technology stacks like node.js, Ruby on Rails, or PHP.

## The discovery

I discovered this by accident while adding paid plans to my [portfolio rebalancer](https://assetrebalancer.com). As part of debugging my app, I was using [Burp Proxy](https://portswigger.net/burp), a free tool for inspecting and modifying HTTP traffic.

After finally getting my Stripe payment flow to work, I noticed that every time I navigated to a new page, my app generated a new HTTP POST request to a Stripe URL:

{{< video src="stripe-phone-home.mp4" caption="The stripe.js library reports back to Stripe every time I visit a new page in my app" >}}

This was strange because none of these pages contained any calls to Stripe's library. In fact, the only way to submit payment through Stripe was to create a user account and proceed to the payment page, but Stripe was making HTTP requests when I arrived on the page as a brand new user with no cookies or stored credentials.

## What is Stripe reporting?

To understand what these calls were, I inspected them in Burp. Each request looked like this:

```text
POST /4 HTTP/1.1
Host: m.stripe.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: text/plain;charset=UTF-8
Content-Length: 692
Origin: https://m.stripe.network
Connection: close
Referer: https://m.stripe.network/inner.html
Cookie: m=e29f7c00-b748-4e5f-8625-34d14dbc1c01; m=e29f7c00-b748-4e5f-8625-34d14dbc1c01

JTdCJTIydjIlMjIlM0ExJTJDJTIyaWQlMjIlM0ElMjI4MTBiOWIxY2E3ODU5YzNlYzExYTY0NTI0NzNkMTZmYyUyMiUyQyUyMnQlMjIlM0E4JTJDJTIydGFnJTIyJTNBJTIyNC41LjIxJTIyJTJDJTIyc3JjJTIyJTNBJTIyanMlMjIlMkMlMjJhJTIyJTNBbnVsbCUyQyUyMmIlMjIlM0ElN0IlMjJhJTIyJTNBJTIyJTIyJTJDJTIyYiUyMiUzQSUyMmh0dHBzJTNBJTJGJTJGYXNzZXRyZWJhbGFuY2VyLmNvbSUyRnByaWNpbmclMjIlMkMlMjJjJTIyJTNBJTIyUG9ydGZvbGlvJTIwUmViYWxhbmNlciUyMiUyQyUyMmQlMjIlM0ElMjIxYjVhMDcxOS1jMTFjLTQwOTEtYWZiYi00NGE1MjRhMDM2ZGUlMjIlMkMlMjJlJTIyJTNBJTIyMWJhOTYwOWMtMjI0Ni00YjYwLTk1ZWUtYzg0YTRlNDhmOTkzJTIyJTJDJTIyZiUyMiUzQWZhbHNlJTJDJTIyZyUyMiUzQXRydWUlMkMlMjJoJTIyJTNBdHJ1ZSUyQyUyMmklMjIlM0ElNUIlMjJsb2NhdGlvbiUyMiU1RCUyQyUyMmolMjIlM0ElNUIlNUQlMkMlMjJuJTIyJTNBMTkzJTdEJTdE
```

The string shown at the bottom, beginning with `JTdCJTIydj...` is the request request payload. It's a URL-encoded, base64-encoded JSON blob. The following bash commands decoded it:

```bash
$ echo "JTdCJTIydjIlMjIlM0ExJTJDJTIyaWQlMjIlM0ElMjI4MTBiOWIxY2E3ODU5YzNlYzExYTY0NTI0NzNkMTZmYyUyMiUyQyUyMnQlMjIlM0E4JTJDJTIydGFnJTIyJTNBJTIyNC41LjIxJTIyJTJDJTIyc3JjJTIyJTNBJTIyanMlMjIlMkMlMjJhJTIyJTNBbnVsbCUyQyUyMmIlMjIlM0ElN0IlMjJhJTIyJTNBJTIyJTIyJTJDJTIyYiUyMiUzQSUyMmh0dHBzJTNBJTJGJTJGYXNzZXRyZWJhbGFuY2VyLmNvbSUyRnByaWNpbmclMjIlMkMlMjJjJTIyJTNBJTIyUG9ydGZvbGlvJTIwUmViYWxhbmNlciUyMiUyQyUyMmQlMjIlM0ElMjIxYjVhMDcxOS1jMTFjLTQwOTEtYWZiYi00NGE1MjRhMDM2ZGUlMjIlMkMlMjJlJTIyJTNBJTIyMWJhOTYwOWMtMjI0Ni00YjYwLTk1ZWUtYzg0YTRlNDhmOTkzJTIyJTJDJTIyZiUyMiUzQWZhbHNlJTJDJTIyZyUyMiUzQXRydWUlMkMlMjJoJTIyJTNBdHJ1ZSUyQyUyMmklMjIlM0ElNUIlMjJsb2NhdGlvbiUyMiU1RCUyQyUyMmolMjIlM0ElNUIlNUQlMkMlMjJuJTIyJTNBMTkzJTdEJTdE" \
  | base64 --decode \
  | python -c "import sys; import json; from urllib.parse import unquote; print(json.dumps(json.loads(unquote(sys.stdin.read())), indent=2, sort_keys=True))"
```
```json
{
  "a": null,
  "b": {
    "a": "",
    "b": "https://assetrebalancer.com/pricing",
    "c": "Portfolio Rebalancer",
    "d": "1b5a0719-c11c-4091-afbb-44a524a036de",
    "e": "1ba9609c-2246-4b60-95ee-c84a4e48f993",
    "f": false,
    "g": true,
    "h": true,
    "i": [
      "location"
    ],
    "j": [],
    "n": 193
  },
  "id": "810b9b1ca7859c3ec11a6452473d16fc",
  "src": "js",
  "t": 8,
  "tag": "4.5.21",
  "v2": 1
}
```

It generated a new request like this every time I changed pages on my site. Each request looked pretty similar except that the URL field would reflect whatever URL was in the address bar. It appeared that Stripe was recording every single pageview in my app.

You may have noticed from the video that when I loaded the page, the first page load generated two requests, whereas every other page load resulted in only one new request. Here's what I found when I decoded that second request:

```json
{  "data": [
    4669,
    20,
    26,
    13,
    21,
    20,
    40,
    21,
    25,
    14
  ],
  "muid": "1b5a0719-c11c-4091-afbb-44a524a036de",
  "sid": "1ba9609c-2246-4b60-95ee-c84a4e48f993",
  "source": "mouse-timings-10",
  "url": "https://assetrebalancer.com/"
}
```

Was Stripe recording the mouse movements of everyone who visits any page on my site? I certainly didn't like that.

## Is this a mistake?

At first, I thought this was surely my mistake. I must have made a careless error in integrating Stripe's library that was causing it to phone home erroneously. To diagnose the issue, I [googled the URL](https://google.com/search?q=https%3A%2F%2Fm.stripe.com%2F4) that was receiving the HTTP POST requests from my app:

```
https://m.stripe.com/4
```

Instead of finding a mistake in my code, I discovered dozens of other posts from developers surprised to see this behavior in their app. The reports go [all the way back to 2017](https://stackoverflow.com/q/45718026/90388).

{{< img src="stripe-reports.png" alt="Collage of previous users reports about this behavior" maxWidth="800px" hasBorder="true" caption="TODO" >}}

In one of the issue threads on Github, a Stripe employee named Adam Solove [suggested that this behavior was unintentional](https://github.com/stripe/react-stripe-elements/issues/99#issuecomment-528987443) and Stripe would look for a fix:

{{< img src="asolove-comment.png" alt="Screenshot of Adam Solove's comment on Github" hasBorder="True" maxWidth="754px" caption="In a [Github comment](https://github.com/stripe/react-stripe-elements/issues/99#issuecomment-528987443), Stripe employee Adam Solove suggests that stripe.js should only send data when the app calls the library and only on pages where the user submits payment information." >}}

That was 7 months ago, and there has been no follow up from Stripe on that thread or anywhere else I could find.

## Confirming the issue

Just to be sure, I created a minimal reproduction of the behavior I was seeing. I made a brand new Vue project and [installed only the `@stripe/stripe-js` npm package](https://github.com/mtlynch/stripe-hello-world).

```javascript
import { loadStripe } from '@stripe/stripe-js';
```

Including this line in any component causes the Stripe JS library to load and begin reporting browsing behavior to Stripe.

Note that my app never even *calls* the `loadStripe` function. In reality, `@stripe/stripe-js` loads as soon as an app imports the library. For a single-page app, this means that the Stripe library loads as soon as the user visits any URL on the site.

A more appropriate name for this function would be `ensureStripeIsLoaded` because its real job is to gate the app from making any calls to the the Stripe library before it has finished loading.

## Is Stripe disclosing this?

I looked around for an official disclosure from Stripe about this behavior, but I couldn't find anything. The closest I found is this vague paragraph on [their npm package description](https://www.npmjs.com/package/@stripe/stripe-js):

>To best leverage Stripe’s advanced fraud functionality, ensure that Stripe.js is loaded on every page, not just your checkout page. This allows Stripe to detect anomalous behavior that may be indicative of fraud as customers browse your website.

Then there's this in the [Privacy Policy](https://stripe.com/privacy):

>Our Sites use cookies and other technologies to function effectively. These technologies record information about your use of our Sites, including:
>
>* Browser and device data, such as IP address, device type, operating system and Internet browser type, screen resolution, operating system name and version, device manufacturer and model, language, plug-ins, add-ons and the language version of the Sites you are visiting;
>* Usage data, such as time spent on the Sites, pages visited, links clicked, language preferences, and the pages that led or referred you to our Sites.
>
>We also may collect information about your online activities on websites and connected devices over time and across third-party websites, devices, apps and other online features and services. We use Google Analytics on our Sites to help us analyze Your use of our Sites and diagnose technical issues.

That alludes to what they're doing, but it implies the tracking happens on Stripe's site, not on customer websites.

## Reporting this to Stripe

I [reported this issue to Stripe support](email-to-stripe-support.txt) to see whether it was intended behavior and whether there was any way to prevent it from happening.

Stripe responded promptly to tell me that it was by design and quoted back to me the :

>Hi Michael,
>
>Thanks for getting in touch. Faith here from Stripe support.
>
>Jumping right in, the calls being seen are by design in order to detect fraud and is in the best interests of the user. According to the docs: "To best leverage Stripe’s advanced fraud functionality, include this script on every page, not just the checkout page. This allows Stripe to detect anomalous behavior that may be indicative of fraud as customers browse your website." 
>
>[https://stripe.com/docs/js/including](https://stripe.com/docs/js/including)
>
>Please let us know should you run into any other issues or have any other concerns.
>
>All the best,<br>
Faith

I found the "in the best interests of the user" part particularly patronizing. The party benefiting most from this data collection is clearly Stripe and not the user. Stripe is getting free data for training its fraud-detection models.

The user has a worse app experience because their browser is downloading Stripe's JavaScript library and executing it on every page, even if the user never tries to submit payment information. The only marginal benefit the user experiences is a lower chance of having their payment incorrectly flagged as fraudulent because the app has invasively tracked their every move around the site before and after executing the transaction.

## Mitigation

To prevent this invasive tracking from Stripe, there are actually two problems to solve:

1. Delay execution of Stripe's library until the user reaches a page where payment is required
1. Unload the Stripe library after the user completes payment.

### Solving problem one: defer Stripe's script loading

Previously, users were deferring Stripe's library load by [adding asynchronous wrapper functions](https://stackoverflow.com/a/61248986/90388) or using [code splitting](https://webpack.js.org/guides/code-splitting/).

Fortunately, the stripe-js v.1.4.0 release, published last week [offers a cleaner solution](https://github.com/stripe/stripe-js/issues/43#issuecomment-614864800). The update introduced the `@stripe/stripe-js/pure` import path, which allows clients to import Stripe without side-effects:

```javascript
import { loadStripe } from '@stripe/stripe-js/pure';
```

This causes Stripe to delay loading and executing its code until the app explicitly calls the `loadStripe` function. If you limit calls to the `loadStripe` function only to pages or components that involve Stripe payments, Stripe will only load on those pages and therefore won't record user behavior on other parts of your site.

### Solving problem two: unloading Stripe after payment

Deferring Stripe's library load is only half the battle. Even after you restrict Stripe to load only on pages that involve credit card payments, Stripe will persist in your app and continue sharing the user's browsing data for the rest of their session. To prevent this, your app must force Stripe to unload when the customer's payment is complete.

Stripe unfortunately offers no supported way to unload its library or disable its user monitoring. One intrepid developer [created a JavaScript snippet to forcefully unload Stripe](https://github.com/stripe/react-stripe-elements/issues/99#issuecomment-522045812), but it's specific to React and is, by nature, a brittle solution because it depends on undocumented properties of the Stripe library that may change at any time.

I addressed the issue in my app by forcing an HTTP reload when the user exits my payment page. Normally, single page apps. In Vue, there's the [`beforeRouteLeave`](https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards) hook, which the application executes before leaving the page. I added a hook that interrupts the routing process and forces the application to make an full HTTP request to the next route:

```javascript
beforeRouteLeave(to) {
  // Force an HTTP request instead of a JavaScript route change because we need
  // a new page load that does *not* import Stripe.
  window.location.replace(to.path);
}
```

### (optional) Content Security Policy for defense in depth

The previous two steps are all you need to prevent Stripe. For additional protection on my app, I 

{{< img src="stripe-csp.png" alt="Collage of previous users reports about this behavior" maxWidth="815px" caption="TODO" >}}

For this to work, I needed to add an extra

```javascript
beforeRouteEnter(to, from) {
  // If we're landing on this page from another route, force an HTTP request
  // so that we retrieve the route-specific Content Security Policy header.
  if (from.matched.length > 0) {
    window.location.replace(to.path);
  }
}
```

If you're not already using Content Security Policy, it's not worth implementing it just to hobble Stripe. If you do have a working policy in place, you may as well use it to flag any funny business from Stripe.

## Demo site

To see Stripe's behavior on a live site, I created a minimal Vue app that demonstrates this behavior:

* [Vulnerable site](https://frosty-banach-185455.netlify.app/) [(source)](https://github.com/mtlynch/stripe-snooping-example)
* [Site with mitigations](https://5e9db0c5ea0e3200062c02ea--frosty-banach-185455.netlify.app/)  [(source)](https://github.com/mtlynch/stripe-snooping-example/pull/1/files#diff-6d8c4c1f8080f58cb36a900829a76f43)

## Reccomendations to Stripe

Given how seriously Stripe seems to take security and privacy, it's surprising that they have been collecting so much data from their customers while doing so little to disclose their collection practices. My hope is that this is simply an oversight from Stripe that's persisted because too few customers have noticed for Stripe to recognize the problem.

There are several actions Stripe can take to rectify this situation:

* Clearly disclose data sharing
  * The npm package pages and the Stripe.js reference should clearly define what browsing and telemetry data their app will transmit to Stripe if they integrate with the Stripe library.
* Give client applications control over what data to share via opt-in
  * Stripe clients bear the cost of chargebacks against their application, so they should get to decide how much information to share with Stripe to reduce those chargebacks.
  * The stripe-js library should offer clients different levels so clients can balance their tolerance for chargebacks against their willingness to share data to increase the accuracy of Stripe's fraud detection algorithms.
* Support library unloading
  * Give client applications a supported mechanism to unload Stripe after the app has collected a user's payment.