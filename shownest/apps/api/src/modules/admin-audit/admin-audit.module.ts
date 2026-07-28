import { Module } from '@nestjs/common'
import { AdminController } from './admin.controller'
import { AdminAuditService } from './admin-audit.service'
import { IdentityModule } from '../identity/identity.module'

@Module({
  imports: [IdentityModule],
  controllers: [AdminController],
  providers: [AdminAuditService],
})
export class AdminAuditModule {}
