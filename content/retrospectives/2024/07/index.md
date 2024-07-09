---
title: "Returning to My Blogging Course"
date: 2024-07-08T08:49:05-04:00
description: TODO - One-line summary
---

## Highlights

-

## Rebooting Hit the Front Page

In 2020, I created a video course about blogging called ["Hit the Front Page of Hacker News."](https://hitthefrontpage.com/) I was proud of the course material, and I heard positive feedback about it, but I felt swamped at the time. TinyPilot was growing quickly, and I didn't have much time to spare.

Over the last four years, I've made about $10k from sales of the course, but I always felt like I didn't give the course enough attention. I barely did any marketing for it after I launched, and I suspect there are a lot of marketing channels that would be a good match.

In [my last blog post](/i-sold-tinypilot/), I surveyed readers about what they'd like to see me do next.

{{<img src="survey-results.png" has-border="true">}}

## Class logistics

- Emailed my mailing list
- XX subscribers
- XX filled out survey
- XX purchased the course

## Teaching a class

- Hard to find a video platform
- Feels like it swallows my schedule

## Should I not focus on Hacker News?

One of the surprises in the live course is that

## Learning htmx

For the past two years, [htmx](https://htmx.org) has been popping up on my radar more and more. I know [Cory Zue uses htmx](/notes/czue-livecoding-2020-05-05/index.md), so it piqued my interest.

For the longest time, the biggest hurdle was just that I didn't get htmx.

The landing page confused me. Its pitch was, "Why should `<form>` be the only element that can POST?" I thought that was a reasonable critique, but you can use a few lines of JavaScript to make any HTML element send any kind of request, so why do I need a library for that?

What finally made htmx click for me was the book, _Hypermedia Systems_. It's written by the same authors of htmx, and it explains the motivation for htmx and gives detailed explanations of several scenarios where you can use it.

If I had to pitch htmx to myself four years ago, here's what I'd say.

### My pitch for htmx

You remember how when you first learned to program websites, you'd write HTML like this?

```html
<form action="/users" method="POST">
  <input name="first-name" placeholder="First name" />
  <input name="last-name" placeholder="Last name" />
  <input type="submit" value="Add user" />
</form>
```

Today, you wouldn't write that because you want to avoid the full page reload. You don't want to reload the entire page just to show a message that says, "User added successfully." And you don't want to blow away all the user's input if the server rejected the input.

So, instead, you'd turn to JavaScript, and do something like this:

```javascript
document.body.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form").addEventListener("submit", (evt) => {
    evt.preventDefault(); // Block default submit.
    fetch(); // ...
  });
});
```

It doesn't seem like a lot of JavaScript, but it's a lot of boilerplate every time. It's extra friction for every client interaction with the server.

And you probably want a pretty JSON REST interface instead of the gross standard URL-encoded request your browser sends, so you write a little more JavaScript to convert the request to JSON instead and to parse JSON from the server's response.

Or maybe you'd turn to a heavy framework

The value proposition of htmx is that it gives you the same benefits of all that extra JavaScript.

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-

### Requests for help

TODO
