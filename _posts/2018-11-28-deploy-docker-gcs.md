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


# Dockerizing an app

Show how to dockerize the toy Python app.

# Creating components

* Create the new project
* Create the service account

Create a new GCP project:

```bash

gcloud auth login
gcloud auth application-default login

PROJECT_NAME="flask-upload-demo"
PROJECT_ID="${PROJECT_NAME}-$(date +%Y%m%d)"

gcloud projects create "$PROJECT_ID" \
  --name "$PROJECT_NAME" \
  --set-as-default

gcloud config set project "$PROJECT_ID"
```

Create a service account to run the container (it must have read/write access to Google Cloud Storage):

```bash
SERVICE_ACCOUNT_NAME=container-service

gcloud iam service-accounts create "$SERVICE_ACCOUNT_NAME"
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member "serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role roles/storage.objectAdmin

SERVICE_ACCOUNT_NAME=container-deployer2

gcloud iam service-accounts create "$SERVICE_ACCOUNT_NAME"
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member "serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role roles/container.clusterAdmin
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member "serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role roles/container.storage.admin

KEY_FILE="${HOME}/key.json"
gcloud iam service-accounts keys create "$KEY_FILE" \
  --iam-account "${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
	
gcloud auth activate-service-account --key-file="${HOME}/key.json"
```

Enable the Container Registry API:

```bash
gcloud services enable containerregistry.googleapis.com
# Enable gcloud to provide credentials to Docker.
gcloud auth configure-docker --quiet

LOCAL_IMAGE_NAME="flask-upload-demo-image"
docker build --tag "$LOCAL_IMAGE_NAME" .

GCR_HOSTNAME="gcr.io" # Change hostname to host images in a different location
GCR_IMAGE_PATH="${GCR_HOSTNAME}/${PROJECT_ID}/flask-demo-app"
docker tag "$LOCAL_IMAGE_NAME" "$GCR_IMAGE_PATH"
docker push "$GCR_IMAGE_PATH"
```

TODO: Figure out why this doesn't work

# Deploying the Docker container

```bash
gcloud services enable compute.googleapis.com
```

```bash
VM_NAME="flask-demo-app-vm"
VM_IMAGE="cos-stable-70-11021-67-0"
VM_TAGS="basic-flask"
MACHINE_TYPE="n1-standard-1"
ZONE=us-east1-b
gcloud beta compute \
  --project="$PROJECT_ID" \
  instances create-with-container "$VM_NAME" \
  --zone="$ZONE" \
  --machine-type="$MACHINE_TYPE" \
  --network-tier=STANDARD \
  --metadata=google-logging-enabled=true \
  --maintenance-policy=MIGRATE \
  --scopes=https://www.googleapis.com/auth/cloud-platform \
  --tags="$VM_TAGS" \
  --image="$VM_IMAGE" \
  --image-project=cos-cloud \
  --boot-disk-size=10GB \
  --boot-disk-type=pd-standard \
  --boot-disk-device-name="$VM_NAME" \
  --container-image="$GCR_IMAGE_PATH" \
  --container-restart-policy=on-failure
```

```bash
FLASK_PORT=5000
gcloud compute \
  --project="$PROJECT_ID" \
  firewall-rules create allow-flask \
  --direction=INGRESS \
  --action=ALLOW \
  --rules="tcp:${FLASK_PORT}" \
  --target-tags="$VM_TAGS"
```

# Giving the Docker container access to GCS

# Limitations

There are

* Can't run applications that expect file locking like a normal filesystem (e.g. sqlite).