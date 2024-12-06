---
title: Sia-Minio Integration Postmortem
tags:
  - siacoin
  - cryptocurrency
  - sia
description: An analysis of how Nebulous Labs can improve its bounty program for Sia
date: "2017-12-01"
images:
  - sia-minio-postmortem/minio-postmortem.png
---

One of the best things I learned from working at Google is the practice of [blame-free postmortems](https://landing.google.com/sre/book/chapters/postmortem-culture.html). When something goes wrong, you wait until the dust settles, then write a report analyzing what happened. The report explains how the problem occurred and defines concrete steps the team can take to mitigate the problem in the future.

I saw a good opportunity for a postmortem last week. Work officially completed on a [bounty-funded project](https://github.com/NebulousLabs/Sia/issues/2155) to integrate Sia support into Minio, but it took several months longer than expected and went through multiple large-scale rewrites.

[Sia](https://sia.tech/) is a decentralized cloud storage technology. I've [written about it before](/tags/sia), as it's one of my favorite technologies. [Minio](https://minio.io/) is an open-source S3-compatible file server. The integration between the two means that users can now back data up to the Sia network using any backup software compatible with Amazon S3.

This integration is a Big Deal, and I'm planning to write a lot more about once the software stablizes following Sia's December release. In the meantime, I saw a valuable opportunity to lead a postmortem on the integration process. I approached the Nebulous Labs team, and they liked the idea. I contacted the author of the Sia-Minio integration code, who was supportive as well and agreed to contribute to the report with me. The Nebulous Labs and Minio teams reviewed it and approved it for publication, so you can find our full report below:

---

## Minio Integration Bounty Postmortem

### Nebulous Labs Incident #1

**Date**: 2017-12-01

**Authors**:

- Michael Lynch - @mtlynch - Sia blogger and /r/siacoin moderator.
- David Gore - @dvstate - Developer, Bounty winner

**Reviewers**

- David Vorick - @taek42 - Lead Developer, Nebulous Labs
- Zach Herbert - @zherbert - VP of Operations, Nebulous Labs
- @harshavardhana - Minio maintainer

## Background: What is a Postmortem?

A postmortem is an exercise to learn from a recent experience that did not go according to plan.

Postmortems are blame-free: we are identifying problems in our *processes *that led to bad outcomes. We are not attempting to identify or shame _people_. It is assumed that all people who participated in the event under discussion are competent and well-intentioned.

See [“Postmortem Culture: Learning from Failure”](https://landing.google.com/sre/book/chapters/postmortem-culture.html) from the SRE book for more details.

## Summary

On July 19th, Nebulous Labs announced a 300,000 SC bounty for a working Sia integration with Minio, an open-source S3-compatible file server. Developer David Gore (@dvstate) published a proof of concept five days later, and was awarded the full prize less than 10 days after that.

It took an additional three months for the integration to be merged into the Minio repository. Getting the code accepted into Minio required a complete re-architecting of the code and significant work by @dvstate that was not officially compensated by the bounty.

The integration works, but completion required adding several limitations not anticipated in the bounty:

- Supports only a limited whitelist of filename characters, more restrictive than what Sia allows.
- Does not support multipart file transfers.
- Only two trivial functions have automated test coverage.

## Impact

The most significant impact of these events was that integration with a key partner was delayed by several months. Sia gaining S3 compatibility is a huge milestone, but it feels like we lost the “oomph” of the achievement due to how drawn out the process was.

Bumps in this process projected negative perceptions of Sia:

- Integrating with Sia is difficult and requires duplication of effort, even in Go, Sia’s native language.
- Completing a Sia bounty is difficult because the acceptance criteria is unclear.

## Lessons Learned

### What went well

- Sia was successfully integrated into Minio.
- Sia community members participated in testing the Minio integration in different scenarios using a variety of S3 clients.

### What went wrong

- Miscommunications about features and requirements led to several rewrites of the integration.
- There was long latency (in some cases, weeks) between reviews from Minio maintainers and updates to the PR.
- @dvstate had to spend a nontrivial amount of time resolving merge conflicts due to changes to Minio’s codebase while the Sia integration PR was in-flight.

### Where we got lucky

- @dvstate volunteered his time to work on the integration for months after Nebulous paid the bounty.
- @dvstate voluntarily launched, configured, and funded a Sia test server for Minio to use for testing.
- Minio maintainers were generous with their time and continued reviewing the same PR for several months.

## Timeline

- 2017-07-19: Nebulous Labs [announces a series of Sia bounties](https://blog.sia.tech/announcing-sia-bounties-800daf90398b), starting with a bounty for [integrating Sia with Minio](https://github.com/NebulousLabs/Sia/issues/2155).
- 2017-07-24: @dvstate [publishes proof of concept integration](https://github.com/NebulousLabs/Sia/issues/2155#issuecomment-317488613).
- 2017-08-03: Nebulous Labs [awards @dvstate the full bounty](https://blog.sia.tech/introducing-s3-style-file-sharing-for-sia-through-the-new-minio-integration-bb880af2366a).
- 2017-08-09: @dvstate [makes the first PR](https://github.com/minio/minio/pull/4802) for the Sia integration into the Minio source.
- 2017-08-09: @harshavardhana [requests](https://github.com/minio/minio/pull/4802#discussion_r132325301) @dvstate rewrite the PR to use BoltDB instead of SQLite.
- 2017-08-13: @harshavardhana [agrees to accept](https://github.com/NebulousLabs/Sia/issues/2155#issuecomment-322053440) Sia-Minio integration.
- 2017-08-16: @dvstate completes the BoltDB re-write.
- 2017-08-28: During code review, @harshavardhana [requests](https://github.com/minio/minio/pull/4802#discussion_r135440426) that @dvstate remove the database altogether and rewrite the PR without a caching layer.
- 2017-09-26: After several weeks of inactivity on the PR, [@zherbert](https://github.com/minio/minio/pull/4802#issuecomment-332280393) and [@mtlynch](https://github.com/minio/minio/pull/4802#issuecomment-332361976) request a status update.
- 2017-10-19: @dvstate [completes](https://github.com/minio/minio/pull/4802#issuecomment-338083575) a rewrite of the PR that removes the caching layer.
- 2017-10-24: @harshavardhana sends a patch to @dvstate.
- 2017-10-25: @dvstate closes the original PR and [starts a new one](https://github.com/minio/minio/pull/5114) to address Minio’s requests and integrate @harshavardhana’s patch.
- 2017-10-26 - 2017-11-21: @dvstate provisions and funds a Sia-Minio testing node and provides access to @harshavardhana. The two manually test the integration using the Minio web app, s3cmd, and the mc command line tool.
- 2017-11-22: [Minio PR](https://github.com/minio/minio/pull/5114) is merged.

## Issues Observed

### Unclear requirements

The bounty description left many of the details of the Sia-Minio integration undefined. It specified that “users must be able to use the Minio client to upload/download Sia files,” but didn’t mention any restrictions or requirements from the Minio maintainers.

In addition, several Sia users contacted @dvstate through the #bounties channel of the Sia slack or through private messages to request features. Because there was no authoritative definition of the requirements, @dvstate implemented these additional features for fear that ignoring them would risk forfeiting the bounty award.

As a result, there was confusion between @dvstate, the Minio maintainers, and Sia users about the following issues:

- Which third-party libraries were acceptable
- Whether the Sia integration is allowed to maintain a cache on the filesystem to preserve state information and metadata
- Whether the Sia integration must implement multipart file transfers
- Whether the Sia integration must support bucket policy settings
- Which S3 client applications required support (e.g., mc, s3cmd)
- What degree of manual testing is required to demonstrate working functionality
- How many Sia-specific environment variables the Sia integration is allowed to use
- How much test coverage is required
- What changes to Minio UI are required/allowed
- What changes to Minio documentation are required

@dvstate ended up writing three drastically different versions of the integration in response to requirements from the Minio maintainers that were not specified in the original bounty description ([first](https://github.com/NebulousLabs/Sia/issues/2155#issuecomment-317488613), [second](https://github.com/NebulousLabs/Sia/issues/2155#issuecomment-317625360), [third](https://github.com/minio/minio/pull/5114)).

**_Recommended action items_**:

- For future Sia bounties, work with third-party maintainers to establish requirements up front and include these in the bounty award criteria.
- Establish an objective acceptance test for the bounty. For example:

  1. A server is provisioned with siad with 500 SC in allowance.
  1. Client launches minio using the following commands:
     ```bash
     export MINIO_ACCESS_KEY=minioaccesskey
     export MINIO_SECRET_KEY=miniosecretkey
     ./minio gateway sia
     ```
  1. A client machine has 100 files varying in size from 1 KB to 10 GB, totaling no more than 4 TB in a folder `~/test-data`. The files include nested folders with a folder depth of at most 3.
  1. Client machine runs the following commands successfully:

     ```bash
     SERVER=insert.server.hostname # replace with actual server
     mc config host add minio-sia \
      "http://${SERVER}" minioaccesskey miniosecretkey S3v4

     mc mb minio-sia/sia-test-bucket

     # Upload test files.
     mc cp --recursive ~/test-data/\* minio-sia/sia-test-bucket/

     # Download test files.
     mc cp --recursive \
      minio-sia/sia-test-bucket/* ~/test-data-downloaded/
     ```

  1. SHA-1 hashes of downloaded files match the SHA-1 hashes of the original files

- If ambiguities are discovered in a bounty announcement, continue updating it throughout the contest run with a changelog indicating what changed.
- Make it clear that the bounty issue tracker is the authoritative source for requirements of winning the bounty.
- Bounty contestants do not need to satisfy requests that appear outside of the official bounty tracker.

### Bounty paid based on proof of concept rather than successful integration

Nebulous awarded the bounty after a review by the Sia core devs, but before approval from the Minio maintainers. The true goal of the bounty was integration into Minio’s repository, otherwise users would be reluctant to deploy code from @dvstate’s unmaintained fork.

Sia was fortunate that @dvstate continued working on the PR long after his responsibilities ended, but completion of the bounty’s true goals should not depend on the goodwill of the bounty recipient.

Before the bounty was awarded, there was a sense of urgency to win the prize - requested changes were implemented within hours or days. After it was awarded, latency increased to weeks.

This is expected and reasonable, as @dvstate was working on a volunteer, best-effort basis. Sia was lucky to receive any latency < infinity.

**_Recommended action items_**:

- Pay out bounty based on successful integration rather than proof of concept.
- Make successful merge into the target repository an explicit requirement of future bounties.

### Minio integration duplicates logic from siac command-line client

30-40% of the Minio [integration code](https://github.com/minio/minio/blob/f4d4ea5c36e59baad9c4b1c98ba6d320f8c90b20/cmd/gateway-sia.go) is just logic to implement the Sia API. This duplicates code that already exists in the [Sia core repo](https://github.com/NebulousLabs/Sia), as the `siac` command-line client implements identical functionality.

There are no official Sia API bindings for any language, including Go, Sia’s native language.

**_Recommended action items_**:

- Create an official Go client library for the Sia API. Make `siac` the reference client for this library. Refactor the Minio integration to use this library.
- For future bounties that require non-Go code, require that the submission create a library for implementing the necessary Sia API features. This library should be independent of the application-specific code.

### Minio integration has negligible test coverage

Only two trivial functions have test coverage, making it difficult to detect if changes to the Sia Minio code break will Minio functionality.

**_Recommended action items_**:

- Make automated tests a requirement of future Sia bounties.

### Information siloing during review

Key discussions about required changes to the PR happened privately. Nobody outside of @dvstate or @harshavardhana could track progress or help move the PR forward.

**_Recommended action items_**:

- Pay out bounty based on successful integration rather than proof of concept.
- Require discussion to happen in a central location (e.g., the Github issue for the bounty) so that all bounty applicants have access to the same information.

### “First to complete” bounties create perverse incentives

The bounty program [rules](https://blog.sia.tech/announcing-sia-bounties-800daf90398b) state:

> A bounty will only be paid once to one submission and, unless specified otherwise, it will be paid to the first individual or team to meet ALL the criteria set out for the bounty.

This incentivizes bounty submitters to optimize their solution to minimize implementation cost and consequently disincentivizes spending time on readability, maintainability, or clear documentation.

In the case of the Minio integration, the code does have thorough documentation, but is lacking tests and mixes Sia logic with Minio logic, which may create challenges for future maintainability.

This system also disincentivizes collaboration or improvement. If a developer publishes a solution, no other developers have incentive to attempt a solution because the bounty will likely go to the first submitter. There is no path for improving upon another applicant’s submission because the rules don’t cover that scenario.

**_Recommended action items_**:

- Use an indiscriminate “submission window”
- Specify a window during which submission speed does not matter (e.g., all submissions received in the first two weeks of the bounty contest are treated equally).
- Applicants can submit early, but others are allowed to fork and improve their work (would have to be substantial improvements, not just renaming some symbols). In this case, bounty is split between the contributing developers at Nebulous’ discretion.
- After the initial submission window ends, award goes to first valid submission.

### Difficulty of Third-Party Validation

The Minio team had no prior experience with Sia. Before Minio was comfortable merging the PR, @dvstate had to provision a test server at his own expense and work with Minio maintainers on a previously unannounced series of manual validation steps.

**_Recommended action items_**:

- For future bounties for third-party integrations, bounty organizers take responsibility for validating solutions and working with third-party partners to help them validate.
- Establish an objective acceptance test for the bounty. (See [“Unclear requirements”](#unclear-requirements)).
