"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TipoServicioModule = void 0;
var common_1 = require("@nestjs/common");
var tipo_servicio_service_1 = require("./tipo-servicio.service");
var tipo_servicio_controller_1 = require("./tipo-servicio.controller");
var TipoServicioModule = /** @class */ (function () {
    function TipoServicioModule() {
    }
    TipoServicioModule = __decorate([
        (0, common_1.Module)({
            providers: [tipo_servicio_service_1.TipoServicioService],
            controllers: [tipo_servicio_controller_1.TipoServicioController]
        })
    ], TipoServicioModule);
    return TipoServicioModule;
}());
exports.TipoServicioModule = TipoServicioModule;
