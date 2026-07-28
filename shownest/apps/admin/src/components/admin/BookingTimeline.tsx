interface BookingTimelineProps {
  items: Array<{ id: string; title: string; detail: string; time: string }>
}

export function BookingTimeline({ items }: BookingTimelineProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold text-[#281718]">{item.title}</h4>
            <span className="text-xs uppercase tracking-[0.2em] text-[#906f70]">{item.time}</span>
          </div>
          <p className="mt-2 text-sm text-[#5c3f41]">{item.detail}</p>
        </div>
      ))}
    </div>
  )
}
