interface FeatureFlagCardProps {
  name: string
  description: string
  environment: string
  owner: string
  status: string
  lastUpdated: string
  category: string
  onToggle: () => void
}

export function FeatureFlagCard({ name, description, environment, owner, status, lastUpdated, category, onToggle }: FeatureFlagCardProps) {
  return (
    <div className="rounded-2xl border border-[#e5bdbe] bg-white p-5 shadow-[0_20px_40px_-15px_rgba(40,23,24,0.06)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-[#281718]">{name}</p>
          <p className="mt-2 text-sm text-[#5c3f41]">{description}</p>
        </div>
        <button type="button" onClick={onToggle} className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] focus:outline-none focus:ring-2 focus:ring-[#ba0036] ${status === 'enabled' ? 'bg-[#ffe9e9] text-[#ba0036]' : 'bg-[#fff8f7] text-[#5c3f41]'}`}>
          {status}
        </button>
      </div>
      <div className="mt-5 grid gap-3 text-sm text-[#5c3f41] md:grid-cols-3">
        <div><span className="font-semibold text-[#281718]">Environment</span><p className="mt-1">{environment}</p></div>
        <div><span className="font-semibold text-[#281718]">Owner</span><p className="mt-1">{owner}</p></div>
        <div><span className="font-semibold text-[#281718]">Category</span><p className="mt-1">{category}</p></div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-[#906f70]">
        <span>Updated {lastUpdated}</span>
        <button type="button" className="rounded-full border border-[#e5bdbe] px-3 py-1.5 text-sm font-semibold text-[#5c3f41] focus:outline-none focus:ring-2 focus:ring-[#ba0036]">Edit</button>
      </div>
    </div>
  )
}
