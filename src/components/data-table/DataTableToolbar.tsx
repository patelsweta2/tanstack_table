"use client";

import type { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./DataTableViewOptions";

type Props<TData> = {
  table: Table<TData>;
  searchColumnId?: string;
  searchPlaceholder?: string;
};

export function DataTableToolbar<TData>({ table, searchColumnId, searchPlaceholder }: Props<TData>) {
  const searchColumn = searchColumnId ? table.getColumn(searchColumnId) : undefined;

  return (
    <div className="flex items-center gap-2">
      {searchColumn && (
        <Input
          placeholder={searchPlaceholder ?? "Search..."}
          value={(searchColumn.getFilterValue() as string) ?? ""}
          onChange={(e) => searchColumn.setFilterValue(e.target.value)}
          className="h-8 w-64"
        />
      )}

      <span className="text-sm text-muted-foreground">
        {table.getFilteredRowModel().rows.length} rows
      </span>

      <DataTableViewOptions table={table} />
    </div>
  );
}