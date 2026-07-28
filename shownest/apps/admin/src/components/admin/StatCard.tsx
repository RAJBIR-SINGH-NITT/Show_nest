interface StatCardProps {
  title: string
  value: string
  description: string
  tone?: 'default' | 'info' | 'success' | 'warning'
}

const toneClasses: Record<NonNullable<StatCardProps['tone']>, string> = {
  default: 'border-[#e5bdbe] bg-white text-[#281718]',
  info: 'border-[#e5bdbe] bg-[#fff8f7] text-[#281718]',
  success: 'border-[#e5bdbe] bg-[#ffe9e9] text-[#281718]',
  warning: 'border-[#e5bdbe] bg-[#fbdbdc] text-[#281718]',
}

export function StatCard({ title, value, description, tone = 'default' }: StatCardProps) {
  return (
    <div className={`rounded-2xl border p-5 shadow-[0_20px_40px_-15px_rgba(40,23,24,0.06)] ${toneClasses[tone]}`}>
      <p className="text-sm font-medium text-[#5c3f41]">{title}</p>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.02em]">{value}</p>
      <p className="mt-2 text-sm text-[#5c3f41]">{description}</p>
    </div>
  )
}
