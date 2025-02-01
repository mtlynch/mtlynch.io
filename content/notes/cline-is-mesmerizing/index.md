---
title: "The Cline AI Assistant is Mesmerizing"
date: 2025-02-01
---

I tried out the [Cline AI assistant](https://cline.bot/) yesterday, and then I went into a trance for five hours where I couldn't do anything but stare transfixed at Cline fixing bugs for me.

As a professional developer, it was both enchanting and terrifying. It's enchanting that AI has gotten this good and is rapidly improving. It's terrifying for the same reason, as I'm not sure what role I'll serve in a world where AI can write code better and faster than I can.

I'm late to the game on this, as I realize most other developers have integrated AI tools more deeply into their workflows, but I wanted to share what I saw for others that haven't experienced it yet.

## I've used AI tools before

Cline isn't the first time I've used AI.

I've been experimenting with LLM assistants for the past two years. I started using them much more heavily in the last six months, as I've found.

I use [Kagi](https://kagi.com/) as my search engine, and their Ultimate package includes unlimited access to all the major LLMs.

{{<img src="kagi-assistant.webp" max-width="600px" caption="My search engine, [Kagi](https://kagi.com/), comes with a nice web chat interface for all the major LLMs.">}}

_Full disclosure: I participated in Kagi's crowdfund, so I have some financial investment in them that I don't understand._

## Using AI tools makes me feel like the bot

The problem I found recently was that AI tools make me feel like I'm the machine. I just sit there mindlessly copying the code between my editor and the chat interface, then saying, "It didn't work," pasting the error message, and doing the whole thing over four or five times.

{{<gallery caption="A chatbot LLM keeps giving me the wrong fix to a bug and then requires a lot of prodding to show the full solution.">}}
{{<img src="issue-remains.webp" max-width="400px">}}
{{<img src="llm-confirmations.webp" max-width="400px">}}
{{</gallery>}}

## There has to be a tool for this

I realized there had to be a better way of integrating AI than what I was doing.

I needed a tool to take over my role as "copy code and error messages back and forth" guy.

I tried [Sourcegraph Cody](https://sourcegraph.com/cody) twice about a year apart, and I found it disappointing both times. Having it edit my code in place was better than pasting back and forth between the browser and my editor, but Cody was slow and buggy enough that I eventually just went back to pasting code back and forth to my web browser.

I saw a few blog posts recently about Cline, and it sounded appealing for a few reasons:

- The code is [open-source](https://github.com/cline/cline).
- It integrates with VS Code, my main editor.
- It can handle editing local files, running commands, and iterating on command output.
- It allows me to use locally-hosted LLMs if I choose.
- It doesn't insist on being the middleman for purchasing access to AI APIs, as many other AI assistants do.

The downside is that I don't see any way that Cline makes money except for burning investor dollars, so it may not be sustainable, but it's fine for right now.

## Lexical illustions: the perfect test program for an AI assistant

I've recently wished for a tool that scans my blog for "lexical illustions." That's [what Matt Might calls it](https://matt.might.net/articles/shell-scripts-for-passive-voice-weasel-words-duplicates/) when you fail to recognize a duplicate word in text, for example:

> Many readers are not aware that the<br>
> the brain will automatically ignore<br>
> a second instance of the word "the"<br>
> when it starts a new line.

I make this mistake frequently on my blog, and I often miss it until late in proofreading or after publication.

Matt Might shared a Perl script for finding these instances, but it was rudimentary and produced a lot of false positives on my blog due to Markdown formatting characters.

I asked Kagi Assistant to write a Markdown-aware version in Python, but it kept producing buggy code.

I realized this was a perfect test case for Cline because the problem is easy to define. I should be able to just keep showing the AI assistant test cases with the behavior I want in, and it should be able to just keep editing the code until the test passes.

It was also an excuse to write in [Zig](https://ziglang.org), as I want this tool to run as quickly as possible over a large set of files, and I [love working with Zig](/tags/zig/).

## Defining the problem

The main interface of my tool was simple: it needed to accept file contents as a string (a `[] const u8` in Zig) and then produce a list of duplicate words with their corresponding line numbers.

The basic code looked like this:

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

{{<img src="cline-results.webp">}}

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

And that's when I was hooked. I just kept producing new testcases and then watching Cline solve them.

Here's a video so you can see what it looks like:

I just spent the rest of the day playing with Cline on implementing the tool I wanted.

And the tool works. I found [seven instances of lexical illusion errors](https://github.com/mtlynch/mtlynch.io/pull/1414) in my published articles.

## What I've learned so far

### Unsupervised work is suboptimal but too cheap to matter

I find it more satisfying to give Cline a task and then come back in a few minutes to find it complete, but it does sometimes get stuck in a dead end and . In my case, it's wasting a few pennies of API credits, so I don't mind the waste, but I expect that I could achieve better results by more actively managing Cline.

### Cline trusts you unconditionally, so choose your words carefully

The times that Cline went most loopy was when I accidentally wrote test cases with incorrect behavior.

Like this test case, I accidentally wrote

```zig
// Detect duplicates after a heading
try testFindDupes(
    \\## Foods
    \\
    \\These potatoes potatoes are the best!
, &[_]DupeWord{
    .{ .line_number = 1, .word = "potatoes" },
```

I accidentally wrote the line number as `1` when it should have been `3`. So when I asked Cline to make the test pass, it freaked out trying to figure out some consistent rule that would cause newlines to increment the line count in every situation except for this one.

### Encourage Cline to add debug print statements

Like a real junior engineer, when Cline would get stuck.

## Other resources

Most AI posts are thin on substance or practical lessons. The ones I've found most useful in seeing what's possible are:

- ["Everything I built with Claude Artifacts this week"](https://simonwillison.net/2024/Oct/21/claude-artifacts/) by Simon Willison
- ["How I Use 'AI'"](https://nicholas.carlini.com/writing/2024/how-i-use-ai.html) by Nicholas Carlini
- ["How I program with LLMs"](https://crawshaw.io/blog/programming-with-llms) by David Crawshaw
