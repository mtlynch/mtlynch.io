---
title: "No Longer My Favorite Git Commit"
date: 2025-03-19
images:
  - no-longer-my-favorite-git-commit/one-char-diff.webp
---

In 2019, David Thompson wrote a popular blog post called, ["My favourite Git commit"](https://dhwthompson.com/2019/my-favourite-git-commit) that celebrates a whimsically detailed commit message his co-worker wrote. I enjoyed that post at the time, and I've sent it to teammates as an example of how to write commit messages well.

I recently decided to write my own explanation of what makes a good commit message, and I went back to Thompson's blog post for inspiration. I was surprised to find that when pressed to explain what was good about Thompson's example, I couldn't do it. I realized the commit message was fun to read as an outside observer but isn't one I think is a good example of software engineering.

The experience reminded me how valuable it is to define my own principles for software development rather than adopting what other people call good.

## The commit in question

Here's the [commit message](https://github.com/alphagov/govuk-puppet/commit/63b36f93bf75a848e2125008aa1e880c5861cf46) that so enamored Thompson and others at the time, including me:

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

## "Favorite" != "best"

I think it's a good commit message, and I agree with all the reasons Thompson praises it. This is not an attack on Thompson or even the original author. Thompson never claimed it was the "best" commit message, just his favorite, and I support celebrating code that delights you.

It's easy to see what's appealing about this commit.

I just don't think it's the best or that we should hold it up as an example.

It feels whimsical and delightful that someone went to such lengths to explain their process when 99% of developers would describe the result as "fix whitespace character."

### It buries the most important information at the end

The biggest shortcoming of the commit is that it buries the most important information.

Imagine that you're working in Thompson's codebase, and you find a bug related to the `routes.conf.erb` file. Digging through the source history, you encounter Thompson's favorite commit. Will you be happy or sad to read its six paragraphs and five code snippets of its commit message?

My answer is: sad.

Commit messages should [present the most important information first](https://refactoringenglish.com/chapters/commit-messages/#put-the-most-important-information-first) and transition to less important information. Journalists call this the inverted pyramid style of writing.

<div style="max-width: 550px; margin-left: auto; margin-right: auto">

<figure>

![An inverted pyramid](inverted-pyramid.svg)

<figcaption><p>Journalists structure news reports in an inverted pyramid, where the information relevant to the most people is at the top.</p></figcaption>

</figure>

</div>

If I'm scrolling through commit messages, I want to find out as early as possible if the commit is relevant to me. I want the commit message to explain a high-level summary of the change as quickly as possible.

### It never quite explains the problem

The commit message is a fun read, but by the end, do you even understand what it does?

Here's the closest it comes to explaining the problem:

> That particular template appears to be the only file in our codebase with an identified encoding of utf-8. All others are us-ascii:
>
> ```bash
> dcarley-MBA:puppet dcarley$ find modules -type f -exec file --mime {} \+ | grep utf
> modules/router/templates/routes.conf.erb:  text/plain; charset=utf-8
> ```

The message says that `routes.conf.erb` seems to have UTF-8 encoding, but why is that? The nice thing about open-source is that I can investigate myself.

The issue is on [line 463](https://github.com/alphagov/govuk-puppet/blob/bfe3f647cc158e04ab6c80bee035d2e832582786/modules/router/templates/routes.conf.erb#L463) of `routes.conf.erb`:

```bash
$ cat modules/router/templates/routes.conf.erb | head -n 463 | tail -n 1
  # where civica QueryPayments calls are taking too long.
```

You can't see the issue with a regular text editor or web browser, but if you dump the raw file bytes with a tool like `xxd`, you see the issue:

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

The codebase was using [Ruby 1.9.3](https://github.com/alphagov/govuk-puppet/blob/63b36f93bf75a848e2125008aa1e880c5861cf46/.ruby-version), which [supported UTF-8 encoding](http://graysoftinc.com/character-encodings/ruby-19s-three-default-encodings), but it defaulted to US-ASCII if the file didn't explicitly declare an encoding.

Digging through the soure history, I find that the UTF-8 character was introduced in [commit 5a8607](https://github.com/alphagov/govuk-puppet/commit/5a86076bd73f0e92558d49a15f4e828860886eca). That commit message doesn't have any clues as to why that particular space is a UTF-8 character rather than a regular `0x20` space, but a Hacker News commenter floated a plausible theory:

> _the likely origin of the invalid character is somebody using an Apple Ireland/UK keyboard layout where # is Option-3 (AltGr-3), and non-breaking space is Option-Space (AltGr-Space)._
>
> -[messe](https://news.ycombinator.com/item?id=21290159) on Hacker News

### It mentions related code without linking to it

The commit message opens with a referene to some external code:

> I introduced some tests in a feature branch to match the contents of
> `/etc/nginx/router_routes.conf`. They worked fine when run with `bundle exec
rake spec` or `bundle exec rspec modules/router/spec`.

But the commit message never names the branch or specifies a commit hash, so the reader has no way to reproduce the author's findings.

No branch name or commit ID. I can't find it.

https://refactoringenglish.com/chapters/commit-messages/#cross-references-to-issues-or-other-changes

## The value of defining your own principles

Again, I write this not to attack Thompson's post or the author's commit but to emphasize the importance of defining your own principles.

I've wrote out my views on several different software engineering practices over the years, and every time I do it, it makes me a better developer:

- [Reviewing code for teammates](/human-code-reviews-1/)
- [Sending out my code for review](/code-review-love/)
- [Writing unit tests](/good-developers-bad-tests/)
- [Hiring and working with freelance software developers](/freelancer-guidelines/)
- [Writing software tutorials](https://refactoringenglish.com/chapters/rules-for-software-tutorials/)

If I have to think through my explanations, it prevents me from relying on things that everyone thinks are true and define for myself what good looks like.

Whenever I do this, it makes me better at the thing I'm writing about. Being forced to think through and defend my principles makes them clearer and more useful.

## My rewrite

I griped enough about Thompson's example and kept saying how I think I have a better way to write it, so I suppose I should walk the walk. Here's my rewrite of Thompson's favorite git commit:

> ### Convert routes.conf.erb template to US-ASCII
>
> `routes.conf.erb` has a stray UTF-8 character that seems to have been introduced by accident in [5a8607](https://github.com/alphagov/govuk-puppet/commit/5a86076bd73f0e92558d49a15f4e828860886eca).
>
> `rake` expect US-ASCII format, so the single UTF-8 character in `routes.conf.erb` causes test failures in `rake`.
>
> This change replaces the UTF-8 character with an equivalent US-ASCII character to prevent test failures in `rake`.
>
> #### The stray UTF-8 character
>
> The issue is on line 463 of `modules/router/templates/routes.conf.erb`:
>
> ```bash
> $ cat modules/router/templates/routes.conf.erb \
>   | head -n 463 | tail -n 1 \
>   | xxd | head -n 1
> 00000000: 2020 23c2 a077 6865 7265 2063 6976 6963    #..where civic
>                  ^^ ^^
> ```
>
> `0xC2 0xA0` is not a valid US-ASCII byte sequence, but it's the [UTF-8 non-breaking space character](https://www.compart.com/en/unicode/U+00A0).
>
> If you view the file in a web browser or a code editor, it will likely look like a normal space character, but it's actually UTF-8, so any tool reading the file expecting US-ASCII encoding will fail.
>
> #### How I discovered this
>
> I introduced some tests in a feature branch to match the contents of
> `/etc/nginx/router_routes.conf` (see [abcd123](#)). They worked fine when I ran them with `bundle exec
rake spec` or `bundle exec rspec modules/router/spec`, but when I ran the tests as
> `bundle exec rake`, each `should` block failed with:
>
> ```text
> ArgumentError:
>  invalid byte sequence in US-ASCII
> ```
>
> I eventually found that removing the `.with_content(//)` matchers made the
> errors go away. I didn't see any weird characters in the spec file. I could be reproduce the error by requiring Puppet in the same interpreter with:
>
> ```bash
> rake -E 'require "puppet"' spec
> ```
>
> That particular template appears to be the only file in our codebase that `file`
> identifies as `utf-8`. All others are `us-ascii`:
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

I kept a lot of the original author's content, but I moved it to a "How I found this" section to make it clear to the reader that it's extra-credit reading. I cleaned up the grammar a bit and [removed passive voice](https://refactoringenglish.com/chapters/passive-voice-considered-harmful/) to reduce ambiguity.

I also simplified the terminal prompt from `dcarley-MBA:puppet dcarley $` to just `$`, as the former is mostly noise.

## Further reading

- ["How to Write Useful Commit Messages"](https://refactoringenglish.com/chapters/commit-messages/) - My more detailed explanation of what I think makes a good commit message.

---

_Excerpts from the govuk-puppet project are Copyright Crown Government Digital Service, used under the [MIT License](https://github.com/alphagov/govuk-puppet/blob/main/LICENCE.md)._
