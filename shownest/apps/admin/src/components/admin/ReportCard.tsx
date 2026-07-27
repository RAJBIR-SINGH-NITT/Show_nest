interface ReportCardProps {
  title: string
  value: string
  description: string
  tone: 'info' | 'success' | 'warning' | 'default'
}

const toneClasses = {
  info: 'border-[#e5bdbe] bg-[#fff8f7] text-[#ba0036]',
  success: 'border-[#e5bdbe] bg-[#fff8f7] text-[#15803d]',
  warning: 'border-[#e5bdbe] bg-[#fff8f7] text-[#5c3f41]',
  default: 'border-[#e5bdbe] bg-white text-[#281718]',
}

export function ReportCard({ title, value, description, tone }: ReportCardProps) {
  return (
    <div className={`rounded-2xl border p-5 ${toneClasses[tone]}`}>
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.02em]">{value}</p>
      <p className="mt-2 text-sm opacity-80">{description}</p>
    </div>
  )
}
