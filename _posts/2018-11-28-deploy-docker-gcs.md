---
title: Retrofitting Apps for Google Cloud Storage without Changing a Line of Code
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

TODO: Show how to dockerize the toy Python app.

# Making it more realistic

TODO: Show how to add gunicorn and nginx.

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
gcloud services enable \
  cloudresourcemanager.googleapis.com \
  compute.googleapis.com \
  containerregistry.googleapis.com \
  iam.googleapis.com
	

# Enable gcloud to provide credentials to Docker.
gcloud auth configure-docker --quiet
```


```bash
LOCAL_IMAGE_NAME="flask-upload-demo-image"
docker build --tag "$LOCAL_IMAGE_NAME" .

GCR_HOSTNAME="gcr.io" # Change hostname to host images in a different location
GCR_IMAGE_PATH="${GCR_HOSTNAME}/${PROJECT_ID}/flask-demo-app"
docker tag "$LOCAL_IMAGE_NAME" "$GCR_IMAGE_PATH"
docker push "$GCR_IMAGE_PATH"
```

# Deploying the Docker container


```bash
VM_TAGS="http-server"
gcloud compute \
  --project="$PROJECT_ID" \
  firewall-rules create default-allow-http \
  --direction=INGRESS \
  --action=ALLOW \
  --rules=tcp:80 \
  --target-tags="$VM_TAGS"
```

```bash
VM_NAME="flask-demo-app-vm"
MACHINE_TYPE="n1-standard-1"
ZONE=us-east1-b
gcloud compute \
  --project="$PROJECT_ID" \
  instances create-with-container "$VM_NAME" \
  --zone="$ZONE" \
  --machine-type="$MACHINE_TYPE" \
  --network-tier=STANDARD \
  --metadata=google-logging-enabled=true \
  --maintenance-policy=MIGRATE \
  --scopes=https://www.googleapis.com/auth/cloud-platform \
  --tags="$VM_TAGS" \
  --image-family=cos-stable \
  --image-project=cos-cloud \
  --boot-disk-size=10GB \
  --boot-disk-type=pd-standard \
  --boot-disk-device-name="$VM_NAME" \
  --container-image="$GCR_IMAGE_PATH" \
  --container-restart-policy=on-failure
```

# Giving the Docker container access to GCS

```bash
STORAGE_LOCATION="us-east1"
GCS_BUCKET="${PROJECT_ID}-storage"
gsutil mb \
  -p "$PROJECT_ID" \
  -l "$STORAGE_LOCATION" \
  "gs://${GCS_BUCKET}"
```

Rebuild and push the image:

```bash
LOCAL_IMAGE_NAME="flask-upload-demo-image"
docker build --tag "$LOCAL_IMAGE_NAME" .

GCR_HOSTNAME="gcr.io" # Change hostname to host images in a different location
GCR_IMAGE_PATH="${GCR_HOSTNAME}/${PROJECT_ID}/flask-demo-app"
docker tag "$LOCAL_IMAGE_NAME" "$GCR_IMAGE_PATH"
docker push "$GCR_IMAGE_PATH"
```

Create a special service account.

```bash
SERVICE_ACCOUNT_NAME=custom-gce-service-account
SERVICE_ACCOUNT_EMAIL="${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

gcloud iam service-accounts create "$SERVICE_ACCOUNT_NAME"
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member "serviceAccount:${SERVICE_ACCOUNT_EMAIL}" \
  --role roles/storage.objectAdmin
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member "serviceAccount:${SERVICE_ACCOUNT_EMAIL}" \
  --role roles/logging.logWriter
```

```bash
VM_NAME="flask-demo-app-vm-gcsfuse"
MACHINE_TYPE="n1-standard-1"
ZONE=us-east1-b
gcloud compute \
  --project="$PROJECT_ID" \
  instances create-with-container "$VM_NAME" \
  --zone="$ZONE" \
  --machine-type="$MACHINE_TYPE" \
  --network-tier=STANDARD \
  --metadata=google-logging-enabled=true \
  --maintenance-policy=MIGRATE \
  --scopes=https://www.googleapis.com/auth/cloud-platform \
  --service-account="$SERVICE_ACCOUNT_EMAIL" \
  --tags="$VM_TAGS" \
  --image-family=cos-stable \
  --image-project=cos-cloud \
  --boot-disk-size=10GB \
  --boot-disk-type=pd-standard \
  --boot-disk-device-name="$VM_NAME" \
  --container-image="$GCR_IMAGE_PATH" \
  --container-restart-policy=on-failure \
  --container-privileged \
  --container-env "GCS_BUCKET=$GCS_BUCKET"
```

Explain `--container-privileged` and  `--container-env`.

# Updating container

```bash
docker build --tag "$LOCAL_IMAGE_NAME" .
docker tag "$LOCAL_IMAGE_NAME" "$GCR_IMAGE_PATH"
docker push "$GCR_IMAGE_PATH"
```

```bash
gcloud compute \
  --project="$PROJECT_ID" \
  instances update-container "$VM_NAME" \
  --container-image="$GCR_IMAGE_PATH"
```
	
# Limitations

There are

* Can't run applications that expect file locking like a normal filesystem (e.g. sqlite).

# A Real-World Example

TODO: Show MediaGoblin

Everything is the same except that MediaGoblin uses sqlite by default, which doesn't play nice with GCS. To work around this, I applied something hacky but works well enough. It writes to the VM filesystem and then asynchonously copies the file to GCS.

I used `sub_filter` to rewrite GCS URLs.