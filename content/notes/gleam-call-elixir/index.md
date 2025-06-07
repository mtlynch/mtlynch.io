---
title: "A Simple Example of Gleam Calling an Elixir Library"
date: 2025-05-31
---

I've been experimenting a bit with Gleam and Elixir lately as part of my search for a new programming language.

One of Gleam's features is that it can call Elixir code and libraries, but I couldn't find any examples of how to do that. So, I wrote a simple example of calling an Elixir library from a Gleam project, based on my knowledge as a beginner to the whole Gleam/Elixir/Erlang ecosystem.

## Install dependencies

For this example, I'm using

- Gleam 1.10.0
- Erlang 27.3.4
- Elixir 1.18.3

You can install these dependencies however you want. I use Nix to manage my dependencies, so I install everything by creating a `flake.nix` as follows.

{{<inline-file filename="flake.nix" language="nix">}}

If I run and running `nix develop`, I see that erlang and Gleam are available in my shell:

```bash
$ nix develop
erlang "27"
gleam 1.10.0
```

## Create the project

I create a project using `gleam new`. I'm not hosting the project on Github, so I'm skipping the Github-specific files Gleam adds by default:

```bash
PROJECT_NAME='call_elixir'
gleam new --name "${PROJECT_NAME}" --skip-github .
```

## Sidequest: Working around a Gleam package bug

From here, I try to run the boilerplate code that `gleam new` generated for me:

```bash
 gleam run
  Resolving versions
Downloading packages
 Downloaded 2 packages in 0.01s
  Compiling gleam_stdlib
error: Incompatible Gleam version

The package `gleeunit` requires a Gleam version satisfying 1.11.0 <= v but you are using v1.10.0.
```

Whops, it didn't work. The issue is that `gleam new` added [`gleeunit`](https://hex.pm/packages/gleeunit) 1.4.0 as a dependency, but that package [depends on Gleam 1.11.0](https://github.com/lpil/gleeunit/blob/v1.4.0/gleam.toml#L7), which is not yet available through Nix packages.

