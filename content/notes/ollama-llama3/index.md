---
title: "Ollama Llama3"
date: 2024-04-19T19:51:59-04:00
---

Scaleway GPU-3070-S machine running Ubuntu Focal with 100 GB of disk space.

```bash
TARGET_IP='51.159.184.186' # Change to your server's IP.
REMOTE_PORT='8080'
LOCAL_PORT='8080'

# SSH in and port-forward a port to access the Open-WebUI web interface.
ssh "${TARGET_IP}" -L "${REMOTE_PORT}:localhost:${LOCAL_PORT}"
```

## Install CUDA

```bash
sudo apt-get install linux-headers-$(uname -r) && \
  sudo apt-key del 7fa2af80 && \
  echo "deb [signed-by=/usr/share/keyrings/cudatools.gpg] https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/ /" | sudo tee /etc/apt/sources.list.d/cuda-ubuntu2204-x86_64.list && \
  wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-ubuntu2204.pin && \
  sudo mv cuda-ubuntu2204.pin /etc/apt/preferences.d/cuda-repository-pin-600 && \
  sudo apt-get update && \
 sudo apt-get install -y cuda-toolkit nvidia-container-toolkit ca-certificates curl
```

## Install docker

```bash
sudo install -m 0755 -d /etc/apt/keyrings && \
  sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc && \
  sudo chmod a+r /etc/apt/keyrings/docker.asc && \
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && \
  sudo apt-get update && \
  sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin && \
  sudo usermod -aG docker "${USER}" && \
  newgrp docker
```

To test everything is working, try:

```bash
docker run hello-world
```

## Start Ollama and Open-WebUI

```bash
docker-compose up
```

You'll first see a page prompting for a login. Click "Sign up."

Then enter any details. You don't really need a valid email, as far as I can tell.

I don't know the differences between the models, but Llama 3 is the newest one that just came out a few days ago, so I decided to try that. It says on ollama.com that `llama3:70b` is optimized for chatbot use cases, so I went with that one.

It's going to sit at 100% for a while, but it's not done until you see..

`llama3:70b` was too slow, so I had to switch to `llama3`.
