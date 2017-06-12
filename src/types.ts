/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/11
 * Description:
 */
export type TFile = File;

export type TFileType = string;
export type TFileTypes = TFileType[];

export type TImageLimits = 'maxBytesPerPixel' | 'maxSize' | 'maxWidth';

export type TVideoLimits = 'maxBytesPerPixel' | 'maxSize' | 'maxWidth' | 'maxDuration';

export type TError = string;

export interface ICheckError {
  name: TError;
  currentValue: number | string[] | string;
  limitValue: number | string[] | string;
  file: TFile;
  width?: number;
  height?: number;
  size?: number;
  duration?: number;
  stack?: string;
  message: string;
}

export class CheckError extends Error {
  public currentValue: number | string[] | string;
  public limitValue: number | string[] | string;
  public file: TFile;
  public width: number;
  public height: number;
  public size: number;
  public duration: number;

  constructor(params: ICheckError) {
    super();
    this.name = params.name;
    this.currentValue = params.currentValue;
    this.limitValue = params.limitValue;
    this.file = params.file;
    this.stack = (new Error()).stack;
    this.message = params.message;
    if (params.width) {
      this.width = params.width;
    }
    if (params.height) {
      this.height = params.height;
    }
    if (params.duration) {
      this.duration = params.duration;
    }
    if (params.size) {
      this.size = params.size;
    }
  }
}
