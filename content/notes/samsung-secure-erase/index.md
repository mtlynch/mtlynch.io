---
title: "Overcoming Gotchas in Samsung Secure Erase"
date: 2025-01-16
---

I have a few Samsung SSDs, and I always have trouble remembering the process of secure erasing them, as Samsung Magician software is terrible.

Here are my notes for overcoming Samsung Magician's gotchas in the process of secure erasing a Samsung SSD.

## You need a Windows or MacOS system with a Samsung SSD attached

This requirement drives me crazy, as Samsung Magician is creating a bootable USB disk, so it shouldn't care what's on your current system, but it does. And Samsung Magician only exists for Windows, MacOS, and Android, so if you're on Linux, you can't use it.

And not only that, Samsung Magician will refuse to do anything if there's no compatible Samsung SSD attached to the machine running Samsung Magician.

So, if you want to securely erase the data on computer A, which contains a Samsung SSD, you might sensibly run Samsung Magician on computer B to create the bootable USB. But this won't work unless computer B _also_ has a compatible Samsung SSD attached.

## USB key doesn't work in Samsung Magician

When you finally get a compatible system to run Samsung Magician, when you click "Secure Erase," you'll probably find that when you try to create a bootable USB, it won't show you any options, even if you insert a working USB drive.

You might get a bit further. Maybe Samsung Magician recognizes the USB the error message>

```text
Failed to create bootable USB device
```

It offers no further detail.

The issue is that Samsung Magician expects the drive to be partitioned in a particular way. If the drive has no partitions at all Samsung Magician won't recognize it. If the drive has a large partition, Samsung Magician fails with the error, "Failed to create bootable USB device."

The solution is to erase all partitions on the USB disk and create a single FAT32 partition that's 500 MB in size.

I don't know why Samsung Magician insists on this, as it completely blows away the partitions anyway, but once it sees a disk with a 500 MB partition, it successfully creates the bootable disk for secure erasing the SSD.

## SSD is locked

When I thought I was home free, the Samsung bootable disk told me that my SSD was "locked."

It's suggestion was to remove the SSD's power cable while the computer is still on, then plug in the power again. I'm leery of removing cables while a desktop is running, but I tried it, and sure enough, that allowed the secure erase to work.

I tried other options like shutting off my computer, and completely cutting off power. But it seemed that for whatever reason, I had to remove the SSD power cable while keeping the SATA cable attached.
