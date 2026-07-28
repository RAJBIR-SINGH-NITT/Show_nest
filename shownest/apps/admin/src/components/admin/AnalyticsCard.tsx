interface AnalyticsCardProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function AnalyticsCard({ title, description, children }: AnalyticsCardProps) {
  return (
    <section className="rounded-2xl border border-[#e5bdbe] bg-white p-6 shadow-[0_20px_40px_-15px_rgba(40,23,24,0.06)]">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-[#281718]">{title}</h3>
        {description ? <p className="mt-1 text-sm text-[#5c3f41]">{description}</p> : null}
      </div>
      {children}
    </section>
  )
}
