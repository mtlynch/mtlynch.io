---
title: Retrofitting Apps for Cloud Storage with Zero Code Changes
tags:
- docker
- google cloud storage
- gcsfuse
- google compute engine
- google container registry
description: An exercise in integrating Docker, Google Cloud Storage, and the gcsfuse
  utility.
discuss_urls:
  reddit: https://redd.it/a3206o
date: '2018-12-04'
images:
- retrofit-docker-gcs/full-architecture.jpg
---

I recently installed a media sharing app to one of my servers. It was simple to install, but it hid a dastardly trap for long-term maintenance.

Every time a user uploaded a file, the web app saved it to the local filesystem. If I ever blew away the server and rebuilt it, I'd have to backup and restore every file manually. The better architecture would be for the app to write its files to a separate storage server, but I didn't want to spend months rewriting the app to make that possible.

{{< img src="naive-vs-desired.jpg" alt="Naive architecture vs desired architecture" maxWidth="800px" >}}

Using Docker, Google Cloud Storage, and the [gcsfuse](https://github.com/GoogleCloudPlatform/gcsfuse) utility, I achieved this separation without changing a single line of the app's code.

In this tutorial, I'll show you how to retrofit legacy apps for Google Cloud Storage while minimizing source changes.

## Defining terms

If you're unfamiliar with Google Cloud Platform, here are a few abbreviations to know for this tutorial:

| Abbreviation | Stands for | What is it? | Similar to |
|------------------|--------------|--------------|-------------|
| **GCS** | Google Cloud Storage | Google's cloud storage service | Amazon S3 |
| **GCE** | Google Compute Engine | Google's on-demand virtual machine service | Amazon EC2 |
| **GCR** | Google Container Registry | Google's hosting service for Docker images | Docker Hub |
| **GCP** | Google Cloud Platform | Google's cloud computing platform (GCS, GCE, and GCR are all parts of GCP) | Amazon Web Services or Microsoft Azure |

{{< img src="docker-logo.png" alt="Docker logo" maxWidth="260px" >}}

**Docker** allows developers to build self-contained environments for an application that run anywhere:

* A **Docker image** is the set of all files needed to run an app, including the operating system and all third-party dependencies.
* A **Docker container** is the live environment in which a Docker image executes.

For this tutorial, you can think of Docker containers as lightweight virtual machines even though that's technically [not what they are](https://blog.docker.com/2016/03/containers-are-not-vms/).

## Prerequisites

To follow along with my examples, you'll need the following:

* [Google Cloud SDK](https://cloud.google.com/sdk/install)
* [Docker](https://www.docker.com/) (the free [Community Edition](https://store.docker.com/search?offering=community&type=edition) is fine)

## My example app

I created an [example project](https://github.com/mtlynch/flask_upload_demo) for this tutorial. It's a dead simple web app based on the Flask framework's [upload documentation](http://flask.pocoo.org/docs/1.0/patterns/fileuploads/).

To run it, enter the following:

```bash
git clone https://github.com/mtlynch/flask_upload_demo.git
cd flask_upload_demo
sudo pip install -r requirements.txt
gunicorn \
  demo.app:app \
  --bind 0.0.0.0:5000
```

The app lets you choose a file and upload it:

{{< img src="flask-app1.png" alt="Screenshot of demo app landing page" caption="Upload page of flask-upload-demo" maxWidth="685px" >}}

Then, it serves the file permanently at the URL `http://[server address]:5000/uploads/[filename]`:

{{< img src="flask-app2.png" alt="Screenshot of demo app upload result" caption="flask-upload-demo serving an uploaded image" maxWidth="685px" >}}

From within the server, you can see that the app saved the file to the `demo/uploads` folder of its local filesystem:

```bash
$ ls -l demo/uploads/
-rw-rw-r-- 1 mike mike 230720 Nov 24 21:45 Space_Duck_Desktop_RGB_PNG.png
```

## Dockerizing the example app

Because this app only has a few simple dependencies, it's easy to create a Docker image for it:

### `Dockerfile`

```bash
FROM debian:stretch

RUN apt-get update
RUN apt-get install --yes \
      git-core \
      python \
      python-pip \
      python-virtualenv

# Create demo user system account.
ARG APP_USER="demo-user"
ARG APP_GROUP="demo-user"
ARG APP_HOME_DIR="/home/demo-user"
RUN set -x && \
    groupadd "$APP_GROUP" && \
    useradd \
      --comment "Demo app system account" \
      --home-dir "$APP_HOME_DIR" \
      --create-home \
      --system \
      --gid "$APP_GROUP" \
      "$APP_USER"

# Create directory for app source code.
ARG APP_ROOT="/srv/demo-app"
RUN mkdir --parents "$APP_ROOT" && \
    chown \
      --no-dereference \
      --recursive \
      "${APP_USER}:${APP_GROUP}" "$APP_ROOT"

USER "$APP_USER"
WORKDIR "$APP_ROOT"

# Install demo app.
ARG DEMO_APP_REPO="https://github.com/mtlynch/flask_upload_demo"
RUN set -x && \
    git clone "$DEMO_APP_REPO" . && \
    virtualenv VIRTUAL && \
    . VIRTUAL/bin/activate && \
    pip install --requirement requirements.txt

EXPOSE 5000

# Run demo app.
ENV FLASK_APP "demo/app.py"
CMD virtualenv VIRTUAL && \
    . VIRTUAL/bin/activate && \
    gunicorn \
      demo.app:app \
      --bind 0.0.0.0:5000 \
      --log-level info
```

The above `Dockerfile` performs a few high-level tasks to prepare the image:

1. Installs Git, Python and associated packages
1. Creates a system account (`demo-user`) to run the app with limited privileges
1. Clones the [app source repo](https://github.com/mtlynch/flask_upload_demo) locally
1. Adds a `CMD` to start the demo app on port 5000

You can test this `Dockerfile` by cloning [my repo](https://github.com/mtlynch/docker-flask-upload-demo) and building the Docker container locally:

```bash
cd ~
git clone https://github.com/mtlynch/docker-flask-upload-demo.git
cd docker-flask-upload-demo

docker build \
  --tag demo-app-image \
  .

docker run \
  --detach \
  --publish 80:5000 \
  --name demo-app \
  demo-app-image
```

If you visit [http://localhost/](http://localhost/) in a browser, you'll see the demo app.

## A more realistic Docker image

Most web apps don't accept traffic directly from the browser. Instead, they use an HTTP server like Nginx or Apache to handle generic tasks (e.g., load-balancing, serving static files) while the backend handles the app-specific logic.

I added the [`nginx` branch to my Docker repo](https://github.com/mtlynch/docker-flask-upload-demo/tree/nginx) to demonstrate a Docker image that's closer to what you'd use in a real-world app. The relevant changes are below:

```bash
# Install nginx.
ARG NGINX_GROUP="www-data"
COPY nginx.conf /etc/nginx/sites-enabled/nginx.conf
RUN set -x && \
    apt-get install --yes \
      nginx \
      sudo && \
    rm /etc/nginx/sites-enabled/default && \
    usermod --append --groups "$NGINX_GROUP" "$APP_USER" && \
    echo "$APP_USER ALL=(ALL:ALL) NOPASSWD: /usr/sbin/nginx" >> /etc/sudoers
```

Nginx typically runs as root so that it can listen on privileged HTTP ports 80 and 443. Therefore, the `Dockerfile` uses `sudo` to allow the demo app user to launch Nginx as `root` while still performing all of its other activities with limited privileges.

Lastly, it copies an Nginx configuration file into the container:

### `nginx.conf`

```text
server {
    listen       80;
    server_name  example.org; # Replace with your server's domain name
    client_max_body_size 20m;

    # Serve static resources directly (bypass backend).
    location /uploads/ {
        alias /srv/demo-app/demo/uploads/;
    }

    # Forward all other requests to the application backend.
    location / {
        proxy_pass http://127.0.0.1:5000;
    }
}
```

The `location /uploads { ... }` block allows Nginx to serve files from the `/uploads` folder directly instead of forwarding the request to the flask-upload-demo backend. This is a common configuration, as Nginx handles static files faster and more efficiently than the app backend.

You can run the Nninx version of flask-upload-demo with the commands below:

```bash
cd ~/docker-flask-upload-demo
git checkout nginx

docker build \
  --tag demo-app-image \
  .

docker run \
  --detach \
  --publish 80:80 \
  --name demo-app \
  demo-app-image
```

The app will once again appear at [http://localhost/](http://localhost/). The behavior is identical to the previous version except that it uses fewer resources to serve file uploads.

## Preparing your GCP Project

Deploying your app locally is neat, but it's more exciting to publish to the cloud, where all of your users can access it. You'll need to take a few steps to configure your system to deploy to GCP.

First, specify your GCP project's name in `gcloud`:

```bash
PROJECT_ID="ENTER-YOUR-PROJECT-ID-HERE"
gcloud config set project "$PROJECT_ID"
```

Next, use the GCP web console to [create a service account](https://console.cloud.google.com/iam-admin/serviceaccounts) with the owner role:

{{<notice type="warning">}}
**Gotcha Warning**: Due to [an apparent bug in GCP](https://stackoverflow.com/q/53410165/90388), the Docker image push to gcr.io (see the following section) fails if you use your root GCP account (e.g., your @gmail.com account) or a service account you create through `gcloud`.
{{< /notice >}}

{{< img src="service-account-1.png" alt="Screenshot of service account creation screen" caption="Creating a new service account from the GCP web console" maxWidth="799px" hasBorder="True" >}}

{{< img src="service-account-2.png" alt="Screenshot of service account role selection screen" caption="Assigning a role to the service account" maxWidth="799px" hasBorder="True" >}}

Download the private key as `key.json`:

{{< img src="service-account-3.png" alt="Screenshot of service account private key download" caption="Downloading private keys for the service account" maxWidth="799px" hasBorder="True" >}}

Finally, use gcloud to authenticate as the service account you just created:

```bash
gcloud auth activate-service-account --key-file key.json
```

Now that you've authenticated, you'll need to run a few commands to prepare your project for the rest of the tutorial:

```bash
# Enable APIs you'll need for this workflow.
gcloud services enable \
  cloudresourcemanager.googleapis.com \
  compute.googleapis.com \
  containerregistry.googleapis.com \
  iam.googleapis.com

# Enable gcloud to provide credentials for Docker image pushes.
gcloud auth configure-docker --quiet
```
## Uploading image to Google Container Registry

Before you deploy a Docker image to GCE, you need to publish it to a Docker image hosting service. GCR is Google Cloud's integrated Docker image hosting service, so that's the easiest option.

To upload your Docker image to GCR, check out the `nginx` branch of my example repo:

```bash
cd ~/docker-flask-upload-demo
git checkout nginx
```

Now, build the Docker image locally, and push the image to GCR:

```bash
LOCAL_IMAGE_NAME="flask-upload-demo-image"
docker build --tag "$LOCAL_IMAGE_NAME" .

GCR_HOSTNAME="gcr.io"
GCR_IMAGE_PATH="${GCR_HOSTNAME}/${PROJECT_ID}/flask-demo-app"
docker tag "$LOCAL_IMAGE_NAME" "$GCR_IMAGE_PATH"
docker push "$GCR_IMAGE_PATH"
```

## Deploying the Docker container

Deploying the container requires a bit of indirection. GCP doesn't allow you to deploy a Docker image directly. Instead, you use GCE to spin up a full virtual machine (VM), run Docker on that VM, and then GCE runs your Docker image in a container in that VM. Fortunately, GCP's tools simplify this process.

GCE VMs forbid inbound HTTP traffic by default. To allow it, create a firewall rule that accepts TCP connections on port 80 (the standard port for plaintext HTTP traffic).

An easy way to do this is to apply the rule to any VM with the tag `http-server`:

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

Then, deploy your GCE VM with the `http-server` tag:

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

The `--tags` flag launches the VM using the tags you created for the firewall rules. This flag ensures that it receives HTTP traffic on port 80.

```bash
  --image-family=cos-stable \
  --image-project=cos-cloud \
```

These flags tell GCE to run the container under the [Container-Optimized OS](https://cloud.google.com/container-optimized-os/docs/how-to/create-configure-instance), a stripped-down Linux OS that Google created to run Docker containers. The `--image-family=cos-stable` tells `gcloud` to use the latest stable version of the Container-Optimized OS.

```bash
--container-image="$GCR_IMAGE_PATH" \
```

The flag above tells GCE which Docker image to run within the GCE VM, using the GCR URL you created earlier.

When the command completes, you'll see output like the following:

```text
Created [https://www.googleapis.com/compute/v1/projects/flask-upload-demo-2018-11-26/zones/us-east1-b/instances/flask-demo-app-vm].
NAME               ZONE        MACHINE_TYPE   PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP     STATUS
flask-demo-app-vm  us-east1-b  n1-standard-1               10.142.0.2   35.211.106.214  RUNNING
```

If you type the address from `EXTERNAL_IP` into your browser, it works just like the local version of the app:

{{< img src="gce-app-1.png" alt="Screenshot of flask-upload-demo on GCE" caption="flask-upload-demo running on GCE" maxWidth="667px" >}}

{{< img src="gce-app-2.png" alt="Screenshot of file uploaded to flask-upload-demo on GCE" caption="flask-upload-demo serving image file from GCE" maxWidth="667px" >}}

The problem is that if you kill that VM and launch a new one with the same Docker image, the file you uploaded is no longer there:

{{< img src="gce-app-3.png" alt="Screenshot of 404 for previously uploaded file" caption="The new GCE VM can't serve the file because it was stored on the previous VM" maxWidth="667px" >}}

This is, of course, the problem that inspired this whole tutorial. The container stores the file on its internal filesystem. When you terminate the host VM, you lose all the files.

To address this, you need to configure the Docker container to store all persistent data in a Google Cloud Storage (GCS) bucket.

## Planning a GCS-aware architecture

Here is the goal architecture that solves this problem:

{{< img src="full-architecture.jpg" alt="flask-demo-app architecture diagram" caption="Architecture for deploying a Flask app to Google Cloud Platform" maxWidth="800px" hasBorder="True" >}}

* The web browser only talks to the web server, Nginx, which acts as the orchestrator for all front-end requests.
* If the web browser requests a file, Nginx  fetches it from GCS via a utility called [gcsfuse](https://github.com/GoogleCloudPlatform/gcsfuse), which mounts GCS buckets as folders on the filesystem.
* For all other requests, Nginx forwards the request to the flask-upload-demo app.
* flask-upload-demo can write new files to GCS, also via the gcsfuse utility.

This architecture satisfies the goals I defined at the top of the post. Everything in the VM is disposable because GCS stores all the permanent state. All app code is in a Docker container, which makes deployments simple and atomic.

## Creating a GCS bucket (optional)

If you don't have a GCS bucket yet, you can create one with the following `gcloud` command:

```bash
STORAGE_LOCATION="us-east1"
GCS_BUCKET="${PROJECT_ID}-storage"
gsutil mb \
  -p "$PROJECT_ID" \
  -l "$STORAGE_LOCATION" \
  "gs://${GCS_BUCKET}"
```

Otherwise, set the `GCS_BUCKET` environment variable to the name of GCS bucket.

## Giving the Docker container access to GCS

You need to modify your Docker image to integrate the gcsfuse utility. Fortunately, I've done it for you. The complete `Dockerfile` is available on the [`gcsfuse` branch of my Github repo](https://github.com/mtlynch/docker-flask-upload-demo/blob/gcsfuse/Dockerfile), but here are the main changes:

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

There are two elements here worth discussing:

```bash
echo 'user_allow_other' > /etc/fuse.conf
```

The above line makes it possible to use `gcsfuse`'s `-o allow_other` option. This is necessary because both the app system account and the Nginx system account need access to the GCS folder. Without the `user_allow_other` line in the configuration file, only a single account could access the GCS folder.

{{<notice type="warning">}}
**Gotcha Warning**: If more than one system account needs access to the GCS bucket, the `/etc/fuse.conf` file must include the line `user_allow_other`.
{{< /notice >}}

```bash
mkdir --parents "$GCS_MOUNT_ROOT" && \
chown \
  --no-dereference \
  "${APP_USER}:${NGINX_GROUP}" "$GCS_MOUNT_ROOT"
```

`gcsfuse` requires an existing directory where the launching user has write permissions. Standard users don't have write access to the `/mnt` directory, so the `Dockerfile` creates the `/mnt/gcsfuse` directory as the `root` user and uses `chown` to assign ownership to the Nginx and demo app system accounts.

The other interesting changes are in the `CMD` portion of the `Dockerfile`, which defines the container's runtime behavior:

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
      --bind 127.0.0.1:5000 \
      --log-level info
```

Once again, breaking this down by interesting snippets:

```bash
gcsfuse \
  -o nonempty \
  -o allow_other \
  --implicit-dirs \
  "$GCS_BUCKET" "$GCS_MOUNT_ROOT"
```

As with the `user_allow_other` option above, the `-o allow_other` makes it possible for multiple users to access the mounted folder, as both nginx (running as the `www-data` user) and the demo app (running as `demo-user`) need access.

{{<notice type="warning">}}
**Gotcha Warning**: gcsfuse needs the `-o allow_other` flag if multiple user accounts access files in the GCS mount.
{{< /notice >}}

Without the [`--implicit-dirs` flag](https://github.com/GoogleCloudPlatform/gcsfuse/blob/6ab0a79f97b7481b23c3724cd0c4b323f0627d69/docs/semantics.md#implicit-directories), gcsfuse cannot access files in subfolders of the GCS bucket.

{{<notice type="warning">}}
**Gotcha Warning**: gcsfuse needs the `--implicit-dirs` flag if the GCS bucket contains subfolders.
{{< /notice >}}

```bash
if [ ! -d "$APP_UPLOADS_DIR" ]; then \
  ln --symbolic "$GCS_MOUNT_ROOT" "$APP_UPLOADS_DIR"; \
fi
```

The app writes its uploaded files to the `demo/uploads` directory. The above block creates a symbolic link from `demo/uploads` to `/mnt/gcsfuse`. This way, when the app thinks it's writing to the `demo/uploads` path, it will be writing to your GCS bucket. The `if`/`then` block protects it from performing this step more than once, such as when the container restarts.

## Creating a service account with GCS access

There's one extra step before you deploy this image to GCE. By default, GCE instances run under the context of the standard GCE service account. That account has read-only access to GCS, so the app will fail to write new files to GCS.

To address this, create a custom service account with the following two roles:

* `storage.objectAdmin`: Allows processes in the VM to read and write objects to GCS.
* `logging.logWriter`: Allows the app's log output to appear in GCP's logging interfaces.

{{<notice type="warning">}}
**Gotcha Warning**: GCE instances can't write to GCS buckets unless you launch them under a custom service account.
{{< /notice >}}

The following commands create a service account with the necessary privileges:

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

## Deploying the GCS-aware container

Return to your clone of the [docker-flask-upload-demo](https://github.com/mtlynch/docker-flask-upload-demo) repository and check out the `gcsfuse` branch:

```bash
cd ~/docker-flask-upload-demo
git checkout gcsfuse
```

Now, rebuild the Docker image and push it to GCR:

```bash
LOCAL_IMAGE_NAME="flask-upload-demo-image"
docker build --tag "$LOCAL_IMAGE_NAME" .

GCR_HOSTNAME="gcr.io"
GCR_IMAGE_PATH="${GCR_HOSTNAME}/${PROJECT_ID}/flask-demo-app"
docker tag "$LOCAL_IMAGE_NAME" "$GCR_IMAGE_PATH"
docker push "$GCR_IMAGE_PATH"
```

{{<notice type="info">}}
**Note**: This image will fail if you attempt to run it locally. The `gcsfuse` version of the `Dockerfile` assumes that its execution environment has already authenticated to gcloud (which is true of containers running on GCE). It's possible to adjust the `Dockerfile` so that it mounts a GCS bucket while running outside of GCE, but this is an exercise for the reader.
{{< /notice >}}

With your new, custom GCE service account, you're ready to deploy the GCS-aware container:

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
  --container-env="GCS_BUCKET=$GCS_BUCKET"
```

This command is the same as the [previous deploy command](http://localhost:4000/retrofit-docker-gcs/#deploying-the-docker-container), but with two additional flags:

```bash
  --container-privileged \
```

The `--container-privileged` flag is necessary to allow the Docker container to mount a FUSE filesystem (Docker offers [more fine-grained ways of achieving this](https://stackoverflow.com/a/49021109/90388), but GCE does not yet support them).

{{<notice type="warning">}}
**Gotcha Warning**: `gcsfuse` can't mount the GCS bucket on GCE unless you deploy the VM with the `--container-privileged` flag.
{{< /notice >}}

```bash
  --container-env="GCS_BUCKET=$GCS_BUCKET"
```

I purposely designed the Docker image to be agnostic to GCS bucket's name until runtime. The `--container-env` flag lets you specify the `GCS_BUCKET` environment variable at deploy time.

## Persistence pays off... with persistence

You finally have a Docker container that persists its state to GCS. You can test this by uploading a file to the deployed app:

{{< img src="gcsfuse-1.png" alt="Screenshot of flask-upload-demo serving file" caption="flask-upload-demo serves the file from permanent storage on GCS" maxWidth="667px" >}}

If you check your GCS bucket, you will see the file you just uploaded:

{{< img src="gcsfuse-2.png" alt="Screenshot GCS bucket showing uploaded file" caption="Image file in GCS bucket" maxWidth="800px" hasBorder="True" >}}

The real test is whether this state persists across different VMs. You can verify this by killing your VM entirely and redeploying it. The image URL from your previous VM will be accessible on your new server:

{{< img src="gcsfuse-3.png" alt="Screenshot of flask-upload-demo serving file from different IP" caption="flask-upload-demo continues serving file even after the VM has been destroyed and rebuilt" maxWidth="667px" hasBorder="True" >}}

## Bonus: Logging interface

A nice side-benefit of this solution is that GCP provides a slick web interface to view your app's logs.

You can always check the logs manually by ssh'ing into your VM, then running `docker logs`:

```bash
$ docker logs klt-flask-demo-app-vm-gcsfuse-qnnf
...
[2018-11-26 21:28:54 +0000] [33] [INFO] Starting gunicorn 19.9.0
[2018-11-26 21:28:54 +0000] [33] [INFO] Listening at: http://127.0.0.1:5000 (33)
[2018-11-26 21:28:54 +0000] [33] [INFO] Using worker: sync
[2018-11-26 21:28:54 +0000] [37] [INFO] Booting worker with pid: 37
[2018-11-26 21:32:59 +0000] [37] [INFO] Saving uploaded file "zestful-logo.png" to "/srv/demo-app/demo/uploads/zestful-logo.png"
```

The easier way is to open GCP's [StackDriver logging interface](https://console.cloud.google.com/logs/viewer). There, you will find all of your logs in a feature-rich web interface:

{{< img src="gcsfuse-logs.png" alt="App logs in GCP's StackDriver interface" caption="GCP's StackDriver interface shows log output from the app." maxWidth="800px" hasBorder="True" >}}

## Pushing new releases

This architecture makes it easy to push new releases. Any time you want to update the app or its dependencies, build a new image and push it to GCR:

```bash
docker build --tag "$LOCAL_IMAGE_NAME" .
docker tag "$LOCAL_IMAGE_NAME" "$GCR_IMAGE_PATH"
docker push "$GCR_IMAGE_PATH"
```

Then, use the `update-container` command to update the Docker image on your running GCE instance:

```bash
gcloud compute \
  --project="$PROJECT_ID" \
  instances update-container "$VM_NAME" \
  --container-image="$GCR_IMAGE_PATH"
```

{{<notice type="warning">}}
**Gotcha Warning**: The VM's external IP address will change after this command completes unless you assigned a static IP.
{{< /notice >}}

If you ever push a bad release, the `update-container` command allows you to roll back to a previous, known-good image.

## Limitations

This solution suffers from the same limitations as the gcsfuse utility and GCS itself. gcsfuse tries its darndest to make GCS buckets look like regular filesystem folders, but the abstraction breaks in two main ways:

* GCS doesn't support locks, so things will get wonky if your app tries to acquire file locks.
* Latency is high, especially when doing small, random reads or writes on large files.

In particular, I've found that [sqlite](https://www.sqlite.org/index.html) will quickly fail if you point it at a database located on a gcsfuse mount.

## Conclusion

In this tutorial, you learned to redirect an app's data to cloud storage without making changes to the app itself. The example app had no awareness of Google Cloud Platform, yet you deployed it to Google Compute Engine and redirected its persistent data to Google Cloud Storage.

## Source Code

* [flask-upload-demo](https://github.com/mtlynch/flask_upload_demo): The Flask example app that keeps state on the local filesystem.
* [docker-flask-upload-demo](https://github.com/mtlynch/docker-flask-upload-demo): The Docker configuration for flask-upload-demo, in three varieties:
  * [master branch](https://github.com/mtlynch/docker-flask-upload-demo) - Shows basic packaging of the app
  * [nginx branch](https://github.com/mtlynch/docker-flask-upload-demo/tree/nginx) - Shows a more realistic real-world architecture where nginx proxies traffic for the app
  * [gcsfuse branch](https://github.com/mtlynch/docker-flask-upload-demo/tree/gcsfuse) - Shows how to mount a Google Cloud Storage bucket from within the Docker container (assumes the container runs in a Google Compute Engine VM with read/write permissions to Google Cloud Storage).
* [mediagoblin-docker (gcsfuse branch)](https://github.com/mtlynch/mediagoblin-docker/tree/gcsfuse) - Docker configuration for a real-world media sharing app where I used these same techniques to redirect the app's permanent data to Google Cloud Storage.

---

*Software architecture diagrams by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/)*