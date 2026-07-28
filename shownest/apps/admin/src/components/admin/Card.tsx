interface AdminCardProps {
  title?: string
  description?: string
  children: React.ReactNode
  action?: React.ReactNode
}

export function AdminCard({ title, description, children, action }: AdminCardProps) {
  return (
    <section className="rounded-2xl border border-[#e5bdbe] bg-white p-6 shadow-[0_20px_40px_-15px_rgba(40,23,24,0.06)]">
      {(title || description || action) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title ? <h2 className="text-lg font-semibold text-[#281718]">{title}</h2> : null}
            {description ? <p className="mt-1 text-sm text-[#5c3f41]">{description}</p> : null}
          </div>
          {action ? <div>{action}</div> : null}
        </div>
      )}
      {children}
    </section>
  )
}
