---
title: "10G NIC woes"
date: 2023-10-12T09:20:48-04:00
---

## 10G NIC attempts

TODO: Move this

### 10G

Mellanox - No flashing lights when I connected my main pc
tried installing drivers
https://network.nvidia.com/products/adapter-software/ethernet/windows/winof-2/
Switched PCI slots and it worked

Fiber connection suddenly dropped on day 2
Disconnected+reconnected cable: Same result. Activity light stopped flashing on card after I reconnected.
Disabled/re-enabled card: Same result (said network cable disconnected)
Disconnected/reconnected patch cable: Started working again.
Next day - would keep flashing between connected/disconnected. swapped patch cables and it fixed it. Five mins later, happened again and skipped the patch cable, directly connected to switch.

#### TrueNas Mellanox

```text
mlx4_core0: Unable to determine PCI device chain minimum BW
mlx4_en mlx4_core0: Activating port:1
mlxen0: Ethernet address: 24:8a:07:ea:22:10
mlx4_en: mlx4_core0: Port 1: Using 4 TX rings
mlx4_en: mlx4_core0: Port 1: Using 4 RX rings
mlxen0: link state changed to DOWN
mlx4_en: mlxen0: Using 4 TX rings
mlx4_en: mlxen0: Using 4 RX rings
mlx4_en: mlxen0: Initializing port
```

#### TrueNAS Chelsio 520 1

https://www.servethehome.com/buyers-guides/top-hardware-components-for-truenas-freenas-nas-servers/top-picks-freenas-nics-networking/

Upgraded BIOS, no change.

Added to `/boot/loader.conf`

https://man.freebsd.org/cgi/man.cgi?query=cxgbe&sektion=4

```text
t4fw_cfg_load="YES"
t5fw_cfg_load="YES"
t6fw_cfg_load="YES"
if_cxgbe_load="YES"
```

Tried setting them as tunables. No dice.

```text
# pciconf -lv | grep -i Chelsio

```

```text
# dmesg | grep -i Chelsio

```

https://www.reddit.com/r/truenas/comments/vzbial/chelsio_nic_not_appearing/

Overheating?
