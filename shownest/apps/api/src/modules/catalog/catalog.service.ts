import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/db/prisma.service';

@Injectable()
export class CatalogService {
  constructor(private prisma: PrismaService) {}

  async getAllEvents(query: any) {
    const { category, search } = query;

    const where: any = {};
    if (category) {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } }
      ];
    }

    const events = await this.prisma.event.findMany({
      where,
      include: {
        ratings: true,
        vendor: {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
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
