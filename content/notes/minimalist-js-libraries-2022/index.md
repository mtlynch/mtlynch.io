---
title: "My Search for a Minimalist JavaScript Library in 2022"
date: 2022-07-10T06:50:14-04:00
---

I'm primarily a backend developer, but for the past five years, I've tried to learn frontend development with modern frameworks like Angular, Vue, and React. I got to the point where I felt comfortable enough in Vue to build what I want, but I always felt like I spent more time thinking about the framework

Recently, I tried dropping frameworks entirely and developing web apps using plain JavaScript and Go HTML templates. It's how I wrote [PicoShare](https://github.com/mtlynch/picoshare) and [LogPaste](https://github.com/mtlynch/logpaste).

There's so much leaky abstraction. I don't mind abstraction. Python is an abstraction on top of C on top of assembly, but it abstracts its internals cleanly. My Python apps never barf up an x64 assembly stacktrace, but when I use a frontend framewrok, I'm constantly seeing stacktraces ending in some minified Webpacked node.js code I don't recognize.

## Vanilla JavaScript requires so much boilerplate

The downside of working without a framework is that I end up spending a lot of time on boilerplate code. For example, let's say I have a web form that submits data to a server and displays the result.

<form id="my-form">
  <input type="text" id="name-field" placeholder="Jane Doe" />
  <button id="submit-btn">Submit</button>
</form>
<script>
document.getElementById("my-form").addEventListener("submit", (evt) => evt.preventDefault());
</script>

I have to write HTML like this:

```html
<form id="name-form">
  <input type="text" id="name-field" placeholder="Jane Doe" />
  <button>Submit</button>
</form>
<div id="error-msg" class="error">Placeholder for error from server</div>
```

Okay, that's not so bad. But to hook it up to JavaScript, I have to write a bunch of boilerplatelike this:

```javascript
// For simplicity, assume we have a controller that handles
// POSTing to the backend.
import { postName } from "controllers.js";

const nameForm = document.getElementById("name-form");
const nameField = document.getElementById("name-field");
const errorDiv = document.getElementById("error-msg");

nameForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  errorDiv.style.visibility = "hidden";
  postName(nameField.value)
    .then(() => {
      window.location.href = "/success";
    })
    .catch((error) => {
      errorDiv.innerText = error;
      errorDiv.style.visibility = "visible";
    });
});
```

It's tedious to write because most of the code is just plugging HTML elements to JavaScript code. And there's a lot of copy/paste across pages and components.

Nobody likes writing this boilerplate, and a major selling point of frontend frameworks is that they eliminate this chore for you.

But can I have my cake and eat it, too? Can I eliminate the boilerplate without taking on all the complexity of modern JavaScript frameworks like React and Angular?

## Rewriting the example with my imaginary framework

Let's imagine I could wave a magic wand and a JS library would appear that did exactly what I want. I'd write HTML that would look like this:

```html
<form handle-submit="submitName">
  <input type="text" data-bind="name" placeholder="Jane Doe" />
  <button>Submit</button>
</form>
<div class="error" show-if="serverError" data-bind="serverError">
  Placeholder for error from server
</div>
```

And then the JavaScript would plug into our:

```javascript
import { initComponent } from "imaginaryLibrary.js";
import { postName } from "controllers.js";

initComponent({
  data: {
    name: "",
    serverError: undefined,
  },
  functions: {
    submitName: function () {
      return postName(data.name)
        .then(() => {
          document.location.href = "/success";
        })
        .catch((error) => {
          data.serverError = error;
        });
    },
  },
});
```

If you're familiar with Vue, you'll note the similarity. I don't like how heavyweight Vue is with imposing its SPA style and the whole compilation system that comes with it, but I love the semantics of its single-file components.

## Criteria for my ideal framework

### Supports two-way data binding

### Supports conditional display

### Works per-component

Doesn't take over the whole app and decide how to route pages.

### Does not require compilation

### Compatible with Content Security Policy

## Summary

mini-react

| Library    | Two-way data binding | Conditional Display | Compilation-free | CSP-friendly                      |
| ---------- | -------------------- | ------------------- | ---------------- | --------------------------------- |
| Alpine.js  | ✔️                   | ✔️                  | ✔️               | ❌                                |
| HTMX       | ✔️                   | ✔️                  | ✔️               | Technically yes, practically no\* |
| petite-vue | ✔️                   | ✔️                  | ✔️               | ❌                                |
| Knockout   | ✔️                   | ✔️                  | ✔️               | ❌                                |
| TKO        | ✔️                   | ✔️                  | ✔️               | ❌                                |

\* HTMX can run under CSP but effectively neuters it. If an attacker can control HTML on the page, [they can achieve XSS through HTMX directives](https://htmx.org/docs/#security). You can disable this with `hx-disable`, but the nature of XSS makes it hard for the developer to anticipate which elements are at high risk of attacker-controlled HTML. The more secure way is secure by default while giving the developer the power to give certain elements more permissions to execute JS.

## Minimalist non-libraries

If you hear minimalist JS libraries, there are a few you might feel I'm leaving out. But I'm intentionally leaving out frameworks.

Minimalist frameworks:

- Preact
- Svelte
- Elm
- mithril

They take over control over your app rather than let you layer in enhancements.
