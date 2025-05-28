---
title: "Which New Language Should I Learn for Web Development?"
date: 2025-05-28
---

# Requirements

- Different from what I know
- Web apps are a first-class citizen
- Makes it easy to build small, simple apps
  - Basically the opposite of Angular, which feels designed for large teams
- Supports backend and frontend
  - It doesn't have to have a frontend framework, but I want to be able to use the same toolchain for backend and frontend like I can in Go or Python. I don't want to use something like Elm that's frontend-only.
- Has good support for unit testing
- Open-source
- Actively-maintained

# Nice-to-haves

- There's a good book or ebook available.
- Low abstraction / limited "magic."
  - I find languages like Angular and Vue to be too "magical" in that there's a bunch of Node.js packages in the mix that I don't understand. And starting out, it feels fine, but once I dig into the language, I realize the abstractions are leaky, and I don't understand what the code is doing. The other end of the spectrum is Zig, which feels [extremely easy to reason about](/solo-developer-year-7/#zig).
- Static typing
- Has native testing tools

# How much I enjoy various languages

For reference, here's how much I enjoy working in some other programming languages I know:

| Language   | Rating | Notes                                                                                                                                                       |
| ---------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Go         | 9      | Go is beautifully designed for web apps.                                                                                                                    |
| Zig        | 8      | Very fun for highly efficient or performant code, though not my ideal tool for web apps.                                                                    |
| Python     | 6      | I've done a lot in Python but the poor packaging and lack of typing has started to bother me.                                                               |
| JavaScript | 5      | I wish there were better packaging / testing tools that didn't depend on node.js.                                                                           |
| Angular    | 2      | Way too magical and complex.                                                                                                                                |
| Vue        | 4      | I loved Vue2 for a while, but I've been burned too many times on my app breaking due to some bug or gotcha in the framework rather than in my code.         |
| C++        | 4      | I haven't written it in a while. It's okay in environments like Google with great tooling support, but I wouldn't enjoy dropping into a random C++ project. |
| C          | 6      | Same issues as C++ but I appreciate the simplicity.                                                                                                         |

# Candidates

## Elixir / Phoenix / LiveView

Elixir is high on my list because a lot of bloggers I think are smart seem to enjoy it. It also seems to have concepts and features that are unfamiliar to me.

I like that Elixir has a very official web framework: Phoenix. I'm not crazy about Phoenix depending on Tailwind CSS by default, though it looks like I can turn that off. The new thing is Phoenix LiveView

- Good
  - ✅ Cool language features
- Bad
  - ❌ No static typing

## Gleam / Lustre

It hasn't reached critical mass yet, so there's a risk that the language won't be around in five years, but that's okay. I'm not planning to build a business on Gleam, just play around and learn some new things.

- Bad
  - ❌ Relatively new and immature language
  - ❌ Not many learning resources outside of the official docs

## Ruby / Rails

- Bad
  - ❌ No static typing

## PHP / Laravel

Sounds elitist, but no.

## Haskell

Haskell are like language nerds who love weird compiler features more than building the software.

The popular web frameworks seem to be [IHP](https://ihp.digitallyinduced.com/) and [Yesod](https://www.yesodweb.com/). IHP seems to strictly require PostgreSQL, which I dislike, so I guess it would be Yesod.

- Bad
  - ❌ Code looks really ugly to me, but maybe that's just unfamiliarity

## Scala

It seems like the dominant web framework is Play, but reading through the documentation, it feels dated and Enterprise-y. The [hello world tutorial] starts out with a complicated chart of Play's architecture, which is super boring and does not make me excited to learn the language.

- Bad
  - ❌ Nothing about it seems fun or interesting
  - ❌ Seems tightly entwined in the Java ecosystem, which I don't enjoy.

## Haxe

I came across Haxe in my search, but I couldn't even figure out what it is exactly. It's its own language but also depends on other languages? The closest thing I could find to a "hello world" web app example was [this](https://code.haxe.org/category/javascript/creating-node-server.html) that depends on Node.js, which I don't want to use.

- Bad
  - ❌ Inscrutable what it does
  - ❌ Claims to do games, mobile, desktop, and web, which makes me skeptical it can do any of them well.

# Summary
