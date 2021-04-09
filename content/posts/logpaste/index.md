---
title: "How Litestream Replaced My Database Server for $0.03/month"
date: "2021-04-05T00:00:00Z"
tags:
- tinypilot
- litestream
- docker
- logpaste
description: I needed a simple way for users to share debug logs with me, so I built my own solution with Go and Litestream.
custom_css: true
---
{{<notice type="danger">}}

**Note**: This is a pre-release blog post draft. Please do not share this URL.

{{</notice>}}

Here's a riddle. My web app keeps all of its data in a SQL database. I can spontaneously tear down my server, deploy the code to a completely different host, and the app will still serve all the same data. It costs me $0.03 per month to run my app in production. How am I doing this?

>That's easy. You have a separate database server running somewhere that stores all of your app's state.

No, my app never talks to a remote database server.

>Oh, then you're using a proprietary managed datastore like [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) or [Google Cloud Firestore](https://cloud.google.com/firestore).

Nope, my entire stack is open-source and platform-agnostic.

>Then what?

I combined SQLite, Litestream, and Docker.

The tool is called [LogPaste](https://logpaste.com). It allows users to generate shareable URLs for text files. I use it in my open source [KVM over IP](https://tinypilotkvm.com) device to give my users an easy way to share logs with me.

Here's a demo of me migrating a server from Heroku to [fly.io](https://fly.io) without losing any data:

TODO: Demo

```bash
. /home/mike/go/src/github.com/mtlynch/logpaste/.dev.env

RANDOM_SUFFIX="$(head /dev/urandom | tr -dc 'a-z0-9' | head -c 6 ; echo '')"
APP_NAME="logpaste-${RANDOM_SUFFIX}"

# Show after this line

heroku apps:destroy --app "${APP_NAME}" --confirm "${APP_NAME}"

curl -s -L https://raw.githubusercontent.com/mtlynch/logpaste/master/dev-scripts/make-fly-config | \
  bash /dev/stdin "${APP_NAME}"

fly init "${APP_NAME}" --nowrite

fly secrets set \
  "AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}" \
  "AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}"

LOGPASTE_IMAGE="mtlynch/logpaste:0.1.1"

fly deploy \
  --env "AWS_REGION=${AWS_REGION}" \
  --env "DB_REPLICA_URL=${DB_REPLICA_URL}" \
  --image "${LOGPASTE_IMAGE}"

LOGPASTE_URL="https://${APP_NAME}.fly.dev/"
curl -s "$LOGPASTE_URL}/siiNbEMm"; echo
```

The best part is that I didn't need to modify my app's code to make this possible. As far as my software is concerned, it's writing to a local SQLite database. It has no idea that Litestream even exists.

In this post, I'll explain how I built LogPaste and how you can apply a similar model to replace your expensive, complicated database server.

## Data persistence for people who hate database servers

This all started because I wanted to deploy a service for sharing text files. There are at least [a dozen open-source text sharing services](https://github.com/awesome-selfhosted/awesome-selfhosted#pastebins), but almost all of them relied on an external database server.

My shameful programmer secret is that I can't maintain a database server.

I've been building my own software products and services for the last eight years, and I've never used a database server in production. I don't want to be responsible for database backups or software upgrades, so anything that requires a database is a dealbreaker for me.

Instead, I've always used Google-managed datastores like Cloud Datastore, Firebase, and Firestore. But every few years, Google builds a totally new datastore solution, deprecates its old solution, and [dumps all the migration work onto its customers](https://medium.com/@steve.yegge/dear-google-cloud-your-deprecation-policy-is-killing-you-ee7525dc05dc). I was tired of Google's [shiny object syndrome](https://en.wikipedia.org/wiki/Shiny_object_syndrome) and didn't want to build another service using technologies that Google would probably kill off soon.

{{<img src="gcp-deprecations.png" alt="Screenshot of AppEngine library documentation featuring several deprecation notices" caption="Google deprecated its Python DB Client library, forcing users to migrate to NDB. They then deprecated NDB in favor of Cloud NDB. Now, they're ominously directing developers to build new apps against yet another API." maxWidth="640px" hasBorder="true">}}

## Litestream: the serverless database server

A few months ago, I saw that [Ben Johnson](https://twitter.com/benbjohnson), author of the popular BoltDB database, had taken on a new project. It's called [Litestream](http://litestream.io), and it's a simple tool that replicates a SQLite database to Amazon's S3 cloud storage.

{{<img src="litestream.png" alt="Screenshot of Litestream homepage" caption="[Litestream](http://litestream.io) is an open-source tool that replicates a SQLite database to Amazon's S3 cloud storage." maxWidth="700px" hasBorder="true">}}

It seemed neat, but I wasn't particularly excited about it at first. I never use SQLite, so what did I care? I didn't have anything against SQLite, but it didn't seem practical. Unlike other databases that rely on a whole server process that accepts network connections, SQLite is just a library for writing to a local database file. I always worried, "What happens if I lose that database file?"

Hmm, hold on a sec. I dismissed Litestream because I don't use SQLite, but Litestream solves the exact obstacle that kept me from using with SQLite.

Best of all, it would be my ticket out of Google Cloud Platform! Litestream enables incredible vendor flexibility: I can run SQLite anywhere. And I have tons of options for data replication because there are many S3-compatible storage services, including [BackBlaze B2](https://www.backblaze.com/b2/cloud-storage.html), [Wasabi](https://wasabi.com/), and [Minio](https://min.io/).

At least, I hoped it would free me from Google. To see how Litestream performed in production, I'd have to deploy a real app that used it.

## Creating the basic functionality

Okay, time to build my text sharing service. LogPaste needed to accept HTTP PUT requests from the command-line, so I began by writing [this simple HTTP handler](https://github.com/mtlynch/logpaste/blob/add9e363bd0ea0116d60e759778114ddbc979024/handlers/paste.go#L45L78) in Go:

```go
func (s defaultServer) pastePut() http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
    // Read the full HTTP PUT request body as a string.
    bodyRaw, err := ioutil.ReadAll(r.Body)
    if err != nil {
      http.Error(w, "can't read request body", http.StatusBadRequest)
      return
    }
    body := string(bodyRaw)

    // Generate a random entry ID.
    id := generateEntryId()

    // Store the PUT body in the SQLite database.
    err = s.store.InsertEntry(id, body)
    if err != nil {
      http.Error(w, "can't save entry", http.StatusInternalServerError)
      return
    }

    // Send a JSON response with the ID we generated.
    w.Header().Set("Content-Type", "application/json")
    resp := PastePutResponse{
      Id: id,
    }
    if err := json.NewEncoder(w).Encode(resp); err != nil {
      panic(err)
    }
  }
}
```

The [`InsertEntry` implementation](https://github.com/mtlynch/logpaste/blob/master/store/sqlite/sqlite.go#L56L75) looks how you'd expect. It's just a basic SQLite row insertion:

```go
func (d db) InsertEntry(id string, contents string) error {
	_, err := d.ctx.Exec(`
	INSERT INTO entries(
		id,
		creation_time,
		contents)
	values(?,?,?)`, id, time.Now().Format(time.RFC3339), contents)
	return err
}
```

This allows LogPaste to accept HTTP requests from command-line utilities like this:

```bash
$ curl -X PUT -d "Hello, world!" http://localhost:3001
{"id":"fFnL9cU6"}
$ curl http://localhost:3001/fFnL9cU6
Hello, world!
```

That works, but it's just writing the SQLite database to the local filesystem. To deploy this to a public, production server, I needed to integrate Litestream to sync the database to cloud storage.

## Layering in Litestream for cloud data syncing

One of Litestream's biggest strengths is that it's completely independent of my application. My LogPaste code never calls into a Litestream API or does anything special to allow syncing. Litestream just does its job quietly in the background

To layer in Litestream on top of LogPaste, I created a custom Docker container. Generally, Docker containers should hold Just One Service, but I sometimes bend this rule to facilitate deployment. It's orders of magnitude easier to deploy a single, independent Docker container than two containers that need to coordinate with each other.

My [Dockerfile](https://github.com/mtlynch/logpaste/blob/e6658318af9be4c72e73c6cba7730e98d238076b/Dockerfile) built the LogPaste executable and pulls down the Linux executable for Litestream. The interesting part of my Docker setup is the [`docker_entrypoint` script](https://github.com/mtlynch/logpaste/blob/e6658318af9be4c72e73c6cba7730e98d238076b/docker_entrypoint), which runs when the container launches.

The script begins by creating a [Litestream configuration file](https://litestream.io/reference/config/), which specifies the cloud storage location where Litestream should sync the database. Because the container creates this file at runtime, anyone can reuse my Docker image to create their own LogPaste server by replacing these runtime S3 variables.

```bash
cat > /etc/litestream.yml <<EOF
access-key-id:     "${AWS_ACCESS_KEY_ID}"
secret-access-key: "${AWS_SECRET_ACCESS_KEY}"
dbs:
  - path: "${DB_PATH}"
    replicas:
      - url: "${DB_REPLICA_URL}"
EOF
```

With the configuration file in place, the script then uses Litestream to pull down the latest database. If this app is running for the first time and there's no database to pull down from S3, I set `CREATE_NEW_DB=true` to skip this step and allow LogPaste to bootstrap its own empty database.

```bash
# Restore database from S3.
if [[ "${CREATE_NEW_DB}" != 'true' ]]; then
  litestream restore -v "${DB_PATH}"
fi
```

Before the script launches the LogPaste web service, it spawns a Litestream instance in the background. The Litestream process watches my SQLite database and continually replicates it to my S3 bucket:

```bash
# Begin replication to S3 in the background.
litestream replicate "${DB_PATH}" "${DB_REPLICA_URL}" &
```

Finally, to run the Docker container with all the environment variables set properly, I use this command:

```bash
AWS_ACCESS_KEY_ID=YOUR-ACCESS-ID
AWS_SECRET_ACCESS_KEY=YOUR-SECRET-ACCESS-KEY
DB_REPLICA_URL=s3://your-bucket-name/db

docker run \
  -e "PORT=3001" \
  -e "AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}" \
  -e "AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}" \
  -e "DB_REPLICA_URL=${DB_REPLICA_URL}" \
  -e "CREATE_NEW_DB='true'" `# change to false after first run` \
  -p 3001:3001/tcp \
  --name logpaste \
  mtlynch/logpaste
```

Here's how [the full script](https://github.com/mtlynch/logpaste/blob/e6658318af9be4c72e73c6cba7730e98d238076b/docker_entrypoint) fits together:

{{<img src="diagram.jpg" caption="How LogPaste, Litestream, Docker, and S3 all fit together" maxWidth="750px" hasBorder="true">}}

TODO: I'm going to replace this diagram with a much prettier one that looks more [like this](/retrofit-docker-gcs/#planning-a-gcs-aware-architecture).

## LogPaste demo

Users can upload to LogPaste from the command line, but it's also easy to integrate with other web apps. Here's a simple HTML client for LogPaste that runs against my demo instance:

<div class="demo">
<div class="upload-form">
  <textarea id="upload-textarea" placeholder="Enter some text"></textarea>
  <button class="button" id="upload">Upload</button>
</div>
<a id="result"></a>
<div id="error"></div>
</div>

<script src="https://logpaste.com/js/logpaste.js"></script>
<script>
const baseUrl = 'https://logpaste.com';
document.getElementById("upload").addEventListener("click", (evt) => {
  const resultElement = document.getElementById("result");
  const errorElement = document.getElementById("error");
  resultElement.innerText = "";
  errorElement.innerText = "";
  const textToUpload = document.getElementById("upload-textarea").value;
  logpaste
    .uploadText(textToUpload, baseUrl)
    .then((id) => {
      const url = `${baseUrl}/${id}`;
      resultElement.innerText = url;
      resultElement.href = url;
    })
    .catch((error) => {
      errorElement.innerText = error;
    });
});
</script>

The code is pretty simple:

```html
<div class="upload-form">
  <textarea id="upload-textarea" placeholder="Enter some text"></textarea>
  <button class="button" id="upload">Upload</button>
</div>
<a id="result"></a>
<div id="error"></div>

<script src="https://logpaste.com/js/logpaste.js"></script>
<script>
const baseUrl = 'https://logpaste.com';
document.getElementById("upload").addEventListener("click", (evt) => {
  const resultElement = document.getElementById("result");
  const errorElement = document.getElementById("error");
  resultElement.innerText = "";
  errorElement.innerText = "";
  const textToUpload = document.getElementById("upload-textarea").value;
  logpaste
    .uploadText(textToUpload, baseUrl)
    .then((id) => {
      const url = `${baseUrl}/${id}`;
      resultElement.innerText = url;
      resultElement.href = url;
    })
    .catch((error) => {
      errorElement.innerText = error;
    });
});
</script>
```

## Using LogPaste in production

I run a business called [TinyPilot](https://tinypilotkvm.com). I develop and sell open source KVM over IP devices that let users control their servers remotely. LogPaste has been handling all of TinyPilot's debug logs for the past few months, and it's worked well.

{{<video src="tinypilot-shareable-log.mp4" caption="TinyPilot uses LogPaste to let users generate URLs for their debug logs.">}}

The costs for data replication really is just $0.03 per month:

{{<img src="aws-bill.png" alt="Screenshot of AWS bill showing $0.03 in S3 charges and $0.00 in data transfer fees" maxWidth="600px" hasBorder="true">}}

My use case is, admittedly, fairly gentle. Only a handful of users upload their logs each day, so there may be pain points with this setup under heavier workloads.

It's also important to note that Litestream can't resolve conflicts between multiple database writes, so you can only run one application server for each database.

Still, I've been incredibly impressed with Litestream, and I'm eager to use it in more scenarios.

## Self-hosting LogPaste

If you want to host your own instance of my LogPaste app, it's easy to deploy. You can even customize the text on the homepage so that it says your product's name instead of "LogPaste."

For example, here's TinyPilot's version:

{{<img src="tinypilot-branding.png" alt="Screenshot of TinyPilot's LogPaste instance" caption="TinyPilot's instance of LogPaste includes custom branding without any code changes" maxWidth="680px" hasBorder="true">}}

I've written deployment instructions for a few different platforms:

| Platform | Notes |
|----------|-------|
| [fly.io](https://github.com/mtlynch/logpaste/blob/master/docs/deployment/fly.io.md) | Three instances under the free tier, includes SSL certificates |
| [Amazon LightSail](https://github.com/mtlynch/logpaste/blob/master/docs/deployment/lightsail.md) | $7/month per instance, includes SSL certificates |
| [Heroku](https://github.com/mtlynch/logpaste/blob/master/docs/deployment/heroku.md) | On-demand instances under the free tier, $7/month for SSL certificates |

## Further reading

* [Litestream](https://litestream.io/): Includes straightforward documentation about using Litestream.
* [mtlynch/logpaste](https://github.com/mtlynch/logpaste): LogPaste's MIT-licensed source code and documentation.

---

*Architecture diagram by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/).*

*Thanks to Ben Johnson for his work on Litestream and his assistance with this article. Thanks to the members of the [Blogging for Devs Community](https://bloggingfordevs.com) for providing early feedback.*
