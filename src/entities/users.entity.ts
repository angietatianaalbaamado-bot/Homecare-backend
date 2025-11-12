import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Order } from './orders.entity';
import { Credential } from '../credential/credential.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;  // ⚠️ Cambiado de 'id' a 'uuid'

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => Credential, (credential) => credential.user)
  credential: Credential;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
