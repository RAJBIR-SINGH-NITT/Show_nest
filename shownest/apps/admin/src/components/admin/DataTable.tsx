interface DataTableProps {
  columns: Array<{ key: string; label: string }>
  rows: Array<Record<string, string | number | React.ReactNode>>
}

export function DataTable({ columns, rows }: DataTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e5bdbe] bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#e5bdbe]">
          <thead className="bg-[#fff8f7]">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-[#5c3f41]">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5bdbe] bg-white">
            {rows.map((row, index) => (
              <tr key={index} className="hover:bg-[#fff8f7]">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-sm text-[#281718]">
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
