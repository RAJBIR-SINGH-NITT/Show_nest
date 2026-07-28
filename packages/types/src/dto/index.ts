import { z } from 'zod'

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
})

export const CreateBookingSchema = z.object({
  showtimeId: z.string(),
  seatIds: z.array(z.string()),
})

export const VendorEventRequestSchema = z.object({
  vendorId: z.string(),
  eventId: z.string().optional(),
  requestType: z.enum(['CREATE_EVENT', 'UPDATE_EVENT', 'DELETE_EVENT']),
  oldData: z.record(z.any()).optional(),
  newData: z.record(z.any()).optional(),
})

export const AdminVendorRequestDecisionSchema = z.object({
  decision: z.enum(['approve', 'reject']),
  rejectionReason: z.string().optional(),
})
