export interface User {
  id: string
  email: string
  name: string
}

export interface Movie {
  id: string
  title: string
  slug: string
}

export interface Event {
  id: string
  title: string
  slug: string
  vendorId?: string
  description?: string
  category?: string
  venue?: string
  date?: string
  status?: 'approved' | 'pending' | 'rejected'
}

export interface Vendor {
  id: string
  name: string
  email: string
  company: string
  role: 'vendor'
  status: 'active' | 'inactive'
}

export interface VendorRequest {
  requestId: string
  vendorId: string
  eventId?: string
  requestType: 'CREATE_EVENT' | 'UPDATE_EVENT' | 'DELETE_EVENT'
  oldData?: Partial<Event>
  newData?: Partial<Event>
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
  approvedAt?: string
  approvedBy?: string
  rejectionReason?: string
}

export interface NotificationItem {
  id: string
  vendorId: string
  title: string
  message: string
  read: boolean
  createdAt: string
}

export interface Venue {
  id: string
  name: string
  city: string
}

export interface Showtime {
  id: string
  movieId: string
  venueId: string
  startTime: Date
}

export interface Booking {
  id: string
  userId: string
  showtimeId: string
  status: 'pending' | 'confirmed' | 'cancelled'
}
