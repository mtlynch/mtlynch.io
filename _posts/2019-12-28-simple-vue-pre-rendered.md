---
title: "A Simple Pre-Rendered Web App Using Vue + Nuxt"
excerpt: The easiest way to improve SEO and social sharing for a single-page app.
tags:
- vue
- nuxt
---

In this post, I'll show you how to generate pre-rendered pages using Vue and Nuxt. Vue offers a pleasant developer experience for creating single-page apps (SPAs), but it also limits your ability to enable social sharing or search engine optimization. You can solve that problem with server-side rendering, but that requires you to bring an entire Node server into your stack. With pre-rendering, you control all the tags consumed by search engines and social networks, and you don't need to run a whole server.

## A quick introduction to SPAs

In the last few years, the new hot thing in web development is SPAs. The three most popular frontend frameworks &mdash; Vue, React, and Angular &mdash; all generate SPAs.

Before SPAs, websites had many pages. If you navigated to a site's homepage and clicked the "About Us" button, your browser would request the "About Us" page from the web server. The server would send down the page, and your browser would load a whole new page.

SPAs are called "single-page" because everything on the website happens in a single page. If you click the "About Us" button, the browser doesn't have to fetch a whole new page from the server. Instead, it uses JavaScript to redraw the page to display the "About Us" contents.

There are two huge problems with SPAs: social sharing and search engine optimization.

## SPA problem #1: Social sharing

When the browser receives an SPA from the server, the HTML looks something like this:

```html
<html>
<head>
  <title>My Awesome Website</title>
</head>
<body>
  <div id="app"></div>
  <!-- app.js populates the rest of the page after the browser executes the script. -->
  <script type="text/javascript" src="app.js">
</body>
</html>
```

The page starts out as just an HTML stub, and the JavaScript does the heavy lifting of building the page contents within the browser.

