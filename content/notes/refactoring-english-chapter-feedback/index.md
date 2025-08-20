---
title: "Refactoring English Chapter Feedback"
date: 2025-08-20
---

<script src="/third-party/chart.js/4.5.0/chart.umd.js"></script>

<div style="width: 100%; height: 800px; margin: 20px 0;">
  <canvas id="chapterFeedbackChart"></canvas>
</div>

<script>
// Parse CSV data
async function parseCSV(filename) {
  const response = await fetch(filename);
  const text = await response.text();
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',');

  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = values[j] || '';
    }
    data.push(row);
  }
  return { headers, data };
}

// Extract chapter names from headers
function getChapterNames(headers) {
  return headers.slice(1).map(header => {
    const match = header.match(/\[([^\]]+)\]/);
    return match ? match[1] : header;
  });
}

// Clean response text (remove emojis)
function cleanResponse(response) {
  if (!response) return '';
  return response.replace(/^[🤩🙂🤔👎]\s*/, '').trim();
}

// Count responses for each chapter
function countResponses(data, headers) {
  const chapters = getChapterNames(headers);
  const results = {};

  chapters.forEach((chapter, index) => {
    const headerName = headers[index + 1]; // +1 to skip timestamp column
    const counts = {
      'Definitely will read': 0,
      'Will probably read': 0,
      'Might read': 0,
      'Definitely won\'t read': 0,
      total: 0
    };

    data.forEach(row => {
      const response = cleanResponse(row[headerName]);
      if (response) {
        counts.total++;
        if (response.includes('Definitely will read')) {
          counts['Definitely will read']++;
        } else if (response.includes('Will probably read')) {
          counts['Will probably read']++;
        } else if (response.includes('Might read')) {
          counts['Might read']++;
        } else if (response.includes('Definitely won\'t read')) {
          counts['Definitely won\'t read']++;
        }
      }
    });

    results[chapter] = counts;
  });

  return results;
}

// Convert counts to percentages
function countsToPercentages(counts) {
  const percentages = {};
  Object.keys(counts).forEach(chapter => {
    const chapterCounts = counts[chapter];
    const total = chapterCounts.total;

    percentages[chapter] = {
      'Definitely will read': total > 0 ? (chapterCounts['Definitely will read'] / total) * 100 : 0,
      'Will probably read': total > 0 ? (chapterCounts['Will probably read'] / total) * 100 : 0,
      'Might read': total > 0 ? (chapterCounts['Might read'] / total) * 100 : 0,
      'Definitely won\'t read': total > 0 ? (chapterCounts['Definitely won\'t read'] / total) * 100 : 0,
      total: total
    };
  });

  return percentages;
}

// Create chart data
function createChartData(paidPercentages, unpaidPercentages) {
  const chapters = Object.keys(paidPercentages);

  // Create labels - one per chapter
  const labels = chapters;

  // Create datasets for each response type and group (paid/unpaid)
  const datasets = [];

  // Prepare data arrays
  const paidNegative = [];
  const unpaidNegative = [];
  const paidDefinitely = [];
  const unpaidDefinitely = [];
  const paidProbably = [];
  const unpaidProbably = [];
  const paidMight = [];
  const unpaidMight = [];

  chapters.forEach(chapter => {
    const paid = paidPercentages[chapter];
    const unpaid = unpaidPercentages[chapter];

    // Negative values for "won't read"
    paidNegative.push(-paid['Definitely won\'t read']);
    unpaidNegative.push(-unpaid['Definitely won\'t read']);

    // Positive values - base layer first
    paidDefinitely.push(paid['Definitely will read']);
    unpaidDefinitely.push(unpaid['Definitely will read']);

    paidProbably.push(paid['Will probably read']);
    unpaidProbably.push(unpaid['Will probably read']);

    paidMight.push(paid['Might read']);
    unpaidMight.push(unpaid['Might read']);
  });

  // Create datasets - negative sentiment first
  datasets.push({
    label: 'Paid - Won\'t read',
    data: paidNegative,
    backgroundColor: '#d32f2f',
    borderColor: '#b71c1c',
    borderWidth: 1,
    stack: 'paid'
  });

  datasets.push({
    label: 'Unpaid - Won\'t read',
    data: unpaidNegative,
    backgroundColor: '#ef5350',
    borderColor: '#d32f2f',
    borderWidth: 1,
    stack: 'unpaid'
  });

  // Positive sentiments - paid group
  datasets.push({
    label: 'Paid - Definitely will read',
    data: paidDefinitely,
    backgroundColor: '#2e7d32',
    borderColor: '#1b5e20',
    borderWidth: 1,
    stack: 'paid'
  });

  datasets.push({
    label: 'Paid - Will probably read',
    data: paidProbably,
    backgroundColor: '#43a047',
    borderColor: '#2e7d32',
    borderWidth: 1,
    stack: 'paid'
  });

  datasets.push({
    label: 'Paid - Might read',
    data: paidMight,
    backgroundColor: '#81c784',
    borderColor: '#43a047',
    borderWidth: 1,
    stack: 'paid'
  });

  // Positive sentiments - unpaid group
  datasets.push({
    label: 'Unpaid - Definitely will read',
    data: unpaidDefinitely,
    backgroundColor: '#388e3c',
    borderColor: '#2e7d32',
    borderWidth: 1,
    stack: 'unpaid'
  });

  datasets.push({
    label: 'Unpaid - Will probably read',
    data: unpaidProbably,
    backgroundColor: '#66bb6a',
    borderColor: '#43a047',
    borderWidth: 1,
    stack: 'unpaid'
  });

  datasets.push({
    label: 'Unpaid - Might read',
    data: unpaidMight,
    backgroundColor: '#a5d6a7',
    borderColor: '#66bb6a',
    borderWidth: 1,
    stack: 'unpaid'
  });

  return { labels, datasets };
}

