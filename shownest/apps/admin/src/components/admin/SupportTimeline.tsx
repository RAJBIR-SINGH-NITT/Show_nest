'use client'

interface SupportTimelineProps {
  items: Array<{ id: string; title: string; detail: string; time: string; severity?: 'info' | 'warning' | 'success' }>
}

export function SupportTimeline({ items }: SupportTimelineProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-[#281718]">{item.title}</p>
              <p className="mt-1 text-sm text-[#5c3f41]">{item.detail}</p>
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ba0036]">{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