Someone else ran into this same issue and filed a bug on Github [just an hour before I hit this](https://github.com/gleam-lang/gleam/issues/4673#issuecomment-2952936610).

I can work around this by downgrading to gleeunit 1.3.1:

```bash
$ gleam add --dev gleeunit@1.3.1
  Resolving versions
Downloading packages
 Downloaded 1 package in 0.00s
      Added gleeunit v1.3.1
```

And then `gleam run` and `gleam test` work as expected:

```bash
$ gleam run
  Compiling gleeunit
  Compiling call_elixir
   Compiled in 0.28s
    Running call_elixir.main
Hello from call_elixir!
```

```bash
$ gleam test
   Compiled in 0.01s
    Running call_elixir_test.main
.
Finished in 0.006 seconds
1 tests, 0 failures
```

## Install an Elixir package

I want to pick a package that has simple semantics, so how about a CSV library? The hex package manager shows that the most popular CSV package is called [CSV](https://hex.pm/packages/csv), so I install that:

```bash
$ gleam add csv
  Resolving versions
Downloading packages
 Downloaded 1 package in 0.00s
      Added csv v3.2.2
```

Note that there's a Gleam-native CSV library called [gsv](https://hex.pm/packages/gsv), but I'm using the Elixir version for the purposes of demonstration.

## Testing the CSV package with Elixir

First, I need to understand how to call the CSV package APIs at all, and then I can write an Elixir wrapper for the APIs I need.

I want to call the `CSV.encode` function, which has this signature:

```elixir
@spec encode(Enumerable.t(), [encode_options()]) :: Enumerable.t()
```

So, `encode` has two parameters:

1. An object that implements the `Enumerable` protocol.
1. (optional) An [`encode_options()` type](https://hexdocs.pm/csv/3.2.2/CSV.html#t:encode_options/0).

And it returns an object that implements the `Enumerable` protocol.

I don't know Elixir, so I start `iex`, the interactive Elixir shell, to understand the semantics:

```bash
iex
```

Then, I install the CSV package within `iex`:

```elixir
iex> Mix.install([:csv])
Resolving Hex dependencies...
Resolution completed in 0.008s
New:
  csv 3.2.2
* Getting csv (Hex package)
```

Now, I try one of the [examples](https://hexdocs.pm/csv/3.2.2/CSV.html#encode/2-examples) from the CSV package documentation:

```elixir
iex> [~w(a b), ~w(c d)]
[["a", "b"], ["c", "d"]]
iex> |> CSV.encode
#Function<61.117496853/2 in Stream.transform/3>
iex> |> Enum.take(2)
["a,b\r\n", "c,d\r\n"]
```

I don't understand Elixir's sigil syntax yet, and I don't like examples with "a" and "b", so here's a rewrite that feels more intuitive to me:

```elxir
iex(20)> CSV.encode([["movie", "rating"], ["The Godfather", 10], ["Gigli", 2], ]) |> Enum.to_list() |> IO.puts()
movie,rating
The Godfather,10
Gigli,2

:ok
```

Okay, so it looks like `CSV.encode` takes in a list of list of strings and returns an `Enumerable` of strings.

## Create a Gleam wrapper for the Elixir package

Now, I need to write wrapper functions to call it from Gleam.

The main challenge of writing wrappers is that Gleam uses static typing, whereas Elixir uses static typing. The functions in the CSV package don't define explicitly the types of their input parameters or return values, so I have to declare the Gleam equivalent of the Elixir API's types.

### Wrapping `CSV.encode`

I want to call the CSV.encode function, whose signature, again, looks like this:

```elixir
@spec encode(Enumerable.t(), [encode_options()]) :: Enumerable.t()
```

It doesn't look like [the Gleam standard library](https://hexdocs.pm/gleam_stdlib/0.60.0/index.html) has any equivalent of Elixir's `Enumerable`, so I need to use another Elixir API to convert from `Enumerable` to something Gleam understands.

`Enum.to_list` seems like the best option, as it returns an Elixir built-in `list` type, and Gleam has an equivalent [`List` type](https://hexdocs.pm/gleam_stdlib/0.60.0/gleam/list.html).

So, first, I'll define a Gleam wrapper function for the Elixir `CSV.encode` API:

```gleam
@external(erlang, "Elixir.CSV", "encode")
fn csv_encode(data: List(List(String))) -> a
```

The [`@external` attribute](https://tour.gleam.run/everything/#advanced-features-externals) allows me to call Elixir code from Gleam. I define the input paramater as a list of list of strings (`List(List(String)))`.

The actual return type is an Elixir `Enumerable`, but I don't know a Gleam equivalent to that, so I'm using a return type of `a`, which is a generic type variable. It seems to be like Go's like `any` type, though the documentation says [it's not](https://tour.gleam.run/functions/generic-functions/). The name `a` is arbitrary. The code will work if I call it `kitten`, though the convention I've seen in the Gleam docs is to use `a`.

### Converting an Elixir `Enumerable` to a Gleam `List`

Now, I have to convert the return value of `csv_encode` to a Gleam type, so I declare another external function:

```gleam
@external(erlang, "Elixir.Enum", "to_list")
fn enum_to_list(elixir_enum: a) -> List(String)
```

Here, I'm using Elixir's Enum.to_list function to convert the Enumerable to a list, which I know how to represent in Gleam.

Again, the `a` parameter type is the generic type variable, which is just `a` by convention but could have any name (as could `elixir_enum`).

### Creating a Gleam-friendly wrapper

Now that I've written functions that can wrap the Elixir APIs I want, it's time to tie it all together with a function I'll expose to my Gleam app from this module:

```gleam
pub fn encode(data: List(List(String))) -> List(String) {
  data
  |> csv_encode
  |> enum_to_list
}
```
