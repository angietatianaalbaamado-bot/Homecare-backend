import { PartialType } from '@nestjs/swagger';
import { CreatedUserDto } from './createUser.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsUUID,
  IsEmail,
  IsOptional,
  IsString,
  IsInt,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreatedUserDto) {
  @ApiProperty({
    description: 'UUID del usuario a actualizar',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsNotEmpty({ message: 'El id del usuario es obligatorio' })
  @IsUUID('4', { message: 'El id del usuario debe tener un formato UUID' })
  uuid: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'usuario@example.com',
  })
  @IsEmail({}, { message: 'El email debe tener un formato de correo electrónico válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  @ApiProperty({
    description: 'Nombre de usuario para autenticación',
    example: 'angie.alba',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El nombre de usuario debe ser una cadena de caracteres' })
  userName?: string;

  @ApiProperty({
    description: 'Número de teléfono del usuario',
    example: 3204798374,
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'El número de teléfono debe ser un entero' })
  phoneNumber?: number;
  name: any;
  lastname: any;
  address: any;
  birthDate: any;
}
