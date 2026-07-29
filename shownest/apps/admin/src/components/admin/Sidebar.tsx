'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { adminNavigation } from '@/constants/admin/navigation'
import { roleNavigationAccess } from '@/mock/admin'
import { useAdminRole } from '@/components/admin/RoleContext'
import type { AdminNavigationItem } from '@/types/admin'

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

function SidebarItem({ item, pathname, collapsed }: { item: AdminNavigationItem; pathname: string; collapsed: boolean }) {
  const isActive = pathname === item.href || item.children?.some((child) => pathname.startsWith(child.href || ''))

  if (item.children) {
    return (
      <div>
        <div className={`flex items-center justify-between rounded-xl border border-transparent px-3 py-2 text-sm font-medium text-[#5c3f41] ${isActive ? 'bg-[#ffe9e9] text-[#ba0036]' : 'hover:bg-[#fff8f7] hover:border-[#e5bdbe]'}`}>
          <span className="flex items-center gap-2">
            <span className="text-base">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </span>
          {!collapsed && <span className="text-xs text-[#906f70]">▾</span>}
        </div>
        {!collapsed && (
          <div className="ml-4 mt-1 space-y-1">
            {item.children.map((child) => {
              const childActive = pathname === child.href || pathname.startsWith(child.href || '')
              return (
                <Link
                  key={child.id}
                  href={child.href || '#'}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${childActive ? 'bg-[#ffe1e2] text-[#ba0036]' : 'text-[#5c3f41] hover:bg-[#fff8f7]'}`}
                >
                  <span>{child.icon}</span>
                  <span>{child.label}</span>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      href={item.href || '#'}
      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-[#ffe9e9] text-[#ba0036]' : 'text-[#5c3f41] hover:bg-[#fff8f7]'}`}
    >
      <span className="text-base">{item.icon}</span>
      {!collapsed && <span>{item.label}</span>}
    </Link>
  )
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const { currentRole } = useAdminRole()
  const allowedIds = roleNavigationAccess[currentRole] ?? roleNavigationAccess['Super Admin']
  const visibleNavigation = adminNavigation
    .map((item) => ({
      ...item,
      children: item.children?.filter((child) => allowedIds.includes(child.id)),
    }))
    .filter((item) => allowedIds.includes(item.id) || (item.children?.length ?? 0) > 0)

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    window.location.href = '/login'
  }

  return (
    <aside className={`flex h-screen flex-col border-r border-[#e5bdbe] bg-[#fff8f7] ${collapsed ? 'w-20' : 'w-72'}`}>
      <div className="flex items-center justify-between border-b border-[#e5bdbe] px-4 py-4">
        {!collapsed ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ba0036]">ShowNest</p>
            <p className="text-sm font-semibold text-[#281718]">Admin Portal</p>
          </div>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffe1e2] text-lg font-semibold text-[#ba0036]">S</div>
        )}
        <button
          type="button"
          onClick={onToggle}
          className="rounded-lg border border-[#e5bdbe] bg-white px-2 py-1 text-sm text-[#5c3f41]"
          aria-label="Toggle sidebar"
        >
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Admin sidebar navigation">
        {visibleNavigation.map((item) => (
          <SidebarItem key={item.id} item={item} pathname={pathname} collapsed={collapsed} />
        ))}
      </nav>

      <div className="border-t border-[#e5bdbe] p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-red-600 hover:bg-[#ffeef0] transition"
        >
          <span className="text-lg">🚪</span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
