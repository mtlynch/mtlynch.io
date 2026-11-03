(() => {
  const numberFormatter = new Intl.NumberFormat("en-US", {
    signDisplay: "exceptZero",
    maximumFractionDigits: 0,
  });
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    signDisplay: "exceptZero",
  });
  const integerCurrencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    signDisplay: "exceptZero",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const percentageFormatter = new Intl.NumberFormat("en-US", {
    style: "percent",
    signDisplay: "always",
    maximumFractionDigits: 0,
  });

  function parseMetric(raw) {
    const value = Number(raw.replace(/[$,]/g, ""));
    if (raw === "" || !Number.isFinite(value)) {
      throw new Error(`Invalid delta-cell metric: ${raw}`);
    }
    return value;
  }

  document.querySelectorAll('[blog-purpose="delta"]').forEach((span) => {
    const cell = span.closest("td");
    const currentRaw = cell.previousElementSibling.textContent.trim();
    const previousRaw =
      cell.previousElementSibling.previousElementSibling.textContent.trim();
    if (previousRaw === "XX" || currentRaw === "XX") {
      span.textContent = "XX";
      return;
    }

    const previous = parseMetric(previousRaw);
    const current = parseMetric(currentRaw);
    const difference = current - previous;
    let amount = difference;
    let percentage = difference === 0 ? 0 : difference / previous;
    const isNetProfit =
      cell.parentElement.cells[0].textContent.trim().toLowerCase() ===
      "net profit";

    // Expenses are negative values, but their changes describe the expense
    // magnitude. Net profit instead describes improvement or deterioration.
    if (previous <= 0) {
      if (current <= 0) {
        if (isNetProfit) {
          percentage *= -1;
        } else {
          amount *= -1;
        }
      } else {
        percentage = Infinity;
      }
    }

    let formatter = numberFormatter;
    if (previousRaw.includes("$") || currentRaw.includes("$")) {
      formatter =
        previousRaw.includes(".") || currentRaw.includes(".")
          ? currencyFormatter
          : integerCurrencyFormatter;
    }

    if (difference > 0) {
      span.classList.add("good-delta");
    } else if (difference < 0) {
      span.classList.add("bad-delta");
    }
    span.textContent = `${formatter.format(amount)} (${percentageFormatter.format(percentage)})`;
  });
})();
