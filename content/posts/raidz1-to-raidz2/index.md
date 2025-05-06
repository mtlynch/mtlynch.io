---
title: "Raidz1 to Raidz2"
date: 2025-04-29
---

My home TrueNAS server is now three years old, and I've reached 83% of

```bash
sudo fdisk --list
```

{{<img src="truenas-disks.webp">}}

```bash
get_disk_id() {
    local dev=$1
    local target="/dev/$dev"

    # Iterate through entries in /dev/disk/by-id/
    for path in /dev/disk/by-id/*; do
        # Check if it's a symlink, its target matches, and the penultimate char is ':'
        if [ -L "$path" ] && [ "$(readlink -f "$path")" = "$target" ] && [[ "${path: -2:1}" == ":" ]]; then
            echo "$path"
            # Exit the loop after finding the first match
            break
        fi
    done
}
```

```bash
DISK_1="$(get_disk_id sdg)"
DISK_2="$(get_disk_id sdh)"
DISK_3="$(get_disk_id sdi)"
DISK_4="$(get_disk_id sdj)"
```

```bash
# Uncomment the following lines, but be careful, as they'll erase disks with no
# further confirmation:

# wipefs --all "${DISK_1}"
# wipefs --all "${DISK_2}"
# wipefs --all "${DISK_3}"
# wipefs --all "${DISK_4}"
```

To start:

```bash
zpool create \
  -f \
  testpool1 \
  raidz1 \
  -m /mnt/testpool1 \
  "${DISK_1}" \
  "${DISK_2}" \
  "${DISK_3}" \
  "${DISK_4}"
```

```bash
zfs create \
  testpool1/dataset123
```

```bash
echo "This is a test file" > /mnt/testpool1/dataset123/testfile.txt
```

```bash
$ cat /mnt/testpool1/dataset123/testfile.txt
This is a test file
```

## (Optional) Steal a disk from the old pool

If you want a bit of extra disk space, you can steal a drive from your old pool.

Find the weakest disk:

```bash
for drive in /dev/sd?; do
  [ -e "$drive" ] && echo -e "\n=== $drive ===" && smartctl -A $drive | grep -E '(Power_On_Hours|Wear_Leveling|Media_Wearout|Reallocated_Sector)'
done
```

```bash
sudo zpool offline testpool1 "${DISK_4}"
```

```bash
zpool set readonly=on testpool1
```

```bash
$ zpool status testpool1
  pool: testpool1
 state: DEGRADED
status: One or more devices has been taken offline by the administrator.
        Sufficient replicas exist for the pool to continue functioning in a
        degraded state.
action: Online the device using 'zpool online' or replace the device with
        'zpool replace'.
config:

        NAME        STATE     READ WRITE CKSUM
        testpool1     DEGRADED     0     0     0
          raidz1-0  DEGRADED     0     0     0
            sdc     ONLINE       0     0     0
            sdd     ONLINE       0     0     0
            sde     ONLINE       0     0     0
            sdf     OFFLINE      0     0     0

errors: No known data errors
```

```bash
wipefs -a "${DISK_4}"
```

`````bash

````bash
DISK_5="$(get_disk_id sdb)"
DISK_6="$(get_disk_id sdc)"
DISK_7="$(get_disk_id sde)"
#DISK_8="$(get_disk_id sdf)"
`````

Create a fake drive:

```bash
DISK_FAKE='/tmp/fake-drive.img'
truncate --size 128GB "${DISK_FAKE}"

```

```bash
zpool create \
  -f \
  testpool2 \
  raidz2 \
  -m /mnt/testpool2 \
  "${DISK_5}" \
  "${DISK_6}" \
  "${DISK_7}" \
  "${DISK_FAKE}"
```

Remove the fake disk:

```bash
zpool offline testpool2 "${DISK_FAKE}" && \
  rm "${DISK_FAKE}"
```

```bash
# zpool status testpool2
  pool: testpool2
 state: DEGRADED
status: One or more devices has been taken offline by the administrator.
        Sufficient replicas exist for the pool to continue functioning in a
        degraded state.
action: Online the device using 'zpool online' or replace the device with
        'zpool replace'.
config:

        NAME                                                  STATE     READ WRITE CKSUM
        testpool2                                             DEGRADED     0     0     0
          raidz2-0                                            DEGRADED     0     0     0
            usb-Samsung_Flash_Drive_FIT_0371022030001364-0:0  ONLINE       0     0     0
            usb-Samsung_Flash_Drive_FIT_0373417030009828-0:0  ONLINE       0     0     0
            usb-Samsung_Flash_Drive_FIT_0347017070021373-0:0  ONLINE       0     0     0
            /tmp/fake-drive.img                               OFFLINE      0     0     0

errors: No known data errors
root@truenas:/home/truenas_admin# zpool list testpool2
NAME        SIZE  ALLOC   FREE  CKPOINT  EXPANDSZ   FRAG    CAP  DEDUP    HEALTH  ALTROOT
testpool2   476G   435K   476G        -         -     0%     0%  1.00x  DEGRADED  -
```

## Transfer the data

```bash
SNAPSHOT_NAME="fullpool_$(date +%Y%m%d)"

zfs snapshot -r testpool1@${SNAPSHOT_NAME} && \
  zfs send -R testpool1@${SNAPSHOT_NAME} \
    | zfs receive -F testpool2
```

Update the mount point:

```bash
zfs set mountpoint=/mnt/testpool1-old testpool1
```

## Absorb the old disks

```bash
zpool destoy testpool1
```

```bash
zpool attach testpool2 raidz1-0 "${DISK_1}"
```

```bash
$ zpool status testpool2 | grep "expand:"
expand: expanded raidz1-0 copied 648K in 00:00:03, on Wed Apr 30 03:27:03 2025
```

```bash
zpool attach testpool2 raidz1-0 "${DISK_2}"
```

```bash
$ zpool status testpool2 | grep "expand:"
expand: expanded raidz1-0 copied 562K in 00:01:57, on Wed Apr 30 03:30:02 2025
```

{{<img src="finished-pool.webp">}}
