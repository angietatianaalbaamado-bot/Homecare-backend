import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
  IsOptional,
} from 'class-validator';
import { MatchPassword } from '../../decorators/matchPassword.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatedUserDto {
  @ApiProperty({ example: 'Pedro' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)
  @MinLength(3)
  @MaxLength(25)
  name!: string;

  @ApiProperty({ example: 'Alba' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)
  @MinLength(3)
  @MaxLength(25)
  lastname!: string;

  @ApiProperty({ example: 'carrera 22 46a 10 sur' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  address!: string;

  @ApiProperty({ example: 'usuario@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 3204798374 })
  @IsNotEmpty()
  @IsInt()
  phoneNumber!: number;

  @ApiProperty({ example: '08/07/1991' })
  @IsNotEmpty()
  @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/)
  birthDate!: string;

  @ApiProperty({ example: 'angie.alba' })
  @IsNotEmpty()
  @IsString()
  username!: string;

  @ApiProperty({ example: 'Password123!' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/)
  password!: string;

  @ApiProperty({ example: 'Password123!' })
  @Validate(MatchPassword, ['password'])
  confirmPassword!: string;

  @ApiProperty({ example: 'USER', required: false })
  @IsOptional()
  role?: string;
}