import { Module } from '@nestjs/common';
import { ProductsController } from './products-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOrmEntity } from './infrastructure/persistence/entities/product.orm-entity';
import { ProductRepositoryPort } from './core/products/ports/product-repository.port';
import { TypeOrmProductRepository } from './infrastructure/persistence/repositories/product.repository';
import { CreateProductUseCase } from './use-cases/create-product.usecase';
import { GetProductByIdUseCase } from './use-cases/get-products-by-id.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrmEntity])],
  controllers: [ProductsController],
  providers: [
    CreateProductUseCase,
    GetProductByIdUseCase,
    {
      provide: ProductRepositoryPort,
      useClass: TypeOrmProductRepository,
    },
  ],
})
export class ProductsServiceModule {}
