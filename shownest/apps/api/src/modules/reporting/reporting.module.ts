import { Module } from '@nestjs/common'
import { VendorController } from './vendor.controller'
import { ReportingService } from './reporting.service'
import { IdentityModule } from '../identity/identity.module'

@Module({
  imports: [IdentityModule],
  controllers: [VendorController],
  providers: [ReportingService],
})
export class ReportingModule {}
