import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ReportingService } from './reporting.service';
import { AuthGuard } from '../identity/identity.guard';

@Controller('api/vendor')
@UseGuards(AuthGuard)
export class VendorController {
  constructor(private reportingService: ReportingService) {}

  @Get('events')
  async getVendorEvents(@Req() req: any) {
    return this.reportingService.getVendorEvents(req.user.id, req.user.role);
  }
}
