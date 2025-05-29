---
title: "Which New Language Should I Learn for Web Development?"
date: 2025-05-29
---

One of my goals for the year is to learn a new programming language. It's been a while since I learned a new language, and I feel like a lot of the languages I know well (Go, Python, C++) are similar to each other, so I want to try getting out of my comfort zone a bit with a language that feels weird to me.

# Requirements

Here's what I'm looking for:

- It's significantly different from languages I know well
- Web apps are a first-class citizen
- Makes it easy to build small, simple apps
  - I want the opposite of Angular, which feels overly optimized for large projects
- Supports backend and frontend
  - It doesn't have to have a frontend framework, but I want to be able to use the same toolchain for backend and frontend like I can in Go or Python.
  - I don't want to use something like Elm that's frontend-only.
  - I don't want separate build chains for the frontend and backend code (and I'm fine writing vanilla JS with some light backend templating).
- Compatible with SQLite as a data store
- Has good support for unit testing
- Open-source
- Actively-maintained

# Nice-to-haves

- There's a good book or ebook available.
  - Paid products are fine.
- Low abstraction / limited "magic."
  - I find languages like Angular and Vue to be too "magical" in that there's a bunch of Node.js packages in the mix that I don't understand. And starting out, it feels fine, but once I get beyond trivial programs, I realize [the abstractions are leaky](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/), and there are complicated systems under the covers that I don't understand. The other end of the spectrum is Zig, which feels [extremely easy to reason about](/solo-developer-year-7/#zig).
- Static typing

# Non-goals

- Maximum performance
  - Most of the apps I write have tiny performance requirements. Usually, the only user is me, and other times, I don't expect more than a few dozen users simultaneously.
  - I don't want to use something that's slow for a single user, but I want to avoid things that make tradeoffs in the name of achieving high scale.

# How much I enjoy various languages

For reference, here's how much I enjoy working in some other programming languages I know:

| Language   | Rating | My Experience | Notes                                                                                                                                                                        |
| ---------- | ------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Go         | 9      | High          | Go is beautifully designed for web apps.                                                                                                                                     |
| Zig        | 8      | Low           | Very fun for highly efficient or performant code, though not my ideal tool for web apps.                                                                                     |
| Python     | 6      | High          | I've done a lot in Python but the poor packaging and lack of typing has started to bother me.                                                                                |
| JavaScript | 5      | Medium        | I wish there were better packaging / testing tools that didn't depend on node.js.                                                                                            |
| Angular    | 2      | Low           | Way too magical and complex.                                                                                                                                                 |
| Vue        | 4      | Medium        | I loved Vue2 for a while, but I've been burned too many times on my app breaking due to some bug or gotcha in the framework rather than in my code.                          |
| C++        | 4      | Medium        | I haven't written it in a while. It's okay in environments like Google with great tooling support, but I wouldn't enjoy building a C++ dev environment from scratch in 2025. |
| C          | 6      | Low           | Same issues as C++ but I appreciate the simplicity.                                                                                                                          |

# Methodology

To research each language, I'm doing the following:

- Reading the features page for the language
- Reading the features page of the dominant web frameworks for that language
- Looking for examples of simple, "hello world" web apps in each language
- Asking LLMs to compare language features of languages to languages I know

# Candidates

## Elixir / Phoenix / LiveView

Elixir is high on my list because a lot of bloggers I think are smart seem to enjoy it. It also seems to have concepts and features that sound weird and interesting.

I like that Elixir has a very official web framework: Phoenix. I'm not crazy about Phoenix depending on Tailwind CSS by default, though it looks like I can turn that off.

The new thing is Phoenix LiveView, which seems to be a way to create web apps without writing much JavaScript because LiveView uses websockets. But LiveView generates SPAs, and I'm [so tired of SPAs](https://gomakethings.com/spas-were-a-mistake/) and don't want to invest in them anymore. You can use Phoenix without LiveView, but I get the sense that LiveView is where they're investing a lot of their resources.

- Good
  - ✅ Cool language features
  - ✅ Has a compelling solution for web apps
  - ✅ Built on Erlang, so it has access to the Erlang ecosystem
- Bad
  - ❌ No static typing
  - ❌ LiveView is designed for SPAs
  - ❌ LiveView feels "magical"

## Gleam / Lustre

Gleam seems like Elixir's scrappy little brother. It has a lot of language features in common with Elixir like pattern-matching and pipelining, but it has static typing (nice!).

Gleam doesn't support metaprogramming, which I have mixed feelings about. In general, I dislike metaprograming and always feel like I'm not smart enough to do it, so in a way I'm happy Gleam excluded this feature. On the other hand, if my goal is to try something new, maybe I should force myself to try metaprogramming.

