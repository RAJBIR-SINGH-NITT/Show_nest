import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AdminAuditService } from './admin-audit.service';
import { AuthGuard } from '../identity/identity.guard';

@Controller('api/admin')
@UseGuards(AuthGuard)
export class AdminController {
  constructor(private adminAuditService: AdminAuditService) {}

  @Get('vendors')
  async getAllVendors(@Req() req: any) {
    return this.adminAuditService.getAllVendors(req.user.role);
  }
}
