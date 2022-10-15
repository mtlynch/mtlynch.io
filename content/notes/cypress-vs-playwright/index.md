---
title: "On Migrating from Cypress to Playwright"
date: 2022-10-15T00:00:00-04:00
---

Cypress is an open-source tool for performing automated end-to-end tests on web applications. I saw Gleb Bahmutov [demo Cypress at a 2018 web dev meetup](https://youtu.be/wApmbgPGmqQ) in New York, and I was blown away.

I had begrudgingly used [Selenium](https://www.selenium.dev/) in the past, and Cypress was a refreshing leap forward. Cypress had found solutions to tons of pain points that made Selenium impractical to use.

{{<img src="gleb-demo.jpg" caption="I've been using Cypress since I saw it [demoed at a dev meetup](https://youtu.be/wApmbgPGmqQ) in 2018." alt="Screenshot of Cypress live demo" maxWidth="600px">}}

I recently tried Playwright, and after experimenting with it for a day, I'm ready to completely switch over from Cypress.

Playwright presents a similar leap forward from Cypress that I felt when I switched from Selenium four years ago.

It pains me to say it because I have a soft spot for Cypress' small, scrappy team. I'd much rather depend on a tool whose entire company is built around end-to-end testing. I'm certainly not enthusiastic to add a dependency on a huge megacorp like Microsoft, but Playwright is just so much better that I can't justify sticking with Cypress.

What follows are my notes on switching from Cypress to Playwright while they're still fresh in my head.

# My experience with Cypress and Playwright

I've written Cypress end-to-end tests for almost every web app I've built in the last four years. I'd rate myself as an intermediate Cypress user. Most of my Cypress needs are straightforward and use the basic Cypress APIs. I've never written my own custom plugin, but I've used a few third-party ones.

I've used Playwright for only one day. To get my hands dirty with Playwright, I tried porting one of my app's end-to-end test suite from Cypress to Playwright. I chose [PicoShare](https://github.com/mtlynch/picoshare), my minimalist file sharing tool. It has just 10 end-to-end tests. I was able to [port all of them from Cypress to Playwright](https://github.com/mtlynch/picoshare/pull/340) in about five hours of dev time, which includes the time it took to learn Playwright's APIs.

# What I like about Playwright

## Playwright is significantly faster than Cypress

This is just a single data point and not a rigorous one, but I rewrote my Cypress tests in Playwright, and the same tests run about 30% faster in CI and almost 5 times as fast on my local dev machine.

| Task                               | Cypress | Playwright | Difference                      |
| ---------------------------------- | ------- | ---------- | ------------------------------- |
| Run tests on CircleCI              | 127s    | 84s        | <font color="green">-34%</font> |
| Run tests from development machine | 40s     | 7s         | <font color="green">-83%</font> |

For local development, it's not a big deal because you download it once and you're done. But when I run it in CI, I have to wait for CircleCI to download and decompress the full almost 1 GB image each time.

|      | cypress/included:10.9.0 | playwright:v1.26.0-focal-amd64 |
| ---- | ----------------------- | ------------------------------ |
| Size | 940 MB                  | 651 MB                         |

## Playwright exposes a consistent set of assertions

Cypress bundles [nine different third-party libraries](https://docs.cypress.io/guides/references/bundled-libraries) into a standard install, which creates a mishmash of inconsistent APIs. There's `should`, `expect`, and `assert`, and you use different assertion keywords depending on the context you're in.

For example, the following two code snippets perform identical assertions:

```javascript
cy.get("#error-message").should("be.visible");
```

```javascript
cy.get("#error-message").should(($el) => expect($el).to.be.visible);
```

With Playwright, there's a single, consistent API. There's just `expect` like `expect(locator).toBeVisible()`.

## Playwright does not depend on a GUI environment

One of Cypress' most touted features is their desktop GUI app:

{{<img src="cypress-gui.png" alt="Screenshot of Cypress Desktop app" caption="Cypress uses a desktop app to show test execution">}}

The Cypress desktop app lets you "time travel" through your tests, so you can see what the browser window looked like at each point in your test.

But what if you don't develop without a GUI? I do all of my development on headless server VMs. In four years of using Cypress, I've never used the Cypress desktop app. Instead, I run Cypress [within a Docker container](https://mtlynch.io/painless-web-app-testing/).

What if you want to run your Cypress tests in a CI environment? There's generally not a desktop GUI there either. Cypress' answer is to use their paid CI service, which is the primary way they fun development of their testing tool.

I support companies monetizing their open-source product however they want, but Cypress' CI product has never appealed to me. I want to be able to reproduce my CI environment locally with Docker containers. CircleCI lets me do that, but Cypress' CI service doesn't.

To run Cypress on CircleCI, I had to do a bit of [juggling with Docker Compose.](https://mtlynch.io/painless-web-app-testing/). It's not an egregious amount of overhead, but it's makes the testing stack a little more complicated than I'd like.

When I tried Playwright, it was such a breath of fresh air to use a tool that's designed to run headless. I don't have to do anything tricky to run Playwright in CI because it just works out of the box in a headless environment.

If you're running tests locally, Playwright gets a little confused if it can't spawn a browser, but you can just access the URL from another system with SSH port forwarding:

```text
  1 failed
    [chromium] › auth.spec.ts:3:1 › logs in and logs out ===========================================

  Serving HTML report at http://localhost:9323. Press Ctrl+C to quit.
Failed to open browser on http://localhost:9323#?testId=d748ac400d08b85935ef-c357f3797072e53b109f
```

Playwright has the same time-travel feature as Cypress, but they implement it in a web UI instead of a desktop GUI, so it's far more portable.

Time traveling is pretty nice! Playwright's snapshots aren't even just static screenshots of your app. You can interact with the browser in each stage of the test, which feels a bit like magic.

{{<video src="playwright-web-ui.mp4" caption="The Playwright web UI lets you time travel to different states of your app's execution and interact with any element on the page.">}}

## Playwright has fewer gotchas

Cypress has always made it easy to get up and running with basic end-to-end tests. I've found that as my apps grow, I frequently run into feature gaps in Cypress.

For example, I'd add a feature to my app like simple file uploads. Then, I'd go to write an end-to-end test in Cypress, only to find that Cypress doesn't support file uploads, so I need to go find a third-party plugin to test file uploads.

As I was writing this, I discovered that Cypress [added native support for file uploads](https://www.cypress.io/blog/2022/01/19/uploading-files-with-selectfile/) earlier this year, but it's a bit of a headscratcher that [it took them seven years](https://github.com/cypress-io/cypress/issues/170) to support an extremely common scenario.

Similarly, if you want to test behavior with mouse hovering, a feature present in almost every web UI framework, [Cypress can't do it](https://github.com/cypress-io/cypress/issues/10). That bug has been open for almost eight years.

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

And when I needed to write a reusable helper method to automate the login sequence, Playwright let me write it in normal JavaScript, whereas Cypress requires it to be a custom [Cypress command](https://docs.cypress.io/api/cypress-api/custom-commands) that must adhere to specific naming conventions and has its own API.

## Playwright doesn't feel resource-constrained

How few things they've done. I submitted what I think is a pretty uncontroversial PR a year ago that they still haven't acknowledged, and I suspect they just don't have the resources to review external pull requests.

They have bugs that have been open for years. There are features that should obviously be part of app itself, and people have written plugins for them (sometimes their own developers), but the company doesn't have resources to support these features.

Microsoft certainly has a number of unfair advantages here, so I hate to count this against Cypress, but it's hard to ignore the impact that Microsoft's resources have on Playwright's developer experience.

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

### Unexpected text comparison results in Cypress

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

### Unsurprising text comparisons in Playwright

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

One API is for asserting that an element exists "with the given text" whereas the other asserts an element exists "that contains the given text?"

What's the difference between "having" text and "containing" text? It seems like it comes down to if you want to make assertions about an element's child elements, but the documentation could definitely be improved.

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

## Playwright's logging actually works

One of the big pain points of Cypress is that you have to learn to live without debug logging. When I'm debugging a test in Cypress, [there are no tools for printing messages to stdout](https://github.com/cypress-io/cypress/issues/448) to help me understand what's happening in the test.

If I stick in a call to console.log, nothing happens:

```javascript
console.log("hello from Cypress"); // this does nothing
```

Cypress has its own [`cy.log` API](https://docs.cypress.io/api/commands/log), so what if I try that instead?

```javascript
cy.log("hello from Cypress"); // this prints nothing to the terminal
```

Nope, that doesn't work either. That only prints output within the Cypress desktop GUI or Cypress' proprietary SaaS dashboard.

Cypress developer Zach Bloomquist published [an unofficial plugin](https://github.com/flotwig/cypress-log-to-output) for printing browser console output to the terminal, but it's a third-party plugin and not something Cypress officially supports.

In Playwright, `console.log` just works: no fuss, no muss:

```javascript
console.log("hello from Playwright");
```

When I run the test, I see the log message in the terminal output:

```text
[chromium] › auth.spec.ts:3:1 › logs in and logs out
hello from Playwright
```

## Playwright integrates better with VS Code

There's an official VS Code plugin, which gives you auto-complete, which is something I didn't realize I'd been missing from Cypress.

It's also much nicer to work with an API that's a proper set of TypeScript functions. It's helpful to let auto-complete. And because it's TypeScript, you'll catch simple mistakes at compile time rather than in the middle of your tests.

The fact that they're proper TypeScript functions as opposed to string arguments you have to memorize means that auto-complete can help you remember syntax.

## Parallel tests are free in Playwright

In theory, you can run parallel tests for free in Cypress, but they deliberately make it hard. One of the value propositions of Cypress' paid CI dashboard is that it makes parallel tests easy, so Cypress has a financial incentive to add friction to the parallelism feature outside of their paid service.

This advantage is another one I'm sad to point out because Cypress is a small team that has to find ways to fund development, whereas Microsoft has essentially unlimited resources to throw at Playwright to help it succeed, and they don't have to find ways to monetize it. Still, from the perspective of a developer who doesn't want to depend on a particular paid SaaS product to get parallel tests, Playwright has a clear advantage.

# What I miss about Cypress

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

## Cypress has a small, indepdentent team

I like Gleb Bahmutov, and I liked supporting his product. He was very gracious in giving me feedback about my Cypress tutorial, and when I published it, he generously promoted it in Cypress' channels.

## Cypress test artifacts work in CI

When a Cypress test fails, it screenshots your app at the point of failure and saves the image to disk. It's easy to configure your CI platform to keep these images as test artifacts so you can debug test failures easily. Similarly, Cypress lets you save videos of each of your tests that you can also publish as CI test artifacts.

Playwright produces a more complicated set of test artifacts. Playwright generates a small web application that allows you to explore your test results. Unfortunately, the web application [doesn't seem to work in CI](https://github.com/microsoft/playwright/issues/18108). I'm not sure if I'm just missing something, but I've searched through about 40 different CircleCI+Playwright projects on Github, and none of them are successfully storing the full test report in CircleCI.

## Cypress' Docker image actually contains the software

In a pattern I've only ever seen in end-to-end tests, the Docker images for Cypress and Playwright don't actually contain the tools themselves. That is, the Playwright Docker image does not contain Playwright and the Cypress Docker image doesn't contain Cypress. Instead, the Docker images contain the _dependencies_ you need to install Playwright or Docker respectively. So the first step after launching the Playwright Docker image is to install Playwright.

There must be some good reason for this, but I've never understood it. When I [complained about this with Cypress](/painless-web-app-testing/#further-reading), they added a special [cypress/included](https://hub.docker.com/r/cypress/included) image that actually contains Cypress. There doesn't seem to be an equivalent for Playwright.

## In summary

In Playwright, more things seem to work the way I expect. I don't have to find complicated workarounds for regular tasks, and Playwright is easier to get up and running.
