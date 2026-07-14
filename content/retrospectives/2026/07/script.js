(function () {
  var dollarFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  var dollarCentsFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
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

  function parseCountryVisitorsCsv(csv) {
    var lines = csv.trim().split(/\r?\n/);
    var usVisitors = 0;
    var nonUsVisitors = 0;

    for (var i = 1; i < lines.length; i++) {
      var fields = parseCsvLine(lines[i]);
      var visitors = parseInt(fields[1], 10);

      if (isNaN(visitors)) {
        continue;
      }

      if (fields[0] === "United States") {
        usVisitors += visitors;
      } else {
        nonUsVisitors += visitors;
      }
    }

    return {
      usVisitors: usVisitors,
      nonUsVisitors: nonUsVisitors,
    };
  }

  function addUtcDays(date, days) {
    date.setUTCDate(date.getUTCDate() + days);
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

  function daysBetween(startKey, endKey) {
    var start = new Date(startKey + "T00:00:00Z");
    var end = new Date(endKey + "T00:00:00Z");
    return Math.round((end - start) / 86400000);
  }

  function startOfWeekKey(dateKey) {
    var date = new Date(dateKey + "T00:00:00Z");
    var dayOfWeek = date.getUTCDay();
    var daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    addUtcDays(date, -daysSinceMonday);
    return formatDateKey(date);
  }

  function buildWeeklySales(rows) {
    var byWeek = {};
    for (var i = 0; i < rows.length; i++) {
      var weekKey = startOfWeekKey(rows[i].date);
      byWeek[weekKey] = (byWeek[weekKey] || 0) + rows[i].netRevenue;
    }

    var weekStarts = Object.keys(byWeek).sort();
    var start = new Date(weekStarts[0] + "T00:00:00Z");
    var end = new Date(weekStarts[weekStarts.length - 1] + "T00:00:00Z");
    var labels = [];
    var fullLabels = [];
    var weeklyRevenue = [];

    for (var d = start; d <= end; addUtcDays(d, 7)) {
      var key = formatDateKey(d);
      var weekEnd = new Date(key + "T00:00:00Z");
      addUtcDays(weekEnd, 6);
      var weekEndKey = formatDateKey(weekEnd);
      var revenue = byWeek[key] || 0;
      labels.push(formatShortDate(key) + " - " + formatShortDate(weekEndKey));
      fullLabels.push(key + " to " + weekEndKey);
      weeklyRevenue.push(Math.round(revenue * 100) / 100);
    }

    return {
      labels: labels,
      fullLabels: fullLabels,
      startKey: weekStarts[0],
      weeklyRevenue: weeklyRevenue,
    };
  }

  function chartXForDate(chart, startKey, dateKey) {
    var xScale = chart.scales["x-axis-0"];
    var daysFromStart = daysBetween(startKey, dateKey);
    var weekIndex = Math.floor(daysFromStart / 7);
    var daysIntoWeek = daysFromStart % 7;
    var centerX = xScale.getPixelForTick(weekIndex);
    var nextCenterX = xScale.getPixelForTick(
      Math.min(weekIndex + 1, chart.config.data.labels.length - 1),
    );
    var stepWidth = nextCenterX - centerX;

    if (stepWidth === 0 && weekIndex > 0) {
      stepWidth = centerX - xScale.getPixelForTick(weekIndex - 1);
    }

    return centerX - stepWidth / 2 + (stepWidth * daysIntoWeek) / 7;
  }

  var bookSalesEventLabelPlugin = {
    afterDatasetsDraw: function (chart) {
      var events = chart.config.options.bookSalesEvents;
      if (!events || !events.length) {
        return;
      }

      var chartArea = chart.chartArea;
      var labels = chart.config.data.labels;
      if (!chartArea || !labels || !labels.length) {
        return;
      }

      var ctx = chart.ctx;

      ctx.save();
      ctx.font = "bold 11px sans-serif";
      ctx.textBaseline = "middle";

      for (var i = 0; i < events.length; i++) {
        var x = chartXForDate(chart, events[i].chartStartKey, events[i].date);

        if (x < chartArea.left || x > chartArea.right) {
          continue;
        }

        ctx.strokeStyle = "#8b3a00";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, chartArea.top);
        ctx.lineTo(x, chartArea.bottom);
        ctx.stroke();

        var labelLines = events[i].labelLines || [events[i].label];
        var labelPaddingX = 6;
        var labelPaddingY = 4;
        var lineHeight = 13;
        var textWidth = 0;

        for (var j = 0; j < labelLines.length; j++) {
          textWidth = Math.max(textWidth, ctx.measureText(labelLines[j]).width);
        }

        var labelWidth = textWidth + labelPaddingX * 2;
        var labelHeight = lineHeight * labelLines.length + labelPaddingY * 2;
        var labelX = Math.max(
          chartArea.left + 4,
          Math.min(x - labelWidth / 2, chartArea.right - labelWidth - 4),
        );
        var textX = labelX + labelWidth / 2;
        var textY = chartArea.top + 14 + (events[i].labelOffsetY || 0);

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
          labelX,
          textY - labelHeight / 2,
          labelWidth,
          labelHeight,
        );
        ctx.strokeStyle = "#8b3a00";
        ctx.lineWidth = 1;
        ctx.strokeRect(
          labelX,
          textY - labelHeight / 2,
          labelWidth,
          labelHeight,
        );
        ctx.fillStyle = "#333333";
        ctx.textAlign = "center";

        for (var k = 0; k < labelLines.length; k++) {
          ctx.fillText(
            labelLines[k],
            textX,
            textY - ((labelLines.length - 1) * lineHeight) / 2 + k * lineHeight,
          );
        }
      }

      ctx.restore();
    },
  };

  Chart.plugins.register(bookSalesEventLabelPlugin);

  function daysInclusive(startKey, endKey) {
    var start = new Date(startKey + "T00:00:00Z");
    var end = new Date(endKey + "T00:00:00Z");
    return Math.round((end - start) / 86400000) + 1;
  }

  function summarizePeriod(rows, label, startKey, endKey, currency, excludedCurrency) {
    var total = 0;
    var orders = 0;
    for (var i = 0; i < rows.length; i++) {
      if (
        rows[i].date >= startKey &&
        rows[i].date <= endKey &&
        (!currency || rows[i].currency === currency) &&
        (!excludedCurrency || rows[i].currency !== excludedCurrency)
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

  function latestDateKey(rows) {
    var latest = rows[0].date;
    for (var i = 1; i < rows.length; i++) {
      if (rows[i].date > latest) {
        latest = rows[i].date;
      }
    }
    return latest;
  }

  function buildCompletionRevenueComparison(rows) {
    var periods = [
      ["Before completion", "2026-05-12", "2026-06-01"],
      ["After completion", "2026-06-03", "2026-06-23"],
    ];
    return periods.map(function (period) {
      var allSummary = summarizePeriod(rows, period[0], period[1], period[2]);
      var summary = summarizePeriod(rows, period[0], period[1], period[2], null, "usd");
      var usdSummary = summarizePeriod(
        rows,
        period[0],
        period[1],
        period[2],
        "usd",
      );
      summary.allAverage = allSummary.average;
      summary.allOrders = allSummary.orders;
      summary.allTotal = allSummary.total;
      summary.usdAverage = usdSummary.average;
      summary.usdOrders = usdSummary.orders;
      summary.usdTotal = usdSummary.total;
      return summary;
    });
  }

  function buildDesignDocsExcerptRevenueComparison(rows) {
    var startKey = "2026-06-24";
    var endKey = latestDateKey(rows);
    var summary = summarizePeriod(
      rows,
      "Published design docs excerpt onward",
      startKey,
      endKey,
      null,
      "usd",
    );
    var usdSummary = summarizePeriod(
      rows,
      summary.label,
      startKey,
      endKey,
      "usd",
    );

    summary.usdAverage = usdSummary.average;
    summary.usdOrders = usdSummary.orders;
    summary.usdTotal = usdSummary.total;
    summary.label = "After new excerpt";
    return summary;
  }

  function revenuePerVisitor(revenue, visitors) {
    if (visitors === 0) {
      return 0;
    }
    return Math.round((revenue / visitors) * 10000) / 10000;
  }

  function buildRevenuePerVisitorComparison(periods, countryVisitors) {
    return periods.map(function (period, i) {
      return {
        label: period.label,
        start: period.start,
        end: period.end,
        nonUsdRevenue: period.total,
        usdRevenue: period.usdTotal,
        nonUsdVisitors: countryVisitors[i].nonUsVisitors,
        usdVisitors: countryVisitors[i].usVisitors,
        nonUsdRevenuePerVisitor: revenuePerVisitor(
          period.total,
          countryVisitors[i].nonUsVisitors,
        ),
        usdRevenuePerVisitor: revenuePerVisitor(
          period.usdTotal,
          countryVisitors[i].usVisitors,
        ),
      };
    });
  }

  function drawAllCurrenciesCompletionRevenueChart(periods) {
    var canvas = document.getElementById("all-currencies-completion-revenue-chart");
    if (!canvas) {
      return;
    }
    canvas.height = 260;

    new Chart(canvas, {
      type: "bar",
      data: {
        labels: ["All buyer currencies"],
        datasets: [
          {
            label: periods[0].label,
            data: [periods[0].allAverage],
            backgroundColor: "#f6d98b",
          },
          {
            label: periods[1].label,
            data: [periods[1].allAverage],
            backgroundColor: "#9fd8a8",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Average Daily Book Revenue, All Buyer Currencies",
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem) {
              var period = periods[tooltipItem.datasetIndex];
              return (
                period.label +
                ": " +
                dollarCentsFormatter.format(tooltipItem.yLabel) +
                "/day"
              );
            },
            afterLabel: function (tooltipItem) {
              var period = periods[tooltipItem.datasetIndex];
              return [
                "Period: " + period.start + " to " + period.end,
                "Total: " + dollarFormatter.format(period.allTotal),
                "Orders: " + period.allOrders,
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
                  return dollarCentsFormatter.format(value);
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

  function drawBookSalesChart(sales) {
    var canvas = document.getElementById("book-sales-chart");
    if (!canvas) {
      return;
    }
    canvas.height = 360;

    var eventLabels = [
      {
        chartStartKey: sales.startKey,
        date: "2026-06-02",
        label: "Marked book as complete",
        labelLines: ["Marked book", "as complete"],
      },
      {
        chartStartKey: sales.startKey,
        date: "2026-06-24",
        label: "Published design docs excerpt",
        labelLines: ["Published design", "docs excerpt"],
        labelOffsetY: 20,
      },
    ];

    new Chart(canvas, {
      type: "bar",
      data: {
        labels: sales.labels,
        datasets: [
          {
            label: "Weekly net revenue",
            data: sales.weeklyRevenue,
            backgroundColor: "#9fd8a8",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        bookSalesEvents: eventLabels,
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
              ticks: {
                beginAtZero: true,
                callback: function (value) {
                  return dollarFormatter.format(value);
                },
              },
              scaleLabel: {
                display: true,
                labelString: "Weekly net revenue",
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
        labels: ["Non-USD currencies", "Buyer currency USD"],
        datasets: [
          {
            label: periods[0].label,
            data: [periods[0].average, periods[0].usdAverage],
            backgroundColor: "#f6d98b",
          },
          {
            label: periods[1].label,
            data: [periods[1].average, periods[1].usdAverage],
            backgroundColor: "#9fd8a8",
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
                dollarCentsFormatter.format(tooltipItem.yLabel) +
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
                  return dollarCentsFormatter.format(value);
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

  function drawDesignDocsExcerptRevenueChart(
    beforeCompletionPeriod,
    afterCompletionPeriod,
    afterExcerptPeriod,
  ) {
    var canvas = document.getElementById("design-docs-excerpt-revenue-chart");
    if (!canvas) {
      return;
    }
    canvas.height = 300;

    new Chart(canvas, {
      type: "bar",
      data: {
        labels: ["Non-USD currencies", "Buyer currency USD"],
        datasets: [
          {
            label: beforeCompletionPeriod.label,
            data: [beforeCompletionPeriod.average, beforeCompletionPeriod.usdAverage],
            backgroundColor: "#f6d98b",
          },
          {
            label: afterCompletionPeriod.label,
            data: [afterCompletionPeriod.average, afterCompletionPeriod.usdAverage],
            backgroundColor: "#9fd8a8",
          },
          {
            label: afterExcerptPeriod.label,
            data: [afterExcerptPeriod.average, afterExcerptPeriod.usdAverage],
            backgroundColor: "#9fc5e8",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Average Daily Book Revenue Before Completion vs. After Completion vs. New Excerpt",
        },
        tooltips: {
          callbacks: {
            title: function (tooltipItems) {
              return tooltipItems[0].xLabel;
            },
            label: function (tooltipItem) {
              var period = [
                beforeCompletionPeriod,
                afterCompletionPeriod,
                afterExcerptPeriod,
              ][tooltipItem.datasetIndex];
              return (
                period.label +
                ": " +
                dollarCentsFormatter.format(tooltipItem.yLabel) +
                "/day"
              );
            },
            afterLabel: function (tooltipItem) {
              var period = [
                beforeCompletionPeriod,
                afterCompletionPeriod,
                afterExcerptPeriod,
              ][tooltipItem.datasetIndex];
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
                  return dollarCentsFormatter.format(value);
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

  function drawRevenuePerVisitorChart(periods) {
    var canvas = document.getElementById("revenue-per-visitor-chart");
    if (!canvas) {
      return;
    }
    canvas.height = 300;

    new Chart(canvas, {
      type: "bar",
      data: {
        labels: ["Non-USD currencies", "Buyer currency USD"],
        datasets: [
          {
            label: periods[0].label,
            data: [periods[0].nonUsdRevenuePerVisitor, periods[0].usdRevenuePerVisitor],
            backgroundColor: "#f6d98b",
          },
          {
            label: periods[1].label,
            data: [periods[1].nonUsdRevenuePerVisitor, periods[1].usdRevenuePerVisitor],
            backgroundColor: "#9fd8a8",
          },
          {
            label: periods[2].label,
            data: [periods[2].nonUsdRevenuePerVisitor, periods[2].usdRevenuePerVisitor],
            backgroundColor: "#9fc5e8",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Book Revenue per Visitor Before Completion vs. After Completion vs. New Excerpt",
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
                dollarCentsFormatter.format(tooltipItem.yLabel) +
                "/visitor"
              );
            },
            afterLabel: function (tooltipItem) {
              var period = periods[tooltipItem.datasetIndex];
              var revenue = period.nonUsdRevenue;
              var visitors = period.nonUsdVisitors;
              if (tooltipItem.index === 1) {
                revenue = period.usdRevenue;
                visitors = period.usdVisitors;
              }
              return [
                "Period: " + period.start + " to " + period.end,
                "Revenue: " + dollarFormatter.format(revenue),
                "Visitors: " + visitors,
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
                  return dollarCentsFormatter.format(value);
                },
              },
              scaleLabel: {
                display: true,
                labelString: "Net revenue per visitor",
              },
            },
          ],
        },
      },
    });
  }

  window.addEventListener("load", function () {
    Promise.all([
      fetch("book-sales.csv").then(function (res) {
        return res.text();
      }),
      fetch("countries-2026-05-12-to-2026-06-01.csv").then(function (res) {
        return res.text();
      }),
      fetch("countries-2026-06-03-to-2026-06-23.csv").then(function (res) {
        return res.text();
      }),
      fetch("countries-2026-06-24-to-2026-07-10.csv").then(function (res) {
        return res.text();
      }),
    ]).then(function (csvs) {
        var rows = parseSalesCsv(csvs[0]);
        var countryVisitors = [
          parseCountryVisitorsCsv(csvs[1]),
          parseCountryVisitorsCsv(csvs[2]),
          parseCountryVisitorsCsv(csvs[3]),
        ];
        var completionRevenueComparison = buildCompletionRevenueComparison(rows);
        var designDocsExcerptRevenueComparison = buildDesignDocsExcerptRevenueComparison(rows);
        var allRevenuePeriods = [
          completionRevenueComparison[0],
          completionRevenueComparison[1],
          designDocsExcerptRevenueComparison,
        ];
        drawBookSalesChart(buildWeeklySales(rows));
        drawAllCurrenciesCompletionRevenueChart(completionRevenueComparison);
        drawCompletionRevenueChart(completionRevenueComparison);
        drawDesignDocsExcerptRevenueChart(
          completionRevenueComparison[0],
          completionRevenueComparison[1],
          designDocsExcerptRevenueComparison,
        );
        drawRevenuePerVisitorChart(
          buildRevenuePerVisitorComparison(allRevenuePeriods, countryVisitors),
        );
      });
  });
})();
