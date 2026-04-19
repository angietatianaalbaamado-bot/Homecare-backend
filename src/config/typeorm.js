"use strict";
exports.__esModule = true;
exports.typeOrmConfig = exports.connectionSource = void 0;
var config_1 = require("@nestjs/config");
var typeorm_1 = require("typeorm");
var dotenv = require("dotenv");
dotenv.config({ path: '.env' });
var config = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER || process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    logging: true,
    synchronize: true,
    dropSchema: false
};
exports["default"] = (0, config_1.registerAs)('typeorm', function () { return config; });
exports.connectionSource = new typeorm_1.DataSource(config);
exports.typeOrmConfig = config;
