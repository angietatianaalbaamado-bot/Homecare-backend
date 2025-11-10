import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsInt,
  IsUrl,
  IsOptional,
  MaxLength,
  MinLength,
  Min,
} from 'class-validator';

export class CreatedProductDto {
  @ApiProperty({
    description: 'Nombre del producto de aseo o cuidado personal',
    example: 'Shampoo Herbal Natural',
    maxLength: 100,
    minLength: 3,
  })
  @IsNotEmpty({
    message:
      'El nombre del producto es obligatorio, ya que identifica el artículo dentro del catálogo de productos de aseo y cuidado personal.',
  })
  @IsString({
    message:
      'El nombre debe ser una cadena de texto válida, por ejemplo: “Detergente Multiusos” o “Jabón Antibacterial”.',
  })
  @MinLength(3, {
    message:
      'El nombre debe tener mínimo 3 caracteres para que sea claro y descriptivo.',
  })
  @MaxLength(100, {
    message:
      'El nombre no puede tener más de 100 caracteres, ya que debe ser breve y fácil de reconocer en el sistema.',
  })
  name: string;

  @ApiProperty({
    description: 'Precio del producto en pesos colombianos',
    example: 8000.99,
    minimum: 0.06,
  })
  @IsNotEmpty({
    message:
      'El precio del producto es obligatorio, ya que indica el valor del artículo para su venta.',
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'El precio debe ser un número válido con máximo dos decimales (por ejemplo: 12500.50).',
    },
  )
  @IsPositive({
    message:
      'El precio debe ser un número positivo, ya que representa el costo del producto de aseo o cuidado personal.',
  })
  price: number;

  @ApiProperty({
    description:
      'Descripción detallada del producto de aseo o cuidado personal',
    example:
      'Aseo completo para el hogar que incluye detergente, desinfectante y limpiador multiusos.',
    minLength: 10,
  })
  @IsNotEmpty({
    message:
      'La descripción del producto es obligatoria para informar sus características y beneficios.',
  })
  @IsString({
    message:
      'La descripción debe ser una cadena de texto válida que explique el uso o los componentes del producto.',
  })
  @MinLength(10, {
    message:
      'La descripción debe tener al menos 10 caracteres para ofrecer información suficiente sobre el producto.',
  })
  description: string;

  @ApiProperty({
    description: 'URL de la imagen del producto',
    example: 'https://cdn-icons-png.flaticon.com/512/74/74472.png',
    required: false,
    default: 'https://cdn-icons-png.flaticon.com/512/74/74472.png',
  })
  @IsOptional()
  @IsUrl({}, {
    message:
      'La URL de la imagen debe ser válida y mostrar una foto representativa del producto de aseo o cuidado personal.',
  })
  imgUrl?: string;

  @ApiProperty({
    description: 'Cantidad de productos disponibles en stock',
    example: 30,
    minimum: 0,
  })
  @IsNotEmpty({
    message:
      'El stock del producto es obligatorio, ya que indica cuántas unidades están disponibles para la venta.',
  })
  @IsInt({
    message:
      'El stock debe ser un número entero que refleje la cantidad real de productos en inventario.',
  })
  @Min(0, {
    message:
      'El stock no puede ser negativo; debe ser cero o mayor para mantener la consistencia del inventario.',
  })
  stock: number;
}
