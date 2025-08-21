---
title: "Refactoring English Chapter Feedback"
date: 2025-08-20
custom_css: true
---

## The survey

I was curious about how well my planned chapters match what readers of my book are interested in learning. I sent a survey to 1,644 people who had either purchased early access or subscribed to my mailing list for free updates and previews of the book. 265 of the 1,644 (16%) had purchased early access.

Readers could rate each chapter on a scale from "Definitely won't read" to "Definitely will read":

{{<img src="survey-question.webp">}}

Here are the results:

<div style="margin: 20px 0;">
  <div style="width: 100%; height: 600px;">
    <canvas id="aggregateChart"></canvas>
  </div>
  <div class="chart-controls">
    <div class="controls-container">
      <div class="control-group">
        <label class="control-label" for="aggregateOrderBy">Order by:</label>
        <select id="aggregateOrderBy" class="styled-select">
          <option value="most-interested">Definitely will read</option>
          <option value="definitely-probably">Definitely will read + Will probably read</option>
          <option value="will-read-any">Will read (any confidence)</option>
          <option value="most-disinterested">Definitely won't read</option>
        </select>
      </div>
    </div>
  </div>
</div>

## Paid readers only

<div style="margin: 20px 0;">
  <div style="width: 100%; height: 600px;">
    <canvas id="paidOnlyChart"></canvas>
  </div>
  <div class="chart-controls">
    <div class="controls-container">
      <div class="control-group">
        <label class="control-label" for="paidOrderBy">Order by:</label>
        <select id="paidOrderBy" class="styled-select">
          <option value="most-interested">Definitely will read</option>
          <option value="definitely-probably">Definitely will read + Will probably read</option>
          <option value="will-read-any">Will read (any confidence)</option>
          <option value="most-disinterested">Definitely won't read</option>
        </select>
      </div>
    </div>
  </div>
</div>

## Unpaid readers only

<div style="margin: 20px 0;">
  <div style="width: 100%; height: 600px;">
    <canvas id="unpaidOnlyChart"></canvas>
  </div>
  <div class="chart-controls">
    <div class="controls-container">
      <div class="control-group">
        <label class="control-label" for="unpaidOrderBy">Order by:</label>
        <select id="unpaidOrderBy" class="styled-select">
          <option value="most-interested">Definitely will read</option>
          <option value="definitely-probably">Definitely will read + Will probably read</option>
          <option value="will-read-any">Will read (any confidence)</option>
          <option value="most-disinterested">Definitely won't read</option>
        </select>
      </div>
    </div>
  </div>
</div>

## Which chapters excite paid readers more than free readers?

<div style="margin: 40px 0 20px 0;">
  <div style="width: 100%; height: 600px;">
    <canvas id="gapAnalysisChart"></canvas>
  </div>
</div>

## Which chapters bore paid readers more than free readers?

<div style="margin: 40px 0 20px 0;">
  <div style="width: 100%; height: 600px;">
    <canvas id="disinterestChart"></canvas>
  </div>
</div>

## What does the data tell me?

### Move up "Make Your Writing Sound Natural"

"Get to the Point" is the most important chapter, so it has to be first, but almost everyone said they wanted to read it. The chapter is only two pages long, so in terms of giving the reader bang-for-their-buck, it's a no-brainer to put it up front where they can get the value immediately.

### Demote "Write Useful Commit Messages"

If I were just looking at free readers, I'd probably cut this chapter entirely. But I'm giving more weight to readers who have purchased, so I'll put it at the end.

I thought it should come before emails because I figured people

<script src="/third-party/chart.js/4.5.0/chart.umd.js"></script>

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

// Calculate interest score (only "definitely will read")
function calculateInterestScore(counts) {
  const total = counts.total;
  if (total === 0) return 0;
  const definitelyWill = counts['Definitely will read'] || 0;
  return (definitelyWill / total) * 100;
}

// Calculate percentage of "definitely won't read" responses
function calculateDefinitelyWontPercentage(counts) {
  const total = counts.total;
  if (total === 0) return 0;
  const definitelyWont = counts['Definitely won\'t read'] || 0;
  return (definitelyWont / total) * 100;
}


