---
title: "Downloading Mikechat"
date: 2024-10-18T11:04:11-04:00
---

````text
rewrite this bash snippet so that it re-runs with these other `--from` timestamps in a loop

20000229120406
20000617120049
20000903075050

```
wayback_machine_downloader \
  --maximum-snapshot 1 \
  --concurrency 1 \
  --from 19991009040537 \
  http://pages.prodigy.com/creatures/
```
````

```bash
for timestamp in 19991009040537 20000229120406 20000617120049 20000903075050
do
  wayback_machine_downloader \
    --maximum-snapshot 1 \
    --concurrency 1 \
    --from 19991009040537 \
    http://pages.prodigy.com/creatures/
done
```
