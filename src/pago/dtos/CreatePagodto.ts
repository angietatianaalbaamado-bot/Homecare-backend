import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePagoDto {
  @ApiProperty({ example: 15000 })
  @IsNotEmpty()
  @IsNumber()
  monto: number;

  @ApiProperty({ example: '12345ABC' })
  @IsNotEmpty()
  referencia: string;

  // Agrega más propiedades según tu modelo de pago
}
