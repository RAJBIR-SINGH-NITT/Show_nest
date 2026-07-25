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
