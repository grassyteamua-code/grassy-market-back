import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsOptions } from './config/cors-options.config';

const PORT = process.env.PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsOptions);
  app.setGlobalPrefix('api');

  await app.listen(PORT, () =>
    console.log(`Сервер було запущено на порту: ${PORT}`),
  );
}
bootstrap().catch((error) => console.error(error));
