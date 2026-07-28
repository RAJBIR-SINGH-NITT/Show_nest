'use client'

interface AttendanceCardProps {
  title: string
  value: string
  description: string
}

export function AttendanceCard({ title, value, description }: AttendanceCardProps) {
  return (
    <div className="rounded-2xl border border-[#e5bdbe] bg-[#fff8f7] p-4">
      <p className="text-sm text-[#5c3f41]">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-[#281718]">{value}</p>
      <p className="mt-1 text-sm text-[#906f70]">{description}</p>
    </div>
  )
}
