// apps/api-gateway/src/product/products.controller.ts
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ApiProductsController {
  constructor(
    @Inject('PRODUCT_SERVICE')
    private readonly productServiceClient: ClientProxy,
  ) {}
  @Get(':id')
  getProductById(@Param('id') id: string) {
    console.log('API Gateway: Get Product by ID:', id);
    // 'get_product_by_id' pattern ဖြင့် message ပို့ပါ
    return this.productServiceClient.send('get_product_by_id', {
      productId: id,
    });
  }

  @Post()
  createProduct(@Body() createProductDto: any) {
    console.log('API Gateway: Create Products');
    return this.productServiceClient.send('create_product', createProductDto);
  }
}
