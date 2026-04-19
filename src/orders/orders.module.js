"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrdersModule = void 0;
var common_1 = require("@nestjs/common");
var orders_controller_1 = require("./orders.controller");
var orders_service_1 = require("./orders.service");
var orders_repository_1 = require("./orders.repository");
var typeorm_1 = require("@nestjs/typeorm");
var orders_entity_1 = require("../../../../../../../src/entities/orders.entity");
var orderDetail_entity_1 = require("../../../../../../../src/entities/orderDetail.entity");
var product_entity_1 = require("../../../../../../../src/entities/product.entity");
var users_entity_1 = require("../../../../../../../src/entities/users.entity");
var users_module_1 = require("../../../../../../../src/users/users.module");
var products_module_1 = require("../../../../../../../src/products/products.module");
var OrdersModule = /** @class */ (function () {
    function OrdersModule() {
    }
    OrdersModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([orders_entity_1.Order, orderDetail_entity_1.OrderDetail, product_entity_1.Product, users_entity_1.User]),
                users_module_1.UsersModule,
                products_module_1.ProductsModule,
            ],
            controllers: [orders_controller_1.OrdersController],
            providers: [orders_service_1.OrdersService, orders_repository_1.OrdersRepository]
        })
    ], OrdersModule);
    return OrdersModule;
}());
exports.OrdersModule = OrdersModule;
