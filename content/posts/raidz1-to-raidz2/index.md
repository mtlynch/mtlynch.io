---
title: "Raidz1 to Raidz2"
date: 2025-04-29
---

For t

```bash

#wipefs --all /dev/sde
```

To start:

```bash
zpool create \
  -f \
  usbpool \
  raidz1 \
  -m /mnt/usbpool \
  /dev/sdc \
  /dev/sdd \
  /dev/sde \
  /dev/sdf
```

```bash
zfs create \
  usbpool/dataset123
```

```bash
echo "This is a test file" > /mnt/usbpool/dataset123/testfile.txt
```

```bash
$ cat /mnt/usbpool/dataset123/testfile.txt
This is a test file
```

## Offline a disk

```bash
sudo zpool offline usbpool /dev/sdf
```

```bash
$ zpool status usbpool
  pool: usbpool
 state: DEGRADED
status: One or more devices has been taken offline by the administrator.
        Sufficient replicas exist for the pool to continue functioning in a
        degraded state.
action: Online the device using 'zpool online' or replace the device with
        'zpool replace'.
config:

        NAME        STATE     READ WRITE CKSUM
        usbpool     DEGRADED     0     0     0
          raidz1-0  DEGRADED     0     0     0
            sdc     ONLINE       0     0     0
            sdd     ONLINE       0     0     0
            sde     ONLINE       0     0     0
            sdf     OFFLINE      0     0     0

errors: No known data errors
```

```bash
wipefs -a /dev/sdf
```

```bash
zpool create \
  -f \
  usbpool2 \
  raidz1 \
  -m /mnt/usbpool2 \
  /dev/sdf \
  /dev/sdg
```

## Destroy the disks
