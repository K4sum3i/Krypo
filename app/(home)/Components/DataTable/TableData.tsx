import { Element } from "@/lib/generated/prisma/client";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export type TableDataProps = {
  elements: Element[];
};

export function TableData(props: TableDataProps) {
  const { elements } = props;
  return (
    <div>
      <DataTable columns={columns} data={elements} />
    </div>
  );
}
