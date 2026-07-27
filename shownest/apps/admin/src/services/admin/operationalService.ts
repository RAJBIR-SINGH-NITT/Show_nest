import { bookingsMock, refundsMock, usersMock } from '@/mock/operationalModules'

export interface BookingRow {
  id: string
  customer: string
  movie: string
  venue: string
  showtime: string
  bookingDate: string
  seats: string
  amount: number
  bookingSource: string
  status: 'confirmed' | 'pending' | 'cancelled'
  paymentStatus: 'paid' | 'pending' | 'refunded'
}

export interface RefundRow {
  id: string
  bookingId: string
  customer: string
  reason: string
  requestedAmount: number
  approvedAmount: number
  paymentMethod: string
  requestDate: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  reviewer: string
}

export interface UserRow {
  id: string
  name: string
  email: string
  phone: string
  role: string
  status: 'active' | 'inactive' | 'locked'
  verification: 'verified' | 'pending'
  registrationDate: string
  lastLogin: string
}

export function getBookings(): BookingRow[] {
  return bookingsMock as BookingRow[]
}

export function getRefunds(): RefundRow[] {
  return refundsMock as RefundRow[]
}

export function getUsers(): UserRow[] {
  return usersMock as UserRow[]
}

export function getBookingById(id: string) {
  return bookingsMock.find((booking) => booking.id === id) as BookingRow | undefined
}

export function getRefundById(id: string) {
  return refundsMock.find((refund) => refund.id === id) as RefundRow | undefined
}

export function getUserById(id: string) {
  return usersMock.find((user) => user.id === id) as UserRow | undefined
}
