"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DateAdderInterceptor = void 0;
var common_1 = require("@nestjs/common");
var DateAdderInterceptor = /** @class */ (function () {
    function DateAdderInterceptor() {
    }
    DateAdderInterceptor.prototype.intercept = function (context, next) {
        var now = new Date();
        var formatDate = now.toLocaleDateString('es-CO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        var request = context.switchToHttp().getRequest();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        request.now = formatDate;
        return next.handle();
    };
    DateAdderInterceptor = __decorate([
        (0, common_1.Injectable)()
    ], DateAdderInterceptor);
    return DateAdderInterceptor;
}());
exports.DateAdderInterceptor = DateAdderInterceptor;
