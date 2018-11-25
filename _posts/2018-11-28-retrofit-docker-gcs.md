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

To start, you'll need to [install the Google Cloud SDK](https://cloud.google.com/sdk/install).

Install Docker.

* [Docker Community Edition](https://store.docker.com/search?offering=community&type=edition) (free) installed on your system


# My example app

I created a toy app to demonstrate this process.

{% include image.html file="flask-app1.png" alt="Screenshot of demo app landing page" max_width="597px" %}


{% include image.html file="flask-app2.png" alt="Screenshot of demo app upload result" max_width="597px" %}

And now I can see that the app saved a copy of the uploaded file to the server under `demo/uploads`:

```bash
$ ls -l demo/uploads/
total 228
-rw-rw-r-- 1 mike mike 230720 Nov 24 21:45 Space_Duck_Desktop_RGB_PNG.png
```


**Note**: The example is a bit contrived because for an app as simple as [flask-upload-demo](https://github.com/mtlynch/flask_upload_demo), it would make more sense to rewrite the app itself to be GCS-aware. For the purposes of this article, flask-upload-demo represents an app whose code is impractical to modify.
{: .notice--info}

TODO: Show how to dockerize the toy Python app.

# Making it more realistic

Most web applications don't accept traffic directly from the browser. Instead, most applications use an HTTP server like nginx or Apache to handle the gruntwork, so I'll modify the Dockerfile slightly to add in nginx:

The complete code is available in the [`nginx` branch of my docker-flask-upload-demo repo](https://github.com/mtlynch/docker-flask-upload-demo/tree/nginx).

TODO: Show how to add nginx.

# Preparing your GCP Project

**Gotcha Warning**: Due to [an apparent bug in GCP](https://stackoverflow.com/q/53410165/90388), the Docker image push to gcr.io will fail if you use your root GCP account (e.g. your @gmail.com account) or a service account you create through `gcloud`. To work around this, you must create a service account through the GCP web console.
{: .notice--warning}

Set your project in `gcloud`:

```bash
PROJECT_ID="ENTER-YOUR-PROJECT-ID-HERE"
gcloud config set project "$PROJECT_ID"

```

Next, run some commands to prepare your project for the rest of the tutorial:

```bash
# Activate the service account you created.
gcloud auth activate-service-account --key-file key.json

# Enable APIs you'll need for this workflow.
gcloud services enable \
  cloudresourcemanager.googleapis.com \
  compute.googleapis.com \
  containerregistry.googleapis.com \
  iam.googleapis.com

# Enable gcloud to provide credentials for Docker image pushes.
gcloud auth configure-docker --quiet
```
# Uploading image to Google Container Registry

Before you can deploy a Docker image to GCE, you need to deploy it to Google Container Registry (GCR). To do that, first clone my example repo:

```bash
git clone \
  https://github.com/mtlynch/docker-flask-upload-demo.git \
  --branch nginx
cd docker-flask-upload-demo
```

Now, build the Docker image locally, and upload it to GCR:

```bash
LOCAL_IMAGE_NAME="flask-upload-demo-image"
docker build --tag "$LOCAL_IMAGE_NAME" .

GCR_HOSTNAME="gcr.io" # Change hostname to host images in a different location
GCR_IMAGE_PATH="${GCR_HOSTNAME}/${PROJECT_ID}/flask-demo-app"
docker tag "$LOCAL_IMAGE_NAME" "$GCR_IMAGE_PATH"
docker push "$GCR_IMAGE_PATH"
```

# Deploying the Docker container


GCE VMs do not allow inbound HTTP traffic by default. To allow it, I created a firewall rule and set it to apply to any VM deployed with the tag `http-server`.

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

Then, I created a GCE VM

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

Here are the interesting flags:

```bash
  --tags="$VM_TAGS" \
```

The `--tags` flag launches the VM using the tags you created for the firewall rules. This flag ensures that the firewall rules apply to this VM so that it can receive HTTP traffic on port 80.

```bash
  --image-family=cos-stable \
  --image-project=cos-cloud \
```

These flags tell GCE to run the container under the [Container-Optimized OS](https://cloud.google.com/container-optimized-os/docs/how-to/create-configure-instance), a special OS that Google developed. It's a stripped down Linux OS that runs only the components necessary for hosting Docker containers. The `--image-family=cos-stable` tells `gcloud` to use the latest stable version of the Container-Optimized OS.

```bash
--container-image="$GCR_IMAGE_PATH" \
```

The flag above tells GCE which Docker image to run within the GCE VM. This must be a GCR address, so the command specifies the GCR path you created earlier.

# Creating a GCS bucket (optional)

If you don't have a GCS bucket yet, you can create one using `gcloud` with the following command:

```bash
STORAGE_LOCATION="us-east1"
GCS_BUCKET="${PROJECT_ID}-storage"
gsutil mb \
  -p "$PROJECT_ID" \
  -l "$STORAGE_LOCATION" \
  "gs://${GCS_BUCKET}"
```

# Giving the Docker container access to GCS

Next, you'll need to modify the `Dockerfile` so that the Docker image includes a utility called `gcsfuse`, which allows you to mount GCS buckets to the filesystem.

The complete `Dockerfile` is [available on Github](https://github.com/mtlynch/docker-flask-upload-demo/blob/gcsfuse/Dockerfile), but here are the main changes:

```bash
# Install gcsfuse.
ARG GCSFUSE_REPO="gcsfuse-stretch"
ARG GCS_MOUNT_ROOT="/mnt/gcsfuse"
RUN set -x && \
    apt-get install --yes --no-install-recommends \
    ca-certificates \
    curl && \
    echo "deb http://packages.cloud.google.com/apt $GCSFUSE_REPO main" \
      | tee /etc/apt/sources.list.d/gcsfuse.list && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg \
      | apt-key add -
RUN apt-get update
RUN set -x && \
    apt-get install --yes gcsfuse && \
    echo 'user_allow_other' > /etc/fuse.conf && \
    mkdir --parents "$GCS_MOUNT_ROOT" && \
    chown \
      --no-dereference \
      "${APP_USER}:${NGINX_GROUP}" "$GCS_MOUNT_ROOT"
```

There are a two interesting elements here worth discussing:

```bash
echo 'user_allow_other' > /etc/fuse.conf
```

The above line makes it possible to use `gcsfuse`'s `-o allow_other` option. This is necessary because both the app system account and the nginx system account need access to the GCS folder. Without the `user_allow_other` line in the configuration file, only a single system account could access the GCS folder.

**Gotcha Warning**: If more than one system account will access the GCS bucket, the `/etc/fuse.conf` file must include the line `user_allow_other`.
{: .notice--warning}

```bash
mkdir --parents "$GCS_MOUNT_ROOT" && \
chown \
  --no-dereference \
  "${APP_USER}:${NGINX_GROUP}" "$GCS_MOUNT_ROOT"
```

`gcsfuse` requires an existing directory that the launching user can write to. Standard users don't have write access to the `/mnt` directory, so the `Dockerfile` creates the `/mnt/gcsfuse` directory as the `root` user and `chown`s it so that the demo app system account and the nginx system account can both write to it.

There are some more interesting changes to the `CMD` portion of the `Dockerfile` which defines what the Docker container does at runtime (after the image is built):

```bash
ENV GCS_BUCKET "REPLACE-WITH-YOUR-GCS-BUCKET-NAME"
ENV GCS_MOUNT_ROOT "$GCS_MOUNT_ROOT"
ENV APP_UPLOADS_DIR "${APP_ROOT}/demo/uploads"

CMD set -x && \
    sudo nginx && \
    gcsfuse \
      -o nonempty \
      -o allow_other \
      --implicit-dirs \
      "$GCS_BUCKET" "$GCS_MOUNT_ROOT" && \
    if [ ! -d "$APP_UPLOADS_DIR" ]; then \
      ln --symbolic "$GCS_MOUNT_ROOT" "$APP_UPLOADS_DIR"; \
    fi && \
    virtualenv VIRTUAL && \
    . VIRTUAL/bin/activate && \
    gunicorn \
      demo.app:app \
      --bind 0.0.0.0:5000 \
      --bind 127.0.0.1:5000 \
      --log-level info
```

# Deploying the GCS-aware container

First, you need to rebuild and push the Docker image:

```bash
LOCAL_IMAGE_NAME="flask-upload-demo-image"
docker build --tag "$LOCAL_IMAGE_NAME" .

GCR_HOSTNAME="gcr.io" # Change hostname to host images in a different location
GCR_IMAGE_PATH="${GCR_HOSTNAME}/${PROJECT_ID}/flask-demo-app"
docker tag "$LOCAL_IMAGE_NAME" "$GCR_IMAGE_PATH"
docker push "$GCR_IMAGE_PATH"
```

By default, GCE instances run under the context of the GCE service account. It has read access to GCS, but not write access. For the app to write the GCS, you need to create a service account with GCS write privileges. It's also convenient if the GCE VM can write log messages to StackDriver, so I've included that role as well:

```bash
SERVICE_ACCOUNT_NAME=flask-demo-app-service-account
SERVICE_ACCOUNT_EMAIL="${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

gcloud iam service-accounts create "$SERVICE_ACCOUNT_NAME"
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member "serviceAccount:${SERVICE_ACCOUNT_EMAIL}" \
  --role roles/storage.objectAdmin
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member "serviceAccount:${SERVICE_ACCOUNT_EMAIL}" \
  --role roles/logging.logWriter
```

**Gotcha Warning**: GCE instances will fail to write to GCS buckets unless you create special a special service account for them.
{: .notice--warning}

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


**Gotcha Warning**: `gcsfuse` will fail on GCE unless you deploy the VM with the `--container-privileged` flag.
{: .notice--warning}

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