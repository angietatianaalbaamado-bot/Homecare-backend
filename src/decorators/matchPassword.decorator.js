"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MatchPassword = void 0;
var class_validator_1 = require("class-validator");
var MatchPassword = /** @class */ (function () {
    function MatchPassword() {
    }
    MatchPassword.prototype.validate = function (password, args) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (password !== args.object[args.constraints[0]])
            return false;
        return true;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MatchPassword.prototype.defaultMessage = function (args) {
        return 'El password y la confirmacion de password son diferentes';
    };
    MatchPassword = __decorate([
        (0, class_validator_1.ValidatorConstraint)({
            name: 'MatchPassword',
            async: false
        })
    ], MatchPassword);
    return MatchPassword;
}());
exports.MatchPassword = MatchPassword;
