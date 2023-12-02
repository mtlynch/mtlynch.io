---
title: "Llamafile Lava1.5"
date: 2023-12-01T21:09:00-05:00
---

https://simonwillison.net/2023/Nov/29/llamafile/

```
sudo apt-get install linux-headers-$(uname -r) && \
  sudo apt-key del 7fa2af80

echo "deb [signed-by=/usr/share/keyrings/cudatools.gpg] https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/ /" | sudo tee /etc/apt/sources.list.d/cuda-ubuntu2204-x86_64.list

wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-ubuntu2204.pin && \
  sudo mv cuda-ubuntu2204.pin /etc/apt/preferences.d/cuda-repository-pin-600
```

```
sudo apt-get update && \
 sudo apt-get install -y cuda-toolkit
```

```bash
curl -LO https://huggingface.co/jartine/llava-v1.5-7B-GGUF/resolve/main/llava-v1.5-7b-q4-server.llamafile && \
  chmod 755 llava-v1.5-7b-q4-server.llamafile && \
  ./llava-v1.5-7b-q4-server.llamafile --nobrowser
```

Got on both RENDER-S and GPU-3070-S

```text
CUDA error 2 at /home/mike/.llamafile/ggml-cuda.cu:6006: out of memory
```

---

```bash
wget https://developer.download.nvidia.com/compute/cuda/12.3.1/local_installers/cuda_12.3.1_545.23.08_linux.run && sudo sh cuda_12.3.1_545.23.08_linux.run
```

```text
$ cat /var/log/nvidia-installer.log
nvidia-installer log file '/var/log/nvidia-installer.log'
creation time: Sat Dec  2 02:01:20 2023
installer version: 545.23.08

PATH: /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin

nvidia-installer command line:
    ./nvidia-installer
    --ui=none
    --no-questions
    --accept-license
    --disable-nouveau
    --no-cc-version-check
    --install-libglvnd
    --no-drm

Using built-in stream user interface
-> Detected 8 CPUs online; setting concurrency level to 8.
-> Scanning the initramfs with lsinitramfs...
-> Executing: /usr/bin/lsinitramfs   -l /boot/initrd.img-5.15.0-87-generic
WARNING: An NVIDIA kernel module 'nvidia-modeset' appears to be already loaded in your kernel.  This may be because it is in use (for example, by an X server, a CUDA program, or the NVIDIA Persistence Daemon), but this may also happen if your kernel was configured without support for module unloading.  Some of the sanity checks that nvidia-installer performs to detect potential installation problems are not possible while an NVIDIA kernel module is running.
-> Would you like to continue installation and skip the sanity checks? If not, please abort the installation, then close any programs which may be using the NVIDIA GPU(s), and attempt installation again. (Answer: Abort installation)
ERROR: Installation has failed.  Please see the file '/var/log/nvidia-installer.log' for details.  You may find suggestions on fixing installation problems in the README available on the Linux driver download page at www.nvidia.com.
```

```bash
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
```

Ends up with

```
$ sudo apt-get update
E: Conflicting values set for option Signed-By regarding source https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/ /: /usr/share/keyrings/cuda-archive-keyring.gpg != /usr/share/keyrings/cudatools.gpg
E: The list of sources could not be read.
```

---
