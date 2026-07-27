interface NotificationListProps {
  items: Array<{ id: string; title: string; detail: string; timestamp: string; priority: 'high' | 'medium' | 'low' }>
}

const priorityClasses = {
  high: 'bg-[#ffe1e2] text-[#ba0036]',
  medium: 'bg-[#ffe9e9] text-[#5c3f41]',
  low: 'bg-[#fff8f7] text-[#5c3f41]',
}

export function NotificationList({ items }: NotificationListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold text-[#281718]">{item.title}</h4>
            <span className={`rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${priorityClasses[item.priority]}`}>
              {item.priority}
            </span>
          </div>
          <p className="mt-2 text-sm text-[#5c3f41]">{item.detail}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#906f70]">{item.timestamp}</p>
        </div>
      ))}
    </div>
  )
}
