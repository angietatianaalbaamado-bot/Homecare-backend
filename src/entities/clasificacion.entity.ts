import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Clasificacion {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;      // Clave primaria única

  @Column()
  title: string;     // Nombre o título de la clasificación

  @Column({ nullable: true })
  description?: string;  // Opcional, descripción de la clasificación
}
