import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Credential } from './credential.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'bigint' })
  phoneNumber: number;

  @Column({ type: 'date' })
  birthDate: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => Credential, (credential) => credential.user)
  credential: Credential;
}