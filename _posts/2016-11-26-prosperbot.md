---
title: Automated Prosper Investing with ProsperBot
date: 2016-11-26 00:00:00 -05:00
header:
  teaser: images/resized/2016-11-26-prosperbot/480/prosperbot-frontend.png
tags:
- prosper
- lending
- p2p
- go
- golang
excerpt: An automated peer to peer lending bot
---

{% include base_path %}

# Overview

I started investing in peer to peer lending in 2014 through a site called [Prosper](https://www.prosper.com/). I thought peer to peer lending was a neat idea and could potentially earn lucrative returns.

When I began, I chose each of my loan investments manually, but over time, I have automated this process by building a lending bot called ProsperBot that invests for me automatically.

In this blog post, I'll give a brief overview of peer to peer lending and walk through the process of building ProsperBot.

# What is Peer to Peer Lending?

Imagine that Alice wants to borrow $3,000 to pay back over the next 5 years. Traditionally, Alice's best option would be to apply for a loan at a bank. The bank gives her the $3,000 and if Alice pays back the loan as scheduled, the bank earns money through interest and fees on her loan. If she fails to pay back the loan, the bank absorbs the loss.

With peer to peer lending, Alice visits a peer to peer intermediary (such as Lending Club and Prosper). Instead of putting up its own money, the intermediary offers the loan to its investors. Investors Bob, Charlie, and Danica can each purchase portions of Alice's loan for $1,000 apiece. Alice makes monthly payments to the lending site, and the lending site, in turn, distributes 1/3 of Alice's payments to Bob, Charlie, and Danica each month.

The theory is that by cutting out the bank as the middleman, borrowers can get better rates than from traditional lenders and investors (lenders) can earn better interest than depositing their money in a bank through a savings account or CD. For more in-depth discussion of peer-to-peer lending, sites like [Lend Academy](http://www.lendacademy.com/) are an excellent resource.

# What is ProsperBot

To invest in peer to peer loans with Prosper, investors can use Prosper's web site to choose loans manually, but Prosper also offers a [public API](https://developers.prosper.com/) for developers to invest automatically.

I chose the API route and developed ProsperBot, a lending bot that continuously searches for new loans on Prosper and invests in them when they meet certain criteria. It also includes a web dashboard, which shows ProsperBot's current status and my Prosper account activity over time:

{% include image.html file="prosperbot-frontend.png" alt="ProsperBot screenshot" img_link="true" max_width="700px" class="align-center img-border" %}

As you can see in the graph, my account has been steadily increasing in value since April, as ProsperBot receives repayments on loans and reinvests the cash in new loans. My total account value begins to decline in October, as I have begun withdrawing money from my Prosper account.

# Piece by Piece

There are several different pieces to ProsperBot, which I've diagrammed below:

![ProsperBot Architecture](https://docs.google.com/drawings/d/1QMUzdufLQ5Ks3TOvmNd0ScuRk0U4QfxewHvXcQtSfnI/pub?w=1056&amp;h=784)

## gofn-prosper (Go Forth 'n Prosper)

**[gofn-prosper](https://github.com/mtlynch/gofn-prosper)** is a set of Go bindings for the public Prosper API. It abstracts away the details of Prosper's API from the rest of the application, so that to do something like purchase a Prosper note, the application can do so like this:

```go
client.PlaceBid(prosper.BidRequest{
  ListingID: 5492410,
  BidAmount: 25.0,
})
```

This is probably the most interesting part of the project for others, as it is completely independent of ProsperBot. Anyone interested in writing a Go application to interact with the Prosper API can re-use this library in their application.

## ProsperBot

**[ProsperBot](https://github.com/mtlynch/prosperbot)** is the application built on top of gofn-prosper to actually perform actions on Prosper. ProsperBot continually polls Prosper servers to:

* Query for newly available loans
* Invest in loans that meet investment criteria
* Detect changes in Prosper account status (e.g. change in cash balance, change in total account value)
* Detect updates to notes (received a repayment, note changed status)

ProsperBot stores all of its state in a **Redis** database.

This part is not as polished as I'd like (code has some hacks, is not well documented), but I'm publishing it mainly as an example usage of gofn-prosper.

## ProsperBot Frontend

The **[ProsperBot Frontend](https://github.com/mtlynch/prosperbot-frontend)** is an AngularJS web application that shows ProsperBot's status (as seen in the screenshot above). It uses **nginx** to handle requests for static resources (e.g. HTML files, images) and uses a custom Go server to handle requests for dynamic content. The Go server uses the same **Redis** data store as ProsperBot to serve these dynamic requests.

# Deploying ProsperBot

ProsperBot includes several different pieces and imposes some dependencies on the host system (Go, nginx, etc.). To simplify the process of deploying ProsperBot, I've written a couple of [Ansible roles](https://www.ansible.com/):

* **[mtlynch.prosperbot](https://galaxy.ansible.com/mtlynch/prosperbot/)** is the role that installs the core (headless) ProsperBot application.
* **[mtlynch.prosperbot-frontend](https://galaxy.ansible.com/mtlynch/prosperbot-frontend/)** deploys the frontend.

Splitting it this way makes it possible for someone to deploy ProsperBot, ProsperBot Frontend, and Redis each on a separate machine. I personally install all the components on a single server (example Ansible playbook for this is shown in the Github [README example](https://github.com/mtlynch/ansible-role-prosperbot-frontend#example-playbook)).

# Thoughts on Prosper

Overall, ProsperBot was a good learning experience for me, but I don't recommend Prosper as an investment strategy. A few reasons:

* **Unprofitable at small scales**: I get about 9% XIRR-based ROI from Prosper, which sounds decent at first *but* income from peer-to-peer lending is taxed as ordinary income, which eats a much larger portion of your returns than a more traditional investment like stocks. It also means it complicates my taxes enough that I need to hire a tax accountant instead of using off-the-shelf tax software, so that's $600 out of my earnings each year (almost 4% of a $16,000 investment).
* **Klunky API**: The Prosper API itself is not designed very well. For example, it uses token-based authentication (good) and assigns application develoepers a client ID and secret instead of username/password, but then requires the username and password for all authentication, rendering the client ID and secret meaningless (bad). I've also noticed the API serving nonsense data like notes receiving negative repayments, which shouldn't be happening for a production investment API.
* **Poor developer support**: In 2015, Prosper overhauled their API (their previous API was even worse), but told developers they had just a month to switch to the completely new API before they shut down the old system. It was pretty brazen move to expect all Prosper client developers to just drop everything they're doing and rewrite all their code within a month. To make matters worse, the new API was so buggy that Prosper had to extend the lifetime of the legacy API for another three months after forcing all the clients to scramble to meet the one-month deadline.
* **Decreased interest in retail investors**: Prosper seems to be focusing more on institutional investors such as banks and less on individual, retail investors. The biggest move in this regard was in September 2016, [Prosper announced](http://forum.lendacademy.com/index.php/topic,4104.0.html) that users could no longer sell loans on the secondary market. This was a drastic change in terms, as this made it impossible for investors to liquidate their Prosper holdings, so now I'm stuck with Prosper (and the associated tax headaches) for the next 5 years.

Prosper's diminished interest in retail investors has convinced me to begin taking my money out (which you can see in the graphs above). I've heard good things about Prosper's only major US competitor, Lending Club, so I'm planning to start moving my money there and writing a new lending bot for that site.
