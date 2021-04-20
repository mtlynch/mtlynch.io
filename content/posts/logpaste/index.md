---
title: "How Litestream Eliminated My Database Server for $0.03/month"
date: "2021-04-05T00:00:00Z"
tags:
- tinypilot
- litestream
- docker
- logpaste
description: I've always hated maintaining database servers, and Litestream offers a simple way to eliminate them without sacrificing reliability or security.
custom_css: true
images:
- logpaste/og-cover.jpg
---
{{<notice type="danger">}}

**Note**: This is a pre-release blog post draft. Please do not share this URL.

{{</notice>}}

Here's a riddle. My web app keeps all of its data in a SQL database. I can spontaneously tear down my server, deploy the code to a completely different host, and the app will still serve all the same data. Running my app in production costs $0.03 per month.

How is this possible?

>That's easy. You have a separate database server running somewhere that stores all of your app's state.

No, my app never talks to a remote database server.

>Oh, then you're using a proprietary managed datastore like [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) or [Google Cloud Firestore](https://cloud.google.com/firestore).

Nope, my entire stack is open-source and platform-agnostic.

>Then what?

I combined [SQLite](https://sqlite.org/index.html), [Litestream](https://litestream.io/), and [Docker](https://www.docker.com/).

The tool is a simple web service called [LogPaste](https://logpaste.com). It allows users to generate shareable URLs for text files. I use it in my open source [KVM over IP](https://tinypilotkvm.com) device to give users an easy way to share diagnostic logs with me.

Sharing text files isn't exactly revolutionary, but I think Litestream is. LogPaste is just a straightforward example of using it in production. Here's a demo of me migrating a server from [Heroku](https://www.heroku.com/) to [fly.io](https://fly.io). There's no database server or data migration step, but all of my data persists between hosts:

<script id="asciicast-I2HcYheYayeh7aHj23QSY9Vyf" data-speed="2.0" data-size="medium" data-cols="80" src="https://asciinema.org/a/I2HcYheYayeh7aHj23QSY9Vyf.js" async></script>

The best part is that I didn't need to modify my app's code to make this possible. My software is just writing to a local SQLite database and has no idea that Litestream even exists.

In this post, I'll explain how I integrated Litestream into my app and how you can do the same to replace your expensive, complicated database server.

## Data persistence for people who hate database servers

I created LogPaste because all the existing [open-source text sharing services](https://github.com/awesome-selfhosted/awesome-selfhosted#pastebins) relied on an external database server. My shameful programmer secret is that I can't maintain a database server.

I've been building my own software products and services for the past eight years, and I've never used a database server in production. I don't want to be responsible for backups or software upgrades, so anything that requires a database server is a dealbreaker for me.

Instead, I've always used Google-managed datastores like Cloud Datastore, Firebase, and Firestore. But every few years, Google builds a totally new datastore solution, deprecates its old one, and [dumps all the migration work onto its customers](https://medium.com/@steve.yegge/dear-google-cloud-your-deprecation-policy-is-killing-you-ee7525dc05dc). I didn't want to build another service on top of a tech stack that Google would probably kill off soon.

{{<img src="gcp-deprecations.png" alt="Screenshot of AppEngine library documentation featuring several deprecation notices" caption="Google deprecated its Python DB Client library, forcing users to migrate to NDB. They then deprecated NDB in favor of Cloud NDB. Now, they're ominously directing developers to build new apps against yet another API." maxWidth="640px" hasBorder="true">}}

## Litestream: the serverless database server

A few months ago, I saw that [Ben Johnson](https://twitter.com/benbjohnson), author of the popular [Bolt database](https://github.com/boltdb/bolt), had taken on a new project: [Litestream](http://litestream.io). It's a simple, open-source tool that replicates a SQLite database to Amazon's S3 cloud storage.

{{<img src="litestream.png" alt="Screenshot of Litestream homepage" caption="[Litestream](http://litestream.io) is an open-source tool that replicates a SQLite database to Amazon's S3 cloud storage." maxWidth="700px" hasBorder="true">}}

It seemed neat, but I wasn't particularly excited about it at first. I never use SQLite, so what did I care?

I didn't have anything against SQLite, but the design seemed impractical. Unlike other databases that send data to an external server over the network, SQLite is just a library for writing to a local database file. I always worried, "What happens if I lose that file?"

Oh, wait a minute. I had dismissed Litestream because I didn't use SQLite, but Litestream solved my exact pain point with SQLite. Maybe this was worth a try.

As I thought more about it, I realized Litestream could be my ticket out of Google Cloud Platform. You can run SQLite anywhere, so Litestream allows you to choose any host you want for your app server. For data hosting, Litestream offers vendor flexibility by supporting any S3-compatible storage service, including [BackBlaze B2](https://www.backblaze.com/b2/cloud-storage.html), [Wasabi](https://wasabi.com/), and [Minio](https://min.io/).

Litestream sounded rosy in theory, but you can't really judge a technology until you test it in production, so my text sharing service seemed like the perfect experimental project.

## Creating the basic functionality

LogPaste needed to accept HTTP PUT requests from the command-line, so I began by writing [this simple HTTP handler](https://github.com/mtlynch/logpaste/blob/add9e363bd0ea0116d60e759778114ddbc979024/handlers/paste.go#L45L78) in Go:

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

One of Litestream's biggest strengths is that it's completely independent of the application it serves. My LogPaste code never calls into a Litestream API or does anything special to allow syncing. Litestream just quietly does its job in the background

To layer in Litestream on top of LogPaste, I created a custom Docker container. Generally, Docker containers should hold Just One Service, but I sometimes bend this rule to facilitate deployment. It's orders of magnitude easier to deploy a single, independent Docker container than two containers that need to coordinate with each other.

LogPaste's [Dockerfile](https://github.com/mtlynch/logpaste/blob/e6658318af9be4c72e73c6cba7730e98d238076b/Dockerfile) builds the LogPaste binary and pulls down the Linux executable for Litestream. The interesting part of my Docker setup is the [`docker_entrypoint` script](https://github.com/mtlynch/logpaste/blob/e6658318af9be4c72e73c6cba7730e98d238076b/docker_entrypoint), which runs when the container launches.

The script begins by creating a [Litestream configuration file](https://litestream.io/reference/config/), which specifies the cloud storage location where Litestream syncs my database. Because the container creates this file at runtime, anyone can reuse my Docker image to create their own LogPaste server by replacing these runtime S3 variables.

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

The client-side code is less than 30 lines of HTML and JavaScript:

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

I'm using LogPaste in production for [TinyPilot](https://tinypilotkvm.com), my open source KVM over IP device. Because users run my software on devices they own, LogPaste provides a convenient way for them to share their logs with me. LogPaste has been handling all of TinyPilot's debug logs for the past few months, and it's worked well.

{{<video src="tinypilot-shareable-log.mp4" caption="TinyPilot uses LogPaste to let users generate URLs for their debug logs.">}}

The cost for data replication really is just $0.03 per month:

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
* [litstream-s6-example](https://github.com/benbjohnson/litestream-s6-example): A more advanced and robust method for running Litestream alongside your app in a Docker container. It uses [s6-overlay](https://github.com/just-containers/s6-overlay) to restart the Litestream instance on failure.

---

*Architecture diagram by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/).*

*Thanks to [Ben Johnson](https://twitter.com/benbjohnson) for his work on Litestream and his early review of this article. Thanks to the members of the [Blogging for Devs Community](https://bloggingfordevs.com) for providing feedback on this post.*
