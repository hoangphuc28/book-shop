import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import {TransformInterceptor} from '@book-shop/libs'
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  app.setBaseViewsDir(join(__dirname, 'templates'));
  app.setViewEngine('ejs');

  const globalPrefix = 'api';
  const configService = app.get(ConfigService);
  app.setGlobalPrefix(globalPrefix);
  const port = configService.get('APPS.SERVER.CUSTOMER.PORT') || 3000;

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.use(cookieParser());



  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
