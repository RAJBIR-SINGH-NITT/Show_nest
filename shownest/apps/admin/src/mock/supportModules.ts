export interface SupportDashboardMetric {
  id: string
  title: string
  value: string
  description: string
  tone: 'default' | 'info' | 'success' | 'warning'
}

export interface SupportRequestItem {
  id: string
  subject: string
  customer: string
  priority: 'High' | 'Medium' | 'Low'
  status: 'Open' | 'Awaiting Reply' | 'Escalated'
  createdAt: string
  category: string
}

export interface BookingIssueItem {
  id: string
  bookingId: string
  customer: string
  issue: string
  time: string
  status: string
}

export interface RefundRequestItem {
  id: string
  bookingId: string
  customer: string
  amount: number
  status: string
  time: string
}

export interface PaymentFailureItem {
  id: string
  bookingId: string
  customer: string
  amount: number
  status: string
  time: string
}

export interface ComplaintItem {
  id: string
  customer: string
  summary: string
  status: string
}

export interface SupportActivityItem {
  id: string
  title: string
  detail: string
  time: string
  severity: 'info' | 'warning' | 'success'
}

export interface SupportNoteItem {
  id: string
  author: string
  note: string
  status: string
  timestamp: string
  tag: string
}

export interface GateEventItem {
  id: string
  title: string
  venue: string
  gate: string
  session: string
  capacity: number
  checkedIn: number
  remaining: number
  occupancy: number
}

export interface GateHistoryItem {
  id: string
  visitor: string
  time: string
  status: string
  gate: string
}

export const supportDashboardMetricsMock: SupportDashboardMetric[] = [
  { id: 'queue', title: 'Open Queue', value: '24', description: 'Active support requests', tone: 'warning' },
  { id: 'refunds', title: 'Refunds', value: '8', description: 'Pending review', tone: 'info' },
  { id: 'payments', title: 'Failed Payments', value: '3', description: 'Needs customer follow-up', tone: 'warning' },
  { id: 'satisfaction', title: 'Resolution', value: '92%', description: 'First-response SLA', tone: 'success' },
]

export const supportRequestsMock: SupportRequestItem[] = [
  { id: 'sr-001', subject: 'Ticket not received', customer: 'Riya Sharma', priority: 'High', status: 'Open', createdAt: '10m ago', category: 'Ticketing' },
  { id: 'sr-002', subject: 'Seat reassignment request', customer: 'Arjun Rao', priority: 'Medium', status: 'Awaiting Reply', createdAt: '32m ago', category: 'Booking' },
  { id: 'sr-003', subject: 'Duplicate payment attempt', customer: 'Nisha Kadam', priority: 'High', status: 'Escalated', createdAt: '1h ago', category: 'Payments' },
]

export const bookingIssuesMock: BookingIssueItem[] = [
  { id: 'bi-001', bookingId: 'BK-1042', customer: 'Ankit Verma', issue: 'Check-in failed for premium guest', time: '08:20', status: 'Under review' },
  { id: 'bi-002', bookingId: 'BK-1043', customer: 'Meera Iyer', issue: 'Refund request after schedule change', time: '09:05', status: 'Pending refund' },
  { id: 'bi-003', bookingId: 'BK-1044', customer: 'Soham Das', issue: 'Duplicate reservation flagged', time: '10:10', status: 'Escalated' },
]

export const refundsPendingMock: RefundRequestItem[] = [
  { id: 'rf-301', bookingId: 'BK-1043', customer: 'Meera Iyer', amount: 1800, status: 'Pending', time: '09:05' },
  { id: 'rf-302', bookingId: 'BK-1048', customer: 'Pavan Kumar', amount: 950, status: 'Awaiting review', time: '11:30' },
]

export const paymentFailuresMock: PaymentFailureItem[] = [
  { id: 'pf-001', bookingId: 'BK-1051', customer: 'Maya Rao', amount: 2400, status: 'Retry pending', time: '07:55' },
  { id: 'pf-002', bookingId: 'BK-1052', customer: 'Dev Shah', amount: 1100, status: 'Manual review', time: '08:45' },
]

export const complaintsMock: ComplaintItem[] = [
  { id: 'c-001', customer: 'Pooja Nair', summary: 'Delayed ticket delivery', status: 'Open' },
  { id: 'c-002', customer: 'Vikram Sood', summary: 'Venue signage confusion', status: 'Escalated' },
]

export const supportActivitiesMock: SupportActivityItem[] = [
  { id: 'sa-001', title: 'Ticket resent', detail: 'Support team resent the QR code to the customer.', time: '08:12', severity: 'success' },
  { id: 'sa-002', title: 'Refund initiated', detail: 'Manual refund approved after duplicate charge detection.', time: '08:50', severity: 'warning' },
  { id: 'sa-003', title: 'Customer callback', detail: 'Support notes updated for follow-up in the next hour.', time: '09:20', severity: 'info' },
]

export const supportNotesMock: SupportNoteItem[] = [
  { id: 'note-001', author: 'Mina Patel', note: 'Customer requested a replacement QR after a delayed delivery.', status: 'Follow-up needed', timestamp: '2026-07-27 08:10', tag: 'Ticketing' },
  { id: 'note-002', author: 'Asha Singh', note: 'Venue attendee arrived 20 minutes late and was admitted manually.', status: 'Resolved', timestamp: '2026-07-27 09:00', tag: 'Gate' },
]

export const gateEventsMock: GateEventItem[] = [
  { id: 'gate-001', title: 'Midnight Premiere', venue: 'Phoenix Venue', gate: 'Gate A', session: 'Session 1', capacity: 320, checkedIn: 184, remaining: 136, occupancy: 58 },
  { id: 'gate-002', title: 'Live Sports Finale', venue: 'Arena Hall', gate: 'Gate C', session: 'Session 2', capacity: 560, checkedIn: 412, remaining: 148, occupancy: 74 },
]

export const gateHistoryMock: GateHistoryItem[] = [
  { id: 'gh-001', visitor: 'Riya Sharma', time: '08:14', status: 'Checked in', gate: 'Gate A' },
  { id: 'gh-002', visitor: 'Arjun Rao', time: '08:26', status: 'Duplicate scan', gate: 'Gate B' },
]
