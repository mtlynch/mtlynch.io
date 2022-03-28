const dollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
const deltaDollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  signDisplay: "always",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
const numberFormatter = new Intl.NumberFormat("en-US", {
  signDisplay: "always",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
const percentageFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  signDisplay: "always",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
function drawTotalFinancesChart() {
  var ctx = document.getElementById("total-finances").getContext("2d");
  ctx.height = 400;
  let revenues = new Map();
  revenues.set(2018, 2262);
  revenues.set(2019, 7254);
  revenues.set(2020, 63477);
  revenues.set(2021, 17920.91 + 459528.53);
  let expenses = new Map();
  expenses.set(2018, 23133);
  expenses.set(2019, 9657);
  expenses.set(2020, 67441);
  expenses.set(2021, 7649.72 + 456420.95 - 1138.96);
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Array.from(revenues.keys()).map((x) => String(x)),
      datasets: [
        {
          label: "Revenue",
          data: Array.from(revenues.values()),
          backgroundColor: "rgb(57, 57, 255)",
          borderColor: "rgb(131, 131, 235)",
          fill: false,
        },
        {
          label: "Expenses",
          data: Array.from(expenses.values()).map((x) => -x),
          backgroundColor: "rgb(255, 0, 0)",
          borderColor: "rgb(255, 130, 130)",
          fill: false,
        },
        {
          label: "Net Profit",
          data: Array.from(revenues.keys()).map(
            (y) => revenues.get(y) - expenses.get(y)
          ),
          backgroundColor: "rgb(0, 255, 0)",
          borderColor: "rgb(172, 255, 172)",
          fill: false,
        },
      ],
    },
    options: {
      tooltips: {
        callbacks: {
          label: function (tooltipItems) {
            return dollarFormatter.format(parseFloat(tooltipItems.yLabel));
          },
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMin: 0,
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
function drawChart(chartId, labels, data) {
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
          label: "Revenue",
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
            return dollarFormatter.format(parseFloat(tooltipItems.yLabel));
          },
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMin: 0,
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
// Parse a date string like "2020-05" into a JavaScript Date object.
function parseDate(d) {
  const dateParts = d.split("-");
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1;
  return new Date(year, month);
}
function drawCharts(limit) {
  fetch("/data/project-revenue.json")
    .then((res) => res.json())
    .then((revenueByProject) => {
      const limitDate = parseDate(limit);
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
        drawChart(project + "-revenue", dates, values);
      }
    });
}
function parseMetric(raw) {
  return parseInt(raw.replace(/[$,]/gi, ""));
}
function populateDeltaCell(deltaSpan) {
  // Find the parent <td> element
  let el = deltaSpan.parentElement;
  while (el && !(el instanceof HTMLTableCellElement)) {
    el = el.parentElement;
  }
  deltaCell = el;
  const baseValueRaw =
    deltaCell.previousElementSibling.previousElementSibling.innerText;
  const newValueRaw = deltaCell.previousElementSibling.innerText;
  const baseValue = parseMetric(baseValueRaw);
  const newValue = parseMetric(newValueRaw);
  let absoluteDelta = newValue - baseValue;
  let percentageDelta = absoluteDelta / baseValue;
  if (absoluteDelta > 0) {
    deltaSpan.classList.add("good-delta");
  } else if (absoluteDelta < 0) {
    deltaSpan.classList.add("bad-delta");
  }
  let absoluteFormatter = numberFormatter;
  if (baseValueRaw.indexOf("$") >= 0) {
    absoluteFormatter = deltaDollarFormatter;
  }
  let isNetProfitRow =
    deltaCell.previousElementSibling.previousElementSibling
      .previousElementSibling.innerText === "Net profit";
  if (baseValue <= 0) {
    if (newValue <= 0) {
      if (isNetProfitRow) {
        percentageDelta *= -1;
      } else {
        absoluteDelta *= -1;
      }
    } else {
      percentageDelta = Infinity;
    }
  }
  deltaSpan.innerText = `${absoluteFormatter.format(
    absoluteDelta
  )} (${percentageFormatter.format(percentageDelta)})`;
}
document.querySelectorAll('[blog-purpose="delta"]').forEach(populateDeltaCell);
drawTotalFinancesChart();
drawCharts("2022-01");
