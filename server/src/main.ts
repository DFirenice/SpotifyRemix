import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:3000'],
      credentials: true,
      methods: 'GET,POST'
    }
  });

  const config = new DocumentBuilder()
    .setTitle('SpotRem Project')
    .setDescription('SpotRem API docs')
    .setVersion('1.0')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, documentFactory)

  app.use(cookieParser())

  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()