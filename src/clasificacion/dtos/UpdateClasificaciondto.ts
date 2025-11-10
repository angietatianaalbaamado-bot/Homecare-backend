import { PartialType } from '@nestjs/swagger';
import { CreateClasificacionDto } from './createClasificacion.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateClasificacionDto extends PartialType(CreateClasificacionDto) {
  @ApiProperty({
    description: 'Nombre de la clasificación',
    example: 'Biodegradable',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El nombre de la clasificación debe ser una cadena de texto' })
  name?: string;

  // otras propiedades opcionales...
}
