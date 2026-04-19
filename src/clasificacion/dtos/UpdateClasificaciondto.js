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
exports.UpdateClasificacionDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var createClasificacion_dto_1 = require("./createClasificacion.dto");
var swagger_2 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var UpdateClasificacionDto = /** @class */ (function (_super) {
    __extends(UpdateClasificacionDto, _super);
    function UpdateClasificacionDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, swagger_2.ApiProperty)({
            description: 'Nombre de la clasificación',
            example: 'Biodegradable',
            required: false
        }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)({ message: 'El nombre de la clasificación debe ser una cadena de texto' })
    ], UpdateClasificacionDto.prototype, "name");
    return UpdateClasificacionDto;
}((0, swagger_1.PartialType)(createClasificacion_dto_1.CreateClasificacionDto)));
exports.UpdateClasificacionDto = UpdateClasificacionDto;
