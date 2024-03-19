function populateGraph(graphId, values, labels) {
  const ctx = document.getElementById(graphId);
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Runtime (µs)",
          data: values,
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(24, 24, 255, 0.2)",
          ],

          borderColor: [
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(24, 24, 255)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            text: "Runtime (µs)",
          },
          beginAtZero: true,
        },
      },
    },
  });
}

populateGraph(
  "demo-command",
  [24.217, 40.338],
  ["evm (Official Go implementation)", "eth-zvm (My Zig implementation)"]
);

populateGraph(
  "benchmark-fix",
  [438.059, 67.378],
  ["eth-zvm (Before benchmark fix)", "eth-zvm (After benchmark fix)"]
);

populateGraph(
  "benchmark-fix-buffered",
  [438.059, 67.378, 56.602],
  [
    "eth-zvm (Before benchmark fix)",
    "eth-zvm (After benchmark fix)",
    "eth-zvm (After benchmark fix + buffering)",
  ]
);

populateGraph(
  "count-to-1000-by-1-v2",
  [95.423, 58.076],
  [
    "evm (Official Go implementation)",
    "eth-zvm (My Zig implementation, after fixes)",
  ]
);

populateGraph(
  "count-to-1000-by-1-v3",
  [95.423, 58.076, 34.457],
  [
    "evm (Official Go implementation)",
    "eth-zvm (My Zig implementation, after fixes)",
    "eth-zvm (My Zig implementation, no memory allocation)",
  ]
);
