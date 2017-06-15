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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
exports.__esModule = true;
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/11
 * Description:
 */
var React = require("react");
var react_1 = require("react");
var types_1 = require("./types");
var TypeChecker_1 = require("./TypeChecker");
var ImageChecker_1 = require("./ImageChecker");
var VideoChecker_1 = require("./VideoChecker");
var UploadChecker = (function (_super) {
    __extends(UploadChecker, _super);
    function UploadChecker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleDrop = function (e) {
            var _a = _this.props, types = _a.types, imageConstraint = _a.imageConstraint, videoConstraint = _a.videoConstraint, onDrop = _a.onDrop;
            var files;
            if (e.dataTransfer) {
                files = e.dataTransfer.files;
            }
            else if (e.target) {
                files = e.target.files;
            }
            var _loop_1 = function (i) {
                var file = files[i];
                TypeChecker_1.checkType(file, types)
                    .then(function () {
                    if (imageConstraint && types_1.imageRegex.test(file.type)) {
                        ImageChecker_1.checkImage(file, imageConstraint.maxBytesPerPixel, imageConstraint.maxSize, imageConstraint.maxWidth)
                            .then(function (res) { return onDrop(res); })["catch"](function (res) { return onDrop(res); });
                    }
                    else if (videoConstraint && types_1.videoRegex.test(file.type)) {
                        VideoChecker_1.checkVideo(file, videoConstraint.maxBytesPerPixelPerSecond, videoConstraint.maxSize, videoConstraint.maxWidth, videoConstraint.maxDuration)
                            .then(function (res) { return onDrop(res); })["catch"](function (res) { return onDrop(res); });
                    }
                    else {
                        onDrop({ file: file, info: { type: file.type } });
                    }
                })["catch"](function (res) { return onDrop(res); });
            };
            for (var i = 0; i < files.length; i++) {
                _loop_1(i);
            }
        };
        return _this;
    }
    UploadChecker.prototype.render = function () {
        var _this = this;
        var _a = this.props, multiple = _a.multiple, children = _a.children, style = _a.style, className = _a.className, onDrop = _a.onDrop, types = _a.types, imageConstraint = _a.imageConstraint, videoConstraint = _a.videoConstraint, others = __rest(_a, ["multiple", "children", "style", "className", "onDrop", "types", "imageConstraint", "videoConstraint"]);
        return (React.createElement("div", { onClick: function () {
                _this.refs.input.click();
            }, className: className, style: style },
            React.createElement("input", __assign({ ref: 'input', type: "file", style: {
                    display: 'none'
                }, multiple: multiple, onClick: function (e) {
                    // clean value to select the same file continuous
                    e.target.value = null;
                }, onChange: this.handleDrop }, others)),
            children));
    };
    return UploadChecker;
}(react_1.Component));
UploadChecker.defaultProps = {
    types: [],
    multiple: false,
    onDrop: function () { }
};
exports["default"] = UploadChecker;
