var countryNames = {
  AR: "Argentina",
  BR: "Brazil",
  CA: "Canada",
  CH: "Switzerland",
  CN: "China",
  DE: "Germany",
  ES: "Spain",
  FR: "France",
  GB: "United Kingdom",
  HK: "Hong Kong",
  HU: "Hungary",
  IN: "India",
  JP: "Japan",
  KZ: "Kazakhstan",
  MY: "Malaysia",
  NL: "Netherlands",
  NO: "Norway",
  PL: "Poland",
  RE: "Réunion",
  RO: "Romania",
  SA: "Saudi Arabia",
  SE: "Sweden",
  TR: "Turkey",
  US: "United States",
  VN: "Vietnam",
  ZA: "South Africa",
};

var countryColors = {
  US: "#047a15",
  IN: "#2196F3",
  CA: "#FF9800",
  TR: "#9C27B0",
  PL: "#F44336",
  GB: "#00BCD4",
  BR: "#795548",
  DE: "#607D8B",
  SE: "#E91E63",
  VN: "#4CAF50",
  NL: "#FF5722",
  ZA: "#3F51B5",
  RO: "#CDDC39",
  SA: "#009688",
  CH: "#FFC107",
  CN: "#D32F2F",
  MY: "#8BC34A",
  AR: "#673AB7",
  FR: "#03A9F4",
  HK: "#FFEB3B",
  ES: "#FF6F00",
  NO: "#1B5E20",
  JP: "#AD1457",
  KZ: "#0D47A1",
  HU: "#BF360C",
  RE: "#4E342E",
};

var englishPrimaryCountries = ["US", "CA", "GB", "ZA"];

Chart.scaleService.registerScaleType(
  "sqrt",
  Chart.scaleService.getScaleConstructor("linear").extend({
    buildTicks: function () {
      var me = this;
      var max = me.max;
      // Pick a nice step size based on the data range
      var niceSteps = [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 5, 10, 50, 100];
      var step = niceSteps[niceSteps.length - 1];
      for (var s = 0; s < niceSteps.length; s++) {
        if (max / niceSteps[s] <= 10) {
          step = niceSteps[s];
          break;
        }
      }
      var ticks = [];
      for (var v = 0; v <= max * 1.05; v += step) {
        ticks.push({ value: Math.round(v * 10000) / 10000 });
      }
      me.ticks = ticks;
      return ticks;
    },
    getPixelForValue: function (value) {
      var me = this;
      var range = Math.sqrt(me.max) - Math.sqrt(me.min);
      return me.bottom - ((Math.sqrt(value) - Math.sqrt(me.min)) / range) * (me.bottom - me.top);
    },
    getValueForPixel: function (pixel) {
      var me = this;
      var minSqrt = Math.sqrt(me.min);
      var maxSqrt = Math.sqrt(me.max);
      var range = maxSqrt - minSqrt;
      var v = minSqrt + ((me.bottom - pixel) / (me.bottom - me.top)) * range;
      return v * v;
    },
  }),
  { position: "left" }
);

function aggregateByCountry(payments) {
  var ordersByCountry = {};
  var revenueByCountry = {};
  for (var i = 0; i < payments.length; i++) {
    var p = payments[i];
    var c = p.country;
    ordersByCountry[c] = (ordersByCountry[c] || 0) + 1;
    revenueByCountry[c] = (revenueByCountry[c] || 0) + (p.revenue - p.fee);
  }
  return { orders: ordersByCountry, revenue: revenueByCountry };
}

function sortedEntries(obj) {
  return Object.keys(obj)
    .sort(function (a, b) {
      return obj[b] - obj[a];
    })
    .map(function (key) {
      return { code: key, value: obj[key] };
    });
}

function drawCountryPie(canvasId, entries, title, tooltipFormatter) {
  registerChart(canvasId, function () {
  new Chart(document.getElementById(canvasId), {
    type: "pie",
    data: {
      labels: entries.map(function (e) {
        return countryNames[e.code];
      }),
      datasets: [
        {
          data: entries.map(function (e) {
            return Math.round(e.value * 100) / 100;
          }),
          backgroundColor: entries.map(function (e) {
            return countryColors[e.code];
          }),
        },
      ],
    },
    options: {
      responsive: true,
      title: { display: true, text: title },
      legend: { display: false },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.labels[tooltipItem.index];
            var value = data.datasets[0].data[tooltipItem.index];
            return tooltipFormatter(label, value);
          },
        },
      },
    },
  });
  });
}

