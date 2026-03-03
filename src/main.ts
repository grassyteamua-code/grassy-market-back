import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const options = {
  origin: ['http://localhost:5173'],
  method: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
  ],
  credential: true,
  optionsSuccessStatus: 200,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(options);
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap().catch((error) => console.error(error));
