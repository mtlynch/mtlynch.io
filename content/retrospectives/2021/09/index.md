---
title: "TinyPilot: Month 14"
date: 2021-09-01T10:07:31-04:00
description: TODO - One-line summary
---

## Highlights

*

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Goal 1

* **Result**: XX
* **Grade**: XX

TODO

### Goal 2

* **Result**: XX
* **Grade**: XX

TODO

### Goal 3

* **Result**: XX
* **Grade**: XX

TODO

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric          | July 2021      | August 2021    | Change                                            |
| --------------- | -------------- | -------------- | ------------------------------------------------- |
| Unique Visitors | 5,234          | 4,194          | <font color="red">-1,040 (-20%)</font>            |
| Total Pageviews | 9,730          | 8,864          | <font color="red">-866 (-9%)</font>               |
| Sales Revenue   | $23,954.64     | $30,191.04     | <font color="green">+$6,236.40 (+26%)</font>      |
| Total Revenue   | $24,002.64     | $30,239.04     | <font color="green">+$6,236.40 (+26%)</font>      |
| **Profit**      | **$-9,713.34** | **$-8,049.21** | **<font color="green">+$1,664.13 (+-17%)</font>** |

## TinyPilot website improvements

{{<gallery caption="The Intel Xeon E5-2680 v3 [scores 15,618 on cpubenchmark.net](https://www.cpubenchmark.net/cpu.php?cpu=Intel+Xeon+E5-2680+v3+%40+2.50GHz&id=2390).">}}
  {{<img src="home-before.png" alt="Photo of Intel Xeon E5-2680 v3 CPU" maxWidth="250px" linkUrl="https://www.newegg.com/supermicro-mbd-x10dal-i-o-intel-xeon-processor-e5-2600-v4-v3-family/p/N82E16813182967">}}
  {{<img src="home-after.png" alt="Screenshot of Xeon E5-2680 v3's 15618 score on cpubenchmark.net" maxWidth="250px" hasBorder="true">}}
{{</gallery>}}

<div style="margin-bottom: 50px">
  <canvas id="revenue-per-visitor"></canvas>
</div>

<script>
window.addEventListener("load", function () {
  let dates = [];
  dates.push(parseDate("2021-07-01").toLocaleString('default', { month: 'long' }) + ' ' + parseDate("2021-07-01").getFullYear());
  dates.push(parseDate("2021-08-01").toLocaleString('default', { month: 'long' }) + ' ' + parseDate("2021-08-01").getFullYear());
  let values = [25, 34];
  drawChart("revenue-per-visitor", dates, values, "Revenue per Visitor");
});
</script>

## Topic 2

## Topic 3

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Is It Keto](https://isitketo.org)

{{<revenue-graph project="isitketo">}}

| Metric                   | July 2021   | August 2021 | Change                                      |
| ------------------------ | ----------- | ----------- | ------------------------------------------- |
| Unique Visitors          | 39,568      | 30,439      | <font color="red">-9,129 (-23%)</font>      |
| Total Pageviews          | 96,494      | 72,340      | <font color="red">-24,154 (-25%)</font>     |
| Domain Rating (Ahrefs)   | 13.0        | 12.0        | <font color="red">-1.0 (-8%)</font>         |
| AdSense Revenue          | $438.07     | $358.43     | <font color="red">-$79.64 (-18%)</font>     |
| Amazon Affiliate Revenue | $59.65      | $43.73      | <font color="red">-$15.92 (-27%)</font>     |
| **Total Revenue**        | **$497.72** | **$402.16** | **<font color="red">-$95.56 (-19%)</font>** |

### [Hit the Front Page of Hacker News](https://hitthefrontpage.com/)

{{<revenue-graph project="htfp">}}

| Metric                    | July 2021   | August 2021 | Change                                          |
| ------------------------- | ----------- | ----------- | ----------------------------------------------- |
| Unique Visitors           | 109         | 393         | <font color="green">+284 (+261%)</font>         |
| Gumroad Revenue           | $218.09     | $728.90     | <font color="green">+$510.81 (+234%)</font>     |
| Blogging for Devs Revenue | $27.30      | $0.00       | <font color="red">-$27.30 (-100%)</font>        |
| **Total Revenue**         | **$245.39** | **$728.90** | **<font color="green">+$483.51 (+197%)</font>** |

### [Zestful](https://zestfuldata.com)

{{<revenue-graph project="zestful">}}

| Metric            | July 2021   | August 2021 | Change                                       |
| ----------------- | ----------- | ----------- | -------------------------------------------- |
| Unique Visitors   | 547         | 585         | <font color="green">+38 (+7%)</font>         |
| Total Pageviews   | 1,300       | 1,467       | <font color="green">+167 (+13%)</font>       |
| RapidAPI Revenue  | $620.67     | $390.80     | <font color="red">-$229.87 (-37%)</font>     |
| **Total Revenue** | **$620.67** | **$390.80** | **<font color="red">-$229.87 (-37%)</font>** |

## Wrap up

### What got done?

*

### Lessons learned

*

### Goals for next month

*
