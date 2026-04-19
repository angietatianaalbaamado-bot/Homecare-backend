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
exports.UsersController = void 0;
var common_1 = require("@nestjs/common");
var auth_guard_1 = require("../../../../../../../src/auth/Guards/auth.guard");
var roles_decorator_1 = require("../../../../../../../src/decorators/roles.decorator");
var roles_enum_1 = require("../../../../../../../src/enum/roles.enum");
var roles_guard_1 = require("../../../../../../../src/auth/Guards/roles.guard");
var swagger_1 = require("@nestjs/swagger");
var UsersController = /** @class */ (function () {
    function UsersController(usersService) {
        this.usersService = usersService;
    }
    //Ruta para obtener todos los usuarios
    UsersController.prototype.getAllUser = function (name) {
        if (name) {
            return this.usersService.getUserByUsername(name);
        }
        return this.usersService.getAllUsers();
    };
    //ruta para obtener un usuario por su id
    UsersController.prototype.getUserById = function (uuid) {
        return this.usersService.getUserById(uuid);
    };
    //ruta para obtener el perfil de usuario
    UsersController.prototype.getUserProfile = function (uuid) {
        return this.usersService.getUserProfile(uuid);
    };
    //ruta para crear un usuario
    UsersController.prototype.postCreateUser = function (createUserDto) {
        return this.usersService.createUser(createUserDto);
    };
    //ruta para actualizar un usuario
    UsersController.prototype.putUpdateUser = function (updateUserDto) {
        return this.usersService.updateUser(updateUserDto.uuid, updateUserDto);
    };
    //ruta para hacer un softDelete del usuario
    UsersController.prototype.deleteUser = function (uuid) {
        return this.usersService.deleteUser(uuid);
    };
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los usuarios' }),
        (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuarios obtenidos exitosamente.' }),
        (0, swagger_1.ApiQuery)({
            name: 'name',
            required: false,
            description: 'Nombre del usuario a buscar'
        }),
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.Get)('getAllUser'),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
        (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.ADMIN),
        __param(0, (0, common_1.Query)('name'))
    ], UsersController.prototype, "getAllUser");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Obtener un usuario por su ID' }),
        (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuario obtenido exitosamente.' }),
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.Get)('getUserById/:uuid'),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
        (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.ADMIN),
        __param(0, (0, common_1.Param)('uuid', common_1.ParseUUIDPipe))
    ], UsersController.prototype, "getUserById");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Obtener el perfil de usuario' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Perfil de usuario obtenido exitosamente.'
        }),
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.Get)('profile/:uuid'),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        __param(0, (0, common_1.Param)('uuid', common_1.ParseUUIDPipe))
    ], UsersController.prototype, "getUserProfile");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo usuario' }),
        (0, swagger_1.ApiResponse)({ status: 201, description: 'Usuario creado exitosamente.' }),
        (0, common_1.Post)('createUser'),
        __param(0, (0, common_1.Body)())
    ], UsersController.prototype, "postCreateUser");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Actualizar un usuario' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Usuario actualizado exitosamente.'
        }),
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.Put)('updateUser'),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        __param(0, (0, common_1.Body)())
    ], UsersController.prototype, "putUpdateUser");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Eliminar un usuario' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Usuario eliminado exitosamente.'
        }),
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.Delete)('deleteUser/:uuid'),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        __param(0, (0, common_1.Param)('uuid', common_1.ParseUUIDPipe))
    ], UsersController.prototype, "deleteUser");
    UsersController = __decorate([
        (0, swagger_1.ApiTags)('Usuarios'),
        (0, common_1.Controller)('users')
    ], UsersController);
    return UsersController;
}());
exports.UsersController = UsersController;
