import Link from 'next/link'

interface QuickActionCardProps {
  title: string
  description: string
  href: string
  icon: string
}

export function QuickActionCard({ title, description, href, icon }: QuickActionCardProps) {
  return (
    <Link href={href} className="group rounded-2xl border border-[#e5bdbe] bg-white p-4 shadow-[0_20px_40px_-15px_rgba(40,23,24,0.06)] transition hover:-translate-y-1 hover:border-[#ba0036]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffe9e9] text-lg text-[#ba0036]">{icon}</div>
        <div>
          <h4 className="text-sm font-semibold text-[#281718]">{title}</h4>
          <p className="mt-1 text-sm text-[#5c3f41]">{description}</p>
        </div>
      </div>
    </Link>
  )
}
