import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = Number(process.env.PORT ?? 3001)

  app.getHttpAdapter().get('/', (_req, res) => {
    res.send('ShowNest API is running')
  })

  await app.listen(port)
  console.log(`API listening on http://localhost:${port}`)
}

bootstrap()
