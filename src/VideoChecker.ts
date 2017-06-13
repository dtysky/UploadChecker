/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/11
 * Description:
 */
import {TFile, TVideoLimits, CheckError} from './types';

export const checkVideo = (file: TFile, maxBytesPerPixelPerSecond: number, maxDuration: number, maxSize: number, maxWidth?: number) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.style.position = 'fixed';
    video.style.transform = 'scale(-10000)';
    video.style.width = '0';
    video.style.height = '0';
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      document.body.removeChild(video);
      const width = video.videoWidth;
      const height = video.videoHeight;
      const size = width * height;
      const duration = video.duration;
      if (maxWidth && width > maxWidth) {
        return reject(new CheckError({
          name: 'width',
          currentValue: width,
          limitValue: maxWidth,
          file,
          width,
          height,
          size,
          duration,
          message: `The max width of video is ${maxWidth}，current is ${width}`
        }));
      }
      if (size > maxSize) {
        return reject(new CheckError({
          name: 'size',
          currentValue: size,
          limitValue: maxSize,
          file,
          width,
          height,
          size,
          duration,
          message: `The max size of video is ${maxSize}，current is ${width * height}`
        }));
      }
      if (duration > maxDuration) {
        return reject(new CheckError({
          name: 'duration',
          currentValue: duration,
          limitValue: maxDuration,
          file,
          width,
          height,
          size,
          duration,
          message: `The max duration of video is ${maxDuration}，current is ${duration}`
        }));
      }

      const maxMB = ~~(maxBytesPerPixelPerSecond * size * duration / 1024 / 1024) + 1;

      if (file.size > maxMB * 1024 * 1024) {
        return reject(new CheckError({
          name: 'bytes',
          currentValue: file.size,
          limitValue: maxMB * 1024 * 1024,
          file,
          width,
          height,
          size,
          duration,
          message: `In current size ${width} x ${height} and duration ${duration}，video should be less than ${maxMB.toFixed(2)}MB`
        }));
      }
      return resolve(file);
    };
    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      return reject(new CheckError({
        name: 'unknown',
        currentValue: 'unknown',
        limitValue: 'video',
        file: file,
        message: `Please upload the real video that could be open in the browser`
      }));
    };
    video.src = URL.createObjectURL(file);
  });
}

export class VideoChecker {
  private maxBytesPerPixelPerSecond = 0;
  private maxSize = 0;
  private maxWidth = 0;
  private maxDuration = 0;

  constructor(maxBytesPerPixelPerSecond: number, maxDuration: number, maxSize: number, maxWidth?: number) {
    this.maxBytesPerPixelPerSecond = maxBytesPerPixelPerSecond;
    this.maxSize = maxSize;
    this.maxDuration = maxDuration;
    if (maxWidth) {
      this.maxWidth = maxWidth;
    }
  }

  public setAttr = (key: TVideoLimits, value: number) => {
    this[key] = value;
  }

  public check = (file: TFile) => {
    return checkVideo(file, this.maxBytesPerPixelPerSecond, this.maxDuration, this.maxSize, this.maxWidth);
  }
}