// Create gap analysis chart data
function createGapAnalysisChartData(paidCounts, unpaidCounts, sortedChapters = null) {
  const chapters = sortedChapters || Object.keys(paidCounts);
  const labels = chapters;
  const gapData = [];

  chapters.forEach(chapter => {
    const paidScore = calculateInterestScore(paidCounts[chapter]);
    const unpaidScore = calculateInterestScore(unpaidCounts[chapter]);
    const gap = paidScore - unpaidScore;
    gapData.push(gap);
  });

  const datasets = [{
    label: 'Interest Gap (Paid - Unpaid)',
    data: gapData,
    backgroundColor: gapData.map(gap => gap >= 0 ? '#2e7d32' : '#1565c0'), // Green for paid advantage, blue for unpaid advantage
    borderColor: gapData.map(gap => gap >= 0 ? '#1b5e20' : '#0d47a1'),
    borderWidth: 1
  }];

  return { labels, datasets };
}

// Create disinterest gap analysis chart data
function createDisinterestChartData(paidCounts, unpaidCounts, sortedChapters = null) {
  const chapters = sortedChapters || Object.keys(paidCounts);
  const labels = chapters;
  const gapData = [];

  chapters.forEach(chapter => {
    const paidDisinterest = calculateDefinitelyWontPercentage(paidCounts[chapter]);
    const unpaidDisinterest = calculateDefinitelyWontPercentage(unpaidCounts[chapter]);
    const gap = paidDisinterest - unpaidDisinterest;
    gapData.push(gap);
  });

  const datasets = [{
    label: 'Disinterest Gap (Paid - Unpaid)',
    data: gapData,
    backgroundColor: gapData.map(gap => gap >= 0 ? '#d32f2f' : '#ef5350'), // Darker red for paid more disinterested, lighter red for unpaid more disinterested
    borderColor: gapData.map(gap => gap >= 0 ? '#b71c1c' : '#d32f2f'),
    borderWidth: 1
  }];

  return { labels, datasets };
}

// Aggregate responses from paid and unpaid readers
function aggregateResponses(paidCounts, unpaidCounts) {
  const aggregated = {};
  const chapters = Object.keys(paidCounts);

  chapters.forEach(chapter => {
    const paid = paidCounts[chapter];
    const unpaid = unpaidCounts[chapter];

    aggregated[chapter] = {
      'Definitely will read': paid['Definitely will read'] + unpaid['Definitely will read'],
      'Will probably read': paid['Will probably read'] + unpaid['Will probably read'],
      'Might read': paid['Might read'] + unpaid['Might read'],
      'Definitely won\'t read': paid['Definitely won\'t read'] + unpaid['Definitely won\'t read'],
      total: paid.total + unpaid.total
    };
  });

  return aggregated;
}

// Create aggregate chart data
function createAggregateChartData(aggregateCounts, sortedChapters = null) {
  const chapters = sortedChapters || Object.keys(aggregateCounts);
  const labels = chapters;

  // Convert to percentages for display
  const aggregatePercentages = countsToPercentages(aggregateCounts);

  // Prepare data arrays
  const negative = [];
  const definitely = [];
  const probably = [];
  const might = [];

  chapters.forEach(chapter => {
    const data = aggregatePercentages[chapter];

    // Negative values for "won't read"
    negative.push(-data['Definitely won\'t read']);

    // Positive values
    definitely.push(data['Definitely will read']);
    probably.push(data['Will probably read']);
    might.push(data['Might read']);
  });

  const datasets = [
    {
      label: 'Won\'t read',
      data: negative,
      backgroundColor: '#d32f2f',
      borderColor: '#b71c1c',
      borderWidth: 1,
      stack: 'aggregate'
    },
    {
      label: 'Definitely will read',
      data: definitely,
      backgroundColor: '#2e7d32',
      borderColor: '#1b5e20',
      borderWidth: 1,
      stack: 'aggregate'
    },
    {
      label: 'Will probably read',
      data: probably,
      backgroundColor: '#43a047',
      borderColor: '#2e7d32',
      borderWidth: 1,
      stack: 'aggregate'
    },
    {
      label: 'Might read',
      data: might,
      backgroundColor: '#81c784',
      borderColor: '#43a047',
      borderWidth: 1,
      stack: 'aggregate'
    }
  ];

  return { labels, datasets };
}

