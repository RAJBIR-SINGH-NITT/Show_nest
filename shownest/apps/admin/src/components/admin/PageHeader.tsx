interface PageHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#e5bdbe] bg-white p-6 shadow-[0_20px_40px_-15px_rgba(40,23,24,0.06)] lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-[#281718]">{title}</h1>
        {description ? <p className="mt-2 text-sm text-[#5c3f41]">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  )
}
