"use client";

import { DataTable } from "@/components/data-table/DataTable";
import { stockColumns, defaultStockVisibility } from "./columns";
import type { Stock } from "./type";

export function ScreenerTable({ stocks }: { stocks: Stock[] }) {
  return (
    <DataTable
      columns={stockColumns}
      data={stocks}
      initialColumnVisibility={defaultStockVisibility}
      searchColumnId="instrument"
      searchPlaceholder="Search instrument..."
    />
  );
}