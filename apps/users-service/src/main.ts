// apps/users-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { UsersServiceModule } from './users-service.module';

async function bootstrap() {
  // (၁) Nest application ကို web server အဖြစ်မဟုတ်ဘဲ microservice အဖြစ် တည်ဆောက်ခြင်း
  const app = await NestFactory.createMicroservice(UsersServiceModule, {
    // (၂) TCP protocol ကိုသုံးပြီး message တွေ နားထောင်မယ်လို့ သတ်မှတ်ခြင်း
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      // (၃) API Gateway ချိတ်ဆက်ရမယ့် port ကို သတ်မှတ်ခြင်း
      port: 3001, // Port for internal communication
    },
  });
  // (၄) Message တွေကို စတင်နားထောင်ခြင်း
  await app.listen();
  console.log('Users microservice is running');
}
void bootstrap();
