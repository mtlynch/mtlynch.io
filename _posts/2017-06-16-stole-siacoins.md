---
title: How I Stole Your Siacoin
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
header:
  teaser: images/resized/2017-06-16-stole-siacoins/480/american-psycho.jpg
tags:
- siacoin
- cryptocurrency
- security
- sia
excerpt: A lesson in Sia wallet seed safety
---

# A seedy reddit post

The night was June 9th, 2017. It was a typical Friday night for me. I was ~~watching Netflix and checking reddit~~ partying with cool kids.

Suddenly, I saw this post on the "New" tab of the [/r/siacoin](https://www.reddit.com/r/siacoin/) subreddit:

{% include image.html file="posted-seed.png" alt="Reddit screenshot" img_link="true" %}

If you're not familiar with Siacoin, it's a cryptocurrency that allows you to rent out your spare hard disk space or buy space from others. I've written about this technology a couple times previously ([mining guide]({{ base_path }}/windows-sia-mining/), [NAS guide]({{ base_path }}/sia-via-docker/)).

This reddit user had just done something very dangerous. They posted their Sia wallet seed online. The Sia "seed" is a passphrase that gives anyone who holds it full control of the cryptocurrency in that person's wallet. For this user, that means control of €2,000 worth of Siacoin because that's the amount they transferred into that wallet. In the screenshot, you can see that the user believes this is safe because they have confirmed that the passphrase doesn't work.

# Almost doesn't count (except in horseshoes and Sia seeds)

What immediately interested me about the post was that the user had written their seed by hand:

>i'm pretty sure i didn't make a mistake writing it down, i always double check.

I was pretty sure they *did* make a mistake writing it down. But I was hoping that they only made *one* mistake. If the user was just one letter off or had two letters transposed, I could probably figure out the correct seed and recover the €2,000.

I needed to do this quickly. I'm not the only one who can recognize a leaked seed when they see it, so I had to crack the seed and grab the money fast before anyone else could.

# Hacking by hand

I began by examining the words in the incorrect seed:

`eluded` `logic` `wise` `ascend` `tagged` `acoustic` `situated` `stylishly` `younger` `aptitude` `inroads` `avidly` `hefty` `also` `godfather` `unrest` `avatar` `push` `because` `brunt` `viking` `gone` `august` `public` `tonic` `vulture` `shrugged` `otter` `adapt`

I wasn't familiar with how Sia generates its seeds, but Sia is completely open-source, so I figured it couldn't be too hard to figure it out.

Indeed it was not. Browsing to Sia's [`wallet.go` file](https://github.com/NebulousLabs/Sia/blob/master/modules/wallet.go) I found a [`SeedToString` function](https://github.com/NebulousLabs/Sia/blob/a61170dd20118f68b1fdb7e06c2c483c91aa649e/modules/wallet.go#L404...L412). That led me to the [entropy-mnemonics](https://github.com/NebulousLabs/entropy-mnemonics) Github project, which contained [this dictionary](https://github.com/NebulousLabs/entropy-mnemonics/blob/master/english.go) of possible seed words:

```golang
  englishDictionary = Dictionary{
    "abbey",
    "abducts",
    "ability",
    "ablaze",
    "abnormal",
    "abort",
    "abrasive",
    "absorb",
    "abyss",
    "academy",
    "aces",
    "aching",
    "acidic",
    "acoustic",
    "acquire",
    "across",
    "actress",
    ...
```

The entropy dictionary only had ~1,600 words in it. My hope was that when the user was writing down the seed, they accidentally wrote down a word that wasn't in the dictionary at all. That way, if I found that one of 29 seed words they posted was missing from the dictionary, that would obviously be the incorrect word. Then I could quickly figure out the seed just by looking for words in the dictionary similar to the absent word.

But alas, all 29 words in the incorrect seed appeared in the entropy dictionary, so eyeballing it wasn't going to work.

# Brute force

It was time to break out the big guns (I refer to the two fingers I use to type code as "guns"). I needed a way of finding all the words in that dictionary that were one copying error off from the seed that got posted to reddit.

I realized that [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) could help me here. The Levenshtein distance is the number of letters you need to add, delete, or replace to get from one word to another. For example, "cat" and "car" have a Levenshtein distance of 1 because you can get from "cat" to "car" by replacing the "t" with an "r". The words "cat" and "scar" have a distance of 2 because you have to replace the "t" and prepend an "s".

To discover possible seeds, I could write a script that finds words in the entropy dictionary that had a Levenshtein distance of 1 from the words in the  incorrect seed.

I first downloaded the dictionary locally and stripped out all characters except `a`-`z`:

```text
$ wget -qO- https://raw.githubusercontent.com/NebulousLabs/entropy-mnemonics/master/english.go \
  | egrep "^\s+\"(.+)\"," \
  | egrep -o [a-z]+ \
  > dictionary.txt
```

Then I installed the [`python-Levenshtein`](https://pypi.python.org/pypi/python-Levenshtein) library and wrote a hacky little Python script to dump out the possible seeds:

```python
import Levenshtein

seed = raw_input('enter your wallet seed: ')

for seed_word in seed.split():
  for dict_word in open('dictionary.txt'):
    dict_word = dict_word.strip()
    distance = Levenshtein.distance(seed_word, dict_word)
    if distance != 1:
      continue
    print '"%s" -> "%s"\n%s\n' % (seed_word, dict_word,
                                  seed.replace(seed_word, dict_word))
```

*Confession: In real life, the script was much hackier and involved copy/pasting the 1,600 lines from the dictionary directly into my Python script. This code is better for demonstration.*

# Opening the safe

I was worried that there would be hundreds of possibilities and I'd have to script the process of trying each seed. Fortunately, my script reported that there were only 12 seeds that had a Levenshtein distance of 1 from the incorrect seed:

```text
$ python recover.py
enter your wallet seed: eluded logic wise ascend tagged acoustic situated stylishly younger aptitude inroads avidly hefty also godfather unrest avatar push because brunt viking gone august public tonic vulture shrugged otter adapt

"wise" -> "wife"
eluded logic wife ascend tagged acoustic situated stylishly younger aptitude inroads avidly hefty also godfather unrest avatar push because brunt viking gone august public tonic vulture shrugged otter adapt

"tagged" -> "jagged"
eluded logic wise ascend jagged acoustic situated stylishly younger aptitude inroads avidly hefty also godfather unrest avatar push because brunt viking gone august public tonic vulture shrugged otter adapt

"tagged" -> "nagged"
eluded logic wise ascend nagged acoustic situated stylishly younger aptitude inroads avidly hefty also godfather unrest avatar push because brunt viking gone august public tonic vulture shrugged otter adapt

"aptitude" -> "altitude"
eluded logic wise ascend tagged acoustic situated stylishly younger altitude inroads avidly hefty also godfather unrest avatar push because brunt viking gone august public tonic vulture shrugged otter adapt

"push" -> "lush"
eluded logic wise ascend tagged acoustic situated stylishly younger aptitude inroads avidly hefty also godfather unrest avatar lush because brunt viking gone august public tonic vulture shrugged otter adapt

"brunt" -> "grunt"
eluded logic wise ascend tagged acoustic situated stylishly younger aptitude inroads avidly hefty also godfather unrest avatar push because grunt viking gone august public tonic vulture shrugged otter adapt

"tonic" -> "ionic"
eluded logic wise ascend tagged acoustic situated stylishly younger aptitude inroads avidly hefty also godfather unrest avatar push because brunt viking gone august public ionic vulture shrugged otter adapt

"tonic" -> "sonic"
eluded logic wise ascend tagged acoustic situated stylishly younger aptitude inroads avidly hefty also godfather unrest avatar push because brunt viking gone august public sonic vulture shrugged otter adapt

"tonic" -> "topic"
eluded logic wise ascend tagged acoustic situated stylishly younger aptitude inroads avidly hefty also godfather unrest avatar push because brunt viking gone august public topic vulture shrugged otter adapt

"tonic" -> "toxic"
eluded logic wise ascend tagged acoustic situated stylishly younger aptitude inroads avidly hefty also godfather unrest avatar push because brunt viking gone august public toxic vulture shrugged otter adapt

"adapt" -> "adept"
eluded logic wise ascend tagged acoustic situated stylishly younger aptitude inroads avidly hefty also godfather unrest avatar push because brunt viking gone august public tonic vulture shrugged otter adept

"adapt" -> "adopt"
eluded logic wise ascend tagged acoustic situated stylishly younger aptitude inroads avidly hefty also godfather unrest avatar push because brunt viking gone august public tonic vulture shrugged otter adopt
```

There were few enough possibilities that I could just type them into Sia manually. I tried the first possible seed, created by replacing `wise` in the incorrect seed with `wife`:

```text
> siac wallet init-seed
Seed:
Could not initialize wallet from seed: error when calling /wallet/init/seed: seed failed checksum verification
```

That was to be expected. They weren't all going to be valid seeds. I kept trying each potential seed until I got to the seed that replaced `tonic` with `ionic`:

```text
> siac wallet init-seed
Seed:
Wallet initialized and encrypted with seed.
```

Jackpot!

Let's check what's inside:

```text
> siac wallet unlock
Wallet password:
Wallet unlocked

> siac wallet
Wallet status:
Encrypted, Unlocked
Confirmed Balance:   594.8 SC
```

That's weird. 594.8 SC (Siacoin) at that time was worth about €10, a far cry from the €2,000 that the user claimed was in the wallet.

Was *I* the one being fleeced somehow? Did the user know they only had €10 but claim a much higher amount to entice someone to help them? Did a better cryptothief get to the wallet first and leave behind just €10 to taunt me?

# Securing the loot

While I would have loved to sit and ponder the strange balance I was seeing, time was of the essence. I didn't know who else saw that post and was about to unlock the wallet like I just had. It was time to steal the Siacoin.

>**Ben Gates**: Someone else is after the treasure.<br>
>**Riley Poole**: Of course someone else is after it. It's the axiom of treasure hunting.<br>
-*National Treasure: Book of Secrets*

I quickly [sent the full balance](http://explore.sia.tech/hash.html?hash=2304da26d61bd2cb7fcac5c7b38a553d788d8dfc386ae4eb47772e36e4a9269d) to my own Sia wallet. That way, even if someone else discovered the correct seed after I had, they couldn't recover the money.

# Back to the mystery

Now that the coins were secured, it was time to figure out just what was going on here. I checked the wallet's transaction history:

```text
> siac wallet transactions
    [height]                                                   [transaction id]    [net siacoins]   [net siafunds]
      108589   427b72c98e8ea64fba234ca2a00288f7a750003a243e6b3e967f5c6d426c2f9f         594.83 SC             0 SF
      109002   32ad2729fe6b487aedc1b70d0dff0843404ff1cef69223d5f03699dcd1dbe568           0.00 SC             0 SF
      109002   2304da26d61bd2cb7fcac5c7b38a553d788d8dfc386ae4eb47772e36e4a9269d        -594.55 SC             0 SF
```

{% include image.html file="hardy-boys.jpg" alt="Hardy Boys cover" max_width="225px" class="align-right" %}

The last transaction in the list is the withdrawal. That's just me stealing the money. Don't worry about that. The transaction of 0.00 SC is just noise, as Sia wallets generate these 0.0 transactions when moving money between their own addresses.

I was interested in the first transaction in the list. That line showed that this wallet had only ever received one deposit of 594.83 SC at block height 108,589. The block height is essentially a "time" in Siacoin time units. Checking the [transaction in the Sia block explorer](http://explore.sia.tech/block.html?height=427b72c98e8ea64fba234ca2a00288f7a750003a243e6b3e967f5c6d426c2f9f), I could see this deposit was made on June 7th, 2017, two days before the user's reddit post.

Why would the user claim that they had put  €2,000 in the wallet when they had only deposited  €10?

# Transactions in limbo

At the time of my daring heist, Poloniex, the largest Siacoin exchange was [experiencing problems](https://www.reddit.com/r/siacoin/comments/6er35v/what_we_are_doing_about_poloniex_withdrawals/?st=j3z7orst&sh=c0afe15e) transferring Siacoin to users' wallets. They weren't losing user funds, but it was common for transactions to get stuck in limbo, where the user sent money from their exchange account to their personal Sia wallet, but Poloniex got backed up on delivering it for days or weeks.

Maybe this user had *sent* €2,000 to the wallet, but the money was trapped in Poloniex limbo. That meant the €2,000 might still be up for grabs because it would still reach the wallet eventually.

This was a new, interesting problem. How do I steal the money if it hasn't arrived in the wallet yet and I don't know when it will get there? I decided to just write a batch script to keep transferring money from the exposed wallet to my own wallet. Or rather, I decided to learn how to write a batch script because my easiest available Sia instance was a Windows virtual machine and I don't know how to write batch scripts in Windows. Eventually, I churned out this fine piece of batch scripting:

```bat
for /l %%x in (1, 0, 100) do (
   siac wallet send siacoins 2000SC fff0228f02a01cf8e037047a5ea0db5a88d614913af5f21de209ebf2e58431c68cfc9c27d0e4
)
```

That script repeatedly tries to send 2,000 SC from the reddit user's compromised wallet to my own wallet address. It goes from 1 to 100 in increments of 0, so it loops forever.

While the wallet continues to have zero balance, this command will just fail to no effect. If, however, the wallet received the €2,000 I was hoping for, it will siphon it over to my wallet, 2,000 SC at a time.

I chose 2,000 SC because a relatively low transfer was safer. I was effectively playing by *The Price is Right* rules. If I had chosen, say, 125,000 SC, the equivalent of €2,000 at the time, but then only 124,000 SC arrived in the wallet, my command would have failed with another insufficient balance error and transferred nothing.

There was no real penalty for guessing too low except that I'd pay more in transaction fees. 2,000 SC was about €35, so my batch script would have emptied the wallet in a couple minutes if a deposit of ~125,000 SC (€2,000) came through.

# Informing the victim

I admit that I did entertain quite a few fantasies about what I could spend the €10 on if I kept it for myself: private jets, Rolexes, a mansion with one of those Scrooge McDuck swimming pools of money. But in the end, I decided I had to do the right thing and return the Siacoin to the user who posted their seed.

{% include image.html file="american-psycho.jpg" alt="American Psycho" fig_caption="Me, if I had kept the money." %}

Still, the discrepancy between the amount I found and the amount they lost could potentially make things awkward. It would be like calling someone up and saying, "Hey, are you the guy who put up those posters about the lost wallet with €2,000 cash inside? I found it, but it only had- uh... *€10* inside..." (shifts eyes).

About two hours after the user's original post, I sent them a private message on reddit. I explained how I had recovered their seed and taken the money to keep it safe from less scrupulous users who could have recovered it as well. I requested they give me a Siacoin address not associated with the leaked seed so that I could return the Siacoin balance to them.

Hours passed, then days, and I heard nothing back.  I noticed they had deleted the post to reddit exposing their seed. Who loses €2,000, posts online asking for help, then seems to completely forget about it a few hours later?

# Mystery solved

Finally, on Monday morning, the victim of my heinous crime got back to me. They explained that shortly after making their post, they realized that their money was still on the exchange and had never reached their wallet (I knew it!). They were able to move the money to a separate wallet whose seed was secure. When they realized they hadn't actually lost the money, they didn't think to check back to reddit.

They were delighted that I had recovered the seed because I had solved *their* mystery of what went wrong with the passphrase. They had correctly written down `ionic` but they kept mistakenly reading it back as `tonic` because that was the more familiar word to them. The user even offered to let me keep the full amount, but I felt ~~I would come off better in this blog post~~ the coins rightfully belonged to the user who lost them. I insisted, and they finally relented and sent me an address so I could return the 594.8 SC.

# Takeaways

**Never post your Sia wallet seed online**. As we see from this tale, even an incorrect or partial version of the seed can completely compromise your wallet.

This applies not only to Siacoin but to cryptocurrencies in general. Not all of them use a passphrase like Sia, but they all use some sort of private key you must keep secret if you don't want to lose your coins.
