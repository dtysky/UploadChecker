/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/11
 * Description:
 */
declare const window: any;
window.URL = window.URL || window.webkitURL;


export type TFile = File;

export type TFileType = string;
export type TFileTypes = TFileType[];

export type TImageLimits = 'maxBytesPerPixel' | 'maxSize' | 'maxWidth';

export type TVideoLimits = 'maxBytesPerPixelPerSecond' | 'maxSize' | 'maxWidth' | 'maxDuration';

export const videoRegex = /^video/;
export const imageRegex = /^image/;

export interface IFileInfo {
  type: string;
  width?: number;
  height?: number;
  size?: number;
  duration?: number;
}

export type TError = 'type' | 'width' | 'size' | 'duration' | 'bytes' | 'unknown';

export interface ICheckError {
  name: TError;
  currentValue: number | string[] | string;
  limitValue: number | string[] | string;
  stack?: string;
  message: string;
}

export class CheckError extends Error {
  public currentValue: number | string[] | string;
  public limitValue: number | string[] | string;

  constructor(params: ICheckError) {
    super();
    this.name = params.name;
    this.currentValue = params.currentValue;
    this.limitValue = params.limitValue;
    this.stack = (new Error()).stack;
    this.message = params.message;
  }
}

export interface ICheckRespones {
  file: TFile;
  info: IFileInfo;
  error?: ICheckError;
}
