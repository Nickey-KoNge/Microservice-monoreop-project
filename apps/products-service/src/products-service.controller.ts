//products-service/src/products-service.controller.ts
import { Controller, Inject, NotFoundException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductUseCase } from './use-cases/create-product.usecase'; // <-- UseCase ကို import လုပ်ပါ
import { CreateProductDto } from './dtos/create-product.dto'; // <-- DTO ကို import လုပ်ပါ
import { GetProductByIdUseCase } from './use-cases/get-products-by-id.usecase';

@Controller()
export class ProductsController {
  constructor(
    // (၁) Constructor တွင် CreateProductUseCase ကို inject လုပ်ပါ
    @Inject(CreateProductUseCase)
    private readonly createProductUseCase: CreateProductUseCase,
    @Inject(GetProductByIdUseCase)
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
  ) {}

  @MessagePattern('create_product')
  async create(@Payload() data: CreateProductDto) {
    // <-- data type ကို DTO သို့ ပြောင်းပါ
    console.log('Products Service: creating product', data);
    try {
      // (၂) Inject လုပ်ထားသော use case ကိုခေါ်ပြီး product အသစ်တည်ဆောက်ပါ
      await this.createProductUseCase.execute(data);
      return { success: true, message: 'Product created successfully!' };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }
      // Error object မဟုတ်ပါက error ကို string အဖြစ် ပြောင်းပြီး return ပြန်ပါ
      return { success: false, message: String(error) };
    }
  }
  @MessagePattern('get_product_by_id')
  async getById(@Payload() data: { productId: string }) {
    console.log('Products Service: getting product by ID', data.productId);
    try {
      return await this.getProductByIdUseCase.execute(data.productId);
    } catch (error) {
      // Use case က NotFoundException ပစ်လိုက်ရင် အဲ့ error ကို ပြန်ပို့ပေးပါ
      if (error instanceof NotFoundException) {
        return { error: 'Not Found', message: error.message };
      }
      return { error: 'Internal Server Error', message: String(error) };
    }
  }
}