// Calculate combined score for "definitely + probably will read"
function calculateDefinitelyProbablyScore(counts) {
  const total = counts.total;
  if (total === 0) return 0;
  const definitelyWill = counts['Definitely will read'] || 0;
  const probablyWill = counts['Will probably read'] || 0;
  return ((definitelyWill + probablyWill) / total) * 100;
}

// Calculate combined score for "will read any confidence" (all positive responses)
function calculateWillReadAnyScore(counts) {
  const total = counts.total;
  if (total === 0) return 0;
  const definitelyWill = counts['Definitely will read'] || 0;
  const probablyWill = counts['Will probably read'] || 0;
  const mightRead = counts['Might read'] || 0;
  return ((definitelyWill + probablyWill + mightRead) / total) * 100;
}

// Sort chapters for aggregate chart
function sortChaptersAggregate(chapters, aggregateCounts, sortOrder) {
  const originalOrder = [...chapters];

  switch (sortOrder) {
    case 'chapter-order':
      return originalOrder;

    case 'most-interested':
      return [...chapters].sort((a, b) => {
        const scoreA = calculateInterestScore(aggregateCounts[a]);
        const scoreB = calculateInterestScore(aggregateCounts[b]);
        return scoreB - scoreA; // Descending order
      });

    case 'definitely-probably':
      return [...chapters].sort((a, b) => {
        const scoreA = calculateDefinitelyProbablyScore(aggregateCounts[a]);
        const scoreB = calculateDefinitelyProbablyScore(aggregateCounts[b]);
        return scoreB - scoreA; // Descending order
      });

    case 'will-read-any':
      return [...chapters].sort((a, b) => {
        const scoreA = calculateWillReadAnyScore(aggregateCounts[a]);
        const scoreB = calculateWillReadAnyScore(aggregateCounts[b]);
        return scoreB - scoreA; // Descending order
      });

    case 'most-disinterested':
      return [...chapters].sort((a, b) => {
        const percentA = calculateDefinitelyWontPercentage(aggregateCounts[a]);
        const percentB = calculateDefinitelyWontPercentage(aggregateCounts[b]);
        return percentB - percentA; // Descending order (highest "won't read" first)
      });

    default:
      return originalOrder;
  }
}

// Global chart instances and data
let aggregateChartInstance = null;
let paidOnlyChartInstance = null;
let unpaidOnlyChartInstance = null;
let gapChartInstance = null;
let disinterestChartInstance = null;
let globalPaidCounts = null;
let globalUnpaidCounts = null;
let globalAggregateCounts = null;
let globalPaidPercentages = null;
let globalUnpaidPercentages = null;
let originalChapters = null;


// Update aggregate chart based on sort order
function updateAggregateChartSort() {
  if (!aggregateChartInstance || !globalAggregateCounts) return;

  const sortOrder = document.getElementById('aggregateOrderBy').value;
  const sortedChapters = sortChaptersAggregate(originalChapters, globalAggregateCounts, sortOrder);

  // Update aggregate chart
  const aggregateChartData = createAggregateChartData(globalAggregateCounts, sortedChapters);
  aggregateChartInstance.data.labels = aggregateChartData.labels;
  aggregateChartInstance.data.datasets.forEach((dataset, index) => {
    dataset.data = aggregateChartData.datasets[index].data;
  });

  aggregateChartInstance.update();
}

// Update paid-only chart based on sort order
function updatePaidOnlyChartSort() {
  if (!paidOnlyChartInstance || !globalPaidCounts) return;

  const sortOrder = document.getElementById('paidOrderBy').value;
  const sortedChapters = sortChaptersAggregate(originalChapters, globalPaidCounts, sortOrder);

  // Update paid-only chart
  const paidOnlyChartData = createAggregateChartData(globalPaidCounts, sortedChapters);
  paidOnlyChartInstance.data.labels = paidOnlyChartData.labels;
  paidOnlyChartInstance.data.datasets.forEach((dataset, index) => {
    dataset.data = paidOnlyChartData.datasets[index].data;
  });

  paidOnlyChartInstance.update();
}

