"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateCategoryDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var UpdateCategoryDto = /** @class */ (function () {
    function UpdateCategoryDto() {
    }
    __decorate([
        (0, swagger_1.ApiPropertyOptional)({
            description: 'Nombre de la categoría',
            example: 'Bienestar',
            minLength: 3,
            maxLength: 100
        }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)({ message: 'El nombre debe ser una cadena de texto' }),
        (0, class_validator_1.MinLength)(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
        (0, class_validator_1.MaxLength)(100, { message: 'El nombre no debe superar los 100 caracteres' })
    ], UpdateCategoryDto.prototype, "name");
    return UpdateCategoryDto;
}());
exports.UpdateCategoryDto = UpdateCategoryDto;
