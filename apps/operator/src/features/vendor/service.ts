import type { VendorEventRecord, VendorNotificationRecord, VendorRequestRecord } from './types'

const mockEvents: VendorEventRecord[] = [
  {
    id: 'EVT-1001',
    title: 'Neon Horizon Live',
    venue: 'Jio World Garden',
    status: 'live',
    description: 'World tour stop with premium seating.',
    category: 'Concert',
    createdAt: '2026-07-10',
  },
  {
    id: 'EVT-1002',
    title: 'Midnight Cinema Nights',
    venue: 'PVR Phoenix',
    status: 'pending',
    description: 'Exclusive preview screening.',
    category: 'Screening',
    createdAt: '2026-07-16',
  },
]

const mockRequests: VendorRequestRecord[] = [
  {
    id: 'REQ-2001',
    vendorName: 'Vendor Partner',
    vendorEmail: 'vendor@example.com',
    requestType: 'create',
    eventInfo: 'Neon Horizon Live',
    oldData: null,
    newData: 'Create event request pending admin review.',
    status: 'pending',
    createdAt: '2026-07-18T10:00:00.000Z',
    updatedAt: '2026-07-18T10:00:00.000Z',
  },
  {
    id: 'REQ-2002',
    vendorName: 'Vendor Partner',
    vendorEmail: 'vendor@example.com',
    requestType: 'update',
    eventInfo: 'Midnight Cinema Nights',
    oldData: 'Existing event listing',
    newData: 'Updated venue and schedule pending review.',
    status: 'approved',
    createdAt: '2026-07-20T09:30:00.000Z',
    updatedAt: '2026-07-21T12:00:00.000Z',
  },
]

const mockNotifications: VendorNotificationRecord[] = [
  {
    id: 'NTF-3001',
    title: 'Request submitted',
    message: 'Your CREATE_EVENT request has been received.',
    createdAt: '2026-07-18T10:05:00.000Z',
    status: 'unread',
  },
  {
    id: 'NTF-3002',
    title: 'Request approved',
    message: 'Your UPDATE_EVENT request was approved by the admin queue.',
    createdAt: '2026-07-21T12:05:00.000Z',
    status: 'read',
  },
]

export function getVendorEvents(): VendorEventRecord[] {
  return mockEvents
}

export function getVendorRequests(): VendorRequestRecord[] {
  return mockRequests
}

export function getVendorNotifications(): VendorNotificationRecord[] {
  return mockNotifications
}

export function createVendorRequest(request: Omit<VendorRequestRecord, 'id' | 'createdAt' | 'updatedAt'>): VendorRequestRecord {
  const record: VendorRequestRecord = {
    ...request,
    id: `REQ-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  mockRequests.unshift(record)
  return record
}
