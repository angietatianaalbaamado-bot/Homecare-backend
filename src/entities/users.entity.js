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
var credential_entity_1 = require("./credential.entity");
var orders_entity_1 = require("./orders.entity");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], User.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 50 })
    ], User.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 50 })
    ], User.prototype, "lastname");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', unique: true })
    ], User.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)({ type: 'bigint' })
    ], User.prototype, "phoneNumber");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar' })
    ], User.prototype, "address");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar' })
    ], User.prototype, "birthDate");
    __decorate([
        (0, typeorm_1.Column)({ "default": true })
    ], User.prototype, "isActive");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return credential_entity_1.Credential; }, function (credential) { return credential.user; }),
        (0, typeorm_1.JoinColumn)()
    ], User.prototype, "credential");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return orders_entity_1.Order; }, function (order) { return order.user; })
    ], User.prototype, "orders");
    User = __decorate([
        (0, typeorm_1.Entity)('users')
    ], User);
    return User;
}());
exports.User = User;
