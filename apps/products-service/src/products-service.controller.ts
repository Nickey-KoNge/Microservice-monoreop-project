//products-service/src/products-service.controller.ts
import { Controller, Inject, NotFoundException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductUseCase } from './use-cases/create-product.usecase';
import { CreateProductDto } from './dtos/create-product.dto';
import { GetProductByIdUseCase } from './use-cases/get-products-by-id.usecase';

@Controller()
export class ProductsController {
  constructor(
    @Inject(CreateProductUseCase)
    private readonly createProductUseCase: CreateProductUseCase,
    @Inject(GetProductByIdUseCase)
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
  ) {}

  @MessagePattern('create_product')
  async create(@Payload() data: CreateProductDto) {
    console.log('Products Service: creating product', data);
    try {
      await this.createProductUseCase.execute(data);
      return { success: true, message: 'Product created successfully!' };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }

      return { success: false, message: String(error) };
    }
  }
  @MessagePattern('get_product_by_id')
  async getById(@Payload() data: { productId: string }) {
    console.log('Products Service: getting product by ID', data.productId);
    try {
      return await this.getProductByIdUseCase.execute(data.productId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { error: 'Not Found', message: error.message };
      }
      return { error: 'Internal Server Error', message: String(error) };
    }
  }
}
