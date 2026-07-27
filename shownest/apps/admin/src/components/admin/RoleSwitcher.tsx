'use client'

import { useAdminRole } from './RoleContext'

export function RoleSwitcher() {
  const { currentRole } = useAdminRole()

  return null
}
