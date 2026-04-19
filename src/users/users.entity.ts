import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Credential } from '../entities/credential.entity';
import { Order } from '../entities/orders.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'bigint', nullable: false })
  phoneNumber: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  address: string;

  @Column({ type: 'date', nullable: false })
  birthDate: Date;

  @Column({ default: true })
  isActive: boolean;

  // 🔹 Relación 1:1 con Credential
  @OneToOne(() => Credential, (credential) => credential.user, { eager: true })
  @JoinColumn()
  credential: Credential;

  // 🔹 Relación 1:N con Orders
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}