"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Order = exports.StatusOrder = void 0;
var typeorm_1 = require("typeorm");
var users_entity_1 = require("./users.entity");
var orderDetail_entity_1 = require("./orderDetail.entity");
var StatusOrder;
(function (StatusOrder) {
    StatusOrder["PENDING"] = "pending";
    StatusOrder["COMPLETED"] = "completed";
    StatusOrder["CANCELLED"] = "cancelled";
})(StatusOrder = exports.StatusOrder || (exports.StatusOrder = {}));
var Order = /** @class */ (function () {
    function Order() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], Order.prototype, "uuid");
    __decorate([
        (0, typeorm_1.Column)()
    ], Order.prototype, "addressDelivery");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Order.prototype, "dateCreated");
    __decorate([
        (0, typeorm_1.Column)({ type: 'enum', "enum": StatusOrder, "default": StatusOrder.PENDING })
    ], Order.prototype, "statusOrder");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return users_entity_1.User; }, function (user) { return user.orders; })
    ], Order.prototype, "user");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return orderDetail_entity_1.OrderDetail; }, function (orderDetail) { return orderDetail.order; })
    ], Order.prototype, "orderDetails");
    Order = __decorate([
        (0, typeorm_1.Entity)({ name: 'orders' })
    ], Order);
    return Order;
}());
exports.Order = Order;
