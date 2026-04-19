"use strict";
exports.__esModule = true;
exports.loggerGlobal = void 0;
function loggerGlobal(req, res, next) {
    var date = new Date();
    var fecha = "".concat(date.getDate(), "/").concat(date.getMonth() + 1, "/").concat(date.getFullYear());
    var time = "".concat(date.getHours(), ":").concat(date.getMinutes(), ":").concat(date.getSeconds());
    console.log("Estas ejecutando el metodo ".concat(req.method, ", en la ruta ").concat(req.url, ", el dia ").concat(fecha, " a las ").concat(time));
    next();
}
exports.loggerGlobal = loggerGlobal;
