import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderDetail } from './orderDetail.entity';
import { User } from './users.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column({ nullable: true })
  addressDelivery!: string;

  @Column({ default: 'PENDING' })
  status!: string;

  @ManyToOne(() => User, (user) => user.orders, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userUuid' })
  user!: User;

  @OneToMany(() => OrderDetail, (detail) => detail.order, { cascade: true })
  orderDetails!: OrderDetail[];
}