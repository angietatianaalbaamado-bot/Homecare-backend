"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Credential = void 0;
var typeorm_1 = require("typeorm");
var users_entity_1 = require("../users/users.entity"); // 👈 CORREGIDO: ruta correcta
var roles_enum_1 = require("../../../../../../../src/enum/roles.enum");
var Credential = /** @class */ (function () {
    function Credential() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], Credential.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true })
    ], Credential.prototype, "userName");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 255 })
    ], Credential.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            "enum": roles_enum_1.RolesEnum,
            "default": roles_enum_1.RolesEnum.USER
        })
    ], Credential.prototype, "role");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return users_entity_1.User; }, function (user) { return user.credential; })
    ], Credential.prototype, "user");
    Credential = __decorate([
        (0, typeorm_1.Entity)({ name: 'credentials' })
    ], Credential);
    return Credential;
}());
exports.Credential = Credential;
