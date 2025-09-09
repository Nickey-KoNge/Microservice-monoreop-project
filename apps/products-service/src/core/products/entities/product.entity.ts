import { randomUUID } from 'crypto';

export class Product {
  readonly id: string;
  readonly name: string;
  readonly qty: number;
  readonly description: string;
  readonly createdAt: Date;

  constructor(props: { name: string; qty: number; description: string }) {
    this.id = randomUUID();
    this.name = props.name;
    this.qty = props.qty;
    this.description = props.description;
    this.createdAt = new Date();
  }
}
