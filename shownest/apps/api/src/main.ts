import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend requests
  app.enableCors();

  const port = process.env.PORT || 5001;
  await app.listen(port);
  
  console.log(`=========================================`);
  console.log(`  NestJS Server running on http://localhost:${port}`);
  console.log('  Connected to MongoDB via Prisma ORM');
  console.log(`  Press Ctrl+C to stop`);
  console.log(`=========================================`);
}
bootstrap();
