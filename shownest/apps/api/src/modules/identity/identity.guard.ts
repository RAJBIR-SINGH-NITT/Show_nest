import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Access denied. No authorization token provided.');
    }

    const token = authHeader.split(' ')[1];
    try {
      const secret = process.env.JWT_SECRET || 'e_cell_tech_team_29_super_secret_key_2026';
      const payload = await this.jwtService.verifyAsync(token, { secret });
      
      request.user = payload;
    } catch {
      throw new UnauthorizedException('Invalid or expired authorization token.');
    }

    return true;
  }
}