The problem arises when you want to create pretty social sharing cards on Twitter, Facebook, or Pinterest. To do that, your page needs extra HTML `<meta>` tags. Most social sites use the [Open Graph](https://ogp.me/) standard. For example, to specify the image that should appear in social sharing cards, you'd add a tag that looks like this:

```html
<meta property="og:image"
  content="https://mtlynch.io/images/eliminate-distractions/ideal-facebook.jpg">
```

This is where the whole "single-page" aspect of SPAs comes back to bite you. Because every page on your site is now a *single* page, you can't have distinct `<meta>` tags for different pages. You can set `<meta>` tags using JavaScript after the page loads, but it won't help you with any of the major social platforms because they require the HTML tags to be present before any JavaScript runs.

## SPA problem #2: Search engine optimization (SEO)

Unlike social networking sites, search engines do render websites using JavaScript. The problem is that it's impossible for them to do it perfectly. Many websites use JavaScript to continuously update a page's contents while you're viewing it. From Google's perspective, when is a page "done" rendering and ready for indexing?

So, Google and other major search engines do respect SEO-relevant HTML tags, [even if you load them in the browser using JavaScript](https://twitter.com/JohnMu/status/1018956456304037893), but they will always index pre-rendered pages better.

## Why not use server-side rendering (SSR)?

The more common solution to populating these tags server side is to use server-side rendering. The problem is that, to leverage server-side rendering, you need to run a live web server. One of the draws of SPAs in the first place was that they didn't require a server. Who wants to maintain a whole node server just to serve a few pages? They'll render the same way every time, so why not just render them once and serve the result.

Cheaper not to have to run a server.

## How is this different than a regular single-page app (SPA)?

Standard SPAs generate all their HTML in the browser. That doesn't

## Advantages

* Control over tags relevant to social sharing and SEO
* Faster page loads
  * Standard SPAs have to wait until the browser downloads all of its JavaScript before it starts rendering the page.
  * With pre-rendering, users see your page before their browser executes any JavaScript.

## Disadvantages

* More complexity than standard Vue
  * While pre-rendering is less complex than running Nuxt on a Node server, it's more complicated than running a fully client-side Vue app.
  * With pre-rendering, you have to mentally track whether code will run server-side or client-side and what context will be available at the time the code executes.
* No user-generated pages
  * Pre-rendering requires you to know all of your page routes when you build your page. It explicitly [does not support dynamic routes](https://nuxtjs.org/guide/routing#dynamic-routes).
  * If your site features user-generated content and you want, for example, users to have their own URLs after joining (e.g., `yoursite.com/users/michael123`), you can't do that with pre-rendering.
  * You can work around this by pushing some of your route into URL queries (e.g., `yoursite.com/users?id=michael123`) then pulling down the dynamic data client-side, but this means that these pages wouldn't have distinct social sharing tags.

## Pre-requisites

* [Node.js](https://nodejs.org/en/download/)

The only requirement for following this tutorial is that you have Node.js installed. I used [Node v12.13.1](https://nodejs.org/dist/v12.13.1/), which is the latest stable release at the time of this writing.

## A pre-rendered "Hello, world"

To start out, I'll show you a basic, pre-rendered hello world app in just three files:

### `pages/index.vue`

```html
<template>
  <div>
    <h1>Hello, world!</h1>
    <p>I'm an example of a pre-rendered Vue webpage.</p>
    <button v-on:click="count++">I have been clicked {% raw %}{{ count }}{% endraw %} times</button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      count: 0
    };
  }
};
</script>
```

### `package.json`

```javascript
{
  "name": "hello-world-vue-static",
  "dependencies": {
    "nuxt": "latest"
  },
  "scripts": {
    "dev": "nuxt --port 3600",
    "generate": "nuxt generate"
  }
}
```

### `nuxt.config.js`

Lastly, you need a Nuxt configuration file, even if it's empty:

```javascript
// Even though we have no Nuxt settings, this file is required.
```

### Running "Hello, world"

You can run this app [on Codesandbox](https://codesandbox.io/s/mystifying-sutherland-qgw4f):

<iframe
  src="https://codesandbox.io/embed/mystifying-sutherland-qgw4f?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="mystifying-sutherland-qgw4f"
  sandbox="allow-modals allow-forms allow-popups allow-scripts"
></iframe>

Alternatively, you can run the app on your local machine with the following commands:

```bash
git clone https://github.com/mtlynch/hello-world-vue-static.git
cd hello-world-vue-static
git checkout step-1

npm install
npm run dev
```

Your app will be running on [http://localhost:3600](http://localhost:3600).

### Pre-rendering your app

When you run `npm run dev`, you're actually performing server-side rendering. Node runs a local development server and generates pages on-demand as you request them.

But I promised you *pre-rendered* pages. With pre-rendered pages, you don't even need a web server, because it's a set of static files.

To pre-render your app, run the following command:

```bash
npm run generate
```

If you then check the `dist/` folder, you'll see that Nuxt has pre-rendered your page:

```bash
$ find ./dist/ -type f
./dist/.nojekyll
./dist/200.html
./dist/index.html
./dist/_nuxt/7cef7880379068a94897.js
./dist/_nuxt/b10d0692e6306468ee9f.js
./dist/_nuxt/cae55ee8b1125819f113.js
./dist/_nuxt/ee10340617a3beab9da2.js
./dist/_nuxt/LICENSES
```

If you upload these files to a static hosting service, you can access your pre-rendered web app without the need for a Node server. I explain that more below. (TODO: link)

## Adding an About page

To make things more interesting, I'll add a new page to this app that displays information about how Vue and Nuxt render the page:

### `pages/about.vue`

```html
<template>
  <div>
    <h1>About this Build</h1>
    <p v-if="buildTime">
      Nuxt pre-rendered this page at <b>{% raw %}{{ buildTime }}{% endraw %}</b> (before the browser
      ever saw it).
    </p>
    <template v-else>
      <p>
        Vue generated this page client-side because you navigated here from
        another route on the same site.
      </p>
      <p>
        <a href="/about">Refresh the page</a> to see the pre-rendered version.
      </p>
    </template>
    <p>The browser loaded this page at <b>{% raw %}{{ loadTime }}{% endraw %}</b>.</p>
    <p><nuxt-link to="/">Home</nuxt-link></p>
  </div>
</template>

<script>
export default {
  asyncData() {
    // Don't re-evaluate buildTime when the client loads this page in the
    // browser.
    if (!process.client) {
      return {
        buildTime: new Date().toUTCString()
      };
    }
  },
  // Vue evaluates data variables at page render time and again every time the
  // browser loads this page.
  data: function() {
    return {
      loadTime: new Date().toUTCString()
    };
  }
};
</script>
```

## Testing the About page

Here is a [live version](https://hello-world-vue-static.web.app) of the About page:

<iframe
  src="https://hello-world-vue-static.web.app/about"
  style="width:100%; height:230px; border:1px solid black; border-radius: 4px; overflow:hidden;"
  title="About this Build"
  sandbox="allow-scripts"
></iframe>

But try starting from the homepage and clicking the "About" link:

<iframe
  src="https://hello-world-vue-static.web.app"
  style="width:100%; height:230px; border:1px solid black; border-radius: 4px; overflow:hidden;"
  title="About this Build"
  sandbox="allow-scripts"
></iframe>

## Understanding two versions of the About page

The about page demonstrates the way that Nuxt and Vue work together to create a pre-rendered page.

If you navigate directly to the About page, you see a page that looks like this:

TODO: Screenshot

If you start from the home page and then click the "About" link, you see a page that looks like this:

TODO: Screenshot

Why are you seeing two different versions of the page?

The answer is in the asyncData hook. This function runs when Nuxt pre-renders the page and runs again any time the browser navigates to this page from elsewhere on the site.

The first site you visit is pre-rendered. After that, your app behaves like a normal Vue app. When the user navigates to a different page, the app doesn't request a new page from the server. It actually just uses JavaScript to rebuild the DOM to match the new page. But when you load the page, it grabs the pre-rendered version.

## Running the About page locally

To experiment with the About page, run the following commands

```bash
git clone https://github.com/mtlynch/hello-world-vue-static.git
cd hello-world-vue-static

npm install
npm run dev
```

You'll notice that when you navigate to [https://localhost:3600/about](https://localhost:3600/about) the two times will roughly match one another. That's because when you run `npm run dev`, Nuxt is using server-side rendering to create the page just in time. Unlike pre-rendering, which generates the page once and keeps serving that same page, with server-side rendering, Nuxt generates a fresh version of the page each time the user lands on the page. Note that Nuxt only generates the *first* page that the user hits. After that, the app resumes behaving like a Vue SPA.

## Publishing your app

Again, this is a static app, so you don't need to host a Node server to run it. All you need is a host that supports static file hosting. Here are a few of the popular providers:

* [Google Firebase](https://firebase.google.com/docs/hosting/quickstart) (I use this)
* [Netlify](https://www.netlify.com/blog/2016/10/27/a-step-by-step-guide-deploying-a-static-site-or-single-page-app/)
* [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)
* [Google Cloud Storage](https://cloud.google.com/storage/docs/hosting-static-website)

## Source code

All code for this example is available on Github under the [MIT license](https://choosealicense.com/licenses/mit/):

* [hello-world-vue-static](https://github.com/mtlynch/hello-world-vue-static)

## A more feature-rich example

If you're building a real-world app with Vue and Nuxt, you'll want a lot more functionality than just two pre-rendered pages. I created a template project you can use that includes all the boilerplate you need for SEO and social sharing:

* [pre-vue](https://github.com/mtlynch/pre-vue): A template for building pre-rendered web apps with Vue + Nuxt
  * [Live demo](https://pre-vue.web.app/)

It has the following features:

| Feature | Purpose |
|---------|---------|
| Generates a `robots.txt` file | Improves SEO, as it explicitly grants search engines to crawl your site. |
| Generates a sitemap | Improves SEO, as it tells search engines how to crawl your site. |
| Supports unique `<title>` tags and other SEO-relevant `<meta>` tags for each page | Improves SEO, as it guarantees that search engines will index your page properly. |
| Adds unique [Open Graph](https://ogp.me/) tags to each page | If you want each page on your site to display a rich, unique card when you share it on Twitter, Facebook, or Pinterest, you'll need to pre-render Open Graph and other social sharing tags server-side. |
| Adds Google Analytics support | Measure visits to your site. |
| Adds a favicon | Populates icons in browser tabs and shortcuts. |
| Handles 404s | Shows a graceful error page when the user navigates to a non-existent page. |

I used the pre-vue template to rewrite the [Zestful demo site](https://zestfuldata.com/), which was previously an Angular SPA. Within days of converting it to a pre-rendered app, the site [climbed to the first page of Google results](/retrospectives/2019/12/#rewriting-the-zestful-website-out-of-spite).

The [README](https://github.com/mtlynch/pre-vue) explains how to use pre-vue, but I'll publish a detailed blog post explaining the details if there's interest.