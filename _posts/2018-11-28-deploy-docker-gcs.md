---
title: How to Connect a Docker Container to Google Cloud Storage
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
sidebar:
  nav: main
classes: wide
---

I've fallen in love with Docker over the past few years. It makes it easy to deploy apps to any environment you want.  I recently wanted a Dockerized app to write to Google Cloud Storage (GCS) but I couldn't find any instructions on how to do this short of completely rewriting the app to be GCS-aware. Through lots of trial and error, I got it to work.

TODO: Diagram of what it looks like.

# But why?

If you're not sold on Docker, I'm not going to try to convince you here, but I think containerization is the best thing to happen in software in the last ten years.

* Separates storage from the app itself.
* Trivial to patch the server
* Trivial to push new releases. Releases

The downside is that Docker makes you pay some more costs up front because you're working through another layer of abstraction. If you want to install your app to a traditional Linux server, it's trivial to access GCS. To deploy from within a Docker container, it's a bit more complicated.

TODO: Logging in StackDriver?

# Prerequisites

To start, you'll need to [install the Google Cloud SDK](https://cloud.google.com/sdk/install) and [authorize access](https://cloud.google.com/sdk/docs/authorizing).

Install Docker.

* [Docker Community Edition](https://store.docker.com/search?offering=community&type=edition) (free) installed on your system

# Creating components

* Create the new project
* Create the service account

```bash
PROJECT_ID=your-project-id
SERVICE_ACCOUNT_NAME=docker-launcher

gcloud iam service-accounts create "$SERVICE_ACCOUNT_NAME"
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member "serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role roles/storage.objectAdmin
```

# Dockerizing an app

Show how to dockerize the toy Python app.

# Deploying the Docker container

# Giving the Docker container access to GCS

# Limitations

There are