function drawEnglishSplitPie(
  canvasId,
  aggregated,
  title,
  tooltipFormatter
) {
  var english = 0;
  var nonEnglish = 0;
  var codes = Object.keys(aggregated);
  for (var i = 0; i < codes.length; i++) {
    if (englishPrimaryCountries.indexOf(codes[i]) >= 0) {
      english += aggregated[codes[i]];
    } else {
      nonEnglish += aggregated[codes[i]];
    }
  }
  var total = english + nonEnglish;
  registerChart(canvasId, function () {
  new Chart(document.getElementById(canvasId), {
    type: "pie",
    data: {
      labels: ["English-primary", "Non-English-primary"],
      datasets: [
        {
          data: [
            Math.round(english * 100) / 100,
            Math.round(nonEnglish * 100) / 100,
          ],
          backgroundColor: ["#047a15", "#2196F3"],
        },
      ],
    },
    options: {
      responsive: true,
      title: { display: true, text: title },
      legend: { display: true, position: "bottom" },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.labels[tooltipItem.index];
            var value = data.datasets[0].data[tooltipItem.index];
            var pct = Math.round((value / total) * 100);
            return tooltipFormatter(label, value, pct);
          },
        },
      },
    },
  });
  });
}

function drawCountryBar(canvasId, entries, title, tooltipFormatter, tickFormatter, scaleType) {
  registerChart(canvasId, function () {
  new Chart(document.getElementById(canvasId), {
    type: "bar",
    data: {
      labels: entries.map(function (e) {
        return countryNames[e.code];
      }),
      datasets: [
        {
          data: entries.map(function (e) {
            return Math.round(e.value * 1000) / 1000;
          }),
          backgroundColor: entries.map(function (e) {
            return countryColors[e.code];
          }),
          minBarLength: 2,
        },
      ],
    },
    options: {
      responsive: true,
      title: { display: true, text: title },
      legend: { display: false },
      scales: {
        yAxes: [
          {
            type: scaleType || "linear",
            ticks: {
              beginAtZero: true,
              callback: tickFormatter,
            },
          },
        ],
      },
      tooltips: {
        displayColors: false,
        callbacks: {
          label: function (tooltipItem) {
            return tooltipFormatter(parseFloat(tooltipItem.yLabel), entries[tooltipItem.index]);
          },
        },
      },
    },
  });
  });
}

var deferredCharts = {};

function registerChart(canvasId, createFn) {
  var canvas = document.getElementById(canvasId);
  if (!canvas) return;
  var container = canvas.closest(".sales-chart[data-view]");
  if (container && container.hidden) {
    deferredCharts[canvasId] = createFn;
  } else {
    createFn();
  }
}

document.addEventListener("click", function (e) {
  var button = e.target.closest(".sales-chart-toggle button");
  if (!button) return;
  var toggle = button.parentElement;
  var group = toggle.parentElement;
  var view = button.getAttribute("data-view");

  toggle.querySelectorAll("button").forEach(function (btn) {
    btn.classList.toggle("active", btn === button);
  });

  group.querySelectorAll(".sales-chart[data-view]").forEach(function (chart) {
    var show = chart.getAttribute("data-view") === view;
    chart.hidden = !show;
    if (show) {
      var canvas = chart.querySelector("canvas");
      if (canvas && deferredCharts[canvas.id]) {
        deferredCharts[canvas.id]();
        delete deferredCharts[canvas.id];
      }
    }
  });
});

