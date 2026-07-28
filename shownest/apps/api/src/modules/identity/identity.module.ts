import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { AuthGuard } from './identity.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'e_cell_tech_team_29_super_secret_key_2026',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [IdentityController],
  providers: [IdentityService, AuthGuard],
  exports: [JwtModule, AuthGuard],
})
export class IdentityModule {}
