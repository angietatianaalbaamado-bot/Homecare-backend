"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.OrdersService = void 0;
var common_1 = require("@nestjs/common");
var OrdersService = /** @class */ (function () {
    function OrdersService(ordersRepository, usersRepository, productRepository) {
        this.ordersRepository = ordersRepository;
        this.usersRepository = usersRepository;
        this.productRepository = productRepository;
    }
    // Obtener todas las órdenes
    OrdersService.prototype.getAllOrdersService = function () {
        return this.ordersRepository.getAllOrdersRepository();
    };
    // Obtener las órdenes de un usuario específico
    OrdersService.prototype.getUserOrdersService = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var userExisting;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersRepository.getUserByIdRepository(userId)];
                    case 1:
                        userExisting = _a.sent();
                        if (!userExisting) {
                            throw new common_1.NotFoundException('Usuario no encontrado');
                        }
                        if (!userExisting.isActive) {
                            throw new common_1.NotFoundException('Usuario inactivo');
                        }
                        return [2 /*return*/, this.ordersRepository.getUserOrdersRepository(userExisting)];
                }
            });
        });
    };
    // Crear una nueva orden
    OrdersService.prototype.createOrderService = function (createOrderDto) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var userExisting, _i, _c, product, productExisting;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.usersRepository.getUserByIdRepository(createOrderDto.userId)];
                    case 1:
                        userExisting = _d.sent();
                        if (!userExisting) {
                            throw new common_1.NotFoundException('Usuario no encontrado');
                        }
                        if (!userExisting.isActive) {
                            throw new common_1.NotFoundException('Usuario inactivo');
                        }
                        if (!createOrderDto.products || createOrderDto.products.length === 0) {
                            throw new common_1.NotFoundException('No se han proporcionado productos para la orden');
                        }
                        _i = 0, _c = createOrderDto.products;
                        _d.label = 2;
                    case 2:
                        if (!(_i < _c.length)) return [3 /*break*/, 5];
                        product = _c[_i];
                        return [4 /*yield*/, this.productRepository.getProductById(product.productId)];
                    case 3:
                        productExisting = _d.sent();
                        if (!productExisting) {
                            throw new common_1.NotFoundException("Producto con ID ".concat(product.productId, " no encontrado"));
                        }
                        if (!productExisting.isActive) {
                            throw new common_1.BadRequestException("El producto ".concat(productExisting.name, " no est\u00E1 disponible"));
                        }
                        if (((_a = productExisting.stock) !== null && _a !== void 0 ? _a : 0) < product.quantity) {
                            throw new common_1.BadRequestException("Stock insuficiente para el producto ".concat(productExisting.name, ". Disponible: ").concat((_b = productExisting.stock) !== null && _b !== void 0 ? _b : 0, ", Solicitado: ").concat(product.quantity));
                        }
                        if (product.quantity <= 0) {
                            throw new common_1.BadRequestException("La cantidad debe ser mayor a 0 para el producto ".concat(productExisting.name));
                        }
                        _d.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, this.ordersRepository.createOrderRepository(createOrderDto)];
                }
            });
        });
    };
    OrdersService = __decorate([
        (0, common_1.Injectable)()
    ], OrdersService);
    return OrdersService;
}());
exports.OrdersService = OrdersService;
