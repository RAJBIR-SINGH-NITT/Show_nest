import { useEffect, useState } from 'react'

export function useAdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setCollapsed(true)
    }
  }, [])

  return {
    collapsed,
    setCollapsed,
    mobileOpen,
    setMobileOpen,
  }
}
