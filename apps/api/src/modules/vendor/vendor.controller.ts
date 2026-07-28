import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { VendorService } from './vendor.service'

@Controller()
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get('vendor/events')
  getVendorEvents(@Req() req: any) {
    return this.vendorService.getVendorEvents(req.user?.vendorId)
  }

  @Post('vendor/events/request')
  createVendorRequest(@Body() body: any, @Req() req: any) {
    return this.vendorService.createVendorRequest({ ...body, vendorId: req.user?.vendorId })
  }

  @Patch('vendor/events/request')
  updateVendorRequest(@Body() body: any, @Req() req: any) {
    return this.vendorService.updateVendorRequest({ ...body, vendorId: req.user?.vendorId })
  }

  @Delete('vendor/events/request/:id')
  deleteVendorRequest(@Param('id') id: string, @Req() req: any) {
    return this.vendorService.deleteVendorRequest(id, req.user?.vendorId)
  }

  @Get('vendor/requests')
  getVendorRequests(@Req() req: any) {
    return this.vendorService.getVendorRequests(req.user?.vendorId)
  }

  @Get('vendor/notifications')
  getVendorNotifications(@Req() req: any) {
    return this.vendorService.getVendorNotifications(req.user?.vendorId)
  }

  @Get('admin/vendor-requests')
  getAllVendorRequests() {
    return this.vendorService.getAllRequests()
  }

  @Patch('admin/vendor-requests/:id/approve')
  approveVendorRequest(@Param('id') id: string) {
    return this.vendorService.approveRequest(id, 'admin')
  }

  @Patch('admin/vendor-requests/:id/reject')
  rejectVendorRequest(@Param('id') id: string, @Body() body: { rejectionReason?: string }) {
    return this.vendorService.rejectRequest(id, body.rejectionReason || 'Request rejected by admin', 'admin')
  }
}
