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
exports.UsuariosService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var usuario_entity_1 = require("./usuario.entity");
var UsuariosService = /** @class */ (function () {
    function UsuariosService(usuariosRepo) {
        this.usuariosRepo = usuariosRepo;
    }
    UsuariosService.prototype.create = function (usuario) {
        return this.usuariosRepo.save(usuario);
    };
    UsuariosService.prototype.findAll = function () {
        return this.usuariosRepo.find();
    };
    UsuariosService.prototype.findOne = function (id) {
        return this.usuariosRepo.findOneBy({ id: id });
    };
    UsuariosService.prototype.remove = function (id) {
        return this.usuariosRepo["delete"](id);
    };
    UsuariosService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario))
    ], UsuariosService);
    return UsuariosService;
}());
exports.UsuariosService = UsuariosService;
