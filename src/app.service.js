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
exports.DataLoaderUsers = exports.AppService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var users_entity_1 = require("./entities/users.entity");
var credential_entity_1 = require("./entities/credential.entity");
var fs = require("fs");
var path = require("path");
var bcrypt = require("bcrypt");
var AppService = /** @class */ (function () {
    function AppService() {
    }
    AppService.prototype.getHello = function () {
        return 'Bienvenidos a Sena mujeres digitales';
    };
    AppService = __decorate([
        (0, common_1.Injectable)()
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
var DataLoaderUsers = /** @class */ (function () {
    function DataLoaderUsers(userDataBase, credentialDataBase) {
        this.userDataBase = userDataBase;
        this.credentialDataBase = credentialDataBase;
    }
    DataLoaderUsers.prototype.onModuleInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usersCount, queryRunner, filePath, rawData, users, _i, users_1, user, hashedPassword, newCredential, newUser, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userDataBase.count()];
                    case 1:
                        usersCount = _a.sent();
                        if (!(usersCount === 0)) return [3 /*break*/, 17];
                        console.log('Cargando usuarios iniciales...');
                        queryRunner = this.userDataBase.manager.connection.createQueryRunner();
                        return [4 /*yield*/, queryRunner.connect()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.startTransaction()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 12, 14, 16]);
                        filePath = path.resolve(__dirname, '..', 'utils', 'data.json');
                        if (!fs.existsSync(filePath)) {
                            console.warn('Archivo de seed no encontrado:', filePath);
                            return [2 /*return*/];
                        }
                        rawData = fs.readFileSync(filePath, 'utf-8');
                        users = JSON.parse(rawData);
                        _i = 0, users_1 = users;
                        _a.label = 5;
                    case 5:
                        if (!(_i < users_1.length)) return [3 /*break*/, 10];
                        user = users_1[_i];
                        return [4 /*yield*/, bcrypt.hash(user.password, 10)];
                    case 6:
                        hashedPassword = _a.sent();
                        newCredential = this.credentialDataBase.create({
                            username: user.username,
                            password: hashedPassword,
                            role: user.roles
                        });
                        return [4 /*yield*/, queryRunner.manager.save(newCredential)];
                    case 7:
                        _a.sent();
                        newUser = this.userDataBase.create({
                            name: user.name,
                            lastname: user.lastName,
                            address: user.address,
                            email: user.email,
                            phoneNumber: Number(user.phoneNumber),
                            birthDate: user.birthDate,
                            credential: newCredential
                        });
                        return [4 /*yield*/, queryRunner.manager.save(newUser)];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 5];
                    case 10: return [4 /*yield*/, queryRunner.commitTransaction()];
                    case 11:
                        _a.sent();
                        console.log('Usuarios precargados correctamente');
                        return [3 /*break*/, 16];
                    case 12:
                        error_1 = _a.sent();
                        console.error('Error al precargar usuarios:', error_1);
                        return [4 /*yield*/, queryRunner.rollbackTransaction()];
                    case 13:
                        _a.sent();
                        return [3 /*break*/, 16];
                    case 14: return [4 /*yield*/, queryRunner.release()];
                    case 15:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        console.log('Los usuarios ya existen en la base de datos');
                        _a.label = 18;
                    case 18: return [2 /*return*/];
                }
            });
        });
    };
    DataLoaderUsers = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
        __param(1, (0, typeorm_1.InjectRepository)(credential_entity_1.Credential))
    ], DataLoaderUsers);
    return DataLoaderUsers;
}());
exports.DataLoaderUsers = DataLoaderUsers;
