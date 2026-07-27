'use client'

interface CheckInHistoryProps {
  items: Array<{ id: string; visitor: string; time: string; status: string; gate: string }>
}

export function CheckInHistory({ items }: CheckInHistoryProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="rounded-2xl border border-[#e5bdbe] bg-white p-4 text-sm text-[#5c3f41]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-[#281718]">{item.visitor}</p>
              <p className="mt-1">{item.status}</p>
            </div>
            <div className="text-right">
              <p>{item.time}</p>
              <p className="mt-1 text-[#906f70]">{item.gate}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
