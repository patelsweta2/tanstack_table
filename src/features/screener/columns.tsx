"use client";

import type { ColumnDef,VisibilityState } from "@tanstack/react-table";
import type { Stock } from "./type";
import { formatNumber, formatPercent } from "@/lib/format";

type NumericKey = {
  [K in keyof Stock]: Stock[K] extends number | null ? K : never;
}[keyof Stock];



function numberColumn(
  key: NumericKey,
  label: string,
  format: (v:number | null) => string = formatNumber,
): ColumnDef<Stock> {
  return {
    id: key,
    accessorKey: key,
    header: label,
    meta: {label, align: "right"},
    cell: ({getValue}) => format(getValue<number | null>()),
  };
}


function changeColumn(
  key: "change" | "changePercent",
  label: string,
  format: (v: number | null) => string,
): ColumnDef<Stock> {
  return {
    ...numberColumn(key,label,format),
    cell: ({getValue}) => {
      const v = getValue<number | null>();
      const color = v == null ? "text-muted-foreground" : v >= 0 ? "text-green-600" : "text-red-600";
      return <span className={color}>{format(v)}</span>
    }
  }
}

export const stockColumns: ColumnDef<Stock>[] = [
  {
    id: "instrument",
    accessorKey: "instrument",
    header: "Instrument",
    meta : {label: "Instrument"},
    enableHiding: false,
    cell: ({getValue}) => <span className="font-medium">{getValue<string>()}</span>,
  },
  {id: "sector", accessorKey: "sector", header: "Sector", meta: {label: "Sector"}},

  // Price
  numberColumn("lastPrice", "Last Price (₹)"),
  changeColumn("change", "Change", formatNumber),
  changeColumn("changePercent", "Change %", formatPercent),
  numberColumn("open", "Open"),
  numberColumn("dayHigh", "Day High"),
  numberColumn("dayLow", "Day Low"),
  numberColumn("previousClose", "Prev Close"),
  numberColumn("averagePrice", "Avg Price"),
  numberColumn("upperCircuit", "Upper Circuit"),
  numberColumn("lowerCircuit", "Lower Circuit"),
  numberColumn("week52High", "52W High"),
  numberColumn("week52Low", "52W Low"),

  // Trading
  numberColumn("volume", "Volume"),
  numberColumn("buyQuantity", "Buy Qty"),
  numberColumn("sellQuantity", "Sell Qty"),
  numberColumn("tradeValueCr", "Trade Value (Cr)"),

  // Fundamentals
  numberColumn("marketCapCr", "Market Cap (Cr)"),
  numberColumn("peRatio", "P/E"),
  numberColumn("roe", "ROE %"),
  numberColumn("debtToEquity", "Debt / Equity"),
  numberColumn("dividendYield", "Div Yield %"),
  numberColumn("freeCashFlow", "Free Cash Flow"),
  numberColumn("profitGrowthYoY", "Profit Growth YoY %", formatPercent),
  numberColumn("revenueGrowthYoY", "Revenue Growth YoY %", formatPercent),
];

// default visible
const DEFAULT_VISIBLE = new Set([
  "instrument", "sector", "lastPrice", "change", "week52High", "week52Low",
])

// { lastPrice: true, open: false, ... }
export const defaultStockVisibility: VisibilityState = Object.fromEntries(
  stockColumns.map((col) => [col.id!, DEFAULT_VISIBLE.has(col.id!)]),
);