// Update unpaid-only chart based on sort order
function updateUnpaidOnlyChartSort() {
  if (!unpaidOnlyChartInstance || !globalUnpaidCounts) return;

  const sortOrder = document.getElementById('unpaidOrderBy').value;
  const sortedChapters = sortChaptersAggregate(originalChapters, globalUnpaidCounts, sortOrder);

  // Update unpaid-only chart
  const unpaidOnlyChartData = createAggregateChartData(globalUnpaidCounts, sortedChapters);
  unpaidOnlyChartInstance.data.labels = unpaidOnlyChartData.labels;
  unpaidOnlyChartInstance.data.datasets.forEach((dataset, index) => {
    dataset.data = unpaidOnlyChartData.datasets[index].data;
  });

  unpaidOnlyChartInstance.update();
}


// Initialize charts
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

    // Store global data
    globalPaidCounts = paidCounts;
    globalUnpaidCounts = unpaidCounts;
    globalPaidPercentages = paidPercentages;
    globalUnpaidPercentages = unpaidPercentages;
    originalChapters = Object.keys(paidPercentages);

    // Create aggregate data
    globalAggregateCounts = aggregateResponses(paidCounts, unpaidCounts);

    // Sort chapters by most interested for aggregate chart
    const aggregateSortedChapters = sortChaptersAggregate(originalChapters, globalAggregateCounts, 'most-interested');

    // Create aggregate chart data with sorted chapters
    const aggregateChartData = createAggregateChartData(globalAggregateCounts, aggregateSortedChapters);

    // Create aggregate chart
    const aggregateCtx = document.getElementById('aggregateChart').getContext('2d');
    aggregateChartInstance = new Chart(aggregateCtx, {
      type: 'bar',
      data: aggregateChartData,
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Chapter Reading Interest: All Readers Combined',
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          legend: {
            display: false
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
                const totalResponses = globalAggregateCounts[context.label].total;
                return `${sentiment}: ${value.toFixed(1)}% (${Math.round(value * totalResponses / 100)} responses)`;
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

    // Sort chapters by most interested for paid readers
    const paidSortedChapters = sortChaptersAggregate(originalChapters, paidCounts, 'most-interested');

    // Create paid-only chart data with sorted chapters
    const paidOnlyChartData = createAggregateChartData(paidCounts, paidSortedChapters);

    // Create paid-only chart
    const paidOnlyCtx = document.getElementById('paidOnlyChart').getContext('2d');
    paidOnlyChartInstance = new Chart(paidOnlyCtx, {
      type: 'bar',
      data: paidOnlyChartData,
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Chapter Reading Interest: Paid Readers Only',
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          legend: {
            display: false
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
                const totalResponses = paidCounts[context.label].total;
                return `${sentiment}: ${value.toFixed(1)}% (${Math.round(value * totalResponses / 100)} responses)`;
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

    // Sort chapters by most interested for unpaid readers
    const unpaidSortedChapters = sortChaptersAggregate(originalChapters, unpaidCounts, 'most-interested');

    // Create unpaid-only chart data with sorted chapters
    const unpaidOnlyChartData = createAggregateChartData(unpaidCounts, unpaidSortedChapters);

    // Create unpaid-only chart
    const unpaidOnlyCtx = document.getElementById('unpaidOnlyChart').getContext('2d');
    unpaidOnlyChartInstance = new Chart(unpaidOnlyCtx, {
      type: 'bar',
      data: unpaidOnlyChartData,
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Chapter Reading Interest: Unpaid Readers Only',
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          legend: {
            display: false
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
                const totalResponses = unpaidCounts[context.label].total;
                return `${sentiment}: ${value.toFixed(1)}% (${Math.round(value * totalResponses / 100)} responses)`;
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


    // Sort chapters by biggest absolute gap for initial display
    const initialSortedChapters = [...originalChapters].sort((a, b) => {
      const gapA = Math.abs(calculateInterestScore(paidCounts[a]) - calculateInterestScore(unpaidCounts[a]));
      const gapB = Math.abs(calculateInterestScore(paidCounts[b]) - calculateInterestScore(unpaidCounts[b]));
      return gapB - gapA; // Descending order (biggest absolute gap first)
    });

    // Sort chapters by disinterest gap with paid reader deltas highest
    const disinterestSortedChapters = [...originalChapters].sort((a, b) => {
      const gapA = calculateDefinitelyWontPercentage(paidCounts[a]) - calculateDefinitelyWontPercentage(unpaidCounts[a]);
      const gapB = calculateDefinitelyWontPercentage(paidCounts[b]) - calculateDefinitelyWontPercentage(unpaidCounts[b]);
      return gapB - gapA; // Descending order (highest paid reader delta first, lowest unpaid reader delta last)
    });

    // Create gap analysis chart data with sorted chapters
    const gapChartData = createGapAnalysisChartData(paidCounts, unpaidCounts, initialSortedChapters);

    // Create gap analysis chart
    const gapCtx = document.getElementById('gapAnalysisChart').getContext('2d');
    gapChartInstance = new Chart(gapCtx, {
      type: 'bar',
      data: gapChartData,
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: false
          },
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: function(context) {
                const chapter = context[0].label;
                return `${chapter}`;
              },
              label: function(context) {
                const gap = context.parsed.x;
                const paidScore = calculateInterestScore(globalPaidCounts[context.label]);
                const unpaidScore = calculateInterestScore(globalUnpaidCounts[context.label]);

                return [
                  `Gap: ${gap.toFixed(1)} points`,
                  `Paid interest: ${paidScore.toFixed(1)}%`,
                  `Unpaid interest: ${unpaidScore.toFixed(1)}%`
                ];
              }
            }
          }
        },
        scales: {
          x: {
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
                return value.toFixed(1) + ' pts';
              }
            },
            title: {
              display: true,
              text: 'Interest Gap (Paid - Unpaid)'
            }
          },
          y: {
            title: {
              display: false,
              text: 'Chapters'
            }
          }
        },
        elements: {
          bar: {
            borderWidth: 1
          }
        }
      }
    });

    // Create disinterest chart data with sorted chapters (by disinterest gaps)
    const disinterestChartData = createDisinterestChartData(paidCounts, unpaidCounts, disinterestSortedChapters);

    // Create disinterest chart
    const disinterestCtx = document.getElementById('disinterestChart').getContext('2d');
    disinterestChartInstance = new Chart(disinterestCtx, {
      type: 'bar',
      data: disinterestChartData,
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: false
          },
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: function(context) {
                const chapter = context[0].label;
                return `${chapter}`;
              },
              label: function(context) {
                const gap = context.parsed.x;
                const paidDisinterest = calculateDefinitelyWontPercentage(globalPaidCounts[context.label]);
                const unpaidDisinterest = calculateDefinitelyWontPercentage(globalUnpaidCounts[context.label]);

                return [
                  `Gap: ${gap.toFixed(1)} points`,
                  `Paid disinterest: ${paidDisinterest.toFixed(1)}%`,
                  `Unpaid disinterest: ${unpaidDisinterest.toFixed(1)}%`
                ];
              }
            }
          }
        },
        scales: {
          x: {
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
                return value.toFixed(1) + ' pts';
              }
            },
            title: {
              display: true,
              text: 'Disinterest Gap (Paid - Unpaid)'
            }
          },
          y: {
            title: {
              display: false,
              text: 'Chapters'
            }
          }
        },
        elements: {
          bar: {
            borderWidth: 1
          }
        }
      }
    });

    // Add event listeners for dropdowns
    document.getElementById('aggregateOrderBy').addEventListener('change', updateAggregateChartSort);
    document.getElementById('paidOrderBy').addEventListener('change', updatePaidOnlyChartSort);
    document.getElementById('unpaidOrderBy').addEventListener('change', updateUnpaidOnlyChartSort);

  } catch (error) {
    console.error('Error loading chart data:', error);
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initChart);
</script>
