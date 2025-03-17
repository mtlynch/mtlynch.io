---
title: "No Longer My Favorite Git Commit"
date: 2025-03-19
---

In 2019, David Thompson wrote a popular blog post called, ["My favourite Git commit"](https://dhwthompson.com/2019/my-favourite-git-commit) that celebrates a whimsically detailed commit message his co-worker wrote. I enjoyed that post at the time, and I've sent it to teammates as an example of how to write commit messages well.

I recently decided to write my own explanation of what makes a good commit message, and I went back to Thompson's blog post for inspiration. I was surprised to find that when pressed to explain what was good about Thompson's example, I didn't find it to be a good example of a commit message. The experience reminded me how valuable it is to define my own principles for software development rather than adopting what other people call good.

## The commit in question

Here's the [commit message](https://github.com/alphagov/govuk-puppet/commit/63b36f93bf75a848e2125008aa1e880c5861cf46) that so enamored Thompson, and many others at the time, including me:

> ### Convert template to US-ASCII to fix error
>
> I introduced some tests in a feature branch to match the contents of
> `/etc/nginx/router_routes.conf`. They worked fine when run with `bundle exec
rake spec` or `bundle exec rspec modules/router/spec`. But when run as
> `bundle exec rake` each should block failed with:
>
> ```text
> ArgumentError:
>  invalid byte sequence in US-ASCII
> ```
>
> I eventually found that removing the `.with_content(//)` matchers made the
> errors go away. That there weren't any weird characters in the spec file. And
> that it could be reproduced by requiring Puppet in the same interpreter with:
>
> ```bash
> rake -E 'require "puppet"' spec
> ```
>
> That particular template appears to be the only file in our codebase with an
> identified encoding of `utf-8`. All others are `us-ascii`:
>
> ```bash
> dcarley-MBA:puppet dcarley$ find modules -type f -exec file --mime {} \+ | grep utf
> modules/router/templates/routes.conf.erb:  text/plain; charset=utf-8
> ```
>
> Attempting to convert that file back to US-ASCII identified the offending
> character as something that looked like a whitespace:
>
> ```bash
> dcarley-MBA:puppet dcarley$ iconv -f UTF8 -t US-ASCII modules/router/templates/routes.conf.erb 2>&1 | tail -n5
>   proxy_intercept_errors off;
>
>   # Set proxy timeout to 50 seconds as a quick fix for problems
>   #
> iconv: modules/router/templates/routes.conf.erb:458:3: cannot convert
> ```
>
> After replacing it (by hand) the file identifies as `us-ascii` again:
>
> ```bash
> dcarley-MBA:puppet dcarley$ file --mime modules/router/templates/routes.conf.erb
> modules/router/templates/routes.conf.erb: text/plain; charset=us-ascii
> ```
>
> Now the tests work! One hour of my life I won't get back..

The "punchline" to this commit is that, after sharing this lengthy preamble, Thompson shows the actual diff:

{{<img src="one-char-diff.webp" has-border="true">}}

Yes, the commit message contains six paragraphs and five code snippets, all to describe a one-character whitespace change.

## The commit is good

It's easy to see what's appealing about this commit.

I think it's a good commit message, and I agree with all the reasons Thompson praises it. This is not an attack on Thompson or even the original author. Thompson never claimed it was the "best" commit message, just his favorite, and I support celebrating code that delights you.

I just don't think it's the best or that we should hold it up as an example.

It feels whimsical and delightful that someone went to such lengths to explain their process when 99% of developers would describe the result as "fix whitespace character."

## But it's also bad

### It never explains the problem clearly

The issue is on [line 463](https://github.com/alphagov/govuk-puppet/blob/bfe3f647cc158e04ab6c80bee035d2e832582786/modules/router/templates/routes.conf.erb#L463) of `routes.conf.erb`:

```bash
$ cat modules/router/templates/routes.conf.erb | head -n 463 | tail -n 1
  # where civica QueryPayments calls are taking too long.
```

It's not obvious in the console or the web view what's wrong, but if you use `xxd` to view the raw bytes of the line, you see the issue:

```bash
$ cat modules/router/templates/routes.conf.erb \
  | head -n 463 | tail -n 1 \
  | xxd | head -n 1
00000000: 2020 23c2 a077 6865 7265 2063 6976 6963    #..where civic
                 ^^ ^^
```

If you haven't memorized the US-ASCII and UTF-8 tables, here are the first few characters of that line:

| Byte representation | Text representation                                                           |
| ------------------- | ----------------------------------------------------------------------------- |
| `0x20`              | `' '` (space)                                                                 |
| `0x20`              | `' '` (space)                                                                 |
| `0x23`              | `'#'`                                                                         |
| `0xc2` `0xa0`       | `' '` ([UTF-8 non-breaking space](https://www.compart.com/en/unicode/U+00A0)) |

So, the file had the byte sequence `0xC2 0xA0`, which means it can't be a US-ASCII file, as that byte sequence is not valid US-ASCII. That sequence means that anything consuming the file must treat it as UTF-8, a newer and more internationally-friendly scheme for encoding text.

Digging through the soure history, I find that the UTF-8 character was introduced in [commit 5a8607](https://github.com/alphagov/govuk-puppet/commit/5a86076bd73f0e92558d49a15f4e828860886eca). That commit message doesn't have any clues as to why that one particular space is a UTF-8 character rather than a regular `0x20` space, but

> _the likely origin of the invalid character is somebody using an Apple Ireland/UK keyboard layout where # is Option-3 (AltGr-3), and non-breaking space is Option-Space (AltGr-Space)._
>
> -[messe](https://news.ycombinator.com/item?id=21290159) on Hacker News

### It buries the most important information at the end

### It mentions related code without linking to it

No branch name or commit ID. I can't find it.

## The value of defining your own principles

I've done this before

- Reviewing code for teammates
- Sending out my code for review
- Hiring and working with freelance software developers
- Writing software tutorials

Whenever I do this, it makes me better at the thing I'm writing about. Being forced to think through and defend my principles makes them clearer and more useful.

## My rewrite

I critiqued Thompson's example, so here's what I think a good rewrite looks like.

> ### Convert template to US-ASCII for rake compatibility
>
> #### How I discovered this
>
> I introduced some tests in a feature branch to match the contents of
> `/etc/nginx/router_routes.conf`. They worked fine when run with `bundle exec
rake spec` or `bundle exec rspec modules/router/spec`. But when run as
> `bundle exec rake` each `should` block failed with:
>
> ```text
> ArgumentError:
>  invalid byte sequence in US-ASCII
> ```
>
> I eventually found that removing the `.with_content(//)` matchers made the
> errors go away. That there weren't any weird characters in the spec file. And
> that it could be reproduced by requiring Puppet in the same interpreter with:
>
> ```bash
> rake -E 'require "puppet"' spec
> ```
>
> That particular template appears to be the only file in our codebase with an
> identified encoding of `utf-8`. All others are `us-ascii`:
>
> ```bash
> $ find modules -type f -exec file --mime {} \+ | grep utf
> modules/router/templates/routes.conf.erb:  text/plain; charset=utf-8
> ```
>
> Attempting to convert that file back to US-ASCII identified the offending
> character as something that looked like a whitespace:
>
> ```bash
> $ iconv -f UTF8 -t US-ASCII modules/router/templates/routes.conf.erb 2>&1 \
>    | tail -n5
>
>   proxy_intercept_errors off;
>
>   # Set proxy timeout to 50 seconds as a quick fix for problems
>   #
> iconv: modules/router/templates/routes.conf.erb:458:3: cannot convert
>
> ```
>
> After replacing it (by hand) the file identifies as `us-ascii` again:
>
> ```bash
> $ file --mime modules/router/templates/routes.conf.erb
> modules/router/templates/routes.conf.erb: text/plain; charset=us-ascii
> ```
>
> Now the tests work! One hour of my life I won't get back..

I kept a lot of the original author's content, but I moved it to a "How I found this" section to make it clear to the reader that it's extra-credit reading.

The only significant edit I made was simplifying the terminal prompt from `dcarley-MBA:puppet dcarley $` to just `$`, as the former is mostly noise.

---

_Excerpts from the govuk-puppet project are Copyright Crown Government Digital Service, used under the [MIT License](https://github.com/alphagov/govuk-puppet/blob/main/LICENCE.md)._
