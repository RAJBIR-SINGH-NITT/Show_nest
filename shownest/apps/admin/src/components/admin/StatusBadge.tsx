interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status.toLowerCase()
  const classes =
    normalized === 'published' || normalized === 'active' || normalized === 'confirmed'
      ? 'bg-[#ffe9e9] text-[#ba0036]'
      : normalized === 'pending'
        ? 'bg-[#fbdbdc] text-[#5c3f41]'
        : 'bg-[#fff8f7] text-[#5c3f41]'

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${classes}`}>{status}</span>
}
