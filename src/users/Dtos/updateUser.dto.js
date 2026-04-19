"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateUserDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var createUser_dto_1 = require("./createUser.dto");
var swagger_2 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var UpdateUserDto = /** @class */ (function (_super) {
    __extends(UpdateUserDto, _super);
    function UpdateUserDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, swagger_2.ApiProperty)({
            description: 'UUID del usuario a actualizar',
            example: '550e8400-e29b-41d4-a716-446655440000',
            format: 'uuid'
        }),
        (0, class_validator_1.IsNotEmpty)({ message: 'El id del usuario es obligatorio' }),
        (0, class_validator_1.IsUUID)('4', { message: 'El id del usuario debe tener un formato UUID' })
    ], UpdateUserDto.prototype, "uuid");
    __decorate([
        (0, swagger_2.ApiProperty)({
            description: 'Correo electrónico del usuario',
            example: 'usuario@example.com'
        }),
        (0, class_validator_1.IsEmail)({}, { message: 'El email debe tener un formato de correo electrónico válido' }),
        (0, class_validator_1.IsNotEmpty)({ message: 'El email es obligatorio' })
    ], UpdateUserDto.prototype, "email");
    __decorate([
        (0, swagger_2.ApiProperty)({
            description: 'Nombre de usuario para autenticación',
            example: 'angie.alba',
            required: false
        }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)({ message: 'El nombre de usuario debe ser una cadena de caracteres' })
    ], UpdateUserDto.prototype, "userName");
    __decorate([
        (0, swagger_2.ApiProperty)({
            description: 'Número de teléfono del usuario',
            example: 3204798374,
            required: false
        }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsInt)({ message: 'El número de teléfono debe ser un entero' })
    ], UpdateUserDto.prototype, "phoneNumber");
    return UpdateUserDto;
}((0, swagger_1.PartialType)(createUser_dto_1.CreatedUserDto)));
exports.UpdateUserDto = UpdateUserDto;
