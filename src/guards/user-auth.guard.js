"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserAuthGuard = void 0;
var common_1 = require("@nestjs/common");
// Función para validar el request
function ValidateRequest(request) {
    var token = request.headers['token'];
    console.log('este es el token:', token);
    return token === '12345';
}
var UserAuthGuard = /** @class */ (function () {
    function UserAuthGuard() {
    }
    UserAuthGuard.prototype.canActivate = function (context) {
        var request = context.switchToHttp().getRequest();
        return ValidateRequest(request);
    };
    UserAuthGuard = __decorate([
        (0, common_1.Injectable)()
    ], UserAuthGuard);
    return UserAuthGuard;
}());
exports.UserAuthGuard = UserAuthGuard;
