document.addEventListener("DOMContentLoaded", function () {
  // Find the reference h2 element
  const headingElement = document.getElementById(
    "blogging-like-my-livelihood-depends-on-it"
  );
  if (!headingElement) return;

  // Find the first table after the heading
  let table = null;
  let currentElement = headingElement.nextElementSibling;

  while (currentElement && !table) {
    if (currentElement.tagName.toLowerCase() === "table") {
      table = currentElement;
    } else {
      currentElement = currentElement.nextElementSibling;
    }
  }

  if (!table) return;

  // Create a softer color calculator function with transparency
  function calculateColor(value, min, max) {
    // If min equals max, return a neutral color
    if (min === max) return "rgba(200, 200, 150, 0.3)";

    // Calculate the normalized value (0 to 1)
    var normalized = (value - min) / (max - min);

    // Calculate RGB components with adjusted values:
    // - Make max red darker (low values)
    // - Make max green brighter (high values)
    var r = Math.floor(240 - normalized * 100); // Darker red (240 down to 140)
    var g = Math.floor(140 + normalized * 100); // Brighter green (140 up to 240)
    var b = 120;

    // Return the color string with 40% opacity
    return "rgba(" + r + ", " + g + ", " + b + ", 0.4)";
  }

  // Add Total column header
  const headerRow = table.querySelector("thead tr");
  const totalHeader = document.createElement("th");
  totalHeader.textContent = "Total";
  headerRow.appendChild(totalHeader);

  // Process all rows
  const rows = table.querySelectorAll("tbody tr");
  const totals = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    let rowTotal = 0;
    const cells = row.querySelectorAll("td");

    // Process number cells (skip title cell)
    for (let j = 1; j < cells.length; j++) {
      const cell = cells[j];
      const cellValue = parseInt(cell.textContent.trim());

      if (!isNaN(cellValue)) {
        rowTotal += cellValue;
        // Apply gentler color to number cell
        cell.style.backgroundColor = calculateColor(cellValue, 1, 5);
      }
    }

    // Add total cell
    const totalCell = document.createElement("td");
    totalCell.textContent = rowTotal;
    row.appendChild(totalCell);
    totals.push(rowTotal);
  }

  // Find min and max totals
  let minTotal = Infinity;
  let maxTotal = -Infinity;

  for (let i = 0; i < totals.length; i++) {
    if (totals[i] < minTotal) minTotal = totals[i];
    if (totals[i] > maxTotal) maxTotal = totals[i];
  }

  // Color total cells
  for (let i = 0; i < rows.length; i++) {
    const totalCell = rows[i].querySelector("td:last-child");
    totalCell.style.backgroundColor = calculateColor(
      totals[i],
      minTotal,
      maxTotal
    );
  }
});
