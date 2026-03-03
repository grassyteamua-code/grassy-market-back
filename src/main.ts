import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { corsOptions } from './config/cors-options.config';

const PORT = process.env.PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsOptions);
  app.setGlobalPrefix('api');

  Logger.log(`Сервер було запущено на порту: ${PORT}`);

  await app.listen(PORT, () =>
    console.log(`Сервер було запущено на порту: ${PORT}`),
  );
}
bootstrap().catch((error) => console.error(error));