// Initialize chart
async function initChart() {
  try {
    // Load both CSV files
    const [paidCSV, unpaidCSV] = await Promise.all([
      parseCSV('paid-redacted.csv'),
      parseCSV('unpaid-redacted.csv')
    ]);

    // Count responses
    const paidCounts = countResponses(paidCSV.data, paidCSV.headers);
    const unpaidCounts = countResponses(unpaidCSV.data, unpaidCSV.headers);

    // Convert to percentages
    const paidPercentages = countsToPercentages(paidCounts);
    const unpaidPercentages = countsToPercentages(unpaidCounts);

    // Create chart data
    const chartData = createChartData(paidPercentages, unpaidPercentages);

    // Create chart
    const ctx = document.getElementById('chapterFeedbackChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Chapter Reading Interest: Paid vs Unpaid Readers',
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          legend: {
            display: true,
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              title: function(context) {
                const chapter = context[0].label;
                return `${chapter}`;
              },
              label: function(context) {
                const value = Math.abs(context.parsed.x);
                const sentiment = context.dataset.label;
                return `${sentiment}: ${value.toFixed(1)}%`;
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            grid: {
              drawOnChartArea: true,
              color: function(context) {
                return context.tick.value === 0 ? '#000' : '#e0e0e0';
              },
              lineWidth: function(context) {
                return context.tick.value === 0 ? 2 : 1;
              }
            },
            ticks: {
              callback: function(value) {
                return Math.abs(value) + '%';
              }
            },
            title: {
              display: true,
              text: '← Won\'t Read    |    Will Read →'
            }
          },
          y: {
            stacked: true
          }
        },
        elements: {
          bar: {
            borderWidth: 1
          }
        }
      }
    });

  } catch (error) {
    console.error('Error loading chart data:', error);
    document.getElementById('chapterFeedbackChart').innerHTML =
      '<p style="text-align: center; color: red;">Error loading chart data. Please check that the CSV files are accessible.</p>';
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initChart);
</script>

## About This Visualization

This chart compares reading interest between paid pre-order customers and unpaid survey respondents for each chapter of "Refactoring English."

**Key Features:**

- **Horizontal bars** for better chapter title readability
- **Diverging design**: Negative sentiment (red) extends left, positive sentiments (green shades) extend right
- **Normalized percentages** to fairly compare groups despite different sample sizes (36 paid vs 96 unpaid)
- **Stacked positive responses**: "Definitely will read" at base, "Will probably read" in middle, "Might read" on top

**How to Read:**

- Each chapter has two bars: one for paid readers, one for unpaid readers
- Red bars show "Definitely won't read" percentages
- Green bars show positive interest levels, with darker green indicating stronger interest
- Hover over bars to see exact percentages
