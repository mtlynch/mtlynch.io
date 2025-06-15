---
title: "My First Impressions of Gleam"
date: 2025-06-15
---

I'm looking for a new programming language to learn this year, and the one that seems most fun to me is [Gleam](https://gleam.run), an Elixir-like language that supports static typing.

I read the language tour, and it made sense to me, but I can't really understand a programming language until I try to build something with it.

I'm sharing some notes on my first few hours using Gleam in case they're helpful to others learning Gleam or to the team developing the language.

## My background in programming languages

I'm definitely not an expert at language design. I'm sharing things I find unintuitive or difficult to work with, but

Some of my experience is negative, but I don't mean it as an attack on the language; I'm just explaining my thought process. I've been a programmer for 20 years, but I'm not a language design expert.

I've never worked in a langauge that's designed for functional programming. The closest would be JavaScript.

## My project: Parsing old AIM logs

I used AOL Instant Messenger from about 1999 to 2007. For most of that time, I used AIM clients that logged my conversations, but they varied in formats, and most of them are unfriendly to reading.

The simplest AIM logs are the plaintext logs, which look like this:

```text
Session Start (DumbAIMScreenName:Jane): Mon Sep 12 18:44:17 2005
[18:44] Jane: hi
[18:55] Me: hey whats up
Session Close (Jane): Mon Sep 12 18:56:02 2005
```

Every decade or so, I'll try writing a universal AIM log parser to get all of my old logs into a consistent, readable format, but I always get bored and give up partway through. My last attempt was [seven years ago](https://github.com/mtlynch/chat_unifier), when I tried doing it in Python 2.7.

Parsing logs is a great match for Gleam because some parts of the project are easy (e.g., parsing the plaintext logs), so I can do the easy parts while I get the hang of Gleam as a language.

## Wow, this language is small

I don't know if this is a long-term design choice or if it's just small for now because it's an indie-developed language, but it stood out to me quickly that there are fewer built-in features than any language I've worked with in the past.

For example, to iterate over the elements of the list, there's no built-in function, so you have to use [the `gleam/list` module](https://hexdocs.pm/gleam_stdlib/gleam/list.html) in the standard library. Similarly, if a function can fail, it returns a `Result` type, and there are no built-in functions for handling a `Result`, so you have to use the [`gleam/result` module](https://hexdocs.pm/gleam_stdlib/gleam/result.html) to check if the function succeeded.

## The standard library is also small

The language itself feels small, and the standard library is pretty limited as well. There are currently only 19 modules in the Gleam standard library. For comparison, the standard libraries for [Python](https://docs.python.org/3/library/index.html) and [Go](https://pkg.go.dev/std) each have about 250 modules.

So, the first thing I wanted to do was figure out how to parse a command-line argument so I could call my app like `./log-parser ~/logs/aim/plaintext`, but there's no Gleam standard library module for reading command-line arguments. I found [glint](https://hexdocs.pm/glint/), and it felt super complicated for just reading one command-line argument. Then, I realized there's a simpler library called [argv](https://hexdocs.pm/argv/).

I can parse the command-line argument like this:

```gleam
pub fn main() {
  case argv.load().arguments {
    [path] -> io.println("command-line arg is " <> path)
    _ -> io.println("Usage: gleam run <directory_path>")
  }
}
```

```bash
$ gleam run ~/whatever
   Compiled in 0.01s
    Running log_parser.main
command-line arg is /home/mike/whatever
```

Next, I wanted to traverse the directory to find all the log files, and that required a third-party library as well, as the Gleam standard library doesn't have any modules for working with the filesystem.

## What does `gleam build` do?

Gleam build doesn't build anything. Documentation doesn't say what it does.

There's a `build` directory, but it doesn't produce an obvious executable.

```bash
$ rm -rf build && gleam build
Downloading packages
 Downloaded 5 packages in 0.00s
  Compiling argv
  Compiling gleam_stdlib
  Compiling filepath
  Compiling gleeunit
  Compiling simplifile
  Compiling log_parser
   Compiled in 0.52s
```

Okay, compiled what? I was expecting something like `go build` or `zig build` where the build produces an executable to run my app, but I don't see anything like that in the `build` folder:

```bash
 ls -1 build/
dev
gleam-dev-erlang.lock
gleam-dev-javascript.lock
gleam-lsp-erlang.lock
gleam-lsp-javascript.lock
gleam-prod-erlang.lock
gleam-prod-javascript.lock
packages
```

From poking around, I think the executables are under `build/dev/erlang/log_parser/ebin/`:

```bash
$ ls -1 build/dev/erlang/log_parser/ebin/
log_parser.app
log_parser.beam
log_parser@@main.beam
log_parser_test.beam
plaintext_logs.beam
plaintext_logs_test.beam
```

Those appear to be BEAM bytecode, so I can't execute them directly. So, I'll stick to `gleam run` to run my app, but I wish `gleam build` had a better explanation of what it produced and what the developer can do with it.

## Getting used to a functional language

My

- No `if` statements
- No loops
- No `return` keyword

## I love pipelines

Pipe syntax is amazing! I feel like now that I've seen it, I'm going to miss it in every other language. I've used it in bash and always liked it, but it never occurred to me how strange it is that other programming languages never adopted it.

## Error handling ruins pipelines

I find the error handling pretty awkward.

## Labeled arguments with no defaults

```
fn string_split_ignore_error(string: String, substring: String) -> List(String) {
  todo
}
```

## Pipelines are great

## Errors are not

## Functions

Caught me by surprise that there's no `return` keyword. It's just whatever the last line is in the function.
