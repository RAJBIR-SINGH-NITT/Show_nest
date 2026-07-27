interface UserProfileCardProps {
  name: string
  email: string
  role: string
  status: string
}

export function UserProfileCard({ name, email, role, status }: UserProfileCardProps) {
  return (
    <div className="rounded-2xl border border-[#e5bdbe] bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[#281718]">{name}</h3>
          <p className="mt-1 text-sm text-[#5c3f41]">{email}</p>
        </div>
        <span className="rounded-full border border-[#e5bdbe] bg-[#fff8f7] px-3 py-1 text-sm font-semibold text-[#5c3f41]">{status}</span>
      </div>
      <p className="mt-4 text-sm text-[#5c3f41]">Role: {role}</p>
    </div>
  )
}
