/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/11
 * Description:
 */
import {TFile, TImageLimits, CheckError} from './types';

export const checkImage = (file: TFile, maxBytesPerPixel: number, maxSize: number, maxWidth?: number) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(image.src);
      const width = image.width;
      const height = image.height;
      const size = width * height;
      if (maxWidth && width > maxWidth) {
        return reject(new CheckError({
          name: 'width',
          currentValue: width,
          limitValue: maxWidth,
          file,
          width,
          height,
          size,
          message: `The max width of image is ${maxWidth}，current is ${width}`
        }));
      }
      if (size > maxSize) {
        return reject(new CheckError({
          name: 'size',
          currentValue: size,
          limitValue: maxSize,
          file: file,
          width: width,
          height: height,
          size: size,
          message: `The max size of image is ${maxSize}，current is ${width * height}`
        }));
      }

      const maxKB = ~~(maxBytesPerPixel * size / 1024) + 1;

      if (file.size > maxKB * 1024) {
        return reject(new CheckError({
          name: 'bytes',
          currentValue: file.size,
          limitValue: maxKB * 1024,
          file,
          width,
          height,
          size,
          message: `In current size ${width} x ${height}，image should be less than ${maxKB}KB`
        }));
      }
      return resolve(file);
    };
    image.onerror = () => {
      URL.revokeObjectURL(image.src);
      return reject(new CheckError({
        name: 'unknown',
        currentValue: 'unknown',
        limitValue: 'image',
        file,
        message: `Please upload the real image that could be open in the browser`
      }));
    };
    image.src = URL.createObjectURL(file);
  });
}

export class ImageChecker {
  private maxBytesPerPixel = 0;
  private maxSize = 0;
  private maxWidth = 0;

  constructor(maxBytesPerPixel: number, maxSize: number, maxWidth?: number) {
    this.maxBytesPerPixel = maxBytesPerPixel;
    this.maxSize = maxSize;
    if (maxWidth) {
      this.maxWidth = maxWidth;
    }
  }

  public setAttr = (key: TImageLimits, value: number) => {
    this[key] = value;
  }

  public check = (file: TFile) => {
    return checkImage(file, this.maxBytesPerPixel, this.maxSize, this.maxWidth);
  }
}
