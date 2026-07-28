export interface RoleGovernanceItem {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive' | 'draft'
  usersCount: number
  createdAt: string
  permissions: Record<string, string[]>
}

export interface AuditLogItem {
  id: string
  actionType: 'create' | 'update' | 'delete' | 'approve' | 'export'
  actor: string
  resource: string
  ipAddress: string
  timestamp: string
  environment: 'Production' | 'Staging' | 'Development'
  severity: 'High' | 'Medium' | 'Low'
  oldValue: string
  newValue: string
  details: string
}

export interface ReportMetricItem {
  id: string
  title: string
  value: string
  change: string
  tone: 'info' | 'success' | 'warning' | 'default'
  description: string
}

export interface FeatureFlagItem {
  id: string
  name: string
  description: string
  environment: 'Production' | 'Staging' | 'Development'
  owner: string
  status: 'enabled' | 'disabled' | 'scheduled'
  lastUpdated: string
  category: string
}

export const rolesGovernanceMock: RoleGovernanceItem[] = [
  {
    id: 'role-ops',
    name: 'Operations Lead',
    description: 'Owns venue operations, booking oversight, and refund review.',
    status: 'active',
    usersCount: 8,
    createdAt: '2026-01-10',
    permissions: {
      Movies: ['read', 'write', 'approve'],
      Events: ['read', 'write', 'approve'],
      Venues: ['read', 'write', 'update'],
      Bookings: ['read', 'write', 'approve'],
      Refunds: ['read', 'write', 'approve'],
      Users: ['read', 'write'],
      Reports: ['read', 'export'],
      'Feature Flags': ['read', 'write'],
      'Audit Logs': ['read', 'export'],
      Pricing: ['read', 'write', 'approve'],
      Promotions: ['read', 'write', 'approve'],
      Settings: ['read', 'manage'],
    },
  },
  {
    id: 'role-catalog',
    name: 'Catalog Manager',
    description: 'Manages cinema and event content lifecycle.',
    status: 'active',
    usersCount: 5,
    createdAt: '2026-02-18',
    permissions: {
      Movies: ['read', 'write', 'update'],
      Events: ['read', 'write', 'update'],
      Venues: ['read'],
      Bookings: ['read'],
      Refunds: ['read'],
      Users: ['read'],
      Reports: ['read'],
      'Feature Flags': ['read'],
      'Audit Logs': ['read'],
      Pricing: ['read'],
      Promotions: ['read', 'write'],
      Settings: ['read'],
    },
  },
  {
    id: 'role-finance',
    name: 'Finance Reviewer',
    description: 'Approves refund and pricing decisions from finance queues.',
    status: 'draft',
    usersCount: 3,
    createdAt: '2026-04-03',
    permissions: {
      Movies: ['read'],
      Events: ['read'],
      Venues: ['read'],
      Bookings: ['read', 'approve'],
      Refunds: ['read', 'approve', 'export'],
      Users: ['read'],
      Reports: ['read', 'export'],
      'Feature Flags': ['read'],
      'Audit Logs': ['read', 'export'],
      Pricing: ['read', 'approve'],
      Promotions: ['read', 'approve'],
      Settings: ['read'],
    },
  },
]

export const auditLogsMock: AuditLogItem[] = [
  {
    id: 'audit-001',
    actionType: 'update',
    actor: 'Mina Patel',
    resource: 'Role: Operations Lead',
    ipAddress: '10.14.6.22',
    timestamp: '2026-07-26 10:14',
    environment: 'Production',
    severity: 'High',
    oldValue: 'Refund approval disabled',
    newValue: 'Refund approval enabled',
    details: 'Operations lead updated the approval workflow for refund queues.',
  },
  {
    id: 'audit-002',
    actionType: 'create',
    actor: 'Rohan Desai',
    resource: 'Feature Flag: Early Access',
    ipAddress: '10.14.6.88',
    timestamp: '2026-07-25 18:40',
    environment: 'Staging',
    severity: 'Medium',
    oldValue: 'Not present',
    newValue: 'Enabled for staging',
    details: 'Created a new feature flag for the upcoming launch experiment.',
  },
  {
    id: 'audit-003',
    actionType: 'approve',
    actor: 'Nisha Kumar',
    resource: 'Refund Request: rf-201',
    ipAddress: '10.14.7.01',
    timestamp: '2026-07-25 16:12',
    environment: 'Production',
    severity: 'Low',
    oldValue: 'Pending',
    newValue: 'Approved',
    details: 'Finance review approved the refund request after policy review.',
  },
  {
    id: 'audit-004',
    actionType: 'export',
    actor: 'Arjun Vora',
    resource: 'Revenue Report',
    ipAddress: '10.14.8.55',
    timestamp: '2026-07-24 13:07',
    environment: 'Development',
    severity: 'Low',
    oldValue: 'No export',
    newValue: 'CSV generated',
    details: 'Exported the weekly revenue report for review.',
  },
]

export const reportsMetricsMock: ReportMetricItem[] = [
  { id: 'rev', title: 'Revenue', value: '₹4.2M', change: '+12.4%', tone: 'success', description: 'Rolling 30-day revenue' },
  { id: 'bookings', title: 'Bookings', value: '24.8K', change: '+8.2%', tone: 'info', description: 'Confirmed reservations' },
  { id: 'refunds', title: 'Refunds', value: '182', change: '-3.1%', tone: 'warning', description: 'Pending review queue' },
  { id: 'occupancy', title: 'Occupancy', value: '81%', change: '+6.7%', tone: 'default', description: 'Average venue fill rate' },
]

export const featureFlagsMock: FeatureFlagItem[] = [
  {
    id: 'ff-001',
    name: 'Early Access Checkout',
    description: 'Rolls out a faster payment experience for premium users.',
    environment: 'Production',
    owner: 'Asha Mehta',
    status: 'enabled',
    lastUpdated: '2026-07-23',
    category: 'Payments',
  },
  {
    id: 'ff-002',
    name: 'Venue Spotlight',
    description: 'Highlights new venues in discovery panels.',
    environment: 'Staging',
    owner: 'Rohan Desai',
    status: 'scheduled',
    lastUpdated: '2026-07-20',
    category: 'Discovery',
  },
  {
    id: 'ff-003',
    name: 'Dynamic Pricing Preview',
    description: 'Shows experimental pricing suggestions to ops staff.',
    environment: 'Development',
    owner: 'Nisha Kumar',
    status: 'disabled',
    lastUpdated: '2026-07-18',
    category: 'Pricing',
  },
]
