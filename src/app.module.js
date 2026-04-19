"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var users_module_1 = require("./users/users.module");
var auth_module_1 = require("./auth/auth.module");
var products_module_1 = require("./products/products.module");
var config_1 = require("@nestjs/config");
var typeorm_1 = require("./config/typeorm");
var typeorm_2 = require("@nestjs/typeorm");
var credential_module_1 = require("./credential/credential.module");
var users_entity_1 = require("./entities/users.entity");
var credential_entity_1 = require("./entities/credential.entity");
var orders_module_1 = require("./orders/orders.module");
var seed_module_1 = require("./seed/seed.module");
var jwt_1 = require("@nestjs/jwt");
var category_module_1 = require("./category/category.module");
var order_detail_module_1 = require("./order_detail/order_detail.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    load: [typeorm_1["default"]]
                }),
                typeorm_2.TypeOrmModule.forRootAsync({
                    inject: [config_1.ConfigService],
                    useFactory: function (config) { var _a; return (_a = config.get('typeorm')) !== null && _a !== void 0 ? _a : {}; }
                }),
                typeorm_2.TypeOrmModule.forFeature([users_entity_1.User, credential_entity_1.Credential]),
                users_module_1.UsersModule,
                auth_module_1.AuthModule,
                products_module_1.ProductsModule,
                credential_module_1.CredentialModule,
                orders_module_1.OrdersModule,
                seed_module_1.SeedModule,
                jwt_1.JwtModule.register({
                    global: true,
                    secret: process.env.JWT_SECRET,
                    signOptions: { expiresIn: '1h' }
                }),
                category_module_1.CategoryModule,
                order_detail_module_1.OrderDetailModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService, app_service_1.DataLoaderUsers]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