window.addEventListener("load", function () {
  Promise.all([
    fetch("payments.json").then(function (res) {
      return res.json();
    }),
    fetch("website-visitors.json").then(function (res) {
      return res.json();
    }),
  ]).then(function (results) {
    var payments = results[0];
    var visitors = results[1];

    var agg = aggregateByCountry(payments);

    var visitorsByCountry = {};
    for (var i = 0; i < visitors.length; i++) {
      visitorsByCountry[visitors[i].code] = visitors[i].visitors;
    }

    var orderEntries = sortedEntries(agg.orders);
    var revenueEntries = sortedEntries(agg.revenue);

    var totalOrders = orderEntries.reduce(function (sum, e) { return sum + e.value; }, 0);
    var totalRevenue = revenueEntries.reduce(function (sum, e) { return sum + e.value; }, 0);

    drawCountryPie(
      "orders-by-country",
      orderEntries,
      "Orders by Country",
      function (label, value) {
        var pct = Math.round((value / totalOrders) * 100);
        return label + ": " + value + " orders (" + pct + "%)";
      }
    );

    drawCountryPie(
      "revenue-by-country",
      revenueEntries,
      "Revenue by Country",
      function (label, value) {
        var pct = Math.round((value / totalRevenue) * 100);
        return label + ": " + dollarFormatter(value) + " (" + pct + "%)";
      }
    );

    drawEnglishSplitPie(
      "orders-english-split",
      agg.orders,
      "Orders: English vs. Non-English Countries",
      function (label, value, pct) {
        return label + ": " + value + " orders (" + pct + "%)";
      }
    );

    drawEnglishSplitPie(
      "revenue-english-split",
      agg.revenue,
      "Revenue: English vs. Non-English Countries",
      function (label, value, pct) {
        return label + ": " + dollarFormatter(value) + " (" + pct + "%)";
      }
    );

    // Per-visitor charts: countries with purchases, plus China
    var perVisitorOrders = {};
    var perVisitorRevenue = {};
    var perVisitorDetail = {};
    var perVisitorCodes = Object.keys(agg.orders);
    if (perVisitorCodes.indexOf("CN") < 0 && visitorsByCountry["CN"]) {
      perVisitorCodes.push("CN");
    }
    for (var i = 0; i < perVisitorCodes.length; i++) {
      var code = perVisitorCodes[i];
      if (!visitorsByCountry[code]) continue;
      var orders = agg.orders[code] || 0;
      var revenue = agg.revenue[code] || 0;
      perVisitorOrders[code] = orders / visitorsByCountry[code];
      perVisitorRevenue[code] = (revenue / visitorsByCountry[code]) * 100;
      perVisitorDetail[code] = {
        orders: orders,
        revenue: revenue,
        visitors: visitorsByCountry[code],
      };
    }

    // Attach detail to sorted entries
    function sortedEntriesWithDetail(obj) {
      return sortedEntries(obj).map(function (e) {
        e.detail = perVisitorDetail[e.code];
        return e;
      });
    }

    var percentFormat = function (value) {
      return (value * 100).toFixed(1) + "%";
    };

    drawCountryBar(
      "orders-per-visitor",
      sortedEntriesWithDetail(perVisitorOrders),
      "Purchase Rate by Country",
      function (value, entry) {
        return [
          "Purchase rate: " + percentFormat(value),
          entry.detail.orders + " orders / " + entry.detail.visitors.toLocaleString() + " visitors",
        ];
      },
      percentFormat,
      "sqrt"
    );

    drawCountryBar(
      "revenue-per-visitor",
      sortedEntriesWithDetail(perVisitorRevenue),
      "Revenue per 100 Visitors by Country",
      function (value, entry) {
        return [
          "Revenue per 100 visitors: " + dollarFormatter(value),
          dollarFormatter(Math.round(entry.detail.revenue * 100) / 100) + " revenue / " + entry.detail.visitors.toLocaleString() + " visitors",
        ];
      },
      function (value) {
        return dollarFormatter(value);
      },
      "sqrt"
    );

    // Revenue share vs visitor share
    var totalVisitors = 0;
    var totalRevenue = 0;
    var totalOrders = 0;
    for (var i = 0; i < perVisitorCodes.length; i++) {
      var code = perVisitorCodes[i];
      if (!visitorsByCountry[code]) continue;
      totalVisitors += visitorsByCountry[code];
      totalRevenue += agg.revenue[code] || 0;
      totalOrders += agg.orders[code] || 0;
    }

    var shareData = [];
    for (var i = 0; i < perVisitorCodes.length; i++) {
      var code = perVisitorCodes[i];
      if (!visitorsByCountry[code]) continue;
      var visitorShare = visitorsByCountry[code] / totalVisitors;
      var revShare = totalRevenue > 0 ? (agg.revenue[code] || 0) / totalRevenue : 0;
      var orderShare = totalOrders > 0 ? (agg.orders[code] || 0) / totalOrders : 0;
      var orders = agg.orders[code] || 0;
      var revenue = agg.revenue[code] || 0;
      shareData.push({
        code: code,
        visitorShare: visitorShare,
        revenueShare: revShare,
        orderShare: orderShare,
        ordersPerVisitor: visitorsByCountry[code] > 0 ? orders / visitorsByCountry[code] : null,
        revenuePerVisitor: visitorsByCountry[code] > 0 ? revenue / visitorsByCountry[code] : null,
      });
    }
    shareData.sort(function (a, b) {
      return b.visitorShare - a.visitorShare;
    });
    shareData = shareData.slice(0, 10);

    registerChart("revenue-vs-visitor-share", function () {
    new Chart(document.getElementById("revenue-vs-visitor-share"), {
      type: "bar",
      data: {
        labels: shareData.map(function (e) {
          return countryNames[e.code];
        }),
        datasets: [
          {
            label: "Visitor Share",
            data: shareData.map(function (e) {
              return Math.round(e.visitorShare * 10000) / 100;
            }),
            backgroundColor: "#3b82f6",
            yAxisID: "share",
          },
          {
            label: "Revenue Share",
            data: shareData.map(function (e) {
              return Math.round(e.revenueShare * 10000) / 100;
            }),
            backgroundColor: "#10b981",
            yAxisID: "share",
          },
          {
            label: "Revenue per 100 Visitors",
            data: shareData.map(function (e) {
              return e.revenuePerVisitor !== null ? Math.round(e.revenuePerVisitor * 100 * 100) / 100 : null;
            }),
            backgroundColor: "#8b5cf6",
            yAxisID: "rate",
          },
        ],
      },
      options: {
        responsive: true,
        title: { display: true, text: "Revenue Share vs. Visitor Share by Country" },
        tooltips: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: function (tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label;
              if (tooltipItem.datasetIndex === 2) {
                return tooltipItem.yLabel != null
                  ? label + ": " + dollarFormatter(tooltipItem.yLabel)
                  : null;
              }
              return label + ": " + tooltipItem.yLabel.toFixed(1) + "%";
            },
          },
        },
        scales: {
          yAxes: [
            {
              id: "share",
              position: "left",
              ticks: {
                beginAtZero: true,
                callback: function (value) {
                  return value + "%";
                },
              },
            },
            {
              id: "rate",
              position: "right",
              gridLines: { drawOnChartArea: false },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
    });

    registerChart("orders-vs-visitor-share", function () {
    new Chart(document.getElementById("orders-vs-visitor-share"), {
      type: "bar",
      data: {
        labels: shareData.map(function (e) {
          return countryNames[e.code];
        }),
        datasets: [
          {
            label: "Visitor Share",
            data: shareData.map(function (e) {
              return Math.round(e.visitorShare * 10000) / 100;
            }),
            backgroundColor: "#3b82f6",
            yAxisID: "share",
          },
          {
            label: "Order Share",
            data: shareData.map(function (e) {
              return Math.round(e.orderShare * 10000) / 100;
            }),
            backgroundColor: "#f59e0b",
            yAxisID: "share",
          },
          {
            label: "Orders per Visitor",
            data: shareData.map(function (e) {
              return e.ordersPerVisitor !== null ? Math.round(e.ordersPerVisitor * 10000) / 10000 : null;
            }),
            backgroundColor: "#8b5cf6",
            yAxisID: "rate",
          },
        ],
      },
      options: {
        responsive: true,
        title: { display: true, text: "Order Share vs. Visitor Share by Country" },
        tooltips: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: function (tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label;
              if (tooltipItem.datasetIndex === 2) {
                return tooltipItem.yLabel != null
                  ? label + ": " + (tooltipItem.yLabel * 100).toFixed(2) + "%"
                  : null;
              }
              return label + ": " + tooltipItem.yLabel.toFixed(1) + "%";
            },
          },
        },
        scales: {
          yAxes: [
            {
              id: "share",
              position: "left",
              ticks: {
                beginAtZero: true,
                callback: function (value) {
                  return value + "%";
                },
              },
            },
            {
              id: "rate",
              position: "right",
              gridLines: { drawOnChartArea: false },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
    });

    // Force Chart.js to recalculate dimensions for all charts.
    window.dispatchEvent(new Event("resize"));
  });
});
