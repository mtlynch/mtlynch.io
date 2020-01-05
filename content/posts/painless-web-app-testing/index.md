---
title: 'End-to-End Testing Web Apps: The Painless Way'
description: Create an end-to-end test for your web app in under 30 minutes (no software
  installation required).
tags:
- testing
- cypress
- docker
- docker-compose
discuss_urls:
  reddit: https://redd.it/bjhlp1
  hacker_news: https://news.ycombinator.com/item?id=19797185
lastmod: '2019-05-02T19:39:00-04:00'
date: '2019-05-01'
images:
- painless-web-app-testing/cover.jpg
---

{{< img src="cover.jpg" alt="A reusable template for testing web apps (cover image)" maxWidth="1000px" >}}

Okay, I know you're skeptical. Other guides have promised you painless web app tests only to reveal that their solution requires some hyper-specific tech stack or a paid third-party service. I won't do that to you.

This guide provides a straightforward and flexible template for end-to-end tests that you can apply to almost any web app. There are only two requirements:

* Your app can run in Docker.
* Your app is compatible with the Chrome browser.

That's it! You can test a Ruby app, a React app, an Enterprise Java Beans app, or even some wacky web stack you invented. And it doesn't matter if you're developing on Windows, Linux, or Mac. Best of all, you don't have to perform convoluted configuration or install any software beyond Docker.

This tutorial uses free, open-source tools, and you can run them without registering an account anywhere. When it comes time to run your tests in a continuous integration environment like Circle or Travis, you don't need to do anything special &mdash; you'll run your tests with the same one-line command you use on your development machine.

## Cypress, the star of the show

