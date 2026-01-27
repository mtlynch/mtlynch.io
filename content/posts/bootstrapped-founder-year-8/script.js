const dollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

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

function drawRevenueProfit(canvasId, labels, revenue, profit, tooltips) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) {
    return;
  }
  ctx.height = 400;

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Revenue",
          data: revenue,
          backgroundColor: "#047a15",
          xAxisID: "x1",
          categoryPercentage: 0.8,
          barPercentage: 0.9,
          order: 1,
        },
        {
          label: "Profit",
          data: profit,
          backgroundColor: profit.map(function (v) {
            return v >= 0 ? "#5dadec" : "#d9534f";
          }),
          xAxisID: "x2",
          categoryPercentage: 0.8,
          barPercentage: 0.9,
          order: 0,
        },
      ],
    },
    options: {
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
        yAxes: [
          {
            ticks: {
              callback: function (value) {
                return dollarFormatter.format(value);
              },
            },
          },
        ],
      },
    },
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
      defaultTooltips
    );
  });
