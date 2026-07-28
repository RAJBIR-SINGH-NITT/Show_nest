import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DbModule } from './shared/db/db.module';
import { IdentityModule } from './modules/identity/identity.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { AdminAuditModule } from './modules/admin-audit/admin-audit.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    DbModule,
    IdentityModule,
    CatalogModule,
    AdminAuditModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
