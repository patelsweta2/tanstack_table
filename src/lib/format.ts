const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

export function formatNumber(value: number | null): string {
  return value == null ? "-" : numberFormatter.format(value);
}

export function formatPercent(value: number | null): string {
  if (value == null) return "-";
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
}
