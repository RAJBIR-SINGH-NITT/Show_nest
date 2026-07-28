import type { AdminNavigationItem } from '@/types/admin'

export const adminNavigation: AdminNavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/admin', icon: '◉' },
  {
    id: 'catalog',
    label: 'Catalog',
    icon: '▦',
    children: [
      { id: 'movies', label: 'Movies', href: '/admin/catalog/movies', icon: '▶' },
      { id: 'events', label: 'Events', href: '/admin/catalog/events', icon: '▶' },
      { id: 'artists', label: 'Artists', href: '/admin/catalog/artists', icon: '▶' },
    ],
  },
  { id: 'venues', label: 'Venues', href: '/admin/venues', icon: '⌂' },
  { id: 'showtimes', label: 'Showtimes', href: '/admin/showtimes', icon: '⏱' },
  { id: 'pricing-rules', label: 'Pricing Rules', href: '/admin/pricing-rules', icon: '◌' },
  { id: 'promotions', label: 'Promotions', href: '/admin/promotions', icon: '✦' },
  { id: 'bookings', label: 'Bookings', href: '/admin/bookings', icon: '☰' },
  { id: 'refunds', label: 'Refunds', href: '/admin/refunds', icon: '↺' },
  { id: 'users', label: 'Users', href: '/admin/users', icon: '☺' },
  { id: 'operators', label: 'Operators', href: '/admin/operators', icon: '⌘' },
  { id: 'roles', label: 'Roles', href: '/admin/roles', icon: '⚑' },
  { id: 'audit-logs', label: 'Audit Logs', href: '/admin/audit-logs', icon: '✓' },
  { id: 'reports', label: 'Reports', href: '/admin/reports', icon: '◫' },
  { id: 'feature-flags', label: 'Feature Flags', href: '/admin/feature-flags', icon: '⚙' },
]
