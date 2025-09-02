import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:3000'],
      methods: 'GET,POST'
    }
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();