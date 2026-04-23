import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity('credential')
export class Credential {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  role!: string;

  @Column()
  user_id!: string;

  @OneToOne(() => User, (user) => user.credential)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user!: User;
}