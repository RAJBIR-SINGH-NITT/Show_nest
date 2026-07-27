interface TimelineProps {
  items: Array<{ id: string; title: string; detail: string; time: string; severity: 'info' | 'warning' | 'success' }>
}

const severityClasses = {
  info: 'bg-[#ffe9e9] text-[#ba0036]',
  warning: 'bg-[#fbdbdc] text-[#5c3f41]',
  success: 'bg-[#fff8f7] text-[#15803d]',
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex gap-3 rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4">
          <div className={`mt-1 h-3 w-3 rounded-full ${severityClasses[item.severity]}`} />
          <div className="flex-1">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-sm font-semibold text-[#281718]">{item.title}</h4>
              <span className="text-xs text-[#5c3f41]">{item.time}</span>
            </div>
            <p className="mt-1 text-sm text-[#5c3f41]">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
