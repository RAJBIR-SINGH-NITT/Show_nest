import type { AdminUser, DashboardCard } from '@/types/admin'

export const adminProfileMock: AdminUser = {
  id: 'admin-1',
  name: 'Mina Patel',
  email: 'mina@shownest.io',
  role: 'Super Admin',
  status: 'active',
}

export const roleSwitcherOptions = [
  { label: 'Super Admin', value: 'Super Admin' },
  { label: 'Finance', value: 'Finance' },
  { label: 'Content Manager', value: 'Content Manager' },
  { label: 'Support', value: 'Support' },
  { label: 'Gate Staff', value: 'Gate Staff' },
  { label: 'Operator', value: 'Operator' },
]

export const rolePermissionsMock: Record<string, { actions: string[] }> = {
  'Super Admin': { actions: ['Manage users', 'Grant roles', 'Approve refunds', 'Toggle flags'] },
  Finance: { actions: ['Review payouts', 'Approve refunds', 'Export reports'] },
  'Content Manager': { actions: ['Manage catalog', 'Approve content', 'Publish shows'] },
  Support: { actions: ['View bookings', 'Issue support actions', 'Escalate requests'] },
  'Gate Staff': { actions: ['Scan tickets', 'Check in guests', 'View event access'] },
  Operator: { actions: ['Manage venues', 'Review screens', 'Coordinate shows'] },
}

export const roleNavigationAccess: Record<string, string[]> = {
  'Super Admin': ['dashboard', 'catalog', 'movies', 'events', 'artists', 'venues', 'showtimes', 'pricing-rules', 'promotions', 'bookings', 'refunds', 'users', 'operators', 'roles', 'audit-logs', 'reports', 'feature-flags'],
  Finance: ['dashboard', 'bookings', 'refunds', 'reports', 'operators'],
  'Content Manager': ['dashboard', 'catalog', 'movies', 'events', 'artists', 'venues', 'showtimes', 'promotions', 'reports', 'operators'],
  Support: ['dashboard', 'bookings', 'refunds', 'users', 'reports', 'operators'],
  'Gate Staff': ['dashboard', 'bookings', 'reports'],
  Operator: ['dashboard', 'venues', 'showtimes', 'bookings', 'reports', 'operators'],
}

export const operatorsMock = [
  {
    id: 'op-101',
    name: 'Asha Singh',
    company: 'ShowNest Partners',
    email: 'asha@shownest.io',
    phone: '+91 99999 00000',
    status: 'active' as const,
    role: 'Operator',
    venue: 'Phoenix Venue',
    notes: 'Handles venue and screen coordination.',
    lastActive: '2h ago',
    contact: 'asha@shownest.io',
    activity: 'Assigned venue access',
  },
  {
    id: 'op-102',
    name: 'Karan Mehra',
    company: 'North Star Events',
    email: 'karan@northstar.io',
    phone: '+91 98765 11111',
    status: 'suspended' as const,
    role: 'Support',
    venue: 'West Gate',
    notes: 'Pending reactivation after access review.',
    lastActive: '1d ago',
    contact: 'karan@northstar.io',
    activity: 'Password reset requested',
  },
  {
    id: 'op-103',
    name: 'Neha Rao',
    company: 'City Pulse',
    email: 'neha@citypulse.io',
    phone: '+91 97654 22222',
    status: 'inactive' as const,
    role: 'Gate Staff',
    venue: 'Arena Hall',
    notes: 'Recently onboarded and awaiting activation.',
    lastActive: '3d ago',
    contact: 'neha@citypulse.io',
    activity: 'Pending venue assignment',
  },
]

export const dashboardCardsMock: DashboardCard[] = [
  {
    id: 'bookings',
    title: 'Bookings',
    value: '24.8K',
    description: 'Live demand across venues',
    tone: 'info',
  },
  {
    id: 'revenue',
    title: 'Revenue',
    value: '₹4.2M',
    description: 'Rolling 30-day volume',
    tone: 'success',
  },
  {
    id: 'refunds',
    title: 'Refunds',
    value: '182',
    description: 'Pending review queue',
    tone: 'warning',
  },
  {
    id: 'audits',
    title: 'Audit Events',
    value: '1.2K',
    description: 'Protected admin actions',
    tone: 'default',
  },
]

export const notificationMock = [
  { id: 'n1', title: 'Pricing rule was updated', detail: 'Premium showtime pricing has changed', unread: true },
  { id: 'n2', title: 'Venue approval pending', detail: 'Review the new partner venue', unread: false },
]
