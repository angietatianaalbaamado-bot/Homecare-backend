import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from '../users/users.entity'; // 👈 CORREGIDO: ruta correcta
import { RolesEnum } from 'src/enum/roles.enum';

@Entity({ name: 'credentials' })
export class Credential {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  userName: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({
    type: 'enum',
    enum: RolesEnum,
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  // 🔹 Relación 1:1 con User (lado inverso)
  @OneToOne(() => User, (user) => user.credential)
  user: User;
}
