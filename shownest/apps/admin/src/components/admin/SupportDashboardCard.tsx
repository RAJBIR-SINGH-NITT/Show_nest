'use client'

interface SupportDashboardCardProps {
  title: string
  value: string
  description: string
  tone?: 'default' | 'info' | 'success' | 'warning'
}

export function SupportDashboardCard({ title, value, description, tone = 'default' }: SupportDashboardCardProps) {
  const toneClasses = {
    default: 'border-[#e5bdbe] bg-white text-[#281718]',
    info: 'border-[#e5bdbe] bg-[#fff8f7] text-[#281718]',
    success: 'border-[#e5bdbe] bg-[#ffe9e9] text-[#ba0036]',
    warning: 'border-[#e5bdbe] bg-[#fff2f2] text-[#5c3f41]',
  }

  return (
    <div className={`rounded-2xl border p-4 ${toneClasses[tone]}`}>
      <p className="text-sm text-[#5c3f41]">{title}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-[#906f70]">{description}</p>
    </div>
  )
}
