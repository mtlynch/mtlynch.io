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

I recently had to deploy a web app that kept large amounts of user data on the filesystem. I've fallen into this trap before where the app is easy to deploy initially, but then maintenance is a nightmare because any time I have to rebuild the server, I have to copy around a bunch of user-generated files manually.

I solved this problem with Docker and Google Cloud Storage.

Docker makes it easy for me to maintain the app because it simplifies state on the server. Whenever I want to push a new release, I can just build a Docker image locally and push it out to my server.

Google Cloud Storage separates my app's code from its user-generated files. I can blow away my app server completely and deploy a new version and all of the data will remain. To the app, it's as if the files are all on the local filesystem.

I couldn't find a good guide about how to do this properly, and there were a ton of "gotchas" throughout this process, so I decided to write my own tutorial in the hopes that it spares others from the headaches I went through.

TODO: Diagram of what it looks like.

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

To start, you'll need the following free tools installed on your system:

* [Google Cloud SDK](https://cloud.google.com/sdk/install)
* [Docker](https://www.docker.com/)
  * The free [Community Edition](https://store.docker.com/search?offering=community&type=edition) is fine

# My example app

I created a [toy example](https://github.com/mtlynch/flask_upload_demo) to demonstrate this process. It's a dead simple web application based on the Flask framework's [upload example app](http://flask.pocoo.org/docs/1.0/patterns/fileuploads/).

If you'd like to try it at home, it's simple to run:

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

Then it serves the file permanently at the URL `http://[server address]:5000/uploads/[filename]`:

{% include image.html file="flask-app2.png" alt="Screenshot of demo app upload result" max_width="685px" img_link="true" %}

If I ssh into the server, I can see that the app saved the uploaded file to the local filesystem in the `demo/uploads` folder:

```bash
$ ls -l demo/uploads/
total 228
-rw-rw-r-- 1 mike mike 230720 Nov 24 21:45 Space_Duck_Desktop_RGB_PNG.png
```


**Note**: If your app was really as simple as [flask-upload-demo](https://github.com/mtlynch/flask_upload_demo), it would make more sense to rewrite the app itself to be GCS-aware. For the purposes of this tutorial, pretend that flask-upload-demo is a black box whose source you can't modify.
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

You can test this `Dockerfile` by [cloning my repo](https://github.com/mtlynch/docker-flask-upload-demo) and building the Docker container locally:

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

Most web applications don't accept traffic directly from the browser. Instead, they use an HTTP server like Nginx or Apache to handle the gruntwork of HTTP. I'll modify the Dockerfile slightly to add in Nginx:

The complete code is available in the [`nginx` branch of my docker-flask-upload-demo repo](https://github.com/mtlynch/docker-flask-upload-demo/tree/nginx).

There are a few changes

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

The `location /uploads` is typical for Nginx configurations. Web servers (such as Nginx) are cheaper and more performant than application servers, so applications shouldn't use application servers for things that the web server can do. The files in the `uploads/` directory are static images. They don't require any action from the application server, so Nginx can just handle it itself.

# Preparing your GCP Project

Set your project in `gcloud`:

```bash
PROJECT_ID="ENTER-YOUR-PROJECT-ID-HERE"
gcloud config set project "$PROJECT_ID"
```

Next, you must use the GCP web console to [create a service account](https://console.cloud.google.com/iam-admin/serviceaccounts) with the owner role:

{% include image.html file="service-account-1.png" alt="Screenshot of service account creation screen" max_width="797px" class="img-border" img_link="true" %}

{% include image.html file="service-account-2.png" alt="Screenshot of service account role selection screen" max_width="797px" class="img-border" img_link="true" %}

Download the private key as `key.json`:

{% include image.html file="service-account-3.png" alt="Screenshot of service account private key download" max_width="797px" class="img-border" img_link="true" %}

Use gcloud to authenticate as that service account:

```bash
# Activate the service account you created.
gcloud auth activate-service-account --key-file key.json
```

**Gotcha Warning**: Due to [an apparent bug in GCP](https://stackoverflow.com/q/53410165/90388), the Docker image push to gcr.io will fail if you use your root GCP account (e.g., your @gmail.com account) or a service account you create through `gcloud`.
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

Before you can deploy a Docker image to GCE, you need to deploy it to a Docker image hosting service. Google Container Registry (GCR) is the image hosting service integrated with GCP, so that's the easiest option. To do that, check out the `nginx` branch of my example repo:

```bash
cd ~/docker-flask-upload-demo
git checkout nginx
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

Deploying the container requires a bit of indirection. GCP doesn't allow you to deploy a Docker image directly. Instead, you use GCE to spin up a full virtual machine (VM), run Docker on that VM, and then run your Docker image in a container in that VM. Fortunately, GCP offers tools to make this process pretty easy.

GCE VMs do not allow inbound HTTP traffic by default. To allow it, you must create a firewall rule that accepts TCP connections on port 80 (the standard port for plaintext HTTP traffic).

An easy way to do this is to apply the rule to any VM with the tag `http-server` and then add that tag to any GCE VMs you want to receive HTTP traffic:

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

When the command completes, you will see output like the following:

```text
Created [https://www.googleapis.com/compute/v1/projects/flask-upload-demo-2018-11-26/zones/us-east1-b/instances/flask-demo-app-vm].
NAME               ZONE        MACHINE_TYPE   PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP     STATUS
flask-demo-app-vm  us-east1-b  n1-standard-1               10.142.0.2   35.211.106.214  RUNNING
```

It works just like the local version of the app:

{% include image.html file="gce-app-1.png" alt="Screenshot of service account creation screen" max_width="667px" img_link="true" %}

{% include image.html file="gce-app-2.png" alt="Screenshot of service account role selection screen" max_width="667px" img_link="true" %}

The problem is that if you kill that VM and launch a new one with the same Docker image, the file you uploaded is no longer there:

{% include image.html file="gce-app-3.png" alt="Screenshot of service account creation screen" max_width="667px" img_link="true" %}

This is, of course, because Docker stored the file within the container. When you terminate the host VM, you lose all files in its Docker containers.

To address this, you need to configure the Docker container to store all persistent data in a Google Cloud Storage (GCS) bucket.

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

Otherwise, simply set the `GCS_BUCKET` environment variable to the name of your GCS bucket.

# Giving the Docker container access to GCS

Next, you'll need to modify the `Dockerfile` so that the Docker image includes a utility called [gcsfuse](https://github.com/GoogleCloudPlatform/gcsfuse), which allows you to mount GCS buckets to the filesystem.

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

`gcsfuse` requires an existing directory that the launching user can write to. Standard users don't have write access to the `/mnt` directory, so the `Dockerfile` creates the `/mnt/gcsfuse` directory as the `root` user and `chown`s it so that the demo app system account and the Nginx system account can both write to it.

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

**Gotcha Warning**: `-o allow_other`
{: .notice--warning}

**Gotcha Warning**: `--implicit-dirs`
{: .notice--warning}

```bash
if [ ! -d "$APP_UPLOADS_DIR" ]; then \
  ln --symbolic "$GCS_MOUNT_ROOT" "$APP_UPLOADS_DIR"; \
fi
```

# Deploying the GCS-aware container

```bash
cd ~/docker-flask-upload-demo
git checkout gcsfuse
```

First, you need to build a new version of the Docker image and push it to GCR:

```bash
LOCAL_IMAGE_NAME="flask-upload-demo-image"
docker build --tag "$LOCAL_IMAGE_NAME" .

GCR_HOSTNAME="gcr.io" # Change hostname to host images in a different location
GCR_IMAGE_PATH="${GCR_HOSTNAME}/${PROJECT_ID}/flask-demo-app"
docker tag "$LOCAL_IMAGE_NAME" "$GCR_IMAGE_PATH"
docker push "$GCR_IMAGE_PATH"
```

By default, GCE instances run under the context of the GCE service account. It has read access to GCS, but not write access. For the app to write the GCS, you need to create a service account with GCS write privileges. It's also convenient if the GCE VM can write log messages to StackDriver, so I've included that role as well:

It needs two roles to function correctly:

* `storage.objectAdmin`: So that processes in the VM can read and write objects to GCS.
* `logging.logWriter`: So that log output from the VM appears in GCP's StackDriver log interfaces.

The following commands create a service account and provision it with the necessary privileges:

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

**Gotcha Warning**: GCE instances will fail to write to GCS buckets unless you launch them under a custom service account.
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


**Gotcha Warning**: `gcsfuse` will fail to mount the GCS bucket on GCE unless you deploy the VM with the `--container-privileged` flag.
{: .notice--warning}


{% include image.html file="gcsfuse-1.png" alt="Screenshot of service account creation screen" max_width="667px" img_link="true" %}

Excet now, if I check the GCS bucket, I see that the uploaded file is there:

{% include image.html file="gcsfuse-2.png" alt="Screenshot of service account role selection screen" max_width="800px" class="img-border" img_link="true" %}

If I kill the VM and re-launch it, I can continue to access the uploaded image:

{% include image.html file="gcsfuse-3.png" alt="Screenshot of service account role selection screen" max_width="667px" class="img-border" img_link="true" %}

# Viewing logs

```bash
$ docker logs klt-flask-demo-app-vm-gcsfuse-qnnf
...
[2018-11-26 21:28:54 +0000] [33] [INFO] Starting gunicorn 19.9.0
[2018-11-26 21:28:54 +0000] [33] [INFO] Listening at: http://127.0.0.1:5000 (33)
[2018-11-26 21:28:54 +0000] [33] [INFO] Using worker: sync
[2018-11-26 21:28:54 +0000] [37] [INFO] Booting worker with pid: 37
[2018-11-26 21:32:59 +0000] [37] [INFO] Saving uploaded file "zestful-logo.png" to "/srv/demo-app/demo/uploads/zestful-logo.png"
```

But this is also available in GCP's logging interface:


{% include image.html file="gcsfuse-logs.png" alt="Screenshot of service account role selection screen" max_width="800px" class="img-border" img_link="true" %}
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

Note that unless you've assigned the VM a static IP, the VM's external IP address will change after this command completes.
	
# Limitations

There are

* Can't run applications that expect file locking like a normal filesystem (e.g. sqlite).