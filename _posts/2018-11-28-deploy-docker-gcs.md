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

# Prerequisites

To start, you'll need to [install the Google Cloud SDK](https://cloud.google.com/sdk/install) and [authorize access](https://cloud.google.com/sdk/docs/authorizing).

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