'use client'

interface CapacityIndicatorProps {
  value: number
  label: string
}

export function CapacityIndicator({ value, label }: CapacityIndicatorProps) {
  return (
    <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-[#5c3f41]">{label}</p>
        <p className="text-sm font-semibold text-[#281718]">{value}%</p>
      </div>
      <div className="mt-3 h-2 rounded-full bg-[#ffe1e2]">
        <div className="h-2 rounded-full bg-[#ba0036]" style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  )
}
