"use strict";
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/11
 * Description:
 */
exports.__esModule = true;
var types_1 = require("./types");
exports.checkType = function (file, types) {
    return new Promise(function (resolve, reject) {
        var info = { type: file.type };
        if (types.length === 0) {
            return resolve({ file: file, info: info });
        }
        if (types.indexOf(file.type) >= 0) {
            return resolve({ file: file, info: info });
        }
        return reject({
            error: new types_1.CheckError({
                name: 'type',
                currentValue: file.type,
                limitValue: types,
                message: "The type of file should be " + types.join(', ') + "\uFF0Ccurrent is " + file.type
            }),
            file: file,
            info: info
        });
    });
};
var TypeChecker = (function () {
    function TypeChecker(types) {
        if (types === void 0) { types = []; }
        var _this = this;
        this.setTypes = function (types) {
            _this.types = types;
        };
        this.check = function (file) {
            return exports.checkType(file, _this.types);
        };
        this.types = [];
    }
    return TypeChecker;
}());
exports.TypeChecker = TypeChecker;
