---
title: "My First Impressions of Gleam"
date: 2025-06-22
description: What I've learned in my first few hours using Gleam for a small project.
tags:
  - gleam
  - first-impressions
---

I'm [looking for a new programming language](/notes/which-new-language/) to learn this year, and [Gleam](https://gleam.run) looks like the most fun. It's an Elixir-like language that supports static typing.

I read the [language tour](https://tour.gleam.run/), and it made sense to me, but I need to build something before I can judge a programming language well.

I'm sharing some notes on my first few hours using Gleam in case they're helpful to others learning Gleam or to the team developing the language.

## My project: Parsing old AIM logs

I used AOL Instant Messenger from about 1999 to 2007. For most of that time, I used AIM clients that logged my conversations, but they varied in formats. Most of the log formats are XML or HTML, which make re-reading those logs a pain.

The simplest AIM logs are the plaintext logs, which look like this:

```text
Session Start (DumbAIMScreenName:Jane): Mon Sep 12 18:44:17 2005
[18:44] Jane: hi
[18:55] Me: hey whats up
Session Close (Jane): Mon Sep 12 18:56:02 2005
```

Every decade or so, I try writing a universal AIM log parser to get all of my old logs into a consistent, readable format. Unfortunately, I always get bored and give up partway through. My last attempt was [seven years ago](https://github.com/mtlynch/chat_unifier), when I tried doing it in Python 2.7.

Parsing logs is a great match for Gleam because some parts of the project are easy (e.g., parsing the plaintext logs), so I can do the easy parts while I get the hang of Gleam as a language and gradually build up to the harder log formats and adding a web frontend.

I've also heard that functional languages lend themselves especially well to parsing tasks, and I've never understood why, so it's a good opportunity to learn.

## My background in programming languages

I've been a programmer for 20 years, but I'm no language design connoisseur. I'm sharing things about Gleam I find unintuitive or difficult to work with, but they're not language critiques, just candid reactions.

I've never worked in a langauge that's designed for functional programming. The closest would be JavaScript. The [languages I know best](/notes/which-new-language/#how-much-i-enjoy-various-languages) are Go and Python.

## How do I parse command-line args?

The first thing I wanted to do was figure out how to parse a command-line argument so I could call my app like this:

```bash
./log-parser ~/logs/aim/plaintext
```

But there's no Gleam standard library module for reading command-line arguments. I found [glint](https://hexdocs.pm/glint/), and it felt super complicated for just reading one command-line argument. Then, I realized there's a simpler third-party library called [argv](https://hexdocs.pm/argv/).

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

Cool, easy enough!

## What does `gleam build` do?

I got my program to run with `gleam run`, but I was curious if I could compile an executable like `go build` or `zig build` does.

```bash
$ gleam build
   Compiled in 0.01s
```

Hmm, compiled what? I couldn't see a binary anywhere.

The [documentation for `gleam build`](https://gleam.run/command-line-reference/#build) just says "Build the project" but doesn't explain _what_ it builds or where it stores the build artifact.

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

$ ls -1 build/
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

Those appear to be BEAM bytecode, so I can't execute them directly. I assume I could get run the BEAM VM manually and execute those files somehow, but that doesn't sound appealing.

So, I'll stick to `gleam run` to run my app, but I wish `gleam build` had a better explanation of what it produced and what the developer can do with it.

## Let me implement the simplest possible parser

To start, I decided to write a function that does basic parsing of plaintext logs.

So, I wrote a test with what I wanted.

```gleam
pub fn parse_simple_plaintext_log_test() {
  "
Session Start (DumbAIMScreenName:Jane): Mon Sep 12 18:44:17 2005
[18:44] Jane: hi
[18:55] Me: hey whats up
Session Close (Jane): Mon Sep 12 18:56:02 2005
"
  |> string.trim
  |> plaintext_logs.parse
  |> should.equal(["hi", "hey whats up"])
}
```

Eventually, I want to parse all the metadata in the conversation, including names, timestamps, and session information. But as a first step, all my function has to do is read an AIM chat log as a string and emit a list of the chat messages as separate strings.

That meant my actual function would look like this:

```gleam
pub fn parse(contents: String) -> List(String) {
  // Note: todo is a Gleam language keyword to indicate unfinished code.
  todo
}
```

Just to get it compiling, I add in a dummy implementation:

```gleam
pub fn parse(contents: String) -> List(String) {
  ["fake", "data"]
}
```

And I can test it like this:

```bash
$ gleam test
  Compiling log_parser
warning: Unused variable
  ┌─ /home/mike/code/gleam-log-parser2/src/plaintext_logs.gleam:1:14
  │
1 │ pub fn parse(contents: String) -> List(String) {
  │              ^^^^^^^^^^^^^^^^ This variable is never used

Hint: You can ignore it with an underscore: `_contents`.

   Compiled in 0.22s
    Running log_parser_test.main
F
Failures:

  1) plaintext_logs_test.parse_simple_plaintext_log_test: module 'plaintext_logs_test'
     Values were not equal
     expected: ["hi", "hey whats up"]
          got: ["fake", "data"]
     output:

Finished in 0.008 seconds
1 tests, 1 failures
```

Cool, that's what I expected. The test is failing because it's returning hardcoded dummy results that don't match my test.

## Adjusting my brain to a functional language

Okay, now it's time to implement the parsing for real. I need to implement this function:

```gleam
pub fn parse(contents: String) -> List(String) {
  todo
}
```

At this point, I kind of froze up. It struck me that Gleam excludes so many of the tools I'm used to in other languages:

- There are no `if` statements
- There are no loops
- There's no `return` keyword
- There are no list index accessors
  - e.g., you can't access the n-th element of a `List`

What do I even do? Split the string into tokens and then do something with that?

Eventually, I realized for a simple implementation, I wanted to just split the string into lines, so I want to do this:

```gleam
pub fn parse(contents: String) -> List(String) {
  string.split(contents, on: "\n")
}
```

If I test again, I get this:

```bash
$ gleam test
  Compiling log_parser
   Compiled in 0.21s
    Running log_parser_test.main
F
Failures:

  1) plaintext_logs_test.parse_simple_plaintext_log_test: module 'plaintext_logs_test'
     Values were not equal
     expected: ["hi", "hey whats up"]
          got: ["Session Start (DumbAIMScreenName:Jane): Mon Sep 12 18:44:17 2005", "[18:44] Jane: hi", "[18:55] Me: hey whats up", "Session Close (Jane): Mon Sep 12 18:56:02 2005"]
     output:

Finished in 0.009 seconds
1 tests, 1 failures
```

Okay, now I'm a little closer.

## How do I iterate over a list in a language with no loops?

I turned my logs into a list of lines, but that's where I got stuck again.

I'm so used to `for` loops that my brain kept thinking, "How do I do a `for` loop to iterate over the elements?"

I realized I needed to call [`list.map`](https://hexdocs.pm/gleam_stdlib/gleam/list.html#map). I need to define a function that acts on each element of the list.

```gleam
import gleam/list
import gleam/string

fn parse_line(line: String) -> String {
  case line {
    "Session Start" <> _ -> ""
    "Session Close" <> _ -> ""
    line -> line
  }
}

pub fn parse(contents: String) -> List(String) {
  string.split(contents, on: "\n")
  |> list.map(parse_line)
}
```

This is my first time using pattern matching in any language, and it's neat, though it's still so unfamiliar that I find it hard to recognize when to use it.

Zooming in a bit on the pattern matching, it's here:

```gleam
  case line {
    "Session Start" <> _ -> ""
    "Session Close" <> _ -> ""
    line -> line
  }
```

It evaluates the `line` variable and matches it to one of the subsequent patterns within the braces. If the line starts with `"Session Start"` (the `<>` means the preceding string is a prefix), then Gleam executes the code after the `->`, which in this case is just the empty string. Same for `"Session Close"`.

If the line doesn't match the `"Session Start"` or `"Session Close"` patterns, Gleam executes the last line in the `case` which just matches any string. In that case, it evaluates to the same string. Meaning `"hi"` would evaluate to just `"hi"`.

This is where it struck me how strange it feels to not have a `return` keyword. In every other language I know, you have to explicitly return a value from a function with a `return` keyword, but in Gleam, the return value is just the value from the last line that Gleam executes in the function.

If I run my test, I get this:

```bash
$ gleam test
  Compiling log_parser
   Compiled in 0.22s
    Running log_parser_test.main
F
Failures:

  1) plaintext_logs_test.parse_simple_plaintext_log_test: module 'plaintext_logs_test'
     Values were not equal
     expected: ["hi", "hey whats up"]
          got: ["", "[18:44] Jane: hi", "[18:55] Me: hey whats up", ""]
     output:

Finished in 0.009 seconds
1 tests, 1 failures
```

Again, this is what I expected, and I'm a bit closer to my goal.

I've converted the `"Session Start"` and `"Session End"` lines to empty strings, and the middle two elements of the list are the lines that have AIM messages in them.

The remaining work is:

- Strip out the time and sender parts of the log lines.
- Filter out empty strings.

## Scraping an AIM message from a line

At this point, I have a string like this:

```text
[18:55] Me: hey whats up
```

And I need to extract just the portion after the sender's name to this:

```text
hey whats up
```

My instinct is to use a string split function and split on the `:` character. I see that there's [`string.split`](https://hexdocs.pm/gleam_stdlib/gleam/string.html#split) which returns `List(String)`.

<!-- markdownlint-disable no-space-in-code -->

There's also a [`string.split_once`](https://hexdocs.pm/gleam_stdlib/gleam/string.html#split_once) function, which should work because I can split once on `: ` (note the trailing space after the colon).

<!-- markdownlint-enable no-space-in-code -->

The problem is that `split_once` returns `Result(#(String, String), Nil)`, a type that feels scarier to me. It's a two-tuple wrapped in a `Result`, which means that the function can return an error on failure. It's confusing that `split_once` can fail whereas `split` cannot, so for simplicity, I'll go with `split`.

```gleam
fn parse_line(line: String) -> String {
  case line {
    "Session Start" <> _ -> ""
    "Session Close" <> _ -> ""
    line -> {
      echo string.split(line, on: ": ")
      todo
    }
  }
}
```

If I run my test, I get this:

```bash
$ gleam test
warning: Todo found
   ┌─ /home/mike/code/gleam-log-parser/src/plaintext_logs.gleam:10:7
   │
10 │       todo
   │       ^^^^ This code is incomplete

This code will crash if it is run. Be sure to finish it before
running your program.

Hint: I think its type is `String`.


   Compiled in 0.01s
    Running log_parser_test.main
src/plaintext_logs.gleam:9
["[18:44] Jane", "hi"]
```

Good. That's doing what I want. I'm successfully isolating the `"hi"` part, so now I just have to return it.

## How do I access the last element of a list?

At this point, I feel close to victory. I've converted the line to a list of strings, and I know the string I want is the last element of the list, but how do I grab it?

In most other languages, I'd just say `line_parts[1]`, but Gleam's lists have no accessors by index.

Looking at the `gleam/list` module, I see a [`list.last`](https://hexdocs.pm/gleam_stdlib/gleam/list.html#last) function, so I try that:

```gleam
fn parse_line(line: String) -> String {
  case line {
    "Session Start" <> _ -> ""
    "Session Close" <> _ -> ""
    line -> {
       string.split(line, on: ": ")
       |> list.last
       |> echo
       |> todo
    }
  }
}
```

If I run that, I get:

```bash
$ gleam test
  Compiling log_parser
warning: Todo found
   ┌─ /home/mike/code/gleam-log-parser/src/plaintext_logs.gleam:12:11
   │
12 │        |> todo
   │           ^^^^ This code is incomplete

This code will crash if it is run. Be sure to finish it before
running your program.

Hint: I think its type is `fn(Result(String, Nil)) -> String`.


   Compiled in 0.24s
    Running log_parser_test.main
src/plaintext_logs.gleam:11
Ok("hi")
```

A bit closer! I've extracted the last element of the list to find `"hi"`, but now it's wrapped in a [`Result` type](https://tour.gleam.run/data-types/results/).

I can unwrap it with [`result.unwrap`](https://hexdocs.pm/gleam_stdlib/gleam/result.html#unwrap)

```gleam
fn parse_line(line: String) -> String {
  case line {
    "Session Start" <> _ -> ""
    "Session Close" <> _ -> ""
    line -> {
       string.split(line, on: ": ")
       |> list.last
       |> result.unwrap("")
    }
  }
}
```

Re-running `gleam test` yields:

```bash
$ gleam test
  Compiling log_parser
   Compiled in 0.22s
    Running log_parser_test.main
F
Failures:

  1) plaintext_logs_test.parse_simple_plaintext_log_test: module 'plaintext_logs_test'
     Values were not equal
     expected: ["hi", "hey whats up"]
          got: ["", "hi", "hey whats up", ""]
     output:

Finished in 0.008 seconds
1 tests, 1 failures
```

Great! That did what I wanted. I reduced the messages lines to just the contents of the messages.

## Filtering out empty strings

The only thing that's left is to filter the empty strings out of the list, which is straightforward enough with [`list.filter`](https://hexdocs.pm/gleam_stdlib/gleam/list.html#filter):

```gleam
pub fn parse(contents: String) -> List(String) {
  string.split(contents, on: "\n")
  |> list.map(parse_line)
  |> list.filter(fn(s) { !string.is_empty(s) })
}
```

And I re-run the tests:

```bash
$ gleam test
  Compiling log_parser
   Compiled in 0.22s
    Running log_parser_test.main
.
Finished in 0.007 seconds
1 tests, 0 failures
```

Voilà! The tests now pass!

## Tidying up string splitting

My tests are now passing, so theoretically, I've achieved my initial goal.

I could declare victory and call it a day. Or, I could refactor!

I'll refactor.

I feel somewhat ashamed of my string splitting logic, as it didn't feel like idiomatic Gleam. Can I do it without getting into result unwrapping?

Re-reading it, I realize I can solve it with this newfangled pattern matching thing. I know that the string will split into a list with two elements, so I can create a pattern for a two-element list:

```gleam
fn parse_line(line: String) -> String {
  case line {
    "Session Start" <> _ -> ""
    "Session Close" <> _ -> ""
    line -> {
       case string.split(line, on: ": ") {
          [_, message] -> message
          _ -> ""
       }
    }
  }
}
```

That feels a little more elegant than calling `result.last`.

Can I tidy this up further? I avoided `string.split_once` because the type was too confusing, but it's probably the better option if I expect only one split, so what does that look like?

```gleam
fn parse_line(line: String) -> String {
  case line {
    "Session Start" <> _ -> ""
    "Session Close" <> _ -> ""
    line -> {
       echo string.split_once(line, on: ": ")
       todo
    }
  }
}
```

To inspect the data, I run my test again:

```bash
$ gleam test
[...]
src/plaintext_logs.gleam:9
Ok(#("[18:44] Jane", "hi"))
```

Okay, that doesn't look as scary as I thought. Even though my first instinct is to unwrap the error and access the last element in the tuple (which actually is easy for tuples, just not lists), I know at this point that there's probably a pattern-matchy way. And there is:

```gleam
fn parse_line(line: String) -> String {
  case line {
    "Session Start" <> _ -> ""
    "Session Close" <> _ -> ""
    line -> {
       case string.split_once(line, on: ": ") {
        Ok(#(_, message)) -> message
        _ -> ""
       }
    }
  }
}
```

The `Ok(#(_, message))` pattern will match a successful result from `split_once`, which is a two-tuple of `String` wrapped in an `Ok` result. The other `case` option is the catchall that returns an empty string.

## Getting rid of the empty string hack

One of the compelling features of Gleam for me is its static typing, so it feels hacky that I'm abusing the empty string to represent a lack of message on a particular line. Can I use the type system instead of using empty strings as sentinel values?

The pattern in Gleam for indicating that something might fail but the failure isn't necessarily an error is `Result(<type>, Nil)`, so let me try to rewrite it that way:

```gleam
import gleam/list
import gleam/result
import gleam/string

fn parse_line(line: String) -> Result(String, Nil) {
  case line {
    "Session Start" <> _ -> Error(Nil)
    "Session Close" <> _ -> Error(Nil)
    line -> {
       case string.split_once(line, on: ": ") {
        Ok(#(_, message)) -> Ok(message)
        _ -> Error(Nil)
       }
    }
  }
}

pub fn parse(contents: String) -> List(String) {
  string.split(contents, on: "\n")
  |> list.map(parse_line)
  |> result.values
}
```

Great! I like being more explicit that the lines without messages return `Error(Nil)` rather than an empty string. Also, `result.values` is more succinct for filtering empty lines than the previous `list.filter(fn(s) { !string.is_empty(s) })`.

## Overall reflections

After spending a few hours with Gleam, I'm enjoying it. It pushes me out of my comfort zone the right amount where I feel like I'm learning new ways of thinking about programming but not so much that I'm too overwhelmed to learn anything.

The biggest downside I'm finding with Gleam is that it's a young language with a relatively small team. It [just turned six years old](https://lpil.uk/blog/hello-gleam/), but it looks like the founder was working on it solo [until a year ago](https://github.com/gleam-lang/gleam/graphs/contributors?selectedMetric=additions). There are now a handful of core maintainers, but I don't know if any of them work on Gleam full-time, so the ecosystem is a bit limited. I'm looking ahead to parsing other log formats that are in HTML and XML, and there are Gleam HTML and XML parsers, but they don't seem widely used, so I'm not sure how well they'll work.

### Love: Pipelines

<!-- wordword-next-line-ignore-word: love -->

I love love love Gleam's pipeline syntax. You can see me using it in the test with the `|>` characters:

```gleam
 "..."
  |> string.trim
  |> plaintext_logs.parse
  |> should.equal(["hi", "hey whats up"])
```

The non-pipeline equivalent of the test would look like this:

```gleam
pub fn parse_simple_plaintext_log_test() {
  let input = "..."
  let trimmed = string.trim(input)
  let parsed = plaintext_logs.parse(trimmed)

  should.equal(parsed, ["hi", "hey whats up"])
}
```

It looks like wet garbage by comparison.

Now that I've seen pipelines, they feel so obvious and conspicuously missing in every other programming language I use.

I've enjoyed pipelining in bash, but it never occurred to me how strange it is that other programming languages never adopted it.

### Like: Example-centric documentation

The Gleam documentation is a bit terse, but I like that it's so example-heavy.

I learn best by reading examples, so I appreciate that so much of the Gleam standard library is documented with examples showing simple usage of each API function.

### Like: Built-in unused symbol warnings

I like that the Gleam compiler natively warns about unused functions, variables, and imports. And I like that these are warnings rather than errors.

In Go, I get frustrated during debugging when I temporarily comment something out and then the compiler stubbornly refuses to do anything until I fix the stupid import, which I then have to un-fix when I finish whatever I was debugging.

### Like: `todo` keyword

One of my favorite dumb programming jokes happened at my first programming job about 15 years ago. On a group email thread with several C++ developers, my friend shared a hot tip about C++ development.

He said that if we were ever got fed up with arcane C++ compilation errors, we could just add a special line to our source code, and then even invalid C++ code would compile successfully:

```c++
#pragma always_compile
```

Spoiler alert: it's not a real C++ preprocessor directive.

But I've found myself occasionally wishing languages had something like this when I'm in the middle of development and don't care about whatever bugs the compiler is trying to protect me from.

Gleam's `todo` is almost like a `#pragma always_compile`. Even if your code is invalid, the Gleam compiler just says, "Okay, fine. I'll run it anyway."

You can see this when I was in the middle of implementing `parse_line`:

```gleam
fn parse_line(line: String) -> String {
  case line {
    "Session Start" <> _ -> ""
    "Session Close" <> _ -> ""
    line -> {
      echo string.split(line, on: ": ")
      todo
    }
  }
}
```

If I take out the `todo`, Gleam refuses to run the code at all:

```bash
$ gleam test
  Compiling log_parser
error: Type mismatch
   ┌─ /home/mike/code/gleam-log-parser/src/plaintext_logs.gleam:8:5
   │
 8 │ ╭     line -> {
 9 │ │       echo string.split(line, on: ": ")
10 │ │     }
   │ ╰─────^

This case clause was found to return a different type than the previous
one, but all case clauses must return the same type.

Expected type:

    String

Found type:

    List(String)
```

Right, I'm returning an incorrect type, so why would the compiler cooperate with me?

But adding `todo` lets me run the function anyway, which helps me understand what the code is doing even though I haven't finished implementing it:

```bash
$ gleam test
warning: Todo found
   ┌─ /home/mike/code/gleam-log-parser/src/plaintext_logs.gleam:10:7
   │
10 │       todo
   │       ^^^^ This code is incomplete

This code will crash if it is run. Be sure to finish it before
running your program.

Hint: I think its type is `String`.


  Compiling log_parser
   Compiled in 0.21s
    Running log_parser_test.main
src/plaintext_logs.gleam:9
["[18:44] Jane", "hi"]
F
[...]
Finished in 0.007 seconds
1 tests, 1 failures
```

### Like: Pattern matching

I find pattern matching elegant and concise, though it's the part of Gleam I find hardest to adjust to. It feels so different from procedural style of programming I'm accustomed to in other languages I know.

The downside is that I have a hard time recognizing when pattern matching is the right tool, and I also find pattern matching harder to read. But I think that's just inexperience, and I think with more practice, I'll be able to think in pattern matching.

### Dislike: Error handling

I find Gleam's error handling pretty awkward, especially because errors ruin the beauty of nice, tidy pipelines.

For example, if I had a string processing pipeline like this:

```gleam
string.split(line, on: "-")
|> list.last
|> result.unwrap("") // Ugly!
|> string.uppercase
```

That `result.unwrap` line feels so ugly and out of place to me. I wish the syntax was like this:

```gleam
string.split(line, on: ": ")
|> try list.last
|> string.uppercase
|> Ok
```

Where `try` causes the function to return an error, kind of like [in Zig](https://ziglang.org/documentation/0.14.1/#try).

### Dislike: Small core language

I don't know if this is a long-term design choice or if it's just small for now because it's an indie-developed language, but the first thing about Gleam that stood out to me is how few built-in features there are.

For example, there's no built-in feature for iterating over the elements of a [`List` type](https://tour.gleam.run/everything/#basics-lists), and the type itself doesn't expose a function to iterate it, so you have to use [the `gleam/list` module](https://hexdocs.pm/gleam_stdlib/gleam/list.html) in the standard library.

Similarly, if a function can fail, it returns a [`Result` type](https://tour.gleam.run/everything/#data-types-results), and there are no built-in functions for handling a `Result`, so you have to use the [`gleam/result` module](https://hexdocs.pm/gleam_stdlib/gleam/result.html) to check if the function succeeded.

To me, that functionality feels so core to the language that it would be part of the language itself, not the standard library.

### Dislike: Limited standard library

In addition to the language feeling small, the standard library feels pretty limited as well.

There are currently only 19 modules in [the Gleam standard library](https://hexdocs.pm/gleam_stdlib/). Conspicuously absent are modules for working with the filesystem (the de facto standard seems to be the third-party [simplifile](https://hexdocs.pm/simplifile/) module).

For comparison, the standard libraries for [Python](https://docs.python.org/3/library/index.html) and [Go](https://pkg.go.dev/std) each have about 250 modules. Although, in fairness, those languages have about 1000x the resources as Gleam.

## Source code

The source code for this project is available on Codeberg:

- <https://codeberg.org/mtlynch/gleam-chat-log-parser>

Commit [291e6d](https://codeberg.org/mtlynch/gleam-chat-log-parser/src/commit/291e6d77a0ae00e4962f12253c356568b679aab6) is the version that matches this blog post.

---

_Thanks to [Isaac Harris-Holt](https://www.ihh.dev/) for helpful feedback on this post._
