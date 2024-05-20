import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });
  const port = configService.get<number>('PORT', 3002);
  await app.listen(port);
  Logger.log(`Application is running on: ${await app.getUrl()}`);

  const server = app.getHttpServer();
  const router = server._events.request._router;
  router.stack.forEach((layer) => {
    if (layer.route) {
      console.log(layer.route);
    }
  });
}
bootstrap();
