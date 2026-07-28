interface EmptyStateProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[#e5bdbe] bg-[#fff8f7] p-10 text-center">
      <h3 className="text-lg font-semibold text-[#281718]">{title}</h3>
      {description ? <p className="mt-2 text-sm text-[#5c3f41]">{description}</p> : null}
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  )
}
