// apps/api-gateway/src/api-gateway.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiProductsController } from './apiproduct/api-products.controller';

@Module({
  imports: [
    // ClientsModule ကိုသုံးပြီး တခြား microservice တွေနဲ့ ချိတ်ဆက်ဖို့ register လုပ်ပါတယ်
    ClientsModule.register([
      {
        // (၁) ချိတ်ဆက်မယ့် service အတွက် နာမည် (Injection Token) သတ်မှတ်ခြင်း
        name: 'USER_SERVICE', // Injection token
        // (၂) ဆက်သွယ်ရေး protocol ကို TCP အဖြစ် သတ်မှတ်ခြင်း
        transport: Transport.TCP,
        options: {
          // (၃) users-service ရဲ့တည်နေရာ (host နှင့် port) ကို သတ်မှတ်ခြင်း
          host: 'localhost',
          port: 3001, // Port of the users-service
        },
      },
      // ---- for product_service ----
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController, ApiProductsController],
})
export class ApiGatewayModule {}
