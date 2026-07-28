export type VendorRequestType = 'create' | 'update' | 'delete'
export type VendorRequestStatus = 'pending' | 'approved' | 'rejected'

export interface VendorEventRecord {
  id: string
  title: string
  venue: string
  status: 'live' | 'pending' | 'draft'
  description: string
  category: string
  createdAt: string
}

export interface VendorRequestRecord {
  id: string
  vendorName: string
  vendorEmail: string
  requestType: VendorRequestType
  eventInfo: string
  oldData?: string | null
  newData?: string | null
  status: VendorRequestStatus
  createdAt: string
  updatedAt: string
}

export interface VendorNotificationRecord {
  id: string
  title: string
  message: string
  createdAt: string
  status: 'unread' | 'read'
}
