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
zpool set readonly=on usbpool
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

## Transfer the data

```bash
SNAPSHOT_NAME="fullpool_$(date +%Y%m%d)"

zfs snapshot -r usbpool@${SNAPSHOT_NAME} && \
  zfs send -R usbpool@${SNAPSHOT_NAME} \
    | zfs receive -F usbpool2
```

Update the mount point:

```bash
zfs set mountpoint=/mnt/usbpool-old usbpool
```

## Absorb the old disks

```bash
zpool destoy usbpool
```

```bash
zpool attach usbpool2 raidz1-0 /dev/sdc
```

```bash
$ zpool status usbpool2 | grep "expand:"
expand: expanded raidz1-0 copied 648K in 00:00:03, on Wed Apr 30 03:27:03 2025
```

```bash
zpool attach usbpool2 raidz1-0 /dev/sdd
```

```bash
$ zpool status usbpool2 | grep "expand:"
expand: expanded raidz1-0 copied 562K in 00:01:57, on Wed Apr 30 03:30:02 2025
```

{{<img src="finished-pool.webp">}}
