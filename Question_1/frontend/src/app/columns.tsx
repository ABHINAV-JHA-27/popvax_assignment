"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Study = {
  id: string;
  title: string;
  disease: string;
  start_date: string;
  country: string;
  status: string;
};

export const columns: ColumnDef<Study>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "disease",
    header: "Disease",
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => {
      return new Date(row.original.start_date).toLocaleDateString();
    },
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
