'use client'

import { createContext, useContext, useMemo } from 'react'
import { rolePermissionsMock } from '@/mock/admin'
import { getAdminProfile } from '@/services/admin/mockService'

interface AdminRoleContextValue {
  currentRole: string
  permissions: (typeof rolePermissionsMock)[keyof typeof rolePermissionsMock]
}

const AdminRoleContext = createContext<AdminRoleContextValue | null>(null)

export function AdminRoleProvider({ children }: { children: React.ReactNode }) {
  const profile = getAdminProfile()
  const currentRole = profile?.role || 'Super Admin'

  const permissions = useMemo(() => rolePermissionsMock[currentRole] ?? rolePermissionsMock['Super Admin'], [currentRole])

  const value = useMemo<AdminRoleContextValue>(() => ({
    currentRole,
    permissions,
  }), [currentRole, permissions])

  return <AdminRoleContext.Provider value={value}>{children}</AdminRoleContext.Provider>
}

export function useAdminRole() {
  const context = useContext(AdminRoleContext)

  if (!context) {
    throw new Error('useAdminRole must be used within AdminRoleProvider')
  }

  return context
}
