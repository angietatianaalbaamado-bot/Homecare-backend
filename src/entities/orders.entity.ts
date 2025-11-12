import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './users.entity';
import { OrderDetail } from './orderDetail.entity';

export enum StatusOrder {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  addressDelivery: string;

  @CreateDateColumn()
  dateCreated: Date;

  @Column({ type: 'enum', enum: StatusOrder, default: StatusOrder.PENDING })
  statusOrder: StatusOrder;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];
}