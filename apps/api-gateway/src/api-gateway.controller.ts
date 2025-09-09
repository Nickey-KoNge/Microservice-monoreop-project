// apps/api-gateway/src/api-gateway.controller.ts
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class ApiGatewayController {
  constructor(
    // (၁) Module မှာ သတ်မှတ်ခဲ့တဲ့ 'USER_SERVICE' token ကိုသုံးပြီး client ကို inject လုပ်ခြင်း
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @Get(':id')
  getUserById(@Param('id') id: string) {
    console.log('API Gateway received request for user ID:', id);

    // Send a message to the users-service
    // The pattern 'get_user' must match the @MessagePattern in the microservice
    // (၂) Inject လုပ်ထားတဲ့ client ကိုသုံးပြီး users-service ဆီ Message ပို့လွှတ်ခြင်း
    return this.userServiceClient.send('get_user', { userId: id });
  }
}
