import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../core/products/entities/product.entity';
import { ProductRepositoryPort } from '../core/products/ports/product-repository.port';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(ProductRepositoryPort)
    private readonly productRepository: ProductRepositoryPort,
  ) {}
  async execute(command: {
    name: string;
    qty: number;
    description: string;
  }): Promise<void> {
    const product = new Product({
      name: command.name,
      qty: command.qty,
      description: command.description,
    });
    await this.productRepository.save(product);
  }
}