The tool that makes this testing possible is [Cypress](https://cypress.io/), a recent entrant to the field of browser automation. It's an [open-source](https://github.com/cypress-io/cypress) end-to-end testing framework with a [full-time team](https://www.cypress.io/about/#our-team) actively developing it. Their business model is similar to [Docker's](https://www.docker.com/) in that both companies publish free-open source tools and fund development by selling managed services for those tools.

{{< img src="cypress-logo-dark.png" alt="Cypress logo" caption="[Cypress](https://cypress.io) is an open-source tool for automated web app testing." maxWidth="403px" linkUrl="https://cypress.io" >}}

I first discovered Cypress last year after seeing [Gleb Bahmutov](https://glebbahmutov.com/) demonstrate it at a regional software conference. When he mentioned that Cypress had no dependencies on [Selenium](https://www.seleniumhq.org/), I was intrigued. All my previous experience with end-to-end testing was awful, and Selenium was always at the root of my pain.

{{< img src="selenium-logo.png" alt="Selenium logo" caption="Selenium is the oldest and most prevalent browser automation tool, but it's clunky and outdated." maxWidth="200px" linkUrl="https://www.seleniumhq.org" >}}

Selenium is, by far, the most popular browser automation framework, but it also has all of the problems you'd expect of a Java-based tool designed 15 years ago. It's a pain to install, its syntax is awkward, and it offers scant insights when your tests fail. In Gleb's slick demos of Cypress, it promised to address all of these headaches.

{{< img src="cypress-screenshot.png" alt="Cypress logo" caption="One slick feature of Cypress is that it records the browser at every step of your test to help you diagnose failures." maxWidth="650px" >}}

I eagerly read [the Cypress docs](https://docs.cypress.io/guides/getting-started/installing-cypress.html) but was disappointed to learn that virtually all of Cypress' documentation assumed that the user had a [Node.js](https://nodejs.org/en/) stack and developed in a graphical environment rather than a headless console.

Still, Cypress seemed to have a promising future. A year later, I checked in on their progress and discovered [a new sample application](https://github.com/cypress-io/cypress-example-docker-compose) that combined Cypress with Docker Compose. Suddenly, everything clicked. Once I saw Cypress working under Docker Compose, it was clear how to adapt that pattern to any web app. Today, I'm showing you that pattern and how to use it in your apps.

## A reusable pattern for end-to-end tests

Combining Cypress with Docker Compose yields a test pattern that's flexible enough to apply to almost any web app. Unlike other testing tools that make assumptions about your app's implementation, this solution wholly decouples your test framework from the app you're testing.

{{< img src="architecture-diagram.jpg" alt="Diagram of Docker container architecture" caption="How Docker Compose, Cypress, and the web app fit together" maxWidth="800px" >}}

Docker Compose allows you to run Cypress in one container and your app in another. Your app doesn't need to know anything about Cypress, and the only thing Cypress needs to know about your app is the network port to send HTTP requests.

## A simple web app to test

As an example web app to test, I present Sentimentalyzer: the world's dumbest text sentiment analyzer. It tries to guess the user's mood from a sample of their writing.

If you enter the text `It's a nice day today`, Sentimentalyzer deduces that you're happy:

{{< gallery caption="Sentimentalyzer analyzing happy text" >}}
  {{< img src="sentimentalyzer-analyze-content.png" alt="Entering text in Sentimentalyzer" >}}
  {{< img src="sentimentalyzer-results-content.png" alt="Sentimentalyzer produces results" >}}
{{</ gallery >}}

If you enter the text `Who ate ALL MY WAFFLES?`, Sentimentalyzer assumes that you're angry:

{{< gallery caption="Sentimentalyzer analyzing angry text" >}}
  {{< img src="sentimentalyzer-analyze-angry.png" alt="Entering text in Sentimentalyzer" >}}
  {{< img src="sentimentalyzer-results-angry.png" alt="Sentimentalyzer produces results" >}}
{{</ gallery >}}

The algorithm is simple: if more than 50% of the characters are uppercase, the user is yelling, so they must be mad. Otherwise, Sentimentalyzer assumes the user feels okay.

## Project layout

Here's the file layout for [my example project](https://github.com/mtlynch/hello-world-cypress):

```text
main.go               <- source for my web app, Sentimentalyzer
Dockerfile            <- defines how to run Sentimentalyzer in a Docker container
e2e/                  <- folder that contains all the files for my end-to-end tests
  cypress.json        <- Cypress configuration
  docker-compose.yml  <- glue that binds together my app container with the Cypress container
  integration/
    spec.js           <- defines the end-to-end test for Sentimentalyzer
```

All of the production logic is in the root folder, while all the end-to-end testing code is in the `e2e` folder.

## Run Sentimentalyzer locally

I'm deliberately not showing the app's source code here to emphasize the fact that you can write Cypress tests without ever seeing the implementation of the app itself. Sentimentalyzer happens to be a Go app, but the tests would be the same had I implemented it in Python or Angular. If you're curious, the source code is [on Github](https://github.com/mtlynch/hello-world-cypress).

To play with Sentimentalyzer on your machine, run the following commands:

```bash
git clone https://github.com/mtlynch/hello-world-cypress.git
cd hello-world-cypress
docker build --tag sentimentalyzer .
docker run \
  --interactive \
  --tty \
  --env PORT=8123 \
  --publish 8123:8123 \
  sentimentalyzer
```

The above command spawns a Sentimentalyzer server on your local machine at [http://localhost:8123](http://localhost:8123).

Now that I can run my app in a Docker container, I'm ready to use Cypress to create an end-to-end test for it.

## Creating an end-to-end test

To write your first Cypress end-to-end test, you only need three files:

* [`cypress.json`](#cypressjson)
* [`docker-compose.yml`](#docker-composeyml)
* [`integration/spec.js`](#integrationspecjs)

### `cypress.json`

This file specifies Cypress' [configuration options](https://docs.cypress.io/guides/references/configuration.html):

{{< inline-file filename="cypress.json" language="javascript" >}}

These settings aren't terribly interesting, but I set them to `false` to prevent Cypress from auto-generating unnecessary helper files.

### `docker-compose.yml`

This file defines a Docker container for Sentimentalyzer and a Docker container for Cypress and allows them to talk to each other:

{{< inline-file filename="docker-compose.yml" language="yml" >}}

A few lines are worth calling out:

```yml
image: "cypress/included:3.2.0"
```

`cypress/included` is the family of [Cypress Docker images](https://github.com/cypress-io/cypress-docker-images) that have Cypress pre-installed in the image itself. Other families such as `cypress/base` and `cypress/browsers` assume that the client will install Cypress at runtime. By using the `cypress/included` image, I ensure that Cypress executes tests as soon as its container starts up.

```yml
depends_on:
  - sentimentalyzer
```

The `depends_on` stanza ensures that Sentimentalyzer is up and running before Cypress starts executing its tests.

```yml
environment:
  - CYPRESS_baseUrl=http://sentimentalyzer:8123
```

The `CYPRESS_baseUrl` environment variable gives Cypress the URL where it can access Sentimentalyzer. Because Cypress and Sentimentalyzer run in the same Docker Compose configuration, Cypress can send Sentimentalyzer network requests using its container name (`sentimentalyzer`) as a hostname.

```yml
working_dir: /e2e
volumes:
  - ./:/e2e
```

Lastly, I use Docker's [volume mounting feature](https://docs.docker.com/storage/volumes/) so that the Cypress Docker container shares some of the host machine's filesystem.

Everything in the host machine's `./e2e` directory appears in the Docker container under the path `/e2e`. This ensures that when Cypress writes logs, screenshots, or videos during its execution, they're available immediately on the host machine without any manual copy from container to host. Binding the host volume in this way also makes it easy to edit and re-run your tests without having to rebuild your entire Docker image.

The `working_dir` line ensures that Cypress treats the `/e2e` directory as its current folder in the filesystem.

### `integration/spec.js`

Now that the configuration is out of the way, it's time for the fun part: writing tests.

{{< inline-file filename="spec.js" language="javascript" >}}

Even if you're unfamiliar with [the Cypress API](https://docs.cypress.io/api/api/table-of-contents.html), its semantics are readable enough that you probably understand the tests intuitively. In plain English, both tests follow the same sequence:

1. In the browser, navigate to the `/analyze` path in the Sentimentalyzer web app.
1. Find the text field.
1. Enter some text.
1. Submit the form.
1. Read the results.

I'll walk through the first test line by line:

```javascript
cy.visit('/analyze')
```

This line tells Cypress to load the `/analyze` path of Sentimentalyzer in the browser. Cypress combines this with the `CYPRESS_baseUrl` environment variable, which I defined in [`docker-compose.yml`](#docker-composeyml), above, so the full URL is `http://sentimentalyzer:8123/analyze`. You can't access that URL from your development machine, but it's a valid address within the Cypress container.

```javascript
cy.get('#feelings')
  .type('I REALLY need some COFFEE')
```

Next, I tell Cypress to find the text field. This is easy because the text field has a unique ID, `feelings`, so I specify the element using CSS selector syntax: `#feelings`.

{{< img src="feelings-element.png" alt="Finding HTML id of feelings element" maxWidth="710px" >}}

The [`type()` function](https://docs.cypress.io/api/commands/type.html), tells Cypress to type some text into the field I specified.

Next, Cypress has to submit the form. Cypress provides a [`submit()` function](https://docs.cypress.io/api/commands/submit.html) for this common task. There's only one `<form>` element on the page, so it's trivial to retrieve it with the CSS selector of `form` and then to submit the form:

```javascript
cy.get('form').submit()
```

Submitting the form should bring Cypress to Sentimentalyzer's results page. Cypress needs to check for the text `"You are feeling: Angry"` but it's a bit trickier since the `<p>` tag that contains it lacks an ID attribute:

{{< img src="results-element.png" alt="Finding CSS selector for result <p> tag" maxWidth="704px" >}}

I again use CSS selector syntax to locate the relevant text by specifying a `<p>` element under a DOM node whose class is `"results"`:

```javascript
cy.get('.results p')
  .should('contain', 'You are feeling: Angry')
```

The [`contain` assertion](https://docs.cypress.io/guides/references/assertions.html#Chai-jQuery) verifies that the `<p>` tag contains the text I expect.

## Running my tests

Now that everything is in place, it's time to see Cypress in action. I run my tests with a simple command:

```bash
cd e2e
docker-compose up --exit-code-from cypress
```

The `--exit-code-from cypress` flag tells Docker Compose to use the Cypress container's exit code as the exit code for the `docker-compose` command. This means that the command has an exit code of zero when the tests pass and a non-zero exit code on test failure. This behavior is handy for build scripts or continuous integration configurations that use a command's exit code to determine if it succeeded.

Here's what the whole process looks like from the console:

<div style="text-align: center">
  <script id="asciicast-rrgFQhVCcbf3495qZHXtoQsyj" src="https://asciinema.org/a/rrgFQhVCcbf3495qZHXtoQsyj.js" data-speed="1.2" data-cols="122" async></script>
</div>

Cypress creates a video recording of every test run. This is my favorite feature, as it's a tremendous help in diagnosing test failures:

<figure>
  <video style="max-width:100%" controls>
    <source src="spec.js.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>Cypress recording of end-to-end tests (slowed down to 1/4 speed)</figcaption>
</figure>

## Test failure screenshots

Above, I showed you a test that passed. What happens when a Cypress test fails? It still generates a video of the test run, but it also outputs a screenshot showing the assertion that failed:

{{< img src="detects angry sentiment (failed).png" alt="Cypress screenshot output on failure" caption="Screenshot that Cypress generated when my test failed (Cypress expected the word \"Furious\" but instead found \"Angry\")" maxWidth="800px" hasBorder="True" >}}

This solves a major pain point I experienced with other tools. Selenium supports screenshots but only before or after an assertion. That limitation led to frustrating scenarios where Selenium claimed the test failed, but the screenshot showed correct behavior because the browser state changed after the test failed.

Cypress avoids this problem because its screenshots happen concurrently with its assertions. If a test fails, the screenshot shows you precisely what Cypress saw at the time of the failure.

## Adapting this for your web app

Those three files are all you need to start end-to-end testing your web app. Here are the steps:

1. Copy the [`e2e` folder](https://github.com/mtlynch/hello-world-cypress/tree/master/e2e) into your project.
1. Replace the `sentimentalyzer` section in [`docker-compose.yml`](#docker-composeyml) with a Docker container for your app.
1. Rewrite [`integration/spec.js`](#integrationspecjs) based on your app's UI flow.

## Source code and additional examples

The full source for this demo is available on Github:

* [mtlynch/hello-world-cypress](https://github.com/mtlynch/hello-world-cypress)

I also created several branches to demonstrate other common Cypress scenarios:

* [How to run tests on Circle CI](https://github.com/mtlynch/hello-world-cypress/tree/circle)
* [How to run tests on Travis CI](https://github.com/mtlynch/hello-world-cypress/tree/travis)
* [How to run tests in the Chrome browser](https://github.com/mtlynch/hello-world-cypress/tree/chrome)

{{<notice type="info">}}
**Note**: Cypress currently supports only Chrome and Electron as browser options, but cross-browser testing is one of the dev team's [top priorities](https://github.com/cypress-io/cypress/issues/310).
{{< /notice >}}

## Further reading

This guide provided a basic introduction to Cypress. For more advanced functionality, check out the official Cypress docs:

* [Introduction to Cypress](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html)
* [Writing Your First Test](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html)

**Update (2019-05-02)**: In response to this post, the Cypress team published [an official Docker image](https://hub.docker.com/r/cypress/included) that has Cypress pre-installed. I've revised this tutorial to integrate their new image. Check out [the Cypress blog post](https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/) for additional details about their images and more tricks for using Cypress and Docker together.

---

*Illustrations by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/). Thanks to [Gleb Bahmutov](https://glebbahmutov.com/) from the Cypress team for providing early feedback on this article.*