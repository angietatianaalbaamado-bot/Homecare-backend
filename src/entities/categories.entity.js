"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Category = void 0;
var typeorm_1 = require("typeorm");
var product_entity_1 = require("./product.entity");
var Category = /** @class */ (function () {
    function Category() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], Category.prototype, "uuid");
    __decorate([
        (0, typeorm_1.Column)({
            type: 'varchar',
            length: 100,
            unique: true,
            nullable: false
        })
    ], Category.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)({
            type: 'timestamp',
            "default": function () { return 'CURRENT_TIMESTAMP'; }
        })
    ], Category.prototype, "createAt");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return product_entity_1.Product; }),
        (0, typeorm_1.JoinTable)()
    ], Category.prototype, "products");
    Category = __decorate([
        (0, typeorm_1.Entity)({ name: 'categories' })
    ], Category);
    return Category;
}());
exports.Category = Category;
