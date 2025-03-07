---
title: "No Longer My Favorite Git Commit"
date: 2025-03-07
---

In 2019, David Thompson wrote a popular blog post called, ["My favourite Git commit"](https://dhwthompson.com/2019/my-favourite-git-commit) where he shows a co-worker's six-paragraph commit message that tells the story of how he made a change that's just a single-character whitespace change.

## The commit in question

Here's the [commit message](https://github.com/alphagov/govuk-puppet/commit/63b36f93bf75a848e2125008aa1e880c5861cf46) that so enamored Thompson, and many others at the time, including me.

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

The "punchline" to this commit message is that this is the diff that it described:

TODO: Show image

Yes, five paragraphs and five code snippets, all to describe a one-character whitespace change.

It's easy to see what's appealing about this commit.

It feels whimsical and delightful that someone went to such lengths to explain their process when 99% of developers would describe the result as "fix whitespace character."

## My issues with the commit message

### It buries the most important information at the end

### It doesn't address the root cause

The change works around an issue, but why, in 2013 couldn't Ruby handle a UTF-8 encoded file? What was going on there?

I read it at the time, and

I recently wrote out my own take about what makes a good commit message. I looked back to Thompson's blog post for inpsiration so I could write about the reasons I liked the commit message he showcased. And I realized I didn't like it so much.

It's not a bad commit. It's certainly better than average. I appreciate the effort that the author put into it, but I no longer think it's an example commit that we should emulate.

I used to think that was an example of a useful commit message, and I still think it's better than average, but reading it today, I think that it forces the reader to read a long story and never quite spells out the actual issue, which is that the file had the byte sequence `0xC2 0xA0`, which is the [UTF-8 representation of a non-breaking space character](https://www.compart.com/en/unicode/U+00A0). But that character was breaking tools that expected the file to have US-ASCII encoding, so the change replaced the UTF-8 space with a standard ASCII space: `0x20`.

## My rewrite

> ### Convert template to US-ASCII to fix error
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

---

_Excerpts from the govuk-puppet project are Copyright Crown Government Digital Service, used under the [MIT License](https://github.com/alphagov/govuk-puppet/blob/main/LICENCE.md)._
