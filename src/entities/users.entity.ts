import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Credential } from './credential.entity';
import { Order } from './orders.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  lastName!: string;

  @Column({ nullable: true })
  address!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  phoneNumber!: number;

  @Column({ nullable: true })
  birthDate!: string;

  @Column({ default: true })
  isActive!: boolean;

  @OneToOne(() => Credential, (credential) => credential.user, { cascade: true })
  credential!: Credential;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];
}