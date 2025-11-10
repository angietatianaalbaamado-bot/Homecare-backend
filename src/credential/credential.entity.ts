 import { RolesEnum } from '../enum/roles.enum';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../entities/users.entity';

@Entity({ name: 'credential' })
export class Credential {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Nombre de usuario único
  @Column({ type: 'varchar', length: 100, unique: true })
  userName: string;

  // Contraseña (se guardará encriptada con bcrypt)
  @Column({ type: 'varchar', length: 100 })
  password: string;

  // Rol del usuario, usando enum RolesEnum
  @Column({
    type: 'enum',
    enum: RolesEnum,
    default: RolesEnum.USER, // Valor por defecto: usuario estándar
  })
  role: RolesEnum;

  // Relación 1:1 con User (cada usuario tiene sus credenciales)
  @OneToOne(() => User, (user) => user.credential, {
    onDelete: 'CASCADE', // Si se borra el usuario, se eliminan sus credenciales
  })
  @JoinColumn()
  user: User;
}
