import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../shared/db/prisma.service';

@Injectable()
export class ReportingService {
  constructor(private prisma: PrismaService) {}

  async getVendorEvents(vendorId: string, role: string) {
    if (role !== 'vendor' && role !== 'admin') {
      throw new ForbiddenException('Access denied. Only vendors or administrators can access this resource.');
    }

    const events = await this.prisma.event.findMany({
      where: { vendorId },
      include: {
        ratings: true,
        bookings: true
      },
      orderBy: {
        date: 'asc'
      }
    });

    return {
      success: true,
      data: events
    };
  }
}
