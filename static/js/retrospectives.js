const dollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function drawChart(
  chartId,
  labels,
  data,
  label,
  formatter = dollarFormatter.format
) {
  const ctx = document.getElementById(chartId);
  if (!ctx) {
    return;
  }
  ctx.height = 300;
  const profitRaw = [
    3636.08, 10328.8, -352.77, 843.56, 6858.72, -9452.32, -9713.34, -10140.95,
    11713.04, 1936.22, 12758.39, -15207.05, -8425.67, 27039.62, -2551.26,
  ];
  let profitAvg = [null, null, null, null, null, null, null, null];
  let trailing = [];
  for (const p of profitRaw) {
    trailing.push(p);
    if (trailing.length > 3) {
      trailing.shift();
      profitAvg.push(trailing.reduce((a, b) => a + b) / trailing.length);
    }
  }
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: "#047a15",
          borderColor: "#4ba658",
          fill: false,
          lineTension: 0.0,
        },
        {
          label: "Profit (3-month trailing average)",
          data: profitAvg,
          backgroundColor: "black",
          borderColor: "black",
          fill: false,
          lineTension: 0.6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          label: function (tooltipItems) {
            return formatter(parseFloat(tooltipItems.yLabel));
          },
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMin: 0,
              callback: function (value) {
                return formatter(value);
              },
            },
          },
        ],
      },
    },
  });
}

function getDate() {
  const pathParts = window.location.pathname.split("/");
  const year = parseInt(pathParts[2]);
  const month = parseInt(pathParts[3]) - 1;
  return new Date(year, month);
}

// Parse a date string like "2020-05" into a JavaScript Date object.
function parseDate(d) {
  const dateParts = d.split("-");
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1;
  return new Date(year, month);
}

function drawCharts(limitDate) {
  fetch("/data/project-revenue.json")
    .then((res) => res.json())
    .then((revenueByProject) => {
      for ([project, data] of Object.entries(revenueByProject)) {
        if (project !== "tinypilot") {
          continue;
        }
        let dates = [];
        for (d of Object.keys(data)) {
          const date = parseDate(d);
          if (date >= limitDate) {
            continue;
          }
          dates.push(
            date.toLocaleString("default", { month: "long" }) +
              " " +
              date.getFullYear()
          );
        }
        let values = Object.values(data).slice(0, dates.length);
        drawChart(project + "-revenue", dates, values, "Total Revenue");
      }
    });
}

drawCharts(getDate());
