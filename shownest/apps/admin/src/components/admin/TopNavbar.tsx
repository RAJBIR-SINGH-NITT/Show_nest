'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { AdminBreadcrumbItem, AdminUser } from '@/types/admin'

interface TopNavbarProps {
  breadcrumbs?: AdminBreadcrumbItem[]
  user?: AdminUser
}

export function TopNavbar({ breadcrumbs = [], user }: TopNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const displayRole = useMemo(() => {
    const role = user?.role || 'Super Administrator'
    return role === 'Super Admin' ? 'Super Administrator' : role
  }, [user?.role])

  return (
    <header className="border-b border-[#e5bdbe] bg-[#fff8f7]/95 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-4 lg:px-6">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-2 text-sm text-[#5c3f41]">
            {breadcrumbs.length > 0 ? (
              breadcrumbs.map((item, index) => (
                <div key={`${item.label}-${index}`} className="flex items-center gap-2">
                  {index > 0 && <span>/</span>}
                  {item.current ? (
                    <span className="font-semibold text-[#281718]">{item.label}</span>
                  ) : (
                    <Link href={item.href || '#'} className="hover:text-[#ba0036]">
                      {item.label}
                    </Link>
                  )}
                </div>
              ))
            ) : (
              <span className="font-semibold text-[#281718]">Overview</span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[#ba0036]" />
            <span className="text-sm text-[#5c3f41]">Operations workspace</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full border border-[#e5bdbe] bg-[#fff8f7] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#ba0036] xl:flex">
            <span className="h-2 w-2 rounded-full bg-[#ba0036]" />
            <span>{displayRole}</span>
          </div>
          <label className="hidden items-center gap-2 rounded-full border border-[#e5bdbe] bg-white px-3 py-2 text-sm text-[#5c3f41] lg:flex">
            <span>⌕</span>
            <input className="w-40 bg-transparent outline-none" placeholder="Search" aria-label="Global search" />
          </label>

          <button className="rounded-full border border-[#e5bdbe] bg-white p-2 text-[#5c3f41]" aria-label="Notifications">
            🔔
          </button>
          <button className="rounded-full border border-[#e5bdbe] bg-white p-2 text-[#5c3f41]" aria-label="Settings">
            ⚙
          </button>
          <button className="flex items-center gap-2 rounded-full border border-[#e5bdbe] bg-white px-3 py-2" onClick={() => setIsMenuOpen((value) => !value)}>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffe1e2] font-semibold text-[#ba0036]">
              {user?.name?.charAt(0) || 'A'}
            </span>
            <span className="hidden text-sm font-semibold text-[#281718] lg:block">{user?.name || 'Admin'}</span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-[#e5bdbe] bg-white px-4 py-3 text-sm text-[#5c3f41] lg:hidden">
          <div className="space-y-2">
            <div className="rounded-lg bg-[#fff8f7] p-3">{user?.email || 'admin@shownest.io'}</div>
            <div className="rounded-lg bg-[#fff8f7] p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-[#281718]">Current role</span>
                <span className="rounded-full border border-[#e5bdbe] bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ba0036]">
                  {displayRole}
                </span>
              </div>
            </div>
            <div className="rounded-lg bg-[#fff8f7] p-3">Settings placeholder</div>
          </div>
        </div>
      )}
    </header>
  )
}
