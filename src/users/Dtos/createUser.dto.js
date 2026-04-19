"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreatedUserDto = void 0;
var class_validator_1 = require("class-validator");
var matchPassword_decorator_1 = require("../decorators/matchPassword.decorator");
var swagger_1 = require("@nestjs/swagger");
var CreatedUserDto = /** @class */ (function () {
    function CreatedUserDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Pedro' }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Matches)(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/),
        (0, class_validator_1.MinLength)(3),
        (0, class_validator_1.MaxLength)(25)
    ], CreatedUserDto.prototype, "name");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Alba' }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Matches)(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/),
        (0, class_validator_1.MinLength)(3),
        (0, class_validator_1.MaxLength)(25)
    ], CreatedUserDto.prototype, "lastname");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'carrera 22 46a 10 sur' }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(8)
    ], CreatedUserDto.prototype, "address");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'usuario@example.com' }),
        (0, class_validator_1.IsEmail)()
    ], CreatedUserDto.prototype, "email");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 3204798374 }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsInt)()
    ], CreatedUserDto.prototype, "phoneNumber");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '08/07/1991' }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.Matches)(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/)
    ], CreatedUserDto.prototype, "birthDate");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'angie.alba' }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)()
    ], CreatedUserDto.prototype, "username");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Password123!' }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/)
    ], CreatedUserDto.prototype, "password");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Password123!' }),
        (0, class_validator_1.Validate)(matchPassword_decorator_1.MatchPassword, ['password'])
    ], CreatedUserDto.prototype, "confirmPassword");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'USER', required: false }),
        (0, class_validator_1.IsOptional)()
    ], CreatedUserDto.prototype, "role");
    return CreatedUserDto;
}());
exports.CreatedUserDto = CreatedUserDto;