Gleam's web framework is called [lustre](https://hexdocs.pm/lustre/index.html), which has you write HTML in the form of Gleam function calls:

```gleam
pub fn main() {
  let app =
    lustre.element(
      html.div([], [
        html.h1([], [html.text("Hello, world!")]),
        html.figure([], [
          html.img([attribute.src("https://cdn2.thecatapi.com/images/b7k.jpg")]),
          html.figcaption([], [html.text("A cat!")])
        ])
      ])
    )
  let assert Ok(_) = lustre.start(app, "#app", Nil)

  Nil
}
```

Honestly, writing HTML like that looks super tedious and ugly, but I'm open to trying it.

Gleam hasn't reached critical mass yet, so there's a risk that the language won't be around in five years, but I guess that's okay. I'm not planning to build a business on Gleam, just play around and learn some new things.

- Good
  - ✅ Cool language features
  - ✅ Built on Erlang, so it has access to the Erlang and Elixir ecosystems
- Bad
  - ❌ Relatively new and immature language
  - ❌ Not many learning resources outside of the official docs

## Haskell

The people I know who enjoy Haskell tend to be extra-smart programming language nerds who love thinking about compiler and language design, which is not me.

The thing that made me most curious about Haskell is Alexis King's ["Parse, don't validate"](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/), which made me appreciate static typing when I'd never cared that much before. I apply Alexis' ideas in Go, but it seems like Haskell lets you express way more with data types, which sounds cool.

Haskell has lots of wacky features that feel like they'll expand my mind like monads, infinite data structures, and algebraic data types, but I also feel like there might be a steep learning curve to becoming productive in the language.

The popular web frameworks seem to be [IHP](https://ihp.digitallyinduced.com/) and [Yesod](https://www.yesodweb.com/). IHP seems to strictly require PostgreSQL, which I dislike, so I guess that leaves Yesod.

Haskell / Yesod feels like the stack I _should_ learn, but it doesn't seem as fun as Elixir or Gleam.

- Good
  - ✅ Rich, mature ecosystem
  - ✅ More powerful type system than any other language I know
  - ✅ Will maybe help me understand Nix
  - ✅ Lots of learning resources available (including for free)
- Bad
  - ❌ Code looks kind of ugly to me, but maybe that's just unfamiliarity
  - ❌ Learning curve seems steep
  - ❌ I'd become a weird Haskell person

## Ruby / Rails

Ruby on Rails is attractive because I know a lot of people love it and feel incredibly productive in it. But looking at the language features, I'm not seeing anything that feels new or innovative coming from Python.

- Good
  - ✅ Rich, mature ecosystem
  - ✅ Designed to scale down well
  - ✅ Lots of people seem to love it
- Bad
  - ❌ No static typing
  - ❌ Ruby looks pretty similar to Python, so I don't know how much I'd learn

## PHP / Laravel

I'll admit that I have an elitist aversion to PHP.

PHP and I had some fun together in college, but when I learned other languages, PHP just felt gross. But I keep hearing people say that PHP has matured a lot and that Laravel makes PHP development a professional experience.

I found it surprisingly difficult to find examples of basic Laravel apps. The Laravel docs don't seem to offer any "hello world" examples. I'm guessing that because part of Laravel's business model is selling video courses, the public, text-based documentation isn't so good.

The closest thing to basic examples I could find were [starter kits](https://laravel.com/docs/12.x/starter-kits), which pull in React (no thanks), Vue (no thanks), or Livewire (don't know it, but it's in bad company). But it looks like Laravel's built-in frontend solution is [Blade Templates](https://laravel.com/docs/12.x/blade), which actually look pretty nice to me, as far as HTML templating languages go.

- Good
  - ✅ Supports static typing
  - ✅ From a first glance, I like Blade templating
- Bad
  - ❌ Language looks gross
  - ❌ I couldn't find good written introductions

## Scala

I hear positive things about Scala, but I browsed around the language, and it feels stuffy and boring.

It seems like the dominant web framework is Play, but reading through the documentation, it feels dated and Enterprise-y. The hello world tutorial starts out with a complicated chart of Play's architecture, which is super boring and does not make me excited to learn the language.

- Good
  - ✅ Interesting features around typing like variance annotations and compound types
- Bad
  - ❌ Scala's object-oriented aspects remind me of the bad parts of C++, though not quite as bad
  - ❌ Seems tightly entwined in the Java ecosystem, which I don't enjoy

# Summary

Gleam feels like the best match for my goals and experience, with Elixir as a close second. Haskell is the language I should learn when I work up the courage and patience.

I plan to experiment a little bit with Gleam + Lustre and Elixir + Phoenix and see which one feels more interesting.
