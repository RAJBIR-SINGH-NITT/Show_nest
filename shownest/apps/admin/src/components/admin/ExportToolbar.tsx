interface ExportToolbarProps {
  title?: string
}

export function ExportToolbar({ title = 'Export' }: ExportToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-3">
      <span className="text-sm font-semibold text-[#281718]">{title}</span>
      <button type="button" className="rounded-full border border-[#e5bdbe] bg-white px-3 py-1.5 text-sm font-semibold text-[#5c3f41]">CSV</button>
      <button type="button" className="rounded-full border border-[#e5bdbe] bg-white px-3 py-1.5 text-sm font-semibold text-[#5c3f41]">PDF</button>
      <button type="button" className="rounded-full border border-[#e5bdbe] bg-white px-3 py-1.5 text-sm font-semibold text-[#5c3f41]">Excel</button>
    </div>
  )
}
