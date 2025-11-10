import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './orders.entity';
import { Product } from './product.entity';

@Entity({ name: 'order_details' })
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  cant: number;

  @Column('decimal')
  subTotal: number;

  @Column('decimal')
  iva: number;

  @Column('decimal', { default: 0 })
  discount: number;

  @Column('decimal', { default: 0 })
  shippingFees: number;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderDetails)
  product: Product;
}
