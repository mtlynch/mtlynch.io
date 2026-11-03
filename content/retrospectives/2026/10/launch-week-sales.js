// Keep the retrospective's existing charts on their original Chart.js version.
const originalChart = window.Chart;
await import("/zig-extraneous-build/third-party/chart.umd.js");
const LaunchWeekChart = window.Chart;
window.Chart = originalChart;

const countFormat = new Intl.NumberFormat("en-US");
const currencyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function salesDatasets(priorEbook, launchEbook, launchPrint, yAxisID) {
  return [
    {
      label: "Prior Week (ebook)",
      bookFormat: "ebook",
      stack: "Prior Week",
      data: priorEbook,
      backgroundColor: "#3b82f6",
    },
    {
      label: "Launch Week (ebook)",
      bookFormat: "ebook",
      stack: "Launch Week",
      data: launchEbook,
      backgroundColor: "#10b981",
    },
    {
      label: "Launch Week (print)",
      bookFormat: "print",
      stack: "Launch Week",
      data: launchPrint,
      backgroundColor: "#047857",
    },
  ].map((dataset) => ({
    ...dataset,
    yAxisID,
    barThickness: 28,
    barPercentage: 1,
  }));
}

new LaunchWeekChart(document.getElementById("launch-week-sales-chart"), {
  type: "bar",
  data: {
    labels: ["Copies sold", "Revenue", "Profit"],
    datasets: [
      ...salesDatasets(
        [8, null, null],
        [70, null, null],
        [57, null, null],
        "copies",
      ),
      ...salesDatasets(
        [null, 355.56, 339.09],
        [null, 1897.41, 1801.27],
        [null, 1772.42, 453.16],
        "dollars",
      ),
    ],
  },
  options: {
    indexAxis: "x",
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "nearest",
      intersect: true,
    },
    plugins: {
      legend: {
        labels: {
          filter: (item) => item.datasetIndex < 3,
        },
        onClick: (event, item, legend) => {
          const chart = legend.chart;
          const visible = chart.isDatasetVisible(item.datasetIndex);
          chart.data.datasets.forEach((dataset, index) => {
            if (dataset.label === item.text) {
              chart.setDatasetVisibility(index, !visible);
            }
          });
          chart.update();
        },
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          title: () => "",
          label: (context) => {
            const formatter =
              context.dataset.yAxisID === "copies"
                ? countFormat
                : currencyFormat;
            return `${context.label} (${context.dataset.bookFormat}): ${formatter.format(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
        },
      },
      copies: {
        type: "linear",
        position: "left",
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: "Copies sold",
        },
        ticks: {
          maxTicksLimit: 5,
          precision: 0,
          callback: (value) => countFormat.format(value),
        },
      },
      dollars: {
        type: "linear",
        position: "right",
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: "US dollars",
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          maxTicksLimit: 5,
          callback: (value) => currencyFormat.format(value),
        },
      },
    },
  },
});
