// apps/users-service/src/users-service.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UsersServiceController {
  // Listens for the message pattern 'get_user'
  // (၁) 'get_user' ဆိုတဲ့ pattern နဲ့ဝင်လာတဲ့ message တွေကို နားထောင်ခြင်း
  @MessagePattern('get_user')
  // (၂) Message နဲ့ပါလာတဲ့ data (payload) ကို လက်ခံရယူခြင်း
  getUser(@Payload() data: { userId: string }): any {
    console.log('User ID received in users-service:', data.userId);

    // In a real app, you would fetch user data from a database
    // ဒီနေရာမှာ database ကနေ user data ကို တကယ်ရှာရမှာ ဖြစ်ပါတယ်
    // (၃) Response အဖြစ် user object ကို ပြန်ပေးခြင်း
    return {
      id: data.userId,
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
  }
}
