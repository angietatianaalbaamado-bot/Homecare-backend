import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClasificacionDto {
  @ApiProperty({
    description: 'Nombre de la clasificación',
    example: 'Biodegradable',
  })
  @IsNotEmpty({ message: 'El nombre de la clasificación es obligatorio' })
  @IsString()
  name: string;

  // otras propiedades aquí
}
