import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/db/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async checkout(userId: string, body: any) {
    const rawId = body.eventId || body.showtimeId;
    const rawSeats = body.seats;

    if (!rawId || !rawSeats) {
      throw new BadRequestException('Valid eventId/showtimeId and seats are required.');
    }

    // Determine seat count
    let numSeats = 1;
    if (Array.isArray(rawSeats)) {
      numSeats = rawSeats.length;
    } else {
      numSeats = parseInt(rawSeats);
    }

    if (isNaN(numSeats) || numSeats <= 0) {
      throw new BadRequestException('Invalid seats count.');
    }

    // Resolve eventId (if not a valid 24-character hexadecimal MongoDB ObjectId, use the first event)
    let eventId = rawId;
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(rawId);
    
    if (!isValidObjectId) {
      const firstEvent = await this.prisma.event.findFirst();
      if (!firstEvent) {
        throw new NotFoundException('No events found in the database to book.');
      }
      eventId = firstEvent.id;
    }

    try {
      const result = await this.prisma.$transaction(async (tx) => {
        // 1. Fetch the event
        const event = await tx.event.findUnique({
          where: { id: eventId }
        });

        if (!event) {
          throw new NotFoundException('The requested event does not exist.');
        }

        // 2. Check seat availability
        if (event.seatsAvailable < numSeats) {
          throw new BadRequestException('Not enough seats available to fulfill this booking.');
        }

        // 3. Decrement seatsAvailable in the event
        await tx.event.update({
          where: { id: eventId },
          data: {
            seatsAvailable: event.seatsAvailable - numSeats
          }
        });

        // 4. Calculate fee
        const totalFee = event.price * numSeats + 40.00;
        const firstWord = event.title.split(' ')[0].toUpperCase().replace(/[^A-Z0-9]/g, 'EVT');
        const ticketId = `TKT-${firstWord}-${Math.floor(10000 + Math.random() * 90000)}`;

        // 5. Create booking record
        const booking = await tx.booking.create({
          data: {
            userId,
            eventId,
            seats: numSeats,
            totalFee,
            ticketId,
            status: 'active'
          },
          include: {
            event: true
          }
        });

        return booking;
      });

      return {
        success: true,
        message: 'Booking created successfully!',
        data: result
      };

    } catch (error) {
      console.error('Checkout error:', error);
      throw error;
    }
  }

  async getMyBookings(userId: string) {
    const bookings = await this.prisma.booking.findMany({
      where: { userId },
      include: {
        event: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return {
      success: true,
      data: bookings
    };
  }
}
