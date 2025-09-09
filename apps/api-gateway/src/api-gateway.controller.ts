// apps/api-gateway/src/api-gateway.controller.ts
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class ApiGatewayController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @Get(':id')
  getUserById(@Param('id') id: string) {
    console.log('API Gateway received request for user ID:', id);

    return this.userServiceClient.send('get_user', { userId: id });
  }
}
