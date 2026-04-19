"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var typeorm_1 = require("typeorm");
var credential_entity_1 = require("../entities/credential.entity");
var orders_entity_1 = require("../entities/orders.entity");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], User.prototype, "uuid");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false })
    ], User.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false })
    ], User.prototype, "lastName");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', unique: true, nullable: false })
    ], User.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)({ type: 'bigint', nullable: false })
    ], User.prototype, "phoneNumber");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false })
    ], User.prototype, "address");
    __decorate([
        (0, typeorm_1.Column)({ type: 'date', nullable: false })
    ], User.prototype, "birthDate");
    __decorate([
        (0, typeorm_1.Column)({ "default": true })
    ], User.prototype, "isActive");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return credential_entity_1.Credential; }, function (credential) { return credential.user; }, { eager: true }),
        (0, typeorm_1.JoinColumn)()
    ], User.prototype, "credential");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return orders_entity_1.Order; }, function (order) { return order.user; })
    ], User.prototype, "orders");
    User = __decorate([
        (0, typeorm_1.Entity)({ name: 'users' })
    ], User);
    return User;
}());
exports.User = User;
