import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsArray,
  ArrayMinSize,
  MinLength,
  IsOptional,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// Clase para el detalle del producto en la orden
export class ProductOrderDetailDto {
  @ApiProperty({
    description: 'UUID del producto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4', { message: 'El ID del producto debe ser un UUID válido' })
  productId: string;

  @ApiProperty({
    description: 'Cantidad del producto',
    example: 2,
  })
  @IsNumber({}, { message: 'La cantidad debe ser un número' })
  quantity: number;

  @ApiProperty({
    description: 'Descuento aplicado',
    example: 5.0,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El descuento debe ser un número' })
  discount?: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'UUID del usuario que realiza la orden',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty({ message: 'El ID del usuario es requerido' })
  @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
  userId: string;

  @ApiProperty({
    description: 'Dirección de entrega de la orden',
    example: 'Carrera 22 46a 10 sur, Bogotá, Colombia',
    minLength: 10,
  })
  @IsNotEmpty({ message: 'La dirección de entrega es requerida' })
  @IsString({ message: 'La dirección debe ser una cadena de caracteres' })
  @MinLength(10, { message: 'La dirección debe tener mínimo 10 caracteres' })
  addressDelivery: string;

  @ApiProperty({
    description: 'Lista de productos con su información de detalle',
    type: 'array',
    example: [
      {
        productId: '123e4567-e89b-12d3-a456-426614174000',
        quantity: 2,
        discount: 5.0,
      },
      {
        productId: '660e8400-e29b-41d4-a716-446655440001',
        quantity: 1,
        discount: 0,
      },
    ],
  })
  @IsNotEmpty({ message: 'Los productos son requeridos' })
  @IsArray({ message: 'Los productos deben ser un arreglo' })
  @ArrayMinSize(1, { message: 'Debe incluir al menos un producto' })
  @ValidateNested({ each: true })
  @Type(() => ProductOrderDetailDto)
  products: ProductOrderDetailDto[];
}
