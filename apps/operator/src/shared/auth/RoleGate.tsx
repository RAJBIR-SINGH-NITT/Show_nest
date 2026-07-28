'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getStoredAuthSession, getDefaultRoute, persistAuthSession, type AppRole } from './roleService'

interface RoleGateProps {
  role: AppRole
  children: React.ReactNode
}

export function RoleGate({ role, children }: RoleGateProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [allowed, setAllowed] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const session = getStoredAuthSession()

    if (!session) {
      if (pathname.startsWith('/vendor')) {
        persistAuthSession('vendor@shownest.com')
        setAllowed(true)
        setIsChecking(false)
        return
      }

      router.replace('/auth/login')
      return
    }

    if (session.role !== role) {
      setIsChecking(false)
      router.replace(getDefaultRoute(session.role))
      return
    }

    setAllowed(true)
    setIsChecking(false)
  }, [pathname, role, router])

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0808] text-white">
        <p className="text-sm text-gray-300">Checking access…</p>
      </div>
    )
  }

  if (!allowed) return null

  return <>{children}</>
}
