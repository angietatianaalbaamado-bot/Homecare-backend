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
import { MatchPassword } from 'src/decorators/matchPassword.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatedUserDto {

  @ApiProperty({ example: 'Pedro' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)
  @MinLength(3)
  @MaxLength(25)
  name: string | undefined;

  @ApiProperty({ example: 'Alba' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)
  @MinLength(3)
  @MaxLength(25)
  lastname: string | undefined;

  @ApiProperty({ example: 'carrera 22 46a 10 sur' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  address: string | undefined;

  @ApiProperty({ example: 'usuario@example.com' })
  @IsEmail()
  email: string | undefined;

  @ApiProperty({ example: 3204798374 })
  @IsNotEmpty()
  @IsInt()
  phoneNumber: number | undefined;

  @ApiProperty({ example: '08/07/1991' })
  @IsNotEmpty()
  @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/)
  birthDate: string | undefined;

  // ✅ CORREGIDO
  @ApiProperty({ example: 'angie.alba' })
  @IsNotEmpty()
  @IsString()
  username: string | undefined;

  @ApiProperty({ example: 'Password123!' })
  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/,
  )
  password: string | undefined;

  @ApiProperty({ example: 'Password123!' })
  @Validate(MatchPassword, ['password'])
  confirmPassword: string | undefined;

  // ✅ CORREGIDO
  @ApiProperty({ example: 'USER', required: false })
  @IsOptional()
  role?: string;
}