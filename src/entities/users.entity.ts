import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { Credential } from './credential.entity';
import { Order } from './orders.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @Column({ type: 'varchar', length: 50 })
  lastname!: string;

  @Column({ type: 'varchar', unique: true })
  email!: string;

  @Column({ type: 'bigint' })
  phoneNumber!: number;

  @Column({ type: 'varchar' })
  address!: string;

  @Column({ type: 'varchar' })
  birthDate!: string;

  @Column({ default: true })
  isActive!: boolean;

  @OneToOne(() => Credential, (credential) => credential.user)
  @JoinColumn()
  credential?: Credential;

  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[];
}