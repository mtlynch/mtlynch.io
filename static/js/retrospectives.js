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
  const myChart = new Chart(ctx, {
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
