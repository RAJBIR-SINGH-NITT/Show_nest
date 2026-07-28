'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/admin/Sidebar'
import { TopNavbar } from '@/components/admin/TopNavbar'
import { AdminRoleProvider } from '@/components/admin/RoleContext'
import { buildBreadcrumbs } from '@/utils/admin/navigation'
import { getAdminProfile } from '@/services/admin/mockService'
import { usePathname } from 'next/navigation'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const user = getAdminProfile()

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setCollapsed(true)
    }
  }, [])

  return (
    <AdminRoleProvider>
    <div className="min-h-screen bg-[#fff8f7] text-[#281718]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <div className="hidden lg:block">
          <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-40 flex lg:hidden">
            <div className="w-72 shrink-0 border-r border-[#e5bdbe] bg-[#fff8f7]">
              <Sidebar collapsed={false} onToggle={() => setMobileOpen(false)} />
            </div>
            <button className="flex-1 bg-black/20" onClick={() => setMobileOpen(false)} aria-label="Close sidebar" />
          </div>
        )}

        <div className="flex min-h-screen flex-1 flex-col">
          <TopNavbar
            breadcrumbs={buildBreadcrumbs(pathname)}
            user={user}
          />
          <main className="flex-1 p-4 lg:p-8">
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <button
                className="rounded-full border border-[#e5bdbe] bg-white px-3 py-2 text-sm text-[#5c3f41]"
                onClick={() => setMobileOpen(true)}
              >
                ☰ Menu
              </button>
              <div className="text-sm text-[#5c3f41]">Admin workspace</div>
            </div>
            {children}
          </main>
        </div>
      </div>
    </div>
    </AdminRoleProvider>
  )
}
