import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsOptions } from './config/cors-options.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT ?? 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsOptions);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  Logger.log(`Сервер було запущено на порту: ${PORT}`);

  await app.listen(PORT, () =>
    console.log(`Сервер було запущено на порту: ${PORT}`),
  );
}
bootstrap().catch((error) => console.error(error));
