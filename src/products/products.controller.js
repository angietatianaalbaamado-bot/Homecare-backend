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
exports.__esModule = true;
exports.ProductsController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var auth_guard_1 = require("../../../../../../../src/auth/Guards/auth.guard");
var roles_guard_1 = require("../../../../../../../src/auth/Guards/roles.guard");
var roles_decorator_1 = require("../../../../../../../src/decorators/roles.decorator");
var roles_enum_1 = require("../../../../../../../src/enum/roles.enum");
var ProductsController = /** @class */ (function () {
    function ProductsController(productService) {
        this.productService = productService;
    }
    //ruta para obtener todos los productos
    ProductsController.prototype.getAllProducts = function () {
        return this.productService.getAllProductsService();
    };
    //Endpoint para crear un nuevo producto
    ProductsController.prototype.createProduct = function (createProductDto) {
        return this.productService.createProductService(createProductDto);
    };
    //Endpoint para actualizar un producto
    ProductsController.prototype.updateProduct = function (uuid, updateProductDto) {
        return this.productService.updateProductService(uuid, updateProductDto);
    };
    //ruta para eliminar un producto
    ProductsController.prototype.deleteProduct = function (uuid) {
        return this.productService.deleteProductsService(uuid);
    };
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los productos' }),
        (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de productos obtenida.' }),
        (0, common_1.Get)('getAllProducts')
    ], ProductsController.prototype, "getAllProducts");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo producto' }),
        (0, swagger_1.ApiResponse)({ status: 201, description: 'Producto creado correctamente.' }),
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
        (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.ADMIN),
        (0, common_1.Post)('createProduct'),
        __param(0, (0, common_1.Body)())
    ], ProductsController.prototype, "createProduct");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Actualizar un producto' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Producto actualizado correctamente.'
        }),
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
        (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.ADMIN),
        (0, common_1.Put)('updateProduct/:uuid'),
        __param(0, (0, common_1.Param)('uuid', common_1.ParseUUIDPipe)),
        __param(1, (0, common_1.Body)())
    ], ProductsController.prototype, "updateProduct");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Eliminar un producto' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Producto eliminado correctamente.'
        }),
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
        (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.ADMIN),
        (0, common_1.Delete)('delete/:uuid'),
        __param(0, (0, common_1.Param)('uuid', common_1.ParseUUIDPipe))
    ], ProductsController.prototype, "deleteProduct");
    ProductsController = __decorate([
        (0, swagger_1.ApiTags)('Productos'),
        (0, common_1.Controller)('products')
    ], ProductsController);
    return ProductsController;
}());
exports.ProductsController = ProductsController;
