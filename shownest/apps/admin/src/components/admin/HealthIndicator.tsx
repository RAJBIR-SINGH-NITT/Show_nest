interface HealthIndicatorProps {
  status: 'Healthy' | 'Warning' | 'Offline'
  label: string
  detail: string
}

const statusClasses = {
  Healthy: 'bg-[#fff8f7] text-[#15803d]',
  Warning: 'bg-[#fbdbdc] text-[#b45309]',
  Offline: 'bg-[#ffe1e2] text-[#ba0036]',
}

export function HealthIndicator({ status, label, detail }: HealthIndicatorProps) {
  return (
    <div className="rounded-2xl border border-[#e5bdbe] bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold text-[#281718]">{label}</h4>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${statusClasses[status]}`}>{status}</span>
      </div>
      <p className="mt-2 text-sm text-[#5c3f41]">{detail}</p>
    </div>
  )
}
