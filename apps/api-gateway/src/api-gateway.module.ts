// apps/api-gateway/src/api-gateway.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiProductsController } from './apiproduct/api-products.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',

        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },

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
