"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
window.URL = window.URL || window.webkitURL;
exports.videoRegex = /^video/;
exports.imageRegex = /^image/;
var CheckError = (function (_super) {
    __extends(CheckError, _super);
    function CheckError(params) {
        var _this = _super.call(this) || this;
        _this.name = params.name;
        _this.currentValue = params.currentValue;
        _this.limitValue = params.limitValue;
        _this.stack = (new Error()).stack;
        _this.message = params.message;
        return _this;
    }
    return CheckError;
}(Error));
exports.CheckError = CheckError;
