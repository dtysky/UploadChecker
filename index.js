"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/11
 * Description:
 */
require("es6-shim");
__export(require("./src/types"));
__export(require("./src/TypeChecker"));
__export(require("./src/ImageChecker"));
__export(require("./src/VideoChecker"));
var UploadChecker_1 = require("./src/UploadChecker");
exports["default"] = UploadChecker_1["default"];
