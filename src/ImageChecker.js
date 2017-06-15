"use strict";
exports.__esModule = true;
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/11
 * Description:
 */
var types_1 = require("./types");
exports.checkImage = function (file, maxBytesPerPixel, maxSize, maxWidth) {
    return new Promise(function (resolve, reject) {
        var image = new Image();
        image.onload = function () {
            URL.revokeObjectURL(image.src);
            var width = image.width;
            var height = image.height;
            var size = width * height;
            var info = { type: file.type, width: width, height: height, size: size };
            if (maxWidth && width > maxWidth) {
                return reject({
                    error: new types_1.CheckError({
                        name: 'width',
                        currentValue: width,
                        limitValue: maxWidth,
                        message: "The max width of image is " + maxWidth + "\uFF0Ccurrent is " + width
                    }),
                    info: info,
                    file: file
                });
            }
            if (maxSize && size > maxSize) {
                return reject({
                    error: new types_1.CheckError({
                        name: 'size',
                        currentValue: size,
                        limitValue: maxSize,
                        message: "The max size of image is " + maxSize + "\uFF0Ccurrent is " + width * height
                    }),
                    info: info,
                    file: file
                });
            }
            var maxKB = ~~(maxBytesPerPixel * size / 1024) + 1;
            if (maxSize && maxBytesPerPixel && file.size > maxKB * 1024) {
                return reject({
                    error: new types_1.CheckError({
                        name: 'bytes',
                        currentValue: file.size,
                        limitValue: maxKB * 1024,
                        message: "In current size " + width + " x " + height + "\uFF0Cimage should be less than " + maxKB + "KB"
                    }),
                    info: info,
                    file: file
                });
            }
            return resolve({ file: file, info: info });
        };
        image.onerror = function () {
            URL.revokeObjectURL(image.src);
            return reject({
                error: new types_1.CheckError({
                    name: 'unknown',
                    currentValue: 'unknown',
                    limitValue: 'image',
                    message: "Please upload the real image that could be open in the browser"
                }),
                info: { type: 'unknown' },
                file: file
            });
        };
        image.src = URL.createObjectURL(file);
    });
};
var ImageChecker = (function () {
    function ImageChecker(maxBytesPerPixel, maxSize, maxWidth) {
        var _this = this;
        this.maxBytesPerPixel = 0;
        this.maxSize = 0;
        this.maxWidth = 0;
        this.setAttr = function (key, value) {
            _this[key] = value;
        };
        this.check = function (file) {
            return exports.checkImage(file, _this.maxBytesPerPixel, _this.maxSize, _this.maxWidth);
        };
        this.maxBytesPerPixel = maxBytesPerPixel;
        this.maxSize = maxSize;
        if (maxWidth) {
            this.maxWidth = maxWidth;
        }
    }
    return ImageChecker;
}());
exports.ImageChecker = ImageChecker;
