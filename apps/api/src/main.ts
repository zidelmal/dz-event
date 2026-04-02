import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import * as qs from 'qs';
import { PrismaClientExceptionFilter } from './prisma/prisma-exception.filter';


async function bootstrap() {
  const server = express();
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    server.set('trust proxy', 1);
  }

  server.set('query parser', (str: string) => qs.parse(str));

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors({
    origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, Accept',
  });

  app.useGlobalFilters(new PrismaClientExceptionFilter());

  const port = Number(process.env.PORT) || 3001;
  await app.listen(port);
  console.log(`Server running on port ${port}`);
}

bootstrap();