"use strict";
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
exports.InitialMigration1762679654961 = void 0;
var InitialMigration1762679654961 = /** @class */ (function () {
    function InitialMigration1762679654961() {
        this.name = 'InitialMigration1762679654961';
    }
    InitialMigration1762679654961.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("\n            CREATE TYPE \"public\".\"credential_roles_enum\" AS ENUM('admin', 'user', 'manager')\n        ")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE TABLE \"credential\" (\n                \"uuid\" uuid NOT NULL DEFAULT uuid_generate_v4(),\n                \"userName\" character varying(100) NOT NULL,\n                \"password\" character varying(100) NOT NULL,\n                \"roles\" \"public\".\"credential_roles_enum\" NOT NULL DEFAULT 'user',\n                CONSTRAINT \"UQ_0cb7b48f98a359e0cad74f5412f\" UNIQUE (\"userName\"),\n                CONSTRAINT \"PK_16db69f8eee7772e7d0a07ac946\" PRIMARY KEY (\"uuid\")\n            )\n        ")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE TABLE \"products\" (\n                \"uuid\" uuid NOT NULL DEFAULT uuid_generate_v4(),\n                \"name\" character varying(100) NOT NULL,\n                \"price\" numeric NOT NULL,\n                \"description\" text NOT NULL,\n                \"imgUrl\" text NOT NULL DEFAULT 'https://cdn-icons-png.flaticon.com/512/74/74472.png',\n                \"stock\" integer NOT NULL,\n                \"createAt\" TIMESTAMP NOT NULL,\n                \"isActive\" boolean NOT NULL DEFAULT true,\n                CONSTRAINT \"UQ_4c9fb58de893725258746385e16\" UNIQUE (\"name\"),\n                CONSTRAINT \"PK_98086f14e190574534d5129cd7c\" PRIMARY KEY (\"uuid\")\n            )\n        ")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE TABLE \"orders_detail\" (\n                \"uuid\" uuid NOT NULL DEFAULT uuid_generate_v4(),\n                \"cant\" integer NOT NULL,\n                \"subTotal\" numeric(10, 2) NOT NULL,\n                \"iva\" numeric(10, 2) NOT NULL,\n                \"discount\" numeric(10, 2) NOT NULL,\n                \"shippingFees\" numeric(10, 2) NOT NULL,\n                \"order_id\" uuid,\n                \"product_id\" uuid,\n                CONSTRAINT \"PK_33d9939965323b226aceb1274c6\" PRIMARY KEY (\"uuid\")\n            )\n        ")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE TYPE \"public\".\"orders_statusorder_enum\" AS ENUM(\n                'created',\n                'processing',\n                'completed',\n                'cancelled'\n            )\n        ")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE TABLE \"orders\" (\n                \"uuid\" uuid NOT NULL DEFAULT uuid_generate_v4(),\n                \"addressDelivery\" character varying(100) NOT NULL,\n                \"dateCreated\" TIMESTAMP NOT NULL DEFAULT now(),\n                \"deliveryDate\" TIMESTAMP,\n                \"statusOrder\" \"public\".\"orders_statusorder_enum\" NOT NULL DEFAULT 'created',\n                \"user_id\" uuid,\n                CONSTRAINT \"PK_04a64e7c04376e27182f8c0fa17\" PRIMARY KEY (\"uuid\")\n            )\n        ")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE TABLE \"users\" (\n                \"uuid\" uuid NOT NULL DEFAULT uuid_generate_v4(),\n                \"name\" character varying(100) NOT NULL,\n                \"lastName\" character varying(100) NOT NULL,\n                \"address\" character varying(255),\n                \"email\" character varying(100) NOT NULL,\n                \"phoneNumber\" bigint NOT NULL,\n                \"birthDate\" TIMESTAMP NOT NULL,\n                \"isActive\" boolean NOT NULL DEFAULT true,\n                \"credentialIdUuid\" uuid,\n                CONSTRAINT \"UQ_97672ac88f789774dd47f7c8be3\" UNIQUE (\"email\"),\n                CONSTRAINT \"UQ_1e3d0240b49c40521aaeb953293\" UNIQUE (\"phoneNumber\"),\n                CONSTRAINT \"REL_fbbf3b4211f0033aa5bcdfb0e5\" UNIQUE (\"credentialIdUuid\"),\n                CONSTRAINT \"PK_951b8f1dfc94ac1d0301a14b7e1\" PRIMARY KEY (\"uuid\")\n            )\n        ")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE TABLE \"categories_products_products\" (\n                \"categoriesUuid\" uuid NOT NULL,\n                \"productsUuid\" uuid NOT NULL,\n                CONSTRAINT \"PK_35044b57207d39ae2d6c160b661\" PRIMARY KEY (\"categoriesUuid\", \"productsUuid\")\n            )\n        ")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE INDEX \"IDX_bbb4cf91b515e6fc938fdda025\" ON \"categories_products_products\" (\"categoriesUuid\")\n        ")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE INDEX \"IDX_553455b32290171bc75d2d6aaa\" ON \"categories_products_products\" (\"productsUuid\")\n        ")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories\" DROP CONSTRAINT \"PK_24dbc6126a28ff948da33e97d3b\"\n        ")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories\" DROP COLUMN \"id\"\n        ")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories\" DROP COLUMN \"createdAt\"\n        ")];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories\" DROP COLUMN \"updatedAt\"\n        ")];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories\"\n            ADD \"uuid\" uuid NOT NULL DEFAULT uuid_generate_v4()\n        ")];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories\"\n            ADD CONSTRAINT \"PK_a4b5917e7297f757879582e1458\" PRIMARY KEY (\"uuid\")\n        ")];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories\"\n            ADD \"createAt\" TIMESTAMP NOT NULL DEFAULT now()\n        ")];
                    case 17:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories\" DROP CONSTRAINT \"UQ_8b0be371d28245da6e4f4b61878\"\n        ")];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories\" DROP COLUMN \"name\"\n        ")];
                    case 19:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories\"\n            ADD \"name\" character varying(100) NOT NULL\n        ")];
                    case 20:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories\"\n            ADD CONSTRAINT \"UQ_8b0be371d28245da6e4f4b61878\" UNIQUE (\"name\")\n        ")];
                    case 21:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"orders_detail\"\n            ADD CONSTRAINT \"FK_5b0e6f7131af630c7ab92400fe0\" FOREIGN KEY (\"order_id\") REFERENCES \"orders\"(\"uuid\") ON DELETE NO ACTION ON UPDATE NO ACTION\n        ")];
                    case 22:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"orders_detail\"\n            ADD CONSTRAINT \"FK_b86d62e2c98b558e4acf531f9ef\" FOREIGN KEY (\"product_id\") REFERENCES \"products\"(\"uuid\") ON DELETE NO ACTION ON UPDATE NO ACTION\n        ")];
                    case 23:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"orders\"\n            ADD CONSTRAINT \"FK_a922b820eeef29ac1c6800e826a\" FOREIGN KEY (\"user_id\") REFERENCES \"users\"(\"uuid\") ON DELETE NO ACTION ON UPDATE NO ACTION\n        ")];
                    case 24:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"users\"\n            ADD CONSTRAINT \"FK_fbbf3b4211f0033aa5bcdfb0e57\" FOREIGN KEY (\"credentialIdUuid\") REFERENCES \"credential\"(\"uuid\") ON DELETE NO ACTION ON UPDATE NO ACTION\n        ")];
                    case 25:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories_products_products\"\n            ADD CONSTRAINT \"FK_bbb4cf91b515e6fc938fdda0251\" FOREIGN KEY (\"categoriesUuid\") REFERENCES \"categories\"(\"uuid\") ON DELETE CASCADE ON UPDATE CASCADE\n        ")];
                    case 26:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories_products_products\"\n            ADD CONSTRAINT \"FK_553455b32290171bc75d2d6aaa6\" FOREIGN KEY (\"productsUuid\") REFERENCES \"products\"(\"uuid\") ON DELETE NO ACTION ON UPDATE NO ACTION\n        ")];
                    case 27:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    InitialMigration1762679654961.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories_products_products\" DROP CONSTRAINT \"FK_553455b32290171bc75d2d6aaa6\"\n        ")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories_products_products\" DROP CONSTRAINT \"FK_bbb4cf91b515e6fc938fdda0251\"\n        ")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"users\" DROP CONSTRAINT \"FK_fbbf3b4211f0033aa5bcdfb0e57\"\n        ")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"orders\" DROP CONSTRAINT \"FK_a922b820eeef29ac1c6800e826a\"\n        ")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"orders_detail\" DROP CONSTRAINT \"FK_b86d62e2c98b558e4acf531f9ef\"\n        ")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"orders_detail\" DROP CONSTRAINT \"FK_5b0e6f7131af630c7ab92400fe0\"\n        ")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories\" DROP CONSTRAINT \"UQ_8b0be371d28245da6e4f4b61878\"\n        ")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories\" DROP COLUMN \"name\"\n        ")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories\"\n            ADD \"name\" character varying NOT NULL\n        ")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories\"\n            ADD CONSTRAINT \"UQ_8b0be371d28245da6e4f4b61878\" UNIQUE (\"name\")\n        ")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories\" DROP COLUMN \"createAt\"\n        ")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories\" DROP CONSTRAINT \"PK_a4b5917e7297f757879582e1458\"\n        ")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories\" DROP COLUMN \"uuid\"\n        ")];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories\"\n            ADD \"updatedAt\" TIMESTAMP NOT NULL DEFAULT now()\n        ")];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories\"\n            ADD \"createdAt\" TIMESTAMP NOT NULL DEFAULT now()\n        ")];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories\"\n            ADD \"id\" uuid NOT NULL DEFAULT uuid_generate_v4()\n        ")];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"categories\"\n            ADD CONSTRAINT \"PK_24dbc6126a28ff948da33e97d3b\" PRIMARY KEY (\"id\")\n        ")];
                    case 17:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP INDEX \"public\".\"IDX_553455b32290171bc75d2d6aaa\"\n        ")];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP INDEX \"public\".\"IDX_bbb4cf91b515e6fc938fdda025\"\n        ")];
                    case 19:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TABLE \"categories_products_products\"\n        ")];
                    case 20:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TABLE \"users\"\n        ")];
                    case 21:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TABLE \"orders\"\n        ")];
                    case 22:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TYPE \"public\".\"orders_statusorder_enum\"\n        ")];
                    case 23:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TABLE \"orders_detail\"\n        ")];
                    case 24:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TABLE \"products\"\n        ")];
                    case 25:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TABLE \"credential\"\n        ")];
                    case 26:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TYPE \"public\".\"credential_roles_enum\"\n        ")];
                    case 27:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return InitialMigration1762679654961;
}());
exports.InitialMigration1762679654961 = InitialMigration1762679654961;
