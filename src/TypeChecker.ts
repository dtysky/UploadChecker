/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/11
 * Description:
 */

import {
  TFileTypes, TFile, IFileInfo, CheckError, ICheckRespones
} from './types';

export const checkType: (
  file: TFile,
  types: TFileTypes
) => Promise<ICheckRespones>
  = (
    file: TFile,
    types: TFileTypes
) => {
  return new Promise((resolve, reject) => {
    const info: IFileInfo = {type: file.type};

    if (types.length === 0) {
      return resolve({file, info});
    }
    if (types.indexOf(file.type) >= 0) {
      return resolve({file, info});
    }
    return reject({
      error: new CheckError({
        name: 'type',
        currentValue: file.type,
        limitValue: types,
        message: `The type of file should be ${types.join(',')}，current is ${file.type}`
      }),
      file,
      info
    });
  });
}

export class TypeChecker {
  private types: TFileTypes;

  constructor(types: TFileTypes = []) {
    this.types = [];
  }

  public setTypes = (types: TFileTypes) => {
    this.types = types;
  }

  public check = (file: TFile) => {
    return checkType(file, this.types);
  }
}
