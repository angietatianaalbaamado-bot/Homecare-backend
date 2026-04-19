"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.OrdersRepository = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var orders_entity_1 = require("../../../../../../../src/entities/orders.entity");
var users_entity_1 = require("../../../../../../../src/entities/users.entity");
var orderDetail_entity_1 = require("../../../../../../../src/entities/orderDetail.entity");
var product_entity_1 = require("../../../../../../../src/entities/product.entity");
var OrdersRepository = /** @class */ (function () {
    function OrdersRepository(ordersDataBase, orderDetailDataBase, productsDataBase, usersDataBase) {
        this.ordersDataBase = ordersDataBase;
        this.orderDetailDataBase = orderDetailDataBase;
        this.productsDataBase = productsDataBase;
        this.usersDataBase = usersDataBase;
    }
    // Obtener todas las órdenes
    OrdersRepository.prototype.getAllOrdersRepository = function () {
        return this.ordersDataBase.find({
            relations: ['orderDetails', 'user', 'orderDetails.product']
        });
    };
    // Obtener órdenes de un usuario
    OrdersRepository.prototype.getUserOrdersRepository = function (userExisting) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.ordersDataBase.find({
                        where: { user: userExisting },
                        relations: ['orderDetails', 'user', 'orderDetails.product']
                    })];
            });
        });
    };
    // Crear orden
    OrdersRepository.prototype.createOrderRepository = function (createOrderDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, newOrder, savedOrder, orderDetails, IVA_RATE, _i, _a, item, product, precio, cantidad, descuento, subTotal, iva, orderDetail, savedDetail;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.usersDataBase.findOne({
                            where: { id: createOrderDto.userId }
                        })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            throw new Error('Usuario no encontrado');
                        }
                        newOrder = this.ordersDataBase.create({
                            user: user,
                            addressDelivery: createOrderDto.addressDelivery
                        });
                        return [4 /*yield*/, this.ordersDataBase.save(newOrder)];
                    case 2:
                        savedOrder = _b.sent();
                        orderDetails = [];
                        IVA_RATE = 0.19;
                        _i = 0, _a = createOrderDto.products;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 8];
                        item = _a[_i];
                        return [4 /*yield*/, this.productsDataBase.findOne({
                                where: { uuid: item.productId }
                            })];
                    case 4:
                        product = _b.sent();
                        if (!product) {
                            throw new Error("Producto con ID ".concat(item.productId, " no encontrado"));
                        }
                        precio = Number(product.price);
                        cantidad = item.quantity;
                        descuento = item.discount || 0;
                        subTotal = precio * cantidad - descuento;
                        iva = subTotal * IVA_RATE;
                        orderDetail = this.orderDetailDataBase.create({
                            cant: cantidad,
                            subTotal: subTotal,
                            iva: iva,
                            discount: descuento,
                            shippingFees: 0,
                            product: product,
                            order: savedOrder
                        });
                        return [4 /*yield*/, this.orderDetailDataBase.save(orderDetail)];
                    case 5:
                        savedDetail = _b.sent();
                        orderDetails.push(savedDetail);
                        if (!(product.stock !== undefined)) return [3 /*break*/, 7];
                        product.stock = product.stock - cantidad;
                        return [4 /*yield*/, this.productsDataBase.save(product)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 3];
                    case 8: 
                    // 4. Respuesta
                    return [2 /*return*/, {
                            message: 'Orden creada exitosamente',
                            order: {
                                id: savedOrder.uuid,
                                orderDetails: orderDetails.map(function (detail) { return ({
                                    productName: detail.product.name,
                                    quantity: detail.cant,
                                    subTotal: detail.subTotal,
                                    iva: detail.iva,
                                    total: Number(detail.subTotal) + Number(detail.iva)
                                }); }),
                                totalOrder: orderDetails.reduce(function (acc, d) { return acc + Number(d.subTotal) + Number(d.iva); }, 0)
                            }
                        }];
                }
            });
        });
    };
    OrdersRepository = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(orders_entity_1.Order)),
        __param(1, (0, typeorm_1.InjectRepository)(orderDetail_entity_1.OrderDetail)),
        __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
        __param(3, (0, typeorm_1.InjectRepository)(users_entity_1.User))
    ], OrdersRepository);
    return OrdersRepository;
}());
exports.OrdersRepository = OrdersRepository;
