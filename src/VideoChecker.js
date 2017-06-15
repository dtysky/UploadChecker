"use strict";
exports.__esModule = true;
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/11
 * Description:
 */
var types_1 = require("./types");
exports.checkVideo = function (file, maxBytesPerPixelPerSecond, maxDuration, maxSize, maxWidth) {
    return new Promise(function (resolve, reject) {
        var video = document.createElement('video');
        video.preload = 'metadata';
        video.muted = true;
        video.style.position = 'fixed';
        video.style.transform = 'scale(-10000)';
        video.style.width = '0';
        video.style.height = '0';
        video.onloadedmetadata = function () {
            URL.revokeObjectURL(video.src);
            document.body.removeChild(video);
            var width = video.videoWidth;
            var height = video.videoHeight;
            var size = width * height;
            var duration = video.duration;
            var info = { type: file.type, width: width, height: height, size: size, duration: duration };
            if (maxWidth && width > maxWidth) {
                return reject({
                    error: new types_1.CheckError({
                        name: 'width',
                        currentValue: width,
                        limitValue: maxWidth,
                        message: "The max width of video is " + maxWidth + "\uFF0Ccurrent is " + width
                    }),
                    file: file,
                    info: info
                });
            }
            if (maxSize && size > maxSize) {
                return reject({
                    error: new types_1.CheckError({
                        name: 'size',
                        currentValue: size,
                        limitValue: maxSize,
                        message: "The max size of video is " + maxSize + "\uFF0Ccurrent is " + width * height
                    }),
                    file: file,
                    info: info
                });
            }
            if (maxDuration && duration > maxDuration) {
                return reject({
                    error: new types_1.CheckError({
                        name: 'duration',
                        currentValue: duration,
                        limitValue: maxDuration,
                        message: "The max duration of video is " + maxDuration + "\uFF0Ccurrent is " + duration
                    }),
                    file: file,
                    info: info
                });
            }
            var maxMB = ~~(maxBytesPerPixelPerSecond * size * duration / 1024 / 1024) + 1;
            if (maxSize && maxDuration && maxBytesPerPixelPerSecond && file.size > maxMB * 1024 * 1024) {
                return reject({
                    error: new types_1.CheckError({
                        name: 'bytes',
                        currentValue: file.size,
                        limitValue: maxMB * 1024 * 1024,
                        message: "In current size " + width + " x " + height + " and duration " + duration + "\uFF0Cvideo should be less than " + maxMB.toFixed(2) + "MB"
                    }),
                    file: file,
                    info: info
                });
            }
            return resolve({ file: file, info: info });
        };
        video.onerror = function () {
            URL.revokeObjectURL(video.src);
            return reject({
                error: new types_1.CheckError({
                    name: 'unknown',
                    currentValue: 'unknown',
                    limitValue: 'video',
                    message: "Please upload the real video that could be open in the browser"
                }),
                file: file,
                info: { type: 'unknown' }
            });
        };
        video.src = URL.createObjectURL(file);
    });
};
var VideoChecker = (function () {
    function VideoChecker(maxBytesPerPixelPerSecond, maxDuration, maxSize, maxWidth) {
        var _this = this;
        this.maxBytesPerPixelPerSecond = 0;
        this.maxSize = 0;
        this.maxWidth = 0;
        this.maxDuration = 0;
        this.setAttr = function (key, value) {
            _this[key] = value;
        };
        this.check = function (file) {
            return exports.checkVideo(file, _this.maxBytesPerPixelPerSecond, _this.maxDuration, _this.maxSize, _this.maxWidth);
        };
        this.maxBytesPerPixelPerSecond = maxBytesPerPixelPerSecond;
        this.maxSize = maxSize;
        this.maxDuration = maxDuration;
        if (maxWidth) {
            this.maxWidth = maxWidth;
        }
    }
    return VideoChecker;
}());
exports.VideoChecker = VideoChecker;
