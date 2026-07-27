interface EnvironmentBadgeProps {
  environment: string
}

export function EnvironmentBadge({ environment }: EnvironmentBadgeProps) {
  const classes = environment === 'Production' ? 'bg-[#ffe9e9] text-[#ba0036]' : environment === 'Staging' ? 'bg-[#fff8f7] text-[#5c3f41]' : 'bg-[#fbdbdc] text-[#281718]'

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${classes}`}>{environment}</span>
}
