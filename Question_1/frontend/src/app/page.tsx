import { useQuery } from "@tanstack/react-query";
import { columns, Study } from "./columns";
import { DataTable } from "./data-table";
import { getAllStudies } from "@/lib/services/studies";

export default async function StudiesPage() {
  return (
    <div
      className="container mx-auto px-4 py-10"
      style={{ maxWidth: "1200px" }}
    >
      <DataTable columns={columns} />
    </div>
  );
}
