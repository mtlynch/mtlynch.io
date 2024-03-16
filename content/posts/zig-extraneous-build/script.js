function populateGraph(graphId, values, labels) {
  const ctx = document.getElementById(graphId);
  console.log("values", values);
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
          ],

          borderColor: ["rgb(75, 192, 192)", "rgb(54, 162, 235)"],
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
  "count-to-1000-by-1-v0",
  [40.338, 24.217],
  ["eth-zvm (My Zig implementation)", "evm (Official Go implementation)"]
);

populateGraph(
  "benchmark-fix",
  [438.059, 67.378],
  ["eth-zvm (Before benchmark fix)", "eth-zvm (After benchmark fix)"]
);
