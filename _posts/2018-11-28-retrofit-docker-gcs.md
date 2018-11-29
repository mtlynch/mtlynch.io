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

I recently had to deploy a web app that kept large amounts of user data on the local filesystem. This was a clear maintenance trap. If I ever had to rebuild the server from scratch, there would be lots of clunky manual effort to back up and restore all of its data files. I wanted a way to keep the application on the server but keep its state in a separate, independent location.

{% include image.html file="naive-vs-desired.png" alt="Naive architecture vs desired architecture" max_width="771px" img_link="true" %}

You might look at that diagram and think, "Duh! That's the separation between an app and a database," but what if the application's state is mostly files? There's cloud storage, of course, but that works best when the app natively understands requires the app to be designed for cloud storage.

I solved this problem using Docker, Google Cloud Storage, and the gcsfuse utility. I couldn't find a good guide about how to do this properly, and there were a ton of "gotchas" throughout this process. I decided to write my own tutorial in the hopes that it spares others from the many land mines involved.

# But why?

Docker makes it easy for me to maintain the app because it simplifies state on the server. Whenever I want to push a new release, I can just build a Docker image locally and push it out to my server.

Google Cloud Storage separates my app's code from its user-generated files. I can blow away my app server completely and deploy a new version and all of the data will remain. To the app, it's as if the files are all on the local filesystem.

# But why?

If you're not sold on Docker, I'm not going to try to convince you here, but I think containerization is the best thing to happen in software in the last ten years.

* Separates storage from the app itself.
* Trivial to patch the server
* Trivial to push new releases. Releases

The downside is that Docker makes you pay some more costs up front because you're working through another layer of abstraction. If you want to install your app to a traditional Linux server, it's trivial to access GCS. To deploy from within a Docker container, it's a bit more complicated.

TODO: Logging in StackDriver?

# Some abbreviations

| Abbreviation | Stands for | What is it? | Similar to |
|------------------|--------------|--------------|-------------|
| **GCS** | Google Cloud Storage | Google's cloud storage service | Amazon S3 |
| **GCE** | Google Compute Engine | Google's on-demand virtual machine service | Amazon EC2 |
| **GCR** | Google Container Registry | Google's hosting service for Docker images | Docker Hub |
| **GCP** | Google Cloud Platform | Google's cloud computing platform (GCS, GCE, and GCR are all parts of GCP) | Amazon Web Services or Microsoft Azure |

# Prerequisites

To start, you'll need the following:

