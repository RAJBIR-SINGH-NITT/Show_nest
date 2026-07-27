import Link from 'next/link'

interface MetricCardProps {
  title: string
  value: string
  change: string
  description: string
  trend: 'up' | 'down' | 'neutral'
  icon: string
  href?: string
}

const trendClasses = {
  up: 'text-[#15803d]',
  down: 'text-[#ba0036]',
  neutral: 'text-[#5c3f41]',
}

export function MetricCard({ title, value, change, description, trend, icon, href }: MetricCardProps) {
  const card = (
    <div className="group rounded-2xl border border-[#e5bdbe] bg-white p-5 shadow-[0_20px_40px_-15px_rgba(40,23,24,0.06)] transition hover:-translate-y-1 hover:border-[#ba0036]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#5c3f41]">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-[#281718]">{value}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ffe9e9] text-xl text-[#ba0036]">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <span className={`font-semibold ${trendClasses[trend]}`}>{change}</span>
        <span className="text-[#5c3f41]">{description}</span>
      </div>
      <div className="mt-4 h-2 w-full rounded-full bg-[#fff8f7]">
        <div className="h-2 rounded-full bg-[#ba0036]" style={{ width: trend === 'down' ? '55%' : trend === 'neutral' ? '70%' : '85%' }} />
      </div>
    </div>
  )

  if (href) {
    return <Link href={href}>{card}</Link>
  }

  return card
}
