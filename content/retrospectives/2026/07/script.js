(function () {
  var dollarFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  function parseCsvLine(line) {
    var fields = [];
    var field = "";
    var inQuotes = false;

    for (var i = 0; i < line.length; i++) {
      var ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === "," && !inQuotes) {
        fields.push(field);
        field = "";
      } else {
        field += ch;
      }
    }
    fields.push(field);
    return fields;
  }

  function parseSalesCsv(csv) {
    var lines = csv.trim().split(/\r?\n/);
    var rows = [];

    for (var i = 1; i < lines.length; i++) {
      var fields = parseCsvLine(lines[i]);
      var convertedAmount = parseFloat(fields[3]);
      var fee = parseFloat(fields[5]) || 0;
      var status = fields[6];

      if (status !== "Paid" || isNaN(convertedAmount)) {
        continue;
      }

      rows.push({
        date: fields[0].slice(0, 10),
        currency: fields[2],
        netRevenue: convertedAmount - fee,
      });
    }

    return rows;
  }

  function addUtcDay(date) {
    date.setUTCDate(date.getUTCDate() + 1);
  }

  function formatDateKey(date) {
    return date.toISOString().slice(0, 10);
  }

  function formatShortDate(dateKey) {
    var date = new Date(dateKey + "T00:00:00Z");
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  }

  function buildDailySales(rows) {
    var byDate = {};
    for (var i = 0; i < rows.length; i++) {
      byDate[rows[i].date] = (byDate[rows[i].date] || 0) + rows[i].netRevenue;
    }

    var dates = Object.keys(byDate).sort();
    var start = new Date(dates[0] + "T00:00:00Z");
    var end = new Date(dates[dates.length - 1] + "T00:00:00Z");
    var labels = [];
    var fullLabels = [];
    var dailyRevenue = [];
    var cumulativeRevenue = [];
    var cumulative = 0;

    for (var d = start; d <= end; addUtcDay(d)) {
      var key = formatDateKey(d);
      var revenue = byDate[key] || 0;
      cumulative += revenue;
      labels.push(formatShortDate(key));
      fullLabels.push(key);
      dailyRevenue.push(Math.round(revenue * 100) / 100);
      cumulativeRevenue.push(Math.round(cumulative * 100) / 100);
    }

    return {
      labels: labels,
      fullLabels: fullLabels,
      dailyRevenue: dailyRevenue,
      cumulativeRevenue: cumulativeRevenue,
    };
  }

  function daysInclusive(startKey, endKey) {
    var start = new Date(startKey + "T00:00:00Z");
    var end = new Date(endKey + "T00:00:00Z");
    return Math.round((end - start) / 86400000) + 1;
  }

  function summarizePeriod(rows, label, startKey, endKey, currency) {
    var total = 0;
    var orders = 0;
    for (var i = 0; i < rows.length; i++) {
      if (
        rows[i].date >= startKey &&
        rows[i].date <= endKey &&
        (!currency || rows[i].currency === currency)
      ) {
        total += rows[i].netRevenue;
        orders++;
      }
    }

    var days = daysInclusive(startKey, endKey);
    return {
      label: label,
      start: startKey,
      end: endKey,
      days: days,
      orders: orders,
      total: Math.round(total * 100) / 100,
      average: Math.round((total / days) * 100) / 100,
    };
  }

  function buildCompletionRevenueComparison(rows) {
    var periods = [
      ["Before completion", "2026-05-12", "2026-06-01"],
      ["After completion", "2026-06-03", "2026-06-23"],
    ];
    return periods.map(function (period) {
      var summary = summarizePeriod(rows, period[0], period[1], period[2]);
      var usdSummary = summarizePeriod(
        rows,
        period[0],
        period[1],
        period[2],
        "usd",
      );
      summary.usdAverage = usdSummary.average;
      summary.usdOrders = usdSummary.orders;
      summary.usdTotal = usdSummary.total;
      return summary;
    });
  }

  function drawBookSalesChart(sales) {
    var canvas = document.getElementById("book-sales-chart");
    if (!canvas) {
      return;
    }
    canvas.height = 360;

    new Chart(canvas, {
      type: "bar",
      data: {
        labels: sales.labels,
        datasets: [
          {
            label: "Daily net revenue",
            data: sales.dailyRevenue,
            backgroundColor: "#047a15",
            yAxisID: "daily",
          },
          {
            label: "Cumulative net revenue",
            data: sales.cumulativeRevenue,
            borderColor: "#333333",
            backgroundColor: "#333333",
            fill: false,
            lineTension: 0,
            pointRadius: 0,
            type: "line",
            yAxisID: "cumulative",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Refactoring English Book Sales",
        },
        tooltips: {
          mode: "index",
          intersect: false,
          callbacks: {
            title: function (tooltipItems) {
              return sales.fullLabels[tooltipItems[0].index];
            },
            label: function (tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label;
              return label + ": " + dollarFormatter.format(tooltipItem.yLabel);
            },
          },
        },
        scales: {
          xAxes: [
            {
              ticks: {
                maxTicksLimit: 10,
              },
            },
          ],
          yAxes: [
            {
              id: "daily",
              position: "left",
              ticks: {
                beginAtZero: true,
                callback: function (value) {
                  return dollarFormatter.format(value);
                },
              },
              scaleLabel: {
                display: true,
                labelString: "Daily net revenue",
              },
            },
            {
              id: "cumulative",
              position: "right",
              gridLines: {
                drawOnChartArea: false,
              },
              ticks: {
                beginAtZero: true,
                callback: function (value) {
                  return dollarFormatter.format(value);
                },
              },
              scaleLabel: {
                display: true,
                labelString: "Cumulative net revenue",
              },
            },
          ],
        },
      },
    });
  }

  function drawCompletionRevenueChart(periods) {
    var canvas = document.getElementById("completion-revenue-chart");
    if (!canvas) {
      return;
    }
    canvas.height = 300;

    new Chart(canvas, {
      type: "bar",
      data: {
        labels: ["All buyer currencies", "Buyer currency USD"],
        datasets: [
          {
            label: periods[0].label,
            data: [periods[0].average, periods[0].usdAverage],
            backgroundColor: "#999999",
          },
          {
            label: periods[1].label,
            data: [periods[1].average, periods[1].usdAverage],
            backgroundColor: "#047a15",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Average Daily Book Revenue Before vs. After Completion",
        },
        tooltips: {
          callbacks: {
            title: function (tooltipItems) {
              return tooltipItems[0].xLabel;
            },
            label: function (tooltipItem) {
              var period = periods[tooltipItem.datasetIndex];
              return (
                period.label +
                ": " +
                dollarFormatter.format(tooltipItem.yLabel) +
                "/day"
              );
            },
            afterLabel: function (tooltipItem) {
              var period = periods[tooltipItem.datasetIndex];
              var total = period.total;
              var orders = period.orders;
              if (tooltipItem.index === 1) {
                total = period.usdTotal;
                orders = period.usdOrders;
              }
              return [
                "Period: " + period.start + " to " + period.end,
                "Total: " + dollarFormatter.format(total),
                "Orders: " + orders,
                "Days: " + period.days,
              ];
            },
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback: function (value) {
                  return dollarFormatter.format(value);
                },
              },
              scaleLabel: {
                display: true,
                labelString: "Average net revenue per day",
              },
            },
          ],
        },
      },
    });
  }

  window.addEventListener("load", function () {
    fetch("book-sales.csv")
      .then(function (res) {
        return res.text();
      })
      .then(function (csv) {
        var rows = parseSalesCsv(csv);
        drawBookSalesChart(buildDailySales(rows));
        drawCompletionRevenueChart(buildCompletionRevenueComparison(rows));
      });
  });
})();
