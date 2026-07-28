"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const vendorNavLinks = [
  { href: '/vendor', label: 'Overview' },
  { href: '/vendor/events', label: 'Events' },
  { href: '/vendor/requests', label: 'Requests' },
  { href: '/vendor/notifications', label: 'Notifications' },
  { href: '/vendor/profile', label: 'Profile' },
  { href: '/vendor/settings', label: 'Settings' },
]

export default function VendorNav() {
  const pathname = usePathname() || ''

  return (
    <div className="mx-auto flex flex-wrap gap-3 px-4 py-3 sm:px-6 lg:px-8">
      {vendorNavLinks.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
        const base = 'rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition'
        const activeClasses = 'bg-amber-400 text-slate-950 border-amber-300 shadow-amber-400/25'
        const inactiveClasses = 'bg-sky-600 text-white border-sky-400 hover:bg-sky-500'

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${base} ${isActive ? activeClasses : inactiveClasses}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}
