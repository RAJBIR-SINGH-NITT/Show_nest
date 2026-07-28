import type {
  DashboardActivityItem,
  DashboardMetric,
  DashboardNotificationItem,
  DashboardQuickAction,
  DashboardServiceHealth,
  DashboardUpcomingEvent,
} from '@/types/admin'

export const dashboardMetricsMock: DashboardMetric[] = [
  {
    id: 'bookings',
    title: "Today's Bookings",
    value: '1,248',
    change: '+12.4%',
    description: 'Compared with yesterday',
    trend: 'up',
    icon: '◷',
  },
  {
    id: 'revenue',
    title: "Today's Revenue",
    value: '₹8.4M',
    change: '+8.1%',
    description: 'Across all live shows',
    trend: 'up',
    icon: '◔',
  },
  {
    id: 'users',
    title: 'Active Users',
    value: '42.6K',
    change: '+4.3%',
    description: 'Signed-in within 24h',
    trend: 'up',
    icon: '☻',
  },
  {
    id: 'seat-holds',
    title: 'Seat Hold Failures',
    value: '18',
    change: '-2.1%',
    description: 'Inventory contention issues',
    trend: 'down',
    icon: '⚠',
  },
  {
    id: 'running-shows',
    title: 'Shows Running Today',
    value: '96',
    change: '+7.0%',
    description: 'Across premium venues',
    trend: 'up',
    icon: '▶',
  },
  {
    id: 'upcoming-shows',
    title: 'Upcoming Shows',
    value: '214',
    description: 'Scheduled in the next 72h',
    change: '+3.2%',
    trend: 'neutral',
    icon: '⏱',
  },
  {
    id: 'refunds',
    title: 'Pending Refund Requests',
    value: '27',
    change: '+1.8%',
    description: 'Awaiting approval',
    trend: 'up',
    icon: '↺',
  },
  {
    id: 'approvals',
    title: 'Pending Content Approvals',
    value: '14',
    change: '-0.6%',
    description: 'Catalog changes pending review',
    trend: 'down',
    icon: '✓',
  },
]

export const dashboardActivitiesMock: DashboardActivityItem[] = [
  { id: 'a1', title: 'Movie Published', detail: 'The Grand Adventure is now live in Mumbai', time: '6m ago', severity: 'success' },
  { id: 'a2', title: 'Event Updated', detail: 'Neon Horizon venue schedule was adjusted', time: '19m ago', severity: 'info' },
  { id: 'a3', title: 'Refund Requested', detail: 'Booking #B-1042 requires manual review', time: '41m ago', severity: 'warning' },
  { id: 'a4', title: 'Venue Added', detail: 'Westfield Arena was added to the network', time: '1h ago', severity: 'info' },
  { id: 'a5', title: 'Role Updated', detail: 'Support agent permissions were revised', time: '2h ago', severity: 'info' },
]

export const dashboardNotificationsMock: DashboardNotificationItem[] = [
  { id: 'n1', title: 'New Booking', detail: '12 tickets were reserved for the evening premiere', timestamp: '2m ago', priority: 'high' },
  { id: 'n2', title: 'Refund Request', detail: 'Customer requested a partial refund for a cancelled show', timestamp: '14m ago', priority: 'medium' },
  { id: 'n3', title: 'Payment Failure', detail: 'A failed card authorization needs attention', timestamp: '31m ago', priority: 'high' },
  { id: 'n4', title: 'Feature Flag Change', detail: 'Early access pricing toggle was enabled', timestamp: '1h ago', priority: 'low' },
]

export const dashboardUpcomingEventsMock: DashboardUpcomingEvent[] = [
  { id: 'ue1', title: 'Midnight Premiere', venue: 'PVR Phoenix', date: 'Today', time: '8:30 PM', bookingsCount: 182, occupancy: 84, status: 'Selling Fast' },
  { id: 'ue2', title: 'Live Concert', venue: 'Jio World Garden', date: 'Tomorrow', time: '7:00 PM', bookingsCount: 96, occupancy: 63, status: 'On Track' },
  { id: 'ue3', title: 'Sports Final', venue: 'Wankhede Stadium', date: 'Thu', time: '6:45 PM', bookingsCount: 241, occupancy: 91, status: 'High Demand' },
]

export const dashboardHealthMock: DashboardServiceHealth[] = [
  { id: 'api', name: 'API Status', status: 'Healthy', detail: 'Response time within SLA' },
  { id: 'db', name: 'Database Status', status: 'Healthy', detail: 'Writes and reads operating normally' },
  { id: 'payments', name: 'Payment Gateway', status: 'Warning', detail: 'Latency detected on one provider' },
  { id: 'notifications', name: 'Notification Service', status: 'Healthy', detail: 'Delivery queue stable' },
  { id: 'inventory', name: 'Seat Inventory Service', status: 'Warning', detail: 'Seat hold retries elevated' },
  { id: 'search', name: 'Search Service', status: 'Offline', detail: 'Maintenance window in progress' },
  { id: 'ws', name: 'WebSocket Service', status: 'Healthy', detail: 'Live updates connected' },
]

export const dashboardQuickActionsMock: DashboardQuickAction[] = [
  { id: 'movie', title: 'Add Movie', description: 'Create a new catalog entry', href: '/admin/catalog/movies', icon: '🎬' },
  { id: 'event', title: 'Add Event', description: 'Publish a new experience', href: '/admin/catalog/events', icon: '🎫' },
  { id: 'showtime', title: 'Create Showtime', description: 'Launch a new screening', href: '/admin/showtimes', icon: '⏱' },
  { id: 'venue', title: 'Add Venue', description: 'Register a new location', href: '/admin/venues', icon: '⌂' },
  { id: 'users', title: 'Manage Users', description: 'Review access and roles', href: '/admin/users', icon: '☺' },
  { id: 'promotion', title: 'Create Promotion', description: 'Launch a pricing offer', href: '/admin/promotions', icon: '✦' },
  { id: 'reports', title: 'View Reports', description: 'Inspect sales and trends', href: '/admin/reports', icon: '◫' },
  { id: 'refunds', title: 'Approve Refunds', description: 'Review pending requests', href: '/admin/refunds', icon: '↺' },
]
