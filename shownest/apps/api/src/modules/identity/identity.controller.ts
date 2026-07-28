import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { AuthGuard } from './identity.guard';

@Controller('api/auth')
export class IdentityController {
  constructor(private identityService: IdentityService) {}

  @Post('register')
  async register(@Body() body: any) {
    return this.identityService.register(body);
  }

  @Post('login')
  async login(@Body() body: any) {
    return this.identityService.login(body);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Req() req: any) {
    return this.identityService.getProfile(req.user.id);
  }
}
