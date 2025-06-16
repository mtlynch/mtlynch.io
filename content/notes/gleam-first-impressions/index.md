---
title: "My First Impressions of Gleam"
date: 2025-06-15
---

I'm [looking for a new programming language](/notes/which-new-language/) to learn this year, and the one that seems most fun to me is [Gleam](https://gleam.run), an Elixir-like language that supports static typing.

I read the [language tour](https://tour.gleam.run/), and it made sense to me, but I can't really understand a programming language until I try to build something with it.

I'm sharing some notes on my first few hours using Gleam in case they're helpful to others learning Gleam or to the team developing the language.

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

Parsing logs is a great match for Gleam because some parts of the project are easy (e.g., parsing the plaintext logs), so I can do the easy parts while I get the hang of Gleam as a language. I've also heard that functional languages lend themselves especially well to parsing projects, and I've never understood why that's true, so it's a good opportunity to learn.

## My background in programming languages

I've been a programmer for 20 years, but I'm definitely not an expert at language design. I'm sharing things about Gleam I find unintuitive or difficult to work with, but they're not language critiques, just reactions.

I've never worked in a langauge that's designed for functional programming. The closest would be JavaScript. The languages I know best are Go and Python.

## Wow, this language is small

I don't know if this is a long-term design choice or if it's just small for now because it's an indie-developed language, but the first thing about Gleam that stood out to me is how few built-in features there are.

For example, there's no built-in feature for iterating over the elements of a [`List` type](https://tour.gleam.run/everything/#basics-lists), and the type itself doesn't expose a function to iterate it, so you have to use [the `gleam/list` module](https://hexdocs.pm/gleam_stdlib/gleam/list.html) in the standard library.

Similarly, if a function can fail, it returns a [`Result` type](https://tour.gleam.run/everything/#data-types-results), and there are no built-in functions for handling a `Result`, so you have to use the [`gleam/result` module](https://hexdocs.pm/gleam_stdlib/gleam/result.html) to check if the function succeeded.

## The standard library is also small

In addition to the language feeling small, the standard library feels pretty limited as well. There are currently only 19 modules in [the Gleam standard library](https://hexdocs.pm/gleam_stdlib/). For comparison, the standard libraries for [Python](https://docs.python.org/3/library/index.html) and [Go](https://pkg.go.dev/std) each have about 250 modules.

## Pulling in a third-party package to parse command-line args

So, the first thing I wanted to do was figure out how to parse a command-line argument so I could call my app like this

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

## How do I traverse a directory tree?

Next, I wanted to traverse the directory to find all the log files, and that required a third-party library as well, as the Gleam standard library doesn't have any modules for working with the filesystem.

`simplifile` seems to be the de facto standard for reading the filesystem in Gleam, but it doesn't seem to have a convenient API for traversing a directory tree for files, so I ended up with this (which an LLM mostly wrote for me):

```gleam
import argv
import gleam/int
import gleam/io
import gleam/list
import gleam/result
import simplifile

pub fn collect_files(path: String) -> Result(List(String), simplifile.FileError) {
  use entries <- result.try(simplifile.read_directory(path))

  entries
  |> list.try_fold([], fn(acc, entry) {
    let full_path = path <> "/" <> entry
    use is_dir <- result.try(simplifile.is_directory(full_path))

    case is_dir {
      True -> {
        use nested_files <- result.try(collect_files(full_path))
        Ok(list.append(acc, nested_files))
      }
      False -> Ok([full_path, ..acc])
    }
  })
}

pub fn main() {
  case argv.load().arguments {
    [path] -> {
      case collect_files(path) {
        Ok(files) -> {
          io.println("Files found in '" <> path <> "':")
          io.println("")
          list.each(files, io.println)
          io.println("")
          io.println("Total files: " <> int.to_string(list.length(files)))
        }
        Error(e) -> {
          io.println(
            "Error reading directory '"
            <> path
            <> "': "
            <> simplifile.describe_error(e),
          )
        }
      }
    }
    _ -> {
      io.println("Usage: gleam run <directory_path>")
    }
  }
}
```

And I could run it like this

```bash
$ gleam run ~/logs/aim/plaintext
  Compiling log_parser
   Compiled in 0.22s
    Running log_parser.main
Files found in '/home/mike/logs/aim/plaintext':

/home/mike/logs/aim/plaintext//SmarterChild.log
[...]

Total files: 163
```

Okay, cool. That worked. I feel like the LLM did all the heavy lifting, but it's the kind of rote task I'm not that interested in doing myself.

## What does `gleam build` do?

I got my program to run with `gleam run`, but I was curious if I could compile an executable like `go build` or `zig build` does.

```bash
$ gleam build
   Compiled in 0.01s
```

Hmm, compiled what? I couldn't see a binary anywhere.

The [documentation for `gleam build`](https://gleam.run/command-line-reference/#build) just says "Build the project" but doesn't explain what that means or what the result is.

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

I used an LLM to get the boilerplate directory traversal to work, but I want to write the actual parsers myself to learn the language.

To start, I decided to write a function that does basic parsing.

Eventually, I want to parse all the metadata in the conversation, including names, timestamps, and session information. Just to get up and running, I want to keep it simple. All my function has to do is read an AIM chat log as a string and emit a list of the chat messages as separate strings.

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
.F
Failures:

  1) plaintext_logs_test.parse_simple_plaintext_log_test: module 'plaintext_logs_test'
     Values were not equal
     expected: ["hi", "hey whats up"]
          got: ["fake", "data"]
     output:

Finished in 0.008 seconds
2 tests, 1 failures
```

Cool, that's what I expected. The test is failing because it's returning hardcoded dummy results that don't match my test.

## I love pipelines

I'll take this opportunity to say how much I love Gleam's pipeline syntax. You can see me using it in the test with the `|>` characters:

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

Way less elegant, right?

I feel like now that I've seen it, I'm going to miss it in every other language.

I've used pipelining in bash and always liked it, but it never occurred to me how strange it is that other programming languages never adopted it.

## Getting used to a functional language

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

What do I even do? Split the string into tokens and then do something with that?

Eventually, I realized for a simple implementation, I wanted to just split the string into lines, so I want to do this:

```gleam
pub fn parse(contents: String) -> List(String) {
  string.split(contents, on: "\n")
  todo
}
```

I knew that in order to process the logs line by line, I'd need to call a function like `list.map`, but I had a hard time getting my brain to accept it. I'm so used to doing that in a loop that it feels difficult to recognize the Gleam path forward.

Caught me by surprise that there's no `return` keyword. It's just whatever the last line is in the function.

## Error handling ruins pipelines

I find the error handling pretty awkward. I find myself not wanting to use functions that can fail because they ruin my tidy pipeline. Strangely, `string.split_once` can fail but `string.split` cannot.

## Labeled arguments with no defaults

```gleam
fn string_split_ignore_error(string: String, substring: String) -> List(String) {
  todo
}
```

## Built-in unused symbol detection

I like that the language natively warns about unused functions, variables, and imports. And I like that these are warnings rather than errors. In Go, I get frustrated during development when I temporarily comment something out and then the compiler just refuses to do anything because I have an unused import.
