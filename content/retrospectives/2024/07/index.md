---
title: "Returning to My Blogging Course"
date: 2024-07-08T08:49:05-04:00
description: TODO - One-line summary
---

## Highlights

-

## Rebooting Hit the Front Page

In 2020, I created a video course about blogging called ["Hit the Front Page of Hacker News."](https://hitthefrontpage.com/) I was proud of the course material, and I heard positive feedback from students, but I felt like I never gave it the attention it deserved.

When I released the course, TinyPilot was growing quickly at the time, and I didn't have time to market the course or try iterating on the material.

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

For the past two years, [htmx](https://htmx.org) has been popping up on my radar more and more. I know [Cory Zue uses htmx](/notes/czue-livecoding-2020-05-05/#sharing-code-between-client-side-and-server-side-rendering), so it piqued my interest.

For the longest time, the biggest hurdle was just that I didn't get htmx.

The landing page confused me. Its pitch was, "Why should `<form>` be the only element that can POST?" I thought that was a reasonable critique, but you can use a few lines of JavaScript to make any HTML element send any kind of request, so why do I need a library for that?

What finally made htmx click for me was the book, [_Hypermedia Systems_](https://hypermedia.systems). It's written by the same authors of htmx, and it explains the motivation for htmx and gives detailed explanations of several scenarios where you can use it.

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
    fetch(`/users`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({
        firstName: document.querySelector("[name='first-name']"),
        lastName: document.querySelector("[name='last-name']"),
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        // TODO: Handle errors too.
      })
      .then((result) => {
        // TODO: Handle success.
      });
  });
});
```

It doesn't seem like a lot of JavaScript, but it's a lot of boilerplate every time. It's extra friction for every client interaction with the server.

Or maybe you'd turn to a heavy framework like React or Vue, and now there are countless layers of JavaScript abstraction between your code and what appears in the browser.

The promise of htmx is a return to the simplicity of when you first learned web programming. Instead of writing HTML and then offloading all of the logic to React or hand-written event handlers, you'd fold htmx into your app and then write your form like this:

```html
<form hx-post="/users" hx-target="this">
  <input name="first-name" placeholder="First name" />
  <input name="last-name" placeholder="Last name" />
  <input type="submit" value="Add user" />
</form>
```

And then htmx makes everything just work without you having to write any custom JavaScript.

### My experience with htmx so far

To test out htmx, I've been [rewriting](https://www.whatgotdone.com/michael/2024-07-05) parts of [ScreenJournal](https://github.com/mtlynch/screenjournal) using htmx. ScreenJournal is my open-source movie review app. It's like Goodreads for movies or letterboxd, but open-source.

A good example of my rewrite was [reimplementing the notification preferences page with htmx](https://github.com/mtlynch/screenjournal/pull/291/files). I've got a page that allows users to specify which emails they'd like to receive:

TODO: Screenshot

And this page required a lot of custom JavaScript to override the browser default and manually

One of the best rewrites was [reimplementing "delete review" functionality with htmx](https://github.com/mtlynch/screenjournal/pull/289). My original implementation had a delete button that took the user to a dedicated page that just said, "Are you sure you want to delete this review?"

#### htmx adds an abstraction layer, but it's intuitive

- With Vue and Angular, I had no idea how it was transforming my code into a web app.
- With htmx, the behavior is intuitive enough that I could probably reimplement htmx myself based on the way I see it work.

#### htmx's error handling is underwhelming

- htmx's model assumes that you send a request to the server and then place the server's response in a single element on the page.
- The problem is that on success, I want to replace the HTML form, but on error, I want to leave the form untouched and show an error below the form.
- htmx's answer is that the server should just re-render the HTML form with all the user's input, but I don't like that as it's re-rendering from scratch something that was already there, and it expands surface area for XSS vulnerabilities.
- I can work around this by writing my own event handlers, but at that point, it feels like I'm fighting the framework a little bit.

#### htmx weakens Content Security Policy (CSP)

- I like CSP as a last line of defense for preventing cross-site scripting (XSS).
- htmx is mostly compatible with CSP, but because htmx does so much, an attacker gaining the ability to write custom HTML is effectively the same as the attacker gaining the ability to write arbitrary JavaScript.
- Examples
  - `<form action=/delete-account" method="post" onload="this.submit()">`
    - CSP will prevent this code from executing.
  - `<form hx-post="/delete-account" hx-trigger="load">`
    - CSP will allow this equivalent code to execute.
- You can still write secure applications using htmx, but it does prevent CSP from being a reliable last line of defense against XSS.

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-

### Requests for help

- Let me know if you have suggestions for a video call platform that meets these criteria:
  - Must: Support up to 10 attendees for 90-minute calls.
  - Must: Cost $80/mo or less.
  - Nice to have: Allows me to record video calls.
