import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import Papa from "papaparse";
import type { Stock } from "@/features/screener/type";

const CSV_PATH = path.join(process.cwd(), "data", "screener_stocks.csv");

// CSV header
const HEADER_MAP: Record<string, keyof Stock> = {
  Instrument: "instrument",
  Sector: "sector",
  "Last Price": "lastPrice",
  Open: "open",
  "Day High": "dayHigh",
  "Day Low": "dayLow",
  "Previous Close": "previousClose",
  "Average Price": "averagePrice",
  Change: "change",
  "Change %": "changePercent",
  "Upper Circuit Limit": "upperCircuit",
  "Lower Circuit Limit": "lowerCircuit",
  "52 Week High": "week52High",
  "52 Week Low": "week52Low",
  Volume: "volume",
  "Buy Quantity": "buyQuantity",
  "Sell Quantity": "sellQuantity",
  "Trade Value (Cr)": "tradeValueCr",
  "Market Cap (Cr)": "marketCapCr",
  "P/E Ratio": "peRatio",
  "Return on Equity": "roe",
  "Debt to Equity": "debtToEquity",
  "Dividend Yield": "dividendYield",
  "Free Cash Flow": "freeCashFlow",
  "Profit Growth YoY (%)": "profitGrowthYoY",
  "Revenue Growth YoY (%)": "revenueGrowthYoY",
};

const STRING_FIELDS = new Set<keyof Stock>(["instrument", "sector"]);

function toNum(value: string | undefined): number | null {
  if (value == null || value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function toStock(row: Record<string, string>): Stock {
  const stock: Record<string, string | number | null> = {};
  for (const [csvHeader, key] of Object.entries(HEADER_MAP)) {
    const raw = row[csvHeader] ?? "";
    stock[key] = STRING_FIELDS.has(key) ? raw.trim() : toNum(raw);
  }
  return stock as Stock;
}

export async function getStocks(): Promise<Stock[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const csv = await readFile(CSV_PATH, "utf-8");
  const { data, errors } = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
  });
  if (errors.length > 0) {
    console.warn("CSV parse warnings:", errors.slice(0, 3));
  }
  return data.map(toStock);
}