* [Google Cloud SDK](https://cloud.google.com/sdk/install)
* [Docker](https://www.docker.com/)
  * The free [Community Edition](https://store.docker.com/search?offering=community&type=edition) is fine

# My example app

I created a [toy example](https://github.com/mtlynch/flask_upload_demo) to demonstrate this process. It's a dead simple web application based on the Flask framework's [upload example app](http://flask.pocoo.org/docs/1.0/patterns/fileuploads/).

It's simple to run:

```bash
git clone https://github.com/mtlynch/flask_upload_demo.git
cd flask_upload_demo
sudo pip install -r requirements.txt
gunicorn \
  demo.app:app \
  --bind 0.0.0.0:5000
```

It allows the user to choose a file and upload it:

{% include image.html file="flask-app1.png" alt="Screenshot of demo app landing page" max_width="685px" img_link="true" %}

Then, it serves the file permanently at the URL `http://[server address]:5000/uploads/[filename]`:

{% include image.html file="flask-app2.png" alt="Screenshot of demo app upload result" max_width="685px" img_link="true" %}

From within the server, I can see that the app saved the uploaded file to the `demo/uploads` folder of the local filesystem:

```bash
$ ls -l demo/uploads/
-rw-rw-r-- 1 mike mike 230720 Nov 24 21:45 Space_Duck_Desktop_RGB_PNG.png
```


**Note**: If your app was really as simple as [flask-upload-demo](https://github.com/mtlynch/flask_upload_demo), it would make more sense to rewrite the app itself to use GCS APIs natively. For the purposes of this tutorial, pretend that flask-upload-demo is a black box whose source you can't modify.
{: .notice--info}

# Dockerizing the example app

TODO: Show how to dockerize the toy Python app.

**`Dockerfile`**

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

There's a lot there, so to summarize, the `Dockerfile` does the following:

1. Installs Git, Python and associated packages.
1. Creates a system account (`demo-user`) under which the demo app will run.
1. Clones the [app source repo](https://github.com/mtlynch/flask_upload_demo) locally.
1. Adds a `CMD` to run when the container boots that starts the demo app on port 5000.

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

If you visit [http://localhost/](http://localhost/) in a browser, you should see the demo app.

# A more realistic Docker container

Most web applications don't accept traffic directly from the browser. Instead, they use an HTTP server like Nginx or Apache to handle the gruntwork of HTTP.

To mimc this in my example, I'll modify the Dockerfile to integrate Nginx. The complete code is available in the [`nginx` branch of my docker-flask-upload-demo repo](https://github.com/mtlynch/docker-flask-upload-demo/tree/nginx), but the interesting changes are below:

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

Nginx typically runs as root so that it can listen on privileged HTTP ports 80 and 443. Therefore, the `Dockerfile` uses `sudo` to allow the demo app user to launch nginx as `root` while still performing all other activities as a service account with limited privileges.

Lastly, it copies an Nginx configuration file into the container, which appears below:

**`nginx.conf`**

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

The `location /uploads { ... }` block is typical for Nginx configurations. Web servers (such as Nginx) are cheaper and more performant than application servers, so applications shouldn't use application servers for things that the web server can do. The files in the `uploads/` directory are static images. They don't require any action from the application server, so Nginx can just handle it itself.

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

The app will once again appear at [http://localhost/](http://localhost/). The behavior will be identical to the previous version except that it uses fewer resources to serve file uploads.

# Preparing your GCP Project

Deploying your app locally is neat, but 

Set your project in `gcloud`:

```bash
PROJECT_ID="ENTER-YOUR-PROJECT-ID-HERE"
gcloud config set project "$PROJECT_ID"
```

Next, you must use the GCP web console to [create a service account](https://console.cloud.google.com/iam-admin/serviceaccounts) with the owner role:

{% include image.html file="service-account-1.png" alt="Screenshot of service account creation screen" max_width="799px" class="img-border" img_link="true" %}

{% include image.html file="service-account-2.png" alt="Screenshot of service account role selection screen" max_width="799px" class="img-border" img_link="true" %}

Download the private key as `key.json`:

{% include image.html file="service-account-3.png" alt="Screenshot of service account private key download" max_width="799px" class="img-border" img_link="true" %}

Use gcloud to authenticate as that service account:

```bash
# Activate the service account you created.
gcloud auth activate-service-account --key-file key.json
```

**Gotcha Warning**: Due to [an apparent bug in GCP](https://stackoverflow.com/q/53410165/90388), the Docker image push to gcr.io (see the following section) will fail if you use your root GCP account (e.g., your @gmail.com account) or a service account you create through `gcloud`.
{: .notice--warning}

Next, run some commands to prepare your project for the rest of the tutorial:

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
# Uploading image to Google Container Registry

Before you can deploy a Docker image to GCE, you need to deploy it to a Docker image hosting service. Google Container Registry (GCR) is GCP's preferred service, so that's the easiest option. To do that, check out the `nginx` branch of my example repo:

```bash
cd ~/docker-flask-upload-demo
git checkout nginx
```

Now, build the Docker image locally, and upload it to GCR:

```bash
LOCAL_IMAGE_NAME="flask-upload-demo-image"
docker build --tag "$LOCAL_IMAGE_NAME" .

GCR_HOSTNAME="gcr.io"
GCR_IMAGE_PATH="${GCR_HOSTNAME}/${PROJECT_ID}/flask-demo-app"
docker tag "$LOCAL_IMAGE_NAME" "$GCR_IMAGE_PATH"
docker push "$GCR_IMAGE_PATH"
```

# Deploying the Docker container

Deploying the container requires a bit of indirection. GCP doesn't allow you to deploy a Docker image directly. Instead, you use GCE to spin up a full virtual machine (VM), run Docker on that VM, and then run your Docker image in a container in that VM. Fortunately, GCP offers tools to make this process pretty easy.

GCE VMs do not allow inbound HTTP traffic by default. To allow it, you must create a firewall rule that accepts TCP connections on port 80 (the standard port for plaintext HTTP traffic).

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

Then, deploy a GCE VM with the `http-server` tag:

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

The `--tags` flag launches the VM using the tags you created for the firewall rules. This flag ensures that it can receive HTTP traffic on port 80.

```bash
  --image-family=cos-stable \
  --image-project=cos-cloud \
```

These flags tell GCE to run the container under the [Container-Optimized OS](https://cloud.google.com/container-optimized-os/docs/how-to/create-configure-instance), a stripped-down Linux OS that Google created to run Docker containers. The `--image-family=cos-stable` tells `gcloud` to use the latest stable version of the Container-Optimized OS.

```bash
--container-image="$GCR_IMAGE_PATH" \
```

The flag above tells GCE which Docker image to run within the GCE VM, using the GCR URL you created earlier.

When the command completes, you will see output like the following:

```text
Created [https://www.googleapis.com/compute/v1/projects/flask-upload-demo-2018-11-26/zones/us-east1-b/instances/flask-demo-app-vm].
NAME               ZONE        MACHINE_TYPE   PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP     STATUS
flask-demo-app-vm  us-east1-b  n1-standard-1               10.142.0.2   35.211.106.214  RUNNING
```

If you type the address from `EXTERNAL_IP` into your browser, you will see it work just like the local version of the app:

{% include image.html file="gce-app-1.png" alt="Screenshot of service account creation screen" max_width="667px" img_link="true" %}

{% include image.html file="gce-app-2.png" alt="Screenshot of service account role selection screen" max_width="667px" img_link="true" %}

The problem is that if you kill that VM and launch a new one with the same Docker image, the file you uploaded is no longer there:

{% include image.html file="gce-app-3.png" alt="Screenshot of service account creation screen" max_width="667px" img_link="true" %}

This is, of course, because the container stores the file on its own internal filesystem. When you terminate the host VM, you lose all the files.

To address this, you need to configure the Docker container to store all persistent data in a Google Cloud Storage (GCS) bucket.

# Planning a GCS-aware architecture

Here is the architecture you'll be creating:

{% include image.html file="full-architecture.png" alt="flask-demo-app architecture diagram" max_width="718px" img_link="true" %}

* The web browser only talks to the web server, Nginx, which acts as the orchestrator for all front-end requests.
* If the web browser requests a file, nginx can fetch it from GCS via the gcsfuse utility.
* For all other requests, Nginx forwards the request to the flask-upload-demo app.
* flask-upload-demo can write new files to GCS, also via the gcsfuse utility.

This architecture satisfies the goals I defined at the top of the post. Everything in the VM is disposable because GCS stores all the permanent state. All application code is in a Docker container, which makes deployments simple and atomic.

# Creating a GCS bucket (optional)

If you don't have a GCS bucket yet, you can create one with the following `gcloud` command:

```bash
STORAGE_LOCATION="us-east1"
GCS_BUCKET="${PROJECT_ID}-storage"
gsutil mb \
  -p "$PROJECT_ID" \
  -l "$STORAGE_LOCATION" \
  "gs://${GCS_BUCKET}"
```

Otherwise, simply set the `GCS_BUCKET` environment variable to the name of your GCS bucket.

# Giving the Docker container access to GCS

This branch modifies the `Dockerfile` so that the Docker image includes a utility called [gcsfuse](https://github.com/GoogleCloudPlatform/gcsfuse), which mounts GCS buckets as folders on the filesystem.

The complete `Dockerfile` is available on the [`gcsfuse` branch of my Github repo](https://github.com/mtlynch/docker-flask-upload-demo/blob/gcsfuse/Dockerfile), but here are the main changes:

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

The above line makes it possible to use `gcsfuse`'s `-o allow_other` option. This is necessary because both the app system account and the Nginx system account need access to the GCS folder. Without the `user_allow_other` line in the configuration file, only a single system account could access the GCS folder.

**Gotcha Warning**: If more than one system account will access the GCS bucket, the `/etc/fuse.conf` file must include the line `user_allow_other`.
{: .notice--warning}

```bash
mkdir --parents "$GCS_MOUNT_ROOT" && \
chown \
  --no-dereference \
  "${APP_USER}:${NGINX_GROUP}" "$GCS_MOUNT_ROOT"
```

`gcsfuse` requires an existing directory that the launching user can write to. Standard users don't have write access to the `/mnt` directory, so the `Dockerfile` creates the `/mnt/gcsfuse` directory as the `root` user and uses `chown` to assign ownership to the Nginx and demo app system accounts.

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

**Gotcha Warning**: gcsfuse needs the `-o allow_other` flag if multiple user accounts will access files in the GCS mount.
{: .notice--warning}

Without the [`--implicit-dirs` flag](https://github.com/GoogleCloudPlatform/gcsfuse/blob/6ab0a79f97b7481b23c3724cd0c4b323f0627d69/docs/semantics.md#implicit-directories), gcsfuse will not be able to access files located in subfolders of the GCS bucket.

**Gotcha Warning**: gcsfuse needs the `--implicit-dirs` flag if the GCS bucket contains subfolders.
{: .notice--warning}

```bash
if [ ! -d "$APP_UPLOADS_DIR" ]; then \
  ln --symbolic "$GCS_MOUNT_ROOT" "$APP_UPLOADS_DIR"; \
fi
```

The app writes its uploaded files to the `demo/uploads` directory, so the above block creates a symbolic link to `/mnt/gcsfuse`. This way, the files actually get read and written to GCS. The `if`/`then` block protects it from performing this step more than once, in the event of a container restart.

# Creating a service account with GCS access

There's one extra step before you deploy this image to GCE. By default, GCE instances run under the context of the standard GCE service account. That account has read-only access to GCS, so the app will fail to write new files to GCS.

To address this, create a custom service account with the following two roles:

* `storage.objectAdmin`: Allows processes in the VM can read and write objects to GCS.
* `logging.logWriter`: Allows the app's log output to appear in GCP's StackDriver log interfaces.

**Gotcha Warning**: GCE instances will fail to write to GCS buckets unless you launch them under a custom service account.
{: .notice--warning}

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

# Deploying the GCS-aware container

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

**Gotcha Warning**: `gcsfuse` will fail to mount the GCS bucket on GCE unless you deploy the VM with the `--container-privileged` flag.
{: .notice--warning}

```bash
  --container-env="GCS_BUCKET=$GCS_BUCKET"
```

I purposely designed the Docker image to be agnostic to the name of the bucket until runtime. That way, you can use the same Docker image and specify different GCS buckets in different deployments. The `--container-env` flag lets you specify the `GCS_BUCKET` environment variable at deploy time.

# Persistence pays off... with persistence

You finally have a Docker container that will persist its state in GCS. You can test this by uploading a file to the deployed app:

{% include image.html file="gcsfuse-1.png" alt="Screenshot of service account creation screen" max_width="667px" img_link="true" %}

If you check your GCS bucket, you will see the file you just uploaded:

{% include image.html file="gcsfuse-2.png" alt="Screenshot of service account role selection screen" max_width="800px" class="img-border" img_link="true" %}

The real test is whether this state persists across different VMs. You can verify this by killing your VM entirely and redeploying it. The image URL from your previous VM will be accessible on your new server:

{% include image.html file="gcsfuse-3.png" alt="Screenshot of service account role selection screen" max_width="667px" class="img-border" img_link="true" %}

# Bonus: Logging interface

A nice side-benefit of this solution is that GCP provides a nice web interface to view your application's logs. The manual way of doing this is to ssh into your VM, then run `docker logs`:

```bash
$ docker logs klt-flask-demo-app-vm-gcsfuse-qnnf
...
[2018-11-26 21:28:54 +0000] [33] [INFO] Starting gunicorn 19.9.0
[2018-11-26 21:28:54 +0000] [33] [INFO] Listening at: http://127.0.0.1:5000 (33)
[2018-11-26 21:28:54 +0000] [33] [INFO] Using worker: sync
[2018-11-26 21:28:54 +0000] [37] [INFO] Booting worker with pid: 37
[2018-11-26 21:32:59 +0000] [37] [INFO] Saving uploaded file "zestful-logo.png" to "/srv/demo-app/demo/uploads/zestful-logo.png"
```

The easier way is to open the [StackDriver logging interface](https://console.cloud.google.com/logs/viewer) from the GCP console. There, you will find all of your logs in a slick web interface:

{% include image.html file="gcsfuse-logs.png" alt="Application logs in GCP's StackDriver interface" max_width="800px" class="img-border" img_link="true" fig_caption="GCP's StackDriver interface shows log output from the application." %}

# Pushing new releases

This solution makes it very easy to push new releases. Any time you want to update the app or its dependencies, you can simply build a new image and push it to GCR:

```bash
docker build --tag "$LOCAL_IMAGE_NAME" .
docker tag "$LOCAL_IMAGE_NAME" "$GCR_IMAGE_PATH"
docker push "$GCR_IMAGE_PATH"
```

Then, use the `update-container` command to update the Docker image on a running GCE instance:

```bash
gcloud compute \
  --project="$PROJECT_ID" \
  instances update-container "$VM_NAME" \
  --container-image="$GCR_IMAGE_PATH"
```

**Gotcha Warning**: The VM's external IP address will change after this command completes unless you assigned a static IP.
{: .notice--warning}

If you ever push a bad release, you can use the `update-container` command to roll back to a previous, known-good image.

# Limitations

This solution suffers from the same limitations as the gcsfuse utility and GCS itself. gcsfuse does as much as possible to make GCS look like a normal filesystem, but there's only so much it can do to make a remote REST API behave like a local disk.

The two main ways this can bite you are:

* GCS doesn't support locks, so things will get wonky if an application tries to acquire exclusive locks on a file.
* Latency is very high, especially when doing small, random reads or writes on large files.

In particular, I've found that [sqlite](https://www.sqlite.org/index.html) will quickly fail if you point it at a database located on a gcsfuse mount.

# Conclusion

flask-upload-demo was not aware of GCS and I never had to change any of its source code to support this scenario.
# Source Code

* [flask-upload-demo](https://github.com/mtlynch/flask_upload_demo): A demo app that keeps state on the local filesystem. 
* [docker-flask-upload-demo](https://github.com/mtlynch/docker-flask-upload-demo): The Docker configuration for flask-upload-demo, in three varieties:
  * [master branch](https://github.com/mtlynch/docker-flask-upload-demo) - Shows basic packaging of the app
  * [nginx branch](https://github.com/mtlynch/docker-flask-upload-demo/tree/nginx) - Shows a more realistic real-world architecture where nginx proxies traffic for the app
  * [gcsfuse branch](https://github.com/mtlynch/docker-flask-upload-demo/tree/gcsfuse) - Shows how to mount a Google Cloud Storage bucket from within the Docker container (assumes the container runs in a Google Compute Engine VM with read/write permissions to Google Cloud Storage).