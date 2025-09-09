// use-cases/get-product-by-id.usecase.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../core/products/entities/product.entity';
import { ProductRepositoryPort } from '../core/products/ports/product-repository.port';

@Injectable()
export class GetProductByIdUseCase {
  constructor(
    @Inject(ProductRepositoryPort)
    private readonly productRepository: ProductRepositoryPort,
  ) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found.`);
    }
    return product;
  }
}
