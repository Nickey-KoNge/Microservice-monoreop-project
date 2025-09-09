// apps/users-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
// import { ProductsServiceModule } from './products-service.module';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3002,
    },
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen();
  console.log('Products microservice is running');
}
void bootstrap();
