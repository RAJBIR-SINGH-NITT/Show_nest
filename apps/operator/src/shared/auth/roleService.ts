export const AUTH_COOKIE_NAME = 'shownest-auth'

export type AppRole = 'user' | 'vendor'

export interface AuthSession {
  email: string
  role: AppRole
  displayName: string
}

export const vendorEmails = ['vendor@example.com', 'vendor2@example.com', 'vendor@shownest.com']

export function getRoleFromEmail(email: string): AppRole {
  const normalized = email.trim().toLowerCase()
  return vendorEmails.includes(normalized) ? 'vendor' : 'user'
}

export function buildAuthSession(email: string): AuthSession {
  const role = getRoleFromEmail(email)
  return {
    email: email.trim(),
    role,
    displayName: role === 'vendor' ? 'Vendor Partner' : 'ShowNest Member',
  }
}

export function encodeAuthSession(session: AuthSession): string {
  return encodeURIComponent(JSON.stringify(session))
}

export function decodeAuthSession(value: string | null | undefined): AuthSession | null {
  if (!value) return null

  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as AuthSession
    if (!parsed.email || !parsed.role) return null
    return parsed
  } catch {
    return null
  }
}

export function persistAuthSession(email: string) {
  const session = buildAuthSession(email)

  if (typeof document !== 'undefined') {
    document.cookie = `${AUTH_COOKIE_NAME}=${encodeAuthSession(session)}; path=/; max-age=86400; SameSite=Lax`
    window.localStorage.setItem(AUTH_COOKIE_NAME, encodeAuthSession(session))
  }

  return session
}

export function clearAuthSession() {
  if (typeof document !== 'undefined') {
    document.cookie = `${AUTH_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    window.localStorage.removeItem(AUTH_COOKIE_NAME)
  }
}

export function getStoredAuthSession(): AuthSession | null {
  if (typeof window === 'undefined') return null

  const storedValue = window.localStorage.getItem(AUTH_COOKIE_NAME)
  if (storedValue) {
    return decodeAuthSession(storedValue)
  }

  return null
}

export function getDefaultRoute(role: AppRole) {
  return role === 'vendor' ? '/vendor' : '/'
}
