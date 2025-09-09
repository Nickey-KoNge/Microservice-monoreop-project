import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'products' })
export class ProductOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  qty: number;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
