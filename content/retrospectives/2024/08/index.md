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
- **Grade**: N/A

TODO

## Improvements in making videos

As I started recording videos for the course, I quickly remembered all the annoying parts of making videos that plagued me in the first iteration of this course.

One of the biggest challenges in making videos is all the friction involved in actually recording and all the disruptions that can prevent me from recording.

For example, I find that I record best right after a workout. But that means that in addition to the 90-120-minute block of uninterrupted time for recording, I also need 60-90 minutes to exercise, shower, and shave. And I sometimes have uninterrupted blocks of three or four hours, but if those are the only times I can record, then it severely limits which days I can make progress.

There's also

### Get a desk tripod

### Keep everthing connected

### Record in chapters

As part of my research for the course, I watched Aaron Francis' screencasting course. His focus is more on live-coding, but enough of the material translates to my course that it was worth the purchase.

I found Aaron's course helpful, but some of the best lessons weren't even things that he said. I learned a lot simply from seeing how Aaron packaged his own course.

One of the biggest changes I made after watching Aaron's course was to create shorter videos. The first iteration of my course consisted of seven lessons that were 30-60 minutes each. Aaron's lessons are roughly the same length, but he subdivides his lessons into separate chapters where each chapter is only a few minutes.

As a student, I like the short chapter approach, as it lets me skip to the chapters I'm most interested in. As a course creator, I also like the short chapter approach because it's easier to record and edit 10 four-minute videos than it is a single 40-minute video. It's more satisfying to know that five chapters are complete rather than to be halfway through editing a 40-minute video.

### Make lessons order-independent

When I recorded this course in 2020, my videos all start with something like, "Welcome to part 2: Understanding Hacker News." And I'd end each video by saying, "In the next video, I'll talk about how to choose topics to write about."

The problem with doing this is that it prevents me from reordering the lessons later. If I decide after recording that a particular lesson belongs earlier in the course, it messes up the ordering I've already annouced in the videos.

After watching Aaron Francis' course and realizing he never implies an ordering in the video, I decided to remove the lesson numbers from my videos and to not refer to previous or subsequent lessons. When I reference something that's in another lesson, I just say, "I talk about that more in the Foo video," rather than saying "later"or "earlier."

### Buy three of the same shirt

## Is Merchant of Record a scam?

Last week, LemonSqueezy, one of the few payment processors that supported Merchant of Record, announced that Stripe had acquired the company. In the Hacker News thread, [one comment](https://news.ycombinator.com/item?id=41082681) caught my eye:

> I find the whole aspect of having MoR a fear mongering tactic to get you to pay extra transaction fees
>
> 99% of SaaS won't reach the MRR needed to justify MoR
>
> Of the 1% those breaking through 7 digit MRR can simply hire in house to manage tax remittance and not confuse their customers with invoices labelled with MoR's branding

I asked my accountant, and he confirmed that for most US states, the [minimum threshold](https://www.salestaxinstitute.com/resources/economic-nexus-state-guide) I have to hit to owe sales tax is around $100k or 100 transactions per year depending on the state. In populous states like California or New York, the minimum is $500k. If I reach the point where I'm exceeding enough states' minimums that it's a pain for me to pay sales tax, I can hire an accountant with the hundreds of thousands of dollars I'm earning from sales.

This is good news, as I'd been planning to sell on Gumroad, largely for their Merchant of Record feature. But Gumroad charges a 10% commission, and that doesn't even include payment processing fees.

Given how unlikely it is for me to meet sales tax thresholds outside of my home state of Massachusetts, it means I can sell my courses outside of Gumroad and save myself the 10%.

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

This attribute isn't part of the core htmx library but from an htmx extension called [response-targets](https://github.com/bigskysoftware/htmx-extensions/blob/c86568af52c98f0ae14ec70644ef868921ffabc9/src/response-targets/README.md).

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
