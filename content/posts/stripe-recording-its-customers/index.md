---
title: Stripe is Silently Recording Entire Sessions on Customer Sites
tags:
- stripe
- security
- portfolio rebalancer
date: '2020-04-24'
---

While integrating Stripe's subscription payments into my web app, I recently discovered that Stripe, by default, shares all browsing data. The official Stripe JavaScript library shared every URL that visitors accessed on my website regardless of whether the page ever called the library. This post shares what I found, who else it affects, and how you can mitigate this behavior on your own web applications.

## Who's affected?

This affects your website if either of the following are true:

* You use Stripe to process payments It's a single page app, such as React, Vue, or Angular and you use Stripe to process payments
* You include the `https://js.stripe.com/v3` Stripe `<script>` tag on your base page template.

## The discovery

Whenever I do web development, I send my traffic through [Burp Proxy](https://portswigger.net/burp), a free tool for inspecting and modifying HTTP traffic.

I had just gotten everything working but I noticed that every time I navigated to a new page, I saw an HTTP POST to this Stripe URL:

{{< video src="stripe-phone-home.mp4" caption="The stripe.js library reports back to Stripe every time I visit a new page in my app" >}}

I checked out the request in Burp:

```
https://m.stripe.com/4
```

## What exactly is Stripe sending?

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

The request payload is a URL-encoded, base64-encoded JSON blob. When decoded, it looks like this:

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

Each page view looked pretty similar, but the `b` field had a different URL. You'll notice in the video that when I loaded the page, the first page generated two requests to that URL. Here's what I found when I decoded the second one:

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

## Is this a mistake?

When I Googled that URL, I found several other Github issues and StackOverflow posts from users who were surprised to see Stripe silently recording traffic on their websites. These reports go all the way back to XX.

In one of the issue threads on Github, a Stripe employee named Adam Solove [suggested that this behavior was unintentional](https://github.com/stripe/react-stripe-elements/issues/99#issuecomment-528987443) and Stripe would look for a fix:

{{< img src="asolove-comment.png" alt="Screenshot of Adam Solove's comment on Github" hasBorder="True" maxWidth="754px" caption="In a [Github comment](https://github.com/stripe/react-stripe-elements/issues/99#issuecomment-528987443), Stripe employee Adam Solove suggests that stripe.js should only send data when the app calls the library and only on pages where the user submits payment information." >}}

That was 7 months ago, and there has been no follow up from Stripe on that thread or anywhere else I could find.

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

I was annoyed that Faith told me that "the calls being seen are ... in the best interests of the user." How's that now? The user isn't really better off unless Stripe was going to reject their payment unless they proved their human-ness by letting Stripe spy on their browsing behavior. And aren't I, as the developer, in a better position to choose what's best for my users than Stripe?

## Mitigation

There are actually two problems:

1. I want to load Stripe only when the user loads my `/subscribe` page.
1. When the user leaves my `/subscribe` page, I want to *unload* Stripe.

Unfortunately, once you load the Stripe library, it digs its claws in and refuses to let you remove it. A Github user posted a JavaScript snippet of all the work he does in his app to unload Stripe, but it's very invasive. It involves deleting all JavaScript timers in the app, whether or not they're confirmed to be associated with Stripe, and then spidering the DOM to remove all Stripe elements. But his method depends on Stripe's internal variable names, so it's by nature brittle.

### Defer `loadStripe` and force new HTTP request

Fortunately, solving problem (1) is straightforward with most SPA frameworks. Code splitting is a feature that breaks up your app's JavaScript and loads it only when the user visits a page that needs it.

This solves the problem of Stripe loading as soon as my app loads. But on April 16th, Stripe [introduced a new option](https://github.com/stripe/stripe-js/issues/43#issuecomment-614864800) in its `v1.4.0` release of the `@stripe/stripe-js` npm package:

```javascript
import { loadStripe } from '@stripe/stripe-js/pure';
```

That doesn't solve problem (2), however, because once my app loads Stripe, Stripe sticks around. To address that, I force a new HTTP request when my app leaves the `/subscribe` page.

```javascript
beforeRouteLeave(to) {
  // Force an HTTP request instead of a JavaScript route change because we need
  // a new page load that does *not* import Stripe.
  window.location.replace(to.path);
}
```

## Reccomendations to Stripe

Given how seriously Stripe seems to take security and privacy, it's surprising that . I hope it's an oversight on their part and that the only reason it's persisted so long is that too few people notice for them to review their policies here.

Stripe can fix this issue with two steps:

* Disclose data sharing clearly
  * The npm package pages and the Stripe.js reference should clearly define which data the Stripe.js library sends to Stripe.
* Support library unloading
  * Give implementers an option to unload Stripe via an official API rather than forcing them to reload the page or resort to crazy hacks (TODO).