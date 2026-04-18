import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './users.entity';
import { RolesEnum } from '../enum/roles.enum';

@Entity()
export class Credential {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true })
  username!: string;

  @Column({ type: 'varchar' })
  password!: string;

  @Column({
    type: 'enum',
    enum: RolesEnum,
    default: RolesEnum.USER,
  })
  role!: RolesEnum;

  @OneToOne(() => User, (user) => user.credential)
  user!: User;
}