"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreatedProductDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CreatedProductDto = /** @class */ (function () {
    function CreatedProductDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Nombre del producto de aseo o cuidado personal',
            example: 'Shampoo Herbal Natural',
            maxLength: 100,
            minLength: 3
        }),
        (0, class_validator_1.IsNotEmpty)({
            message: 'El nombre del producto es obligatorio, ya que identifica el artículo dentro del catálogo de productos de aseo y cuidado personal.'
        }),
        (0, class_validator_1.IsString)({
            message: 'El nombre debe ser una cadena de texto válida, por ejemplo: “Detergente Multiusos” o “Jabón Antibacterial”.'
        }),
        (0, class_validator_1.MinLength)(3, {
            message: 'El nombre debe tener mínimo 3 caracteres para que sea claro y descriptivo.'
        }),
        (0, class_validator_1.MaxLength)(100, {
            message: 'El nombre no puede tener más de 100 caracteres, ya que debe ser breve y fácil de reconocer en el sistema.'
        })
    ], CreatedProductDto.prototype, "name");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Precio del producto en pesos colombianos',
            example: 8000.99,
            minimum: 0.06
        }),
        (0, class_validator_1.IsNotEmpty)({
            message: 'El precio del producto es obligatorio, ya que indica el valor del artículo para su venta.'
        }),
        (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, {
            message: 'El precio debe ser un número válido con máximo dos decimales (por ejemplo: 12500.50).'
        }),
        (0, class_validator_1.IsPositive)({
            message: 'El precio debe ser un número positivo, ya que representa el costo del producto de aseo o cuidado personal.'
        })
    ], CreatedProductDto.prototype, "price");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Descripción detallada del producto de aseo o cuidado personal',
            example: 'Aseo completo para el hogar que incluye detergente, desinfectante y limpiador multiusos.',
            minLength: 10
        }),
        (0, class_validator_1.IsNotEmpty)({
            message: 'La descripción del producto es obligatoria para informar sus características y beneficios.'
        }),
        (0, class_validator_1.IsString)({
            message: 'La descripción debe ser una cadena de texto válida que explique el uso o los componentes del producto.'
        }),
        (0, class_validator_1.MinLength)(10, {
            message: 'La descripción debe tener al menos 10 caracteres para ofrecer información suficiente sobre el producto.'
        })
    ], CreatedProductDto.prototype, "description");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'URL de la imagen del producto',
            example: 'https://cdn-icons-png.flaticon.com/512/74/74472.png',
            required: false,
            "default": 'https://cdn-icons-png.flaticon.com/512/74/74472.png'
        }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsUrl)({}, {
            message: 'La URL de la imagen debe ser válida y mostrar una foto representativa del producto de aseo o cuidado personal.'
        })
    ], CreatedProductDto.prototype, "imgUrl");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Cantidad de productos disponibles en stock',
            example: 30,
            minimum: 0
        }),
        (0, class_validator_1.IsNotEmpty)({
            message: 'El stock del producto es obligatorio, ya que indica cuántas unidades están disponibles para la venta.'
        }),
        (0, class_validator_1.IsInt)({
            message: 'El stock debe ser un número entero que refleje la cantidad real de productos en inventario.'
        }),
        (0, class_validator_1.Min)(0, {
            message: 'El stock no puede ser negativo; debe ser cero o mayor para mantener la consistencia del inventario.'
        })
    ], CreatedProductDto.prototype, "stock");
    return CreatedProductDto;
}());
exports.CreatedProductDto = CreatedProductDto;
