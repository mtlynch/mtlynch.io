---
title: "Llama3.1 Nemotron Ollama"
date: 2024-10-26T11:37:26-04:00
---

## Provisioning a cloud server with a GPU

To run this experiment, I provisioned the following server on [Scaleway](https://scaleway.com):

- Server instance type: H100-1-80G
- OS: Debian 12
- Disk size: 200 GB (needed because the model is large)

To SSH in, I ran the following command with port forwarding because I'll need access to the web interface that will run on the server's `localhost` interface.

```bash
TARGET_IP='51.159.150.3' # Change to your server's IP.
REMOTE_PORT='8080'
LOCAL_PORT='8080'

# SSH in and port-forward a port to access the Open-WebUI web interface.
ssh "${TARGET_IP}" -L "${REMOTE_PORT}:localhost:${LOCAL_PORT}"
```

## Install docker

Next, install Docker so that you can run ollama under the Open-WebUI web interface for Ollama:

```bash
sudo apt-get update && \
   sudo apt-get install ca-certificates curl && \
   sudo install -m 0755 -d /etc/apt/keyrings && \
  sudo curl -fsSL https://download.docker.com/linux/debian/gpg \
    -o /etc/apt/keyrings/docker.asc && \
  sudo chmod a+r /etc/apt/keyrings/docker.asc &&\
  echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && \
  sudo apt-get update && \
  sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin && \
  sudo usermod -aG docker "${USER}" && \
  newgrp docker
```

To test everything is working, run the following command:

```bash
docker run hello-world
```

## Start Ollama and Open-WebUI

I adapted the standard [Open-WebUI](https://github.com/open-webui/open-webui) Docker Compose file to make one for Ollama, which you can download and run with the following command:

```bash
docker run \
  -d \
  -p 8080:8080 \
  --gpus=all \
  -v ollama:/root/.ollama \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:ollama
```

Once the server is up and running, visit the following URL in your browser:

- <http://localhost:8080>

You'll first see a page prompting for a login. Click "Sign up."

{{<img src="open-webui-signup.webp" has-border="true">}}

Then enter any details. You don't really need a valid email, as far as I can tell.

{{<img src="open-webui-create-account.webp" has-border="true">}}

From here, you need to download a model to use. Click the settings button:

{{<img src="open-webui-settings-button.webp" has-border="true">}}

I don't know the differences between the models, but Llama 3 is the newest one that just came out a few days ago, so I decided to try that. It says on ollama.com that `llama3:70b` is optimized for chatbot use cases, so I initially went with that one, but it was incredibly slow. I switched to `llama3` and that performed decently:

{{<img src="open-webui-download-model.webp" has-border="true">}}

It's going to sit at 100% for a while, but it's not done until you see a popup announcing the model is fully downloaded.

Once that's downloaded, close the settings dialog and select `llama3:latest` from the dropdown:

{{<img src="llama3-model.webp" has-border="true">}}

From there, you can start playing with Llama 3. Here's me having a conversation with Llama 3 as it pretends to be Nathan Fielder:

{{<img src="llama3-answer.webp" has-border="true">}}
