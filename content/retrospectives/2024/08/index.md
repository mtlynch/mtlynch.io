---
title: "Educational Products: Month 2"
date: 2024-08-02T07:36:16-04:00
description: TODO - One-line summary
---

## Highlights

-

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Record publishable versions of four lessons from the course

- **Result**: Recorded most of one lesson
- **Grade**: D

TODO

### Start selling the new version of the course

- **Result**: Decided to wait until the course is complete
- **Grade**:

TODO

## Improvements in making videos

### Desk tripod

### Shotcut

### Aaron Francis

## Is Merchant of Record a scam?

When I was running TinyPilot, I hated paying sales tax. I was only responsible for sales tax in two states: Massachusetts and North Carolina.

Paying sales tax in Massachusetts was straightforward and took about 20 minutes every quarter. I just added up all my sales to customers in Massachusetts and gave 6.25% to the Massachusetts Department of Revenue.

Paying sales tax in North Carolina was [tedious and infuriating](https://x.com/deliberatecoder/status/1712875215091286350). It took me anywhere from three to eight hours to figure out how to pay North Carolina sales tax, and I had to repeat that exercise every quarter. Tax rates in North Carolina vary by county and some counties have multiple, separate taxes. You can't just add up all your sales in the state and take a percentage. You can't even sum your taxes by county. They make _you_ calculate for each county how much you owe in each type of tax.

Because of my experience with North Carolina, I decided I never wanted to sell in a way that forced me to pay per-state taxes again. So when I look for ways to accept payment for my course, I've been looking for services that offer Merchant of Record. That means that they pay the sales tax for you, and you just pay your income tax on profits.

Last week, LemonSqueezy, one of the few payment processors that supported Merchant of Record, announced that Stripe had acquired the company. In the Hacker News thread, [one comment](https://news.ycombinator.com/item?id=41082681) caught my eye:

> I find the whole aspect of having MoR a fear mongering tactic to get you to pay extra transaction fees
>
> 99% of SaaS won't reach the MRR needed to justify MoR
>
> Of the 1% those breaking through 7 digit MRR can simply hire in house to manage tax remittance and not confuse their customers with invoices labelled with MoR's branding

I asked my accountant, and he confirmed that for most US states, the [minimum threshold](https://www.salestaxinstitute.com/resources/economic-nexus-state-guide) I have to hit to owe sales tax is around $100k or 100 transactions per year depending on the state. In populous states like California or New York, the minimum is $500k. If I reach the point where I'm exceeding enough states' minimums that it's a pain for me to pay sales tax, I can hire an accountant with the hundreds of thousands of dollars I'm earning from sales.

This is good news, as I'd been planning to sell on Gumroad, largely for their Merchant of Record feature. But Gumroad charges 10% of each transaction, and that doesn't even include payment processing fees.

Given how unlikely it is for me to meet sales tax thresholds outside of my home state of Massachusetts, it means I can sell my courses outside of Gumroad and stop forfeiting 10%.

## Side projects

### Finding my preferred pattern for htmx forms

In my last retrospective, I talked about how I'd begun using htmx and liked it, but I found error handling awkward.

As an example, here's a form on ScreenJournal, my movie review web app.

When the user submits the form, there can only be two results:

- The settings are saved successfully.
- There was an error in processing the request.

The idiomatic way to handle a form like this in htmx is for the server to render the initial form and then when the browser sends the HTTP request, the server responds with the entire HTML of the form with the values the user selected and a message indicating success or failure.

I find htmx's recommended pattern awkward and messy. Why does the server have to give the browser the entire form again when the only new information is whether the request succeeded or failed?

So, here's my slightly adjusted htmx pattern to make htmx forms more lightweight:

<!-- prettier-ignore -->
```html
<form
  hx-put="/account/notifications"
  hx-clear="#result-success, #result-error"
  hx-disabled-elt="input, .btn"
  hx-target="#result-success"
  hx-target-error="#result-error"
  hx-swap="textContent"
>
  <label class="form-check-label" for="new-reviews-checkbox">
    Email me when users post reviews
  </label>
 <input
    class="form-check-input"
    type="checkbox"
    id="new-reviews-checkbox"
    name="new-reviews"
  />

  <label class="form-check-label" for="all-comments-checkbox">
    Email me when users add comments
  </label>
  <input
    class="form-check-input"
    type="checkbox"
    id="all-comments-checkbox"
    name="all-comments"
  />

  <button class="btn btn-primary" value="Save">Save</button>

  <div class="spinner-border htmx-indicator" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</form>
<div id="result-success" class="alert alert-success" role="alert"></div>
<div id="result-error" class="alert alert-danger" role="alert"></div>
```

The heavy lifting is in the `<form>` tag, so I'll break down what's happening:

```html
hx-put="/account/notifications"
```

When the user submits the form, make an HTTP POST to the `/account/notifications` route on the server.

```html
hx-clear="#result-success, #result-error"
```

When the user submits the form, clear the contents of the elements with IDs `result-success` or `result-error`.

This attribute isn't part of htmx but from a custom extension that I wrote called [clear-before-send](https://github.com/mtlynch/screenjournal/blob/f2f1b4420a5752314a2feb87a42c47147486e222/static/js/htmx-ext/clear-before-send.js). I use it in conjunction with the CSS rule `.alert:empty {  display: none }` to hide `<div>` tags with the `alert` class when they contain no text.

```html
hx-disabled-elt="input, .btn"
```

During the HTTP request, disable all `<input>` tags and elements with the `.btn` CSS class so that the user can't double submit the same request.

Sidenote: The htmx [documentation](https://htmx.org/attributes/hx-disable/) implies that `hx-disabled-elt="this"` should disable the whole form, but it doesn't seem to work. As a workaround, I have to use selectors that match all inputs in the form.

```html
hx-target="#result-success"
```

If the server responds with a status code in the 200-range, put the body of the server's response in the element with ID `result-success`.

```html
hx-target-error="#result-error"
```

If the server responds with a status code outside of the 200-range, put the body of the server's response in the element with ID `result-error`.

This attribute isn't part of htmx but from a an htmx extension called [response-targets](https://github.com/bigskysoftware/htmx-extensions/blob/c86568af52c98f0ae14ec70644ef868921ffabc9/src/response-targets/README.md).

```html
hx-swap="textContent"
```

When populating the target of `hx-target` or `hx-target-error`, htmx should replace the `textContent` of the target element (as opposed to replacing its inner or outer HTML).

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-

### Requests for help

TODO
