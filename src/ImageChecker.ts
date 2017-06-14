/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/11
 * Description:
 */
import {
  TFile, TImageConstraintKey, IFileInfo, CheckError, ICheckResponse
} from './types';

export const checkImage: (
  file: TFile,
  maxBytesPerPixel: number,
  maxSize: number,
  maxWidth?: number
) => Promise<ICheckResponse>
  = (
    file: TFile,
    maxBytesPerPixel: number,
    maxSize: number,
    maxWidth?: number
) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(image.src);
      const width = image.width;
      const height = image.height;
      const size = width * height;

      const info: IFileInfo = {type: file.type, width, height, size};

      if (maxWidth && width > maxWidth) {
        return reject({
          error: new CheckError({
            name: 'width',
            currentValue: width,
            limitValue: maxWidth,
            message: `The max width of image is ${maxWidth}，current is ${width}`
          }),
          info,
          file
        });
      }
      if (maxSize && size > maxSize) {
        return reject({
          error: new CheckError({
            name: 'size',
            currentValue: size,
            limitValue: maxSize,
            message: `The max size of image is ${maxSize}，current is ${width * height}`
          }),
          info,
          file
        });
      }

      const maxKB = ~~(maxBytesPerPixel * size / 1024) + 1;

      if (maxSize && maxBytesPerPixel && file.size > maxKB * 1024) {
        return reject({
          error: new CheckError({
            name: 'bytes',
            currentValue: file.size,
            limitValue: maxKB * 1024,
            message: `In current size ${width} x ${height}，image should be less than ${maxKB}KB`
          }),
          info,
          file
        });
      }
      return resolve({file, info});
    };
    image.onerror = () => {
      URL.revokeObjectURL(image.src);
      return reject({
        error: new CheckError({
          name: 'unknown',
          currentValue: 'unknown',
          limitValue: 'image',
          message: `Please upload the real image that could be open in the browser`
        }),
        info: {type: 'unknown'},
        file
      });
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

  public setAttr = (key: TImageConstraintKey, value: number) => {
    this[key] = value;
  }

  public check = (file: TFile) => {
    return checkImage(file, this.maxBytesPerPixel, this.maxSize, this.maxWidth);
  }
}
