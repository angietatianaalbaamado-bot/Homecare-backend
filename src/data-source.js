"use strict";
exports.__esModule = true;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
exports["default"] = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin123',
    database: 'homecare_new',
    entities: ['./src/entities/*.ts'],
    migrations: ['./src/migrations/*.ts'],
    synchronize: false
});
