import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../entities/users.entity';

@Entity()
export class Credential {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToOne(() => User, (user) => user.credential)
  @JoinColumn()
  user: User;
}
