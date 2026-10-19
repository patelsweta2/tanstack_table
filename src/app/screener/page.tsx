import { getStocks } from "@/lib/data/stocks";
import { ScreenerTable } from "@/features/screener/ScreenerTable";

export default async function ScreenerPage() {
  const stocks = await getStocks();

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Stock Screener</h1>
      <ScreenerTable stocks={stocks} />
    </main>
  );
}