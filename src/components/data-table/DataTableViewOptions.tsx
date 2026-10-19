"use client";

import type { Table } from "@tanstack/react-table";
import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DataTableViewOptions<TData>({ table }: { table: Table<TData> }) {
  const hideableColumns = table.getAllColumns().filter((col) => col.getCanHide());
  const visibleCount = table.getVisibleLeafColumns().length;
  const totalCount = table.getAllLeafColumns().length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto">
          <Settings2 className="mr-2 h-4 w-4" />
          Columns ({visibleCount}/{totalCount})
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 max-h-96 overflow-y-auto">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {hideableColumns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            checked={column.getIsVisible()}
            onCheckedChange={(value) => column.toggleVisibility(!!value)}
            onSelect={(e) => e.preventDefault()} 
          >
            {column.columnDef.meta?.label ?? column.id}
          </DropdownMenuCheckboxItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => table.resetColumnVisibility()}>
          Reset to default
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}