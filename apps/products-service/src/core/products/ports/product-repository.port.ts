import { Product } from '../entities/product.entity';

export abstract class ProductRepositoryPort {
  abstract save(product: Product): Promise<void>;
  abstract findById(id: string): Promise<Product | null>;
}
