import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return '<h1>🎟️ ShowNest NestJS API Server</h1><p>The backend NestJS API is running successfully! Please open the frontend application in your browser to sign in and book tickets.</p>';
  }
}
