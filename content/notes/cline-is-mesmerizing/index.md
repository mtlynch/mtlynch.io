---
title: "The Cline AI Assistant is Mesmerizing"
date: 2025-02-01
images:
  - notes/cline-is-mesmerizing/og-photo.webp
tags:
  - llms
  - zig
---

I tried out the [Cline AI assistant](https://cline.bot/) yesterday, and then I went into a trance for five hours where I couldn't do anything but stare transfixed at Cline fixing bugs for me.

<div style="position:relative;padding-top:56.25%;"><iframe src="https://iframe.mediadelivery.net/embed/304035/04e4d47f-ead7-49d5-9ad1-899a5b92caaa?autoplay=false&loop=false&muted=false&preload=true&responsive=true" loading="lazy" style="border:0;position:absolute;top:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true"></iframe></div>

As a professional developer, it was both enchanting and terrifying. It's enchanting that AI has reached this level of proficiency. It's terrifying for the same reason, as I'm not sure what role I'll serve in a world where AI can write code better and faster than I can.

I'm late to the game on this, as I realize most other developers have integrated AI tools more deeply into their workflows, but I wanted to share what I saw for others who haven't experienced it yet.

## I've used AI tools before

Cline isn't the first time I've used AI.

I've been experimenting with LLM assistants for the past two years. I started using them much more heavily in the last six months, as models have reached the level where they reliably produce correct code.

I use [Kagi](https://kagi.com/) as my search engine, and their Ultimate package includes unlimited access to all the major LLMs. I mainly interact with LLMs through the Kagi Assistant feature, which is just a web UI for chatting with LLMs.

{{<img src="kagi-assistant.webp" max-width="600px" caption="My search engine, [Kagi](https://kagi.com/), comes with a nice web chat interface for all the major LLMs." has-border="false">}}

_Full disclosure: I participated in Kagi's crowdfund, so I have some financial investment in them that I don't understand._

## Using AI tools makes me feel like the bot

The problem I found recently was that AI tools make me feel like I'm the machine. I just sit there mindlessly copying the code between my editor and the chat interface, then saying, "It didn't work," pasting the error message, and doing the whole thing over four or five times.

{{<gallery caption="A chatbot LLM keeps giving me the wrong fix to a bug and then requires a lot of prodding to show the full solution.">}}
{{<img src="issue-remains.webp" max-width="400px" has-border="false">}}
{{<img src="llm-confirmations.webp" max-width="400px" has-border="false">}}
{{</gallery>}}

## There has to be a tool for this

I realized there had to be a better way of integrating AI than what I was doing.

I needed a tool to take over my role as "copy code and error messages back and forth" guy.

I tried [Sourcegraph Cody](https://sourcegraph.com/cody) twice about a year apart, and I found it disappointing both times. Having it edit my code in place was better than pasting back and forth between the browser and my editor, but Cody was slow and buggy enough that I eventually just went back to pasting code back and forth to my web browser.

I saw a few blog posts recently about [Cline](https://cline.bot), and it sounded appealing for a few reasons:

- The code is [open-source](https://github.com/cline/cline).
- It integrates with VS Code, my main editor.
- It can handle editing local files, running commands, and iterating on command output.
- It allows me to use locally-hosted LLMs if I choose.
- It doesn't insist on being the middleman for purchasing access to AI APIs, as many other AI assistants do.

The downside is that Cline doesn't seem to have a revenue source except for burning investor dollars. So, it may not be sustainable, but it's fine for right now.

## Lexical illusions: the perfect test program for an AI assistant

I've recently wished for a tool that scans my blog for "lexical illusions." That's [what Matt Might calls it](https://matt.might.net/articles/shell-scripts-for-passive-voice-weasel-words-duplicates/) when you fail to recognize a duplicate word in text, for example:

> Many readers are not aware that the<br>
> the brain will automatically ignore<br>
> a second instance of the word "the"<br>
> when it starts a new line.

I make this mistake frequently on my blog, and I often miss it until late in proofreading or after publication.

Matt Might shared a Perl script that finds lexical illustions, but it was rudimentary and produced a lot of false positives on my blog due to Markdown formatting characters.

I asked Kagi Assistant to write a Markdown-aware version in Python, but it kept producing buggy code.

I realized this was a perfect test case for Cline because the problem is easy to define. I should be able to just keep showing the AI assistant test cases with the behavior I want in, and it should be able to just keep editing the code until the test passes.

It was also an excuse to write in [Zig](https://ziglang.org), as I want this tool to run as quickly as possible over a large set of files, and I [love working with Zig](/tags/zig/).

## Defining the problem

The main interface of my tool was simple: it needed to accept file contents as a string (a `[] const u8` in Zig) and then produce a list of duplicate words with their corresponding line numbers.

The basic main interface looked like this:

```zig
pub const DupeWord = struct {
    line_number: u32,
    word: []const u8,
};

pub fn FindAdjacentDupes(allocator: std.mem.Allocator,
                         input: []const u8) !ArrayList(DupeWord) {
   // TODO: Implement this.
}
```

And these were my initial unit tests:

```zig
test "FindAdjacentDupes" {
    // Don't consider distinct words to be duplicates.
    try testFindDupes("cat dog", &[_]DupeWord{});

    // Find simple dupes.
    try testFindDupes("cat cat", &[_]DupeWord{
        .{ .line_number = 1, .word = "cat" },
    });
}

fn testFindDupes(input: []const u8, expected: []const DupeWord) !void {
    const allocator = testing.allocator;
    var result = try FindAdjacentDupes(allocator, input);
    defer {
        for (result.items) |item| {
            allocator.free(item.word);
        }
        result.deinit();
    }

    try testing.expectEqual(expected.len, result.items.len);

    for (expected, 0..) |expected_dupe, i| {
        try testing.expectEqual(expected_dupe.line_number, result.items[i].line_number);
        try testing.expect(std.mem.eql(u8, expected_dupe.word, result.items[i].word));
    }
}
```

## Cline's initial results

Within about 30 seconds and $0.09 of LLM credit spending, Cline got the tests to pass:

{{<img src="cline-results.webp" has-border="false">}}

Cline had updated `FindAdjacentDupes` with this implementation:

```zig
pub fn FindAdjacentDupes(allocator: std.mem.Allocator, input: []const u8) !ArrayList(DupeWord) {
    var result = ArrayList(DupeWord).init(allocator);

    var it = std.mem.splitScalar(u8, input, ' ');
    var prev_word: ?[]const u8 = null;

    while (it.next()) |word| {
        if (prev_word) |prev| {
            if (std.mem.eql(u8, prev, word)) {
                const dupe_word = try allocator.dupe(u8, word);
                try result.append(DupeWord{
                    .line_number = 1,
                    .word = dupe_word,
                });
            }
        }
        prev_word = word;
    }

    return result;
}
```

Cline made some wrong turns like using `var` instead of `const` or using a deprecated API, but it self-corrected based on error messages the way a human would.

The implementation was obviously incomplete, as it didn't handle things like Markdown formatting, uppercase letters, or punctuation. I hadn't shown Cline any test cases with a line number other than `1`, so the current implementation hardcoded the line number to always return `1`.

## That's when I was hooked

After Cline completed its initial implementation, I kept writing new testcases and then watching Cline update its code to satisfy my tests.

And that's when I was hooked. I was so amazed that I could develop software this way. I just told the tool what I wanted, and it kept doing exactly what I asked.

Here's a video I showed at the top of this post of what this looks like in practice:

<div style="position:relative;padding-top:56.25%;"><iframe src="https://iframe.mediadelivery.net/embed/304035/04e4d47f-ead7-49d5-9ad1-899a5b92caaa?autoplay=false&loop=false&muted=false&preload=true&responsive=true" loading="lazy" style="border:0;position:absolute;top:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true"></iframe></div>

## Results

I spent the rest of the day playing with Cline on implementing the tool. And I now have a functional version of the duplicate word finder. I call it `wordword`:

- [mtlynch/wordword on Codeberg](https://codeberg.org/mtlynch/wordword)

I used `wordword` to find [seven instances of lexical illusion errors](https://github.com/mtlynch/mtlynch.io/pull/1414) on my blog.

In total, it only cost me $6 in credits on [OpenRouter](https://openrouter.ai/), which represented five hours of working continuously with Cline.

## What I've learned so far

### Unsupervised work is suboptimal but too cheap to matter

Cline has an option where it will prompt you before each step to approve of the plan. I quickly got bored of hitting "Approve" every five seconds and just set it up to auto-approve file reads, file writes, and command execution.

I found that if I stopped paying attention, Cline occasionally got stuck in dead ends, repeatedly attempting strategies that were doomed to fail.

Despite this, I continued mostly letting Cline run unsupervised until it reached a solution or hit its 20-attempt limit. These dead ends ate up API credits, but on the scale of pennies, so I'd rather risk wasting a few cents than micromanaging the assistant.

### Cline trusts you unconditionally, so choose your words carefully

The times that Cline went most loopy was when I accidentally wrote test cases with incorrect behavior.

This is a test case I wrote too hastily:

```zig
// Detect duplicates after a heading
try testFindDupes(
    \\## Foods
    \\
    \\These potatoes potatoes are the best!
, &[_]DupeWord{
    .{ .line_number = 1, .word = "potatoes" },
```

I accidentally wrote the line number as `1` when it should have been `3`.

When I asked Cline to make the test pass, it had a bit of a breakdown trying to figure out how to justify assigning a line number of `1` when it should obviously be `3`.

### Encourage Cline to add debug print statements

I notice that LLMs tend to guess at solutions rather than stop to gather more information about why a piece of code is behaving as it does.

When I found Cline getting in a loop of blind attempts to fix a bug, I found it helpful to pause its work and instruct it to insert debug print statements to verify its assumptions about the code. Cline added useful debugging output, and it remembered to remove them all before declaring their solution complete.

### Kagi must be losing money on me

This is my first time ever using a metered LLM API. I've seen people talk about token costs, but I never had an intuitive sense of it because Kagi basically just says, "Don't worry about what it costs."

Cline helpfully shows you how much each coding task has run up in credits as you go.

{{<img src="cline-cost.webp" has-border="false">}}

So, I definitely am getting the better end of Kagi's $25/month unlimited plan. I spent $6 in five hours with Cline, and Cline does a lot of things to minimize token consumption. I use Kagi Assistant every day and frequently paste giant files into a chat 10+ times during a conversation. Now that I see the costs, I'm probably spending costing Kagi $5-10 in API credits per day.

## Other resources

Most AI posts are thin on substance or practical lessons. The ones I've found most useful in seeing what's possible are:

- ["Everything I built with Claude Artifacts this week"](https://simonwillison.net/2024/Oct/21/claude-artifacts/) by Simon Willison
- ["How I Use 'AI'"](https://nicholas.carlini.com/writing/2024/how-i-use-ai.html) by Nicholas Carlini
- ["How I program with LLMs"](https://crawshaw.io/blog/programming-with-llms) by David Crawshaw
