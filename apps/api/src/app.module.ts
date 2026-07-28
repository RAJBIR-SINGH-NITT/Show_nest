import { Module } from '@nestjs/common'
import { VendorModule } from './modules/vendor/vendor.module'

@Module({
  imports: [VendorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
