interface AuditTimelineProps {
  items: Array<{ id: string; title: string; detail: string; time: string }>
}

export function AuditTimeline({ items }: AuditTimelineProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex gap-3 rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4">
          <div className="mt-1 h-3 w-3 rounded-full bg-[#ba0036]" />
          <div>
            <p className="font-semibold text-[#281718]">{item.title}</p>
            <p className="mt-1 text-sm text-[#5c3f41]">{item.detail}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#906f70]">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
