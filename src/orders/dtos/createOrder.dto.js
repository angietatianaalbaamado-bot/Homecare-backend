"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateOrderDto = exports.ProductOrderDetailDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
// Clase para el detalle del producto en la orden
var ProductOrderDetailDto = /** @class */ (function () {
    function ProductOrderDetailDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'UUID del producto',
            example: '123e4567-e89b-12d3-a456-426614174000'
        }),
        (0, class_validator_1.IsUUID)('4', { message: 'El ID del producto debe ser un UUID válido' })
    ], ProductOrderDetailDto.prototype, "productId");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Cantidad del producto',
            example: 2
        }),
        (0, class_validator_1.IsNumber)({}, { message: 'La cantidad debe ser un número' })
    ], ProductOrderDetailDto.prototype, "quantity");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Descuento aplicado',
            example: 5.0,
            required: false
        }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNumber)({}, { message: 'El descuento debe ser un número' })
    ], ProductOrderDetailDto.prototype, "discount");
    return ProductOrderDetailDto;
}());
exports.ProductOrderDetailDto = ProductOrderDetailDto;
var CreateOrderDto = /** @class */ (function () {
    function CreateOrderDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'UUID del usuario que realiza la orden',
            example: '123e4567-e89b-12d3-a456-426614174000'
        }),
        (0, class_validator_1.IsNotEmpty)({ message: 'El ID del usuario es requerido' }),
        (0, class_validator_1.IsUUID)('4', { message: 'El ID del usuario debe ser un UUID válido' })
    ], CreateOrderDto.prototype, "userId");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Dirección de entrega de la orden',
            example: 'Carrera 22 46a 10 sur, Bogotá, Colombia',
            minLength: 10
        }),
        (0, class_validator_1.IsNotEmpty)({ message: 'La dirección de entrega es requerida' }),
        (0, class_validator_1.IsString)({ message: 'La dirección debe ser una cadena de caracteres' }),
        (0, class_validator_1.MinLength)(10, { message: 'La dirección debe tener mínimo 10 caracteres' })
    ], CreateOrderDto.prototype, "addressDelivery");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Lista de productos con su información de detalle',
            type: 'array',
            example: [
                {
                    productId: '123e4567-e89b-12d3-a456-426614174000',
                    quantity: 2,
                    discount: 5.0
                },
                {
                    productId: '660e8400-e29b-41d4-a716-446655440001',
                    quantity: 1,
                    discount: 0
                },
            ]
        }),
        (0, class_validator_1.IsNotEmpty)({ message: 'Los productos son requeridos' }),
        (0, class_validator_1.IsArray)({ message: 'Los productos deben ser un arreglo' }),
        (0, class_validator_1.ArrayMinSize)(1, { message: 'Debe incluir al menos un producto' }),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_transformer_1.Type)(function () { return ProductOrderDetailDto; })
    ], CreateOrderDto.prototype, "products");
    return CreateOrderDto;
}());
exports.CreateOrderDto = CreateOrderDto;
