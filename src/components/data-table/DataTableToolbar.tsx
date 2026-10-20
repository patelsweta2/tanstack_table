"use client";
import { useRef } from "react";
import type { Table } from "@tanstack/react-table";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./DataTableViewOptions";

type Props<TData> = {
  table: Table<TData>;
  searchColumnId?: string;
  searchPlaceholder?: string;
};

export function DataTableToolbar<TData>({ table, searchColumnId, searchPlaceholder }: Props<TData>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchColumn = searchColumnId ? table.getColumn(searchColumnId) : undefined;
  const searchValue = (searchColumn?.getFilterValue() as string) ?? "";

  const clearSearch = () => {
    searchColumn?.setFilterValue(undefined);
    inputRef.current?.focus();
  }

  return (
        <div className="flex items-center gap-2">
      {searchColumn && (
        <div className="relative w-64">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            ref={inputRef}
            placeholder={searchPlaceholder ?? "Search..."}
            value={searchValue}
            onChange={(e) => searchColumn.setFilterValue(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && clearSearch()}
            className="h-8 pl-8 pr-8"
          />

          {searchValue && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}

      <DataTableViewOptions table={table} />
    </div>
  );
}