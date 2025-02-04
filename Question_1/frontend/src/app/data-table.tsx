"use client";

import DropDown from "@/components/global/DropDown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllStudies, getStudyCountry } from "@/lib/services/studies";
import { StudyStatus, StudyStatusReverse } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export function DataTable<TData, TValue>({
  columns,
}: DataTableProps<TData, TValue>) {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [country, setCountry] = useState("");
  const [title, setTitle] = useState("");

  const { data } = useQuery({
    queryKey: ["studies", page, status, country, title],
    queryFn: () => getAllStudies(page, status, country, title),
    initialData: [],
  });

  const { data: CountryData } = useQuery({
    queryKey: ["country"],
    queryFn: getStudyCountry,
    initialData: [],
  });

  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <div className="flex items-center py-4 justify-between space-x-2">
        <Input
          placeholder="Filter title..."
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="max-w-lg"
        />
        <div className="flex items-center space-x-2">
          <DropDown
            data={CountryData}
            value={country}
            setValue={(value) => {
              setCountry(value);
              setPage(1);
            }}
            placeholder="Filter country..."
          />
          <DropDown
            data={Object.values(StudyStatus)}
            value={status}
            setValue={(value) => {
              setStatus(StudyStatusReverse[value]);
              setPage(1);
            }}
            placeholder="Filter status..."
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between w-full">
        {title || status || country ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setCountry("");
              setStatus("");
              setTitle("");
              setPage(1);
            }}
          >
            Clear Filters
          </Button>
        ) : null}
        <div className="flex items-center justify-end space-x-2 py-4 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={data?.data?.length < 10}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
