"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CredentialModule = void 0;
var common_1 = require("@nestjs/common");
var credential_controller_1 = require("./credential.controller");
var credential_service_1 = require("./credential.service");
var typeorm_1 = require("@nestjs/typeorm");
var credential_entity_1 = require("../../../../../../../src/entities/credential.entity");
var credential_repository_1 = require("./credential.repository");
var CredentialModule = /** @class */ (function () {
    function CredentialModule() {
    }
    CredentialModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([credential_entity_1.Credential])],
            controllers: [credential_controller_1.CredentialController],
            providers: [credential_service_1.CredentialService, credential_repository_1.CredentialRepository],
            exports: [credential_repository_1.CredentialRepository]
        })
    ], CredentialModule);
    return CredentialModule;
}());
exports.CredentialModule = CredentialModule;
