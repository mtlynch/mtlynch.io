---
title: "My Search for a Minimalist JavaScript Library in 2022"
date: 2022-07-10T06:50:14-04:00
---

I'm primarily a backend developer, but for the past five years, I've tried to learn frontend development with modern frameworks like Angular, Vue, and React. I got to the point where I felt comfortable enough in Vue to build what I want, but I always felt like I spent more time thinking about the framework

Recently, I tried dropping frameworks entirely and developing web apps using plain JavaScript and Go HTML templates. It's how I wrote [PicoShare](https://github.com/mtlynch/picoshare) and [LogPaste](https://github.com/mtlynch/logpaste).

There's so much leaky abstraction. I don't mind abstraction. Python is an abstraction on top of C on top of assembly, but it abstracts its internals cleanly. My Python apps never barf up an x64 assembly stacktrace, but when I use a frontend framewrok, I'm constantly seeing stacktraces ending in some minified Webpacked node.js code I don't recognize.

## Vanilla JavaScript requires so much boilerplate

The downside of working without a framework is that I end up spending a lot of time on boilerplate code.

For example, let's say I have a web form that submits data to a server and displays the result.

<form id="new-user-form">
  <input type="text" id="username-field" placeholder="jane123" />
  <button id="submit-btn">Submit</button>
</form>
<script>
document.getElementById("my-form").addEventListener("submit", (evt) => evt.preventDefault());
</script>

I have to write HTML like this:

```html
<form id="new-user-form">
  <input type="text" id="username-field" placeholder="jane123" />
  <button>Submit</button>
</form>
<div id="error-msg" class="error" style="visibility: hidden">
  Placeholder for error from server
</div>
```

Okay, that's not so bad. But to hook it up to JavaScript, I have to write a bunch of boilerplatelike this:

```javascript
// For simplicity, assume we have a controller that handles
// POSTing to the backend.
import { postName } from "controllers.js";

const newUserForm = document.getElementById("new-user-form");
const usernameField = document.getElementById("username-field");
const errorDiv = document.getElementById("error-msg");

newUserForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  errorDiv.style.visibility = "hidden";
  postName(usernameField.value)
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
  <input type="text" data-bind="username" placeholder="jane123" />
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
    username: "",
    serverError: undefined,
  },
  functions: {
    submitName: function (evt) {
      evt.preventDefault();
      return postName(data.username)
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

| Library                                           | Two-way data binding | Conditional Display | Compilation-free | CSP-friendly                      |
| ------------------------------------------------- | -------------------- | ------------------- | ---------------- | --------------------------------- |
| [Alpine.js](https://alpinejs.dev)                 | ✔️                   | ✔️                  | ✔️               | ❌                                |
| [htmx](https://htmx.org)                          | ✔️                   | ✔️                  | ✔️               | Technically yes, practically no\* |
| [Stimulus](https://stimulus.hotwired.dev)         | ❌                   | ❌                  | ✔️               | ✔️                                |
| [Lit](https://lit.dev)                            |                      |                     |                  |                                   |
| [Mavo](https://mavo.io/)                          |                      |                     |                  |                                   |
| [Mikado](https://github.com/nextapps-de/mikado)   |                      |                     |                  |                                   |
| [petite-vue](https://github.com/vuejs/petite-vue) | ✔️                   | ✔️                  | ✔️               | ❌                                |
| [Knockout](https://knockoutjs.com/)               | ✔️                   | ✔️                  | ✔️               | ❌                                |
| [TKO](https://github.com/knockout/tko)            | ✔️                   | ✔️                  | ✔️               | ❌                                |
| [MobX](https://mobx.js.org)                       | ❌                   | ❌                  | ✔️               | ✔️                                |

\* HTMX can run under CSP but effectively neuters it. If an attacker can control HTML on the page, [they can achieve XSS through HTMX directives](https://htmx.org/docs/#security). You can disable this with `hx-disable`, but the nature of XSS makes it hard for the developer to anticipate which elements are at high risk of attacker-controlled HTML. The more secure way is secure by default while giving the developer the power to give certain elements more permissions to execute JS.

### [Alpine.js](https://alpinejs.dev/)

Very close.

Hard to bridge between application code and existing JS code.

Alpine.js documentation mentions [a CSP-compatible build](https://alpinejs.dev/advanced/csp), but it [doesn't actually exist yet](https://github.com/alpinejs/alpine/issues/237#issuecomment-999692410). No progress for years.

### [htmx](https://htmx.org/)

TODO

### [Stimulus](https://stimulus.hotwired.dev)

I got really excited about Stimulus because it initially seemed like exactly what I wanted. Its tagline is "A modest JavaScript framework for the HTML you already have." Great! It doesn't require compilation, and it plays nicely with CSP.

But then I tried developing with Stimulus, and it's basically the worst of both worlds. It's an extra layer of complexity, but you still have to write a lot of boilerplate to connect everything together.

Here's my dummy example from above rewritten for Stimulus:

```html
<div data-controller="new-user">
  <form data-action="submit->new-user#addUser">
    <input type="text" data-new-user-target="username" placeholder="Jane Doe" />
    <button>Submit</button>
  </form>
  <div class="error" data-new-user-target="error" style="visibility: hidden">
    Placeholder for error from server
  </div>
