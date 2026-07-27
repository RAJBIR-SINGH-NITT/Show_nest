export interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  status: 'active' | 'pending' | 'inactive'
}

export interface AdminNavigationItem {
  id: string
  label: string
  href?: string
  icon: string
  children?: AdminNavigationItem[]
  requiredRole?: string[]
}

export interface AdminBreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

export interface DashboardCard {
  id: string
  title: string
  value: string
  description: string
  tone?: 'default' | 'info' | 'success' | 'warning'
}

export interface AdminTableColumn {
  key: string
  label: string
  sortable?: boolean
}

export interface AdminTableRow {
  id: string
  [key: string]: string | number | boolean | null | undefined
}

export interface DashboardMetric {
  id: string
  title: string
  value: string
  change: string
  description: string
  trend: 'up' | 'down' | 'neutral'
  icon: string
}

export interface DashboardActivityItem {
  id: string
  title: string
  detail: string
  time: string
  severity: 'info' | 'warning' | 'success'
}

export interface DashboardNotificationItem {
  id: string
  title: string
  detail: string
  timestamp: string
  priority: 'high' | 'medium' | 'low'
}

export interface DashboardUpcomingEvent {
  id: string
  title: string
  venue: string
  date: string
  time: string
  bookingsCount: number
  occupancy: number
  status: string
}

export interface DashboardServiceHealth {
  id: string
  name: string
  status: 'Healthy' | 'Warning' | 'Offline'
  detail: string
}

export interface DashboardQuickAction {
  id: string
  title: string
  description: string
  href: string
  icon: string
}

export interface DatasetPoint {
  label: string
  value: number
}

export interface UserRecord {
  id: string
  name: string
  email: string
  role: string
  status: string
  lastActive: string
}

export interface BookingRecord {
  id: string
  customer: string
  event: string
  venue: string
  status: string
  amount: number
}

export interface MovieRecord {
  id: string
  title: string
  status: 'draft' | 'published' | 'archived'
  rating: string
  updatedAt: string
}

export interface EventRecord {
  id: string
  title: string
  venue: string
  date: string
  status: string
}

export interface VenueRecord {
  id: string
  name: string
  city: string
  capacity: number
  status: string
}

export interface ReportRecord {
  id: string
  title: string
  period: string
  value: string
}

export interface RefundRecord {
  id: string
  bookingId: string
  customer: string
  amount: number
  status: string
}

export interface PromotionRecord {
  id: string
  title: string
  code: string
  status: string
}

export interface RoleRecord {
  id: string
  name: string
  permissions: string[]
}

export interface PermissionRecord {
  id: string
  name: string
  description: string
}

export interface AuditLogRecord {
  id: string
  actor: string
  action: string
  resource: string
  timestamp: string
}

export interface FeatureFlagRecord {
  id: string
  name: string
  enabled: boolean
  description: string
}
