const dollarFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
const dollarFormatter = dollarFormat.format;

function drawChart(project, dates, data) {
  const ctx = document.getElementById(project + "-finances-chart");
  ctx.height = 300;

  profitRaw = data.map((x) => {
    return x.profit ? x.profit : null;
  });
  let profitAvg = [];
  let trailing = [];
  for (const p of profitRaw) {
    if (p !== null) {
      trailing.push(p);
    }
    if (trailing.length === 3) {
      profitAvg.push(trailing.reduce((a, b) => a + b) / trailing.length);
      trailing.shift();
    } else {
      profitAvg.push(null);
    }
  }
  datasets = [
    {
      label: "Total Revenue",
      data: data.map((x) => x.totalRevenue),
      backgroundColor: "#047a15",
      borderColor: "#4ba658",
      fill: false,
      lineTension: 0.0,
    },
  ];
  datasets.push({
    label: "Profit (3-month trailing average)",
    data: profitAvg,
    backgroundColor: "black",
    borderColor: "black",
    fill: false,
    lineTension: 0.6,
  });
  new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          label: function (tooltipItems) {
            return dollarFormatter(parseFloat(tooltipItems.yLabel));
          },
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMin: 0,
              callback: function (value) {
                return dollarFormatter(value);
              },
            },
          },
        ],
      },
    },
  });
}

// Parse a date string like "2020-05" into a JavaScript Date object.
function parseDate(d) {
  const dateParts = d.split("-");
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1;
  return new Date(year, month);
}

function drawCharts(limitDate) {
  fetch("/data/project-finances.json")
    .then((res) => res.json())
    .then((financesByProject) => {
      for ([project, data] of Object.entries(financesByProject)) {
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
              date.getFullYear(),
          );
        }
        drawChart(project, dates, Object.values(data));
      }
    });
}

document.addEventListener("DOMContentLoaded", () => {
  drawCharts(parseDate("2024-01"));
});
