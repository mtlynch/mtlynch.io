---
title: "Deploying Syncthing on a Fly.io Cloud Server"
date: 2023-05-23T00:00:00-04:00
---

I recently discovered Syncthing (TODO: link), an open-source tool for syncing files across multiple machines.

{{<img src="syncthing-dashboard.png" has-border="true" max-width="700px">}}

I'd heard a lot about Syncthing, and I've been impressed in my short experience using it. I share most of my data across computers on my home storage server, but there are some files that I want to ensure are always in sync across my devices even when I'm not at home. I'd been using Microsoft OneDrive to sync these files, but I'd love to remove a dependency on Microsoft and replace it with something open-source.

## Why run Syncthing in the cloud?

So, I tried Syncthing, and I've liked it, but the one thing OneDrive has over it is that OneDrive never required all of my devices to be online at the same time. Syncthing's synchronization is entirely peer-to-peer. If I update a file on my desktop, shut down my desktop, then open up my laptop, my laptop won't have the new file. The laptop and desktop were never online at the same time, so they had no opportunity to exchange their latest changes.

To solve the problem of out-of-sync peers, I needed one computer running Syncthing that would always be online and always available to other

## I don't want your life story &mdash; just tell me how to deploy Syncthing

I'm going to talk about some approaches that failed, but if you want to skip to the solution, see the section ["How to deploy Syncthing to Fly.io"](#how-to-deploy-syncthing-to-flyio).

## Prior work: Syncthing + Tailscale on Fly.io

First, I searched to see if anyone was already running Syncthing on Fly.io. And it turns out, [Andrew Katz had written a nice tutorial](https://akatz.org/posts/running-syncthing-on-flyio-with-tailscale/) less than a year ago.

Andrew's tutorial was great news because it proved that my idea was feasible. But Andrew's solution depended on Tailscale:

> My next thought was that adding Tailscale into the mix would be a really nice addition and match the simplicity of setting up apps on Fly. This would ensure that all connections made to our Syncthing instance on Fly.io's server are through a VPN only - not through the public internet.

I understood why Andrew might want to do this, but it added a lot of complexity. Andrew had to build a custom Docker image that ran both Tailscale and Syncthing, which [violates Docker deployment guidance](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#decouple-applications).

Fly.io servers include Wireguard VPN by default, so I suspected that I could improve upon Andrew's solution by eliminating Tailscale from the mix.

## The linuxserver Docker image doesn't work on Fly.io

When I searched for a Syncthing Docker image, I somehow overlooked the [official Docker image](https://hub.docker.com/r/syncthing/syncthing) and instead found the [unofficial LinuxServer.io version](https://hub.docker.com/r/linuxserver/syncthing).

So, I tried launching with the linuxserver.io version, but the server on Fly.io went into a crash loop:

```text
2023-05-23T12:44:17.247 [info] Preparing to run: `/init` as root
2023-05-23T12:44:17.258 [info] 2023/05/23 12:44:17 listening on [fdaa:0:20ad:a7b:cb:a9e9:30cd:2]:22 (DNS: [fdaa::3]:53)
2023-05-23T12:44:17.261 [info] s6-overlay-suexec: fatal: can only run as pid 1
```

From some searching, I discovered a Fly.io support thread with the same issue, and this response:

> After some digging around I think I know what the issue is! Thanks to your last message with the error s6-overlay-suexec: fatal: can only run as pid 1 I was able to do some digging and found that the image I’m using, uses a process manager that wants to run as pid 1 which, according to [Running Multiple Processes Inside A Fly.io App](https://fly.io/docs/app-guides/multiple-processes/#there-are-so-many-other-process-managers), isn’t possible.
>
> -[@mpaupulaire](https://community.fly.io/t/deploying-grocy-image/6238/6?u=mtlynch)

Looking at the linuxserver Docker source, their runtime image [depends on linuxserver/baseimage-alpine](https://github.com/linuxserver/docker-syncthing/blob/caf5ba87db5202e261215b807c03dc59c740de01/Dockerfile#L37). I pulled up the source for [that image](https://github.com/linuxserver/docker-baseimage-alpine/blob/07df980344f2b046c255bf9be5a391fe2f4a06f8/Dockerfile), and I don't know much about overriding the `init` process, but there were several lines in the file related to init, so it looked like the issue @mpaupulaire spotted explained my crash loop.

## Setting up Syncthing without Tailscale

Now, I've got Syncthing running on Fly.io! I can grab the device ID from the logs and add my Fly.io Syncthing node as a peer.

But, there's still one problem. The Syncthing node still has to accept the peer relationship. There's no official Syncthing CLI, so I need to access Syncthing's admin interface.

I don't want to expose the Syncthing admin interface to the public Internet. I theoretically could expose it and set a really strong password, but I'd rather prevent access to my server at the network level.

Andrew Katz solved this by joining

```bash
fly ssh console
```

Unfortunately, the `fly ssh console` command doesn't have the feature of normal SSH where you can tunnel local ports to the other end of the SSH connection. But I did discover that fly has a `proxy` command, so I'll try that:

```bash
fly proxy 8384:8384
```

I found a Fly.io forum post called, ["Fly proxy seemingly doesn't work,"](https://community.fly.io/t/fly-proxy-seemingly-doesnt-work/7180?u=mtlynch) which described symptoms exactly like I was seeing:

> I’m trying to connect my local computer through fly proxy 8080 and tells me the following:
>
> `Proxying local port 8080 to remote [notion-to-calendar.internal]:8080`
>
> However, `curl localhost:8080` or `curl 0.0.0.0:8080` just hangs until I close the proxy.
>
> -[@bram-dingelstad](https://community.fly.io/t/fly-proxy-seemingly-doesnt-work/7180?u=mtlynch)

Yes! My thoughts exactly.

> only listeners bound on ipv6 are accessible via the `fly proxy` command.
>
> -[@jerome](https://community.fly.io/t/fly-proxy-seemingly-doesnt-work/7180/9?u=mtlynch)

I'd solved a similar issue once [when I used to maintain a popular Sia Docker image](/sia-nextcloud/#dockerfilesia). The solution then was to proxy connections using a tool called `socat`. I tried using `socat` to listen on IPv6 port 8386 and proxy the connection to IPv4 port 8384.

```bash
apk add socat && \
  socat TCP6-LISTEN:8386,fork,su=nobody TCP4:localhost:8384
```

Then I updated the `fly proxy` command to send traffic to the IPv6-friendly port:

```bash
fly proxy 8384:8386
```

And voila! It worked.

Advantage of Andrew Katz's solution is that he can access his Fly.io server's Syncthing admin interface at any time. I have to go through the ugly dance of setting up an ad-hoc proxy, but that's actually fine for me. I expect maintenance to be infrequent.

## Limiting trust in the Fly.io Syncthing node

One neat feature of Syncthing is that you can treat certain Syncthing peers as untrusted. So they can replicate your data, but they can only access encrypted versions of it.

That's a great solution here because I don't ever need the data in plaintext on the Fly.io server. I just need the server to let the other peers sync changes.

## How to deploy Syncthing to Fly.io
