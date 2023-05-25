---
title: "Deploying Syncthing on a Fly.io Cloud Server"
date: 2023-05-23T00:00:00-04:00
---

I recently discovered [Syncthing](https://syncthing.net/), an open-source tool for syncing files across multiple machines.

{{<img src="syncthing-dashboard.png" has-border="true" max-width="700px">}}

I share most of my data across computers on my [home storage server](/budget-nas/), but there are some files that I want to ensure are always in sync across my devices even when I'm not at home. I'd been using Microsoft OneDrive, but I'd love to remove a dependency on Microsoft and replace it with something open-source and cross-platform.

## Why run Syncthing in the cloud?

Syncthing synchronizes peer to peer. If I change a file on my desktop, shut down, and then take my laptop with me on a work trip, my laptop won't pick up the changes I made on my desktop because the two devices weren't online at the same itme.

To solve the problem of out-of-sync peers, I needed one computer running Syncthing that would always be online and always available to share changes with my other devices.

## I don't want your life story &mdash; just tell me how to deploy Syncthing

I'm going to talk about some approaches that failed, but if you want to skip to the solution, see the section, ["How to deploy Syncthing to Fly.io"](#how-to-deploy-syncthing-to-flyio).

## Prior work: Syncthing + Tailscale on Fly.io

First, I searched to see if anyone was already running Syncthing on Fly.io. And it turns out, [Andrew Katz had written a nice tutorial](https://akatz.org/posts/running-syncthing-on-flyio-with-tailscale/) less than a year ago.

{{<img src="akatz-tutorial.png" has-border="true" max-width="600px">}}

Andrew's tutorial was great news because it proved that my idea was feasible.

But Andrew's solution depended on Tailscale:

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

> After some digging around I think I know what the issue is! Thanks to your last message with the error `s6-overlay-suexec: fatal: can only run as pid 1`
>
> I was able to do some digging and found that the image I’m using, uses a process manager that wants to run as pid 1 which, according to [Running Multiple Processes Inside A Fly.io App](https://fly.io/docs/app-guides/multiple-processes/#there-are-so-many-other-process-managers), isn’t possible.
>
> -[@mpaupulaire](https://community.fly.io/t/deploying-grocy-image/6238/6?u=mtlynch)

Looking at the linuxserver Docker source, their runtime image [depends on linuxserver/baseimage-alpine](https://github.com/linuxserver/docker-syncthing/blob/caf5ba87db5202e261215b807c03dc59c740de01/Dockerfile#L37). I pulled up the source for [that image](https://github.com/linuxserver/docker-baseimage-alpine/blob/07df980344f2b046c255bf9be5a391fe2f4a06f8/Dockerfile), and I don't know much about overriding the `init` process, but there were several lines in the file related to init, so it looked like the issue @mpaupulaire spotted explained my crash loop.

## The official Syncthing Docker image works on Fly.io

Instead of checking more rigorously for an official Syncthing Docker image, I spent three hours [making my own](https://github.com/mtlynch/docker-syncthing). And then when I sat down to write this tutorial, I realized I had overlooked [the official image](https://hub.docker.com/r/syncthing/syncthing) that I wouldn't have to maintain, so let's skip to that.

```bash
$ fly apps create --name syncthing-mtlynch
? Select Organization: Michael Lynch (personal)
New app created: syncthing-mtlynch
```

```toml
app = "syncthing-mtlynch"

[build]
  image = "syncthing/syncthing:1.23.4"

[mounts]
  source="syncthing"
  destination="/var/syncthing"
```

```bash
$ fly deploy
==> Verifying app config
Validating /tmp/tmp.mezhLZdpSv/fly.toml
Platform: machines
✓ Configuration is valid
--> Verified app config
==> Building image
Searching for image 'syncthing/syncthing:1.23.4' remotely...
image found: img_98dgp8mlx504xw05

Watch your app at https://fly.io/apps/syncthing-mtlynch/monitoring

Updating existing machines in 'syncthing-mtlynch' with rolling strategy
  [1/1] Replacing 6e82ddd3ae5698 [app] by new machine
  [1/1] Machine 918570e1f96283 [app] update finished: success
  Finished deploying
```

And it works! From the logs, Fly is up and running.

```text
2023/05/25 12:09:52 INFO: My ID: YERKMWG-WMUKYOR-J57TFK7-LQ3NHPX-6TI5AFU-IX7SEEW-GX7QO3C-NPYATQT
2023/05/25 12:09:53 INFO: GUI and API listening on [::]:8384
2023/05/25 12:09:53 INFO: Access the GUI via the following URL: http://127.0.0.1:8384/
2023/05/25 12:09:53 INFO: My name is "918570e1f96283"
2023/05/25 12:09:53 INFO: Completed initial scan of sendreceive folder "Default Folder" (default)
2023/05/25 12:10:12 INFO: quic://0.0.0.0:22000 detected NAT type: Port restricted NAT
2023/05/25 12:10:12 INFO: quic://0.0.0.0:22000 resolved external address quic://66.225.222.75:22000 (2023/05/25 12:10:32 INFO: Joined relay relay://54.175.93.212:443
```

If I add the new server's to my local Syncthing server as a remote peer by device ID (`YERKMWG-WMUKYOR-J57TFK7-LQ3NHPX-6TI5AFU-IX7SEEW-GX7QO3C-NPYATQT`), it can't connect.

That's expected because I haven't configured Fly to allow any inbound traffic.

## Creating a Syncthing config file

I'll start with the basics. The `fly.toml` file has my app's name and deployment region:

```toml
app = "syncthing-mtlynch"
primary_region = "ewr"
```

Next, I'll specify the Docker image to use, which is version 1.23.4, the latest stable release as of this writing:

```toml
[build]
  image = "syncthing/syncthing:1.23.4"
```

Next, I have to connect Fly's persistent volume to the place in the filesystem where Fly stores its data, [which is `/var/syncthing`](https://github.com/syncthing/syncthing/blob/716b42103a7296c6a5ebcb0886c43666d2278ae4/Dockerfile#L30).

```toml
[mounts]
  source="syncthing_data"
  destination="/var/syncthing"
```

Next, I have to tell Fly to accept inbound traffic on a few ports that Syncthing [needs to communicate with peers](https://docs.syncthing.net/users/firewall.html#local-firewall):

> Port 22000/TCP: TCP based sync protocol traffic
>
> Port 22000/UDP: QUIC based sync protocol traffic
>
> Port 21027/UDP: for discovery broadcasts on IPv4 and multicasts on IPv6

Here's how I tell Fly how to allow traffic to those ports. I decided to use port 22000 as a health check port. Fly will periodically poll that port, and if it can't connect, then it will know that Syncthing is not healthy.

```toml
[[services]]
  internal_port = 22000
  protocol = "tcp"

  [[services.ports]]
    port = 22000

  [[services.tcp_checks]]
    grace_period = "1s"
    interval = "15s"
    restart_limit = 0
    timeout = "2s"

[[services]]
  internal_port = 22000
  protocol = "udp"

  [[services.ports]]
    port = 22000

[[services]]
  internal_port = 21027
  protocol = "udp"

  [[services.ports]]
    port = 21027
```

Synthing's admin interface defaults to 0.0.0.0:8384, so it accepts connections on both private and public network interfaces. This shouldn't _really_ matter since my Fly config doesn't expose 8384, but for the sake of defense in depth, I'll configure Syncthing to listen only on the loopback interface.

Syncthing's [documentation](https://github.com/syncthing/syncthing/blob/v1.23.4/README-Docker.md#gui-security) explains that you can restrict access to the admin UI by unsetting the `STGUIADDRESS` environment variable.

```toml
[env]
  # Only listen for connections to admin GUI through localhost.
  STGUIADDRESS = ""
```

Putting it all together, my `fly.toml` file looks like this:

```toml
app = "syncthing-mtlynch"
primary_region = "ewr"

[build]
  image = "syncthing/syncthing:1.23.4"

[env]
  # Only listen for connections to admin GUI through localhost.
  STGUIADDRESS = ""

[mounts]
  source="syncthing_data"
  destination="/var/syncthing"

[[services]]
  internal_port = 22000
  protocol = "tcp"

  [[services.ports]]
    port = 22000

  [[services.tcp_checks]]
    grace_period = "1s"
    interval = "15s"
    restart_limit = 0
    timeout = "2s"

[[services]]
  internal_port = 22000
  protocol = "udp"

  [[services.ports]]
    port = 22000

[[services]]
  internal_port = 21027
  protocol = "udp"

  [[services.ports]]
    port = 21027
```

My config file maps a Fly persistent volume called `syncthing_data`, so I'll create that now:

```bash
SIZE_IN_GB=3 # This is the limit of fly.io's free tier as of 2023-05-24

fly volumes create syncthing_data \
  --region ewr \
  --size "${SIZE_IN_GB}" \
  --yes
```

## Configuring Syncthing without Tailscale

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

## Can I avoid the socat hack?

```toml
[env]
  STGUIADDRESS = "::1:8384"
```

That caused Syncthing to go into a crash loop with this error in the logs:

```text
WARNING: Starting API/GUI: listen tcp: address ::1:8384: too many colons in address
```

Wait, does Syncthing not know IPv6? That would be strange. Checking [the documentation](https://docs.syncthing.net/users/config.html#config-option-gui.address):

> IPv6 address and port ([::1]:8384)
>
> The address and port are used as given. The address must be enclosed in square brackets.

Oh, okay. I need some brackets:

```toml
[env]
  STGUIADDRESS = "[::1]:8384"
```

Success! That let Syncthing run successfully. Now, I'll try the proxy command again:

```bash
fly proxy 8384:8384
```

```bash
$ curl http://localhost:8384/
curl: (56) Recv failure: Connection reset by peer
```

```text
[UPMD6] 2023/05/25 11:41:16 INFO: Listen (BEP/tcp): TLS handshake: EOF
```

## Limiting trust in the Fly.io Syncthing node

One neat feature of Syncthing is that you can treat certain Syncthing peers as untrusted. So they can replicate your data, but they can only access encrypted versions of it.

That's a great solution here because I don't ever need the data in plaintext on the Fly.io server. I just need the server to let the other peers sync changes.

## How to deploy Syncthing to Fly.io

### Pre-requisites

Before you begin, you'll need:

- A Fly.io account (with billing activated)
- The `fly` CLI [installed](https://fly.io/docs/getting-started/installing-flyctl/) and authenticated on your machine

### Create your app

First, create a new Fly.io app. The snippet below names your app `syncthing-` plus a random suffix, but you can choose any app name that isn't already claimed on Fly.io.

```bash
RANDOM_SUFFIX="$(head /dev/urandom | tr -dc 'a-z0-9' | head -c 6 ; echo '')"
APP_NAME="syncthing-${RANDOM_SUFFIX}"

fly apps create --name "${APP_NAME}"
```

### Create a persistent volume

For `REGION`, select the region where you deployed your app in the first step.

You'll also need a persistent volume so that Syncthing doesn't lose your configuration and data on every server restart. You can choose any volume size, but Fly [offers 3 GB in the free tier](https://fly.io/docs/about/pricing/#free-allowances) as of this writing.

```bash
# Choose the region where you deployed your app from the list on:
# https://fly.io/docs/reference/regions/
REGION="ewr"

VOLUME_NAME="syncthing_data"
SIZE_IN_GB=3 # This is the limit of fly.io's free tier as of 2023-05-24

fly volumes create "${VOLUME_NAME}" \
  --region "${REGION}" \
  --size "${SIZE_IN_GB}" \
  --yes
```

### Create Fly configuration file

Next, create a Fly configuration file for your deployment.

Here, you can choose which version of Syncthing to deploy. You can choose [any tag available](https://hub.docker.com/r/syncthing/syncthing/tags) from Syncthing's Docker image.

I prefer to know exactly what version I'm running, so I'm setting `SYNCTHING_VERSION` to the explicit `1.23.4` version image. If you want to upgrade your Syncthing server more aggressively, you can replace the version with `latest`, and you'll always get the latest stable version. If you're feeling wild, you can choose `edge` or `nightly` for an unstable release with bleeding edge features.

```bash
SYNCTHING_VERSION="1.23.4"

cat <<EOF > fly.toml
app = "${APP_NAME}"
primary_region = "${REGION}"

[build]
  image = "syncthing/syncthing:${SYNCTHING_VERSION}"

[env]
  TZ = "Etc/UTC"
  # Only listen for connections to admin GUI through localhost.
  STGUIADDRESS = ""

[[services]]
  internal_port = 22000
  protocol = "tcp"

  [[services.ports]]
    port = 22000

  [[services.tcp_checks]]
    grace_period = "1s"
    interval = "15s"
    restart_limit = 0
    timeout = "2s"

[[services]]
  internal_port = 22000
  protocol = "udp"

  [[services.ports]]
    port = 22000

[[services]]
  internal_port = 21027
  protocol = "udp"

  [[services.ports]]
    port = 21027

[mounts]
source="${VOLUME_NAME}"
destination="/var/syncthing"
EOF
```
