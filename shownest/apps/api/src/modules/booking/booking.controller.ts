import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { AuthGuard } from '../identity/identity.guard';

@Controller('api/bookings')
@UseGuards(AuthGuard)
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post('checkout')
  async checkout(@Req() req: any, @Body() body: any) {
    return this.bookingService.checkout(req.user.id, body);
  }

  @Get('my')
  async getMyBookings(@Req() req: any) {
    return this.bookingService.getMyBookings(req.user.id);
  }
}
