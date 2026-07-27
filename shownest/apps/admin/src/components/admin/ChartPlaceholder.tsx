interface ChartPlaceholderProps {
  title: string
  values: Array<{ label: string; value: number }>
}

export function ChartPlaceholder({ title, values }: ChartPlaceholderProps) {
  const maxValue = Math.max(...values.map((item) => item.value))

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-[#281718]">{title}</p>
        <span className="text-xs uppercase tracking-[0.2em] text-[#ba0036]">Preview</span>
      </div>
      <div className="flex h-44 items-end gap-3 rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4">
        {values.map((item) => (
          <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full items-end justify-center rounded-t-xl bg-gradient-to-t from-[#ba0036] to-[#e21e4a]" style={{ height: `${(item.value / maxValue) * 100}%`, minHeight: '24px' }} />
            <span className="text-xs text-[#5c3f41]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
