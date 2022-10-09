---
title: "On Migrating from Cypress to Playwright"
date: 2022-10-02T10:21:05-04:00
---

Cypress is an open-source tool for performing automated end-to-end tests on web applications. I saw Gleb Bahmutov [demo Cypress at a 2018 web dev meetup](https://youtu.be/wApmbgPGmqQ) in New York, and I was blown away. I had begrudgingly used [Selenium](https://www.selenium.dev/) in the past, and Cypress was a refreshing leap forward. Cypress had found solutions to tons of pain points that made Selenium impractical to use.

I recently tried Playwright, and after experimenting with it for a day, I'm ready to completely switch over from Cypress. Playwright presents a similar leap forward from Cypress that I felt when I switched from Selenium four years ago.

It pains me to say it because I have a soft spot for Cypress' small, scrappy team. I'd much rather depend on a team whose entire company is built around end-to-end testing than use an additional tool from Microsoft, but Playwright is just so much better that I can't justify sticking with Cypress.

What follows are the notes on my switch from Cypress to Selenium while they're still fresh in my head.

# My experience with Cypress and Playwright

I've written Cypress end-to-end tests for almost every web app I've built in the last four years. I'd rate myself as an intermediate Cypress user. Most of my Cypress needs are straightforward and use the basic Cypress APIs. I've never written my own custom plugin, but I've used a few third-party ones.

I've used Playwright for only one day. To get my hands dirty with Playwright, I tried porting one of my app's end-to-end test suite from Cypress to Playwright. I chose [PicoShare](https://github.com/mtlynch/picoshare), my minimalist file sharing tool. It has just 10 end-to-end tests. I was able to [port all of them from Cypress to Playwright](https://github.com/mtlynch/picoshare/pull/340) with about five hours of dev time.

# What I like about Playwright

## Playwright is XX faster than Cypress

This is just a single data point and not a rigorous one, but I rewrote my Cypress tests in Playwright, and the same tests run in XX the time.

In development

| Task                               | Cypress | Playwright | Difference |
| ---------------------------------- | ------- | ---------- | ---------- |
| Run tests on CircleCI              | 127s    | 84s        | XX         |
| Run tests from development machine | 40s     | 7s         | XX         |

For local development, it's not a big deal because you download it once and you're done. But when I run it in CI, I have to wait for CircleCI to download and decompress the full almost 1 GB image each time.

|      | cypress/included:10.9.0 | playwright:v1.26.0-focal-amd64 |
| ---- | ----------------------- | ------------------------------ |
| Size | 940 MB                  | 651 MB                         |

## Playwright has fewer gotchas

I didn't even realize until writing this that Cypress [now supports uploading files](https://www.cypress.io/blog/2022/01/19/uploading-files-with-selectfile/) as part of end-to-end tests, but it's another one that's a bit of a headscratcher that they [didn't support it for 7 years](https://github.com/cypress-io/cypress/issues/170).

There's been [a bug to support mouse hovering](https://github.com/cypress-io/cypress/issues/10) that's been open for almost eight years.

## Single, consistent set of assertions

Cypress bundles [nine different third-party libraries](https://docs.cypress.io/guides/references/bundled-libraries) into a standard install, which creates a mishmash of inconsistent APIs. There's `should`, `expect`, and `assert`, and you use different assertion keywords depending on the context you're in.

For example, the following two code snippets perform identical assertions:

```javascript
cy.get("#error-message").should("be.visible");
```

```javascript
cy.get("#error-message").should(($el) => expect($el).to.be.visible);
```

With Playwright, there's a single, consistent API. There's just `expect` like `expect(locator).toBeVisible()`. The fact that they're proper TypeScript functions as opposed to string arguments you have to memorize means that auto-complete can help you remember syntax.

## Text comparisons are easier in Playwright

One aspect of Cypress that's always frustrated me is how difficult it is to assert that an element contains text.

Here's an example `<p>` element from PicoShare:

```html
<p data-test-id="github-instructions">
  Visit our
  <a href="https://github.com/mtlynch/picoshare">Github repo</a> to create your
  own PicoShare server.
</p>
```

### Text assertions in Cypress

Here's the naïve approach to asserting the correct text in Cypress:

```javascript
cy.get("[data-test-id='github-instructions']").should(
  "have.text",
  "Visit our Github repo to create your own PicoShare server."
);
```

Unfortunately, this test will fail:

```text
Timed out retrying after 10000ms
+ expected - actual

-'\n      Visit our\n      Github repo to create\n      your own PicoShare server.\n    '
+'Visit our Github repo to create your own PicoShare server.'
```

Cypress is grabbing the [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent), which includes all the whitespace around the text as it appears in the raw HTML instead of how the text appears in the browser.

You can work around this by grabbing the element's `innerText`, but the syntax is convoluted and difficult to remember because it uses a totally different set of assertion APIs:

```javascript
cy.get("[data-test-id='github-instructions']").should(($el) => {
  expect($el.get(0).innerText).to.eq(
    "Visit our Github repo to create your own PicoShare server."
  );
});
```

### Text assertions in Playwright

In Playwright, the naïve assertion yields the correct behavior:

```javascript
await expect(page.locator("data-test-id=github-instructions")).toHaveText(
  "Visit our Github repo to create your own PicoShare server."
);
```

Playwright also looks at the `textContent` of the element, but it automatically trims and collapses whitespace like a web browser does.

You can force Playwright to look at `innerText` instead with a much simpler syntax than what's available in Cypress:

```javascript
await expect(page.locator("data-test-id=github-instructions")).toHaveText(
  "Visit our Github repo to create your own PicoShare server.",
  { useInnerText: true }
);
```

Playwright loses a few points for having two seemingly identical APIs with similar names:

- [`toHaveText`](https://playwright.dev/docs/test-assertions#locator-assertions-to-have-text): Ensures the Locator points to an element with the given text. You can use regular expressions for the value as well.
- [`toContainText`](https://playwright.dev/docs/test-assertions#locator-assertions-to-contain-text`): Ensures the Locator points to an element that contains the given text. You can use regular expressions for the value as well.

One API is for asserting that an element exists "with the given text" whereas the other asserts an element exists "that contains the given text."

What's the difference between "having" text and "containing" text? It seems like it comes down to if you want to make assertions about an element's child elements, but the documentation could definitely be improved.

## Playwright does not depend on a GUI environment

One of Cypress' most touted features is their desktop GUI app:

{{<img src="cypress-gui.png" alt="Screenshot of Cypress Desktop app" caption="Cypress uses a desktop app to show test execution">}}

The Cypress desktop app lets you "time travel" through your tests, so you can see what the browser window looked like at each point in your test.

But what if you don't develop without a GUI? I do all of my development on headless server VMs. In four years of using Cypress, I've never used the Cypress desktop app. Instead, I run Cypress [within a Docker container](https://mtlynch.io/painless-web-app-testing/).

The GUI problem also pops up when you try to run Cypress on a CI provider. Most CI providers are headless servers, so you can't run the Cypres app there either. But Cypress doesn't really want you to run Cypress sells their own CI provider, and that's how they make their money.

Playwright doesn't have any desktop GUI, so running it under a headless VM works great. All of Playwright's UI is browser based, so it gets a little confused if it can't spawn a browser, but you can just access the URL from another system on the same network:

## Not resource constrained

How few things they've done. I submitted what I think is a pretty uncontroversial PR a year ago that they still haven't acknowledged, and I suspect they just don't have the resources to review external pull requests.

## Stack-agnositicism

One of the things that's always bothered me about Cypress is that it's designed around Node.js apps. It expects to live in the same `package.json` as your main app.

Playwright has built-in support for

The whole reason I wrote a tutorial was that it's complex enough to run Cypress outside of their

## Everything's free

Cypress is funded by their hosted SaaS. But Cypress is one of the few open-source SaaS products where the paid version would actually make my experience worse. The paid version gives you access to the Cypress web dashboard, but that creates a whole new external dependency for me. And I like the setup I have in CircleCI. I don't want to learn another vendor-specific CI.

I'm sad to list this because I know Playwright only does this because Microsoft has unlimited resources to throw at Playwright, so they don't care about making money from it directly, but it makes it much easier to

## Test recordings actually work

For some reason, the tests recordings would 90% of the time get stuck and not record what I want.

## Test ID shortcuts

await page.locator("data-test-id=log-in").click();

## Playwright makes it easier to navigate the shadow DOM

```javascript
cy.get("#upload-result upload-links")
  .shadow()
  .find("#verbose-link-box")
  .shadow()
  .find("#link")
  .should("be.visible");
```

```javascript
await expect(
  page.locator("#upload-result upload-links #verbose-link-box #link")
).toBeVisible();
```

## Playwright starts your app for you

Cypress assumes that your app is already running and lets you figure out how to

https://docs.cypress.io/guides/continuous-integration/introduction#Boot-your-server

## Playwright requires less domain-specific knowledge

A perfect example is grabbing a URL.

[The bug](https://github.com/cypress-io/cypress/issues/1417) has been open for four years, and Cypress recently stated that they currently have no plans to support it.

```javascript
// Find the link to the guest upload URL.
const guestLinkElement = page.locator(
  '.table td[test-data-id="guest-link-label"] a',
  {
    hasText: "For e2e testing",
  }
);
expect(guestLinkElement).toBeVisible();

// Save the route to the guest link URL so that we can return to it later.
const guestLinkRouteValue = await guestLinkElement.getAttribute("href");
expect(guestLinkRouteValue).not.toBeNull();
const guestLinkRoute = String(guestLinkRouteValue);

// Log out.
await page.locator(".navbar-end .navbar-item.is-hoverable").hover();
await page.locator("#navbar-log-out").click();
await expect(page).toHaveURL("/");

// Make sure we can still access the guest link after logging out.
await page.goto(guestLinkRoute);

// Continue with the test.
```

Here's how I would have to do [the same thing in Cypress](https://docs.cypress.io/guides/core-concepts/variables-and-aliases#Closures):

```javascript
// Save the route to the guest link URL so that we can return to it later.
cy.get('.table td[test-data-id="guest-link-label"] a')
  .invoke("attr", "href")
  .then(($href) => {
    // Log out.
    cy.get("#navbar-log-out").click();
    cy.location("pathname").should("eq", "/");

    // Make sure we can still access the guest link after logging out.
    cy.visit($href);

    // Continue with the test
  });
```

In other words, every time I want to store a value, I have to add a layer of nesting. Being able to just `await` the function and store a normal variable is so much easier.

In addition to supporting `await`, it's nice to be able to use `console.log` instead of a [Cypress-specific `cy.log`](https://docs.cypress.io/api/commands/log). And when I needed to write a reusable helper method to automate the login sequence, Playwright let me write it in normal JavaScript, whereas Cypress requires it to be a custom [Cypress command](https://docs.cypress.io/api/cypress-api/custom-commands) that must adhere to specific naming conventions and has its own API.

## VS Code Integration

There's an official VS Code plugin, which gives you auto-complete, which is something I've been missing.

# What I miss about Cypress

## Small, indepdentent team

I like Gleb Bahmutov, and I liked supporting his product. He was very gracious in giving me feedback about my Cypress tutorial, and when I published it, he generously promoted it in Cypress' channels.

## Cypress' syntax is more consistently fluent

Both Cypress and Playwright offer [fluent-style APIs](https://en.wikipedia.org/wiki/Fluent_interface) where you chain together a series of actions into a single statement. Cypress is a bit better about adhering to this style and allowing the developer to read the line left-to-right.

```javascript
cy.get(".navbar-item [data-test-id='log-in']").should("be.visible");
```

With Cypress, the order I write the code matches the order I think about the test. First, I locate the element, then I think about what assertions I want to make about it.

In Playwright, the ordering is a little muddled. Before I start locating the element I want to test, I have to wrap the code in an `expect` call:

```javascript
await expect(
  page.locator(".navbar-item [data-test-id='log-in']")
).toBeVisible();
```

Playwright's syntax interrupts the left-to-right ordering I'm used to from Cypress. I wish Playwright's syntax looked more like this:

```javascript
// INVALID - not how Playwright actually behaves
await page
  .locator(".navbar-item [data-test-id='log-in']")
  .expect()
  .toBeVisible();
```

## Test artifacts work in CI

## The Docker image actually contains the software

There must be some good reason for this since both Cypress and Playwright do this, but the Docker images don't actually contain the software. That is, the Playwright Docker image does not contain Playwright and the Cypress Docker image doesn't contain Cypress. Instead, the Docker images contain the _dependencies_ you need to install Playwright or Docker respectively. So the first step after launching the Playwright Docker image is to install Playwright.

When I complained about this for Cypress, they added a special cypress/included image that actually does contain Cypress.
