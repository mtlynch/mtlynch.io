---
title: "Is It Keto: Month 12"
date: 2020-06-01T00:00:00-04:00
description: TODO - One-line summary
---

## Highlights

*

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Add 100 new articles to Is It Keto

* **Result**: XX
* **Grade**: XX

TODO

### Publish one new blog post

* **Result**: XX
* **Grade**: XX

TODO

## Stats

### [Is It Keto](https://isitketo.org)

## Doing more with my audience

>**Me**: Really? I thought that was small potatoes.

>**Justin**: Once you do that, you can make direct partnerships and affiliate deals with other keto businesses.<br>
**Me**: Why wouldn't I do that now?<br>
**Justin**: Good question. Why **wouldn't** you do that now?

## Web performance is harder than I thought

I found [this article](https://www.codegram.com/blog/improving-a-gridsome-website-performance/) helpful.

Everyone talks about using [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) to look for large components in your JS bundle, but I felt crazy because I couldn't find any instructions for how to actually use it. All the instructions are like, "Okay, install with npm or yarn and then view your bundle sizes!" If you're confused like me, the answer is that after you install webpack-bundle-analyzer, the next time you build your app in node, you'll see a console line that shows you. If you 

| Change | Performance impact |
|--------|--------------------|
| Load Bootstrap-Vue components [a la carte](https://bootstrap-vue.org/docs#individual-components-and-directives) instead of importing all of Bootstrap-Vue and Bootstrap-Vue-Icons | High |
| Filter my Gridsome data [at the graphql layer](https://gridsome.org/docs/filtering-data/) rather than at the Vue layer to reduce the size of static JSON files | High |
| Undid [this hack](https://dev.to/jeremyjackson89/gridsome-g-images-with-dynamic-paths-1mgn) for loading images in Gridsome with dynamic paths | Medium |
| Import Google Fonts using a `<link rel>` tag instead of a CSS `@import` | Low |
| Tune the Google Fonts URL to download only the fonts I need | Low |
| Add [`preconnect` and `dns-prefetch` for Google Fonts](https://www.smashingmagazine.com/2019/06/optimizing-google-fonts-performance/) in the HTML `<head>` | Low |
| [Add `?display=swap`](https://fontsplugin.com/google-fonts-font-display-swap/) to my Google Fonts import URL to prevent "Flash of Invisible Text" | Low |

Even with 

Vue 3 is supposed to improve performance a lot because it supports tree shaking, meaning that it will prevent webpack from bundling up extraneous JavaScript code that your app never uses. Gridsome claims that [their 1.0 release will be Vue 3 compatible](https://twitter.com/gridsome/status/1265742280805285896), but they seem so constrained by development resources that I'm worried that it could be years before they get to version 1.0.

## Raspberry Pi as a virtual keyboard and monitor

TODO: Show keyboard demo

I'm considering selling them as kits for around $180. If you're interested in one, sign up for my list here:

TODO: Keyboard mailing list

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Zestful](https://zestfuldata.com)

For some reason, Zestful got a burst of interest in May. Three customers requested Enterprise pricing. I think only one of those clients is likely to sign up, so we'll see where that goes.

### [What Got Done](https://whatgotdone.com)

What Got Done is my weekly work journaling app. I tried to build it into a business last year but relegated it to "hobby project" status after it [failed to gain traction](/retrospectives/2019/08/). I still use it regularly myself, and I sometimes add features on weekends or evenings.

## Wrap up

### What got done?

*

### Lessons learned

* Pre-rendered Vue sites still pay a huge performance penalty
* Good to have a fresh set of eyes on something

### Goals for next month

* Validate ideas for a sister product to Is It Keto