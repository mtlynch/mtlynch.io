const dollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

// Map years to their blog posts and finance section anchors
const yearLinks = {
  2018: "/bootstrapped-founder-year-1/#how-i-made-and-spent-money",
  2019: "/bootstrapped-founder-year-2/#how-i-made-and-spent-money",
  2020: "/bootstrapped-founder-year-3/#the-year-things-clicked-into-place",
  2021: "/bootstrapped-founder-year-4/#tinypilot-finances",
  2022: "/bootstrapped-founder-year-5/#tinypilot-grew-annual-revenue-to-812k",
  2023: "/bootstrapped-founder-year-6/#tinypilot-became-20x-more-profitable",
  2024: "/bootstrapped-founder-year-7/",
  // 2025 is the current year, no link needed
};

// Square root scale: signed sqrt for compression
// Less aggressive than log, handles negatives
function signedSqrt(x) {
  return Math.sign(x) * Math.sqrt(Math.abs(x));
}

function signedSqrtInverse(y) {
  return Math.sign(y) * y * y;
}

// Register custom sqrt scale with Chart.js
Chart.scaleService.registerScaleType(
  "sqrt",
  Chart.scaleService.getScaleConstructor("linear").extend({
    buildTicks: function () {
      var me = this;
      var min = me.min;

      // Force max to $1M
      me.max = 1000000;

      // Generate nice tick values spanning the range
      var ticks = [];
      var tickValues = [-50000, -25000, 0, 25000, 100000, 250000, 500000, 750000, 1000000];

      tickValues.forEach(function (val) {
        if (val >= min && val <= me.max) {
          ticks.push({ value: val });
        }
      });

      me.ticks = ticks;
      return ticks;
    },
    getPixelForValue: function (value) {
      var me = this;
      var minSqrt = signedSqrt(me.min);
      var maxSqrt = signedSqrt(me.max);
      var valueSqrt = signedSqrt(value);
      var range = maxSqrt - minSqrt;
      var pixel =
        me.bottom - ((valueSqrt - minSqrt) / range) * (me.bottom - me.top);
      return pixel;
    },
    getValueForPixel: function (pixel) {
      var me = this;
      var minSqrt = signedSqrt(me.min);
      var maxSqrt = signedSqrt(me.max);
      var range = maxSqrt - minSqrt;
      var valueSqrt = minSqrt + ((me.bottom - pixel) / (me.bottom - me.top)) * range;
      return signedSqrtInverse(valueSqrt);
    },
  }),
  { position: "left" }
);

var monthlyFullLabels = [];

const defaultTooltips = {
  callbacks: {
    label: function (tooltipItems, data) {
      var label = data.datasets[tooltipItems.datasetIndex].label;
      return dollarFormatter.format(parseFloat(tooltipItems.yLabel)) + " " + label;
    },
  },
};

const monthlyTooltips = {
  callbacks: {
    title: function (tooltipItems) {
      return monthlyFullLabels[tooltipItems[0].index];
    },
    label: function (tooltipItems, data) {
      var label = data.datasets[tooltipItems.datasetIndex].label;
      return dollarFormatter.format(parseFloat(tooltipItems.yLabel)) + " " + label;
    },
  },
};

function drawRevenueProfit(canvasId, labels, revenue, profit, tooltips, useSymlog, yearData) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) {
    return;
  }
  ctx.height = 400;

  var yAxisConfig = {
    ticks: {
      callback: function (value) {
        return dollarFormatter.format(value);
      },
    },
  };

  if (useSymlog) {
    yAxisConfig.type = "sqrt";
  }

  var chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    tooltips: tooltips,
    scales: {
      xAxes: [
        {
          id: "x1",
          type: "category",
          offset: true,
        },
        {
          id: "x2",
          type: "category",
          display: false,
          offset: true,
          gridLines: {
            display: false,
            drawOnChartArea: false,
          },
        },
      ],
      yAxes: [yAxisConfig],
    },
  };

  // Add click and hover handlers for annual chart with year links
  if (yearData) {
    chartOptions.onClick = function (evt, elements) {
      if (elements.length > 0) {
        var index = elements[0]._index;
        var year = yearData[index].year;
        if (yearLinks[year]) {
          window.location.href = yearLinks[year];
        }
      }
    };
    chartOptions.onHover = function (evt, elements) {
      if (elements.length > 0) {
        var index = elements[0]._index;
        var year = yearData[index].year;
        if (yearLinks[year]) {
          evt.target.style.cursor = "pointer";
        } else {
          evt.target.style.cursor = "default";
        }
      } else {
        evt.target.style.cursor = "default";
      }
    };
  }

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Revenue",
          data: revenue,
          backgroundColor: "#999999",
          xAxisID: "x1",
          categoryPercentage: 0.8,
          barPercentage: 0.9,
          order: 1,
        },
        {
          label: "Profit",
          data: profit,
          backgroundColor: profit.map(function (v) {
            return v >= 0 ? "#047a15" : "#d9534f";
          }),
          xAxisID: "x2",
          categoryPercentage: 0.8,
          barPercentage: 0.9,
          order: 0,
        },
      ],
    },
    options: chartOptions,
  });
}

fetch("monthly-2025.json")
  .then(function (res) { return res.json(); })
  .then(function (data) {
    monthlyFullLabels = data.map(function (d) { return d.month + " 2025"; });
    drawRevenueProfit(
      "monthly-finances-chart",
      data.map(function (d) { return d.month.slice(0, 3); }),
      data.map(function (d) { return d.revenue; }),
      data.map(function (d) { return d.revenue - d.expenses; }),
      monthlyTooltips
    );
  });

fetch("annual-summary.json")
  .then(function (res) { return res.json(); })
  .then(function (data) {
    drawRevenueProfit(
      "annual-finances-chart",
      data.map(function (d) { return String(d.year); }),
      data.map(function (d) { return d.revenue; }),
      data.map(function (d) { return d.profit; }),
      defaultTooltips,
      true, // use symlog scale
      data  // pass year data for click handling
    );
  });
