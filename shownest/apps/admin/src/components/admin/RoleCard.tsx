interface RoleCardProps {
  name: string
  description: string
  status: string
  usersCount: number
  createdAt: string
  onOpen: () => void
}

export function RoleCard({ name, description, status, usersCount, createdAt, onOpen }: RoleCardProps) {
  return (
    <button type="button" onClick={onOpen} className="w-full rounded-2xl border border-[#e5bdbe] bg-white p-5 text-left shadow-[0_20px_40px_-15px_rgba(40,23,24,0.06)] transition hover:-translate-y-1 hover:border-[#ba0036] focus:outline-none focus:ring-2 focus:ring-[#ba0036]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-[#281718]">{name}</p>
          <p className="mt-2 text-sm text-[#5c3f41]">{description}</p>
        </div>
        <span className="rounded-full bg-[#ffe9e9] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#ba0036]">{status}</span>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#5c3f41]">
        <span>{usersCount} assigned users</span>
        <span>•</span>
        <span>Created {createdAt}</span>
      </div>
    </button>
  )
}