</div>
```

```javascript
import {
  Application,
  Controller,
} from "/third-party/stimulus@3.0.1/stimulus.js";
import { postName } from "controllers.js";

window.Stimulus = Application.start();

Stimulus.register(
  "new-user",
  class extends Controller {
    static targets = ["username", "error"];

    addUser(evt) {
      evt.preventDefault();
      this.errorTarget.style.visibility = "hidden";
      return postName(this.usernameTarget.value)
        .then(() => {
          document.location.href = "/success";
        })
        .catch((error) => {
          data.serverError = error;
          this.errorTarget.style.visibility = "visible";
          this.errorTarget.innerText = error;
        });
    }
  }
);
```

So, it saves a lot of boilerplate, but it requires a lot of other boilerplate. The Stimulus version's HTML and JavaScript are both longer than the vanilla JS.

Stimulus forces me to name things that you otherwise wouldn't name. I want the form to affect the error element below it, but then I have to name that set of elements to form the "controller." What do I call it? `form`? That's confusing because it's not the `<form>` element. I just called it `new-user`.

And then strangely, you have to repeat that `new-user` name throughout the child elements. For example, when I want to bind the input field to the `name` variable in the controller, I have to specify it as `data-new-user-target="name"` instead of just `data-target="name"`.

I also found it confusing that its symbolic names don't match the HTML. For example, declaring `static targets = ["username"]` causes Stimulus to create a member property named `this.usernameTarget` instead of just `this.username`.

The target semantics binds a name to an element, but I actually want to bind to an element's contents or attributes. In other words, instead of binding the whole `username` input tag to the name `this.usernameTarget`, I wish I could have a variable just for the input element's value so that I don't have to traverse the element's properties to access the data I care about.

So, Stimulus is interesting, but it's not a match for what I want.

### [Knockout](https://knockoutjs.com/)

I'd never heard of knockout until I started researching libraries for this post. Apparently it was big for a brief period in the early 2010s and then was quickly crowded out by Angular, React, and friends.

If SPAs are where I feel it all went wrong, maybe the popular thing just before SPAs would be a match. Sadly, Knockout [doesn't work with CSP](https://github.com/knockout/knockout/issues/903).

### [TKO](https://github.com/knockout/tko)

I'm not sure exactly what the state of TKO is. It's either a spiritual successor to Knockout, or it's just the next major version.

Supposedly, it's [CSP-compatible](https://github.com/knockout/knockout/issues/903#issuecomment-301468183), but it doesn't have a production release. Its [first alpha](https://github.com/knockout/tko/releases/tag/v4.0.0-alpha1) was almost six years ago. Still, there's activity. They just had a [beta release](https://github.com/knockout/tko/releases/tag/v4.0.0-beta1.3) in May 2022, so maybe it's due for a rebirth.

#### [Lit](https://lit.dev)

https://news.ycombinator.com/item?id=34825676#34828992

#### [Mavo](https://mavo.io/)

Seems like maybe is an academic research project?

### [Mikado](https://github.com/nextapps-de/mikado)

Found from this [heavily downvoted HN comment](https://news.ycombinator.com/item?id=34366942)

### [petite-vue](https://github.com/vuejs/petite-vue)

TODO

### [MobX](https://mobx.js.org)

MobX is a lower-level library than the others. It seems designed primarily to combine with React, so it doesn't handle

## Minimalist non-libraries

If you hear minimalist JS libraries, there are a few you might feel I'm leaving out. But I'm intentionally leaving out frameworks.

Minimalist frameworks:

- Preact
- Svelte
- Elm
- mithril

They take over control over your app rather than let you layer in enhancements.
