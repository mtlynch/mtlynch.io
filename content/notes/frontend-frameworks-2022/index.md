---
title: "My Search for a Minimalist Frontend Framework in 2022"
date: 2022-07-10T06:50:14-04:00
---

I'm primarily a backend developer, but for the past five years, I've tried to learn frontend development with modern frameworks like Angular, Vue, and React. I got to the point where I felt comfortable enough in Vue to build what I want, but I always felt like I spent more time thinking about the framework

Recently, I tried dropping frameworks entirely and developing web apps using plain JavaScript and Go HTML templates. It's how I wrote [PicoShare](https://github.com/mtlynch/picoshare) and [LogPaste](https://github.com/mtlynch/logpaste).

There's so much leaky abstraction. I don't mind abstraction. Python is an abstraction on top of C on top of assembly, but it abstracts its internals well. I haven't found any frontend framework that really abstracts away the craziness underneath. When something goes wrong, I'm seeing a JavaScript error 40 layers deep into some framework rather than in code I wrote.

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

Okay, that's not so bad. But then to hook it up to JavaScript, I have to write a bunch of boilerplatelike this:

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

So, it's a lot of boilerplate. Most of the code is just plugging HTML elements to JavaScript code. It's all routeine

And that's just for a form with a single field. Every field I add has to have its own `document.getElementById`.

Nobody likes writing this boilerplate, and a major selling point of frontend frameworks is that they eliminate this chore for you.

## Rewriting the example with my imaginary framework

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
// For simplicity, assume we have a controller that handles
// POSTing to the backend.
import { postName } from "controllers.js";

data = {
  name: "",
  serverError: undefined,
};
functions = {
  submitName() {
    return postName(data.name)
      .then(() => {
        document.location.href = "/success";
      })
      .catch((error) => {
        data.serverError = error;
      });
  },
};
```

## Criteria for my ideal framework

### Supports two-way data binding

### Supports conditional display

### Does not require compilation

### Compatible with Content Security Policy

## Summary

| Framework | Two-way data binding | Conditional Display | Compilation-free | CSP-friendly                      |
| --------- | -------------------- | ------------------- | ---------------- | --------------------------------- |
| Alpine.js | ✔️                   | ✔️                  | ✔️               | ❌                                |
| HTMX      | ✔️                   | ✔️                  | ✔️               | Technically yes, practically no\* |

\* HTMX can run under CSP but effectively neuters it. If an attacker can control HTML on the page, [they can achieve XSS through HTMX directives](https://htmx.org/docs/#security). You can disable this with `hx-disable`, but the nature of XSS makes it hard for the developer to anticipate which elements are at high risk of attacker-controlled HTML. The more secure way is secure by default while giving the developer the power to give certain elements more permissions to execute JS.
