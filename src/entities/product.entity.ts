import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderDetail } from './orderDetail.entity';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column({ nullable: true })
  name!: string;

  @Column('decimal', { nullable: true })
  price!: number;

  @Column({ default: true, nullable: true })
  isActive!: boolean;

  @Column({ default: 0, nullable: true })
  stock!: number;

  @OneToMany(() => OrderDetail, (detail) => detail.product)
  orderDetails!: OrderDetail[];

  @Column({ nullable: true })
  description!: string;
}