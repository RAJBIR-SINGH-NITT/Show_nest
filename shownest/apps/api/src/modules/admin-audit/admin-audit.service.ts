import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../shared/db/prisma.service';

@Injectable()
export class AdminAuditService {
  constructor(private prisma: PrismaService) {}

  async getAllVendors(role: string) {
    if (role !== 'admin') {
      throw new ForbiddenException('Access denied. Administrator privileges required.');
    }

    const vendors = await this.prisma.user.findMany({
      where: { role: 'vendor' },
      select: {
        id: true,
        username: true,
        email: true,
        role: true
      },
      orderBy: {
        username: 'asc'
      }
    });

    return {
      success: true,
      data: vendors
    };
  }
}
