import type { AdminBreadcrumbItem, AdminNavigationItem } from '@/types/admin'

export function getPathSegments(pathname: string) {
  return pathname
    .split('/')
    .filter(Boolean)
    .filter((segment) => segment !== 'admin')
}

export function buildBreadcrumbs(pathname: string): AdminBreadcrumbItem[] {
  const segments = getPathSegments(pathname)
  const items: AdminBreadcrumbItem[] = [{ label: 'Admin', href: '/admin', current: segments.length === 0 }]

  if (segments.length === 0) {
    return [{ label: 'Dashboard', current: true }]
  }

  const pathParts = ['admin']
  segments.forEach((segment, index) => {
    pathParts.push(segment)
    const href = `/${pathParts.join('/')}`
    items.push({
      label: segment.replace(/-/g, ' '),
      href: index === segments.length - 1 ? undefined : href,
      current: index === segments.length - 1,
    })
  })

  return items
}

export function findActiveNavItem(pathname: string, items: AdminNavigationItem[]): AdminNavigationItem | undefined {
  const normalizedPath = pathname === '/admin' ? '/admin' : pathname

  return items.find((item) => {
    if (item.href && normalizedPath === item.href) {
      return true
    }

    return item.children?.some((child) => child.href && normalizedPath.startsWith(child.href))
  })
}
