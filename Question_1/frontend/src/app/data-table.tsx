"use client";

import CommonSheet from "@/components/global/CommonSheet";
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
  const [selectedRow, setSelectedRow] = useState<TData | null>(null);

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
    manualPagination: true,
    state: {
      pagination: { pageIndex: page - 1, pageSize: 10 },
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
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
                  onClick={() => {
                    setSelectedRow(row.original);
                  }}
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
              <TableRow key="no-results">
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
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (data?.data?.length === 10) setPage((prev) => prev + 1);
            }}
            disabled={data?.data?.length < 10}
          >
            Next
          </Button>
        </div>
      </div>
      <StudyDetailsSheet
        open={selectedRow}
        close={() => setSelectedRow(null)}
      />
    </div>
  );
}

const StudyDetailsSheet = ({
  open,
  close,
}: {
  open: any;
  close: () => void;
}) => {
  return (
    <CommonSheet open={!!open} close={close} title="Study Details">
      <div className="w-full flex flex-col">
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <p>
              <strong>ID:</strong> {open?.id}
            </p>
            <p>
              <strong>Title:</strong> {open?.title}
            </p>
            <p>
              <strong>Disease:</strong> {open?.disease}
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {open?.start_date
                ? new Date(open?.start_date).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <strong>End Date:</strong>{" "}
              {open?.end_date
                ? new Date(open?.end_date).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {open?.status}
            </p>
            <p>
              <strong>Phase:</strong> {open?.phase}
            </p>
            <p>
              <strong>Country:</strong> {open?.country}
            </p>
            <p>
              <strong>Sponsor:</strong> {open?.sponsor}
            </p>
            <p>
              <strong>Enrollment:</strong> {open?.enrollment}
            </p>
            <p>
              <strong>Eligibility:</strong> {open?.eligibility_criteria}
            </p>
            <p>
              <strong>Did arrive at Result:</strong>
              {open?.hasResults ?? "False"}
            </p>
            <a
              href={open?.source_url}
              target="_blank"
              className="text-blue-500 underline"
            >
              More Details
            </a>
          </div>
        </div>
      </div>
    </CommonSheet>
  );
};
