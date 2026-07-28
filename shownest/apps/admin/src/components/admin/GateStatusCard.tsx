'use client'

interface GateStatusCardProps {
  title: string
  value: string
  description: string
}

export function GateStatusCard({ title, value, description }: GateStatusCardProps) {
  return (
    <div className="rounded-2xl border border-[#e5bdbe] bg-white p-4">
      <p className="text-sm text-[#5c3f41]">{title}</p>
      <p className="mt-2 text-xl font-semibold text-[#281718]">{value}</p>
      <p className="mt-1 text-sm text-[#906f70]">{description}</p>
    </div>
  )
}
