import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../../core/products/entities/product.entity';
import { ProductRepositoryPort } from '../../../core/products/ports/product-repository.port';
import { ProductOrmEntity } from '../entities/product.orm-entity';

@Injectable()
export class TypeOrmProductRepository implements ProductRepositoryPort {
  constructor(
    @InjectRepository(ProductOrmEntity)
    private readonly productRepository: Repository<ProductOrmEntity>,
  ) {}
  async save(product: Product): Promise<void> {
    const productOrmEntity = this.productRepository.create(product);
    await this.productRepository.save(productOrmEntity);
  }
  async findById(id: string): Promise<Product | null> {
    const productEntity = await this.productRepository.findOneBy({ id });
    if (!productEntity) {
      return null;
    }
    return new Product({ ...productEntity });
  }
}
